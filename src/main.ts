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
const boardCells = [...root.querySelectorAll<HTMLElement>('.board-cell')];

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

function renderBoardDebug(): void {
  const state = app.getBoardRenderState();
  const cellByCoord = new Map(state.boardCells.map((cell) => [`${cell.coord.col},${cell.coord.row}`, cell]));
  const pathCells = new Set(state.pathCells.map((coord) => `${coord.col},${coord.row}`));
  const hintedCells = new Set(state.hintedCells.map((coord) => `${coord.col},${coord.row}`));

  boardCells.forEach((element, index) => {
    const col = index % BOARD_SIZE;
    const row = Math.floor(index / BOARD_SIZE);
    const key = `${col},${row}`;
    const cell = cellByCoord.get(key);

    element.className = 'board-cell';
    element.textContent = '';

    if (cell != null) {
      element.classList.add(tileClassName(cell.tileType));
    }

    if (pathCells.has(key)) {
      element.classList.add('is-path');
    }

    if (state.goalCell != null && state.goalCell.col === col && state.goalCell.row === row) {
      element.classList.add('is-goal');
    }

    if (state.mageCell != null && state.mageCell.col === col && state.mageCell.row === row) {
      element.classList.add('is-mage');
    }

    if (hintedCells.has(key)) {
      element.classList.add('is-hint');
    }
  });
}

let lastTimeMs = 0;

function tick(timeMs: number): void {
  const dtSec = lastTimeMs === 0 ? 0 : Math.min((timeMs - lastTimeMs) / 1000, 1 / 30);
  lastTimeMs = timeMs;
  app.update(dtSec, input.drainCommands());
  app.drainEvents();
  renderHud();
  renderBoardDebug();
  requestAnimationFrame(tick);
}

resizeLogicalStage();
renderHud();
renderBoardDebug();
window.addEventListener('resize', resizeLogicalStage);
requestAnimationFrame(tick);

function mustQuery(parent: ParentNode, selector: string): HTMLElement {
  const element = parent.querySelector<HTMLElement>(selector);
  if (element == null) {
    throw new Error(`Missing required element: ${selector}`);
  }

  return element;
}

function tileClassName(tileType: string): string {
  return `tile-${tileType.toLowerCase().replace('_', '-')}`;
}
