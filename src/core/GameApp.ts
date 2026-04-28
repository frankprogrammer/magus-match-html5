import type { GameEvent } from './GameEvents';
import type { GameInputCommand } from './GameInput';
import { BOARD_SIZE, LOGICAL_HEIGHT, LOGICAL_WIDTH } from './Layout';
import type { CellCoord } from './Layout';
import { createRandomSeed, SeededRng } from './Rng';
import type { GamePhase, RunState } from './Types';
import type { Board } from '../board/Board';
import { cloneBoard, createEmptyBoard, getAllPlayableCoords } from '../board/Board';
import type { TileType } from '../board/TileTypes';
import { AssetIds } from '../assets/AssetIds';
import type { GeneratedLevel } from '../generator/LevelGenerator';
import { generateLevel } from '../generator/LevelGenerator';
import type { JourneyRuntimeState } from '../generator/JourneyRules';
import {
  createJourneyRuntime,
  getVisibleJourneyHintCells,
  processJourneySwap,
} from '../generator/JourneyRules';
import type { BoardRenderState } from '../render-2d/BoardRenderState';
import type { HudRenderState } from '../render-2d/HudRenderState';
import { HeroStageTemplateIds } from '../world-3d/HeroStageTemplates';
import type { HeroWorldState } from '../world-3d/HeroWorldState';
import type { TransformState } from '../world-3d/TransformState';
import type { WorldObjectState } from '../world-3d/WorldObjectState';

export interface GameApp {
  update(dtSec: number, commands: readonly GameInputCommand[]): void;
  getBoardRenderState(): BoardRenderState;
  getHeroWorldState(): HeroWorldState;
  getHudState(): HudRenderState;
  drainEvents(): GameEvent[];
  reset(seed?: number): void;
}

export class MagusMatchGameApp implements GameApp {
  private events: GameEvent[] = [];
  private rng = new SeededRng();
  private elapsedSec = 0;
  private run: RunState = createInitialRunState(createRandomSeed());
  private board: Board = createEmptyBoard();
  private currentLevel: GeneratedLevel | null = null;
  private journeyRuntime: JourneyRuntimeState | null = null;
  private phase: GamePhase = 'IDLE';

  constructor(seed?: number) {
    this.reset(seed);
  }

