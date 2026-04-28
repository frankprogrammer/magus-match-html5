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
    expect(app.getHudState().phase).toBe('IDLE');
    expect(app.getElapsedSecForDebug()).toBe(0);
  });

  it('clears pending events during reset', () => {
    const app = new MagusMatchGameApp(111);

    app.reset(333);

    expect(app.drainEvents()).toEqual([]);
    expect(app.drainEvents()).toEqual([]);
  });

  it('creates deterministic renderable board cells on reset', () => {
    const first = new MagusMatchGameApp(444);
    const second = new MagusMatchGameApp(444);

    expect(first.getBoardRenderState().boardCells).toHaveLength(64);
    expect(first.getBoardRenderState().boardCells).toEqual(second.getBoardRenderState().boardCells);
  });

  it('starts level 1 as a Journey level', () => {
    const app = new MagusMatchGameApp(555);

    expect(app.getCurrentLevelForDebug()?.type).toBe('JOURNEY');
    expect(app.getJourneyRuntimeForDebug()?.movesRemaining).toBe(20);
    expect(app.getBoardRenderState().mageCell).toEqual({ col: 0, row: 0 });
    expect(app.getBoardRenderState().goalCell).toEqual({ col: 7, row: 7 });
  });
});
