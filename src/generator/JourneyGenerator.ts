import { BOARD_SIZE } from '../core/Layout';
import type { CellCoord } from '../core/Layout';
import { SeededRng } from '../core/Rng';
import {
  coordKey,
  countContiguousType,
  createEmptyBoard,
  createTile,
  createTileIdFactory,
  fillEmptyCellsWithStandardTiles,
  getAllPlayableCoords,
  sortCoords,
} from '../board/Board';
import type { Board, TileIdFactory } from '../board/Board';
import { getJourneyDifficultyConfig } from './DifficultyTable';

export interface JourneyHint {
  from: CellCoord;
  to: CellCoord;
}

export interface GeneratedJourneyLevel {
  type: 'JOURNEY';
  difficulty: number;
  seed: number;
  initialBoard: Board;
  journey: {
    moveBudget: number;
    startCell: CellCoord;
    goalCell: CellCoord;
    landTilePositions: CellCoord[];
    candidatePathSolution: CellCoord[];
    firstHint: JourneyHint;
  };
}

export interface GenerateJourneyLevelOptions {
  difficulty: number;
  seed: number;
}

const LEVEL_ONE_START: CellCoord = { col: 0, row: 0 };
const LEVEL_ONE_GOAL: CellCoord = { col: 7, row: 7 };
const FIRST_HINT: JourneyHint = {
  from: { col: 3, row: 1 },
  to: { col: 3, row: 0 },
};
const FORCED_HINT_LAND_CELLS: readonly CellCoord[] = [
  { col: 1, row: 0 },
  { col: 2, row: 0 },
  FIRST_HINT.from,
];

export function generateJourneyLevel(options: GenerateJourneyLevelOptions): GeneratedJourneyLevel {
  const rng = new SeededRng(options.seed);
  const config = getJourneyDifficultyConfig(options.difficulty);
  const candidatePathSolution = createCandidatePath(rng, LEVEL_ONE_START, LEVEL_ONE_GOAL);

  if (candidatePathSolution.length - 1 > config.moveBudget) {
    throw new Error('Generated Journey path exceeds move budget.');
  }

  const nextTileId = createTileIdFactory('journey-tile');
  const initialBoard = createEmptyBoard();
  initialBoard[LEVEL_ONE_START.row][LEVEL_ONE_START.col].isPath = true;

  const landTilePositions = seedLandTiles(
    initialBoard,
    rng,
    nextTileId,
    candidatePathSolution,
    config.candidatePathLandRatio,
    config.offPathLandRatio,
  );
  fillEmptyCellsWithStandardTiles(initialBoard, rng, nextTileId);

  return {
    type: 'JOURNEY',
    difficulty: options.difficulty,
    seed: options.seed,
    initialBoard,
    journey: {
      moveBudget: config.moveBudget,
      startCell: LEVEL_ONE_START,
      goalCell: LEVEL_ONE_GOAL,
      landTilePositions,
      candidatePathSolution,
      firstHint: FIRST_HINT,
    },
  };
}

export function isJourneySolvable(level: GeneratedJourneyLevel): boolean {
  return (
    level.journey.candidatePathSolution.length > 1 &&
    coordsEqual(level.journey.candidatePathSolution[0], level.journey.startCell) &&
    coordsEqual(
      level.journey.candidatePathSolution[level.journey.candidatePathSolution.length - 1],
      level.journey.goalCell,
    ) &&
    level.journey.candidatePathSolution.length - 1 <= level.journey.moveBudget &&
    level.initialBoard[level.journey.startCell.row][level.journey.startCell.col].isPath
  );
}

function createCandidatePath(rng: SeededRng, start: CellCoord, goal: CellCoord): CellCoord[] {
  const prefix: CellCoord[] = [
    start,
    { col: 1, row: 0 },
    { col: 2, row: 0 },
    { col: 3, row: 0 },
  ];
  const suffix = findRandomWeightedPath(rng, prefix[prefix.length - 1], goal);
  return [...prefix, ...suffix.slice(1)];
}

