import { BOARD_RECT, BOARD_SIZE, HERO_STAGE_HEIGHT, HUD_HEIGHT, LOGICAL_HEIGHT, LOGICAL_WIDTH } from '../core/Layout';
import type { CellCoord } from '../core/Layout';
import type { TileType } from '../board/TileTypes';
import type { HudRenderState } from './HudRenderState';
import type { BoardRenderState } from './BoardRenderState';
import type { GameRenderer } from './GameRenderer';

export interface BoardCellVisual {
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
}

export function renderFrame(
  renderer: GameRenderer,
  boardState: BoardRenderState,
  hudState: HudRenderState,
  elapsedSec: number,
): void {
  renderer.clear();
  drawCanvasBands(renderer);
  drawHud(renderer, hudState);
  drawBoard(renderer, boardState, elapsedSec);
}

export function buildBoardCellVisuals(boardState: BoardRenderState, elapsedSec: number): BoardCellVisual[] {
  const hinted = new Set(boardState.hintedCells.map(coordKey));
  const cellByCoord = new Map(boardState.boardCells.map((cell) => [coordKey(cell.coord), cell]));
  const visuals: BoardCellVisual[] = [];
  const hintPulse = (Math.sin(elapsedSec * Math.PI * 3) + 1) / 2;

  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const coord = { col, row };
      const state = cellByCoord.get(coordKey(coord));
      if (state == null) {
        continue;
      }

      const isHinted = hinted.has(coordKey(coord));
      const x = BOARD_RECT.x + col * BOARD_RECT.cellSize;
      const y = BOARD_RECT.y + row * BOARD_RECT.cellSize;
      visuals.push({
        coord,
        x,
        y,
        width: BOARD_RECT.cellSize,
        height: BOARD_RECT.cellSize,
        centerX: x + BOARD_RECT.cellSize / 2,
        centerY: y + BOARD_RECT.cellSize / 2,
        assetId: state.assetId,
        tileType: state.tileType,
        fillColor: colorForTile(state.tileType),
        glyph: glyphForTile(state.tileType),
        isPath: state.isPath,
        isHinted,
        hasMage: coordsEqual(boardState.mageCell, coord),
        hasGoal: coordsEqual(boardState.goalCell, coord),
        alpha: state.alpha,
        scale: isHinted ? 1 + hintPulse * 0.05 : 1,
        flash: isHinted ? 0.35 + hintPulse * 0.45 : 0,
      });
    }
  }

  return visuals;
}

function drawCanvasBands(renderer: GameRenderer): void {
  renderer.drawRect('#241832', 0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);
  renderer.drawRect('#f5e9c9', 0, HERO_STAGE_HEIGHT, LOGICAL_WIDTH, HUD_HEIGHT);
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
  renderer.drawRect('#c8a24b', BOARD_RECT.x - 8, BOARD_RECT.y - 8, BOARD_RECT.width + 16, BOARD_RECT.height + 16);
  renderer.drawRect('#302340', BOARD_RECT.x, BOARD_RECT.y, BOARD_RECT.width, BOARD_RECT.height);

  for (const visual of buildBoardCellVisuals(boardState, elapsedSec)) {
    drawCell(renderer, visual);
  }

  renderer.pop();
}

function drawCell(renderer: GameRenderer, visual: BoardCellVisual): void {
  const inset = 8;
  const width = visual.width - inset * 2;
  const height = visual.height - inset * 2;
  const scaledWidth = width * visual.scale;
  const scaledHeight = height * visual.scale;
  const x = visual.centerX - scaledWidth / 2;
  const y = visual.centerY - scaledHeight / 2;

  renderer.drawRect('#171225', visual.x, visual.y, visual.width, visual.height);
  renderer.drawRect(visual.fillColor, x, y, scaledWidth, scaledHeight);

  if (visual.isPath) {
    renderer.drawRect('rgba(245, 233, 201, 0.55)', visual.x + 12, visual.y + 12, visual.width - 24, visual.height - 24);
  }

  if (visual.flash > 0) {
    renderer.drawRect(`rgba(255, 255, 255, ${visual.flash.toFixed(3)})`, visual.x + 4, visual.y + 4, visual.width - 8, visual.height - 8);
  }

  renderer.drawText(visual.glyph, visual.x, visual.y, visual.width, visual.height, {
    fontSize: 54,
    fontWeight: 'bold',
    color: visual.tileType === 'LIGHTNING' ? '#241832' : '#f5e9c9',
    align: 'center',
  });

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
