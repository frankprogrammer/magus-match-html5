import { describe, expect, it } from 'vitest';
import { createBoardFromTileTypes } from '../src/board/Board';
import { detectMatches } from '../src/board/MatchDetection';
import { SeededRng } from '../src/core/Rng';
import {
  ROCKET_SWEEP_CLEAR_STAGGER_MS,
  SPELL_BOMB_PROJECTILE_VISUAL_MS,
  SPELL_MATCH_PROJECTILE_VISUAL_MS,
  TILE_SWAP_RETARGET_MS,
} from '../src/data/tuning';
import type { GeneratedTrialLevel, TrialMonsterManifestEntry } from '../src/generator/TrialGenerator';
import { generateTrialLevel, getTrialMonsterContactRadius } from '../src/generator/TrialGenerator';
import {
  createTrialRuntime,
  damageMultiplierForMatch,
  getTrialMageWorldPosition,
  getTrialMonsterWorldPosition,
  getTrialSpellOriginWorldPosition,
  hasTrialMonsterReachedMage,
  processTrialPowerUpActivation,
  processTrialSwap,
  processTrialRocketActivation,
  selectNearestAliveMonster,
  updateTrialRuntime,
} from '../src/generator/TrialRules';

describe('TrialRules', () => {
  it('moves monsters left by walk speed and fails when the kobold body overlaps the mage body', () => {
    const level = testTrialLevel([monster({ walkSpeed: 0.5 })]);
    const runtime = createTrialRuntime(level);
    const activeMonster = runtime.monsters[0];
    const contactCenterX = level.trial.contactX + getTrialMonsterContactRadius(activeMonster.kind);
    const nearFailRuntime = {
      ...runtime,
      monsters: [{ ...activeMonster, x: contactCenterX + activeMonster.walkSpeed }],
    };

    const updated = updateTrialRuntime(nearFailRuntime, level, 1);

    expect(updated.monsters[0].x).toBeCloseTo(contactCenterX);
    expect(updated.result).toBe('lost');
  });

  it.each([
    ['kobold', 0.44],
    ['tallKobold', 0.5],
    ['miniBoss', 0.67],
  ] as const)('uses %s contact radius for Trial body overlap', (kind, radius) => {
    const level = testTrialLevel([monster({ kind })]);
    const runtime = createTrialRuntime(level);
    const activeMonster = runtime.monsters[0];

    expect(getTrialMonsterContactRadius(kind)).toBe(radius);
    expect(hasTrialMonsterReachedMage(level, { ...activeMonster, x: level.trial.contactX + radius + 0.01 })).toBe(false);
    expect(hasTrialMonsterReachedMage(level, { ...activeMonster, x: level.trial.contactX + radius })).toBe(true);
  });

  it('spawns only one active monster at a time', () => {
    const level = testTrialLevel([
      monster({ monsterId: 'first', spawnTimeMs: 0 }),
      monster({ monsterId: 'second', spawnTimeMs: 0 }),
    ]);
    const runtime = createTrialRuntime(level);

    expect(runtime.monsters.map((activeMonster) => activeMonster.monsterId)).toEqual(['first']);
    expect(runtime.nextSpawnIndex).toBe(1);
  });

  it('spawns the next due monster after the defeated monster disappears', () => {
    const level = testTrialLevel([
      monster({ monsterId: 'first', spawnTimeMs: 0 }),
      monster({ monsterId: 'second', spawnTimeMs: 0 }),
    ]);
    const runtime = {
      ...createTrialRuntime(level),
      monsters: [{ ...createTrialRuntime(level).monsters[0], monsterId: 'first', hp: 0, defeatDelaySec: 0.1 }],
      defeatedMonsterIds: [],
    };

    const waiting = updateTrialRuntime(runtime, level, 0.09);
    expect(waiting.monsters.map((activeMonster) => activeMonster.monsterId)).toEqual(['first']);
    expect(waiting.nextSpawnIndex).toBe(1);
    expect(waiting.defeatedMonsterIds).toEqual([]);

    const updated = updateTrialRuntime(waiting, level, 0.01);

    expect(updated.monsters.map((activeMonster) => activeMonster.monsterId)).toEqual(['second']);
    expect(updated.nextSpawnIndex).toBe(2);
    expect(updated.defeatedMonsterIds).toEqual(['first']);
  });

  it('selects the nearest alive monster with deterministic id tie-breaks', () => {
    const level = testTrialLevel([monster({ monsterId: 'far' }), monster({ monsterId: 'near' })]);
    const runtime = {
      ...createTrialRuntime(level),
      monsters: [
        { ...createTrialRuntime(level).monsters[0], monsterId: 'far', x: 1.5 },
        { ...createTrialRuntime(level).monsters[0], monsterId: 'near', x: -2.8 },
      ],
    };

    expect(selectNearestAliveMonster(runtime, level)?.monsterId).toBe('near');

    const tiedRuntime = {
      ...runtime,
      monsters: [
        { ...runtime.monsters[0], monsterId: 'b', x: -2.8 },
        { ...runtime.monsters[1], monsterId: 'a', x: -2.8 },
      ],
    };
    expect(selectNearestAliveMonster(tiedRuntime, level)?.monsterId).toBe('a');
  });

  it('places the mage on the left and the active monster on the right in world space', () => {
    const level = testTrialLevel([monster()]);
    const runtime = createTrialRuntime(level);
    const magePosition = getTrialMageWorldPosition(level);
    const monsterPosition = getTrialMonsterWorldPosition(level, runtime.monsters[0]);
    const spellOrigin = getTrialSpellOriginWorldPosition(level);

    expect(magePosition.x).toBe(level.trial.mageX);
    expect(magePosition.y).toBe(level.trial.laneY);
    expect(monsterPosition.x).toBeGreaterThan(magePosition.x);
    expect(monsterPosition.y).toBe(level.trial.laneY);
    expect(spellOrigin.x).toBeGreaterThan(magePosition.x);
    expect(spellOrigin.y).toBeGreaterThan(magePosition.y);
    expect(spellOrigin.z).toBeGreaterThan(magePosition.z);
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

  it('applies match damage instantly and queues cascade-timed match particle visuals', () => {
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
    expect(result.runtime.monsters[0]?.hp).toBeLessThan(50);
    expect(result.runtime.monsters[0]?.maxHp).toBe(50);
    expect(result.runtime.projectiles.length).toBeGreaterThan(0);
    expect(result.runtime.projectiles.every((projectile) => projectile.effectKind === 'match')).toBe(true);
    expect(result.runtime.projectiles.some((projectile) => projectile.schoolId === 'fire')).toBe(true);
    expect(result.runtime.projectiles[0]).toMatchObject({
      from: getTrialSpellOriginWorldPosition(level),
      activationDelaySec: TILE_SWAP_RETARGET_MS / 1000,
      remainingSec: SPELL_MATCH_PROJECTILE_VISUAL_MS / 1000,
      durationSec: SPELL_MATCH_PROJECTILE_VISUAL_MS / 1000,
    });
    expect(result.scoreDelta).toBeGreaterThan(0);

    const waiting = updateTrialRuntime(result.runtime, level, 0.08);
    expect(waiting.projectiles[0].activationDelaySec).toBeCloseTo(TILE_SWAP_RETARGET_MS / 1000 - 0.08);
    expect(waiting.projectiles[0].remainingSec).toBeCloseTo(SPELL_MATCH_PROJECTILE_VISUAL_MS / 1000);

    const updated = updateTrialRuntime(waiting, level, TILE_SWAP_RETARGET_MS / 1000 + SPELL_MATCH_PROJECTILE_VISUAL_MS / 1000);
    expect(updated.projectiles).toHaveLength(0);
  });

  it('uses power-up swaps as multi-shot damage instead of area damage', () => {
    const board = createBoardFromTileTypes([['ROCKET_H', 'EARTH']]);
    const level = testTrialLevel(
      [
        monster({ monsterId: 'a', maxHp: 100 }),
        monster({ monsterId: 'b', maxHp: 100 }),
        monster({ monsterId: 'c', maxHp: 100 }),
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
        monster({ monsterId: 'a', maxHp: 100 }),
        monster({ monsterId: 'b', maxHp: 100 }),
        monster({ monsterId: 'c', maxHp: 100 }),
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
        monster({ monsterId: 'a', maxHp: 100 }),
        monster({ monsterId: 'b', maxHp: 100 }),
        monster({ monsterId: 'c', maxHp: 100 }),
        monster({ monsterId: 'd', maxHp: 100 }),
        monster({ monsterId: 'e', maxHp: 100 }),
      ],
      board,
    );
    const runtime = createTrialRuntime(level);

    const result = processTrialPowerUpActivation(board, runtime, level, { col: 1, row: 1 }, new SeededRng(44));

    expect(result.valid).toBe(true);
    expect(result.damageEvents.length).toBeGreaterThanOrEqual(5);
    expect(result.scoringStats.validSwapCount).toBe(1);
    const bombProjectiles = result.runtime.projectiles.filter((projectile) => projectile.effectKind === 'bomb');
    expect(bombProjectiles).toHaveLength(1);
    expect(bombProjectiles[0]).toMatchObject({
      schoolId: 'fire',
      from: getTrialSpellOriginWorldPosition(level),
      activationDelaySec: TILE_SWAP_RETARGET_MS / 1000,
      remainingSec: SPELL_BOMB_PROJECTILE_VISUAL_MS / 1000,
      durationSec: SPELL_BOMB_PROJECTILE_VISUAL_MS / 1000,
    });
    expect(result.animationTrace?.cascadeSteps[0].clearedTiles.find((tile) => tile.clearDelayMs === 0)?.coord).toEqual({
      col: 1,
      row: 1,
    });
    expect(result.animationTrace?.cascadeSteps[0].clearedTiles.some((tile) => (tile.clearDelayMs ?? 0) > 0)).toBe(true);
  });

  it('uses the bomb projectile timing before removing a TNT-defeated monster', () => {
    const board = createBoardFromTileTypes([
      ['FIRE', 'ICE', 'EARTH'],
      ['LIGHTNING', 'TNT', 'FIRE'],
      ['ICE', 'EARTH', 'LIGHTNING'],
    ]);
    const level = testTrialLevel([monster({ monsterId: 'bomb-target', maxHp: 5 })], board);
    const runtime = createTrialRuntime(level);

    const result = processTrialPowerUpActivation(board, runtime, level, { col: 1, row: 1 }, new SeededRng(44));

    expect(result.valid).toBe(true);
    expect(result.damageEvents.some((event) => event.defeated)).toBe(true);
    expect(result.runtime.monsters).toHaveLength(1);
    expect(result.runtime.monsters[0]).toMatchObject({
      monsterId: 'bomb-target',
      hp: 0,
    });
    expect(result.runtime.monsters[0].defeatDelaySec).toBeCloseTo(
      TILE_SWAP_RETARGET_MS / 1000 + SPELL_BOMB_PROJECTILE_VISUAL_MS / 1000,
    );
    expect(result.runtime.defeatedMonsterIds).toEqual([]);
    expect(result.runtime.result).toBe('playing');
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

  it('chains Trial power-ups with multiple damage sources and one timed chain animation step', () => {
    const board = createBoardFromTileTypes([
      ['ROCKET_H', 'FIRE', 'TNT', 'ICE'],
      ['EARTH', 'LIGHTNING', 'FIRE', 'ICE'],
    ]);
    const level = testTrialLevel(
      [
        monster({ monsterId: 'a', maxHp: 300 }),
        monster({ monsterId: 'b', maxHp: 300 }),
        monster({ monsterId: 'c', maxHp: 300 }),
        monster({ monsterId: 'd', maxHp: 300 }),
        monster({ monsterId: 'e', maxHp: 300 }),
        monster({ monsterId: 'f', maxHp: 300 }),
        monster({ monsterId: 'g', maxHp: 300 }),
        monster({ monsterId: 'h', maxHp: 300 }),
      ],
      board,
    );
    const runtime = createTrialRuntime(level);

    const result = processTrialPowerUpActivation(board, runtime, level, { col: 0, row: 0 }, new SeededRng(50));

    expect(result.valid).toBe(true);
    expect(result.scoringStats.validSwapCount).toBe(1);
    expect(result.damageEvents.length).toBeGreaterThanOrEqual(8);
    const firstStepTiles = result.animationTrace?.cascadeSteps[0].clearedTiles ?? [];
    expect(firstStepTiles).toContainEqual(expect.objectContaining({
      coord: { col: 2, row: 0 },
      clearDelayMs: 2 * ROCKET_SWEEP_CLEAR_STAGGER_MS,
    }));
    expect(result.runtime.projectiles.find((projectile) => projectile.effectKind === 'bomb')?.activationDelaySec).toBeCloseTo(
      (TILE_SWAP_RETARGET_MS + 2 * ROCKET_SWEEP_CLEAR_STAGGER_MS) / 1000,
    );
    expect(firstStepTiles).toContainEqual(expect.objectContaining({ coord: { col: 1, row: 1 } }));
    expect(result.animationTrace?.cascadeSteps[0].refillTiles.length).toBeGreaterThan(0);
  });

  it('ignores non-power-up Trial taps', () => {
    const board = createBoardFromTileTypes([['FIRE', 'ICE', 'EARTH']]);
    const level = testTrialLevel([monster({ monsterId: 'a', maxHp: 50 })], board);
    const runtime = createTrialRuntime(level);

    const result = processTrialPowerUpActivation(board, runtime, level, { col: 0, row: 0 }, new SeededRng(46));

    expect(result.valid).toBe(false);
    expect(result.runtime).toBe(runtime);
  });

  it('wins after the final defeated monster waits for the killing match projectile to arrive', () => {
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

    const defeatDelaySec = TILE_SWAP_RETARGET_MS / 1000 + SPELL_MATCH_PROJECTILE_VISUAL_MS / 1000;
    expect(result.runtime.monsters).toHaveLength(1);
    expect(result.runtime.monsters[0]).toMatchObject({
      hp: 0,
    });
    expect(result.runtime.monsters[0].defeatDelaySec).toBeCloseTo(defeatDelaySec);
    expect(result.runtime.defeatedMonsterIds).toEqual([]);
    expect(result.runtime.result).toBe('playing');

    const waiting = updateTrialRuntime(result.runtime, level, defeatDelaySec - 0.001);
    expect(waiting.monsters).toHaveLength(1);
    expect(waiting.result).toBe('playing');

    const updated = updateTrialRuntime(waiting, level, 0.001);
    expect(updated.monsters).toHaveLength(0);
    expect(updated.defeatedMonsterIds).toHaveLength(1);
    expect(updated.result).toBe('won');
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
    laneId: 0,
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
