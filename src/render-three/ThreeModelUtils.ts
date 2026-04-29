import * as THREE from 'three';

export function normalizeModelToActorBounds(source: THREE.Object3D, targetHeight: number): THREE.Group {
  const wrapper = new THREE.Group();
  const model = source.clone(true);
  cloneMeshResources(model);
  wrapper.add(model);

  const initialBox = new THREE.Box3().setFromObject(model);
  const initialSize = initialBox.getSize(new THREE.Vector3());
  const scale = initialSize.y > 0 ? targetHeight / initialSize.y : 1;
  model.scale.multiplyScalar(scale);
  model.updateWorldMatrix(true, true);

  const scaledBox = new THREE.Box3().setFromObject(model);
  const center = scaledBox.getCenter(new THREE.Vector3());
  model.position.x -= center.x;
  model.position.y -= scaledBox.min.y;
  model.position.z -= center.z;
  model.updateWorldMatrix(true, true);

  return wrapper;
}

export function applyFallbackMaterialToUnmaterialedMeshes(object: THREE.Object3D): void {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh && materialMissing(child.material)) {
      child.material = new THREE.MeshStandardMaterial({
        color: '#4b2e83',
        roughness: 0.72,
        metalness: 0.05,
      });
    }
  });
}

function cloneMeshResources(object: THREE.Object3D): void {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry = child.geometry.clone();
      child.material = cloneMaterial(child.material);
    }
  });
}

function cloneMaterial(material: THREE.Material | THREE.Material[]): THREE.Material | THREE.Material[] {
  if (Array.isArray(material)) {
    return material.map((item) => item.clone());
  }

  return material.clone();
}

function materialMissing(material: THREE.Material | THREE.Material[]): boolean {
  if (Array.isArray(material)) {
    return material.length === 0;
  }

  return material == null;
}
