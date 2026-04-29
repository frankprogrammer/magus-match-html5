import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import {
  HERO_STAGE_ORTHO_VIEW_HEIGHT,
  orthographicBoundsForAspect,
  ThreeCameraController,
} from '../src/render-three/ThreeCameraController';
import type { CameraState } from '../src/world-3d/HeroWorldState';

describe('ThreeCameraController', () => {
  it('computes orthographic bounds from a fixed 5-world-unit view height', () => {
    const bounds = orthographicBoundsForAspect(1080 / 500);

    expect(HERO_STAGE_ORTHO_VIEW_HEIGHT).toBe(5);
    expect(bounds.top).toBe(2.5);
    expect(bounds.bottom).toBe(-2.5);
    expect(bounds.left).toBeCloseTo(-5.4);
    expect(bounds.right).toBeCloseTo(5.4);
  });

  it('applies plain camera state to an orthographic camera', () => {
    const camera = new THREE.OrthographicCamera();
    const state: CameraState = {
      mode: 'fixed',
      position: { x: 1, y: 2, z: 12 },
      target: { x: 0, y: 0, z: 0 },
      fovDeg: 35,
    };

    new ThreeCameraController().apply(camera, state, 2);

    expect(camera).toBeInstanceOf(THREE.OrthographicCamera);
    expect(camera.left).toBe(-5);
    expect(camera.right).toBe(5);
    expect(camera.top).toBe(2.5);
    expect(camera.bottom).toBe(-2.5);
    expect(camera.position.toArray()).toEqual([1, 2, 12]);
  });
});
