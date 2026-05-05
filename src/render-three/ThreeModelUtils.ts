import * as THREE from 'three';
import { clone as cloneSkeletonObject } from 'three/examples/jsm/utils/SkeletonUtils.js';

const UNIT_Y = new THREE.Vector3(0, 1, 0);
const MAGE_TEXTURE_ALPHA_TEST = 0.01;
const MAGE_IDLE_CLIP_NAME = 'Armature|Idle';
const MAGE_CAST_CLIP_NAME = 'Armature|Cast';
const KOBOLD_WALK_CLIP_NAME = 'Kobold Walk';
const KOBOLD_DEFEAT_CLIP_NAME = 'Kobold Defeat';

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

export function createMageAnimationClips(
  clips: readonly THREE.AnimationClip[],
  fallbackStartFrame: number,
  fallbackEndFrame: number,
): THREE.AnimationClip[] {
  const idleClip = findUsableClipByName(clips, MAGE_IDLE_CLIP_NAME, 'idle');
  const castClip = findUsableClipByName(clips, MAGE_CAST_CLIP_NAME, 'cast');
  const result: THREE.AnimationClip[] = [];

  if (idleClip != null) {
    result.push(cloneClipWithName(idleClip, 'idle'));
  } else {
    const fallbackIdle = createMageLoopClip(clips, fallbackStartFrame, fallbackEndFrame);
    if (fallbackIdle != null) {
      result.push(cloneClipWithName(fallbackIdle, 'idle'));
    }
  }

  if (castClip != null) {
    result.push(cloneClipWithName(castClip, 'cast'));
  }

  return result;
}

export function createKoboldAnimationClips(clips: readonly THREE.AnimationClip[]): THREE.AnimationClip[] {
  const walkClip = findUsableClipByName(clips, KOBOLD_WALK_CLIP_NAME, 'kobold walk');
  const defeatClip = findUsableClipByName(clips, KOBOLD_DEFEAT_CLIP_NAME, 'kobold defeat');
  const result: THREE.AnimationClip[] = [];

  if (walkClip != null) {
    result.push(cloneClipWithName(walkClip, 'walk'));
  }

  if (defeatClip != null) {
    result.push(cloneClipWithName(defeatClip, 'defeat'));
  }

  return result;
}

export function inferFrameRateForInclusiveFrameRange(
  durationSec: number,
  startFrame: number,
  endFrame: number,
): number {
  const frameSpan = Math.max(1, endFrame - startFrame);
  return durationSec > 0 ? frameSpan / durationSec : 24;
}

function isUsableClip(clip: THREE.AnimationClip): boolean {
  return clip.duration > 0 && clip.tracks.length > 0;
}

function findUsableClipByName(
  clips: readonly THREE.AnimationClip[],
  exactName: string,
  shortName: string,
): THREE.AnimationClip | undefined {
  const exactNormalized = exactName.trim().toLowerCase();
  const shortNormalized = shortName.trim().toLowerCase();
  return clips.find((clip) => {
    const clipName = clip.name.trim().toLowerCase();
    return (
      isUsableClip(clip) &&
      (clipName === exactNormalized ||
        clipName.endsWith(`|${shortNormalized}`) ||
        clipName.endsWith(shortNormalized))
    );
  });
}

function cloneClipWithName(clip: THREE.AnimationClip, name: string): THREE.AnimationClip {
  const cloned = clip.clone();
  cloned.name = name;
  return cloned;
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

export function createAlphaBleedCanvasTexture(texture: THREE.Texture): THREE.Texture {
  if (typeof document === 'undefined') {
    return texture;
  }

  const image = texture.image as CanvasImageSource & {
    width?: number;
    height?: number;
    naturalWidth?: number;
    naturalHeight?: number;
    videoWidth?: number;
    videoHeight?: number;
  };
  const width = image.width ?? image.naturalWidth ?? image.videoWidth ?? 0;
  const height = image.height ?? image.naturalHeight ?? image.videoHeight ?? 0;
  if (width <= 0 || height <= 0) {
    return texture;
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (context == null) {
    return texture;
  }

  context.drawImage(image, 0, 0, width, height);
  const imageData = context.getImageData(0, 0, width, height);
  const cleanedData = bleedTransparentPixelRgb(imageData.data, width, height);
  imageData.data.set(cleanedData);
  context.putImageData(imageData, 0, 0);

  const cleanedTexture = new THREE.CanvasTexture(canvas);
  cleanedTexture.colorSpace = THREE.SRGBColorSpace;
  cleanedTexture.flipY = texture.flipY;
  cleanedTexture.wrapS = texture.wrapS;
  cleanedTexture.wrapT = texture.wrapT;
  cleanedTexture.minFilter = texture.minFilter;
  cleanedTexture.magFilter = texture.magFilter;
  cleanedTexture.generateMipmaps = texture.generateMipmaps;
  cleanedTexture.needsUpdate = true;
  return cleanedTexture;
}

export function bleedTransparentPixelRgb(
  source: Uint8ClampedArray,
  width: number,
  height: number,
  options: {
    iterations?: number;
    targetAlphaMax?: number;
    sourceAlphaMin?: number;
  } = {},
): Uint8ClampedArray {
  const iterations = options.iterations ?? 8;
  const targetAlphaMax = options.targetAlphaMax ?? 16;
  const sourceAlphaMin = options.sourceAlphaMin ?? 24;
  const result = new Uint8ClampedArray(source);
  let hasBleedColor = new Uint8Array(width * height);

  for (let index = 0; index < width * height; index += 1) {
    hasBleedColor[index] = source[index * 4 + 3] >= sourceAlphaMin ? 1 : 0;
  }

  for (let iteration = 0; iteration < iterations; iteration += 1) {
    const next = new Uint8ClampedArray(result);
    const nextHasBleedColor = new Uint8Array(hasBleedColor);
    let changed = false;

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const index = y * width + x;
        const base = index * 4;
        if (hasBleedColor[index] !== 0 || source[base + 3] > targetAlphaMax) {
          continue;
        }

        let red = 0;
        let green = 0;
        let blue = 0;
        let count = 0;
        for (let dy = -1; dy <= 1; dy += 1) {
          for (let dx = -1; dx <= 1; dx += 1) {
            if (dx === 0 && dy === 0) {
              continue;
            }

            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || nx >= width || ny < 0 || ny >= height) {
              continue;
            }

            const neighborIndex = ny * width + nx;
            if (hasBleedColor[neighborIndex] === 0) {
              continue;
            }

            const neighborBase = neighborIndex * 4;
            red += result[neighborBase];
            green += result[neighborBase + 1];
            blue += result[neighborBase + 2];
            count += 1;
          }
        }

        if (count > 0) {
          next[base] = Math.round(red / count);
          next[base + 1] = Math.round(green / count);
          next[base + 2] = Math.round(blue / count);
          nextHasBleedColor[index] = 1;
          changed = true;
        }
      }
    }

    result.set(next);
    hasBleedColor = nextHasBleedColor;
    if (!changed) {
      break;
    }
  }

  return result;
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
    transparent: true,
    alphaTest: MAGE_TEXTURE_ALPHA_TEST,
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
