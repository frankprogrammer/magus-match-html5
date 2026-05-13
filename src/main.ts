import './styles.css';
import { MagusMatchGameApp } from './core/GameApp';
import {
  GAME_OVER_TRY_AGAIN_BUTTON_RECT,
  HERO_STAGE_HEIGHT,
  LOGICAL_HEIGHT,
  LOGICAL_WIDTH,
  pointInRect,
} from './core/Layout';
import {
  BrowserInputAdapter,
  clientToLogicalPoint,
  parseDebugLevelNumber,
  parseDebugLevelType,
  parseDebugSeed,
} from './platform-browser/BrowserInputAdapter';
import { isMobileFullscreenTarget, shouldRequestGameFullscreen } from './platform-browser/FullscreenPolicy';
import { loadBrowserImages } from './platform-browser/BrowserImageLoader';
import { LocalLeaderboardStore } from './platform-browser/LocalLeaderboardStore';
import { BoardAnimationPresenter } from './render-2d/BoardAnimationPresenter';
import { Canvas2DRenderer } from './render-2d/Canvas2DRenderer';
import { renderFrame, type HeartLossWobbleState } from './render-2d/RenderFrame';
import { ThreeHeroStage } from './render-three/ThreeHeroStage';
import type { GameEvent } from './core/GameEvents';
import type { HudRenderState } from './render-2d/HudRenderState';
import type { ScreenRenderState } from './render-2d/ScreenRenderState';
import {
  getSoundManifestEntriesForBrowserPreload,
  type SoundManifestEntry,
} from './audio/SoundManifest';
import {
  createLeaderboardEntry,
  insertLeaderboardEntry,
  type LeaderboardEntry,
} from './run/Leaderboard';
import { INITIAL_LIVES } from './run/RunProgression';

const ENABLE_BROWSER_AUDIO = true;

type SoundRequestEvent = Extract<GameEvent, { type: 'soundRequested' }>;
interface BrowserAudio {
  setMuted(muted: boolean): void;
  setBackgroundMusicMuted(bgmMuted: boolean): void;
  preload(entries?: readonly SoundManifestEntry[]): Promise<void>;
  resume(): Promise<void>;
  play(event: SoundRequestEvent): Promise<boolean>;
  syncTrialWalkLoops(activeMonsterIds: readonly string[]): void;
  stopTrialWalkLoop(): void;
  stopBackgroundMusic(): void;
}

const root = document.querySelector<HTMLDivElement>('#app');

if (root == null) {
  throw new Error('Missing #app root element.');
}

const debugSeed = parseDebugSeed(window.location.search);
const debugLevelType = parseDebugLevelType(window.location.search);
const debugStartLevel = parseDebugLevelNumber(window.location.search);
const app = new MagusMatchGameApp(debugSeed, {
  debugLevelType,
  debugStartLevel,
  skipTutorial: debugSeed != null || debugLevelType != null || debugStartLevel != null,
});

root.innerHTML = `
  <main class="game-shell" aria-label="Magus Match prototype shell">
    <section class="logical-stage">
      <canvas class="game-canvas" width="${LOGICAL_WIDTH}" height="${LOGICAL_HEIGHT}" aria-label="Magus Match board and HUD"></canvas>
      <div class="hero-stage" data-hero-stage aria-label="Magus Match hero stage"></div>
      <div class="debug-panel" data-debug></div>
    </section>
  </main>
`;

const shell = root.querySelector<HTMLElement>('.game-shell');
const logicalStage = root.querySelector<HTMLElement>('.logical-stage');

if (shell == null || logicalStage == null) {
  throw new Error('Failed to create game shell.');
}

const gameShell = shell;
const stageElement = logicalStage;
const debugPanel = mustQuery(root, '[data-debug]');
const canvas = mustQuery(root, '.game-canvas') as HTMLCanvasElement;
const heroStageElement = mustQuery(root, '[data-hero-stage]');
const ctx = canvas.getContext('2d');

if (ctx == null) {
  throw new Error('Unable to create 2D canvas context.');
}

const renderer = new Canvas2DRenderer(ctx, {}, LOGICAL_WIDTH, LOGICAL_HEIGHT);
const heroStage = new ThreeHeroStage(heroStageElement);
const boardAnimationPresenter = new BoardAnimationPresenter();
let audio: BrowserAudio | null = null;
const leaderboardStore = new LocalLeaderboardStore();
let leaderboardRows: readonly LeaderboardEntry[] = leaderboardStore.load();
let highlightedRank: number | null = null;
let overlayPrimaryButtonPressed = false;
let audioPreloadStarted = false;

