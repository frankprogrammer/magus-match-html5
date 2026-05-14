import { describe, expect, it } from 'vitest';
import {
  ArtPrompts,
  GeneralArtPromptRules,
  LockedStyleLanguage,
  getArtPrompt,
  type ArtPromptId,
} from '../src/assets/ArtPrompts';

describe('ArtPrompts', () => {
  it('contains the locked style language and general output rules', () => {
    expect(LockedStyleLanguage).toContain('Hand-painted storybook fantasy');
    expect(LockedStyleLanguage).toContain('#4B2E83');
    expect(LockedStyleLanguage).toContain('#C8A24B');
    expect(GeneralArtPromptRules.some((rule) => rule.includes('transparent PNG'))).toBe(true);
    expect(GeneralArtPromptRules.some((rule) => rule.includes('no text'))).toBe(true);
  });

  it('defines all Phase 8 prompt batches', () => {
    const requiredIds: ArtPromptId[] = [
      'prompt.tiles.standard',
      'prompt.powerups.standard',
      'prompt.backdrops.hero',
      'prompt.rig.mage',
      'prompt.rig.kobolds',
    ];

    expect(ArtPrompts.map((prompt) => prompt.id).sort()).toEqual([...requiredIds].sort());
    for (const id of requiredIds) {
      expect(getArtPrompt(id).prompt).toContain(LockedStyleLanguage);
      expect(getArtPrompt(id).expectedFiles.length).toBeGreaterThan(0);
    }
  });
});
