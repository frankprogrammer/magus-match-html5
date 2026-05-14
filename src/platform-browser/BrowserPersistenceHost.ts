import type { GameEvent } from '../core/GameEvents';
import {
  createLeaderboardEntry,
  insertLeaderboardEntry,
  type LeaderboardEntry,
} from '../run/Leaderboard';
import { LocalLeaderboardStore } from './LocalLeaderboardStore';

export class BrowserPersistenceHost {
  private leaderboardRowsInternal: readonly LeaderboardEntry[];
  private highlightedRankInternal: number | null = null;

  constructor(private readonly leaderboardStore = new LocalLeaderboardStore()) {
    this.leaderboardRowsInternal = this.leaderboardStore.load();
  }

  get leaderboardRows(): readonly LeaderboardEntry[] {
    return this.leaderboardRowsInternal;
  }

  get highlightedRank(): number | null {
    return this.highlightedRankInternal;
  }

  handleEvent(event: GameEvent, runSeed: number, nowMs = Date.now()): void {
    if (event.type === 'levelStarted') {
      this.highlightedRankInternal = null;
      return;
    }

    if (event.type !== 'runEnded') {
      return;
    }

    const entry = createLeaderboardEntry(
      event.finalScore,
      event.levelsCleared,
      runSeed,
      nowMs,
    );
    const result = insertLeaderboardEntry(this.leaderboardRowsInternal, entry);
    this.leaderboardRowsInternal = result.entries;
    this.highlightedRankInternal = result.qualifiedRank;
    this.leaderboardStore.save(this.leaderboardRowsInternal);
  }
}
