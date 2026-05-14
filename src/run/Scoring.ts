export interface SwapScoringStats {
  matchCount: number;
  comboCount: number;
  powerUpsCreated: number;
  validSwapCount: number;
}

export const EMPTY_SWAP_SCORING_STATS: SwapScoringStats = {
  matchCount: 0,
  comboCount: 0,
  powerUpsCreated: 0,
  validSwapCount: 0,
};

export function difficultyMultiplier(difficulty: number): number {
  return 1 + 0.1 * difficulty;
}

export function scoreTrialClear(
  difficulty: number,
  matchCount: number,
  elapsedSec: number,
): number {
  const matchesPerSecond = elapsedSec > 0 ? matchCount / elapsedSec : 0;
  const paceBonus = Math.max(0, matchesPerSecond - 1) * 100;
  return Math.round(1000 * difficultyMultiplier(difficulty) + paceBonus);
}

export function scoreSwapStats(stats: SwapScoringStats): number {
  return stats.comboCount * 100 + stats.powerUpsCreated * 200;
}

export function createSwapScoringStats(
  matchCount: number,
  powerUpsCreated: number,
  validSwapCount = 1,
): SwapScoringStats {
  return {
    matchCount,
    comboCount: Math.max(0, matchCount - 1),
    powerUpsCreated,
    validSwapCount,
  };
}
