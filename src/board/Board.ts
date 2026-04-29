import { BOARD_SIZE } from '../core/Layout';
import type { CellCoord } from '../core/Layout';
import type { SeededRng } from '../core/Rng';
import {
  STANDARD_TILE_TYPES,
  type Blocker,
  type Cell,
  type CellModifier,
  type StandardTileType,
  type Tile,
  type TileState,
  type TileType,
} from './TileTypes';

export type Board = Cell[][];

export interface CreateBoardOptions {
  voidCells?: readonly CellCoord[];
}

export type TileIdFactory = () => string;

export function createTileIdFactory(prefix = 'tile'): TileIdFactory {
  let nextId = 0;
  return () => `${prefix}-${nextId++}`;
}

export function createBoardScopedTileIdFactory(board: Board, prefix = 'tile'): TileIdFactory {
  let nextId = nextTileIdSuffixForBoard(board, prefix);
  return () => `${prefix}-${nextId++}`;
}

export function createTile(
  type: TileType,
  col: number,
  row: number,
  nextTileId: TileIdFactory = createTileIdFactory(`${type.toLowerCase()}-${col}-${row}`),
  state: TileState = 'IDLE',
): Tile {
  return {
    id: nextTileId(),
    type,
    col,
    row,
    state,
    spawnedAtMs: 0,
  };
}

export function createEmptyBoard(options: CreateBoardOptions = {}): Board {
  return Array.from({ length: BOARD_SIZE }, (_, row) =>
    Array.from({ length: BOARD_SIZE }, (_, col) => ({
      tile: null,
      blocker: null,
      modifier: null,
      isVoid: options.voidCells?.some((coord) => coord.col === col && coord.row === row) ?? false,
      isPath: false,
    })),
  );
}

export function createBoardFromTileTypes(
  rows: readonly (readonly (TileType | null)[])[],
  options: CreateBoardOptions = {},
): Board {
  const board = createEmptyBoard(options);
  const nextTileId = createTileIdFactory('test-tile');

  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const type = rows[row]?.[col] ?? null;
      if (type != null && !board[row][col].isVoid) {
        board[row][col].tile = createTile(type, col, row, nextTileId);
      }
    }
  }

  return board;
}

export function cloneBoard(board: Board): Board {
  return board.map((row) =>
    row.map((cell) => ({
      tile: cell.tile == null ? null : { ...cell.tile },
      blocker: cell.blocker == null ? null : cloneBlocker(cell.blocker),
      modifier: cell.modifier,
      isVoid: cell.isVoid,
      isPath: cell.isPath,
    })),
  );
}

export function createStandardBoard(
  rng: SeededRng,
  options: CreateBoardOptions = {},
  nextTileId: TileIdFactory = createTileIdFactory('tile'),
): Board {
  const board = createEmptyBoard(options);
  fillEmptyCellsWithStandardTiles(board, rng, nextTileId);
  return board;
}

export function fillEmptyCellsWithStandardTiles(
  board: Board,
  rng: SeededRng,
  nextTileId: TileIdFactory = createTileIdFactory('tile'),
): void {
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const cell = board[row][col];
      if (cell.isVoid || cell.tile != null) {
        continue;
      }

      const candidates = STANDARD_TILE_TYPES.filter(
        (type) => !wouldCreateMatchAt(board, { col, row }, type),
      );
      const candidatePool = candidates.length > 0 ? candidates : STANDARD_TILE_TYPES;
      const type = candidatePool[rng.nextInt(0, candidatePool.length)];
      cell.tile = createTile(type, col, row, nextTileId);
    }
  }
}

export function wouldCreateMatchAt(
  board: Board,
  coord: CellCoord,
  type: StandardTileType,
): boolean {
  return countContiguousType(board, coord, type, -1, 0) + countContiguousType(board, coord, type, 1, 0) + 1 >= 3 ||
    countContiguousType(board, coord, type, 0, -1) + countContiguousType(board, coord, type, 0, 1) + 1 >= 3;
}

