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
export const TRIAL_MONSTER_RANDOM_Y_OFFSET_AMPLITUDE = 0.16;
export const SPELL_CAST_WINDUP_SEC = 0.5;
export const KOBOLD_DEFEAT_ANIMATION_SEC = 1.0;
export const KOBOLD_DEFEAT_FADE_SEC = 0.15;
export const TRIAL_ICE_FREEZE_SEC = 1.5;
export const LIGHTNING_CHAIN_HOP_DELAY_SEC = 0.12;

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
}

export interface TrialHealthBarUpdate {
  delaySec: number;
  hp: number;
}

export interface TrialProjectileRuntimeState {
  projectileId: string;
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

export interface TrialRuntimeState {
  elapsedMs: number;
  nextSpawnIndex: number;
  monsters: readonly ActiveTrialMonster[];
  projectiles: readonly TrialProjectileRuntimeState[];
  defeatedMonsterIds: readonly string[];
  totalMonsters: number;
  result: LevelResult;
  nextProjectileIndex: number;
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

export interface TrialSwapResult {
  valid: boolean;
  board: Board;
  runtime: TrialRuntimeState;
  scoreDelta: number;
  damageEvents: readonly TrialDamageEvent[];
  scoringStats: SwapScoringStats;
  animationTrace?: BoardAnimationTrace;
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
      defeatedMonsterIds: [],
      totalMonsters: level.trial.waveManifest.length,
      result: 'playing',
      nextProjectileIndex: 0,
    },
    level,
  );
}

