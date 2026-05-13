import { describe, expect, it } from 'vitest';
import { AssetIds } from '../src/assets/AssetIds';
import { createBoardFromTileTypes, type Board } from '../src/board/Board';
import type { BoardAnimationSnapshot, BoardAnimationTrace } from '../src/board/BoardAnimationTrace';
import { getBoardAnimationTraceDurationMs } from '../src/board/BoardAnimationTiming';
import { findStandardMatchHints } from '../src/board/BoardHints';
import { findValidMoves, validateSwap } from '../src/board/BoardRules';
import {
  GAME_OVER_TRY_AGAIN_BUTTON_RECT,
  BOARD_RECT,
  HERO_STAGE_HEIGHT,
  HUD_BGM_TOGGLE_RECT,
  HUD_MUTE_TOGGLE_RECT,
  LOGICAL_HEIGHT,
  LOGICAL_WIDTH,
  type CellCoord,
} from '../src/core/Layout';
import {
  levelClearOverlayAssetIdForWinLevel,
  MagusMatchGameApp,
  TRIAL_ACTOR_ENTRANCE_ENEMY_DURATION_SEC,
  TRIAL_ACTOR_ENTRANCE_MAGE_DURATION_SEC,
  TRIAL_ACTOR_ENTRANCE_TOTAL_DURATION_SEC,
  TRIAL_MAGE_EXIT_DURATION_SEC,
} from '../src/core/GameApp';
import type { GameEvent } from '../src/core/GameEvents';
import {
  CAMERA_SHAKE_MAX,
  CAMERA_SHAKE_MIN,
  MATCH_HINT_ACTIVE_SEC,
  MATCH_HINT_IDLE_DELAY_SEC,
  MATCH_HINT_PAUSE_SEC,
} from '../src/data/tuning';
import {
  KOBOLD_DEFEAT_ANIMATION_SEC,
  KOBOLD_DEFEAT_FADE_SEC,
  TRIAL_MONSTER_BOTTOM_VISUAL_Y_OFFSET,
  TRIAL_MONSTER_TOP_VISUAL_Y_OFFSET,
  type TrialRuntimeState,
} from '../src/generator/TrialRules';
import { LEVEL_TRANSITION_HOLD_SEC } from '../src/run/RunProgression';
import { BoardAnimationPresenter } from '../src/render-2d/BoardAnimationPresenter';
import { HeroStageTemplateIds } from '../src/world-3d/HeroStageTemplates';

