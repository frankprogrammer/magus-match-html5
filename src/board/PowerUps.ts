import type { CellCoord } from '../core/Layout';
import { BOARD_SIZE } from '../core/Layout';
import { ROCKET_SWEEP_CLEAR_STAGGER_MS, TNT_EXPLOSION_RING_DELAY_MS } from '../data/tuning';
import type { Board } from './Board';
import { cloneBoard, coordKey, getCell, isInBounds, sortCoords, uniqueCoords } from './Board';
import {
  STANDARD_TILE_TYPES,
  isPowerUpTileType,
  isStandardTileType,
  type MatchableTileType,
  type PowerUpTileType,
  type StandardTileType,
} from './TileTypes';

export type RocketPowerUpTileType = 'ROCKET_H' | 'ROCKET_V';
export type TapActivatablePowerUpTileType = RocketPowerUpTileType | 'TNT' | 'LIGHTBALL';

export interface PowerUpClearTiming {
  coord: CellCoord;
  clearDelayMs: number;
}

export interface PowerUpDetonationOptions {
  lightballTargetType?: MatchableTileType;
}

export interface PowerUpDetonation {
  powerUpType: PowerUpTileType;
  origin: CellCoord;
  clearedCells: readonly CellCoord[];
  clearTimings: readonly PowerUpClearTiming[];
  lightballTargetType?: MatchableTileType;
}

export interface PowerUpChainDetonation {
  detonation: PowerUpDetonation;
  activationDelayMs: number;
}

export interface PowerUpChainResolution {
  detonations: readonly PowerUpChainDetonation[];
  clearedCells: readonly CellCoord[];
  clearTimings: readonly PowerUpClearTiming[];
}

interface QueuedPowerUpActivation {
  coord: CellCoord;
  powerUpType: PowerUpTileType;
  activationDelayMs: number;
  lightballTargetType?: MatchableTileType;
}

export function isRocketPowerUpTileType(type: unknown): type is RocketPowerUpTileType {
  return type === 'ROCKET_H' || type === 'ROCKET_V';
}

export function isTapActivatablePowerUpTileType(type: unknown): type is TapActivatablePowerUpTileType {
  return isRocketPowerUpTileType(type) || type === 'TNT' || type === 'LIGHTBALL';
}

export function selectLightballTapTargetType(board: Board, origin: CellCoord): StandardTileType | null {
  if (getCell(board, origin)?.tile?.type !== 'LIGHTBALL') {
    return null;
  }

  return selectLightballTargetType(board, origin);
}

function selectLightballTargetType(board: Board, origin: CellCoord): StandardTileType | null {
  const adjacentCandidates = new Set<StandardTileType>();
  for (const coord of orthogonalNeighbors(origin)) {
    const type = getCell(board, coord)?.tile?.type;
    if (type != null && isStandardTileType(type)) {
      adjacentCandidates.add(type);
    }
  }

  if (adjacentCandidates.size === 0) {
    return null;
  }

  const counts = countStandardTiles(board);
  return STANDARD_TILE_TYPES.filter((type) => adjacentCandidates.has(type)).reduce((best, candidate) => {
    if (best == null) {
      return candidate;
    }

    return counts[candidate] > counts[best] ? candidate : best;
  }, null as StandardTileType | null);
}

export function detonatePowerUp(
  board: Board,
  origin: CellCoord,
  options: PowerUpDetonationOptions = {},
): PowerUpDetonation {
  const originCell = getCell(board, origin);
  const powerUpType = originCell?.tile?.type;

  if (
    powerUpType !== 'ROCKET_H' &&
    powerUpType !== 'ROCKET_V' &&
    powerUpType !== 'TNT' &&
    powerUpType !== 'LIGHTBALL'
  ) {
    throw new Error('Cannot detonate a cell that does not contain a power-up tile.');
  }

  return detonatePowerUpType(board, origin, powerUpType, options);
}

