export const MAX_LEADERBOARD_ENTRIES = 10;

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  levelsCleared: number;
  createdAtMs: number;
}

export interface LeaderboardInsertResult {
  entries: readonly LeaderboardEntry[];
  qualifiedRank: number | null;
}

const HERO_ADJECTIVES = ['Brave', 'Mystic', 'Golden', 'Clever', 'Radiant', 'Stalwart', 'Arcane', 'Noble'];
const HERO_NOUNS = ['Magus', 'Warden', 'Sage', 'Spark', 'Voyager', 'Keeper', 'Knight', 'Seeker'];

export function insertLeaderboardEntry(
  currentEntries: readonly LeaderboardEntry[],
  entry: LeaderboardEntry,
): LeaderboardInsertResult {
  const sorted = sortLeaderboard([...currentEntries, entry]);
  const rank = sorted.findIndex((candidate) => candidate.id === entry.id) + 1;
  return {
    entries: sorted.slice(0, MAX_LEADERBOARD_ENTRIES),
    qualifiedRank: rank > 0 && rank <= MAX_LEADERBOARD_ENTRIES ? rank : null,
  };
}

export function sortLeaderboard(entries: readonly LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort(
    (first, second) =>
      second.score - first.score ||
      second.levelsCleared - first.levelsCleared ||
      second.createdAtMs - first.createdAtMs,
  );
}

export function getHighScore(entries: readonly LeaderboardEntry[]): number {
  return sortLeaderboard(entries)[0]?.score ?? 0;
}

export function createLeaderboardEntry(
  score: number,
  levelsCleared: number,
  runSeed: number,
  createdAtMs: number,
): LeaderboardEntry {
  return {
    id: `${createdAtMs}-${runSeed}-${score}`,
    name: generateHeroicName(runSeed + createdAtMs),
    score,
    levelsCleared,
    createdAtMs,
  };
}

export function generateHeroicName(seed: number): string {
  const adjective = HERO_ADJECTIVES[Math.abs(seed) % HERO_ADJECTIVES.length];
  const noun = HERO_NOUNS[Math.abs(Math.floor(seed / HERO_ADJECTIVES.length)) % HERO_NOUNS.length];
  return `${adjective} ${noun}`;
}

export function parseLeaderboardJson(raw: string | null): LeaderboardEntry[] {
  if (raw == null || raw.trim() === '') {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return sortLeaderboard(parsed.filter(isLeaderboardEntry)).slice(0, MAX_LEADERBOARD_ENTRIES);
  } catch {
    return [];
  }
}

export function serializeLeaderboard(entries: readonly LeaderboardEntry[]): string {
  return JSON.stringify(sortLeaderboard(entries).slice(0, MAX_LEADERBOARD_ENTRIES));
}

function isLeaderboardEntry(value: unknown): value is LeaderboardEntry {
  if (typeof value !== 'object' || value == null) {
    return false;
  }

  const entry = value as Record<string, unknown>;
  return (
    typeof entry.id === 'string' &&
    typeof entry.name === 'string' &&
    typeof entry.score === 'number' &&
    Number.isFinite(entry.score) &&
    typeof entry.levelsCleared === 'number' &&
    Number.isFinite(entry.levelsCleared) &&
    typeof entry.createdAtMs === 'number' &&
    Number.isFinite(entry.createdAtMs)
  );
}
