import * as THREE from 'three';
import { HERO_STAGE_HEIGHT, LOGICAL_WIDTH } from '../core/Layout';
import type { HeroWorldState, ProjectileState } from '../presentation/HeroWorldState';
import { HeroStageTemplateIds } from '../presentation/HeroStageTemplates';
import type {
  WorldObjectState,
  WorldObjectTextureCrop,
  WorldObjectVisualVariant,
} from '../presentation/WorldObjectState';
import {
  HERO_STAGE_ORTHO_VIEW_WIDTH,
  type OrthographicAnchor,
  type OrthographicBoundsOptions,
  orthographicBoundsForAspect,
  ThreeCameraController,
} from './ThreeCameraController';
import { ThreeObjectFactory } from './ThreeObjectFactory';
import { ThreeObjectCache } from './ThreePools';

type OverrideableMaterial = THREE.MeshStandardMaterial | THREE.MeshBasicMaterial;

export const LIGHTNING_RAY_THICKNESS_PX = 15;
export const LIGHTNING_RAY_RENDER_ORDER = 60;
export const MAGE_PARTICLE_SOURCE_WORLD_OFFSET: ProjectileState['from'] = { x: 0.7, y: 0.24, z: 0 };
const LIGHTNING_RAY_SEGMENT_COUNT = 18;
const LIGHTNING_RAY_WAVE_COUNT = 2.35;
const LIGHTNING_RAY_WAVE_AMPLITUDE = 0.24;
const LIGHTNING_RAY_WAVE_SPEED = Math.PI * 5.2;
const FIRE_BURN_SPRITE_COLUMNS = 4;
const FIRE_BURN_SPRITE_ROWS = 2;
const FIRE_BURN_SPRITE_FRAME_COUNT = 8;
const FIRE_BURN_SPRITE_FPS = 12;
const EARTH_IMPACT_SPRITE_COLUMNS = 2;
const EARTH_IMPACT_SPRITE_ROWS = 2;
const EARTH_IMPACT_SPRITE_FRAME_COUNT = 4;
const EARTH_IMPACT_SPRITE_FPS = 12;

const originalMaterialState = new WeakMap<OverrideableMaterial, {
  color: THREE.Color;
  opacity: number;
  transparent: boolean;
  depthTest: boolean;
}>();

export class ThreeHeroStage {
  private readonly backgroundScene = new THREE.Scene();
  private readonly foregroundScene = new THREE.Scene();
  private readonly backgroundCamera = createHeroStageCamera(LOGICAL_WIDTH / HERO_STAGE_HEIGHT);
  private readonly camera = createHeroStageCamera(LOGICAL_WIDTH / HERO_STAGE_HEIGHT);
  private readonly backgroundRenderer: THREE.WebGLRenderer;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly factory = new ThreeObjectFactory();
  private readonly backgroundObjectCache = new ThreeObjectCache();
  private readonly objectCache = new ThreeObjectCache();
  private readonly projectileCache = new Map<string, ProjectileParticleSystem>();
  private readonly mageChargeCache = new Map<string, MageChargeParticleSystem>();
  private readonly cameraController = new ThreeCameraController();
  private readonly animationControllers = new Map<string, MageAnimationController>();
  private readonly castTriggeredProjectileIds = new Set<string>();
  private elapsedSec = 0;
  private cameraBoundsOptions: OrthographicBoundsOptions = {};

  constructor(private readonly container: HTMLElement) {
    this.backgroundRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.backgroundRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.backgroundRenderer.setSize(LOGICAL_WIDTH, HERO_STAGE_HEIGHT, false);
    this.backgroundRenderer.domElement.className = 'hero-stage-canvas hero-stage-canvas--background';
    this.container.appendChild(this.backgroundRenderer.domElement);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(LOGICAL_WIDTH, HERO_STAGE_HEIGHT, false);
    this.renderer.domElement.className = 'hero-stage-canvas hero-stage-canvas--foreground';
    this.container.appendChild(this.renderer.domElement);

    this.backgroundScene.background = new THREE.Color('#20172f');
    this.foregroundScene.add(new THREE.AmbientLight('#ffffff', 1.5));
    const keyLight = new THREE.DirectionalLight('#fff4d6', 1.2);
    keyLight.position.set(3, 4, 5);
    this.foregroundScene.add(keyLight);
  }

  render(state: HeroWorldState, dtSec: number): void {
    this.elapsedSec += Math.max(0, dtSec);
    this.syncCamera(state);
    this.syncObjects(state.objects);
    this.syncProjectileCastTriggers(state.activeProjectiles);
    this.updateAnimationMixers(dtSec);
    this.syncMageCharges(state.activeProjectiles);
    this.syncProjectiles(state.activeProjectiles);
    this.backgroundRenderer.render(this.backgroundScene, this.backgroundCamera);
    this.renderer.render(this.foregroundScene, this.camera);
  }

  resize(width: number, height: number, viewScale = 1, anchor: OrthographicAnchor = 'center'): void {
    this.backgroundRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.backgroundRenderer.setSize(width, height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height, false);
    this.cameraBoundsOptions = { viewScale, anchor };
    applyOrthographicAspect(this.backgroundCamera, width / height, this.cameraBoundsOptions);
    applyOrthographicAspect(this.camera, width / height, this.cameraBoundsOptions);
    this.backgroundCamera.updateProjectionMatrix();
    this.camera.updateProjectionMatrix();
  }

  getMageParticleSourceLogicalPosition(
    logicalWidth = LOGICAL_WIDTH,
    logicalHeight = HERO_STAGE_HEIGHT,
  ): { x: number; y: number } | null {
    return resolveMageParticleSourceLogicalPosition(
      this.objectCache.get('actor-mage'),
      this.camera,
      logicalWidth,
      logicalHeight,
    );
  }

  dispose(): void {
    for (const [, object] of this.backgroundObjectCache.entries()) {
      this.backgroundScene.remove(object);
      this.factory.dispose(object);
    }
    for (const [, object] of this.objectCache.entries()) {
      this.foregroundScene.remove(object);
      this.factory.dispose(object);
    }
    for (const [, projectile] of this.projectileCache.entries()) {
      this.foregroundScene.remove(projectile.mesh);
      if (projectile.lightningRay != null) {
        this.foregroundScene.remove(projectile.lightningRay);
      }
      disposeProjectileSystem(projectile);
    }
    for (const [, charge] of this.mageChargeCache.entries()) {
      this.foregroundScene.remove(charge.mesh);
      disposeMageChargeSystem(charge);
    }
    this.animationControllers.clear();
    this.castTriggeredProjectileIds.clear();
    this.backgroundObjectCache.clear();
    this.objectCache.clear();
    this.projectileCache.clear();
    this.mageChargeCache.clear();
    this.factory.disposeCachedResources();
    this.backgroundRenderer.dispose();
    this.renderer.dispose();
    this.backgroundRenderer.domElement.remove();
    this.renderer.domElement.remove();
  }

