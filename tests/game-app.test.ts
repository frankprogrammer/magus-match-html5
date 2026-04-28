import { describe, expect, it } from 'vitest';
import { findValidMoves } from '../src/board/BoardRules';
import { GAME_OVER_TRY_AGAIN_BUTTON_RECT, TITLE_PLAY_BUTTON_RECT } from '../src/core/Layout';
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

  it('creates deterministic renderable board cells on reset', () => {
    const first = new MagusMatchGameApp(444);
    const second = new MagusMatchGameApp(444);

    expect(first.getBoardRenderState().boardCells).toHaveLength(64);
    expect(first.getBoardRenderState().boardCells).toEqual(second.getBoardRenderState().boardCells);
  });

  it('starts level 1 as a Journey level', () => {
    const app = new MagusMatchGameApp(555);

    expect(app.getHudState().phase).toBe('TITLE');
    expect(app.getCurrentLevelForDebug()?.type).toBe('JOURNEY');
    expect(app.getJourneyRuntimeForDebug()?.movesRemaining).toBe(20);
    expect(app.getBoardRenderState().mageCell).toEqual({ col: 0, row: 0 });
    expect(app.getBoardRenderState().goalCell).toEqual({ col: 7, row: 7 });
  });

  it('can start a debug Trial level and apply Trial swap damage', () => {
    const app = new MagusMatchGameApp(666, { debugLevelType: 'TRIAL' });
    const firstMove = findValidMoves(app.getBoardForDebug())[0];

    expect(app.getCurrentLevelForDebug()?.type).toBe('TRIAL');
    expect(app.getTrialRuntimeForDebug()?.monsters.length).toBeGreaterThan(0);

    tap(app, TITLE_PLAY_BUTTON_RECT);
    app.update(0, [{ type: 'swap', from: firstMove.from, to: firstMove.to }]);

    expect(app.getRunStateForDebug().score).toBeGreaterThan(0);
    expect(app.getHeroWorldState().levelType).toBe('TRIAL');
    expect(app.getHeroWorldState().activeProjectiles.length).toBeGreaterThan(0);
  });

  it('starts on Title and emits levelStarted when Play is tapped', () => {
    const app = new MagusMatchGameApp(777);

    expect(app.getScreenState().screen).toBe('title');
    tap(app, TITLE_PLAY_BUTTON_RECT);

    expect(app.getHudState().phase).toBe('IDLE');
    expect(app.drainEvents()).toEqual([
      { type: 'levelStarted', levelNumber: 1, levelType: 'JOURNEY', seed: 777 },
    ]);
  });

  it('continues after one or two losses and enters Game Over after the third failed level', () => {
    const app = new MagusMatchGameApp(888, { debugLevelType: 'TRIAL' });
    tap(app, TITLE_PLAY_BUTTON_RECT);
    app.drainEvents();

    app.update(100, []);
    expect(app.getRunStateForDebug().lives).toBe(2);
    expect(app.getHudState().phase).toBe('IDLE');

    app.update(100, []);
    expect(app.getRunStateForDebug().lives).toBe(1);
    expect(app.getHudState().phase).toBe('IDLE');

    app.update(100, []);
    expect(app.getRunStateForDebug().lives).toBe(0);
    expect(app.getHudState().phase).toBe('GAME_OVER');
    expect(app.drainEvents().filter((event) => event.type === 'runEnded')).toHaveLength(1);
  });

  it('keeps the debug seed when Try Again is tapped after Game Over', () => {
    const app = new MagusMatchGameApp(999, { debugLevelType: 'TRIAL' });
    tap(app, TITLE_PLAY_BUTTON_RECT);
    app.update(100, []);
    app.update(100, []);
    app.update(100, []);

    tap(app, GAME_OVER_TRY_AGAIN_BUTTON_RECT);

    expect(app.getRunStateForDebug().seed).toBe(999);
    expect(app.getHudState().phase).toBe('IDLE');
  });

  it('toggles mute state from command input', () => {
    const app = new MagusMatchGameApp(1001);

    expect(app.getHudState().muted).toBe(false);
    app.update(0, [{ type: 'muteToggle' }]);

    expect(app.getHudState().muted).toBe(true);
    expect(app.getScreenState().muted).toBe(true);
  });

  it('builds Game Over screen state with leaderboard data and controls', () => {
    const app = new MagusMatchGameApp(1234, { debugLevelType: 'TRIAL' });
    tap(app, TITLE_PLAY_BUTTON_RECT);
    app.update(100, []);
    app.update(100, []);
    app.update(100, []);

    const screen = app.getScreenState(
      [{ id: 'a', name: 'Brave Magus', score: 500, levelsCleared: 1, createdAtMs: 1 }],
      1,
    );

    expect(screen.screen).toBe('gameOver');
    expect(screen.highScore).toBe(500);
    expect(screen.highlightedRank).toBe(1);
    expect(screen.buttonRects.tryAgain).toEqual(GAME_OVER_TRY_AGAIN_BUTTON_RECT);
  });
});

function tap(app: MagusMatchGameApp, rect: { x: number; y: number; width: number; height: number }): void {
  app.update(0, [{ type: 'tap', x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }]);
}