export function resolvePowerUpChain(
  board: Board,
  origin: CellCoord,
  options: PowerUpDetonationOptions = {},
): PowerUpChainResolution {
  const originType = getCell(board, origin)?.tile?.type;
  if (originType == null || !isPowerUpTileType(originType)) {
    throw new Error('Cannot resolve a power-up chain from a cell that does not contain a power-up tile.');
  }

  const workingBoard = cloneBoard(board);
  const queue: QueuedPowerUpActivation[] = [{
    coord: origin,
    powerUpType: originType,
    activationDelayMs: 0,
    lightballTargetType: options.lightballTargetType,
  }];
  const queuedKeys = new Set<string>([coordKey(origin)]);
  const activatedKeys = new Set<string>();
  const detonations: PowerUpChainDetonation[] = [];

  while (queue.length > 0) {
    queue.sort(compareQueuedPowerUps);
    const activation = queue.shift()!;
    const activationKey = coordKey(activation.coord);
    queuedKeys.delete(activationKey);
    if (activatedKeys.has(activationKey)) {
      continue;
    }

    activatedKeys.add(activationKey);
    const selectedLightballTargetType = activation.powerUpType === 'LIGHTBALL'
      ? activation.lightballTargetType ?? selectLightballTargetType(workingBoard, activation.coord)
      : activation.lightballTargetType;
    const lightballTargetType = selectedLightballTargetType ?? undefined;
    const rawDetonation = detonatePowerUpType(
      workingBoard,
      activation.coord,
      activation.powerUpType,
      { lightballTargetType },
    );
    const childKeys = new Set<string>();

    for (const timing of rawDetonation.clearTimings) {
      const key = coordKey(timing.coord);
      if (key === activationKey || activatedKeys.has(key) || queuedKeys.has(key)) {
        continue;
      }

      const childType = getCell(workingBoard, timing.coord)?.tile?.type;
      if (childType == null || !isPowerUpTileType(childType)) {
        continue;
      }

      queue.push({
        coord: timing.coord,
        powerUpType: childType,
        activationDelayMs: activation.activationDelayMs + timing.clearDelayMs,
      });
      queuedKeys.add(key);
      childKeys.add(key);
    }

    const clearTimings = rawDetonation.clearTimings.filter((timing) => !childKeys.has(coordKey(timing.coord)));
    const detonation: PowerUpDetonation = {
      ...rawDetonation,
      clearedCells: sortCoords(clearTimings.map((timing) => timing.coord)),
      clearTimings,
      lightballTargetType,
    };

    detonations.push({
      detonation,
      activationDelayMs: activation.activationDelayMs,
    });

    for (const coord of detonation.clearedCells) {
      const cell = getCell(workingBoard, coord);
      if (cell != null) {
        cell.tile = null;
      }
    }
  }

  const absoluteTimings = detonations.flatMap((entry) =>
    entry.detonation.clearTimings.map((timing) => ({
      coord: timing.coord,
      clearDelayMs: entry.activationDelayMs + timing.clearDelayMs,
    })),
  );

  return {
    detonations,
    clearedCells: uniqueCoords(detonations.flatMap((entry) => entry.detonation.clearedCells)),
    clearTimings: absoluteTimings,
  };
}

function detonatePowerUpType(
  board: Board,
  origin: CellCoord,
  powerUpType: PowerUpTileType,
  options: PowerUpDetonationOptions = {},
): PowerUpDetonation {
  switch (powerUpType) {
    case 'ROCKET_H':
      return rocketDetonation(board, origin, powerUpType);
    case 'ROCKET_V':
      return rocketDetonation(board, origin, powerUpType);
    case 'TNT':
      return tntDetonation(board, origin, powerUpType);
    case 'LIGHTBALL': {
      const clearedCells = lightballCells(board, origin, options.lightballTargetType);
      return {
        powerUpType,
        origin,
        clearedCells,
        clearTimings: clearedCells.map((coord) => ({ coord, clearDelayMs: 0 })),
        lightballTargetType: options.lightballTargetType,
      };
    }
  }
}

function compareQueuedPowerUps(first: QueuedPowerUpActivation, second: QueuedPowerUpActivation): number {
  return (
    first.activationDelayMs - second.activationDelayMs ||
    first.coord.row - second.coord.row ||
    first.coord.col - second.coord.col ||
    first.powerUpType.localeCompare(second.powerUpType)
  );
}

