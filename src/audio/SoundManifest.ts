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
  [AssetIds.sounds.comboPitchStep]: sound(
    AssetIds.sounds.comboPitchStep,
    'combo-pitch-step',
    'match',
    'global',
    0.48,
    synth('triangle', 560, 85),
    'Cascade ladder step; browser playbackRate is used for rising pitch.',
  ),
  [AssetIds.sounds.fireWhoosh]: sound(
    AssetIds.sounds.fireWhoosh,
    'spell-fire-whoosh',
    'spell',
    'templateLocal',
    0.42,
    synth('sawtooth', 330, 120),
    'Fire spell launch whoosh, local to mage/projectile template in MHS.',
  ),
  [AssetIds.sounds.iceWhoosh]: sound(
    AssetIds.sounds.iceWhoosh,
    'spell-ice-whoosh',
    'spell',
    'templateLocal',
    0.38,
    synth('sine', 620, 120),
    'Ice spell launch shimmer, local to mage/projectile template in MHS.',
  ),
  [AssetIds.sounds.lightningWhoosh]: sound(
    AssetIds.sounds.lightningWhoosh,
    'spell-lightning-whoosh',
    'spell',
    'templateLocal',
    0.38,
    synth('square', 740, 75),
    'Lightning spell launch snap, local to mage/projectile template in MHS.',
  ),
  [AssetIds.sounds.earthWhoosh]: sound(
    AssetIds.sounds.earthWhoosh,
    'spell-earth-whoosh',
    'spell',
    'templateLocal',
    0.42,
    synth('triangle', 230, 130),
    'Earth spell launch thump, local to mage/projectile template in MHS.',
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
  [AssetIds.sounds.monsterDamage]: sound(
    AssetIds.sounds.monsterDamage,
    'monster-damage',
    'enemy',
    'templateLocal',
    0.44,
    synth('noise', 180, 95),
    'Monster damage response, local to monster template in MHS.',
  ),
  [AssetIds.sounds.monsterDefeat]: sound(
    AssetIds.sounds.monsterDefeat,
    'monster-defeat',
    'enemy',
    'templateLocal',
    0.54,
    synth('noise', 140, 170),
    'Monster defeat burst, local to monster template in MHS.',
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
} satisfies Record<string, SoundManifestEntry>;

export function getSoundManifestEntry(soundId: string): SoundManifestEntry | undefined {
  const manifest = SoundManifest as Record<string, SoundManifestEntry | undefined>;
  return manifest[soundId];
}

export function getSoundManifestEntries(): SoundManifestEntry[] {
  return Object.values(SoundManifest);
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
    browserUrl: `${SOUND_BASE}/${fileStem}.mp3`,
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
