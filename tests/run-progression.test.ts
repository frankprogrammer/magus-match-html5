import { describe, expect, it } from 'vitest';
import {
  advanceRunAfterLoss,
  advanceRunAfterWin,
  createInitialRunState,
  deriveLevelSeed,
  selectLevelTypeForRun,
} from '../src/run/RunProgression';

describe('run progression', () => {
  it('starts with the Phase 7 run defaults', () => {
    expect(createInitialRunState(123)).toEqual({
      seed: 123,
      lives: 3,
      levelNumber: 1,
      difficulty: 1,
      score: 0,
      levelsCleared: 0,
    });
  });

  it('always selects Journey for level 1 and deterministic mixed types afterward', () => {
    expect(selectLevelTypeForRun(42, 1)).toBe('JOURNEY');

    const firstPass = Array.from({ length: 12 }, (_, index) => selectLevelTypeForRun(42, index + 2));
    const secondPass = Array.from({ length: 12 }, (_, index) => selectLevelTypeForRun(42, index + 2));

    expect(firstPass).toEqual(secondPass);
    expect(firstPass).toContain('JOURNEY');
    expect(firstPass).toContain('TRIAL');
  });

  it('respects debug level type overrides and derives stable level seeds', () => {
    expect(selectLevelTypeForRun(42, 1, 'TRIAL')).toBe('TRIAL');
    expect(deriveLevelSeed(42, 5)).toBe(deriveLevelSeed(42, 5));
    expect(deriveLevelSeed(42, 5)).not.toBe(deriveLevelSeed(42, 6));
  });

  it('advances run state after wins and losses', () => {
    const initial = createInitialRunState(88);
    const won = advanceRunAfterWin(initial, 1234);
    const lost = advanceRunAfterLoss(initial);

    expect(won).toMatchObject({
      score: 1234,
      levelsCleared: 1,
      levelNumber: 2,
      difficulty: 2,
      lives: 3,
    });
    expect(lost).toMatchObject({
      lives: 2,
      levelNumber: 2,
      difficulty: 2,
      levelsCleared: 0,
    });
  });
});
