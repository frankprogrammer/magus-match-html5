import './styles.css';
import { MagusMatchGameApp } from './core/GameApp';
import { BOARD_SIZE, LOGICAL_HEIGHT, LOGICAL_WIDTH } from './core/Layout';
import { BrowserInputAdapter, parseDebugSeed } from './platform-browser/BrowserInputAdapter';

const root = document.querySelector<HTMLDivElement>('#app');

if (root == null) {
  throw new Error('Missing #app root element.');
}

const app = new MagusMatchGameApp(parseDebugSeed(window.location.search));

root.innerHTML = `
  <main class="game-shell" aria-label="Magus Match prototype shell">
    <section class="logical-stage">
      <div class="hero-stage">
        <div class="stage-label">Magus Match</div>
      </div>
      <div class="hud-strip">
        <div data-hud="level"></div>
        <div data-hud="lives"></div>
        <div data-hud="score"></div>
        <div data-hud="objective"></div>
      </div>
      <div class="board-section">
        <div class="board-placeholder" aria-label="8 by 8 board placeholder">
          ${Array.from({ length: BOARD_SIZE * BOARD_SIZE }, () => '<div class="board-cell"></div>').join('')}
        </div>
      </div>
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
const levelHud = mustQuery(root, '[data-hud="level"]');
const livesHud = mustQuery(root, '[data-hud="lives"]');
const scoreHud = mustQuery(root, '[data-hud="score"]');
const objectiveHud = mustQuery(root, '[data-hud="objective"]');
const debugPanel = mustQuery(root, '[data-debug]');

const input = new BrowserInputAdapter(gameShell);

function resizeLogicalStage(): void {
  const rect = gameShell.getBoundingClientRect();
  const scale = Math.min(rect.width / LOGICAL_WIDTH, rect.height / LOGICAL_HEIGHT);
  stageElement.style.transform = `scale(${scale})`;
}

function renderHud(): void {
  const hud = app.getHudState();
  levelHud.textContent = hud.levelText;
  livesHud.textContent = hud.livesText;
  scoreHud.textContent = `Score ${hud.scoreText}`;
  objectiveHud.textContent = hud.objectiveText;
  debugPanel.textContent = `${hud.phase} | ${hud.debugText ?? ''}`;
}

let lastTimeMs = 0;

function tick(timeMs: number): void {
  const dtSec = lastTimeMs === 0 ? 0 : Math.min((timeMs - lastTimeMs) / 1000, 1 / 30);
  lastTimeMs = timeMs;
  app.update(dtSec, input.drainCommands());
  app.drainEvents();
  renderHud();
  requestAnimationFrame(tick);
}

resizeLogicalStage();
renderHud();
window.addEventListener('resize', resizeLogicalStage);
requestAnimationFrame(tick);

function mustQuery(parent: ParentNode, selector: string): HTMLElement {
  const element = parent.querySelector<HTMLElement>(selector);
  if (element == null) {
    throw new Error(`Missing required element: ${selector}`);
  }

  return element;
}
