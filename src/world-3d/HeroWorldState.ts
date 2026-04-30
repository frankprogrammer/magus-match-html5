import type { LevelType } from '../core/Types';
import type { Vec3Data } from './TransformState';
import type { WorldObjectState } from './WorldObjectState';

export interface CameraState {
  mode: 'fixed' | 'follow' | 'orbit' | 'cinematic';
  position: Vec3Data;
  target?: Vec3Data;
  fovDeg: number;
}

export interface ProjectileState {
  projectileId: string;
  schoolId: 'fire' | 'ice' | 'lightning' | 'earth';
  effectKind: 'match' | 'bomb';
  from: Vec3Data;
  to: Vec3Data;
  activationDelaySec: number;
  remainingSec: number;
  durationSec: number;
}

export interface HeroWorldState {
  levelType: LevelType;
  camera: CameraState;
  objects: readonly WorldObjectState[];
  activeProjectiles: readonly ProjectileState[];
  backdropId: string;
  cinematicState: 'none' | 'intro' | 'victory' | 'fail' | 'interstitial';
}
