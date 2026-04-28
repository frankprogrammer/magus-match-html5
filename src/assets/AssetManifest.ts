import { AssetIds } from './AssetIds';
import type { ArtPromptId } from './ArtPrompts';
import { SoundManifest, type SoundManifestEntry } from '../audio/SoundManifest';

export type AssetKind = 'texture' | 'model' | 'template' | 'audio' | 'ui' | 'rig' | 'material';
export type SourceFormat = 'png' | 'jpg' | 'webp' | 'mp3' | 'ogg' | 'wav' | 'glb' | 'gltf' | 'json';
export type Axis = '+X' | '-X' | '+Y' | '-Y' | '+Z' | '-Z';
export type Pivot = 'center' | 'bottomCenter' | 'custom';
export type CollisionShape = 'none' | 'box' | 'sphere' | 'capsule' | 'mesh' | 'custom';

export interface AssetManifestEntry {
  id: string;
  kind: AssetKind;
  browserUrl: string;
  futureMhsPath?: string;
  sourceFormat?: SourceFormat;
  runtimeSize?: string;
  unitScale?: number;
  forwardAxis?: Axis;
  upAxis?: '+Y' | '+Z';
  pivot?: Pivot;
  collision?: CollisionShape;
  artPromptId?: ArtPromptId;
  notes?: string;
}

const TILE_NOTES =
  'Runtime 256x256 transparent PNG, centered subject, 24-36px padding, readable at 100x100.';
const BACKDROP_NOTES = 'Runtime 2160x1000 PNG/WebP for 2x coverage of the 1080x500 hero stage.';
const RIG_NOTES = 'Transparent PNG source parts now; later exported as a 2048x2048 atlas plus skeletal JSON.';

export const AssetManifest: Record<string, AssetManifestEntry> = {
  [AssetIds.tiles.fire]: texture(
    AssetIds.tiles.fire,
    '/assets/tiles/tile-fire.png',
    'Assets/Textures/Tiles/tile-fire.png',
    'prompt.tiles.standard',
    TILE_NOTES,
  ),
  [AssetIds.tiles.ice]: texture(
    AssetIds.tiles.ice,
    '/assets/tiles/tile-ice.png',
    'Assets/Textures/Tiles/tile-ice.png',
    'prompt.tiles.standard',
    TILE_NOTES,
  ),
  [AssetIds.tiles.lightning]: texture(
    AssetIds.tiles.lightning,
    '/assets/tiles/tile-lightning.png',
    'Assets/Textures/Tiles/tile-lightning.png',
    'prompt.tiles.standard',
    TILE_NOTES,
  ),
  [AssetIds.tiles.earth]: texture(
    AssetIds.tiles.earth,
    '/assets/tiles/tile-earth.png',
    'Assets/Textures/Tiles/tile-earth.png',
    'prompt.tiles.standard',
    TILE_NOTES,
  ),
  [AssetIds.tiles.land]: texture(
    AssetIds.tiles.land,
    '/assets/tiles/tile-land.png',
    'Assets/Textures/Tiles/tile-land.png',
    'prompt.tiles.journey',
    TILE_NOTES,
  ),
  [AssetIds.tiles.path]: texture(
    AssetIds.tiles.path,
    '/assets/tiles/tile-path.png',
    'Assets/Textures/Tiles/tile-path.png',
    'prompt.tiles.journey',
    TILE_NOTES,
  ),
  [AssetIds.powerUps.rocketH]: texture(
    AssetIds.powerUps.rocketH,
    '/assets/powerups/power-rocket-h.png',
    'Assets/Textures/PowerUps/power-rocket-h.png',
    'prompt.powerups.standard',
    TILE_NOTES,
  ),
  [AssetIds.powerUps.rocketV]: texture(
    AssetIds.powerUps.rocketV,
    '/assets/powerups/power-rocket-v.png',
    'Assets/Textures/PowerUps/power-rocket-v.png',
    'prompt.powerups.standard',
    TILE_NOTES,
  ),
  [AssetIds.powerUps.tnt]: texture(
    AssetIds.powerUps.tnt,
    '/assets/powerups/power-tnt.png',
    'Assets/Textures/PowerUps/power-tnt.png',
    'prompt.powerups.standard',
    TILE_NOTES,
  ),
  [AssetIds.powerUps.lightball]: texture(
    AssetIds.powerUps.lightball,
    '/assets/powerups/power-lightball.png',
    'Assets/Textures/PowerUps/power-lightball.png',
    'prompt.powerups.standard',
    TILE_NOTES,
  ),
  [AssetIds.backdrops.forest]: texture(
    AssetIds.backdrops.forest,
    '/assets/backdrops/backdrop-forest.png',
    'Assets/Textures/Backdrops/backdrop-forest.png',
    'prompt.backdrops.hero',
    BACKDROP_NOTES,
    '2160x1000',
  ),
  [AssetIds.backdrops.crypt]: texture(
    AssetIds.backdrops.crypt,
    '/assets/backdrops/backdrop-crypt.png',
    'Assets/Textures/Backdrops/backdrop-crypt.png',
    'prompt.backdrops.hero',
    BACKDROP_NOTES,
    '2160x1000',
  ),
  [AssetIds.backdrops.crystalCave]: texture(
    AssetIds.backdrops.crystalCave,
    '/assets/backdrops/backdrop-crystal-cave.png',
    'Assets/Textures/Backdrops/backdrop-crystal-cave.png',
    'prompt.backdrops.hero',
    BACKDROP_NOTES,
    '2160x1000',
  ),
  [AssetIds.rigs.mage]: rig(
    AssetIds.rigs.mage,
    '/assets/rigs/mage/mage-parts-source.png',
    'Assets/Rigs/Mage/mage-rig.json',
    'prompt.rig.mage',
  ),
  [AssetIds.rigs.prince]: rig(
    AssetIds.rigs.prince,
    '/assets/rigs/prince/prince-parts-source.png',
    'Assets/Rigs/Prince/prince-rig.json',
    'prompt.rig.prince',
  ),
  [AssetIds.rigs.kobold]: rig(
    AssetIds.rigs.kobold,
    '/assets/rigs/kobold/kobold-parts-source.png',
    'Assets/Rigs/Kobold/kobold-rig.json',
    'prompt.rig.kobolds',
  ),
  [AssetIds.rigs.tallKobold]: rig(
    AssetIds.rigs.tallKobold,
    '/assets/rigs/tall-kobold/tall-kobold-parts-source.png',
    'Assets/Rigs/TallKobold/tall-kobold-rig.json',
    'prompt.rig.kobolds',
  ),
  [AssetIds.props.princeCage]: prop(
    AssetIds.props.princeCage,
    '/assets/props/prop-prince-cage.png',
    'Assets/Textures/Props/prop-prince-cage.png',
    'prompt.rig.prince',
    'Cage frame source until rig export is available.',
  ),
  [AssetIds.props.goalFlag]: prop(
    AssetIds.props.goalFlag,
    '/assets/props/prop-goal-flag.png',
    'Assets/Textures/Props/prop-goal-flag.png',
    'prompt.tiles.journey',
    'Goal marker prop for Journey staging.',
  ),
  [AssetIds.props.abductorGlove]: prop(
    AssetIds.props.abductorGlove,
    '/assets/props/prop-abductor-glove.png',
    'Assets/Textures/Props/prop-abductor-glove.png',
    'prompt.props.abductor',
    'Edge-of-frame cage-yank hint prop.',
  ),
  [AssetIds.props.abductorHook]: prop(
    AssetIds.props.abductorHook,
    '/assets/props/prop-abductor-hook.png',
    'Assets/Textures/Props/prop-abductor-hook.png',
    'prompt.props.abductor',
    'Edge-of-frame cage-yank hint prop.',
  ),
  [AssetIds.props.abductorHand]: prop(
    AssetIds.props.abductorHand,
    '/assets/props/prop-abductor-hand.png',
    'Assets/Textures/Props/prop-abductor-hand.png',
    'prompt.props.abductor',
    'Edge-of-frame cage-yank hint prop.',
  ),
  [AssetIds.props.abductorRope]: prop(
    AssetIds.props.abductorRope,
    '/assets/props/prop-abductor-rope.png',
    'Assets/Textures/Props/prop-abductor-rope.png',
    'prompt.props.abductor',
    'Edge-of-frame cage-yank hint prop.',
  ),
  ...Object.fromEntries(
    Object.values(SoundManifest).map((entry) => [entry.id, audio(entry)]),
  ),
};

