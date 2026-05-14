import { describe, expect, it } from 'vitest';
import { createBoardFromTileTypes } from '../src/board/Board';
import {
  detonatePowerUp,
  getRocketSweepClearTimings,
  getTntBlastClearTimings,
  isTapActivatablePowerUpTileType,
  resolvePowerUpChain,
  selectLightballTapTargetType,
} from '../src/board/PowerUps';
import {
  LIGHTBALL_COLLECTION_WAVE_MS,
  ROCKET_SWEEP_CLEAR_STAGGER_MS,
  TNT_EXPLOSION_RING_DELAY_MS,
} from '../src/data/tuning';

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
      ['FIRE', 'TNT', 'LIGHTNING'],
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

    const detonation = detonatePowerUp(board, { col: 0, row: 0 }, { lightballTargetType: 'FIRE' });

    expect(detonation.clearedCells).toEqual([
      { col: 0, row: 0 },
      { col: 1, row: 0 },
      { col: 0, row: 1 },
      { col: 2, row: 1 },
    ]);
    expect(detonation.clearTimings).toContainEqual({
      coord: { col: 0, row: 0 },
      clearDelayMs: 0,
    });
    expect(detonation.clearTimings.filter((timing) => timing.coord.col !== 0 || timing.coord.row !== 0)).toEqual(
      expect.arrayContaining([
        { coord: { col: 1, row: 0 }, clearDelayMs: LIGHTBALL_COLLECTION_WAVE_MS },
        { coord: { col: 0, row: 1 }, clearDelayMs: LIGHTBALL_COLLECTION_WAVE_MS },
        { coord: { col: 2, row: 1 }, clearDelayMs: LIGHTBALL_COLLECTION_WAVE_MS },
      ]),
    );
  });

  it('clears only the Lightball origin immediately when no target color is selected', () => {
    const board = createBoardFromTileTypes([
      ['FIRE', 'ICE'],
      ['EARTH', 'LIGHTBALL'],
    ]);

    expect(detonatePowerUp(board, { col: 1, row: 1 }).clearTimings).toEqual([
      { coord: { col: 1, row: 1 }, clearDelayMs: 0 },
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
      [null, null, null],
    ]);

    expect(selectLightballTapTargetType(board, { col: 1, row: 1 })).toBe('FIRE');
  });

  it('returns no Lightball target when no adjacent standard color exists', () => {
    const board = createBoardFromTileTypes([
      [null, 'TNT', null],
      ['ROCKET_V', 'LIGHTBALL', 'ROCKET_H'],
      [null, 'LIGHTBALL', null],
    ]);

    expect(selectLightballTapTargetType(board, { col: 1, row: 1 })).toBeNull();
  });

  it('chains a rocket-hit TNT as a second deterministic detonation', () => {
    const board = createBoardFromTileTypes([
      ['ROCKET_H', 'FIRE', 'TNT', 'ICE'],
      ['EARTH', 'LIGHTNING', 'FIRE', 'ICE'],
    ]);

    const chain = resolvePowerUpChain(board, { col: 0, row: 0 });

    expect(chain.detonations.map((entry) => entry.detonation.powerUpType)).toEqual(['ROCKET_H', 'TNT']);
    expect(chain.detonations[1].activationDelayMs).toBe(2 * ROCKET_SWEEP_CLEAR_STAGGER_MS);
    expect(chain.detonations[0].detonation.clearedCells).not.toContainEqual({ col: 2, row: 0 });
    expect(chain.detonations[1].detonation.clearedCells).toContainEqual({ col: 2, row: 0 });
    expect(chain.clearTimings).toContainEqual({
      coord: { col: 2, row: 0 },
      clearDelayMs: 2 * ROCKET_SWEEP_CLEAR_STAGGER_MS,
    });
    expect(chain.clearTimings).toContainEqual({
      coord: { col: 1, row: 1 },
      clearDelayMs: 2 * ROCKET_SWEEP_CLEAR_STAGGER_MS + TNT_EXPLOSION_RING_DELAY_MS,
    });
    expect(chain.clearedCells).toContainEqual({ col: 1, row: 1 });
  });

  it('chains multiple power-ups once in stable timing and coordinate order', () => {
    const board = createBoardFromTileTypes([
      ['FIRE', 'ROCKET_V', 'ICE'],
      ['ROCKET_H', 'TNT', 'ROCKET_H'],
      ['EARTH', 'ROCKET_V', 'LIGHTNING'],
    ]);

    const chain = resolvePowerUpChain(board, { col: 1, row: 1 });

    expect(chain.detonations.map((entry) => ({
      type: entry.detonation.powerUpType,
      origin: entry.detonation.origin,
    }))).toEqual([
      { type: 'TNT', origin: { col: 1, row: 1 } },
      { type: 'ROCKET_V', origin: { col: 1, row: 0 } },
      { type: 'ROCKET_H', origin: { col: 0, row: 1 } },
      { type: 'ROCKET_H', origin: { col: 2, row: 1 } },
      { type: 'ROCKET_V', origin: { col: 1, row: 2 } },
    ]);
    expect(new Set(chain.detonations.map((entry) => `${entry.detonation.origin.col},${entry.detonation.origin.row}`)).size)
      .toBe(chain.detonations.length);
  });

  it('chains a Lightball using the adjacent color with the highest current board count', () => {
    const board = createBoardFromTileTypes([
      [null, null, 'ICE', null],
      ['ROCKET_H', 'FIRE', 'LIGHTBALL', 'FIRE'],
      [null, null, 'ICE', null],
      [null, null, 'ICE', null],
    ]);

    const chain = resolvePowerUpChain(board, { col: 0, row: 1 });
    const lightball = chain.detonations.find((entry) => entry.detonation.powerUpType === 'LIGHTBALL')?.detonation;

    expect(lightball?.lightballTargetType).toBe('ICE');
    expect(lightball?.clearedCells).toContainEqual({ col: 2, row: 0 });
    expect(lightball?.clearedCells).toContainEqual({ col: 2, row: 2 });
    expect(lightball?.clearedCells).toContainEqual({ col: 2, row: 3 });
    expect(chain.clearTimings).toContainEqual({
      coord: { col: 2, row: 0 },
      clearDelayMs: 2 * ROCKET_SWEEP_CLEAR_STAGGER_MS + LIGHTBALL_COLLECTION_WAVE_MS,
    });
  });

  it('does not clear void cells during chained detonations', () => {
    const board = createBoardFromTileTypes([
      ['ROCKET_H', 'FIRE', 'TNT'],
      ['EARTH', 'ICE', 'FIRE'],
    ]);
    board[0][1].isVoid = true;
    board[0][1].tile = null;

    const chain = resolvePowerUpChain(board, { col: 0, row: 0 });

    expect(chain.clearedCells).not.toContainEqual({ col: 1, row: 0 });
  });
});
