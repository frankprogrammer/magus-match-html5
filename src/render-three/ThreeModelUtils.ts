import * as THREE from 'three';
import { clone as cloneSkeletonObject } from 'three/examples/jsm/utils/SkeletonUtils.js';

const UNIT_Y = new THREE.Vector3(0, 1, 0);

export function normalizeModelToActorBounds(source: THREE.Object3D, targetHeight: number): THREE.Group {
  const wrapper = new THREE.Group();
  const model = cloneSkeletonObject(source);
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

export function hasRenderableGeometry(object: THREE.Object3D): boolean {
  let found = false;
  object.traverse((child) => {
    if (child instanceof THREE.Mesh && child.geometry != null) {
      found = true;
    }
  });
  return found;
}

export function addBoneProxyRig(object: THREE.Object3D): boolean {
  const bones = new Map<string, THREE.Bone>();
  object.traverse((child) => {
    if (child instanceof THREE.Bone) {
      bones.set(child.name, child);
    }
  });

  if (bones.size === 0) {
    return false;
  }

  let proxyCount = 0;
  for (const bone of bones.values()) {
    for (const child of bone.children) {
      if (child instanceof THREE.Bone) {
        proxyCount += addBoneSegment(bone, child) ? 1 : 0;
      }
    }
  }

  proxyCount += addBoneSphere(bones.get('hips'), 0.05, '#4b2e83') ? 1 : 0;
  proxyCount += addBoneSphere(bones.get('chest'), 0.065, '#4b2e83') ? 1 : 0;
  proxyCount += addBoneSphere(bones.get('head'), 0.06, '#f5e9c9') ? 1 : 0;
  proxyCount += addBoneSphere(bones.get('hand_l'), 0.028, '#f5e9c9') ? 1 : 0;
  proxyCount += addBoneSphere(bones.get('hand_r'), 0.028, '#f5e9c9') ? 1 : 0;
  proxyCount += addBoneSphere(bones.get('staff_l'), 0.025, '#c8a24b') ? 1 : 0;
  proxyCount += addShieldProxy(bones.get('shield')) ? 1 : 0;

  return proxyCount > 0;
}

export function createMageLoopClip(
  clips: readonly THREE.AnimationClip[],
  startFrame: number,
  endFrame: number,
): THREE.AnimationClip | null {
  const sourceClip = clips.find((clip) => clip.duration > 0 && clip.tracks.length > 0);
  if (sourceClip == null) {
    return null;
  }

  const fps = inferFrameRateForInclusiveFrameRange(sourceClip.duration, startFrame, endFrame);
  return THREE.AnimationUtils.subclip(
    sourceClip,
    `mage-loop-frames-${startFrame}-${endFrame}`,
    startFrame,
    endFrame + 1,
    fps,
  );
}

export function inferFrameRateForInclusiveFrameRange(
  durationSec: number,
  startFrame: number,
  endFrame: number,
): number {
  const frameSpan = Math.max(1, endFrame - startFrame);
  return durationSec > 0 ? frameSpan / durationSec : 24;
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

export function ensureMageMeshesVisibleWithoutOverridingTextures(object: THREE.Object3D): void {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) {
      return;
    }

    if (materialMissing(child.material)) {
      child.material = createMageFallbackMaterial();
    }

    for (const material of materialsForMesh(child)) {
      material.side = THREE.DoubleSide;
      material.transparent = false;
      material.opacity = 1;
      material.depthWrite = true;
      material.needsUpdate = true;
    }
    child.visible = true;
  });
}

export function applyMageTextureToMeshes(object: THREE.Object3D, texture: THREE.Texture): void {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) {
      return;
    }

    const hasUv = meshHasUv(child);
    const updatedMaterials = materialMissing(child.material)
      ? [hasUv ? materialWithTexture(texture) : createMageFallbackMaterial()]
      : materialsForMesh(child).map((material) => (hasUv ? materialWithTexture(texture) : visibleMaterial(material)));
    child.material = updatedMaterials.length === 1 ? updatedMaterials[0] : updatedMaterials;
    child.visible = true;
  });
}

export interface MageTextureDebugInfo {
  meshName: string;
  hasUv: boolean;
  materialCount: number;
  textureStatus: 'applied' | 'skipped-no-uv';
  materialTypes: string[];
}

