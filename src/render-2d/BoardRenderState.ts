import type { CellCoord, UiRect } from '../core/Layout';
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
  rotationDegrees?: number;
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
  assetId: string;
  x: number;
  y: number;
  radius: number;
  width: number;
  height: number;
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

export interface BoardLightballStreamVisualState {
  streamId: string;
  assetId: string;
  startX: number;
  startY: number;
  length: number;
  thickness: number;
  angleDeg: number;
  color: string;
  alpha: number;
  textureOffsetX: number;
  tileWidth: number;
  tileHeight: number;
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

export interface BoardTutorialLockVisualState extends BoardMatchHintVisualState {
  allowedSwap: { from: CellCoord; to: CellCoord };
  dimmedCells: readonly CellCoord[];
}

export type TutorialPresentationMode = 'standard' | 'tutorialFullHero' | 'tutorialZoomOut';

export type FloatingTutorialTileRole =
  | 'topLeftLightning'
  | 'earth'
  | 'topRightLightning'
  | 'lowerLightning';

export interface FloatingTutorialTileVisualState {
  tileId: string;
  role: FloatingTutorialTileRole;
  tileType: TileType;
  assetId: string;
  sourceCoord: CellCoord;
  rect: UiRect;
  alpha: number;
  flash: number;
  scale: number;
  zIndex: number;
}

export interface FloatingTutorialFingerHintState {
  assetId: string;
  point: { x: number; y: number };
  width: number;
  height: number;
  rotationDegrees: number;
  alpha: number;
  zIndex: number;
}

export interface FloatingTutorialMatchVisualState {
  phase: 'idle' | 'resolving';
  tiles: readonly FloatingTutorialTileVisualState[];
  fingerHint?: FloatingTutorialFingerHintState | null;
  matchEnergyStreams?: readonly BoardMatchEnergyStreamVisualState[];
  allowedDrag: {
    fromRole: 'lowerLightning';
    toRole: 'earth';
  };
}

export interface TutorialHeadlineVisualState {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  minFontSize: number;
  fontWeight: 'normal' | 'bold';
  color: string;
  strokeColor?: string;
  strokeWidth?: number;
  align: 'left' | 'center' | 'right';
}

export interface TutorialPresentationState {
  mode: TutorialPresentationMode;
  heroHeight: number;
  sceneScale: number;
  backgroundSceneScale: number;
  foregroundSceneScale: number;
  sceneOffsetX?: number;
  sceneOffsetY?: number;
  hideHud: boolean;
  hideBoard: boolean;
  headline?: TutorialHeadlineVisualState | null;
  floatingMatch: FloatingTutorialMatchVisualState | null;
}

export interface HeroActivationOverlayVisualState {
  assetId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  alpha: number;
  zIndex: number;
}

export interface BoardRenderState {
  logicalWidth: number;
  logicalHeight: number;
  tutorialPresentation?: TutorialPresentationState;
  heroActivationOverlay?: HeroActivationOverlayVisualState | null;
  boardCells: readonly BoardCellVisualState[];
  boardCellsArePreSorted?: boolean;
  particles?: readonly BoardParticleVisualState[];
  matchEnergyStreams?: readonly BoardMatchEnergyStreamVisualState[];
  burstRings?: readonly BoardBurstRingVisualState[];
  lightballStreams?: readonly BoardLightballStreamVisualState[];
  tntExplosionSprites?: readonly BoardTntExplosionSpriteVisualState[];
  rocketCloudSprites?: readonly BoardRocketCloudSpriteVisualState[];
  emptyCells?: readonly BoardEmptyCellVisualState[];
  pathCells: readonly CellCoord[];
  mageCell: CellCoord | null;
  goalCell: CellCoord | null;
  hintedCells: readonly CellCoord[];
  matchHint?: BoardMatchHintVisualState | null;
  tutorialLock?: BoardTutorialLockVisualState | null;
  selectedCell: CellCoord | null;
  queuedSwap: { from: CellCoord; to: CellCoord } | null;
  shakePixels: number;
  visualCues: readonly BoardVisualCueState[];
  animationTrace?: BoardAnimationTrace | null;
}
