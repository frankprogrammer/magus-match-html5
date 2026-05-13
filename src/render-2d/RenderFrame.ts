import { AssetIds } from '../assets/AssetIds';
import {
  BOARD_RECT,
  HERO_STAGE_HEIGHT,
  HUD_BGM_TOGGLE_RECT,
  HUD_BAND_TOP_Y,
  HUD_HEIGHT,
  HUD_HEART_COUNT,
  HUD_SCORE_LABEL_COLOR,
  HUD_SCORE_LABEL_FONT_SIZE,
  HUD_SCORE_LABEL_MIN_FONT_SIZE,
  HUD_SCORE_LABEL_ROW_HEIGHT,
  HUD_SCORE_LABEL_VALUE_GAP_PX,
  HUD_SCORE_VALUE_FONT_SIZE,
  HUD_SCORE_VALUE_MIN_FONT_SIZE,
  HUD_SCORE_VALUE_ROW_HEIGHT,
  HUD_HEART_DISPLAY_HEIGHT,
  HUD_HEART_DISPLAY_WIDTH,
  HUD_HEART_GAP,
  HUD_HEART_GROUP_LEFT,
  HUD_TRIAL_ENEMY_COUNT_COLON_WIDTH,
  HUD_TRIAL_ENEMY_COUNT_COLON_X,
  HUD_TRIAL_ENEMY_COUNT_FONT_SIZE,
  HUD_TRIAL_ENEMY_COUNT_ICON_HEIGHT,
  HUD_TRIAL_ENEMY_COUNT_ICON_WIDTH,
  HUD_TRIAL_ENEMY_COUNT_ICON_X,
  HUD_TRIAL_ENEMY_COUNT_ICON_Y,
  HUD_TRIAL_ENEMY_COUNT_MIN_FONT_SIZE,
  HUD_TRIAL_ENEMY_COUNT_VALUE_WIDTH,
  HUD_TRIAL_ENEMY_COUNT_VALUE_X,
  LEVEL_PANEL_HEIGHT,
  LEVEL_PANEL_TEXT_WIDTH,
  LEVEL_PANEL_TEXT_X,
  LEVEL_PANEL_TOP,
  LEVEL_PANEL_WIDTH,
  LEVEL_PANEL_X,
  LOGICAL_HEIGHT,
  LOGICAL_WIDTH,
  gameOverTitleBannerRect,
  hudObjectiveTextLayoutLegacy,
  type UiRect,
} from '../core/Layout';
import type { CellCoord } from '../core/Layout';
import type { TileType } from '../board/TileTypes';
import { MATCH_HINT_BOUNCE_DISTANCE_PX } from '../data/tuning';
import type { HudRenderState } from './HudRenderState';
import type { BoardRenderState } from './BoardRenderState';
import type { DrawImageRef, GameRenderer } from './GameRenderer';
import type { ScreenRenderState } from './ScreenRenderState';

const HUD_TEXT_COLOR = '#ffffff';

export interface BoardCellVisual {
  tileId: string;
  coord: CellCoord;
  x: number;
  y: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  assetId: string;
  tileType: TileType;
  fillColor: string;
  glyph: string;
  isPath: boolean;
  isHinted: boolean;
  isDimmed: boolean;
  hasMage: boolean;
  hasGoal: boolean;
  alpha: number;
  scale: number;
  flash: number;
  zIndex: number;
}

export interface HeartLossWobbleState {
  slotIndex: number;
  /** 0 at start of loss animation, 1 when the heart switches to empty. */
  progress01: number;
}

export function renderFrame(
  renderer: GameRenderer,
  boardState: BoardRenderState,
  hudState: HudRenderState,
  elapsedSec: number,
  screenState?: ScreenRenderState,
  heartLossWobble?: HeartLossWobbleState,
): void {
  renderer.clear();
  const presentation = boardState.tutorialPresentation;
  if (presentation?.hideHud !== true) {
    drawCanvasBands(renderer);
    drawLevelTitlePanel(renderer, hudState);
    drawHud(renderer, hudState, heartLossWobble);
  }
  if (presentation?.hideBoard !== true) {
    drawBoard(renderer, boardState, elapsedSec);
  }
  drawTutorialHeadline(renderer, boardState);
  drawFloatingTutorialMatch(renderer, boardState);
  drawHeroActivationOverlay(renderer, boardState);
  if (screenState != null) {
    drawScreenOverlay(renderer, screenState);
  }
  if (presentation?.hideHud !== true) {
    drawHudBgmToggle(renderer, hudState);
  }
}

