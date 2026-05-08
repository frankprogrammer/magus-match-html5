import { AssetIds } from "./AssetIds";
import type { ArtPromptId } from "./ArtPrompts";
import { SoundManifest, type SoundManifestEntry } from "../audio/SoundManifest";

export type AssetKind =
  | "texture"
  | "model"
  | "template"
  | "audio"
  | "ui"
  | "rig"
  | "material";
export type SourceFormat =
  | "png"
  | "jpg"
  | "webp"
  | "mp3"
  | "ogg"
  | "wav"
  | "glb"
  | "gltf"
  | "fbx"
  | "json";
export type Axis = "+X" | "-X" | "+Y" | "-Y" | "+Z" | "-Z";
export type Pivot = "center" | "bottomCenter" | "custom";
export type CollisionShape =
  | "none"
  | "box"
  | "sphere"
  | "capsule"
  | "mesh"
  | "custom";

export interface AssetManifestEntry {
  id: string;
  kind: AssetKind;
  browserUrl: string;
  futureMhsPath?: string;
  sourceFormat?: SourceFormat;
  runtimeSize?: string;
  unitScale?: number;
  forwardAxis?: Axis;
  upAxis?: "+Y" | "+Z";
  pivot?: Pivot;
  collision?: CollisionShape;
  artPromptId?: ArtPromptId;
  notes?: string;
}

const TILE_NOTES =
  "Runtime 256x256 transparent PNG, centered subject, 24-36px padding, readable at 100x100.";
const BACKDROP_NOTES =
  "Runtime 2160x1000 PNG/WebP for 2x coverage of the 1080x500 hero stage.";
const CASTLE_BACKDROP_NOTES =
  "Hero-stage cover backdrop. Drawn as a Three.js texture plane that fills the orthographic 1080x500 stage and crops overflow.";
const RIG_NOTES =
  "Transparent PNG source parts now; later exported as a 2048x2048 atlas plus skeletal JSON.";
const TEMP_FBX_MAGE_NOTES =
  "Temporary browser hero-stage FBX model. Auto-normalized in Three.js to bottom-center pivot and 1.45 world-unit height. Loops animation frames 0-60.";
const TEMP_FBX_MAGE_TEXTURE_NOTES =
  "Temporary browser hero-stage texture recovered from the FBX .fbm export folder and applied to the mage mesh when the FBX material does not load a map.";
const TEMP_FBX_KOBOLD_NOTES =
  "Temporary browser hero-stage FBX kobold enemy model. Auto-normalized in Three.js and uses embedded walk/defeat clips.";
const TEMP_FBX_KOBOLD_TEXTURE_NOTES =
  "Temporary browser hero-stage texture recovered from the kobold FBX .fbm export folder and applied to kobold meshes when the FBX material does not load a map.";
const UI_BANNER_NOTES =
  "Runtime 1080x150 PNG for the fixed middle HUD band; drawn full-width behind HUD text.";
const BOARD_BACKGROUND_NOTES =
  "Runtime 1080x1080 PNG for the board base; drawn behind board cells with flat-color fallback.";
const UI_LEVEL_TITLE_NOTES =
  "Runtime ~950x156 PNG title ribbon; scaled to 60% logical width, centered near top for level label.";
const UI_HEART_NOTES =
  "Runtime ~254x233 transparent PNG; HUD lives strip uses scaled instances.";
const UI_TRIAL_FILLBAR_BG_NOTES =
  "Runtime PNG frame for trial monster progress bar; scaled to heart row height.";
const UI_TRIAL_FILLBAR_FILL_NOTES =
  "Runtime PNG fill art; drawn clipped right-to-left inside the frame inner track.";
const UI_TRIAL_KOBOLD_ICON_NOTES =
  "Runtime ~447x429 transparent PNG; badge on bottom-right of trial enemy fill bar.";
const TNT_EXPLOSION_SPRITE_NOTES =
  "Runtime 512x256 transparent PNG spritesheet. Two rows by four columns, eight 128x128 frames, played at 30 FPS for TNT detonations.";
const ROCKET_CLOUD_SPRITE_NOTES =
  "Runtime transparent PNG spritesheet. Two rows by four columns, eight 128x128 frames, bottom-center origin, played at 30 FPS for rocket blast waves.";
const MATCH_ORB_NOTES =
  "Runtime transparent static PNG, color-tinted for match energy streams flying from the board to the mage staff.";