export function updateTrialRuntime(
  runtime: TrialRuntimeState,
  level: GeneratedTrialLevel,
  dtSec: number,
): TrialRuntimeState {
  if (runtime.result !== 'playing') {
    return expireProjectiles(runtime, dtSec);
  }

  const elapsedMs = runtime.elapsedMs + Math.max(0, dtSec) * 1000;
  const elapsedSec = Math.max(0, dtSec);
  const visualRuntime = expireProjectiles(runtime, elapsedSec);
  const shakeRuntime = advanceHitShakes(visualRuntime, elapsedSec);
  const healthBarRuntime = advanceHealthBarUpdates(shakeRuntime, elapsedSec);
  const freezeRuntime = advanceIceFreezes(healthBarRuntime, elapsedSec);
  const defeatRuntime = advancePendingDefeats(freezeRuntime, elapsedSec);
  const movedRuntime = {
    ...defeatRuntime,
    elapsedMs,
    monsters: defeatRuntime.monsters.map((monster) =>
      monster.hp > 0 && (monster.iceFreezeRemainingSec ?? 0) <= 0
        ? {
            ...monster,
            x:
              monster.x -
              monster.walkSpeed *
                movementElapsedSecForTrialMonster(
                  healthBarRuntime.monsters.find((candidate) => candidate.monsterId === monster.monsterId) ?? monster,
                  elapsedSec,
                ),
          }
        : monster,
    ),
  };
  const spawnedRuntime = spawnDueMonsters(movedRuntime, level);
  const result = getTrialResult(spawnedRuntime, level);

  return {
    ...spawnedRuntime,
    result,
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
    scoringStats: createSwapScoringStats(matchCount, powerUpsCreated),
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
    scoringStats: createSwapScoringStats(matchCount, powerUpsCreated),
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
): { runtime: TrialRuntimeState; scoreDelta: number; damageEvents: TrialDamageEvent[] } {
  let nextRuntime: TrialRuntimeState = {
    ...runtime,
    monsters: runtime.monsters.map((monster) => ({ ...monster })),
    projectiles: runtime.projectiles.map((projectile) => ({ ...projectile })),
    defeatedMonsterIds: [...runtime.defeatedMonsterIds],
  };
  let scoreDelta = 0;
  const damageEvents: TrialDamageEvent[] = [];

  for (const source of sources) {
    if (source.schoolId === 'lightning') {
      const targets = aliveMonstersByTargetOrder(nextRuntime, level);
      const projectiles: TrialProjectileRuntimeState[] = [];
      let previousTarget: ActiveTrialMonster | null = null;

      for (const [chainIndex, target] of targets.entries()) {
        const currentTarget = nextRuntime.monsters.find((monster) => monster.monsterId === target.monsterId);
        if (currentTarget == null) {
          continue;
        }

        const chainDelaySec = chainIndex * LIGHTNING_CHAIN_HOP_DELAY_SEC;
        const projectileActivationDelaySec = source.castActivationDelaySec + SPELL_CAST_WINDUP_SEC + chainDelaySec;
        const impactDelaySec = projectileActivationDelaySec + source.durationSec;
        const damage = Math.min(currentTarget.hp, source.damage);
        const nextHp = Math.max(0, currentTarget.hp - source.damage);
        const defeated = nextHp <= 0;
        const projectile = createProjectile(
          nextRuntime.nextProjectileIndex + projectiles.length,
          level,
          source,
          currentTarget,
          {
            originKind: previousTarget == null ? 'mage' : 'world',
            from:
              previousTarget == null
                ? getTrialSpellOriginWorldPosition(level)
                : getTrialMonsterWorldPosition(level, previousTarget),
            castActivationDelaySec: source.castActivationDelaySec + chainDelaySec,
            activationDelaySec: projectileActivationDelaySec,
            chargeDurationSec: previousTarget == null ? SPELL_CAST_WINDUP_SEC : 0,
          },
        );
        const monsters = nextRuntime.monsters.map((monster) =>
          monster.monsterId === currentTarget.monsterId
            ? {
                ...monster,
                hp: nextHp,
                defeatDelaySec: defeated ? impactDelaySec : monster.defeatDelaySec,
                ...scheduleHitShake(monster, impactDelaySec),
                ...scheduleHealthBarUpdate(monster, impactDelaySec, nextHp),
              }
            : monster,
        );

        nextRuntime = {
          ...nextRuntime,
          monsters,
        };
        projectiles.push(projectile);

        scoreDelta += Math.round(damage * 2) + (defeated ? currentTarget.scoreValue : 0);
        damageEvents.push({
          monsterId: currentTarget.monsterId,
          schoolId: source.schoolId,
          damage,
          defeated,
          impactDelaySec,
          castActivationDelaySec: source.castActivationDelaySec + chainDelaySec,
        });
        previousTarget = target;
      }

      if (projectiles.length > 0) {
        nextRuntime = {
          ...nextRuntime,
          projectiles: [...nextRuntime.projectiles, ...projectiles],
          nextProjectileIndex: nextRuntime.nextProjectileIndex + projectiles.length,
        };
      }

      continue;
    }

    for (let shotIndex = 0; shotIndex < source.shotCount; shotIndex += 1) {
      const target = selectNearestAliveMonster(nextRuntime, level);
      if (target == null) {
        continue;
      }

      const damage = Math.min(target.hp, source.damage);
      const nextHp = Math.max(0, target.hp - source.damage);
      const defeated = nextHp <= 0;
      const impactDelaySec = source.castActivationDelaySec + SPELL_CAST_WINDUP_SEC + source.durationSec;
      const projectile = shotIndex < source.visualShotCount
        ? createProjectile(nextRuntime.nextProjectileIndex, level, source, target, {
            originKind: 'mage',
            from: getTrialSpellOriginWorldPosition(level),
            castActivationDelaySec: source.castActivationDelaySec,
            activationDelaySec: source.castActivationDelaySec + SPELL_CAST_WINDUP_SEC,
            chargeDurationSec: SPELL_CAST_WINDUP_SEC,
          })
        : null;
      const monsters = nextRuntime.monsters.map((monster) =>
        monster.monsterId === target.monsterId
          ? {
              ...monster,
              hp: nextHp,
              defeatDelaySec: defeated ? impactDelaySec : monster.defeatDelaySec,
              ...scheduleHitShake(monster, impactDelaySec),
              ...scheduleHealthBarUpdate(monster, impactDelaySec, nextHp),
              ...(source.schoolId === 'ice' && !defeated ? scheduleIceFreeze(monster, impactDelaySec) : {}),
            }
          : monster,
      );

      nextRuntime = {
        ...nextRuntime,
        monsters,
        projectiles: projectile == null ? nextRuntime.projectiles : [...nextRuntime.projectiles, projectile],
        nextProjectileIndex: projectile == null ? nextRuntime.nextProjectileIndex : nextRuntime.nextProjectileIndex + 1,
      };

      scoreDelta += Math.round(damage * 2) + (defeated ? target.scoreValue : 0);
      damageEvents.push({
        monsterId: target.monsterId,
        schoolId: source.schoolId,
        damage,
        defeated,
        impactDelaySec,
        castActivationDelaySec: source.castActivationDelaySec,
      });
    }
  }

  return {
    runtime: {
      ...nextRuntime,
      result: getTrialResult(nextRuntime, level),
    },
    scoreDelta,
    damageEvents,
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
    originKind: TrialProjectileRuntimeState['originKind'];
    from: Vec3Data;
    castActivationDelaySec: number;
    activationDelaySec: number;
    chargeDurationSec: number;
  },
): TrialProjectileRuntimeState {
  return {
    projectileId: `trial-${projectileIndex}`,
    schoolId: source.schoolId,
    effectKind: source.effectKind,
    originKind: options.originKind,
    from: options.from,
    to: getTrialMonsterWorldPosition(level, target),
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
    monsters.push(createActiveMonster(level, level.trial.waveManifest[nextSpawnIndex]));
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
    visualYOffset: visualYOffsetForMonster(level, manifestEntry.monsterId),
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

export function visualYOffsetForMonster(
  level: Pick<GeneratedTrialLevel, 'seed'>,
  monsterId: string,
): number {
  const normalized = stableUnitHash(`${level.seed}:${monsterId}`);
  return (normalized * 2 - 1) * TRIAL_MONSTER_RANDOM_Y_OFFSET_AMPLITUDE;
}

function expireProjectiles(runtime: TrialRuntimeState, dtSec: number): TrialRuntimeState {
  const elapsed = Math.max(0, dtSec);
  return {
    ...runtime,
    projectiles: runtime.projectiles
      .map((projectile) => advanceProjectile(projectile, elapsed))
      .filter((projectile) => projectile.activationDelaySec > 0 || projectile.remainingSec > 0),
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

function scheduleHealthBarUpdate(
  monster: ActiveTrialMonster,
  impactDelaySec: number,
  hp: number,
): Pick<ActiveTrialMonster, 'healthBarHp' | 'healthBarUpdateQueue'> {
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

function scheduleIceFreeze(
  monster: ActiveTrialMonster,
  impactDelaySec: number,
): Pick<ActiveTrialMonster, 'iceFreezeDelayQueueSec' | 'iceFreezeDurationSec'> {
  return {
    iceFreezeDelayQueueSec: [
      ...(monster.iceFreezeDelayQueueSec ?? []),
      Math.max(0, impactDelaySec),
    ].sort((first, second) => first - second),
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
    scoringStats: EMPTY_SWAP_SCORING_STATS,
    animationTrace,
  };
}
