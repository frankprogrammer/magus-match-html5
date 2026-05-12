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
      miniBossCount: miniBossCountForTrialDifficulty(difficulty),
      waveCount: 1,
      spawnIntervalMs: 1200,
      waveGapMs: 0,
      basicKoboldHp: 72,
      tallKoboldHp: 120,
      miniBossHp: 192,
      walkSpeed: 0.25,
      baseDamage: 12,
    };
  }

  if (difficulty <= 7) {
    return {
      basicKoboldCount: 5,
      tallKoboldCount: 1,
      miniBossCount: miniBossCountForTrialDifficulty(difficulty),
      waveCount: 1,
      spawnIntervalMs: 1050,
      waveGapMs: 0,
      basicKoboldHp: 104,
      tallKoboldHp: 130,
      miniBossHp: 208,
      walkSpeed: 0.275,
      baseDamage: 13,
    };
  }

  if (difficulty <= 12) {
    return {
      basicKoboldCount: 6,
      tallKoboldCount: 2,
      miniBossCount: miniBossCountForTrialDifficulty(difficulty),
      waveCount: 1,
      spawnIntervalMs: 950,
      waveGapMs: 0,
      basicKoboldHp: 140,
      tallKoboldHp: 168,
      miniBossHp: 224,
      walkSpeed: 0.35,
      baseDamage: 14,
    };
  }

  if (difficulty <= 18) {
    return {
      basicKoboldCount: 7,
      tallKoboldCount: 3,
      miniBossCount: miniBossCountForTrialDifficulty(difficulty),
      waveCount: 1,
      spawnIntervalMs: 850,
      waveGapMs: 0,
      basicKoboldHp: 180,
      tallKoboldHp: 210,
      miniBossHp: 240,
      walkSpeed: 0.4,
      baseDamage: 15,
    };
  }

  return {
    basicKoboldCount: 8,
    tallKoboldCount: 4,
    miniBossCount: miniBossCountForTrialDifficulty(difficulty),
    waveCount: 2,
    spawnIntervalMs: 750,
    waveGapMs: 2200,
    basicKoboldHp: 192,
    tallKoboldHp: 224,
    miniBossHp: 256,
    walkSpeed: 0.475,
    baseDamage: 16,
  };
}

function miniBossCountForTrialDifficulty(difficulty: number): number {
  if (difficulty >= 20 && difficulty % 5 === 0) {
    return 2;
  }

  return difficulty === 5 || difficulty === 10 || difficulty === 15 ? 1 : 0;
}
