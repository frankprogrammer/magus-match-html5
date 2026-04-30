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
  private readonly projectileCache = new Map<string, THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>>();
  private readonly cameraController = new ThreeCameraController();
  private readonly animationMixers = new Map<string, THREE.AnimationMixer>();
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
    this.syncProjectiles(state.activeProjectiles);
    this.updateAnimationMixers(dtSec);
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
      this.scene.remove(projectile);
      disposeProjectileSystem(projectile);
    }
    this.animationMixers.clear();
    this.objectCache.clear();
    this.projectileCache.clear();
    this.factory.disposeCachedResources();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  private syncCamera(state: HeroWorldState): void {
    this.cameraController.apply(this.camera, state.camera, orthographicAspect(this.camera));
  }

  private syncProjectiles(projectiles: readonly ProjectileState[]): void {
    const seen = new Set<string>();

    for (const projectileState of projectiles) {
      if (!isProjectileVisible(projectileState)) {
        continue;
      }

      const objectId = `projectile-${projectileState.projectileId}`;
      seen.add(objectId);
      const projectile = this.getOrCreateProjectile(objectId, projectileState);
      applyProjectileState(projectile, projectileState);
    }

    for (const [objectId, projectile] of [...this.projectileCache.entries()]) {
      if (!seen.has(objectId)) {
        this.scene.remove(projectile);
        disposeProjectileSystem(projectile);
        this.projectileCache.delete(objectId);
      }
    }
  }

  private getOrCreateProjectile(
    objectId: string,
    projectileState: ProjectileState,
  ): THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial> {
    const existing = this.projectileCache.get(objectId);
    if (existing != null) {
      return existing;
    }

    const projectile = createProjectileParticleSystem(projectileState);
    this.projectileCache.set(objectId, projectile);
    this.scene.add(projectile);
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
        this.animationMixers.delete(objectId);
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
      this.animationMixers.delete(objectState.objectId);
      this.factory.dispose(existing);
      this.objectCache.delete(objectState.objectId);
    }

    const object = this.factory.create(objectState.templateId);
    this.objectCache.set(objectState.objectId, objectState.templateId, templateVersion, object);
    this.attachLoopingAnimation(objectState.objectId, object);
    this.scene.add(object);
    return object;
  }

  private attachLoopingAnimation(objectId: string, object: THREE.Object3D): void {
    const clip = object.animations[0];
    if (clip == null) {
      return;
    }

    const mixer = new THREE.AnimationMixer(object);
    const action = mixer.clipAction(clip);
    action.reset();
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.play();
    this.animationMixers.set(objectId, mixer);
  }

  private updateAnimationMixers(dtSec: number): void {
    const delta = Math.max(0, dtSec);
    for (const mixer of this.animationMixers.values()) {
      mixer.update(delta);
    }
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
      return '#eb5757';
    case 'ice':
      return '#38d5ff';
    case 'lightning':
      return '#f2c94c';
    case 'earth':
      return '#27ae60';
  }
}

function isProjectileVisible(projectile: ProjectileState): boolean {
  return projectile.activationDelaySec <= 0 && projectile.remainingSec > 0;
}

function createProjectileParticleSystem(
  projectile: ProjectileState,
): THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial> {
  const particleCount = projectileParticleCount(projectile.effectKind);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(particleCount * 3), 3));
  const material = new THREE.PointsMaterial({
    color: projectileColor(projectile.schoolId),
    size: projectilePointSize(projectile.effectKind),
    transparent: true,
    opacity: 1,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: false,
  });
  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  points.renderOrder = projectile.effectKind === 'bomb' ? 32 : 30;
  return points;
}

function applyProjectileState(
  points: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>,
  projectile: ProjectileState,
): void {
  const positions = points.geometry.getAttribute('position') as THREE.BufferAttribute;
  const progress = projectileProgress(projectile);
  const direction = projectileDirection(projectile);
  const spread = projectileSpread(projectile.effectKind, progress);

  for (let index = 0; index < positions.count; index += 1) {
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
    positions.setXYZ(index, x, y, z);
  }

  positions.needsUpdate = true;
  points.material.color.set(projectileColor(projectile.schoolId));
  points.material.opacity = projectileOpacity(projectile.effectKind, progress);
  points.material.size = projectilePointSize(projectile.effectKind);
}

function disposeProjectileSystem(points: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>): void {
  points.geometry.dispose();
  points.material.dispose();
}

function projectileParticleCount(effectKind: ProjectileState['effectKind']): number {
  return effectKind === 'bomb' ? 220 : 96;
}

function projectilePointSize(effectKind: ProjectileState['effectKind']): number {
  return effectKind === 'bomb' ? 14 : 7;
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
  return (effectKind === 'bomb' ? 0.98 : 0.86) * Math.min(fadeIn, fadeOut);
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
