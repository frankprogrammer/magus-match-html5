import type { CellCoord } from '../core/Layout';
import { BOARD_SIZE } from '../core/Layout';
import type { Board } from './Board';
import { cloneBoard, getCell, swapTilesInPlace } from './Board';
import { detectMatches } from './MatchDetection';
import { isPowerUpTileType } from './TileTypes';
import type { Cell } from './TileTypes';

export type SwapValidationReason =
  | 'valid'
  | 'outOfBounds'
  | 'notAdjacent'
  | 'voidCell'
  | 'emptyCell'
  | 'blockedCell'
  | 'noMatch';

export interface SwapValidationResult {
  valid: boolean;
  reason: SwapValidationReason;
}

export interface ValidMove {
  from: CellCoord;
  to: CellCoord;
}

const BLOCKING_SWAP_BLOCKERS = new Set(['LOCK', 'METAL_PLATE', 'BOX']);

export function validateSwap(board: Board, from: CellCoord, to: CellCoord): SwapValidationResult {
  const fromCell = getCell(board, from);
  const toCell = getCell(board, to);

  if (fromCell == null || toCell == null) {
    return { valid: false, reason: 'outOfBounds' };
  }

  if (!areAdjacent(from, to)) {
    return { valid: false, reason: 'notAdjacent' };
  }

  if (fromCell.isVoid || toCell.isVoid) {
    return { valid: false, reason: 'voidCell' };
  }

  if (fromCell.tile == null || toCell.tile == null) {
    return { valid: false, reason: 'emptyCell' };
  }

  if (isBlockedForSwap(fromCell) || isBlockedForSwap(toCell)) {
    return { valid: false, reason: 'blockedCell' };
  }

  if (fromCell.tile.type === 'LIGHTBALL' || toCell.tile.type === 'LIGHTBALL') {
    return { valid: true, reason: 'valid' };
  }

  if (isPowerUpTileType(fromCell.tile.type) || isPowerUpTileType(toCell.tile.type)) {
    return { valid: true, reason: 'valid' };
  }

  const simulatedBoard = simulateSwap(board, from, to);
  return detectMatches(simulatedBoard, { preferredSpawnCell: to }).length > 0
    ? { valid: true, reason: 'valid' }
    : { valid: false, reason: 'noMatch' };
}

export function simulateSwap(board: Board, from: CellCoord, to: CellCoord): Board {
  const simulatedBoard = cloneBoard(board);
  swapTilesInPlace(simulatedBoard, from, to);
  return simulatedBoard;
}

export function findValidMoves(board: Board): ValidMove[] {
  const moves: ValidMove[] = [];
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const from = { col, row };
      const right = { col: col + 1, row };
      const down = { col, row: row + 1 };

      if (col + 1 < BOARD_SIZE && validateSwap(board, from, right).valid) {
        moves.push({ from, to: right });
      }

      if (row + 1 < BOARD_SIZE && validateSwap(board, from, down).valid) {
        moves.push({ from, to: down });
      }
    }
  }

  return moves;
}

export function countValidMoves(board: Board): number {
  return findValidMoves(board).length;
}

export function areAdjacent(first: CellCoord, second: CellCoord): boolean {
  return Math.abs(first.col - second.col) + Math.abs(first.row - second.row) === 1;
}

export function isBlockedForSwap(cell: Cell): boolean {
  return cell.blocker != null && BLOCKING_SWAP_BLOCKERS.has(cell.blocker.type);
}
