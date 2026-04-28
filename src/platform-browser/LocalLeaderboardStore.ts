import {
  parseLeaderboardJson,
  serializeLeaderboard,
  type LeaderboardEntry,
} from '../run/Leaderboard';

export const LOCAL_LEADERBOARD_KEY = 'magus-match.leaderboard.v1';

export class LocalLeaderboardStore {
  constructor(
    private readonly storage: Pick<Storage, 'getItem' | 'setItem'> = window.localStorage,
  ) {}

  load(): LeaderboardEntry[] {
    return parseLeaderboardJson(this.storage.getItem(LOCAL_LEADERBOARD_KEY));
  }

  save(entries: readonly LeaderboardEntry[]): void {
    this.storage.setItem(LOCAL_LEADERBOARD_KEY, serializeLeaderboard(entries));
  }
}
