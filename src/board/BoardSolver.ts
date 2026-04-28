import type { SeededRng } from '../core/Rng';
import type { Board, CreateBoardOptions } from './Board';
import { createStandardBoard, createTileIdFactory } from './Board';
import { countValidMoves } from './BoardRules';
import { detectMatches } from './MatchDetection';

export interface PlayableBoardOptions extends CreateBoardOptions {
  minValidMoves?: number;
  maxAttempts?: number;
}

export function createPlayableStandardBoard(
  rng: SeededRng,
  options: PlayableBoardOptions = {},
): Board {
  const minValidMoves = options.minValidMoves ?? 3;
  const maxAttempts = options.maxAttempts ?? 100;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const nextTileId = createTileIdFactory(`tile-${attempt}`);
    const board = createStandardBoard(rng, options, nextTileId);
    if (isPlayableBoard(board, minValidMoves)) {
      return board;
    }
  }

  throw new Error(`Unable to generate playable board after ${maxAttempts} attempts.`);
}

export function isPlayableBoard(board: Board, minValidMoves = 3): boolean {
  return detectMatches(board).length === 0 && countValidMoves(board) >= minValidMoves;
}
