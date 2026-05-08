import { describe, expect, it } from 'vitest';
import { AssetIds } from '../src/assets/AssetIds';
import { BOARD_RECT } from '../src/core/Layout';
import { MATCH_HINT_BOUNCE_DISTANCE_PX } from '../src/data/tuning';
import type { DrawImageRef, GameRenderer, TextStyle } from '../src/render-2d/GameRenderer';
import type { BoardRenderState } from '../src/render-2d/BoardRenderState';
import type { HudRenderState } from '../src/render-2d/HudRenderState';
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

  it('flashes match hint cells synchronously and bounces only the completing tile', () => {
    const state = oneTileState('tile.fire');
    state.boardCells = [
      {
        tileId: 'tile-0',
        coord: { col: 0, row: 0 },
        assetId: 'tile.fire',
        tileType: 'FIRE',
        isPath: false,
        alpha: 1,
      },
      {
        tileId: 'tile-1',
        coord: { col: 1, row: 0 },
        assetId: 'tile.fire',
        tileType: 'FIRE',
        isPath: false,
        alpha: 1,
      },
    ];
    state.matchHint = {
      flashCells: [
        { col: 0, row: 0 },
        { col: 1, row: 0 },
      ],
      movingCell: { col: 0, row: 0 },
      direction: { col: 1, row: 0 },
      progress: 1 / 12,
    };

    const visuals = buildBoardCellVisuals(state, 0);

    expect(visuals[0].flash).toBeCloseTo(visuals[1].flash);
    expect(visuals[0].flash).toBeGreaterThan(0);
    expect(visuals[0].flash).toBeLessThanOrEqual(0.5);
    expect(visuals[0].x).toBeCloseTo(BOARD_RECT.x + MATCH_HINT_BOUNCE_DISTANCE_PX);
    expect(visuals[1].x).toBeCloseTo(BOARD_RECT.x + BOARD_RECT.cellSize);
    expect(visuals[0].zIndex).toBeGreaterThan(visuals[1].zIndex);
  });

  it('draws image assets when available', () => {
    const renderer = new FakeRenderer(new Set(['tile.fire']));

    renderFrame(renderer, oneTileState('tile.fire'), hudState(), 0);

    expect(renderer.calls).toContain('image:tile.fire');
    expect(renderer.calls).not.toContain('text:F');
    expect(renderer.calls).not.toContain(
      `rect:#171225:${BOARD_RECT.x},${BOARD_RECT.y},${BOARD_RECT.cellSize},${BOARD_RECT.cellSize}`,
    );
  });

  it('draws loaded tile flashes through the tile image alpha mask', () => {
    const renderer = new FakeRenderer(new Set(['tile.fire']));
    const state = oneTileState('tile.fire');
    state.matchHint = {
      flashCells: [{ col: 0, row: 0 }],
      movingCell: { col: 0, row: 0 },
      direction: { col: 1, row: 0 },
      progress: 0.1,
    };

    renderFrame(renderer, state, hudState(), 0);

    expect(renderer.calls).toContain('mask:tile.fire:#ffffff');
    expect(renderer.calls.some((call) => call.startsWith('rect:rgba(255, 255, 255'))).toBe(false);
  });

  it('draws no tile flash when tile images are unavailable', () => {
    const renderer = new FakeRenderer(new Set());
    const state = oneTileState('tile.fire');
    state.matchHint = {
      flashCells: [{ col: 0, row: 0 }],
      movingCell: { col: 0, row: 0 },
      direction: { col: 1, row: 0 },
      progress: 0.1,
    };

    renderFrame(renderer, state, hudState(), 0);

    expect(renderer.calls).not.toContain('mask:tile.fire:#ffffff');
    expect(renderer.calls.some((call) => call.startsWith('rect:rgba(255, 255, 255'))).toBe(false);
  });

  it('draws the HUD banner image across the middle UI band when available', () => {
    const renderer = new FakeRenderer(new Set([AssetIds.ui.hudBanner]));

    renderFrame(renderer, oneTileState('tile.fire'), hudState(), 0);

    expect(renderer.calls).not.toContain('rect:#241832:0,0,1080,1920');
    expect(renderer.calls).not.toContain('rect:#1f1830:0,490,1080,150');
    expect(renderer.calls).toContain(`image:${AssetIds.ui.hudBanner}:0,490,1080,150`);
    expect(renderer.calls).toContain('text:Level 1:56,490,190,150');
  });

  it('draws the board background image behind cells when available', () => {
    const renderer = new FakeRenderer(new Set([AssetIds.ui.boardBackground, 'tile.fire']));

    renderFrame(renderer, oneTileState('tile.fire'), hudState(), 0);

    const backgroundIndex = renderer.calls.indexOf(
      `image:${AssetIds.ui.boardBackground}:${BOARD_RECT.x},${BOARD_RECT.y},${BOARD_RECT.width},${BOARD_RECT.height}`,
    );
    const clipIndex = renderer.calls.indexOf(
      `clip:${BOARD_RECT.x},${BOARD_RECT.y},${BOARD_RECT.width},${BOARD_RECT.height}`,
    );
    const tileIndex = renderer.calls.indexOf('image:tile.fire');

    expect(backgroundIndex).toBeGreaterThan(-1);
    expect(backgroundIndex).toBeLessThan(clipIndex);
    expect(tileIndex).toBeGreaterThan(clipIndex);
    expect(renderer.calls).not.toContain(
      `rect:#302340:${BOARD_RECT.x},${BOARD_RECT.y},${BOARD_RECT.width},${BOARD_RECT.height}`,
    );
  });

  it('falls back to the flat board fill when the board background image is unavailable', () => {
    const renderer = new FakeRenderer(new Set(['tile.fire']));

    renderFrame(renderer, oneTileState('tile.fire'), hudState(), 0);

    expect(renderer.calls).toContain(
      `rect:#302340:${BOARD_RECT.x},${BOARD_RECT.y},${BOARD_RECT.width},${BOARD_RECT.height}`,
    );
    expect(renderer.calls).not.toContain(`image:${AssetIds.ui.boardBackground}`);
  });

  it('draws padded white HUD text with dynamic fitting and no mute label', () => {
    const renderer = new FakeRenderer(new Set());

    renderFrame(renderer, oneTileState('tile.fire'), hudState({ scoreText: '999999999999', objectiveText: 'Monsters 999/999' }), 0);

    expect(renderer.calls).toContain('text:Level 1:56,490,190,150');
    expect(renderer.calls).toContain('text:Lives 3:270,490,190,150');
    expect(renderer.calls).toContain('text:Score 999999999999:480,490,280,150');
    expect(renderer.calls).toContain('text:Monsters 999/999:772,490,252,150');
    expect(renderer.calls).not.toContain('text:MUTE');
    expect(renderer.calls).not.toContain('text:SOUND');

    const hudStyles = renderer.textCalls.filter((call) => call.y === 490);
    expect(hudStyles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ text: 'Level 1', style: expect.objectContaining({ color: '#ffffff', minFontSize: 22 }) }),
        expect.objectContaining({ text: 'Lives 3', style: expect.objectContaining({ color: '#ffffff', minFontSize: 22 }) }),
        expect.objectContaining({
          text: 'Score 999999999999',
          style: expect.objectContaining({ color: '#ffffff', minFontSize: 20 }),
        }),
        expect.objectContaining({
          text: 'Monsters 999/999',
          style: expect.objectContaining({ color: '#ffffff', minFontSize: 18, align: 'right' }),
        }),
      ]),
    );
  });

  it('draws empty cell art for void board cells behind the tile layer', () => {
    const renderer = new FakeRenderer(new Set([AssetIds.tiles.empty, 'tile.fire']));
    const state = oneTileState('tile.fire');
    state.emptyCells = [{ coord: { col: 2, row: 3 }, assetId: AssetIds.tiles.empty }];

    renderFrame(renderer, state, hudState(), 0);

    const emptyImageIndex = renderer.calls.indexOf(`image:${AssetIds.tiles.empty}`);
    const tileImageIndex = renderer.calls.indexOf('image:tile.fire');
    expect(emptyImageIndex).toBeGreaterThan(-1);
    expect(tileImageIndex).toBeGreaterThan(emptyImageIndex);
  });

  it('draws no tile placeholders when image assets are unavailable', () => {
    const renderer = new FakeRenderer(new Set());

    renderFrame(renderer, oneTileState('tile.fire'), hudState(), 0);

    expect(renderer.calls).not.toContain('image:tile.fire');
    expect(renderer.calls).not.toContain('rect:#eb5757');
    expect(renderer.calls).not.toContain('text:F');
  });

  it('draws no empty cell placeholder when empty art is unavailable', () => {
    const renderer = new FakeRenderer(new Set(['tile.fire']));
    const state = oneTileState('tile.fire');
    state.emptyCells = [{ coord: { col: 2, row: 3 }, assetId: AssetIds.tiles.empty }];

    renderFrame(renderer, state, hudState(), 0);

    expect(renderer.calls).not.toContain(`image:${AssetIds.tiles.empty}`);
    expect(renderer.calls).not.toContain(
      `rect:#171225:${BOARD_RECT.x + 2 * BOARD_RECT.cellSize},${BOARD_RECT.y + 3 * BOARD_RECT.cellSize},${BOARD_RECT.cellSize},${BOARD_RECT.cellSize}`,
    );
    expect(renderer.calls).not.toContain(
      `rect:#0f0b18:${BOARD_RECT.x + 2 * BOARD_RECT.cellSize + 8},${BOARD_RECT.y + 3 * BOARD_RECT.cellSize + 8},${BOARD_RECT.cellSize - 16},${BOARD_RECT.cellSize - 16}`,
    );
  });

  it('does not draw board-color backing rectangles for animated tile images', () => {
    const renderer = new FakeRenderer(new Set(['tile.fire']));
    const state = oneTileState('tile.fire');
    state.boardCells = [
      {
        ...state.boardCells[0],
        renderX: BOARD_RECT.x,
        renderY: BOARD_RECT.y - BOARD_RECT.cellSize,
      },
    ];

    renderFrame(renderer, state, hudState(), 0);

    expect(renderer.calls).toContain(
      `image:tile.fire:${BOARD_RECT.x + 8},${BOARD_RECT.y - BOARD_RECT.cellSize + 8},119,119`,
    );
    expect(renderer.calls).not.toContain(
      `rect:#171225:${BOARD_RECT.x},${BOARD_RECT.y - BOARD_RECT.cellSize},${BOARD_RECT.cellSize},${BOARD_RECT.cellSize}`,
    );
  });

  it('clips the tile layer to the board rect and draws the frame above it', () => {
    const renderer = new FakeRenderer(new Set(['tile.fire']));

    renderFrame(renderer, oneTileState('tile.fire'), hudState(), 0);

    const clipIndex = renderer.calls.indexOf(
      `clip:${BOARD_RECT.x},${BOARD_RECT.y},${BOARD_RECT.width},${BOARD_RECT.height}`,
    );
    const tileIndex = renderer.calls.indexOf('image:tile.fire');
    const clippedLayerPopIndex = renderer.calls.indexOf('pop', tileIndex);
    const frameIndex = renderer.calls.indexOf(
      `rect:#c8a24b:${BOARD_RECT.x - 8},${BOARD_RECT.y - 8},${BOARD_RECT.width + 16},8`,
    );

    expect(clipIndex).toBeGreaterThan(-1);
    expect(tileIndex).toBeGreaterThan(clipIndex);
    expect(clippedLayerPopIndex).toBeGreaterThan(tileIndex);
    expect(frameIndex).toBeGreaterThan(clippedLayerPopIndex);
  });

  it('draws particles inside the clipped board layer after tiles and before the frame', () => {
    const renderer = new FakeRenderer(new Set(['tile.fire', AssetIds.powerUps.orb]));
    const state = oneTileState('tile.fire');
    state.burstRings = [
      {
        ringId: 'ring-0',
        x: BOARD_RECT.x + 40,
        y: BOARD_RECT.y + 40,
        radius: 40,
        lineWidth: 6,
        color: 'rgba(255, 255, 255, 0.85)',
        alpha: 0.8,
        zIndex: 15,
      },
    ];
    state.particles = [
      {
        particleId: 'particle-0',
        x: BOARD_RECT.x + 40,
        y: BOARD_RECT.y + 40,
        radius: 8,
        color: '#eb5757',
        alpha: 0.75,
        zIndex: 20,
      },
    ];
    state.matchEnergyStreams = [
      {
        streamId: 'energy-0',
        assetId: AssetIds.powerUps.orb,
        x: BOARD_RECT.x + 80,
        y: BOARD_RECT.y + 80,
        radius: 10,
        width: 40,
        height: 40,
        color: '#00d8ff',
        alpha: 0.7,
        zIndex: 23,
      },
    ];
    renderFrame(renderer, state, hudState(), 0);

    const clipIndex = renderer.calls.indexOf(
      `clip:${BOARD_RECT.x},${BOARD_RECT.y},${BOARD_RECT.width},${BOARD_RECT.height}`,
    );
    const tileIndex = renderer.calls.indexOf('image:tile.fire');
    const ringIndex = renderer.calls.indexOf('ring:rgba(255, 255, 255, 0.85)');
    const particleIndex = renderer.calls.indexOf('ellipse:#eb5757');
    const streamIndex = renderer.calls.indexOf(
      `tintedImage:${AssetIds.powerUps.orb}:#00d8ff:${BOARD_RECT.x + 60},${BOARD_RECT.y + 60},40,40`,
    );
    const streamAlphaIndex = renderer.calls.indexOf('pushAlpha:0.7');
    const clippedLayerPopIndex = renderer.calls.indexOf('pop', particleIndex);
    const frameIndex = renderer.calls.indexOf(
      `rect:#c8a24b:${BOARD_RECT.x - 8},${BOARD_RECT.y - 8},${BOARD_RECT.width + 16},8`,
    );

    expect(ringIndex).toBeGreaterThan(tileIndex);
    expect(particleIndex).toBeGreaterThan(ringIndex);
    expect(particleIndex).toBeGreaterThan(tileIndex);
    expect(particleIndex).toBeGreaterThan(clipIndex);
    expect(clippedLayerPopIndex).toBeGreaterThan(particleIndex);
    expect(streamAlphaIndex).toBeGreaterThan(clippedLayerPopIndex);
    expect(renderer.calls).not.toContain('blend:lighter');
    expect(streamIndex).toBeGreaterThan(streamAlphaIndex);
    expect(renderer.calls[streamIndex + 1]).toBe('pop');
    expect(streamIndex).toBeGreaterThan(clippedLayerPopIndex);
    expect(frameIndex).toBeGreaterThan(streamIndex);
  });

  it('skips match energy stream sprites when the orb image is missing', () => {
    const renderer = new FakeRenderer(new Set(['tile.fire']));
    const state = oneTileState('tile.fire');
    state.matchEnergyStreams = [
      {
        streamId: 'energy-0',
        assetId: AssetIds.powerUps.orb,
        x: BOARD_RECT.x + 80,
        y: BOARD_RECT.y + 80,
        radius: 10,
        width: 20,
        height: 20,
        color: '#38d5ff',
        alpha: 0.7,
        zIndex: 23,
      },
    ];

    renderFrame(renderer, state, hudState(), 0);

    expect(renderer.calls.some((call) => call.startsWith(`tintedImage:${AssetIds.powerUps.orb}`))).toBe(false);
    expect(renderer.calls).not.toContain('ellipse:#38d5ff');
  });

  it('draws TNT explosion sprites inside the clipped board layer before match particles', () => {
    const renderer = new FakeRenderer(new Set(['tile.fire', AssetIds.spritesheets.tntExplosion]));
    const state = oneTileState('tile.fire');
    state.tntExplosionSprites = [
      {
        spriteId: 'tnt-sprite-0',
        assetId: AssetIds.spritesheets.tntExplosion,
        sourceX: 128,
        sourceY: 0,
        sourceWidth: 128,
        sourceHeight: 128,
        x: BOARD_RECT.x + 10,
        y: BOARD_RECT.y + 10,
        width: 405,
        height: 405,
        frameIndex: 1,
        alpha: 1,
        zIndex: 24,
      },
    ];
    state.particles = [
      {
        particleId: 'particle-0',
        x: BOARD_RECT.x + 40,
        y: BOARD_RECT.y + 40,
        radius: 8,
        color: '#eb5757',
        alpha: 0.75,
        zIndex: 20,
      },
    ];

    renderFrame(renderer, state, hudState(), 0);

    const clipIndex = renderer.calls.indexOf(
      `clip:${BOARD_RECT.x},${BOARD_RECT.y},${BOARD_RECT.width},${BOARD_RECT.height}`,
    );
    const tileIndex = renderer.calls.indexOf('image:tile.fire');
    const spriteIndex = renderer.calls.indexOf(
      `imageFrame:${AssetIds.spritesheets.tntExplosion}:128,0,128,128:${BOARD_RECT.x + 10},${BOARD_RECT.y + 10},405,405`,
    );
    const particleIndex = renderer.calls.indexOf('ellipse:#eb5757');
    const clippedLayerPopIndex = renderer.calls.indexOf('pop', particleIndex);
    const frameIndex = renderer.calls.indexOf(
      `rect:#c8a24b:${BOARD_RECT.x - 8},${BOARD_RECT.y - 8},${BOARD_RECT.width + 16},8`,
    );

    expect(spriteIndex).toBeGreaterThan(tileIndex);
    expect(particleIndex).toBeGreaterThan(spriteIndex);
    expect(spriteIndex).toBeGreaterThan(clipIndex);
    expect(clippedLayerPopIndex).toBeGreaterThan(particleIndex);
    expect(frameIndex).toBeGreaterThan(clippedLayerPopIndex);
  });

  it('draws rocket cloud sprites inside the clipped board layer after TNT effects', () => {
    const renderer = new FakeRenderer(new Set([
      'tile.fire',
      AssetIds.spritesheets.tntExplosion,
      AssetIds.spritesheets.rocketCloud,
    ]));
    const state = oneTileState('tile.fire');
    state.tntExplosionSprites = [
      {
        spriteId: 'tnt-sprite-0',
        assetId: AssetIds.spritesheets.tntExplosion,
        sourceX: 0,
        sourceY: 0,
        sourceWidth: 128,
        sourceHeight: 128,
        x: BOARD_RECT.x + 10,
        y: BOARD_RECT.y + 10,
        width: 405,
        height: 405,
        frameIndex: 0,
        alpha: 1,
        zIndex: 24,
      },
    ];
    state.rocketCloudSprites = [
      {
        spriteId: 'rocket-cloud-0',
        assetId: AssetIds.spritesheets.rocketCloud,
        sourceX: 128,
        sourceY: 0,
        sourceWidth: 128,
        sourceHeight: 128,
        x: BOARD_RECT.x + 20,
        y: BOARD_RECT.y + 30,
        width: 220,
        height: 220,
        originX: BOARD_RECT.x + 130,
        originY: BOARD_RECT.y + 250,
        angleDeg: 0,
        frameIndex: 1,
        alpha: 1,
        zIndex: 27,
      },
    ];
    state.particles = [
      {
        particleId: 'particle-0',
        x: BOARD_RECT.x + 40,
        y: BOARD_RECT.y + 40,
        radius: 8,
        color: '#eb5757',
        alpha: 0.75,
        zIndex: 20,
      },
    ];

    renderFrame(renderer, state, hudState(), 0);

    const clipIndex = renderer.calls.indexOf(
      `clip:${BOARD_RECT.x},${BOARD_RECT.y},${BOARD_RECT.width},${BOARD_RECT.height}`,
    );
    const tileIndex = renderer.calls.indexOf('image:tile.fire');
    const tntIndex = renderer.calls.indexOf(
      `imageFrame:${AssetIds.spritesheets.tntExplosion}:0,0,128,128:${BOARD_RECT.x + 10},${BOARD_RECT.y + 10},405,405`,
    );
    const rocketRotateIndex = renderer.calls.indexOf(`pushRotate:0,${BOARD_RECT.x + 130},${BOARD_RECT.y + 250}`);
    const rocketSpriteIndex = renderer.calls.indexOf(
      `imageFrame:${AssetIds.spritesheets.rocketCloud}:128,0,128,128:${BOARD_RECT.x + 20},${BOARD_RECT.y + 30},220,220`,
    );
    const particleIndex = renderer.calls.indexOf('ellipse:#eb5757');
    const clippedLayerPopIndex = renderer.calls.indexOf('pop', particleIndex);
    const frameIndex = renderer.calls.indexOf(
      `rect:#c8a24b:${BOARD_RECT.x - 8},${BOARD_RECT.y - 8},${BOARD_RECT.width + 16},8`,
    );

    expect(rocketRotateIndex).toBeGreaterThan(tntIndex);
    expect(rocketSpriteIndex).toBeGreaterThan(rocketRotateIndex);
    expect(particleIndex).toBeGreaterThan(rocketSpriteIndex);
    expect(rocketSpriteIndex).toBeGreaterThan(tileIndex);
    expect(rocketSpriteIndex).toBeGreaterThan(clipIndex);
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

function hudState(overrides: Partial<HudRenderState> = {}): HudRenderState {
  return {
    phase: 'IDLE' as const,
    levelText: 'Level 1',
    livesText: 'Lives 3',
    scoreText: '0',
    objectiveText: 'Moves 20',
    muted: false,
    bgmMuted: false,
    ...overrides,
  };
}

class FakeRenderer implements GameRenderer {
  readonly calls: string[] = [];
  readonly textCalls: Array<{ text: string; x: number; y: number; width: number; height: number; style: TextStyle }> = [];

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

  pushRotate(angleDeg: number, originX: number, originY: number): void {
    this.calls.push('pushRotate');
    this.calls.push(`pushRotate:${angleDeg},${originX},${originY}`);
  }

  pushAlpha(alpha: number): void {
    this.calls.push('pushAlpha');
    this.calls.push(`pushAlpha:${alpha}`);
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

  drawEllipse(
    color: string,
    _centerX: number,
    _centerY: number,
    _radiusX: number,
    _radiusY: number,
  ): void {
    this.calls.push(`ellipse:${color}`);
  }

  drawRing(color: string): void {
    this.calls.push(`ring:${color}`);
  }

  hasImage(image: DrawImageRef): boolean {
    return this.availableImages.has(image.id);
  }

  drawImage(image: DrawImageRef, x: number, y: number, width: number, height: number): void {
    this.calls.push(`image:${image.id}`);
    this.calls.push(`image:${image.id}:${x},${y},${width},${height}`);
  }

  drawTintedImage(
    image: DrawImageRef,
    color: string,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    this.calls.push(`tintedImage:${image.id}`);
    this.calls.push(`tintedImage:${image.id}:${color}:${x},${y},${width},${height}`);
  }

  drawImageFrame(
    image: DrawImageRef,
    sourceX: number,
    sourceY: number,
    sourceWidth: number,
    sourceHeight: number,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    this.calls.push(`imageFrame:${image.id}`);
    this.calls.push(`imageFrame:${image.id}:${sourceX},${sourceY},${sourceWidth},${sourceHeight}:${x},${y},${width},${height}`);
  }

  drawTintedImageFrame(
    image: DrawImageRef,
    color: string,
    sourceX: number,
    sourceY: number,
    sourceWidth: number,
    sourceHeight: number,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    this.calls.push(`tintedImageFrame:${image.id}`);
    this.calls.push(`tintedImageFrame:${image.id}:${color}:${sourceX},${sourceY},${sourceWidth},${sourceHeight}:${x},${y},${width},${height}`);
  }

  drawImageAlphaMaskFill(
    image: DrawImageRef,
    color: string,
    x: number,
    y: number,
    width: number,
    height: number,
    alpha: number,
  ): void {
    this.calls.push(`mask:${image.id}:${color}`);
    this.calls.push(`mask:${image.id}:${color}:${x},${y},${width},${height},${alpha}`);
  }

  drawText(text: string, x: number, y: number, width: number, height: number, style: TextStyle): void {
    this.calls.push(`text:${text}`);
    this.calls.push(`text:${text}:${x},${y},${width},${height}`);
    this.textCalls.push({ text, x, y, width, height, style });
  }
}