const input = new BrowserInputAdapter(gameShell);
let fullscreenRequestAttempted = false;
let activeHeroHeight = HERO_STAGE_HEIGHT;
let activeHeroSceneScale = 1;

void loadBrowserImages().then((images) => {
  renderer.setImages(images);
});

if (ENABLE_BROWSER_AUDIO) {
  void import('./platform-browser/BrowserAudioAdapter').then(({ BrowserAudioAdapter }) => {
    audio = new BrowserAudioAdapter();
  });

  gameShell.addEventListener('pointerdown', () => {
    unlockBrowserAudio();
  });
}

gameShell.addEventListener('pointerdown', requestGameFullscreen, { passive: true });

function unlockBrowserAudio(): void {
  if (!ENABLE_BROWSER_AUDIO || audio == null) {
    return;
  }

  void audio.resume();
  if (audioPreloadStarted) {
    return;
  }

  audioPreloadStarted = true;
  void audio.preload(getSoundManifestEntriesForBrowserPreload());
}

function updateOverlayPrimaryButtonPressed(event: PointerEvent, down: boolean): void {
  if (!down) {
    overlayPrimaryButtonPressed = false;
    return;
  }
  const logical = clientToLogicalPoint(event, gameShell.getBoundingClientRect());
  const phase = app.getScreenState(leaderboardRows, highlightedRank).phase;
  if (phase === 'GAME_OVER' && pointInRect(logical, GAME_OVER_TRY_AGAIN_BUTTON_RECT)) {
    overlayPrimaryButtonPressed = true;
  }
}

gameShell.addEventListener('pointerdown', (e) => updateOverlayPrimaryButtonPressed(e, true), { passive: true });
gameShell.addEventListener('pointerup', (e) => updateOverlayPrimaryButtonPressed(e, false), { passive: true });
gameShell.addEventListener('pointercancel', (e) => updateOverlayPrimaryButtonPressed(e, false), { passive: true });

function resizeLogicalStage(nextHeroHeight = activeHeroHeight, nextHeroSceneScale = activeHeroSceneScale): void {
  activeHeroHeight = nextHeroHeight;
  activeHeroSceneScale = nextHeroSceneScale;
  const rect = gameShell.getBoundingClientRect();
  const scale = Math.min(rect.width / LOGICAL_WIDTH, rect.height / LOGICAL_HEIGHT);
  stageElement.style.transform = `scale(${scale})`;
  heroStageElement.style.height = `${activeHeroHeight}px`;
  heroStageElement.style.setProperty('--hero-scene-scale', `${activeHeroSceneScale}`);
  heroStage.resize(LOGICAL_WIDTH, activeHeroHeight);
}

function requestGameFullscreen(): void {
  if (!shouldRequestGameFullscreen({
    requestAttempted: fullscreenRequestAttempted,
    fullscreenElement: document.fullscreenElement,
    canRequestFullscreen: gameShell.requestFullscreen != null,
    isMobileFullscreenTarget: isMobileFullscreenTarget(window.matchMedia.bind(window)),
  })) {
    return;
  }

  fullscreenRequestAttempted = true;
  void gameShell.requestFullscreen().catch(() => {
    fullscreenRequestAttempted = false;
  });
}

function handleFullscreenChange(): void {
  if (document.fullscreenElement == null) {
    fullscreenRequestAttempted = false;
  }
  resizeLogicalStage();
}

function renderHud(hud = getBrowserHudState()): void {
  debugPanel.textContent = `${hud.phase} | ${hud.debugText ?? ''}`;
}

let lastTimeMs = 0;
let lastHudLives = INITIAL_LIVES;
let heartLossAnim: { slotIndex: number; startedAtSec: number } | null = null;
const HEART_LOSS_WOBBLE_SEC = 0.45;

