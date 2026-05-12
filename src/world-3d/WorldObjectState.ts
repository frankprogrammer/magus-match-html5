import type { TransformState } from './TransformState';

export type WorldObjectLifetime = 'persistent' | 'pooled' | 'oneShot';
export type WorldObjectReplication = 'sharedGameplay' | 'localCosmetic';

export interface WorldObjectNodeVisibility {
  visibleNodeNames?: readonly string[];
  hiddenNodeNames?: readonly string[];
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
  tintHex?: string;
  opacity?: number;
  animationId?: string;
  animationTimeSec?: number;
  animationPaused?: boolean;
  nodeVisibility?: WorldObjectNodeVisibility;
  tags?: readonly string[];
}
