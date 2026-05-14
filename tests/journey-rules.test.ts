import { describe, expect, it } from 'vitest';
import { createBoardFromTileTypes } from '../src/board/Board';
import type { Board } from '../src/board/Board';
import type { CellCoord } from '../src/core/Layout';
import { SeededRng } from '../src/core/Rng';
import { ROCKET_SWEEP_CLEAR_STAGGER_MS } from '../src/data/tuning';
import type { GeneratedJourneyLevel } from '../src/generator/JourneyGenerator';
import {
  advanceMageOneStep,
  createJourneyRuntime,
  getVisibleJourneyHintCells,
  processJourneyPowerUpActivation,
  processJourneySwap,
  processJourneyRocketActivation,
  resolveJourneyBoard,
} from '../src/generator/JourneyRules';

describe('Journey rules', () => {
  it('converts LAND matches into persistent path cells', () => {
    const board = createBoardFromTileTypes([
      [null, 'LAND', 'LAND', 'LAND'],
      ['ICE', 'EARTH', 'FIRE', 'ICE'],
    ]);

    const result = resolveJourneyBoard(board, new SeededRng(11));

    expect(result.convertedPathCells).toEqual([
      { col: 1, row: 0 },
      { col: 2, row: 0 },
      { col: 3, row: 0 },
    ]);
    expect(result.board[0][1].isPath).toBe(true);
    expect(result.board[0][2].isPath).toBe(true);
    expect(result.board[0][3].isPath).toBe(true);
  });

  it('clears standard matches, adds placeholder score, and does not move mage without new path', () => {
    const level = testLevel({ moveBudget: 20, goalCell: { col: 7, row: 7 } });
    const board = createBoardFromTileTypes([
      ['FIRE', 'ICE', 'FIRE'],
      ['ICE', 'FIRE', 'ICE'],
      ['LIGHTNING', 'FIRE', 'EARTH'],
    ]);
    board[0][0].isPath = true;
    const runtime = createJourneyRuntime(level);

    const result = processJourneySwap(
      board,
      runtime,
      level,
      { col: 1, row: 0 },
      { col: 1, row: 1 },
      new SeededRng(12),
    );

    expect(result.valid).toBe(true);
    expect(result.scoreDelta).toBe(result.clearedStandardCells.length * 10);
    expect(result.scoreDelta).toBeGreaterThanOrEqual(30);
    expect(result.runtime.mageCell).toEqual({ col: 0, row: 0 });
    expect(result.runtime.movesRemaining).toBe(19);
  });

  it('moves the mage one legal step along connected path toward the goal', () => {
    const board = createBoardFromTileTypes([[null, null, null]]);
    board[0][0].isPath = true;
    board[0][1].isPath = true;
    board[0][2].isPath = true;

    expect(advanceMageOneStep(board, { col: 0, row: 0 }, { col: 2, row: 0 })).toEqual({
      col: 1,
      row: 0,
    });
  });

  it('wins when the mage reaches the goal', () => {
    const level = testLevel({ moveBudget: 20, goalCell: { col: 1, row: 0 } });
    const board = landSwapBoard();
    const runtime = createJourneyRuntime(level);

    const result = processJourneySwap(
      board,
      runtime,
      level,
      { col: 3, row: 1 },
      { col: 3, row: 0 },
      new SeededRng(13),
    );

    expect(result.runtime.mageCell).toEqual({ col: 1, row: 0 });
    expect(result.runtime.result).toBe('won');
  });

  it('loses when the move budget reaches zero before the goal', () => {
    const level = testLevel({ moveBudget: 1, goalCell: { col: 7, row: 7 } });
    const board = createBoardFromTileTypes([
      ['FIRE', 'ICE', 'FIRE'],
      ['ICE', 'FIRE', 'ICE'],
      ['LIGHTNING', 'FIRE', 'EARTH'],
    ]);
    board[0][0].isPath = true;
    const runtime = createJourneyRuntime(level);

    const result = processJourneySwap(
      board,
      runtime,
      level,
      { col: 1, row: 0 },
      { col: 1, row: 1 },
      new SeededRng(14),
    );

    expect(result.runtime.movesRemaining).toBe(0);
    expect(result.runtime.result).toBe('lost');
  });

  it('returns an invalid-swap animation trace for adjacent swaps that make no match', () => {
    const level = testLevel({ moveBudget: 20, goalCell: { col: 7, row: 7 } });
    const board = createBoardFromTileTypes([
      ['FIRE', 'ICE', 'EARTH'],
      ['LIGHTNING', 'EARTH', 'ICE'],
    ]);
    board[0][0].isPath = true;
    const runtime = createJourneyRuntime(level);

    const result = processJourneySwap(
      board,
      runtime,
      level,
      { col: 0, row: 0 },
      { col: 1, row: 0 },
      new SeededRng(22),
    );

    expect(result.valid).toBe(false);
    expect(result.animationTrace?.kind).toBe('invalidSwap');
    expect(result.board).toBe(board);
    expect(result.runtime).toBe(runtime);
    expect(result.runtime.movesRemaining).toBe(20);
    expect(result.scoreDelta).toBe(0);
  });

  it('hard-rejects non-adjacent Journey swaps without an animation trace', () => {
    const level = testLevel({ moveBudget: 20, goalCell: { col: 7, row: 7 } });
    const board = createBoardFromTileTypes([['FIRE', 'ICE', 'EARTH']]);
    board[0][0].isPath = true;

    const result = processJourneySwap(
      board,
      createJourneyRuntime(level),
      level,
      { col: 0, row: 0 },
      { col: 2, row: 0 },
      new SeededRng(23),
    );

    expect(result.valid).toBe(false);
    expect(result.animationTrace).toBeUndefined();
  });

  it('taps a Journey rocket as a valid move and converts LAND in the sweep', () => {
    const level = testLevel({ moveBudget: 20, goalCell: { col: 7, row: 7 } });
    const board = createBoardFromTileTypes([
      ['ROCKET_H', 'FIRE', 'ICE', 'LAND'],
      ['ICE', 'EARTH', 'FIRE', 'ICE'],
    ]);
    board[0][0].isPath = true;
    const runtime = createJourneyRuntime(level);

    const result = processJourneyRocketActivation(board, runtime, level, { col: 0, row: 0 }, new SeededRng(15));

    expect(result.valid).toBe(true);
    expect(result.runtime.movesRemaining).toBe(19);
    expect(result.convertedPathCells).toContainEqual({ col: 3, row: 0 });
    expect(result.clearedStandardCells.length).toBeGreaterThan(0);
    expect(result.animationTrace?.cascadeSteps[0].clearedTiles.some((tile) => (tile.clearDelayMs ?? 0) > 0)).toBe(true);
  });

  it('taps a Journey TNT as a valid move and converts LAND in the blast', () => {
    const level = testLevel({ moveBudget: 20, goalCell: { col: 7, row: 7 } });
    const board = createBoardFromTileTypes([
      ['FIRE', 'ICE', 'EARTH'],
      ['LAND', 'TNT', 'LIGHTNING'],
      ['ICE', 'EARTH', 'FIRE'],
    ]);
    board[0][0].isPath = true;
    const runtime = createJourneyRuntime(level);

    const result = processJourneyPowerUpActivation(board, runtime, level, { col: 1, row: 1 }, new SeededRng(16));

    expect(result.valid).toBe(true);
    expect(result.runtime.movesRemaining).toBe(19);
    expect(result.convertedPathCells).toContainEqual({ col: 0, row: 1 });
    expect(result.clearedStandardCells.length).toBeGreaterThan(0);
    expect(result.powerUpsUsed).toBe(1);
    expect(result.animationTrace?.cascadeSteps[0].clearedTiles.find((tile) => tile.clearDelayMs === 0)?.coord).toEqual({
      col: 1,
      row: 1,
    });
    expect(result.animationTrace?.cascadeSteps[0].clearedTiles.some((tile) => (tile.clearDelayMs ?? 0) > 0)).toBe(true);
  });

  it('taps a Journey Lightball using the adjacent color with the highest board count', () => {
    const level = testLevel({ moveBudget: 20, goalCell: { col: 7, row: 7 } });
    const board = createBoardFromTileTypes([
      [null, 'FIRE', null],
      ['FIRE', 'LIGHTBALL', 'ICE'],
      [null, 'ICE', null],
      [null, 'ICE', null],
    ]);
    board[0][0].isPath = true;
    const runtime = createJourneyRuntime(level);

    const result = processJourneyPowerUpActivation(board, runtime, level, { col: 1, row: 1 }, new SeededRng(19));

    expect(result.valid).toBe(true);
    expect(result.runtime.movesRemaining).toBe(19);
    expect(result.animationTrace?.cascadeSteps[0].clearedTiles.map((tile) => tile.coord)).toEqual([
      { col: 1, row: 1 },
      { col: 2, row: 1 },
      { col: 1, row: 2 },
      { col: 1, row: 3 },
    ]);
    expect(result.clearedStandardCells).toContainEqual({ col: 2, row: 1 });
  });

  it('ignores Journey Lightball taps without an adjacent standard color', () => {
    const level = testLevel({ moveBudget: 20, goalCell: { col: 7, row: 7 } });
    const board = createBoardFromTileTypes([
      [null, 'TNT', null],
      ['LAND', 'LIGHTBALL', 'ROCKET_H'],
      [null, 'ROCKET_V', null],
    ]);
    board[0][0].isPath = true;
    const runtime = createJourneyRuntime(level);

    const result = processJourneyPowerUpActivation(board, runtime, level, { col: 1, row: 1 }, new SeededRng(20));

    expect(result.valid).toBe(false);
    expect(result.runtime.movesRemaining).toBe(20);
    expect(result.board).toBe(board);
  });

  it('activates a swapped Journey TNT at its landing cell', () => {
    const level = testLevel({ moveBudget: 20, goalCell: { col: 7, row: 7 } });
    const board = createBoardFromTileTypes([['TNT', 'FIRE'], ['ICE', 'EARTH']]);
    board[0][0].isPath = true;
    const runtime = createJourneyRuntime(level);

    const result = processJourneySwap(board, runtime, level, { col: 0, row: 0 }, { col: 1, row: 0 }, new SeededRng(17));

    expect(result.valid).toBe(true);
    expect(result.animationTrace?.cascadeSteps[0].clearedTiles.find((tile) => tile.clearDelayMs === 0)?.coord).toEqual({
      col: 1,
      row: 0,
    });
  });

  it('chains Journey power-ups with one spent move and converts LAND in chained footprints', () => {
    const level = testLevel({ moveBudget: 20, goalCell: { col: 7, row: 7 } });
    const board = createBoardFromTileTypes([
      ['ROCKET_H', 'FIRE', 'TNT', 'ICE'],
      ['EARTH', 'LAND', 'FIRE', 'ICE'],
    ]);
    board[0][0].isPath = true;
    const runtime = createJourneyRuntime(level);

    const result = processJourneyPowerUpActivation(board, runtime, level, { col: 0, row: 0 }, new SeededRng(21));

    expect(result.valid).toBe(true);
    expect(result.powerUpsUsed).toBe(2);
    expect(result.runtime.movesRemaining).toBe(19);
    expect(result.convertedPathCells).toContainEqual({ col: 1, row: 1 });
    const firstStepTiles = result.animationTrace?.cascadeSteps[0].clearedTiles ?? [];
    expect(firstStepTiles).toContainEqual(expect.objectContaining({
      coord: { col: 2, row: 0 },
      clearDelayMs: 2 * ROCKET_SWEEP_CLEAR_STAGGER_MS,
    }));
    expect(firstStepTiles).toContainEqual(expect.objectContaining({ coord: { col: 1, row: 1 } }));
    expect(result.animationTrace?.cascadeSteps[0].refillTiles.length).toBeGreaterThan(0);
  });

  it('ignores non-power-up Journey taps', () => {
    const level = testLevel({ moveBudget: 20, goalCell: { col: 7, row: 7 } });
    const board = createBoardFromTileTypes([['FIRE', 'ICE', 'EARTH']]);
    board[0][0].isPath = true;
    const runtime = createJourneyRuntime(level);

    const result = processJourneyPowerUpActivation(board, runtime, level, { col: 0, row: 0 }, new SeededRng(18));

    expect(result.valid).toBe(false);
    expect(result.runtime.movesRemaining).toBe(20);
  });

  it('shows the first hint only after the delay when no move has been made', () => {
    const level = testLevel({ moveBudget: 20, goalCell: { col: 7, row: 7 } });
    const runtime = createJourneyRuntime(level);

    expect(getVisibleJourneyHintCells(level, runtime, 2.49)).toEqual([]);
    expect(getVisibleJourneyHintCells(level, runtime, 2.5)).toEqual([
      { col: 3, row: 1 },
      { col: 3, row: 0 },
    ]);

    expect(
      getVisibleJourneyHintCells(level, { ...runtime, hasPlayerMoved: true }, 3),
    ).toEqual([]);
  });
});

function landSwapBoard(): Board {
  const board = createBoardFromTileTypes([
    [null, 'LAND', 'LAND', 'FIRE'],
    ['ICE', 'EARTH', 'FIRE', 'LAND'],
  ]);
  board[0][0].isPath = true;
  return board;
}

function testLevel(options: {
  moveBudget: number;
  goalCell: CellCoord;
}): GeneratedJourneyLevel {
  const initialBoard = createBoardFromTileTypes([]);
  initialBoard[0][0].isPath = true;

  return {
    type: 'JOURNEY',
    difficulty: 1,
    seed: 1,
    initialBoard,
    journey: {
      moveBudget: options.moveBudget,
      startCell: { col: 0, row: 0 },
      goalCell: options.goalCell,
      landTilePositions: [],
      candidatePathSolution: [
        { col: 0, row: 0 },
        options.goalCell,
      ],
      firstHint: {
        from: { col: 3, row: 1 },
        to: { col: 3, row: 0 },
      },
    },
  };
}
