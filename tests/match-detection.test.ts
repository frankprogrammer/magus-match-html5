import { describe, expect, it } from 'vitest';
import { createBoardFromTileTypes } from '../src/board/Board';
import { detectMatches } from '../src/board/MatchDetection';

describe('match detection', () => {
  it('classifies a 3-match as basic', () => {
    const matches = detectMatches(createBoardFromTileTypes([['FIRE', 'FIRE', 'FIRE']]));

    expect(matches).toHaveLength(1);
    expect(matches[0].shape).toBe('basic');
    expect(matches[0].spawnPowerUp).toBeNull();
  });

  it('classifies horizontal and vertical 4-matches as rockets', () => {
    const horizontal = detectMatches(
      createBoardFromTileTypes([['ICE', 'ICE', 'ICE', 'ICE']]),
      { preferredSpawnCell: { col: 2, row: 0 } },
    );
    const vertical = detectMatches(
      createBoardFromTileTypes([['EARTH'], ['EARTH'], ['EARTH'], ['EARTH']]),
      { preferredSpawnCell: { col: 0, row: 2 } },
    );

    expect(horizontal[0].shape).toBe('rocketH');
    expect(horizontal[0].spawnPowerUp).toBe('ROCKET_H');
    expect(horizontal[0].spawnCell).toEqual({ col: 2, row: 0 });
    expect(vertical[0].shape).toBe('rocketV');
    expect(vertical[0].spawnPowerUp).toBe('ROCKET_V');
  });

  it('classifies a straight 5-match as a Lightball', () => {
    const matches = detectMatches(
      createBoardFromTileTypes([['LIGHTNING', 'LIGHTNING', 'LIGHTNING', 'LIGHTNING', 'LIGHTNING']]),
    );

    expect(matches[0].shape).toBe('lightball');
    expect(matches[0].spawnPowerUp).toBe('LIGHTBALL');
  });

  it('classifies L and T shapes as TNT', () => {
    const lShape = detectMatches(
      createBoardFromTileTypes([
        ['FIRE', null, null],
        ['FIRE', null, null],
        ['FIRE', 'FIRE', 'FIRE'],
      ]),
    );
    const tShape = detectMatches(
      createBoardFromTileTypes([
        ['ICE', 'ICE', 'ICE'],
        [null, 'ICE', null],
        [null, 'ICE', null],
      ]),
    );

    expect(lShape[0].shape).toBe('tnt');
    expect(lShape[0].spawnPowerUp).toBe('TNT');
    expect(tShape[0].shape).toBe('tnt');
    expect(tShape[0].spawnPowerUp).toBe('TNT');
  });
});
