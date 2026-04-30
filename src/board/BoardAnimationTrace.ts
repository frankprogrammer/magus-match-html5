import type { CellCoord } from '../core/Layout';
import { BOARD_SIZE } from '../core/Layout';
import type { Board } from './Board';
import { cloneBoard, coordKey, getAllPlayableCoords, swapTilesInPlace, uniqueCoords } from './Board';
import type { TileType } from './TileTypes';

export interface BoardAnimationSnapshotCell {
  tileId: string;
  tileType: TileType;
  coord: CellCoord;
  isPath: boolean;
}

export interface BoardAnimationSnapshot {
  cells: readonly BoardAnimationSnapshotCell[];
}

export interface BoardAnimationClearedTile extends BoardAnimationSnapshotCell {
  clearDelayMs?: number;
}

export interface BoardAnimationMovement {
  tileId: string;
  tileType: TileType;
  from: CellCoord;
  to: CellCoord;
  isPath: boolean;
  movementKind?: 'fall' | 'slide';
}

export interface BoardAnimationRefill {
  tileId: string;
  tileType: TileType;
  from: CellCoord;
  to: CellCoord;
  isPath: boolean;
  movementKind?: 'fall' | 'slide';
}

export interface BoardAnimationCascadeStep {
  stepIndex: number;
  beforeClearSnapshot: BoardAnimationSnapshot;
  beforeGravitySnapshot: BoardAnimationSnapshot;
  afterGravitySnapshot: BoardAnimationSnapshot;
  finalSnapshot: BoardAnimationSnapshot;
  clearedTiles: readonly BoardAnimationClearedTile[];
  fallingTiles: readonly BoardAnimationMovement[];
  refillTiles: readonly BoardAnimationRefill[];
}

export type BoardAnimationTraceKind = 'resolution' | 'levelIntro' | 'invalidSwap';

export interface BoardAnimationTrace {
  kind: BoardAnimationTraceKind;
  revisionId: number;
  swappedCells: { from: CellCoord; to: CellCoord } | null;
  preSwapSnapshot: BoardAnimationSnapshot;
  postSwapSnapshot: BoardAnimationSnapshot;
  cascadeSteps: readonly BoardAnimationCascadeStep[];
  finalSnapshot: BoardAnimationSnapshot;
}

export interface BoardAnimationTraceOptions {
  kind?: BoardAnimationTraceKind;
  revisionId: number;
  preSwapBoard: Board;
  postSwapBoard: Board;
  swappedCells?: { from: CellCoord; to: CellCoord } | null;
}

export function snapshotBoard(board: Board): BoardAnimationSnapshot {
  return {
    cells: getAllPlayableCoords(board)
      .map((coord) => {
        const cell = board[coord.row][coord.col];
        const tile = cell.tile;
        if (tile == null) {
          return null;
        }

        return {
          tileId: tile.id,
          tileType: tile.type,
          coord,
          isPath: cell.isPath,
        };
      })
      .filter((cell): cell is BoardAnimationSnapshotCell => cell != null),
  };
}

export function createBoardAnimationTrace(
  options: BoardAnimationTraceOptions,
  cascadeSteps: readonly BoardAnimationCascadeStep[],
  finalBoard: Board,
): BoardAnimationTrace {
  return {
    kind: options.kind ?? 'resolution',
    revisionId: options.revisionId,
    swappedCells: options.swappedCells ?? null,
    preSwapSnapshot: snapshotBoard(options.preSwapBoard),
    postSwapSnapshot: snapshotBoard(options.postSwapBoard),
    cascadeSteps,
    finalSnapshot: snapshotBoard(finalBoard),
  };
}

export function createLevelIntroBoardAnimationTrace(board: Board, revisionId: number): BoardAnimationTrace {
  const emptySnapshot: BoardAnimationSnapshot = { cells: [] };
  const finalSnapshot = snapshotBoard(board);
  const refillTiles = hasVoidCells(board)
    ? buildVoidAwareIntroRefillTiles(board, finalSnapshot.cells)
    : finalSnapshot.cells
        .map((cell) => ({
          tileId: cell.tileId,
          tileType: cell.tileType,
          from: { col: cell.coord.col, row: cell.coord.row - BOARD_SIZE },
          to: cell.coord,
          isPath: cell.isPath,
        }))
        .sort((first, second) => first.to.col - second.to.col || second.to.row - first.to.row);

  return {
    kind: 'levelIntro',
    revisionId,
    swappedCells: null,
    preSwapSnapshot: emptySnapshot,
    postSwapSnapshot: emptySnapshot,
    cascadeSteps: [
      {
        stepIndex: 0,
        beforeClearSnapshot: emptySnapshot,
        beforeGravitySnapshot: emptySnapshot,
        afterGravitySnapshot: emptySnapshot,
        finalSnapshot,
        clearedTiles: [],
        fallingTiles: [],
        refillTiles,
      },
    ],
    finalSnapshot,
  };
}

