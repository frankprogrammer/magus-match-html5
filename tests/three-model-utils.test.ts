import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import {
  addBoneProxyRig,
  applyFallbackMaterialToUnmaterialedMeshes,
  applyMageTextureToMeshes,
  createMageAnimationClips,
  bleedTransparentPixelRgb,
  createKoboldAnimationClips,
  createMageLoopClip,
  ensureMageMeshesVisibleWithoutOverridingTextures,
  getMageTextureDebugInfo,
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

  it('force-applies recovered mage texture over existing gray materials', () => {
    const texture = new THREE.Texture();
    const oldTexture = new THREE.Texture();
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshPhongMaterial({
        color: '#777777',
        map: oldTexture,
      }),
    );
    mesh.visible = false;

    applyMageTextureToMeshes(mesh, texture);

    const material = mesh.material as unknown as THREE.MeshBasicMaterial;
    expect(mesh.visible).toBe(true);
    expect(material).toBeInstanceOf(THREE.MeshBasicMaterial);
    expect(material.map).toBe(texture);
    expect(material.color.getHexString()).toBe('ffffff');
    expect(material.transparent).toBe(true);
    expect(material.opacity).toBe(1);
    expect(material.alphaTest).toBeCloseTo(0.01);
    expect(material.depthWrite).toBe(true);
    expect(material.side).toBe(THREE.DoubleSide);
  });

  it('bleeds opaque edge colors into transparent texture pixels while preserving alpha', () => {
    const pixels = new Uint8ClampedArray([
      255, 255, 255, 0,
      20, 40, 200, 255,
      255, 255, 255, 0,
    ]);

    const cleaned = bleedTransparentPixelRgb(pixels, 3, 1, { iterations: 1 });

    expect([...cleaned.slice(0, 4)]).toEqual([20, 40, 200, 0]);
    expect([...cleaned.slice(4, 8)]).toEqual([20, 40, 200, 255]);
    expect([...cleaned.slice(8, 12)]).toEqual([20, 40, 200, 0]);
  });

  it('does not alter opaque texture pixels during alpha bleed cleanup', () => {
    const pixels = new Uint8ClampedArray([
      255, 255, 255, 0,
      90, 100, 110, 255,
    ]);

    const cleaned = bleedTransparentPixelRgb(pixels, 2, 1, { iterations: 1 });

    expect([...cleaned.slice(4, 8)]).toEqual([90, 100, 110, 255]);
  });

  it('keeps meshes without UVs visible without applying the recovered mage texture', () => {
    const texture = new THREE.Texture();
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 1, 0, 0, 0, 1, 0], 3));
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#777777' }));

    applyMageTextureToMeshes(mesh, texture);

    const material = mesh.material as THREE.MeshBasicMaterial;
    expect(material.map).toBeNull();
    expect(material.transparent).toBe(false);
    expect(material.opacity).toBe(1);
    expect(getMageTextureDebugInfo(mesh)).toEqual([
      {
        meshName: '(unnamed mesh)',
        hasUv: false,
        materialCount: 1,
        textureStatus: 'skipped-no-uv',
        materialTypes: ['MeshBasicMaterial'],
      },
    ]);
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

  it('maps named FBX mage idle and cast clips to renderer animation ids', () => {
    const idleClip = new THREE.AnimationClip('Armature|Idle', 1.2, [
      new THREE.VectorKeyframeTrack('hips.position', [0, 1.2], [0, 0, 0, 0, 0.04, 0]),
    ]);
    const castClip = new THREE.AnimationClip('Armature|Cast', 0.75, [
      new THREE.VectorKeyframeTrack('hand_r.position', [0, 0.75], [0, 0, 0, 0.15, 0.08, 0]),
    ]);

    const clips = createMageAnimationClips([idleClip, castClip], 0, 60);

    expect(clips.map((clip) => clip.name)).toEqual(['idle', 'cast']);
    expect(clips[0]).not.toBe(idleClip);
    expect(clips[1]).not.toBe(castClip);
    expect(clips[0].duration).toBeCloseTo(1.2);
    expect(clips[1].duration).toBeCloseTo(0.75);
  });

  it('falls back to a generated idle loop when the FBX has no named idle clip', () => {
    const sourceClip = new THREE.AnimationClip('Armature|Armature|Cast Spell', 2.5, [
      new THREE.VectorKeyframeTrack('hips.position', [0, 2.5], [0, 0, 0, 1, 0, 0]),
    ]);

    const clips = createMageAnimationClips([sourceClip], 0, 60);

    expect(clips.map((clip) => clip.name)).toEqual(['idle']);
    expect(clips[0].duration).toBeCloseTo(2.5);
  });

  it('maps named FBX kobold walk and defeat clips to renderer animation ids', () => {
    const walkClip = new THREE.AnimationClip('K.Armature|K.Armature|Kobold Walk', 1, [
      new THREE.VectorKeyframeTrack('hips.position', [0, 1], [0, 0, 0, 0, 0, 0.1]),
    ]);
    const defeatClip = new THREE.AnimationClip('K.Armature|K.Armature|Kobold Defeat', 1, [
      new THREE.VectorKeyframeTrack('hips.position', [0, 1], [0, 0, 0, 0, -0.25, 0]),
    ]);
    const zeroDurationClip = new THREE.AnimationClip('K.Armature|K.Armature|Idle Stand', 0, [
      new THREE.VectorKeyframeTrack('hips.position', [0], [0, 0, 0]),
    ]);

    const clips = createKoboldAnimationClips([walkClip, zeroDurationClip, defeatClip]);

    expect(clips.map((clip) => clip.name)).toEqual(['walk', 'defeat']);
    expect(clips[0]).not.toBe(walkClip);
    expect(clips[1]).not.toBe(defeatClip);
    expect(clips[0].duration).toBeCloseTo(1);
    expect(clips[1].duration).toBeCloseTo(1);
  });
});
