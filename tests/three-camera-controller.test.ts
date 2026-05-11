import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { HERO_STAGE_HEIGHT, LOGICAL_WIDTH } from '../src/core/Layout';
import {
  HERO_STAGE_ORTHO_VIEW_WIDTH,
  orthographicBoundsForAspect,
  ThreeCameraController,
} from '../src/render-three/ThreeCameraController';
import type { CameraState } from '../src/world-3d/HeroWorldState';

describe('ThreeCameraController', () => {
  it('computes orthographic bounds from a fixed 10.8-world-unit view width', () => {
    const bounds = orthographicBoundsForAspect(LOGICAL_WIDTH / HERO_STAGE_HEIGHT);

    expect(HERO_STAGE_ORTHO_VIEW_WIDTH).toBe(10.8);
    expect(bounds.left).toBeCloseTo(-5.4);
    expect(bounds.right).toBeCloseTo(5.4);
    expect(bounds.top).toBeCloseTo(4.375);
    expect(bounds.bottom).toBeCloseTo(-4.375);
  });

  it('keeps horizontal world width fixed for non-default aspects', () => {
    const bounds = orthographicBoundsForAspect(2);

    expect(bounds.left).toBeCloseTo(-5.4);
    expect(bounds.right).toBeCloseTo(5.4);
    expect(bounds.top).toBeCloseTo(2.7);
    expect(bounds.bottom).toBeCloseTo(-2.7);
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
    expect(camera.left).toBeCloseTo(-5.4);
    expect(camera.right).toBeCloseTo(5.4);
    expect(camera.top).toBeCloseTo(2.7);
    expect(camera.bottom).toBeCloseTo(-2.7);
    expect(camera.position.toArray()).toEqual([1, 2, 12]);
  });
});
