import type { GameEvent, SoundEventCategory } from "./GameEvents";
import type { GameInputCommand } from "./GameInput";
import {
  BOARD_SIZE,
  GAME_OVER_TRY_AGAIN_BUTTON_RECT,
  HUD_MUTE_TOGGLE_RECT,
  LOGICAL_HEIGHT,
  LOGICAL_WIDTH,
  logicalPointToBoardCell,
  TITLE_PLAY_BUTTON_RECT,
  pointInRect,
} from "./Layout";
import type { CellCoord } from "./Layout";
import { createRandomSeed, SeededRng } from "./Rng";
import type { GamePhase, LevelType, RunState } from "./Types";
import type { Board } from "../board/Board";
import {
  cloneBoard,
  createEmptyBoard,
  getAllPlayableCoords,
  getVoidCoords,
} from "../board/Board";
import {
  createLevelIntroBoardAnimationTrace,
  stampBoardAnimationTrace,
  type BoardAnimationTrace,
} from "../board/BoardAnimationTrace";
import { getBoardAnimationTraceDurationMs } from "../board/BoardAnimationTiming";
import type { TileType } from "../board/TileTypes";
import { AssetIds } from "../assets/AssetIds";
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
  TrialRuntimeState,
} from "../generator/TrialRules";
import {
  createTrialRuntime,
  getTrialMageWorldPosition,
  getTrialMonsterWorldPosition,
  processTrialPowerUpActivation,
  processTrialSwap,
  updateTrialRuntime,
  updateTrialVisuals,
} from "../generator/TrialRules";
import type {
  BoardRenderState,
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
import { CAMERA_SHAKE_MAX, CAMERA_SHAKE_MIN } from "../data/tuning";
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
}

export const MAGE_WORLD_SCALE: TransformState["scale"] = { x: 2, y: 2, z: 2 };

interface RuntimeBoardVisualCue extends Omit<BoardVisualCueState, "value"> {
  remainingSec: number;
  durationSec: number;
}

const MAGE_WORLD_Y_OFFSET = -0.72;
const TRIAL_MONSTER_SCALE_MULTIPLIER = 2;
const TRIAL_HEALTH_BAR_WIDTH = 0.92;
const TRIAL_HEALTH_BAR_HEIGHT = 0.18;
const TRIAL_HEALTH_BAR_FILL_HEIGHT = 0.11;
const TRIAL_HEALTH_BAR_Z_OFFSET = 0.08;

