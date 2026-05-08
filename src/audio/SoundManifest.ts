import { AssetIds } from '../assets/AssetIds';
import type { SoundEventCategory } from '../core/GameEvents';

export type FallbackWaveform = 'sine' | 'square' | 'triangle' | 'sawtooth' | 'noise';
export type SoundScope = 'global' | 'templateLocal';

export interface FallbackSynthProfile {
  waveform: FallbackWaveform;
  frequencyHz: number;
  durationMs: number;
  attackMs: number;
  releaseMs: number;
}

export interface SoundManifestEntry {
  id: string;
  browserUrl: string;
  futureMhsPath: string;
  defaultVolume: number;
  category: SoundEventCategory;
  scope: SoundScope;
  fallback: FallbackSynthProfile;
  notes: string;
}

const SOUND_BASE = '/assets/audio';
const MHS_BASE = 'Assets/Audio';

/** Root-relative URL safe for fetch (spaces/parentheses in filenames). */
function browserSoundFileUrl(fileName: string): string {
  const prefix = SOUND_BASE.endsWith('/') ? SOUND_BASE : `${SOUND_BASE}/`;
  return `${prefix}${encodeURIComponent(fileName)}`;
}

export const SoundManifest = {
  [AssetIds.sounds.tileMatch]: sound(
    AssetIds.sounds.tileMatch,
    'tile-match',
    'match',
    'global',
    0.52,
    synth('triangle', 420, 90),
    'Primary first-cascade tile match click/pop.',
  ),
  [AssetIds.sounds.uiClick]: spellAttackWhoosh(
    AssetIds.sounds.uiClick,
    'Click.ogg',
    'ui',
    'global',
    0.52,
    synth('triangle', 660, 45),
    'HUD and overlay button click; Click.ogg in public/assets/audio.',
  ),
  [AssetIds.sounds.levelStart]: spellAttackWhoosh(
    AssetIds.sounds.levelStart,
    'Start.ogg',
    'level',
    'global',
    0.35,
    synth('triangle', 520, 120),
    'Level intro as tiles drop in; Start.ogg in public/assets/audio.',
  ),
  [AssetIds.sounds.mergeMatch]: spellAttackWhoosh(
    AssetIds.sounds.mergeMatch,
    'Merge.ogg',
    'match',
    'global',
    0.52,
    synth('triangle', 420, 90),
    'Successful match merge; Merge.ogg in public/assets/audio.',
  ),
  [AssetIds.sounds.matchCoin]: spellAttackWhoosh(
    AssetIds.sounds.matchCoin,
    'Coin.wav',
    'match',
    'global',
    0.5,
    synth('triangle', 880, 70),
    'Score coin on match resolve with merge; Coin.wav in public/assets/audio.',
  ),
  [AssetIds.sounds.boardMove]: spellAttackWhoosh(
    AssetIds.sounds.boardMove,
    'Move.wav',
    'match',
    'global',
    0.48,
    synth('triangle', 380, 85),
    'Tile swap committed; Move.wav in public/assets/audio.',
  ),
  [AssetIds.sounds.boardMoveBack]: spellAttackWhoosh(
    AssetIds.sounds.boardMoveBack,
    'MoveBack.wav',
    'match',
    'global',
    0.46,
    synth('triangle', 320, 90),
    'Invalid swap bounce-back; MoveBack.wav in public/assets/audio.',
  ),
  [AssetIds.sounds.levelUp]: spellAttackWhoosh(
    AssetIds.sounds.levelUp,
    'LevelUp.wav',
    'level',
    'global',
    0.58,
    synth('triangle', 720, 200),
    'After clearing a level; LevelUp.wav in public/assets/audio.',
  ),
  [AssetIds.sounds.enemyWalkLoop]: spellAttackWhoosh(
    AssetIds.sounds.enemyWalkLoop,
    'Walking.ogg',
    'enemy',
    'templateLocal',
    0.34,
    synth('triangle', 260, 90),
    'Trial enemy walk loop; Walking.ogg in public/assets/audio.',
  ),
  [AssetIds.sounds.comboPitchStep]: sound(
    AssetIds.sounds.comboPitchStep,
    'combo-pitch-step',
    'match',
    'global',
    0.48,
    synth('triangle', 560, 85),
    'Cascade ladder step; browser playbackRate is used for rising pitch.',
  ),
  [AssetIds.sounds.fireWhoosh]: spellAttackWhoosh(
    AssetIds.sounds.fireWhoosh,
    'Attack_Fire.wav',
    'spell',
    'templateLocal',
    0.42,
    synth('sawtooth', 330, 120),
    'Fire spell launch; Attack_Fire.wav in public/assets/audio.',
  ),
  [AssetIds.sounds.iceWhoosh]: spellAttackWhoosh(
    AssetIds.sounds.iceWhoosh,
    'Attack_Freeze.wav',
    'spell',
    'templateLocal',
    0.38,
    synth('sine', 620, 120),
    'Ice spell launch; Attack_Freeze.wav in public/assets/audio.',
  ),
  [AssetIds.sounds.lightningWhoosh]: spellAttackWhoosh(
    AssetIds.sounds.lightningWhoosh,
    'Attack_Lightning.wav',
    'spell',
    'templateLocal',
    0.38,
    synth('square', 740, 75),
    'Lightning spell launch; Attack_Lightning.wav in public/assets/audio.',
  ),
  [AssetIds.sounds.earthWhoosh]: spellAttackWhoosh(
    AssetIds.sounds.earthWhoosh,
    'Attack_Earth.wav',
    'spell',
    'templateLocal',
    0.42,
    synth('triangle', 230, 130),
    'Earth spell launch; Attack_Earth.wav in public/assets/audio.',
  ),
  [AssetIds.sounds.fireImpact]: sound(
    AssetIds.sounds.fireImpact,
    'spell-fire-impact',
    'spell',
    'templateLocal',
    0.48,
    synth('noise', 260, 110),
    'Fire spell impact burst at monster target.',
  ),
  [AssetIds.sounds.iceImpact]: sound(
    AssetIds.sounds.iceImpact,
    'spell-ice-impact',
    'spell',
    'templateLocal',
    0.44,
    synth('sine', 820, 110),
    'Ice spell impact chime at monster target.',
  ),
  [AssetIds.sounds.lightningImpact]: sound(
    AssetIds.sounds.lightningImpact,
    'spell-lightning-impact',
    'spell',
    'templateLocal',
    0.46,
    synth('square', 980, 80),
    'Lightning spell impact crack at monster target.',
  ),
  [AssetIds.sounds.earthImpact]: sound(
    AssetIds.sounds.earthImpact,
    'spell-earth-impact',
    'spell',
    'templateLocal',
    0.48,
    synth('triangle', 180, 125),
    'Earth spell impact stomp at monster target.',
  ),
  [AssetIds.sounds.pathConvert]: sound(
    AssetIds.sounds.pathConvert,
    'path-convert',
    'match',
    'global',
    0.5,
    synth('sine', 520, 160),
    'Journey LAND-to-path conversion shimmer.',
  ),
  [AssetIds.sounds.mageWalk]: sound(
    AssetIds.sounds.mageWalk,
    'mage-walk',
    'level',
    'templateLocal',
    0.34,
    synth('triangle', 260, 90),
    'Mage one-step movement tick, local to mage template in MHS.',
  ),
  [AssetIds.sounds.monsterDamage]: spellAttackWhoosh(
    AssetIds.sounds.monsterDamage,
    'Hit_Enemy.wav',
    'enemy',
    'templateLocal',
    0.88,
    synth('noise', 180, 95),
    'Monster hit; Hit_Enemy.wav in public/assets/audio.',
  ),
  [AssetIds.sounds.monsterDefeat]: spellAttackWhoosh(
    AssetIds.sounds.monsterDefeat,
    'Die_Enemy.wav',
    'enemy',
    'templateLocal',
    0.54,
    synth('noise', 140, 170),
    'Monster defeat; Die_Enemy.wav in public/assets/audio.',
  ),
  [AssetIds.sounds.playerDamage]: spellAttackWhoosh(
    AssetIds.sounds.playerDamage,
    'Hit_Player.wav',
    'level',
    'global',
    0.46,
    synth('noise', 200, 90),
    'Trial mage struck; Hit_Player.wav in public/assets/audio.',
  ),
  [AssetIds.sounds.playerDefeat]: spellAttackWhoosh(
    AssetIds.sounds.playerDefeat,
    'Die_Player.wav',
    'level',
    'global',
    0.56,
    synth('noise', 160, 220),
    'Trial mage defeated; Die_Player.wav in public/assets/audio.',
  ),
  [AssetIds.sounds.powerupCreate]: sound(
    AssetIds.sounds.powerupCreate,
    'powerup-create',
    'match',
    'global',
    0.54,
    synth('sawtooth', 680, 150),
    'Power-up creation sparkle.',
  ),
  [AssetIds.sounds.victorySting]: sound(
    AssetIds.sounds.victorySting,
    'victory-sting',
    'level',
    'global',
    0.62,
    synth('triangle', 720, 260),
    'Level clear success sting.',
  ),
  [AssetIds.sounds.cageYankWhoosh]: sound(
    AssetIds.sounds.cageYankWhoosh,
    'cage-yank-whoosh',
    'level',
    'global',
    0.48,
    synth('sawtooth', 260, 220),
    'Unseen abductor cage-yank whoosh during victory staging.',
  ),
  [AssetIds.sounds.runEnd]: sound(
    AssetIds.sounds.runEnd,
    'run-end',
    'run',
    'global',
    0.6,
    synth('sine', 220, 360),
    'Run-end fanfare/downbeat for Game Over.',
  ),
  [AssetIds.sounds.musicBackground]: spellAttackWhoosh(
    AssetIds.sounds.musicBackground,
    'Background.wav',
    'level',
    'global',
    0.22,
    synth('sine', 196, 2000),
    'Quiet looping session BGM; Background.wav in public/assets/audio.',
  ),
} satisfies Record<string, SoundManifestEntry>;

