import type { Board } from '../board/Board';
import {
  cloneBoard,
  createTileIdFactory,
  fillEmptyCellsWithStandardTiles,
  getCell,
  swapTilesInPlace,
} from '../board/Board';
import { validateSwap } from '../board/BoardRules';
import { applyGravity, resolveCascades, type CascadeResult } from '../board/Cascade';
import type { MatchGroup } from '../board/MatchDetection';
import { detonatePowerUp, type PowerUpDetonation } from '../board/PowerUps';
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
import { SPELL_PROJECTILE_VISUAL_MS } from '../data/tuning';
import { createSwapScoringStats, EMPTY_SWAP_SCORING_STATS, type SwapScoringStats } from '../run/Scoring';
import type { GeneratedTrialLevel, TrialMonsterKind, TrialMonsterManifestEntry } from './TrialGenerator';

export type SpellSchoolId = 'fire' | 'ice' | 'lightning' | 'earth';

export interface ActiveTrialMonster {
  monsterId: string;
  kind: TrialMonsterKind;
  laneId: number;
  hp: number;
  maxHp: number;
  y: number;
  spawnTimeMs: number;
  walkSpeed: number;
  scoreValue: number;
}

export interface TrialProjectileRuntimeState {
  projectileId: string;
  schoolId: SpellSchoolId;
  from: Vec3Data;
  to: Vec3Data;
  remainingSec: number;
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
}

export interface TrialSwapResult {
  valid: boolean;
  board: Board;
  runtime: TrialRuntimeState;
  scoreDelta: number;
  damageEvents: readonly TrialDamageEvent[];
  scoringStats: SwapScoringStats;
}

interface TrialDamageSource {
  schoolId: SpellSchoolId;
  damage: number;
  shotCount: number;
}

interface PowerUpActivation {
  originAfterSwap: CellCoord;
  powerUpType: PowerUpTileType;
  targetType?: MatchableTileType;
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
  const projectiles = expireProjectiles(runtime, dtSec).projectiles;
  const movedRuntime = {
    ...runtime,
    elapsedMs,
    projectiles,
    monsters: runtime.monsters.map((monster) => ({
      ...monster,
      y: monster.y - monster.walkSpeed * Math.max(0, dtSec),
    })),
  };
  const spawnedRuntime = spawnDueMonsters(movedRuntime, level);
  const result = getTrialResult(spawnedRuntime, level);

  return {
    ...spawnedRuntime,
    result,
  };
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
    return invalidTrialSwap(board, runtime);
  }

  const powerUpActivation = getPowerUpActivation(board, from, to);
  const swappedBoard = cloneBoard(board);
  swapTilesInPlace(swappedBoard, from, to);

  const nextTileId = createTileIdFactory('trial-cascade-tile');
  const damageSources: TrialDamageSource[] = [];
  let cascadeResult: CascadeResult;

  if (powerUpActivation != null) {
    const detonation = detonatePowerUp(swappedBoard, powerUpActivation.originAfterSwap, {
      lightballTargetType: powerUpActivation.targetType,
    });
    clearDetonatedCells(swappedBoard, detonation);
    damageSources.push(powerUpDamageSource(level, detonation, powerUpActivation.targetType));
    applyGravity(swappedBoard);
    fillEmptyCellsWithStandardTiles(swappedBoard, rng, nextTileId);
    cascadeResult = resolveCascades(swappedBoard, rng, { preferredSpawnCell: to, nextTileId });
  } else {
    cascadeResult = resolveCascades(swappedBoard, rng, { preferredSpawnCell: to, nextTileId });
  }

  damageSources.push(...cascadeDamageSources(level, cascadeResult));
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
  };
}

export function selectNearestAliveMonster(
  runtime: TrialRuntimeState,
  level: GeneratedTrialLevel,
): ActiveTrialMonster | null {
  const monsters = runtime.monsters.filter((monster) => monster.hp > 0);
  if (monsters.length === 0) {
    return null;
  }

  return monsters.sort((first, second) => {
    const firstDistance = Math.abs(first.y - level.trial.mageLineY);
    const secondDistance = Math.abs(second.y - level.trial.mageLineY);
    return (
      firstDistance - secondDistance ||
      first.laneId - second.laneId ||
      first.monsterId.localeCompare(second.monsterId)
    );
  })[0];
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
    x: getLaneX(level, monster.laneId),
    y: monster.y,
    z: zForMonsterKind(monster.kind),
  };
}