export function createInvalidSwapAnimationTrace(
  board: Board,
  from: CellCoord,
  to: CellCoord,
  revisionId: number,
): BoardAnimationTrace {
  const swappedBoard = cloneBoard(board);
  swapTilesInPlace(swappedBoard, from, to);
  const originalSnapshot = snapshotBoard(board);

  return {
    kind: 'invalidSwap',
    revisionId,
    swappedCells: { from, to },
    preSwapSnapshot: originalSnapshot,
    postSwapSnapshot: snapshotBoard(swappedBoard),
    cascadeSteps: [],
    finalSnapshot: originalSnapshot,
  };
}

export function buildBoardAnimationCascadeStep(
  stepIndex: number,
  beforeClearBoard: Board,
  beforeGravityBoard: Board,
  afterGravityBoard: Board,
  finalBoard: Board,
  clearedCoords: readonly CellCoord[],
  clearedDelayMsByCoord: ReadonlyMap<string, number> = new Map(),
  refillOverrides: readonly BoardAnimationRefill[] = [],
): BoardAnimationCascadeStep {
  const beforeClearSnapshot = snapshotBoard(beforeClearBoard);
  const beforeGravitySnapshot = snapshotBoard(beforeGravityBoard);
  const afterGravitySnapshot = snapshotBoard(afterGravityBoard);
  const finalSnapshot = snapshotBoard(finalBoard);
  const beforeClearByCoord = snapshotCellsByCoord(beforeClearSnapshot);
  const beforeGravityById = snapshotCellsById(beforeGravitySnapshot);
  const afterGravityById = snapshotCellsById(afterGravitySnapshot);
  const afterGravityIds = new Set(afterGravitySnapshot.cells.map((cell) => cell.tileId));

  const clearedTiles = uniqueCoords(clearedCoords)
    .map((coord) => beforeClearByCoord.get(coordKey(coord)))
    .filter((cell): cell is BoardAnimationSnapshotCell => cell != null)
    .map((cell) => ({
      ...cell,
      clearDelayMs: clearedDelayMsByCoord.get(coordKey(cell.coord)),
    }));

  const fallingTiles = [...afterGravityById.values()]
    .map((toCell) => {
      const fromCell = beforeGravityById.get(toCell.tileId);
      if (fromCell == null || coordsEqual(fromCell.coord, toCell.coord)) {
        return null;
      }

      const movement: BoardAnimationMovement = {
        tileId: toCell.tileId,
        tileType: toCell.tileType,
        from: fromCell.coord,
        to: toCell.coord,
        isPath: toCell.isPath,
        movementKind: fromCell.coord.col === toCell.coord.col ? 'fall' : 'slide',
      };
      return movement;
    })
    .filter((movement): movement is BoardAnimationMovement => movement != null);

  const refillCells = finalSnapshot.cells
    .filter((cell) => !afterGravityIds.has(cell.tileId))
    .sort((first, second) => first.coord.col - second.coord.col || second.coord.row - first.coord.row);
  const refillTiles = buildStackedRefillTiles(refillCells, refillOverrides);

  return {
    stepIndex,
    beforeClearSnapshot,
    beforeGravitySnapshot,
    afterGravitySnapshot,
    finalSnapshot,
    clearedTiles: sortSnapshotCells(clearedTiles),
    fallingTiles: sortMovements(fallingTiles),
    refillTiles: sortRefills(refillTiles),
  };
}

export function stampBoardAnimationTrace(
  trace: BoardAnimationTrace | undefined,
  revisionId: number,
): BoardAnimationTrace | undefined {
  if (trace == null) {
    return undefined;
  }

  return {
    ...trace,
    revisionId,
  };
}

