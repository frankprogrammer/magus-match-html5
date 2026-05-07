import { AssetIds } from '../assets/AssetIds';
import { BOARD_RECT, HERO_STAGE_HEIGHT, HUD_HEIGHT, LOGICAL_HEIGHT, LOGICAL_WIDTH } from '../core/Layout';
import type { CellCoord } from '../core/Layout';
import type { TileType } from '../board/TileTypes';
import { MATCH_HINT_BOUNCE_DISTANCE_PX } from '../data/tuning';
import type { HudRenderState } from './HudRenderState';
import type { BoardRenderState } from './BoardRenderState';
import type { GameRenderer } from './GameRenderer';
import type { ScreenRenderState } from './ScreenRenderState';

const HUD_VISUAL_OVERLAP_PX = 10;
const HUD_VISUAL_Y = HERO_STAGE_HEIGHT - HUD_VISUAL_OVERLAP_PX;
const HUD_CONTENT_PADDING_X = 56;
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
  hasMage: boolean;
  hasGoal: boolean;
  alpha: number;
  scale: number;
  flash: number;
  zIndex: number;
}

export function renderFrame(
  renderer: GameRenderer,
  boardState: BoardRenderState,
  hudState: HudRenderState,
  elapsedSec: number,
  screenState?: ScreenRenderState,
): void {
  renderer.clear();
  drawCanvasBands(renderer);
  drawHud(renderer, hudState);
  drawBoard(renderer, boardState, elapsedSec);
  if (screenState != null) {
    drawScreenOverlay(renderer, screenState);
  }
}

export function buildBoardCellVisuals(boardState: BoardRenderState, elapsedSec: number): BoardCellVisual[] {
  const hinted = new Set(boardState.hintedCells.map(coordKey));
  const matchHinted = new Set(boardState.matchHint?.flashCells.map(coordKey) ?? []);
  const movingHintKey = boardState.matchHint == null ? null : coordKey(boardState.matchHint.movingCell);
  const cuesByCoord = new Map<string, BoardRenderState['visualCues']>();
  for (const cue of boardState.visualCues) {
    const key = coordKey(cue.coord);
    cuesByCoord.set(key, [...(cuesByCoord.get(key) ?? []), cue]);
  }

  const visuals: BoardCellVisual[] = [];
  const hintPulse = (Math.sin(elapsedSec * Math.PI * 3) + 1) / 2;
  const matchHintPulse =
    boardState.matchHint == null
      ? 0
      : (Math.sin(boardState.matchHint.progress * Math.PI * 2 * 5) + 1) / 2;
  const matchHintFlash =
    boardState.matchHint == null ? 0 : 0.18 + matchHintPulse * 0.32;
  const matchHintBounce =
    boardState.matchHint == null
      ? { x: 0, y: 0 }
      : hintBounceOffset(boardState.matchHint.direction, boardState.matchHint.progress);

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
    renderer.drawImage(hudBanner, 0, HUD_VISUAL_Y, LOGICAL_WIDTH, HUD_HEIGHT);
  }
  renderer.drawRect('#1f1830', 0, HERO_STAGE_HEIGHT + HUD_HEIGHT, LOGICAL_WIDTH, LOGICAL_HEIGHT - HERO_STAGE_HEIGHT - HUD_HEIGHT);
}

function drawHud(renderer: GameRenderer, hudState: HudRenderState): void {
  const y = HUD_VISUAL_Y;
  renderer.drawText(hudState.levelText, HUD_CONTENT_PADDING_X, y, 190, HUD_HEIGHT, {
    fontSize: 34,
    minFontSize: 22,
    fontWeight: 'bold',
    color: HUD_TEXT_COLOR,
    align: 'left',
  });
  renderer.drawText(hudState.livesText, 270, y, 190, HUD_HEIGHT, {
    fontSize: 34,
    minFontSize: 22,
    fontWeight: 'bold',
    color: HUD_TEXT_COLOR,
    align: 'left',
  });
  renderer.drawText(`Score ${hudState.scoreText}`, 480, y, 280, HUD_HEIGHT, {
    fontSize: 34,
    minFontSize: 20,
    fontWeight: 'bold',
    color: HUD_TEXT_COLOR,
    align: 'left',
  });
  renderer.drawText(hudState.objectiveText, 772, y, LOGICAL_WIDTH - HUD_CONTENT_PADDING_X - 772, HUD_HEIGHT, {
    fontSize: 28,
    minFontSize: 18,
    fontWeight: 'bold',
    color: HUD_TEXT_COLOR,
    align: 'right',
  });
}