export function getTrialMageWorldPosition(level: GeneratedTrialLevel): Vec3Data {
  return {
    x: 0,
    y: level.trial.mageLineY,
    z: 0.55,
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
    for (let shotIndex = 0; shotIndex < source.shotCount; shotIndex += 1) {
      const target = selectNearestAliveMonster(nextRuntime, level);
      if (target == null) {
        continue;
      }

      const damage = Math.min(target.hp, source.damage);
      const nextHp = Math.max(0, target.hp - source.damage);
      const defeated = nextHp <= 0;
      const projectile = createProjectile(nextRuntime, level, source.schoolId, target);
      const monsters = nextRuntime.monsters
        .map((monster) =>
          monster.monsterId === target.monsterId
            ? {
                ...monster,
                hp: nextHp,
              }
            : monster,
        )
        .filter((monster) => monster.hp > 0);

      nextRuntime = {
        ...nextRuntime,
        monsters,
        projectiles: [...nextRuntime.projectiles, projectile],
        nextProjectileIndex: nextRuntime.nextProjectileIndex + 1,
        defeatedMonsterIds: defeated
          ? [...nextRuntime.defeatedMonsterIds, target.monsterId]
          : nextRuntime.defeatedMonsterIds,
      };

      scoreDelta += Math.round(damage * 2) + (defeated ? target.scoreValue : 0);
      damageEvents.push({
        monsterId: target.monsterId,
        schoolId: source.schoolId,
        damage,
        defeated,
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
): TrialDamageSource[] {
  return cascadeResult.steps.flatMap((step, cascadeIndex) =>
    step.matches
      .filter((match) => isStandardTileType(match.tileType))
      .map((match) => ({
        schoolId: spellSchoolForTileType(match.tileType as StandardTileType),
        damage: level.trial.baseDamage * (damageMultiplierForMatch(match) + cascadeIndex * 0.25),
        shotCount: 1,
      })),
  );
}

function powerUpDamageSource(
  level: GeneratedTrialLevel,
  detonation: PowerUpDetonation,
  targetType?: MatchableTileType,
): TrialDamageSource {
  return {
    schoolId: targetType != null && isStandardTileType(targetType) ? spellSchoolForTileType(targetType) : 'fire',
    damage: level.trial.baseDamage * powerUpDamageMultiplier(detonation.powerUpType),
    shotCount: powerUpShotCount(detonation),
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
  runtime: TrialRuntimeState,
  level: GeneratedTrialLevel,
  schoolId: SpellSchoolId,
  target: ActiveTrialMonster,
): TrialProjectileRuntimeState {
  return {
    projectileId: `trial-${runtime.nextProjectileIndex}`,
    schoolId,
    from: getTrialMageWorldPosition(level),
    to: getTrialMonsterWorldPosition(level, target),
    remainingSec: SPELL_PROJECTILE_VISUAL_MS / 1000,
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

function spawnDueMonsters(runtime: TrialRuntimeState, level: GeneratedTrialLevel): TrialRuntimeState {
  const monsters = [...runtime.monsters];
  let nextSpawnIndex = runtime.nextSpawnIndex;

  while (
    nextSpawnIndex < level.trial.waveManifest.length &&
    level.trial.waveManifest[nextSpawnIndex].spawnTimeMs <= runtime.elapsedMs
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
    y: laneForId(level, manifestEntry.laneId).spawnY,
    spawnTimeMs: manifestEntry.spawnTimeMs,
    walkSpeed: manifestEntry.walkSpeed,
    scoreValue: manifestEntry.scoreValue,
  };
}

function expireProjectiles(runtime: TrialRuntimeState, dtSec: number): TrialRuntimeState {
  const elapsed = Math.max(0, dtSec);
  return {
    ...runtime,
    projectiles: runtime.projectiles
      .map((projectile) => ({
        ...projectile,
        remainingSec: projectile.remainingSec - elapsed,
      }))
      .filter((projectile) => projectile.remainingSec > 0),
  };
}

function getTrialResult(runtime: TrialRuntimeState, level: GeneratedTrialLevel): LevelResult {
  if (runtime.monsters.some((monster) => monster.y <= level.trial.failLineY)) {
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

function getLaneX(level: GeneratedTrialLevel, laneId: number): number {
  return laneForId(level, laneId).x;
}

function laneForId(level: GeneratedTrialLevel, laneId: number) {
  const lane = level.trial.lanes.find((candidate) => candidate.laneId === laneId);
  if (lane == null) {
    throw new Error(`Trial lane ${laneId} does not exist.`);
  }

  return lane;
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

function invalidTrialSwap(board: Board, runtime: TrialRuntimeState): TrialSwapResult {
  return {
    valid: false,
    board,
    runtime,
    scoreDelta: 0,
    damageEvents: [],
    scoringStats: EMPTY_SWAP_SCORING_STATS,
  };
}
