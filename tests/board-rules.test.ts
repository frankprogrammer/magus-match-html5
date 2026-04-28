import { describe, expect, it } from 'vitest';
import { createBoardFromTileTypes, setBlocker } from '../src/board/Board';
import { validateSwap } from '../src/board/BoardRules';

describe('swap validation', () => {
  it('rejects diagonal and non-adjacent swaps', () => {
    const board = matchSwapBoard();

    expect(validateSwap(board, { col: 0, row: 0 }, { col: 1, row: 1 }).reason).toBe('notAdjacent');
    expect(validateSwap(board, { col: 0, row: 0 }, { col: 2, row: 0 }).reason).toBe('notAdjacent');
  });

  it('rejects void, empty, and blocked swaps', () => {
    const voidBoard = createBoardFromTileTypes(
      [
        ['FIRE', 'ICE'],
        ['EARTH', 'LIGHTNING'],
      ],
      { voidCells: [{ col: 1, row: 0 }] },
    );
    expect(validateSwap(voidBoard, { col: 0, row: 0 }, { col: 1, row: 0 }).reason).toBe('voidCell');

    const emptyBoard = createBoardFromTileTypes([['FIRE', null]]);
    expect(validateSwap(emptyBoard, { col: 0, row: 0 }, { col: 1, row: 0 }).reason).toBe('emptyCell');

    const blockedBoard = matchSwapBoard();
    setBlocker(blockedBoard, { col: 1, row: 0 }, { type: 'LOCK', hp: 1 });
    expect(validateSwap(blockedBoard, { col: 1, row: 0 }, { col: 1, row: 1 }).reason).toBe('blockedCell');
  });

  it('accepts match-producing swaps', () => {
    const board = matchSwapBoard();

    expect(validateSwap(board, { col: 1, row: 0 }, { col: 1, row: 1 })).toEqual({
      valid: true,
      reason: 'valid',
    });
  });

  it('accepts Lightball and base power-up swaps without requiring a match', () => {
    const lightballBoard = createBoardFromTileTypes([['LIGHTBALL', 'EARTH']]);
    const tntBoard = createBoardFromTileTypes([['TNT', 'EARTH']]);

    expect(validateSwap(lightballBoard, { col: 0, row: 0 }, { col: 1, row: 0 }).valid).toBe(true);
    expect(validateSwap(tntBoard, { col: 0, row: 0 }, { col: 1, row: 0 }).valid).toBe(true);
  });

  it('rejects adjacent swaps that do not produce a match', () => {
    const board = createBoardFromTileTypes([
      ['FIRE', 'ICE', 'EARTH'],
      ['LIGHTNING', 'EARTH', 'ICE'],
    ]);

    expect(validateSwap(board, { col: 0, row: 0 }, { col: 1, row: 0 }).reason).toBe('noMatch');
  });
});

function matchSwapBoard() {
  return createBoardFromTileTypes([
    ['FIRE', 'ICE', 'FIRE'],
    ['ICE', 'FIRE', 'ICE'],
    ['LIGHTNING', 'FIRE', 'EARTH'],
  ]);
}
