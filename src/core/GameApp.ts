import type { GameEvent, SoundEventCategory } from "./GameEvents";
import type { GameInputCommand } from "./GameInput";
import {
  BOARD_SIZE,
  GAME_OVER_TRY_AGAIN_BUTTON_RECT,
  HERO_STAGE_HEIGHT,
  HUD_BGM_TOGGLE_RECT,
  HUD_MUTE_TOGGLE_RECT,
  LOGICAL_HEIGHT,
  LOGICAL_WIDTH,
  logicalPointToBoardCell,
  pointInHudBgmToggle,
  pointInRect,
} from "./Layout";
import type { CellCoord } from "./Layout";
import { createRandomSeed, SeededRng } from "./Rng";
import type { GamePhase, LevelResult, LevelType, RunState } from "./Types";
import type { Board } from "../board/Board";
import {
  cloneBoard,
  createEmptyBoard,
  getAllPlayableCoords,
  getCell,
  getVoidCoords,
} from "../board/Board";
import {
  createLevelIntroBoardAnimationTrace,
  stampBoardAnimationTrace,
  type BoardAnimationTrace,
} from "../board/BoardAnimationTrace";
import { getBoardAnimationTraceDurationMs } from "../board/BoardAnimationTiming";
import { findStandardMatchHints } from "../board/BoardHints";
import type { TileType } from "../board/TileTypes";
import { isPowerUpTileType } from "../board/TileTypes";
import { isTapActivatablePowerUpTileType } from "../board/PowerUps";
import { AssetIds } from "../assets/AssetIds";
import { heroStageBackdropAssetIdForLevel } from "./HeroStageBackdrop";
import type { GeneratedLevel } from "../generator/LevelGenerator";
import { generateLevel } from "../generator/LevelGenerator";
import type { JourneyRuntimeState } from "../generator/JourneyRules";
import {
  createJourneyRuntime,
  getVisibleJourneyHintCells,
  processJourneyPowerUpActivation,
  processJourneySwap,
} from "../generator/JourneyRules";
import type {
  ActiveTrialMonster,
  SpellSchoolId,
  TrialDamageEvent,
  TrialQueuedAttackEvent,
  TrialRuntimeState,
} from "../generator/TrialRules";
import {
  createTrialRuntime,
  getTrialMageWorldPosition,
  getTrialMonsterWorldPosition,
  KOBOLD_CLUB_NODE_NAMES,
  KOBOLD_HEAD_NODE_NAMES,
  koboldModelVariantForMonster,
  processTrialPowerUpActivation,
  processTrialSwap,
  trialMonsterVisualWorldYOffset,
  updateTrialRuntimeWithEvents,
  updateTrialVisuals,
  visualYOffsetForSpawnIndex,
} from "../generator/TrialRules";
import {
  createTrialTutorialBoardSetup,
  isTrialTutorialSwap,
  type TrialTutorialBoardSetup,
} from "../generator/TrialTutorial";
import type {
  BoardRenderState,
  FloatingTutorialTileRole,
  FloatingTutorialTileVisualState,
  BoardVisualCueKind,
  BoardVisualCueState,
} from "../render-2d/BoardRenderState";
import type { HudRenderState } from "../render-2d/HudRenderState";
import type { ScreenRenderState } from "../render-2d/ScreenRenderState";
import type { LeaderboardEntry } from "../run/Leaderboard";
import { getHighScore } from "../run/Leaderboard";
import {
  LEVEL_TRANSITION_HOLD_SEC,
  advanceRunAfterLoss,
  advanceRunAfterWin,
  createInitialRunState,
  deriveLevelSeed,
  selectLevelTypeForRun,
} from "../run/RunProgression";
import {
  scoreJourneyClear,
  scoreSwapStats,
  scoreTrialClear,
} from "../run/Scoring";
import type { SwapScoringStats } from "../run/Scoring";
import {
  CAMERA_SHAKE_MAX,
  CAMERA_SHAKE_MIN,
  MATCH_ENERGY_STREAM_DURATION_MS,
  MATCH_HINT_ACTIVE_SEC,
  MATCH_HINT_IDLE_DELAY_SEC,
  MATCH_HINT_BOUNCE_DISTANCE_PX,
  MATCH_HINT_PAUSE_SEC,
  TILE_SWAP_RETARGET_MS,
} from "../data/tuning";
import { HeroStageTemplateIds } from "../world-3d/HeroStageTemplates";
import type { HeroWorldState } from "../world-3d/HeroWorldState";
import type { TransformState } from "../world-3d/TransformState";
import type { WorldObjectState } from "../world-3d/WorldObjectState";

export interface GameApp {
  update(dtSec: number, commands: readonly GameInputCommand[]): void;
  getBoardRenderState(): BoardRenderState;
  getHeroWorldState(): HeroWorldState;
  getHudState(): HudRenderState;
  getScreenState(
    leaderboardRows?: readonly LeaderboardEntry[],
    highlightedRank?: number | null,
  ): ScreenRenderState;
  drainEvents(): GameEvent[];
  reset(seed?: number): void;
}

export interface MagusMatchGameAppOptions {
  debugLevelType?: LevelType;
  debugStartLevel?: number;
  skipTutorial?: boolean;
}

export const MAGE_WORLD_SCALE: TransformState["scale"] = { x: 3, y: 3, z: 3 };
export const MINI_BOSS_WORLD_SCALE: TransformState["scale"] = { x: 5.25, y: 5.25, z: 5.25 };

interface RuntimeBoardVisualCue extends Omit<BoardVisualCueState, "value"> {
  remainingSec: number;
  durationSec: number;
}

export interface TrialTutorialState extends TrialTutorialBoardSetup {
  phase: "active" | "resolving";
}

const HERO_STAGE_WORLD_WIDTH = 10.8;
const HERO_WORLD_UNITS_PER_LOGICAL_PIXEL = HERO_STAGE_WORLD_WIDTH / LOGICAL_WIDTH;
export const MAGE_WORLD_Y_OFFSET = -1.47 - 50 * HERO_WORLD_UNITS_PER_LOGICAL_PIXEL;
export const TRIAL_ACTOR_ENTRANCE_ENEMY_DURATION_SEC = 0.45;
export const TRIAL_ACTOR_ENTRANCE_MAGE_DURATION_SEC = 0.35;
export const TRIAL_ACTOR_ENTRANCE_TOTAL_DURATION_SEC =
  TRIAL_ACTOR_ENTRANCE_ENEMY_DURATION_SEC + TRIAL_ACTOR_ENTRANCE_MAGE_DURATION_SEC;
export const TRIAL_ACTOR_ENTRANCE_OFFSCREEN_X_OFFSET = HERO_STAGE_WORLD_WIDTH + 2;
export const TRIAL_MAGE_EXIT_DURATION_SEC = 0.45;
export const TRIAL_MAGE_EXIT_OFFSCREEN_X_OFFSET = TRIAL_ACTOR_ENTRANCE_OFFSCREEN_X_OFFSET;
const TRIAL_HEALTH_BAR_WIDTH = 0.92;
const TRIAL_HEALTH_BAR_HEIGHT = 0.18;
const TRIAL_HEALTH_BAR_FILL_HEIGHT = 0.11;
const TRIAL_HEALTH_BAR_Z_OFFSET = 0.08;
const TRIAL_KOBOLD_HEALTH_BAR_Y_OFFSET = 3.72;
const TRIAL_MINI_BOSS_HEALTH_BAR_SCALE = 2;
const TRIAL_MINI_BOSS_HEALTH_BAR_Y_OFFSET = 5.8;
const TRIAL_FIRE_BURN_SCALE = 3.3;
const TRIAL_FIRE_BURN_Y_OFFSET = 1.2425;
const TRIAL_FIRE_BURN_RENDER_ORDER = 12;
const TRIAL_EARTH_IMPACT_SCALE = 2.4;
const TRIAL_EARTH_IMPACT_Y_OFFSET = 0.625;
const TRIAL_EARTH_IMPACT_RENDER_ORDER = 14;
const TRIAL_HIT_SHAKE_X_AMPLITUDE = 0.14;
const TRIAL_HIT_SHAKE_Y_AMPLITUDE = 0.045;
const TRIAL_WALK_AUDIO_EPSILON_SEC = 0.000001;
const TRIAL_PLAYER_DEATH_SFX_DELAY_SEC = 0.18;
const TRIAL_TUTORIAL_KOBOLD_COUNT = 3;
const TRIAL_TUTORIAL_HP_RATIO = 0.1;
const TRIAL_TUTORIAL_MONSTER_X_POSITIONS = [-1.25, 0.1, 1.45] as const;
const TRIAL_TUTORIAL_MAGE_X_OFFSET = -0.35;
const TUTORIAL_FULL_HERO_HEIGHT = LOGICAL_HEIGHT;
const TUTORIAL_FULL_HERO_SCENE_SCALE = 1.5;
const TUTORIAL_ZOOM_OUT_DURATION_SEC = 0.65;
const TUTORIAL_FLOATING_TILE_SIZE = 192;
const TUTORIAL_FLOATING_TILE_GAP = 18;
const TUTORIAL_FLOATING_SIDE_PADDING = 24;
const TUTORIAL_FLOATING_RAISE_PX = 266;
const TUTORIAL_FLOATING_MATCH_Z_INDEX = 20;
const TUTORIAL_FINGER_HINT_LOOP_SEC = 1;
const TUTORIAL_FINGER_HINT_SIZE = 288;
const TUTORIAL_FINGER_HINT_ROTATION_DEGREES = -15;
const TUTORIAL_FINGER_HINT_Z_INDEX = 40;
const TRIAL_MONSTER_RENDER_ORDER_BASE = 4;
const TRIAL_MONSTER_RENDER_ORDER_STEP = 0.01;

type TutorialPresentationMode = "standard" | "tutorialFullHero" | "tutorialZoomOut";

export class MagusMatchGameApp implements GameApp {
  private events: GameEvent[] = [];
  private rng = new SeededRng();
  private elapsedSec = 0;
  private run: RunState = createInitialRunState(createRandomSeed());
  private board: Board = createEmptyBoard();
  private currentLevel: GeneratedLevel | null = null;
  private journeyRuntime: JourneyRuntimeState | null = null;
  private trialRuntime: TrialRuntimeState | null = null;
  private phase: GamePhase = "IDLE";
  private muted = false;
  private bgmMuted = false;
  private transitionTimerSec = 0;
  private pendingLevelResult: "win" | "loss" | null = null;
  private pendingClearScore = 0;
  private levelMatchCount = 0;
  private levelValidSwapCount = 0;
  private finalScore = 0;
  private readonly debugSeed?: number;
  private visualCues: RuntimeBoardVisualCue[] = [];
  private shakeTimerSec = 0;
  private shakeAmplitudePixels = 0;
  private latestBoardAnimationTrace: BoardAnimationTrace | null = null;
  private latestBoardAnimationEndsAtSec = 0;
  private animationClockSec = 0;
  private nextBoardAnimationRevision = 1;
  private matchHintTimerSec = 0;
  private trialPlayerDefeatSfxEmitted = false;
  private trialTutorial: TrialTutorialState | null = null;
  private tutorialPresentationMode: TutorialPresentationMode = "standard";
  private tutorialZoomOutElapsedSec = 0;
  private floatingTutorialResolveElapsedSec = 0;
  private floatingTutorialDragStart: { x: number; y: number } | null = null;
  private trialActorEntranceElapsedSec = TRIAL_ACTOR_ENTRANCE_TOTAL_DURATION_SEC;
  private trialMageExitElapsedSec = TRIAL_MAGE_EXIT_DURATION_SEC;

