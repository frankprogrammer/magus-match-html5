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
  getTrialMonsterSpellHitWorldPosition,
  getTrialMonsterWorldPosition,
  getTrialSpellOriginWorldPosition,
  hasTrialMonsterReachedMage,
  processTrialPowerUpActivation,
  processTrialSwap,
  processTrialRocketActivation,
  selectNearestAliveMonster,
  EARTH_IMPACT_VFX_DURATION_SEC,
  FIRE_BURN_DURATION_SEC,
  FIRE_BURN_TICK_INTERVAL_SEC,
  KOBOLD_CLUB_NODE_NAMES,
  KOBOLD_DEFEAT_ANIMATION_SEC,
  KOBOLD_DEFEAT_FADE_SEC,
  KOBOLD_HEAD_NODE_NAMES,
  koboldModelVariantForMonster,
  LIGHTNING_CHAIN_HOP_DELAY_SEC,
  SPELL_CAST_WINDUP_SEC,
  TRIAL_MONSTER_BOTTOM_VISUAL_Y_OFFSET,
  TRIAL_MONSTER_TOP_VISUAL_Y_OFFSET,
  TRIAL_ICE_FREEZE_SEC,
  TRIAL_NEXT_MONSTER_SPAWN_PROGRESS_RATIO,
  trialMonsterSpellHitWorldYOffset,
  trialMonsterVisualWorldYOffset,
  updateTrialRuntime,
  updateTrialRuntimeWithEvents,
  visualYOffsetForSpawnIndex,
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

  it('assigns deterministic alternating visual y offsets to spawned Trial monsters by spawn order', () => {
    const baseLevel = testTrialLevel([
      monster({ monsterId: 'first' }),
      monster({ monsterId: 'second', laneId: 1, spawnTimeMs: 0 }),
      monster({ monsterId: 'third', laneId: 2, spawnTimeMs: 0 }),
      monster({ monsterId: 'fourth', laneId: 3, spawnTimeMs: 0 }),
    ]);
    const spawnX = baseLevel.trial.lanes[0]?.spawnX ?? 4.65;
    const level = {
      ...baseLevel,
      trial: {
        ...baseLevel.trial,
        lanes: [0, 1, 2, 3].map((laneId) => ({
          laneId,
          y: baseLevel.trial.laneY,
          spawnX,
        })),
      },
    };
    const spawnAllDueMonsters = () => {
      let runtime = createTrialRuntime(level);
      for (let index = 1; index < level.trial.waveManifest.length; index += 1) {
        runtime = updateTrialRuntime(runtime, level, 0);
      }
      return runtime;
    };
    const firstRuntime = spawnAllDueMonsters();
    const secondRuntime = spawnAllDueMonsters();

    expect(firstRuntime.monsters.map((monster) => monster.visualYOffset)).toEqual([
      TRIAL_MONSTER_TOP_VISUAL_Y_OFFSET,
      TRIAL_MONSTER_BOTTOM_VISUAL_Y_OFFSET,
      TRIAL_MONSTER_TOP_VISUAL_Y_OFFSET,
      TRIAL_MONSTER_BOTTOM_VISUAL_Y_OFFSET,
    ]);
    expect(firstRuntime.monsters.map((monster) => monster.visualYOffset)).toEqual(
      secondRuntime.monsters.map((monster) => monster.visualYOffset),
    );
    expect(visualYOffsetForSpawnIndex(0)).toBe(TRIAL_MONSTER_TOP_VISUAL_Y_OFFSET);
    expect(visualYOffsetForSpawnIndex(1)).toBe(TRIAL_MONSTER_BOTTOM_VISUAL_Y_OFFSET);
    expect(visualYOffsetForSpawnIndex(2)).toBe(TRIAL_MONSTER_TOP_VISUAL_Y_OFFSET);
  });

  it('assigns deterministic kobold model variants to spawned Trial monsters', () => {
    const level = testTrialLevel([monster({ monsterId: 'first' })]);
    const firstRuntime = createTrialRuntime(level);
    const secondRuntime = createTrialRuntime(level);
    const variant = firstRuntime.monsters[0].modelVariant;

    expect(variant).toEqual(koboldModelVariantForMonster(level.seed, 'first'));
    expect(variant).toEqual(secondRuntime.monsters[0].modelVariant);
    expect(KOBOLD_HEAD_NODE_NAMES).toContain(variant?.headNodeName);
    expect(KOBOLD_CLUB_NODE_NAMES).toContain(variant?.clubNodeName);
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
    const activeMonster = runtime.monsters[0];
    const monsterPosition = getTrialMonsterWorldPosition(level, activeMonster);
    const spellHitPosition = getTrialMonsterSpellHitWorldPosition(level, activeMonster);
    const spellOrigin = getTrialSpellOriginWorldPosition(level);

    expect(magePosition.x).toBe(level.trial.mageX);
    expect(magePosition.y).toBe(level.trial.laneY);
    expect(monsterPosition.x).toBeGreaterThan(magePosition.x);
    expect(monsterPosition.y).toBe(level.trial.laneY);
    expect(spellOrigin.x).toBeGreaterThan(magePosition.x);
    expect(spellOrigin.y).toBeGreaterThan(magePosition.y);
    expect(spellOrigin.z).toBeGreaterThan(magePosition.z);
    expect(spellHitPosition.x).toBe(monsterPosition.x);
    expect(spellHitPosition.y).toBeCloseTo(
      monsterPosition.y +
        trialMonsterVisualWorldYOffset(activeMonster.kind) +
        trialMonsterSpellHitWorldYOffset(activeMonster.kind) +
        (activeMonster.visualYOffset ?? 0),
    );
    expect(spellHitPosition.y).toBeGreaterThan(
      monsterPosition.y + trialMonsterVisualWorldYOffset(activeMonster.kind) + (activeMonster.visualYOffset ?? 0),
    );
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

  it('queues match damage until the projectile impact time', () => {
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
    expect(result.damageEvents).toEqual([]);
    expect(result.queuedAttackEvents.length).toBeGreaterThan(0);
    expect(result.runtime.pendingAttacks.length).toBe(result.queuedAttackEvents.length);
    expect(result.runtime.monsters[0]?.hp).toBe(50);
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
    expect(result.runtime.pendingAttacks[0]?.impactDelaySec).toBeCloseTo(hitDelaySec);
    expect(result.queuedAttackEvents[0]?.castActivationDelaySec).toBeCloseTo(TILE_SWAP_RETARGET_MS / 1000);
    expect(result.runtime.monsters[0]?.hitShakeRemainingSec).toBeUndefined();
    expect(result.runtime.monsters[0]?.healthBarHp).toBeUndefined();
    expect(result.runtime.monsters[0]?.healthBarUpdateQueue).toBeUndefined();
    expect(result.scoreDelta).toBe(0);

    const waiting = updateTrialRuntimeWithEvents(result.runtime, level, 0.08);
    expect(waiting.damageEvents).toEqual([]);
    expect(waiting.runtime.projectiles[0].castActivationDelaySec).toBeCloseTo(TILE_SWAP_RETARGET_MS / 1000 - 0.08);
    expect(waiting.runtime.projectiles[0].activationDelaySec).toBeCloseTo(
      TILE_SWAP_RETARGET_MS / 1000 + SPELL_CAST_WINDUP_SEC - 0.08,
    );
    expect(waiting.runtime.projectiles[0].remainingSec).toBeCloseTo(SPELL_MATCH_PROJECTILE_VISUAL_MS / 1000);
    expect(waiting.runtime.pendingAttacks[0]?.impactDelaySec).toBeCloseTo(hitDelaySec - 0.08);
    expect(waiting.runtime.monsters[0]?.hp).toBe(50);

    const impact = updateTrialRuntimeWithEvents(waiting.runtime, level, hitDelaySec - 0.08);
    expect(impact.damageEvents.length).toBeGreaterThan(0);
    expect(impact.damageEvents[0]).toMatchObject({
      monsterId: result.runtime.pendingAttacks[0]?.targetMonsterId,
      defeated: false,
      impactDelaySec: 0,
      castActivationDelaySec: 0,
    });
    expect(impact.scoreDelta).toBeGreaterThan(0);
    expect(impact.runtime.monsters[0]?.hitShakeDelaySec).toBeUndefined();
    expect(impact.runtime.monsters[0]?.hitShakeQueueSec).toBeUndefined();
    expect(impact.runtime.monsters[0]?.hitShakeRemainingSec).toBeCloseTo(0.18);
    expect(impact.runtime.monsters[0]?.hp).toBeLessThan(50);

    const updated = updateTrialRuntime(impact.runtime, level, 0.18);
    expect(updated.projectiles).toHaveLength(0);
    expect(updated.monsters[0]?.hitShakeRemainingSec ?? 0).toBeGreaterThanOrEqual(0);
    expect(updated.monsters[0]?.hp).toBeLessThan(50);
  });

  it.each([
    ['fire', fireOnlyMatchSwapBoard],
    ['ice', iceMatchSwapBoard],
    ['earth', earthMatchSwapBoard],
  ] as const)('aims %s match projectiles at the monster center hit point', (schoolId, createBoard) => {
    const board = createBoard();
    const level = testTrialLevel([monster({ maxHp: 80 })], board);
    const runtime = createTrialRuntime(level);

    const result = processTrialSwap(
      board,
      runtime,
      level,
      { col: 1, row: 0 },
      { col: 1, row: 1 },
      new SeededRng(99),
    );
    const projectile = result.runtime.projectiles.find((candidate) => candidate.schoolId === schoolId);

    expect(projectile).toMatchObject({
      schoolId,
      from: getTrialSpellOriginWorldPosition(level),
      to: getTrialMonsterSpellHitWorldPosition(level, runtime.monsters[0]),
    });
  });

  it('schedules equal fire burn ticks after a non-lethal fire hit', () => {
    const board = matchSwapBoard();
    const level = testTrialLevel([monster({ monsterId: 'burn-target', maxHp: 80 })], board);
    const runtime = createTrialRuntime(level);

    const result = processTrialSwap(
      board,
      runtime,
      level,
      { col: 1, row: 0 },
      { col: 1, row: 1 },
      new SeededRng(99),
    );
    const fireEvent = result.queuedAttackEvents.find((event) => event.schoolId === 'fire');
    const fireAttack = result.runtime.pendingAttacks.find((attack) => attack.schoolId === 'fire');

    expect(fireEvent).toBeDefined();
    expect(fireAttack).toBeDefined();
    expect(result.runtime.monsters[0]?.fireBurnStacks).toBeUndefined();

    const beforeImpact = updateTrialRuntimeWithEvents(
      result.runtime,
      level,
      (fireAttack?.impactDelaySec ?? 0) - 0.001,
    );
    expect(beforeImpact.damageEvents).toEqual([]);
    expect(beforeImpact.runtime.monsters[0]?.fireBurnStacks).toBeUndefined();

    const activated = updateTrialRuntimeWithEvents(beforeImpact.runtime, level, 0.001);
    const stack = activated.runtime.monsters[0]?.fireBurnStacks?.[0];
    expect(activated.damageEvents.find((event) => event.schoolId === 'fire')).toMatchObject({
      monsterId: 'burn-target',
      damage: fireEvent?.damage,
      defeated: false,
    });
    expect(stack).toMatchObject({
      burnId: 'burn-0',
      damage: fireEvent?.damage,
      activationDelaySec: 0,
      tickDelayQueueSec: [
        FIRE_BURN_TICK_INTERVAL_SEC,
        FIRE_BURN_TICK_INTERVAL_SEC * 2,
        FIRE_BURN_TICK_INTERVAL_SEC * 3,
        FIRE_BURN_DURATION_SEC,
      ],
      visualRemainingSec: FIRE_BURN_DURATION_SEC,
      visualDurationSec: FIRE_BURN_DURATION_SEC,
    });

    const tick = updateTrialRuntimeWithEvents(activated.runtime, level, FIRE_BURN_TICK_INTERVAL_SEC);

    expect(tick.damageEvents).toEqual([
      {
        monsterId: 'burn-target',
        schoolId: 'fire',
        damage: fireEvent?.damage,
        defeated: false,
        impactDelaySec: 0,
        castActivationDelaySec: 0,
      },
    ]);
    expect(tick.scoreDelta).toBe(Math.round((fireEvent?.damage ?? 0) * 2));
    expect(tick.runtime.monsters[0]?.hp).toBeCloseTo(
      (activated.runtime.monsters[0]?.hp ?? 0) - (fireEvent?.damage ?? 0),
    );
    expect(tick.runtime.monsters[0]?.fireBurnStacks?.[0]?.tickDelayQueueSec).toEqual([
      FIRE_BURN_TICK_INTERVAL_SEC,
      FIRE_BURN_TICK_INTERVAL_SEC * 2,
      FIRE_BURN_TICK_INTERVAL_SEC * 3,
    ]);
    expect(tick.runtime.monsters[0]?.fireBurnStacks?.[0]?.visualRemainingSec).toBeCloseTo(1.5);
  });

  it('keeps repeated fire burns as independent stacks that can tick together', () => {
    const board = matchSwapBoard();
    const level = testTrialLevel([monster({ monsterId: 'stack-target', maxHp: 100 })], board);
    const baseRuntime = createTrialRuntime(level);
    const activeMonster = baseRuntime.monsters[0];
    const runtime = {
      ...baseRuntime,
      monsters: [
        {
          ...activeMonster,
          monsterId: 'stack-target',
          hp: 100,
          maxHp: 100,
          fireBurnStacks: [
            {
              burnId: 'burn-a',
              damage: 10,
              tickDelayQueueSec: [0.5, 1.0],
              visualRemainingSec: 2.0,
              visualDurationSec: 2.0,
            },
            {
              burnId: 'burn-b',
              damage: 7,
              tickDelayQueueSec: [0.5],
              visualRemainingSec: 1.5,
              visualDurationSec: 2.0,
            },
          ],
        },
      ],
    };

    const tick = updateTrialRuntimeWithEvents(runtime, level, 0.5);

    expect(tick.damageEvents.map((event) => event.damage)).toEqual([10, 7]);
    expect(tick.runtime.monsters[0]?.hp).toBe(83);
    expect(tick.runtime.monsters[0]?.fireBurnStacks).toMatchObject([
      { burnId: 'burn-a', tickDelayQueueSec: [0.5] },
      { burnId: 'burn-b', tickDelayQueueSec: [] },
    ]);
  });

  it('does not create burn stacks for non-fire damage and lets burn ticks defeat the final monster', () => {
    const iceBoard = iceMatchSwapBoard();
    const iceLevel = testTrialLevel([monster({ monsterId: 'ice-target', maxHp: 80 })], iceBoard);
    const iceResult = processTrialSwap(
      iceBoard,
      createTrialRuntime(iceLevel),
      iceLevel,
      { col: 1, row: 0 },
      { col: 1, row: 1 },
      new SeededRng(99),
    );

    expect(iceResult.queuedAttackEvents.some((event) => event.schoolId === 'ice')).toBe(true);
    expect(iceResult.runtime.monsters[0]?.fireBurnStacks).toBeUndefined();

    const fireBoard = matchSwapBoard();
    const fireLevel = testTrialLevel([monster({ monsterId: 'last-burn-target', maxHp: 15, scoreValue: 11 })], fireBoard);
    const runtime = createTrialRuntime(fireLevel);
    const activeMonster = runtime.monsters[0];
    const burningRuntime = {
      ...runtime,
      nextSpawnIndex: fireLevel.trial.waveManifest.length,
      monsters: [
        {
          ...activeMonster,
          hp: 5,
          maxHp: 15,
          fireBurnStacks: [
            {
              burnId: 'burn-lethal',
              damage: 10,
              tickDelayQueueSec: [0.5],
              visualRemainingSec: 2,
              visualDurationSec: 2,
            },
          ],
        },
      ],
    };

    const lethalTick = updateTrialRuntimeWithEvents(burningRuntime, fireLevel, 0.5);
    expect(lethalTick.damageEvents).toMatchObject([
      {
        monsterId: 'last-burn-target',
        schoolId: 'fire',
        damage: 5,
        defeated: true,
      },
    ]);
    expect(lethalTick.scoreDelta).toBe(Math.round(5 * 2) + 11);
    expect(lethalTick.runtime.monsters[0]?.hp).toBe(0);
    expect(lethalTick.runtime.monsters[0]?.healthBarHp).toBeUndefined();
    expect(lethalTick.runtime.monsters[0]?.healthBarUpdateQueue).toBeUndefined();
    expect(lethalTick.runtime.monsters[0]?.defeatAnimationRemainingSec).toBeCloseTo(
      KOBOLD_DEFEAT_ANIMATION_SEC - 0.5,
    );

    const won = updateTrialRuntime(
      lethalTick.runtime,
      fireLevel,
      KOBOLD_DEFEAT_ANIMATION_SEC + KOBOLD_DEFEAT_FADE_SEC,
    );
    expect(won.result).toBe('won');
  });

  it('schedules one-shot earth impact VFX at visual hit timing', () => {
    const board = earthMatchSwapBoard();
    const level = testTrialLevel([monster({ monsterId: 'earth-target', maxHp: 80 })], board);
    const runtime = createTrialRuntime(level);

    const result = processTrialSwap(
      board,
      runtime,
      level,
      { col: 1, row: 0 },
      { col: 1, row: 1 },
      new SeededRng(99),
    );
    const earthEvent = result.queuedAttackEvents.find((event) => event.schoolId === 'earth');
    const earthAttack = result.runtime.pendingAttacks.find((attack) => attack.schoolId === 'earth');

    expect(earthEvent).toBeDefined();
    expect(earthAttack).toBeDefined();
    expect(result.runtime.impactVfx).toBeUndefined();

    const beforeImpact = updateTrialRuntime(result.runtime, level, (earthAttack?.impactDelaySec ?? 0) - 0.001);
    expect(beforeImpact.impactVfx).toBeUndefined();

    const active = updateTrialRuntime(beforeImpact, level, 0.001);
    const vfx = active.impactVfx?.[0];
    expect(vfx).toMatchObject({
      vfxId: 'earth-impact-0',
      schoolId: 'earth',
      targetMonsterId: 'earth-target',
      hitWorldPosition: getTrialMonsterSpellHitWorldPosition(level, beforeImpact.monsters[0]),
      activationDelaySec: 0,
      remainingSec: EARTH_IMPACT_VFX_DURATION_SEC,
      durationSec: EARTH_IMPACT_VFX_DURATION_SEC,
    });

    const expired = updateTrialRuntime(active, level, EARTH_IMPACT_VFX_DURATION_SEC);
    expect(expired.impactVfx).toBeUndefined();
  });

  it('does not schedule earth impact VFX for non-earth damage', () => {
    const board = fireOnlyMatchSwapBoard();
    const level = testTrialLevel([monster({ monsterId: 'ice-target', maxHp: 80 })], board);

    const result = processTrialSwap(
      board,
      createTrialRuntime(level),
      level,
      { col: 1, row: 0 },
      { col: 1, row: 1 },
      new SeededRng(99),
    );

    expect(result.queuedAttackEvents.some((event) => event.schoolId === 'fire')).toBe(true);
    expect(result.runtime.impactVfx).toBeUndefined();
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
        {
          ...activeMonster,
          monsterId: 'first',
          hp: 30,
          maxHp: 30,
          x: level.trial.mageX + 3,
          visualYOffset: TRIAL_MONSTER_TOP_VISUAL_Y_OFFSET,
        },
        {
          ...activeMonster,
          monsterId: 'second',
          hp: 30,
          maxHp: 30,
          x: level.trial.mageX + 4,
          visualYOffset: TRIAL_MONSTER_BOTTOM_VISUAL_Y_OFFSET,
        },
        {
          ...activeMonster,
          monsterId: 'third',
          hp: 30,
          maxHp: 30,
          x: level.trial.mageX + 5,
          visualYOffset: TRIAL_MONSTER_TOP_VISUAL_Y_OFFSET,
        },
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
    const lightningEvents = result.queuedAttackEvents.filter((event) => event.schoolId === 'lightning');
    const lightningProjectiles = result.runtime.projectiles.filter((projectile) => projectile.schoolId === 'lightning');
    const firstHitPoint = getTrialMonsterSpellHitWorldPosition(level, runtime.monsters[0]);
    const secondHitPoint = getTrialMonsterSpellHitWorldPosition(level, runtime.monsters[1]);
    const thirdHitPoint = getTrialMonsterSpellHitWorldPosition(level, runtime.monsters[2]);
    const firstImpactDelaySec =
      TILE_SWAP_RETARGET_MS / 1000 + SPELL_CAST_WINDUP_SEC + SPELL_MATCH_PROJECTILE_VISUAL_MS / 1000;

    expect(result.valid).toBe(true);
    expect(lightningEvents.map((event) => event.monsterId)).toEqual(['first', 'second', 'third']);
    expect(lightningEvents.map((event) => event.damage)).toEqual([10, 10, 10]);
    expect(result.runtime.pendingAttacks[0]?.impactDelaySec).toBeCloseTo(firstImpactDelaySec);
    expect(result.runtime.pendingAttacks[1]?.impactDelaySec).toBeCloseTo(firstImpactDelaySec + LIGHTNING_CHAIN_HOP_DELAY_SEC);
    expect(result.runtime.pendingAttacks[2]?.impactDelaySec).toBeCloseTo(firstImpactDelaySec + LIGHTNING_CHAIN_HOP_DELAY_SEC * 2);
    expect(result.runtime.monsters.map((target) => ({ id: target.monsterId, hp: target.hp }))).toEqual([
      { id: 'first', hp: 30 },
      { id: 'second', hp: 30 },
      { id: 'third', hp: 30 },
    ]);
    expect(lightningProjectiles).toHaveLength(3);
    expect(lightningProjectiles[0]).toMatchObject({
      originKind: 'mage',
      from: getTrialSpellOriginWorldPosition(level),
      to: firstHitPoint,
    });
    expect(lightningProjectiles[1]).toMatchObject({
      originKind: 'world',
      from: firstHitPoint,
      to: secondHitPoint,
      chargeDurationSec: 0,
    });
    expect(lightningProjectiles[2]).toMatchObject({
      originKind: 'world',
      from: secondHitPoint,
      to: thirdHitPoint,
      chargeDurationSec: 0,
    });
    expect(lightningProjectiles[1]?.from.y).not.toBeCloseTo(lightningProjectiles[1]?.to.y ?? 0);

    const firstImpact = updateTrialRuntimeWithEvents(result.runtime, level, firstImpactDelaySec);
    expect(firstImpact.runtime.projectiles.find((projectile) => projectile.attackId === 'trial-attack-1')).toMatchObject({
      originKind: 'world',
      from: firstHitPoint,
    });
    expect(firstImpact.runtime.pendingAttacks).toHaveLength(2);
    const remainingImpacts = updateTrialRuntimeWithEvents(
      firstImpact.runtime,
      level,
      LIGHTNING_CHAIN_HOP_DELAY_SEC * 2 + 0.001,
    );
    const impactEvents = [
      ...firstImpact.damageEvents,
      ...remainingImpacts.damageEvents,
    ].filter((event) => event.schoolId === 'lightning');

    expect(impactEvents.map((event) => event.monsterId)).toEqual(['first', 'second', 'third']);
    expect(impactEvents.map((event) => event.damage)).toEqual([10, 10, 10]);
    expect(remainingImpacts.runtime.monsters.map((target) => ({ id: target.monsterId, hp: target.hp }))).toEqual([
      { id: 'first', hp: 20 },
      { id: 'second', hp: 20 },
      { id: 'third', hp: 20 },
    ]);

    const stacked = processTrialSwap(
      board,
      remainingImpacts.runtime,
      level,
      { col: 1, row: 0 },
      { col: 1, row: 1 },
      new SeededRng(100),
    );

    const stackedFirstImpactDelaySec = stacked.runtime.pendingAttacks[0]?.impactDelaySec ?? 0;
    const stackedFirstImpact = updateTrialRuntimeWithEvents(stacked.runtime, level, stackedFirstImpactDelaySec);
    const stackedRemainingImpacts = updateTrialRuntimeWithEvents(
      stackedFirstImpact.runtime,
      level,
      LIGHTNING_CHAIN_HOP_DELAY_SEC * 2 + 0.001,
    );
    expect([
      ...stackedFirstImpact.damageEvents,
      ...stackedRemainingImpacts.damageEvents,
    ].filter((event) => event.schoolId === 'lightning')).toHaveLength(3);
    expect(stackedRemainingImpacts.runtime.monsters.map((target) => target.hp)).toEqual([10, 10, 10]);
  });

  it('retargets lightning chain visuals to the next living enemy hit point', () => {
    const level = testTrialLevel([
      monster({ monsterId: 'first', maxHp: 5 }),
      monster({ monsterId: 'second', maxHp: 30 }),
      monster({ monsterId: 'third', maxHp: 30 }),
    ]);
    const baseRuntime = createTrialRuntime(level);
    const first = {
      ...baseRuntime.monsters[0],
      monsterId: 'first',
      hp: 5,
      maxHp: 5,
      x: level.trial.mageX + 3,
      visualYOffset: TRIAL_MONSTER_TOP_VISUAL_Y_OFFSET,
    };
    const second = {
      ...baseRuntime.monsters[0],
      monsterId: 'second',
      hp: 30,
      maxHp: 30,
      x: level.trial.mageX + 4,
      visualYOffset: TRIAL_MONSTER_BOTTOM_VISUAL_Y_OFFSET,
    };
    const third = {
      ...baseRuntime.monsters[0],
      monsterId: 'third',
      hp: 30,
      maxHp: 30,
      x: level.trial.mageX + 5,
      visualYOffset: TRIAL_MONSTER_TOP_VISUAL_Y_OFFSET,
    };
    const firstHitPoint = getTrialMonsterSpellHitWorldPosition(level, first);
    const secondHitPoint = getTrialMonsterSpellHitWorldPosition(level, second);
    const runtime = {
      ...baseRuntime,
      nextSpawnIndex: level.trial.waveManifest.length,
      monsters: [first, second, third],
      pendingAttacks: [
        {
          attackId: 'trial-attack-0',
          schoolId: 'lightning' as const,
          effectKind: 'match' as const,
          damage: 10,
          targetMonsterId: 'first',
          impactDelaySec: 0.1,
          castActivationDelaySec: 0,
          projectileId: 'trial-0',
          chainId: 'chain-test',
          chainIndex: 0,
        },
        {
          attackId: 'trial-attack-1',
          schoolId: 'lightning' as const,
          effectKind: 'match' as const,
          damage: 10,
          targetMonsterId: 'first',
          impactDelaySec: 0.3,
          castActivationDelaySec: 0,
          projectileId: 'trial-1',
          chainId: 'chain-test',
          chainIndex: 1,
          originAttackId: 'trial-attack-0',
        },
      ],
      projectiles: [
        {
          ...testProjectile('trial-0', 'trial-attack-0', 'lightning', first, level, 0, 0.1),
          to: firstHitPoint,
        },
        {
          ...testProjectile('trial-1', 'trial-attack-1', 'lightning', first, level, 0.2, 0.1),
          originKind: 'world' as const,
          from: { x: 99, y: 99, z: 99 },
          to: firstHitPoint,
        },
      ],
    };

    const impact = updateTrialRuntimeWithEvents(runtime, level, 0.1);
    const retargetedProjectile = impact.runtime.projectiles.find((projectile) => projectile.projectileId === 'trial-1');

    expect(impact.damageEvents).toMatchObject([
      { monsterId: 'first', schoolId: 'lightning', damage: 5, defeated: true },
    ]);
    expect(impact.runtime.pendingAttacks).toMatchObject([
      {
        attackId: 'trial-attack-1',
        targetMonsterId: 'second',
        excludedMonsterIds: ['first'],
      },
    ]);
    expect(retargetedProjectile).toMatchObject({
      originKind: 'world',
      targetMonsterId: 'second',
      from: firstHitPoint,
      to: secondHitPoint,
    });
    expect(retargetedProjectile?.from.y).not.toBeCloseTo(retargetedProjectile?.to.y ?? 0);
  });

  it('retargets future queued attacks and projectiles after their target dies', () => {
    const level = testTrialLevel([
      monster({ monsterId: 'first', maxHp: 5 }),
      monster({ monsterId: 'second', maxHp: 30 }),
    ]);
    const baseRuntime = createTrialRuntime(level);
    const first = { ...baseRuntime.monsters[0], monsterId: 'first', hp: 5, maxHp: 5, x: level.trial.mageX + 3 };
    const second = { ...baseRuntime.monsters[0], monsterId: 'second', hp: 30, maxHp: 30, x: level.trial.mageX + 4 };
    const runtime = {
      ...baseRuntime,
      nextSpawnIndex: level.trial.waveManifest.length,
      monsters: [first, second],
      pendingAttacks: [
        {
          attackId: 'trial-attack-0',
          schoolId: 'fire' as const,
          effectKind: 'match' as const,
          damage: 10,
          targetMonsterId: 'first',
          impactDelaySec: 0.1,
          castActivationDelaySec: 0,
          projectileId: 'trial-0',
        },
        {
          attackId: 'trial-attack-1',
          schoolId: 'ice' as const,
          effectKind: 'match' as const,
          damage: 10,
          targetMonsterId: 'first',
          impactDelaySec: 0.3,
          castActivationDelaySec: 0,
          projectileId: 'trial-1',
        },
      ],
      projectiles: [
        testProjectile('trial-0', 'trial-attack-0', 'fire', first, level, 0, 0.1),
        testProjectile('trial-1', 'trial-attack-1', 'ice', first, level, 0.2, 0.1),
      ],
    };

    const impact = updateTrialRuntimeWithEvents(runtime, level, 0.1);

    expect(impact.damageEvents).toMatchObject([
      { monsterId: 'first', schoolId: 'fire', damage: 5, defeated: true },
    ]);
    expect(impact.runtime.monsters.map((target) => ({ id: target.monsterId, hp: target.hp }))).toEqual([
      { id: 'first', hp: 0 },
      { id: 'second', hp: 30 },
    ]);
    expect(impact.runtime.pendingAttacks).toMatchObject([
      { attackId: 'trial-attack-1', targetMonsterId: 'second' },
    ]);
    expect(impact.runtime.projectiles.find((projectile) => projectile.projectileId === 'trial-1')).toMatchObject({
      targetMonsterId: 'second',
      to: getTrialMonsterSpellHitWorldPosition(level, second),
    });
  });

  it('cancels future queued attacks and projectiles when no living target remains', () => {
    const level = testTrialLevel([monster({ monsterId: 'only', maxHp: 5 })]);
    const baseRuntime = createTrialRuntime(level);
    const only = { ...baseRuntime.monsters[0], monsterId: 'only', hp: 5, maxHp: 5, x: level.trial.mageX + 3 };
    const runtime = {
      ...baseRuntime,
      nextSpawnIndex: level.trial.waveManifest.length,
      monsters: [only],
      pendingAttacks: [
        {
          attackId: 'trial-attack-0',
          schoolId: 'fire' as const,
          effectKind: 'match' as const,
          damage: 10,
          targetMonsterId: 'only',
          impactDelaySec: 0.1,
          castActivationDelaySec: 0,
          projectileId: 'trial-0',
        },
        {
          attackId: 'trial-attack-1',
          schoolId: 'earth' as const,
          effectKind: 'match' as const,
          damage: 10,
          targetMonsterId: 'only',
          impactDelaySec: 0.3,
          castActivationDelaySec: 0,
          projectileId: 'trial-1',
        },
      ],
      projectiles: [
        testProjectile('trial-0', 'trial-attack-0', 'fire', only, level, 0, 0.1),
        testProjectile('trial-1', 'trial-attack-1', 'earth', only, level, 0.2, 0.1),
      ],
    };

    const impact = updateTrialRuntimeWithEvents(runtime, level, 0.1);

    expect(impact.damageEvents).toMatchObject([
      { monsterId: 'only', schoolId: 'fire', damage: 5, defeated: true },
    ]);
    expect(impact.runtime.pendingAttacks).toEqual([]);
    expect(impact.runtime.projectiles).toEqual([]);
  });

  it('retargets queued attacks when a fire burn tick kills their target', () => {
    const level = testTrialLevel([
      monster({ monsterId: 'burned', maxHp: 5 }),
      monster({ monsterId: 'next', maxHp: 30 }),
    ]);
    const baseRuntime = createTrialRuntime(level);
    const burned = {
      ...baseRuntime.monsters[0],
      monsterId: 'burned',
      hp: 5,
      maxHp: 5,
      x: level.trial.mageX + 3,
      fireBurnStacks: [
        {
          burnId: 'burn-kill',
          damage: 10,
          tickDelayQueueSec: [0.5],
          visualRemainingSec: 1,
          visualDurationSec: 2,
        },
      ],
    };
    const next = { ...baseRuntime.monsters[0], monsterId: 'next', hp: 30, maxHp: 30, x: level.trial.mageX + 4 };
    const runtime = {
      ...baseRuntime,
      nextSpawnIndex: level.trial.waveManifest.length,
      monsters: [burned, next],
      pendingAttacks: [
        {
          attackId: 'trial-attack-0',
          schoolId: 'earth' as const,
          effectKind: 'match' as const,
          damage: 10,
          targetMonsterId: 'burned',
          impactDelaySec: 0.8,
          castActivationDelaySec: 0,
          projectileId: 'trial-0',
        },
      ],
      projectiles: [testProjectile('trial-0', 'trial-attack-0', 'earth', burned, level, 0.7, 0.1)],
    };

    const tick = updateTrialRuntimeWithEvents(runtime, level, 0.5);

    expect(tick.damageEvents).toMatchObject([
      { monsterId: 'burned', schoolId: 'fire', damage: 5, defeated: true },
    ]);
    expect(tick.runtime.pendingAttacks).toMatchObject([
      { attackId: 'trial-attack-0', targetMonsterId: 'next' },
    ]);
    expect(tick.runtime.projectiles[0]).toMatchObject({
      targetMonsterId: 'next',
      to: getTrialMonsterSpellHitWorldPosition(level, next),
    });
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
    expect(result.queuedAttackEvents.some((event) => event.schoolId === 'ice')).toBe(true);
    expect(result.runtime.monsters[0].hp).toBe(50);
    expect(result.runtime.monsters[0].iceFreezeRemainingSec).toBeUndefined();
    const impactDelaySec = result.runtime.pendingAttacks.find((attack) => attack.schoolId === 'ice')?.impactDelaySec ?? 0;
    expect(impactDelaySec).toBeGreaterThan(0);

    const beforeImpact = updateTrialRuntime(result.runtime, level, impactDelaySec - 0.001);
    expect(beforeImpact.monsters[0].iceFreezeRemainingSec).toBeUndefined();
    expect(beforeImpact.monsters[0].x).toBeLessThan(result.runtime.monsters[0].x);

    const impact = updateTrialRuntime(beforeImpact, level, 0.002);
    const frozenX = impact.monsters[0].x;
    expect(impact.monsters[0].iceFreezeRemainingSec).toBeCloseTo(TRIAL_ICE_FREEZE_SEC);
    expect(impact.monsters[0].iceFreezeDelayQueueSec).toBeUndefined();
    expect(impact.monsters[0].x).toBeCloseTo(beforeImpact.monsters[0].x);

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
    expect(result.runtime.monsters[0]).toMatchObject({ monsterId: 'ice-lethal', hp: 5 });
    const impact = updateTrialRuntimeWithEvents(
      result.runtime,
      level,
      result.runtime.pendingAttacks.find((attack) => attack.schoolId === 'ice')?.impactDelaySec ?? 0,
    );
    expect(impact.damageEvents[0]).toMatchObject({ monsterId: 'ice-lethal', defeated: true });
    expect(impact.runtime.monsters[0]).toMatchObject({ monsterId: 'ice-lethal', hp: 0 });
    expect(impact.runtime.monsters[0].iceFreezeDelayQueueSec).toBeUndefined();
    expect(impact.runtime.monsters[0].iceFreezeRemainingSec).toBeUndefined();
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
    expect(result.queuedAttackEvents.length).toBeGreaterThanOrEqual(3);
    expect(result.queuedAttackEvents.slice(0, 3).every((event) => event.schoolId === 'earth')).toBe(true);
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
    expect(result.queuedAttackEvents.length).toBeGreaterThanOrEqual(3);
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
    expect(result.queuedAttackEvents.length).toBeGreaterThanOrEqual(5);
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
    expect(result.runtime.pendingAttacks[0]?.impactDelaySec).toBeCloseTo(
      TILE_SWAP_RETARGET_MS / 1000 + SPELL_CAST_WINDUP_SEC + SPELL_BOMB_PROJECTILE_VISUAL_MS / 1000,
    );
    expect(result.runtime.monsters[0]?.hitShakeDelaySec).toBeUndefined();
    expect(result.runtime.monsters[0]?.healthBarUpdateQueue).toBeUndefined();
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
    expect(result.damageEvents).toEqual([]);
    expect(result.queuedAttackEvents).toHaveLength(5);
    expect(result.runtime.monsters).toHaveLength(1);
    expect(result.runtime.monsters[0]).toMatchObject({
      monsterId: 'bomb-target',
      hp: 5,
    });
    expect(result.runtime.pendingAttacks[0]?.impactDelaySec).toBeCloseTo(
      TILE_SWAP_RETARGET_MS / 1000 + SPELL_CAST_WINDUP_SEC + SPELL_BOMB_PROJECTILE_VISUAL_MS / 1000,
    );
    expect(result.runtime.monsters[0].defeatAnimationRemainingSec).toBeUndefined();
    expect(result.runtime.monsters[0].healthBarHp).toBeUndefined();
    expect(result.runtime.monsters[0].healthBarUpdateQueue).toBeUndefined();
    expect(result.runtime.monsters[0].iceFreezeDelayQueueSec).toBeUndefined();
    expect(result.runtime.monsters[0].hitShakeDelaySec).toBeUndefined();
    expect(result.runtime.monsters[0].hitShakeQueueSec).toBeUndefined();
    expect(result.runtime.defeatedMonsterIds).toEqual([]);
    expect(result.runtime.result).toBe('playing');

    const impact = updateTrialRuntimeWithEvents(
      result.runtime,
      level,
      TILE_SWAP_RETARGET_MS / 1000 + SPELL_CAST_WINDUP_SEC + SPELL_BOMB_PROJECTILE_VISUAL_MS / 1000,
    );
    expect(impact.damageEvents).toEqual([
      {
        monsterId: 'bomb-target',
        schoolId: 'fire',
        damage: 5,
        defeated: true,
        impactDelaySec: 0,
        castActivationDelaySec: 0,
      },
    ]);
    expect(impact.runtime.monsters[0].defeatAnimationRemainingSec).toBeCloseTo(KOBOLD_DEFEAT_ANIMATION_SEC);
    expect(impact.runtime.monsters[0].defeatFadeRemainingSec).toBeUndefined();
    expect(impact.runtime.monsters[0].healthBarHp).toBeUndefined();
    expect(impact.runtime.monsters[0].healthBarUpdateQueue).toBeUndefined();
    expect(impact.runtime.pendingAttacks).toEqual([]);
    expect(impact.runtime.projectiles).toEqual([]);
    expect(impact.runtime.defeatedMonsterIds).toEqual([]);
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
    expect(result.queuedAttackEvents.length).toBeGreaterThan(0);
    expect(result.queuedAttackEvents.every((event) => event.schoolId === 'ice')).toBe(true);
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
    expect(result.queuedAttackEvents[0]?.schoolId).toBe('earth');
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
    expect(result.queuedAttackEvents.length).toBeGreaterThanOrEqual(8);
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
      hp: 5,
    });
    expect(result.runtime.pendingAttacks[0]?.impactDelaySec).toBeCloseTo(defeatDelaySec);
    expect(result.runtime.defeatedMonsterIds).toEqual([]);
    expect(result.runtime.result).toBe('playing');

    const waiting = updateTrialRuntime(result.runtime, level, defeatDelaySec - 0.001);
    expect(waiting.monsters).toHaveLength(1);
    expect(waiting.monsters[0].hp).toBe(5);
    expect(waiting.result).toBe('playing');

    const updated = updateTrialRuntime(waiting, level, 0.001);
    expect(updated.monsters).toHaveLength(1);
    expect(updated.monsters[0].hp).toBe(0);
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

function testProjectile(
  projectileId: string,
  attackId: string,
  schoolId: 'fire' | 'ice' | 'lightning' | 'earth',
  target: ReturnType<typeof createTrialRuntime>['monsters'][number],
  level: GeneratedTrialLevel,
  activationDelaySec: number,
  remainingSec: number,
) {
  return {
    projectileId,
    attackId,
    targetMonsterId: target.monsterId,
    schoolId,
    effectKind: 'match' as const,
    originKind: 'mage' as const,
    from: getTrialSpellOriginWorldPosition(level),
    to: getTrialMonsterSpellHitWorldPosition(level, target),
    castActivationDelaySec: 0,
    activationDelaySec,
    chargeDurationSec: 0,
    remainingSec,
    durationSec: remainingSec,
  };
}

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

function fireOnlyMatchSwapBoard() {
  return createBoardFromTileTypes([
    ['FIRE', 'ICE', 'FIRE'],
    ['ICE', 'FIRE', 'ICE'],
    ['LIGHTNING', 'FIRE', 'ICE'],
  ]);
}

function iceMatchSwapBoard() {
  return createBoardFromTileTypes([
    ['ICE', 'EARTH', 'ICE'],
    ['EARTH', 'ICE', 'EARTH'],
    ['LIGHTNING', 'ICE', 'EARTH'],
  ]);
}

function earthMatchSwapBoard() {
  return createBoardFromTileTypes([
    ['EARTH', 'ICE', 'EARTH'],
    ['ICE', 'EARTH', 'ICE'],
    ['LIGHTNING', 'EARTH', 'FIRE'],
  ]);
}

function lightningMatchSwapBoard() {
  return createBoardFromTileTypes([
    ['LIGHTNING', 'FIRE', 'LIGHTNING'],
    ['ICE', 'LIGHTNING', 'EARTH'],
    ['FIRE', 'ICE', 'EARTH'],
  ]);
}