  private syncCamera(state: HeroWorldState): void {
    this.cameraController.apply(
      this.backgroundCamera,
      state.camera,
      orthographicAspect(this.backgroundCamera),
      this.cameraBoundsOptions,
    );
    this.cameraController.apply(
      this.camera,
      state.camera,
      orthographicAspect(this.camera),
      this.cameraBoundsOptions,
    );
  }

  private syncProjectileCastTriggers(projectiles: readonly ProjectileState[]): void {
    const activeProjectileIds = new Set<string>();

    for (const projectileState of projectiles) {
      activeProjectileIds.add(projectileState.projectileId);
      if (
        projectileState.originKind === 'world' ||
        !isProjectileCastReady(projectileState) ||
        this.castTriggeredProjectileIds.has(projectileState.projectileId)
      ) {
        continue;
      }

      this.triggerObjectCastAnimation('actor-mage');
      this.castTriggeredProjectileIds.add(projectileState.projectileId);
    }

    for (const projectileId of [...this.castTriggeredProjectileIds]) {
      if (!activeProjectileIds.has(projectileId)) {
        this.castTriggeredProjectileIds.delete(projectileId);
      }
    }
  }

  private syncProjectiles(projectiles: readonly ProjectileState[]): void {
    const seen = new Set<string>();
    const mageObject = this.objectCache.get('actor-mage');

    for (const projectileState of projectiles) {
      if (!isProjectileVisible(projectileState)) {
        continue;
      }

      const objectId = `projectile-${projectileState.projectileId}`;
      seen.add(objectId);
      const renderProjectileState = resolveProjectileRenderOrigin(projectileState, mageObject);
      const projectile = this.getOrCreateProjectile(objectId, renderProjectileState);
      applyProjectileState(projectile, renderProjectileState, this.elapsedSec);
    }

    for (const [objectId, projectile] of [...this.projectileCache.entries()]) {
      if (!seen.has(objectId)) {
        this.foregroundScene.remove(projectile.mesh);
        if (projectile.lightningRay != null) {
          this.foregroundScene.remove(projectile.lightningRay);
        }
        disposeProjectileSystem(projectile);
        this.projectileCache.delete(objectId);
      }
    }
  }

  private syncMageCharges(projectiles: readonly ProjectileState[]): void {
    const seen = new Set<string>();
    const mageObject = this.objectCache.get('actor-mage');

    for (const projectileState of projectiles) {
      if (!isProjectileChargeVisible(projectileState)) {
        continue;
      }

      const objectId = `mage-charge-${projectileState.projectileId}`;
      seen.add(objectId);
      const renderProjectileState = resolveProjectileRenderOrigin(projectileState, mageObject);
      const charge = this.getOrCreateMageCharge(objectId, renderProjectileState);
      applyMageChargeState(charge, renderProjectileState);
    }

    for (const [objectId, charge] of [...this.mageChargeCache.entries()]) {
      if (!seen.has(objectId)) {
        this.foregroundScene.remove(charge.mesh);
        disposeMageChargeSystem(charge);
        this.mageChargeCache.delete(objectId);
      }
    }
  }

  private getOrCreateMageCharge(
    objectId: string,
    projectileState: ProjectileState,
  ): MageChargeParticleSystem {
    const existing = this.mageChargeCache.get(objectId);
    if (existing != null) {
      return existing;
    }

    const charge = createMageChargeParticleSystem(projectileState);
    this.mageChargeCache.set(objectId, charge);
    this.foregroundScene.add(charge.mesh);
    return charge;
  }

  private getOrCreateProjectile(
    objectId: string,
    projectileState: ProjectileState,
  ): ProjectileParticleSystem {
    const existing = this.projectileCache.get(objectId);
    if (existing != null) {
      return existing;
    }

    const projectile = createProjectileParticleSystem(projectileState);
    this.projectileCache.set(objectId, projectile);
    this.foregroundScene.add(projectile.mesh);
    if (projectile.lightningRay != null) {
      this.foregroundScene.add(projectile.lightningRay);
    }
    return projectile;
  }

  private syncObjects(objects: readonly WorldObjectState[]): void {
    const backgroundObjects = objects.filter((object) => isBackgroundLayerObject(object));
    const foregroundObjects = objects.filter((object) => !isBackgroundLayerObject(object));
    this.syncObjectLayer(backgroundObjects, this.backgroundScene, this.backgroundObjectCache, false);
    this.syncObjectLayer(foregroundObjects, this.foregroundScene, this.objectCache, true);
  }

  private syncObjectLayer(
    objects: readonly WorldObjectState[],
    scene: THREE.Scene,
    cache: ThreeObjectCache,
    syncAnimations: boolean,
  ): void {
    const seen = new Set<string>();

    for (const objectState of objects) {
      seen.add(objectState.objectId);
      const object = this.getOrCreateObject(objectState, scene, cache, syncAnimations);
      applyWorldObjectState(object, objectState, this.elapsedSec);
      if (syncAnimations) {
        this.syncObjectAnimation(
          objectState.objectId,
          objectState.animationId,
          objectState.animationPaused,
          objectState.animationTimeSec,
        );
      }
    }

    for (const [objectId, object] of [...cache.entries()]) {
      if (!seen.has(objectId)) {
        scene.remove(object);
        if (syncAnimations) {
          this.animationControllers.delete(objectId);
        }
        this.factory.dispose(object);
        cache.delete(objectId);
      }
    }
  }