  constructor(
    seed?: number,
    private readonly options: MagusMatchGameAppOptions = {},
  ) {
    this.debugSeed = seed;
    this.reset(seed);
  }

  update(dtSec: number, commands: readonly GameInputCommand[]): void {
    const clampedDtSec = Math.max(0, dtSec);
    this.animationClockSec += clampedDtSec;
    this.updateBoardJuice(clampedDtSec);

    for (const command of commands) {
      if (command.type === "restart") {
        this.tryAgain();
        continue;
      }

      if (command.type === "muteToggle") {
        this.emitUiClick();
        this.muted = !this.muted;
        continue;
      }

      if (command.type === "tap") {
        this.handleTap(command.x, command.y);
        continue;
      }

      if (command.type === "dragStart") {
        this.handleDragStart(command.x, command.y);
        continue;
      }

      if (command.type === "dragEnd") {
        this.handleDragEnd(command.x, command.y);
        continue;
      }

      if (command.type === "swap") {
        this.handleSwap(command.from, command.to);
      }
    }

    this.updateTutorialPresentation(clampedDtSec);

    if (this.phase === "IDLE") {
      this.elapsedSec += clampedDtSec;
      this.updateMatchHintTimer(clampedDtSec);
      const trialStageDtSec = this.updateTrialActorEntrance(clampedDtSec);
      this.updateTrialStage(trialStageDtSec);
    }

    if (this.phase === "WIN" || this.phase === "LOSE") {
      this.updateTrialVisualTimers(clampedDtSec);
      this.updateTrialMageExit(clampedDtSec);
      this.transitionTimerSec += clampedDtSec;
      if (
        this.transitionTimerSec >= LEVEL_TRANSITION_HOLD_SEC &&
        this.hasLatestBoardAnimationFinished() &&
        this.isLevelResultExitAnimationComplete()
      ) {
        this.advanceAfterLevelResult();
      }
    }
  }

  getBoardRenderState(): BoardRenderState {
    const tutorialPresentation = this.getTutorialPresentationState();
    return {
      logicalWidth: LOGICAL_WIDTH,
      logicalHeight: LOGICAL_HEIGHT,
      tutorialPresentation,
      boardCells: getAllPlayableCoords(this.board)
        .map((coord) => {
          const tile = this.board[coord.row][coord.col].tile;
          if (tile == null) {
            return null;
          }

          return {
            tileId: tile.id,
            coord,
            assetId: assetIdForTileType(tile.type),
            tileType: tile.type,
            isPath: this.board[coord.row][coord.col].isPath,
            alpha: 1,
          };
        })
        .filter((cell) => cell != null),
      emptyCells: getVoidCoords(this.board).map((coord) => ({
        coord,
        assetId: AssetIds.tiles.empty,
      })),
      pathCells: getAllPlayableCoords(this.board).filter(
        (coord) => this.board[coord.row][coord.col].isPath,
      ),
      mageCell: this.journeyRuntime?.mageCell ?? null,
      goalCell:
        this.currentLevel?.type === "JOURNEY"
          ? this.currentLevel.journey.goalCell
          : null,
      hintedCells:
        this.currentLevel?.type === "JOURNEY" && this.journeyRuntime != null
          ? getVisibleJourneyHintCells(
              this.currentLevel,
              this.journeyRuntime,
              this.elapsedSec,
            )
          : [],
      selectedCell: null,
      queuedSwap: null,
      shakePixels: this.getShakePixels(),
      visualCues: this.getBoardVisualCueState(),
      animationTrace: this.latestBoardAnimationTrace,
      matchHint: this.getMatchHintVisualState(),
      tutorialLock: tutorialPresentation.hideBoard ? null : this.getTrialTutorialVisualState(),
    };
  }

  getHeroWorldState(): HeroWorldState {
    const objects = this.getHeroWorldObjects();
    return {
      levelType: this.currentLevel?.type ?? "JOURNEY",
      backdropId: this.getHeroStageBackdropAssetId(),
      cinematicState: phaseToCinematicState(this.phase),
      objects,
      activeProjectiles: this.trialRuntime?.projectiles ?? [],
      camera: {
        mode: "fixed",
        position: { x: 0, y: 0, z: 12 },
        target: { x: 0, y: 0, z: 0 },
        fovDeg: 35,
      },
    };
  }

  getHudState(): HudRenderState {
    return {
      phase: this.phase,
      levelText: `Level ${this.run.levelNumber}`,
      lives: this.run.lives,
      scoreText: `${this.run.score}`,
      objectiveText: this.getObjectiveText(),
      trialMonsterFill: this.getTrialMonsterFill(),
      muted: this.muted,
      bgmMuted: this.bgmMuted,
      debugText: `Seed ${this.run.seed}`,
    };
  }

  getScreenState(
    leaderboardRows: readonly LeaderboardEntry[] = [],
    highlightedRank: number | null = null,
  ): ScreenRenderState {
    return {
      screen: screenForPhase(this.phase),
      phase: this.phase,
      finalScore: this.phase === "GAME_OVER" ? this.finalScore : this.run.score,
      highScore: getHighScore(leaderboardRows),
      leaderboardRows,
      highlightedRank,
      buttonRects: {
        tryAgain: GAME_OVER_TRY_AGAIN_BUTTON_RECT,
        mute: HUD_MUTE_TOGGLE_RECT,
        bgm: HUD_BGM_TOGGLE_RECT,
      },
      muted: this.muted,
      transitionText: transitionTextForPhase(this.phase),
    };
  }

  drainEvents(): GameEvent[] {
    const drained = this.events;
    this.events = [];
    return drained;
  }

  reset(seed = createRandomSeed()): void {
    this.rng = new SeededRng(seed);
    this.run = createInitialRunState(seed);
    if (
      this.options.debugStartLevel != null &&
      this.options.debugStartLevel > 1
    ) {
      const debugLevel = Math.floor(this.options.debugStartLevel);
      this.run = {
        ...this.run,
        levelNumber: debugLevel,
        difficulty: debugLevel,
        levelsCleared: debugLevel - 1,
      };
    }
    this.prepareCurrentLevel();
    this.elapsedSec = 0;
    this.transitionTimerSec = 0;
    this.pendingLevelResult = null;
    this.pendingClearScore = 0;
    this.finalScore = 0;
    this.visualCues = [];
    this.shakeTimerSec = 0;
    this.shakeAmplitudePixels = 0;
    this.latestBoardAnimationTrace = null;
    this.latestBoardAnimationEndsAtSec = 0;
    this.animationClockSec = 0;
    this.nextBoardAnimationRevision = 1;
    this.resetMatchHintTimer();
    this.events = [];
    this.bgmMuted = false;
    this.trialTutorial = null;
    this.tutorialPresentationMode = "standard";
    this.tutorialZoomOutElapsedSec = 0;
    this.floatingTutorialResolveElapsedSec = 0;
    this.floatingTutorialDragStart = null;
    this.trialActorEntranceElapsedSec = TRIAL_ACTOR_ENTRANCE_TOTAL_DURATION_SEC;
    this.trialMageExitElapsedSec = TRIAL_MAGE_EXIT_DURATION_SEC;
    this.startPreparedLevel();
  }

  getRunStateForDebug(): RunState {
    return { ...this.run };
  }

  getRngStateForDebug(): number {
    return this.rng.getState();
  }

  getElapsedSecForDebug(): number {
    return this.elapsedSec;
  }

  getBoardForDebug(): Board {
    return this.board;
  }

  getCurrentLevelForDebug(): GeneratedLevel | null {
    return this.currentLevel;
  }

  getJourneyRuntimeForDebug(): JourneyRuntimeState | null {
    return this.journeyRuntime == null ? null : { ...this.journeyRuntime };
  }

  getTrialRuntimeForDebug(): TrialRuntimeState | null {
    return this.trialRuntime == null
      ? null
      : {
          ...this.trialRuntime,
          monsters: this.trialRuntime.monsters.map((monster) => ({
            ...monster,
          })),
          projectiles: this.trialRuntime.projectiles.map((projectile) => ({
            ...projectile,
          })),
          pendingAttacks: this.trialRuntime.pendingAttacks.map((attack) => ({
            ...attack,
            excludedMonsterIds: attack.excludedMonsterIds == null ? undefined : [...attack.excludedMonsterIds],
          })),
          defeatedMonsterIds: [...this.trialRuntime.defeatedMonsterIds],
        };
  }

  getLevelStatsForDebug(): { matchCount: number; validSwapCount: number } {
    return {
      matchCount: this.levelMatchCount,
      validSwapCount: this.levelValidSwapCount,
    };
  }

  getTrialTutorialStateForDebug(): TrialTutorialState | null {
    return this.trialTutorial == null
      ? null
      : {
          ...this.trialTutorial,
          board: cloneBoard(this.trialTutorial.board),
          allowedSwap: {
            from: { ...this.trialTutorial.allowedSwap.from },
            to: { ...this.trialTutorial.allowedSwap.to },
          },
          flashCells: this.trialTutorial.flashCells.map((coord) => ({ ...coord })),
          matchCells: this.trialTutorial.matchCells.map((coord) => ({ ...coord })),
          movingCell: { ...this.trialTutorial.movingCell },
          direction: { ...this.trialTutorial.direction },
        };
  }

  getTrialEntranceStateForDebug(): {
    active: boolean;
    elapsedSec: number;
    enemyProgress: number;
    mageProgress: number;
  } {
    return {
      active: this.isTrialActorEntranceActive(),
      elapsedSec: this.trialActorEntranceElapsedSec,
      enemyProgress: this.getTrialActorEntranceEnemyProgress(),
      mageProgress: this.getTrialActorEntranceMageProgress(),
    };
  }

  getLatestBoardAnimationEndsAtSecForDebug(): number {
    return this.latestBoardAnimationEndsAtSec;
  }

  getTrialWalkingMonsterIds(): readonly string[] {
    if (this.phase !== "IDLE") {
      return [];
    }
    if (this.currentLevel?.type !== "TRIAL" || this.trialRuntime == null) {
      return [];
    }
    if (this.isTrialActorEntranceActive()) {
      return [];
    }
    if (this.trialRuntime.result !== "playing") {
      return [];
    }
    return this.trialRuntime.monsters
      .filter((monster) => this.isTrialMonsterActivelyWalking(monster))
      .map((monster) => monster.monsterId);
  }

  private isTrialMonsterActivelyWalking(monster: ActiveTrialMonster): boolean {
    if (monster.hp <= 0) {
      return false;
    }
    if ((monster.defeatAnimationRemainingSec ?? 0) > TRIAL_WALK_AUDIO_EPSILON_SEC) {
      return false;
    }
    if ((monster.iceFreezeRemainingSec ?? 0) > TRIAL_WALK_AUDIO_EPSILON_SEC) {
      return false;
    }
    return monster.walkSpeed > 0;
  }

