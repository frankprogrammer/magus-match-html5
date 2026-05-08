import type { GamePhase } from '../core/Types';

export interface HudRenderState {
  phase: GamePhase;
  levelText: string;
  livesText: string;
  scoreText: string;
  objectiveText: string;
  muted: boolean;
  /** When true, background music is off (SFX still follow master mute). */
  bgmMuted: boolean;
  debugText?: string;
}
