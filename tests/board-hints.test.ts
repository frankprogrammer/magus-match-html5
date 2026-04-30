import { describe, expect, it } from 'vitest';
import { createBoardFromTileTypes } from '../src/board/Board';
import { createStandardMatchHint, findStandardMatchHints } from '../src/board/BoardHints';

describe('BoardHints', () => {
  it('finds standard tile swap hints and maps flashed cells back to current board positions', () => {
    const board = createBoardFromTileTypes([
      ['FIRE', 'ICE', 'FIRE'],
      ['EARTH', 'FIRE', 'ICE'],
      ['LIGHTNING', 'ICE', 'EARTH'],
    ]);

    const hint = createStandardMatchHint(board, { col: 1, row: 0 }, { col: 1, row: 1 });

    expect(hint).toMatchObject({
      from: { col: 1, row: 0 },
      to: { col: 1, row: 1 },
      movingCell: { col: 1, row: 1 },
      direction: { col: 0, row: -1 },
    });
    expect(hint?.flashCells).toEqual([
      { col: 0, row: 0 },
      { col: 2, row: 0 },
      { col: 1, row: 1 },
    ]);
  });

  it('excludes power-up swaps from standard match hints', () => {
    const board = createBoardFromTileTypes([['TNT', 'FIRE']]);

    expect(createStandardMatchHint(board, { col: 0, row: 0 }, { col: 1, row: 0 })).toBeNull();
    expect(findStandardMatchHints(board)).toEqual([]);
  });

  it('returns deterministic hints in board scan order', () => {
    const board = createBoardFromTileTypes([
      ['FIRE', 'ICE', 'FIRE', 'EARTH'],
      ['EARTH', 'FIRE', 'ICE', 'LIGHTNING'],
      ['LIGHTNING', 'ICE', 'EARTH', 'LIGHTNING'],
    ]);

    const hints = findStandardMatchHints(board);

    expect(hints[0]).toMatchObject({
      from: { col: 1, row: 0 },
      to: { col: 1, row: 1 },
      movingCell: { col: 1, row: 1 },
      direction: { col: 0, row: -1 },
    });
  });
});
