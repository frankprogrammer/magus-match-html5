import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import {
  applyKoboldModelFacingCorrection,
  applyMageModelFacingCorrection,
  backdropCoverSizeForImageAspect,
  HERO_BACKDROP_VIEW_HEIGHT,
  HERO_BACKDROP_VIEW_WIDTH,
  KOBOLD_MODEL_Y_ROTATION_RAD,
  MAGE_MODEL_Y_ROTATION_RAD,
  ThreeObjectFactory,
} from '../src/render-three/ThreeObjectFactory';
import { HeroStageTemplateIds } from '../src/world-3d/HeroStageTemplates';

describe('ThreeObjectFactory', () => {
  it('keeps the mage invisible before the FBX model is loaded', () => {
    const factory = new ThreeObjectFactory();
    const mage = factory.create(HeroStageTemplateIds.mage);

    expect(mage).toBeInstanceOf(THREE.Object3D);
    expect(mage.children).toHaveLength(0);
    expect(countMeshes(mage)).toBe(0);
    expect(factory.getTemplateVersion(HeroStageTemplateIds.mage)).toBe(0);
  });

  it('keeps the mage invisible until the loaded FBX template has its forced texture applied', () => {
    const factory = new ThreeObjectFactory();
    const internals = factory as unknown as TextureGateTestInternals;
    internals.pendingMageTemplate = createTexturableTemplate();

    expect(internals.publishMageTemplateIfTextureReady()).toBe(false);
    expect(factory.create(HeroStageTemplateIds.mage).children).toHaveLength(0);
    expect(factory.getTemplateVersion(HeroStageTemplateIds.mage)).toBe(0);

    const texture = new THREE.Texture();
    internals.mageTexture = texture;

    expect(internals.publishMageTemplateIfTextureReady()).toBe(true);
    expect(factory.getTemplateVersion(HeroStageTemplateIds.mage)).toBe(1);

    const mage = factory.create(HeroStageTemplateIds.mage);
    expect(countMeshes(mage)).toBeGreaterThan(0);
    expect(firstMeshTexture(internals.mageTemplate)).toBe(texture);
    expect(firstMeshTexture(mage)).toBeInstanceOf(THREE.Texture);
  });

  it('keeps the Trial monster invisible before the kobold FBX model is loaded', () => {
    const factory = new ThreeObjectFactory();
    const monster = factory.create(HeroStageTemplateIds.monsterPlaceholder);

    expect(monster).toBeInstanceOf(THREE.Object3D);
    expect(monster.children).toHaveLength(0);
    expect(countMeshes(monster)).toBe(0);
    expect(factory.getTemplateVersion(HeroStageTemplateIds.monsterPlaceholder)).toBe(0);
  });

  it('keeps the Trial monster invisible until the loaded kobold FBX template has its forced texture applied', () => {
    const factory = new ThreeObjectFactory();
    const internals = factory as unknown as TextureGateTestInternals;
    internals.pendingKoboldTemplate = createTexturableTemplate();

    expect(internals.publishKoboldTemplateIfTextureReady()).toBe(false);
    expect(factory.create(HeroStageTemplateIds.monsterPlaceholder).children).toHaveLength(0);
    expect(factory.getTemplateVersion(HeroStageTemplateIds.monsterPlaceholder)).toBe(0);

    const texture = new THREE.Texture();
    internals.koboldTexture = texture;

    expect(internals.publishKoboldTemplateIfTextureReady()).toBe(true);
    expect(factory.getTemplateVersion(HeroStageTemplateIds.monsterPlaceholder)).toBe(1);

    const monster = factory.create(HeroStageTemplateIds.monsterPlaceholder);
    expect(countMeshes(monster)).toBeGreaterThan(0);
    expect(firstMeshTexture(internals.koboldTemplate)).toBe(texture);
    expect(firstMeshTexture(monster)).toBeInstanceOf(THREE.Texture);
  });

  it('creates a synchronous castle backdrop fallback object before the texture is loaded', () => {
    const backdrop = new ThreeObjectFactory().create(HeroStageTemplateIds.backdropForest);
    const plane = backdrop.getObjectByName('castle-backdrop-plane');

    expect(backdrop).toBeInstanceOf(THREE.Object3D);
    expect(plane).toBeInstanceOf(THREE.Mesh);
    expect(plane?.scale.x).toBeCloseTo(HERO_BACKDROP_VIEW_WIDTH);
    expect(plane?.scale.y).toBeCloseTo(HERO_BACKDROP_VIEW_HEIGHT);
  });

  it('creates synchronous unlit health bar track and fill objects', () => {
    const factory = new ThreeObjectFactory();
    const track = factory.create(HeroStageTemplateIds.healthBarTrack);
    const fill = factory.create(HeroStageTemplateIds.healthBarFill);

    expect(track).toBeInstanceOf(THREE.Mesh);
    expect(fill).toBeInstanceOf(THREE.Mesh);
    expect((track as THREE.Mesh).material).toBeInstanceOf(THREE.MeshBasicMaterial);
    expect((fill as THREE.Mesh).material).toBeInstanceOf(THREE.MeshBasicMaterial);
    expect(((track as THREE.Mesh).material as THREE.MeshBasicMaterial).depthWrite).toBe(false);
    expect(((fill as THREE.Mesh).material as THREE.MeshBasicMaterial).depthWrite).toBe(false);
  });

  it('computes cover sizing for wide and tall backdrop images', () => {
    expect(backdropCoverSizeForImageAspect(3)).toEqual({
      width: 15,
      height: 5,
      centerY: 0,
    });
    expect(backdropCoverSizeForImageAspect(1)).toEqual({
      width: 10.8,
      height: 10.8,
      centerY: -2.9000000000000004,
    });
  });

  it('documents the loaded mage FBX facing correction as -90 degrees around Y', () => {
    expect(MAGE_MODEL_Y_ROTATION_RAD).toBeCloseTo(-Math.PI / 2);
  });

  it('applies the mage facing correction to the model child so world transforms do not overwrite it', () => {
    const root = new THREE.Group();
    const modelRoot = new THREE.Group();
    root.add(modelRoot);

    applyMageModelFacingCorrection(root);

    expect(root.rotation.y).toBe(0);
    expect(modelRoot.rotation.y).toBeCloseTo(-Math.PI / 2);
  });

  it('documents the loaded kobold FBX facing correction as -90 degrees around Y', () => {
    expect(KOBOLD_MODEL_Y_ROTATION_RAD).toBeCloseTo(-Math.PI / 2);
  });

  it('applies the kobold facing correction to the model child so world transforms do not overwrite it', () => {
    const root = new THREE.Group();
    const modelRoot = new THREE.Group();
    root.add(modelRoot);

    applyKoboldModelFacingCorrection(root);

    expect(root.rotation.y).toBe(0);
    expect(modelRoot.rotation.y).toBeCloseTo(-Math.PI / 2);
  });
});

interface TextureGateTestInternals {
  mageTemplate: THREE.Group | null;
  pendingMageTemplate: THREE.Group | null;
  mageTexture: THREE.Texture | null;
  publishMageTemplateIfTextureReady: () => boolean;
  koboldTemplate: THREE.Group | null;
  pendingKoboldTemplate: THREE.Group | null;
  koboldTexture: THREE.Texture | null;
  publishKoboldTemplateIfTextureReady: () => boolean;
}

function createTexturableTemplate(): THREE.Group {
  const group = new THREE.Group();
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial(),
  );
  group.add(mesh);
  return group;
}

function countMeshes(object: THREE.Object3D): number {
  let count = 0;
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      count += 1;
    }
  });
  return count;
}

function firstMeshTexture(object: THREE.Object3D | null): THREE.Texture | null {
  if (object == null) {
    return null;
  }

  let texture: THREE.Texture | null = null;
  object.traverse((child) => {
    if (texture != null || !(child instanceof THREE.Mesh)) {
      return;
    }

    const material = Array.isArray(child.material) ? child.material[0] : child.material;
    texture = material instanceof THREE.MeshBasicMaterial ? material.map : null;
  });
  return texture;
}
