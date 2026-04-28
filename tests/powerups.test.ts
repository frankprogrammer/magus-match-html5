import { describe, expect, it } from 'vitest';
import { createBoardFromTileTypes } from '../src/board/Board';
import { detonatePowerUp } from '../src/board/PowerUps';

describe('power-up detonation patterns', () => {
  it('clears full row and column for rockets', () => {
    const rowRocket = createBoardFromTileTypes([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, 'ROCKET_H', null, null, null, null],
    ]);
    const columnRocket = createBoardFromTileTypes([
      [null, null, 'ROCKET_V'],
      [null, null, null],
      [null, null, null],
      [null, null, null],
      [null, null, null],
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);

    expect(detonatePowerUp(rowRocket, { col: 3, row: 2 }).clearedCells).toEqual(
      Array.from({ length: 8 }, (_, col) => ({ col, row: 2 })),
    );
    expect(detonatePowerUp(columnRocket, { col: 2, row: 0 }).clearedCells).toEqual(
      Array.from({ length: 8 }, (_, row) => ({ col: 2, row })),
    );
  });

  it('clips TNT at board edges', () => {
    const board = createBoardFromTileTypes([['TNT']]);

    expect(detonatePowerUp(board, { col: 0, row: 0 }).clearedCells).toEqual([
      { col: 0, row: 0 },
      { col: 1, row: 0 },
      { col: 0, row: 1 },
      { col: 1, row: 1 },
    ]);
  });

  it('clears the Lightball origin and all target-color tiles', () => {
    const board = createBoardFromTileTypes([
      ['LIGHTBALL', 'FIRE', 'ICE'],
      ['FIRE', 'EARTH', 'FIRE'],
    ]);

    expect(detonatePowerUp(board, { col: 0, row: 0 }, { lightballTargetType: 'FIRE' }).clearedCells).toEqual([
      { col: 0, row: 0 },
      { col: 1, row: 0 },
      { col: 0, row: 1 },
      { col: 2, row: 1 },
    ]);
  });
});