function snapshotCellsByCoord(snapshot: BoardAnimationSnapshot): Map<string, BoardAnimationSnapshotCell> {
  return new Map(snapshot.cells.map((cell) => [coordKey(cell.coord), cell]));
}

function snapshotCellsById(snapshot: BoardAnimationSnapshot): Map<string, BoardAnimationSnapshotCell> {
  return new Map(snapshot.cells.map((cell) => [cell.tileId, cell]));
}

function buildStackedRefillTiles(
  refillCells: readonly BoardAnimationSnapshotCell[],
  refillOverrides: readonly BoardAnimationRefill[] = [],
): BoardAnimationRefill[] {
  const overridesById = new Map(refillOverrides.map((refill) => [refill.tileId, refill]));
  const refillIndexByColumn = new Map<number, number>();
  return refillCells.map((cell) => {
    const override = overridesById.get(cell.tileId);
    if (override != null) {
      return {
        ...override,
        tileType: cell.tileType,
        to: cell.coord,
        isPath: cell.isPath,
      };
    }

    const columnIndex = refillIndexByColumn.get(cell.coord.col) ?? 0;
    refillIndexByColumn.set(cell.coord.col, columnIndex + 1);
    return {
      tileId: cell.tileId,
      tileType: cell.tileType,
      from: { col: cell.coord.col, row: -1 - columnIndex },
      to: cell.coord,
      isPath: cell.isPath,
    };
  });
}

function buildVoidAwareIntroRefillTiles(
  board: Board,
  cells: readonly BoardAnimationSnapshotCell[],
): BoardAnimationRefill[] {
  const refillIndexByColumn = new Map<number, number>();
  return [...cells]
    .sort((first, second) => first.coord.col - second.coord.col || second.coord.row - first.coord.row)
    .map((cell) => {
      if (!isBlockedByVoidAbove(board, cell.coord)) {
        const columnIndex = refillIndexByColumn.get(cell.coord.col) ?? 0;
        refillIndexByColumn.set(cell.coord.col, columnIndex + 1);
        return {
          tileId: cell.tileId,
          tileType: cell.tileType,
          from: { col: cell.coord.col, row: -1 - columnIndex },
          to: cell.coord,
          isPath: cell.isPath,
          movementKind: 'fall' as const,
        };
      }

      const sourceCol = chooseAdjacentSourceColumn(board, cell.coord);
      return {
        tileId: cell.tileId,
        tileType: cell.tileType,
        from: { col: sourceCol, row: nearestPlayableSourceRow(board, sourceCol, cell.coord.row) },
        to: cell.coord,
        isPath: cell.isPath,
        movementKind: 'slide' as const,
      };
    });
}

function hasVoidCells(board: Board): boolean {
  return board.some((row) => row.some((cell) => cell.isVoid));
}

function isBlockedByVoidAbove(board: Board, coord: CellCoord): boolean {
  for (let row = 0; row < coord.row; row += 1) {
    if (board[row][coord.col].isVoid) {
      return true;
    }
  }

  return false;
}

function chooseAdjacentSourceColumn(board: Board, target: CellCoord): number {
  const left = target.col - 1;
  const right = target.col + 1;
  const candidates = (target.row + target.col) % 2 === 0 ? [left, right] : [right, left];
  for (const col of candidates) {
    if (col >= 0 && col < BOARD_SIZE && board.some((row) => !row[col].isVoid)) {
      return col;
    }
  }

  return Math.max(0, Math.min(BOARD_SIZE - 1, target.col === 0 ? 1 : target.col - 1));
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

function sortSnapshotCells<T extends BoardAnimationSnapshotCell>(cells: readonly T[]): T[] {
  return [...cells].sort((first, second) => first.coord.row - second.coord.row || first.coord.col - second.coord.col);
}

function sortMovements<T extends BoardAnimationMovement>(movements: readonly T[]): T[] {
  return [...movements].sort((first, second) => first.to.row - second.to.row || first.to.col - second.to.col);
}

function sortRefills<T extends BoardAnimationRefill>(refills: readonly T[]): T[] {
  return [...refills].sort((first, second) => first.to.row - second.to.row || first.to.col - second.to.col);
}

function coordsEqual(first: CellCoord, second: CellCoord): boolean {
  return first.col === second.col && first.row === second.row;
}
