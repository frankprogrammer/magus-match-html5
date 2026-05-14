import { describe, expect, it } from 'vitest';
import {
  advanceRunAfterLoss,
  advanceRunAfterWin,
  createInitialRunState,
  deriveLevelSeed,
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

  it('derives stable level seeds', () => {
    expect(deriveLevelSeed(42, 5)).toBe(deriveLevelSeed(42, 5));
    expect(deriveLevelSeed(42, 5)).not.toBe(deriveLevelSeed(42, 6));
  });

  it('advances run state after wins and restarts the current level after losses', () => {
    const initial = createInitialRunState(88);
    const won = advanceRunAfterWin(initial, 1234);
    const lost = advanceRunAfterLoss(initial);
    const laterLoss = advanceRunAfterLoss({
      ...initial,
      lives: 2,
      levelNumber: 5,
      difficulty: 5,
      levelsCleared: 4,
      score: 900,
    });

    expect(won).toMatchObject({
      score: 1234,
      levelsCleared: 1,
      levelNumber: 2,
      difficulty: 2,
      lives: 3,
    });
    expect(lost).toMatchObject({
      lives: 2,
      levelNumber: 1,
      difficulty: 1,
      levelsCleared: 0,
    });
    expect(laterLoss).toMatchObject({
      score: 900,
      lives: 1,
      levelNumber: 5,
      difficulty: 5,
      levelsCleared: 4,
    });
  });
});