  private prepareCurrentLevel(): void {
    const levelType = selectLevelTypeForRun(
      this.run.seed,
      this.run.levelNumber,
      this.options.debugLevelType,
    );
    const levelSeed =
      this.run.levelNumber === 1
        ? this.run.seed
        : deriveLevelSeed(this.run.seed, this.run.levelNumber);

    this.currentLevel = generateLevel({
      levelNumber: this.run.levelNumber,
      difficulty: this.run.difficulty,
      seed: levelSeed,
      forcedLevelType: levelType,
    });
    this.board = cloneBoard(this.currentLevel.initialBoard);
    this.journeyRuntime =
      this.currentLevel.type === "JOURNEY"
        ? createJourneyRuntime(this.currentLevel)
        : null;
    this.trialRuntime =
      this.currentLevel.type === "TRIAL"
        ? createTrialRuntime(this.currentLevel)
        : null;
    this.elapsedSec = 0;
    this.transitionTimerSec = 0;
    this.pendingLevelResult = null;
    this.pendingClearScore = 0;
    this.levelMatchCount = 0;
    this.levelValidSwapCount = 0;
    this.visualCues = [];
    this.shakeTimerSec = 0;
    this.shakeAmplitudePixels = 0;
    this.latestBoardAnimationTrace = null;
    this.latestBoardAnimationEndsAtSec = this.animationClockSec;
    this.resetMatchHintTimer();
    this.trialPlayerDefeatSfxEmitted = false;
    this.trialTutorial = null;
    this.tutorialPresentationMode = "standard";
    this.tutorialZoomOutElapsedSec = 0;
    this.floatingTutorialResolveElapsedSec = 0;
    this.floatingTutorialDragStart = null;
    this.trialActorEntranceElapsedSec = TRIAL_ACTOR_ENTRANCE_TOTAL_DURATION_SEC;
    this.trialMageExitElapsedSec = TRIAL_MAGE_EXIT_DURATION_SEC;
  }

  private startPreparedLevel(): void {
    if (this.currentLevel == null) {
      this.prepareCurrentLevel();
    }

    this.phase = "IDLE";
    this.elapsedSec = 0;
    this.transitionTimerSec = 0;
    this.resetMatchHintTimer();
    this.startTrialTutorialIfNeeded();
    this.startTrialActorEntranceIfNeeded();
    this.captureBoardAnimationTrace(
      createLevelIntroBoardAnimationTrace(this.board, 0),
    );
    this.requestSound(AssetIds.sounds.levelStart, {
      category: "level",
      volume: 0.35,
    });
    this.events.push({
      type: "levelStarted",
      levelNumber: this.run.levelNumber,
      levelType: this.currentLevel?.type ?? "JOURNEY",
      seed: this.currentLevel?.seed ?? this.run.seed,
    });
  }

  private startTrialTutorialIfNeeded(): void {
    if (!this.shouldStartTrialTutorial() || this.currentLevel?.type !== "TRIAL") {
      return;
    }

    const setup = createTrialTutorialBoardSetup(this.board);
    this.board = setup.board;
    this.trialRuntime = createTrialTutorialRuntime(this.currentLevel);
    this.trialTutorial = {
      ...setup,
      phase: "active",
    };
    this.tutorialPresentationMode = "tutorialFullHero";
    this.tutorialZoomOutElapsedSec = 0;
    this.floatingTutorialResolveElapsedSec = 0;
    this.floatingTutorialDragStart = null;
  }

  private shouldStartTrialTutorial(): boolean {
    return (
      this.options.skipTutorial !== true &&
      this.options.debugLevelType == null &&
      this.options.debugStartLevel == null &&
      this.run.levelNumber === 1 &&
      this.currentLevel?.type === "TRIAL"
    );
  }

  private startTrialActorEntranceIfNeeded(): void {
    this.trialActorEntranceElapsedSec =
      this.currentLevel?.type === "TRIAL"
        ? 0
        : TRIAL_ACTOR_ENTRANCE_TOTAL_DURATION_SEC;
  }

  private updateTrialActorEntrance(dtSec: number): number {
    const elapsed = Math.max(0, dtSec);
    if (!this.isTrialActorEntranceActive()) {
      return elapsed;
    }

    const remainingSec = Math.max(
      0,
      TRIAL_ACTOR_ENTRANCE_TOTAL_DURATION_SEC - this.trialActorEntranceElapsedSec,
    );
    const consumedSec = Math.min(remainingSec, elapsed);
    this.trialActorEntranceElapsedSec = Math.min(
      TRIAL_ACTOR_ENTRANCE_TOTAL_DURATION_SEC,
      this.trialActorEntranceElapsedSec + consumedSec,
    );
    return Math.max(0, elapsed - consumedSec);
  }

  private isTrialActorEntranceActive(): boolean {
    return (
      this.currentLevel?.type === "TRIAL" &&
      this.trialActorEntranceElapsedSec < TRIAL_ACTOR_ENTRANCE_TOTAL_DURATION_SEC
    );
  }

  private getTrialActorEntranceEnemyProgress(): number {
    return easeOutCubic(
      clamp01(this.trialActorEntranceElapsedSec / TRIAL_ACTOR_ENTRANCE_ENEMY_DURATION_SEC),
    );
  }

  private getTrialActorEntranceMageProgress(): number {
    return easeOutCubic(
      clamp01(
        (this.trialActorEntranceElapsedSec - TRIAL_ACTOR_ENTRANCE_ENEMY_DURATION_SEC) /
          TRIAL_ACTOR_ENTRANCE_MAGE_DURATION_SEC,
      ),
    );
  }

  private getTrialMonsterEntranceXOffset(): number {
    if (this.currentLevel?.type !== "TRIAL") {
      return 0;
    }

    return TRIAL_ACTOR_ENTRANCE_OFFSCREEN_X_OFFSET * (1 - this.getTrialActorEntranceEnemyProgress());
  }

  private getTrialMageEntranceXOffset(): number {
    if (this.currentLevel?.type !== "TRIAL") {
      return 0;
    }

    return -TRIAL_ACTOR_ENTRANCE_OFFSCREEN_X_OFFSET * (1 - this.getTrialActorEntranceMageProgress());
  }

  private updateTrialMageExit(dtSec: number): void {
    if (!this.isTrialMageExitActive()) {
      return;
    }

    this.trialMageExitElapsedSec = Math.min(
      TRIAL_MAGE_EXIT_DURATION_SEC,
      this.trialMageExitElapsedSec + Math.max(0, dtSec),
    );
  }

  private isTrialMageExitActive(): boolean {
    return (
      this.currentLevel?.type === "TRIAL" &&
      this.pendingLevelResult === "win" &&
      this.trialMageExitElapsedSec < TRIAL_MAGE_EXIT_DURATION_SEC
    );
  }

  private isLevelResultExitAnimationComplete(): boolean {
    return (
      this.currentLevel?.type !== "TRIAL" ||
      this.pendingLevelResult !== "win" ||
      this.trialMageExitElapsedSec >= TRIAL_MAGE_EXIT_DURATION_SEC
    );
  }

  private getTrialMageExitXOffset(): number {
    if (this.currentLevel?.type !== "TRIAL" || this.pendingLevelResult !== "win") {
      return 0;
    }

    return TRIAL_MAGE_EXIT_OFFSCREEN_X_OFFSET * this.getTrialMageExitProgress();
  }

  private getTrialMageExitProgress(): number {
    return easeOutCubic(clamp01(this.trialMageExitElapsedSec / TRIAL_MAGE_EXIT_DURATION_SEC));
  }

  private updateTrialStage(dtSec: number): void {
    if (this.currentLevel?.type !== "TRIAL" || this.trialRuntime == null) {
      return;
    }

    const previousResult = this.trialRuntime.result;
    const updateResult = updateTrialRuntimeWithEvents(
      this.trialRuntime,
      this.currentLevel,
      dtSec,
    );
    const nextRuntime = updateResult.runtime;
    this.trialRuntime = nextRuntime;

    const tutorialPhase = this.trialTutorial?.phase ?? null;
    if (tutorialPhase == null && updateResult.scoreDelta > 0) {
      this.run = { ...this.run, score: this.run.score + updateResult.scoreDelta };
      this.events.push({ type: "scoreChanged", score: this.run.score });
    }
    for (const damageEvent of updateResult.damageEvents) {
      this.emitTrialMonsterHitSounds(damageEvent);
    }
    if (tutorialPhase != null) {
      if (tutorialPhase === "resolving" && nextRuntime.result === "won") {
        this.completeTrialTutorial();
      }
      return;
    }

    this.maybeEmitTrialPlayerDefeatSfx(previousResult, nextRuntime.result);
    if (nextRuntime.result === "won") {
      this.beginLevelResult("win");
    } else if (nextRuntime.result === "lost") {
      this.beginLevelResult("loss");
    }
  }

  private updateTrialVisualTimers(dtSec: number): void {
    if (this.currentLevel?.type !== "TRIAL" || this.trialRuntime == null) {
      return;
    }

    this.trialRuntime = updateTrialVisuals(this.trialRuntime, dtSec);
  }

  private completeTrialTutorial(): void {
    if (this.currentLevel?.type !== "TRIAL") {
      this.trialTutorial = null;
      this.tutorialPresentationMode = "standard";
      return;
    }

    this.trialRuntime = createTrialRuntime(this.currentLevel);
    this.trialTutorial = null;
    this.elapsedSec = 0;
    this.resetMatchHintTimer();
    this.trialPlayerDefeatSfxEmitted = false;
    this.startTrialActorEntranceIfNeeded();
    this.startTutorialZoomOut();
  }

  private isTrialTutorialInputLocked(): boolean {
    return this.trialTutorial != null || this.isTrialActorEntranceActive();
  }

  private handleTap(x: number, y: number): void {
    const point = { x, y };
    if (pointInHudBgmToggle(point)) {
      this.emitUiClick();
      this.bgmMuted = !this.bgmMuted;
      return;
    }

    if (
      this.phase === "GAME_OVER" &&
      pointInRect(point, GAME_OVER_TRY_AGAIN_BUTTON_RECT)
    ) {
      this.tryAgain();
      this.emitUiClick();
      return;
    }

    if (this.phase !== "IDLE" && this.phase !== "WIN" && this.phase !== "LOSE") {
      return;
    }

    const boardCell = logicalPointToBoardCell(point);
    if (boardCell == null) {
      if (pointInRect(point, HUD_MUTE_TOGGLE_RECT)) {
        this.emitUiClick();
        this.muted = !this.muted;
        return;
      }
      return;
    }

    if (this.phase !== "IDLE") {
      return;
    }

    if (this.isTrialTutorialInputLocked()) {
      return;
    }

    this.resetMatchHintTimer();

    if (this.currentLevel?.type === "TRIAL") {
      this.handleTrialPowerUpTap(boardCell);
      return;
    }

    if (this.currentLevel?.type === "JOURNEY") {
      this.handleJourneyPowerUpTap(boardCell);
    }
  }

  private handleDragStart(x: number, y: number): void {
    if (!this.isFloatingTutorialInputEnabled()) {
      this.floatingTutorialDragStart = null;
      return;
    }

    const role = this.floatingTutorialTileRoleAtPoint({ x, y });
    this.floatingTutorialDragStart =
      role === "earth" || role === "lowerLightning" ? { x, y } : null;
  }

