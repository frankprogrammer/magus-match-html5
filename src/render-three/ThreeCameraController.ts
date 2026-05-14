import * as THREE from 'three';
import type { CameraState } from '../presentation/HeroWorldState';

export const HERO_STAGE_ORTHO_VIEW_WIDTH = 10.8;

export interface OrthographicBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export type OrthographicAnchor = 'center' | 'topLeft';

export interface OrthographicBoundsOptions {
  viewScale?: number;
  anchor?: OrthographicAnchor;
}

export function orthographicBoundsForAspect(
  aspect: number,
  options: OrthographicBoundsOptions = {},
): OrthographicBounds {
  const safeAspect = Number.isFinite(aspect) && aspect > 0 ? aspect : 1;
  const safeViewScale = Number.isFinite(options.viewScale) && options.viewScale != null && options.viewScale > 0
    ? options.viewScale
    : 1;
  const halfWidth = HERO_STAGE_ORTHO_VIEW_WIDTH / 2;
  const halfHeight = halfWidth / safeAspect;
  const viewWidth = (halfWidth * 2) / safeViewScale;
  const viewHeight = (halfHeight * 2) / safeViewScale;

  if (options.anchor === 'topLeft') {
    return {
      left: -halfWidth,
      right: -halfWidth + viewWidth,
      top: halfHeight,
      bottom: halfHeight - viewHeight,
    };
  }

  return {
    left: -viewWidth / 2,
    right: viewWidth / 2,
    top: viewHeight / 2,
    bottom: -viewHeight / 2,
  };
}

export class ThreeCameraController {
  apply(
    camera: THREE.OrthographicCamera,
    state: CameraState,
    aspect: number,
    options: OrthographicBoundsOptions = {},
  ): void {
    const bounds = orthographicBoundsForAspect(aspect, options);
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
