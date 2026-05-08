import type { GamePhase } from '../core/Types';

export interface HudRenderState {
  phase: GamePhase;
  levelText: string;
  /** Remaining lives (0–3); rendered as heart icons in the HUD. */
  lives: number;
  scoreText: string;
  objectiveText: string;
  /** Trial levels: remaining monsters vs wave total; rendered as right-edge fill bar (replaces objective text). */
  trialMonsterFill: { remaining: number; total: number } | null;
  muted: boolean;
  /** When true, background music is off (SFX still follow master mute). */
  bgmMuted: boolean;
  debugText?: string;
}
