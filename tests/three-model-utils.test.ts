import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { normalizeModelToActorBounds } from '../src/render-three/ThreeModelUtils';

describe('normalizeModelToActorBounds', () => {
  it('centers X/Z, aligns bottom to y=0, and scales to target height', () => {
    const geometry = new THREE.BoxGeometry(2, 4, 6);
    const material = new THREE.MeshBasicMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(8, 10, -5);

    const normalized = normalizeModelToActorBounds(mesh, 1.45);
    normalized.updateWorldMatrix(true, true);

    const box = new THREE.Box3().setFromObject(normalized);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    expect(size.y).toBeCloseTo(1.45, 5);
    expect(box.min.y).toBeCloseTo(0, 5);
    expect(center.x).toBeCloseTo(0, 5);
    expect(center.z).toBeCloseTo(0, 5);
  });
});