  private getOrCreateObject(
    objectState: WorldObjectState,
    scene: THREE.Scene,
    cache: ThreeObjectCache,
    attachAnimations: boolean,
  ): THREE.Object3D {
    const existing = cache.get(objectState.objectId);
    const templateVersion = this.factory.getTemplateVersion(
      objectState.templateId,
      objectState.backdropTextureId,
    );
    if (
      existing != null &&
      cache.getTemplateId(objectState.objectId) === objectState.templateId &&
      cache.getTemplateVersion(objectState.objectId) === templateVersion
    ) {
      return existing;
    }

    if (existing != null) {
      scene.remove(existing);
      if (attachAnimations) {
        this.animationControllers.delete(objectState.objectId);
      }
      this.factory.dispose(existing);
      cache.delete(objectState.objectId);
    }

    const object = this.factory.create(objectState.templateId, objectState.backdropTextureId);
    cache.set(objectState.objectId, objectState.templateId, templateVersion, object);
    if (attachAnimations) {
      this.attachAnimationController(objectState.objectId, object);
    }
    scene.add(object);
    return object;
  }

  private attachAnimationController(objectId: string, object: THREE.Object3D): void {
    const controller = createMageAnimationController(object);
    if (controller == null) {
      return;
    }

    this.animationControllers.set(objectId, controller);
  }

  private triggerObjectCastAnimation(objectId: string): void {
    const controller = this.animationControllers.get(objectId);
    if (controller == null) {
      return;
    }

    triggerMageCastAnimation(controller);
  }

  private syncObjectAnimation(
    objectId: string,
    animationId?: string,
    animationPaused?: boolean,
    animationTimeSec?: number,
  ): void {
    const controller = this.animationControllers.get(objectId);
    if (controller == null) {
      return;
    }

    if (animationId === 'defeat') {
      triggerActorOneShotAnimation(controller, 'defeat');
      return;
    }

    if (animationId === 'walk' || animationId === 'idle') {
      playActorLoopAnimation(controller, animationId);
      if (animationTimeSec != null) {
        setActorLoopAnimationTime(controller, animationTimeSec);
      }
      setActorLoopAnimationPaused(controller, animationPaused === true);
    }
  }

  private updateAnimationMixers(dtSec: number): void {
    const delta = Math.max(0, dtSec);
    for (const controller of this.animationControllers.values()) {
      updateMageAnimationController(controller, delta);
    }
  }
}

export interface MageAnimationController {
  mixer: THREE.AnimationMixer;
  idleAction?: THREE.AnimationAction;
  walkAction?: THREE.AnimationAction;
  castAction?: THREE.AnimationAction;
  defeatAction?: THREE.AnimationAction;
  castDurationSec: number;
  castRemainingSec: number;
  defeatDurationSec: number;
  defeatRemainingSec: number;
  activeLoopId?: 'idle' | 'walk';
  activeOneShotId?: 'cast' | 'defeat';
  loopPaused: boolean;
}

export function createMageAnimationController(object: THREE.Object3D): MageAnimationController | null {
  const idleClip = object.animations.find((clip) => clip.name === 'idle');
  const walkClip = object.animations.find((clip) => clip.name === 'walk');
  const castClip = object.animations.find((clip) => clip.name === 'cast');
  const defeatClip = object.animations.find((clip) => clip.name === 'defeat');
  const fallbackLoopClip =
    idleClip ??
    walkClip ??
    object.animations.find((clip) => clip.name !== 'cast' && clip.name !== 'defeat') ??
    object.animations[0];
  if (fallbackLoopClip == null && castClip == null && defeatClip == null) {
    return null;
  }

  const mixer = new THREE.AnimationMixer(object);
  const fallbackIdleClip = idleClip ?? (walkClip == null ? fallbackLoopClip : undefined);
  const idleAction = fallbackIdleClip == null ? undefined : actionForLoop(mixer, fallbackIdleClip);
  const walkAction = walkClip == null ? undefined : actionForLoop(mixer, walkClip);
  const castAction = castClip == null ? undefined : mixer.clipAction(castClip);
  if (castAction != null) {
    castAction.setLoop(THREE.LoopOnce, 1);
    castAction.clampWhenFinished = false;
    castAction.setEffectiveWeight(0);
  }
  const defeatAction = defeatClip == null ? undefined : mixer.clipAction(defeatClip);
  if (defeatAction != null) {
    defeatAction.setLoop(THREE.LoopOnce, 1);
    defeatAction.clampWhenFinished = true;
    defeatAction.setEffectiveWeight(0);
  }

  const activeLoopId = walkClip != null && idleClip == null ? 'walk' : 'idle';
  const controller: MageAnimationController = {
    mixer,
    idleAction,
    walkAction,
    castAction,
    defeatAction,
    castDurationSec: castClip?.duration ?? 0,
    castRemainingSec: 0,
    defeatDurationSec: defeatClip?.duration ?? 0,
    defeatRemainingSec: 0,
    activeLoopId,
    loopPaused: false,
  };
  playActorLoopAnimation(controller, activeLoopId);
  return controller;
}

function actionForLoop(mixer: THREE.AnimationMixer, clip: THREE.AnimationClip): THREE.AnimationAction {
  const action = mixer.clipAction(clip);
  action.reset();
  action.setLoop(THREE.LoopRepeat, Infinity);
  action.setEffectiveWeight(0);
  action.play();
  return action;
}

export function triggerMageCastAnimation(controller: MageAnimationController): void {
  triggerActorOneShotAnimation(controller, 'cast');
}

export function triggerActorOneShotAnimation(
  controller: MageAnimationController,
  animationId: 'cast' | 'defeat',
): void {
  const action = animationId === 'cast' ? controller.castAction : controller.defeatAction;
  const durationSec = animationId === 'cast' ? controller.castDurationSec : controller.defeatDurationSec;
  if (action == null || durationSec <= 0) {
    return;
  }

  if (animationId === 'defeat' && controller.activeOneShotId === 'defeat') {
    return;
  }

  controller.idleAction?.setEffectiveWeight(0);
  controller.walkAction?.setEffectiveWeight(0);
  setActorLoopAnimationPaused(controller, false);

  action.reset();
  action.setLoop(THREE.LoopOnce, 1);
  action.clampWhenFinished = animationId === 'defeat';
  action.enabled = true;
  action.setEffectiveWeight(1);
  action.play();
  controller.activeOneShotId = animationId;
  if (animationId === 'cast') {
    controller.castRemainingSec = controller.castDurationSec;
  } else {
    controller.defeatRemainingSec = controller.defeatDurationSec;
  }
}

