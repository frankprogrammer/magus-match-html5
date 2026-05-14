import type { CellCoord } from '../core/Layout';
import { BOARD_SIZE } from '../core/Layout';
import type { SeededRng } from '../core/Rng';
import {
  buildBoardAnimationCascadeStep,
  createBoardAnimationTrace,
  createInvalidSwapAnimationTrace,
  type BoardAnimationCascadeStep,
  type BoardAnimationTrace,
  type BoardAnimationTraceOptions,
} from '../board/BoardAnimationTrace';
import {
  cloneBoard,
  coordKey,
  coordsEqual,
  createBoardScopedTileIdFactory,
  createTile,
  getAllPlayableCoords,
  getCell,
  swapTilesInPlace,
  uniqueCoords,
} from '../board/Board';
import type { Board, TileIdFactory } from '../board/Board';
import { validateSwap } from '../board/BoardRules';
import { settleBoardWithVoidAwareRefill } from '../board/Cascade';
import { detectMatches, type MatchGroup } from '../board/MatchDetection';
import {
  isTapActivatablePowerUpTileType,
  resolvePowerUpChain,
  selectLightballTapTargetType,
  type PowerUpDetonation,
  type PowerUpChainResolution,
} from '../board/PowerUps';
import { isMatchableTileType, isStandardTileType, type MatchableTileType, type TileType } from '../board/TileTypes';
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
  powerUpsUsed: number;
  animationTrace?: BoardAnimationTrace;
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
    if (validation.reason === 'noMatch') {
      return invalidJourneySwap(board, runtime, createInvalidSwapAnimationTrace(board, from, to, 0));
    }

    return invalidJourneySwap(board, runtime);
  }

  const powerUpActivation = getTapActivatablePowerUpSwapActivation(board, from, to);
  const swappedBoard = cloneBoard(board);
  swapTilesInPlace(swappedBoard, from, to);

  const animation = {
    revisionId: 0,
    preSwapBoard: board,
    postSwapBoard: swappedBoard,
    swappedCells: { from, to },
  };
  const resolution = powerUpActivation == null
    ? resolveJourneyBoard(swappedBoard, rng, {
        preferredSpawnCell: to,
        animation,
      })
    : resolveJourneyPowerUpActivation(
        swappedBoard,
        rng,
        powerUpActivation.originAfterSwap,
        animation,
        powerUpActivation.targetType,
      );

  return finishJourneyAction(runtime, level, resolution, powerUpActivation == null ? 0 : 1);
}

export function processJourneyPowerUpActivation(
  board: Board,
  runtime: JourneyRuntimeState,
  level: GeneratedJourneyLevel,
  origin: CellCoord,
  rng: SeededRng,
): JourneySwapResult {
  const tapActivation = getTapPowerUpActivation(board, origin);
  if (runtime.result !== 'playing' || tapActivation == null) {
    return invalidJourneySwap(board, runtime);
  }

  const resolution = resolveJourneyPowerUpActivation(board, rng, origin, {
    revisionId: 0,
    preSwapBoard: board,
    postSwapBoard: board,
    swappedCells: null,
  }, tapActivation.targetType);

  return finishJourneyAction(runtime, level, resolution, 1);
}

export function processJourneyRocketActivation(
  board: Board,
  runtime: JourneyRuntimeState,
  level: GeneratedJourneyLevel,
  origin: CellCoord,
  rng: SeededRng,
): JourneySwapResult {
  return processJourneyPowerUpActivation(board, runtime, level, origin, rng);
}

function finishJourneyAction(
  runtime: JourneyRuntimeState,
  level: GeneratedJourneyLevel,
  resolution: JourneyBoardResolution,
  minimumMatchCount: number,
): JourneySwapResult {
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
    scoringStats: createSwapScoringStats(Math.max(minimumMatchCount, resolution.matchCount), resolution.powerUpsCreated),
    powerUpsUsed: resolution.powerUpsUsed,
    animationTrace: resolution.animationTrace,
  };
}

export interface JourneyBoardResolution {
  board: Board;
  convertedPathCells: readonly CellCoord[];
  clearedStandardCells: readonly CellCoord[];
  matchCount: number;
  powerUpsCreated: number;
  powerUpsUsed: number;
  animationTrace?: BoardAnimationTrace;
}

