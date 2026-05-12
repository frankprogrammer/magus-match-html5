import { describe, expect, it } from 'vitest';
import { AssetIds } from '../src/assets/AssetIds';
import type { Board } from '../src/board/Board';
import type { BoardAnimationSnapshot, BoardAnimationTrace } from '../src/board/BoardAnimationTrace';
import { getBoardAnimationTraceDurationMs } from '../src/board/BoardAnimationTiming';
import { findStandardMatchHints } from '../src/board/BoardHints';
import { findValidMoves, validateSwap } from '../src/board/BoardRules';
import {
  GAME_OVER_TRY_AGAIN_BUTTON_RECT,
  HUD_BGM_TOGGLE_RECT,
  HUD_MUTE_TOGGLE_RECT,
  TITLE_PLAY_BUTTON_RECT,
  type CellCoord,
} from '../src/core/Layout';
import { MagusMatchGameApp } from '../src/core/GameApp';
import type { GameEvent } from '../src/core/GameEvents';
import {
  CAMERA_SHAKE_MAX,
  CAMERA_SHAKE_MIN,
  MATCH_HINT_ACTIVE_SEC,
  MATCH_HINT_IDLE_DELAY_SEC,
  MATCH_HINT_PAUSE_SEC,
} from '../src/data/tuning';
import { KOBOLD_DEFEAT_ANIMATION_SEC, KOBOLD_DEFEAT_FADE_SEC, type TrialRuntimeState } from '../src/generator/TrialRules';
import { LEVEL_TRANSITION_HOLD_SEC } from '../src/run/RunProgression';
import { BoardAnimationPresenter } from '../src/render-2d/BoardAnimationPresenter';

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

  it('starts level 1 as a Trial level by default', () => {
    const app = new MagusMatchGameApp(555);

    expect(app.getHudState().phase).toBe('TITLE');
    expect(app.getCurrentLevelForDebug()?.type).toBe('TRIAL');
    expect(app.getTrialRuntimeForDebug()?.monsters.length).toBe(1);
    expect(app.getJourneyRuntimeForDebug()).toBeNull();
  });

  it('can still start level 1 as Journey through an override', () => {
    const app = new MagusMatchGameApp(555, { debugLevelType: 'JOURNEY' });

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

    expect(app.getHeroWorldState().levelType).toBe('TRIAL');
    expect(app.getHeroWorldState().activeProjectiles.length).toBeGreaterThan(0);

    const impactDelaySec = app.getTrialRuntimeForDebug()?.pendingAttacks[0]?.impactDelaySec ?? 0;
    app.update(impactDelaySec, []);
    expect(app.getRunStateForDebug().score).toBeGreaterThan(0);
  });

  it('shows a standard match hint after the idle delay', () => {
    const app = new MagusMatchGameApp(4088670725, { debugLevelType: 'TRIAL', debugStartLevel: 4 });
    tap(app, TITLE_PLAY_BUTTON_RECT);

    expect(app.getBoardRenderState().matchHint).toBeNull();

    app.update(MATCH_HINT_IDLE_DELAY_SEC - 0.01, []);
    expect(app.getBoardRenderState().matchHint).toBeNull();

    app.update(0.01, []);
    const expectedHint = findStandardMatchHints(app.getBoardForDebug())[0];
    expect(app.getBoardRenderState().matchHint).toMatchObject({
      flashCells: expectedHint.flashCells,
      movingCell: expectedHint.movingCell,
      direction: expectedHint.direction,
      progress: 0,
    });
  });

  it('pauses and cycles match hints after each active hint window', () => {
    const app = new MagusMatchGameApp(4088670725, { debugLevelType: 'TRIAL', debugStartLevel: 4 });
    tap(app, TITLE_PLAY_BUTTON_RECT);
    const hints = findStandardMatchHints(app.getBoardForDebug());

    app.update(MATCH_HINT_IDLE_DELAY_SEC + 0.2, []);
    expect(app.getBoardRenderState().matchHint?.movingCell).toEqual(hints[0].movingCell);

    app.update(MATCH_HINT_ACTIVE_SEC, []);
    expect(app.getBoardRenderState().matchHint).toBeNull();

    app.update(MATCH_HINT_PAUSE_SEC, []);
    expect(app.getBoardRenderState().matchHint?.movingCell).toEqual(hints[1 % hints.length].movingCell);
  });

  it('resets match hints after player board actions', () => {
    const app = new MagusMatchGameApp(4088670725, { debugLevelType: 'TRIAL', debugStartLevel: 4 });
    tap(app, TITLE_PLAY_BUTTON_RECT);
    app.update(MATCH_HINT_IDLE_DELAY_SEC, []);
    expect(app.getBoardRenderState().matchHint).not.toBeNull();

    const hint = findStandardMatchHints(app.getBoardForDebug())[0];
    app.update(0, [{ type: 'swap', from: hint.from, to: hint.to }]);

    expect(app.getBoardRenderState().matchHint).toBeNull();
  });

  it('continues Trial projectile visual timers during win transitions', () => {
    const app = new MagusMatchGameApp(667, { debugLevelType: 'TRIAL' });
    tap(app, TITLE_PLAY_BUTTON_RECT);
    const runtime = app.getTrialRuntimeForDebug();
    const level = app.getCurrentLevelForDebug();
    if (runtime == null || level?.type !== 'TRIAL') {
      throw new Error('Expected generated Trial level.');
    }

    setTrialRuntimeForDebug(app, {
      ...runtime,
      result: 'won',
      monsters: [],
      projectiles: [
        {
          projectileId: 'delayed-win-shot',
          schoolId: 'fire',
          effectKind: 'match',
          from: { x: level.trial.mageX, y: level.trial.laneY, z: 0.55 },
          to: { x: level.trial.mageX + 1, y: level.trial.laneY, z: 0.35 },
          castActivationDelaySec: 0,
          activationDelaySec: 0.12,
          chargeDurationSec: 0.5,
          remainingSec: 0.1,
          durationSec: 0.1,
        },
      ],
    });
    beginLevelResultForDebug(app, 'win');

    app.update(0.05, []);
    expect(app.getHeroWorldState().activeProjectiles[0]?.activationDelaySec).toBeCloseTo(0.07);
    expect(app.getHeroWorldState().activeProjectiles[0]?.remainingSec).toBeCloseTo(0.1);

    app.update(0.18, []);
    expect(app.getHeroWorldState().activeProjectiles).toHaveLength(0);
  });

  it('applies delayed Trial burn tick score and emits hit/defeat sounds during update', () => {
    const app = new MagusMatchGameApp(667, { debugLevelType: 'TRIAL' });
    tap(app, TITLE_PLAY_BUTTON_RECT);
    const runtime = app.getTrialRuntimeForDebug();
    const level = app.getCurrentLevelForDebug();
    if (runtime == null || level?.type !== 'TRIAL') {
      throw new Error('Expected generated Trial level.');
    }

    const activeMonster = runtime.monsters[0];
    setTrialRuntimeForDebug(app, {
      ...runtime,
      nextSpawnIndex: level.trial.waveManifest.length,
      monsters: [
        {
          ...activeMonster,
          monsterId: 'burn-update-target',
          hp: 8,
          maxHp: 20,
          scoreValue: 13,
          fireBurnStacks: [
            {
              burnId: 'burn-update',
              damage: 10,
              tickDelayQueueSec: [0.5],
              visualRemainingSec: 2,
              visualDurationSec: 2,
            },
          ],
        },
      ],
      defeatedMonsterIds: [],
    });
    app.drainEvents();

    app.update(0.5, []);

    const events = app.drainEvents();
    expect(app.getRunStateForDebug().score).toBe(29);
    expect(events).toContainEqual({ type: 'scoreChanged', score: 29 });
    const sounds = soundEvents(events);
    expect(sounds.map((event) => event.soundId)).toContain(AssetIds.sounds.monsterDamage);
    expect(sounds.map((event) => event.soundId)).toContain(AssetIds.sounds.monsterDefeat);
    expect(sounds.find((event) => event.soundId === AssetIds.sounds.monsterDamage)?.delaySec).toBe(0);
    expect(sounds.find((event) => event.soundId === AssetIds.sounds.monsterDefeat)?.delaySec).toBe(0);
  });

  it('delays Trial win transition until the final defeated monster disappears', () => {
    const app = new MagusMatchGameApp(666, { debugLevelType: 'TRIAL' });
    const firstMove = findValidMoves(app.getBoardForDebug())[0];

    tap(app, TITLE_PLAY_BUTTON_RECT);
    const runtime = app.getTrialRuntimeForDebug();
    const level = app.getCurrentLevelForDebug();
    if (runtime == null || level?.type !== 'TRIAL') {
      throw new Error('Expected generated Trial level.');
    }

    const activeMonster = runtime.monsters[0];
    setTrialRuntimeForDebug(app, {
      ...runtime,
      nextSpawnIndex: level.trial.waveManifest.length,
      monsters: [{ ...activeMonster, monsterId: 'final-monster', hp: 1, maxHp: 1 }],
      defeatedMonsterIds: level.trial.waveManifest
        .slice(1)
        .map((entry) => entry.monsterId),
    });

    app.update(0, [{ type: 'swap', from: firstMove.from, to: firstMove.to }]);

    const queuedRuntime = app.getTrialRuntimeForDebug();
    const impactDelaySec = queuedRuntime?.pendingAttacks[0]?.impactDelaySec;
    expect(app.getHudState().phase).toBe('IDLE');
    expect(queuedRuntime?.monsters[0]).toMatchObject({ monsterId: 'final-monster', hp: 1 });
    expect(impactDelaySec).toBeGreaterThan(0);

    app.update((impactDelaySec ?? 0) - 0.001, []);
    expect(app.getHudState().phase).toBe('IDLE');
    expect(app.getTrialRuntimeForDebug()?.monsters).toHaveLength(1);
    expect(app.getTrialRuntimeForDebug()?.monsters[0]?.hp).toBe(1);

    app.update(0.001, []);
    expect(app.getHudState().phase).toBe('IDLE');
    expect(app.getTrialRuntimeForDebug()?.monsters[0]?.hp).toBe(0);
    expect(app.getTrialRuntimeForDebug()?.monsters[0]?.defeatAnimationRemainingSec).toBeCloseTo(
      KOBOLD_DEFEAT_ANIMATION_SEC,
    );

    app.update(KOBOLD_DEFEAT_ANIMATION_SEC, []);
    expect(app.getHudState().phase).toBe('IDLE');
    expect(app.getTrialRuntimeForDebug()?.monsters[0]?.defeatFadeRemainingSec).toBeCloseTo(
      KOBOLD_DEFEAT_FADE_SEC,
    );

    app.update(KOBOLD_DEFEAT_FADE_SEC, []);
    expect(app.getHudState().phase).toBe('WIN');
    expect(app.getTrialRuntimeForDebug()?.monsters).toHaveLength(0);
  });

  it('can start directly at a debug run level', () => {
    const app = new MagusMatchGameApp(4088670725, { debugLevelType: 'TRIAL', debugStartLevel: 2 });

    expect(app.getRunStateForDebug()).toMatchObject({
      levelNumber: 2,
      difficulty: 2,
      levelsCleared: 1,
    });
    expect(app.getCurrentLevelForDebug()?.type).toBe('TRIAL');
    expect(app.getBoardRenderState().emptyCells?.length).toBeGreaterThan(0);
  });

  it('emits merge match sound on successful Journey swaps', () => {
    const app = new MagusMatchGameApp(555, { debugLevelType: 'JOURNEY' });
    const level = app.getCurrentLevelForDebug();
    if (level?.type !== 'JOURNEY') {
      throw new Error('Expected generated Journey level.');
    }

    tap(app, TITLE_PLAY_BUTTON_RECT);
    app.drainEvents();
    app.update(0, [{ type: 'swap', from: level.journey.firstHint.from, to: level.journey.firstHint.to }]);

    const sounds = soundEvents(app.drainEvents()).map((event) => event.soundId);
    expect(sounds).toEqual([
      AssetIds.sounds.boardMove,
      AssetIds.sounds.mergeMatch,
      AssetIds.sounds.matchCoin,
    ]);
  });

  it('emits Trial spell and monster audio through events', () => {
    const app = new MagusMatchGameApp(666, { debugLevelType: 'TRIAL' });
    const firstMove = findValidMoves(app.getBoardForDebug())[0];

    tap(app, TITLE_PLAY_BUTTON_RECT);
    app.drainEvents();
    app.update(0, [{ type: 'swap', from: firstMove.from, to: firstMove.to }]);

    const sounds = soundEvents(app.drainEvents()).map((event) => event.soundId);
    expect(sounds).toContain(AssetIds.sounds.boardMove);
    expect(sounds).toContain(AssetIds.sounds.mergeMatch);
    expect(sounds).toContain(AssetIds.sounds.matchCoin);
    expect(sounds.indexOf(AssetIds.sounds.boardMove)).toBeLessThan(sounds.indexOf(AssetIds.sounds.mergeMatch));
    expect(sounds.indexOf(AssetIds.sounds.mergeMatch)).toBeLessThan(sounds.indexOf(AssetIds.sounds.matchCoin));
    expect(sounds.some((soundId) => soundId.endsWith('.whoosh'))).toBe(true);

    const impactDelaySec = app.getTrialRuntimeForDebug()?.pendingAttacks[0]?.impactDelaySec ?? 0;
    app.update(impactDelaySec, []);
    const impactSounds = soundEvents(app.drainEvents()).map((event) => event.soundId);
    expect(
      impactSounds.includes(AssetIds.sounds.monsterDamage) || impactSounds.includes(AssetIds.sounds.monsterDefeat),
    ).toBe(true);
  });

  it('keeps board shake and visual cue render state within comfort limits', () => {
    const app = new MagusMatchGameApp(555, { debugLevelType: 'JOURNEY' });
    const level = app.getCurrentLevelForDebug();
    if (level?.type !== 'JOURNEY') {
      throw new Error('Expected generated Journey level.');
    }

    tap(app, TITLE_PLAY_BUTTON_RECT);
    app.drainEvents();
    app.update(0, [{ type: 'swap', from: level.journey.firstHint.from, to: level.journey.firstHint.to }]);
    const boardState = app.getBoardRenderState();

    expect(boardState.shakePixels).toBeGreaterThanOrEqual(CAMERA_SHAKE_MIN);
    expect(boardState.shakePixels).toBeLessThanOrEqual(CAMERA_SHAKE_MAX);
    expect(boardState.visualCues.length).toBeGreaterThan(0);
    expect(boardState.visualCues.every((cue) => cue.value >= 0 && cue.value <= 1)).toBe(true);
  });

  it('accepts another valid swap while a board animation is active', () => {
    const app = new MagusMatchGameApp(555, { debugLevelType: 'JOURNEY' });
    const level = app.getCurrentLevelForDebug();
    if (level?.type !== 'JOURNEY') {
      throw new Error('Expected generated Journey level.');
    }

    tap(app, TITLE_PLAY_BUTTON_RECT);
    app.drainEvents();
    app.update(0, [{ type: 'swap', from: level.journey.firstHint.from, to: level.journey.firstHint.to }]);
    const firstStats = app.getLevelStatsForDebug();
    const firstTrace = app.getBoardRenderState().animationTrace;
    const presenter = new BoardAnimationPresenter();
    presenter.present(app.getBoardRenderState(), 0);
    presenter.present(app.getBoardRenderState(), 0.12);

    const nextMove = findValidMoves(app.getBoardForDebug())[0];
    app.update(0, [{ type: 'swap', from: nextMove.from, to: nextMove.to }]);
    const secondStats = app.getLevelStatsForDebug();

    expect(firstTrace?.revisionId).toBeDefined();
    expect(secondStats.validSwapCount).toBe(firstStats.validSwapCount + 1);
    expect(app.getBoardRenderState().animationTrace?.revisionId).toBeGreaterThan(firstTrace?.revisionId ?? 0);
  });

  it('animates no-match Trial swaps without changing gameplay state', () => {
    const app = new MagusMatchGameApp(4088670725, { debugLevelType: 'TRIAL', debugStartLevel: 4 });

    tap(app, TITLE_PLAY_BUTTON_RECT);
    app.drainEvents();
    const noMatch = findNoMatchSwap(app.getBoardForDebug());
    const initialScore = app.getRunStateForDebug().score;
    const initialStats = app.getLevelStatsForDebug();
    const initialBoardSignature = boardTileSignature(app.getBoardForDebug());

    app.update(0, [{ type: 'swap', from: noMatch.from, to: noMatch.to }]);

    expect(app.getBoardRenderState().animationTrace?.kind).toBe('invalidSwap');
    expect(boardTileSignature(app.getBoardForDebug())).toBe(initialBoardSignature);
    expect(app.getRunStateForDebug().score).toBe(initialScore);
    expect(app.getLevelStatsForDebug()).toEqual(initialStats);
    expect(app.getHeroWorldState().activeProjectiles).toHaveLength(0);
    const eventsAfterInvalid = app.drainEvents();
    expect(soundEvents(eventsAfterInvalid).map((event) => event.soundId)).toContain(
      AssetIds.sounds.boardMoveBack,
    );
    expect(eventsAfterInvalid.filter((event) => event.type === 'scoreChanged')).toHaveLength(0);
  });

  it('animates the exact level 4 top-row invalid swap regression without gameplay changes', () => {
    const app = new MagusMatchGameApp(4088670725, { debugLevelType: 'TRIAL', debugStartLevel: 4 });

    tap(app, TITLE_PLAY_BUTTON_RECT);
    app.drainEvents();
    const initialScore = app.getRunStateForDebug().score;
    const initialStats = app.getLevelStatsForDebug();
    const initialBoardSignature = boardTileSignature(app.getBoardForDebug());

    app.update(0, [{ type: 'swap', from: { col: 0, row: 0 }, to: { col: 1, row: 0 } }]);

    expect(app.getBoardRenderState().animationTrace?.kind).toBe('invalidSwap');
    expect(boardTileSignature(app.getBoardForDebug())).toBe(initialBoardSignature);
    expect(app.getRunStateForDebug().score).toBe(initialScore);
    expect(app.getLevelStatsForDebug()).toEqual(initialStats);
    expect(app.getHeroWorldState().activeProjectiles).toHaveLength(0);
    expect(soundEvents(app.drainEvents()).map((event) => event.soundId)).toContain(
      AssetIds.sounds.boardMoveBack,
    );
  });

  it('accepts a valid Trial swap during an active invalid-swap bounce-back', () => {
    const app = new MagusMatchGameApp(4088670725, { debugLevelType: 'TRIAL', debugStartLevel: 4 });

    tap(app, TITLE_PLAY_BUTTON_RECT);
    app.drainEvents();
    const noMatch = findNoMatchSwap(app.getBoardForDebug());
    app.update(0, [{ type: 'swap', from: noMatch.from, to: noMatch.to }]);
    const invalidRevision = app.getBoardRenderState().animationTrace?.revisionId ?? 0;

    const validMove = findValidMoves(app.getBoardForDebug())[0];
    app.update(0.01, [{ type: 'swap', from: validMove.from, to: validMove.to }]);

    expect(app.getBoardRenderState().animationTrace?.kind).toBe('resolution');
    expect(app.getBoardRenderState().animationTrace?.revisionId).toBeGreaterThan(invalidRevision);

    const impactDelaySec = app.getTrialRuntimeForDebug()?.pendingAttacks[0]?.impactDelaySec ?? 0;
    app.update(impactDelaySec, []);
    expect(app.getRunStateForDebug().score).toBeGreaterThan(0);
  });

  it('keeps Trial tile IDs unique across the reported two-swap cascade regression', () => {
    const app = new MagusMatchGameApp(1643426079, { debugLevelType: 'TRIAL' });
    tap(app, TITLE_PLAY_BUTTON_RECT);
    app.drainEvents();

    app.update(0, [{ type: 'swap', from: { col: 3, row: 3 }, to: { col: 4, row: 3 } }]);
    expectBoardTileIdsUnique(app.getBoardForDebug());

    app.update(0, [{ type: 'swap', from: { col: 3, row: 3 }, to: { col: 4, row: 3 } }]);
    expectBoardTileIdsUnique(app.getBoardForDebug());
    expectTraceTileIdsUnique(app.getBoardRenderState().animationTrace);
  });

  it('keeps Journey tile IDs unique across consecutive refills', () => {
    const app = new MagusMatchGameApp(555, { debugLevelType: 'JOURNEY' });
    const level = app.getCurrentLevelForDebug();
    if (level?.type !== 'JOURNEY') {
      throw new Error('Expected generated Journey level.');
    }

    tap(app, TITLE_PLAY_BUTTON_RECT);
    app.drainEvents();
    app.update(0, [{ type: 'swap', from: level.journey.firstHint.from, to: level.journey.firstHint.to }]);
    expectBoardTileIdsUnique(app.getBoardForDebug());

    const nextMove = findValidMoves(app.getBoardForDebug())[0];
    app.update(0, [{ type: 'swap', from: nextMove.from, to: nextMove.to }]);
    expectBoardTileIdsUnique(app.getBoardForDebug());
    expectTraceTileIdsUnique(app.getBoardRenderState().animationTrace);
  });

  it('starts on Title and emits levelStarted when Play is tapped', () => {
    const app = new MagusMatchGameApp(777);

    expect(app.getScreenState().screen).toBe('title');
    tap(app, TITLE_PLAY_BUTTON_RECT);

    expect(app.getHudState().phase).toBe('IDLE');
    expect(app.getBoardRenderState().animationTrace?.kind).toBe('levelIntro');
    expect(app.getBoardRenderState().animationTrace?.cascadeSteps[0].refillTiles.length).toBe(64);
    expect(app.drainEvents()).toEqual([
      {
        type: 'soundRequested',
        soundId: AssetIds.sounds.uiClick,
        category: 'ui',
        volume: 0.52,
      },
      {
        type: 'soundRequested',
        soundId: AssetIds.sounds.levelStart,
        category: 'level',
        volume: 0.35,
      },
      { type: 'levelStarted', levelNumber: 1, levelType: 'TRIAL', seed: 777 },
    ]);
  });

  it('waits for active board collapse before progressing after a win', () => {
    const app = new MagusMatchGameApp(778, { debugLevelType: 'TRIAL' });
    tap(app, TITLE_PLAY_BUTTON_RECT);
    app.drainEvents();

    const longTrace = longCollapseTrace(50);
    captureTraceForDebug(app, longTrace);
    beginLevelResultForDebug(app, 'win');
    app.drainEvents();

    app.update(LEVEL_TRANSITION_HOLD_SEC, []);
    expect(app.getHudState().phase).toBe('WIN');
    expect(app.drainEvents().filter((event) => event.type === 'levelStarted')).toHaveLength(0);

    app.update(getBoardAnimationTraceDurationMs(longTrace) / 1000 - LEVEL_TRANSITION_HOLD_SEC + 0.001, []);
    expect(app.getHudState().phase).toBe('IDLE');
    expect(app.drainEvents().filter((event) => event.type === 'levelStarted')).toHaveLength(1);
    expect(app.getBoardRenderState().animationTrace?.kind).toBe('levelIntro');
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
    const events = app.drainEvents();
    expect(events.filter((event) => event.type === 'runEnded')).toHaveLength(1);
    const sounds = soundEvents(events);
    expect(sounds).toHaveLength(9);
    expect(sounds.filter((event) => event.soundId === AssetIds.sounds.levelStart)).toHaveLength(2);
    expect(sounds.filter((event) => event.soundId === AssetIds.sounds.playerDamage)).toHaveLength(3);
    expect(sounds.filter((event) => event.soundId === AssetIds.sounds.playerDefeat)).toHaveLength(3);
    expect(sounds.filter((event) => event.soundId === AssetIds.sounds.runEnd)).toHaveLength(1);
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
    expect(
      soundEvents(app.drainEvents()).some((event) => event.soundId === AssetIds.sounds.uiClick),
    ).toBe(true);
  });

  it('does not toggle mute from the old HUD tap area', () => {
    const app = new MagusMatchGameApp(1002);

    tap(app, HUD_MUTE_TOGGLE_RECT);

    expect(app.getHudState().muted).toBe(false);
    expect(soundEvents(app.drainEvents())).toHaveLength(0);
  });

  it('toggles mute when tapping HUD mute during play with ui click', () => {
    const app = new MagusMatchGameApp(1003);
    tap(app, TITLE_PLAY_BUTTON_RECT);
    app.drainEvents();

    tap(app, HUD_MUTE_TOGGLE_RECT);

    expect(app.getHudState().muted).toBe(true);
    expect(soundEvents(app.drainEvents()).map((event) => event.soundId)).toContain(AssetIds.sounds.uiClick);
  });

  it('toggles bgm-only mute when tapping HUD BGM oval during play', () => {
    const app = new MagusMatchGameApp(1004);
    tap(app, TITLE_PLAY_BUTTON_RECT);
    app.drainEvents();

    expect(app.getHudState().bgmMuted).toBe(false);
    tap(app, HUD_BGM_TOGGLE_RECT);

    expect(app.getHudState().bgmMuted).toBe(true);
    expect(
      soundEvents(app.drainEvents()).some((event) => event.soundId === AssetIds.sounds.uiClick),
    ).toBe(true);
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
    expect(screen.buttonRects.bgm).toEqual(HUD_BGM_TOGGLE_RECT);
  });
});