function drawTutorialHeadline(renderer: GameRenderer, boardState: BoardRenderState): void {
  const headline = boardState.tutorialPresentation?.headline ?? null;
  if (headline == null || headline.text.length === 0 || headline.width <= 0 || headline.height <= 0) {
    return;
  }

  renderer.drawText(headline.text, headline.x, headline.y, headline.width, headline.height, {
    fontSize: headline.fontSize,
    minFontSize: headline.minFontSize,
    fontWeight: headline.fontWeight,
    color: headline.color,
    strokeColor: headline.strokeColor,
    strokeWidth: headline.strokeWidth,
    align: headline.align,
  });
}

export function buildBoardCellVisuals(boardState: BoardRenderState, elapsedSec: number): BoardCellVisual[] {
  const hinted = new Set(boardState.hintedCells.map(coordKey));
  const activeMatchHint = boardState.tutorialLock ?? boardState.matchHint ?? null;
  const matchHinted = new Set(activeMatchHint?.flashCells.map(coordKey) ?? []);
  const tutorialDimmed = new Set(boardState.tutorialLock?.dimmedCells.map(coordKey) ?? []);
  const movingHintKey = activeMatchHint == null ? null : coordKey(activeMatchHint.movingCell);
  const cuesByCoord = new Map<string, BoardRenderState['visualCues']>();
  for (const cue of boardState.visualCues) {
    const key = coordKey(cue.coord);
    cuesByCoord.set(key, [...(cuesByCoord.get(key) ?? []), cue]);
  }

  const visuals: BoardCellVisual[] = [];
  const hintPulse = (Math.sin(elapsedSec * Math.PI * 3) + 1) / 2;
  const matchHintPulse =
    activeMatchHint == null
      ? 0
      : (Math.sin(activeMatchHint.progress * Math.PI * 2 * 5) + 1) / 2;
  const matchHintFlash =
    activeMatchHint == null ? 0 : 0.18 + matchHintPulse * 0.32;
  const matchHintBounce =
    activeMatchHint == null
      ? { x: 0, y: 0 }
      : hintBounceOffset(activeMatchHint.direction, activeMatchHint.progress);

  for (const state of boardState.boardCells) {
      const coord = state.coord;
      const key = coordKey(coord);
      const isHinted = hinted.has(key) || matchHinted.has(key);
      const isJourneyHinted = hinted.has(key);
      const isMatchHinted = matchHinted.has(key);
      const cueValues = cuesByCoord.get(key) ?? [];
      const cueFlash = cueValues.reduce((highest, cue) => {
        if (cue.kind === 'damagePopup') {
          return highest;
        }

        return Math.max(highest, cue.value);
      }, 0);
      const cueScale = cueValues.some((cue) => cue.kind === 'powerPulse')
        ? 1 + cueValues.reduce((highest, cue) => Math.max(highest, cue.value), 0) * 0.1
        : 1;
      const x = BOARD_RECT.x + coord.col * BOARD_RECT.cellSize;
      const y = BOARD_RECT.y + coord.row * BOARD_RECT.cellSize;
      const shouldBounce = movingHintKey === key;
      const renderX = (state.renderX ?? x) + (shouldBounce ? matchHintBounce.x : 0);
      const renderY = (state.renderY ?? y) + (shouldBounce ? matchHintBounce.y : 0);
      visuals.push({
        tileId: state.tileId,
        coord,
        x: renderX,
        y: renderY,
        width: BOARD_RECT.cellSize,
        height: BOARD_RECT.cellSize,
        centerX: renderX + BOARD_RECT.cellSize / 2,
        centerY: renderY + BOARD_RECT.cellSize / 2,
        assetId: state.assetId,
        tileType: state.tileType,
        fillColor: colorForTile(state.tileType),
        glyph: glyphForTile(state.tileType),
        isPath: state.isPath,
        isHinted,
        isDimmed: tutorialDimmed.has(key),
        hasMage: coordsEqual(boardState.mageCell, coord),
        hasGoal: coordsEqual(boardState.goalCell, coord),
        alpha: state.alpha,
        scale: state.scale ?? Math.max(isJourneyHinted ? 1 + hintPulse * 0.05 : 1, cueScale),
        flash: Math.max(
          isJourneyHinted ? 0.35 + hintPulse * 0.45 : 0,
          isMatchHinted ? matchHintFlash : 0,
          cueFlash * 0.5,
        ),
        zIndex: (state.zIndex ?? 0) + (shouldBounce ? 0.5 : 0),
      });
  }

  return visuals;
}

function hintBounceOffset(direction: CellCoord, progress: number): { x: number; y: number } {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const bounce = Math.max(0, Math.sin(clampedProgress * Math.PI * 2 * 3)) * MATCH_HINT_BOUNCE_DISTANCE_PX;
  return {
    x: direction.col * bounce,
    y: direction.row * bounce,
  };
}

