import type { Board } from '../board/Board';
import {
  buildBoardAnimationCascadeStep,
  createBoardAnimationTrace,
  createInvalidSwapAnimationTrace,
  type BoardAnimationTrace,
  type BoardAnimationTraceOptions,
} from '../board/BoardAnimationTrace';
import { getBoardAnimationStepTimings } from '../board/BoardAnimationTiming';
import {
  cloneBoard,
  coordKey,
  createBoardScopedTileIdFactory,
  getCell,
  swapTilesInPlace,
} from '../board/Board';
import { validateSwap } from '../board/BoardRules';
import { resolveCascades, settleBoardWithVoidAwareRefill, type CascadeResult } from '../board/Cascade';
import type { MatchGroup } from '../board/MatchDetection';
import {
  isTapActivatablePowerUpTileType,
  resolvePowerUpChain,
  selectLightballTapTargetType,
  type PowerUpChainDetonation,
  type PowerUpDetonation,
  type PowerUpChainResolution,
} from '../board/PowerUps';
import {
  isMatchableTileType,
  isPowerUpTileType,
  isStandardTileType,
  type MatchableTileType,
  type PowerUpTileType,
  type StandardTileType,
  type TileType,
} from '../board/TileTypes';
import type { CellCoord } from '../core/Layout';
import type { SeededRng } from '../core/Rng';
import type { LevelResult, Vec3Data } from '../core/Types';
import { SPELL_BOMB_PROJECTILE_VISUAL_MS, SPELL_MATCH_PROJECTILE_VISUAL_MS } from '../data/tuning';
import { createSwapScoringStats, EMPTY_SWAP_SCORING_STATS, type SwapScoringStats } from '../run/Scoring';
import { getTrialMonsterContactRadius } from './TrialGenerator';
import type { GeneratedTrialLevel, TrialMonsterKind, TrialMonsterManifestEntry } from './TrialGenerator';

export type SpellSchoolId = 'fire' | 'ice' | 'lightning' | 'earth';

const TRIAL_DEFEAT_TIMER_EPSILON_SEC = 0.000001;
const TRIAL_HIT_SHAKE_DURATION_SEC = 0.18;
export const TRIAL_NEXT_MONSTER_SPAWN_PROGRESS_RATIO = 0.4;
export const TRIAL_MONSTER_TOP_VISUAL_Y_OFFSET = 0.16;
export const TRIAL_MONSTER_BOTTOM_VISUAL_Y_OFFSET = -1.41;
export const TRIAL_KOBOLD_VISUAL_WORLD_Y_OFFSET = -1.49;
export const TRIAL_TALL_KOBOLD_VISUAL_WORLD_Y_OFFSET = -1.63;
export const TRIAL_MINI_BOSS_VISUAL_WORLD_Y_OFFSET = -2.28;
export const TRIAL_KOBOLD_SPELL_HIT_WORLD_Y_OFFSET = 1.74;
export const TRIAL_TALL_KOBOLD_SPELL_HIT_WORLD_Y_OFFSET = 1.74;
export const TRIAL_MINI_BOSS_SPELL_HIT_WORLD_Y_OFFSET = 3.045;
export const SPELL_CAST_WINDUP_SEC = 0.5;
export const KOBOLD_DEFEAT_ANIMATION_SEC = 1.0;
export const KOBOLD_DEFEAT_FADE_SEC = 0.15;
export const TRIAL_ICE_FREEZE_SEC = 1.5;
export const LIGHTNING_CHAIN_HOP_DELAY_SEC = 0.12;
export const FIRE_BURN_TICK_INTERVAL_SEC = 0.5;
export const FIRE_BURN_TICK_COUNT = 4;
export const FIRE_BURN_DURATION_SEC = FIRE_BURN_TICK_INTERVAL_SEC * FIRE_BURN_TICK_COUNT;
export const EARTH_IMPACT_SPRITE_FPS = 12;
export const EARTH_IMPACT_SPRITE_FRAME_COUNT = 4;
export const EARTH_IMPACT_VFX_DURATION_SEC = EARTH_IMPACT_SPRITE_FRAME_COUNT / EARTH_IMPACT_SPRITE_FPS;
export const KOBOLD_HEAD_NODE_NAMES = ['k.head-1', 'k.head-2', 'k.head-3'] as const;
export const KOBOLD_CLUB_NODE_NAMES = ['k.club-1', 'k.club-2', 'k.club-3'] as const;

export type KoboldHeadNodeName = (typeof KOBOLD_HEAD_NODE_NAMES)[number];
export type KoboldClubNodeName = (typeof KOBOLD_CLUB_NODE_NAMES)[number];

export interface TrialMonsterModelVariant {
  headNodeName: KoboldHeadNodeName;
  clubNodeName: KoboldClubNodeName;
}

export interface TrialFireBurnStack {
  burnId: string;
  damage: number;
  activationDelaySec?: number;
  tickDelayQueueSec: readonly number[];
  visualRemainingSec: number;
  visualDurationSec: number;
}

export interface ActiveTrialMonster {
  monsterId: string;
  kind: TrialMonsterKind;
  laneId: number;
  hp: number;
  maxHp: number;
  x: number;
  spawnTimeMs: number;
  walkSpeed: number;
  scoreValue: number;
  visualYOffset?: number;
  modelVariant?: TrialMonsterModelVariant;
  defeatDelaySec?: number;
  defeatAnimationRemainingSec?: number;
  defeatAnimationDurationSec?: number;
  defeatFadeRemainingSec?: number;
  defeatFadeDurationSec?: number;
  hitShakeDelaySec?: number;
  hitShakeQueueSec?: readonly number[];
  hitShakeRemainingSec?: number;
  hitShakeDurationSec?: number;
  healthBarHp?: number;
  healthBarUpdateQueue?: readonly TrialHealthBarUpdate[];
  iceFreezeRemainingSec?: number;
  iceFreezeDurationSec?: number;
  iceFreezeDelayQueueSec?: readonly number[];
  fireBurnStacks?: readonly TrialFireBurnStack[];
}

export interface TrialHealthBarUpdate {
  delaySec: number;
  hp: number;
}

export interface TrialProjectileRuntimeState {
  projectileId: string;
  attackId?: string;
  targetMonsterId?: string;
  schoolId: SpellSchoolId;
  effectKind: 'match' | 'bomb';
  originKind?: 'mage' | 'world';
  from: Vec3Data;
  to: Vec3Data;
  castActivationDelaySec: number;
  activationDelaySec: number;
  chargeDurationSec: number;
  remainingSec: number;
  durationSec: number;
}

export interface TrialPendingAttackRuntimeState {
  attackId: string;
  schoolId: SpellSchoolId;
  effectKind: TrialProjectileRuntimeState['effectKind'];
  damage: number;
  targetMonsterId: string;
  impactDelaySec: number;
  castActivationDelaySec: number;
  projectileId?: string;
  chainId?: string;
  chainIndex?: number;
  originAttackId?: string;
  excludedMonsterIds?: readonly string[];
}

export interface TrialImpactVfxRuntimeState {
  vfxId: string;
  schoolId: 'earth';
  targetMonsterId: string;
  hitWorldPosition: Vec3Data;
  activationDelaySec: number;
  remainingSec: number;
  durationSec: number;
}

export interface TrialRuntimeState {
  elapsedMs: number;
  nextSpawnIndex: number;
  monsters: readonly ActiveTrialMonster[];
  projectiles: readonly TrialProjectileRuntimeState[];
  pendingAttacks: readonly TrialPendingAttackRuntimeState[];
  impactVfx?: readonly TrialImpactVfxRuntimeState[];
  defeatedMonsterIds: readonly string[];
  totalMonsters: number;
  result: LevelResult;
  nextProjectileIndex: number;
  nextAttackIndex: number;
  nextBurnIndex: number;
  nextImpactVfxIndex?: number;
}

export interface TrialDamageEvent {
  monsterId: string;
  schoolId: SpellSchoolId;
  damage: number;
  defeated: boolean;
  /** Seconds from swap resolution until projectile hits (matches shake / HP bar). */
  impactDelaySec: number;
  /** Seconds until cast / match attack should read visually (attack SFX start). */
  castActivationDelaySec: number;
}

export interface TrialQueuedAttackEvent {
  attackId: string;
  monsterId: string;
  schoolId: SpellSchoolId;
  damage: number;
  castActivationDelaySec: number;
}

export interface TrialSwapResult {
  valid: boolean;
  board: Board;
  runtime: TrialRuntimeState;
  scoreDelta: number;
  damageEvents: readonly TrialDamageEvent[];
  queuedAttackEvents: readonly TrialQueuedAttackEvent[];
  scoringStats: SwapScoringStats;
  powerUpsUsed: number;
  animationTrace?: BoardAnimationTrace;
}

export interface TrialRuntimeUpdateResult {
  runtime: TrialRuntimeState;
  scoreDelta: number;
  damageEvents: readonly TrialDamageEvent[];
}

export interface TrialRuntimeUpdateOptions {
  monsterWalkSpeedMultiplier?: number;
}

interface TrialDamageSource {
  schoolId: SpellSchoolId;
  effectKind: TrialProjectileRuntimeState['effectKind'];
  damage: number;
  shotCount: number;
  visualShotCount: number;
  castActivationDelaySec: number;
  durationSec: number;
}

interface PowerUpActivation {
  originAfterSwap: CellCoord;
  powerUpType: PowerUpTileType;
  targetType?: MatchableTileType;
}

interface TrialPowerUpBoardResolution {
  cascadeResult: CascadeResult;
  detonations: readonly PowerUpChainDetonation[];
  animationTrace?: BoardAnimationTrace;
}

