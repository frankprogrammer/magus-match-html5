import type { LevelType, RunState } from '../core/Types';

export const INITIAL_LIVES = 3;
export const LEVEL_TRANSITION_HOLD_SEC = 1.2;

export function createInitialRunState(seed: number): RunState {
  return {
    seed,
    lives: INITIAL_LIVES,
    levelNumber: 1,
    difficulty: 1,
    score: 0,
    levelsCleared: 0,
  };
}

export function selectLevelTypeForRun(
  runSeed: number,
  levelNumber: number,
  forcedLevelType?: LevelType,
): LevelType {
  void runSeed;
  void levelNumber;

  if (forcedLevelType != null) {
    return forcedLevelType;
  }

  return 'TRIAL';
}

export function deriveLevelSeed(runSeed: number, levelNumber: number): number {
  return hashSeed(runSeed, levelNumber, 0x9e3779b9) || 1;
}

export function advanceRunAfterWin(run: RunState, scoreDelta: number): RunState {
  return {
    ...run,
    score: run.score + scoreDelta,
    levelsCleared: run.levelsCleared + 1,
    levelNumber: run.levelNumber + 1,
    difficulty: run.difficulty + 1,
  };
}

export function advanceRunAfterLoss(run: RunState): RunState {
  return {
    ...run,
    lives: Math.max(0, run.lives - 1),
    levelNumber: run.levelNumber + 1,
    difficulty: run.difficulty + 1,
  };
}

function hashSeed(seed: number, levelNumber: number, salt: number): number {
  let value = (seed ^ salt) >>> 0;
  value = Math.imul(value ^ levelNumber, 0x85ebca6b) >>> 0;
  value = Math.imul(value ^ (value >>> 13), 0xc2b2ae35) >>> 0;
  return (value ^ (value >>> 16)) >>> 0;
}
