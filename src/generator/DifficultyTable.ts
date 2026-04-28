export interface JourneyDifficultyConfig {
  moveBudget: number;
  candidatePathLandRatio: number;
  offPathLandRatio: number;
}

export function getJourneyDifficultyConfig(difficulty: number): JourneyDifficultyConfig {
  if (difficulty <= 3) {
    return { moveBudget: 20, candidatePathLandRatio: 0.5, offPathLandRatio: 0.2 };
  }

  if (difficulty <= 7) {
    return { moveBudget: 18, candidatePathLandRatio: 0.45, offPathLandRatio: 0.18 };
  }

  if (difficulty <= 12) {
    return { moveBudget: 16, candidatePathLandRatio: 0.4, offPathLandRatio: 0.16 };
  }

  if (difficulty <= 18) {
    return { moveBudget: 15, candidatePathLandRatio: 0.36, offPathLandRatio: 0.14 };
  }

  return { moveBudget: 14, candidatePathLandRatio: 0.32, offPathLandRatio: 0.12 };
}
