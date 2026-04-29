import type { CellCoord } from '../core/Layout';
import type { TileType } from '../board/TileTypes';
import type { BoardAnimationTrace } from '../board/BoardAnimationTrace';

export interface BoardCellVisualState {
  tileId: string;
  coord: CellCoord;
  assetId: string;
  tileType: TileType;
  isPath: boolean;
  alpha: number;
  renderX?: number;
  renderY?: number;
  scale?: number;
  zIndex?: number;
  isGhost?: boolean;
}

export type BoardVisualCueKind = 'matchFlash' | 'pathGlow' | 'powerPulse' | 'damagePopup';

export interface BoardVisualCueState {
  kind: BoardVisualCueKind;
  coord: CellCoord;
  value: number;
  text?: string;
}

export interface BoardEmptyCellVisualState {
  coord: CellCoord;
  assetId: string;
}

export interface BoardRenderState {
  logicalWidth: number;
  logicalHeight: number;
  boardCells: readonly BoardCellVisualState[];
  emptyCells?: readonly BoardEmptyCellVisualState[];
  pathCells: readonly CellCoord[];
  mageCell: CellCoord | null;
  goalCell: CellCoord | null;
  hintedCells: readonly CellCoord[];
  selectedCell: CellCoord | null;
  queuedSwap: { from: CellCoord; to: CellCoord } | null;
  shakePixels: number;
  visualCues: readonly BoardVisualCueState[];
  animationTrace?: BoardAnimationTrace | null;
}