export function createTrialRuntime(level: GeneratedTrialLevel): TrialRuntimeState {
  return spawnDueMonsters(
    {
      elapsedMs: 0,
      nextSpawnIndex: 0,
      monsters: [],
      projectiles: [],
      pendingAttacks: [],
      defeatedMonsterIds: [],
      totalMonsters: level.trial.waveManifest.length,
      result: 'playing',
      nextProjectileIndex: 0,
      nextAttackIndex: 0,
      nextBurnIndex: 0,
      nextImpactVfxIndex: 0,
    },
    level,
  );
}

export function updateTrialRuntime(
  runtime: TrialRuntimeState,
  level: GeneratedTrialLevel,
  dtSec: number,
  options: TrialRuntimeUpdateOptions = {},
): TrialRuntimeState {
  return updateTrialRuntimeWithEvents(runtime, level, dtSec, options).runtime;
}

export function updateTrialRuntimeWithEvents(
  runtime: TrialRuntimeState,
  level: GeneratedTrialLevel,
  dtSec: number,
  options: TrialRuntimeUpdateOptions = {},
): TrialRuntimeUpdateResult {
  if (runtime.result !== 'playing') {
    return {
      runtime: expireProjectiles(runtime, dtSec),
      scoreDelta: 0,
      damageEvents: [],
    };
  }

  const elapsedMs = runtime.elapsedMs + Math.max(0, dtSec) * 1000;
  const elapsedSec = Math.max(0, dtSec);
  const monsterWalkSpeedMultiplier = Math.max(0, options.monsterWalkSpeedMultiplier ?? 1);
  const visualRuntime = expireProjectiles(runtime, elapsedSec);
  const burnResult = advanceFireBurns(visualRuntime, elapsedSec);
  const burnCleanupRuntime = retargetOrCancelPendingAttacksForDeadTargets(burnResult.runtime, level);
  const shakeRuntime = advanceHitShakes(burnCleanupRuntime, elapsedSec);
  const healthBarRuntime = advanceHealthBarUpdates(shakeRuntime, elapsedSec);
  const freezeRuntime = advanceIceFreezes(healthBarRuntime, elapsedSec);
  const defeatRuntime = advancePendingDefeats(freezeRuntime, elapsedSec);
  const pendingAttackResult = advancePendingAttacks(defeatRuntime, level, elapsedSec);
  const movedRuntime = {
    ...pendingAttackResult.runtime,
    elapsedMs,
    monsters: pendingAttackResult.runtime.monsters.map((monster) =>
      monster.hp > 0 && (monster.iceFreezeRemainingSec ?? 0) <= 0
        ? {
            ...monster,
            x:
              monster.x -
              monster.walkSpeed *
                movementElapsedSecForTrialMonster(
                  healthBarRuntime.monsters.find((candidate) => candidate.monsterId === monster.monsterId) ?? monster,
                  elapsedSec,
                ) *
                  monsterWalkSpeedMultiplier,
          }
        : monster,
    ),
  };
  const spawnedRuntime = spawnDueMonsters(movedRuntime, level);
  const result = getTrialResult(spawnedRuntime, level);

  return {
    runtime: {
      ...spawnedRuntime,
      result,
    },
    scoreDelta: burnResult.scoreDelta + pendingAttackResult.scoreDelta,
    damageEvents: [...burnResult.damageEvents, ...pendingAttackResult.damageEvents],
  };
}

function movementElapsedSecForTrialMonster(monster: ActiveTrialMonster, elapsedSec: number): number {
  if ((monster.iceFreezeRemainingSec ?? 0) > TRIAL_DEFEAT_TIMER_EPSILON_SEC) {
    return 0;
  }

  const nextFreezeDelaySec = monster.iceFreezeDelayQueueSec?.[0];
  if (nextFreezeDelaySec != null && nextFreezeDelaySec <= elapsedSec) {
    return Math.max(0, nextFreezeDelaySec);
  }

  return elapsedSec;
}

export function updateTrialVisuals(runtime: TrialRuntimeState, dtSec: number): TrialRuntimeState {
  return expireProjectiles(runtime, dtSec);
}

export function processTrialSwap(
  board: Board,
  runtime: TrialRuntimeState,
  level: GeneratedTrialLevel,
  from: CellCoord,
  to: CellCoord,
  rng: SeededRng,
): TrialSwapResult {
  if (runtime.result !== 'playing') {
    return invalidTrialSwap(board, runtime);
  }

  const validation = validateSwap(board, from, to);
  if (!validation.valid) {
    if (validation.reason === 'noMatch') {
      return invalidTrialSwap(board, runtime, createInvalidSwapAnimationTrace(board, from, to, 0));
    }

    return invalidTrialSwap(board, runtime);
  }

  const powerUpActivation = getPowerUpActivation(board, from, to);
  const preSwapBoard = cloneBoard(board);
  const swappedBoard = cloneBoard(board);
  swapTilesInPlace(swappedBoard, from, to);
  const postSwapBoard = cloneBoard(swappedBoard);

  const nextTileId = createBoardScopedTileIdFactory(swappedBoard, 'trial-cascade-tile');
  const damageSources: TrialDamageSource[] = [];
  let powerUpsUsed = 0;
  let cascadeResult: CascadeResult;
  let animationTrace: BoardAnimationTrace | undefined;

  if (powerUpActivation != null) {
    const powerUpResolution = resolveTrialPowerUpBoard(
      swappedBoard,
      rng,
      nextTileId,
      powerUpActivation.originAfterSwap,
      {
        revisionId: 0,
        preSwapBoard,
        postSwapBoard,
        swappedCells: { from, to },
      },
      powerUpActivation.targetType,
    );
    powerUpsUsed = powerUpResolution.detonations.length;
    const chainStepPopStartSec = getTraceStepPopStartSec(powerUpResolution.animationTrace, 0);
    damageSources.push(
      ...powerUpResolution.detonations.map((entry, index) =>
        powerUpDamageSource(level, entry, chainStepPopStartSec, index === 0 ? powerUpActivation.targetType : undefined),
      ),
    );
    cascadeResult = powerUpResolution.cascadeResult;
    animationTrace = powerUpResolution.animationTrace;
  } else {
    cascadeResult = resolveCascades(swappedBoard, rng, {
      preferredSpawnCell: to,
      nextTileId,
      animation: {
        revisionId: 0,
        preSwapBoard,
        postSwapBoard,
        swappedCells: { from, to },
      },
    });
    animationTrace = cascadeResult.animationTrace;
  }

  damageSources.push(...cascadeDamageSources(level, cascadeResult, animationTrace, powerUpActivation == null ? 0 : 1));
  const damageApplication = applyDamageSources(runtime, level, damageSources);
  const matchCount = cascadeResult.steps.reduce((sum, step) => sum + step.matches.length, 0);
  const powerUpsCreated = cascadeResult.steps.reduce((sum, step) => sum + step.spawnedPowerUps.length, 0);

  return {
    valid: true,
    board: cascadeResult.board,
    runtime: damageApplication.runtime,
    scoreDelta: damageApplication.scoreDelta,
    damageEvents: damageApplication.damageEvents,
    queuedAttackEvents: damageApplication.queuedAttackEvents,
    scoringStats: createSwapScoringStats(matchCount, powerUpsCreated),
    powerUpsUsed,
    animationTrace,
  };
}

export function processTrialPowerUpActivation(
  board: Board,
  runtime: TrialRuntimeState,
  level: GeneratedTrialLevel,
  origin: CellCoord,
  rng: SeededRng,
): TrialSwapResult {
  const tapActivation = getTapPowerUpActivation(board, origin);
  if (runtime.result !== 'playing' || tapActivation == null) {
    return invalidTrialSwap(board, runtime);
  }

  const nextTileId = createBoardScopedTileIdFactory(board, 'trial-powerup-cascade-tile');
  const powerUpResolution = resolveTrialPowerUpBoard(board, rng, nextTileId, origin, {
    revisionId: 0,
    preSwapBoard: board,
    postSwapBoard: board,
    swappedCells: null,
  }, tapActivation.targetType);
  const chainStepPopStartSec = getTraceStepPopStartSec(powerUpResolution.animationTrace, 0);
  const damageSources = [
    ...powerUpResolution.detonations.map((entry, index) =>
      powerUpDamageSource(level, entry, chainStepPopStartSec, index === 0 ? tapActivation.targetType : undefined),
    ),
    ...cascadeDamageSources(level, powerUpResolution.cascadeResult, powerUpResolution.animationTrace, 1),
  ];
  const damageApplication = applyDamageSources(runtime, level, damageSources);
  const matchCount = 1 + powerUpResolution.cascadeResult.steps.reduce((sum, step) => sum + step.matches.length, 0);
  const powerUpsCreated = powerUpResolution.cascadeResult.steps.reduce(
    (sum, step) => sum + step.spawnedPowerUps.length,
    0,
  );

  return {
    valid: true,
    board: powerUpResolution.cascadeResult.board,
    runtime: damageApplication.runtime,
    scoreDelta: damageApplication.scoreDelta,
    damageEvents: damageApplication.damageEvents,
    queuedAttackEvents: damageApplication.queuedAttackEvents,
    scoringStats: createSwapScoringStats(matchCount, powerUpsCreated),
    powerUpsUsed: powerUpResolution.detonations.length,
    animationTrace: powerUpResolution.animationTrace,
  };
}

export function processTrialRocketActivation(
  board: Board,
  runtime: TrialRuntimeState,
  level: GeneratedTrialLevel,
  origin: CellCoord,
  rng: SeededRng,
): TrialSwapResult {
  return processTrialPowerUpActivation(board, runtime, level, origin, rng);
}

export function selectNearestAliveMonster(
  runtime: TrialRuntimeState,
  level: GeneratedTrialLevel,
): ActiveTrialMonster | null {
  const monsters = aliveMonstersByTargetOrder(runtime, level);
  if (monsters.length === 0) {
    return null;
  }

  return monsters[0];
}

