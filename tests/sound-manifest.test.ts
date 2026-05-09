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
      expect(entry.browserUrl).toMatch(/^\/assets\/audio\/.+\.(mp3|wav|ogg)$/);
      expect(entry.browserUrl).not.toContain('${');
      expect(entry.futureMhsPath).toMatch(/^Assets\/Audio\/.+\.(mp3|wav|ogg)$/);
      expect(entry.defaultVolume).toBeGreaterThan(0);
      expect(entry.defaultVolume).toBeLessThanOrEqual(1);
      expect(entry.fallback.durationMs).toBeGreaterThan(0);
    }
  });

  it('URL-encodes Start.ogg for level intro', () => {
    expect(SoundManifest[AssetIds.sounds.levelStart].browserUrl).toBe(
      `/assets/audio/${encodeURIComponent('Start.ogg')}`,
    );
  });

  it('URL-encodes Attack_Freeze.wav for ice spell whoosh', () => {
    expect(SoundManifest[AssetIds.sounds.iceWhoosh].browserUrl).toBe(
      `/assets/audio/${encodeURIComponent('Attack_Freeze.wav')}`,
    );
  });

  it('URL-encodes Die_Enemy.wav for monster defeat', () => {
    expect(SoundManifest[AssetIds.sounds.monsterDefeat].browserUrl).toBe(
      `/assets/audio/${encodeURIComponent('Die_Enemy.wav')}`,
    );
  });

  it('URL-encodes Hit_Enemy.wav for monster damage', () => {
    expect(SoundManifest[AssetIds.sounds.monsterDamage].browserUrl).toBe(
      `/assets/audio/${encodeURIComponent('Hit_Enemy.wav')}`,
    );
  });

  it('URL-encodes Hit_Player.wav for Trial mage hit', () => {
    expect(SoundManifest[AssetIds.sounds.playerDamage].browserUrl).toBe(
      `/assets/audio/${encodeURIComponent('Hit_Player.wav')}`,
    );
  });

  it('URL-encodes Die_Player.wav for Trial mage defeat', () => {
    expect(SoundManifest[AssetIds.sounds.playerDefeat].browserUrl).toBe(
      `/assets/audio/${encodeURIComponent('Die_Player.wav')}`,
    );
  });

  it('URL-encodes Background.wav for looping BGM', () => {
    expect(SoundManifest[AssetIds.sounds.musicBackground].browserUrl).toBe(
      `/assets/audio/${encodeURIComponent('Background.wav')}`,
    );
  });

  it('URL-encodes Click.ogg for UI button click', () => {
    expect(SoundManifest[AssetIds.sounds.uiClick].browserUrl).toBe(
      `/assets/audio/${encodeURIComponent('Click.ogg')}`,
    );
  });

  it('URL-encodes Merge.ogg for successful match merge', () => {
    expect(SoundManifest[AssetIds.sounds.mergeMatch].browserUrl).toBe(
      `/assets/audio/${encodeURIComponent('Merge.ogg')}`,
    );
  });

  it('URL-encodes Coin.wav for match score pickup', () => {
    expect(SoundManifest[AssetIds.sounds.matchCoin].browserUrl).toBe(
      `/assets/audio/${encodeURIComponent('Coin.wav')}`,
    );
  });

  it('URL-encodes Activarion_Bomb.wav for TNT activation', () => {
    expect(SoundManifest[AssetIds.sounds.powerupBombActivate].browserUrl).toBe(
      `/assets/audio/${encodeURIComponent('Activarion_Bomb.wav')}`,
    );
  });

  it('URL-encodes Activation_Star.wav for rocket activation', () => {
    expect(SoundManifest[AssetIds.sounds.powerupRocketActivate].browserUrl).toBe(
      `/assets/audio/${encodeURIComponent('Activation_Star.wav')}`,
    );
  });

  it('URL-encodes Game_Over.wav for run end', () => {
    expect(SoundManifest[AssetIds.sounds.runEnd].browserUrl).toBe(
      `/assets/audio/${encodeURIComponent('Game_Over.wav')}`,
    );
  });

  it('keeps soundRequested payloads JSON-compatible with Phase 9 fields', () => {
    const event: GameEvent = {
      type: 'soundRequested',
      soundId: AssetIds.sounds.tileMatch,
      volume: 0.5,
      playbackRate: 1.15,
      category: 'match',
      delaySec: 0.22,
    };

    expect(JSON.parse(JSON.stringify(event))).toEqual(event);
  });
});
