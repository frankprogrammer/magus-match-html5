import { describe, expect, it } from 'vitest';
import { countValidMoves } from '../src/board/BoardRules';
import { detectMatches } from '../src/board/MatchDetection';
import { getTrialDifficultyConfig } from '../src/generator/DifficultyTable';
import {
  generateTrialLevel,
  getTrialMonsterContactRadius,
  isTrialManifestClearable,
  TRIAL_CLEARABILITY_DAMAGE_RATE,
  TRIAL_MAGE_CONTACT_RADIUS,
} from '../src/generator/TrialGenerator';
import { getTrialEmptyCellBudget } from '../src/generator/TrialEmptyPatterns';

describe('TrialGenerator', () => {
  it('generates deterministic Trial levels from the same seed', () => {
    const first = generateTrialLevel({ difficulty: 8, seed: 1234 });
    const second = generateTrialLevel({ difficulty: 8, seed: 1234 });

    expect(first.trial.waveManifest).toEqual(second.trial.waveManifest);
    expect(first.initialBoard).toEqual(second.initialBoard);
  });

  it.each([
    [1, 3, 0, 0, 1],
    [4, 5, 1, 0, 1],
    [5, 5, 1, 1, 1],
    [8, 6, 2, 0, 1],
    [10, 6, 2, 1, 1],
    [15, 7, 3, 1, 1],
    [19, 8, 4, 0, 2],
    [20, 8, 4, 2, 2],
    [21, 8, 4, 0, 2],
    [25, 8, 4, 2, 2],
  ])(
    'matches the difficulty band for difficulty %s',
    (difficulty, basicCount, tallCount, miniBossCount, waveCount) => {
      const config = getTrialDifficultyConfig(difficulty);
      const level = generateTrialLevel({ difficulty, seed: 55 + difficulty });
      const kinds = level.trial.waveManifest.map((monster) => monster.kind);

      expect(config.waveCount).toBe(waveCount);
      expect(kinds.filter((kind) => kind === 'kobold')).toHaveLength(basicCount);
      expect(kinds.filter((kind) => kind === 'tallKobold')).toHaveLength(tallCount);
      expect(kinds.filter((kind) => kind === 'miniBoss')).toHaveLength(miniBossCount);
    },
  );

  it('uses deterministic spawn timing and one right-to-left lane', () => {
    const level = generateTrialLevel({ difficulty: 1, seed: 777 });

    expect(level.trial.lanes).toHaveLength(1);
    expect(level.trial.lanes[0]).toMatchObject({
      laneId: 0,
      y: level.trial.laneY,
    });
    expect(level.trial.lanes[0].spawnX).toBeGreaterThan(level.trial.contactX);
    expect(level.trial.mageX).toBeLessThan(level.trial.lanes[0].spawnX);
    expect(level.trial.contactX).toBeCloseTo(level.trial.mageX + TRIAL_MAGE_CONTACT_RADIUS);
    expect(level.trial.waveManifest.map((monster) => monster.spawnTimeMs)).toEqual([0, 1200, 2400]);
    expect(level.trial.waveManifest.every((monster) => monster.laneId === 0)).toBe(true);
  });

  it('uses monster body radii when estimating Trial clearability', () => {
    const level = generateTrialLevel({ difficulty: 1, seed: 777 });
    const kobold = level.trial.waveManifest[0];
    const centerContactX = level.trial.contactX + getTrialMonsterContactRadius(kobold.kind);
    const availableSec = (level.trial.lanes[0].spawnX - centerContactX) / kobold.walkSpeed;
    const barelyTooMuchHp =
      Math.floor(availableSec * TRIAL_CLEARABILITY_DAMAGE_RATE * level.trial.baseDamage) + 1;

    expect(
      isTrialManifestClearable([{ ...kobold, maxHp: barelyTooMuchHp }], level.trial.baseDamage),
    ).toBe(false);
  });

  it('adds no Trial empty cells at difficulty 1', () => {
    const level = generateTrialLevel({ difficulty: 1, seed: 777 });

    expect(countVoidCells(level)).toBe(0);
    expect(detectMatches(level.initialBoard)).toHaveLength(0);
    expect(countValidMoves(level.initialBoard)).toBeGreaterThanOrEqual(3);
  });

  it.each([
    [2, 2],
    [4, 4],
    [8, 6],
    [12, 8],
  ])('generates deterministic symmetric empty cells for difficulty %s', (difficulty, maxCount) => {
    const first = generateTrialLevel({ difficulty, seed: 2345 });
    const second = generateTrialLevel({ difficulty, seed: 2345 });
    const voidCells = getVoidCells(first);

    expect(getTrialEmptyCellBudget(difficulty)).toBe(maxCount);
    expect(voidCells).toEqual(getVoidCells(second));
    expect(voidCells.length).toBeGreaterThan(0);
    expect(voidCells.length).toBeLessThanOrEqual(8);
    expect(voidCells.length).toBeLessThanOrEqual(maxCount);
    expect(isHorizontallySymmetric(voidCells)).toBe(true);
    expect(detectMatches(first.initialBoard)).toHaveLength(0);
    expect(countValidMoves(first.initialBoard)).toBeGreaterThanOrEqual(3);
  });

  it.each([
    [1, 'kobold', 72],
    [4, 'kobold', 104],
    [4, 'tallKobold', 130],
    [8, 'kobold', 140],
    [8, 'tallKobold', 168],
    [15, 'kobold', 145],
    [15, 'tallKobold', 170],
    [20, 'kobold', 111],
    [20, 'tallKobold', 130],
  ])('sets difficulty %s %s HP to tuned value %s', (difficulty, kind, maxHp) => {
    const config = getTrialDifficultyConfig(difficulty);
    const level = generateTrialLevel({ difficulty, seed: 8800 + difficulty });
    const monsters = level.trial.waveManifest.filter((monster) => monster.kind === kind);

    expect(monsters.length).toBeGreaterThan(0);
    expect(config.baseDamage).toBeGreaterThan(0);
    expect(monsters.every((monster) => monster.maxHp === maxHp)).toBe(true);
  });

  it.each([5, 10, 15, 20, 25])(
    'sets difficulty %s mini-boss HP to four times same-level kobold HP',
    (difficulty) => {
      const level = generateTrialLevel({ difficulty, seed: 8800 + difficulty });
      const koboldHp = level.trial.waveManifest.find((monster) => monster.kind === 'kobold')?.maxHp;
      const miniBosses = level.trial.waveManifest.filter((monster) => monster.kind === 'miniBoss');

      expect(koboldHp).toBeGreaterThan(0);
      expect(miniBosses.length).toBeGreaterThan(0);
      expect(miniBosses.every((monster) => monster.maxHp === (koboldHp ?? 0) * 4)).toBe(true);
    },
  );

  it.each([
    [1, 0.3125],
    [4, 0.34375],
    [8, 0.4375],
    [15, 0.5],
    [19, 0.59375],
  ])('uses 25 percent faster Trial walk speed for difficulty %s', (difficulty, walkSpeed) => {
    const level = generateTrialLevel({ difficulty, seed: 9900 + difficulty });

    expect(level.trial.waveManifest.every((monster) => monster.walkSpeed === walkSpeed)).toBe(true);
  });

  it('keeps generated Trial manifests clearable after HP tuning', () => {
    for (const difficulty of [1, 4, 8, 15, 19]) {
      const level = generateTrialLevel({ difficulty, seed: 7100 + difficulty });

      expect(isTrialManifestClearable(level.trial.waveManifest, level.trial.baseDamage)).toBe(true);
    }
  });
});

function countVoidCells(level: ReturnType<typeof generateTrialLevel>): number {
  return getVoidCells(level).length;
}

function getVoidCells(level: ReturnType<typeof generateTrialLevel>) {
  return level.initialBoard
    .flatMap((row, rowIndex) =>
      row.map((cell, colIndex) => (cell.isVoid ? { col: colIndex, row: rowIndex } : null)),
    )
    .filter((coord): coord is { col: number; row: number } => coord != null);
}

function isHorizontallySymmetric(coords: readonly { col: number; row: number }[]): boolean {
  const keys = new Set(coords.map((coord) => `${coord.col},${coord.row}`));
  return coords.every((coord) => keys.has(`${7 - coord.col},${coord.row}`));
}