function aliveMonstersByTargetOrder(
  runtime: Pick<TrialRuntimeState, 'monsters'>,
  level: GeneratedTrialLevel,
): ActiveTrialMonster[] {
  return runtime.monsters.filter((monster) => monster.hp > 0).sort((first, second) => {
    const firstDistance = Math.abs(first.x - level.trial.mageX);
    const secondDistance = Math.abs(second.x - level.trial.mageX);
    return (
      firstDistance - secondDistance ||
      first.monsterId.localeCompare(second.monsterId)
    );
  });
}

export function damageMultiplierForMatch(match: MatchGroup): number {
  switch (match.shape) {
    case 'basic':
      return match.tiles.length >= 4 ? 2 : 1;
    case 'rocketH':
    case 'rocketV':
      return 2;
    case 'lightball':
      return 3;
    case 'tnt':
      return 2.5;
  }
}

export function getTrialMonsterWorldPosition(
  level: GeneratedTrialLevel,
  monster: ActiveTrialMonster,
): Vec3Data {
  return {
    x: monster.x,
    y: getLaneY(level, monster.laneId),
    z: zForMonsterKind(monster.kind),
  };
}

export function trialMonsterVisualWorldYOffset(kind: TrialMonsterKind): number {
  switch (kind) {
    case 'kobold':
      return TRIAL_KOBOLD_VISUAL_WORLD_Y_OFFSET;
    case 'tallKobold':
      return TRIAL_TALL_KOBOLD_VISUAL_WORLD_Y_OFFSET;
    case 'miniBoss':
      return TRIAL_MINI_BOSS_VISUAL_WORLD_Y_OFFSET;
  }
}

export function trialMonsterSpellHitWorldYOffset(kind: TrialMonsterKind): number {
  switch (kind) {
    case 'kobold':
      return TRIAL_KOBOLD_SPELL_HIT_WORLD_Y_OFFSET;
    case 'tallKobold':
      return TRIAL_TALL_KOBOLD_SPELL_HIT_WORLD_Y_OFFSET;
    case 'miniBoss':
      return TRIAL_MINI_BOSS_SPELL_HIT_WORLD_Y_OFFSET;
  }
}

export function trialMonsterLightningHitWorldYOffset(kind: TrialMonsterKind): number {
  return trialMonsterSpellHitWorldYOffset(kind);
}

export function getTrialMonsterSpellHitWorldPosition(
  level: GeneratedTrialLevel,
  monster: ActiveTrialMonster,
): Vec3Data {
  const basePosition = getTrialMonsterWorldPosition(level, monster);
  return {
    ...basePosition,
    y:
      basePosition.y +
      trialMonsterVisualWorldYOffset(monster.kind) +
      trialMonsterSpellHitWorldYOffset(monster.kind) +
      (monster.visualYOffset ?? 0),
  };
}

export function getTrialMonsterLightningHitWorldPosition(
  level: GeneratedTrialLevel,
  monster: ActiveTrialMonster,
): Vec3Data {
  return getTrialMonsterSpellHitWorldPosition(level, monster);
}

export function getTrialMageWorldPosition(level: GeneratedTrialLevel): Vec3Data {
  return {
    x: level.trial.mageX,
    y: level.trial.laneY,
    z: 0.55,
  };
}

export function getTrialSpellOriginWorldPosition(level: GeneratedTrialLevel): Vec3Data {
  const magePosition = getTrialMageWorldPosition(level);
  return {
    x: magePosition.x + 0.55,
    y: magePosition.y + 0.95,
    z: magePosition.z + 0.05,
  };
}

function applyDamageSources(
  runtime: TrialRuntimeState,
  level: GeneratedTrialLevel,
  sources: readonly TrialDamageSource[],
): {
  runtime: TrialRuntimeState;
  scoreDelta: number;
  damageEvents: TrialDamageEvent[];
  queuedAttackEvents: TrialQueuedAttackEvent[];
} {
  let nextRuntime: TrialRuntimeState = {
    ...runtime,
    monsters: runtime.monsters.map((monster) => cloneActiveTrialMonster(monster)),
    projectiles: runtime.projectiles.map((projectile) => ({ ...projectile })),
    pendingAttacks: runtime.pendingAttacks.map((attack) => clonePendingAttack(attack)),
    impactVfx: runtime.impactVfx?.map((vfx) => ({ ...vfx, hitWorldPosition: { ...vfx.hitWorldPosition } })),
    defeatedMonsterIds: [...runtime.defeatedMonsterIds],
  };
  const queuedAttackEvents: TrialQueuedAttackEvent[] = [];

  for (const source of sources) {
    if (source.schoolId === 'lightning') {
      const targets = aliveMonstersByTargetOrder(nextRuntime, level);
      const projectiles: TrialProjectileRuntimeState[] = [];
      const pendingAttacks: TrialPendingAttackRuntimeState[] = [];
      const chainId = `chain-${nextRuntime.nextAttackIndex}`;
      let previousTarget: ActiveTrialMonster | null = null;
      let previousAttackId: string | undefined;
      const excludedMonsterIds: string[] = [];

      for (const [chainIndex, target] of targets.entries()) {
        const currentTarget = nextRuntime.monsters.find((monster) => monster.monsterId === target.monsterId);
        if (currentTarget == null) {
          continue;
        }

        const chainDelaySec = chainIndex * LIGHTNING_CHAIN_HOP_DELAY_SEC;
        const projectileActivationDelaySec = source.castActivationDelaySec + SPELL_CAST_WINDUP_SEC + chainDelaySec;
        const impactDelaySec = projectileActivationDelaySec + source.durationSec;
        const attackIndex = nextRuntime.nextAttackIndex + pendingAttacks.length;
        const projectileIndex = nextRuntime.nextProjectileIndex + projectiles.length;
        const attackId = `trial-attack-${attackIndex}`;
        const projectileId = `trial-${projectileIndex}`;
        const projectile = createProjectile(
          projectileIndex,
          level,
          source,
          currentTarget,
          {
            attackId,
            originKind: previousTarget == null ? 'mage' : 'world',
            from:
              previousTarget == null
                ? getTrialSpellOriginWorldPosition(level)
                : getTrialMonsterSpellHitWorldPosition(level, previousTarget),
            castActivationDelaySec: source.castActivationDelaySec + chainDelaySec,
            activationDelaySec: projectileActivationDelaySec,
            chargeDurationSec: previousTarget == null ? SPELL_CAST_WINDUP_SEC : 0,
          },
        );
        const pendingAttack = createPendingAttack(attackIndex, source, currentTarget, {
          attackId,
          projectileId,
          impactDelaySec,
          castActivationDelaySec: source.castActivationDelaySec + chainDelaySec,
          chainId,
          chainIndex,
          originAttackId: previousAttackId,
          excludedMonsterIds,
        });

        pendingAttacks.push(pendingAttack);
        projectiles.push(projectile);
        queuedAttackEvents.push({
          attackId,
          monsterId: currentTarget.monsterId,
          schoolId: source.schoolId,
          damage: source.damage,
          castActivationDelaySec: source.castActivationDelaySec + chainDelaySec,
        });
        previousTarget = target;
        previousAttackId = attackId;
        excludedMonsterIds.push(currentTarget.monsterId);
      }

      if (pendingAttacks.length > 0) {
        nextRuntime = {
          ...nextRuntime,
          projectiles: [...nextRuntime.projectiles, ...projectiles],
          pendingAttacks: [...nextRuntime.pendingAttacks, ...pendingAttacks],
          nextProjectileIndex: nextRuntime.nextProjectileIndex + projectiles.length,
          nextAttackIndex: nextRuntime.nextAttackIndex + pendingAttacks.length,
        };
      }

      continue;
    }

    for (let shotIndex = 0; shotIndex < source.shotCount; shotIndex += 1) {
      const target = selectNearestAliveMonster(nextRuntime, level);
      if (target == null) {
        continue;
      }

      const impactDelaySec = source.castActivationDelaySec + SPELL_CAST_WINDUP_SEC + source.durationSec;
      const attackIndex = nextRuntime.nextAttackIndex;
      const attackId = `trial-attack-${attackIndex}`;
      const projectileIndex = nextRuntime.nextProjectileIndex;
      const projectileId = shotIndex < source.visualShotCount ? `trial-${projectileIndex}` : undefined;
      const projectile = shotIndex < source.visualShotCount
        ? createProjectile(projectileIndex, level, source, target, {
            attackId,
            originKind: 'mage',
            from: getTrialSpellOriginWorldPosition(level),
            castActivationDelaySec: source.castActivationDelaySec,
            activationDelaySec: source.castActivationDelaySec + SPELL_CAST_WINDUP_SEC,
            chargeDurationSec: SPELL_CAST_WINDUP_SEC,
          })
        : null;
      const pendingAttack = createPendingAttack(attackIndex, source, target, {
        attackId,
        projectileId,
        impactDelaySec,
        castActivationDelaySec: source.castActivationDelaySec,
      });

      nextRuntime = {
        ...nextRuntime,
        projectiles: projectile == null ? nextRuntime.projectiles : [...nextRuntime.projectiles, projectile],
        pendingAttacks: [...nextRuntime.pendingAttacks, pendingAttack],
        nextProjectileIndex: projectile == null ? nextRuntime.nextProjectileIndex : nextRuntime.nextProjectileIndex + 1,
        nextAttackIndex: nextRuntime.nextAttackIndex + 1,
      };

      queuedAttackEvents.push({
        attackId,
        monsterId: target.monsterId,
        schoolId: source.schoolId,
        damage: source.damage,
        castActivationDelaySec: source.castActivationDelaySec,
      });
    }
  }

  return {
    runtime: {
      ...nextRuntime,
      result: getTrialResult(nextRuntime, level),
    },
    scoreDelta: 0,
    damageEvents: [],
    queuedAttackEvents,
  };
}