  private handleDragEnd(x: number, y: number): void {
    if (!this.isFloatingTutorialInputEnabled() || this.floatingTutorialDragStart == null) {
      this.floatingTutorialDragStart = null;
      return;
    }

    const startRole = this.floatingTutorialTileRoleAtPoint(this.floatingTutorialDragStart);
    const endRole = this.floatingTutorialTileRoleAtPoint({ x, y });
    this.floatingTutorialDragStart = null;
    if (!isFloatingTutorialDragPair(startRole, endRole)) {
      return;
    }

    this.activateFloatingTutorialSwap();
  }

  private activateFloatingTutorialSwap(): void {
    if (this.trialTutorial == null || this.trialTutorial.phase !== "active") {
      return;
    }

    const allowedSwap = this.trialTutorial.allowedSwap;
    this.resetMatchHintTimer();
    this.handleTrialTutorialSwap(allowedSwap.from, allowedSwap.to);
  }

  private startTutorialZoomOut(): void {
    this.tutorialPresentationMode = "tutorialZoomOut";
    this.tutorialZoomOutElapsedSec = 0;
    this.floatingTutorialResolveElapsedSec = 0;
    this.floatingTutorialDragStart = null;
  }

  private updateTutorialPresentation(dtSec: number): void {
    if (this.trialTutorial?.phase === "resolving") {
      this.floatingTutorialResolveElapsedSec += dtSec;
    }

    if (this.tutorialPresentationMode !== "tutorialZoomOut") {
      return;
    }

    this.tutorialZoomOutElapsedSec += dtSec;
    if (this.tutorialZoomOutElapsedSec >= TUTORIAL_ZOOM_OUT_DURATION_SEC) {
      this.tutorialPresentationMode = "standard";
      this.tutorialZoomOutElapsedSec = TUTORIAL_ZOOM_OUT_DURATION_SEC;
    }
  }

  private tryAgain(): void {
    this.reset(this.debugSeed ?? createRandomSeed());
  }

  private beginLevelResult(result: "win" | "loss"): void {
    if (this.pendingLevelResult != null || this.currentLevel == null) {
      return;
    }

    this.resetMatchHintTimer();
    this.pendingLevelResult = result;
    this.transitionTimerSec = 0;
    this.phase = result === "win" ? "WIN" : "LOSE";
    this.pendingClearScore = result === "win" ? this.getLevelClearScore() : 0;
    this.trialMageExitElapsedSec =
      result === "win" && this.currentLevel.type === "TRIAL"
        ? 0
        : TRIAL_MAGE_EXIT_DURATION_SEC;
    this.events.push({
      type: "levelEnded",
      levelNumber: this.run.levelNumber,
      levelType: this.currentLevel.type,
      result,
    });
  }

  private advanceAfterLevelResult(): void {
    if (this.pendingLevelResult == null) {
      return;
    }

    if (this.pendingLevelResult === "win") {
      this.run = advanceRunAfterWin(this.run, this.pendingClearScore);
      this.requestSound(AssetIds.sounds.levelUp, {
        category: "level",
        volume: 0.58,
      });
      if (this.pendingClearScore > 0) {
        this.events.push({ type: "scoreChanged", score: this.run.score });
      }
      this.prepareCurrentLevel();
      this.startPreparedLevel();
      return;
    }

    this.run = advanceRunAfterLoss(this.run);
    if (this.run.lives <= 0) {
      this.finalScore = this.run.score;
      this.phase = "GAME_OVER";
      this.pendingLevelResult = null;
      this.transitionTimerSec = 0;
      this.requestSound(AssetIds.sounds.runEnd, {
        category: "run",
        volume: 0.58,
      });
      this.events.push({
        type: "runEnded",
        finalScore: this.run.score,
        levelsCleared: this.run.levelsCleared,
      });
      return;
    }

    this.prepareCurrentLevel();
    this.startPreparedLevel();
  }

  private handleSwap(
    from: { col: number; row: number },
    to: { col: number; row: number },
  ): void {
    if (this.phase !== "IDLE") {
      return;
    }

    if (this.currentLevel?.type === "TRIAL" && this.isTrialActorEntranceActive()) {
      return;
    }

    if (this.trialTutorial != null) {
      if (this.tutorialPresentationMode === "tutorialFullHero") {
        return;
      }

      if (this.trialTutorial.phase !== "active") {
        return;
      }

      if (!isTrialTutorialSwap(this.trialTutorial, from, to)) {
        return;
      }

      this.resetMatchHintTimer();
      this.handleTrialTutorialSwap(from, to);
      return;
    }

    this.resetMatchHintTimer();

    if (this.currentLevel?.type === "TRIAL" && this.trialRuntime != null) {
      this.handleTrialSwap(from, to);
      return;
    }

    if (this.currentLevel?.type !== "JOURNEY" || this.journeyRuntime == null) {
      return;
    }

    const journeySwapPowerUpType = this.peekJourneySwapPowerUpType(from, to);
    const result = processJourneySwap(
      this.board,
      this.journeyRuntime,
      this.currentLevel,
      from,
      to,
      this.rng,
    );

    if (!result.valid) {
      this.captureBoardAnimationTrace(result.animationTrace);
      if (result.animationTrace?.kind === "invalidSwap") {
        this.requestSound(AssetIds.sounds.boardMoveBack, {
          category: "match",
          volume: 0.46,
        });
      }
      return;
    }

    const previousMageCell = this.journeyRuntime.mageCell;
    this.requestSound(AssetIds.sounds.boardMove, {
      category: "match",
      volume: 0.48,
    });
    this.board = result.board;
    this.journeyRuntime = result.runtime;
    this.levelMatchCount += result.scoringStats.matchCount;
    this.levelValidSwapCount += result.scoringStats.validSwapCount;
    this.captureBoardAnimationTrace(result.animationTrace);
    this.emitPowerUpActivationSound(journeySwapPowerUpType);
    this.emitMatchAudioAndJuice(result.scoringStats, to);
    this.emitJourneyAudioAndJuice(result, previousMageCell, to);
    const scoreDelta = result.scoreDelta + scoreSwapStats(result.scoringStats);
    if (scoreDelta > 0) {
      this.run = { ...this.run, score: this.run.score + scoreDelta };
      this.events.push({ type: "scoreChanged", score: this.run.score });
    }

    if (result.runtime.result === "won") {
      this.beginLevelResult("win");
    } else if (result.runtime.result === "lost") {
      this.beginLevelResult("loss");
    }
  }

  private handleJourneyPowerUpTap(origin: CellCoord): void {
    if (
      this.phase !== "IDLE" ||
      this.currentLevel?.type !== "JOURNEY" ||
      this.journeyRuntime == null
    ) {
      return;
    }

    const result = processJourneyPowerUpActivation(
      this.board,
      this.journeyRuntime,
      this.currentLevel,
      origin,
      this.rng,
    );

    if (!result.valid) {
      return;
    }

    const journeyTapPowerUpType = getCell(this.board, origin)?.tile?.type;
    const previousMageCell = this.journeyRuntime.mageCell;
    this.board = result.board;
    this.journeyRuntime = result.runtime;
    this.levelMatchCount += result.scoringStats.matchCount;
    this.levelValidSwapCount += result.scoringStats.validSwapCount;
    this.captureBoardAnimationTrace(result.animationTrace);
    this.emitPowerUpActivationSound(journeyTapPowerUpType);
    this.emitMatchAudioAndJuice(result.scoringStats, origin);
    this.emitJourneyAudioAndJuice(result, previousMageCell, origin);
    const scoreDelta = result.scoreDelta + scoreSwapStats(result.scoringStats);
    if (scoreDelta > 0) {
      this.run = { ...this.run, score: this.run.score + scoreDelta };
      this.events.push({ type: "scoreChanged", score: this.run.score });
    }

    if (result.runtime.result === "won") {
      this.beginLevelResult("win");
    } else if (result.runtime.result === "lost") {
      this.beginLevelResult("loss");
    }
  }

  private handleTrialSwap(from: CellCoord, to: CellCoord): void {
    if (this.currentLevel?.type !== "TRIAL" || this.trialRuntime == null) {
      return;
    }

    const previousTrialResult = this.trialRuntime.result;
    const trialSwapPowerUpType = this.peekTrialSwapPowerUpType(from, to);
    const result = processTrialSwap(
      this.board,
      this.trialRuntime,
      this.currentLevel,
      from,
      to,
      this.rng,
    );
    if (!result.valid) {
      this.captureBoardAnimationTrace(result.animationTrace);
      if (result.animationTrace?.kind === "invalidSwap") {
        this.requestSound(AssetIds.sounds.boardMoveBack, {
          category: "match",
          volume: 0.46,
        });
      }
      return;
    }

    this.requestSound(AssetIds.sounds.boardMove, {
      category: "match",
      volume: 0.48,
    });
    this.board = result.board;
    this.trialRuntime = result.runtime;
    this.maybeEmitTrialPlayerDefeatSfx(previousTrialResult, result.runtime.result);
    this.levelMatchCount += result.scoringStats.matchCount;
    this.levelValidSwapCount += result.scoringStats.validSwapCount;
    this.captureBoardAnimationTrace(result.animationTrace);
    this.emitPowerUpActivationSound(trialSwapPowerUpType);
    this.emitMatchAudioAndJuice(result.scoringStats, to);
    this.emitTrialAudioAndJuice(result.queuedAttackEvents, to);
    const scoreDelta = result.scoreDelta + scoreSwapStats(result.scoringStats);

    if (scoreDelta > 0) {
      this.run = { ...this.run, score: this.run.score + scoreDelta };
      this.events.push({ type: "scoreChanged", score: this.run.score });
    }

    for (const damageEvent of result.damageEvents) {
      this.emitTrialMonsterHitSounds(damageEvent);
    }

    if (result.runtime.result === "won") {
      this.beginLevelResult("win");
    } else if (result.runtime.result === "lost") {
      this.beginLevelResult("loss");
    }
  }

  private handleTrialTutorialSwap(from: CellCoord, to: CellCoord): void {
    if (
      this.currentLevel?.type !== "TRIAL" ||
      this.trialRuntime == null ||
      this.trialTutorial == null ||
      this.trialTutorial.phase !== "active"
    ) {
      return;
    }

    const result = processTrialSwap(
      this.board,
      this.trialRuntime,
      this.currentLevel,
      from,
      to,
      this.rng,
    );
    if (!result.valid) {
      return;
    }

    this.requestSound(AssetIds.sounds.boardMove, {
      category: "match",
      volume: 0.48,
    });
    this.board = result.board;
    this.trialRuntime = result.runtime;
    this.trialTutorial = {
      ...this.trialTutorial,
      phase: "resolving",
    };
    this.floatingTutorialResolveElapsedSec = 0;
    this.captureBoardAnimationTrace(result.animationTrace);
    this.emitMatchAudioAndJuice(result.scoringStats, to);
    this.emitTrialAudioAndJuice(result.queuedAttackEvents, to);
    for (const damageEvent of result.damageEvents) {
      this.emitTrialMonsterHitSounds(damageEvent);
    }
  }

