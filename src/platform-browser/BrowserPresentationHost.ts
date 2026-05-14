import {
  HERO_STAGE_HEIGHT,
  LOGICAL_HEIGHT,
  LOGICAL_WIDTH,
} from '../core/Layout';
import type { BoardRenderState } from '../presentation/BoardRenderState';
import type { HeroWorldState } from '../presentation/HeroWorldState';
import type { HudRenderState } from '../presentation/HudRenderState';
import type { ScreenRenderState } from '../presentation/ScreenRenderState';
import { INITIAL_LIVES } from '../run/RunProgression';
import { BoardAnimationPresenter } from '../render-2d/BoardAnimationPresenter';
import { Canvas2DRenderer } from '../render-2d/Canvas2DRenderer';
import { renderFrame as render2dFrame, type HeartLossWobbleState } from '../render-2d/RenderFrame';
import { ThreeHeroStage } from '../render-three/ThreeHeroStage';
import { loadBrowserImages } from './BrowserImageLoader';
import {
  canRequestElementFullscreen,
  getActiveFullscreenElement,
  isMobileFullscreenTarget,
  requestElementFullscreen,
  shouldRequestGameFullscreen,
  type FullscreenCapableDocument,
  type FullscreenCapableElement,
} from './FullscreenPolicy';

const HEART_LOSS_WOBBLE_SEC = 0.45;

export interface BrowserPresentationFrame {
  boardState: BoardRenderState;
  heroWorldState: HeroWorldState;
  hudState: HudRenderState;
  screenState: ScreenRenderState;
  timeSec: number;
  dtSec: number;
}

export class BrowserPresentationHost {
  readonly gameShell: HTMLElement;

  private readonly stageElement: HTMLElement;
  private readonly debugPanel: HTMLElement;
  private readonly heroStageElement: HTMLElement;
  private readonly renderer: Canvas2DRenderer;
  private readonly heroStage: ThreeHeroStage;
  private readonly boardAnimationPresenter = new BoardAnimationPresenter();
  private fullscreenRequestAttempted = false;
  private activeHeroHeight = HERO_STAGE_HEIGHT;
  private activeHeroRenderHeight = HERO_STAGE_HEIGHT;
  private activeHeroBackgroundSceneScale = 1;
  private activeHeroForegroundSceneScale = 1;
  private activeHeroSceneOffsetX = 0;
  private activeHeroSceneOffsetY = 0;
  private lastHudLives = INITIAL_LIVES;
  private heartLossAnim: { slotIndex: number; startedAtSec: number } | null = null;

  constructor(root: HTMLElement) {
    root.innerHTML = `
      <main class="game-shell" aria-label="Magus Match prototype shell">
        <section class="logical-stage">
          <canvas class="game-canvas" width="${LOGICAL_WIDTH}" height="${LOGICAL_HEIGHT}" aria-label="Magus Match board and HUD"></canvas>
          <div class="hero-stage" data-hero-stage aria-label="Magus Match hero stage"></div>
        </section>
        <div class="debug-panel" data-debug></div>
      </main>
    `;

    this.gameShell = mustQuery(root, '.game-shell');
    this.stageElement = mustQuery(root, '.logical-stage');
    this.debugPanel = mustQuery(root, '[data-debug]');
    const canvas = mustQuery<HTMLCanvasElement>(root, '.game-canvas');
    this.heroStageElement = mustQuery(root, '[data-hero-stage]');
    const ctx = canvas.getContext('2d');

    if (ctx == null) {
      throw new Error('Unable to create 2D canvas context.');
    }

    this.renderer = new Canvas2DRenderer(ctx, {}, LOGICAL_WIDTH, LOGICAL_HEIGHT);
    this.heroStage = new ThreeHeroStage(this.heroStageElement);

    void loadBrowserImages().then((images) => {
      this.renderer.setImages(images);
    });
  }

  resizeLogicalStage(
    nextHeroHeight = this.activeHeroHeight,
    nextHeroBackgroundSceneScale = this.activeHeroBackgroundSceneScale,
    nextHeroForegroundSceneScale = this.activeHeroForegroundSceneScale,
    nextHeroRenderHeight = this.activeHeroRenderHeight,
    nextHeroSceneOffsetX = this.activeHeroSceneOffsetX,
    nextHeroSceneOffsetY = this.activeHeroSceneOffsetY,
  ): void {
    this.activeHeroHeight = nextHeroHeight;
    this.activeHeroBackgroundSceneScale = nextHeroBackgroundSceneScale;
    this.activeHeroForegroundSceneScale = nextHeroForegroundSceneScale;
    this.activeHeroRenderHeight = nextHeroRenderHeight;
    this.activeHeroSceneOffsetX = nextHeroSceneOffsetX;
    this.activeHeroSceneOffsetY = nextHeroSceneOffsetY;
    const rect = this.gameShell.getBoundingClientRect();
    const scale = Math.min(rect.width / LOGICAL_WIDTH, rect.height / LOGICAL_HEIGHT);
    this.stageElement.style.transform = `scale(${scale})`;
    this.heroStageElement.style.height = `${this.activeHeroHeight}px`;
    this.heroStageElement.style.setProperty('--hero-background-scene-scale', `${this.activeHeroBackgroundSceneScale}`);
    this.heroStageElement.style.setProperty('--hero-foreground-scene-scale', `${this.activeHeroForegroundSceneScale}`);
    this.heroStageElement.style.setProperty('--hero-scene-offset-x', `${this.activeHeroSceneOffsetX}px`);
    this.heroStageElement.style.setProperty('--hero-scene-offset-y', `${this.activeHeroSceneOffsetY}px`);
    this.heroStage.resize(LOGICAL_WIDTH, this.activeHeroRenderHeight);
  }

