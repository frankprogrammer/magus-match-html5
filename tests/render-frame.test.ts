import { describe, expect, it } from 'vitest';
import { BOARD_RECT } from '../src/core/Layout';
import type { BoardRenderState } from '../src/render-2d/BoardRenderState';
import { buildBoardCellVisuals } from '../src/render-2d/RenderFrame';

describe('buildBoardCellVisuals', () => {
  it('builds stable cell bounds and overlay flags from render state', () => {
    const state: BoardRenderState = {
      logicalWidth: 1080,
      logicalHeight: 1920,
      boardCells: [
        {
          coord: { col: 0, row: 0 },
          assetId: 'tile.fire',
          tileType: 'FIRE',
          isPath: true,
          alpha: 1,
        },
        {
          coord: { col: 7, row: 7 },
          assetId: 'tile.land',
          tileType: 'LAND',
          isPath: false,
          alpha: 0.75,
        },
      ],
      pathCells: [{ col: 0, row: 0 }],
      mageCell: { col: 0, row: 0 },
      goalCell: { col: 7, row: 7 },
      hintedCells: [{ col: 7, row: 7 }],
      selectedCell: null,
      queuedSwap: null,
      shakePixels: 0,
    };

    const visuals = buildBoardCellVisuals(state, 0.25);

    expect(visuals).toHaveLength(2);
    expect(visuals[0]).toMatchObject({
      coord: { col: 0, row: 0 },
      x: BOARD_RECT.x,
      y: BOARD_RECT.y,
      width: 135,
      height: 135,
      centerX: 67.5,
      centerY: BOARD_RECT.y + 67.5,
      tileType: 'FIRE',
      fillColor: '#eb5757',
      glyph: 'F',
      isPath: true,
      isHinted: false,
      hasMage: true,
      hasGoal: false,
      alpha: 1,
      scale: 1,
      flash: 0,
    });
    expect(visuals[1]).toMatchObject({
      coord: { col: 7, row: 7 },
      x: BOARD_RECT.x + 7 * BOARD_RECT.cellSize,
      y: BOARD_RECT.y + 7 * BOARD_RECT.cellSize,
      width: 135,
      height: 135,
      tileType: 'LAND',
      fillColor: '#8b6f47',
      glyph: 'P',
      isHinted: true,
      hasMage: false,
      hasGoal: true,
      alpha: 0.75,
    });
    expect(visuals[1].scale).toBeGreaterThan(1);
    expect(visuals[1].flash).toBeGreaterThan(0);
  });

  it('skips cells that do not have tile render data', () => {
    const state: BoardRenderState = {
      logicalWidth: 1080,
      logicalHeight: 1920,
      boardCells: [],
      pathCells: [],
      mageCell: null,
      goalCell: null,
      hintedCells: [],
      selectedCell: null,
      queuedSwap: null,
      shakePixels: 0,
    };

    expect(buildBoardCellVisuals(state, 0)).toEqual([]);
  });
});
