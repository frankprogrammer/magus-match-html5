import './styles.css';
import { MagusMatchGameApp } from './core/GameApp';
import { LOGICAL_HEIGHT, LOGICAL_WIDTH } from './core/Layout';
import {
  BrowserInputAdapter,
  parseDebugLevelType,
  parseDebugSeed,
} from './platform-browser/BrowserInputAdapter';
import { loadBrowserImages } from './platform-browser/BrowserImageLoader';
import { LocalLeaderboardStore } from './platform-browser/LocalLeaderboardStore';
import { BoardAnimationPresenter } from './render-2d/BoardAnimationPresenter';
import { Canvas2DRenderer } from './render-2d/Canvas2DRenderer';
import { renderFrame } from './render-2d/RenderFrame';
import { ThreeHeroStage } from './render-three/ThreeHeroStage';
import type { GameEvent } from './core/GameEvents';
import type { HudRenderState } from './render-2d/HudRenderState';
import type { ScreenRenderState } from './render-2d/ScreenRenderState';
import {
  createLeaderboardEntry,
  insertLeaderboardEntry,
  type LeaderboardEntry,
} from './run/Leaderboard';

const ENABLE_BROWSER_AUDIO = false;

type SoundRequestEvent = Extract<GameEvent, { type: 'soundRequested' }>;
interface BrowserAudio {
  setMuted(muted: boolean): void;
  preload(): Promise<void>;
  resume(): Promise<void>;
  play(event: SoundRequestEvent): Promise<boolean>;
}

const root = document.querySelector<HTMLDivElement>('#app');

if (root == null) {
  throw new Error('Missing #app root element.');
}

const app = new MagusMatchGameApp(parseDebugSeed(window.location.search), {
  debugLevelType: parseDebugLevelType(window.location.search),
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

const input = new BrowserInputAdapter(gameShell);

void loadBrowserImages().then((images) => {
  renderer.setImages(images);
});

if (ENABLE_BROWSER_AUDIO) {
  void import('./platform-browser/BrowserAudioAdapter').then(({ BrowserAudioAdapter }) => {
    audio = new BrowserAudioAdapter();
    return audio.preload();
  });

  gameShell.addEventListener('pointerdown', () => {
    void audio?.resume();
  });
}

function resizeLogicalStage(): void {
  const rect = gameShell.getBoundingClientRect();
  const scale = Math.min(rect.width / LOGICAL_WIDTH, rect.height / LOGICAL_HEIGHT);
  stageElement.style.transform = `scale(${scale})`;
  heroStage.resize(1080, 500);
}

function renderHud(hud = getBrowserHudState()): void {
  debugPanel.textContent = `${hud.phase} | ${hud.debugText ?? ''}`;
}

let lastTimeMs = 0;

function tick(timeMs: number): void {
  const dtSec = lastTimeMs === 0 ? 0 : Math.min((timeMs - lastTimeMs) / 1000, 1 / 30);
  lastTimeMs = timeMs;
  app.update(dtSec, input.drainCommands());
  const hudState = getBrowserHudState();
  const screenState = getBrowserScreenState();
  audio?.setMuted(hudState.muted);
  handleEvents(app.drainEvents());
  renderHud(hudState);
  renderFrame(
    renderer,
    boardAnimationPresenter.present(app.getBoardRenderState(), timeMs / 1000),
    hudState,
    timeMs / 1000,
    screenState,
  );
  heroStage.render(app.getHeroWorldState(), dtSec);
  requestAnimationFrame(tick);
}

resizeLogicalStage();
renderHud();
renderFrame(
  renderer,
  boardAnimationPresenter.present(app.getBoardRenderState(), 0),
  getBrowserHudState(),
  0,
  getBrowserScreenState(),
);
heroStage.render(app.getHeroWorldState(), 0);
window.addEventListener('resize', resizeLogicalStage);
window.addEventListener('beforeunload', () => heroStage.dispose());
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
  return ENABLE_BROWSER_AUDIO ? screen : { ...screen, muted: true };
}

function mustQuery(parent: ParentNode, selector: string): HTMLElement {
  const element = parent.querySelector<HTMLElement>(selector);
  if (element == null) {
    throw new Error(`Missing required element: ${selector}`);
  }

  return element;
}
