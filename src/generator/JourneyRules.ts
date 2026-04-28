import type { CellCoord } from '../core/Layout';
import { BOARD_SIZE } from '../core/Layout';
import type { SeededRng } from '../core/Rng';
import {
  cloneBoard,
  coordKey,
  coordsEqual,
  createTile,
  createTileIdFactory,
  fillEmptyCellsWithStandardTiles,
  getAllPlayableCoords,
  swapTilesInPlace,
  uniqueCoords,
} from '../board/Board';
import type { Board, TileIdFactory } from '../board/Board';
import { validateSwap } from '../board/BoardRules';
import { applyGravity } from '../board/Cascade';
import { detectMatches, type MatchGroup } from '../board/MatchDetection';
import { isStandardTileType } from '../board/TileTypes';
import { FIRST_MATCH_HINT_DELAY_MS } from '../data/tuning';
import { createSwapScoringStats, EMPTY_SWAP_SCORING_STATS, type SwapScoringStats } from '../run/Scoring';
import type { GeneratedJourneyLevel } from './JourneyGenerator';

export type JourneyResult = 'playing' | 'won' | 'lost';

export interface JourneyRuntimeState {
  movesRemaining: number;
  mageCell: CellCoord;
  hasPlayerMoved: boolean;
  result: JourneyResult;
}

export interface JourneySwapResult {
  valid: boolean;
  board: Board;
  runtime: JourneyRuntimeState;
  scoreDelta: number;
  convertedPathCells: readonly CellCoord[];
  clearedStandardCells: readonly CellCoord[];
  scoringStats: SwapScoringStats;
}

export function createJourneyRuntime(level: GeneratedJourneyLevel): JourneyRuntimeState {
  return {
    movesRemaining: level.journey.moveBudget,
    mageCell: level.journey.startCell,
    hasPlayerMoved: false,
    result: 'playing',
  };
}

export function processJourneySwap(
  board: Board,
  runtime: JourneyRuntimeState,
  level: GeneratedJourneyLevel,
  from: CellCoord,
  to: CellCoord,
  rng: SeededRng,
): JourneySwapResult {
  if (runtime.result !== 'playing') {
    return invalidJourneySwap(board, runtime);
  }

  const validation = validateSwap(board, from, to);
  if (!validation.valid) {
    return invalidJourneySwap(board, runtime);
  }

  const swappedBoard = cloneBoard(board);
  swapTilesInPlace(swappedBoard, from, to);

  const resolution = resolveJourneyBoard(swappedBoard, rng, { preferredSpawnCell: to });
  const nextMovesRemaining = Math.max(0, runtime.movesRemaining - 1);
  const nextMageCell =
    resolution.convertedPathCells.length > 0
      ? advanceMageOneStep(resolution.board, runtime.mageCell, level.journey.goalCell)
      : runtime.mageCell;
  const result = getJourneyResult(nextMageCell, level.journey.goalCell, nextMovesRemaining);

  return {
    valid: true,
    board: resolution.board,
    runtime: {
      movesRemaining: nextMovesRemaining,
      mageCell: nextMageCell,
      hasPlayerMoved: true,
      result,
    },
    scoreDelta: resolution.clearedStandardCells.length * 10,
    convertedPathCells: resolution.convertedPathCells,
    clearedStandardCells: resolution.clearedStandardCells,
    scoringStats: createSwapScoringStats(resolution.matchCount, resolution.powerUpsCreated),
  };
}

export interface JourneyBoardResolution {
  board: Board;
  convertedPathCells: readonly CellCoord[];
  clearedStandardCells: readonly CellCoord[];
  matchCount: number;
  powerUpsCreated: number;
}

export interface ResolveJourneyBoardOptions {
  preferredSpawnCell?: CellCoord;
  maxIterations?: number;
  nextTileId?: TileIdFactory;
}

export function resolveJourneyBoard(
  board: Board,
  rng: SeededRng,
  options: ResolveJourneyBoardOptions = {},
): JourneyBoardResolution {
  const workingBoard = cloneBoard(board);
  const convertedPathCells: CellCoord[] = [];
  const clearedStandardCells: CellCoord[] = [];
  let matchCount = 0;
  let powerUpsCreated = 0;
  const maxIterations = options.maxIterations ?? 50;
  const nextTileId = options.nextTileId ?? createTileIdFactory('journey-cascade-tile');

  for (let iteration = 0; iteration < maxIterations; iteration += 1) {
    const matches = detectMatches(workingBoard, {
      preferredSpawnCell: iteration === 0 ? options.preferredSpawnCell : undefined,
    });

    if (matches.length === 0) {
      return {
        board: workingBoard,
        convertedPathCells: uniqueCoords(convertedPathCells),
        clearedStandardCells: uniqueCoords(clearedStandardCells),
        matchCount,
        powerUpsCreated,
      };
    }

    const matchedCells = applyJourneyMatches(workingBoard, matches, nextTileId);
    matchCount += matches.length;
    powerUpsCreated += matchedCells.powerUpsCreated;
    convertedPathCells.push(...matchedCells.convertedPathCells);
    clearedStandardCells.push(...matchedCells.clearedStandardCells);
    applyGravity(workingBoard);
    fillEmptyCellsWithStandardTiles(workingBoard, rng, nextTileId);
  }

  throw new Error(`Journey board did not settle after ${maxIterations} iterations.`);
}

