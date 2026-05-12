import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { HERO_STAGE_HEIGHT, LOGICAL_WIDTH } from '../src/core/Layout';
import {
  applyMaterialOverrides,
  createMageAnimationController,
  earthImpactSpriteFrameIndex,
  fireBurnSpriteFrameIndex,
  isProjectileChargeVisible,
  isProjectileCastReady,
  isProjectileVisible,
  LIGHTNING_RAY_RENDER_ORDER,
  lightningRayCenterlinePoints,
  lightningRayMaterialSettings,
  lightningRayRibbonGeometryData,
  lightningRayThicknessWorldUnits,
  mageChargeMaterialSettings,
  projectWorldPositionToLogicalHeroStage,
  projectileChargeProgress,
  projectileColor,
  projectileMaterialSettings,
  projectileParticleColorComponents,
  projectileQuadScale,
  resolveMageParticleSourceLogicalPosition,
  resolveMageParticleSourceWorldPosition,
  resolveProjectileRenderOrigin,
  setActorLoopAnimationPaused,
  spriteSheetFrameUvTransform,
  triggerActorOneShotAnimation,
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

  it('uses projectile color and blending for mage staff charge particles', () => {
    const projectile = { schoolId: 'ice' as const, effectKind: 'match' as const };

    expect(mageChargeMaterialSettings(projectile)).toMatchObject({
      color: projectileColor('ice'),
      blending: projectileMaterialSettings(projectile).blending,
      transparent: projectileMaterialSettings(projectile).transparent,
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

  it('shows mage weapon charge during projectile windup before launch', () => {
    expect(isProjectileChargeVisible({
      castActivationDelaySec: 0.08,
      activationDelaySec: 0.5,
      chargeDurationSec: 0.5,
    })).toBe(false);
    expect(isProjectileChargeVisible({
      castActivationDelaySec: 0,
      activationDelaySec: 0.25,
      chargeDurationSec: 0.5,
    })).toBe(true);
    expect(isProjectileChargeVisible({
      castActivationDelaySec: 0,
      activationDelaySec: 0,
      chargeDurationSec: 0.5,
    })).toBe(false);
    expect(projectileChargeProgress({ activationDelaySec: 0.25, chargeDurationSec: 0.5 })).toBeCloseTo(0.5);
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

  it('preserves world-origin chain projectile origins', () => {
    const mage = new THREE.Group();
    const particleSource = new THREE.Object3D();
    particleSource.name = 'particleSource';
    particleSource.position.set(10, 10, 10);
    mage.add(particleSource);
    const projectile = { ...testProjectile(), originKind: 'world' as const };

    expect(resolveProjectileRenderOrigin(projectile, mage)).toBe(projectile);
  });

  it('converts the requested lightning ray thickness from logical pixels to world units', () => {
    expect(lightningRayThicknessWorldUnits(LOGICAL_WIDTH)).toBeCloseTo(0.1875);
  });

  it('uses a depth-independent material so lightning renders above enemies', () => {
    expect(lightningRayMaterialSettings({ schoolId: 'lightning' })).toMatchObject({
      color: projectileColor('lightning'),
      transparent: true,
      depthWrite: false,
      depthTest: false,
      side: THREE.DoubleSide,
    });
    expect(LIGHTNING_RAY_RENDER_ORDER).toBeGreaterThan(32);
  });

  it('builds animated lightning ray centerline points anchored to projectile endpoints', () => {
    const projectile = {
      ...testProjectile(),
      projectileId: 'lightning-test',
      schoolId: 'lightning' as const,
      from: { x: 1, y: 2, z: 3 },
      to: { x: 5, y: 6, z: 7 },
    };

    const points = lightningRayCenterlinePoints(projectile, 0, 4);
    const movedPoints = lightningRayCenterlinePoints(projectile, 0.2, 4);

    expect(points).toHaveLength(5);
    expect(points[0]).toEqual(projectile.from);
    expect(points.at(-1)).toEqual(projectile.to);
    expect(lightningRayCenterlinePoints(projectile, 0, 4)).toEqual(points);
    expect(movedPoints[0]).toEqual(projectile.from);
    expect(movedPoints.at(-1)).toEqual(projectile.to);
    expect(points[2]).not.toEqual({ x: 3, y: 4, z: 5 });
    expect(movedPoints[2]).not.toEqual(points[2]);
  });

  it('builds paired ribbon vertices and faces around the lightning ray centerline', () => {
    const projectile = {
      ...testProjectile(),
      projectileId: 'lightning-ribbon-test',
      schoolId: 'lightning' as const,
      from: { x: 0, y: 0, z: 0 },
      to: { x: 4, y: 0, z: 0 },
    };

    const geometry = lightningRayRibbonGeometryData(projectile, 0, 0.1875, 4);

    expect(geometry.centerline).toHaveLength(5);
    expect(geometry.positions).toHaveLength(5 * 2 * 3);
    expect(geometry.indices).toHaveLength(4 * 6);
    expect(geometry.centerline[0]).toEqual(projectile.from);
    expect(geometry.centerline.at(-1)).toEqual(projectile.to);
    expect(Math.hypot(geometry.positions[0] - geometry.positions[3], geometry.positions[1] - geometry.positions[4])).toBeCloseTo(0.1875);
  });

  it('selects looping fire burn sprite frames from a 4x2 UV grid', () => {
    expect(fireBurnSpriteFrameIndex(0)).toBe(0);
    expect(fireBurnSpriteFrameIndex(1 / 12)).toBe(1);
    expect(fireBurnSpriteFrameIndex(8 / 12)).toBe(0);

    expect(spriteSheetFrameUvTransform(0, 4, 2)).toEqual({
      repeatX: 0.25,
      repeatY: 0.5,
      offsetX: 0,
      offsetY: 0.5,
    });
    expect(spriteSheetFrameUvTransform(5, 4, 2)).toEqual({
      repeatX: 0.25,
      repeatY: 0.5,
      offsetX: 0.25,
      offsetY: 0,
    });
    expect(spriteSheetFrameUvTransform(8, 4, 2)).toEqual(spriteSheetFrameUvTransform(0, 4, 2));
  });

  it('selects non-looping earth impact sprite frames from a 2x2 UV grid', () => {
    expect(earthImpactSpriteFrameIndex(0)).toBe(0);
    expect(earthImpactSpriteFrameIndex(1 / 12)).toBe(1);
    expect(earthImpactSpriteFrameIndex(2 / 12)).toBe(2);
    expect(earthImpactSpriteFrameIndex(3 / 12)).toBe(3);
    expect(earthImpactSpriteFrameIndex(8 / 12)).toBe(3);

    expect(spriteSheetFrameUvTransform(0, 2, 2)).toEqual({
      repeatX: 0.5,
      repeatY: 0.5,
      offsetX: 0,
      offsetY: 0.5,
    });
    expect(spriteSheetFrameUvTransform(3, 2, 2)).toEqual({
      repeatX: 0.5,
      repeatY: 0.5,
      offsetX: 0.5,
      offsetY: 0,
    });
  });

  it('projects the mage particleSource into logical hero-stage coordinates', () => {
    const camera = new THREE.OrthographicCamera(-5.4, 5.4, 4.375, -4.375, 0.1, 100);
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld(true);
    const mage = new THREE.Group();
    const particleSource = new THREE.Object3D();
    particleSource.name = 'particleSource';
    particleSource.position.set(1, 1, 0);
    mage.add(particleSource);

    const centered = projectWorldPositionToLogicalHeroStage(
      { x: 0, y: 0, z: 0 },
      camera,
      LOGICAL_WIDTH,
      HERO_STAGE_HEIGHT,
    );
    const projected = resolveMageParticleSourceLogicalPosition(mage, camera, LOGICAL_WIDTH, HERO_STAGE_HEIGHT);

    expect(centered).toEqual({ x: 432, y: 350 });
    expect(projected?.x).toBeCloseTo(512);
    expect(projected?.y).toBeCloseTo(270);

    particleSource.position.set(2, -0.5, 0);
    const updated = resolveMageParticleSourceLogicalPosition(mage, camera, LOGICAL_WIDTH, HERO_STAGE_HEIGHT);
    expect(updated?.x).toBeCloseTo(592);
    expect(updated?.y).toBeCloseTo(390);
  });

  it('returns null for logical particleSource projection when the source is missing', () => {
    const camera = new THREE.OrthographicCamera(-5.4, 5.4, 4.375, -4.375, 0.1, 100);
    camera.updateProjectionMatrix();

    expect(resolveMageParticleSourceLogicalPosition(new THREE.Group(), camera, LOGICAL_WIDTH, HERO_STAGE_HEIGHT)).toBeNull();
  });
});

describe('ThreeHeroStage material overrides', () => {
  it('restores original material color and opacity after temporary tint and fade overrides clear', () => {
    const material = new THREE.MeshStandardMaterial({
      color: '#8a6a42',
      opacity: 1,
      transparent: false,
    });

    applyMaterialOverrides(material, '#38d5ff', 0.5);
    expect(material.color.getHexString()).toBe('38d5ff');
    expect(material.opacity).toBeCloseTo(0.5);
    expect(material.transparent).toBe(true);

    applyMaterialOverrides(material);
    expect(material.color.getHexString()).toBe('8a6a42');
    expect(material.opacity).toBe(1);
    expect(material.transparent).toBe(false);
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

  it('restarts cast when explicitly triggered again', () => {
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
    updateMageAnimationController(controller!, 0.2);
    expect(controller?.castRemainingSec).toBeCloseTo(0.3);

    triggerMageCastAnimation(controller!);

    expect(controller?.castRemainingSec).toBeCloseTo(0.5);
    expect(controller?.castAction?.isRunning()).toBe(true);
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

  it('starts the walk clip by default for kobold animation sets', () => {
    const object = objectWithClips([
      new THREE.AnimationClip('walk', 1, [
        new THREE.VectorKeyframeTrack('.position', [0, 1], [0, 0, 0, 0, 0, 0.1]),
      ]),
      new THREE.AnimationClip('defeat', 1, [
        new THREE.VectorKeyframeTrack('.position', [0, 1], [0, 0, 0, 0, -0.3, 0]),
      ]),
    ]);

    const controller = createMageAnimationController(object);

    expect(controller).not.toBeNull();
    expect(controller?.walkAction?.isRunning()).toBe(true);
    expect(controller?.walkAction?.getEffectiveWeight()).toBe(1);
    expect(controller?.defeatRemainingSec).toBe(0);
  });

  it('pauses and resumes kobold walk loops without resetting animation time', () => {
    const object = objectWithClips([
      new THREE.AnimationClip('walk', 1, [
        new THREE.VectorKeyframeTrack('.position', [0, 1], [0, 0, 0, 0, 0, 0.1]),
      ]),
    ]);
    const controller = createMageAnimationController(object);
    expect(controller).not.toBeNull();

    updateMageAnimationController(controller!, 0.25);
    const timeBeforePause = controller!.walkAction?.time ?? 0;
    expect(timeBeforePause).toBeGreaterThan(0);

    setActorLoopAnimationPaused(controller!, true);
    updateMageAnimationController(controller!, 0.4);

    expect(controller?.walkAction?.paused).toBe(true);
    expect(controller?.walkAction?.time).toBeCloseTo(timeBeforePause);

    setActorLoopAnimationPaused(controller!, false);
    updateMageAnimationController(controller!, 0.25);

    expect(controller?.walkAction?.paused).toBe(false);
    expect(controller?.walkAction?.time ?? 0).toBeGreaterThan(timeBeforePause);
  });

  it('plays kobold defeat normally after a paused walk loop', () => {
    const object = objectWithClips([
      new THREE.AnimationClip('walk', 1, [
        new THREE.VectorKeyframeTrack('.position', [0, 1], [0, 0, 0, 0, 0, 0.1]),
      ]),
      new THREE.AnimationClip('defeat', 1, [
        new THREE.VectorKeyframeTrack('.position', [0, 1], [0, 0, 0, 0, -0.3, 0]),
      ]),
    ]);
    const controller = createMageAnimationController(object);
    expect(controller).not.toBeNull();

    updateMageAnimationController(controller!, 0.25);
    setActorLoopAnimationPaused(controller!, true);
    triggerActorOneShotAnimation(controller!, 'defeat');

    expect(controller?.walkAction?.paused).toBe(false);
    expect(controller?.defeatAction?.paused).toBe(false);
    expect(controller?.defeatRemainingSec).toBeCloseTo(1);

    updateMageAnimationController(controller!, 0.5);

    expect(object.position.y).toBeLessThan(0);
    expect(controller?.defeatRemainingSec).toBeCloseTo(0.5);
  });

  it('plays kobold defeat as a clamped one-shot', () => {
    const object = objectWithClips([
      new THREE.AnimationClip('walk', 1, [
        new THREE.VectorKeyframeTrack('.position', [0, 1], [0, 0, 0, 0, 0, 0.1]),
      ]),
      new THREE.AnimationClip('defeat', 1, [
        new THREE.VectorKeyframeTrack('.position', [0, 1], [0, 0, 0, 0, -0.3, 0]),
      ]),
    ]);
    const controller = createMageAnimationController(object);
    expect(controller).not.toBeNull();

    triggerActorOneShotAnimation(controller!, 'defeat');

    expect(controller?.defeatRemainingSec).toBeCloseTo(1);
    expect(controller?.defeatAction?.isRunning()).toBe(true);
    expect(controller?.defeatAction?.clampWhenFinished).toBe(true);
    expect(controller?.walkAction?.getEffectiveWeight()).toBe(0);

    updateMageAnimationController(controller!, 1.01);

    expect(controller?.defeatRemainingSec).toBe(0);
    expect(controller?.activeOneShotId).toBe('defeat');
    expect(object.position.y).toBeCloseTo(-0.3);
    expect(controller?.defeatAction?.getEffectiveWeight()).toBe(1);
    expect(controller?.defeatAction?.clampWhenFinished).toBe(true);
    expect(controller?.walkAction?.getEffectiveWeight()).toBe(0);
  });

  it('does not restart kobold defeat when defeat is already active', () => {
    const object = objectWithClips([
      new THREE.AnimationClip('walk', 1, [
        new THREE.VectorKeyframeTrack('.position', [0, 1], [0, 0, 0, 0, 0, 0.1]),
      ]),
      new THREE.AnimationClip('defeat', 1, [
        new THREE.VectorKeyframeTrack('.position', [0, 1], [0, 0, 0, 0, -0.3, 0]),
      ]),
    ]);
    const controller = createMageAnimationController(object);
    expect(controller).not.toBeNull();

    triggerActorOneShotAnimation(controller!, 'defeat');
    updateMageAnimationController(controller!, 0.35);
    const remainingAfterAdvance = controller!.defeatRemainingSec;

    triggerActorOneShotAnimation(controller!, 'defeat');

    expect(controller?.activeOneShotId).toBe('defeat');
    expect(controller?.defeatRemainingSec).toBeCloseTo(remainingAfterAdvance);
    expect(controller?.defeatRemainingSec).toBeLessThan(1);
    expect(controller?.defeatAction?.getEffectiveWeight()).toBe(1);
    expect(controller?.defeatAction?.clampWhenFinished).toBe(true);
    expect(controller?.walkAction?.getEffectiveWeight()).toBe(0);
  });

  it('does not restart kobold defeat after the final frame is held for fade-out', () => {
    const object = objectWithClips([
      new THREE.AnimationClip('walk', 1, [
        new THREE.VectorKeyframeTrack('.position', [0, 1], [0, 0, 0, 0, 0, 0.1]),
      ]),
      new THREE.AnimationClip('defeat', 1, [
        new THREE.VectorKeyframeTrack('.position', [0, 1], [0, 0, 0, 0, -0.3, 0]),
      ]),
    ]);
    const controller = createMageAnimationController(object);
    expect(controller).not.toBeNull();

    triggerActorOneShotAnimation(controller!, 'defeat');
    updateMageAnimationController(controller!, 1.01);
    const heldTime = controller!.defeatAction?.time ?? 0;

    triggerActorOneShotAnimation(controller!, 'defeat');
    updateMageAnimationController(controller!, 0);

    expect(controller?.activeOneShotId).toBe('defeat');
    expect(controller?.defeatRemainingSec).toBe(0);
    expect(controller?.defeatAction?.time).toBeCloseTo(heldTime);
    expect(controller?.defeatAction?.time).toBeCloseTo(1);
    expect(object.position.y).toBeCloseTo(-0.3);
    expect(controller?.defeatAction?.getEffectiveWeight()).toBe(1);
    expect(controller?.walkAction?.getEffectiveWeight()).toBe(0);
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
    chargeDurationSec: 0.5,
    remainingSec: 0.2,
    durationSec: 0.2,
  };
}
