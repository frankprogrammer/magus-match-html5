import type { LevelType, Vec3Data } from './Types';

export type GameEvent =
  | { type: 'soundRequested'; soundId: string; intensity?: number; position?: Vec3Data }
  | { type: 'scoreChanged'; score: number }
  | { type: 'levelStarted'; levelNumber: number; levelType: LevelType; seed: number }
  | { type: 'levelEnded'; levelNumber: number; levelType: LevelType; result: 'win' | 'loss' }
  | { type: 'runEnded'; finalScore: number; levelsCleared: number }
  | { type: 'telemetry'; name: string; data: Record<string, string | number | boolean> };
