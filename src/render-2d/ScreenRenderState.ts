import type { GamePhase } from '../core/Types';
import type { UiRect } from '../core/Layout';
import type { LeaderboardEntry } from '../run/Leaderboard';

export type ScreenKind = 'play' | 'gameOver';

export interface ScreenButtonRects {
  tryAgain: UiRect;
  mute: UiRect;
  bgm: UiRect;
}

export interface ScreenRenderState {
  screen: ScreenKind;
  phase: GamePhase;
  finalScore: number;
  highScore: number;
  leaderboardRows: readonly LeaderboardEntry[];
  highlightedRank: number | null;
  buttonRects: ScreenButtonRects;
  muted: boolean;
  transitionText: string | null;
  /** Browser shell: true while pointer is down on game-over Try Again. */
  overlayPrimaryButtonPressed?: boolean;
}
