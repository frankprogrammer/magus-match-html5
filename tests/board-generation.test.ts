import { describe, expect, it } from 'vitest';
import { createBoardFromTileTypes, createBoardScopedTileIdFactory } from '../src/board/Board';
import { createPlayableStandardBoard } from '../src/board/BoardSolver';
import { countValidMoves } from '../src/board/BoardRules';
import { detectMatches } from '../src/board/MatchDetection';
import { isStandardTileType } from '../src/board/TileTypes';
import { SeededRng } from '../src/core/Rng';

describe('board generation', () => {
  it('creates a playable standard board without starting matches', () => {
    const board = createPlayableStandardBoard(new SeededRng(12345));

    expect(detectMatches(board)).toHaveLength(0);
    expect(countValidMoves(board)).toBeGreaterThanOrEqual(3);
    expect(board.flat().every((cell) => cell.isVoid || isStandardTileType(cell.tile!.type))).toBe(true);
  });

  it('is deterministic for the same seed', () => {
    const first = createPlayableStandardBoard(new SeededRng(777));
    const second = createPlayableStandardBoard(new SeededRng(777));

    expect(tileTypes(first)).toEqual(tileTypes(second));
  });

  it('creates board-scoped tile IDs after the highest existing suffix', () => {
    const board = createBoardFromTileTypes([['FIRE', 'ICE', 'EARTH']]);
    board[0][0].tile!.id = 'refill-0';
    board[0][1].tile!.id = 'refill-4';
    board[0][2].tile!.id = 'other-99';

    const nextTileId = createBoardScopedTileIdFactory(board, 'refill');

    expect(nextTileId()).toBe('refill-5');
    expect(nextTileId()).toBe('refill-6');
  });

  it('ignores non-matching and non-numeric tile ID suffixes for board-scoped IDs', () => {
    const board = createBoardFromTileTypes([['FIRE', 'ICE', 'EARTH']]);
    board[0][0].tile!.id = 'refill-alpha';
    board[0][1].tile!.id = 'refill-2-extra';
    board[0][2].tile!.id = 'other-8';

    const nextTileId = createBoardScopedTileIdFactory(board, 'refill');

    expect(nextTileId()).toBe('refill-0');
  });
});

function tileTypes(board: ReturnType<typeof createPlayableStandardBoard>): string[][] {
  return board.map((row) => row.map((cell) => cell.tile?.type ?? 'EMPTY'));
}