function drawCanvasBands(renderer: GameRenderer): void {
  const hudBanner = { id: AssetIds.ui.hudBanner };
  if (renderer.hasImage(hudBanner)) {
    renderer.drawImage(hudBanner, 0, HUD_BAND_TOP_Y, LOGICAL_WIDTH, HUD_HEIGHT);
  }
  renderer.drawRect('#1f1830', 0, HERO_STAGE_HEIGHT + HUD_HEIGHT, LOGICAL_WIDTH, LOGICAL_HEIGHT - HERO_STAGE_HEIGHT - HUD_HEIGHT);
}

function drawLevelTitlePanel(renderer: GameRenderer, hudState: HudRenderState): void {
  const panelImage = { id: AssetIds.ui.levelTitlePanel };
  if (renderer.hasImage(panelImage)) {
    renderer.drawImage(panelImage, LEVEL_PANEL_X, LEVEL_PANEL_TOP, LEVEL_PANEL_WIDTH, LEVEL_PANEL_HEIGHT);
  } else {
    renderer.drawRect(
      'rgba(36, 24, 50, 0.92)',
      LEVEL_PANEL_X,
      LEVEL_PANEL_TOP,
      LEVEL_PANEL_WIDTH,
      LEVEL_PANEL_HEIGHT,
    );
  }

  renderer.drawText(hudState.levelText, LEVEL_PANEL_TEXT_X, LEVEL_PANEL_TOP, LEVEL_PANEL_TEXT_WIDTH, LEVEL_PANEL_HEIGHT, {
    fontSize: 38,
    minFontSize: 22,
    fontWeight: 'bold',
    color: HUD_TEXT_COLOR,
    align: 'center',
  });
}

function drawHudHearts(
  renderer: GameRenderer,
  hudState: HudRenderState,
  heartLossWobble?: HeartLossWobbleState,
): void {
  const fillRef = { id: AssetIds.ui.heartFill };
  const emptyRef = { id: AssetIds.ui.heartEmpty };
  const y = HUD_BAND_TOP_Y + (HUD_HEIGHT - HUD_HEART_DISPLAY_HEIGHT) / 2;

  for (let slot = 0; slot < HUD_HEART_COUNT; slot++) {
    const x = HUD_HEART_GROUP_LEFT + slot * (HUD_HEART_DISPLAY_WIDTH + HUD_HEART_GAP);
    const centerX = x + HUD_HEART_DISPLAY_WIDTH / 2;
    const centerY = y + HUD_HEART_DISPLAY_HEIGHT / 2;

    const inWobble =
      heartLossWobble != null &&
      heartLossWobble.slotIndex === slot &&
      heartLossWobble.progress01 < 1;

    const useFilled = slot < hudState.lives || inWobble;
    const imageRef = useFilled ? fillRef : emptyRef;

    if (!renderer.hasImage(imageRef)) {
      continue;
    }

    if (inWobble && heartLossWobble != null) {
      const t = heartLossWobble.progress01;
      const wobbleDeg = Math.sin(t * Math.PI * 2 * 5) * (1 - t) * (1 - t) * 16;
      renderer.pushRotate(wobbleDeg, centerX, centerY);
      renderer.drawImage(imageRef, x, y, HUD_HEART_DISPLAY_WIDTH, HUD_HEART_DISPLAY_HEIGHT);
      renderer.pop();
    } else {
      renderer.drawImage(imageRef, x, y, HUD_HEART_DISPLAY_WIDTH, HUD_HEART_DISPLAY_HEIGHT);
    }
  }
}

function drawTrialEnemyCount(
  renderer: GameRenderer,
  trialEnemyCount: { defeated: number; remaining: number },
): void {
  const iconRef = { id: AssetIds.ui.trialFillBarKoboldIcon };
  if (renderer.hasImage(iconRef)) {
    renderer.drawImage(
      iconRef,
      HUD_TRIAL_ENEMY_COUNT_ICON_X,
      HUD_TRIAL_ENEMY_COUNT_ICON_Y,
      HUD_TRIAL_ENEMY_COUNT_ICON_WIDTH,
      HUD_TRIAL_ENEMY_COUNT_ICON_HEIGHT,
    );
  }

  renderer.drawText(
    ':',
    HUD_TRIAL_ENEMY_COUNT_COLON_X,
    HUD_BAND_TOP_Y,
    HUD_TRIAL_ENEMY_COUNT_COLON_WIDTH,
    HUD_HEIGHT,
    {
      fontSize: HUD_TRIAL_ENEMY_COUNT_FONT_SIZE,
      minFontSize: HUD_TRIAL_ENEMY_COUNT_MIN_FONT_SIZE,
      fontWeight: 'bold',
      color: HUD_SCORE_LABEL_COLOR,
      align: 'center',
    },
  );
  renderer.drawText(
    `${Math.max(0, trialEnemyCount.defeated)}/${Math.max(0, trialEnemyCount.remaining)}`,
    HUD_TRIAL_ENEMY_COUNT_VALUE_X,
    HUD_BAND_TOP_Y,
    HUD_TRIAL_ENEMY_COUNT_VALUE_WIDTH,
    HUD_HEIGHT,
    {
      fontSize: HUD_TRIAL_ENEMY_COUNT_FONT_SIZE,
      minFontSize: HUD_TRIAL_ENEMY_COUNT_MIN_FONT_SIZE,
      fontWeight: 'normal',
      color: HUD_TEXT_COLOR,
      align: 'left',
    },
  );
}

