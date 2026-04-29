import { describe, expect, it } from 'vitest';
import { countValidMoves } from '../src/board/BoardRules';
import { detectMatches } from '../src/board/MatchDetection';
import { getTrialDifficultyConfig } from '../src/generator/DifficultyTable';
import { generateTrialLevel } from '../src/generator/TrialGenerator';
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
    [8, 6, 2, 0, 1],
    [15, 7, 3, 1, 1],
    [19, 8, 4, 2, 2],
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
    expect(level.trial.waveManifest.map((monster) => monster.spawnTimeMs)).toEqual([0, 1200, 2400]);
    expect(level.trial.waveManifest.every((monster) => monster.laneId === 0)).toBe(true);
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