  private handleTrialPowerUpTap(origin: CellCoord): void {
    if (this.currentLevel?.type !== "TRIAL" || this.trialRuntime == null) {
      return;
    }

    const previousTrialResult = this.trialRuntime.result;
    const result = processTrialPowerUpActivation(
      this.board,
      this.trialRuntime,
      this.currentLevel,
      origin,
      this.rng,
    );
    if (!result.valid) {
      return;
    }

    const trialTapPowerUpType = getCell(this.board, origin)?.tile?.type;
    this.board = result.board;
    this.trialRuntime = result.runtime;
    this.maybeEmitTrialPlayerDefeatSfx(previousTrialResult, result.runtime.result);
    this.levelMatchCount += result.scoringStats.matchCount;
    this.levelValidSwapCount += result.scoringStats.validSwapCount;
    this.captureBoardAnimationTrace(result.animationTrace);
    this.emitPowerUpActivationSound(trialTapPowerUpType);
    this.emitMatchAudioAndJuice(result.scoringStats, origin);
    this.emitTrialAudioAndJuice(result.queuedAttackEvents, origin);
    const scoreDelta = result.scoreDelta + scoreSwapStats(result.scoringStats);

    if (scoreDelta > 0) {
      this.run = { ...this.run, score: this.run.score + scoreDelta };
      this.events.push({ type: "scoreChanged", score: this.run.score });
    }

    for (const damageEvent of result.damageEvents) {
      this.emitTrialMonsterHitSounds(damageEvent);
    }

    if (result.runtime.result === "won") {
      this.beginLevelResult("win");
    } else if (result.runtime.result === "lost") {
      this.beginLevelResult("loss");
    }
  }

  private getLevelClearScore(): number {
    if (this.currentLevel?.type === "JOURNEY" && this.journeyRuntime != null) {
      return scoreJourneyClear(
        this.run.difficulty,
        this.journeyRuntime.movesRemaining,
      );
    }

    if (this.currentLevel?.type === "TRIAL") {
      return scoreTrialClear(
        this.run.difficulty,
        this.levelMatchCount,
        this.elapsedSec,
      );
    }

    return 0;
  }

  private captureBoardAnimationTrace(
    trace: BoardAnimationTrace | undefined,
  ): void {
    const stampedTrace = stampBoardAnimationTrace(
      trace,
      this.nextBoardAnimationRevision,
    );
    if (stampedTrace == null) {
      return;
    }

    this.latestBoardAnimationTrace = stampedTrace;
    this.latestBoardAnimationEndsAtSec =
      this.animationClockSec +
      getBoardAnimationTraceDurationMs(stampedTrace) / 1000;
    this.nextBoardAnimationRevision += 1;
  }

  private hasLatestBoardAnimationFinished(): boolean {
    return this.animationClockSec >= this.latestBoardAnimationEndsAtSec;
  }

  private peekJourneySwapPowerUpType(from: CellCoord, to: CellCoord): TileType | null {
    const fromType = getCell(this.board, from)?.tile?.type;
    const toType = getCell(this.board, to)?.tile?.type;
    if (isTapActivatablePowerUpTileType(fromType)) {
      return fromType;
    }
    if (isTapActivatablePowerUpTileType(toType)) {
      return toType;
    }

    return null;
  }

  private peekTrialSwapPowerUpType(from: CellCoord, to: CellCoord): TileType | null {
    const fromTile = getCell(this.board, from)?.tile;
    const toTile = getCell(this.board, to)?.tile;
    if (fromTile != null && isPowerUpTileType(fromTile.type)) {
      return fromTile.type;
    }
    if (toTile != null && isPowerUpTileType(toTile.type)) {
      return toTile.type;
    }

    return null;
  }

  private emitPowerUpActivationSound(activatedType: TileType | null | undefined): void {
    if (activatedType === "TNT") {
      this.requestSound(AssetIds.sounds.powerupBombActivate, {
        category: "match",
        volume: 0.52,
      });
    } else if (activatedType === "ROCKET_H" || activatedType === "ROCKET_V") {
      this.requestSound(AssetIds.sounds.powerupRocketActivate, {
        category: "match",
        volume: 0.52,
      });
    }
  }

  private requestSound(
    soundId: string,
    options: {
      intensity?: number;
      volume?: number;
      playbackRate?: number;
      category?: SoundEventCategory;
      delaySec?: number;
    } = {},
  ): void {
    const event: Extract<GameEvent, { type: "soundRequested" }> = {
      type: "soundRequested",
      soundId,
    };
    if (options.intensity != null) {
      event.intensity = options.intensity;
    }
    if (options.volume != null) {
      event.volume = options.volume;
    }
    if (options.playbackRate != null) {
      event.playbackRate = options.playbackRate;
    }
    if (options.category != null) {
      event.category = options.category;
    }
    if (options.delaySec != null) {
      event.delaySec = options.delaySec;
    }

    this.events.push(event);
  }

  private emitUiClick(): void {
    this.requestSound(AssetIds.sounds.uiClick, {
      category: "ui",
      volume: 0.52,
    });
  }

  private emitMatchAudioAndJuice(
    stats: SwapScoringStats,
    anchor: CellCoord,
  ): void {
    if (stats.matchCount <= 0) {
      return;
    }

    this.requestSound(AssetIds.sounds.mergeMatch, {
      category: "match",
      volume: 0.52,
    });
    this.requestSound(AssetIds.sounds.matchCoin, {
      category: "match",
      volume: 0.5,
    });

    if (stats.powerUpsCreated > 0) {
      this.addBoardCue("powerPulse", anchor, 0.45);
    }

    this.addBoardCue("matchFlash", anchor, 0.3);
    this.triggerBoardShake(stats.matchCount + stats.powerUpsCreated);
  }

  private emitJourneyAudioAndJuice(
    result: ReturnType<typeof processJourneySwap>,
    previousMageCell: CellCoord,
    anchor: CellCoord,
  ): void {
    for (const coord of result.clearedStandardCells.slice(0, 8)) {
      this.addBoardCue("matchFlash", coord, 0.28);
    }

    if (result.convertedPathCells.length > 0) {
      for (const coord of result.convertedPathCells.slice(0, 12)) {
        this.addBoardCue("pathGlow", coord, 0.55);
      }
    }

    if (!coordsEqual(previousMageCell, result.runtime.mageCell)) {
      this.addBoardCue("pathGlow", result.runtime.mageCell, 0.42);
    }

    if (
      result.convertedPathCells.length === 0 &&
      result.clearedStandardCells.length === 0
    ) {
      this.addBoardCue("matchFlash", anchor, 0.22);
    }
  }

  private emitTrialAudioAndJuice(
    damageEvents: readonly TrialQueuedAttackEvent[],
    anchor: CellCoord,
  ): void {
    for (const event of damageEvents.slice(0, 8)) {
      const sounds = soundIdsForSpellSchool(event.schoolId);
      this.requestSound(sounds.whoosh, {
        category: "spell",
        volume: 0.34,
        delaySec: event.castActivationDelaySec,
      });
      this.addBoardCue(
        "damagePopup",
        anchor,
        0.45,
        `-${Math.round(event.damage)}`,
      );
    }
  }

  private emitTrialMonsterHitSounds(damageEvent: TrialDamageEvent): void {
    if (damageEvent.damage <= 0) {
      return;
    }

    this.requestSound(AssetIds.sounds.monsterDamage, {
      category: "enemy",
      volume: 1,
      delaySec: damageEvent.impactDelaySec,
    });
    if (damageEvent.defeated) {
      this.requestSound(AssetIds.sounds.monsterDefeat, {
        category: "enemy",
        volume: 0.62,
        delaySec: damageEvent.impactDelaySec,
      });
    }
  }

  private maybeEmitTrialPlayerDefeatSfx(
    previousResult: LevelResult,
    nextResult: LevelResult,
  ): void {
    if (this.currentLevel?.type !== "TRIAL") {
      return;
    }
    if (previousResult !== "playing" || nextResult !== "lost") {
      return;
    }
    if (this.trialPlayerDefeatSfxEmitted) {
      return;
    }

    this.trialPlayerDefeatSfxEmitted = true;
    this.requestSound(AssetIds.sounds.playerDamage, {
      category: "level",
      volume: 0.5,
    });
    this.requestSound(AssetIds.sounds.playerDefeat, {
      category: "level",
      volume: 0.58,
      delaySec: TRIAL_PLAYER_DEATH_SFX_DELAY_SEC,
    });
  }

  private addBoardCue(
    kind: BoardVisualCueKind,
    coord: CellCoord,
    durationSec: number,
    text?: string,
  ): void {
    this.visualCues.push({
      kind,
      coord,
      text,
      durationSec,
      remainingSec: durationSec,
    });
  }

  private triggerBoardShake(weight: number): void {
    this.shakeTimerSec = Math.max(this.shakeTimerSec, 0.16);
    this.shakeAmplitudePixels = Math.min(
      CAMERA_SHAKE_MAX,
      Math.max(CAMERA_SHAKE_MIN, CAMERA_SHAKE_MIN + weight * 1.4),
    );
  }

  private updateBoardJuice(dtSec: number): void {
    if (dtSec <= 0) {
      return;
    }

    this.shakeTimerSec = Math.max(0, this.shakeTimerSec - dtSec);
    if (this.shakeTimerSec <= 0) {
      this.shakeAmplitudePixels = 0;
    }

    this.visualCues = this.visualCues
      .map((cue) => ({ ...cue, remainingSec: cue.remainingSec - dtSec }))
      .filter((cue) => cue.remainingSec > 0);
  }

  private getShakePixels(): number {
    if (this.shakeTimerSec <= 0) {
      return 0;
    }

    return Math.min(
      CAMERA_SHAKE_MAX,
      Math.max(CAMERA_SHAKE_MIN, this.shakeAmplitudePixels),
    );
  }

  private getBoardVisualCueState(): BoardVisualCueState[] {
    return this.visualCues.map((cue) => ({
      kind: cue.kind,
      coord: cue.coord,
      text: cue.text,
      value: Math.max(0, Math.min(1, cue.remainingSec / cue.durationSec)),
    }));
  }

  private getTutorialPresentationState(): NonNullable<BoardRenderState["tutorialPresentation"]> {
    const mode =
      this.tutorialPresentationMode === "tutorialFullHero" && !this.isFullHeroTutorialPresentationActive()
        ? "standard"
        : this.tutorialPresentationMode;
    const hideHud = mode !== "standard";
    const hideBoard = mode !== "standard";
    return {
      mode,
      heroHeight: this.getActiveHeroHeight(mode),
      sceneScale: this.getTutorialSceneScale(mode),
      hideHud,
      hideBoard,
      floatingMatch: mode === "tutorialFullHero" ? this.getFloatingTutorialMatchVisualState() : null,
    };
  }

  private getActiveHeroHeight(mode = this.tutorialPresentationMode): number {
    if (mode === "tutorialFullHero") {
      return TUTORIAL_FULL_HERO_HEIGHT;
    }

    if (mode !== "tutorialZoomOut") {
      return HERO_STAGE_HEIGHT;
    }

    const progress = Math.max(
      0,
      Math.min(1, this.tutorialZoomOutElapsedSec / TUTORIAL_ZOOM_OUT_DURATION_SEC),
    );
    const eased = 1 - Math.pow(1 - progress, 3);
    return TUTORIAL_FULL_HERO_HEIGHT + (HERO_STAGE_HEIGHT - TUTORIAL_FULL_HERO_HEIGHT) * eased;
  }

