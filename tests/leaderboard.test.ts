import { describe, expect, it } from 'vitest';
import {
  createLeaderboardEntry,
  generateHeroicName,
  insertLeaderboardEntry,
  parseLeaderboardJson,
  serializeLeaderboard,
} from '../src/run/Leaderboard';

describe('leaderboard', () => {
  it('sorts by score, levels cleared, and newest entry while trimming to Top 10', () => {
    const entries = Array.from({ length: 11 }, (_, index) => ({
      id: `${index}`,
      name: `Hero ${index}`,
      score: 100 + index,
      levelsCleared: index,
      createdAtMs: index,
    }));
    const entry = { id: 'new', name: 'New Hero', score: 105, levelsCleared: 99, createdAtMs: 99 };
    const result = insertLeaderboardEntry(entries, entry);

    expect(result.entries).toHaveLength(10);
    expect(result.entries[0].score).toBe(110);
    expect(result.entries.findIndex((candidate) => candidate.id === 'new')).toBeLessThan(10);
    expect(result.qualifiedRank).not.toBeNull();
  });

  it('rejects malformed stored data by falling back to an empty leaderboard', () => {
    expect(parseLeaderboardJson('not-json')).toEqual([]);
    expect(parseLeaderboardJson(JSON.stringify({ bad: true }))).toEqual([]);
  });

  it('serializes valid entries and creates generated heroic default names', () => {
    const entry = createLeaderboardEntry(1200, 3, 42, 1000);
    const parsed = parseLeaderboardJson(serializeLeaderboard([entry]));

    expect(parsed).toEqual([entry]);
    expect(generateHeroicName(42)).toContain(' ');
  });
});
