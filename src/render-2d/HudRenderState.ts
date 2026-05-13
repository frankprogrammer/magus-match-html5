import type { GamePhase } from '../core/Types';

export interface HudRenderState {
  phase: GamePhase;
  levelText: string;
  /** Remaining lives (0–3); rendered as heart icons in the HUD. */
  lives: number;
  scoreText: string;
  objectiveText: string;
  /** Trial levels: enemies still left to kill, including not-yet-spawned enemies. */
  trialEnemyCount: { remaining: number } | null;
  muted: boolean;
  /** When true, background music is off (SFX still follow master mute). */
  bgmMuted: boolean;
  debugText?: string;
}
