import type { CellCoord } from './Layout';

export type LevelType = 'JOURNEY' | 'TRIAL';

export type GamePhase =
  | 'BOOT'
  | 'TITLE'
  | 'LEVEL_INTRO'
  | 'IDLE'
  | 'SWAP_VALIDATING'
  | 'RESOLVE_MATCHES'
  | 'POWERUP_DETONATE'
  | 'STAGE_UPDATE'
  | 'CHECK_WIN'
  | 'WIN'
  | 'LOSE'
  | 'INTERSTITIAL'
  | 'GAME_OVER';

export interface Vec3Data {
  x: number;
  y: number;
  z: number;
}

export interface RunState {
  seed: number;
  lives: number;
  levelNumber: number;
  difficulty: number;
  score: number;
  levelsCleared: number;
}

export type { CellCoord };