export const AssetManifest: Record<string, AssetManifestEntry> = {
  [AssetIds.tiles.fire]: texture(
    AssetIds.tiles.fire,
    "/assets/tiles/tile-fire.png",
    "Assets/Textures/Tiles/tile-fire.png",
    "prompt.tiles.standard",
    TILE_NOTES,
  ),
  [AssetIds.tiles.ice]: texture(
    AssetIds.tiles.ice,
    "/assets/tiles/tile-ice.png",
    "Assets/Textures/Tiles/tile-ice.png",
    "prompt.tiles.standard",
    TILE_NOTES,
  ),
  [AssetIds.tiles.lightning]: texture(
    AssetIds.tiles.lightning,
    "/assets/tiles/tile-lightning.png",
    "Assets/Textures/Tiles/tile-lightning.png",
    "prompt.tiles.standard",
    TILE_NOTES,
  ),
  [AssetIds.tiles.earth]: texture(
    AssetIds.tiles.earth,
    "/assets/tiles/tile-earth.png",
    "Assets/Textures/Tiles/tile-earth.png",
    "prompt.tiles.standard",
    TILE_NOTES,
  ),
  [AssetIds.tiles.land]: texture(
    AssetIds.tiles.land,
    "/assets/tiles/tile-land.png",
    "Assets/Textures/Tiles/tile-land.png",
    "prompt.tiles.journey",
    TILE_NOTES,
  ),
  [AssetIds.tiles.path]: texture(
    AssetIds.tiles.path,
    "/assets/tiles/tile-path.png",
    "Assets/Textures/Tiles/tile-path.png",
    "prompt.tiles.journey",
    TILE_NOTES,
  ),
  [AssetIds.tiles.empty]: texture(
    AssetIds.tiles.empty,
    "/assets/tiles/empty.png",
    "Assets/Textures/Tiles/empty.png",
    "prompt.tiles.standard",
    "Runtime empty-cell marker for non-playable Trial void spaces. Drawn as board art only; not matchable or refillable.",
  ),
  [AssetIds.powerUps.rocketH]: texture(
    AssetIds.powerUps.rocketH,
    "/assets/powerups/power-rocket-h.png",
    "Assets/Textures/PowerUps/power-rocket-h.png",
    "prompt.powerups.standard",
    TILE_NOTES,
  ),
  [AssetIds.powerUps.rocketV]: texture(
    AssetIds.powerUps.rocketV,
    "/assets/powerups/power-rocket-v.png",
    "Assets/Textures/PowerUps/power-rocket-v.png",
    "prompt.powerups.standard",
    TILE_NOTES,
  ),
  [AssetIds.powerUps.tnt]: texture(
    AssetIds.powerUps.tnt,
    "/assets/powerups/power-tnt.png",
    "Assets/Textures/PowerUps/power-tnt.png",
    "prompt.powerups.standard",
    TILE_NOTES,
  ),
  [AssetIds.powerUps.lightball]: texture(
    AssetIds.powerUps.lightball,
    "/assets/powerups/power-lightball.png",
    "Assets/Textures/PowerUps/power-lightball.png",
    "prompt.powerups.standard",
    TILE_NOTES,
  ),
  [AssetIds.powerUps.orb]: texture(
    AssetIds.powerUps.orb,
    "/assets/powerups/orb.png",
    "Assets/Textures/PowerUps/orb.png",
    "prompt.powerups.standard",
    MATCH_ORB_NOTES,
  ),
  [AssetIds.backdrops.forest]: texture(
    AssetIds.backdrops.forest,
    "/assets/backdrops/backdrop-forest.png",
    "Assets/Textures/Backdrops/backdrop-forest.png",
    "prompt.backdrops.hero",
    BACKDROP_NOTES,
    "2160x1000",
  ),
  [AssetIds.backdrops.crypt]: texture(
    AssetIds.backdrops.crypt,
    "/assets/backdrops/backdrop-crypt.png",
    "Assets/Textures/Backdrops/backdrop-crypt.png",
    "prompt.backdrops.hero",
    BACKDROP_NOTES,
    "2160x1000",
  ),
  [AssetIds.backdrops.crystalCave]: texture(
    AssetIds.backdrops.crystalCave,
    "/assets/backdrops/backdrop-crystal-cave.png",
    "Assets/Textures/Backdrops/backdrop-crystal-cave.png",
    "prompt.backdrops.hero",
    BACKDROP_NOTES,
    "2160x1000",
  ),
  [AssetIds.backdrops.castle]: texture(
    AssetIds.backdrops.castle,
    "/assets/backdrops/bg1.png",
    "Assets/Textures/Backdrops/bg1.png",
    "prompt.backdrops.hero",
    CASTLE_BACKDROP_NOTES,
    "cover 1080x500 hero stage",
  ),
  [AssetIds.backdrops.bg2]: texture(
    AssetIds.backdrops.bg2,
    "/assets/backdrops/bg2.png",
    "Assets/Textures/Backdrops/bg2.png",
    "prompt.backdrops.hero",
    CASTLE_BACKDROP_NOTES,
    "cover 1080x500 hero stage",
  ),
  [AssetIds.backdrops.bg3]: texture(
    AssetIds.backdrops.bg3,
    "/assets/backdrops/bg3.png",
    "Assets/Textures/Backdrops/bg3.png",
    "prompt.backdrops.hero",
    CASTLE_BACKDROP_NOTES,
    "cover 1080x500 hero stage",
  ),
  [AssetIds.backdrops.bg4]: texture(
    AssetIds.backdrops.bg4,
    "/assets/backdrops/bg4.png",
    "Assets/Textures/Backdrops/bg4.png",
    "prompt.backdrops.hero",
    CASTLE_BACKDROP_NOTES,
    "cover 1080x500 hero stage",
  ),
  [AssetIds.backdrops.bg5]: texture(
    AssetIds.backdrops.bg5,
    "/assets/backdrops/bg5.png",
    "Assets/Textures/Backdrops/bg5.png",
    "prompt.backdrops.hero",
    CASTLE_BACKDROP_NOTES,
    "cover 1080x500 hero stage",
  ),
  [AssetIds.backdrops.bg6]: texture(
    AssetIds.backdrops.bg6,
    "/assets/backdrops/bg6.png",
    "Assets/Textures/Backdrops/bg6.png",
    "prompt.backdrops.hero",
    CASTLE_BACKDROP_NOTES,
    "cover 1080x500 hero stage",
  ),
  [AssetIds.backdrops.bg7]: texture(
    AssetIds.backdrops.bg7,
    "/assets/backdrops/bg7.png",
    "Assets/Textures/Backdrops/bg7.png",
    "prompt.backdrops.hero",
    CASTLE_BACKDROP_NOTES,
    "cover 1080x500 hero stage",
  ),
  [AssetIds.rigs.mage]: rig(
    AssetIds.rigs.mage,
    "/assets/rigs/knight2.fbx",
    "Assets/Rigs/Mage/knight2.fbx",
    "prompt.rig.mage",
    "fbx",
    "temporary FBX stand-in, auto-normalized to 1.45 world units",
    TEMP_FBX_MAGE_NOTES,
  ),
  [AssetIds.materials.mageTexture]: material(
    AssetIds.materials.mageTexture,
    "/assets/rigs/knight2.fbm/knight_texture_final.png",
    "Assets/Textures/Rigs/Mage/knight_texture_final.png",
    "prompt.rig.mage",
    TEMP_FBX_MAGE_TEXTURE_NOTES,
  ),
  [AssetIds.spritesheets.tntExplosion]: texture(
    AssetIds.spritesheets.tntExplosion,
    "/assets/spritesheets/explosion-sprite.png",
    "Assets/Textures/Spritesheets/explosion-sprite.png",
    "prompt.powerups.standard",
    TNT_EXPLOSION_SPRITE_NOTES,
    "512x256, 8 frames at 128x128",
  ),
  [AssetIds.spritesheets.rocketCloud]: texture(
    AssetIds.spritesheets.rocketCloud,
    "/assets/spritesheets/rocketCloud.png",
    "Assets/Textures/Spritesheets/rocketCloud.png",
    "prompt.powerups.standard",
    ROCKET_CLOUD_SPRITE_NOTES,
    "512x256, 8 frames at 128x128",
  ),
  [AssetIds.rigs.prince]: rig(
    AssetIds.rigs.prince,
    "/assets/rigs/prince/prince-parts-source.png",
    "Assets/Rigs/Prince/prince-rig.json",
    "prompt.rig.prince",
  ),
  [AssetIds.rigs.kobold]: rig(
    AssetIds.rigs.kobold,
    "/assets/rigs/kobold.fbx",
    "Assets/Rigs/Kobold/kobold.fbx",
    "prompt.rig.kobolds",
    "fbx",
    "temporary FBX stand-in, auto-normalized to 1.16 world units",
    TEMP_FBX_KOBOLD_NOTES,
  ),
  [AssetIds.materials.koboldTexture]: material(
    AssetIds.materials.koboldTexture,
    "/assets/rigs/kobold.fbm/kobold_texture.png",
    "Assets/Textures/Rigs/Kobold/kobold_texture.png",
    "prompt.rig.kobolds",
    TEMP_FBX_KOBOLD_TEXTURE_NOTES,
  ),
  [AssetIds.rigs.tallKobold]: rig(
    AssetIds.rigs.tallKobold,
    "/assets/rigs/tall-kobold/tall-kobold-parts-source.png",
    "Assets/Rigs/TallKobold/tall-kobold-rig.json",
    "prompt.rig.kobolds",
  ),
  [AssetIds.props.princeCage]: prop(
    AssetIds.props.princeCage,
    "/assets/props/prop-prince-cage.png",
    "Assets/Textures/Props/prop-prince-cage.png",
    "prompt.rig.prince",
    "Cage frame source until rig export is available.",
  ),
  [AssetIds.props.goalFlag]: prop(
    AssetIds.props.goalFlag,
    "/assets/props/prop-goal-flag.png",
    "Assets/Textures/Props/prop-goal-flag.png",
    "prompt.tiles.journey",
    "Goal marker prop for Journey staging.",
  ),
  [AssetIds.props.abductorGlove]: prop(
    AssetIds.props.abductorGlove,
    "/assets/props/prop-abductor-glove.png",
    "Assets/Textures/Props/prop-abductor-glove.png",
    "prompt.props.abductor",
    "Edge-of-frame cage-yank hint prop.",
  ),
  [AssetIds.props.abductorHook]: prop(
    AssetIds.props.abductorHook,
    "/assets/props/prop-abductor-hook.png",
    "Assets/Textures/Props/prop-abductor-hook.png",
    "prompt.props.abductor",
    "Edge-of-frame cage-yank hint prop.",
  ),
  [AssetIds.props.abductorHand]: prop(
    AssetIds.props.abductorHand,
    "/assets/props/prop-abductor-hand.png",
    "Assets/Textures/Props/prop-abductor-hand.png",
    "prompt.props.abductor",
    "Edge-of-frame cage-yank hint prop.",
  ),
  [AssetIds.props.abductorRope]: prop(
    AssetIds.props.abductorRope,
    "/assets/props/prop-abductor-rope.png",
    "Assets/Textures/Props/prop-abductor-rope.png",
    "prompt.props.abductor",
    "Edge-of-frame cage-yank hint prop.",
  ),
  [AssetIds.ui.hudBanner]: ui(
    AssetIds.ui.hudBanner,
    "/assets/ui/ui-banner.png",
    "Assets/Textures/UI/ui-banner.png",
    UI_BANNER_NOTES,
    "1080x150",
  ),
  [AssetIds.ui.boardBackground]: ui(
    AssetIds.ui.boardBackground,
    "/assets/ui/board-background.png",
    "Assets/Textures/UI/board-background.png",
    BOARD_BACKGROUND_NOTES,
    "1080x1080",
  ),
  [AssetIds.ui.levelTitlePanel]: ui(
    AssetIds.ui.levelTitlePanel,
    "/assets/ui/ui%20title.png",
    "Assets/Textures/UI/ui-title.png",
    UI_LEVEL_TITLE_NOTES,
    "950x156",
  ),
  [AssetIds.ui.heartFill]: ui(
    AssetIds.ui.heartFill,
    "/assets/ui/heart-fill.png",
    "Assets/Textures/UI/heart-fill.png",
    UI_HEART_NOTES,
    "254x233",
  ),
  [AssetIds.ui.heartEmpty]: ui(
    AssetIds.ui.heartEmpty,
    "/assets/ui/heart-empty.png",
    "Assets/Textures/UI/heart-empty.png",
    UI_HEART_NOTES,
    "254x233",
  ),
  [AssetIds.ui.trialFillBarBg]: ui(
    AssetIds.ui.trialFillBarBg,
    "/assets/ui/ui-fillbar-bg.png",
    "Assets/Textures/UI/ui-fillbar-bg.png",
    UI_TRIAL_FILLBAR_BG_NOTES,
    "2155x563",
  ),
  [AssetIds.ui.trialFillBarFill]: ui(
    AssetIds.ui.trialFillBarFill,
    "/assets/ui/ui-fillbar-fill.png",
    "Assets/Textures/UI/ui-fillbar-fill.png",
    UI_TRIAL_FILLBAR_FILL_NOTES,
    "1952x359",
  ),
  [AssetIds.ui.trialFillBarKoboldIcon]: ui(
    AssetIds.ui.trialFillBarKoboldIcon,
    "/assets/ui/ui-icon-kobold.png",
    "Assets/Textures/UI/ui-icon-kobold.png",
    UI_TRIAL_KOBOLD_ICON_NOTES,
    "447x429",
  ),
  ...Object.fromEntries(
    Object.values(SoundManifest).map((entry) => [entry.id, audio(entry)]),
  ),
};

