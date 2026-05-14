import { describe, expect, it } from 'vitest';
import { createBoardFromTileTypes } from '../src/board/Board';
import {
  buildBoardAnimationCascadeStep,
  createInvalidSwapAnimationTrace,
  createLevelIntroBoardAnimationTrace,
} from '../src/board/BoardAnimationTrace';
import { resolveCascades } from '../src/board/Cascade';
import { SeededRng } from '../src/core/Rng';
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
    expect(result.damageEvents).toEqual([]);
    expect(result.queuedAttackEvents.length).toBeGreaterThan(0);
    expect(result.animationTrace?.cascadeSteps.length).toBeGreaterThan(0);
  });

  it('creates an empty-to-refill level intro trace for initial boards', () => {
    const board = createBoardFromTileTypes([
      ['FIRE', 'ICE'],
      ['EARTH', 'LIGHTNING'],
    ]);

    const trace = createLevelIntroBoardAnimationTrace(board, 12);
    const step = trace.cascadeSteps[0];

    expect(trace.kind).toBe('levelIntro');
    expect(trace.revisionId).toBe(12);
    expect(trace.preSwapSnapshot.cells).toEqual([]);
    expect(trace.postSwapSnapshot.cells).toEqual([]);
    expect(step.clearedTiles).toEqual([]);
    expect(step.fallingTiles).toEqual([]);
    expect(step.refillTiles).toHaveLength(4);
    expect(step.refillTiles.every((refill) => refill.from.row < 0)).toBe(true);
    expect(step.refillTiles.find((refill) => refill.to.row === 0)?.from.row).toBeLessThan(
      step.refillTiles.find((refill) => refill.to.row === 1)?.from.row ?? 0,
    );
    expect(trace.finalSnapshot.cells).toHaveLength(4);
  });

  it('creates an invalid-swap trace without mutating the authoritative board', () => {
    const board = createBoardFromTileTypes([
      ['FIRE', 'ICE'],
      ['EARTH', 'LIGHTNING'],
    ]);

    const trace = createInvalidSwapAnimationTrace(board, { col: 0, row: 0 }, { col: 1, row: 0 }, 16);

    expect(trace.kind).toBe('invalidSwap');
    expect(trace.revisionId).toBe(16);
    expect(trace.swappedCells).toEqual({ from: { col: 0, row: 0 }, to: { col: 1, row: 0 } });
    expect(trace.cascadeSteps).toEqual([]);
    expect(trace.finalSnapshot).toEqual(trace.preSwapSnapshot);
    expect(trace.postSwapSnapshot.cells.find((cell) => cell.tileType === 'FIRE')?.coord).toEqual({
      col: 1,
      row: 0,
    });
    expect(trace.postSwapSnapshot.cells.find((cell) => cell.tileType === 'ICE')?.coord).toEqual({
      col: 0,
      row: 0,
    });
    expect(board[0][0].tile?.type).toBe('FIRE');
    expect(board[0][1].tile?.type).toBe('ICE');
  });

  it('creates void-aware level intro slide refills for cells below empty spaces', () => {
    const board = createBoardFromTileTypes(
      [
        ['FIRE', 'ICE', 'EARTH'],
        ['LIGHTNING', null, 'FIRE'],
        ['ICE', 'EARTH', 'LIGHTNING'],
      ],
      { voidCells: [{ col: 1, row: 1 }] },
    );

    const trace = createLevelIntroBoardAnimationTrace(board, 14);
    const blockedRefill = trace.cascadeSteps[0].refillTiles.find(
      (refill) => refill.to.col === 1 && refill.to.row === 2,
    );

    expect(blockedRefill).toBeDefined();
    expect(blockedRefill?.movementKind).toBe('slide');
    expect(blockedRefill?.from.col).not.toBe(1);
    expect(blockedRefill?.from.row).toBeGreaterThanOrEqual(0);
    expect(blockedRefill?.from.row).toBeLessThanOrEqual(1);
  });

  it('keeps top-accessible intro refills vertical beside empty spaces', () => {
    const board = createBoardFromTileTypes(
      [
        ['FIRE', 'ICE'],
        [null, 'EARTH'],
        ['LIGHTNING', 'FIRE'],
      ],
      { voidCells: [{ col: 0, row: 1 }] },
    );

    const trace = createLevelIntroBoardAnimationTrace(board, 15);
    const adjacentRefill = trace.cascadeSteps[0].refillTiles.find(
      (refill) => refill.to.col === 1 && refill.to.row === 2,
    );

    expect(adjacentRefill).toBeDefined();
    expect(adjacentRefill?.movementKind).toBe('fall');
    expect(adjacentRefill?.from.col).toBe(1);
  });

  it('stacks full-column cascade refills above the board from bottom to top', () => {
    const beforeClearBoard = createBoardFromTileTypes([
      ['FIRE'],
      ['ICE'],
      ['EARTH'],
      ['LIGHTNING'],
      ['FIRE'],
      ['ICE'],
      ['EARTH'],
      ['LIGHTNING'],
    ]);
    const emptyBoard = createBoardFromTileTypes([]);
    const finalBoard = createBoardFromTileTypes([
      ['ICE'],
      ['EARTH'],
      ['LIGHTNING'],
      ['FIRE'],
      ['ICE'],
      ['EARTH'],
      ['LIGHTNING'],
      ['FIRE'],
    ]);

    const step = buildBoardAnimationCascadeStep(
      0,
      beforeClearBoard,
      emptyBoard,
      emptyBoard,
      finalBoard,
      Array.from({ length: 8 }, (_, row) => ({ col: 0, row })),
    );
    const columnRefills = step.refillTiles.filter((refill) => refill.to.col === 0);

    expect(columnRefills.map((refill) => ({ toRow: refill.to.row, fromRow: refill.from.row }))).toEqual([
      { toRow: 0, fromRow: -8 },
      { toRow: 1, fromRow: -7 },
      { toRow: 2, fromRow: -6 },
      { toRow: 3, fromRow: -5 },
      { toRow: 4, fromRow: -4 },
      { toRow: 5, fromRow: -3 },
      { toRow: 6, fromRow: -2 },
      { toRow: 7, fromRow: -1 },
    ]);
  });

  it('stacks partial cascade refills above the board from the lowest destination first', () => {
    const emptyBoard = createBoardFromTileTypes([]);
    const finalBoard = createBoardFromTileTypes([
      ['FIRE'],
      ['ICE'],
      ['EARTH'],
    ]);

    const step = buildBoardAnimationCascadeStep(0, emptyBoard, emptyBoard, emptyBoard, finalBoard, []);
    const columnRefills = step.refillTiles.filter((refill) => refill.to.col === 0);

    expect(columnRefills.map((refill) => ({ toRow: refill.to.row, fromRow: refill.from.row }))).toEqual([
      { toRow: 0, fromRow: -3 },
      { toRow: 1, fromRow: -2 },
      { toRow: 2, fromRow: -1 },
    ]);
  });

  it('marks cross-column gravity movement as an intentional slide', () => {
    const beforeGravityBoard = createBoardFromTileTypes([
      [null, 'FIRE'],
      [null, null],
      [null, null],
    ]);
    const afterGravityBoard = createBoardFromTileTypes([
      [null, null],
      [null, null],
      ['FIRE', null],
    ]);
    afterGravityBoard[2][0].tile!.id = beforeGravityBoard[0][1].tile!.id;

    const step = buildBoardAnimationCascadeStep(
      0,
      beforeGravityBoard,
      beforeGravityBoard,
      afterGravityBoard,
      afterGravityBoard,
      [],
    );

    expect(step.fallingTiles[0]).toMatchObject({
      from: { col: 1, row: 0 },
      to: { col: 0, row: 2 },
      movementKind: 'slide',
    });
  });
});

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
    laneId: 0,
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