function tap(app: MagusMatchGameApp, rect: { x: number; y: number; width: number; height: number }): void {
  app.update(0, [{ type: 'tap', x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }]);
}

function soundEvents(events: readonly GameEvent[]): Extract<GameEvent, { type: 'soundRequested' }>[] {
  return events.filter((event): event is Extract<GameEvent, { type: 'soundRequested' }> => event.type === 'soundRequested');
}

function captureTraceForDebug(app: MagusMatchGameApp, trace: BoardAnimationTrace): void {
  (app as unknown as { captureBoardAnimationTrace: (trace: BoardAnimationTrace) => void }).captureBoardAnimationTrace(trace);
}

function beginLevelResultForDebug(app: MagusMatchGameApp, result: 'win' | 'loss'): void {
  (app as unknown as { beginLevelResult: (result: 'win' | 'loss') => void }).beginLevelResult(result);
}

function setTrialRuntimeForDebug(app: MagusMatchGameApp, runtime: TrialRuntimeState): void {
  (app as unknown as { trialRuntime: TrialRuntimeState }).trialRuntime = runtime;
}

function findNoMatchSwap(board: Board): { from: CellCoord; to: CellCoord } {
  for (let row = 0; row < board.length; row += 1) {
    for (let col = 0; col < board[row].length; col += 1) {
      const from = { col, row };
      const candidates = [
        { col: col + 1, row },
        { col, row: row + 1 },
      ];
      for (const to of candidates) {
        if (to.row >= board.length || to.col >= board[to.row].length) {
          continue;
        }
        if (validateSwap(board, from, to).reason === 'noMatch') {
          return { from, to };
        }
      }
    }
  }
  throw new Error('Expected at least one adjacent no-match swap.');
}

