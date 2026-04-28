import type { LevelType } from '../core/Types';
import type { GeneratedJourneyLevel } from './JourneyGenerator';
import { generateJourneyLevel } from './JourneyGenerator';
import type { GeneratedTrialLevel } from './TrialGenerator';
import { generateTrialLevel } from './TrialGenerator';

export type GeneratedLevel = GeneratedJourneyLevel | GeneratedTrialLevel;

export interface GenerateLevelOptions {
  levelNumber: number;
  difficulty: number;
  seed: number;
  forcedLevelType?: LevelType;
}

export function generateLevel(options: GenerateLevelOptions): GeneratedLevel {
  if (options.forcedLevelType === 'TRIAL') {
    return generateTrialLevel(options);
  }

  if (options.forcedLevelType === 'JOURNEY') {
    return generateJourneyLevel(options);
  }

  if (options.levelNumber !== 1) {
    return generateJourneyLevel(options);
  }

  return generateJourneyLevel(options);
}
