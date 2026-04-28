import type { CellCoord } from '../core/Layout';
import type { Board } from './Board';
import { coordKey, getAllPlayableCoords, uniqueCoords } from './Board';
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

export interface BoardAnimationClearedTile extends BoardAnimationSnapshotCell {}

export interface BoardAnimationMovement {
  tileId: string;
  tileType: TileType;
  from: CellCoord;
  to: CellCoord;
  isPath: boolean;
}

export interface BoardAnimationRefill {
  tileId: string;
  tileType: TileType;
  from: CellCoord;
  to: CellCoord;
  isPath: boolean;
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

export interface BoardAnimationTrace {
  revisionId: number;
  swappedCells: { from: CellCoord; to: CellCoord } | null;
  preSwapSnapshot: BoardAnimationSnapshot;
  postSwapSnapshot: BoardAnimationSnapshot;
  cascadeSteps: readonly BoardAnimationCascadeStep[];
  finalSnapshot: BoardAnimationSnapshot;
}

export interface BoardAnimationTraceOptions {
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
    revisionId: options.revisionId,
    swappedCells: options.swappedCells ?? null,
    preSwapSnapshot: snapshotBoard(options.preSwapBoard),
    postSwapSnapshot: snapshotBoard(options.postSwapBoard),
    cascadeSteps,
    finalSnapshot: snapshotBoard(finalBoard),
  };
}

export function buildBoardAnimationCascadeStep(
  stepIndex: number,
  beforeClearBoard: Board,
  beforeGravityBoard: Board,
  afterGravityBoard: Board,
  finalBoard: Board,
  clearedCoords: readonly CellCoord[],
): BoardAnimationCascadeStep {
  const beforeClearSnapshot = snapshotBoard(beforeClearBoard);
  const beforeGravitySnapshot = snapshotBoard(beforeGravityBoard);
  const afterGravitySnapshot = snapshotBoard(afterGravityBoard);
  const finalSnapshot = snapshotBoard(finalBoard);
  const beforeClearByCoord = snapshotCellsByCoord(beforeClearSnapshot);
  const beforeGravityById = snapshotCellsById(beforeGravitySnapshot);
  const afterGravityById = snapshotCellsById(afterGravitySnapshot);
  const afterGravityIds = new Set(afterGravitySnapshot.cells.map((cell) => cell.tileId));
  const finalById = snapshotCellsById(finalSnapshot);

  const clearedTiles = uniqueCoords(clearedCoords)
    .map((coord) => beforeClearByCoord.get(coordKey(coord)))
    .filter((cell): cell is BoardAnimationClearedTile => cell != null);

  const fallingTiles = [...afterGravityById.values()]
    .map((toCell) => {
      const fromCell = beforeGravityById.get(toCell.tileId);
      if (fromCell == null || coordsEqual(fromCell.coord, toCell.coord)) {
        return null;
      }

      return {
        tileId: toCell.tileId,
        tileType: toCell.tileType,
        from: fromCell.coord,
        to: toCell.coord,
        isPath: toCell.isPath,
      };
    })
    .filter((movement): movement is BoardAnimationMovement => movement != null);

  const refillCells = finalSnapshot.cells
    .filter((cell) => !afterGravityIds.has(cell.tileId))
    .sort((first, second) => first.coord.col - second.coord.col || first.coord.row - second.coord.row);
  const refillIndexByColumn = new Map<number, number>();
  const refillTiles = refillCells.map((cell) => {
    const columnIndex = refillIndexByColumn.get(cell.coord.col) ?? 0;
    refillIndexByColumn.set(cell.coord.col, columnIndex + 1);
    const finalCell = finalById.get(cell.tileId) ?? cell;
    return {
      tileId: finalCell.tileId,
      tileType: finalCell.tileType,
      from: { col: finalCell.coord.col, row: -1 - Math.min(1, columnIndex) },
      to: finalCell.coord,
      isPath: finalCell.isPath,
    };
  });

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
