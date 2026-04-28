import { describe, expect, it } from 'vitest';
import type { BoardAnimationTrace } from '../src/board/BoardAnimationTrace';
import { BOARD_RECT } from '../src/core/Layout';
import { BoardAnimationPresenter } from '../src/render-2d/BoardAnimationPresenter';
import type { BoardCellVisualState, BoardRenderState } from '../src/render-2d/BoardRenderState';

describe('BoardAnimationPresenter', () => {
  it('scales matched tiles down, falls tiles physically, and settles to the authoritative board', () => {
    const presenter = new BoardAnimationPresenter();
    const trace = movementTrace(1, 0, 2);
    const state = boardState(trace);

    presenter.present(state, 0);
    const popping = presenter.present(state, 0.14);
    const cleared = popping.boardCells.find((cell) => cell.tileId === 'clear');
    expect(cleared?.scale).toBeGreaterThan(0);
    expect(cleared?.scale).toBeLessThan(1);

    const falling = presenter.present(state, 0.32);
    const moved = falling.boardCells.find((cell) => cell.tileId === 'moving');
    expect(moved?.renderY).toBeGreaterThan(BOARD_RECT.y);
    expect(moved?.renderY).toBeLessThan(BOARD_RECT.y + 2 * BOARD_RECT.cellSize);

    const settled = presenter.present(state, 2);
    expect(settled.boardCells.map((cell) => cell.tileId).sort()).toEqual(['moving', 'refill']);
    expect(settled.boardCells.find((cell) => cell.tileId === 'moving')?.coord).toEqual({ col: 0, row: 2 });
  });

  it('retargets shared tiles from their current animated positions when a new trace arrives', () => {
    const presenter = new BoardAnimationPresenter();
    const firstTrace = movementTrace(1, 0, 4);
    const firstState = boardState(firstTrace);

    presenter.present(firstState, 0);
    const midFirst = presenter.present(firstState, 0.32);
    const midY = midFirst.boardCells.find((cell) => cell.tileId === 'moving')?.renderY;

    const secondTrace = movementTrace(2, 4, 7);
    const secondState = boardState(secondTrace);
    const retargeted = presenter.present(secondState, 0.32);
    const retargetedY = retargeted.boardCells.find((cell) => cell.tileId === 'moving')?.renderY;

    expect(midY).toBeDefined();
    expect(retargetedY).toBeCloseTo(midY!, 4);
    expect(retargetedY).not.toBe(BOARD_RECT.y + 4 * BOARD_RECT.cellSize);
  });
});

function movementTrace(revisionId: number, fromRow: number, toRow: number): BoardAnimationTrace {
  return {
    revisionId,
    swappedCells: null,
    preSwapSnapshot: {
      cells: [snapshotCell('moving', 'FIRE', 0, fromRow), snapshotCell('clear', 'ICE', 1, 1)],
    },
    postSwapSnapshot: {
      cells: [snapshotCell('moving', 'FIRE', 0, fromRow), snapshotCell('clear', 'ICE', 1, 1)],
    },
    cascadeSteps: [
      {
        stepIndex: 0,
        beforeClearSnapshot: {
          cells: [snapshotCell('moving', 'FIRE', 0, fromRow), snapshotCell('clear', 'ICE', 1, 1)],
        },
        beforeGravitySnapshot: {
          cells: [snapshotCell('moving', 'FIRE', 0, fromRow)],
        },
        afterGravitySnapshot: {
          cells: [snapshotCell('moving', 'FIRE', 0, toRow)],
        },
        finalSnapshot: {
          cells: [snapshotCell('refill', 'EARTH', 0, 0), snapshotCell('moving', 'FIRE', 0, toRow)],
        },
        clearedTiles: [snapshotCell('clear', 'ICE', 1, 1)],
        fallingTiles: [
          {
            tileId: 'moving',
            tileType: 'FIRE',
            from: { col: 0, row: fromRow },
            to: { col: 0, row: toRow },
            isPath: false,
          },
        ],
        refillTiles: [
          {
            tileId: 'refill',
            tileType: 'EARTH',
            from: { col: 0, row: -1 },
            to: { col: 0, row: 0 },
            isPath: false,
          },
        ],
      },
    ],
    finalSnapshot: {
      cells: [snapshotCell('refill', 'EARTH', 0, 0), snapshotCell('moving', 'FIRE', 0, toRow)],
    },
  };
}

function boardState(trace: BoardAnimationTrace): BoardRenderState {
  return {
    logicalWidth: 1080,
    logicalHeight: 1920,
    boardCells: trace.finalSnapshot.cells.map((cell) => renderCell(cell.tileId, cell.tileType, cell.coord.col, cell.coord.row)),
    pathCells: [],
    mageCell: null,
    goalCell: null,
    hintedCells: [],
    selectedCell: null,
    queuedSwap: null,
    shakePixels: 0,
    visualCues: [],
    animationTrace: trace,
  };
}

function snapshotCell(
  tileId: string,
  tileType: BoardCellVisualState['tileType'],
  col: number,
  row: number,
) {
  return {
    tileId,
    tileType,
    coord: { col, row },
    isPath: false,
  };
}

function renderCell(
  tileId: string,
  tileType: BoardCellVisualState['tileType'],
  col: number,
  row: number,
): BoardCellVisualState {
  return {
    tileId,
    coord: { col, row },
    assetId: `tile.${tileType.toLowerCase()}`,
    tileType,
    isPath: false,
    alpha: 1,
  };
}