function cloneActiveTrialMonster(monster: ActiveTrialMonster): ActiveTrialMonster {
  return {
    ...monster,
    hitShakeQueueSec: monster.hitShakeQueueSec == null ? undefined : [...monster.hitShakeQueueSec],
    healthBarUpdateQueue: monster.healthBarUpdateQueue == null
      ? undefined
      : monster.healthBarUpdateQueue.map((update) => ({ ...update })),
    iceFreezeDelayQueueSec: monster.iceFreezeDelayQueueSec == null ? undefined : [...monster.iceFreezeDelayQueueSec],
    fireBurnStacks: monster.fireBurnStacks == null
      ? undefined
      : monster.fireBurnStacks.map((stack) => cloneFireBurnStack(stack)),
  };
}

function clonePendingAttack(attack: TrialPendingAttackRuntimeState): TrialPendingAttackRuntimeState {
  return {
    ...attack,
    excludedMonsterIds: attack.excludedMonsterIds == null ? undefined : [...attack.excludedMonsterIds],
  };
}

function cloneFireBurnStack(stack: TrialFireBurnStack): TrialFireBurnStack {
  return {
    ...stack,
    tickDelayQueueSec: [...stack.tickDelayQueueSec],
  };
}

function createPendingAttack(
  attackIndex: number,
  source: TrialDamageSource,
  target: ActiveTrialMonster,
  options: {
    attackId?: string;
    projectileId?: string;
    impactDelaySec: number;
    castActivationDelaySec: number;
    chainId?: string;
    chainIndex?: number;
    originAttackId?: string;
    excludedMonsterIds?: readonly string[];
  },
): TrialPendingAttackRuntimeState {
  return {
    attackId: options.attackId ?? `trial-attack-${attackIndex}`,
    schoolId: source.schoolId,
    effectKind: source.effectKind,
    damage: source.damage,
    targetMonsterId: target.monsterId,
    impactDelaySec: Math.max(0, options.impactDelaySec),
    castActivationDelaySec: Math.max(0, options.castActivationDelaySec),
    projectileId: options.projectileId,
    chainId: options.chainId,
    chainIndex: options.chainIndex,
    originAttackId: options.originAttackId,
    excludedMonsterIds: options.excludedMonsterIds == null ? undefined : [...options.excludedMonsterIds],
  };
}

function createFireBurnStack(burnIndex: number, damage: number, activationDelaySec: number): TrialFireBurnStack {
  return {
    burnId: `burn-${burnIndex}`,
    damage,
    activationDelaySec: Math.max(0, activationDelaySec),
    tickDelayQueueSec: Array.from(
      { length: FIRE_BURN_TICK_COUNT },
      (_value, index) => (index + 1) * FIRE_BURN_TICK_INTERVAL_SEC,
    ),
    visualRemainingSec: FIRE_BURN_DURATION_SEC,
    visualDurationSec: FIRE_BURN_DURATION_SEC,
  };
}

function createEarthImpactVfx(
  impactVfxIndex: number,
  level: GeneratedTrialLevel,
  target: ActiveTrialMonster,
  activationDelaySec: number,
): TrialImpactVfxRuntimeState {
  return {
    vfxId: `earth-impact-${impactVfxIndex}`,
    schoolId: 'earth',
    targetMonsterId: target.monsterId,
    hitWorldPosition: getTrialMonsterSpellHitWorldPosition(level, target),
    activationDelaySec: Math.max(0, activationDelaySec),
    remainingSec: EARTH_IMPACT_VFX_DURATION_SEC,
    durationSec: EARTH_IMPACT_VFX_DURATION_SEC,
  };
}

function advanceFireBurns(
  runtime: TrialRuntimeState,
  dtSec: number,
): { runtime: TrialRuntimeState; scoreDelta: number; damageEvents: TrialDamageEvent[] } {
  const elapsed = Math.max(0, dtSec);
  if (elapsed <= 0) {
    return { runtime, scoreDelta: 0, damageEvents: [] };
  }

  let scoreDelta = 0;
  const damageEvents: TrialDamageEvent[] = [];
  const monsters = runtime.monsters.map((monster) => {
    const stacks = monster.fireBurnStacks ?? [];
    if (stacks.length <= 0 || monster.hp <= 0) {
      return monster.hp <= 0 && stacks.length > 0
        ? { ...monster, fireBurnStacks: undefined }
        : monster;
    }

    let nextMonster: ActiveTrialMonster = { ...monster };
    const keptStacks: TrialFireBurnStack[] = [];

    for (const stack of stacks) {
      const activationDelaySec = stack.activationDelaySec ?? 0;
      const activeElapsedSec = Math.max(0, elapsed - activationDelaySec);
      const nextActivationDelaySec = Math.max(0, activationDelaySec - elapsed);
      if (nextActivationDelaySec > TRIAL_DEFEAT_TIMER_EPSILON_SEC) {
        keptStacks.push({
          ...stack,
          activationDelaySec: nextActivationDelaySec,
        });
        continue;
      }

      const advancedDelays = stack.tickDelayQueueSec
        .map((delaySec) => delaySec - activeElapsedSec)
        .sort((first, second) => first - second);
      const dueTickCount = advancedDelays.filter((delaySec) => delaySec <= TRIAL_DEFEAT_TIMER_EPSILON_SEC).length;
      const futureDelays = advancedDelays.filter((delaySec) => delaySec > TRIAL_DEFEAT_TIMER_EPSILON_SEC);
      const visualRemainingSec = Math.max(0, stack.visualRemainingSec - activeElapsedSec);

      for (let tickIndex = 0; tickIndex < dueTickCount && nextMonster.hp > 0; tickIndex += 1) {
        const damage = Math.min(nextMonster.hp, stack.damage);
        const nextHp = Math.max(0, nextMonster.hp - stack.damage);
        const defeated = nextHp <= 0;

        nextMonster = {
          ...nextMonster,
          hp: nextHp,
          defeatDelaySec: defeated ? 0 : nextMonster.defeatDelaySec,
          ...scheduleHitShake(nextMonster, 0),
          ...scheduleHealthBarUpdate(nextMonster, 0, nextHp),
        };
        scoreDelta += Math.round(damage * 2) + (defeated ? nextMonster.scoreValue : 0);
        damageEvents.push({
          monsterId: nextMonster.monsterId,
          schoolId: 'fire',
          damage,
          defeated,
          impactDelaySec: 0,
          castActivationDelaySec: 0,
        });
      }

      if (nextMonster.hp <= 0) {
        break;
      }

      if (futureDelays.length > 0 || visualRemainingSec > TRIAL_DEFEAT_TIMER_EPSILON_SEC) {
        keptStacks.push({
          ...stack,
          activationDelaySec: undefined,
          tickDelayQueueSec: futureDelays,
          visualRemainingSec,
        });
      }
    }

    return {
      ...nextMonster,
      fireBurnStacks: nextMonster.hp > 0 && keptStacks.length > 0 ? keptStacks : undefined,
    };
  });

  return {
    runtime: {
      ...runtime,
      monsters,
    },
    scoreDelta,
    damageEvents,
  };
}

function advancePendingAttacks(
  runtime: TrialRuntimeState,
  level: GeneratedTrialLevel,
  dtSec: number,
): { runtime: TrialRuntimeState; scoreDelta: number; damageEvents: TrialDamageEvent[] } {
  const elapsed = Math.max(0, dtSec);
  if (runtime.pendingAttacks.length <= 0) {
    return { runtime, scoreDelta: 0, damageEvents: [] };
  }

  let workingRuntime: TrialRuntimeState = {
    ...runtime,
    projectiles: runtime.projectiles.map((projectile) => ({ ...projectile })),
    pendingAttacks: [],
  };
  let futureAttacks: TrialPendingAttackRuntimeState[] = [];
  const resolvedLightningChainOrigins = new Map<string, { monsterId: string; position: Vec3Data }>();
  let scoreDelta = 0;
  const damageEvents: TrialDamageEvent[] = [];
  const advancedAttacks = runtime.pendingAttacks
    .map((attack) => ({
      ...clonePendingAttack(attack),
      impactDelaySec: attack.impactDelaySec - elapsed,
    }))
    .sort(comparePendingAttacks);

  for (const attack of advancedAttacks) {
    workingRuntime = { ...workingRuntime, pendingAttacks: futureAttacks };
    const chainOriginResult = applyResolvedLightningChainOriginToPendingAttack(
      workingRuntime,
      attack,
      resolvedLightningChainOrigins,
    );
    workingRuntime = chainOriginResult.runtime;
    const chainAwareAttack = chainOriginResult.attack;

    if (chainAwareAttack.impactDelaySec > TRIAL_DEFEAT_TIMER_EPSILON_SEC) {
      const futureTarget = resolveTargetForPendingAttack(workingRuntime, level, chainAwareAttack);
      if (futureTarget == null) {
        workingRuntime = removePendingAttackProjectile(workingRuntime, chainAwareAttack);
        futureAttacks = [...workingRuntime.pendingAttacks];
        continue;
      }

      const futureAttack =
        futureTarget.monsterId === chainAwareAttack.targetMonsterId
          ? chainAwareAttack
          : {
              ...chainAwareAttack,
              targetMonsterId: futureTarget.monsterId,
            };
      if (futureTarget.monsterId !== chainAwareAttack.targetMonsterId) {
        workingRuntime = retargetPendingAttackProjectile(workingRuntime, level, futureAttack, futureTarget);
      }

      futureAttacks.push(futureAttack);
      workingRuntime = { ...workingRuntime, pendingAttacks: futureAttacks };
      continue;
    }

    const target = resolveTargetForPendingAttack(workingRuntime, level, chainAwareAttack);
    if (target == null) {
      workingRuntime = removePendingAttackProjectile(workingRuntime, chainAwareAttack);
      futureAttacks = [...workingRuntime.pendingAttacks];
      continue;
    }

    const resolvedAttack =
      target.monsterId === chainAwareAttack.targetMonsterId
        ? chainAwareAttack
        : {
            ...chainAwareAttack,
            targetMonsterId: target.monsterId,
          };
    if (target.monsterId !== chainAwareAttack.targetMonsterId) {
      workingRuntime = retargetPendingAttackProjectile(workingRuntime, level, resolvedAttack, target);
    }

    const attackResult = applyPendingAttackToTarget(workingRuntime, level, resolvedAttack, target);
    workingRuntime = attackResult.runtime;
    scoreDelta += attackResult.scoreDelta;
    damageEvents.push(attackResult.damageEvent);

    if (resolvedAttack.chainId != null) {
      resolvedLightningChainOrigins.set(resolvedAttack.attackId, {
        monsterId: target.monsterId,
        position: getTrialMonsterSpellHitWorldPosition(level, target),
      });
    }
    workingRuntime = updateFutureLightningChainAttacks(workingRuntime, level, resolvedAttack, target);
    if (attackResult.damageEvent.defeated) {
      workingRuntime = retargetOrCancelPendingAttacksForDeadTargets(workingRuntime, level);
    }
    futureAttacks = [...workingRuntime.pendingAttacks];
  }

  return {
    runtime: {
      ...workingRuntime,
      pendingAttacks: futureAttacks,
    },
    scoreDelta,
    damageEvents,
  };
}

