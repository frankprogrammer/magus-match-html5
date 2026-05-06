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

export interface BoardMatchEnergyStreamVisualState {
  streamId: string;
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

export interface BoardTntExplosionSpriteVisualState {
  spriteId: string;
  assetId: string;
  sourceX: number;
  sourceY: number;
  sourceWidth: number;
  sourceHeight: number;
  x: number;
  y: number;
  width: number;
  height: number;
  frameIndex: number;
  alpha: number;
  zIndex: number;
}

export interface BoardRocketCloudSpriteVisualState {
  spriteId: string;
  assetId: string;
  sourceX: number;
  sourceY: number;
  sourceWidth: number;
  sourceHeight: number;
  x: number;
  y: number;
  width: number;
  height: number;
  originX: number;
  originY: number;
  angleDeg: number;
  frameIndex: number;
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
  matchEnergyStreams?: readonly BoardMatchEnergyStreamVisualState[];
  burstRings?: readonly BoardBurstRingVisualState[];
  tntExplosionSprites?: readonly BoardTntExplosionSpriteVisualState[];
  rocketCloudSprites?: readonly BoardRocketCloudSpriteVisualState[];
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
