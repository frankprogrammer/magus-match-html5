import { AssetIds } from '../assets/AssetIds';
import { BOARD_RECT, HERO_STAGE_HEIGHT, HUD_HEIGHT, LOGICAL_HEIGHT, LOGICAL_WIDTH } from '../core/Layout';
import type { CellCoord } from '../core/Layout';
import type { TileType } from '../board/TileTypes';
import type { HudRenderState } from './HudRenderState';
import type { BoardRenderState } from './BoardRenderState';
import type { GameRenderer } from './GameRenderer';
import type { ScreenRenderState } from './ScreenRenderState';

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
  const cuesByCoord = new Map<string, BoardRenderState['visualCues']>();
  for (const cue of boardState.visualCues) {
    const key = coordKey(cue.coord);
    cuesByCoord.set(key, [...(cuesByCoord.get(key) ?? []), cue]);
  }

  const visuals: BoardCellVisual[] = [];
  const hintPulse = (Math.sin(elapsedSec * Math.PI * 3) + 1) / 2;

  for (const state of boardState.boardCells) {
      const coord = state.coord;
      const isHinted = hinted.has(coordKey(coord));
      const cueValues = cuesByCoord.get(coordKey(coord)) ?? [];
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
      const renderX = state.renderX ?? x;
      const renderY = state.renderY ?? y;
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
        scale: state.scale ?? Math.max(isHinted ? 1 + hintPulse * 0.05 : 1, cueScale),
        flash: Math.max(isHinted ? 0.35 + hintPulse * 0.45 : 0, cueFlash * 0.5),
        zIndex: state.zIndex ?? 0,
      });
  }

  return visuals;
}

function drawCanvasBands(renderer: GameRenderer): void {
  renderer.drawRect('#241832', 0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);
  renderer.drawRect('#f5e9c9', 0, HERO_STAGE_HEIGHT, LOGICAL_WIDTH, HUD_HEIGHT);
  const hudBanner = { id: AssetIds.ui.hudBanner };
  if (renderer.hasImage(hudBanner)) {
    renderer.drawImage(hudBanner, 0, HERO_STAGE_HEIGHT, LOGICAL_WIDTH, HUD_HEIGHT);
  }
  renderer.drawRect('#1f1830', 0, HERO_STAGE_HEIGHT + HUD_HEIGHT, LOGICAL_WIDTH, LOGICAL_HEIGHT - HERO_STAGE_HEIGHT - HUD_HEIGHT);
}

function drawHud(renderer: GameRenderer, hudState: HudRenderState): void {
  const y = HERO_STAGE_HEIGHT;
  renderer.drawText(hudState.levelText, 32, y, 180, HUD_HEIGHT, {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#241832',
    align: 'left',
  });
  renderer.drawText(hudState.livesText, 230, y, 200, HUD_HEIGHT, {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#241832',
    align: 'left',
  });
  renderer.drawText(`Score ${hudState.scoreText}`, 452, y, 230, HUD_HEIGHT, {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#241832',
    align: 'left',
  });
  renderer.drawText(hudState.objectiveText, 700, y, 300, HUD_HEIGHT, {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#241832',
    align: 'right',
  });
  renderer.drawText(hudState.muted ? 'MUTE' : 'SOUND', 1010, y, 48, HUD_HEIGHT, {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4b2e83',
    align: 'right',
  });
}

function drawBoard(renderer: GameRenderer, boardState: BoardRenderState, elapsedSec: number): void {
  const shake = boardState.shakePixels;
  renderer.pushTranslate(shake, 0);
  renderer.drawRect('#302340', BOARD_RECT.x, BOARD_RECT.y, BOARD_RECT.width, BOARD_RECT.height);

  const visuals = buildBoardCellVisuals(boardState, elapsedSec).sort(
    (first, second) =>
      first.zIndex - second.zIndex ||
      first.coord.row - second.coord.row ||
      first.coord.col - second.coord.col,
  );

  renderer.pushClipRect(BOARD_RECT.x, BOARD_RECT.y, BOARD_RECT.width, BOARD_RECT.height);
  for (const visual of visuals) {
    drawCell(renderer, visual);
  }
  renderer.pop();

  drawBoardFrame(renderer);
  drawDamagePopups(renderer, boardState);
  renderer.pop();
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
  renderer.drawRect('#171225', visual.x, visual.y, visual.width, visual.height);

  const imageRef = { id: visual.assetId };
  if (renderer.hasImage(imageRef)) {
    renderer.drawImage(imageRef, x, y, scaledWidth, scaledHeight);
  } else {
    renderer.drawRect(visual.fillColor, x, y, scaledWidth, scaledHeight);
  }

  if (visual.isPath) {
    renderer.drawRect('rgba(245, 233, 201, 0.55)', visual.x + 12, visual.y + 12, visual.width - 24, visual.height - 24);
  }

  if (visual.flash > 0) {
    renderer.drawRect(`rgba(255, 255, 255, ${visual.flash.toFixed(3)})`, visual.x + 4, visual.y + 4, visual.width - 8, visual.height - 8);
  }

  if (!renderer.hasImage(imageRef)) {
    renderer.drawText(visual.glyph, visual.x, visual.y, visual.width, visual.height, {
      fontSize: 54,
      fontWeight: 'bold',
      color: visual.tileType === 'LIGHTNING' ? '#241832' : '#f5e9c9',
      align: 'center',
    });
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