export function getSoundManifestEntry(soundId: string): SoundManifestEntry | undefined {
  const manifest = SoundManifest as Record<string, SoundManifestEntry | undefined>;
  return manifest[soundId];
}

export function getSoundManifestEntries(): SoundManifestEntry[] {
  return Object.values(SoundManifest);
}

/** Only these have real WAVs shipped under public/assets/audio; browser preloads these only. */
export const BROWSER_PRELOAD_SOUND_IDS: readonly string[] = [
  AssetIds.sounds.uiClick,
  AssetIds.sounds.levelStart,
  AssetIds.sounds.mergeMatch,
  AssetIds.sounds.matchCoin,
  AssetIds.sounds.boardMove,
  AssetIds.sounds.boardMoveBack,
  AssetIds.sounds.levelUp,
  AssetIds.sounds.enemyWalkLoop,
  AssetIds.sounds.fireWhoosh,
  AssetIds.sounds.iceWhoosh,
  AssetIds.sounds.lightningWhoosh,
  AssetIds.sounds.earthWhoosh,
  AssetIds.sounds.monsterDamage,
  AssetIds.sounds.monsterDefeat,
  AssetIds.sounds.playerDamage,
  AssetIds.sounds.playerDefeat,
  AssetIds.sounds.musicBackground,
];

