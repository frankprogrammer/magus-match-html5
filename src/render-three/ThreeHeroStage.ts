import * as THREE from 'three';
import type { HeroWorldState, ProjectileState } from '../world-3d/HeroWorldState';
import type { WorldObjectState } from '../world-3d/WorldObjectState';
import { orthographicBoundsForAspect, ThreeCameraController } from './ThreeCameraController';
import { ThreeObjectFactory } from './ThreeObjectFactory';
import { ThreeObjectCache } from './ThreePools';

export class ThreeHeroStage {
  private readonly scene = new THREE.Scene();
  private readonly camera = createHeroStageCamera(1080 / 500);
  private readonly renderer: THREE.WebGLRenderer;
  private readonly factory = new ThreeObjectFactory();
  private readonly objectCache = new ThreeObjectCache();
  private readonly projectileCache = new Map<string, ProjectileParticleSystem>();
  private readonly cameraController = new ThreeCameraController();
  private readonly animationControllers = new Map<string, MageAnimationController>();
  private readonly castTriggeredProjectileIds = new Set<string>();
  private elapsedSec = 0;

  constructor(private readonly container: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(1080, 500, false);
    this.renderer.domElement.className = 'hero-stage-canvas';
    this.container.appendChild(this.renderer.domElement);

    this.scene.background = new THREE.Color('#20172f');
    this.scene.add(new THREE.AmbientLight('#ffffff', 1.5));
    const keyLight = new THREE.DirectionalLight('#fff4d6', 1.2);
    keyLight.position.set(3, 4, 5);
    this.scene.add(keyLight);
  }

  render(state: HeroWorldState, dtSec: number): void {
    this.elapsedSec += Math.max(0, dtSec);
    this.syncCamera(state);
    this.syncObjects(state.objects);
    this.syncProjectileCastTriggers(state.activeProjectiles);
    this.updateAnimationMixers(dtSec);
    this.syncProjectiles(state.activeProjectiles);
    this.renderer.render(this.scene, this.camera);
  }