function drawHudScoreColumn(renderer: GameRenderer, bandTopY: number, scoreText: string): void {
  const labelH = HUD_SCORE_LABEL_ROW_HEIGHT;
  const gap = HUD_SCORE_LABEL_VALUE_GAP_PX;
  const valueH = HUD_SCORE_VALUE_ROW_HEIGHT;
  const valueY = bandTopY + labelH + gap;

  renderer.drawText('Score', 0, bandTopY, LOGICAL_WIDTH, labelH, {
    fontSize: HUD_SCORE_LABEL_FONT_SIZE,
    minFontSize: HUD_SCORE_LABEL_MIN_FONT_SIZE,
    fontWeight: 'bold',
    color: HUD_SCORE_LABEL_COLOR,
    align: 'center',
  });
  renderer.drawText(scoreText, 0, valueY, LOGICAL_WIDTH, valueH, {
    fontSize: HUD_SCORE_VALUE_FONT_SIZE,
    minFontSize: HUD_SCORE_VALUE_MIN_FONT_SIZE,
    fontWeight: 'normal',
    color: HUD_TEXT_COLOR,
    align: 'center',
  });
}

function drawHud(
  renderer: GameRenderer,
  hudState: HudRenderState,
  heartLossWobble?: HeartLossWobbleState,
): void {
  const y = HUD_BAND_TOP_Y;
  drawHudHearts(renderer, hudState, heartLossWobble);

  if (hudState.trialEnemyCount != null) {
    drawHudScoreColumn(renderer, y, hudState.scoreText);
    drawTrialEnemyCount(renderer, hudState.trialEnemyCount);
    return;
  }

  drawHudScoreColumn(renderer, y, hudState.scoreText);

  if (hudState.objectiveText.length > 0) {
    const objective = hudObjectiveTextLayoutLegacy();
    renderer.drawText(hudState.objectiveText, objective.x, y, objective.width, HUD_HEIGHT, {
      fontSize: 28,
      minFontSize: 18,
      fontWeight: 'bold',
      color: HUD_TEXT_COLOR,
      align: 'right',
    });
  }
}

function drawHudBgmToggle(renderer: GameRenderer, hudState: HudRenderState): void {
  const rect = HUD_BGM_TOGGLE_RECT;
  const centerX = rect.x + rect.width / 2;
  const centerY = rect.y + rect.height / 2;
  const radius = rect.width / 2;

  if (hudState.bgmMuted) {
    renderer.drawEllipse('#5a5468', centerX, centerY, radius, radius);
    renderer.drawEllipse('#2c2638', centerX, centerY, radius - 7, radius - 7);
    renderer.drawText('♪', rect.x, rect.y, rect.width, rect.height, {
      fontSize: 36,
      fontWeight: 'bold',
      color: 'rgba(200, 192, 220, 0.42)',
      align: 'center',
    });
  } else {
    renderer.drawEllipse('#d4b96a', centerX, centerY, radius, radius);
    renderer.drawEllipse('#3d2658', centerX, centerY, radius - 8, radius - 8);
    renderer.drawText('♪', rect.x, rect.y, rect.width, rect.height, {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#f5e9c9',
      align: 'center',
    });
  }
}

function drawBoard(renderer: GameRenderer, boardState: BoardRenderState, elapsedSec: number): void {
  const shake = boardState.shakePixels;
  renderer.pushTranslate(shake, 0);
  drawBoardBackground(renderer);

  const visuals = buildBoardCellVisuals(boardState, elapsedSec);
  const sortedVisuals = boardState.boardCellsArePreSorted === true
    ? visuals
    : visuals.sort(
        (first, second) =>
          first.zIndex - second.zIndex ||
          first.coord.row - second.coord.row ||
          first.coord.col - second.coord.col,
      );

  renderer.pushClipRect(BOARD_RECT.x, BOARD_RECT.y, BOARD_RECT.width, BOARD_RECT.height);
  for (const emptyCell of boardState.emptyCells ?? []) {
    drawEmptyCell(renderer, emptyCell.coord, emptyCell.assetId);
  }
  for (const visual of sortedVisuals) {
    drawCell(renderer, visual);
  }
  drawLightballStreams(renderer, boardState);
  drawTntExplosionSprites(renderer, boardState);
  drawRocketCloudSprites(renderer, boardState);
  drawBurstRings(renderer, boardState);
  drawParticles(renderer, boardState);
  renderer.pop();

  drawMatchEnergyStreams(renderer, boardState);
  drawBoardFrame(renderer);
  drawDamagePopups(renderer, boardState);
  renderer.pop();
}

