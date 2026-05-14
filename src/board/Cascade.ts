import type { CellCoord } from '../core/Layout';
import { BOARD_SIZE } from '../core/Layout';
import type { SeededRng } from '../core/Rng';
import {
  buildBoardAnimationCascadeStep,
  createBoardAnimationTrace,
  type BoardAnimationCascadeStep,
  type BoardAnimationRefill,
  type BoardAnimationTrace,
  type BoardAnimationTraceOptions,
} from './BoardAnimationTrace';
import type { Board, TileIdFactory } from './Board';
import {
  cloneBoard,
  createBoardScopedTileIdFactory,
  createTile,
  sortCoords,
  uniqueCoords,
  wouldCreateMatchAt,
} from './Board';
import { detectMatches, type DetectMatchOptions, type MatchGroup } from './MatchDetection';
import { STANDARD_TILE_TYPES, type PowerUpTileType } from './TileTypes';

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
  const nextTileId = options.nextTileId ?? createBoardScopedTileIdFactory(workingBoard, 'cascade-tile');

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
    const refillResult = settleBoardWithVoidAwareRefill(workingBoard, rng, nextTileId);
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
          refillResult.afterGravityBoard,
          finalBoard,
          clearedCells,
          new Map(),
          refillResult.refillTiles,
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
  for (let iteration = 0; iteration < BOARD_SIZE * BOARD_SIZE; iteration += 1) {
    const verticalMoved = applySegmentedVerticalGravity(board);
    const diagonalMoved = applyDiagonalVoidSlides(board);
    if (!verticalMoved && !diagonalMoved) {
      return;
    }
  }
}

export interface VoidAwareRefillResult {
  afterGravityBoard: Board;
  refillTiles: readonly BoardAnimationRefill[];
}

export function settleBoardWithVoidAwareRefill(
  board: Board,
  rng: SeededRng,
  nextTileId: TileIdFactory,
): VoidAwareRefillResult {
  applyGravity(board);
  const afterGravityBoard = cloneBoard(board);
  const refillTiles: BoardAnimationRefill[] = [];
  const refillIndexBySourceColumn = new Map<number, number>();
  const emptyCells = getEmptyPlayableCells(board).sort(
    (first, second) => first.col - second.col || second.row - first.row,
  );

  for (const coord of emptyCells) {
    const sourceColumn = isTopAccessibleCell(board, coord)
      ? coord.col
      : chooseAdjacentRefillSourceColumn(board, coord);
    const isBlocked = !isTopAccessibleCell(board, coord);
    const sourceIndex = refillIndexBySourceColumn.get(sourceColumn) ?? 0;
    if (!isBlocked) {
      refillIndexBySourceColumn.set(sourceColumn, sourceIndex + 1);
    }
    const candidateTypes = STANDARD_TILE_TYPES.filter((type) => !wouldCreateMatchAt(board, coord, type));
    const candidatePool = candidateTypes.length > 0 ? candidateTypes : STANDARD_TILE_TYPES;
    const tile = createTile(candidatePool[rng.nextInt(0, candidatePool.length)], coord.col, coord.row, nextTileId);

    board[coord.row][coord.col].tile = tile;
    refillTiles.push({
      tileId: tile.id,
      tileType: tile.type,
      from: isBlocked
        ? { col: sourceColumn, row: nearestPlayableSourceRow(board, sourceColumn, coord.row) }
        : { col: sourceColumn, row: -1 - sourceIndex },
      to: coord,
      movementKind: sourceColumn === coord.col ? 'fall' : 'slide',
    });
  }

  return {
    afterGravityBoard,
    refillTiles,
  };
}

function isTopAccessibleCell(board: Board, coord: CellCoord): boolean {
  for (let row = 0; row < coord.row; row += 1) {
    if (board[row][coord.col].isVoid) {
      return false;
    }
  }

  return true;
}