const LEVEL_CLEAR_OVERLAY_TOTAL_SEC = 2.0;
const LEVEL_CLEAR_OVERLAY_EXIT_START_SEC = 1.9;

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
    expect(app.getTrialTutorialStateForDebug()).toMatchObject({ phase: 'active' });
    expect(app.getElapsedSecForDebug()).toBe(0);
  });

  it('emits startup events during reset', () => {
    const app = new MagusMatchGameApp(111);

    app.reset(333);

    expect(app.drainEvents()).toEqual([
      {
        type: 'soundRequested',
        soundId: AssetIds.sounds.levelStart,
        category: 'level',
        volume: 0.35,
      },
      { type: 'levelStarted', levelNumber: 1, levelType: 'TRIAL', seed: 333 },
    ]);
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

    expect(app.getHudState().phase).toBe('IDLE');
    expect(app.getCurrentLevelForDebug()?.type).toBe('TRIAL');
    expect(app.getTrialRuntimeForDebug()?.monsters.length).toBe(3);
    expect(app.getTrialTutorialStateForDebug()).toMatchObject({ phase: 'active' });
    expect(app.getJourneyRuntimeForDebug()).toBeNull();
  });

  it('reports Trial enemies left including unspawned monsters and excluding dead monsters', () => {
    const app = new MagusMatchGameApp(555, { debugLevelType: 'TRIAL' });
    const runtime = app.getTrialRuntimeForDebug();
    if (runtime == null || runtime.monsters[0] == null) {
      throw new Error('Expected Trial runtime.');
    }

    setTrialRuntimeForDebug(app, {
      ...runtime,
      totalMonsters: 6,
      nextSpawnIndex: 2,
      monsters: [
        { ...runtime.monsters[0], monsterId: 'alive', hp: 3, maxHp: 3 },
        {
          ...runtime.monsters[0],
          monsterId: 'dead',
          hp: 0,
          maxHp: 3,
          defeatAnimationRemainingSec: 0.5,
          defeatFadeRemainingSec: 0.15,
        },
      ],
      defeatedMonsterIds: [],
    });

    expect(app.getHudState().trialEnemyCount).toEqual({ defeated: 1, total: 6 });

    setTrialRuntimeForDebug(app, {
      ...runtime,
      totalMonsters: 2,
      nextSpawnIndex: 2,
      monsters: [{ ...runtime.monsters[0], monsterId: 'dead', hp: 0, maxHp: 3 }],
      defeatedMonsterIds: [],
    });
    expect(app.getHudState().trialEnemyCount).toEqual({ defeated: 2, total: 2 });

    const journeyApp = new MagusMatchGameApp(555, { debugLevelType: 'JOURNEY' });
    expect(journeyApp.getHudState().trialEnemyCount).toBeNull();
  });

  it('starts a normal level 1 Trial session with the forced lightning tutorial immediately', () => {
    const app = new MagusMatchGameApp(555);

    const tutorial = app.getTrialTutorialStateForDebug();
    const runtime = app.getTrialRuntimeForDebug();
    const boardState = app.getBoardRenderState();
    expect(tutorial).toMatchObject({ phase: 'active' });
    expect(boardState.tutorialPresentation).toMatchObject({
      mode: 'tutorialFullHero',
      heroHeight: LOGICAL_HEIGHT,
      sceneScale: 1.5,
      backgroundSceneScale: 1.75,
      foregroundSceneScale: 1.5,
      sceneOffsetX: -50,
      sceneOffsetY: -60,
      hideHud: true,
      hideBoard: true,
      headline: {
        text: 'Defeat the Kobolds!',
        x: 0,
        y: 150,
        width: LOGICAL_WIDTH,
        height: 120,
        fontSize: 84,
        minFontSize: 52,
        fontWeight: 'bold',
        color: '#ffffff',
        strokeColor: '#000000',
        strokeWidth: 8,
        align: 'center',
      },
    });
    expect(boardState.tutorialPresentation?.floatingMatch?.tiles.map((tile) => tile.rect.x)).toEqual([
      126,
      336,
      546,
      336,
    ]);
    expect(boardState.tutorialPresentation?.floatingMatch?.tiles.map((tile) => tile.rect.y)).toEqual([
      1228,
      1228,
      1228,
      1438,
    ]);
    expect(boardState.tutorialPresentation?.floatingMatch?.tiles.map((tile) => tile.rect.width)).toEqual([
      192,
      192,
      192,
      192,
    ]);
    expect(boardState.tutorialPresentation?.floatingMatch?.tiles.map((tile) => tile.tileType)).toEqual([
      'LIGHTNING',
      'FIRE',
      'LIGHTNING',
      'LIGHTNING',
    ]);
    expect(boardState.tutorialPresentation?.floatingMatch?.tiles.map((tile) => tile.role)).toEqual([
      'topLeftLightning',
      'earth',
      'topRightLightning',
      'lowerLightning',
    ]);
    const fireHint = boardState.tutorialPresentation?.floatingMatch?.tiles.find((tile) => tile.role === 'earth');
    const lowerHint = boardState.tutorialPresentation?.floatingMatch?.tiles.find((tile) => tile.role === 'lowerLightning');
    expect(fireHint?.flash).toBe(0);
    expect(fireHint?.scale).toBe(1);
    expect(lowerHint?.flash).toBeGreaterThan(0);
    expect(boardState.tutorialLock).toBeNull();
    expect(boardState.matchHint).toBeNull();
    expect(runtime?.monsters).toHaveLength(3);
    expect(runtime?.monsters.every((monster) => monster.kind === 'kobold')).toBe(true);
    expect(runtime?.monsters.every((monster) => monster.walkSpeed === 0)).toBe(true);
    expect(runtime?.monsters.every((monster) => monster.hp / monster.maxHp <= 0.11)).toBe(true);
    expect(runtime?.monsters.map((monster) => monster.x)).toEqual([-1.25, 0.1, 1.45]);
    expect(runtime?.monsters.map((monster) => monster.visualYOffset)).toEqual([
      TRIAL_MONSTER_TOP_VISUAL_Y_OFFSET,
      TRIAL_MONSTER_BOTTOM_VISUAL_Y_OFFSET,
      TRIAL_MONSTER_TOP_VISUAL_Y_OFFSET,
    ]);
    const tutorialKoboldObjects = app
      .getHeroWorldState()
      .objects.filter(
        (object) =>
          object.objectId.startsWith('trial-monster-tutorial-kobold-') &&
          object.templateId === HeroStageTemplateIds.monsterPlaceholder,
      );
    expect(tutorialKoboldObjects.map((object) => object.animationId)).toEqual(['walk', 'walk', 'walk']);
    expect(tutorialKoboldObjects.map((object) => object.animationPaused)).toEqual([true, true, true]);
    expect(tutorialKoboldObjects.map((object) => object.animationTimeSec)).toEqual([0, 0, 0]);
  });

  it('shows a looping finger hint from lower Lightning to Fire as soon as floating tutorial tiles are visible', () => {
    const app = new MagusMatchGameApp(555);

    const initialFloatingMatch = app.getBoardRenderState().tutorialPresentation?.floatingMatch;
    const initialHint = initialFloatingMatch?.fingerHint;
    expect(initialHint).toMatchObject({
      assetId: AssetIds.ui.tutorialFinger,
      width: 288,
      height: 288,
      rotationDegrees: -15,
      alpha: 1,
      zIndex: 40,
    });

    app.update(TRIAL_ACTOR_ENTRANCE_TOTAL_DURATION_SEC + 0.2, []);
    const startFloatingMatch = app.getBoardRenderState().tutorialPresentation?.floatingMatch;
    const startHint = startFloatingMatch?.fingerHint;
    const startLowerLightning = startFloatingMatch?.tiles.find((tile) => tile.role === 'lowerLightning');
    expect(startHint).toMatchObject({
      assetId: AssetIds.ui.tutorialFinger,
      width: 288,
      height: 288,
      rotationDegrees: -15,
      alpha: 1,
      zIndex: 40,
    });
    expect(startHint?.point.x).toBeCloseTo(tileCenter(startLowerLightning).x);
    expect(startHint?.point.y).toBeCloseTo(tileCenter(startLowerLightning).y);

    app.update(0.5, []);
    const halfwayFloatingMatch = app.getBoardRenderState().tutorialPresentation?.floatingMatch;
    const halfwayHint = halfwayFloatingMatch?.fingerHint;
    const halfwayLowerLightning = tileCenter(halfwayFloatingMatch?.tiles.find((tile) => tile.role === 'lowerLightning'));
    const halfwayFire = tileCenter(halfwayFloatingMatch?.tiles.find((tile) => tile.role === 'earth'));
    const easedHalfway = 0.875;
    expect(halfwayHint?.point.x).toBeCloseTo(
      halfwayLowerLightning.x + (halfwayFire.x - halfwayLowerLightning.x) * easedHalfway,
    );
    expect(halfwayHint?.point.y).toBeCloseTo(
      halfwayLowerLightning.y + (halfwayFire.y - halfwayLowerLightning.y) * easedHalfway,
    );

    dragFloatingTutorialTile(app, 'lowerLightning', 'earth');
    expect(app.getTrialTutorialStateForDebug()?.phase).toBe('resolving');
    expect(app.getBoardRenderState().tutorialPresentation?.floatingMatch?.fingerHint).toBeNull();
  });

  it('locks Trial movement and floating tutorial input until the actor entrance finishes', () => {
    const app = new MagusMatchGameApp(777);
    const startRuntime = app.getTrialRuntimeForDebug();
    if (startRuntime == null) {
      throw new Error('Expected Trial runtime.');
    }
    const startMonsterX = startRuntime.monsters.map((monster) => monster.x);

    expect(app.getTrialEntranceStateForDebug()).toMatchObject({
      active: true,
      elapsedSec: 0,
      enemyProgress: 0,
      mageProgress: 0,
    });

    dragFloatingTutorialTile(app, 'lowerLightning', 'earth');
    expect(app.getTrialTutorialStateForDebug()?.phase).toBe('active');
    expect(app.getHeroWorldState().activeProjectiles).toHaveLength(0);

    app.update(TRIAL_ACTOR_ENTRANCE_ENEMY_DURATION_SEC, []);
    expect(app.getTrialEntranceStateForDebug()).toMatchObject({
      active: true,
      enemyProgress: 1,
      mageProgress: 0,
    });
    expect(app.getTrialRuntimeForDebug()?.monsters.map((monster) => monster.x)).toEqual(startMonsterX);

    app.update(TRIAL_ACTOR_ENTRANCE_MAGE_DURATION_SEC, []);
    expect(app.getTrialEntranceStateForDebug()).toMatchObject({
      active: false,
      enemyProgress: 1,
      mageProgress: 1,
    });
    expect(app.getTrialRuntimeForDebug()?.monsters.map((monster) => monster.x)).toEqual(startMonsterX);

    dragFloatingTutorialTile(app, 'lowerLightning', 'earth');
    expect(app.getTrialTutorialStateForDebug()?.phase).toBe('resolving');
  });

  it('skips the session tutorial for explicit debug options', () => {
    const forcedTrial = new MagusMatchGameApp(555, { debugLevelType: 'TRIAL' });
    const debugSeedSession = new MagusMatchGameApp(555, { skipTutorial: true });

    expect(forcedTrial.getTrialTutorialStateForDebug()).toBeNull();
    expect(debugSeedSession.getTrialTutorialStateForDebug()).toBeNull();
    expect(forcedTrial.getTrialRuntimeForDebug()?.monsters).toHaveLength(1);
    expect(debugSeedSession.getTrialRuntimeForDebug()?.monsters).toHaveLength(1);
    expect(forcedTrial.getBoardRenderState().tutorialPresentation).toMatchObject({
      mode: 'standard',
      heroHeight: HERO_STAGE_HEIGHT,
      sceneScale: 1,
      backgroundSceneScale: 1,
      foregroundSceneScale: 1,
      sceneOffsetX: 0,
      hideHud: false,
      hideBoard: false,
      headline: null,
      floatingMatch: null,
    });
    expect(debugSeedSession.getBoardRenderState().tutorialPresentation?.headline).toBeNull();
    expect(debugSeedSession.getBoardRenderState().tutorialPresentation?.floatingMatch).toBeNull();
  });

  it('can still start level 1 as Journey through an override', () => {
    const app = new MagusMatchGameApp(555, { debugLevelType: 'JOURNEY' });

    expect(app.getHudState().phase).toBe('IDLE');
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

    finishTrialEntrance(app);
    app.update(0, [{ type: 'swap', from: firstMove.from, to: firstMove.to }]);

    expect(app.getHeroWorldState().levelType).toBe('TRIAL');
    expect(app.getHeroWorldState().activeProjectiles.length).toBeGreaterThan(0);

    const impactDelaySec = app.getTrialRuntimeForDebug()?.pendingAttacks[0]?.impactDelaySec ?? 0;
    app.update(impactDelaySec, []);
    expect(app.getRunStateForDebug().score).toBeGreaterThan(0);
  });

  it('shows the matching hero activation overlay for swapped Trial Lightballs', () => {
    const app = new MagusMatchGameApp(666, { debugLevelType: 'TRIAL' });
    finishTrialEntrance(app);
    setBoardForDebug(app, createBoardFromTileTypes([['LIGHTBALL', 'FIRE']]));

    app.update(0, [{ type: 'swap', from: { col: 0, row: 0 }, to: { col: 1, row: 0 } }]);

    expect(app.getBoardRenderState().heroActivationOverlay).toMatchObject({
      assetId: AssetIds.ui.activateFire,
      x: -800,
      y: 125,
      width: 800,
      height: 450,
      alpha: 1,
      zIndex: 60,
    });

    app.update(0.1, []);
    expect(app.getBoardRenderState().heroActivationOverlay?.x).toBeCloseTo((LOGICAL_WIDTH - 800) / 2);

    app.update(0.6, []);
    expect(app.getBoardRenderState().heroActivationOverlay?.x).toBeCloseTo((LOGICAL_WIDTH - 800) / 2);

    app.update(0.05, []);
    const exitingX = app.getBoardRenderState().heroActivationOverlay?.x ?? 0;
    expect(exitingX).toBeGreaterThan((LOGICAL_WIDTH - 800) / 2);
    expect(exitingX).toBeLessThan(LOGICAL_WIDTH);

    app.update(0.05, []);
    expect(app.getBoardRenderState().heroActivationOverlay).toBeNull();
  });

  it('shows a tweened level-cleared image overlay during win transitions', () => {
    const app = new MagusMatchGameApp(778, { debugLevelType: 'TRIAL' });
    finishTrialEntrance(app);
    beginLevelResultForDebug(app, 'win');

    expect(app.getScreenState()).toMatchObject({
      phase: 'WIN',
      transitionText: null,
      levelClearOverlay: {
        assetId: AssetIds.ui.levelCleared,
        x: -800,
        y: (HERO_STAGE_HEIGHT - 450) / 2,
        width: 800,
        height: 450,
        alpha: 1,
      },
    });

    app.update(0.1, []);

    expect(app.getScreenState().levelClearOverlay).toMatchObject({
      x: (LOGICAL_WIDTH - 800) / 2,
      y: (HERO_STAGE_HEIGHT - 450) / 2,
    });

    app.update(LEVEL_CLEAR_OVERLAY_EXIT_START_SEC - 0.1, []);
    expect(app.getScreenState().levelClearOverlay?.x).toBeCloseTo((LOGICAL_WIDTH - 800) / 2);

    app.update(0.05, []);
    const exitingX = app.getScreenState().levelClearOverlay?.x ?? 0;
    expect(exitingX).toBeGreaterThan((LOGICAL_WIDTH - 800) / 2);
    expect(exitingX).toBeLessThan(LOGICAL_WIDTH);
  });

  it('uses the floor-cleared image when a win advances to a new hero backdrop', () => {
    expect(levelClearOverlayAssetIdForWinLevel(1)).toBe(AssetIds.ui.levelCleared);
    expect(levelClearOverlayAssetIdForWinLevel(3)).toBe(AssetIds.ui.floorCleared);
    expect(levelClearOverlayAssetIdForWinLevel(18)).toBe(AssetIds.ui.floorCleared);
    expect(levelClearOverlayAssetIdForWinLevel(21)).toBe(AssetIds.ui.levelCleared);
    expect(levelClearOverlayAssetIdForWinLevel(24)).toBe(AssetIds.ui.floorCleared);

    const app = new MagusMatchGameApp(778, { debugLevelType: 'TRIAL', debugStartLevel: 3 });
    finishTrialEntrance(app);
    beginLevelResultForDebug(app, 'win');

    expect(app.getScreenState().levelClearOverlay).toMatchObject({
      assetId: AssetIds.ui.floorCleared,
      x: -800,
      y: (HERO_STAGE_HEIGHT - 450) / 2,
      width: 800,
      height: 450,
      alpha: 1,
    });
  });

  it('shows the selected target overlay for tapped Journey Lightballs', () => {
    const app = new MagusMatchGameApp(777, { debugLevelType: 'JOURNEY' });
    setBoardForDebug(
      app,
      createBoardFromTileTypes([
        [null, 'EARTH', null],
        ['FIRE', 'LIGHTBALL', 'EARTH'],
        [null, 'ICE', null],
        [null, 'EARTH', null],
      ]),
    );

    tapBoardCell(app, { col: 1, row: 1 });

    expect(app.getBoardRenderState().heroActivationOverlay).toMatchObject({
      assetId: AssetIds.ui.activateEarth,
      width: 800,
      height: 450,
    });
  });

  it('does not show a hero activation overlay for non-Lightball power-ups', () => {
    const app = new MagusMatchGameApp(666, { debugLevelType: 'TRIAL' });
    finishTrialEntrance(app);
    setBoardForDebug(app, createBoardFromTileTypes([['TNT', 'EARTH']]));

    app.update(0, [{ type: 'swap', from: { col: 0, row: 0 }, to: { col: 1, row: 0 } }]);

    expect(app.getBoardRenderState().heroActivationOverlay).toBeNull();
  });

  it('shows a standard match hint after the idle delay', () => {
    const app = new MagusMatchGameApp(4088670725, { debugLevelType: 'TRIAL', debugStartLevel: 4 });

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
    app.update(MATCH_HINT_IDLE_DELAY_SEC, []);
    expect(app.getBoardRenderState().matchHint).not.toBeNull();

    const hint = findStandardMatchHints(app.getBoardForDebug())[0];
    app.update(0, [{ type: 'swap', from: hint.from, to: hint.to }]);

    expect(app.getBoardRenderState().matchHint).toBeNull();
  });

  it('only accepts the floating tutorial lightning drag while the tutorial is active', () => {
    const app = new MagusMatchGameApp(777);
    if (app.getTrialTutorialStateForDebug() == null) {
      throw new Error('Expected active tutorial.');
    }
    const beforeBoard = boardTileSignature(app.getBoardForDebug());
    const beforeStats = app.getLevelStatsForDebug();

    app.update(0, [{ type: 'swap', from: { col: 0, row: 0 }, to: { col: 1, row: 0 } }]);
    dragFloatingTutorialTile(app, 'topLeftLightning', 'earth');

    expect(app.getTrialTutorialStateForDebug()?.phase).toBe('active');
    expect(boardTileSignature(app.getBoardForDebug())).toBe(beforeBoard);
    expect(app.getLevelStatsForDebug()).toEqual(beforeStats);

    dragFloatingTutorialTile(app, 'lowerLightning', 'earth');
    expect(app.getTrialTutorialStateForDebug()?.phase).toBe('active');
    expect(app.getHeroWorldState().activeProjectiles).toHaveLength(0);

    finishTrialEntrance(app);
    dragFloatingTutorialTile(app, 'topLeftLightning', 'earth');
    expect(app.getTrialTutorialStateForDebug()?.phase).toBe('active');

    dragFloatingTutorialTile(app, 'lowerLightning', 'earth');

    expect(app.getTrialTutorialStateForDebug()?.phase).toBe('resolving');
    expect(app.getBoardRenderState().animationTrace?.kind).toBe('resolution');
    expect(app.getHeroWorldState().activeProjectiles.some((projectile) => projectile.schoolId === 'lightning')).toBe(true);
    expect(app.getBoardRenderState().tutorialPresentation).toMatchObject({
      mode: 'tutorialFullHero',
      heroHeight: LOGICAL_HEIGHT,
      sceneScale: 1.5,
      backgroundSceneScale: 1.75,
      foregroundSceneScale: 1.5,
      sceneOffsetX: -50,
      hideHud: true,
      hideBoard: true,
      floatingMatch: {
        phase: 'resolving',
      },
    });
    app.update(0.8, []);
    expect(app.getBoardRenderState().tutorialPresentation).toMatchObject({
      mode: 'tutorialFullHero',
      heroHeight: LOGICAL_HEIGHT,
      sceneScale: 1.5,
      backgroundSceneScale: 1.75,
      foregroundSceneScale: 1.5,
      sceneOffsetX: -50,
      hideHud: true,
      hideBoard: true,
      floatingMatch: null,
    });
    expect(app.getLevelStatsForDebug()).toEqual(beforeStats);
    expect(app.getRunStateForDebug().score).toBe(0);
  });

  it('returns to the standard layout after the floating tutorial zoom-out', () => {
    const app = new MagusMatchGameApp(779);

    finishTrialEntrance(app);
    dragFloatingTutorialTile(app, 'earth', 'lowerLightning');
    expect(app.getBoardRenderState().tutorialPresentation).toMatchObject({
      mode: 'tutorialFullHero',
      heroHeight: LOGICAL_HEIGHT,
      sceneScale: 1.5,
      backgroundSceneScale: 1.75,
      foregroundSceneScale: 1.5,
      sceneOffsetX: -50,
      floatingMatch: {
        phase: 'resolving',
      },
    });
    app.update(0.8, []);
    expect(app.getBoardRenderState().tutorialPresentation).toMatchObject({
      mode: 'tutorialFullHero',
      heroHeight: LOGICAL_HEIGHT,
      sceneScale: 1.5,
      backgroundSceneScale: 1.75,
      foregroundSceneScale: 1.5,
      sceneOffsetX: -50,
      floatingMatch: null,
    });
    for (let tick = 0; tick < 80 && app.getBoardRenderState().tutorialPresentation?.mode !== 'tutorialZoomOut'; tick += 1) {
      app.update(0.1, []);
    }
    expect(app.getBoardRenderState().tutorialPresentation?.mode).toBe('tutorialZoomOut');

    app.update(0.325, []);
    const halfwayHeight = app.getBoardRenderState().tutorialPresentation?.heroHeight ?? 0;
    const halfwayBackgroundScale = app.getBoardRenderState().tutorialPresentation?.backgroundSceneScale ?? 0;
    const halfwayForegroundScale = app.getBoardRenderState().tutorialPresentation?.foregroundSceneScale ?? 0;
    const halfwayOffsetX = app.getBoardRenderState().tutorialPresentation?.sceneOffsetX ?? 0;
    expect(halfwayHeight).toBeLessThan(LOGICAL_HEIGHT);
    expect(halfwayHeight).toBeGreaterThan(HERO_STAGE_HEIGHT);
    expect(halfwayBackgroundScale).toBeLessThan(1.75);
    expect(halfwayBackgroundScale).toBeGreaterThan(1);
    expect(halfwayForegroundScale).toBeLessThan(1.5);
    expect(halfwayForegroundScale).toBeGreaterThan(1);
    expect(halfwayOffsetX).toBeGreaterThan(-50);
    expect(halfwayOffsetX).toBeLessThan(0);

    app.update(0.325, []);
    expect(app.getBoardRenderState().tutorialPresentation).toMatchObject({
      mode: 'standard',
      heroHeight: HERO_STAGE_HEIGHT,
      sceneScale: 1,
      backgroundSceneScale: 1,
      foregroundSceneScale: 1,
      sceneOffsetX: 0,
      hideHud: false,
      hideBoard: false,
      headline: null,
      floatingMatch: null,
    });
  });

  it('clears the tutorial overlay and resumes normal Trial level 1 after tutorial kobolds die', () => {
    const app = new MagusMatchGameApp(778);
    const tutorial = app.getTrialTutorialStateForDebug();
    if (tutorial == null) {
      throw new Error('Expected active tutorial.');
    }

    finishTrialEntrance(app);
    dragFloatingTutorialTile(app, 'earth', 'lowerLightning');
    for (let tick = 0; tick < 80 && app.getTrialTutorialStateForDebug() != null; tick += 1) {
      app.update(0.1, []);
    }

    const runtime = app.getTrialRuntimeForDebug();
    expect(app.getTrialTutorialStateForDebug()).toBeNull();
    expect(app.getBoardRenderState().tutorialLock).toBeNull();
    expect(app.getBoardRenderState().tutorialPresentation?.mode).toBe('tutorialZoomOut');
    expect(app.getElapsedSecForDebug()).toBe(0);
    app.update(0.65, []);
    expect(app.getBoardRenderState().tutorialPresentation?.mode).toBe('standard');
    expect(runtime?.result).toBe('playing');
    expect(runtime?.totalMonsters).toBe(3);
    expect(runtime?.monsters).toHaveLength(1);
    expect(runtime?.monsters[0]?.monsterId.startsWith('tutorial-')).toBe(false);
    expect(app.getRunStateForDebug().score).toBe(0);
    expect(app.getLevelStatsForDebug()).toEqual({ matchCount: 0, validSwapCount: 0 });
  });

  it('continues Trial projectile visual timers during win transitions', () => {
    const app = new MagusMatchGameApp(667, { debugLevelType: 'TRIAL' });
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
    const runtime = app.getTrialRuntimeForDebug();
    const level = app.getCurrentLevelForDebug();
    if (runtime == null || level?.type !== 'TRIAL') {
      throw new Error('Expected generated Trial level.');
    }

    finishTrialEntrance(app);
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

    const runtime = app.getTrialRuntimeForDebug();
    const level = app.getCurrentLevelForDebug();
    if (runtime == null || level?.type !== 'TRIAL') {
      throw new Error('Expected generated Trial level.');
    }

    finishTrialEntrance(app);
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

    finishTrialEntrance(app);
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

    finishTrialEntrance(app);
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

    finishTrialEntrance(app);
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

    finishTrialEntrance(app);
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
    finishTrialEntrance(app);
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

    app.drainEvents();
    app.update(0, [{ type: 'swap', from: level.journey.firstHint.from, to: level.journey.firstHint.to }]);
    expectBoardTileIdsUnique(app.getBoardForDebug());

    const nextMove = findValidMoves(app.getBoardForDebug())[0];
    app.update(0, [{ type: 'swap', from: nextMove.from, to: nextMove.to }]);
    expectBoardTileIdsUnique(app.getBoardForDebug());
    expectTraceTileIdsUnique(app.getBoardRenderState().animationTrace);
  });

  it('starts immediately and emits levelStarted on startup', () => {
    const app = new MagusMatchGameApp(777);

    expect(app.getScreenState().screen).toBe('play');
    expect(app.getHudState().phase).toBe('IDLE');
    expect(app.getBoardRenderState().animationTrace?.kind).toBe('levelIntro');
    expect(app.getBoardRenderState().animationTrace?.cascadeSteps[0].refillTiles.length).toBe(64);
    expect(app.drainEvents()).toEqual([
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
    finishTrialEntrance(app);
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

  it('waits for the Trial mage exit tween before loading the next level after a win', () => {
    const app = new MagusMatchGameApp(778, { debugLevelType: 'TRIAL' });
    finishTrialEntrance(app);
    app.drainEvents();
    const startingLevel = app.getRunStateForDebug().levelNumber;

    beginLevelResultForDebug(app, 'win');
    app.drainEvents();

    app.update(TRIAL_MAGE_EXIT_DURATION_SEC - 0.001, []);
    expect(app.getHudState().phase).toBe('WIN');
    expect(app.getRunStateForDebug().levelNumber).toBe(startingLevel);
    expect(app.drainEvents().filter((event) => event.type === 'levelStarted')).toHaveLength(0);

    app.update(0.001, []);
    expect(app.getHudState().phase).toBe('WIN');
    expect(app.getRunStateForDebug().levelNumber).toBe(startingLevel);

    app.update(LEVEL_CLEAR_OVERLAY_TOTAL_SEC - TRIAL_MAGE_EXIT_DURATION_SEC, []);
    expect(app.getHudState().phase).toBe('IDLE');
    expect(app.getRunStateForDebug().levelNumber).toBe(startingLevel + 1);
    expect(app.drainEvents().filter((event) => event.type === 'levelStarted')).toHaveLength(1);
  });

  it('keeps wins on screen for the level-cleared image hold window', () => {
    const app = new MagusMatchGameApp(778, { debugLevelType: 'TRIAL' });
    finishTrialEntrance(app);
    app.update(LEVEL_TRANSITION_HOLD_SEC, []);
    app.drainEvents();
    const startingLevel = app.getRunStateForDebug().levelNumber;

    beginLevelResultForDebug(app, 'win');
    app.drainEvents();

    app.update(LEVEL_CLEAR_OVERLAY_TOTAL_SEC - 0.001, []);
    expect(app.getHudState().phase).toBe('WIN');
    expect(app.getRunStateForDebug().levelNumber).toBe(startingLevel);

    app.update(0.01, []);
    expect(app.getHudState().phase).toBe('IDLE');
    expect(app.getRunStateForDebug().levelNumber).toBe(startingLevel + 1);
  });

  it('does not require the Trial mage exit tween for Journey wins or Trial losses', () => {
    const journeyApp = new MagusMatchGameApp(778, { debugLevelType: 'JOURNEY' });
    const journeyStartLevel = journeyApp.getRunStateForDebug().levelNumber;
    journeyApp.drainEvents();
    beginLevelResultForDebug(journeyApp, 'win');
    journeyApp.update(LEVEL_TRANSITION_HOLD_SEC, []);
    expect(journeyApp.getHudState().phase).toBe('WIN');
    expect(journeyApp.getRunStateForDebug().levelNumber).toBe(journeyStartLevel);
    journeyApp.update(LEVEL_CLEAR_OVERLAY_TOTAL_SEC - LEVEL_TRANSITION_HOLD_SEC, []);
    expect(journeyApp.getHudState().phase).toBe('IDLE');
    expect(journeyApp.getRunStateForDebug().levelNumber).toBe(journeyStartLevel + 1);

    const trialApp = new MagusMatchGameApp(778, { debugLevelType: 'TRIAL' });
    finishTrialEntrance(trialApp);
    const trialStartLevel = trialApp.getRunStateForDebug().levelNumber;
    trialApp.drainEvents();
    beginLevelResultForDebug(trialApp, 'loss');
    trialApp.update(LEVEL_TRANSITION_HOLD_SEC, []);
    expect(trialApp.getHudState().phase).toBe('IDLE');
    expect(trialApp.getRunStateForDebug()).toMatchObject({
      lives: 2,
      levelNumber: trialStartLevel,
    });
  });

  it('skips the startup tutorial when level 1 restarts after a life-loss retry', () => {
    const app = new MagusMatchGameApp(778);
    finishTrialEntrance(app);
    app.drainEvents();

    beginLevelResultForDebug(app, 'loss');
    app.update(LEVEL_TRANSITION_HOLD_SEC, []);

    expect(app.getRunStateForDebug()).toMatchObject({ lives: 2, levelNumber: 1 });
    expect(app.getHudState().phase).toBe('IDLE');
    expect(app.getTrialTutorialStateForDebug()).toBeNull();
    expect(app.getBoardRenderState().tutorialPresentation).toMatchObject({
      mode: 'standard',
      hideHud: false,
      hideBoard: false,
      headline: null,
      floatingMatch: null,
    });

    finishTrialEntrance(app);
    beginLevelResultForDebug(app, 'loss');
    app.update(LEVEL_TRANSITION_HOLD_SEC, []);

    expect(app.getRunStateForDebug()).toMatchObject({ lives: 1, levelNumber: 1 });
    expect(app.getTrialTutorialStateForDebug()).toBeNull();
    expect(app.getBoardRenderState().tutorialPresentation?.mode).toBe('standard');
  });

  it('shows the startup tutorial again after Game Over Try Again resets level 1', () => {
    const app = new MagusMatchGameApp(779);
    app.drainEvents();

    for (let loss = 0; loss < 3; loss += 1) {
      finishTrialEntrance(app);
      beginLevelResultForDebug(app, 'loss');
      app.update(LEVEL_TRANSITION_HOLD_SEC, []);
    }

    expect(app.getHudState().phase).toBe('GAME_OVER');

    tap(app, GAME_OVER_TRY_AGAIN_BUTTON_RECT);

    expect(app.getRunStateForDebug()).toMatchObject({ lives: 3, levelNumber: 1 });
    expect(app.getHudState().phase).toBe('IDLE');
    expect(app.getTrialTutorialStateForDebug()).toMatchObject({ phase: 'active' });
    expect(app.getBoardRenderState().tutorialPresentation).toMatchObject({
      mode: 'tutorialFullHero',
      hideHud: true,
      hideBoard: true,
      headline: {
        text: 'Defeat the Kobolds!',
      },
      floatingMatch: {
        phase: 'idle',
      },
    });
  });

  it('continues after one or two losses and enters Game Over after the third failed level', () => {
    const app = new MagusMatchGameApp(888, { debugLevelType: 'TRIAL' });
    app.drainEvents();
    const startingLevel = app.getRunStateForDebug().levelNumber;

    app.update(100, []);
    expect(app.getRunStateForDebug()).toMatchObject({ lives: 2, levelNumber: startingLevel, difficulty: startingLevel });
    expect(app.getHudState().phase).toBe('IDLE');

    app.update(100, []);
    expect(app.getRunStateForDebug()).toMatchObject({ lives: 1, levelNumber: startingLevel, difficulty: startingLevel });
    expect(app.getHudState().phase).toBe('IDLE');

    app.update(100, []);
    expect(app.getRunStateForDebug()).toMatchObject({ lives: 0, levelNumber: startingLevel, difficulty: startingLevel });
    expect(app.getHudState().phase).toBe('GAME_OVER');
    const events = app.drainEvents();
    expect(events.filter((event) => event.type === 'runEnded')).toHaveLength(1);
    expect(events.filter((event) => event.type === 'levelStarted')).toEqual([
      { type: 'levelStarted', levelNumber: startingLevel, levelType: 'TRIAL', seed: 888 },
      { type: 'levelStarted', levelNumber: startingLevel, levelType: 'TRIAL', seed: 888 },
    ]);
    const sounds = soundEvents(events);
    expect(sounds).toHaveLength(9);
    expect(sounds.filter((event) => event.soundId === AssetIds.sounds.levelStart)).toHaveLength(2);
    expect(sounds.filter((event) => event.soundId === AssetIds.sounds.playerDamage)).toHaveLength(3);
    expect(sounds.filter((event) => event.soundId === AssetIds.sounds.playerDefeat)).toHaveLength(3);
    expect(sounds.filter((event) => event.soundId === AssetIds.sounds.runEnd)).toHaveLength(1);
  });

  it('keeps the debug seed when Try Again is tapped after Game Over', () => {
    const app = new MagusMatchGameApp(999, { debugLevelType: 'TRIAL' });
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

  it('toggles mute when tapping HUD mute during play with ui click', () => {
    const app = new MagusMatchGameApp(1003);
    app.drainEvents();

    tap(app, HUD_MUTE_TOGGLE_RECT);

    expect(app.getHudState().muted).toBe(true);
    expect(soundEvents(app.drainEvents()).map((event) => event.soundId)).toContain(AssetIds.sounds.uiClick);
  });

  it('toggles bgm-only mute when tapping HUD BGM oval during play', () => {
    const app = new MagusMatchGameApp(1004);
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

type FloatingTutorialRole = 'topLeftLightning' | 'earth' | 'topRightLightning' | 'lowerLightning';

function dragFloatingTutorialTile(
  app: MagusMatchGameApp,
  fromRole: FloatingTutorialRole,
  toRole: FloatingTutorialRole,
): void {
  const floatingMatch = app.getBoardRenderState().tutorialPresentation?.floatingMatch;
  const from = floatingMatch?.tiles.find((tile) => tile.role === fromRole);
  const to = floatingMatch?.tiles.find((tile) => tile.role === toRole);
  if (from == null || to == null) {
    throw new Error(`Expected floating tutorial tiles ${fromRole} and ${toRole}.`);
  }

  app.update(0, [
    { type: 'dragStart', x: from.rect.x + from.rect.width / 2, y: from.rect.y + from.rect.height / 2 },
    { type: 'dragEnd', x: to.rect.x + to.rect.width / 2, y: to.rect.y + to.rect.height / 2 },
  ]);
}

function tileCenter(tile: { rect: { x: number; y: number; width: number; height: number } } | undefined): {
  x: number;
  y: number;
} {
  if (tile == null) {
    throw new Error('Expected floating tutorial tile.');
  }

  return {
    x: tile.rect.x + tile.rect.width / 2,
    y: tile.rect.y + tile.rect.height / 2,
  };
}

function tap(app: MagusMatchGameApp, rect: { x: number; y: number; width: number; height: number }): void {
  app.update(0, [{ type: 'tap', x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }]);
}

function tapBoardCell(app: MagusMatchGameApp, coord: CellCoord): void {
  app.update(0, [
    {
      type: 'tap',
      x: BOARD_RECT.x + coord.col * BOARD_RECT.cellSize + BOARD_RECT.cellSize / 2,
      y: BOARD_RECT.y + coord.row * BOARD_RECT.cellSize + BOARD_RECT.cellSize / 2,
    },
  ]);
}

function finishTrialEntrance(app: MagusMatchGameApp): void {
  app.update(TRIAL_ACTOR_ENTRANCE_TOTAL_DURATION_SEC, []);
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

function setBoardForDebug(app: MagusMatchGameApp, board: Board): void {
  (app as unknown as { board: Board }).board = board;
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
    clearDelayMs: 4200,
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
