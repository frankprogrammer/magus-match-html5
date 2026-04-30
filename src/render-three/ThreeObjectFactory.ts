import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { AssetIds } from "../assets/AssetIds";
import { getAssetManifestEntry } from "../assets/AssetManifest";
import { resolveBrowserAssetUrl } from "../platform-browser/BrowserAssetUrl";
import { HeroStageTemplateIds } from "../world-3d/HeroStageTemplates";
import {
  addBoneProxyRig,
  applyMageTextureToMeshes,
  applyFallbackMaterialToUnmaterialedMeshes,
  createMageLoopClip,
  createAlphaBleedCanvasTexture,
  ensureMageMeshesVisibleWithoutOverridingTextures,
  getMageTextureDebugInfo,
  hasRenderableGeometry,
  normalizeModelToActorBounds,
} from "./ThreeModelUtils";

const MAGE_TARGET_HEIGHT = 1.45;
const MAGE_LOOP_START_FRAME = 0;
const MAGE_LOOP_END_FRAME = 60;
export const MAGE_MODEL_Y_ROTATION_RAD = -Math.PI / 2;
export const HERO_BACKDROP_VIEW_WIDTH = 10.8;
export const HERO_BACKDROP_VIEW_HEIGHT = 5;

export class ThreeObjectFactory {
  private mageTemplate: THREE.Group | null = null;
  private mageTemplateVersion = 0;
  private mageLoadStarted = false;
  private mageTexture: THREE.Texture | null = null;
  private mageTextureLoadStarted = false;
  private mageTextureDebugShown = false;
  private mageBoneOnlyWarningShown = false;

  constructor() {
    this.startMageModelLoad();
  }

  create(templateId: string): THREE.Object3D {
    switch (templateId) {
      case HeroStageTemplateIds.backdropForest:
        return createBackdrop();
      case HeroStageTemplateIds.mage:
        return this.createMage();
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
      case HeroStageTemplateIds.healthBarTrack:
        return createHealthBarPlane("#1f1830", 0.85);
      case HeroStageTemplateIds.healthBarFill:
        return createHealthBarPlane("#27ae60", 0.95);
      default:
        return createFallback(templateId);
    }
  }

  getTemplateVersion(templateId: string): number {
    if (templateId === HeroStageTemplateIds.mage) {
      return this.mageTemplateVersion;
    }

    return 0;
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

  disposeCachedResources(): void {
    if (this.mageTemplate != null) {
      this.dispose(this.mageTemplate);
      this.mageTemplate = null;
    }
    this.mageTexture = null;
  }

  private createMage(): THREE.Object3D {
    this.startMageModelLoad();
    if (this.mageTemplate != null) {
      return cloneLoadedMageTemplate(this.mageTemplate);
    }

    return createPlaceholderMage();
  }

  private startMageModelLoad(): void {
    if (this.mageLoadStarted || typeof window === "undefined") {
      return;
    }

    const entry = getAssetManifestEntry(AssetIds.rigs.mage);
    if (entry?.sourceFormat !== "fbx") {
      return;
    }

    this.mageLoadStarted = true;
    const loader = new FBXLoader();
    const mageUrl = resolveBrowserAssetUrl(entry.browserUrl);
    loader.load(
      mageUrl,
      (loaded) => {
        const loadedHadRenderableGeometry = hasRenderableGeometry(loaded);
        if (!loadedHadRenderableGeometry) {
          const proxyAdded = addBoneProxyRig(loaded);
          if (!this.mageBoneOnlyWarningShown) {
            console.warn(
              proxyAdded
                ? `Mage FBX at ${mageUrl} has animation bones but no renderable meshes; using temporary bone proxy visuals.`
                : `Mage FBX at ${mageUrl} has no renderable meshes and no usable bones; keeping placeholder mage.`,
            );
            this.mageBoneOnlyWarningShown = true;
          }

          if (!proxyAdded) {
            return;
          }
        }

        applyFallbackMaterialToUnmaterialedMeshes(loaded);
        ensureMageMeshesVisibleWithoutOverridingTextures(loaded);
        this.mageTemplate = normalizeModelToActorBounds(
          loaded,
          MAGE_TARGET_HEIGHT,
        );
        const mageLoopClip = createMageLoopClip(
          loaded.animations,
          MAGE_LOOP_START_FRAME,
          MAGE_LOOP_END_FRAME,
        );
        this.mageTemplate.animations =
          mageLoopClip != null ? [mageLoopClip] : [];
        if (loadedHadRenderableGeometry) {
          this.applyMageTextureToTemplateIfReady();
          this.startMageTextureLoad();
        }
        this.mageTemplateVersion += 1;
      },
      undefined,
      (error) => {
        console.warn(`Failed to load mage FBX from ${mageUrl}`, error);
      },
    );
  }

  private startMageTextureLoad(): void {
    if (this.mageTextureLoadStarted || typeof window === "undefined") {
      return;
    }

    const entry = getAssetManifestEntry(AssetIds.materials.mageTexture);
    if (entry == null) {
      return;
    }

    this.mageTextureLoadStarted = true;
    const textureUrl = resolveBrowserAssetUrl(entry.browserUrl);
    new THREE.TextureLoader().load(
      textureUrl,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        this.mageTexture = createAlphaBleedCanvasTexture(texture);
        if (import.meta.env.DEV) {
          console.info(
            this.mageTexture === texture
              ? `Skipped mage texture alpha fringe cleanup for ${textureUrl}`
              : `Cleaned mage texture alpha fringe for ${textureUrl}`,
          );
        }
        if (this.applyMageTextureToTemplateIfReady()) {
          this.mageTemplateVersion += 1;
        }
      },
      undefined,
      (error) => {
        console.warn(`Failed to load mage texture from ${textureUrl}`, error);
      },
    );
  }