export function getAssetManifestEntry(
  assetId: string,
): AssetManifestEntry | undefined {
  const manifest = AssetManifest as Record<
    string,
    AssetManifestEntry | undefined
  >;
  return manifest[assetId];
}

export function getTextureAssetEntries(): AssetManifestEntry[] {
  return Object.values(AssetManifest).filter(
    (entry) => entry.kind === "texture" || entry.kind === "ui",
  );
}

export function getAudioAssetEntries(): AssetManifestEntry[] {
  return Object.values(AssetManifest).filter((entry) => entry.kind === "audio");
}

function texture(
  id: string,
  browserUrl: string,
  futureMhsPath: string,
  artPromptId: ArtPromptId,
  notes: string,
  runtimeSize = "256x256",
): AssetManifestEntry {
  return {
    id,
    kind: "texture",
    browserUrl,
    futureMhsPath,
    sourceFormat: "png",
    runtimeSize,
    unitScale: 1,
    pivot: "center",
    collision: "none",
    artPromptId,
    notes,
  };
}

function prop(
  id: string,
  browserUrl: string,
  futureMhsPath: string,
  artPromptId: ArtPromptId,
  notes: string,
): AssetManifestEntry {
  return {
    id,
    kind: "texture",
    browserUrl,
    futureMhsPath,
    sourceFormat: "png",
    runtimeSize: "max 1024px longest side",
    unitScale: 1,
    pivot: "center",
    collision: "none",
    artPromptId,
    notes,
  };
}

