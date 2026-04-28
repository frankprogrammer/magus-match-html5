import * as THREE from 'three';
import { HeroStageTemplateIds } from '../world-3d/HeroStageTemplates';

export class ThreeObjectFactory {
  create(templateId: string): THREE.Object3D {
    switch (templateId) {
      case HeroStageTemplateIds.backdropForest:
        return createBackdrop();
      case HeroStageTemplateIds.mage:
        return createMage();
      case HeroStageTemplateIds.princeCage:
        return createPrinceCage();
      case HeroStageTemplateIds.goalFlag:
        return createGoalFlag();
      case HeroStageTemplateIds.pathMarker:
        return createPathMarker();
      case HeroStageTemplateIds.monsterPlaceholder:
        return createMonsterPlaceholder();
      case HeroStageTemplateIds.projectilePlaceholder:
        return createProjectilePlaceholder();
      default:
        return createFallback(templateId);
    }
  }

  dispose(object: THREE.Object3D): void {
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        disposeMaterial(child.material);
      }
      if (child instanceof THREE.LineSegments) {
        child.geometry.dispose();
        disposeMaterial(child.material);
      }
    });
  }
}

function createBackdrop(): THREE.Object3D {
  const geometry = new THREE.PlaneGeometry(1, 1);
  const material = new THREE.MeshBasicMaterial({ color: '#2d2345' });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function createMage(): THREE.Object3D {
  const group = new THREE.Group();
  group.add(mesh(new THREE.CylinderGeometry(0.42, 0.52, 1.1, 18), '#4b2e83', 0, 0.4, 0));
  group.add(mesh(new THREE.SphereGeometry(0.34, 18, 12), '#f5e9c9', 0, 1.12, 0));
  group.add(mesh(new THREE.CylinderGeometry(0.045, 0.045, 1.35, 10), '#c8a24b', 0.48, 0.45, 0.04, Math.PI / 10));
  group.add(mesh(new THREE.ConeGeometry(0.26, 0.34, 4), '#c8a24b', 0, 1.42, 0));
  return group;
}

function createPrinceCage(): THREE.Object3D {
  const group = new THREE.Group();
  const cageGeometry = new THREE.BoxGeometry(1, 1.25, 0.7);
  const edges = new THREE.EdgesGeometry(cageGeometry);
  const cage = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: '#c8a24b' }));
  cage.position.y = 0.45;
  group.add(cage);
  group.add(mesh(new THREE.SphereGeometry(0.22, 16, 10), '#f5e9c9', 0, 0.5, 0));
  group.add(mesh(new THREE.BoxGeometry(0.55, 0.45, 0.25), '#8b6fcb', 0, 0.02, 0));
  return group;
}

function createGoalFlag(): THREE.Object3D {
  const group = new THREE.Group();
  group.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.0, 8), '#f5e9c9', 0, 0.38, 0));
  const flag = mesh(new THREE.PlaneGeometry(0.55, 0.36), '#c8a24b', 0.26, 0.74, 0.02);
  group.add(flag);
  return group;
}

function createPathMarker(): THREE.Object3D {
  return mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.05, 24), '#f5e9c9', 0, 0, 0);
}

function createMonsterPlaceholder(): THREE.Object3D {
  const group = new THREE.Group();
  group.add(mesh(new THREE.CylinderGeometry(0.4, 0.48, 0.8, 14), '#27ae60', 0, 0.32, 0));
  group.add(mesh(new THREE.SphereGeometry(0.3, 14, 10), '#8b6f47', 0, 0.86, 0));
  return group;
}

function createProjectilePlaceholder(): THREE.Object3D {
  return mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.0, 8), '#f2c94c', 0, 0, 0, Math.PI / 2);
}

function createFallback(templateId: string): THREE.Object3D {
  const color = hashColor(templateId);
  return mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), color, 0, 0.35, 0);
}

function mesh(
  geometry: THREE.BufferGeometry,
  color: string,
  x: number,
  y: number,
  z: number,
  rotateZ = 0,
): THREE.Mesh {
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.7,
    metalness: 0.05,
  });
  const result = new THREE.Mesh(geometry, material);
  result.position.set(x, y, z);
  result.rotation.z = rotateZ;
  return result;
}

function disposeMaterial(material: THREE.Material | THREE.Material[]): void {
  if (Array.isArray(material)) {
    for (const item of material) {
      item.dispose();
    }
    return;
  }

  material.dispose();
}

function hashColor(value: string): string {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return `#${(hash & 0xffffff).toString(16).padStart(6, '0')}`;
}