function drawBoard(renderer: GameRenderer, boardState: BoardRenderState, elapsedSec: number): void {
  const shake = boardState.shakePixels;
  renderer.pushTranslate(shake, 0);
  drawBoardBackground(renderer);

  const visuals = buildBoardCellVisuals(boardState, elapsedSec).sort(
    (first, second) =>
      first.zIndex - second.zIndex ||
      first.coord.row - second.coord.row ||
      first.coord.col - second.coord.col,
  );

  renderer.pushClipRect(BOARD_RECT.x, BOARD_RECT.y, BOARD_RECT.width, BOARD_RECT.height);
  for (const emptyCell of boardState.emptyCells ?? []) {
    drawEmptyCell(renderer, emptyCell.coord, emptyCell.assetId);
  }
  for (const visual of visuals) {
    drawCell(renderer, visual);
  }
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

  renderer.pushAlpha(visual.alpha);

  const imageRef = { id: visual.assetId };
  const hasImage = renderer.hasImage(imageRef);
  if (!hasImage) {
    renderer.pop();
    return;
  }

  renderer.drawImage(imageRef, x, y, scaledWidth, scaledHeight);

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
  renderer.pop();
}

function drawParticles(renderer: GameRenderer, boardState: BoardRenderState): void {
  const particles = [...(boardState.particles ?? [])].sort((first, second) => first.zIndex - second.zIndex);
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
  const streams = [...(boardState.matchEnergyStreams ?? [])].sort((first, second) => first.zIndex - second.zIndex);
  for (const stream of streams) {
    if (stream.alpha <= 0 || stream.width <= 0 || stream.height <= 0) {
      continue;
    }

    const imageRef = { id: stream.assetId };
    if (!renderer.hasImage(imageRef)) {
      continue;
    }

    renderer.pushAlpha(stream.alpha);
    renderer.drawTintedImage(
      imageRef,
      stream.color,
      stream.x - stream.width / 2,
      stream.y - stream.height / 2,
      stream.width,
      stream.height,
    );
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
  if (screenState.screen === 'title') {
    drawTitleScreen(renderer, screenState);
    return;
  }

  if (screenState.screen === 'gameOver') {
    drawGameOverScreen(renderer, screenState);
    return;
  }

  if (screenState.transitionText != null) {
    drawTransitionOverlay(renderer, screenState.transitionText);
  }
}

function drawTitleScreen(renderer: GameRenderer, screenState: ScreenRenderState): void {
  renderer.drawRect('rgba(20, 14, 32, 0.78)', 0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);
  renderer.drawText('MAGUS MATCH', 100, 250, 880, 150, {
    fontSize: 86,
    fontWeight: 'bold',
    color: '#f5e9c9',
    align: 'center',
  });
  renderer.drawText('Save the prince one spell at a time', 160, 390, 760, 60, {
    fontSize: 34,
    fontWeight: 'normal',
    color: '#c8a24b',
    align: 'center',
  });
  drawButton(renderer, screenState.buttonRects.play, 'PLAY');
  drawLeaderboardPreview(renderer, screenState, 1260, 5);
}

function drawGameOverScreen(renderer: GameRenderer, screenState: ScreenRenderState): void {
  renderer.drawRect('rgba(20, 14, 32, 0.86)', 0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);
  renderer.drawText('GAME OVER', 120, 185, 840, 110, {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#f5e9c9',
    align: 'center',
  });
  renderer.drawText(`Final ${screenState.finalScore}`, 140, 320, 800, 70, {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#c8a24b',
    align: 'center',
  });
  renderer.drawText(`High ${screenState.highScore}`, 140, 390, 800, 54, {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#f5e9c9',
    align: 'center',
  });
  drawLeaderboardPreview(renderer, screenState, 520, 10);
  drawButton(renderer, screenState.buttonRects.tryAgain, 'TRY AGAIN');
}

function drawTransitionOverlay(renderer: GameRenderer, text: string): void {
  renderer.drawRect('rgba(20, 14, 32, 0.55)', 0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);
  renderer.drawText(text, 120, 800, 840, 120, {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#f5e9c9',
    align: 'center',
  });
}

function drawButton(
  renderer: GameRenderer,
  rect: { x: number; y: number; width: number; height: number },
  label: string,
): void {
  renderer.drawRect('#c8a24b', rect.x, rect.y, rect.width, rect.height);
  renderer.drawRect('#4b2e83', rect.x + 8, rect.y + 8, rect.width - 16, rect.height - 16);
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
  renderer.drawText('HALL OF HEROES', 150, y, 780, 56, {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#f5e9c9',
    align: 'center',
  });

  const rows = screenState.leaderboardRows.slice(0, maxRows);
  if (rows.length === 0) {
    renderer.drawText('No champions yet', 190, y + 74, 700, 44, {
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
      renderer.drawRect('rgba(200, 162, 75, 0.35)', 120, rowY - 3, 840, 46);
    }
    renderer.drawText(`${index + 1}. ${entry.name}`, 145, rowY, 520, 42, {
      fontSize: 26,
      fontWeight: isHighlighted ? 'bold' : 'normal',
      color: '#f5e9c9',
      align: 'left',
    });
    renderer.drawText(`${entry.score}`, 665, rowY, 260, 42, {
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