export class MagusMatchGameApp implements GameApp {
  private events: GameEvent[] = [];
  private rng = new SeededRng();
  private elapsedSec = 0;
  private run: RunState = createInitialRunState(createRandomSeed());
  private board: Board = createEmptyBoard();
  private currentLevel: GeneratedLevel | null = null;
  private journeyRuntime: JourneyRuntimeState | null = null;
  private trialRuntime: TrialRuntimeState | null = null;
  private phase: GamePhase = "TITLE";
  private muted = false;
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
        this.muted = !this.muted;
        continue;
      }

      if (command.type === "tap") {
        this.handleTap(command.x, command.y);
        continue;
      }

      if (command.type === "swap") {
        this.handleSwap(command.from, command.to);
      }
    }

    if (this.phase === "IDLE") {
      this.elapsedSec += clampedDtSec;
      this.updateTrialStage(clampedDtSec);
    }

    if (this.phase === "WIN" || this.phase === "LOSE") {
      this.updateTrialVisualTimers(clampedDtSec);
      this.transitionTimerSec += clampedDtSec;
      if (
        this.transitionTimerSec >= LEVEL_TRANSITION_HOLD_SEC &&
        this.hasLatestBoardAnimationFinished()
      ) {
        this.advanceAfterLevelResult();
      }
    }
  }

  getBoardRenderState(): BoardRenderState {
    return {
      logicalWidth: LOGICAL_WIDTH,
      logicalHeight: LOGICAL_HEIGHT,
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
    };
  }

  getHeroWorldState(): HeroWorldState {
    const objects = this.getHeroWorldObjects();
    return {
      levelType: this.currentLevel?.type ?? "JOURNEY",
      backdropId: AssetIds.backdrops.castle,
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
      livesText: `Lives ${this.run.lives}`,
      scoreText: `${this.run.score}`,
      objectiveText: this.getObjectiveText(),
      muted: this.muted,
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
        play: TITLE_PLAY_BUTTON_RECT,
        tryAgain: GAME_OVER_TRY_AGAIN_BUTTON_RECT,
        mute: HUD_MUTE_TOGGLE_RECT,
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
    this.phase = "TITLE";
    this.events = [];
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
          defeatedMonsterIds: [...this.trialRuntime.defeatedMonsterIds],
        };
  }

  getLevelStatsForDebug(): { matchCount: number; validSwapCount: number } {
    return {
      matchCount: this.levelMatchCount,
      validSwapCount: this.levelValidSwapCount,
    };
  }

  getLatestBoardAnimationEndsAtSecForDebug(): number {
    return this.latestBoardAnimationEndsAtSec;
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
  }

  private startPreparedLevel(): void {
    if (this.currentLevel == null) {
      this.prepareCurrentLevel();
    }

    this.phase = "IDLE";
    this.elapsedSec = 0;
    this.transitionTimerSec = 0;
    this.captureBoardAnimationTrace(
      createLevelIntroBoardAnimationTrace(this.board, 0),
    );
    this.events.push({
      type: "levelStarted",
      levelNumber: this.run.levelNumber,
      levelType: this.currentLevel?.type ?? "JOURNEY",
      seed: this.currentLevel?.seed ?? this.run.seed,
    });
  }

  private updateTrialStage(dtSec: number): void {
    if (this.currentLevel?.type !== "TRIAL" || this.trialRuntime == null) {
      return;
    }

    const nextRuntime = updateTrialRuntime(
      this.trialRuntime,
      this.currentLevel,
      dtSec,
    );
    this.trialRuntime = nextRuntime;
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

  private handleTap(x: number, y: number): void {
    const point = { x, y };
    if (this.phase === "TITLE" && pointInRect(point, TITLE_PLAY_BUTTON_RECT)) {
      this.startPreparedLevel();
      return;
    }

    if (
      this.phase === "GAME_OVER" &&
      pointInRect(point, GAME_OVER_TRY_AGAIN_BUTTON_RECT)
    ) {
      this.tryAgain();
      this.startPreparedLevel();
      return;
    }

    if (this.phase !== "IDLE") {
      return;
    }

    const boardCell = logicalPointToBoardCell(point);
    if (boardCell == null) {
      return;
    }

    if (this.currentLevel?.type === "TRIAL") {
      this.handleTrialPowerUpTap(boardCell);
      return;
    }

    if (this.currentLevel?.type === "JOURNEY") {
      this.handleJourneyPowerUpTap(boardCell);
    }
  }

  private tryAgain(): void {
    this.reset(this.debugSeed ?? createRandomSeed());
  }

  private beginLevelResult(result: "win" | "loss"): void {
    if (this.pendingLevelResult != null || this.currentLevel == null) {
      return;
    }

    this.pendingLevelResult = result;
    this.transitionTimerSec = 0;
    this.phase = result === "win" ? "WIN" : "LOSE";
    this.pendingClearScore = result === "win" ? this.getLevelClearScore() : 0;
    if (result === "win") {
      this.requestSound(AssetIds.sounds.victorySting, {
        category: "level",
        volume: 0.7,
      });
      this.requestSound(AssetIds.sounds.cageYankWhoosh, {
        category: "level",
        volume: 0.55,
      });
    }
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
        volume: 0.72,
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

    if (this.currentLevel?.type === "TRIAL" && this.trialRuntime != null) {
      this.handleTrialSwap(from, to);
      return;
    }

    if (this.currentLevel?.type !== "JOURNEY" || this.journeyRuntime == null) {
      return;
    }

    const result = processJourneySwap(
      this.board,
      this.journeyRuntime,
      this.currentLevel,
      from,
      to,
      this.rng,
    );

    if (!result.valid) {
      return;
    }

    const previousMageCell = this.journeyRuntime.mageCell;
    this.board = result.board;
    this.journeyRuntime = result.runtime;
    this.levelMatchCount += result.scoringStats.matchCount;
    this.levelValidSwapCount += result.scoringStats.validSwapCount;
    this.captureBoardAnimationTrace(result.animationTrace);
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

    const previousMageCell = this.journeyRuntime.mageCell;
    this.board = result.board;
    this.journeyRuntime = result.runtime;
    this.levelMatchCount += result.scoringStats.matchCount;
    this.levelValidSwapCount += result.scoringStats.validSwapCount;
    this.captureBoardAnimationTrace(result.animationTrace);
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

    this.board = result.board;
    this.trialRuntime = result.runtime;
    this.levelMatchCount += result.scoringStats.matchCount;
    this.levelValidSwapCount += result.scoringStats.validSwapCount;
    this.captureBoardAnimationTrace(result.animationTrace);
    this.emitMatchAudioAndJuice(result.scoringStats, to);
    this.emitTrialAudioAndJuice(result.damageEvents, to);
    const scoreDelta = result.scoreDelta + scoreSwapStats(result.scoringStats);

    if (scoreDelta > 0) {
      this.run = { ...this.run, score: this.run.score + scoreDelta };
      this.events.push({ type: "scoreChanged", score: this.run.score });
    }

    if (result.damageEvents.some((event) => event.defeated)) {
      this.requestSound(AssetIds.sounds.monsterDefeat, {
        category: "enemy",
        volume: 0.62,
      });
    } else if (result.damageEvents.length > 0) {
      this.requestSound(AssetIds.sounds.monsterDamage, {
        category: "enemy",
        volume: 0.5,
      });
    }

    if (result.runtime.result === "won") {
      this.beginLevelResult("win");
    } else if (result.runtime.result === "lost") {
      this.beginLevelResult("loss");
    }
  }

  private handleTrialPowerUpTap(origin: CellCoord): void {
    if (this.currentLevel?.type !== "TRIAL" || this.trialRuntime == null) {
      return;
    }

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

    this.board = result.board;
    this.trialRuntime = result.runtime;
    this.levelMatchCount += result.scoringStats.matchCount;
    this.levelValidSwapCount += result.scoringStats.validSwapCount;
    this.captureBoardAnimationTrace(result.animationTrace);
    this.emitMatchAudioAndJuice(result.scoringStats, origin);
    this.emitTrialAudioAndJuice(result.damageEvents, origin);
    const scoreDelta = result.scoreDelta + scoreSwapStats(result.scoringStats);

    if (scoreDelta > 0) {
      this.run = { ...this.run, score: this.run.score + scoreDelta };
      this.events.push({ type: "scoreChanged", score: this.run.score });
    }

    if (result.damageEvents.some((event) => event.defeated)) {
      this.requestSound(AssetIds.sounds.monsterDefeat, {
        category: "enemy",
        volume: 0.62,
      });
    } else if (result.damageEvents.length > 0) {
      this.requestSound(AssetIds.sounds.monsterDamage, {
        category: "enemy",
        volume: 0.5,
      });
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

  private requestSound(
    soundId: string,
    options: {
      intensity?: number;
      volume?: number;
      playbackRate?: number;
      category?: SoundEventCategory;
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

    this.events.push(event);
  }

  private emitMatchAudioAndJuice(
    stats: SwapScoringStats,
    anchor: CellCoord,
  ): void {
    if (stats.matchCount <= 0) {
      return;
    }

    this.requestSound(AssetIds.sounds.tileMatch, {
      category: "match",
      volume: 0.55,
    });
    for (let index = 0; index < stats.comboCount; index += 1) {
      this.requestSound(AssetIds.sounds.comboPitchStep, {
        category: "match",
        volume: 0.48,
        playbackRate: 1 + Math.min(6, index + 1) * 0.08,
      });
    }

    if (stats.powerUpsCreated > 0) {
      this.requestSound(AssetIds.sounds.powerupCreate, {
        category: "match",
        volume: 0.58,
        intensity: Math.min(1.5, stats.powerUpsCreated),
      });
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
      this.requestSound(AssetIds.sounds.pathConvert, {
        category: "match",
        volume: 0.56,
        intensity: Math.min(1.4, 0.75 + result.convertedPathCells.length / 8),
      });
      for (const coord of result.convertedPathCells.slice(0, 12)) {
        this.addBoardCue("pathGlow", coord, 0.55);
      }
    }

    if (!coordsEqual(previousMageCell, result.runtime.mageCell)) {
      this.requestSound(AssetIds.sounds.mageWalk, {
        category: "level",
        volume: 0.42,
      });
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
    damageEvents: readonly TrialDamageEvent[],
    anchor: CellCoord,
  ): void {
    for (const event of damageEvents.slice(0, 8)) {
      const sounds = soundIdsForSpellSchool(event.schoolId);
      this.requestSound(sounds.whoosh, { category: "spell", volume: 0.42 });
      this.requestSound(sounds.impact, { category: "spell", volume: 0.48 });
      this.addBoardCue(
        "damagePopup",
        anchor,
        0.45,
        `-${Math.round(event.damage)}`,
      );
    }
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

  private getObjectiveText(): string {
    if (this.currentLevel?.type === "TRIAL" && this.trialRuntime != null) {
      if (this.trialRuntime.result === "won") {
        return "Trial cleared";
      }

      if (this.trialRuntime.result === "lost") {
        return "Monsters broke through";
      }

      return `Monsters ${this.trialRuntime.defeatedMonsterIds.length}/${this.trialRuntime.totalMonsters}`;
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

  private getHeroWorldObjects(): WorldObjectState[] {
    const objects: WorldObjectState[] = [
      createWorldObject("stage-backdrop", HeroStageTemplateIds.backdropForest, {
        position: { x: 0, y: 0, z: -0.2 },
        scale: { x: 1, y: 1, z: 1 },
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
        position: translateY(
          getTrialMageWorldPosition(this.currentLevel),
          MAGE_WORLD_Y_OFFSET,
        ),
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

    for (const monster of this.trialRuntime.monsters) {
      const monsterPosition = translateY(
        getTrialMonsterWorldPosition(this.currentLevel, monster),
        trialMonsterWorldYOffset(monster.kind),
      );
      objects.push(
        createWorldObject(
          `trial-monster-${monster.monsterId}`,
          HeroStageTemplateIds.monsterPlaceholder,
          {
            position: monsterPosition,
            scale: scaleForTrialMonster(monster.kind),
            renderOrder: 4,
            animationId: this.phase === "LOSE" ? "victory" : "walk",
            tintHex: tintForTrialMonster(monster.kind),
          },
        ),
        ...createTrialMonsterHealthBarObjects(monster, monsterPosition),
      );
    }

    return objects;
  }
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

function soundIdsForSpellSchool(schoolId: SpellSchoolId): {
  whoosh: string;
  impact: string;
} {
  switch (schoolId) {
    case "fire":
      return {
        whoosh: AssetIds.sounds.fireWhoosh,
        impact: AssetIds.sounds.fireImpact,
      };
    case "ice":
      return {
        whoosh: AssetIds.sounds.iceWhoosh,
        impact: AssetIds.sounds.iceImpact,
      };
    case "lightning":
      return {
        whoosh: AssetIds.sounds.lightningWhoosh,
        impact: AssetIds.sounds.lightningImpact,
      };
    case "earth":
      return {
        whoosh: AssetIds.sounds.earthWhoosh,
        impact: AssetIds.sounds.earthImpact,
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

function scaleForTrialMonster(
  kind: ActiveTrialMonster["kind"],
): TransformState["scale"] {
  const scale = baseScaleForTrialMonster(kind);
  return {
    x: scale.x * TRIAL_MONSTER_SCALE_MULTIPLIER,
    y: scale.y * TRIAL_MONSTER_SCALE_MULTIPLIER,
    z: scale.z * TRIAL_MONSTER_SCALE_MULTIPLIER,
  };
}

function baseScaleForTrialMonster(
  kind: ActiveTrialMonster["kind"],
): TransformState["scale"] {
  switch (kind) {
    case "kobold":
      return { x: 0.46, y: 0.62, z: 0.46 };
    case "tallKobold":
      return { x: 0.52, y: 0.86, z: 0.52 };
    case "miniBoss":
      return { x: 0.7, y: 1.05, z: 0.7 };
  }
}

function trialMonsterWorldYOffset(kind: ActiveTrialMonster["kind"]): number {
  switch (kind) {
    case "kobold":
      return -0.36;
    case "tallKobold":
      return -0.5;
    case "miniBoss":
      return -0.6;
  }
}

function tintForTrialMonster(kind: ActiveTrialMonster["kind"]): string {
  switch (kind) {
    case "kobold":
      return "#27ae60";
    case "tallKobold":
      return "#8b6f47";
    case "miniBoss":
      return "#eb5757";
  }
}

export function createTrialMonsterHealthBarObjects(
  monster: ActiveTrialMonster,
  monsterPosition: TransformState["position"],
): WorldObjectState[] {
  const ratio = healthRatioForTrialMonster(monster);
  if (ratio <= 0) {
    return [];
  }

  const barY =
    monsterPosition.y + healthBarYOffsetForTrialMonster(monster.kind);
  const barZ = monsterPosition.z + TRIAL_HEALTH_BAR_Z_OFFSET;
  const fillWidth = TRIAL_HEALTH_BAR_WIDTH * ratio;
  const fillCenterX =
    monsterPosition.x - TRIAL_HEALTH_BAR_WIDTH / 2 + fillWidth / 2;

  return [
    createWorldObject(
      `trial-monster-${monster.monsterId}-health-track`,
      HeroStageTemplateIds.healthBarTrack,
      {
        position: { x: monsterPosition.x, y: barY, z: barZ },
        scale: { x: TRIAL_HEALTH_BAR_WIDTH, y: TRIAL_HEALTH_BAR_HEIGHT, z: 1 },
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
        scale: { x: fillWidth, y: TRIAL_HEALTH_BAR_FILL_HEIGHT, z: 1 },
        renderOrder: 7,
        replication: "localCosmetic",
        tintHex: healthBarTintForRatio(ratio),
        opacity: 0.95,
      },
    ),
  ];
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

  return Math.max(0, Math.min(1, monster.hp / monster.maxHp));
}

function healthBarYOffsetForTrialMonster(
  kind: ActiveTrialMonster["kind"],
): number {
  switch (kind) {
    case "kobold":
      return 1.64;
    case "tallKobold":
      return 2.1;
    case "miniBoss":
      return 2.56;
  }
}

function screenForPhase(phase: GamePhase): ScreenRenderState["screen"] {
  if (phase === "TITLE") {
    return "title";
  }

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
    renderOrder?: number;
    replication?: WorldObjectState["replication"];
    animationId?: string;
    tintHex?: string;
    opacity?: number;
  },
): WorldObjectState {
  return {
    objectId,
    templateId,
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
    tintHex: options.tintHex,
    opacity: options.opacity,
    animationId: options.animationId,
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
