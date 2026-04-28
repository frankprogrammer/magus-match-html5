import type { GeneratedJourneyLevel } from './JourneyGenerator';
import { generateJourneyLevel } from './JourneyGenerator';

export type GeneratedLevel = GeneratedJourneyLevel;

export interface GenerateLevelOptions {
  levelNumber: number;
  difficulty: number;
  seed: number;
}

export function generateLevel(options: GenerateLevelOptions): GeneratedLevel {
  if (options.levelNumber !== 1) {
    return generateJourneyLevel(options);
  }

  return generateJourneyLevel(options);
}