  private getTutorialSceneScale(mode = this.tutorialPresentationMode): number {
    if (mode === "tutorialFullHero") {
      return TUTORIAL_FULL_HERO_SCENE_SCALE;
    }

    if (mode !== "tutorialZoomOut") {
      return 1;
    }

    const progress = Math.max(
      0,
      Math.min(1, this.tutorialZoomOutElapsedSec / TUTORIAL_ZOOM_OUT_DURATION_SEC),
    );
    const eased = 1 - Math.pow(1 - progress, 3);
    return TUTORIAL_FULL_HERO_SCENE_SCALE + (1 - TUTORIAL_FULL_HERO_SCENE_SCALE) * eased;
  }

  private isFullHeroTutorialPresentationActive(): boolean {
    return this.tutorialPresentationMode === "tutorialFullHero" && this.trialTutorial != null;
  }

  private isFloatingTutorialInputEnabled(): boolean {
    return (
      this.tutorialPresentationMode === "tutorialFullHero" &&
      this.trialTutorial?.phase === "active" &&
      !this.isTrialActorEntranceActive()
    );
  }

  private isFloatingTutorialOverlayVisible(): boolean {
    if (this.tutorialPresentationMode !== "tutorialFullHero" || this.trialTutorial == null) {
      return false;
    }

    if (this.trialTutorial.phase === "active") {
      return true;
    }

    return this.floatingTutorialResolveElapsedSec < this.getFloatingTutorialMatchAnimationDurationSec();
  }

  private getFloatingTutorialMatchAnimationDurationSec(): number {
    return (TILE_SWAP_RETARGET_MS + MATCH_ENERGY_STREAM_DURATION_MS) / 1000;
  }

  private getFloatingTutorialMatchVisualState(): NonNullable<
    NonNullable<BoardRenderState["tutorialPresentation"]>["floatingMatch"]
  > | null {
    if (!this.isFloatingTutorialOverlayVisible()) {
      return null;
    }

    const size = TUTORIAL_FLOATING_TILE_SIZE;
    const gap = TUTORIAL_FLOATING_TILE_GAP;
    const groupWidth = size * 3 + gap * 2;
    const groupHeight = size * 2 + gap;
    const groupX = (LOGICAL_WIDTH - groupWidth) / 2;
    const groupY = LOGICAL_HEIGHT - groupHeight - TUTORIAL_FLOATING_SIDE_PADDING - TUTORIAL_FLOATING_RAISE_PX;
    const progress = (this.matchHintTimerSec % MATCH_HINT_ACTIVE_SEC) / MATCH_HINT_ACTIVE_SEC;
    const pulse = (Math.sin(progress * Math.PI * 2 * 5) + 1) / 2;
    const flash = 0.18 + pulse * 0.32;
    const bounce = Math.max(0, Math.sin(progress * Math.PI * 2 * 3)) * MATCH_HINT_BOUNCE_DISTANCE_PX;
    const tutorialPhase = this.trialTutorial?.phase === "resolving" ? "resolving" : "idle";
    const hintActive = tutorialPhase === "idle";
    const allowedSwap = this.trialTutorial?.allowedSwap;
    const topCenter = allowedSwap?.to ?? { col: 1, row: 0 };
    const lowerCenter = allowedSwap?.from ?? { col: 1, row: 1 };

    const tile = (
      role: FloatingTutorialTileRole,
      tileType: TileType,
      col: number,
      row: number,
      sourceCoord: CellCoord,
      hintKind: "none" | "pulse" | "bounce" = "none",
    ) => ({
      tileId: `floating-tutorial-${role}`,
      role,
      tileType,
      assetId: assetIdForTileType(tileType),
      sourceCoord,
      rect: {
        x: groupX + col * (size + gap),
        y: groupY + row * (size + gap) - (hintActive && hintKind === "bounce" ? bounce : 0),
        width: size,
        height: size,
      },
      alpha: 1,
      flash: hintActive && hintKind !== "none" ? flash : 0,
      scale: hintActive && hintKind === "pulse" ? 1 + pulse * 0.08 : 1,
      zIndex: TUTORIAL_FLOATING_MATCH_Z_INDEX + row * 3 + col,
    });
    const tiles = [
      tile("topLeftLightning", "LIGHTNING", 0, 0, { col: topCenter.col - 1, row: topCenter.row }),
      tile("earth", "EARTH", 1, 0, topCenter, "pulse"),
      tile("topRightLightning", "LIGHTNING", 2, 0, { col: topCenter.col + 1, row: topCenter.row }),
      tile("lowerLightning", "LIGHTNING", 1, 1, lowerCenter, "bounce"),
    ];

    return {
      phase: tutorialPhase,
      tiles,
      fingerHint: hintActive ? floatingTutorialFingerHint(tiles, this.matchHintTimerSec) : null,
      allowedDrag: {
        fromRole: "lowerLightning",
        toRole: "earth",
      },
    };
  }

  private floatingTutorialTileRoleAtPoint(
    point: { x: number; y: number },
  ): FloatingTutorialTileRole | null {
    const floatingMatch = this.getFloatingTutorialMatchVisualState();
    if (floatingMatch == null) {
      return null;
    }

    return floatingMatch.tiles.find((tile) => pointInRect(point, tile.rect))?.role ?? null;
  }

  private resetMatchHintTimer(): void {
    this.matchHintTimerSec = 0;
  }

  private updateMatchHintTimer(dtSec: number): void {
    this.matchHintTimerSec += Math.max(0, dtSec);
  }

  private getMatchHintVisualState(): BoardRenderState["matchHint"] {
    if (this.phase !== "IDLE") {
      return null;
    }

    if (this.trialTutorial != null) {
      return null;
    }

    if (this.matchHintTimerSec < MATCH_HINT_IDLE_DELAY_SEC) {
      return null;
    }

    const cycleDurationSec = MATCH_HINT_ACTIVE_SEC + MATCH_HINT_PAUSE_SEC;
    const cycleElapsedSec = this.matchHintTimerSec - MATCH_HINT_IDLE_DELAY_SEC;
    const cycleIndex = Math.floor(cycleElapsedSec / cycleDurationSec);
    const cyclePhaseSec = cycleElapsedSec - cycleIndex * cycleDurationSec;
    if (cyclePhaseSec >= MATCH_HINT_ACTIVE_SEC) {
      return null;
    }

    const hints = findStandardMatchHints(this.board);
    if (hints.length === 0) {
      return null;
    }

    const hint = hints[cycleIndex % hints.length];
    return {
      flashCells: hint.flashCells,
      movingCell: hint.movingCell,
      direction: hint.direction,
      progress: Math.max(0, Math.min(1, cyclePhaseSec / MATCH_HINT_ACTIVE_SEC)),
    };
  }

  private getTrialTutorialVisualState(): BoardRenderState["tutorialLock"] {
    if (this.phase !== "IDLE" || this.trialTutorial?.phase !== "active") {
      return null;
    }
    const tutorial = this.trialTutorial;

    const progress =
      (this.matchHintTimerSec % MATCH_HINT_ACTIVE_SEC) / MATCH_HINT_ACTIVE_SEC;
    return {
      allowedSwap: {
        from: { ...tutorial.allowedSwap.from },
        to: { ...tutorial.allowedSwap.to },
      },
      flashCells: tutorial.flashCells.map((coord) => ({ ...coord })),
      movingCell: { ...tutorial.movingCell },
      direction: { ...tutorial.direction },
      progress,
      dimmedCells: getAllPlayableCoords(this.board).filter(
        (coord) =>
          ![...tutorial.flashCells, ...tutorial.matchCells].some((visibleCoord) =>
            coordsEqual(visibleCoord, coord),
          ),
      ),
    };
  }

  private getTrialMonsterFill(): { remaining: number; total: number } | null {
    if (this.currentLevel?.type !== "TRIAL" || this.trialRuntime == null) {
      return null;
    }

    const total = this.trialRuntime.totalMonsters;
    const defeated = this.trialRuntime.defeatedMonsterIds.length;
    const remaining = Math.max(0, total - defeated);
    return { remaining, total };
  }

  private getObjectiveText(): string {
    if (this.currentLevel?.type === "TRIAL" && this.trialRuntime != null) {
      return "";
    }

    if (this.currentLevel?.type !== "JOURNEY" || this.journeyRuntime == null) {
      return "Journey";
    }

    if (this.journeyRuntime.result === "won") {
      return "Goal reached";
    }

    if (this.journeyRuntime.result === "lost") {
      return "Out of moves";
    }

    const hintVisible =
      getVisibleJourneyHintCells(
        this.currentLevel,
        this.journeyRuntime,
        this.elapsedSec,
      ).length > 0;

    return hintVisible
      ? `Moves ${this.journeyRuntime.movesRemaining} - hinted path swap`
      : `Moves ${this.journeyRuntime.movesRemaining}`;
  }

  private getHeroStageBackdropAssetId(): string {
    return heroStageBackdropAssetIdForLevel(this.run.levelNumber);
  }

  private getHeroWorldObjects(): WorldObjectState[] {
    const objects: WorldObjectState[] = [
      createWorldObject("stage-backdrop", HeroStageTemplateIds.backdropForest, {
        position: { x: 0, y: 0, z: -0.2 },
        scale: { x: 1, y: 1, z: 1 },
        backdropTextureId: this.getHeroStageBackdropAssetId(),
      }),
    ];

    if (this.currentLevel?.type === "TRIAL" && this.trialRuntime != null) {
      return [...objects, ...this.getTrialHeroWorldObjects()];
    }

    if (this.currentLevel?.type !== "JOURNEY" || this.journeyRuntime == null) {
      return objects;
    }

    for (const coord of getAllPlayableCoords(this.board)) {
      if (this.board[coord.row][coord.col].isPath) {
        objects.push(
          createWorldObject(
            `journey-path-${coord.col}-${coord.row}`,
            HeroStageTemplateIds.pathMarker,
            {
              position: heroPositionForCell(coord, -0.05),
              scale: { x: 0.35, y: 0.05, z: 0.35 },
              renderOrder: 1,
              replication: "localCosmetic",
            },
          ),
        );
      }
    }

    objects.push(
      createWorldObject("actor-mage", HeroStageTemplateIds.mage, {
        position: translateY(
          heroPositionForCell(this.journeyRuntime.mageCell, 0.35),
          MAGE_WORLD_Y_OFFSET,
        ),
        scale: MAGE_WORLD_SCALE,
        renderOrder: 4,
        animationId: phaseToMageAnimation(this.phase),
      }),
      createWorldObject("actor-prince-cage", HeroStageTemplateIds.princeCage, {
        position: heroPositionForCell(this.currentLevel.journey.goalCell, 0.55),
        scale: { x: 0.55, y: 0.75, z: 0.55 },
        renderOrder: 3,
        animationId: phaseToPrinceAnimation(this.phase),
      }),
      createWorldObject("prop-goal-flag", HeroStageTemplateIds.goalFlag, {
        position: heroPositionForCell(this.currentLevel.journey.goalCell, 0.15),
        scale: { x: 0.35, y: 0.55, z: 0.35 },
        renderOrder: 2,
        replication: "localCosmetic",
      }),
    );

    return objects;
  }