function rig(
  id: string,
  browserUrl: string,
  futureMhsPath: string,
  artPromptId: ArtPromptId,
  sourceFormat: SourceFormat = "png",
  runtimeSize = "source parts max 1024px, final atlas 2048x2048",
  notes = RIG_NOTES,
): AssetManifestEntry {
  return {
    id,
    kind: "rig",
    browserUrl,
    futureMhsPath,
    sourceFormat,
    runtimeSize,
    unitScale: 1,
    forwardAxis: "+Z",
    upAxis: "+Y",
    pivot: "bottomCenter",
    collision: "capsule",
    artPromptId,
    notes,
  };
}

function ui(
  id: string,
  browserUrl: string,
  futureMhsPath: string,
  notes: string,
  runtimeSize: string,
): AssetManifestEntry {
  return {
    id,
    kind: "ui",
    browserUrl,
    futureMhsPath,
    sourceFormat: "png",
    runtimeSize,
    unitScale: 1,
    pivot: "center",
    collision: "none",
    notes,
  };
}

function material(
  id: string,
  browserUrl: string,
  futureMhsPath: string,
  artPromptId: ArtPromptId,
  notes: string,
): AssetManifestEntry {
  return {
    id,
    kind: "material",
    browserUrl,
    futureMhsPath,
    sourceFormat: "png",
    runtimeSize: "runtime FBX diffuse texture",
    unitScale: 1,
    pivot: "center",
    collision: "none",
    artPromptId,
    notes,
  };
}

function audio(entry: SoundManifestEntry): AssetManifestEntry {
  return {
    id: entry.id,
    kind: "audio",
    browserUrl: entry.browserUrl,
    futureMhsPath: entry.futureMhsPath,
    sourceFormat: "mp3",
    runtimeSize: "browser WAV/MP3 asset; no generated fallback in BrowserAudioAdapter",
    unitScale: 1,
    pivot: "center",
    collision: "none",
    notes: `${entry.notes} MHS mapping: ${entry.scope === "global" ? "global SoundComponent" : "template-local SoundComponent"}.`,
  };
}
