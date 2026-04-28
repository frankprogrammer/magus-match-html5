import { describe, expect, it } from 'vitest';
import { AssetIds } from '../src/assets/AssetIds';
import { SoundManifest } from '../src/audio/SoundManifest';
import type { GameEvent } from '../src/core/GameEvents';

describe('SoundManifest', () => {
  it('contains every current sound id with static browser and MHS paths', () => {
    for (const soundId of Object.values(AssetIds.sounds)) {
      const entry = SoundManifest[soundId];

      expect(entry, soundId).toBeDefined();
      expect(entry.id).toBe(soundId);
      expect(entry.browserUrl).toMatch(/^\/assets\/audio\/.+\.mp3$/);
      expect(entry.browserUrl).not.toContain('${');
      expect(entry.futureMhsPath).toMatch(/^Assets\/Audio\/.+\.mp3$/);
      expect(entry.defaultVolume).toBeGreaterThan(0);
      expect(entry.defaultVolume).toBeLessThanOrEqual(1);
      expect(entry.fallback.durationMs).toBeGreaterThan(0);
    }
  });

  it('keeps soundRequested payloads JSON-compatible with Phase 9 fields', () => {
    const event: GameEvent = {
      type: 'soundRequested',
      soundId: AssetIds.sounds.tileMatch,
      volume: 0.5,
      playbackRate: 1.15,
      category: 'match',
    };

    expect(JSON.parse(JSON.stringify(event))).toEqual(event);
  });
});