  resize(width: number, height: number): void {
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height, false);
    applyOrthographicAspect(this.camera, width / height);
    this.camera.updateProjectionMatrix();
  }

  dispose(): void {
    for (const [, object] of this.objectCache.entries()) {
      this.scene.remove(object);
      this.factory.dispose(object);
    }
    for (const [, projectile] of this.projectileCache.entries()) {
      this.scene.remove(projectile.mesh);
      disposeProjectileSystem(projectile);
    }
    this.animationControllers.clear();
    this.castTriggeredProjectileIds.clear();
    this.objectCache.clear();
    this.projectileCache.clear();
    this.factory.disposeCachedResources();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  private syncCamera(state: HeroWorldState): void {
    this.cameraController.apply(this.camera, state.camera, orthographicAspect(this.camera));
  }

  private syncProjectileCastTriggers(projectiles: readonly ProjectileState[]): void {
    const activeProjectileIds = new Set<string>();

    for (const projectileState of projectiles) {
      activeProjectileIds.add(projectileState.projectileId);
      if (!isProjectileCastReady(projectileState) || this.castTriggeredProjectileIds.has(projectileState.projectileId)) {
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
      applyProjectileState(projectile, renderProjectileState);
    }

    for (const [objectId, projectile] of [...this.projectileCache.entries()]) {
      if (!seen.has(objectId)) {
        this.scene.remove(projectile.mesh);
        disposeProjectileSystem(projectile);
        this.projectileCache.delete(objectId);
      }
    }
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
    this.scene.add(projectile.mesh);
    return projectile;
  }

  private syncObjects(objects: readonly WorldObjectState[]): void {
    const seen = new Set<string>();

    for (const objectState of objects) {
      seen.add(objectState.objectId);
      const object = this.getOrCreateObject(objectState);
      applyWorldObjectState(object, objectState, this.elapsedSec);
    }

    for (const [objectId, object] of [...this.objectCache.entries()]) {
      if (!seen.has(objectId)) {
        this.scene.remove(object);
        this.animationControllers.delete(objectId);
        this.factory.dispose(object);
        this.objectCache.delete(objectId);
      }
    }
  }

  private getOrCreateObject(objectState: WorldObjectState): THREE.Object3D {
    const existing = this.objectCache.get(objectState.objectId);
    const templateVersion = this.factory.getTemplateVersion(objectState.templateId);
    if (
      existing != null &&
      this.objectCache.getTemplateId(objectState.objectId) === objectState.templateId &&
      this.objectCache.getTemplateVersion(objectState.objectId) === templateVersion
    ) {
      return existing;
    }

    if (existing != null) {
      this.scene.remove(existing);
      this.animationControllers.delete(objectState.objectId);
      this.factory.dispose(existing);
      this.objectCache.delete(objectState.objectId);
    }

    const object = this.factory.create(objectState.templateId);
    this.objectCache.set(objectState.objectId, objectState.templateId, templateVersion, object);
    this.attachAnimationController(objectState.objectId, object);
    this.scene.add(object);
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
  castAction?: THREE.AnimationAction;
  castDurationSec: number;
  castRemainingSec: number;
}

export function createMageAnimationController(object: THREE.Object3D): MageAnimationController | null {
  const idleClip = object.animations.find((clip) => clip.name === 'idle') ?? object.animations[0];
  const castClip = object.animations.find((clip) => clip.name === 'cast');
  if (idleClip == null && castClip == null) {
    return null;
  }

  const mixer = new THREE.AnimationMixer(object);
  const idleAction = idleClip == null ? undefined : mixer.clipAction(idleClip);
  if (idleAction != null) {
    idleAction.reset();
    idleAction.setLoop(THREE.LoopRepeat, Infinity);
    idleAction.setEffectiveWeight(1);
    idleAction.play();
  }

  const castAction = castClip == null ? undefined : mixer.clipAction(castClip);
  if (castAction != null) {
    castAction.setLoop(THREE.LoopOnce, 1);
    castAction.clampWhenFinished = false;
    castAction.setEffectiveWeight(0);
  }

  return {
    mixer,
    idleAction,
    castAction,
    castDurationSec: castClip?.duration ?? 0,
    castRemainingSec: 0,
  };
}

export function triggerMageCastAnimation(controller: MageAnimationController): void {
  if (controller.castAction == null || controller.castDurationSec <= 0) {
    return;
  }

  if (controller.idleAction != null) {
    controller.idleAction.enabled = true;
    controller.idleAction.setEffectiveWeight(0);
  }

  controller.castAction.reset();
  controller.castAction.setLoop(THREE.LoopOnce, 1);
  controller.castAction.clampWhenFinished = false;
  controller.castAction.enabled = true;
  controller.castAction.setEffectiveWeight(1);
  controller.castAction.play();
  controller.castRemainingSec = controller.castDurationSec;
}

export function updateMageAnimationController(controller: MageAnimationController, dtSec: number): void {
  const delta = Math.max(0, dtSec);
  controller.mixer.update(delta);

  if (controller.castRemainingSec <= 0) {
    return;
  }

  controller.castRemainingSec = Math.max(0, controller.castRemainingSec - delta);
  if (controller.castRemainingSec <= 0) {
    stopMageCastAnimation(controller);
  }
}

function stopMageCastAnimation(controller: MageAnimationController): void {
  if (controller.castAction != null) {
    controller.castAction.stop();
    controller.castAction.setEffectiveWeight(0);
  }

  if (controller.idleAction != null) {
    controller.idleAction.enabled = true;
    controller.idleAction.setEffectiveWeight(1);
    controller.idleAction.play();
  }
}

function createHeroStageCamera(aspect: number): THREE.OrthographicCamera {
  const bounds = orthographicBoundsForAspect(aspect);
  return new THREE.OrthographicCamera(bounds.left, bounds.right, bounds.top, bounds.bottom, 0.1, 100);
}

function applyOrthographicAspect(camera: THREE.OrthographicCamera, aspect: number): void {
  const bounds = orthographicBoundsForAspect(aspect);
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
      if (objectState.opacity != null || objectState.tintHex != null) {
        applyMaterialOverrides(child.material, objectState.tintHex, objectState.opacity);
      }
    }
  });
}

function applyMaterialOverrides(
  material: THREE.Material | THREE.Material[],
  tintHex?: string,
  opacity?: number,
): void {
  const materials = Array.isArray(material) ? material : [material];
  for (const item of materials) {
    if (item instanceof THREE.MeshStandardMaterial || item instanceof THREE.MeshBasicMaterial) {
      if (tintHex != null) {
        item.color.set(tintHex);
      }
      if (opacity != null) {
        item.opacity = opacity;
        item.transparent = opacity < 1;
      }
    }
  }
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
    x: position.x,
    y: position.y,
    z: position.z,
  };
}

interface ProjectileParticleSystem {
  mesh: THREE.InstancedMesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  texture: THREE.CanvasTexture;
  dummy: THREE.Object3D;
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
  return { mesh, texture, dummy: new THREE.Object3D() };
}

function applyProjectileState(
  system: ProjectileParticleSystem,
  projectile: ProjectileState,
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
}

function disposeProjectileSystem(system: ProjectileParticleSystem): void {
  system.mesh.geometry.dispose();
  system.mesh.material.dispose();
  system.texture.dispose();
}

function projectileParticleCount(effectKind: ProjectileState['effectKind']): number {
  return effectKind === 'bomb' ? 220 : 96;
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
