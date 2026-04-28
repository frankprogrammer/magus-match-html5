import type { CellCoord } from '../core/Layout';
import { BOARD_SIZE } from '../core/Layout';
import type { SeededRng } from '../core/Rng';
import {
  buildBoardAnimationCascadeStep,
  createBoardAnimationTrace,
  type BoardAnimationCascadeStep,
  type BoardAnimationTrace,
  type BoardAnimationTraceOptions,
} from './BoardAnimationTrace';
import type { Board, TileIdFactory } from './Board';
import {
  cloneBoard,
  createTile,
  createTileIdFactory,
  fillEmptyCellsWithStandardTiles,
  sortCoords,
  uniqueCoords,
} from './Board';
import { detectMatches, type DetectMatchOptions, type MatchGroup } from './MatchDetection';
import type { PowerUpTileType } from './TileTypes';

export interface SpawnedPowerUp {
  type: PowerUpTileType;
  coord: CellCoord;
}

export interface CascadeStep {
  matches: readonly MatchGroup[];
  clearedCells: readonly CellCoord[];
  spawnedPowerUps: readonly SpawnedPowerUp[];
}

export interface CascadeResult {
  board: Board;
  steps: readonly CascadeStep[];
  animationTrace?: BoardAnimationTrace;
}

export interface ResolveCascadeOptions extends DetectMatchOptions {
  maxIterations?: number;
  nextTileId?: TileIdFactory;
  animation?: BoardAnimationTraceOptions;
}

export function resolveCascades(
  board: Board,
  rng: SeededRng,
  options: ResolveCascadeOptions = {},
): CascadeResult {
  const workingBoard = cloneBoard(board);
  const steps: CascadeStep[] = [];
  const animationSteps: BoardAnimationCascadeStep[] = [];
  const maxIterations = options.maxIterations ?? 50;
  const nextTileId = options.nextTileId ?? createTileIdFactory('cascade-tile');

  for (let iteration = 0; iteration < maxIterations; iteration += 1) {
    const matches = detectMatches(workingBoard, {
      preferredSpawnCell: iteration === 0 ? options.preferredSpawnCell : undefined,
    });

    if (matches.length === 0) {
      return {
        board: workingBoard,
        steps,
        animationTrace:
          options.animation == null
            ? undefined
            : createBoardAnimationTrace(options.animation, animationSteps, workingBoard),
      };
    }

    const beforeClearBoard = cloneBoard(workingBoard);
    const clearedCells = uniqueCoords(matches.flatMap((match) => match.tiles));
    const spawnedPowerUps = clearMatchesAndSpawnPowerUps(workingBoard, matches, nextTileId);
    const beforeGravityBoard = cloneBoard(workingBoard);
    applyGravity(workingBoard);
    const afterGravityBoard = cloneBoard(workingBoard);
    fillEmptyCellsWithStandardTiles(workingBoard, rng, nextTileId);
    const finalBoard = cloneBoard(workingBoard);

    steps.push({
      matches,
      clearedCells,
      spawnedPowerUps,
    });
    if (options.animation != null) {
      animationSteps.push(
        buildBoardAnimationCascadeStep(
          iteration,
          beforeClearBoard,
          beforeGravityBoard,
          afterGravityBoard,
          finalBoard,
          clearedCells,
        ),
      );
    }
  }

  throw new Error(`Cascade did not settle after ${maxIterations} iterations.`);
}

function clearMatchesAndSpawnPowerUps(
  board: Board,
  matches: readonly MatchGroup[],
  nextTileId: TileIdFactory,
): SpawnedPowerUp[] {
  const clearedCells = uniqueCoords(matches.flatMap((match) => match.tiles));
  for (const coord of clearedCells) {
    board[coord.row][coord.col].tile = null;
  }

  const spawnedPowerUps: SpawnedPowerUp[] = [];
  for (const match of matches) {
    if (match.spawnPowerUp == null) {
      continue;
    }

    const spawnCell = board[match.spawnCell.row][match.spawnCell.col];
    if (spawnCell.isVoid) {
      continue;
    }

    spawnCell.tile = createTile(match.spawnPowerUp, match.spawnCell.col, match.spawnCell.row, nextTileId);
    spawnedPowerUps.push({ type: match.spawnPowerUp, coord: match.spawnCell });
  }

  return spawnedPowerUps;
}

export function applyGravity(board: Board): void {
  for (let col = 0; col < BOARD_SIZE; col += 1) {
    const fallingTiles = [];
    for (let row = BOARD_SIZE - 1; row >= 0; row -= 1) {
      const cell = board[row][col];
      if (!cell.isVoid && cell.tile != null) {
        fallingTiles.push(cell.tile);
      }
    }

    for (let row = BOARD_SIZE - 1; row >= 0; row -= 1) {
      const cell = board[row][col];
      if (cell.isVoid) {
        cell.tile = null;
        continue;
      }

      const tile = fallingTiles.shift() ?? null;
      cell.tile = tile == null ? null : { ...tile, col, row };
    }
  }
}

export function getEmptyPlayableCells(board: Board): CellCoord[] {
  const coords: CellCoord[] = [];
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const cell = board[row][col];
      if (!cell.isVoid && cell.tile == null) {
        coords.push({ col, row });
      }
    }
  }

  return sortCoords(coords);
}