function comparePendingAttacks(
  first: TrialPendingAttackRuntimeState,
  second: TrialPendingAttackRuntimeState,
): number {
  return (
    first.impactDelaySec - second.impactDelaySec ||
    pendingAttackSortIndex(first) - pendingAttackSortIndex(second) ||
    first.attackId.localeCompare(second.attackId)
  );
}

function pendingAttackSortIndex(attack: Pick<TrialPendingAttackRuntimeState, 'attackId'>): number {
  const match = /(\d+)$/.exec(attack.attackId);
  return match == null ? 0 : Number.parseInt(match[1], 10);
}

function applyPendingAttackToTarget(
  runtime: TrialRuntimeState,
  level: GeneratedTrialLevel,
  attack: TrialPendingAttackRuntimeState,
  target: ActiveTrialMonster,
): { runtime: TrialRuntimeState; scoreDelta: number; damageEvent: TrialDamageEvent } {
  const damage = Math.min(target.hp, attack.damage);
  const nextHp = Math.max(0, target.hp - attack.damage);
  const defeated = nextHp <= 0;
  const fireBurnStack = attack.schoolId === 'fire' && !defeated
    ? createFireBurnStack(runtime.nextBurnIndex, attack.damage, 0)
    : null;
  const earthImpactVfx = attack.schoolId === 'earth'
    ? createEarthImpactVfx(runtime.nextImpactVfxIndex ?? 0, level, target, 0)
    : null;
  const monsters = runtime.monsters.map((monster) =>
    monster.monsterId === target.monsterId
      ? {
          ...monster,
          hp: nextHp,
          defeatDelaySec: defeated ? 0 : monster.defeatDelaySec,
          defeatAnimationRemainingSec: defeated ? KOBOLD_DEFEAT_ANIMATION_SEC : monster.defeatAnimationRemainingSec,
          defeatAnimationDurationSec: defeated ? KOBOLD_DEFEAT_ANIMATION_SEC : monster.defeatAnimationDurationSec,
          defeatFadeRemainingSec: defeated ? undefined : monster.defeatFadeRemainingSec,
          defeatFadeDurationSec: defeated ? undefined : monster.defeatFadeDurationSec,
          ...startHitShake(),
          ...clearHealthBarUpdate(),
          ...(attack.schoolId === 'ice' && !defeated ? startIceFreeze() : {}),
          ...(fireBurnStack == null
            ? { fireBurnStacks: defeated ? undefined : monster.fireBurnStacks }
            : { fireBurnStacks: [...(monster.fireBurnStacks ?? []), fireBurnStack] }),
        }
      : monster,
  );

  return {
    runtime: {
      ...runtime,
      monsters,
      impactVfx: earthImpactVfx == null
        ? runtime.impactVfx
        : [...(runtime.impactVfx ?? []), earthImpactVfx],
      nextBurnIndex: fireBurnStack == null ? runtime.nextBurnIndex : runtime.nextBurnIndex + 1,
      nextImpactVfxIndex: earthImpactVfx == null
        ? runtime.nextImpactVfxIndex
        : (runtime.nextImpactVfxIndex ?? 0) + 1,
    },
    scoreDelta: Math.round(damage * 2) + (defeated ? target.scoreValue : 0),
    damageEvent: {
      monsterId: target.monsterId,
      schoolId: attack.schoolId,
      damage,
      defeated,
      impactDelaySec: 0,
      castActivationDelaySec: 0,
    },
  };
}

function resolveTargetForPendingAttack(
  runtime: Pick<TrialRuntimeState, 'monsters'>,
  level: GeneratedTrialLevel,
  attack: TrialPendingAttackRuntimeState,
): ActiveTrialMonster | null {
  const excludedMonsterIds = new Set(attack.excludedMonsterIds ?? []);
  const plannedTarget = runtime.monsters.find(
    (monster) =>
      monster.monsterId === attack.targetMonsterId &&
      monster.hp > 0 &&
      !excludedMonsterIds.has(monster.monsterId),
  );
  if (plannedTarget != null) {
    return plannedTarget;
  }

  return aliveMonstersByTargetOrder(runtime, level).find((monster) => !excludedMonsterIds.has(monster.monsterId)) ?? null;
}

function retargetOrCancelPendingAttacksForDeadTargets(
  runtime: TrialRuntimeState,
  level: GeneratedTrialLevel,
): TrialRuntimeState {
  if (runtime.pendingAttacks.length <= 0) {
    return runtime;
  }

  let nextRuntime: TrialRuntimeState = runtime;
  const nextPendingAttacks: TrialPendingAttackRuntimeState[] = [];

  for (const attack of runtime.pendingAttacks) {
    const target = resolveTargetForPendingAttack(
      {
        monsters: nextRuntime.monsters,
      },
      level,
      attack,
    );
    if (target == null) {
      nextRuntime = removePendingAttackProjectile(nextRuntime, attack);
      continue;
    }

    const nextAttack =
      target.monsterId === attack.targetMonsterId
        ? attack
        : {
            ...attack,
            targetMonsterId: target.monsterId,
          };
    if (target.monsterId !== attack.targetMonsterId) {
      nextRuntime = retargetPendingAttackProjectile(nextRuntime, level, nextAttack, target);
    }
    nextPendingAttacks.push(nextAttack);
  }

  return {
    ...nextRuntime,
    pendingAttacks: nextPendingAttacks,
  };
}

function updateFutureLightningChainAttacks(
  runtime: TrialRuntimeState,
  level: GeneratedTrialLevel,
  resolvedAttack: TrialPendingAttackRuntimeState,
  actualTarget: ActiveTrialMonster,
): TrialRuntimeState {
  if (resolvedAttack.chainId == null) {
    return runtime;
  }

  const actualTargetPosition = getTrialMonsterSpellHitWorldPosition(level, actualTarget);
  let nextRuntime = runtime;
  const nextPendingAttacks = runtime.pendingAttacks.map((attack) => {
    if (attack.chainId !== resolvedAttack.chainId) {
      return attack;
    }

    const excludedMonsterIds = addUniqueMonsterId(attack.excludedMonsterIds ?? [], actualTarget.monsterId);
    if (attack.originAttackId === resolvedAttack.attackId) {
      nextRuntime = setPendingAttackProjectileFrom(nextRuntime, attack, actualTargetPosition);
    }

    return {
      ...attack,
      excludedMonsterIds,
    };
  });

  return retargetOrCancelPendingAttacksForDeadTargets(
    {
      ...nextRuntime,
      pendingAttacks: nextPendingAttacks,
    },
    level,
  );
}

function addUniqueMonsterId(monsterIds: readonly string[], monsterId: string): readonly string[] {
  return monsterIds.includes(monsterId) ? monsterIds : [...monsterIds, monsterId];
}

function applyResolvedLightningChainOriginToPendingAttack(
  runtime: TrialRuntimeState,
  attack: TrialPendingAttackRuntimeState,
  resolvedOrigins: ReadonlyMap<string, { monsterId: string; position: Vec3Data }>,
): { runtime: TrialRuntimeState; attack: TrialPendingAttackRuntimeState } {
  if (attack.originAttackId == null) {
    return { runtime, attack };
  }

  const resolvedOrigin = resolvedOrigins.get(attack.originAttackId);
  if (resolvedOrigin == null) {
    return { runtime, attack };
  }

  const nextAttack = {
    ...attack,
    excludedMonsterIds: addUniqueMonsterId(attack.excludedMonsterIds ?? [], resolvedOrigin.monsterId),
  };
  return {
    runtime: setPendingAttackProjectileFrom(runtime, nextAttack, resolvedOrigin.position),
    attack: nextAttack,
  };
}

function retargetPendingAttackProjectile(
  runtime: TrialRuntimeState,
  level: GeneratedTrialLevel,
  attack: TrialPendingAttackRuntimeState,
  target: ActiveTrialMonster,
): TrialRuntimeState {
  if (attack.projectileId == null) {
    return runtime;
  }

  const targetPosition = getTrialMonsterSpellHitWorldPosition(level, target);
  return {
    ...runtime,
    projectiles: runtime.projectiles.map((projectile) =>
      projectile.projectileId === attack.projectileId
        ? {
            ...projectile,
            targetMonsterId: target.monsterId,
            to: targetPosition,
          }
        : projectile,
    ),
  };
}

function setPendingAttackProjectileFrom(
  runtime: TrialRuntimeState,
  attack: TrialPendingAttackRuntimeState,
  from: Vec3Data,
): TrialRuntimeState {
  if (attack.projectileId == null) {
    return runtime;
  }

  return {
    ...runtime,
    projectiles: runtime.projectiles.map((projectile) =>
      projectile.projectileId === attack.projectileId
        ? {
            ...projectile,
            from,
            originKind: 'world',
          }
        : projectile,
    ),
  };
}