  private getTrialHeroWorldObjects(): WorldObjectState[] {
    if (this.currentLevel?.type !== "TRIAL" || this.trialRuntime == null) {
      return [];
    }

    const objects: WorldObjectState[] = [
      createWorldObject("actor-mage", HeroStageTemplateIds.mage, {
        position: this.getTrialMageRenderPosition(),
        scale: MAGE_WORLD_SCALE,
        renderOrder: 5,
        animationId: phaseToMageAnimation(this.phase),
      }),
      createWorldObject("trial-fail-line", HeroStageTemplateIds.pathMarker, {
        position: {
          x: this.currentLevel.trial.contactX,
          y: this.currentLevel.trial.laneY,
          z: -0.03,
        },
        scale: { x: 0.06, y: 1.25, z: 0.18 },
        renderOrder: 1,
        replication: "localCosmetic",
        tintHex: "#eb5757",
        opacity: 0.6,
      }),
    ];
    const monsterPositions = new Map<string, TransformState["position"]>();
    const monsterRenderRanks = trialMonsterRenderRanks(this.trialRuntime.monsters);
    const showMonsterHealthBars = !this.isTrialActorEntranceActive();

    for (const monster of this.trialRuntime.monsters) {
      const baseMonsterPosition = translateY(
        getTrialMonsterWorldPosition(this.currentLevel, monster),
        trialMonsterVisualWorldYOffset(monster.kind) + (monster.visualYOffset ?? 0),
      );
      const hitShakeOffset = trialMonsterHitShakeOffset(monster);
      const monsterPosition = translate(
        baseMonsterPosition,
        hitShakeOffset.x + this.getTrialMonsterEntranceXOffset(),
        hitShakeOffset.y,
      );
      monsterPositions.set(monster.monsterId, monsterPosition);
      objects.push(
        createWorldObject(
          `trial-monster-${monster.monsterId}`,
          heroStageTemplateForTrialMonster(monster.kind),
          {
            position: monsterPosition,
            scale: scaleForTrialMonster(monster.kind),
            renderOrder: trialMonsterRenderOrder(monster, monsterRenderRanks),
            materialDepthTest: false,
            animationId: animationForTrialMonster(monster, this.phase),
            opacity: opacityForTrialMonster(monster),
            tintHex: tintForTrialMonster(monster, this.trialRuntime.elapsedMs / 1000),
            animationPaused: animationPausedForTrialMonster(monster),
            animationTimeSec: animationTimeSecForTrialMonster(monster),
            nodeVisibility:
              monster.kind === "miniBoss"
                ? undefined
                : koboldNodeVisibilityForMonster(this.currentLevel.seed, monster),
          },
        ),
        ...createTrialMonsterFireBurnObjects(monster, monsterPosition, this.trialRuntime.elapsedMs / 1000),
        ...(showMonsterHealthBars ? createTrialMonsterHealthBarObjects(monster, monsterPosition) : []),
      );
    }

    for (const impactVfx of this.trialRuntime.impactVfx ?? []) {
      objects.push(...createTrialEarthImpactObjects(impactVfx, monsterPositions));
    }

    return objects;
  }

  private getTrialMageRenderPosition(): TransformState["position"] {
    if (this.currentLevel?.type !== "TRIAL") {
      return { x: 0, y: 0, z: 0 };
    }

    const basePosition = translateY(
      getTrialMageWorldPosition(this.currentLevel),
      MAGE_WORLD_Y_OFFSET,
    );
    const tutorialPosition = this.isFullHeroTutorialPresentationActive()
      ? translate(basePosition, TRIAL_TUTORIAL_MAGE_X_OFFSET, 0)
      : basePosition;
    return translate(
      tutorialPosition,
      this.getTrialMageEntranceXOffset() + this.getTrialMageExitXOffset(),
      0,
    );
  }
}

function floatingTutorialFingerHint(
  tiles: readonly FloatingTutorialTileVisualState[],
  elapsedSec: number,
): NonNullable<
  NonNullable<BoardRenderState["tutorialPresentation"]>["floatingMatch"]
>["fingerHint"] {
  const lowerLightning = tiles.find((tile) => tile.role === "lowerLightning");
  const earth = tiles.find((tile) => tile.role === "earth");
  if (lowerLightning == null || earth == null) {
    return null;
  }

  const start = centerOfRect(lowerLightning.rect);
  const end = centerOfRect(earth.rect);
  const progress = (elapsedSec % TUTORIAL_FINGER_HINT_LOOP_SEC) / TUTORIAL_FINGER_HINT_LOOP_SEC;
  const easedProgress = easeOutCubic(progress);
  return {
    assetId: AssetIds.ui.tutorialFinger,
    point: {
      x: start.x + (end.x - start.x) * easedProgress,
      y: start.y + (end.y - start.y) * easedProgress,
    },
    width: TUTORIAL_FINGER_HINT_SIZE,
    height: TUTORIAL_FINGER_HINT_SIZE,
    rotationDegrees: TUTORIAL_FINGER_HINT_ROTATION_DEGREES,
    alpha: 1,
    zIndex: TUTORIAL_FINGER_HINT_Z_INDEX,
  };
}

function centerOfRect(rect: { x: number; y: number; width: number; height: number }): { x: number; y: number } {
  return {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
  };
}

function isFloatingTutorialDragPair(
  startRole: FloatingTutorialTileRole | null,
  endRole: FloatingTutorialTileRole | null,
): boolean {
  return (
    (startRole === "lowerLightning" && endRole === "earth") ||
    (startRole === "earth" && endRole === "lowerLightning")
  );
}

function assetIdForTileType(type: TileType): string {
  switch (type) {
    case "FIRE":
      return AssetIds.tiles.fire;
    case "ICE":
      return AssetIds.tiles.ice;
    case "LIGHTNING":
      return AssetIds.tiles.lightning;
    case "EARTH":
      return AssetIds.tiles.earth;
    case "LAND":
      return AssetIds.tiles.land;
    case "ROCKET_H":
      return AssetIds.powerUps.rocketH;
    case "ROCKET_V":
      return AssetIds.powerUps.rocketV;
    case "TNT":
      return AssetIds.powerUps.tnt;
    case "LIGHTBALL":
      return AssetIds.powerUps.lightball;
  }
}

function soundIdsForSpellSchool(schoolId: SpellSchoolId): { whoosh: string } {
  switch (schoolId) {
    case "fire":
      return {
        whoosh: AssetIds.sounds.fireWhoosh,
      };
    case "ice":
      return {
        whoosh: AssetIds.sounds.iceWhoosh,
      };
    case "lightning":
      return {
        whoosh: AssetIds.sounds.lightningWhoosh,
      };
    case "earth":
      return {
        whoosh: AssetIds.sounds.earthWhoosh,
      };
  }
}

function coordsEqual(first: CellCoord | null, second: CellCoord): boolean {
  return first != null && first.col === second.col && first.row === second.row;
}

export function phaseToCinematicState(
  phase: GamePhase,
): HeroWorldState["cinematicState"] {
  if (phase === "WIN") {
    return "victory";
  }

  if (phase === "LOSE") {
    return "fail";
  }

  return "none";
}

function phaseToMageAnimation(phase: GamePhase): string {
  if (phase === "WIN") {
    return "victory";
  }

  if (phase === "LOSE") {
    return "stunned";
  }

  return "idle";
}

function phaseToPrinceAnimation(phase: GamePhase): string {
  if (phase === "WIN") {
    return "yank";
  }

  if (phase === "LOSE") {
    return "cower";
  }

  return "cower";
}

function scaleForTrialMonster(kind: ActiveTrialMonster["kind"]): TransformState["scale"] {
  return kind === "miniBoss" ? MINI_BOSS_WORLD_SCALE : MAGE_WORLD_SCALE;
}

function trialMonsterRenderRanks(
  monsters: readonly ActiveTrialMonster[],
): ReadonlyMap<string, number> {
  return new Map(
    [...monsters]
      .sort(
        (first, second) =>
          first.x - second.x ||
          first.spawnTimeMs - second.spawnTimeMs ||
          first.monsterId.localeCompare(second.monsterId),
      )
      .map((monster, index) => [monster.monsterId, index]),
  );
}

function trialMonsterRenderOrder(
  monster: ActiveTrialMonster,
  renderRanks: ReadonlyMap<string, number>,
): number {
  return TRIAL_MONSTER_RENDER_ORDER_BASE +
    (renderRanks.get(monster.monsterId) ?? 0) * TRIAL_MONSTER_RENDER_ORDER_STEP;
}

function animationForTrialMonster(monster: ActiveTrialMonster, phase: GamePhase): string {
  if ((monster.defeatAnimationRemainingSec ?? 0) > 0 || (monster.defeatFadeRemainingSec ?? 0) > 0) {
    return "defeat";
  }

  if (phase === "LOSE" && monster.hp > 0) {
    return "victory";
  }

  return "walk";
}

function opacityForTrialMonster(monster: ActiveTrialMonster): number | undefined {
  const fadeRemainingSec = monster.defeatFadeRemainingSec ?? 0;
  const fadeDurationSec = monster.defeatFadeDurationSec ?? 0;
  if (fadeRemainingSec <= 0 || fadeDurationSec <= 0) {
    return undefined;
  }

  return Math.max(0, Math.min(1, fadeRemainingSec / fadeDurationSec));
}

function animationPausedForTrialMonster(monster: ActiveTrialMonster): boolean | undefined {
  return monster.hp > 0 && ((monster.iceFreezeRemainingSec ?? 0) > 0 || isTutorialTrialMonster(monster))
    ? true
    : undefined;
}

function animationTimeSecForTrialMonster(monster: ActiveTrialMonster): number | undefined {
  return monster.hp > 0 && isTutorialTrialMonster(monster) ? 0 : undefined;
}

function isTutorialTrialMonster(monster: ActiveTrialMonster): boolean {
  return monster.monsterId.startsWith("tutorial-kobold-");
}

function tintForTrialMonster(monster: ActiveTrialMonster, elapsedSec: number): string | undefined {
  if ((monster.iceFreezeRemainingSec ?? 0) <= 0) {
    return undefined;
  }

  const pulse = 0.5 + Math.sin(elapsedSec * Math.PI * 6) * 0.5;
  return blendHexColor("#38d5ff", "#aaf5ff", pulse * 0.45);
}

export function createTrialMonsterHealthBarObjects(
  monster: ActiveTrialMonster,
  monsterPosition: TransformState["position"],
): WorldObjectState[] {
  if (monster.hp <= 0) {
    return [];
  }

  const ratio = healthRatioForTrialMonster(monster);
  if (ratio <= 0) {
    return [];
  }

  const healthBarWidth = healthBarWidthForTrialMonster(monster.kind);
  const healthBarHeight = healthBarHeightForTrialMonster(monster.kind);
  const healthBarFillHeight = healthBarFillHeightForTrialMonster(monster.kind);
  const barY =
    monsterPosition.y + healthBarYOffsetForTrialMonster(monster.kind);
  const barZ = monsterPosition.z + TRIAL_HEALTH_BAR_Z_OFFSET;
  const fillWidth = healthBarWidth * ratio;
  const fillCenterX =
    monsterPosition.x - healthBarWidth / 2 + fillWidth / 2;

  return [
    createWorldObject(
      `trial-monster-${monster.monsterId}-health-track`,
      HeroStageTemplateIds.healthBarTrack,
      {
        position: { x: monsterPosition.x, y: barY, z: barZ },
        scale: { x: healthBarWidth, y: healthBarHeight, z: 1 },
        renderOrder: 6,
        replication: "localCosmetic",
        opacity: 0.85,
      },
    ),
    createWorldObject(
      `trial-monster-${monster.monsterId}-health-fill`,
      HeroStageTemplateIds.healthBarFill,
      {
        position: { x: fillCenterX, y: barY, z: barZ + 0.01 },
        scale: { x: fillWidth, y: healthBarFillHeight, z: 1 },
        renderOrder: 7,
        replication: "localCosmetic",
        tintHex: healthBarTintForRatio(ratio),
        opacity: 0.95,
      },
    ),
  ];
}