export function playActorLoopAnimation(
  controller: MageAnimationController,
  animationId: 'idle' | 'walk',
): void {
  if (controller.activeOneShotId === 'defeat') {
    return;
  }

  const nextAction = animationId === 'walk' ? controller.walkAction : controller.idleAction;
  const fallbackAction = nextAction ?? controller.idleAction ?? controller.walkAction;
  if (fallbackAction == null) {
    return;
  }

  controller.activeLoopId = nextAction === controller.walkAction ? 'walk' : 'idle';
  if (controller.castRemainingSec > 0 || controller.defeatRemainingSec > 0) {
    return;
  }

  controller.idleAction?.setEffectiveWeight(fallbackAction === controller.idleAction ? 1 : 0);
  controller.walkAction?.setEffectiveWeight(fallbackAction === controller.walkAction ? 1 : 0);
  fallbackAction.enabled = true;
  fallbackAction.play();
  fallbackAction.paused = controller.loopPaused;
}

export function setActorLoopAnimationPaused(controller: MageAnimationController, paused: boolean): void {
  controller.loopPaused = paused;
  if (controller.activeOneShotId != null) {
    return;
  }

  if (controller.activeLoopId === 'walk') {
    if (controller.walkAction != null) {
      controller.walkAction.paused = paused;
    }
    return;
  }

  if (controller.idleAction != null) {
    controller.idleAction.paused = paused;
  }
}

export function setActorLoopAnimationTime(controller: MageAnimationController, animationTimeSec: number): void {
  const clampedTimeSec = Math.max(0, animationTimeSec);
  if (controller.activeLoopId === 'walk') {
    if (controller.walkAction != null) {
      controller.walkAction.time = clampedTimeSec;
    }
    return;
  }

  if (controller.idleAction != null) {
    controller.idleAction.time = clampedTimeSec;
  }
}

export function updateMageAnimationController(controller: MageAnimationController, dtSec: number): void {
  const delta = Math.max(0, dtSec);
  controller.mixer.update(delta);

  if (controller.defeatRemainingSec > 0) {
    controller.defeatRemainingSec = Math.max(0, controller.defeatRemainingSec - delta);
    if (controller.defeatRemainingSec <= 0) {
      holdDefeatAnimationFinalFrame(controller);
    }
  }

  if (controller.castRemainingSec > 0) {
    controller.castRemainingSec = Math.max(0, controller.castRemainingSec - delta);
    if (controller.castRemainingSec <= 0) {
      stopMageCastAnimation(controller);
    }
  }
}

function holdDefeatAnimationFinalFrame(controller: MageAnimationController): void {
  if (controller.defeatAction == null || controller.defeatDurationSec <= 0) {
    return;
  }

  controller.activeOneShotId = 'defeat';
  controller.defeatAction.enabled = true;
  controller.defeatAction.clampWhenFinished = true;
  controller.defeatAction.paused = true;
  controller.defeatAction.time = controller.defeatDurationSec;
  controller.defeatAction.setEffectiveWeight(1);
  controller.walkAction?.setEffectiveWeight(0);
  controller.idleAction?.setEffectiveWeight(0);
}

function stopMageCastAnimation(controller: MageAnimationController): void {
  if (controller.castAction != null) {
    controller.castAction.stop();
    controller.castAction.setEffectiveWeight(0);
  }
  controller.activeOneShotId = undefined;

  playActorLoopAnimation(controller, controller.activeLoopId ?? 'idle');
  setActorLoopAnimationPaused(controller, controller.loopPaused);
}

function createHeroStageCamera(aspect: number): THREE.OrthographicCamera {
  const bounds = orthographicBoundsForAspect(aspect);
  return new THREE.OrthographicCamera(bounds.left, bounds.right, bounds.top, bounds.bottom, 0.1, 100);
}

function applyOrthographicAspect(
  camera: THREE.OrthographicCamera,
  aspect: number,
  options: OrthographicBoundsOptions = {},
): void {
  const bounds = orthographicBoundsForAspect(aspect, options);
  camera.left = bounds.left;
  camera.right = bounds.right;
  camera.top = bounds.top;
  camera.bottom = bounds.bottom;
}

function orthographicAspect(camera: THREE.OrthographicCamera): number {
  const width = camera.right - camera.left;
  const height = camera.top - camera.bottom;
  return height > 0 ? width / height : 1;
}

export function isBackgroundLayerObject(objectState: Pick<WorldObjectState, 'templateId'>): boolean {
  return objectState.templateId === HeroStageTemplateIds.backdropForest;
}

function applyWorldObjectState(object: THREE.Object3D, objectState: WorldObjectState, elapsedSec: number): void {
  const transform = objectState.transform;
  object.position.set(transform.position.x, transform.position.y, transform.position.z);
  object.quaternion.set(
    transform.rotation.x,
    transform.rotation.y,
    transform.rotation.z,
    transform.rotation.w,
  );
  object.scale.set(transform.scale.x, transform.scale.y, transform.scale.z);
  object.visible = objectState.visible;
  applyVisualVariant(object, objectState.visualVariant);

  if (objectState.animationId === 'victory') {
    object.position.y += Math.sin(elapsedSec * 8) * 0.08;
  }

  if (objectState.animationId === 'stunned') {
    object.rotation.z = Math.sin(elapsedSec * 18) * 0.12;
  }

  if (objectState.animationId === 'yank') {
    object.position.y += Math.min(1.6, (elapsedSec % 1.4) * 1.8);
  }

  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.renderOrder = objectState.renderOrder ?? 0;
      if (objectState.templateId === HeroStageTemplateIds.fireBurn) {
        applyFireBurnSpriteFrame(child.material, objectState.animationTimeSec ?? elapsedSec);
      }
      if (objectState.templateId === HeroStageTemplateIds.earthImpact) {
        applyEarthImpactSpriteFrame(child.material, objectState.animationTimeSec ?? elapsedSec);
      }
      applyTextureCrop(child.material, objectState.textureCrop);
      applyMaterialOverrides(
        child.material,
        objectState.tintHex,
        objectState.opacity,
        depthTestForDepthMode(objectState.depthMode),
      );
    }
  });
}

export function applyVisualVariant(
  object: THREE.Object3D,
  visualVariant?: WorldObjectVisualVariant,
): void {
  if (visualVariant == null) {
    return;
  }

  for (const partId of visualVariant.hiddenPartIds ?? []) {
    setMatchingNodeVisibility(object, partId, false);
  }

  for (const partId of visualVariant.visiblePartIds ?? []) {
    setMatchingNodeVisibility(object, partId, true);
  }
}

function depthTestForDepthMode(depthMode?: WorldObjectState['depthMode']): boolean | undefined {
  if (depthMode === 'alwaysOnTop') {
    return false;
  }
  return undefined;
}

