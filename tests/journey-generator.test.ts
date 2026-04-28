import { describe, expect, it } from 'vitest';
import { generateLevel } from '../src/generator/LevelGenerator';
import { generateJourneyLevel, isJourneySolvable } from '../src/generator/JourneyGenerator';

describe('Journey generation', () => {
  it('generates level 1 as Journey', () => {
    const level = generateLevel({ levelNumber: 1, difficulty: 1, seed: 123 });

    expect(level.type).toBe('JOURNEY');
  });

  it('is deterministic for the same seed', () => {
    const first = generateJourneyLevel({ difficulty: 1, seed: 999 });
    const second = generateJourneyLevel({ difficulty: 1, seed: 999 });

    expect(serializeLevel(first)).toEqual(serializeLevel(second));
  });

  it('creates a candidate path from start to goal', () => {
    const level = generateJourneyLevel({ difficulty: 1, seed: 321 });
    const path = level.journey.candidatePathSolution;

    expect(path[0]).toEqual({ col: 0, row: 0 });
    expect(path[path.length - 1]).toEqual({ col: 7, row: 7 });
    expect(level.journey.startCell).toEqual({ col: 0, row: 0 });
    expect(level.journey.goalCell).toEqual({ col: 7, row: 7 });
  });

  it('passes the Phase 3 conservative solvability check', () => {
    const level = generateJourneyLevel({ difficulty: 1, seed: 456 });

    expect(isJourneySolvable(level)).toBe(true);
    expect(level.journey.candidatePathSolution.length - 1).toBeLessThanOrEqual(level.journey.moveBudget);
  });
});

function serializeLevel(level: ReturnType<typeof generateJourneyLevel>) {
  return {
    type: level.type,
    difficulty: level.difficulty,
    seed: level.seed,
    tiles: level.initialBoard.map((row) => row.map((cell) => cell.tile?.type ?? null)),
    path: level.journey.candidatePathSolution,
    land: level.journey.landTilePositions,
    hint: level.journey.firstHint,
  };
}