export function advanceMageOneStep(board: Board, mageCell: CellCoord, goalCell: CellCoord): CellCoord {
  const connectedPath = getConnectedPathCells(board, mageCell);
  const connectedKeys = new Set(connectedPath.map(coordKey));
  const candidates = getAdjacentCells(mageCell).filter((coord) => connectedKeys.has(coordKey(coord)));

  if (candidates.length === 0) {
    return mageCell;
  }

  return candidates.reduce((best, candidate) => {
    const bestDistance = manhattanDistance(best, goalCell);
    const candidateDistance = manhattanDistance(candidate, goalCell);
    if (candidateDistance !== bestDistance) {
      return candidateDistance < bestDistance ? candidate : best;
    }

    return candidate.row < best.row || (candidate.row === best.row && candidate.col < best.col) ? candidate : best;
  });
}

export function getVisibleJourneyHintCells(
  level: GeneratedJourneyLevel,
  runtime: JourneyRuntimeState,
  elapsedSec: number,
): CellCoord[] {
  if (runtime.hasPlayerMoved || runtime.result !== 'playing' || elapsedSec * 1000 < FIRST_MATCH_HINT_DELAY_MS) {
    return [];
  }

  return [level.journey.firstHint.from, level.journey.firstHint.to];
}

function applyJourneyMatches(
  board: Board,
  matches: readonly MatchGroup[],
  nextTileId: TileIdFactory,
): { convertedPathCells: CellCoord[]; clearedStandardCells: CellCoord[]; powerUpsCreated: number } {
  const convertedPathCells: CellCoord[] = [];
  const clearedStandardCells: CellCoord[] = [];
  let powerUpsCreated = 0;

  for (const match of matches) {
    if (match.tileType === 'LAND') {
      for (const coord of match.tiles) {
        const cell = board[coord.row][coord.col];
        cell.isPath = true;
        cell.tile = null;
        convertedPathCells.push(coord);
      }
      continue;
    }

    for (const coord of match.tiles) {
      const cell = board[coord.row][coord.col];
      if (cell.tile != null && isStandardTileType(cell.tile.type)) {
        clearedStandardCells.push(coord);
      }
      cell.tile = null;
    }

    if (match.spawnPowerUp != null) {
      const spawnCell = board[match.spawnCell.row][match.spawnCell.col];
      if (!spawnCell.isVoid) {
        spawnCell.tile = createTile(match.spawnPowerUp, match.spawnCell.col, match.spawnCell.row, nextTileId);
        powerUpsCreated += 1;
      }
    }
  }

  return {
    convertedPathCells,
    clearedStandardCells,
    powerUpsCreated,
  };
}

function invalidJourneySwap(board: Board, runtime: JourneyRuntimeState): JourneySwapResult {
  return {
    valid: false,
    board,
    runtime,
    scoreDelta: 0,
    convertedPathCells: [],
    clearedStandardCells: [],
    scoringStats: EMPTY_SWAP_SCORING_STATS,
  };
}

function getJourneyResult(mageCell: CellCoord, goalCell: CellCoord, movesRemaining: number): JourneyResult {
  if (coordsEqual(mageCell, goalCell)) {
    return 'won';
  }

  return movesRemaining <= 0 ? 'lost' : 'playing';
}

function getConnectedPathCells(board: Board, start: CellCoord): CellCoord[] {
  if (!board[start.row]?.[start.col]?.isPath) {
    return [];
  }

  const visited = new Set<string>();
  const queue = [start];

  while (queue.length > 0) {
    const current = queue.shift()!;
    const key = coordKey(current);
    if (visited.has(key)) {
      continue;
    }

    visited.add(key);

    for (const neighbor of getAdjacentCells(current)) {
      if (board[neighbor.row][neighbor.col].isPath && !visited.has(coordKey(neighbor))) {
        queue.push(neighbor);
      }
    }
  }

  return getAllPlayableCoords(board).filter((coord) => visited.has(coordKey(coord)));
}

function getAdjacentCells(coord: CellCoord): CellCoord[] {
  return [
    { col: coord.col + 1, row: coord.row },
    { col: coord.col, row: coord.row + 1 },
    { col: coord.col - 1, row: coord.row },
    { col: coord.col, row: coord.row - 1 },
  ].filter((candidate) => candidate.col >= 0 && candidate.col < BOARD_SIZE && candidate.row >= 0 && candidate.row < BOARD_SIZE);
}

function manhattanDistance(first: CellCoord, second: CellCoord): number {
  return Math.abs(first.col - second.col) + Math.abs(first.row - second.row);
}
