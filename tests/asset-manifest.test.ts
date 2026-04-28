import { describe, expect, it } from 'vitest';
import { AssetIds } from '../src/assets/AssetIds';
import { AssetManifest } from '../src/assets/AssetManifest';

describe('AssetManifest', () => {
  it('contains entries for all current tiles, power-ups, backdrops, rigs, key props, and sounds', () => {
    const requiredIds = [
      ...Object.values(AssetIds.tiles),
      ...Object.values(AssetIds.powerUps),
      ...Object.values(AssetIds.backdrops),
      ...Object.values(AssetIds.rigs),
      ...Object.values(AssetIds.sounds),
      AssetIds.props.princeCage,
      AssetIds.props.goalFlag,
      AssetIds.props.abductorGlove,
      AssetIds.props.abductorHook,
      AssetIds.props.abductorHand,
      AssetIds.props.abductorRope,
    ];

    for (const id of requiredIds) {
      expect(AssetManifest[id], id).toBeDefined();
      expect(AssetManifest[id].id).toBe(id);
    }
  });

  it('uses static browser URLs, source formats, and future MHS paths', () => {
    for (const entry of Object.values(AssetManifest)) {
      expect(entry.browserUrl).toMatch(/^\/assets\//);
      expect(entry.browserUrl).not.toContain('${');
      expect(entry.sourceFormat).toBeDefined();
      expect(entry.futureMhsPath).toBeDefined();
      expect(entry.futureMhsPath).not.toContain('${');
      if (entry.kind === 'audio') {
        expect(entry.browserUrl).toMatch(/^\/assets\/audio\//);
        expect(entry.notes).toContain('SoundComponent');
      } else {
        expect(entry.artPromptId).toBeDefined();
      }
    }
  });

  it('documents runtime size policy for board textures', () => {
    expect(AssetManifest[AssetIds.tiles.fire].browserUrl).toBe('/assets/tiles/tile-fire.png');
    expect(AssetManifest[AssetIds.powerUps.rocketH].browserUrl).toBe('/assets/powerups/power-rocket-h.png');
    expect(AssetManifest[AssetIds.tiles.fire].runtimeSize).toBe('256x256');
    expect(AssetManifest[AssetIds.backdrops.forest].runtimeSize).toBe('2160x1000');
  });
});
