import type { CellCoord } from '../core/Layout';
import { BOARD_SIZE } from '../core/Layout';
import type { Board } from './Board';
import { getCell, isInBounds, sortCoords, uniqueCoords } from './Board';
import type { MatchableTileType, PowerUpTileType } from './TileTypes';

export interface PowerUpDetonationOptions {
  lightballTargetType?: MatchableTileType;
}

export interface PowerUpDetonation {
  powerUpType: PowerUpTileType;
  origin: CellCoord;
  clearedCells: readonly CellCoord[];
  lightballTargetType?: MatchableTileType;
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

  switch (powerUpType) {
    case 'ROCKET_H':
      return { powerUpType, origin, clearedCells: rowCells(board, origin.row) };
    case 'ROCKET_V':
      return { powerUpType, origin, clearedCells: columnCells(board, origin.col) };
    case 'TNT':
      return { powerUpType, origin, clearedCells: tntCells(board, origin) };
    case 'LIGHTBALL':
      return {
        powerUpType,
        origin,
        clearedCells: lightballCells(board, origin, options.lightballTargetType),
        lightballTargetType: options.lightballTargetType,
      };
  }
}

function rowCells(board: Board, row: number): CellCoord[] {
  return playableCells(
    board,
    Array.from({ length: BOARD_SIZE }, (_, col) => ({ col, row })),
  );
}

function columnCells(board: Board, col: number): CellCoord[] {
  return playableCells(
    board,
    Array.from({ length: BOARD_SIZE }, (_, row) => ({ col, row })),
  );
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

function playableCells(board: Board, coords: readonly CellCoord[]): CellCoord[] {
  return sortCoords(
    coords.filter((coord) => {
      if (!isInBounds(coord)) {
        return false;
      }

      return !board[coord.row][coord.col].isVoid;
    }),
  );
}
