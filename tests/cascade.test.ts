import { describe, expect, it } from 'vitest';
import { createBoardFromTileTypes, createBoardScopedTileIdFactory } from '../src/board/Board';
import { applyGravity, getEmptyPlayableCells, resolveCascades, settleBoardWithVoidAwareRefill } from '../src/board/Cascade';
import { detectMatches } from '../src/board/MatchDetection';
import { SeededRng } from '../src/core/Rng';

describe('cascade resolution', () => {
  it('clears matches, refills the board, and settles with no matches', () => {
    const board = createBoardFromTileTypes([
      ['FIRE', 'FIRE', 'FIRE'],
      ['ICE', 'EARTH', 'LIGHTNING'],
      ['EARTH', 'ICE', 'LIGHTNING'],
    ]);

    const result = resolveCascades(board, new SeededRng(42));

    expect(result.steps.length).toBeGreaterThan(0);
    expect(detectMatches(result.board)).toHaveLength(0);
    expect(getEmptyPlayableCells(result.board)).toHaveLength(0);
  });

  it('preserves void cells and never refills them', () => {
    const board = createBoardFromTileTypes(
      [
        ['FIRE', null],
        ['EARTH', null],
        ['LIGHTNING', null],
        [null, 'ICE'],
        [null, 'ICE'],
        [null, 'ICE'],
      ],
      { voidCells: [{ col: 0, row: 3 }] },
    );

    const result = resolveCascades(board, new SeededRng(24));

    expect(result.board[3][0].isVoid).toBe(true);
    expect(result.board[3][0].tile).toBeNull();
    expect(detectMatches(result.board)).toHaveLength(0);
  });

  it('does not let tiles fall vertically through void cells', () => {
    const board = createBoardFromTileTypes(
      [
        ['FIRE'],
        [null],
        [null],
      ],
      { voidCells: [{ col: 0, row: 1 }] },
    );

    applyGravity(board);

    expect(board[1][0].isVoid).toBe(true);
    expect(board[1][0].tile).toBeNull();
    expect(board[2][0].tile).toBeNull();
    expect(board.flat().some((cell) => cell.tile?.type === 'FIRE')).toBe(true);
  });

  it('slides tiles diagonally around void cells into lower playable gaps', () => {
    const board = createBoardFromTileTypes(
      [
        [null, 'FIRE'],
        [null, null],
        [null, null],
        [null, null],
      ],
      { voidCells: [{ col: 0, row: 1 }, { col: 1, row: 3 }] },
    );
    const tileId = board[0][1].tile!.id;

    applyGravity(board);

    expect(board[7][0].tile?.id).toBe(tileId);
    expect(board[7][0].tile?.col).toBe(0);
    expect(board[7][0].tile?.row).toBe(7);
    expect(board[1][0].tile).toBeNull();
  });

  it('does not slide into cells that are not blocked by a void above', () => {
    const board = createBoardFromTileTypes(
      [
        ['FIRE', null],
        [null, null],
        [null, null],
      ],
      { voidCells: [{ col: 0, row: 1 }] },
    );
    const tileId = board[0][0].tile!.id;

    applyGravity(board);

    expect(board[0][0].tile?.id).toBe(tileId);
    expect(board[2][1].tile).toBeNull();
  });

  it('refills blocked gaps from adjacent columns instead of directly through voids', () => {
    const board = createBoardFromTileTypes(
      [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      { voidCells: [{ col: 1, row: 1 }] },
    );

    const result = settleBoardWithVoidAwareRefill(board, new SeededRng(12), createBoardScopedTileIdFactory(board, 'refill'));
    const blockedGapRefill = result.refillTiles.find((refill) => refill.to.col === 1 && refill.to.row === 2);

    expect(board[2][1].tile).not.toBeNull();
    expect(blockedGapRefill).toBeDefined();
    expect(blockedGapRefill?.movementKind).toBe('slide');
    expect(blockedGapRefill?.from.col).not.toBe(1);
    expect(blockedGapRefill?.from.row).toBeGreaterThanOrEqual(0);
  });

  it('keeps normal top-accessible refills vertical', () => {
    const board = createBoardFromTileTypes([[null, null, null]]);

    const result = settleBoardWithVoidAwareRefill(board, new SeededRng(13), createBoardScopedTileIdFactory(board, 'refill'));
    const verticalRefill = result.refillTiles.find((refill) => refill.to.col === 1 && refill.to.row === 0);

    expect(verticalRefill).toBeDefined();
    expect(verticalRefill?.movementKind).toBe('fall');
    expect(verticalRefill?.from.col).toBe(1);
  });

  it('keeps top-accessible refills vertical even when adjacent to a void column', () => {
    const board = createBoardFromTileTypes(
      [
        [null, null],
        [null, null],
        [null, null],
      ],
      { voidCells: [{ col: 0, row: 1 }] },
    );

    const result = settleBoardWithVoidAwareRefill(board, new SeededRng(14), createBoardScopedTileIdFactory(board, 'refill'));
    const verticalRefill = result.refillTiles.find((refill) => refill.to.col === 1 && refill.to.row === 2);

    expect(verticalRefill).toBeDefined();
    expect(verticalRefill?.movementKind).toBe('fall');
    expect(verticalRefill?.from.col).toBe(1);
  });
});