function removePendingAttackProjectile(
  runtime: TrialRuntimeState,
  attack: TrialPendingAttackRuntimeState,
): TrialRuntimeState {
  if (attack.projectileId == null) {
    return runtime;
  }

  return {
    ...runtime,
    projectiles: runtime.projectiles.filter((projectile) => projectile.projectileId !== attack.projectileId),
  };
}

function cascadeDamageSources(
  level: GeneratedTrialLevel,
  cascadeResult: CascadeResult,
  animationTrace: BoardAnimationTrace | undefined,
  animationStepOffset: number,
): TrialDamageSource[] {
  const stepTimings = animationTrace == null ? [] : getBoardAnimationStepTimings(animationTrace);
  return cascadeResult.steps.flatMap((step, cascadeIndex) =>
    step.matches
      .filter((match) => isStandardTileType(match.tileType))
      .map((match) => ({
        schoolId: spellSchoolForTileType(match.tileType as StandardTileType),
        effectKind: 'match' as const,
        damage: level.trial.baseDamage * (damageMultiplierForMatch(match) + cascadeIndex * 0.25),
        shotCount: 1,
        visualShotCount: 1,
        castActivationDelaySec: (stepTimings[cascadeIndex + animationStepOffset]?.popStartMs ?? 0) / 1000,
        durationSec: SPELL_MATCH_PROJECTILE_VISUAL_MS / 1000,
      })),
  );
}

function getTraceStepPopStartSec(trace: BoardAnimationTrace | undefined, stepIndex: number): number {
  if (trace == null) {
    return 0;
  }

  return (getBoardAnimationStepTimings(trace)[stepIndex]?.popStartMs ?? 0) / 1000;
}

function powerUpDamageSource(
  level: GeneratedTrialLevel,
  entry: PowerUpChainDetonation,
  chainStepPopStartSec: number,
  targetType?: MatchableTileType,
): TrialDamageSource {
  const detonation = entry.detonation;
  const schoolTargetType = targetType ?? detonation.lightballTargetType;
  const isBomb = detonation.powerUpType === 'TNT';
  return {
    schoolId: schoolTargetType != null && isStandardTileType(schoolTargetType) ? spellSchoolForTileType(schoolTargetType) : 'fire',
    effectKind: isBomb ? 'bomb' : 'match',
    damage: level.trial.baseDamage * powerUpDamageMultiplier(detonation.powerUpType),
    shotCount: powerUpShotCount(detonation),
    visualShotCount: isBomb ? 1 : powerUpShotCount(detonation),
    castActivationDelaySec: chainStepPopStartSec + entry.activationDelayMs / 1000,
    durationSec: (isBomb ? SPELL_BOMB_PROJECTILE_VISUAL_MS : SPELL_MATCH_PROJECTILE_VISUAL_MS) / 1000,
  };
}

function powerUpDamageMultiplier(powerUpType: PowerUpTileType): number {
  switch (powerUpType) {
    case 'ROCKET_H':
    case 'ROCKET_V':
      return 1.25;
    case 'TNT':
      return 1.5;
    case 'LIGHTBALL':
      return 1;
  }
}

function powerUpShotCount(detonation: PowerUpDetonation): number {
  switch (detonation.powerUpType) {
    case 'ROCKET_H':
    case 'ROCKET_V':
      return 3;
    case 'TNT':
      return 5;
    case 'LIGHTBALL':
      return Math.min(8, Math.max(1, Math.ceil(detonation.clearedCells.length / 3)));
  }
}

function createProjectile(
  projectileIndex: number,
  level: GeneratedTrialLevel,
  source: TrialDamageSource,
  target: ActiveTrialMonster,
  options: {
    attackId?: string;
    originKind: TrialProjectileRuntimeState['originKind'];
    from: Vec3Data;
    castActivationDelaySec: number;
    activationDelaySec: number;
    chargeDurationSec: number;
  },
): TrialProjectileRuntimeState {
  return {
    projectileId: `trial-${projectileIndex}`,
    attackId: options.attackId,
    targetMonsterId: target.monsterId,
    schoolId: source.schoolId,
    effectKind: source.effectKind,
    originKind: options.originKind,
    from: options.from,
    to: getTrialMonsterSpellHitWorldPosition(level, target),
    castActivationDelaySec: options.castActivationDelaySec,
    activationDelaySec: options.activationDelaySec,
    chargeDurationSec: options.chargeDurationSec,
    remainingSec: source.durationSec,
    durationSec: source.durationSec,
  };
}

function resolveTrialPowerUpBoard(
  board: Board,
  rng: SeededRng,
  nextTileId: () => string,
  origin: CellCoord,
  animation: BoardAnimationTraceOptions,
  lightballTargetType?: MatchableTileType,
): TrialPowerUpBoardResolution {
  const workingBoard = cloneBoard(board);
  const chain = resolvePowerUpChain(workingBoard, origin, { lightballTargetType });
  const beforeChainClearBoard = cloneBoard(workingBoard);

  for (const entry of chain.detonations) {
    clearDetonatedCells(workingBoard, entry.detonation);
  }

  const beforeGravityBoard = cloneBoard(workingBoard);
  const refillResult = settleBoardWithVoidAwareRefill(workingBoard, rng, nextTileId);
  const finalDetonationBoard = cloneBoard(workingBoard);
  const chainStep = buildBoardAnimationCascadeStep(
    0,
    beforeChainClearBoard,
    beforeGravityBoard,
    refillResult.afterGravityBoard,
    finalDetonationBoard,
    chain.clearedCells,
    absoluteChainClearDelayMap(chain),
    refillResult.refillTiles,
  );
  const cascadeResult = resolveCascades(workingBoard, rng, {
    preferredSpawnCell: origin,
    nextTileId,
    animation,
  });

  return {
    cascadeResult,
    detonations: chain.detonations,
    animationTrace: createBoardAnimationTrace(
      animation,
      [
        chainStep,
        ...(cascadeResult.animationTrace?.cascadeSteps.map((step, index) => ({
          ...step,
          stepIndex: index + 1,
        })) ?? []),
      ],
      cascadeResult.board,
    ),
  };
}

function clearDetonatedCells(board: Board, detonation: PowerUpDetonation): void {
  for (const coord of detonation.clearedCells) {
    const cell = getCell(board, coord);
    if (cell != null) {
      cell.tile = null;
    }
  }
}

function absoluteChainClearDelayMap(chain: PowerUpChainResolution): ReadonlyMap<string, number> {
  const delays = new Map<string, number>();
  for (const timing of chain.clearTimings) {
    const key = coordKey(timing.coord);
    const currentDelay = delays.get(key);
    if (currentDelay == null || timing.clearDelayMs < currentDelay) {
      delays.set(key, timing.clearDelayMs);
    }
  }

  return delays;
}

function getPowerUpActivation(board: Board, from: CellCoord, to: CellCoord): PowerUpActivation | null {
  const fromTile = getCell(board, from)?.tile;
  const toTile = getCell(board, to)?.tile;

  if (fromTile != null && isPowerUpTileType(fromTile.type)) {
    return {
      originAfterSwap: to,
      powerUpType: fromTile.type,
      targetType: matchableTargetType(toTile?.type),
    };
  }

  if (toTile != null && isPowerUpTileType(toTile.type)) {
    return {
      originAfterSwap: from,
      powerUpType: toTile.type,
      targetType: matchableTargetType(fromTile?.type),
    };
  }

  return null;
}

function matchableTargetType(type?: TileType): MatchableTileType | undefined {
  return type != null && isMatchableTileType(type) ? type : undefined;
}

function getTapPowerUpActivation(board: Board, origin: CellCoord): { targetType?: MatchableTileType } | null {
  const type = getCell(board, origin)?.tile?.type;
  if (!isTapActivatablePowerUpTileType(type)) {
    return null;
  }

  if (type === 'LIGHTBALL') {
    const targetType = selectLightballTapTargetType(board, origin);
    return targetType == null ? null : { targetType };
  }

  return {};
}

function spawnDueMonsters(runtime: TrialRuntimeState, level: GeneratedTrialLevel): TrialRuntimeState {
  const monsters = [...runtime.monsters];
  let nextSpawnIndex = runtime.nextSpawnIndex;

  if (
    nextSpawnIndex < level.trial.waveManifest.length &&
    level.trial.waveManifest[nextSpawnIndex].spawnTimeMs <= runtime.elapsedMs &&
    canSpawnMonsterInLane(level, monsters, level.trial.waveManifest[nextSpawnIndex].laneId)
  ) {
    monsters.push(createActiveMonster(level, level.trial.waveManifest[nextSpawnIndex], nextSpawnIndex));
    nextSpawnIndex += 1;
  }

  return {
    ...runtime,
    nextSpawnIndex,
    monsters,
  };
}

function createActiveMonster(
  level: GeneratedTrialLevel,
  manifestEntry: TrialMonsterManifestEntry,
  spawnIndex: number,
): ActiveTrialMonster {
  return {
    monsterId: manifestEntry.monsterId,
    kind: manifestEntry.kind,
    laneId: manifestEntry.laneId,
    hp: manifestEntry.maxHp,
    maxHp: manifestEntry.maxHp,
    x: laneForId(level, manifestEntry.laneId).spawnX,
    spawnTimeMs: manifestEntry.spawnTimeMs,
    walkSpeed: manifestEntry.walkSpeed,
    scoreValue: manifestEntry.scoreValue,
    visualYOffset: visualYOffsetForSpawnIndex(spawnIndex),
    modelVariant: koboldModelVariantForMonster(level.seed, manifestEntry.monsterId),
  };
}