function chooseAdjacentRefillSourceColumn(board: Board, target: CellCoord): number {
  const left = target.col - 1;
  const right = target.col + 1;
  const candidates = (target.row + target.col) % 2 === 0 ? [left, right] : [right, left];

  for (const col of candidates) {
    if (col >= 0 && col < BOARD_SIZE && columnCanSupplyRefill(board, col)) {
      return col;
    }
  }

  for (const col of candidates) {
    if (col >= 0 && col < BOARD_SIZE) {
      return col;
    }
  }

  return target.col;
}

function columnCanSupplyRefill(board: Board, col: number): boolean {
  return board.some((row, rowIndex) => !row[col].isVoid && isTopAccessibleCell(board, { col, row: rowIndex }));
}

function applySegmentedVerticalGravity(board: Board): boolean {
  let moved = false;
  for (let col = 0; col < BOARD_SIZE; col += 1) {
    let row = BOARD_SIZE - 1;
    while (row >= 0) {
      if (board[row][col].isVoid) {
        if (board[row][col].tile != null) {
          moved = true;
        }
        board[row][col].tile = null;
        row -= 1;
        continue;
      }

      const segmentBottom = row;
      while (row >= 0 && !board[row][col].isVoid) {
        row -= 1;
      }
      const segmentTop = row + 1;
      const fallingTiles = [];
      for (let segmentRow = segmentBottom; segmentRow >= segmentTop; segmentRow -= 1) {
        const tile = board[segmentRow][col].tile;
        if (tile != null) {
          fallingTiles.push(tile);
        }
      }

      for (let segmentRow = segmentBottom; segmentRow >= segmentTop; segmentRow -= 1) {
        const cell = board[segmentRow][col];
        const previousId = cell.tile?.id ?? null;
        const tile = fallingTiles.shift() ?? null;
        cell.tile = tile == null ? null : { ...tile, col, row: segmentRow };
        if ((cell.tile?.id ?? null) !== previousId) {
          moved = true;
        }
      }
    }
  }

  return moved;
}

function applyDiagonalVoidSlides(board: Board): boolean {
  let moved = false;
  for (let row = BOARD_SIZE - 1; row >= 1; row -= 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const targetCell = board[row][col];
      if (targetCell.isVoid || targetCell.tile != null) {
        continue;
      }

      const source = chooseDiagonalSlideSource(board, { col, row });
      if (source == null) {
        continue;
      }

      const sourceCell = board[source.row][source.col];
      const tile = sourceCell.tile;
      if (tile == null) {
        continue;
      }

      targetCell.tile = { ...tile, col, row };
      sourceCell.tile = null;
      moved = true;
    }
  }

  return moved;
}

function chooseDiagonalSlideSource(board: Board, target: CellCoord): CellCoord | null {
  if (!isBlockedByVoidAbove(board, target)) {
    return null;
  }

  const left = { col: target.col - 1, row: target.row - 1 };
  const right = { col: target.col + 1, row: target.row - 1 };
  const candidates = (target.row + target.col) % 2 === 0 ? [left, right] : [right, left];

  for (const candidate of candidates) {
    if (candidate.col < 0 || candidate.col >= BOARD_SIZE) {
      continue;
    }

    const sourceCell = board[candidate.row][candidate.col];
    if (sourceCell.isVoid || sourceCell.tile == null) {
      continue;
    }

    return candidate;
  }

  return null;
}

function isBlockedByVoidAbove(board: Board, coord: CellCoord): boolean {
  for (let row = 0; row < coord.row; row += 1) {
    if (board[row][coord.col].isVoid) {
      return true;
    }
  }

  return false;
}

function nearestPlayableSourceRow(board: Board, col: number, targetRow: number): number {
  for (let row = targetRow - 1; row >= 0; row -= 1) {
    if (!board[row][col].isVoid) {
      return row;
    }
  }

  for (let row = targetRow; row < BOARD_SIZE; row += 1) {
    if (!board[row][col].isVoid) {
      return row;
    }
  }

  return -1;
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
