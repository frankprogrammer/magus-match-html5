import { describe, expect, it } from 'vitest';
import { createBoardFromTileTypes } from '../src/board/Board';
import { getEmptyPlayableCells, resolveCascades } from '../src/board/Cascade';
import { detectMatches } from '../src/board/MatchDetection';
import { SeededRng } from '../src/core/Rng';

describe('cascade resolution', () => {
  it('clears matches, refills the board, and settles with no matches', () => {
    const board = createBoardFromTileTypes([
      ['FIRE', 'FIRE', 'FIRE'],
      ['ICE', 'EARTH', 'LIGHTNING'],
      ['EARTH', 'ICE', 'LIGHTNING'],
    ]);

    const result = resolveCascades(board, new SeededRng(42));

    expect(result.steps.length).toBeGreaterThan(0);
    expect(detectMatches(result.board)).toHaveLength(0);
    expect(getEmptyPlayableCells(result.board)).toHaveLength(0);
  });

  it('preserves void cells and never refills them', () => {
    const board = createBoardFromTileTypes(
      [
        ['FIRE', null],
        ['EARTH', null],
        ['LIGHTNING', null],
        [null, 'ICE'],
        [null, 'ICE'],
        [null, 'ICE'],
      ],
      { voidCells: [{ col: 0, row: 3 }] },
    );

    const result = resolveCascades(board, new SeededRng(24));

    expect(result.board[3][0].isVoid).toBe(true);
    expect(result.board[3][0].tile).toBeNull();
    expect(detectMatches(result.board)).toHaveLength(0);
  });
});
