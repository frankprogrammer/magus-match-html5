import { describe, expect, it } from 'vitest';
import { MagusMatchGameApp } from '../src/core/GameApp';

describe('MagusMatchGameApp', () => {
  it('resets to the initial run values for a provided seed', () => {
    const app = new MagusMatchGameApp(111);
    app.update(1, []);
    app.reset(222);

    expect(app.getRunStateForDebug()).toEqual({
      seed: 222,
      lives: 3,
      levelNumber: 1,
      difficulty: 1,
      score: 0,
      levelsCleared: 0,
    });
    expect(app.getHudState().phase).toBe('TITLE');
    expect(app.getElapsedSecForDebug()).toBe(0);
  });

  it('clears pending events during reset', () => {
    const app = new MagusMatchGameApp(111);

    app.reset(333);

    expect(app.drainEvents()).toEqual([]);
    expect(app.drainEvents()).toEqual([]);
  });
});
