import { describe, expect, it } from 'vitest';
import { createBoardFromTileTypes } from '../src/board/Board';
import { detectMatches } from '../src/board/MatchDetection';
import { SeededRng } from '../src/core/Rng';
import type { GeneratedTrialLevel, TrialMonsterManifestEntry } from '../src/generator/TrialGenerator';
import { generateTrialLevel } from '../src/generator/TrialGenerator';
import {
  createTrialRuntime,
  damageMultiplierForMatch,
  processTrialSwap,
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