function drawBoardBackground(renderer: GameRenderer): void {
  const boardBackground = { id: AssetIds.ui.boardBackground };
  if (renderer.hasImage(boardBackground)) {
    renderer.drawImage(boardBackground, BOARD_RECT.x, BOARD_RECT.y, BOARD_RECT.width, BOARD_RECT.height);
    return;
  }

  renderer.drawRect('#302340', BOARD_RECT.x, BOARD_RECT.y, BOARD_RECT.width, BOARD_RECT.height);
}

function drawEmptyCell(renderer: GameRenderer, coord: CellCoord, assetId: string): void {
  const x = BOARD_RECT.x + coord.col * BOARD_RECT.cellSize;
  const y = BOARD_RECT.y + coord.row * BOARD_RECT.cellSize;

  const imageRef = { id: assetId };
  if (renderer.hasImage(imageRef)) {
    renderer.drawImage(imageRef, x, y, BOARD_RECT.cellSize, BOARD_RECT.cellSize);
  }
}

function drawBoardFrame(renderer: GameRenderer): void {
  const border = 8;
  renderer.drawRect('#c8a24b', BOARD_RECT.x - border, BOARD_RECT.y - border, BOARD_RECT.width + border * 2, border);
  renderer.drawRect('#c8a24b', BOARD_RECT.x - border, BOARD_RECT.y + BOARD_RECT.height, BOARD_RECT.width + border * 2, border);
  renderer.drawRect('#c8a24b', BOARD_RECT.x - border, BOARD_RECT.y, border, BOARD_RECT.height);
  renderer.drawRect('#c8a24b', BOARD_RECT.x + BOARD_RECT.width, BOARD_RECT.y, border, BOARD_RECT.height);
}

function drawCell(renderer: GameRenderer, visual: BoardCellVisual): void {
  const inset = 8;
  const width = visual.width - inset * 2;
  const height = visual.height - inset * 2;
  const scaledWidth = width * visual.scale;
  const scaledHeight = height * visual.scale;
  const x = visual.centerX - scaledWidth / 2;
  const y = visual.centerY - scaledHeight / 2;

  if (visual.alpha <= 0) {
    return;
  }

  const alphaPushed = visual.alpha < 1;
  if (alphaPushed) {
    renderer.pushAlpha(visual.alpha);
  }

  const imageRef = { id: visual.assetId };
  const hasImage = renderer.hasImage(imageRef);
  if (!hasImage) {
    if (alphaPushed) {
      renderer.pop();
    }
    return;
  }

  renderer.drawImage(imageRef, x, y, scaledWidth, scaledHeight);

  if (visual.isDimmed) {
    renderer.drawImageAlphaMaskFill(imageRef, '#000000', x, y, scaledWidth, scaledHeight, 0.62);
  }

  if (visual.isPath) {
    renderer.drawRect('rgba(245, 233, 201, 0.55)', visual.x + 12, visual.y + 12, visual.width - 24, visual.height - 24);
  }

  if (visual.flash > 0) {
    renderer.drawImageAlphaMaskFill(imageRef, '#ffffff', x, y, scaledWidth, scaledHeight, visual.flash);
  }

  if (visual.hasGoal) {
    renderer.drawText('G', visual.x + visual.width - 44, visual.y + 10, 34, 34, {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#241832',
      align: 'center',
    });
  }

  if (visual.hasMage) {
    renderer.drawEllipse('#4b2e83', visual.centerX, visual.centerY, 34, 34);
    renderer.drawEllipse('#c8a24b', visual.centerX, visual.centerY, 25, 25);
    renderer.drawText('M', visual.centerX - 24, visual.centerY - 24, 48, 48, {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#241832',
      align: 'center',
    });
  }
  if (alphaPushed) {
    renderer.pop();
  }
}

