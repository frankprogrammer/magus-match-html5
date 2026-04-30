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

export interface BoardParticleVisualState {
  particleId: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
  zIndex: number;
}

export interface BoardBurstRingVisualState {
  ringId: string;
  x: number;
  y: number;
  radius: number;
  lineWidth: number;
  color: string;
  alpha: number;
  zIndex: number;
}

export interface BoardTntCloudPuffVisualState {
  puffId: string;
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  color: string;
  alpha: number;
  zIndex: number;
}

export interface BoardTntDebrisTrailVisualState {
  trailId: string;
  x: number;
  y: number;
  angleDeg: number;
  length: number;
  width: number;
  color: string;
  alpha: number;
  zIndex: number;
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

export interface BoardMatchHintVisualState {
  flashCells: readonly CellCoord[];
  movingCell: CellCoord;
  direction: CellCoord;
  progress: number;
}

export interface BoardRenderState {
  logicalWidth: number;
  logicalHeight: number;
  boardCells: readonly BoardCellVisualState[];
  particles?: readonly BoardParticleVisualState[];
  burstRings?: readonly BoardBurstRingVisualState[];
  tntCloudPuffs?: readonly BoardTntCloudPuffVisualState[];
  tntDebrisTrails?: readonly BoardTntDebrisTrailVisualState[];
  emptyCells?: readonly BoardEmptyCellVisualState[];
  pathCells: readonly CellCoord[];
  mageCell: CellCoord | null;
  goalCell: CellCoord | null;
  hintedCells: readonly CellCoord[];
  matchHint?: BoardMatchHintVisualState | null;
  selectedCell: CellCoord | null;
  queuedSwap: { from: CellCoord; to: CellCoord } | null;
  shakePixels: number;
  visualCues: readonly BoardVisualCueState[];
  animationTrace?: BoardAnimationTrace | null;
}
