import type { GamePhase } from '../core/Types';

export interface HudRenderState {
  phase: GamePhase;
  levelText: string;
  livesText: string;
  scoreText: string;
  objectiveText: string;
  muted: boolean;
  debugText?: string;
}