function setMatchingNodeVisibility(
  object: THREE.Object3D,
  nodeName: string,
  visible: boolean,
): void {
  const names = new Set([nodeName, THREE.PropertyBinding.sanitizeNodeName(nodeName)]);
  object.traverse((child) => {
    if (names.has(child.name)) {
      child.visible = visible;
    }
  });
}

export function fireBurnSpriteFrameIndex(animationTimeSec: number): number {
  return Math.floor(Math.max(0, animationTimeSec) * FIRE_BURN_SPRITE_FPS) % FIRE_BURN_SPRITE_FRAME_COUNT;
}

export function earthImpactSpriteFrameIndex(animationTimeSec: number): number {
  return Math.min(
    EARTH_IMPACT_SPRITE_FRAME_COUNT - 1,
    Math.floor(Math.max(0, animationTimeSec) * EARTH_IMPACT_SPRITE_FPS),
  );
}

export function spriteSheetFrameUvTransform(
  frameIndex: number,
  columns: number,
  rows: number,
): { repeatX: number; repeatY: number; offsetX: number; offsetY: number } {
  const safeColumns = Math.max(1, Math.floor(columns));
  const safeRows = Math.max(1, Math.floor(rows));
  const frameCount = safeColumns * safeRows;
  const normalizedFrame = ((Math.floor(frameIndex) % frameCount) + frameCount) % frameCount;
  const column = normalizedFrame % safeColumns;
  const row = Math.floor(normalizedFrame / safeColumns);
  const repeatX = 1 / safeColumns;
  const repeatY = 1 / safeRows;
  return {
    repeatX,
    repeatY,
    offsetX: column * repeatX,
    offsetY: 1 - repeatY - row * repeatY,
  };
}

function applyFireBurnSpriteFrame(material: THREE.Material | THREE.Material[], animationTimeSec: number): void {
  const frame = fireBurnSpriteFrameIndex(animationTimeSec);
  applySpriteSheetFrame(material, frame, FIRE_BURN_SPRITE_COLUMNS, FIRE_BURN_SPRITE_ROWS);
}

function applyEarthImpactSpriteFrame(material: THREE.Material | THREE.Material[], animationTimeSec: number): void {
  const frame = earthImpactSpriteFrameIndex(animationTimeSec);
  applySpriteSheetFrame(material, frame, EARTH_IMPACT_SPRITE_COLUMNS, EARTH_IMPACT_SPRITE_ROWS);
}

function applySpriteSheetFrame(
  material: THREE.Material | THREE.Material[],
  frame: number,
  columns: number,
  rows: number,
): void {
  const materials = Array.isArray(material) ? material : [material];
  const uv = spriteSheetFrameUvTransform(frame, columns, rows);

  for (const item of materials) {
    if (!(item instanceof THREE.MeshBasicMaterial) || item.map == null) {
      continue;
    }

    item.map.repeat.set(uv.repeatX, uv.repeatY);
    item.map.offset.set(uv.offsetX, uv.offsetY);
    item.map.needsUpdate = true;
  }
}

export function applyTextureCrop(
  material: THREE.Material | THREE.Material[],
  textureCrop?: WorldObjectTextureCrop,
): void {
  if (textureCrop == null) {
    return;
  }

  const materials = Array.isArray(material) ? material : [material];
  for (const item of materials) {
    if (!(item instanceof THREE.MeshBasicMaterial) || item.map == null) {
      continue;
    }

    item.map.repeat.set(textureCrop.repeatX, textureCrop.repeatY);
    item.map.offset.set(textureCrop.offsetX, textureCrop.offsetY);
    item.map.needsUpdate = true;
  }
}

export function applyMaterialOverrides(
  material: THREE.Material | THREE.Material[],
  tintHex?: string,
  opacity?: number,
  depthTest?: boolean,
): void {
  const materials = Array.isArray(material) ? material : [material];
  for (const item of materials) {
    if (item instanceof THREE.MeshStandardMaterial || item instanceof THREE.MeshBasicMaterial) {
      const original = originalStateForMaterial(item);
      if (tintHex != null) {
        item.color.set(tintHex);
      } else {
        item.color.copy(original.color);
      }
      if (opacity != null) {
        item.opacity = opacity;
        item.transparent = opacity < 1;
      } else {
        item.opacity = original.opacity;
        item.transparent = original.transparent;
      }
      item.depthTest = depthTest ?? original.depthTest;
    }
  }
}

function originalStateForMaterial(material: OverrideableMaterial): {
  color: THREE.Color;
  opacity: number;
  transparent: boolean;
  depthTest: boolean;
} {
  const existing = originalMaterialState.get(material);
  if (existing != null) {
    return existing;
  }

  const original = {
    color: material.color.clone(),
    opacity: material.opacity,
    transparent: material.transparent,
    depthTest: material.depthTest,
  };
  originalMaterialState.set(material, original);
  return original;
}

export function projectileColor(schoolId: ProjectileState['schoolId']): string {
  switch (schoolId) {
    case 'fire':
      return '#ff8a1f';
    case 'ice':
      return '#38d5ff';
    case 'lightning':
      return '#f2c94c';
    case 'earth':
      return '#27ae60';
  }
}

export function projectileParticleColorComponents(
  projectile: Pick<ProjectileState, 'schoolId' | 'effectKind'>,
): readonly [number, number, number] {
  const color = new THREE.Color(projectileColor(projectile.schoolId));
  return [color.r, color.g, color.b];
}

export function projectileMaterialSettings(
  projectile: Pick<ProjectileState, 'schoolId' | 'effectKind'>,
): { color: string; blending: THREE.Blending; transparent: boolean } {
  return {
    color: projectileColor(projectile.schoolId),
    blending: projectile.effectKind === 'bomb' ? THREE.NormalBlending : THREE.NormalBlending,
    transparent: true,
  };
}

export function mageChargeMaterialSettings(
  projectile: Pick<ProjectileState, 'schoolId' | 'effectKind'>,
): { color: string; blending: THREE.Blending; transparent: boolean } {
  return projectileMaterialSettings(projectile);
}

export function isProjectileCastReady(projectile: Pick<ProjectileState, 'castActivationDelaySec'>): boolean {
  return projectile.castActivationDelaySec <= 0;
}

