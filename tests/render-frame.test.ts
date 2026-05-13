import { describe, expect, it } from 'vitest';
import { AssetIds } from '../src/assets/AssetIds';
import {
  BOARD_RECT,
  HUD_BAND_TOP_Y,
  HUD_HEIGHT,
  HUD_HEART_DISPLAY_HEIGHT,
  HUD_HEART_DISPLAY_WIDTH,
  HUD_HEART_GAP,
  HUD_HEART_GROUP_LEFT,
  HUD_SCORE_LABEL_COLOR,
  HUD_SCORE_LABEL_ROW_HEIGHT,
  HUD_SCORE_LABEL_VALUE_GAP_PX,
  LOGICAL_WIDTH,
  LOGICAL_HEIGHT,
  HUD_TRIAL_FILLBAR_FRAME_HEIGHT,
  HUD_TRIAL_FILLBAR_FRAME_WIDTH,
  HUD_TRIAL_FILLBAR_KOBOLD_HEIGHT_FRAC,
  HUD_TRIAL_FILLBAR_KOBOLD_NATURAL_SIZE,
  HUD_TRIAL_FILLBAR_LEFT_X,
  LEVEL_PANEL_HEIGHT,
  LEVEL_PANEL_TEXT_WIDTH,
  LEVEL_PANEL_TEXT_X,
  LEVEL_PANEL_TOP,
  LEVEL_PANEL_WIDTH,
  LEVEL_PANEL_X,
  TRIAL_FILLBAR_FILL_HEIGHT_FRAC,
  TRIAL_FILLBAR_FILL_OFFSET_X_PX,
  TRIAL_FILLBAR_FILL_OFFSET_Y_PX,
  TRIAL_FILLBAR_INNER_PAD_X_FRAC,
  TRIAL_FILLBAR_INNER_WIDTH_FRAC,
  HUD_SCORE_VALUE_ROW_HEIGHT,
  hudObjectiveTextLayoutLegacy,
} from '../src/core/Layout';
import { MATCH_HINT_BOUNCE_DISTANCE_PX } from '../src/data/tuning';
import type { DrawImageRef, GameRenderer, TextStyle } from '../src/render-2d/GameRenderer';
import type { BoardRenderState } from '../src/render-2d/BoardRenderState';
import type { HudRenderState } from '../src/render-2d/HudRenderState';
import { buildBoardCellVisuals, renderFrame } from '../src/render-2d/RenderFrame';

const HUD_HEART_ROW_Y =
  HUD_BAND_TOP_Y + (HUD_HEIGHT - HUD_HEART_DISPLAY_HEIGHT) / 2;
const HUD_SCORE_VALUE_ROW_Y =
  HUD_BAND_TOP_Y + HUD_SCORE_LABEL_ROW_HEIGHT + HUD_SCORE_LABEL_VALUE_GAP_PX;

function trialFillClipBounds(ratio: number): { clipX: number; clipY: number; clipW: number; clipH: number } {
  const frameX = HUD_TRIAL_FILLBAR_LEFT_X;
  const frameW = HUD_TRIAL_FILLBAR_FRAME_WIDTH;
  const frameH = HUD_TRIAL_FILLBAR_FRAME_HEIGHT;
  const frameY = HUD_BAND_TOP_Y + (HUD_HEIGHT - frameH) / 2;
  const innerX = frameX + frameW * TRIAL_FILLBAR_INNER_PAD_X_FRAC;
  const innerW = frameW * TRIAL_FILLBAR_INNER_WIDTH_FRAC;
  const fillH = frameH * TRIAL_FILLBAR_FILL_HEIGHT_FRAC;
  const fillY = frameY + (frameH - fillH) / 2;
  const clipW = innerW * ratio;
  const clipX = innerX + innerW - clipW + TRIAL_FILLBAR_FILL_OFFSET_X_PX;
  const clipY = fillY + TRIAL_FILLBAR_FILL_OFFSET_Y_PX;
  return { clipX, clipY, clipW, clipH: fillH };
}