export function createTrialMonsterFireBurnObjects(
  monster: ActiveTrialMonster,
  monsterPosition: TransformState["position"],
  animationTimeSec: number,
): WorldObjectState[] {
  const hasActiveBurn = (monster.fireBurnStacks ?? []).some(
    (stack) => (stack.activationDelaySec ?? 0) <= 0 && stack.visualRemainingSec > 0,
  );
  if (!hasActiveBurn || monster.hp <= 0) {
    return [];
  }

  return [
    createWorldObject(
      `trial-monster-${monster.monsterId}-fire-burn`,
      HeroStageTemplateIds.fireBurn,
      {
        position: {
          x: monsterPosition.x,
          y: monsterPosition.y + TRIAL_FIRE_BURN_Y_OFFSET,
          z: monsterPosition.z + 0.12,
        },
        scale: { x: TRIAL_FIRE_BURN_SCALE, y: TRIAL_FIRE_BURN_SCALE, z: 1 },
        renderOrder: TRIAL_FIRE_BURN_RENDER_ORDER,
        replication: "localCosmetic",
        animationTimeSec,
      },
    ),
  ];
}

export function createTrialEarthImpactObjects(
  impactVfx: NonNullable<TrialRuntimeState["impactVfx"]>[number],
  monsterPositions: ReadonlyMap<string, TransformState["position"]>,
): WorldObjectState[] {
  if (impactVfx.schoolId !== "earth" || impactVfx.activationDelaySec > 0 || impactVfx.remainingSec <= 0) {
    return [];
  }

  const monsterPosition = monsterPositions.get(impactVfx.targetMonsterId);
  const animationTimeSec = Math.max(0, impactVfx.durationSec - impactVfx.remainingSec);
  return [
    createWorldObject(
      `trial-${impactVfx.vfxId}`,
      HeroStageTemplateIds.earthImpact,
      {
        position: {
          x: monsterPosition?.x ?? impactVfx.hitWorldPosition.x,
          y: impactVfx.hitWorldPosition.y + TRIAL_EARTH_IMPACT_Y_OFFSET,
          z: impactVfx.hitWorldPosition.z + 0.16,
        },
        scale: { x: TRIAL_EARTH_IMPACT_SCALE, y: TRIAL_EARTH_IMPACT_SCALE, z: 1 },
        renderOrder: TRIAL_EARTH_IMPACT_RENDER_ORDER,
        replication: "localCosmetic",
        animationTimeSec,
      },
    ),
  ];
}

export function trialMonsterHitShakeOffset(monster: ActiveTrialMonster): { x: number; y: number } {
  const remainingSec = monster.hitShakeRemainingSec ?? 0;
  const durationSec = monster.hitShakeDurationSec ?? 0;
  if (remainingSec <= 0 || durationSec <= 0) {
    return { x: 0, y: 0 };
  }

  const progress = 1 - Math.max(0, Math.min(1, remainingSec / durationSec));
  const fade = 1 - progress;
  return {
    x: Math.sin(progress * Math.PI * 8) * TRIAL_HIT_SHAKE_X_AMPLITUDE * fade,
    y: Math.sin(progress * Math.PI * 5) * TRIAL_HIT_SHAKE_Y_AMPLITUDE * fade,
  };
}

export function healthBarTintForRatio(ratio: number): string {
  const clampedRatio = Math.max(0, Math.min(1, ratio));
  if (clampedRatio > 0.5) {
    return "#27ae60";
  }

  if (clampedRatio >= 0.25) {
    return "#f2c94c";
  }

  return "#eb5757";
}

function healthRatioForTrialMonster(monster: ActiveTrialMonster): number {
  if (monster.maxHp <= 0) {
    return 0;
  }

  const displayedHp = monster.healthBarHp ?? monster.hp;
  return Math.max(0, Math.min(1, displayedHp / monster.maxHp));
}

function blendHexColor(fromHex: string, toHex: string, amount: number): string {
  const from = parseHexColor(fromHex);
  const to = parseHexColor(toHex);
  const clampedAmount = Math.max(0, Math.min(1, amount));
  return rgbToHex({
    r: Math.round(from.r + (to.r - from.r) * clampedAmount),
    g: Math.round(from.g + (to.g - from.g) * clampedAmount),
    b: Math.round(from.b + (to.b - from.b) * clampedAmount),
  });
}

function parseHexColor(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.replace("#", "");
  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

function rgbToHex(color: { r: number; g: number; b: number }): string {
  return `#${hexByte(color.r)}${hexByte(color.g)}${hexByte(color.b)}`;
}

function hexByte(value: number): string {
  return Math.max(0, Math.min(255, value)).toString(16).padStart(2, "0");
}

function healthBarYOffsetForTrialMonster(kind: ActiveTrialMonster["kind"]): number {
  return kind === "miniBoss"
    ? TRIAL_MINI_BOSS_HEALTH_BAR_Y_OFFSET
    : TRIAL_KOBOLD_HEALTH_BAR_Y_OFFSET;
}

function healthBarWidthForTrialMonster(kind: ActiveTrialMonster["kind"]): number {
  return kind === "miniBoss"
    ? TRIAL_HEALTH_BAR_WIDTH * TRIAL_MINI_BOSS_HEALTH_BAR_SCALE
    : TRIAL_HEALTH_BAR_WIDTH;
}

function healthBarHeightForTrialMonster(kind: ActiveTrialMonster["kind"]): number {
  return kind === "miniBoss"
    ? TRIAL_HEALTH_BAR_HEIGHT * TRIAL_MINI_BOSS_HEALTH_BAR_SCALE
    : TRIAL_HEALTH_BAR_HEIGHT;
}

function healthBarFillHeightForTrialMonster(kind: ActiveTrialMonster["kind"]): number {
  return kind === "miniBoss"
    ? TRIAL_HEALTH_BAR_FILL_HEIGHT * TRIAL_MINI_BOSS_HEALTH_BAR_SCALE
    : TRIAL_HEALTH_BAR_FILL_HEIGHT;
}

function heroStageTemplateForTrialMonster(kind: ActiveTrialMonster["kind"]): string {
  return kind === "miniBoss"
    ? HeroStageTemplateIds.miniBoss
    : HeroStageTemplateIds.monsterPlaceholder;
}

function createTrialTutorialRuntime(
  level: Extract<GeneratedLevel, { type: "TRIAL" }>,
): TrialRuntimeState {
  const lane = level.trial.lanes[0];
  const koboldMaxHp =
    level.trial.waveManifest.find((monster) => monster.kind === "kobold")?.maxHp ??
    Math.max(1, level.trial.baseDamage);
  const tutorialHp = Math.max(1, Math.floor(koboldMaxHp * TRIAL_TUTORIAL_HP_RATIO));
  const monsters: ActiveTrialMonster[] = Array.from(
    { length: TRIAL_TUTORIAL_KOBOLD_COUNT },
    (_value, index) => ({
      monsterId: `tutorial-kobold-${index}`,
      kind: "kobold",
      laneId: lane?.laneId ?? 0,
      hp: tutorialHp,
      maxHp: koboldMaxHp,
      x: TRIAL_TUTORIAL_MONSTER_X_POSITIONS[index] ?? 2 + index * 0.8,
      spawnTimeMs: 0,
      walkSpeed: 0,
      scoreValue: 0,
      visualYOffset: visualYOffsetForSpawnIndex(index),
      modelVariant: koboldModelVariantForMonster(level.seed, `tutorial-kobold-${index}`),
      healthBarHp: tutorialHp,
    }),
  );

  return {
    elapsedMs: 0,
    nextSpawnIndex: level.trial.waveManifest.length,
    monsters,
    projectiles: [],
    pendingAttacks: [],
    defeatedMonsterIds: [],
    totalMonsters: monsters.length,
    result: "playing",
    nextProjectileIndex: 0,
    nextAttackIndex: 0,
    nextBurnIndex: 0,
    nextImpactVfxIndex: 0,
  };
}

function screenForPhase(phase: GamePhase): ScreenRenderState["screen"] {
  if (phase === "GAME_OVER") {
    return "gameOver";
  }

  return "play";
}

function transitionTextForPhase(phase: GamePhase): string | null {
  if (phase === "WIN") {
    return "Level Clear";
  }

  if (phase === "LOSE") {
    return "Life Lost";
  }

  return null;
}

function createWorldObject(
  objectId: string,
  templateId: string,
  options: {
    position: TransformState["position"];
    scale: TransformState["scale"];
    backdropTextureId?: string;
    renderOrder?: number;
    materialDepthTest?: boolean;
    replication?: WorldObjectState["replication"];
    animationId?: string;
    animationPaused?: boolean;
    tintHex?: string;
    opacity?: number;
    animationTimeSec?: number;
    nodeVisibility?: WorldObjectState["nodeVisibility"];
  },
): WorldObjectState {
  return {
    objectId,
    templateId,
    backdropTextureId: options.backdropTextureId,
    transform: {
      position: options.position,
      rotation: { x: 0, y: 0, z: 0, w: 1 },
      scale: options.scale,
    },
    visible: true,
    lifetime: "persistent",
    replication: options.replication ?? "sharedGameplay",
    renderLayer: "heroStage",
    renderOrder: options.renderOrder,
    materialDepthTest: options.materialDepthTest,
    tintHex: options.tintHex,
    opacity: options.opacity,
    animationId: options.animationId,
    animationTimeSec: options.animationTimeSec,
    animationPaused: options.animationPaused,
    nodeVisibility: options.nodeVisibility,
  };
}

function koboldNodeVisibilityForMonster(
  levelSeed: number,
  monster: ActiveTrialMonster,
): WorldObjectState["nodeVisibility"] {
  const variant = monster.modelVariant ?? koboldModelVariantForMonster(levelSeed, monster.monsterId);
  return {
    visibleNodeNames: [variant.headNodeName, variant.clubNodeName],
    hiddenNodeNames: [
      ...KOBOLD_HEAD_NODE_NAMES.filter((nodeName) => nodeName !== variant.headNodeName),
      ...KOBOLD_CLUB_NODE_NAMES.filter((nodeName) => nodeName !== variant.clubNodeName),
    ],
  };
}

function translate(
  position: TransformState["position"],
  offsetX: number,
  offsetY: number,
): TransformState["position"] {
  return {
    ...position,
    x: position.x + offsetX,
    y: position.y + offsetY,
  };
}

function translateY(
  position: TransformState["position"],
  offsetY: number,
): TransformState["position"] {
  return translate(position, 0, offsetY);
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function easeOutCubic(value: number): number {
  const clamped = clamp01(value);
  return 1 - Math.pow(1 - clamped, 3);
}

function heroPositionForCell(
  coord: CellCoord,
  z: number,
): TransformState["position"] {
  const normalizedX = coord.col / (BOARD_SIZE - 1);
  const normalizedY = coord.row / (BOARD_SIZE - 1);
  return {
    x: -4.6 + normalizedX * 9.2,
    y: 1.6 - normalizedY * 2.7,
    z,
  };
}