export function countContiguousType(
  board: Board,
  coord: CellCoord,
  type: TileType,
  dCol: number,
  dRow: number,
): number {
  let count = 0;
  let col = coord.col + dCol;
  let row = coord.row + dRow;

  while (isInBounds({ col, row })) {
    const tile = board[row][col].tile;
    if (tile?.type !== type) {
      break;
    }

    count += 1;
    col += dCol;
    row += dRow;
  }

  return count;
}

export function isInBounds(coord: CellCoord): boolean {
  return coord.col >= 0 && coord.col < BOARD_SIZE && coord.row >= 0 && coord.row < BOARD_SIZE;
}

export function getCell(board: Board, coord: CellCoord): Cell | null {
  if (!isInBounds(coord)) {
    return null;
  }

  return board[coord.row][coord.col];
}

export function setTile(board: Board, coord: CellCoord, tile: Tile | null): void {
  const cell = getCell(board, coord);
  if (cell == null) {
    throw new Error(`Cannot set tile outside board at ${coordKey(coord)}.`);
  }

  cell.tile = tile == null ? null : { ...tile, col: coord.col, row: coord.row };
}

export function swapTilesInPlace(board: Board, first: CellCoord, second: CellCoord): void {
  const firstCell = getCell(board, first);
  const secondCell = getCell(board, second);
  if (firstCell == null || secondCell == null) {
    throw new Error('Cannot swap cells outside board.');
  }

  const firstTile = firstCell.tile;
  const secondTile = secondCell.tile;
  firstCell.tile = secondTile == null ? null : { ...secondTile, col: first.col, row: first.row };
  secondCell.tile = firstTile == null ? null : { ...firstTile, col: second.col, row: second.row };
}

export function setBlocker(board: Board, coord: CellCoord, blocker: Omit<Blocker, 'position'>): void {
  const cell = getCell(board, coord);
  if (cell == null) {
    throw new Error(`Cannot set blocker outside board at ${coordKey(coord)}.`);
  }

  cell.blocker = { ...blocker, position: coord };
}

export function setModifier(board: Board, coord: CellCoord, modifier: CellModifier | null): void {
  const cell = getCell(board, coord);
  if (cell == null) {
    throw new Error(`Cannot set modifier outside board at ${coordKey(coord)}.`);
  }

  cell.modifier = modifier;
}

export function getAllPlayableCoords(board: Board): CellCoord[] {
  const coords: CellCoord[] = [];
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      if (!board[row][col].isVoid) {
        coords.push({ col, row });
      }
    }
  }

  return coords;
}

export function getVoidCoords(board: Board): CellCoord[] {
  const coords: CellCoord[] = [];
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      if (board[row][col].isVoid) {
        coords.push({ col, row });
      }
    }
  }

  return coords;
}

export function coordsEqual(first: CellCoord, second: CellCoord): boolean {
  return first.col === second.col && first.row === second.row;
}

export function coordKey(coord: CellCoord): string {
  return `${coord.col},${coord.row}`;
}

export function uniqueCoords(coords: readonly CellCoord[]): CellCoord[] {
  const seen = new Set<string>();
  const unique: CellCoord[] = [];
  for (const coord of coords) {
    const key = coordKey(coord);
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(coord);
    }
  }

  return sortCoords(unique);
}

export function sortCoords(coords: readonly CellCoord[]): CellCoord[] {
  return [...coords].sort((first, second) => first.row - second.row || first.col - second.col);
}

function cloneBlocker(blocker: Blocker): Blocker {
  return {
    type: blocker.type,
    hp: blocker.hp,
    position: { ...blocker.position },
  };
}

function nextTileIdSuffixForBoard(board: Board, prefix: string): number {
  const expectedPrefix = `${prefix}-`;
  let maxSuffix = -1;

  for (const row of board) {
    for (const cell of row) {
      const id = cell.tile?.id;
      if (id == null || !id.startsWith(expectedPrefix)) {
        continue;
      }

      const suffix = id.slice(expectedPrefix.length);
      if (!/^\d+$/.test(suffix)) {
        continue;
      }

      maxSuffix = Math.max(maxSuffix, Number(suffix));
    }
  }

  return maxSuffix + 1;
}
