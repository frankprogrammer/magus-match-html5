import type { GameEvent } from './GameEvents';
import type { GameInputCommand } from './GameInput';
import { LOGICAL_HEIGHT, LOGICAL_WIDTH } from './Layout';
import { createRandomSeed, SeededRng } from './Rng';
import type { RunState } from './Types';
import type { Board } from '../board/Board';
import { createEmptyBoard, getAllPlayableCoords } from '../board/Board';
import { createPlayableStandardBoard } from '../board/BoardSolver';
import type { TileType } from '../board/TileTypes';
import { AssetIds } from '../assets/AssetIds';
import type { BoardRenderState } from '../render-2d/BoardRenderState';
import type { HudRenderState } from '../render-2d/HudRenderState';
import type { HeroWorldState } from '../world-3d/HeroWorldState';

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
  private phase: 'TITLE' = 'TITLE';

  constructor(seed?: number) {
    this.reset(seed);
  }

  update(dtSec: number, commands: readonly GameInputCommand[]): void {
    this.elapsedSec += Math.max(0, dtSec);

    for (const command of commands) {
      if (command.type === 'restart') {
        this.reset();
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
            isPath: this.board[coord.row][coord.col].isPath,
            alpha: 1,
          };
        })
        .filter((cell) => cell != null),
      selectedCell: null,
      queuedSwap: null,
      shakePixels: 0,
    };
  }

  getHeroWorldState(): HeroWorldState {
    return {
      levelType: 'JOURNEY',
      backdropId: 'backdrop.forest',
      cinematicState: 'none',
      objects: [],
      activeProjectiles: [],
      camera: {
        mode: 'fixed',
        position: { x: 0, y: 0, z: 10 },
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
      objectiveText: 'Tap Play',
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
    this.board = createPlayableStandardBoard(this.rng);
    this.elapsedSec = 0;
    this.phase = 'TITLE';
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