  private applyMageTextureToTemplateIfReady(): boolean {
    if (this.mageTemplate == null || this.mageTexture == null) {
      return false;
    }

    applyMageTextureToMeshes(this.mageTemplate, this.mageTexture);
    if (!this.mageTextureDebugShown && import.meta.env.DEV) {
      console.info(
        "Applied forced mage texture to FBX meshes:",
        getMageTextureDebugInfo(this.mageTemplate),
      );
      this.mageTextureDebugShown = true;
    }
    return true;
  }
}

function cloneLoadedMageTemplate(template: THREE.Group): THREE.Object3D {
  const clone = normalizeModelToActorBounds(template, MAGE_TARGET_HEIGHT);
  applyMageModelFacingCorrection(clone);
  clone.animations = template.animations;
  return clone;
}

export function applyMageModelFacingCorrection(object: THREE.Object3D): void {
  const modelRoot = object.children[0] ?? object;
  modelRoot.rotation.y = MAGE_MODEL_Y_ROTATION_RAD;
}

function createBackdrop(): THREE.Object3D {
  const group = new THREE.Group();
  const geometry = new THREE.PlaneGeometry(1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: "#2d2345",
    depthWrite: false,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.name = "castle-backdrop-plane";
  plane.renderOrder = -100;
  applyBackdropCoverSize(
    plane,
    HERO_BACKDROP_VIEW_WIDTH / HERO_BACKDROP_VIEW_HEIGHT,
  );
  group.add(plane);
  startCastleBackdropTextureLoad(plane);
  return group;
}

export interface BackdropCoverSize {
  width: number;
  height: number;
  centerY: number;
}

export function backdropCoverSizeForImageAspect(
  imageAspect: number,
): BackdropCoverSize {
  const safeImageAspect =
    Number.isFinite(imageAspect) && imageAspect > 0
      ? imageAspect
      : HERO_BACKDROP_VIEW_WIDTH / HERO_BACKDROP_VIEW_HEIGHT;
  const viewAspect = HERO_BACKDROP_VIEW_WIDTH / HERO_BACKDROP_VIEW_HEIGHT;
  if (safeImageAspect > viewAspect) {
    return {
      width: HERO_BACKDROP_VIEW_HEIGHT * safeImageAspect,
      height: HERO_BACKDROP_VIEW_HEIGHT,
      centerY: 0,
    };
  }

  const height = HERO_BACKDROP_VIEW_WIDTH / safeImageAspect;
  return {
    width: HERO_BACKDROP_VIEW_WIDTH,
    height,
    centerY: HERO_BACKDROP_VIEW_HEIGHT / 2 - height / 2,
  };
}

function applyBackdropCoverSize(
  plane: THREE.Object3D,
  imageAspect: number,
): void {
  const size = backdropCoverSizeForImageAspect(imageAspect);
  plane.scale.set(size.width, size.height, 1);
  plane.position.y = size.centerY;
}

function startCastleBackdropTextureLoad(plane: THREE.Mesh): void {
  if (typeof window === "undefined") {
    return;
  }

  const entry = getAssetManifestEntry(AssetIds.backdrops.castle);
  if (entry == null) {
    return;
  }

  const backdropUrl = resolveBrowserAssetUrl(entry.browserUrl);
  new THREE.TextureLoader().load(
    backdropUrl,
    (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      const image = texture.image as
        | { width?: number; height?: number }
        | undefined;
      const imageAspect =
        image?.width != null && image?.height != null && image.height > 0
          ? image.width / image.height
          : HERO_BACKDROP_VIEW_WIDTH / HERO_BACKDROP_VIEW_HEIGHT;
      applyBackdropCoverSize(plane, imageAspect);
      disposeMaterial(plane.material);
      plane.material = new THREE.MeshBasicMaterial({
        map: texture,
        depthWrite: false,
      });
    },
    undefined,
    (error) => {
      console.warn(
        `Failed to load castle backdrop texture from ${backdropUrl}`,
        error,
      );
    },
  );
}

function createPlaceholderMage(): THREE.Object3D {
  const group = new THREE.Group();
  group.add(
    mesh(new THREE.CylinderGeometry(0.42, 0.52, 1.1, 18), "#4b2e83", 0, 0.4, 0),
  );
  group.add(
    mesh(new THREE.SphereGeometry(0.34, 18, 12), "#f5e9c9", 0, 1.12, 0),
  );
  group.add(
    mesh(
      new THREE.CylinderGeometry(0.045, 0.045, 1.35, 10),
      "#c8a24b",
      0.48,
      0.45,
      0.04,
      Math.PI / 10,
    ),
  );
  group.add(mesh(new THREE.ConeGeometry(0.26, 0.34, 4), "#c8a24b", 0, 1.42, 0));
  return group;
}

function createPrinceCage(): THREE.Object3D {
  const group = new THREE.Group();
  const cageGeometry = new THREE.BoxGeometry(1, 1.25, 0.7);
  const edges = new THREE.EdgesGeometry(cageGeometry);
  const cage = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: "#c8a24b" }),
  );
  cage.position.y = 0.45;
  group.add(cage);
  group.add(mesh(new THREE.SphereGeometry(0.22, 16, 10), "#f5e9c9", 0, 0.5, 0));
  group.add(
    mesh(new THREE.BoxGeometry(0.55, 0.45, 0.25), "#8b6fcb", 0, 0.02, 0),
  );
  return group;
}

