import { describe, expect, it } from 'vitest';
import { createBoardFromTileTypes } from '../src/board/Board';
import { detectMatches } from '../src/board/MatchDetection';
import { SeededRng } from '../src/core/Rng';
import type { GeneratedTrialLevel, TrialMonsterManifestEntry } from '../src/generator/TrialGenerator';
import { generateTrialLevel } from '../src/generator/TrialGenerator';
import {
  createTrialRuntime,
  damageMultiplierForMatch,
  processTrialPowerUpActivation,
  processTrialSwap,
  processTrialRocketActivation,
  selectNearestAliveMonster,
  updateTrialRuntime,
} from '../src/generator/TrialRules';

describe('TrialRules', () => {
  it('moves monsters by walk speed and fails exactly at the fail line', () => {
    const level = testTrialLevel([monster({ walkSpeed: 0.5 })]);
    const runtime = createTrialRuntime(level);
    const activeMonster = runtime.monsters[0];
    const nearFailRuntime = {
      ...runtime,
      monsters: [{ ...activeMonster, y: level.trial.failLineY + activeMonster.walkSpeed }],
    };

    const updated = updateTrialRuntime(nearFailRuntime, level, 1);

    expect(updated.monsters[0].y).toBeCloseTo(level.trial.failLineY);
    expect(updated.result).toBe('lost');
  });

  it('selects the nearest alive monster with deterministic lane tie-breaks', () => {
    const level = testTrialLevel([monster({ monsterId: 'far' }), monster({ monsterId: 'near' })]);
    const runtime = {
      ...createTrialRuntime(level),
      monsters: [
        { ...createTrialRuntime(level).monsters[0], monsterId: 'far', laneId: 4, y: 0.5 },
        { ...createTrialRuntime(level).monsters[0], monsterId: 'near', laneId: 1, y: -1.2 },
      ],
    };

    expect(selectNearestAliveMonster(runtime, level)?.monsterId).toBe('near');

    const tiedRuntime = {
      ...runtime,
      monsters: [
        { ...runtime.monsters[0], monsterId: 'right', laneId: 3, y: -1.2 },
        { ...runtime.monsters[1], monsterId: 'left', laneId: 1, y: -1.2 },
      ],
    };
    expect(selectNearestAliveMonster(tiedRuntime, level)?.monsterId).toBe('left');
  });

  it('scales match damage by match shape', () => {
    const basic = detectMatches(createBoardFromTileTypes([['FIRE', 'FIRE', 'FIRE']]))[0];
    const rocket = detectMatches(createBoardFromTileTypes([['ICE', 'ICE', 'ICE', 'ICE']]))[0];
    const lightball = detectMatches(
      createBoardFromTileTypes([['LIGHTNING', 'LIGHTNING', 'LIGHTNING', 'LIGHTNING', 'LIGHTNING']]),
    )[0];
    const tnt = detectMatches(
      createBoardFromTileTypes([
        ['EARTH', null, null],
        ['EARTH', null, null],
        ['EARTH', 'EARTH', 'EARTH'],
      ]),
    )[0];

    expect(damageMultiplierForMatch(basic)).toBe(1);
    expect(damageMultiplierForMatch(rocket)).toBe(2);
    expect(damageMultiplierForMatch(lightball)).toBe(3);
    expect(damageMultiplierForMatch(tnt)).toBe(2.5);
  });

  it('applies match damage instantly and expires 80ms projectile visuals', () => {
    const board = matchSwapBoard();
    const level = testTrialLevel([monster({ maxHp: 50 })], board);
    const runtime = createTrialRuntime(level);

    const result = processTrialSwap(
      board,
      runtime,
      level,
      { col: 1, row: 0 },
      { col: 1, row: 1 },
      new SeededRng(99),
    );

    expect(result.valid).toBe(true);
    expect(result.damageEvents.length).toBeGreaterThan(0);
    expect(result.runtime.projectiles[0].remainingSec).toBeCloseTo(0.08);
    expect(result.scoreDelta).toBeGreaterThan(0);

    const updated = updateTrialRuntime(result.runtime, level, 0.08);
    expect(updated.projectiles).toHaveLength(0);
  });

  it('uses power-up swaps as multi-shot damage instead of area damage', () => {
    const board = createBoardFromTileTypes([['ROCKET_H', 'EARTH']]);
    const level = testTrialLevel(
      [
        monster({ monsterId: 'a', maxHp: 5 }),
        monster({ monsterId: 'b', maxHp: 5 }),
        monster({ monsterId: 'c', maxHp: 5 }),
      ],
      board,
    );
    const runtime = createTrialRuntime(level);

    const result = processTrialSwap(
      board,
      runtime,
      level,
      { col: 0, row: 0 },
      { col: 1, row: 0 },
      new SeededRng(42),
    );

    expect(result.valid).toBe(true);
    expect(result.damageEvents.length).toBeGreaterThanOrEqual(3);
    expect(result.damageEvents.slice(0, 3).every((event) => event.schoolId === 'earth')).toBe(true);
    expect(result.animationTrace?.cascadeSteps[0].clearedTiles.find((tile) => tile.clearDelayMs === 0)?.coord).toEqual({
      col: 1,
      row: 0,
    });
  });

  it('taps a Trial rocket as a valid action with sweep animation and damage', () => {
    const board = createBoardFromTileTypes([['ROCKET_V'], ['FIRE'], ['ICE'], ['EARTH']]);
    const level = testTrialLevel(
      [
        monster({ monsterId: 'a', maxHp: 5 }),
        monster({ monsterId: 'b', maxHp: 5 }),
        monster({ monsterId: 'c', maxHp: 5 }),
      ],
      board,
    );
    const runtime = createTrialRuntime(level);

    const result = processTrialRocketActivation(board, runtime, level, { col: 0, row: 0 }, new SeededRng(43));

    expect(result.valid).toBe(true);
    expect(result.damageEvents.length).toBeGreaterThanOrEqual(3);
    expect(result.scoringStats.validSwapCount).toBe(1);
    expect(result.animationTrace?.cascadeSteps[0].clearedTiles.some((tile) => (tile.clearDelayMs ?? 0) > 0)).toBe(true);
  });

  it('stacks full-column Trial vertical rocket refills above the board', () => {
    const board = createBoardFromTileTypes([
      ['ROCKET_V', 'FIRE', 'ICE', 'EARTH', 'LIGHTNING', 'FIRE', 'ICE', 'EARTH'],
      ['FIRE', 'ICE', 'EARTH', 'LIGHTNING', 'FIRE', 'ICE', 'EARTH', 'LIGHTNING'],
      ['ICE', 'EARTH', 'LIGHTNING', 'FIRE', 'ICE', 'EARTH', 'LIGHTNING', 'FIRE'],
      ['EARTH', 'LIGHTNING', 'FIRE', 'ICE', 'EARTH', 'LIGHTNING', 'FIRE', 'ICE'],
      ['LIGHTNING', 'FIRE', 'ICE', 'EARTH', 'LIGHTNING', 'FIRE', 'ICE', 'EARTH'],
      ['FIRE', 'ICE', 'EARTH', 'LIGHTNING', 'FIRE', 'ICE', 'EARTH', 'LIGHTNING'],
      ['ICE', 'EARTH', 'LIGHTNING', 'FIRE', 'ICE', 'EARTH', 'LIGHTNING', 'FIRE'],
      ['EARTH', 'LIGHTNING', 'FIRE', 'ICE', 'EARTH', 'LIGHTNING', 'FIRE', 'ICE'],
    ]);
    const level = testTrialLevel([monster({ monsterId: 'a', maxHp: 50 })], board);
    const runtime = createTrialRuntime(level);

    const result = processTrialPowerUpActivation(board, runtime, level, { col: 0, row: 0 }, new SeededRng(49));
    const columnRefills = result.animationTrace?.cascadeSteps[0].refillTiles.filter((refill) => refill.to.col === 0) ?? [];

    expect(result.valid).toBe(true);
    expect(columnRefills.map((refill) => ({ toRow: refill.to.row, fromRow: refill.from.row }))).toEqual([
      { toRow: 0, fromRow: -8 },
      { toRow: 1, fromRow: -7 },
      { toRow: 2, fromRow: -6 },
      { toRow: 3, fromRow: -5 },
      { toRow: 4, fromRow: -4 },
      { toRow: 5, fromRow: -3 },
      { toRow: 6, fromRow: -2 },
      { toRow: 7, fromRow: -1 },
    ]);
  });

  it('taps a Trial TNT as a valid action with blast animation and damage', () => {
    const board = createBoardFromTileTypes([
      ['FIRE', 'ICE', 'EARTH'],
      ['LIGHTNING', 'TNT', 'FIRE'],
      ['ICE', 'EARTH', 'LIGHTNING'],
    ]);
    const level = testTrialLevel(
      [
        monster({ monsterId: 'a', maxHp: 5 }),
        monster({ monsterId: 'b', maxHp: 5 }),
        monster({ monsterId: 'c', maxHp: 5 }),
        monster({ monsterId: 'd', maxHp: 5 }),
        monster({ monsterId: 'e', maxHp: 5 }),
      ],
      board,
    );
    const runtime = createTrialRuntime(level);

    const result = processTrialPowerUpActivation(board, runtime, level, { col: 1, row: 1 }, new SeededRng(44));

    expect(result.valid).toBe(true);
    expect(result.damageEvents.length).toBeGreaterThanOrEqual(5);
    expect(result.scoringStats.validSwapCount).toBe(1);
    expect(result.animationTrace?.cascadeSteps[0].clearedTiles.find((tile) => tile.clearDelayMs === 0)?.coord).toEqual({
      col: 1,
      row: 1,
    });
    expect(result.animationTrace?.cascadeSteps[0].clearedTiles.some((tile) => (tile.clearDelayMs ?? 0) > 0)).toBe(true);
  });

  it('taps a Trial Lightball using the adjacent color with the highest board count', () => {
    const board = createBoardFromTileTypes([
      [null, 'FIRE', null],
      ['FIRE', 'LIGHTBALL', 'ICE'],
      [null, 'ICE', null],
      [null, 'ICE', null],
    ]);
    const level = testTrialLevel(
      [
        monster({ monsterId: 'a', maxHp: 50 }),
        monster({ monsterId: 'b', maxHp: 50 }),
      ],
      board,
    );
    const runtime = createTrialRuntime(level);

    const result = processTrialPowerUpActivation(board, runtime, level, { col: 1, row: 1 }, new SeededRng(47));

    expect(result.valid).toBe(true);
    expect(result.damageEvents.length).toBeGreaterThan(0);
    expect(result.damageEvents.every((event) => event.schoolId === 'ice')).toBe(true);
    expect(result.scoringStats.validSwapCount).toBe(1);
    expect(result.animationTrace?.cascadeSteps[0].clearedTiles.map((tile) => tile.coord)).toEqual([
      { col: 1, row: 1 },
      { col: 2, row: 1 },
      { col: 1, row: 2 },
      { col: 1, row: 3 },
    ]);
  });

  it('ignores Trial Lightball taps without an adjacent standard color', () => {
    const board = createBoardFromTileTypes([
      [null, 'TNT', null],
      ['LAND', 'LIGHTBALL', 'ROCKET_H'],
      [null, 'ROCKET_V', null],
    ]);
    const level = testTrialLevel([monster({ monsterId: 'a', maxHp: 50 })], board);
    const runtime = createTrialRuntime(level);

    const result = processTrialPowerUpActivation(board, runtime, level, { col: 1, row: 1 }, new SeededRng(48));

    expect(result.valid).toBe(false);
    expect(result.runtime).toBe(runtime);
    expect(result.board).toBe(board);
  });

  it('activates a swapped Trial TNT at its landing cell', () => {
    const board = createBoardFromTileTypes([['TNT', 'EARTH']]);
    const level = testTrialLevel([monster({ monsterId: 'a', maxHp: 50 })], board);
    const runtime = createTrialRuntime(level);

    const result = processTrialSwap(
      board,
      runtime,
      level,
      { col: 0, row: 0 },
      { col: 1, row: 0 },
      new SeededRng(45),
    );

    expect(result.valid).toBe(true);
    expect(result.damageEvents[0]?.schoolId).toBe('earth');
    expect(result.animationTrace?.cascadeSteps[0].clearedTiles.find((tile) => tile.clearDelayMs === 0)?.coord).toEqual({
      col: 1,
      row: 0,
    });
  });

  it('ignores non-power-up Trial taps', () => {
    const board = createBoardFromTileTypes([['FIRE', 'ICE', 'EARTH']]);
    const level = testTrialLevel([monster({ monsterId: 'a', maxHp: 50 })], board);
    const runtime = createTrialRuntime(level);

    const result = processTrialPowerUpActivation(board, runtime, level, { col: 0, row: 0 }, new SeededRng(46));

    expect(result.valid).toBe(false);
    expect(result.runtime).toBe(runtime);
  });

  it('wins when all manifested monsters are defeated', () => {
    const board = matchSwapBoard();
    const level = testTrialLevel([monster({ maxHp: 5 })], board);
    const result = processTrialSwap(
      board,
      createTrialRuntime(level),
      level,
      { col: 1, row: 0 },
      { col: 1, row: 1 },
      new SeededRng(24),
    );

    expect(result.runtime.defeatedMonsterIds).toHaveLength(1);
    expect(result.runtime.result).toBe('won');
  });
});

function testTrialLevel(
  manifest: readonly TrialMonsterManifestEntry[],
  initialBoard = matchSwapBoard(),
): GeneratedTrialLevel {
  const level = generateTrialLevel({ difficulty: 1, seed: 10 });
  return {
    ...level,
    initialBoard,
    trial: {
      ...level.trial,
      baseDamage: 10,
      waveManifest: manifest,
    },
  };
}

function monster(overrides: Partial<TrialMonsterManifestEntry> = {}): TrialMonsterManifestEntry {
  return {
    monsterId: 'monster',
    kind: 'kobold',
    laneId: 2,
    spawnTimeMs: 0,
    maxHp: 20,
    walkSpeed: 0.2,
    scoreValue: 100,
    ...overrides,
  };
}

function matchSwapBoard() {
  return createBoardFromTileTypes([
    ['FIRE', 'ICE', 'FIRE'],
    ['ICE', 'FIRE', 'ICE'],
    ['LIGHTNING', 'FIRE', 'EARTH'],
  ]);
}