  update(dtSec: number, commands: readonly GameInputCommand[]): void {
    this.elapsedSec += Math.max(0, dtSec);

    for (const command of commands) {
      if (command.type === 'restart') {
        this.reset();
        continue;
      }

      if (command.type === 'swap') {
        this.handleSwap(command.from, command.to);
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
            coord,
            assetId: assetIdForTileType(tile.type),
            tileType: tile.type,
            isPath: this.board[coord.row][coord.col].isPath,
            alpha: 1,
          };
        })
        .filter((cell) => cell != null),
      pathCells: getAllPlayableCoords(this.board).filter((coord) => this.board[coord.row][coord.col].isPath),
      mageCell: this.journeyRuntime?.mageCell ?? null,
      goalCell: this.currentLevel?.type === 'JOURNEY' ? this.currentLevel.journey.goalCell : null,
      hintedCells:
        this.currentLevel?.type === 'JOURNEY' && this.journeyRuntime != null
          ? getVisibleJourneyHintCells(this.currentLevel, this.journeyRuntime, this.elapsedSec)
          : [],
      selectedCell: null,
      queuedSwap: null,
      shakePixels: 0,
    };
  }

  getHeroWorldState(): HeroWorldState {
    const objects = this.getHeroWorldObjects();
    return {
      levelType: 'JOURNEY',
      backdropId: 'backdrop.forest',
      cinematicState: phaseToCinematicState(this.phase),
      objects,
      activeProjectiles: [],
      camera: {
        mode: 'fixed',
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
      muted: false,
      debugText: `Seed ${this.run.seed}`,
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
    this.currentLevel = generateLevel({
      levelNumber: this.run.levelNumber,
      difficulty: this.run.difficulty,
      seed,
    });
    this.board = cloneBoard(this.currentLevel.initialBoard);
    this.journeyRuntime = createJourneyRuntime(this.currentLevel);
    this.elapsedSec = 0;
    this.phase = 'IDLE';
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

  private handleSwap(from: { col: number; row: number }, to: { col: number; row: number }): void {
    if (this.currentLevel?.type !== 'JOURNEY' || this.journeyRuntime == null) {
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

    this.board = result.board;
    this.journeyRuntime = result.runtime;
    if (result.scoreDelta > 0) {
      this.run = { ...this.run, score: this.run.score + result.scoreDelta };
      this.events.push({ type: 'scoreChanged', score: this.run.score });
    }

    this.phase =
      result.runtime.result === 'won' ? 'WIN' : result.runtime.result === 'lost' ? 'LOSE' : 'IDLE';
  }

  private getObjectiveText(): string {
    if (this.currentLevel?.type !== 'JOURNEY' || this.journeyRuntime == null) {
      return 'Journey';
    }

    if (this.journeyRuntime.result === 'won') {
      return 'Goal reached';
    }

    if (this.journeyRuntime.result === 'lost') {
      return 'Out of moves';
    }

    const hintVisible = getVisibleJourneyHintCells(
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
      createWorldObject('stage-backdrop', HeroStageTemplateIds.backdropForest, {
        position: { x: 0, y: 0, z: -0.2 },
        scale: { x: 12, y: 5, z: 1 },
      }),
    ];

    if (this.currentLevel?.type !== 'JOURNEY' || this.journeyRuntime == null) {
      return objects;
    }

    for (const coord of getAllPlayableCoords(this.board)) {
      if (this.board[coord.row][coord.col].isPath) {
        objects.push(
          createWorldObject(`journey-path-${coord.col}-${coord.row}`, HeroStageTemplateIds.pathMarker, {
            position: heroPositionForCell(coord, -0.05),
            scale: { x: 0.35, y: 0.05, z: 0.35 },
            renderOrder: 1,
            replication: 'localCosmetic',
          }),
        );
      }
    }

    objects.push(
      createWorldObject('actor-mage', HeroStageTemplateIds.mage, {
        position: heroPositionForCell(this.journeyRuntime.mageCell, 0.35),
        scale: { x: 0.42, y: 0.75, z: 0.42 },
        renderOrder: 4,
        animationId: phaseToMageAnimation(this.phase),
      }),
      createWorldObject('actor-prince-cage', HeroStageTemplateIds.princeCage, {
        position: heroPositionForCell(this.currentLevel.journey.goalCell, 0.55),
        scale: { x: 0.55, y: 0.75, z: 0.55 },
        renderOrder: 3,
        animationId: phaseToPrinceAnimation(this.phase),
      }),
      createWorldObject('prop-goal-flag', HeroStageTemplateIds.goalFlag, {
        position: heroPositionForCell(this.currentLevel.journey.goalCell, 0.15),
        scale: { x: 0.35, y: 0.55, z: 0.35 },
        renderOrder: 2,
        replication: 'localCosmetic',
      }),
    );

    return objects;
  }
}

export function createInitialRunState(seed: number): RunState {
  return {
    seed,
    lives: 3,
    levelNumber: 1,
    difficulty: 1,
    score: 0,
    levelsCleared: 0,
  };
}

function assetIdForTileType(type: TileType): string {
  switch (type) {
    case 'FIRE':
      return AssetIds.tiles.fire;
    case 'ICE':
      return AssetIds.tiles.ice;
    case 'LIGHTNING':
      return AssetIds.tiles.lightning;
    case 'EARTH':
      return AssetIds.tiles.earth;
    case 'LAND':
      return AssetIds.tiles.land;
    case 'ROCKET_H':
      return AssetIds.powerUps.rocketH;
    case 'ROCKET_V':
      return AssetIds.powerUps.rocketV;
    case 'TNT':
      return AssetIds.powerUps.tnt;
    case 'LIGHTBALL':
      return AssetIds.powerUps.lightball;
  }
}

export function phaseToCinematicState(phase: GamePhase): HeroWorldState['cinematicState'] {
  if (phase === 'WIN') {
    return 'victory';
  }

  if (phase === 'LOSE') {
    return 'fail';
  }

  return 'none';
}

function phaseToMageAnimation(phase: GamePhase): string {
  if (phase === 'WIN') {
    return 'victory';
  }

  if (phase === 'LOSE') {
    return 'stunned';
  }

  return 'idle';
}

function phaseToPrinceAnimation(phase: GamePhase): string {
  if (phase === 'WIN') {
    return 'yank';
  }

  if (phase === 'LOSE') {
    return 'cower';
  }

  return 'cower';
}

function createWorldObject(
  objectId: string,
  templateId: string,
  options: {
    position: TransformState['position'];
    scale: TransformState['scale'];
    renderOrder?: number;
    replication?: WorldObjectState['replication'];
    animationId?: string;
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
    lifetime: 'persistent',
    replication: options.replication ?? 'sharedGameplay',
    renderLayer: 'heroStage',
    renderOrder: options.renderOrder,
    animationId: options.animationId,
  };
}

function heroPositionForCell(coord: CellCoord, z: number): TransformState['position'] {
  const normalizedX = coord.col / (BOARD_SIZE - 1);
  const normalizedY = coord.row / (BOARD_SIZE - 1);
  return {
    x: -4.6 + normalizedX * 9.2,
    y: 1.6 - normalizedY * 2.7,
    z,
  };
}
