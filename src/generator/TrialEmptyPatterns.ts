import type { CellCoord } from '../core/Layout';
import type { SeededRng } from '../core/Rng';

export function getTrialEmptyCellBudget(difficulty: number): number {
  if (difficulty <= 1) {
    return 0;
  }

  if (difficulty <= 3) {
    return 2;
  }

  if (difficulty <= 6) {
    return 4;
  }

  if (difficulty <= 10) {
    return 6;
  }

  return 8;
}

export function createTrialEmptyCellPattern(difficulty: number, rng: SeededRng): CellCoord[] {
  const budget = getTrialEmptyCellBudget(difficulty);
  if (budget <= 0) {
    return [];
  }

  const candidates = TRIAL_EMPTY_PATTERNS.filter((pattern) => pattern.length === budget);
  const pattern = candidates[rng.nextInt(0, candidates.length)] ?? [];
  return pattern.map((coord) => ({ ...coord }));
}

export function getFallbackTrialEmptyCellPatterns(difficulty: number): CellCoord[][] {
  const budget = getTrialEmptyCellBudget(difficulty);
  return TRIAL_EMPTY_PATTERNS
    .filter((pattern) => pattern.length <= budget)
    .sort((first, second) => second.length - first.length)
    .map((pattern) => pattern.map((coord) => ({ ...coord })));
}

const TRIAL_EMPTY_PATTERNS: readonly (readonly CellCoord[])[] = [
  [
    { col: 2, row: 3 },
    { col: 5, row: 3 },
  ],
  [
    { col: 1, row: 4 },
    { col: 6, row: 4 },
  ],
  [
    { col: 3, row: 2 },
    { col: 4, row: 2 },
  ],
  [
    { col: 1, row: 3 },
    { col: 1, row: 4 },
    { col: 6, row: 3 },
    { col: 6, row: 4 },
  ],
  [
    { col: 2, row: 2 },
    { col: 2, row: 5 },
    { col: 5, row: 2 },
    { col: 5, row: 5 },
  ],
  [
    { col: 3, row: 3 },
    { col: 4, row: 3 },
    { col: 3, row: 4 },
    { col: 4, row: 4 },
  ],
  [
    { col: 1, row: 2 },
    { col: 1, row: 3 },
    { col: 1, row: 4 },
    { col: 6, row: 2 },
    { col: 6, row: 3 },
    { col: 6, row: 4 },
  ],
  [
    { col: 2, row: 2 },
    { col: 2, row: 5 },
    { col: 3, row: 3 },
    { col: 4, row: 3 },
    { col: 5, row: 2 },
    { col: 5, row: 5 },
  ],
  [
    { col: 1, row: 2 },
    { col: 1, row: 5 },
    { col: 2, row: 3 },
    { col: 5, row: 3 },
    { col: 6, row: 2 },
    { col: 6, row: 5 },
  ],
  [
    { col: 1, row: 2 },
    { col: 1, row: 3 },
    { col: 2, row: 2 },
    { col: 2, row: 3 },
    { col: 5, row: 2 },
    { col: 5, row: 3 },
    { col: 6, row: 2 },
    { col: 6, row: 3 },
  ],
  [
    { col: 1, row: 3 },
    { col: 1, row: 4 },
    { col: 2, row: 4 },
    { col: 3, row: 5 },
    { col: 4, row: 5 },
    { col: 5, row: 4 },
    { col: 6, row: 3 },
    { col: 6, row: 4 },
  ],
  [
    { col: 2, row: 1 },
    { col: 5, row: 1 },
    { col: 1, row: 3 },
    { col: 6, row: 3 },
    { col: 1, row: 4 },
    { col: 6, row: 4 },
    { col: 2, row: 6 },
    { col: 5, row: 6 },
  ],
];