function drawFloatingTutorialMatch(renderer: GameRenderer, boardState: BoardRenderState): void {
  const floatingMatch = boardState.tutorialPresentation?.floatingMatch ?? null;
  if (floatingMatch == null) {
    return;
  }

  const tiles = [...floatingMatch.tiles].sort((first, second) => first.zIndex - second.zIndex);
  for (const tile of tiles) {
    if (tile.alpha <= 0 || tile.scale <= 0) {
      continue;
    }

    const imageRef = { id: tile.assetId };
    if (!renderer.hasImage(imageRef)) {
      continue;
    }

    const inset = 8;
    const drawWidth = (tile.rect.width - inset * 2) * tile.scale;
    const drawHeight = (tile.rect.height - inset * 2) * tile.scale;
    const centerX = tile.rect.x + tile.rect.width / 2;
    const centerY = tile.rect.y + tile.rect.height / 2;
    const drawX = centerX - drawWidth / 2;
    const drawY = centerY - drawHeight / 2;

    renderer.pushAlpha(tile.alpha);
    renderer.drawImage(imageRef, drawX, drawY, drawWidth, drawHeight);
    if (tile.flash > 0) {
      renderer.drawImageAlphaMaskFill(imageRef, '#ffffff', drawX, drawY, drawWidth, drawHeight, tile.flash);
    }
    renderer.pop();
  }

  const fingerHint = floatingMatch.fingerHint;
  if (fingerHint != null && fingerHint.alpha > 0 && fingerHint.width > 0 && fingerHint.height > 0) {
    const imageRef = { id: fingerHint.assetId };
    if (renderer.hasImage(imageRef)) {
      renderer.pushAlpha(fingerHint.alpha);
      renderer.pushRotate(fingerHint.rotationDegrees, fingerHint.point.x, fingerHint.point.y);
      renderer.drawImage(
        imageRef,
        fingerHint.point.x - fingerHint.width / 2,
        fingerHint.point.y,
        fingerHint.width,
        fingerHint.height,
      );
      renderer.pop();
      renderer.pop();
    }
  }

  drawMatchEnergyStreamList(renderer, floatingMatch.matchEnergyStreams ?? []);
}

function drawHeroActivationOverlay(renderer: GameRenderer, boardState: BoardRenderState): void {
  const overlay = boardState.heroActivationOverlay;
  if (overlay == null || overlay.alpha <= 0 || overlay.width <= 0 || overlay.height <= 0) {
    return;
  }

  const imageRef = { id: overlay.assetId };
  if (!renderer.hasImage(imageRef)) {
    return;
  }

  renderer.pushAlpha(overlay.alpha);
  renderer.drawImage(imageRef, overlay.x, overlay.y, overlay.width, overlay.height);
  renderer.pop();
}

function drawParticles(renderer: GameRenderer, boardState: BoardRenderState): void {
  const particles = boardState.particles ?? [];
  for (const particle of particles) {
    if (particle.alpha <= 0 || particle.radius <= 0) {
      continue;
    }

    renderer.pushAlpha(particle.alpha);
    renderer.drawEllipse(particle.color, particle.x, particle.y, particle.radius, particle.radius);
    renderer.pop();
  }
}

function drawMatchEnergyStreams(renderer: GameRenderer, boardState: BoardRenderState): void {
  drawMatchEnergyStreamList(renderer, boardState.matchEnergyStreams ?? []);
}

function drawMatchEnergyStreamList(
  renderer: GameRenderer,
  streams: readonly NonNullable<BoardRenderState['matchEnergyStreams']>[number][],
): void {
  for (const stream of streams) {
    if (stream.alpha <= 0 || stream.width <= 0 || stream.height <= 0) {
      continue;
    }

    const imageRef = { id: stream.assetId };
    if (!renderer.hasImage(imageRef)) {
      continue;
    }

    if (stream.alpha < 1) {
      renderer.pushAlpha(stream.alpha);
    }
    renderer.drawTintedImage(
      imageRef,
      stream.color,
      stream.x - stream.width / 2,
      stream.y - stream.height / 2,
      stream.width,
      stream.height,
    );
    if (stream.alpha < 1) {
      renderer.pop();
    }
  }
}

function drawLightballStreams(renderer: GameRenderer, boardState: BoardRenderState): void {
  const streams = boardState.lightballStreams ?? [];
  for (const stream of streams) {
    if (stream.alpha <= 0 || stream.length <= 0 || stream.thickness <= 0 || stream.tileWidth <= 0 || stream.tileHeight <= 0) {
      continue;
    }

    const imageRef = { id: stream.assetId };
    if (!renderer.hasImage(imageRef)) {
      continue;
    }

    renderer.pushAlpha(stream.alpha);
    renderer.pushRotate(stream.angleDeg, stream.startX, stream.startY);
    renderer.pushClipRect(stream.startX, stream.startY - stream.thickness / 2, stream.length, stream.thickness);
    const normalizedOffset = ((stream.textureOffsetX % stream.tileWidth) + stream.tileWidth) % stream.tileWidth;
    for (
      let x = stream.startX - stream.tileWidth + normalizedOffset;
      x < stream.startX + stream.length;
      x += stream.tileWidth
    ) {
      renderer.drawTintedImage(
        imageRef,
        stream.color,
        x,
        stream.startY - stream.tileHeight / 2,
        stream.tileWidth,
        stream.tileHeight,
      );
    }
    renderer.pop();
    renderer.pop();
    renderer.pop();
  }
}

