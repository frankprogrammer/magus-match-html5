import * as THREE from 'three';
import type { HeroWorldState, ProjectileState } from '../world-3d/HeroWorldState';
import { HeroStageTemplateIds } from '../world-3d/HeroStageTemplates';
import type { WorldObjectState } from '../world-3d/WorldObjectState';
import { ThreeCameraController } from './ThreeCameraController';
import { ThreeObjectFactory } from './ThreeObjectFactory';
import { ThreeObjectCache } from './ThreePools';

export class ThreeHeroStage {
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(35, 1080 / 500, 0.1, 100);
  private readonly renderer: THREE.WebGLRenderer;
  private readonly factory = new ThreeObjectFactory();
  private readonly objectCache = new ThreeObjectCache();
  private readonly cameraController = new ThreeCameraController();
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
    this.syncObjects([...state.objects, ...projectilesToObjects(state.activeProjectiles)]);
    this.renderer.render(this.scene, this.camera);
  }

  resize(width: number, height: number): void {
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  dispose(): void {
    for (const [, object] of this.objectCache.entries()) {
      this.scene.remove(object);
      this.factory.dispose(object);
    }
    this.objectCache.clear();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  private syncCamera(state: HeroWorldState): void {
    this.cameraController.apply(this.camera, state.camera, this.camera.aspect);
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
        this.factory.dispose(object);
        this.objectCache.delete(objectId);
      }
    }
  }

  private getOrCreateObject(objectState: WorldObjectState): THREE.Object3D {
    const existing = this.objectCache.get(objectState.objectId);
    if (existing != null && this.objectCache.getTemplateId(objectState.objectId) === objectState.templateId) {
      return existing;
    }

    if (existing != null) {
      this.scene.remove(existing);
      this.factory.dispose(existing);
      this.objectCache.delete(objectState.objectId);
    }

    const object = this.factory.create(objectState.templateId);
    this.objectCache.set(objectState.objectId, objectState.templateId, object);
    this.scene.add(object);
    return object;
  }
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

function projectilesToObjects(projectiles: readonly ProjectileState[]): WorldObjectState[] {
  return projectiles.map((projectile) => ({
    objectId: `projectile-${projectile.projectileId}`,
    templateId: HeroStageTemplateIds.projectilePlaceholder,
    transform: {
      position: {
        x: (projectile.from.x + projectile.to.x) / 2,
        y: (projectile.from.y + projectile.to.y) / 2,
        z: (projectile.from.z + projectile.to.z) / 2,
      },
      rotation: { x: 0, y: 0, z: 0, w: 1 },
      scale: { x: 0.1, y: 0.1, z: 1 },
    },
    visible: projectile.remainingSec > 0,
    lifetime: 'oneShot',
    replication: 'localCosmetic',
    renderLayer: 'heroStage',
    renderOrder: 10,
  }));
}