export function getTntBlastClearTimings(board: Board, origin: CellCoord): PowerUpClearTiming[] {
  const cells = tntCells(board, origin);
  return [
    ...cells.filter((coord) => coord.col === origin.col && coord.row === origin.row),
    ...cells.filter((coord) => coord.col !== origin.col || coord.row !== origin.row),
  ].map((coord) => ({
    coord,
    clearDelayMs:
      coord.col === origin.col && coord.row === origin.row
        ? 0
        : TNT_EXPLOSION_RING_DELAY_MS,
  }));
}

export function getRocketSweepClearTimings(
  board: Board,
  origin: CellCoord,
  powerUpType: RocketPowerUpTileType,
): PowerUpClearTiming[] {
  const timings: PowerUpClearTiming[] = [{ coord: origin, clearDelayMs: 0 }];
  const maxDistance = BOARD_SIZE - 1;
  for (let distance = 1; distance <= maxDistance; distance += 1) {
    const candidates = powerUpType === 'ROCKET_H'
      ? [
          { col: origin.col - distance, row: origin.row },
          { col: origin.col + distance, row: origin.row },
        ]
      : [
          { col: origin.col, row: origin.row - distance },
          { col: origin.col, row: origin.row + distance },
        ];

    for (const coord of candidates) {
      if (isPlayableCell(board, coord)) {
        timings.push({
          coord,
          clearDelayMs: distance * ROCKET_SWEEP_CLEAR_STAGGER_MS,
        });
      }
    }
  }

  return timings;
}

function tntDetonation(
  board: Board,
  origin: CellCoord,
  powerUpType: 'TNT',
): PowerUpDetonation {
  const clearTimings = getTntBlastClearTimings(board, origin);
  return {
    powerUpType,
    origin,
    clearedCells: sortCoords(clearTimings.map((timing) => timing.coord)),
    clearTimings,
  };
}

function rocketDetonation(
  board: Board,
  origin: CellCoord,
  powerUpType: RocketPowerUpTileType,
): PowerUpDetonation {
  const clearTimings = getRocketSweepClearTimings(board, origin, powerUpType);
  return {
    powerUpType,
    origin,
    clearedCells: sortCoords(clearTimings.map((timing) => timing.coord)),
    clearTimings,
  };
}

function tntCells(board: Board, origin: CellCoord): CellCoord[] {
  const coords: CellCoord[] = [];
  for (let row = origin.row - 1; row <= origin.row + 1; row += 1) {
    for (let col = origin.col - 1; col <= origin.col + 1; col += 1) {
      coords.push({ col, row });
    }
  }

  return playableCells(board, coords);
}

function lightballCells(
  board: Board,
  origin: CellCoord,
  targetType?: MatchableTileType,
): CellCoord[] {
  const coords: CellCoord[] = [origin];
  if (targetType == null) {
    return coords;
  }

  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const coord = { col, row };
      const cell = getCell(board, coord);
      if (!cell?.isVoid && cell?.tile?.type === targetType) {
        coords.push(coord);
      }
    }
  }

  return uniqueCoords(coords);
}

function orthogonalNeighbors(origin: CellCoord): CellCoord[] {
  return [
    { col: origin.col + 1, row: origin.row },
    { col: origin.col, row: origin.row + 1 },
    { col: origin.col - 1, row: origin.row },
    { col: origin.col, row: origin.row - 1 },
  ].filter(isInBounds);
}

function countStandardTiles(board: Board): Record<StandardTileType, number> {
  const counts: Record<StandardTileType, number> = {
    FIRE: 0,
    ICE: 0,
    LIGHTNING: 0,
    EARTH: 0,
  };

  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const type = board[row][col].tile?.type;
      if (type != null && isStandardTileType(type)) {
        counts[type] += 1;
      }
    }
  }

  return counts;
}

function playableCells(board: Board, coords: readonly CellCoord[]): CellCoord[] {
  return sortCoords(
    coords.filter((coord) => {
      return isPlayableCell(board, coord);
    }),
  );
}

function isPlayableCell(board: Board, coord: CellCoord): boolean {
  if (!isInBounds(coord)) {
    return false;
  }

  return !board[coord.row][coord.col].isVoid;
}
