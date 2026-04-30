import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import {
  applyMageModelFacingCorrection,
  backdropCoverSizeForImageAspect,
  HERO_BACKDROP_VIEW_HEIGHT,
  HERO_BACKDROP_VIEW_WIDTH,
  MAGE_MODEL_Y_ROTATION_RAD,
  ThreeObjectFactory,
} from '../src/render-three/ThreeObjectFactory';
import { HeroStageTemplateIds } from '../src/world-3d/HeroStageTemplates';

describe('ThreeObjectFactory', () => {
  it('creates a synchronous placeholder mage before the FBX model is loaded', () => {
    const factory = new ThreeObjectFactory();
    const mage = factory.create(HeroStageTemplateIds.mage);

    expect(mage).toBeInstanceOf(THREE.Object3D);
    expect(mage.children.length).toBeGreaterThan(0);
    expect(factory.getTemplateVersion(HeroStageTemplateIds.mage)).toBe(0);
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
});
