export interface JourneyDifficultyConfig {
  moveBudget: number;
  candidatePathLandRatio: number;
  offPathLandRatio: number;
}

export interface TrialDifficultyConfig {
  basicKoboldCount: number;
  tallKoboldCount: number;
  miniBossCount: number;
  waveCount: number;
  spawnIntervalMs: number;
  waveGapMs: number;
  basicKoboldHp: number;
  tallKoboldHp: number;
  miniBossHp: number;
  walkSpeed: number;
  baseDamage: number;
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

export function getTrialDifficultyConfig(difficulty: number): TrialDifficultyConfig {
  if (difficulty <= 3) {
    return {
      basicKoboldCount: 3,
      tallKoboldCount: 0,
      miniBossCount: 0,
      waveCount: 1,
      spawnIntervalMs: 1200,
      waveGapMs: 0,
      basicKoboldHp: 18,
      tallKoboldHp: 40,
      miniBossHp: 100,
      walkSpeed: 0.2,
      baseDamage: 12,
    };
  }

  if (difficulty <= 7) {
    return {
      basicKoboldCount: 5,
      tallKoboldCount: 1,
      miniBossCount: 0,
      waveCount: 1,
      spawnIntervalMs: 1050,
      waveGapMs: 0,
      basicKoboldHp: 24,
      tallKoboldHp: 46,
      miniBossHp: 110,
      walkSpeed: 0.22,
      baseDamage: 13,
    };
  }

  if (difficulty <= 12) {
    return {
      basicKoboldCount: 6,
      tallKoboldCount: 2,
      miniBossCount: 0,
      waveCount: 1,
      spawnIntervalMs: 950,
      waveGapMs: 0,
      basicKoboldHp: 30,
      tallKoboldHp: 58,
      miniBossHp: 120,
      walkSpeed: 0.28,
      baseDamage: 14,
    };
  }

  if (difficulty <= 18) {
    return {
      basicKoboldCount: 7,
      tallKoboldCount: 3,
      miniBossCount: difficulty % 3 === 0 ? 1 : 0,
      waveCount: 1,
      spawnIntervalMs: 850,
      waveGapMs: 0,
      basicKoboldHp: 38,
      tallKoboldHp: 72,
      miniBossHp: 135,
      walkSpeed: 0.32,
      baseDamage: 15,
    };
  }

  return {
    basicKoboldCount: 8,
    tallKoboldCount: 4,
    miniBossCount: 2,
    waveCount: 2,
    spawnIntervalMs: 750,
    waveGapMs: 2200,
    basicKoboldHp: 45,
    tallKoboldHp: 86,
    miniBossHp: 160,
    walkSpeed: 0.38,
    baseDamage: 16,
  };
}