function tick(timeMs: number): void {
  const dtSec = lastTimeMs === 0 ? 0 : Math.min((timeMs - lastTimeMs) / 1000, 1 / 30);
  lastTimeMs = timeMs;
  app.update(dtSec, input.drainCommands());
  const hudState = getBrowserHudState();
  const screenState = getBrowserScreenState();
  const nowSec = timeMs / 1000;
  const prevLives = lastHudLives;
  if (hudState.lives < prevLives) {
    heartLossAnim = { slotIndex: prevLives - 1, startedAtSec: nowSec };
  }
  if (hudState.lives > prevLives) {
    heartLossAnim = null;
  }
  lastHudLives = hudState.lives;

  let heartLossWobble: HeartLossWobbleState | undefined;
  if (heartLossAnim != null) {
    const progress01 = Math.min(1, (nowSec - heartLossAnim.startedAtSec) / HEART_LOSS_WOBBLE_SEC);
    heartLossWobble = { slotIndex: heartLossAnim.slotIndex, progress01 };
    if (progress01 >= 1) {
      heartLossAnim = null;
    }
  }

  handleEvents(app.drainEvents());
  audio?.setMuted(hudState.muted);
  audio?.setBackgroundMusicMuted(hudState.bgmMuted);
  audio?.syncTrialWalkLoops(app.getTrialWalkingMonsterIds());
  renderHud(hudState);
  const boardState = app.getBoardRenderState();
  resizeLogicalStage(
    boardState.tutorialPresentation?.heroHeight ?? HERO_STAGE_HEIGHT,
    boardState.tutorialPresentation?.sceneScale ?? 1,
  );
  heroStage.render(app.getHeroWorldState(), dtSec);
  const matchEnergyTarget = heroStage.getMageParticleSourceLogicalPosition(LOGICAL_WIDTH, activeHeroHeight) ?? undefined;
  renderFrame(
    renderer,
    boardAnimationPresenter.present(boardState, timeMs / 1000, { matchEnergyTarget }),
    hudState,
    timeMs / 1000,
    screenState,
    heartLossWobble,
  );
  requestAnimationFrame(tick);
}

resizeLogicalStage();
renderHud();
const initialBoardState = app.getBoardRenderState();
resizeLogicalStage(
  initialBoardState.tutorialPresentation?.heroHeight ?? HERO_STAGE_HEIGHT,
  initialBoardState.tutorialPresentation?.sceneScale ?? 1,
);
heroStage.render(app.getHeroWorldState(), 0);
renderFrame(
  renderer,
  boardAnimationPresenter.present(initialBoardState, 0, {
    matchEnergyTarget: heroStage.getMageParticleSourceLogicalPosition(LOGICAL_WIDTH, activeHeroHeight) ?? undefined,
  }),
  getBrowserHudState(),
  0,
  getBrowserScreenState(),
);
window.addEventListener('resize', () => resizeLogicalStage());
document.addEventListener('fullscreenchange', handleFullscreenChange);
window.addEventListener('beforeunload', () => {
  heroStage.dispose();
  audio?.stopTrialWalkLoop();
  audio?.stopBackgroundMusic();
});
requestAnimationFrame(tick);

function handleEvents(events: readonly GameEvent[]): void {
  for (const event of events) {
    if (event.type === 'soundRequested') {
      if (ENABLE_BROWSER_AUDIO && audio != null) {
        void audio.play(event);
      }
      continue;
    }

    if (event.type === 'levelStarted') {
      highlightedRank = null;
      continue;
    }

    if (event.type === 'runEnded') {
      const entry = createLeaderboardEntry(
        event.finalScore,
        event.levelsCleared,
        app.getRunStateForDebug().seed,
        Date.now(),
      );
      const result = insertLeaderboardEntry(leaderboardRows, entry);
      leaderboardRows = result.entries;
      highlightedRank = result.qualifiedRank;
      leaderboardStore.save(leaderboardRows);
    }
  }
}

function getBrowserHudState(): HudRenderState {
  const hud = app.getHudState();
  return ENABLE_BROWSER_AUDIO ? hud : { ...hud, muted: true };
}

function getBrowserScreenState(): ScreenRenderState {
  const screen = app.getScreenState(leaderboardRows, highlightedRank);
  const base = ENABLE_BROWSER_AUDIO ? screen : { ...screen, muted: true };
  return { ...base, overlayPrimaryButtonPressed };
}

function mustQuery(parent: ParentNode, selector: string): HTMLElement {
  const element = parent.querySelector<HTMLElement>(selector);
  if (element == null) {
    throw new Error(`Missing required element: ${selector}`);
  }

  return element;
}
