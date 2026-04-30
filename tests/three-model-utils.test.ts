import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import {
  addBoneProxyRig,
  applyFallbackMaterialToUnmaterialedMeshes,
  applyMageTextureToMeshes,
  createMageLoopClip,
  ensureMageMeshesVisibleWithoutOverridingTextures,
  hasRenderableGeometry,
  inferFrameRateForInclusiveFrameRange,
  normalizeModelToActorBounds,
} from '../src/render-three/ThreeModelUtils';

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

  it('detects renderable geometry instead of bone-only armatures', () => {
    const boneOnly = new THREE.Group();
    boneOnly.add(new THREE.Bone());

    const meshObject = new THREE.Group();
    meshObject.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial()));

    expect(hasRenderableGeometry(boneOnly)).toBe(false);
    expect(hasRenderableGeometry(meshObject)).toBe(true);
  });

  it('adds visible proxy geometry to matching bones in a bone-only rig', () => {
    const root = new THREE.Group();
    const hips = new THREE.Bone();
    hips.name = 'hips';
    const chest = new THREE.Bone();
    chest.name = 'chest';
    chest.position.y = 0.25;
    const head = new THREE.Bone();
    head.name = 'head';
    head.position.y = 0.18;
    hips.add(chest);
    chest.add(head);
    root.add(hips);

    expect(hasRenderableGeometry(root)).toBe(false);
    expect(addBoneProxyRig(root)).toBe(true);
    expect(hasRenderableGeometry(root)).toBe(true);
    expect(root.getObjectByName('proxy-sphere-head')).toBeInstanceOf(THREE.Mesh);
  });

  it('keeps textured mage materials while making hidden meshes visible', () => {
    const texture = new THREE.Texture();
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshPhongMaterial({
        color: '#000000',
        transparent: true,
        opacity: 0,
        map: texture,
      }),
    );
    mesh.name = 'neck';
    mesh.visible = false;

    ensureMageMeshesVisibleWithoutOverridingTextures(mesh);

    const material = mesh.material as unknown as THREE.MeshPhongMaterial;
    expect(mesh.visible).toBe(true);
    expect(material.transparent).toBe(false);
    expect(material.opacity).toBe(1);
    expect(material.map).toBe(texture);
  });

  it('applies recovered mage texture to untextured or transparent materials', () => {
    const texture = new THREE.Texture();
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshPhongMaterial({
        color: '#000000',
        transparent: true,
        opacity: 0,
      }),
    );
    mesh.visible = false;

    applyMageTextureToMeshes(mesh, texture);

    const material = mesh.material as THREE.MeshPhongMaterial;
    expect(mesh.visible).toBe(true);
    expect(material.map).toBe(texture);
    expect(material.transparent).toBe(false);
    expect(material.opacity).toBe(1);
  });

  it('still gives unmaterialed mage meshes a visible fallback material', () => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1));
    mesh.material = null as unknown as THREE.Material;

    applyFallbackMaterialToUnmaterialedMeshes(mesh);
    ensureMageMeshesVisibleWithoutOverridingTextures(mesh);

    expect(mesh.material).toBeInstanceOf(THREE.MeshStandardMaterial);
    expect((mesh.material as THREE.MeshStandardMaterial).opacity).toBe(1);
  });

  it('selects the first nonzero mage clip and infers the natural 0-60 frame timing', () => {
    const staticClip = new THREE.AnimationClip('static', 0, [
      new THREE.VectorKeyframeTrack('hips.position', [0], [0, 0, 0]),
    ]);
    const castClip = new THREE.AnimationClip('Armature|Armature|Cast Spell', 2.5, [
      new THREE.VectorKeyframeTrack('hips.position', [0, 2.5], [0, 0, 0, 1, 0, 0]),
    ]);

    const loopClip = createMageLoopClip([staticClip, castClip], 0, 60);

    expect(inferFrameRateForInclusiveFrameRange(2.5, 0, 60)).toBeCloseTo(24);
    expect(loopClip?.name).toBe('mage-loop-frames-0-60');
    expect(loopClip?.duration).toBeCloseTo(2.5);
  });
});