function boardTileSignature(board: Board): string {
  return board
    .map((row) =>
      row
        .map((cell) => {
          if (cell.isVoid) {
            return 'void';
          }
          return cell.tile == null ? 'empty' : `${cell.tile.id}:${cell.tile.type}`;
        })
        .join(','),
    )
    .join('|');
}

function expectBoardTileIdsUnique(board: Board): void {
  expectUniqueTileIds(board.flat().flatMap((cell) => (cell.tile == null ? [] : [cell.tile.id])));
}

function expectTraceTileIdsUnique(trace: BoardAnimationTrace | null | undefined): void {
  expect(trace).toBeDefined();
  if (trace == null) {
    return;
  }

  const snapshots: BoardAnimationSnapshot[] = [
    trace.preSwapSnapshot,
    trace.postSwapSnapshot,
    trace.finalSnapshot,
    ...trace.cascadeSteps.flatMap((step) => [
      step.beforeClearSnapshot,
      step.beforeGravitySnapshot,
      step.afterGravitySnapshot,
      step.finalSnapshot,
    ]),
  ];

  for (const snapshot of snapshots) {
    expectUniqueTileIds(snapshot.cells.map((cell) => cell.tileId));
  }

  for (const step of trace.cascadeSteps) {
    expectUniqueTileIds(step.clearedTiles.map((tile) => tile.tileId));
    expectUniqueTileIds(step.fallingTiles.map((tile) => tile.tileId));
    expectUniqueTileIds(step.refillTiles.map((tile) => tile.tileId));
  }
}

function expectUniqueTileIds(ids: readonly string[]): void {
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  expect([...new Set(duplicates)]).toEqual([]);
}

function longCollapseTrace(revisionId: number): BoardAnimationTrace {
  const clearCell = {
    tileId: 'clear',
    tileType: 'FIRE' as const,
    coord: { col: 0, row: 0 },
    isPath: false,
    clearDelayMs: 1800,
  };

  return {
    kind: 'resolution',
    revisionId,
    swappedCells: null,
    preSwapSnapshot: { cells: [clearCell] },
    postSwapSnapshot: { cells: [clearCell] },
    cascadeSteps: [
      {
        stepIndex: 0,
        beforeClearSnapshot: { cells: [clearCell] },
        beforeGravitySnapshot: { cells: [] },
        afterGravitySnapshot: { cells: [] },
        finalSnapshot: { cells: [] },
        clearedTiles: [clearCell],
        fallingTiles: [],
        refillTiles: [],
      },
    ],
    finalSnapshot: { cells: [] },
  };
}
