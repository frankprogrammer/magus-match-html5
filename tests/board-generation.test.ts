import { describe, expect, it } from 'vitest';
import { createPlayableStandardBoard } from '../src/board/BoardSolver';
import { countValidMoves } from '../src/board/BoardRules';
import { detectMatches } from '../src/board/MatchDetection';
import { isStandardTileType } from '../src/board/TileTypes';
import { SeededRng } from '../src/core/Rng';

describe('board generation', () => {
  it('creates a playable standard board without starting matches', () => {
    const board = createPlayableStandardBoard(new SeededRng(12345));

    expect(detectMatches(board)).toHaveLength(0);
    expect(countValidMoves(board)).toBeGreaterThanOrEqual(3);
    expect(board.flat().every((cell) => cell.isVoid || isStandardTileType(cell.tile!.type))).toBe(true);
  });

  it('is deterministic for the same seed', () => {
    const first = createPlayableStandardBoard(new SeededRng(777));
    const second = createPlayableStandardBoard(new SeededRng(777));

    expect(tileTypes(first)).toEqual(tileTypes(second));
  });
});

function tileTypes(board: ReturnType<typeof createPlayableStandardBoard>): string[][] {
  return board.map((row) => row.map((cell) => cell.tile?.type ?? 'EMPTY'));
}
