import { describe, expect, it } from 'vitest';
import { createBoardFromTileTypes } from '../src/board/Board';
import type { Board } from '../src/board/Board';
import type { CellCoord } from '../src/core/Layout';
import { SeededRng } from '../src/core/Rng';
import type { GeneratedJourneyLevel } from '../src/generator/JourneyGenerator';
import {
  advanceMageOneStep,
  createJourneyRuntime,
  getVisibleJourneyHintCells,
  processJourneySwap,
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