function canSpawnMonsterInLane(
  level: GeneratedTrialLevel,
  monsters: readonly ActiveTrialMonster[],
  laneId: number,
): boolean {
  const lane = laneForId(level, laneId);
  const laneLength = Math.max(0.001, lane.spawnX - level.trial.contactX);
  const blockedDistance = laneLength * TRIAL_NEXT_MONSTER_SPAWN_PROGRESS_RATIO;
  return !monsters.some((monster) => {
    if (monster.laneId !== laneId) {
      return false;
    }

    const distanceFromSpawn = lane.spawnX - monster.x;
    return distanceFromSpawn < blockedDistance;
  });
}

export function visualYOffsetForSpawnIndex(spawnIndex: number): number {
  return spawnIndex % 2 === 0
    ? TRIAL_MONSTER_TOP_VISUAL_Y_OFFSET
    : TRIAL_MONSTER_BOTTOM_VISUAL_Y_OFFSET;
}

export function koboldModelVariantForMonster(
  levelSeed: number,
  monsterId: string,
): TrialMonsterModelVariant {
  return {
    headNodeName:
      KOBOLD_HEAD_NODE_NAMES[
        stableArrayIndex(KOBOLD_HEAD_NODE_NAMES, `${levelSeed}:${monsterId}:kobold-head`)
      ],
    clubNodeName:
      KOBOLD_CLUB_NODE_NAMES[
        stableArrayIndex(KOBOLD_CLUB_NODE_NAMES, `${levelSeed}:${monsterId}:kobold-club`)
      ],
  };
}

function stableArrayIndex(items: readonly unknown[], key: string): number {
  if (items.length === 0) {
    return 0;
  }

  return Math.min(items.length - 1, Math.floor(stableUnitHash(key) * items.length));
}

function expireProjectiles(runtime: TrialRuntimeState, dtSec: number): TrialRuntimeState {
  const elapsed = Math.max(0, dtSec);
  const impactVfx = (runtime.impactVfx ?? [])
    .map((vfx) => advanceImpactVfx(vfx, elapsed))
    .filter((vfx) => vfx.activationDelaySec > 0 || vfx.remainingSec > TRIAL_DEFEAT_TIMER_EPSILON_SEC);
  return {
    ...runtime,
    projectiles: runtime.projectiles
      .map((projectile) => advanceProjectile(projectile, elapsed))
      .filter((projectile) => projectile.activationDelaySec > 0 || projectile.remainingSec > 0),
    impactVfx: impactVfx.length > 0 ? impactVfx : undefined,
  };
}

function advancePendingDefeats(runtime: TrialRuntimeState, dtSec: number): TrialRuntimeState {
  const elapsed = Math.max(0, dtSec);
  const defeatedMonsterIds = [...runtime.defeatedMonsterIds];
  const monsters: ActiveTrialMonster[] = [];

  for (const monster of runtime.monsters) {
    const advancedMonster = advancePendingDefeat(monster, elapsed);
    if (advancedMonster == null) {
      if (!defeatedMonsterIds.includes(monster.monsterId)) {
        defeatedMonsterIds.push(monster.monsterId);
      }
      continue;
    }

    monsters.push(advancedMonster);
  }

  return {
    ...runtime,
    monsters,
    defeatedMonsterIds,
  };
}

function advancePendingDefeat(monster: ActiveTrialMonster, elapsedSec: number): ActiveTrialMonster | null {
  if (monster.hp > 0) {
    return monster;
  }

  let remainingElapsedSec = elapsedSec;
  let defeatDelaySec = monster.defeatDelaySec ?? 0;
  let defeatAnimationRemainingSec = monster.defeatAnimationRemainingSec;
  const defeatAnimationDurationSec = monster.defeatAnimationDurationSec ?? KOBOLD_DEFEAT_ANIMATION_SEC;
  let defeatFadeRemainingSec = monster.defeatFadeRemainingSec;
  const defeatFadeDurationSec = monster.defeatFadeDurationSec ?? KOBOLD_DEFEAT_FADE_SEC;

  if (defeatDelaySec > TRIAL_DEFEAT_TIMER_EPSILON_SEC && remainingElapsedSec > 0) {
    const consumedDelaySec = Math.min(defeatDelaySec, remainingElapsedSec);
    defeatDelaySec -= consumedDelaySec;
    remainingElapsedSec -= consumedDelaySec;
  }

  if (defeatDelaySec > TRIAL_DEFEAT_TIMER_EPSILON_SEC) {
    return {
      ...monster,
      ...clearHealthBarUpdate(),
      defeatDelaySec,
      defeatAnimationRemainingSec,
      defeatAnimationDurationSec: defeatAnimationRemainingSec == null ? monster.defeatAnimationDurationSec : defeatAnimationDurationSec,
      defeatFadeRemainingSec,
      defeatFadeDurationSec: defeatFadeRemainingSec == null ? monster.defeatFadeDurationSec : defeatFadeDurationSec,
    };
  }

  if (defeatAnimationRemainingSec == null) {
    defeatAnimationRemainingSec = KOBOLD_DEFEAT_ANIMATION_SEC;
  }

  if (defeatAnimationRemainingSec > TRIAL_DEFEAT_TIMER_EPSILON_SEC && remainingElapsedSec > 0) {
    const consumedAnimationSec = Math.min(defeatAnimationRemainingSec, remainingElapsedSec);
    defeatAnimationRemainingSec -= consumedAnimationSec;
    remainingElapsedSec -= consumedAnimationSec;
  }

  if (defeatAnimationRemainingSec > TRIAL_DEFEAT_TIMER_EPSILON_SEC) {
    return {
      ...monster,
      ...clearHealthBarUpdate(),
      defeatDelaySec: 0,
      defeatAnimationRemainingSec,
      defeatAnimationDurationSec,
      defeatFadeRemainingSec,
      defeatFadeDurationSec: defeatFadeRemainingSec == null ? monster.defeatFadeDurationSec : defeatFadeDurationSec,
    };
  }

  if (defeatFadeRemainingSec == null) {
    defeatFadeRemainingSec = KOBOLD_DEFEAT_FADE_SEC;
  }

  if (remainingElapsedSec > 0) {
    defeatFadeRemainingSec -= remainingElapsedSec;
  }

  if (defeatFadeRemainingSec <= TRIAL_DEFEAT_TIMER_EPSILON_SEC) {
    return null;
  }

  return {
    ...monster,
    ...clearHealthBarUpdate(),
    defeatDelaySec: 0,
    defeatAnimationRemainingSec: 0,
    defeatAnimationDurationSec,
    defeatFadeRemainingSec,
    defeatFadeDurationSec,
  };
}

function scheduleHitShake(
  monster: ActiveTrialMonster,
  hitDelaySec: number,
): Pick<
  ActiveTrialMonster,
  'hitShakeDelaySec' | 'hitShakeQueueSec' | 'hitShakeRemainingSec' | 'hitShakeDurationSec'
> {
  const hitShakeQueueSec = [...(monster.hitShakeQueueSec ?? []), Math.max(0, hitDelaySec)].sort((a, b) => a - b);
  const activeShakeSec = monster.hitShakeRemainingSec ?? 0;

  return {
    hitShakeDelaySec: hitShakeQueueSec[0],
    hitShakeQueueSec,
    hitShakeRemainingSec: activeShakeSec > 0 ? TRIAL_HIT_SHAKE_DURATION_SEC : activeShakeSec,
    hitShakeDurationSec: TRIAL_HIT_SHAKE_DURATION_SEC,
  };
}

function startHitShake(): Pick<
  ActiveTrialMonster,
  'hitShakeDelaySec' | 'hitShakeQueueSec' | 'hitShakeRemainingSec' | 'hitShakeDurationSec'
> {
  return {
    hitShakeDelaySec: undefined,
    hitShakeQueueSec: undefined,
    hitShakeRemainingSec: TRIAL_HIT_SHAKE_DURATION_SEC,
    hitShakeDurationSec: TRIAL_HIT_SHAKE_DURATION_SEC,
  };
}

function scheduleHealthBarUpdate(
  monster: ActiveTrialMonster,
  impactDelaySec: number,
  hp: number,
): Pick<ActiveTrialMonster, 'healthBarHp' | 'healthBarUpdateQueue'> {
  if (hp <= 0) {
    return clearHealthBarUpdate();
  }

  const visibleHp = monster.healthBarHp ?? monster.hp;
  const healthBarUpdateQueue = [
    ...(monster.healthBarUpdateQueue ?? []),
    { delaySec: Math.max(0, impactDelaySec), hp },
  ].sort((first, second) => first.delaySec - second.delaySec);

  return {
    healthBarHp: visibleHp,
    healthBarUpdateQueue,
  };
}

function clearHealthBarUpdate(): Pick<ActiveTrialMonster, 'healthBarHp' | 'healthBarUpdateQueue'> {
  return {
    healthBarHp: undefined,
    healthBarUpdateQueue: undefined,
  };
}

function startIceFreeze(): Pick<ActiveTrialMonster, 'iceFreezeDelayQueueSec' | 'iceFreezeRemainingSec' | 'iceFreezeDurationSec'> {
  return {
    iceFreezeDelayQueueSec: undefined,
    iceFreezeRemainingSec: TRIAL_ICE_FREEZE_SEC,
    iceFreezeDurationSec: TRIAL_ICE_FREEZE_SEC,
  };
}

function advanceHitShakes(runtime: TrialRuntimeState, dtSec: number): TrialRuntimeState {
  const elapsed = Math.max(0, dtSec);
  return {
    ...runtime,
    monsters: runtime.monsters.map((monster) => advanceMonsterHitShake(monster, elapsed)),
  };
}

function advanceHealthBarUpdates(runtime: TrialRuntimeState, dtSec: number): TrialRuntimeState {
  const elapsed = Math.max(0, dtSec);
  return {
    ...runtime,
    monsters: runtime.monsters.map((monster) => advanceMonsterHealthBarUpdates(monster, elapsed)),
  };
}