  renderInitial(
    boardState: BoardRenderState,
    heroWorldState: HeroWorldState,
    hudState: HudRenderState,
    screenState: ScreenRenderState,
  ): void {
    this.renderHud(hudState);
    this.applyBoardPresentation(boardState);
    this.heroStage.render(heroWorldState, 0);
    render2dFrame(
      this.renderer,
      this.boardAnimationPresenter.present(boardState, 0, {
        matchEnergyTarget: boardState.matchEnergyTarget,
      }),
      hudState,
      0,
      screenState,
    );
  }

  render(frame: BrowserPresentationFrame): void {
    const heartLossWobble = this.getHeartLossWobble(frame.hudState, frame.timeSec);
    this.renderHud(frame.hudState);
    this.applyBoardPresentation(frame.boardState);
    this.heroStage.render(frame.heroWorldState, frame.dtSec);
    render2dFrame(
      this.renderer,
      this.boardAnimationPresenter.present(frame.boardState, frame.timeSec, {
        matchEnergyTarget: frame.boardState.matchEnergyTarget,
      }),
      frame.hudState,
      frame.timeSec,
      frame.screenState,
      heartLossWobble,
    );
  }

  requestFullscreen(): void {
    if (!shouldRequestGameFullscreen({
      requestAttempted: this.fullscreenRequestAttempted,
      fullscreenElement: getActiveFullscreenElement(document as FullscreenCapableDocument),
      canRequestFullscreen: canRequestElementFullscreen(this.gameShell as FullscreenCapableElement),
      isMobileFullscreenTarget: isMobileFullscreenTarget(window.matchMedia.bind(window)),
    })) {
      return;
    }

    this.fullscreenRequestAttempted = true;
    void requestElementFullscreen(this.gameShell as FullscreenCapableElement).catch(() => {
      this.fullscreenRequestAttempted = false;
    });
  }

  handleFullscreenChange(): void {
    if (getActiveFullscreenElement(document as FullscreenCapableDocument) == null) {
      this.fullscreenRequestAttempted = false;
    }
    this.resizeLogicalStage();
  }

  dispose(): void {
    this.heroStage.dispose();
  }

  private applyBoardPresentation(boardState: BoardRenderState): void {
    const tutorialPresentation = boardState.tutorialPresentation;
    this.resizeLogicalStage(
      tutorialPresentation?.heroHeight ?? HERO_STAGE_HEIGHT,
      tutorialPresentation?.backgroundSceneScale ?? tutorialPresentation?.sceneScale ?? 1,
      tutorialPresentation?.foregroundSceneScale ?? tutorialPresentation?.sceneScale ?? 1,
      heroRenderHeightForTutorialMode(tutorialPresentation?.mode),
      tutorialPresentation?.sceneOffsetX ?? 0,
      tutorialPresentation?.sceneOffsetY ?? 0,
    );
  }

  private renderHud(hud: HudRenderState): void {
    this.debugPanel.textContent = `${hud.phase} | ${hud.debugText ?? ''}`;
  }

  private getHeartLossWobble(hudState: HudRenderState, timeSec: number): HeartLossWobbleState | undefined {
    const prevLives = this.lastHudLives;
    if (hudState.lives < prevLives) {
      this.heartLossAnim = { slotIndex: prevLives - 1, startedAtSec: timeSec };
    }
    if (hudState.lives > prevLives) {
      this.heartLossAnim = null;
    }
    this.lastHudLives = hudState.lives;

    if (this.heartLossAnim == null) {
      return undefined;
    }

    const progress01 = Math.min(1, (timeSec - this.heartLossAnim.startedAtSec) / HEART_LOSS_WOBBLE_SEC);
    const wobble = { slotIndex: this.heartLossAnim.slotIndex, progress01 };
    if (progress01 >= 1) {
      this.heartLossAnim = null;
    }
    return wobble;
  }
}

function heroRenderHeightForTutorialMode(_mode: string | undefined): number {
  return HERO_STAGE_HEIGHT;
}

function mustQuery<T extends HTMLElement>(parent: ParentNode, selector: string): T {
  const element = parent.querySelector<T>(selector);
  if (element == null) {
    throw new Error(`Missing required element: ${selector}`);
  }

  return element;
}
