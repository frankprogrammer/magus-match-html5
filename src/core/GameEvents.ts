import type { LevelType, Vec3Data } from './Types';

export type SoundEventCategory = 'match' | 'spell' | 'enemy' | 'level' | 'run' | 'ui';

export type GameEvent =
  | {
      type: 'soundRequested';
      soundId: string;
      intensity?: number;
      position?: Vec3Data;
      volume?: number;
      playbackRate?: number;
      category?: SoundEventCategory;
      /** Play this many seconds after the event is handled (spell impact sync). */
      delaySec?: number;
    }
  | { type: 'scoreChanged'; score: number }
  | { type: 'levelStarted'; levelNumber: number; levelType: LevelType; seed: number }
  | { type: 'levelEnded'; levelNumber: number; levelType: LevelType; result: 'win' | 'loss' }
  | { type: 'runEnded'; finalScore: number; levelsCleared: number }
  | { type: 'telemetry'; name: string; data: Record<string, string | number | boolean> };