export function isProjectileVisible(projectile: Pick<ProjectileState, 'activationDelaySec' | 'remainingSec'>): boolean {
  return projectile.activationDelaySec <= 0 && projectile.remainingSec > 0;
}

export function resolveProjectileRenderOrigin(
  projectile: ProjectileState,
  mageObject?: THREE.Object3D,
): ProjectileState {
  if (projectile.originKind === 'world') {
    return projectile;
  }

  const particleSourcePosition = resolveMageParticleSourceWorldPosition(mageObject);
  return particleSourcePosition == null
    ? projectile
    : {
        ...projectile,
        from: particleSourcePosition,
      };
}

export function resolveMageParticleSourceWorldPosition(mageObject?: THREE.Object3D): ProjectileState['from'] | null {
  if (mageObject == null) {
    return null;
  }

  const particleSource = mageObject.getObjectByName('particleSource');
  if (particleSource == null) {
    return null;
  }

  mageObject.updateWorldMatrix(true, true);
  particleSource.updateWorldMatrix(true, false);
  const position = particleSource.getWorldPosition(new THREE.Vector3());
  return {
    x: position.x + MAGE_PARTICLE_SOURCE_WORLD_OFFSET.x,
    y: position.y + MAGE_PARTICLE_SOURCE_WORLD_OFFSET.y,
    z: position.z + MAGE_PARTICLE_SOURCE_WORLD_OFFSET.z,
  };
}

export function projectWorldPositionToLogicalHeroStage(
  position: ProjectileState['from'],
  camera: THREE.Camera,
  logicalWidth: number,
  logicalHeight: number,
): { x: number; y: number } | null {
  const projected = new THREE.Vector3(position.x, position.y, position.z).project(camera);
  if (!Number.isFinite(projected.x) || !Number.isFinite(projected.y)) {
    return null;
  }

  return {
    x: ((projected.x + 1) / 2) * logicalWidth,
    y: ((1 - projected.y) / 2) * logicalHeight,
  };
}

export function resolveMageParticleSourceLogicalPosition(
  mageObject: THREE.Object3D | undefined,
  camera: THREE.Camera,
  logicalWidth: number,
  logicalHeight: number,
): { x: number; y: number } | null {
  const position = resolveMageParticleSourceWorldPosition(mageObject);
  return position == null ? null : projectWorldPositionToLogicalHeroStage(position, camera, logicalWidth, logicalHeight);
}

interface ProjectileParticleSystem {
  mesh: THREE.InstancedMesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  texture: THREE.CanvasTexture;
  dummy: THREE.Object3D;
  lightningRay?: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
}

interface MageChargeParticleSystem {
  mesh: THREE.InstancedMesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  texture: THREE.CanvasTexture;
  dummy: THREE.Object3D;
}

export function isProjectileChargeVisible(
  projectile: Pick<ProjectileState, 'castActivationDelaySec' | 'activationDelaySec' | 'chargeDurationSec'>,
): boolean {
  return projectile.castActivationDelaySec <= 0 && projectile.activationDelaySec > 0 && projectile.chargeDurationSec > 0;
}

export function projectileChargeProgress(
  projectile: Pick<ProjectileState, 'activationDelaySec' | 'chargeDurationSec'>,
): number {
  return clamp01(1 - projectile.activationDelaySec / Math.max(0.001, projectile.chargeDurationSec));
}

function createProjectileParticleSystem(
  projectile: ProjectileState,
): ProjectileParticleSystem {
  const particleCount = projectileParticleCount(projectile.effectKind);
  const geometry = new THREE.PlaneGeometry(1, 1);
  const texture = createProjectileParticleTexture();
  const settings = projectileMaterialSettings(projectile);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    color: settings.color,
    transparent: true,
    opacity: 1,
    blending: settings.blending,
    depthWrite: false,
    depthTest: true,
  });
  const mesh = new THREE.InstancedMesh(geometry, material, particleCount);
  mesh.frustumCulled = false;
  mesh.renderOrder = projectile.effectKind === 'bomb' ? 32 : 30;
  return {
    mesh,
    texture,
    dummy: new THREE.Object3D(),
    lightningRay: projectile.schoolId === 'lightning' ? createLightningRayMesh(projectile) : undefined,
  };
}

function createMageChargeParticleSystem(
  projectile: ProjectileState,
): MageChargeParticleSystem {
  const geometry = new THREE.PlaneGeometry(1, 1);
  const texture = createProjectileParticleTexture();
  const settings = mageChargeMaterialSettings(projectile);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    color: settings.color,
    transparent: settings.transparent,
    opacity: 1,
    blending: settings.blending,
    depthWrite: false,
    depthTest: true,
  });
  const mesh = new THREE.InstancedMesh(geometry, material, mageChargeParticleCount(projectile.effectKind));
  mesh.frustumCulled = false;
  mesh.renderOrder = 31;
  return { mesh, texture, dummy: new THREE.Object3D() };
}

function applyProjectileState(
  system: ProjectileParticleSystem,
  projectile: ProjectileState,
  elapsedSec: number,
): void {
  const progress = projectileProgress(projectile);
  const direction = projectileDirection(projectile);
  const spread = projectileSpread(projectile.effectKind, progress);
  const particleScale = projectileQuadScale(projectile.effectKind);
  const settings = projectileMaterialSettings(projectile);

  for (let index = 0; index < system.mesh.count; index += 1) {
    const alongSeed = deterministicUnit(`${projectile.projectileId}:along:${index}`);
    const angleSeed = deterministicUnit(`${projectile.projectileId}:angle:${index}`);
    const radiusSeed = deterministicUnit(`${projectile.projectileId}:radius:${index}`);
    const particleProgress = clamp01(progress * projectileTravelScale(projectile.effectKind) - alongSeed * projectileTrail(projectile.effectKind));
    const eased = easeOutCubic(particleProgress);
    const angle = angleSeed * Math.PI * 2;
    const radius = Math.sqrt(radiusSeed) * Math.sin(particleProgress * Math.PI);
    const horizontalRadius = spread.horizontal * radius;
    const verticalRadius = spread.vertical * radius;
    const x = projectile.from.x + direction.dx * eased + direction.perpX * Math.cos(angle) * horizontalRadius;
    const y =
      projectile.from.y +
      direction.dy * eased +
      direction.perpY * Math.cos(angle) * horizontalRadius +
      Math.sin(angle) * verticalRadius;
    const z = projectile.from.z + direction.dz * eased + Math.sin(angle) * spread.depth * radius;
    const particleSizeMultiplier = 0.75 + radiusSeed * 0.45;
    system.dummy.position.set(x, y, z);
    system.dummy.rotation.set(0, 0, 0);
    system.dummy.scale.set(
      particleScale.x * particleSizeMultiplier,
      particleScale.y * particleSizeMultiplier,
      1,
    );
    system.dummy.updateMatrix();
    system.mesh.setMatrixAt(index, system.dummy.matrix);
  }

  system.mesh.instanceMatrix.needsUpdate = true;
  system.mesh.material.color.set(settings.color);
  system.mesh.material.opacity = projectileOpacity(projectile.effectKind, progress);
  system.mesh.material.blending = settings.blending;
  system.mesh.material.needsUpdate = true;
  applyLightningRayState(system, projectile, progress, elapsedSec);
}

