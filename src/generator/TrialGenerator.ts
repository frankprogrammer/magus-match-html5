import { createPlayableStandardBoard } from '../board/BoardSolver';
import type { Board } from '../board/Board';
import { SeededRng } from '../core/Rng';
import { getTrialDifficultyConfig } from './DifficultyTable';
import { createTrialEmptyCellPattern, getFallbackTrialEmptyCellPatterns } from './TrialEmptyPatterns';

export type TrialMonsterKind = 'kobold' | 'tallKobold' | 'miniBoss';

export interface TrialLane {
  laneId: number;
  x: number;
  spawnY: number;
}

export interface TrialMonsterManifestEntry {
  monsterId: string;
  kind: TrialMonsterKind;
  laneId: number;
  spawnTimeMs: number;
  maxHp: number;
  walkSpeed: number;
  scoreValue: number;
}

export interface GeneratedTrialLevel {
  type: 'TRIAL';
  difficulty: number;
  seed: number;
  initialBoard: Board;
  trial: {
    lanes: readonly TrialLane[];
    mageLineY: number;
    failLineY: number;
    baseDamage: number;
    waveManifest: readonly TrialMonsterManifestEntry[];
  };
}

export interface GenerateTrialLevelOptions {
  difficulty: number;
  seed: number;
}

const TRIAL_LANES: readonly TrialLane[] = [
  { laneId: 0, x: -4.1, spawnY: 1.72 },
  { laneId: 1, x: -2.05, spawnY: 1.72 },
  { laneId: 2, x: 0, spawnY: 1.72 },
  { laneId: 3, x: 2.05, spawnY: 1.72 },
  { laneId: 4, x: 4.1, spawnY: 1.72 },
];

export const TRIAL_MAGE_LINE_Y = -1.62;
export const TRIAL_FAIL_LINE_Y = -1.42;

export function generateTrialLevel(options: GenerateTrialLevelOptions): GeneratedTrialLevel {
  const rng = new SeededRng(options.seed);
  const config = getTrialDifficultyConfig(options.difficulty);
  const initialBoard = createTrialInitialBoard(rng, options.difficulty);
  const manifest = tuneManifestForClearability(
    createWaveManifest(rng, options.difficulty),
    config.baseDamage,
  );

  return {
    type: 'TRIAL',
    difficulty: options.difficulty,
    seed: options.seed,
    initialBoard,
    trial: {
      lanes: TRIAL_LANES,
      mageLineY: TRIAL_MAGE_LINE_Y,
      failLineY: TRIAL_FAIL_LINE_Y,
      baseDamage: config.baseDamage,
      waveManifest: manifest,
    },
  };
}

export function createTrialInitialBoard(rng: SeededRng, difficulty: number): Board {
  const preferredPattern = createTrialEmptyCellPattern(difficulty, rng);
  const fallbackPatterns = getFallbackTrialEmptyCellPatterns(difficulty);
  const patterns = uniquePatterns([preferredPattern, ...fallbackPatterns, []]);

  for (const voidCells of patterns) {
    try {
      return createPlayableStandardBoard(rng, {
        voidCells,
        minValidMoves: 3,
        maxAttempts: 120,
      });
    } catch {
      // Try a less restrictive pattern below.
    }
  }

  return createPlayableStandardBoard(rng, { minValidMoves: 3, maxAttempts: 120 });
}

export function createWaveManifest(
  rng: SeededRng,
  difficulty: number,
): TrialMonsterManifestEntry[] {
  const config = getTrialDifficultyConfig(difficulty);
  const kinds: TrialMonsterKind[] = [
    ...Array.from({ length: config.basicKoboldCount }, () => 'kobold' as const),
    ...Array.from({ length: config.tallKoboldCount }, () => 'tallKobold' as const),
    ...Array.from({ length: config.miniBossCount }, () => 'miniBoss' as const),
  ];
  const shuffledKinds = shuffle(kinds, rng);
  const waveCount = Math.max(1, config.waveCount);
  const monstersPerWave = Math.ceil(shuffledKinds.length / waveCount);

  return shuffledKinds.map((kind, index) => {
    const waveIndex = Math.floor(index / monstersPerWave);
    const localIndex = index % monstersPerWave;
    return {
      monsterId: `trial-${difficulty}-${index}`,
      kind,
      laneId: rng.nextInt(0, TRIAL_LANES.length),
      spawnTimeMs: waveIndex * config.waveGapMs + localIndex * config.spawnIntervalMs,
      maxHp: hpForKind(kind, config),
      walkSpeed: config.walkSpeed,
      scoreValue: scoreValueForKind(kind),
    };
  });
}

export function isTrialManifestClearable(
  manifest: readonly TrialMonsterManifestEntry[],
  baseDamage: number,
): boolean {
  if (manifest.length === 0) {
    return true;
  }

  const lastSpawnMs = Math.max(...manifest.map((monster) => monster.spawnTimeMs));
  const slowestWalkSpeed = Math.min(...manifest.map((monster) => monster.walkSpeed));
  const availableSec =
    lastSpawnMs / 1000 +
    (TRIAL_LANES[0].spawnY - TRIAL_FAIL_LINE_Y) / slowestWalkSpeed;
  const expectedAverageSkillDamage = availableSec * 1.5 * baseDamage * 0.2;
  const totalHp = manifest.reduce((sum, monster) => sum + monster.maxHp, 0);

  return expectedAverageSkillDamage >= totalHp;
}

function tuneManifestForClearability(
  manifest: readonly TrialMonsterManifestEntry[],
  baseDamage: number,
): TrialMonsterManifestEntry[] {
  let tunedManifest = manifest.map((monster) => ({ ...monster }));
  for (let attempt = 0; attempt < 10; attempt += 1) {
    if (isTrialManifestClearable(tunedManifest, baseDamage)) {
      return tunedManifest;
    }

    tunedManifest = tunedManifest.map((monster) => ({
      ...monster,
      maxHp: Math.max(1, Math.floor(monster.maxHp * 0.9)),
    }));
  }

  return tunedManifest;
}

function hpForKind(
  kind: TrialMonsterKind,
  config: ReturnType<typeof getTrialDifficultyConfig>,
): number {
  switch (kind) {
    case 'kobold':
      return config.basicKoboldHp;
    case 'tallKobold':
      return config.tallKoboldHp;
    case 'miniBoss':
      return config.miniBossHp;
  }
}

function scoreValueForKind(kind: TrialMonsterKind): number {
  switch (kind) {
    case 'kobold':
      return 100;
    case 'tallKobold':
      return 220;
    case 'miniBoss':
      return 500;
  }
}

function shuffle<T>(items: readonly T[], rng: SeededRng): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = rng.nextInt(0, i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function uniquePatterns(patterns: readonly (readonly { col: number; row: number }[])[]): { col: number; row: number }[][] {
  const seen = new Set<string>();
  const unique: { col: number; row: number }[][] = [];
  for (const pattern of patterns) {
    const key = patternKey(pattern);
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    unique.push(pattern.map((coord) => ({ ...coord })));
  }

  return unique;
}

function patternKey(pattern: readonly { col: number; row: number }[]): string {
  return [...pattern]
    .sort((first, second) => first.row - second.row || first.col - second.col)
    .map((coord) => `${coord.col},${coord.row}`)
    .join('|');
}