function createGoalFlag(): THREE.Object3D {
  const group = new THREE.Group();
  group.add(
    mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 1.0, 8),
      "#f5e9c9",
      0,
      0.38,
      0,
    ),
  );
  const flag = mesh(
    new THREE.PlaneGeometry(0.55, 0.36),
    "#c8a24b",
    0.26,
    0.74,
    0.02,
  );
  group.add(flag);
  return group;
}

function createPathMarker(): THREE.Object3D {
  return mesh(
    new THREE.CylinderGeometry(0.45, 0.45, 0.05, 24),
    "#f5e9c9",
    0,
    0,
    0,
  );
}

function createMonsterPlaceholder(): THREE.Object3D {
  const group = new THREE.Group();
  group.add(
    mesh(new THREE.CylinderGeometry(0.4, 0.48, 0.8, 14), "#27ae60", 0, 0.32, 0),
  );
  group.add(mesh(new THREE.SphereGeometry(0.3, 14, 10), "#8b6f47", 0, 0.86, 0));
  return group;
}

function createProjectilePlaceholder(): THREE.Object3D {
  return mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 1.0, 8),
    "#f2c94c",
    0,
    0,
    0,
    Math.PI / 2,
  );
}

function createHealthBarPlane(color: string, opacity: number): THREE.Object3D {
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: opacity < 1,
    opacity,
    depthWrite: false,
  });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
  plane.renderOrder = 8;
  return plane;
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
      disposeSingleMaterial(item);
    }
    return;
  }

  disposeSingleMaterial(material);
}

function disposeSingleMaterial(material: THREE.Material): void {
  if ("map" in material && material.map instanceof THREE.Texture) {
    material.map.dispose();
  }
  material.dispose();
}

function hashColor(value: string): string {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return `#${(hash & 0xffffff).toString(16).padStart(6, "0")}`;
}
