import { describe, expect, it } from 'vitest';
import { createBoardFromTileTypes } from '../src/board/Board';
import {
  detonatePowerUp,
  getRocketSweepClearTimings,
  getTntBlastClearTimings,
  isTapActivatablePowerUpTileType,
  selectLightballTapTargetType,
} from '../src/board/PowerUps';

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

  it('orders rocket sweep clears from the origin outward in both directions', () => {
    const board = createBoardFromTileTypes([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, 'ROCKET_H', null, null, null, null],
    ]);

    expect(getRocketSweepClearTimings(board, { col: 3, row: 2 }, 'ROCKET_H').map((timing) => timing.coord)).toEqual([
      { col: 3, row: 2 },
      { col: 2, row: 2 },
      { col: 4, row: 2 },
      { col: 1, row: 2 },
      { col: 5, row: 2 },
      { col: 0, row: 2 },
      { col: 6, row: 2 },
      { col: 7, row: 2 },
    ]);

    expect(getRocketSweepClearTimings(board, { col: 3, row: 2 }, 'ROCKET_H')[1].clearDelayMs).toBeGreaterThan(0);
    expect(detonatePowerUp(board, { col: 3, row: 2 }).clearTimings[0]).toMatchObject({
      coord: { col: 3, row: 2 },
      clearDelayMs: 0,
    });
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

  it('clears a clipped 3x3 TNT blast and delays the outer ring', () => {
    const board = createBoardFromTileTypes([
      ['FIRE', 'ICE', 'EARTH'],
      ['LAND', 'TNT', 'LIGHTNING'],
      ['ICE', 'EARTH', 'FIRE'],
    ]);

    const detonation = detonatePowerUp(board, { col: 1, row: 1 });
    expect(detonation.clearedCells).toEqual([
      { col: 0, row: 0 },
      { col: 1, row: 0 },
      { col: 2, row: 0 },
      { col: 0, row: 1 },
      { col: 1, row: 1 },
      { col: 2, row: 1 },
      { col: 0, row: 2 },
      { col: 1, row: 2 },
      { col: 2, row: 2 },
    ]);
    expect(getTntBlastClearTimings(board, { col: 1, row: 1 })[0]).toEqual({
      coord: { col: 1, row: 1 },
      clearDelayMs: 0,
    });
    expect(detonation.clearTimings.filter((timing) => timing.clearDelayMs > 0)).toHaveLength(8);
  });

  it('treats rockets, TNT, and Lightball as tap-activatable', () => {
    expect(isTapActivatablePowerUpTileType('ROCKET_H')).toBe(true);
    expect(isTapActivatablePowerUpTileType('ROCKET_V')).toBe(true);
    expect(isTapActivatablePowerUpTileType('TNT')).toBe(true);
    expect(isTapActivatablePowerUpTileType('LIGHTBALL')).toBe(true);
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

  it('selects the adjacent Lightball color with the highest board count', () => {
    const board = createBoardFromTileTypes([
      ['ICE', 'ICE', 'EARTH'],
      ['FIRE', 'LIGHTBALL', 'ICE'],
      ['FIRE', 'EARTH', 'ICE'],
    ]);

    expect(selectLightballTapTargetType(board, { col: 1, row: 1 })).toBe('ICE');
  });

  it('breaks Lightball target ties by standard tile order', () => {
    const board = createBoardFromTileTypes([
      [null, 'TNT', null],
      ['FIRE', 'LIGHTBALL', 'ICE'],
      [null, 'LAND', null],
    ]);

    expect(selectLightballTapTargetType(board, { col: 1, row: 1 })).toBe('FIRE');
  });

  it('returns no Lightball target when no adjacent standard color exists', () => {
    const board = createBoardFromTileTypes([
      [null, 'TNT', null],
      ['LAND', 'LIGHTBALL', 'ROCKET_H'],
      [null, 'LIGHTBALL', null],
    ]);

    expect(selectLightballTapTargetType(board, { col: 1, row: 1 })).toBeNull();
  });
});
