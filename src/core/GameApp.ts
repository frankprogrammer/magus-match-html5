import type { GameEvent } from './GameEvents';
import type { GameInputCommand } from './GameInput';
import { createRandomSeed, SeededRng } from './Rng';
import type { RunState } from './Types';
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
      logicalWidth: 1080,
      logicalHeight: 1920,
      boardCells: [],
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
