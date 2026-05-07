import type { TransformState } from './TransformState';

export type WorldObjectLifetime = 'persistent' | 'pooled' | 'oneShot';
export type WorldObjectReplication = 'sharedGameplay' | 'localCosmetic';

export interface WorldObjectState {
  objectId: string;
  templateId: string;
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
  tags?: readonly string[];
}
