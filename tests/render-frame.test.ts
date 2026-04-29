import { describe, expect, it } from 'vitest';
import { AssetIds } from '../src/assets/AssetIds';
import { BOARD_RECT } from '../src/core/Layout';
import type { DrawImageRef, GameRenderer, TextStyle } from '../src/render-2d/GameRenderer';
import type { BoardRenderState } from '../src/render-2d/BoardRenderState';
import { buildBoardCellVisuals, renderFrame } from '../src/render-2d/RenderFrame';

describe('buildBoardCellVisuals', () => {
  it('builds stable cell bounds and overlay flags from render state', () => {
    const state: BoardRenderState = {
      logicalWidth: 1080,
      logicalHeight: 1920,
      boardCells: [
        {
          tileId: 'tile-0',
          coord: { col: 0, row: 0 },
          assetId: 'tile.fire',
          tileType: 'FIRE',
          isPath: true,
          alpha: 1,
        },
        {
          tileId: 'tile-1',
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
      visualCues: [],
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
      visualCues: [],
    };

    expect(buildBoardCellVisuals(state, 0)).toEqual([]);
  });

  it('draws image assets when available', () => {
    const renderer = new FakeRenderer(new Set(['tile.fire']));

    renderFrame(renderer, oneTileState('tile.fire'), hudState(), 0);

    expect(renderer.calls).toContain('image:tile.fire');
    expect(renderer.calls).not.toContain('text:F');
  });

  it('draws the HUD banner image across the middle UI band when available', () => {
    const renderer = new FakeRenderer(new Set([AssetIds.ui.hudBanner]));

    renderFrame(renderer, oneTileState('tile.fire'), hudState(), 0);

    expect(renderer.calls).toContain(`image:${AssetIds.ui.hudBanner}`);
  });

  it('falls back to shapes and glyphs when image assets are unavailable', () => {
    const renderer = new FakeRenderer(new Set());

    renderFrame(renderer, oneTileState('tile.fire'), hudState(), 0);

    expect(renderer.calls).not.toContain('image:tile.fire');
    expect(renderer.calls).toContain('rect:#eb5757');
    expect(renderer.calls).toContain('text:F');
  });

  it('clips the tile layer to the board rect and draws the frame above it', () => {
    const renderer = new FakeRenderer(new Set());

    renderFrame(renderer, oneTileState('tile.fire'), hudState(), 0);

    const clipIndex = renderer.calls.indexOf(
      `clip:${BOARD_RECT.x},${BOARD_RECT.y},${BOARD_RECT.width},${BOARD_RECT.height}`,
    );
    const tileIndex = renderer.calls.indexOf('rect:#eb5757');
    const clippedLayerPopIndex = renderer.calls.indexOf('pop', tileIndex);
    const frameIndex = renderer.calls.indexOf(
      `rect:#c8a24b:${BOARD_RECT.x - 8},${BOARD_RECT.y - 8},${BOARD_RECT.width + 16},8`,
    );

    expect(clipIndex).toBeGreaterThan(-1);
    expect(tileIndex).toBeGreaterThan(clipIndex);
    expect(clippedLayerPopIndex).toBeGreaterThan(tileIndex);
    expect(frameIndex).toBeGreaterThan(clippedLayerPopIndex);
  });

  it('applies transient visual cues to cells and damage popups', () => {
    const renderer = new FakeRenderer(new Set());
    const state = oneTileState('tile.fire');
    state.visualCues = [
      { kind: 'matchFlash', coord: { col: 0, row: 0 }, value: 0.8 },
      { kind: 'damagePopup', coord: { col: 0, row: 0 }, value: 1, text: '-10' },
    ];

    const visuals = buildBoardCellVisuals(state, 0);
    renderFrame(renderer, state, hudState(), 0);

    expect(visuals[0].flash).toBeCloseTo(0.4);
    expect(renderer.calls).toContain('text:-10');
  });
});

function oneTileState(assetId: string): BoardRenderState {
  return {
    logicalWidth: 1080,
    logicalHeight: 1920,
    boardCells: [
      {
        tileId: 'tile-0',
        coord: { col: 0, row: 0 },
        assetId,
        tileType: 'FIRE',
        isPath: false,
        alpha: 1,
      },
    ],
    pathCells: [],
    mageCell: null,
    goalCell: null,
    hintedCells: [],
    selectedCell: null,
    queuedSwap: null,
    shakePixels: 0,
    visualCues: [],
  };
}

function hudState() {
  return {
    phase: 'IDLE' as const,
    levelText: 'Level 1',
    livesText: 'Lives 3',
    scoreText: '0',
    objectiveText: 'Moves 20',
    muted: false,
  };
}

class FakeRenderer implements GameRenderer {
  readonly calls: string[] = [];

  constructor(private readonly availableImages: ReadonlySet<string>) {}

  clear(): void {
    this.calls.push('clear');
  }

  pushTranslate(): void {
    this.calls.push('pushTranslate');
  }

  pushScale(): void {
    this.calls.push('pushScale');
  }

  pushRotate(): void {
    this.calls.push('pushRotate');
  }

  pushAlpha(): void {
    this.calls.push('pushAlpha');
  }

  pushClipRect(x: number, y: number, width: number, height: number): void {
    this.calls.push(`clip:${x},${y},${width},${height}`);
  }

  pop(): void {
    this.calls.push('pop');
  }

  drawRect(color: string, x: number, y: number, width: number, height: number): void {
    this.calls.push(`rect:${color}`);
    this.calls.push(`rect:${color}:${x},${y},${width},${height}`);
  }

  drawEllipse(color: string): void {
    this.calls.push(`ellipse:${color}`);
  }

  hasImage(image: DrawImageRef): boolean {
    return this.availableImages.has(image.id);
  }

  drawImage(image: DrawImageRef): void {
    this.calls.push(`image:${image.id}`);
  }

  drawText(text: string, _x: number, _y: number, _width: number, _height: number, _style: TextStyle): void {
    this.calls.push(`text:${text}`);
  }
}
