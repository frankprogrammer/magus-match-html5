import type { TransformState } from './TransformState';

export type WorldObjectLifetime = 'persistent' | 'pooled' | 'oneShot';
export type WorldObjectReplication = 'sharedGameplay' | 'localCosmetic';
export type WorldObjectDepthMode = 'normal' | 'alwaysOnTop';
export type WorldObjectBillboardMode = 'none' | 'cameraFacing';

export interface WorldObjectVisualVariant {
  visiblePartIds?: readonly string[];
  hiddenPartIds?: readonly string[];
}

export interface WorldObjectTextureCrop {
  repeatX: number;
  repeatY: number;
  offsetX: number;
  offsetY: number;
}

export interface WorldObjectState {
  objectId: string;
  templateId: string;
  /** Hero-stage backdrop texture asset id (e.g. `AssetIds.backdrops.castle`). */
  backdropTextureId?: string;
  transform: TransformState;
  visible: boolean;
  lifetime: WorldObjectLifetime;
  replication: WorldObjectReplication;
  renderLayer?: string;
  renderOrder?: number;
  depthMode?: WorldObjectDepthMode;
  billboardMode?: WorldObjectBillboardMode;
  tintHex?: string;
  opacity?: number;
  textureCrop?: WorldObjectTextureCrop;
  animationId?: string;
  animationTimeSec?: number;
  animationPaused?: boolean;
  visualVariantId?: string;
  visualVariant?: WorldObjectVisualVariant;
  tags?: readonly string[];
}
