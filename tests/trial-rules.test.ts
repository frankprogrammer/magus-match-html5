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
  KOBOLD_DEFEAT_ANIMATION_SEC,
  KOBOLD_DEFEAT_FADE_SEC,
  LIGHTNING_CHAIN_HOP_DELAY_SEC,
  SPELL_CAST_WINDUP_SEC,
  TRIAL_ICE_FREEZE_SEC,
  TRIAL_MONSTER_RANDOM_Y_OFFSET_AMPLITUDE,
  TRIAL_NEXT_MONSTER_SPAWN_PROGRESS_RATIO,
  updateTrialRuntime,
  visualYOffsetForMonster,
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

  it('spawns another due monster after the newest visible monster advances 40 percent down the lane', () => {
    const level = testTrialLevel([
      monster({ monsterId: 'first', spawnTimeMs: 0, walkSpeed: 0.2 }),
      monster({ monsterId: 'second', spawnTimeMs: 0, walkSpeed: 0.2 }),
    ]);
    const runtime = createTrialRuntime(level);
    const spawnX = level.trial.lanes[0].spawnX;
    const thresholdDistance =
      (spawnX - level.trial.contactX) * TRIAL_NEXT_MONSTER_SPAWN_PROGRESS_RATIO;
    const thresholdSec = thresholdDistance / runtime.monsters[0].walkSpeed;

    const beforeThreshold = updateTrialRuntime(runtime, level, thresholdSec - 0.01);

    expect(beforeThreshold.monsters.map((activeMonster) => activeMonster.monsterId)).toEqual(['first']);
    expect(beforeThreshold.nextSpawnIndex).toBe(1);

    const afterThreshold = updateTrialRuntime(beforeThreshold, level, 0.02);

    expect(afterThreshold.monsters.map((activeMonster) => activeMonster.monsterId)).toEqual(['first', 'second']);
    expect(afterThreshold.nextSpawnIndex).toBe(2);
    expect(afterThreshold.monsters[0].x).toBeLessThan(afterThreshold.monsters[1].x);
  });

  it('moves multiple active monsters together and targets the front living kobold', () => {
    const level = testTrialLevel([
      monster({ monsterId: 'first', spawnTimeMs: 0, walkSpeed: 0.2 }),
      monster({ monsterId: 'second', spawnTimeMs: 0, walkSpeed: 0.2 }),
    ]);
    const runtime = {
      ...createTrialRuntime(level),
      nextSpawnIndex: 2,
      monsters: [
        { ...createTrialRuntime(level).monsters[0], monsterId: 'first', x: 1 },
        { ...createTrialRuntime(level).monsters[0], monsterId: 'second', x: 3 },
      ],
    };

    const updated = updateTrialRuntime(runtime, level, 0.5);

    expect(updated.monsters.map((activeMonster) => activeMonster.x)).toEqual([0.9, 2.9]);
    expect(selectNearestAliveMonster(updated, level)?.monsterId).toBe('first');
  });

  it('assigns deterministic visual y offsets to spawned Trial monsters', () => {
    const level = testTrialLevel([monster({ monsterId: 'first' })]);
    const firstRuntime = createTrialRuntime(level);
    const secondRuntime = createTrialRuntime(level);
    const visualYOffset = firstRuntime.monsters[0].visualYOffset;

    expect(visualYOffset).toBeCloseTo(visualYOffsetForMonster(level, 'first'));
    expect(visualYOffset).toBe(secondRuntime.monsters[0].visualYOffset);
    expect(Math.abs(visualYOffset ?? 0)).toBeLessThanOrEqual(TRIAL_MONSTER_RANDOM_Y_OFFSET_AMPLITUDE);
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

    const animating = updateTrialRuntime(waiting, level, 0.01);

    expect(animating.monsters.map((activeMonster) => activeMonster.monsterId)).toEqual(['first']);
    expect(animating.monsters[0].defeatAnimationRemainingSec).toBeCloseTo(KOBOLD_DEFEAT_ANIMATION_SEC);
    expect(animating.nextSpawnIndex).toBe(1);
    expect(animating.defeatedMonsterIds).toEqual([]);

    const fading = updateTrialRuntime(animating, level, KOBOLD_DEFEAT_ANIMATION_SEC);

    expect(fading.monsters.map((activeMonster) => activeMonster.monsterId)).toEqual(['first']);
    expect(fading.monsters[0].defeatFadeRemainingSec).toBeCloseTo(KOBOLD_DEFEAT_FADE_SEC);
    expect(fading.nextSpawnIndex).toBe(1);
    expect(fading.defeatedMonsterIds).toEqual([]);

    const updated = updateTrialRuntime(fading, level, KOBOLD_DEFEAT_FADE_SEC);

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
      castActivationDelaySec: TILE_SWAP_RETARGET_MS / 1000,
      activationDelaySec: TILE_SWAP_RETARGET_MS / 1000 + SPELL_CAST_WINDUP_SEC,
      remainingSec: SPELL_MATCH_PROJECTILE_VISUAL_MS / 1000,
      durationSec: SPELL_MATCH_PROJECTILE_VISUAL_MS / 1000,
    });
    const hitDelaySec = TILE_SWAP_RETARGET_MS / 1000 + SPELL_CAST_WINDUP_SEC + SPELL_MATCH_PROJECTILE_VISUAL_MS / 1000;
    const damagedHp = result.runtime.monsters[0]?.hp ?? 50;
    expect(result.runtime.monsters[0]?.hitShakeDelaySec).toBeCloseTo(hitDelaySec);
    expect(result.runtime.monsters[0]?.hitShakeQueueSec).toHaveLength(result.runtime.projectiles.length);
    expect(result.runtime.monsters[0]?.hitShakeQueueSec?.[0]).toBeCloseTo(hitDelaySec);
    expect(result.damageEvents[0]?.impactDelaySec).toBeCloseTo(hitDelaySec);
    expect(result.damageEvents[0]?.castActivationDelaySec).toBeCloseTo(TILE_SWAP_RETARGET_MS / 1000);
    expect(result.runtime.monsters[0]?.hitShakeDurationSec).toBeCloseTo(0.18);
    expect(result.runtime.monsters[0]?.hitShakeRemainingSec).toBe(0);
    expect(result.runtime.monsters[0]?.healthBarHp).toBe(50);
    expect(result.runtime.monsters[0]?.healthBarUpdateQueue?.at(-1)).toMatchObject({ hp: damagedHp });
    expect(result.runtime.monsters[0]?.healthBarUpdateQueue?.[0]?.delaySec).toBeCloseTo(hitDelaySec);
    expect(result.scoreDelta).toBeGreaterThan(0);

    const waiting = updateTrialRuntime(result.runtime, level, 0.08);
    expect(waiting.projectiles[0].castActivationDelaySec).toBeCloseTo(TILE_SWAP_RETARGET_MS / 1000 - 0.08);
    expect(waiting.projectiles[0].activationDelaySec).toBeCloseTo(
      TILE_SWAP_RETARGET_MS / 1000 + SPELL_CAST_WINDUP_SEC - 0.08,
    );
    expect(waiting.projectiles[0].remainingSec).toBeCloseTo(SPELL_MATCH_PROJECTILE_VISUAL_MS / 1000);
    expect(waiting.monsters[0]?.hitShakeDelaySec).toBeCloseTo(hitDelaySec - 0.08);
    expect(waiting.monsters[0]?.hitShakeQueueSec?.[0]).toBeCloseTo(hitDelaySec - 0.08);
    expect(waiting.monsters[0]?.healthBarHp).toBe(50);
    expect(waiting.monsters[0]?.healthBarUpdateQueue?.[0]?.delaySec).toBeCloseTo(hitDelaySec - 0.08);

    const shaking = updateTrialRuntime(waiting, level, hitDelaySec - 0.08);
    expect(shaking.monsters[0]?.hitShakeDelaySec).toBeUndefined();
    expect(shaking.monsters[0]?.hitShakeQueueSec).toBeUndefined();
    expect(shaking.monsters[0]?.hitShakeRemainingSec).toBeCloseTo(0.18);
    expect(shaking.monsters[0]?.healthBarHp).toBeUndefined();
    expect(shaking.monsters[0]?.healthBarUpdateQueue).toBeUndefined();

    const updated = updateTrialRuntime(shaking, level, 0.18);
    expect(updated.projectiles).toHaveLength(0);
    expect(updated.monsters[0]?.hitShakeRemainingSec).toBeUndefined();
    expect(updated.monsters[0]?.hp).toBeLessThan(50);
  });

  it('chains lightning matches through every alive monster once with enemy-to-enemy projectiles', () => {
    const board = lightningMatchSwapBoard();
    const level = testTrialLevel(
      [
        monster({ monsterId: 'first', maxHp: 30 }),
        monster({ monsterId: 'second', maxHp: 30 }),
        monster({ monsterId: 'third', maxHp: 30 }),
      ],
      board,
    );
    const baseRuntime = createTrialRuntime(level);
    const activeMonster = baseRuntime.monsters[0];
    const runtime = {
      ...baseRuntime,
      nextSpawnIndex: 3,
      monsters: [
        { ...activeMonster, monsterId: 'first', hp: 30, maxHp: 30, x: level.trial.mageX + 1 },
        { ...activeMonster, monsterId: 'second', hp: 30, maxHp: 30, x: level.trial.mageX + 2 },
        { ...activeMonster, monsterId: 'third', hp: 30, maxHp: 30, x: level.trial.mageX + 3 },
      ],
    };

    const result = processTrialSwap(
      board,
      runtime,
      level,
      { col: 1, row: 0 },
      { col: 1, row: 1 },
      new SeededRng(99),
    );
    const lightningEvents = result.damageEvents.filter((event) => event.schoolId === 'lightning');
    const lightningProjectiles = result.runtime.projectiles.filter((projectile) => projectile.schoolId === 'lightning');
    const firstImpactDelaySec =
      TILE_SWAP_RETARGET_MS / 1000 + SPELL_CAST_WINDUP_SEC + SPELL_MATCH_PROJECTILE_VISUAL_MS / 1000;

    expect(result.valid).toBe(true);
    expect(lightningEvents.map((event) => event.monsterId)).toEqual(['first', 'second', 'third']);
    expect(lightningEvents.map((event) => event.damage)).toEqual([10, 10, 10]);
    expect(lightningEvents[0].impactDelaySec).toBeCloseTo(firstImpactDelaySec);
    expect(lightningEvents[1].impactDelaySec).toBeCloseTo(firstImpactDelaySec + LIGHTNING_CHAIN_HOP_DELAY_SEC);
    expect(lightningEvents[2].impactDelaySec).toBeCloseTo(firstImpactDelaySec + LIGHTNING_CHAIN_HOP_DELAY_SEC * 2);
    expect(result.runtime.monsters.map((target) => ({ id: target.monsterId, hp: target.hp }))).toEqual([
      { id: 'first', hp: 20 },
      { id: 'second', hp: 20 },
      { id: 'third', hp: 20 },
    ]);
    expect(lightningProjectiles).toHaveLength(3);
    expect(lightningProjectiles[0]).toMatchObject({
      originKind: 'mage',
      from: getTrialSpellOriginWorldPosition(level),
      to: getTrialMonsterWorldPosition(level, runtime.monsters[0]),
    });
    expect(lightningProjectiles[1]).toMatchObject({
      originKind: 'world',
      from: getTrialMonsterWorldPosition(level, runtime.monsters[0]),
      to: getTrialMonsterWorldPosition(level, runtime.monsters[1]),
      chargeDurationSec: 0,
    });
    expect(lightningProjectiles[2]).toMatchObject({
      originKind: 'world',
      from: getTrialMonsterWorldPosition(level, runtime.monsters[1]),
      to: getTrialMonsterWorldPosition(level, runtime.monsters[2]),
      chargeDurationSec: 0,
    });

    const stacked = processTrialSwap(
      board,
      result.runtime,
      level,
      { col: 1, row: 0 },
      { col: 1, row: 1 },
      new SeededRng(100),
    );

    expect(stacked.damageEvents.filter((event) => event.schoolId === 'lightning')).toHaveLength(3);
    expect(stacked.runtime.monsters.map((target) => target.hp)).toEqual([10, 10, 10]);
  });

  it('starts ice freeze when the ice projectile visually impacts and stops movement while frozen', () => {
    const board = iceMatchSwapBoard();
    const level = testTrialLevel([monster({ maxHp: 50, walkSpeed: 0.2 })], board);
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
    expect(result.damageEvents.some((event) => event.schoolId === 'ice')).toBe(true);
    expect(result.runtime.monsters[0].hp).toBeLessThan(50);
    expect(result.runtime.monsters[0].iceFreezeRemainingSec).toBeUndefined();
    const impactDelaySec = result.runtime.monsters[0].iceFreezeDelayQueueSec?.[0] ?? 0;
    expect(impactDelaySec).toBeGreaterThan(0);

    const beforeImpact = updateTrialRuntime(result.runtime, level, impactDelaySec - 0.001);
    expect(beforeImpact.monsters[0].iceFreezeRemainingSec).toBeUndefined();
    expect(beforeImpact.monsters[0].x).toBeLessThan(result.runtime.monsters[0].x);

    const impact = updateTrialRuntime(beforeImpact, level, 0.002);
    const frozenX = impact.monsters[0].x;
    expect(impact.monsters[0].iceFreezeRemainingSec).toBeCloseTo(TRIAL_ICE_FREEZE_SEC - 0.001);
    expect(impact.monsters[0].iceFreezeDelayQueueSec).toBeUndefined();
    expect(impact.monsters[0].x).toBeCloseTo(beforeImpact.monsters[0].x - impact.monsters[0].walkSpeed * 0.001);

    const frozen = updateTrialRuntime(impact, level, 0.4);
    expect(frozen.monsters[0].x).toBeCloseTo(frozenX);
    expect(frozen.monsters[0].iceFreezeRemainingSec).toBeCloseTo(TRIAL_ICE_FREEZE_SEC - 0.4);

    const resumed = updateTrialRuntime(updateTrialRuntime(frozen, level, TRIAL_ICE_FREEZE_SEC - 0.4), level, 0.1);
    expect(resumed.monsters[0].iceFreezeRemainingSec).toBeUndefined();
    expect(resumed.monsters[0].x).toBeLessThan(frozenX);
  });

  it('adds additional ice impacts onto an active freeze timer', () => {
    const level = testTrialLevel([monster({ monsterId: 'frozen-target', maxHp: 50 })]);
    const runtime = {
      ...createTrialRuntime(level),
      monsters: [
        {
          ...createTrialRuntime(level).monsters[0],
          monsterId: 'frozen-target',
          hp: 35,
          maxHp: 50,
          iceFreezeRemainingSec: 1,
          iceFreezeDurationSec: TRIAL_ICE_FREEZE_SEC,
          iceFreezeDelayQueueSec: [0.2],
        },
      ],
    };

    const updated = updateTrialRuntime(runtime, level, 0.2);

    expect(updated.monsters[0].iceFreezeRemainingSec).toBeCloseTo(1 - 0.2 + TRIAL_ICE_FREEZE_SEC);
  });

  it('does not queue ice freeze for lethal ice hits', () => {
    const board = iceMatchSwapBoard();
    const level = testTrialLevel([monster({ monsterId: 'ice-lethal', maxHp: 5 })], board);
    const result = processTrialSwap(
      board,
      createTrialRuntime(level),
      level,
      { col: 1, row: 0 },
      { col: 1, row: 1 },
      new SeededRng(99),
    );

    expect(result.valid).toBe(true);
    expect(result.runtime.monsters[0]).toMatchObject({ monsterId: 'ice-lethal', hp: 0 });
    expect(result.runtime.monsters[0].iceFreezeDelayQueueSec).toBeUndefined();
    expect(result.runtime.monsters[0].iceFreezeRemainingSec).toBeUndefined();
  });

  it('plays queued hit shakes for later cascade-step impact timings', () => {
    const level = testTrialLevel([monster({ monsterId: 'cascade-target', maxHp: 50 })]);
    const runtime = createTrialRuntime(level);
    const queuedRuntime = {
      ...runtime,
      monsters: [
        {
          ...runtime.monsters[0],
          monsterId: 'cascade-target',
          hp: 35,
          maxHp: 50,
          hitShakeDelaySec: 0.05,
          hitShakeQueueSec: [0.05, 0.35],
          hitShakeRemainingSec: 0,
          hitShakeDurationSec: 0.18,
        },
      ],
      projectiles: [],
      defeatedMonsterIds: [],
    };

    const firstImpact = updateTrialRuntime(queuedRuntime, level, 0.05);
    expect(firstImpact.monsters[0].hitShakeRemainingSec).toBeCloseTo(0.18);
    expect(firstImpact.monsters[0].hitShakeDelaySec).toBeCloseTo(0.3);
    expect(firstImpact.monsters[0].hitShakeQueueSec).toHaveLength(1);
    expect(firstImpact.monsters[0].hitShakeQueueSec?.[0]).toBeCloseTo(0.3);

    const betweenImpacts = updateTrialRuntime(firstImpact, level, 0.18);
    expect(betweenImpacts.monsters[0].hitShakeRemainingSec).toBeUndefined();
    expect(betweenImpacts.monsters[0].hitShakeDelaySec).toBeCloseTo(0.12);
    expect(betweenImpacts.monsters[0].hitShakeQueueSec).toHaveLength(1);
    expect(betweenImpacts.monsters[0].hitShakeQueueSec?.[0]).toBeCloseTo(0.12);

    const secondImpact = updateTrialRuntime(betweenImpacts, level, 0.12);
    expect(secondImpact.monsters[0].hitShakeDelaySec).toBeUndefined();
    expect(secondImpact.monsters[0].hitShakeQueueSec).toBeUndefined();
    expect(secondImpact.monsters[0].hitShakeRemainingSec).toBeCloseTo(0.18);
  });

  it('applies queued health bar updates at each visual impact timing', () => {
    const level = testTrialLevel([monster({ monsterId: 'health-target', maxHp: 50 })]);
    const runtime = createTrialRuntime(level);
    const queuedRuntime = {
      ...runtime,
      monsters: [
        {
          ...runtime.monsters[0],
          monsterId: 'health-target',
          hp: 20,
          maxHp: 50,
          healthBarHp: 35,
          healthBarUpdateQueue: [
            { delaySec: 0.05, hp: 30 },
            { delaySec: 0.35, hp: 20 },
          ],
        },
      ],
      projectiles: [],
      defeatedMonsterIds: [],
    };

    const firstImpact = updateTrialRuntime(queuedRuntime, level, 0.05);
    expect(firstImpact.monsters[0].hp).toBe(20);
    expect(firstImpact.monsters[0].healthBarHp).toBe(30);
    expect(firstImpact.monsters[0].healthBarUpdateQueue).toEqual([{ delaySec: 0.3, hp: 20 }]);

    const betweenImpacts = updateTrialRuntime(firstImpact, level, 0.18);
    expect(betweenImpacts.monsters[0].healthBarHp).toBe(30);
    expect(betweenImpacts.monsters[0].healthBarUpdateQueue?.[0]?.delaySec).toBeCloseTo(0.12);

    const secondImpact = updateTrialRuntime(betweenImpacts, level, 0.12);
    expect(secondImpact.monsters[0].hp).toBe(20);
    expect(secondImpact.monsters[0].healthBarHp).toBeUndefined();
    expect(secondImpact.monsters[0].healthBarUpdateQueue).toBeUndefined();
  });

  it('refreshes active hit shake when another queued impact arrives during the shake', () => {
    const level = testTrialLevel([monster({ monsterId: 'overlap-target', maxHp: 50 })]);
    const runtime = createTrialRuntime(level);
    const queuedRuntime = {
      ...runtime,
      monsters: [
        {
          ...runtime.monsters[0],
          monsterId: 'overlap-target',
          hp: 35,
          maxHp: 50,
          hitShakeDelaySec: 0.05,
          hitShakeQueueSec: [0.05, 0.1],
          hitShakeRemainingSec: 0,
          hitShakeDurationSec: 0.18,
        },
      ],
      projectiles: [],
      defeatedMonsterIds: [],
    };

    const firstImpact = updateTrialRuntime(queuedRuntime, level, 0.05);
    expect(firstImpact.monsters[0].hitShakeRemainingSec).toBeCloseTo(0.18);
    expect(firstImpact.monsters[0].hitShakeDelaySec).toBeCloseTo(0.05);

    const refreshed = updateTrialRuntime(firstImpact, level, 0.05);
    expect(refreshed.monsters[0]).toMatchObject({
      monsterId: 'overlap-target',
      hp: 35,
      maxHp: 50,
    });
    expect(refreshed.monsters[0].hitShakeDelaySec).toBeUndefined();
    expect(refreshed.monsters[0].hitShakeQueueSec).toBeUndefined();
    expect(refreshed.monsters[0].hitShakeRemainingSec).toBeCloseTo(0.18);
    expect(refreshed.projectiles).toEqual([]);
    expect(refreshed.defeatedMonsterIds).toEqual([]);
  });

  it('returns an invalid-swap animation trace for adjacent swaps that make no match', () => {
    const board = createBoardFromTileTypes([
      ['FIRE', 'ICE', 'EARTH'],
      ['LIGHTNING', 'EARTH', 'ICE'],
    ]);
    const level = testTrialLevel([monster({ monsterId: 'a', maxHp: 50 })], board);
    const runtime = createTrialRuntime(level);

    const result = processTrialSwap(
      board,
      runtime,
      level,
      { col: 0, row: 0 },
      { col: 1, row: 0 },
      new SeededRng(51),
    );

    expect(result.valid).toBe(false);
    expect(result.animationTrace?.kind).toBe('invalidSwap');
    expect(result.board).toBe(board);
    expect(result.runtime).toBe(runtime);
    expect(result.damageEvents).toEqual([]);
    expect(result.scoreDelta).toBe(0);
    expect(result.scoringStats.validSwapCount).toBe(0);
  });

  it('hard-rejects non-adjacent Trial swaps without an animation trace', () => {
    const board = createBoardFromTileTypes([['FIRE', 'ICE', 'EARTH']]);
    const level = testTrialLevel([monster({ monsterId: 'a', maxHp: 50 })], board);

    const result = processTrialSwap(
      board,
      createTrialRuntime(level),
      level,
      { col: 0, row: 0 },
      { col: 2, row: 0 },
      new SeededRng(52),
    );

    expect(result.valid).toBe(false);
    expect(result.animationTrace).toBeUndefined();
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
      castActivationDelaySec: TILE_SWAP_RETARGET_MS / 1000,
      activationDelaySec: TILE_SWAP_RETARGET_MS / 1000 + SPELL_CAST_WINDUP_SEC,
      remainingSec: SPELL_BOMB_PROJECTILE_VISUAL_MS / 1000,
      durationSec: SPELL_BOMB_PROJECTILE_VISUAL_MS / 1000,
    });
    expect(result.runtime.monsters[0]?.hitShakeDelaySec).toBeCloseTo(
      TILE_SWAP_RETARGET_MS / 1000 + SPELL_CAST_WINDUP_SEC + SPELL_BOMB_PROJECTILE_VISUAL_MS / 1000,
    );
    expect(result.runtime.monsters[0]?.hitShakeQueueSec?.[0]).toBeCloseTo(
      TILE_SWAP_RETARGET_MS / 1000 + SPELL_CAST_WINDUP_SEC + SPELL_BOMB_PROJECTILE_VISUAL_MS / 1000,
    );
    expect(result.runtime.monsters[0]?.healthBarUpdateQueue?.[0]?.delaySec).toBeCloseTo(
      TILE_SWAP_RETARGET_MS / 1000 + SPELL_CAST_WINDUP_SEC + SPELL_BOMB_PROJECTILE_VISUAL_MS / 1000,
    );
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
      TILE_SWAP_RETARGET_MS / 1000 + SPELL_CAST_WINDUP_SEC + SPELL_BOMB_PROJECTILE_VISUAL_MS / 1000,
    );
    expect(result.runtime.monsters[0].defeatAnimationRemainingSec).toBeUndefined();
    expect(result.runtime.monsters[0].healthBarHp).toBe(5);
    expect(result.runtime.monsters[0].healthBarUpdateQueue?.[0]).toMatchObject({ hp: 0 });
    expect(result.runtime.monsters[0].healthBarUpdateQueue?.[0]?.delaySec).toBeCloseTo(
      TILE_SWAP_RETARGET_MS / 1000 + SPELL_CAST_WINDUP_SEC + SPELL_BOMB_PROJECTILE_VISUAL_MS / 1000,
    );
    expect(result.runtime.monsters[0].iceFreezeDelayQueueSec).toBeUndefined();
    expect(result.runtime.monsters[0].hitShakeDelaySec).toBeCloseTo(
      TILE_SWAP_RETARGET_MS / 1000 + SPELL_CAST_WINDUP_SEC + SPELL_BOMB_PROJECTILE_VISUAL_MS / 1000,
    );
    expect(result.runtime.monsters[0].hitShakeQueueSec?.[0]).toBeCloseTo(
      TILE_SWAP_RETARGET_MS / 1000 + SPELL_CAST_WINDUP_SEC + SPELL_BOMB_PROJECTILE_VISUAL_MS / 1000,
    );
    expect(result.runtime.defeatedMonsterIds).toEqual([]);
    expect(result.runtime.result).toBe('playing');

    const impact = updateTrialRuntime(
      result.runtime,
      level,
      TILE_SWAP_RETARGET_MS / 1000 + SPELL_CAST_WINDUP_SEC + SPELL_BOMB_PROJECTILE_VISUAL_MS / 1000,
    );
    expect(impact.monsters[0].defeatAnimationRemainingSec).toBeCloseTo(KOBOLD_DEFEAT_ANIMATION_SEC);
    expect(impact.monsters[0].defeatFadeRemainingSec).toBeUndefined();
    expect(impact.monsters[0].healthBarHp).toBeUndefined();
    expect(impact.monsters[0].healthBarUpdateQueue).toBeUndefined();
    expect(impact.defeatedMonsterIds).toEqual([]);
  });

  it('expires active hit shake without changing monster gameplay state', () => {
    const level = testTrialLevel([monster({ monsterId: 'shaker', maxHp: 50 })]);
    const runtime = {
      ...createTrialRuntime(level),
      monsters: [
        {
          ...createTrialRuntime(level).monsters[0],
          monsterId: 'shaker',
          hp: 35,
          maxHp: 50,
          hitShakeRemainingSec: 0.05,
          hitShakeDurationSec: 0.18,
        },
      ],
      projectiles: [],
      defeatedMonsterIds: [],
    };

    const updated = updateTrialRuntime(runtime, level, 0.05);

    expect(updated.monsters[0]).toMatchObject({
      monsterId: 'shaker',
      hp: 35,
      maxHp: 50,
    });
    expect(updated.monsters[0].hitShakeRemainingSec).toBeUndefined();
    expect(updated.monsters[0].hitShakeDurationSec).toBeUndefined();
    expect(updated.projectiles).toEqual([]);
    expect(updated.defeatedMonsterIds).toEqual([]);
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
    expect(result.runtime.projectiles.find((projectile) => projectile.effectKind === 'bomb')?.castActivationDelaySec).toBeCloseTo(
      (TILE_SWAP_RETARGET_MS + 2 * ROCKET_SWEEP_CLEAR_STAGGER_MS) / 1000,
    );
    expect(result.runtime.projectiles.find((projectile) => projectile.effectKind === 'bomb')?.activationDelaySec).toBeCloseTo(
      (TILE_SWAP_RETARGET_MS + 2 * ROCKET_SWEEP_CLEAR_STAGGER_MS) / 1000 + SPELL_CAST_WINDUP_SEC,
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

  it('wins after the final defeated monster waits for the killing match projectile and defeat animation', () => {
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

    const defeatDelaySec = TILE_SWAP_RETARGET_MS / 1000 + SPELL_CAST_WINDUP_SEC + SPELL_MATCH_PROJECTILE_VISUAL_MS / 1000;
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
    expect(updated.monsters).toHaveLength(1);
    expect(updated.monsters[0].defeatAnimationRemainingSec).toBeCloseTo(KOBOLD_DEFEAT_ANIMATION_SEC);
    expect(updated.defeatedMonsterIds).toHaveLength(0);
    expect(updated.result).toBe('playing');

    const fading = updateTrialRuntime(updated, level, KOBOLD_DEFEAT_ANIMATION_SEC);
    expect(fading.monsters).toHaveLength(1);
    expect(fading.monsters[0].defeatFadeRemainingSec).toBeCloseTo(KOBOLD_DEFEAT_FADE_SEC);
    expect(fading.defeatedMonsterIds).toHaveLength(0);
    expect(fading.result).toBe('playing');

    const won = updateTrialRuntime(fading, level, KOBOLD_DEFEAT_FADE_SEC);
    expect(won.monsters).toHaveLength(0);
    expect(won.defeatedMonsterIds).toHaveLength(1);
    expect(won.result).toBe('won');
  });

  it('consumes large defeat updates across projectile impact wait, defeat animation, and fade', () => {
    const level = testTrialLevel([monster({ monsterId: 'large-dt-target' })]);
    const runtime = {
      ...createTrialRuntime(level),
      monsters: [
        {
          ...createTrialRuntime(level).monsters[0],
          monsterId: 'large-dt-target',
          hp: 0,
          defeatDelaySec: 0.2,
        },
      ],
      defeatedMonsterIds: [],
    };

    const fading = updateTrialRuntime(runtime, level, 0.2 + KOBOLD_DEFEAT_ANIMATION_SEC);

    expect(fading.monsters).toHaveLength(1);
    expect(fading.monsters[0].defeatFadeRemainingSec).toBeCloseTo(KOBOLD_DEFEAT_FADE_SEC);
    expect(fading.defeatedMonsterIds).toEqual([]);

    const updated = updateTrialRuntime(runtime, level, 0.2 + KOBOLD_DEFEAT_ANIMATION_SEC + KOBOLD_DEFEAT_FADE_SEC);

    expect(updated.monsters).toHaveLength(0);
    expect(updated.defeatedMonsterIds).toEqual(['large-dt-target']);
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

function iceMatchSwapBoard() {
  return createBoardFromTileTypes([
    ['ICE', 'FIRE', 'ICE'],
    ['FIRE', 'ICE', 'FIRE'],
    ['LIGHTNING', 'ICE', 'EARTH'],
  ]);
}

function lightningMatchSwapBoard() {
  return createBoardFromTileTypes([
    ['LIGHTNING', 'FIRE', 'LIGHTNING'],
    ['ICE', 'LIGHTNING', 'EARTH'],
    ['FIRE', 'ICE', 'EARTH'],
  ]);
}
