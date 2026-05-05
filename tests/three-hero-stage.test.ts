import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import {
  createMageAnimationController,
  isProjectileCastReady,
  isProjectileVisible,
  projectileColor,
  projectileMaterialSettings,
  projectileParticleColorComponents,
  projectileQuadScale,
  resolveMageParticleSourceWorldPosition,
  resolveProjectileRenderOrigin,
  triggerMageCastAnimation,
  updateMageAnimationController,
} from '../src/render-three/ThreeHeroStage';
import type { ProjectileState } from '../src/world-3d/HeroWorldState';

describe('ThreeHeroStage projectile VFX', () => {
  it('maps spell schools to the requested tile colors', () => {
    expect(projectileColor('earth')).toBe('#27ae60');
    expect(projectileColor('fire')).toBe('#ff8a1f');
    expect(projectileColor('ice')).toBe('#38d5ff');
    expect(projectileColor('lightning')).toBe('#f2c94c');
  });

  it('uses the same school tint for match and bomb projectile particles', () => {
    const matchIce = projectileParticleColorComponents({ schoolId: 'ice', effectKind: 'match' });
    const bombIce = projectileParticleColorComponents({ schoolId: 'ice', effectKind: 'bomb' });
    const bombFire = projectileParticleColorComponents({ schoolId: 'fire', effectKind: 'bomb' });

    expect(bombIce).toEqual(matchIce);
    expect(bombIce).not.toEqual(bombFire);
  });

  it('uses explicit tinted material settings for match and bomb projectiles', () => {
    expect(projectileMaterialSettings({ schoolId: 'earth', effectKind: 'match' })).toMatchObject({
      color: projectileColor('earth'),
      blending: THREE.NormalBlending,
      transparent: true,
    });
    expect(projectileMaterialSettings({ schoolId: 'lightning', effectKind: 'bomb' })).toMatchObject({
      color: projectileColor('lightning'),
      transparent: true,
    });
  });

  it('uses larger vertically stretched quad scales for match and bomb particles', () => {
    expect(projectileQuadScale('match')).toEqual({ x: 0.27, y: 0.36 });
    expect(projectileQuadScale('bomb')).toEqual({ x: 0.6, y: 0.78 });
    expect(projectileQuadScale('match').y).toBeGreaterThan(projectileQuadScale('match').x);
    expect(projectileQuadScale('bomb').y).toBeGreaterThan(projectileQuadScale('bomb').x);
  });

  it('starts cast from cast timing while particles wait for projectile activation timing', () => {
    expect(isProjectileCastReady({ castActivationDelaySec: 0 })).toBe(true);
    expect(isProjectileCastReady({ castActivationDelaySec: 0.1 })).toBe(false);
    expect(isProjectileVisible({ activationDelaySec: 0.1, remainingSec: 0.2 })).toBe(false);
    expect(isProjectileVisible({ activationDelaySec: 0, remainingSec: 0.2 })).toBe(true);
  });

  it('resolves projectile origin from the mage particleSource world position', () => {
    const mage = new THREE.Group();
    mage.position.set(2, 3, 4);
    mage.scale.set(2, 3, 4);
    const particleSource = new THREE.Object3D();
    particleSource.name = 'particleSource';
    particleSource.position.set(0.25, 0.5, -0.1);
    mage.add(particleSource);
    const projectile = testProjectile();

    const position = resolveMageParticleSourceWorldPosition(mage);
    const renderProjectile = resolveProjectileRenderOrigin(projectile, mage);

    expect(position?.x).toBeCloseTo(2.5);
    expect(position?.y).toBeCloseTo(4.5);
    expect(position?.z).toBeCloseTo(3.6);
    expect(renderProjectile.from).toEqual(position);
  });

  it('falls back to the rule-authored projectile origin when particleSource is missing', () => {
    const projectile = testProjectile();

    expect(resolveMageParticleSourceWorldPosition(new THREE.Group())).toBeNull();
    expect(resolveProjectileRenderOrigin(projectile, new THREE.Group())).toBe(projectile);
  });
});

describe('ThreeHeroStage mage animation controller', () => {
  it('starts the idle clip by default', () => {
    const object = objectWithClips([
      new THREE.AnimationClip('idle', 1, [
        new THREE.VectorKeyframeTrack('.position', [0, 1], [0, 0, 0, 0, 0.04, 0]),
      ]),
      new THREE.AnimationClip('cast', 0.5, [
        new THREE.VectorKeyframeTrack('.position', [0, 0.5], [0, 0, 0, 0.2, 0, 0]),
      ]),
    ]);

    const controller = createMageAnimationController(object);

    expect(controller).not.toBeNull();
    expect(controller?.idleAction?.isRunning()).toBe(true);
    expect(controller?.castRemainingSec).toBe(0);
  });

  it('plays cast as a one-shot then returns to idle', () => {
    const object = objectWithClips([
      new THREE.AnimationClip('idle', 1, [
        new THREE.VectorKeyframeTrack('.position', [0, 1], [0, 0, 0, 0, 0.04, 0]),
      ]),
      new THREE.AnimationClip('cast', 0.5, [
        new THREE.VectorKeyframeTrack('.position', [0, 0.5], [0, 0, 0, 0.2, 0, 0]),
      ]),
    ]);
    const controller = createMageAnimationController(object);
    expect(controller).not.toBeNull();

    triggerMageCastAnimation(controller!);

    expect(controller?.castRemainingSec).toBeCloseTo(0.5);
    expect(controller?.castAction?.isRunning()).toBe(true);
    expect(controller?.idleAction?.getEffectiveWeight()).toBe(0);

    updateMageAnimationController(controller!, 0.51);

    expect(controller?.castRemainingSec).toBe(0);
    expect(controller?.castAction?.isRunning()).toBe(false);
    expect(controller?.idleAction?.isRunning()).toBe(true);
    expect(controller?.idleAction?.getEffectiveWeight()).toBe(1);
  });

  it('treats a missing cast clip as a no-op', () => {
    const object = objectWithClips([
      new THREE.AnimationClip('idle', 1, [
        new THREE.VectorKeyframeTrack('.position', [0, 1], [0, 0, 0, 0, 0.04, 0]),
      ]),
    ]);
    const controller = createMageAnimationController(object);
    expect(controller).not.toBeNull();

    triggerMageCastAnimation(controller!);
    updateMageAnimationController(controller!, 0.5);

    expect(controller?.castRemainingSec).toBe(0);
    expect(controller?.idleAction?.isRunning()).toBe(true);
    expect(controller?.idleAction?.getEffectiveWeight()).toBe(1);
  });
});

function objectWithClips(clips: THREE.AnimationClip[]): THREE.Object3D {
  const object = new THREE.Object3D();
  object.animations = clips;
  return object;
}

function testProjectile(): ProjectileState {
  return {
    projectileId: 'test-projectile',
    schoolId: 'ice',
    effectKind: 'match',
    from: { x: -1, y: -2, z: -3 },
    to: { x: 4, y: 5, z: 6 },
    castActivationDelaySec: 0,
    activationDelaySec: 0,
    remainingSec: 0.2,
    durationSec: 0.2,
  };
}
