import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { AssetIds } from "../assets/AssetIds";
import { getAssetManifestEntry } from "../assets/AssetManifest";
import { HERO_STAGE_HEIGHT, LOGICAL_WIDTH } from "../core/Layout";
import { resolveBrowserAssetUrl } from "../platform-browser/BrowserAssetUrl";
import { HeroStageTemplateIds } from "../world-3d/HeroStageTemplates";
import {
  addBoneProxyRig,
  applyMageTextureToMeshes,
  applyFallbackMaterialToUnmaterialedMeshes,
  createKoboldAnimationClips,
  createMageAnimationClips,
  createAlphaBleedCanvasTexture,
  ensureMageMeshesVisibleWithoutOverridingTextures,
  getMageTextureDebugInfo,
  hasRenderableGeometry,
  normalizeModelToActorBounds,
} from "./ThreeModelUtils";

const MAGE_TARGET_HEIGHT = 1.45;
const KOBOLD_TARGET_HEIGHT = 1.16;
const MAGE_LOOP_START_FRAME = 0;
const MAGE_LOOP_END_FRAME = 60;
export const MAGE_MODEL_Y_ROTATION_RAD = -Math.PI / 2;
export const KOBOLD_MODEL_Y_ROTATION_RAD = -Math.PI / 2;
export const HERO_BACKDROP_VIEW_WIDTH = 10.8;
export const HERO_BACKDROP_VIEW_HEIGHT =
  HERO_BACKDROP_VIEW_WIDTH / (LOGICAL_WIDTH / HERO_STAGE_HEIGHT);

export class ThreeObjectFactory {
  private mageTemplate: THREE.Group | null = null;
  private pendingMageTemplate: THREE.Group | null = null;
  private mageTemplateVersion = 0;
  private mageLoadStarted = false;
  private mageTexture: THREE.Texture | null = null;
  private mageTextureLoadStarted = false;
  private mageTextureDebugShown = false;
  private mageBoneOnlyWarningShown = false;
  private koboldTemplate: THREE.Group | null = null;
  private pendingKoboldTemplate: THREE.Group | null = null;
  private koboldTemplateVersion = 0;
  private koboldLoadStarted = false;
  private koboldTexture: THREE.Texture | null = null;
  private koboldTextureLoadStarted = false;
  private koboldTextureDebugShown = false;
  private koboldBoneOnlyWarningShown = false;
  private bossTemplate: THREE.Group | null = null;
  private pendingBossTemplate: THREE.Group | null = null;
  private bossTemplateVersion = 0;
  private bossLoadStarted = false;
  private bossTexture: THREE.Texture | null = null;
  private bossTextureLoadStarted = false;
  private bossTextureDebugShown = false;
  private bossBoneOnlyWarningShown = false;

  constructor() {
    this.startMageModelLoad();
    this.startKoboldModelLoad();
    this.startBossModelLoad();
  }

  create(templateId: string, backdropTextureId?: string): THREE.Object3D {
    switch (templateId) {
      case HeroStageTemplateIds.backdropForest:
        return createBackdrop(backdropTextureId ?? AssetIds.backdrops.castle);
      case HeroStageTemplateIds.mage:
        return this.createMage();
      case HeroStageTemplateIds.princeCage:
        return createPrinceCage();
      case HeroStageTemplateIds.goalFlag:
        return createGoalFlag();
      case HeroStageTemplateIds.pathMarker:
        return createPathMarker();
      case HeroStageTemplateIds.monsterPlaceholder:
        return this.createKobold();
      case HeroStageTemplateIds.miniBoss:
        return this.createBoss();
      case HeroStageTemplateIds.projectilePlaceholder:
        return createProjectilePlaceholder();
      case HeroStageTemplateIds.fireBurn:
        return createFireBurnSprite();
      case HeroStageTemplateIds.earthImpact:
        return createEarthImpactSprite();
      case HeroStageTemplateIds.healthBarTrack:
        return createHealthBarPlane("#1f1830", 0.85);
      case HeroStageTemplateIds.healthBarFill:
        return createHealthBarPlane("#27ae60", 0.95);
      default:
        return createFallback(templateId);
    }
  }