describe('buildBoardCellVisuals', () => {
  it('builds stable cell bounds and overlay flags from render state', () => {
    const state: BoardRenderState = {
      logicalWidth: LOGICAL_WIDTH,
      logicalHeight: LOGICAL_HEIGHT,
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
      width: BOARD_RECT.cellSize,
      height: BOARD_RECT.cellSize,
      centerX: BOARD_RECT.x + BOARD_RECT.cellSize / 2,
      centerY: BOARD_RECT.y + BOARD_RECT.cellSize / 2,
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
      width: BOARD_RECT.cellSize,
      height: BOARD_RECT.cellSize,
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
      logicalWidth: LOGICAL_WIDTH,
      logicalHeight: LOGICAL_HEIGHT,
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

  it('flashes tutorial cells and darkens non-tutorial board tiles', () => {
    const state = oneTileState('tile.fire');
    state.boardCells = [
      {
        tileId: 'tile-0',
        coord: { col: 0, row: 0 },
        assetId: 'tile.lightning',
        tileType: 'LIGHTNING',
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
    state.tutorialLock = {
      allowedSwap: { from: { col: 0, row: 0 }, to: { col: 1, row: 0 } },
      flashCells: [{ col: 0, row: 0 }],
      movingCell: { col: 0, row: 0 },
      direction: { col: 1, row: 0 },
      progress: 1 / 12,
      dimmedCells: [{ col: 1, row: 0 }],
    };

    const visuals = buildBoardCellVisuals(state, 0);

    expect(visuals[0]).toMatchObject({ isHinted: true, isDimmed: false });
    expect(visuals[1]).toMatchObject({ isHinted: false, isDimmed: true });
    expect(visuals[0].flash).toBeGreaterThan(0);
    expect(visuals[0].x).toBeCloseTo(BOARD_RECT.x + MATCH_HINT_BOUNCE_DISTANCE_PX);
    expect(visuals[1].x).toBeCloseTo(BOARD_RECT.x + BOARD_RECT.cellSize);
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

  it('draws tutorial dimming through the tile image alpha mask', () => {
    const renderer = new FakeRenderer(new Set(['tile.fire']));
    const state = oneTileState('tile.fire');
    state.tutorialLock = {
      allowedSwap: { from: { col: 0, row: 0 }, to: { col: 1, row: 0 } },
      flashCells: [],
      movingCell: { col: 0, row: 0 },
      direction: { col: 1, row: 0 },
      progress: 0,
      dimmedCells: [{ col: 0, row: 0 }],
    };

    renderFrame(renderer, state, hudState(), 0);

    expect(renderer.calls).toContain('mask:tile.fire:#000000');
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

    expect(renderer.calls).not.toContain(`rect:#241832:0,0,${LOGICAL_WIDTH},${LOGICAL_HEIGHT}`);
    expect(renderer.calls).not.toContain(`rect:#1f1830:0,${HUD_BAND_TOP_Y},${LOGICAL_WIDTH},150`);
    expect(renderer.calls).toContain(`image:${AssetIds.ui.hudBanner}:0,${HUD_BAND_TOP_Y},${LOGICAL_WIDTH},150`);
    expect(renderer.calls).toContain(
      `rect:rgba(36, 24, 50, 0.92):${LEVEL_PANEL_X},${LEVEL_PANEL_TOP},${LEVEL_PANEL_WIDTH},${LEVEL_PANEL_HEIGHT}`,
    );
    expect(renderer.calls).toContain(
      `text:Level 1:${LEVEL_PANEL_TEXT_X},${LEVEL_PANEL_TOP},${LEVEL_PANEL_TEXT_WIDTH},${LEVEL_PANEL_HEIGHT}`,
    );
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

  it('draws only the floating tutorial tiles over the transparent canvas in full-hero mode', () => {
    const renderer = new FakeRenderer(new Set([AssetIds.tiles.earth, AssetIds.tiles.lightning, AssetIds.powerUps.orb]));
    const state = oneTileState(AssetIds.tiles.earth);
    state.tutorialPresentation = {
      mode: 'tutorialFullHero',
      heroHeight: LOGICAL_HEIGHT,
      sceneScale: 1.5,
      hideHud: true,
      hideBoard: true,
      floatingMatch: {
        phase: 'idle',
        tiles: [
          {
            tileId: 'floating-top-left',
            role: 'topLeftLightning',
            tileType: 'LIGHTNING',
            assetId: AssetIds.tiles.lightning,
            sourceCoord: { col: 2, row: 2 },
            rect: { x: 228, y: 1100, width: 128, height: 128 },
            alpha: 1,
            flash: 0,
            scale: 1,
            zIndex: 0,
          },
          {
            tileId: 'floating-earth',
            role: 'earth',
            tileType: 'EARTH',
            assetId: AssetIds.tiles.earth,
            sourceCoord: { col: 3, row: 2 },
            rect: { x: 368, y: 1100, width: 128, height: 128 },
            alpha: 1,
            flash: 0,
            scale: 1,
            zIndex: 1,
          },
          {
            tileId: 'floating-top-right',
            role: 'topRightLightning',
            tileType: 'LIGHTNING',
            assetId: AssetIds.tiles.lightning,
            sourceCoord: { col: 4, row: 2 },
            rect: { x: 508, y: 1100, width: 128, height: 128 },
            alpha: 1,
            flash: 0,
            scale: 1,
            zIndex: 2,
          },
          {
            tileId: 'floating-lower',
            role: 'lowerLightning',
            tileType: 'LIGHTNING',
            assetId: AssetIds.tiles.lightning,
            sourceCoord: { col: 3, row: 3 },
            rect: { x: 368, y: 1240, width: 128, height: 128 },
            alpha: 1,
            flash: 0.5,
            scale: 1,
            zIndex: 3,
          },
        ],
        matchEnergyStreams: [
          {
            streamId: 'floating-stream',
            assetId: AssetIds.powerUps.orb,
            x: 400,
            y: 980,
            radius: 12,
            width: 48,
            height: 48,
            color: '#fff000',
            alpha: 0.7,
            zIndex: 30,
          },
        ],
        allowedDrag: { fromRole: 'lowerLightning', toRole: 'earth' },
      },
    };

    renderFrame(renderer, state, hudState(), 0);

    expect(renderer.calls).not.toContain(`image:${AssetIds.ui.hudBanner}:0,${HUD_BAND_TOP_Y},${LOGICAL_WIDTH},150`);
    expect(renderer.calls).not.toContain('text:Level 1');
    expect(renderer.calls).not.toContain(
      `clip:${BOARD_RECT.x},${BOARD_RECT.y},${BOARD_RECT.width},${BOARD_RECT.height}`,
    );
    expect(renderer.calls.filter((call) => call === `image:${AssetIds.tiles.lightning}`)).toHaveLength(3);
    expect(renderer.calls.filter((call) => call === `image:${AssetIds.tiles.earth}`)).toHaveLength(1);
    expect(renderer.calls).toContain(`mask:${AssetIds.tiles.lightning}:#ffffff`);
    expect(renderer.calls).toContain(`tintedImage:${AssetIds.powerUps.orb}`);
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
    const renderer = new FakeRenderer(new Set([AssetIds.ui.heartFill, AssetIds.ui.heartEmpty]));

    const legacyObjective = hudObjectiveTextLayoutLegacy();
    renderFrame(
      renderer,
      oneTileState('tile.fire'),
      hudState({ scoreText: '999999999999', objectiveText: 'Moves 20', trialMonsterFill: null }),
      0,
    );

    expect(renderer.calls).toContain(
      `text:Level 1:${LEVEL_PANEL_TEXT_X},${LEVEL_PANEL_TOP},${LEVEL_PANEL_TEXT_WIDTH},${LEVEL_PANEL_HEIGHT}`,
    );
    for (let slot = 0; slot < 3; slot++) {
      const x = HUD_HEART_GROUP_LEFT + slot * (HUD_HEART_DISPLAY_WIDTH + HUD_HEART_GAP);
      expect(renderer.calls).toContain(
        `image:${AssetIds.ui.heartFill}:${x},${HUD_HEART_ROW_Y},${HUD_HEART_DISPLAY_WIDTH},${HUD_HEART_DISPLAY_HEIGHT}`,
      );
    }
    expect(renderer.calls).toContain(
      `text:Score:0,${HUD_BAND_TOP_Y},${LOGICAL_WIDTH},${HUD_SCORE_LABEL_ROW_HEIGHT}`,
    );
    expect(renderer.calls).toContain(
      `text:999999999999:0,${HUD_SCORE_VALUE_ROW_Y},${LOGICAL_WIDTH},${HUD_SCORE_VALUE_ROW_HEIGHT}`,
    );
    expect(renderer.calls).toContain(
      `text:Moves 20:${legacyObjective.x},${HUD_BAND_TOP_Y},${legacyObjective.width},150`,
    );
    expect(renderer.calls).not.toContain('text:MUTE');
    expect(renderer.calls).not.toContain('text:SOUND');

    const levelPanelStyles = renderer.textCalls.filter((call) => call.y === LEVEL_PANEL_TOP);
    const scoreColumnTexts = renderer.textCalls.filter(
      (call) => call.x === 0 && call.width === LOGICAL_WIDTH,
    );
    expect(levelPanelStyles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          text: 'Level 1',
          style: expect.objectContaining({ color: '#ffffff', minFontSize: 22, align: 'center' }),
        }),
      ]),
    );
    expect(scoreColumnTexts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          text: 'Score',
          style: expect.objectContaining({
            color: HUD_SCORE_LABEL_COLOR,
            minFontSize: 18,
            align: 'center',
            fontWeight: 'bold',
          }),
        }),
        expect.objectContaining({
          text: '999999999999',
          style: expect.objectContaining({
            color: '#ffffff',
            minFontSize: 20,
            align: 'center',
            fontWeight: 'normal',
          }),
        }),
      ]),
    );
    const hudObjectiveTexts = renderer.textCalls.filter((call) => call.y === HUD_BAND_TOP_Y && call.text === 'Moves 20');
    expect(hudObjectiveTexts.length).toBeGreaterThan(0);
  });

  it('rotates the losing heart during the wobble window', () => {
    const renderer = new FakeRenderer(new Set([AssetIds.ui.heartFill, AssetIds.ui.heartEmpty]));
    const slot2X = HUD_HEART_GROUP_LEFT + 2 * (HUD_HEART_DISPLAY_WIDTH + HUD_HEART_GAP);

    renderFrame(renderer, oneTileState('tile.fire'), hudState({ lives: 2 }), 0, undefined, {
      slotIndex: 2,
      progress01: 0.35,
    });

    expect(renderer.calls.some((c) => c.includes('pushRotate'))).toBe(true);
    expect(renderer.calls).toContain(
      `image:${AssetIds.ui.heartFill}:${slot2X},${HUD_HEART_ROW_Y},${HUD_HEART_DISPLAY_WIDTH},${HUD_HEART_DISPLAY_HEIGHT}`,
    );
  });

  it('shows an empty heart after the wobble completes', () => {
    const renderer = new FakeRenderer(new Set([AssetIds.ui.heartFill, AssetIds.ui.heartEmpty]));
    const slot2X = HUD_HEART_GROUP_LEFT + 2 * (HUD_HEART_DISPLAY_WIDTH + HUD_HEART_GAP);

    renderFrame(renderer, oneTileState('tile.fire'), hudState({ lives: 2 }), 0, undefined, {
      slotIndex: 2,
      progress01: 1,
    });

    expect(renderer.calls).toContain(
      `image:${AssetIds.ui.heartEmpty}:${slot2X},${HUD_HEART_ROW_Y},${HUD_HEART_DISPLAY_WIDTH},${HUD_HEART_DISPLAY_HEIGHT}`,
    );
    expect(renderer.calls.some((c) => c.includes('pushRotate'))).toBe(false);
  });

  it('draws the trial monster fill bar right-aligned with RTL clip', () => {
    const renderer = new FakeRenderer(
      new Set([
        AssetIds.ui.heartFill,
        AssetIds.ui.heartEmpty,
        AssetIds.ui.trialFillBarBg,
        AssetIds.ui.trialFillBarFill,
        AssetIds.ui.trialFillBarKoboldIcon,
      ]),
    );
    const bounds = trialFillClipBounds(0.5);
    const trialFrameY = HUD_BAND_TOP_Y + (HUD_HEIGHT - HUD_TRIAL_FILLBAR_FRAME_HEIGHT) / 2;
    const koboldIconH = HUD_TRIAL_FILLBAR_FRAME_HEIGHT * HUD_TRIAL_FILLBAR_KOBOLD_HEIGHT_FRAC;
    const koboldIconW =
      koboldIconH *
      (HUD_TRIAL_FILLBAR_KOBOLD_NATURAL_SIZE.width / HUD_TRIAL_FILLBAR_KOBOLD_NATURAL_SIZE.height);
    const koboldIconX = HUD_TRIAL_FILLBAR_LEFT_X + HUD_TRIAL_FILLBAR_FRAME_WIDTH - koboldIconW;
    const koboldIconY = trialFrameY + HUD_TRIAL_FILLBAR_FRAME_HEIGHT - koboldIconH;

    renderFrame(
      renderer,
      oneTileState('tile.fire'),
      hudState({
        objectiveText: '',
        trialMonsterFill: { remaining: 2, total: 4 },
      }),
      0,
    );

    expect(renderer.calls).toContain(
      `image:${AssetIds.ui.trialFillBarBg}:${HUD_TRIAL_FILLBAR_LEFT_X},${HUD_BAND_TOP_Y + (HUD_HEIGHT - HUD_TRIAL_FILLBAR_FRAME_HEIGHT) / 2},${HUD_TRIAL_FILLBAR_FRAME_WIDTH},${HUD_TRIAL_FILLBAR_FRAME_HEIGHT}`,
    );
    expect(renderer.calls).toContain(
      `clip:${bounds.clipX},${bounds.clipY},${bounds.clipW},${bounds.clipH}`,
    );
    expect(renderer.calls).toContain(
      `image:${AssetIds.ui.trialFillBarKoboldIcon}:${koboldIconX},${koboldIconY},${koboldIconW},${koboldIconH}`,
    );
    expect(renderer.calls).toContain(
      `text:Score:0,${HUD_BAND_TOP_Y},${LOGICAL_WIDTH},${HUD_SCORE_LABEL_ROW_HEIGHT}`,
    );
    expect(renderer.calls).toContain(
      `text:0:0,${HUD_SCORE_VALUE_ROW_Y},${LOGICAL_WIDTH},${HUD_SCORE_VALUE_ROW_HEIGHT}`,
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
      `image:tile.fire:${BOARD_RECT.x + 8},${BOARD_RECT.y - BOARD_RECT.cellSize + 8},${BOARD_RECT.cellSize - 16},${BOARD_RECT.cellSize - 16}`,
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
    const renderer = new FakeRenderer(new Set(['tile.fire', AssetIds.powerUps.orb, AssetIds.powerUps.lightballStream]));
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
    state.lightballStreams = [
      {
        streamId: 'lightball-stream-0',
        assetId: AssetIds.powerUps.lightballStream,
        startX: BOARD_RECT.x + 40,
        startY: BOARD_RECT.y + 40,
        length: 150,
        thickness: 64,
        angleDeg: 22,
        color: '#ff7000',
        alpha: 0.94,
        textureOffsetX: 20,
        tileWidth: 100,
        tileHeight: 64,
        zIndex: 19,
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
    const streamRotateIndex = renderer.calls.indexOf(`pushRotate:22,${BOARD_RECT.x + 40},${BOARD_RECT.y + 40}`);
    const streamClipIndex = renderer.calls.indexOf(
      `clip:${BOARD_RECT.x + 40},${BOARD_RECT.y + 8},150,64`,
    );
    const streamImageIndex = renderer.calls.indexOf(
      `tintedImage:${AssetIds.powerUps.lightballStream}:#ff7000:${BOARD_RECT.x - 40},${BOARD_RECT.y + 8},100,64`,
    );
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

    expect(streamRotateIndex).toBeGreaterThan(tileIndex);
    expect(streamClipIndex).toBeGreaterThan(streamRotateIndex);
    expect(streamImageIndex).toBeGreaterThan(streamClipIndex);
    expect(ringIndex).toBeGreaterThan(streamImageIndex);
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

  it('skips Lightball stream visuals when the lightning strip is missing', () => {
    const renderer = new FakeRenderer(new Set(['tile.fire']));
    const state = oneTileState('tile.fire');
    state.lightballStreams = [
      {
        streamId: 'lightball-stream-0',
        assetId: AssetIds.powerUps.lightballStream,
        startX: BOARD_RECT.x + 40,
        startY: BOARD_RECT.y + 40,
        length: 150,
        thickness: 64,
        angleDeg: 0,
        color: '#ff7000',
        alpha: 0.94,
        textureOffsetX: 20,
        tileWidth: 100,
        tileHeight: 64,
        zIndex: 19,
      },
    ];

    renderFrame(renderer, state, hudState(), 0);

    expect(renderer.calls.some((call) => call.startsWith(`tintedImage:${AssetIds.powerUps.lightballStream}`))).toBe(false);
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
    logicalWidth: LOGICAL_WIDTH,
    logicalHeight: LOGICAL_HEIGHT,
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
    lives: 3,
    scoreText: '0',
    objectiveText: 'Moves 20',
    trialMonsterFill: null,
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
