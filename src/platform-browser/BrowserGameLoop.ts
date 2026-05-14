import type { GameApp } from '../core/GameApp';
import type { GameEvent } from '../core/GameEvents';
import type { GameInputCommand } from '../core/GameInput';
import {
  GAME_OVER_TRY_AGAIN_BUTTON_RECT,
  pointInRect,
} from '../core/Layout';
import type { RunState } from '../core/Types';
import type { AudioState } from '../presentation/AudioState';
import type { HeroWorldState } from '../presentation/HeroWorldState';
import type { BrowserAudioHost } from './BrowserAudioHost';
import { clientToLogicalPoint } from './BrowserInputAdapter';
import type { BrowserPersistenceHost } from './BrowserPersistenceHost';
import type { BrowserPresentationHost } from './BrowserPresentationHost';

interface BrowserLoopGameApp extends GameApp {
  getAudioState(): AudioState;
  getHeroWorldState(): HeroWorldState;
  getRunStateForDebug(): RunState;
}

interface BrowserInputSource {
  drainCommands(): readonly GameInputCommand[];
  dispose(): void;
}

export interface BrowserGameLoopOptions {
  app: BrowserLoopGameApp;
  input: BrowserInputSource;
  presentation: BrowserPresentationHost;
  audio: BrowserAudioHost;
  persistence: BrowserPersistenceHost;
}

export class BrowserGameLoop {
  private lastTimeMs = 0;
  private overlayPrimaryButtonPressed = false;
  private animationFrameId: number | null = null;
  private disposed = false;

  constructor(private readonly options: BrowserGameLoopOptions) {
    const shell = this.options.presentation.gameShell;
    shell.addEventListener('pointerdown', this.onPointerDown, { passive: true });
    shell.addEventListener('pointerup', this.onPointerUp, { passive: true });
    shell.addEventListener('pointercancel', this.onPointerCancel, { passive: true });
  }

  start(): void {
    const boardState = this.options.app.getBoardRenderState();
    this.options.presentation.resizeLogicalStage();
    this.options.presentation.renderInitial(
      boardState,
      this.options.app.getHeroWorldState(),
      this.getBrowserHudState(),
      this.getBrowserScreenState(),
    );
    this.animationFrameId = requestAnimationFrame(this.tick);
  }

  dispose(): void {
    if (this.disposed) {
      return;
    }

    this.disposed = true;
    if (this.animationFrameId != null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    const shell = this.options.presentation.gameShell;
    shell.removeEventListener('pointerdown', this.onPointerDown);
    shell.removeEventListener('pointerup', this.onPointerUp);
    shell.removeEventListener('pointercancel', this.onPointerCancel);
    this.options.input.dispose();
    this.options.presentation.dispose();
    this.options.audio.dispose();
  }

  private readonly tick = (timeMs: number): void => {
    if (this.disposed) {
      return;
    }

    const dtSec = this.lastTimeMs === 0 ? 0 : Math.min((timeMs - this.lastTimeMs) / 1000, 1 / 30);
    this.lastTimeMs = timeMs;
    const { app, input, presentation, audio } = this.options;

    app.update(dtSec, input.drainCommands());
    this.handleEvents(app.drainEvents());

    const hudState = this.getBrowserHudState();
    const screenState = this.getBrowserScreenState();
    audio.syncState(app.getAudioState());
    presentation.render({
      boardState: app.getBoardRenderState(),
      heroWorldState: app.getHeroWorldState(),
      hudState,
      screenState,
      timeSec: timeMs / 1000,
      dtSec,
    });
    this.animationFrameId = requestAnimationFrame(this.tick);
  };

  private handleEvents(events: readonly GameEvent[]): void {
    for (const event of events) {
      this.options.audio.handleEvent(event);
      this.options.persistence.handleEvent(event, this.options.app.getRunStateForDebug().seed);
    }
  }

  private getBrowserHudState(): ReturnType<BrowserLoopGameApp['getHudState']> {
    const hud = this.options.app.getHudState();
    return this.options.audio.isEnabled ? hud : { ...hud, muted: true };
  }

  private getBrowserScreenState(): ReturnType<BrowserLoopGameApp['getScreenState']> {
    const screen = this.options.app.getScreenState(
      this.options.persistence.leaderboardRows,
      this.options.persistence.highlightedRank,
    );
    const base = this.options.audio.isEnabled ? screen : { ...screen, muted: true };
    return { ...base, overlayPrimaryButtonPressed: this.overlayPrimaryButtonPressed };
  }

  private readonly onPointerDown = (event: PointerEvent): void => {
    this.options.audio.unlock();
    this.options.presentation.requestFullscreen();
    this.updateOverlayPrimaryButtonPressed(event, true);
  };

  private readonly onPointerUp = (): void => {
    this.updateOverlayPrimaryButtonPressed(null, false);
  };

  private readonly onPointerCancel = (): void => {
    this.updateOverlayPrimaryButtonPressed(null, false);
  };

  private updateOverlayPrimaryButtonPressed(event: PointerEvent | null, down: boolean): void {
    if (!down || event == null) {
      this.overlayPrimaryButtonPressed = false;
      return;
    }

    const logical = clientToLogicalPoint(
      event,
      this.options.presentation.gameShell.getBoundingClientRect(),
    );
    const phase = this.options.app.getScreenState(
      this.options.persistence.leaderboardRows,
      this.options.persistence.highlightedRank,
    ).phase;
    this.overlayPrimaryButtonPressed =
      phase === 'GAME_OVER' && pointInRect(logical, GAME_OVER_TRY_AGAIN_BUTTON_RECT);
  }
}