  getTemplateVersion(templateId: string, backdropTextureId?: string): number {
    if (templateId === HeroStageTemplateIds.backdropForest) {
      return hashBackdropAssetId(backdropTextureId ?? AssetIds.backdrops.castle);
    }

    if (templateId === HeroStageTemplateIds.mage) {
      return this.mageTemplateVersion;
    }

    if (templateId === HeroStageTemplateIds.monsterPlaceholder) {
      return this.koboldTemplateVersion;
    }

    if (templateId === HeroStageTemplateIds.miniBoss) {
      return this.bossTemplateVersion;
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
    if (this.pendingMageTemplate != null) {
      this.dispose(this.pendingMageTemplate);
      this.pendingMageTemplate = null;
    }
    this.mageTexture = null;
    if (this.koboldTemplate != null) {
      this.dispose(this.koboldTemplate);
      this.koboldTemplate = null;
    }
    if (this.pendingKoboldTemplate != null) {
      this.dispose(this.pendingKoboldTemplate);
      this.pendingKoboldTemplate = null;
    }
    this.koboldTexture = null;
    if (this.bossTemplate != null) {
      this.dispose(this.bossTemplate);
      this.bossTemplate = null;
    }
    if (this.pendingBossTemplate != null) {
      this.dispose(this.pendingBossTemplate);
      this.pendingBossTemplate = null;
    }
    this.bossTexture = null;
  }

  private createMage(): THREE.Object3D {
    this.startMageModelLoad();
    if (this.mageTemplate != null) {
      return cloneLoadedMageTemplate(this.mageTemplate);
    }

    return new THREE.Group();
  }

  private createKobold(): THREE.Object3D {
    this.startKoboldModelLoad();
    if (this.koboldTemplate != null) {
      return cloneLoadedKoboldTemplate(this.koboldTemplate);
    }

    return new THREE.Group();
  }

  private createBoss(): THREE.Object3D {
    this.startBossModelLoad();
    if (this.bossTemplate != null) {
      return cloneLoadedBossTemplate(this.bossTemplate);
    }

    return new THREE.Group();
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
        this.pendingMageTemplate = normalizeModelToActorBounds(
          loaded,
          MAGE_TARGET_HEIGHT,
        );
        this.pendingMageTemplate.animations = createMageAnimationClips(
          loaded.animations,
          MAGE_LOOP_START_FRAME,
          MAGE_LOOP_END_FRAME,
        );
        if (loadedHadRenderableGeometry) {
          this.publishMageTemplateIfTextureReady();
          this.startMageTextureLoad();
        }
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
        this.publishMageTemplateIfTextureReady();
      },
      undefined,
      (error) => {
        console.warn(`Failed to load mage texture from ${textureUrl}`, error);
      },
    );
  }

  private publishMageTemplateIfTextureReady(): boolean {
    if (this.pendingMageTemplate == null || this.mageTexture == null) {
      return false;
    }

    applyMageTextureToMeshes(this.pendingMageTemplate, this.mageTexture);
    if (!this.mageTextureDebugShown && import.meta.env.DEV) {
      console.info(
        "Applied forced mage texture to FBX meshes:",
        getMageTextureDebugInfo(this.pendingMageTemplate),
      );
      this.mageTextureDebugShown = true;
    }
    if (this.mageTemplate != null) {
      this.dispose(this.mageTemplate);
    }
    this.mageTemplate = this.pendingMageTemplate;
    this.pendingMageTemplate = null;
    this.mageTemplateVersion += 1;
    return true;
  }

  private startKoboldModelLoad(): void {
    if (this.koboldLoadStarted || typeof window === "undefined") {
      return;
    }

    const entry = getAssetManifestEntry(AssetIds.rigs.kobold);
    if (entry?.sourceFormat !== "fbx") {
      return;
    }

    this.koboldLoadStarted = true;
    const loader = new FBXLoader();
    const koboldUrl = resolveBrowserAssetUrl(entry.browserUrl);
    loader.load(
      koboldUrl,
      (loaded) => {
        const loadedHadRenderableGeometry = hasRenderableGeometry(loaded);
        if (!loadedHadRenderableGeometry) {
          const proxyAdded = addBoneProxyRig(loaded);
          if (!this.koboldBoneOnlyWarningShown) {
            console.warn(
              proxyAdded
                ? `Kobold FBX at ${koboldUrl} has animation bones but no renderable meshes; using temporary bone proxy visuals.`
                : `Kobold FBX at ${koboldUrl} has no renderable meshes and no usable bones; keeping placeholder kobold.`,
            );
            this.koboldBoneOnlyWarningShown = true;
          }

          if (!proxyAdded) {
            return;
          }
        }

        applyFallbackMaterialToUnmaterialedMeshes(loaded);
        ensureMageMeshesVisibleWithoutOverridingTextures(loaded);
        this.pendingKoboldTemplate = normalizeModelToActorBounds(
          loaded,
          KOBOLD_TARGET_HEIGHT,
        );
        this.pendingKoboldTemplate.animations = createKoboldAnimationClips(loaded.animations);
        if (loadedHadRenderableGeometry) {
          this.publishKoboldTemplateIfTextureReady();
          this.startKoboldTextureLoad();
        }
      },
      undefined,
      (error) => {
        console.warn(`Failed to load kobold FBX from ${koboldUrl}`, error);
      },
    );
  }

  private startKoboldTextureLoad(): void {
    if (this.koboldTextureLoadStarted || typeof window === "undefined") {
      return;
    }

    const entry = getAssetManifestEntry(AssetIds.materials.koboldTexture);
    if (entry == null) {
      return;
    }

    this.koboldTextureLoadStarted = true;
    const textureUrl = resolveBrowserAssetUrl(entry.browserUrl);
    new THREE.TextureLoader().load(
      textureUrl,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        this.koboldTexture = createAlphaBleedCanvasTexture(texture);
        this.publishKoboldTemplateIfTextureReady();
      },
      undefined,
      (error) => {
        console.warn(`Failed to load kobold texture from ${textureUrl}`, error);
      },
    );
  }

  private publishKoboldTemplateIfTextureReady(): boolean {
    if (this.pendingKoboldTemplate == null || this.koboldTexture == null) {
      return false;
    }

    applyMageTextureToMeshes(this.pendingKoboldTemplate, this.koboldTexture);
    if (!this.koboldTextureDebugShown && import.meta.env.DEV) {
      console.info(
        "Applied forced kobold texture to FBX meshes:",
        getMageTextureDebugInfo(this.pendingKoboldTemplate),
      );
      this.koboldTextureDebugShown = true;
    }
    if (this.koboldTemplate != null) {
      this.dispose(this.koboldTemplate);
    }
    this.koboldTemplate = this.pendingKoboldTemplate;
    this.pendingKoboldTemplate = null;
    this.koboldTemplateVersion += 1;
    return true;
  }

  private startBossModelLoad(): void {
    if (this.bossLoadStarted || typeof window === "undefined") {
      return;
    }

    const entry = getAssetManifestEntry(AssetIds.rigs.boss);
    if (entry?.sourceFormat !== "fbx") {
      return;
    }

    this.bossLoadStarted = true;
    const loader = new FBXLoader();
    const bossUrl = resolveBrowserAssetUrl(entry.browserUrl);
    loader.load(
      bossUrl,
      (loaded) => {
        const loadedHadRenderableGeometry = hasRenderableGeometry(loaded);
        if (!loadedHadRenderableGeometry) {
          const proxyAdded = addBoneProxyRig(loaded);
          if (!this.bossBoneOnlyWarningShown) {
            console.warn(
              proxyAdded
                ? `Boss FBX at ${bossUrl} has animation bones but no renderable meshes; using temporary bone proxy visuals.`
                : `Boss FBX at ${bossUrl} has no renderable meshes and no usable bones; keeping placeholder boss.`,
            );
            this.bossBoneOnlyWarningShown = true;
          }

          if (!proxyAdded) {
            return;
          }
        }

        applyFallbackMaterialToUnmaterialedMeshes(loaded);
        ensureMageMeshesVisibleWithoutOverridingTextures(loaded);
        this.pendingBossTemplate = normalizeModelToActorBounds(
          loaded,
          KOBOLD_TARGET_HEIGHT,
        );
        this.pendingBossTemplate.animations = createKoboldAnimationClips(loaded.animations);
        if (loadedHadRenderableGeometry) {
          this.publishBossTemplateIfTextureReady();
          this.startBossTextureLoad();
        }
      },
      undefined,
      (error) => {
        console.warn(`Failed to load boss FBX from ${bossUrl}`, error);
      },
    );
  }

  private startBossTextureLoad(): void {
    if (this.bossTextureLoadStarted || typeof window === "undefined") {
      return;
    }

    const entry = getAssetManifestEntry(AssetIds.materials.bossTexture);
    if (entry == null) {
      return;
    }

    this.bossTextureLoadStarted = true;
    const textureUrl = resolveBrowserAssetUrl(entry.browserUrl);
    new THREE.TextureLoader().load(
      textureUrl,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        this.bossTexture = createAlphaBleedCanvasTexture(texture);
        this.publishBossTemplateIfTextureReady();
      },
      undefined,
      (error) => {
        console.warn(`Failed to load boss texture from ${textureUrl}`, error);
      },
    );
  }

  private publishBossTemplateIfTextureReady(): boolean {
    if (this.pendingBossTemplate == null || this.bossTexture == null) {
      return false;
    }

    applyMageTextureToMeshes(this.pendingBossTemplate, this.bossTexture);
    if (!this.bossTextureDebugShown && import.meta.env.DEV) {
      console.info(
        "Applied forced boss texture to FBX meshes:",
        getMageTextureDebugInfo(this.pendingBossTemplate),
      );
      this.bossTextureDebugShown = true;
    }
    if (this.bossTemplate != null) {
      this.dispose(this.bossTemplate);
    }
    this.bossTemplate = this.pendingBossTemplate;
    this.pendingBossTemplate = null;
    this.bossTemplateVersion += 1;
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

function cloneLoadedKoboldTemplate(template: THREE.Group): THREE.Object3D {
  const clone = normalizeModelToActorBounds(template, KOBOLD_TARGET_HEIGHT);
  applyKoboldModelFacingCorrection(clone);
  clone.animations = template.animations;
  return clone;
}

function cloneLoadedBossTemplate(template: THREE.Group): THREE.Object3D {
  const clone = normalizeModelToActorBounds(template, KOBOLD_TARGET_HEIGHT);
  applyKoboldModelFacingCorrection(clone);
  clone.animations = template.animations;
  return clone;
}

export function applyKoboldModelFacingCorrection(object: THREE.Object3D): void {
  const modelRoot = object.children[0] ?? object;
  modelRoot.rotation.y = KOBOLD_MODEL_Y_ROTATION_RAD;
}

function createBackdrop(backdropAssetId: string): THREE.Object3D {
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
  startBackdropTextureLoad(plane, backdropAssetId);
  return group;
}

function hashBackdropAssetId(assetId: string): number {
  let hash = 2166136261;
  for (let index = 0; index < assetId.length; index += 1) {
    hash ^= assetId.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
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

function startBackdropTextureLoad(plane: THREE.Mesh, backdropAssetId: string): void {
  if (typeof window === "undefined") {
    return;
  }

  const entry = getAssetManifestEntry(backdropAssetId);
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
        `Failed to load hero-stage backdrop texture (${backdropAssetId}) from ${backdropUrl}`,
        error,
      );
    },
  );
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

function createFireBurnSprite(): THREE.Object3D {
  const material = new THREE.MeshBasicMaterial({
    map: createTransparentPlaceholderTexture(),
    color: "#ffffff",
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
    depthTest: false,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
  plane.name = "fire-burn-sprite";
  plane.position.y = 0.5;
  plane.renderOrder = 12;
  startFireBurnTextureLoad(material);
  return plane;
}

function createEarthImpactSprite(): THREE.Object3D {
  const material = new THREE.MeshBasicMaterial({
    map: createTransparentPlaceholderTexture(),
    color: "#ffffff",
    transparent: true,
    opacity: 0.94,
    depthWrite: false,
    depthTest: false,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
  plane.name = "earth-impact-sprite";
  plane.renderOrder = 14;
  startSpriteTextureLoad(material, AssetIds.spritesheets.earthImpact, 2, 2, "earth impact");
  return plane;
}

function startFireBurnTextureLoad(material: THREE.MeshBasicMaterial): void {
  startSpriteTextureLoad(material, AssetIds.spritesheets.fireBurn, 4, 2, "fire burn");
}

function startSpriteTextureLoad(
  material: THREE.MeshBasicMaterial,
  assetId: string,
  columns: number,
  rows: number,
  label: string,
): void {
  if (typeof window === "undefined") {
    return;
  }

  const entry = getAssetManifestEntry(assetId);
  if (entry == null) {
    return;
  }

  const textureUrl = resolveBrowserAssetUrl(entry.browserUrl);
  new THREE.TextureLoader().load(
    textureUrl,
    (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.repeat.set(1 / columns, 1 / rows);
      texture.offset.set(0, 1 - 1 / rows);
      material.map?.dispose();
      material.map = texture;
      material.needsUpdate = true;
    },
    undefined,
    (error) => {
      console.warn(`Failed to load ${label} spritesheet from ${textureUrl}`, error);
    },
  );
}

function createTransparentPlaceholderTexture(): THREE.DataTexture {
  const texture = new THREE.DataTexture(new Uint8Array([0, 0, 0, 0]), 1, 1, THREE.RGBAFormat);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
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