function drawTntExplosionSprites(renderer: GameRenderer, boardState: BoardRenderState): void {
  const sprites = [...(boardState.tntExplosionSprites ?? [])].sort((first, second) => first.zIndex - second.zIndex);
  for (const sprite of sprites) {
    if (sprite.alpha <= 0 || sprite.width <= 0 || sprite.height <= 0) {
      continue;
    }

    const imageRef = { id: sprite.assetId };
    if (!renderer.hasImage(imageRef)) {
      continue;
    }

    renderer.pushAlpha(sprite.alpha);
    renderer.drawImageFrame(
      imageRef,
      sprite.sourceX,
      sprite.sourceY,
      sprite.sourceWidth,
      sprite.sourceHeight,
      sprite.x,
      sprite.y,
      sprite.width,
      sprite.height,
    );
    renderer.pop();
  }
}

function drawRocketCloudSprites(renderer: GameRenderer, boardState: BoardRenderState): void {
  const sprites = [...(boardState.rocketCloudSprites ?? [])].sort((first, second) => first.zIndex - second.zIndex);
  for (const sprite of sprites) {
    if (sprite.alpha <= 0 || sprite.width <= 0 || sprite.height <= 0) {
      continue;
    }

    const imageRef = { id: sprite.assetId };
    if (!renderer.hasImage(imageRef)) {
      continue;
    }

    renderer.pushAlpha(sprite.alpha);
    renderer.pushRotate(sprite.angleDeg, sprite.originX, sprite.originY);
    renderer.drawImageFrame(
      imageRef,
      sprite.sourceX,
      sprite.sourceY,
      sprite.sourceWidth,
      sprite.sourceHeight,
      sprite.x,
      sprite.y,
      sprite.width,
      sprite.height,
    );
    renderer.pop();
    renderer.pop();
  }
}

function drawBurstRings(renderer: GameRenderer, boardState: BoardRenderState): void {
  const rings = [...(boardState.burstRings ?? [])].sort((first, second) => first.zIndex - second.zIndex);
  for (const ring of rings) {
    if (ring.alpha <= 0 || ring.radius <= 0 || ring.lineWidth <= 0) {
      continue;
    }

    renderer.pushAlpha(ring.alpha);
    renderer.drawRing(ring.color, ring.x, ring.y, ring.radius, ring.radius, ring.lineWidth);
    renderer.pop();
  }
}

function drawDamagePopups(renderer: GameRenderer, boardState: BoardRenderState): void {
  for (const cue of boardState.visualCues) {
    if (cue.kind !== 'damagePopup' || cue.text == null) {
      continue;
    }

    const x = BOARD_RECT.x + cue.coord.col * BOARD_RECT.cellSize;
    const y = BOARD_RECT.y + cue.coord.row * BOARD_RECT.cellSize - (1 - cue.value) * 42;
    renderer.drawText(cue.text, x, y, BOARD_RECT.cellSize, 42, {
      fontSize: 30,
      fontWeight: 'bold',
      color: `rgba(245, 233, 201, ${Math.max(0, cue.value).toFixed(3)})`,
      align: 'center',
    });
  }
}

function drawScreenOverlay(renderer: GameRenderer, screenState: ScreenRenderState): void {
  if (screenState.screen === 'gameOver') {
    drawGameOverScreen(renderer, screenState);
    return;
  }

  if (screenState.transitionText != null) {
    drawTransitionOverlay(renderer, screenState.transitionText);
  }
}

const SCREEN_SAFE_PADDING_X = 56;

function centeredScreenRect(maxWidth: number, y: number, height: number): UiRect {
  const width = Math.min(maxWidth, LOGICAL_WIDTH - 2 * SCREEN_SAFE_PADDING_X);
  return {
    x: (LOGICAL_WIDTH - width) / 2,
    y,
    width,
    height,
  };
}

function drawGameOverScreen(renderer: GameRenderer, screenState: ScreenRenderState): void {
  renderer.drawRect('rgba(20, 14, 32, 0.86)', 0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);
  const titleBanner = gameOverTitleBannerRect();
  const titlePanelImage = { id: AssetIds.ui.levelTitlePanel };
  if (renderer.hasImage(titlePanelImage)) {
    renderer.drawImage(titlePanelImage, titleBanner.x, titleBanner.y, titleBanner.width, titleBanner.height);
  } else {
    renderer.drawRect(
      'rgba(36, 24, 50, 0.92)',
      titleBanner.x,
      titleBanner.y,
      titleBanner.width,
      titleBanner.height,
    );
  }

  renderer.drawText('GAME OVER', titleBanner.x, titleBanner.y, titleBanner.width, titleBanner.height, {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#f5e9c9',
    align: 'center',
  });
  const finalScoreRect = centeredScreenRect(800, 320, 70);
  renderer.drawText(`Final ${screenState.finalScore}`, finalScoreRect.x, finalScoreRect.y, finalScoreRect.width, finalScoreRect.height, {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#c8a24b',
    align: 'center',
  });
  const highScoreRect = centeredScreenRect(800, 390, 54);
  renderer.drawText(`High ${screenState.highScore}`, highScoreRect.x, highScoreRect.y, highScoreRect.width, highScoreRect.height, {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#f5e9c9',
    align: 'center',
  });
  drawLeaderboardPreview(renderer, screenState, 520, 10);
  drawButton(
    renderer,
    screenState.buttonRects.tryAgain,
    'TRY AGAIN',
    screenState.overlayPrimaryButtonPressed === true,
  );
}

