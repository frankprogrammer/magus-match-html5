import type { CellCoord } from '../core/Layout';

export interface BoardCellVisualState {
  coord: CellCoord;
  assetId: string;
  isPath: boolean;
  alpha: number;
}

export interface BoardRenderState {
  logicalWidth: number;
  logicalHeight: number;
  boardCells: readonly BoardCellVisualState[];
  selectedCell: CellCoord | null;
  queuedSwap: { from: CellCoord; to: CellCoord } | null;
  shakePixels: number;
}
