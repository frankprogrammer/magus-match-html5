import { describe, expect, it } from 'vitest';
import {
  createSwapScoringStats,
  scoreSwapStats,
  scoreTrialClear,
} from '../src/run/Scoring';

describe('Phase 7 scoring', () => {
  it('scores Trial clears with match pace above one match per second', () => {
    expect(scoreTrialClear(1, 10, 10)).toBe(1100);
    expect(scoreTrialClear(1, 20, 10)).toBe(1200);
  });

  it('scores combo matches and power-up creation from swap stats', () => {
    const stats = createSwapScoringStats(4, 2);

    expect(stats).toEqual({
      matchCount: 4,
      comboCount: 3,
      powerUpsCreated: 2,
      validSwapCount: 1,
    });
    expect(scoreSwapStats(stats)).toBe(700);
  });
});
