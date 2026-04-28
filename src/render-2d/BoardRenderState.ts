import type { CellCoord } from '../core/Layout';
import type { TileType } from '../board/TileTypes';

export interface BoardCellVisualState {
  coord: CellCoord;
  assetId: string;
  tileType: TileType;
  isPath: boolean;
  alpha: number;
}

export interface BoardRenderState {
  logicalWidth: number;
  logicalHeight: number;
  boardCells: readonly BoardCellVisualState[];
  pathCells: readonly CellCoord[];
  mageCell: CellCoord | null;
  goalCell: CellCoord | null;
  hintedCells: readonly CellCoord[];
  selectedCell: CellCoord | null;
  queuedSwap: { from: CellCoord; to: CellCoord } | null;
  shakePixels: number;
}