function findRandomWeightedPath(rng: SeededRng, start: CellCoord, goal: CellCoord): CellCoord[] {
  const allCoords = getAllBoardCoords();
  const entryCostByKey = new Map<string, number>();
  for (const coord of allCoords) {
    entryCostByKey.set(coordKey(coord), 1 + rng.nextFloat());
  }

  const distanceByKey = new Map<string, number>();
  const previousByKey = new Map<string, string>();
  const unsettled = new Set(allCoords.map(coordKey));

  for (const coord of allCoords) {
    distanceByKey.set(coordKey(coord), Number.POSITIVE_INFINITY);
  }
  distanceByKey.set(coordKey(start), 0);

  while (unsettled.size > 0) {
    const currentKey = [...unsettled].reduce((bestKey, nextKey) => {
      return (distanceByKey.get(nextKey) ?? Number.POSITIVE_INFINITY) <
        (distanceByKey.get(bestKey) ?? Number.POSITIVE_INFINITY)
        ? nextKey
        : bestKey;
    });
    unsettled.delete(currentKey);

    const current = parseCoordKey(currentKey);
    if (coordsEqual(current, goal)) {
      break;
    }

    for (const neighbor of getNeighbors(current)) {
      const neighborKey = coordKey(neighbor);
      if (!unsettled.has(neighborKey)) {
        continue;
      }

      const nextDistance =
        (distanceByKey.get(currentKey) ?? Number.POSITIVE_INFINITY) +
        (entryCostByKey.get(neighborKey) ?? 1);
      if (nextDistance < (distanceByKey.get(neighborKey) ?? Number.POSITIVE_INFINITY)) {
        distanceByKey.set(neighborKey, nextDistance);
        previousByKey.set(neighborKey, currentKey);
      }
    }
  }

  const path: CellCoord[] = [];
  let currentKey = coordKey(goal);
  while (currentKey !== coordKey(start)) {
    path.push(parseCoordKey(currentKey));
    const previousKey = previousByKey.get(currentKey);
    if (previousKey == null) {
      throw new Error('Unable to build Journey candidate path.');
    }
    currentKey = previousKey;
  }
  path.push(start);

  return path.reverse();
}

function seedLandTiles(
  board: Board,
  rng: SeededRng,
  nextTileId: TileIdFactory,
  candidatePath: readonly CellCoord[],
  candidatePathLandRatio: number,
  offPathLandRatio: number,
): CellCoord[] {
  const placed: CellCoord[] = [];
  const reserved = new Set([
    coordKey(LEVEL_ONE_START),
    coordKey(LEVEL_ONE_GOAL),
    coordKey(FIRST_HINT.to),
  ]);

  for (const coord of FORCED_HINT_LAND_CELLS) {
    if (tryPlaceLandTile(board, coord, nextTileId)) {
      placed.push(coord);
    }
  }

  const pathCandidates = shuffleCoords(
    candidatePath.filter((coord) => !reserved.has(coordKey(coord)) && !placed.some((land) => coordsEqual(land, coord))),
    rng,
  );
  const targetPathLandCount = Math.ceil(pathCandidates.length * candidatePathLandRatio);
  for (const coord of pathCandidates) {
    if (placed.length >= FORCED_HINT_LAND_CELLS.length + targetPathLandCount) {
      break;
    }

    if (tryPlaceLandTile(board, coord, nextTileId)) {
      placed.push(coord);
    }
  }

  const candidatePathKeys = new Set(candidatePath.map(coordKey));
  const offPathCandidates = shuffleCoords(
    getAllPlayableCoords(board).filter(
      (coord) =>
        !candidatePathKeys.has(coordKey(coord)) &&
        !reserved.has(coordKey(coord)) &&
        !placed.some((land) => coordsEqual(land, coord)),
    ),
    rng,
  );
  const targetOffPathLandCount = Math.ceil(offPathCandidates.length * offPathLandRatio);
  for (const coord of offPathCandidates.slice(0, targetOffPathLandCount)) {
    if (tryPlaceLandTile(board, coord, nextTileId)) {
      placed.push(coord);
    }
  }

  return sortCoords(placed);
}

function tryPlaceLandTile(board: Board, coord: CellCoord, nextTileId: TileIdFactory): boolean {
  const cell = board[coord.row]?.[coord.col];
  if (cell == null || cell.isVoid || cell.tile != null || wouldCreateLandMatch(board, coord)) {
    return false;
  }

  cell.tile = createTile('LAND', coord.col, coord.row, nextTileId);
  return true;
}

function wouldCreateLandMatch(board: Board, coord: CellCoord): boolean {
  return (
    countContiguousType(board, coord, 'LAND', -1, 0) +
      countContiguousType(board, coord, 'LAND', 1, 0) +
      1 >=
      3 ||
    countContiguousType(board, coord, 'LAND', 0, -1) +
      countContiguousType(board, coord, 'LAND', 0, 1) +
      1 >=
      3
  );
}

function getNeighbors(coord: CellCoord): CellCoord[] {
  return [
    { col: coord.col + 1, row: coord.row },
    { col: coord.col, row: coord.row + 1 },
    { col: coord.col - 1, row: coord.row },
    { col: coord.col, row: coord.row - 1 },
  ].filter((neighbor) => neighbor.col >= 0 && neighbor.col < BOARD_SIZE && neighbor.row >= 0 && neighbor.row < BOARD_SIZE);
}

function getAllBoardCoords(): CellCoord[] {
  return Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => ({
    col: index % BOARD_SIZE,
    row: Math.floor(index / BOARD_SIZE),
  }));
}

function shuffleCoords(coords: readonly CellCoord[], rng: SeededRng): CellCoord[] {
  const shuffled = [...coords];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = rng.nextInt(0, i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function parseCoordKey(key: string): CellCoord {
  const [col, row] = key.split(',').map(Number);
  return { col, row };
}

function coordsEqual(first: CellCoord, second: CellCoord): boolean {
  return first.col === second.col && first.row === second.row;
}
