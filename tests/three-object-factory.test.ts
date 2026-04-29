import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { ThreeObjectFactory } from '../src/render-three/ThreeObjectFactory';
import { HeroStageTemplateIds } from '../src/world-3d/HeroStageTemplates';

describe('ThreeObjectFactory', () => {
  it('creates a synchronous placeholder mage before the FBX model is loaded', () => {
    const factory = new ThreeObjectFactory();
    const mage = factory.create(HeroStageTemplateIds.mage);

    expect(mage).toBeInstanceOf(THREE.Object3D);
    expect(mage.children.length).toBeGreaterThan(0);
    expect(factory.getTemplateVersion(HeroStageTemplateIds.mage)).toBe(0);
  });
});
