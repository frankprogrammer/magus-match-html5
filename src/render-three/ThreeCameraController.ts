import * as THREE from 'three';
import type { CameraState } from '../world-3d/HeroWorldState';

export class ThreeCameraController {
  apply(camera: THREE.PerspectiveCamera, state: CameraState, aspect: number): void {
    camera.aspect = aspect;
    camera.fov = state.fovDeg;
    camera.position.set(state.position.x, state.position.y, state.position.z);

    if (state.target != null) {
      camera.lookAt(state.target.x, state.target.y, state.target.z);
    }

    camera.updateProjectionMatrix();
  }
}
