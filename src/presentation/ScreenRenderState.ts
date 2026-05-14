import type { GamePhase } from '../core/Types';
import type { UiRect } from '../core/Layout';
import type { LeaderboardEntry } from '../run/Leaderboard';

export type ScreenKind = 'play' | 'gameOver';

export interface ScreenButtonRects {
  tryAgain: UiRect;
  mute: UiRect;
  bgm: UiRect;
}

export interface ScreenImageOverlayState {
  assetId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  alpha: number;
  zIndex: number;
}

export interface GameOverMetricState {
  label: string;
  targetValue: number;
  displayValue: number | null;
}

export interface ScreenRenderState {
  screen: ScreenKind;
  phase: GamePhase;
  finalScore: number;
  gameOverMetrics?: readonly GameOverMetricState[];
  highScore: number;
  leaderboardRows: readonly LeaderboardEntry[];
  highlightedRank: number | null;
  buttonRects: ScreenButtonRects;
  muted: boolean;
  transitionText: string | null;
  transitionImageOverlay?: ScreenImageOverlayState | null;
  /** Browser shell: true while pointer is down on game-over Try Again. */
  overlayPrimaryButtonPressed?: boolean;
}