export function getMageTextureDebugInfo(object: THREE.Object3D): MageTextureDebugInfo[] {
  const info: MageTextureDebugInfo[] = [];
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) {
      return;
    }

    info.push({
      meshName: child.name || '(unnamed mesh)',
      hasUv: meshHasUv(child),
      materialCount: materialsForMesh(child).length,
      textureStatus: meshHasUv(child) ? 'applied' : 'skipped-no-uv',
      materialTypes: materialsForMesh(child).map((material) => material.type),
    });
  });
  return info;
}

function createMageFallbackMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: '#8b6fcb',
    roughness: 0.66,
    metalness: 0.08,
    side: THREE.DoubleSide,
    transparent: false,
    opacity: 1,
    depthWrite: true,
  });
}

function materialWithTexture(texture: THREE.Texture): THREE.Material {
  return new THREE.MeshBasicMaterial({
    map: texture,
    color: '#ffffff',
    side: THREE.DoubleSide,
    transparent: false,
    alphaTest: 0.08,
    opacity: 1,
    depthWrite: true,
  });
}

function visibleMaterial(material: THREE.Material): THREE.Material {
  material.side = THREE.DoubleSide;
  material.transparent = false;
  material.opacity = 1;
  material.depthWrite = true;
  material.needsUpdate = true;
  return material;
}

function meshHasUv(mesh: THREE.Mesh): boolean {
  return mesh.geometry.getAttribute('uv') != null;
}

function materialsForMesh(mesh: THREE.Mesh): THREE.Material[] {
  return Array.isArray(mesh.material) ? mesh.material : [mesh.material];
}

function addBoneSegment(bone: THREE.Bone, child: THREE.Bone): boolean {
  const offset = child.position.clone();
  const length = offset.length();
  if (length < 0.015) {
    return false;
  }

  const radius = radiusForBone(bone.name);
  const segment = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, length, 8),
    materialForBone(bone.name),
  );
  segment.name = `proxy-segment-${bone.name}-${child.name}`;
  segment.position.copy(offset).multiplyScalar(0.5);
  segment.quaternion.setFromUnitVectors(UNIT_Y, offset.clone().normalize());
  bone.add(segment);
  return true;
}

function addBoneSphere(bone: THREE.Bone | undefined, radius: number, color: string): boolean {
  if (bone == null) {
    return false;
  }

  const sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, 12, 8), proxyMaterial(color));
  sphere.name = `proxy-sphere-${bone.name}`;
  bone.add(sphere);
  return true;
}

function addShieldProxy(bone: THREE.Bone | undefined): boolean {
  if (bone == null) {
    return false;
  }

  const shield = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.12, 0.018), proxyMaterial('#c8a24b'));
  shield.name = `proxy-shield-${bone.name}`;
  shield.position.y = 0.04;
  bone.add(shield);
  return true;
}

function radiusForBone(name: string): number {
  if (name.includes('staff') || name.includes('hair') || name.endsWith('_end')) {
    return 0.01;
  }

  if (name.includes('chest') || name.includes('hips') || name.includes('neck')) {
    return 0.026;
  }

  if (name.includes('pauldron') || name.includes('shield')) {
    return 0.02;
  }

  return 0.017;
}

function materialForBone(name: string): THREE.Material {
  if (name.includes('head') || name.includes('hand') || name.includes('neck')) {
    return proxyMaterial('#f5e9c9');
  }

  if (name.includes('staff') || name.includes('shield') || name.includes('pauldron')) {
    return proxyMaterial('#c8a24b');
  }

  return proxyMaterial('#4b2e83');
}

function proxyMaterial(color: string): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.68,
    metalness: color === '#c8a24b' ? 0.18 : 0.04,
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
    return material.map((item) => cloneMaterial(item) as THREE.Material);
  }

  const cloned = material.clone();
  const sourceTexture = (material as THREE.Material & { map?: THREE.Texture | null }).map;
  if (sourceTexture instanceof THREE.Texture && 'map' in cloned) {
    const clonedTexture = sourceTexture.clone();
    clonedTexture.needsUpdate = true;
    (cloned as THREE.Material & { map?: THREE.Texture | null }).map = clonedTexture;
  }
  return cloned;
}

function materialMissing(material: THREE.Material | THREE.Material[]): boolean {
  if (Array.isArray(material)) {
    return material.length === 0;
  }

  return material == null;
}
