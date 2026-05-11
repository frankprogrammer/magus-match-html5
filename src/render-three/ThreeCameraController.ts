import * as THREE from 'three';
import type { CameraState } from '../world-3d/HeroWorldState';

export const HERO_STAGE_ORTHO_VIEW_WIDTH = 10.8;

export interface OrthographicBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export function orthographicBoundsForAspect(aspect: number): OrthographicBounds {
  const safeAspect = Number.isFinite(aspect) && aspect > 0 ? aspect : 1;
  const halfWidth = HERO_STAGE_ORTHO_VIEW_WIDTH / 2;
  const halfHeight = halfWidth / safeAspect;
  return {
    left: -halfWidth,
    right: halfWidth,
    top: halfHeight,
    bottom: -halfHeight,
  };
}

export class ThreeCameraController {
  apply(
    camera: THREE.OrthographicCamera,
    state: CameraState,
    aspect: number,
  ): void {
    const bounds = orthographicBoundsForAspect(aspect);
    camera.left = bounds.left;
    camera.right = bounds.right;
    camera.top = bounds.top;
    camera.bottom = bounds.bottom;
    camera.position.set(state.position.x, state.position.y, state.position.z);

    if (state.target != null) {
      camera.lookAt(state.target.x, state.target.y, state.target.z);
    }

    camera.updateProjectionMatrix();
  }
}