function createLightningRayMesh(projectile: ProjectileState): THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial> {
  const geometry = new THREE.BufferGeometry();
  const material = new THREE.MeshBasicMaterial(lightningRayMaterialSettings(projectile));
  const ray = new THREE.Mesh(geometry, material);
  ray.frustumCulled = false;
  ray.renderOrder = LIGHTNING_RAY_RENDER_ORDER;
  applyLightningRayGeometry(ray, projectile, 0);
  return ray;
}

function applyLightningRayState(
  system: ProjectileParticleSystem,
  projectile: ProjectileState,
  progress: number,
  elapsedSec: number,
): void {
  if (system.lightningRay == null) {
    return;
  }

  applyLightningRayGeometry(system.lightningRay, projectile, elapsedSec);
  system.lightningRay.material.color.set(projectileColor(projectile.schoolId));
  system.lightningRay.material.opacity = projectileOpacity(projectile.effectKind, progress);
  system.lightningRay.material.needsUpdate = true;
}

function applyLightningRayGeometry(
  ray: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>,
  projectile: ProjectileState,
  elapsedSec: number,
): void {
  const geometry = lightningRayRibbonGeometryData(projectile, elapsedSec);
  ray.geometry.setAttribute('position', new THREE.BufferAttribute(geometry.positions, 3));
  ray.geometry.setIndex(geometry.indices);
  ray.geometry.computeVertexNormals();
  ray.geometry.computeBoundingSphere();
}

export function lightningRayThicknessWorldUnits(logicalWidth = LOGICAL_WIDTH): number {
  return (HERO_STAGE_ORTHO_VIEW_WIDTH / logicalWidth) * LIGHTNING_RAY_THICKNESS_PX;
}

export function lightningRayMaterialSettings(
  projectile: Pick<ProjectileState, 'schoolId'>,
): THREE.MeshBasicMaterialParameters {
  return {
    color: projectileColor(projectile.schoolId),
    transparent: true,
    opacity: 0,
    depthWrite: false,
    depthTest: false,
    side: THREE.DoubleSide,
  };
}

export function lightningRayCenterlinePoints(
  projectile: Pick<ProjectileState, 'projectileId' | 'from' | 'to'>,
  elapsedSec = 0,
  segmentCount = LIGHTNING_RAY_SEGMENT_COUNT,
): ProjectileState['from'][] {
  const safeSegmentCount = Math.max(1, Math.floor(segmentCount));
  const dx = projectile.to.x - projectile.from.x;
  const dy = projectile.to.y - projectile.from.y;
  const dz = projectile.to.z - projectile.from.z;
  const planarLength = Math.hypot(dx, dy);
  const perpX = planarLength > 0 ? -dy / planarLength : 1;
  const perpY = planarLength > 0 ? dx / planarLength : 0;
  const points: ProjectileState['from'][] = [];
  const phaseSeed = deterministicUnit(`${projectile.projectileId}:ray:phase`) * Math.PI * 2;

  for (let index = 0; index <= safeSegmentCount; index += 1) {
    const progress = index / safeSegmentCount;
    const endpoint = index === 0 || index === safeSegmentCount;
    const pulse = Math.sin(progress * Math.PI);
    const wave = endpoint
      ? 0
      : Math.sin(progress * LIGHTNING_RAY_WAVE_COUNT * Math.PI * 2 - elapsedSec * LIGHTNING_RAY_WAVE_SPEED + phaseSeed) *
        LIGHTNING_RAY_WAVE_AMPLITUDE *
        pulse;
    const lateralJitter = endpoint
      ? 0
      : (deterministicUnit(`${projectile.projectileId}:ray:lateral:${index}`) - 0.5) * 0.08 * pulse;
    const depthJitter = endpoint
      ? 0
      : (deterministicUnit(`${projectile.projectileId}:ray:depth:${index}`) - 0.5) * 0.04 * pulse;

    points.push({
      x: projectile.from.x + dx * progress + perpX * (wave + lateralJitter),
      y: projectile.from.y + dy * progress + perpY * (wave + lateralJitter),
      z: projectile.from.z + dz * progress + depthJitter,
    });
  }

  return points;
}

export function lightningRayRibbonGeometryData(
  projectile: Pick<ProjectileState, 'projectileId' | 'from' | 'to'>,
  elapsedSec = 0,
  thicknessWorldUnits = lightningRayThicknessWorldUnits(),
  segmentCount = LIGHTNING_RAY_SEGMENT_COUNT,
): { centerline: ProjectileState['from'][]; positions: Float32Array; indices: number[] } {
  const centerline = lightningRayCenterlinePoints(projectile, elapsedSec, segmentCount);
  const positions = new Float32Array(centerline.length * 2 * 3);
  const indices: number[] = [];
  const halfThickness = thicknessWorldUnits / 2;

  centerline.forEach((point, index) => {
    const previous = centerline[Math.max(0, index - 1)];
    const next = centerline[Math.min(centerline.length - 1, index + 1)];
    const tangentX = next.x - previous.x;
    const tangentY = next.y - previous.y;
    const tangentLength = Math.hypot(tangentX, tangentY);
    const normalX = tangentLength > 0 ? -tangentY / tangentLength : 0;
    const normalY = tangentLength > 0 ? tangentX / tangentLength : 1;
    const leftIndex = index * 6;
    const rightIndex = leftIndex + 3;

    positions[leftIndex] = point.x + normalX * halfThickness;
    positions[leftIndex + 1] = point.y + normalY * halfThickness;
    positions[leftIndex + 2] = point.z;
    positions[rightIndex] = point.x - normalX * halfThickness;
    positions[rightIndex + 1] = point.y - normalY * halfThickness;
    positions[rightIndex + 2] = point.z;

    if (index < centerline.length - 1) {
      const base = index * 2;
      indices.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
    }
  });

  return { centerline, positions, indices };
}