export interface ResolveJourneyBoardOptions {
  preferredSpawnCell?: CellCoord;
  maxIterations?: number;
  nextTileId?: TileIdFactory;
  animation?: BoardAnimationTraceOptions;
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
  const animationSteps: BoardAnimationCascadeStep[] = [];
  const maxIterations = options.maxIterations ?? 50;
  const nextTileId = options.nextTileId ?? createBoardScopedTileIdFactory(workingBoard, 'journey-cascade-tile');

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
        powerUpsUsed: 0,
        animationTrace:
          options.animation == null
            ? undefined
            : createBoardAnimationTrace(options.animation, animationSteps, workingBoard),
      };
    }

    const beforeClearBoard = cloneBoard(workingBoard);
    const clearedCells = uniqueCoords(matches.flatMap((match) => match.tiles));
    const matchedCells = applyJourneyMatches(workingBoard, matches, nextTileId);
    const beforeGravityBoard = cloneBoard(workingBoard);
    matchCount += matches.length;
    powerUpsCreated += matchedCells.powerUpsCreated;
    convertedPathCells.push(...matchedCells.convertedPathCells);
    clearedStandardCells.push(...matchedCells.clearedStandardCells);
    const refillResult = settleBoardWithVoidAwareRefill(workingBoard, rng, nextTileId);
    const finalBoard = cloneBoard(workingBoard);

    if (options.animation != null) {
      animationSteps.push(
        buildBoardAnimationCascadeStep(
          iteration,
          beforeClearBoard,
          beforeGravityBoard,
          refillResult.afterGravityBoard,
          finalBoard,
          clearedCells,
          new Map(),
          refillResult.refillTiles,
        ),
      );
    }
  }

  throw new Error(`Journey board did not settle after ${maxIterations} iterations.`);
}

function resolveJourneyPowerUpActivation(
  board: Board,
  rng: SeededRng,
  origin: CellCoord,
  animation: BoardAnimationTraceOptions,
  lightballTargetType?: MatchableTileType,
): JourneyBoardResolution {
  const workingBoard = cloneBoard(board);
  const nextTileId = createBoardScopedTileIdFactory(workingBoard, 'journey-powerup-cascade-tile');
  const chain = resolvePowerUpChain(workingBoard, origin, { lightballTargetType });
  const beforeChainClearBoard = cloneBoard(workingBoard);
  const chainConvertedPathCells: CellCoord[] = [];
  const chainClearedStandardCells: CellCoord[] = [];

  for (const entry of chain.detonations) {
    const detonationResult = applyJourneyDetonation(workingBoard, entry.detonation);
    chainConvertedPathCells.push(...detonationResult.convertedPathCells);
    chainClearedStandardCells.push(...detonationResult.clearedStandardCells);
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
  const cascadeResolution = resolveJourneyBoard(workingBoard, rng, {
    nextTileId,
    animation,
  });

  return {
    board: cascadeResolution.board,
    convertedPathCells: uniqueCoords([
      ...chainConvertedPathCells,
      ...cascadeResolution.convertedPathCells,
    ]),
    clearedStandardCells: uniqueCoords([
      ...chainClearedStandardCells,
      ...cascadeResolution.clearedStandardCells,
    ]),
    matchCount: 1 + cascadeResolution.matchCount,
    powerUpsCreated: cascadeResolution.powerUpsCreated,
    powerUpsUsed: chain.detonations.length + cascadeResolution.powerUpsUsed,
    animationTrace: createBoardAnimationTrace(
      animation,
      [
        chainStep,
        ...(cascadeResolution.animationTrace?.cascadeSteps.map((step, index) => ({
          ...step,
          stepIndex: index + 1,
        })) ?? []),
      ],
      cascadeResolution.board,
    ),
  };
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

function applyJourneyDetonation(
  board: Board,
  detonation: PowerUpDetonation,
): { convertedPathCells: CellCoord[]; clearedStandardCells: CellCoord[] } {
  const convertedPathCells: CellCoord[] = [];
  const clearedStandardCells: CellCoord[] = [];

  for (const coord of detonation.clearedCells) {
    const cell = getCell(board, coord);
    if (cell?.tile == null) {
      continue;
    }

    if (cell.tile.type === 'LAND') {
      cell.isPath = true;
      convertedPathCells.push(coord);
    } else if (isStandardTileType(cell.tile.type)) {
      clearedStandardCells.push(coord);
    }

    cell.tile = null;
  }

  return {
    convertedPathCells,
    clearedStandardCells,
  };
}

function getTapActivatablePowerUpSwapActivation(
  board: Board,
  from: CellCoord,
  to: CellCoord,
): { originAfterSwap: CellCoord; targetType?: MatchableTileType } | null {
  const fromType = getCell(board, from)?.tile?.type;
  const toType = getCell(board, to)?.tile?.type;
  if (isTapActivatablePowerUpTileType(fromType)) {
    return { originAfterSwap: to, targetType: matchableTargetType(toType) };
  }

  if (isTapActivatablePowerUpTileType(toType)) {
    return { originAfterSwap: from, targetType: matchableTargetType(fromType) };
  }

  return null;
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

function matchableTargetType(type?: TileType): MatchableTileType | undefined {
  return type != null && isMatchableTileType(type) ? type : undefined;
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

function invalidJourneySwap(
  board: Board,
  runtime: JourneyRuntimeState,
  animationTrace?: BoardAnimationTrace,
): JourneySwapResult {
  return {
    valid: false,
    board,
    runtime,
    scoreDelta: 0,
    convertedPathCells: [],
    clearedStandardCells: [],
    scoringStats: EMPTY_SWAP_SCORING_STATS,
    powerUpsUsed: 0,
    animationTrace,
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