function drawTransitionOverlay(renderer: GameRenderer, text: string): void {
  renderer.drawRect('rgba(20, 14, 32, 0.55)', 0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);
  const textRect = centeredScreenRect(840, 800, 120);
  renderer.drawText(text, textRect.x, textRect.y, textRect.width, textRect.height, {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#f5e9c9',
    align: 'center',
  });
}

function drawButton(
  renderer: GameRenderer,
  rect: UiRect,
  label: string,
  pressed: boolean,
): void {
  const background: DrawImageRef = {
    id: pressed ? AssetIds.ui.primaryButtonPressed : AssetIds.ui.primaryButton,
  };
  if (renderer.hasImage(background)) {
    renderer.drawImage(background, rect.x, rect.y, rect.width, rect.height);
  } else {
    renderer.drawRect('#c8a24b', rect.x, rect.y, rect.width, rect.height);
    renderer.drawRect('#4b2e83', rect.x + 8, rect.y + 8, rect.width - 16, rect.height - 16);
  }
  renderer.drawText(label, rect.x, rect.y, rect.width, rect.height, {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#f5e9c9',
    align: 'center',
  });
}

function drawLeaderboardPreview(
  renderer: GameRenderer,
  screenState: ScreenRenderState,
  y: number,
  maxRows: number,
): void {
  const rect = centeredScreenRect(840, y, 56);
  renderer.drawText('HALL OF HEROES', rect.x, rect.y, rect.width, rect.height, {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#f5e9c9',
    align: 'center',
  });

  const rows = screenState.leaderboardRows.slice(0, maxRows);
  if (rows.length === 0) {
    const emptyRect = centeredScreenRect(700, y + 74, 44);
    renderer.drawText('No champions yet', emptyRect.x, emptyRect.y, emptyRect.width, emptyRect.height, {
      fontSize: 26,
      fontWeight: 'normal',
      color: '#c8a24b',
      align: 'center',
    });
    return;
  }

  rows.forEach((entry, index) => {
    const rowY = y + 72 + index * 52;
    const isHighlighted = screenState.highlightedRank === index + 1;
    if (isHighlighted) {
      renderer.drawRect('rgba(200, 162, 75, 0.35)', rect.x, rowY - 3, rect.width, 46);
    }
    const scoreWidth = 220;
    const rowInset = 25;
    const scoreX = rect.x + rect.width - rowInset - scoreWidth;
    const nameX = rect.x + rowInset;
    const nameWidth = scoreX - nameX - 20;
    renderer.drawText(`${index + 1}. ${entry.name}`, nameX, rowY, nameWidth, 42, {
      fontSize: 26,
      fontWeight: isHighlighted ? 'bold' : 'normal',
      color: '#f5e9c9',
      align: 'left',
    });
    renderer.drawText(`${entry.score}`, scoreX, rowY, scoreWidth, 42, {
      fontSize: 26,
      fontWeight: isHighlighted ? 'bold' : 'normal',
      color: '#c8a24b',
      align: 'right',
    });
  });
}

function colorForTile(tileType: TileType): string {
  switch (tileType) {
    case 'FIRE':
      return '#eb5757';
    case 'ICE':
      return '#2d9cdb';
    case 'LIGHTNING':
      return '#f2c94c';
    case 'EARTH':
      return '#27ae60';
    case 'LAND':
      return '#8b6f47';
    case 'ROCKET_H':
    case 'ROCKET_V':
    case 'TNT':
    case 'LIGHTBALL':
      return '#c8a24b';
  }
}

function glyphForTile(tileType: TileType): string {
  switch (tileType) {
    case 'FIRE':
      return 'F';
    case 'ICE':
      return 'I';
    case 'LIGHTNING':
      return 'L';
    case 'EARTH':
      return 'E';
    case 'LAND':
      return 'P';
    case 'ROCKET_H':
      return 'H';
    case 'ROCKET_V':
      return 'V';
    case 'TNT':
      return 'B';
    case 'LIGHTBALL':
      return 'O';
  }
}

function coordKey(coord: CellCoord): string {
  return `${coord.col},${coord.row}`;
}

function coordsEqual(first: CellCoord | null, second: CellCoord): boolean {
  return first != null && first.col === second.col && first.row === second.row;
}