export function getAssetManifestEntry(assetId: string): AssetManifestEntry | undefined {
  const manifest = AssetManifest as Record<string, AssetManifestEntry | undefined>;
  return manifest[assetId];
}

export function getTextureAssetEntries(): AssetManifestEntry[] {
  return Object.values(AssetManifest).filter((entry) => entry.kind === 'texture' || entry.kind === 'ui');
}

export function getAudioAssetEntries(): AssetManifestEntry[] {
  return Object.values(AssetManifest).filter((entry) => entry.kind === 'audio');
}

function texture(
  id: string,
  browserUrl: string,
  futureMhsPath: string,
  artPromptId: ArtPromptId,
  notes: string,
  runtimeSize = '256x256',
): AssetManifestEntry {
  return {
    id,
    kind: 'texture',
    browserUrl,
    futureMhsPath,
    sourceFormat: 'png',
    runtimeSize,
    unitScale: 1,
    pivot: 'center',
    collision: 'none',
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
    kind: 'texture',
    browserUrl,
    futureMhsPath,
    sourceFormat: 'png',
    runtimeSize: 'max 1024px longest side',
    unitScale: 1,
    pivot: 'center',
    collision: 'none',
    artPromptId,
    notes,
  };
}

function rig(
  id: string,
  browserUrl: string,
  futureMhsPath: string,
  artPromptId: ArtPromptId,
): AssetManifestEntry {
  return {
    id,
    kind: 'rig',
    browserUrl,
    futureMhsPath,
    sourceFormat: 'png',
    runtimeSize: 'source parts max 1024px, final atlas 2048x2048',
    unitScale: 1,
    forwardAxis: '+Z',
    upAxis: '+Y',
    pivot: 'bottomCenter',
    collision: 'capsule',
    artPromptId,
    notes: RIG_NOTES,
  };
}

function audio(entry: SoundManifestEntry): AssetManifestEntry {
  return {
    id: entry.id,
    kind: 'audio',
    browserUrl: entry.browserUrl,
    futureMhsPath: entry.futureMhsPath,
    sourceFormat: 'mp3',
    runtimeSize: 'optional browser audio file with WebAudio synth fallback',
    unitScale: 1,
    pivot: 'center',
    collision: 'none',
    notes: `${entry.notes} MHS mapping: ${entry.scope === 'global' ? 'global SoundComponent' : 'template-local SoundComponent'}.`,
  };
}