function advanceIceFreezes(runtime: TrialRuntimeState, dtSec: number): TrialRuntimeState {
  const elapsed = Math.max(0, dtSec);
  return {
    ...runtime,
    monsters: runtime.monsters.map((monster) => advanceMonsterIceFreeze(monster, elapsed)),
  };
}

function advanceMonsterIceFreeze(monster: ActiveTrialMonster, elapsedSec: number): ActiveTrialMonster {
  const queuedDelays = monster.iceFreezeDelayQueueSec ?? [];
  const sortedDelays = [...queuedDelays].sort((first, second) => first - second);
  const futureQueue: number[] = [];
  const iceFreezeDurationSec = monster.iceFreezeDurationSec ?? TRIAL_ICE_FREEZE_SEC;
  let iceFreezeRemainingSec = monster.iceFreezeRemainingSec ?? 0;
  let previousArrivalSec = 0;

  for (const delaySec of sortedDelays) {
    if (delaySec > elapsedSec) {
      futureQueue.push(delaySec - elapsedSec);
      continue;
    }

    const segmentSec = Math.max(0, delaySec - previousArrivalSec);
    if (segmentSec > 0) {
      iceFreezeRemainingSec = Math.max(0, iceFreezeRemainingSec - segmentSec);
    }
    previousArrivalSec = Math.max(previousArrivalSec, delaySec);
    iceFreezeRemainingSec += iceFreezeDurationSec;
  }

  const tailElapsedSec = Math.max(0, elapsedSec - previousArrivalSec);
  if (tailElapsedSec > 0) {
    iceFreezeRemainingSec = Math.max(0, iceFreezeRemainingSec - tailElapsedSec);
  }

  if (iceFreezeRemainingSec <= TRIAL_DEFEAT_TIMER_EPSILON_SEC && futureQueue.length <= 0) {
    return {
      ...monster,
      iceFreezeRemainingSec: undefined,
      iceFreezeDurationSec: undefined,
      iceFreezeDelayQueueSec: undefined,
    };
  }

  return {
    ...monster,
    iceFreezeRemainingSec: iceFreezeRemainingSec > TRIAL_DEFEAT_TIMER_EPSILON_SEC ? iceFreezeRemainingSec : undefined,
    iceFreezeDurationSec,
    iceFreezeDelayQueueSec: futureQueue.length > 0 ? futureQueue : undefined,
  };
}

function advanceMonsterHealthBarUpdates(monster: ActiveTrialMonster, elapsedSec: number): ActiveTrialMonster {
  if (monster.hp <= 0) {
    if (monster.healthBarHp == null && monster.healthBarUpdateQueue == null) {
      return monster;
    }

    return {
      ...monster,
      ...clearHealthBarUpdate(),
    };
  }

  const queuedUpdates = monster.healthBarUpdateQueue ?? [];
  if (queuedUpdates.length <= 0) {
    if (monster.healthBarHp != null && monster.healthBarHp === monster.hp) {
      return {
        ...monster,
        healthBarHp: undefined,
        healthBarUpdateQueue: undefined,
      };
    }

    return monster;
  }

  const advancedUpdates = queuedUpdates
    .map((update) => ({ ...update, delaySec: update.delaySec - elapsedSec }))
    .sort((first, second) => first.delaySec - second.delaySec);
  const arrivedUpdates = advancedUpdates.filter((update) => update.delaySec <= TRIAL_DEFEAT_TIMER_EPSILON_SEC);
  const futureUpdates = advancedUpdates.filter((update) => update.delaySec > TRIAL_DEFEAT_TIMER_EPSILON_SEC);
  const nextHealthBarHp =
    arrivedUpdates.length > 0
      ? arrivedUpdates[arrivedUpdates.length - 1].hp
      : monster.healthBarHp;

  if (futureUpdates.length <= 0 && nextHealthBarHp === monster.hp) {
    return {
      ...monster,
      healthBarHp: undefined,
      healthBarUpdateQueue: undefined,
    };
  }

  return {
    ...monster,
    healthBarHp: nextHealthBarHp,
    healthBarUpdateQueue: futureUpdates.length > 0 ? futureUpdates : undefined,
  };
}

function advanceMonsterHitShake(monster: ActiveTrialMonster, elapsedSec: number): ActiveTrialMonster {
  const queuedDelays = monster.hitShakeQueueSec ?? (monster.hitShakeDelaySec != null ? [monster.hitShakeDelaySec] : []);
  const advancedQueue = queuedDelays
    .map((delaySec) => delaySec - elapsedSec)
    .sort((a, b) => a - b);
  const arrivedCount = advancedQueue.filter((delaySec) => delaySec <= TRIAL_DEFEAT_TIMER_EPSILON_SEC).length;
  const futureQueue = advancedQueue.filter((delaySec) => delaySec > TRIAL_DEFEAT_TIMER_EPSILON_SEC);
  let hitShakeDelaySec = futureQueue[0];
  const hitShakeQueueSec = futureQueue.length > 0 ? futureQueue : undefined;
  let hitShakeRemainingSec = monster.hitShakeRemainingSec;
  const hitShakeDurationSec = monster.hitShakeDurationSec ?? TRIAL_HIT_SHAKE_DURATION_SEC;

  if (arrivedCount > 0) {
    hitShakeRemainingSec = hitShakeDurationSec;
  } else if (hitShakeRemainingSec != null && hitShakeRemainingSec > 0) {
    hitShakeRemainingSec -= elapsedSec;
    if (hitShakeRemainingSec <= TRIAL_DEFEAT_TIMER_EPSILON_SEC) {
      hitShakeRemainingSec = undefined;
    }
  }

  if ((hitShakeRemainingSec ?? 0) <= TRIAL_DEFEAT_TIMER_EPSILON_SEC && hitShakeQueueSec == null) {
    return {
      ...monster,
      hitShakeDelaySec: undefined,
      hitShakeQueueSec: undefined,
      hitShakeRemainingSec: undefined,
      hitShakeDurationSec: undefined,
    };
  }

  return {
    ...monster,
    hitShakeDelaySec,
    hitShakeQueueSec,
    hitShakeRemainingSec,
    hitShakeDurationSec,
  };
}

function advanceProjectile(projectile: TrialProjectileRuntimeState, elapsedSec: number): TrialProjectileRuntimeState {
  let remainingElapsedSec = elapsedSec;
  let activationDelaySec = projectile.activationDelaySec;
  const castActivationDelaySec = Math.max(0, projectile.castActivationDelaySec - elapsedSec);
  let remainingSec = projectile.remainingSec;

  if (activationDelaySec > 0) {
    const consumedDelaySec = Math.min(activationDelaySec, remainingElapsedSec);
    activationDelaySec -= consumedDelaySec;
    remainingElapsedSec -= consumedDelaySec;
  }

  if (activationDelaySec <= 0 && remainingElapsedSec > 0) {
    remainingSec -= remainingElapsedSec;
  }

  return {
    ...projectile,
    castActivationDelaySec,
    activationDelaySec: Math.max(0, activationDelaySec),
    remainingSec,
  };
}

function advanceImpactVfx(vfx: TrialImpactVfxRuntimeState, elapsedSec: number): TrialImpactVfxRuntimeState {
  let remainingElapsedSec = elapsedSec;
  let activationDelaySec = vfx.activationDelaySec;
  let remainingSec = vfx.remainingSec;

  if (activationDelaySec > 0) {
    const consumedDelaySec = Math.min(activationDelaySec, remainingElapsedSec);
    activationDelaySec -= consumedDelaySec;
    remainingElapsedSec -= consumedDelaySec;
  }

  if (activationDelaySec <= 0 && remainingElapsedSec > 0) {
    remainingSec -= remainingElapsedSec;
  }

  return {
    ...vfx,
    activationDelaySec: Math.max(0, activationDelaySec),
    remainingSec,
  };
}

function getTrialResult(runtime: TrialRuntimeState, level: GeneratedTrialLevel): LevelResult {
  if (runtime.monsters.some((monster) => monster.hp > 0 && hasTrialMonsterReachedMage(level, monster))) {
    return 'lost';
  }

  if (
    runtime.nextSpawnIndex >= level.trial.waveManifest.length &&
    runtime.monsters.length === 0 &&
    runtime.defeatedMonsterIds.length >= level.trial.waveManifest.length
  ) {
    return 'won';
  }

  return 'playing';
}

export function hasTrialMonsterReachedMage(
  level: GeneratedTrialLevel,
  monster: ActiveTrialMonster,
): boolean {
  return monster.x - getTrialMonsterContactRadius(monster.kind) <= level.trial.contactX;
}

function spellSchoolForTileType(tileType: StandardTileType): SpellSchoolId {
  switch (tileType) {
    case 'FIRE':
      return 'fire';
    case 'ICE':
      return 'ice';
    case 'LIGHTNING':
      return 'lightning';
    case 'EARTH':
      return 'earth';
  }
}

function getLaneY(level: GeneratedTrialLevel, laneId: number): number {
  return laneForId(level, laneId).y;
}

function laneForId(level: GeneratedTrialLevel, laneId: number) {
  const lane = level.trial.lanes.find((candidate) => candidate.laneId === laneId);
  if (lane == null) {
    throw new Error(`Trial lane ${laneId} does not exist.`);
  }

  return lane;
}

function stableUnitHash(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0) / 0xffffffff;
}

function zForMonsterKind(kind: TrialMonsterKind): number {
  switch (kind) {
    case 'kobold':
      return 0.35;
    case 'tallKobold':
      return 0.45;
    case 'miniBoss':
      return 0.55;
  }
}

function invalidTrialSwap(
  board: Board,
  runtime: TrialRuntimeState,
  animationTrace?: BoardAnimationTrace,
): TrialSwapResult {
  return {
    valid: false,
    board,
    runtime,
    scoreDelta: 0,
    damageEvents: [],
    queuedAttackEvents: [],
    scoringStats: EMPTY_SWAP_SCORING_STATS,
    powerUpsUsed: 0,
    animationTrace,
  };
}
