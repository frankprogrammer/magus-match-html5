import { describe, expect, it } from 'vitest';
import { createBoardFromTileTypes } from '../src/board/Board';
import { resolveCascades } from '../src/board/Cascade';
import { SeededRng } from '../src/core/Rng';
import type { CellCoord } from '../src/core/Layout';
import type { GeneratedJourneyLevel } from '../src/generator/JourneyGenerator';
import { createJourneyRuntime, processJourneySwap } from '../src/generator/JourneyRules';
import type { GeneratedTrialLevel, TrialMonsterManifestEntry } from '../src/generator/TrialGenerator';
import { generateTrialLevel } from '../src/generator/TrialGenerator';
import { createTrialRuntime, processTrialSwap } from '../src/generator/TrialRules';

describe('board animation traces', () => {
  it('records cleared tiles, falling movement, refills, and final board snapshots for cascades', () => {
    const board = createBoardFromTileTypes([
      ['ICE', 'EARTH', 'LIGHTNING'],
      ['FIRE', 'ICE', 'EARTH'],
      ['FIRE', 'FIRE', 'FIRE'],
    ]);

    const result = resolveCascades(board, new SeededRng(42), {
      animation: {
        revisionId: 7,
        preSwapBoard: board,
        postSwapBoard: board,
      },
    });

    const trace = result.animationTrace;
    expect(trace?.revisionId).toBe(7);
    expect(trace?.cascadeSteps.length).toBeGreaterThan(0);
    expect(trace?.cascadeSteps[0].clearedTiles.length).toBeGreaterThanOrEqual(3);
    expect(trace?.cascadeSteps[0].fallingTiles.length).toBeGreaterThan(0);
    expect(trace?.cascadeSteps[0].refillTiles.length).toBeGreaterThan(0);
    expect(trace?.finalSnapshot.cells.length).toBe(64);
  });

  it('records Journey LAND match pops while preserving final path authority', () => {
    const level = journeyTestLevel({ moveBudget: 20, goalCell: { col: 1, row: 0 } });
    const board = createBoardFromTileTypes([
      [null, 'LAND', 'LAND', 'FIRE'],
      ['ICE', 'EARTH', 'FIRE', 'LAND'],
    ]);
    board[0][0].isPath = true;

    const result = processJourneySwap(
      board,
      createJourneyRuntime(level),
      level,
      { col: 3, row: 1 },
      { col: 3, row: 0 },
      new SeededRng(13),
    );

    expect(result.valid).toBe(true);
    expect(result.animationTrace?.cascadeSteps[0].clearedTiles.map((tile) => tile.tileType)).toEqual([
      'LAND',
      'LAND',
      'LAND',
    ]);
    expect(result.board[0][1].isPath).toBe(true);
    expect(result.board[0][2].isPath).toBe(true);
    expect(result.board[0][3].isPath).toBe(true);
  });

  it('records Trial swap traces without changing damage semantics', () => {
    const board = matchSwapBoard();
    const level = trialTestLevel([monster({ maxHp: 50 })], board);
    const result = processTrialSwap(
      board,
      createTrialRuntime(level),
      level,
      { col: 1, row: 0 },
      { col: 1, row: 1 },
      new SeededRng(99),
    );

    expect(result.valid).toBe(true);
    expect(result.damageEvents.length).toBeGreaterThan(0);
    expect(result.animationTrace?.cascadeSteps.length).toBeGreaterThan(0);
  });
});

function journeyTestLevel(options: {
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
      candidatePathSolution: [{ col: 0, row: 0 }, options.goalCell],
      firstHint: {
        from: { col: 3, row: 1 },
        to: { col: 3, row: 0 },
      },
    },
  };
}

function trialTestLevel(
  manifest: readonly TrialMonsterManifestEntry[],
  initialBoard = matchSwapBoard(),
): GeneratedTrialLevel {
  const level = generateTrialLevel({ difficulty: 1, seed: 10 });
  return {
    ...level,
    initialBoard,
    trial: {
      ...level.trial,
      baseDamage: 10,
      waveManifest: manifest,
    },
  };
}

function monster(overrides: Partial<TrialMonsterManifestEntry> = {}): TrialMonsterManifestEntry {
  return {
    monsterId: 'monster',
    kind: 'kobold',
    laneId: 2,
    spawnTimeMs: 0,
    maxHp: 20,
    walkSpeed: 0.2,
    scoreValue: 100,
    ...overrides,
  };
}

function matchSwapBoard() {
  return createBoardFromTileTypes([
    ['FIRE', 'ICE', 'FIRE'],
    ['ICE', 'FIRE', 'ICE'],
    ['LIGHTNING', 'FIRE', 'EARTH'],
  ]);
}
