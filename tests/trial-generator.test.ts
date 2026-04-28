import { describe, expect, it } from 'vitest';
import { getTrialDifficultyConfig } from '../src/generator/DifficultyTable';
import { generateTrialLevel } from '../src/generator/TrialGenerator';

describe('TrialGenerator', () => {
  it('generates deterministic Trial levels from the same seed', () => {
    const first = generateTrialLevel({ difficulty: 8, seed: 1234 });
    const second = generateTrialLevel({ difficulty: 8, seed: 1234 });

    expect(first.trial.waveManifest).toEqual(second.trial.waveManifest);
    expect(first.initialBoard).toEqual(second.initialBoard);
  });

  it.each([
    [1, 3, 0, 0, 1],
    [4, 5, 1, 0, 1],
    [8, 6, 2, 0, 1],
    [15, 7, 3, 1, 1],
    [19, 8, 4, 2, 2],
  ])(
    'matches the difficulty band for difficulty %s',
    (difficulty, basicCount, tallCount, miniBossCount, waveCount) => {
      const config = getTrialDifficultyConfig(difficulty);
      const level = generateTrialLevel({ difficulty, seed: 55 + difficulty });
      const kinds = level.trial.waveManifest.map((monster) => monster.kind);

      expect(config.waveCount).toBe(waveCount);
      expect(kinds.filter((kind) => kind === 'kobold')).toHaveLength(basicCount);
      expect(kinds.filter((kind) => kind === 'tallKobold')).toHaveLength(tallCount);
      expect(kinds.filter((kind) => kind === 'miniBoss')).toHaveLength(miniBossCount);
    },
  );

  it('uses deterministic spawn timing and five lanes', () => {
    const level = generateTrialLevel({ difficulty: 1, seed: 777 });

    expect(level.trial.lanes).toHaveLength(5);
    expect(level.trial.waveManifest.map((monster) => monster.spawnTimeMs)).toEqual([0, 1200, 2400]);
    expect(level.trial.waveManifest.every((monster) => monster.laneId >= 0 && monster.laneId < 5)).toBe(true);
  });
});