function applyMageChargeState(
  system: MageChargeParticleSystem,
  projectile: ProjectileState,
): void {
  const progress = projectileChargeProgress(projectile);
  const pulse = Math.sin(progress * Math.PI);
  const radius = mageChargeRadius(projectile.effectKind, progress);
  const particleScale = mageChargeParticleScale(projectile.effectKind, progress);

  for (let index = 0; index < system.mesh.count; index += 1) {
    const angleSeed = deterministicUnit(`${projectile.projectileId}:charge:angle:${index}`);
    const radiusSeed = deterministicUnit(`${projectile.projectileId}:charge:radius:${index}`);
    const zSeed = deterministicUnit(`${projectile.projectileId}:charge:z:${index}`);
    const angle = angleSeed * Math.PI * 2 + progress * Math.PI * 1.3;
    const distance = Math.sqrt(radiusSeed) * radius * (0.35 + pulse * 0.65);
    const x = projectile.from.x + Math.cos(angle) * distance;
    const y = projectile.from.y + Math.sin(angle) * distance * 0.82;
    const z = projectile.from.z + (zSeed - 0.5) * radius * 0.42;
    const particleSizeMultiplier = 0.75 + radiusSeed * 0.65 + pulse * 0.35;
    system.dummy.position.set(x, y, z);
    system.dummy.rotation.set(0, 0, 0);
    system.dummy.scale.set(
      particleScale.x * particleSizeMultiplier,
      particleScale.y * particleSizeMultiplier,
      1,
    );
    system.dummy.updateMatrix();
    system.mesh.setMatrixAt(index, system.dummy.matrix);
  }

  system.mesh.instanceMatrix.needsUpdate = true;
  const settings = mageChargeMaterialSettings(projectile);
  system.mesh.material.color.set(settings.color);
  system.mesh.material.blending = settings.blending;
  system.mesh.material.opacity = mageChargeOpacity(projectile.effectKind, progress);
  system.mesh.material.needsUpdate = true;
}

function disposeProjectileSystem(system: ProjectileParticleSystem): void {
  system.mesh.geometry.dispose();
  system.mesh.material.dispose();
  system.texture.dispose();
  if (system.lightningRay != null) {
    system.lightningRay.geometry.dispose();
    system.lightningRay.material.dispose();
  }
}

function disposeMageChargeSystem(system: MageChargeParticleSystem): void {
  system.mesh.geometry.dispose();
  system.mesh.material.dispose();
  system.texture.dispose();
}

function projectileParticleCount(effectKind: ProjectileState['effectKind']): number {
  return effectKind === 'bomb' ? 220 : 96;
}

function mageChargeParticleCount(effectKind: ProjectileState['effectKind']): number {
  return effectKind === 'bomb' ? 120 : 72;
}

export function projectileQuadScale(effectKind: ProjectileState['effectKind']): { x: number; y: number } {
  return effectKind === 'bomb'
    ? { x: 0.6, y: 0.78 }
    : { x: 0.27, y: 0.36 };
}

function projectileSpread(
  effectKind: ProjectileState['effectKind'],
  progress: number,
): { horizontal: number; vertical: number; depth: number } {
  const base = (effectKind === 'bomb' ? 0.68 : 0.2) * (0.45 + easeOutCubic(progress) * 0.55);
  return {
    horizontal: base,
    vertical: base * 1.8,
    depth: base * 0.45,
  };
}

function projectileTrail(effectKind: ProjectileState['effectKind']): number {
  return effectKind === 'bomb' ? 0.52 : 0.34;
}

function projectileTravelScale(effectKind: ProjectileState['effectKind']): number {
  return 1 + projectileTrail(effectKind);
}

function projectileOpacity(effectKind: ProjectileState['effectKind'], progress: number): number {
  const fadeIn = clamp01(progress / 0.16);
  const fadeOut = clamp01((1 - progress) / (effectKind === 'bomb' ? 0.32 : 0.42));
  return (effectKind === 'bomb' ? 0.78 : 0.92) * Math.min(fadeIn, fadeOut);
}

function mageChargeRadius(effectKind: ProjectileState['effectKind'], progress: number): number {
  const base = effectKind === 'bomb' ? 0.36 : 0.22;
  return base * (0.7 + easeOutCubic(progress) * 0.65);
}

function mageChargeParticleScale(effectKind: ProjectileState['effectKind'], progress: number): { x: number; y: number } {
  const base = effectKind === 'bomb' ? 0.18 : 0.12;
  const pulse = Math.sin(progress * Math.PI);
  return {
    x: base * (0.85 + pulse * 0.55),
    y: base * (0.85 + pulse * 0.55),
  };
}

function mageChargeOpacity(effectKind: ProjectileState['effectKind'], progress: number): number {
  const fadeIn = clamp01(progress / 0.16);
  const fadeOut = clamp01((1 - progress) / 0.2);
  return (effectKind === 'bomb' ? 0.9 : 0.78) * Math.min(fadeIn, fadeOut);
}

function createProjectileParticleTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (context == null) {
    throw new Error('Unable to create projectile particle texture context.');
  }

  const center = size / 2;
  const gradient = context.createRadialGradient(center, center, 0, center, center, center);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.36, 'rgba(255, 255, 255, 0.82)');
  gradient.addColorStop(0.72, 'rgba(255, 255, 255, 0.22)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function projectileProgress(projectile: ProjectileState): number {
  return clamp01(1 - projectile.remainingSec / Math.max(0.001, projectile.durationSec));
}

function projectileDirection(projectile: ProjectileState): {
  dx: number;
  dy: number;
  dz: number;
  perpX: number;
  perpY: number;
} {
  const dx = projectile.to.x - projectile.from.x;
  const dy = projectile.to.y - projectile.from.y;
  const dz = projectile.to.z - projectile.from.z;
  const planarLength = Math.hypot(dx, dy);
  const perpX = planarLength > 0 ? -dy / planarLength : 1;
  const perpY = planarLength > 0 ? dx / planarLength : 0;
  return { dx, dy, dz, perpX, perpY };
}

function deterministicUnit(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0) / 4294967296;
}

function easeOutCubic(value: number): number {
  return 1 - Math.pow(1 - clamp01(value), 3);
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}
