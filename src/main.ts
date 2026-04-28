import './styles.css';
import { MagusMatchGameApp } from './core/GameApp';
import { LOGICAL_HEIGHT, LOGICAL_WIDTH } from './core/Layout';
import {
  BrowserInputAdapter,
  parseDebugLevelType,
  parseDebugSeed,
} from './platform-browser/BrowserInputAdapter';
import { Canvas2DRenderer } from './render-2d/Canvas2DRenderer';
import { renderFrame } from './render-2d/RenderFrame';
import { ThreeHeroStage } from './render-three/ThreeHeroStage';

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

const input = new BrowserInputAdapter(gameShell);

function resizeLogicalStage(): void {
  const rect = gameShell.getBoundingClientRect();
  const scale = Math.min(rect.width / LOGICAL_WIDTH, rect.height / LOGICAL_HEIGHT);
  stageElement.style.transform = `scale(${scale})`;
  heroStage.resize(1080, 500);
}

function renderHud(): void {
  const hud = app.getHudState();
  debugPanel.textContent = `${hud.phase} | ${hud.debugText ?? ''}`;
}

let lastTimeMs = 0;

function tick(timeMs: number): void {
  const dtSec = lastTimeMs === 0 ? 0 : Math.min((timeMs - lastTimeMs) / 1000, 1 / 30);
  lastTimeMs = timeMs;
  app.update(dtSec, input.drainCommands());
  app.drainEvents();
  renderHud();
  renderFrame(renderer, app.getBoardRenderState(), app.getHudState(), timeMs / 1000);
  heroStage.render(app.getHeroWorldState(), dtSec);
  requestAnimationFrame(tick);
}

resizeLogicalStage();
renderHud();
renderFrame(renderer, app.getBoardRenderState(), app.getHudState(), 0);
heroStage.render(app.getHeroWorldState(), 0);
window.addEventListener('resize', resizeLogicalStage);
window.addEventListener('beforeunload', () => heroStage.dispose());
requestAnimationFrame(tick);

function mustQuery(parent: ParentNode, selector: string): HTMLElement {
  const element = parent.querySelector<HTMLElement>(selector);
  if (element == null) {
    throw new Error(`Missing required element: ${selector}`);
  }

  return element;
}
