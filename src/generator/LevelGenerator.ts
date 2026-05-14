import type { GeneratedTrialLevel } from './TrialGenerator';
import { generateTrialLevel } from './TrialGenerator';

export type GeneratedLevel = GeneratedTrialLevel;

export interface GenerateLevelOptions {
  levelNumber: number;
  difficulty: number;
  seed: number;
}

export function generateLevel(options: GenerateLevelOptions): GeneratedLevel {
  return generateTrialLevel(options);
}