export function getSoundManifestEntriesForBrowserPreload(): SoundManifestEntry[] {
  const allowed = new Set(BROWSER_PRELOAD_SOUND_IDS);
  return getSoundManifestEntries().filter((entry) => allowed.has(entry.id));
}

function spellAttackWhoosh(
  id: string,
  waveFileName: string,
  category: SoundEventCategory,
  scope: SoundScope,
  defaultVolume: number,
  fallback: FallbackSynthProfile,
  notes: string,
): SoundManifestEntry {
  return {
    id,
    browserUrl: browserSoundFileUrl(waveFileName),
    futureMhsPath: `${MHS_BASE}/${waveFileName}`,
    defaultVolume,
    category,
    scope,
    fallback,
    notes,
  };
}

function sound(
  id: string,
  fileStem: string,
  category: SoundEventCategory,
  scope: SoundScope,
  defaultVolume: number,
  fallback: FallbackSynthProfile,
  notes: string,
): SoundManifestEntry {
  return {
    id,
    browserUrl: browserSoundFileUrl(`${fileStem}.mp3`),
    futureMhsPath: `${MHS_BASE}/${fileStem}.mp3`,
    defaultVolume,
    category,
    scope,
    fallback,
    notes,
  };
}

function synth(
  waveform: FallbackWaveform,
  frequencyHz: number,
  durationMs: number,
): FallbackSynthProfile {
  return {
    waveform,
    frequencyHz,
    durationMs,
    attackMs: 6,
    releaseMs: 28,
  };
}
