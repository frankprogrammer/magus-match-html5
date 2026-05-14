import './styles.css';
import { MagusMatchGameApp } from './core/GameApp';
import {
  BrowserInputAdapter,
  parseDebugLevelNumber,
  parseDebugSeed,
  parseOneLifeDoubleSpeedFlag,
} from './platform-browser/BrowserInputAdapter';
import { BrowserAudioHost } from './platform-browser/BrowserAudioHost';
import { BrowserGameLoop } from './platform-browser/BrowserGameLoop';
import { BrowserPersistenceHost } from './platform-browser/BrowserPersistenceHost';
import { BrowserPresentationHost } from './platform-browser/BrowserPresentationHost';

const ENABLE_BROWSER_AUDIO = true;

const root = document.querySelector<HTMLDivElement>('#app');

if (root == null) {
  throw new Error('Missing #app root element.');
}

const debugSeed = parseDebugSeed(window.location.search);
const debugStartLevel = parseDebugLevelNumber(window.location.search);
const oneLifeDoubleSpeed = parseOneLifeDoubleSpeedFlag(window.location.search);
const app = new MagusMatchGameApp(debugSeed, {
  debugStartLevel,
  oneLifeDoubleSpeed,
  skipTutorial: debugSeed != null || debugStartLevel != null,
});

const presentation = new BrowserPresentationHost(root);
const input = new BrowserInputAdapter(presentation.gameShell);
const audio = new BrowserAudioHost(ENABLE_BROWSER_AUDIO);
const persistence = new BrowserPersistenceHost();
const gameLoop = new BrowserGameLoop({
  app,
  input,
  presentation,
  audio,
  persistence,
});

window.addEventListener('resize', () => presentation.resizeLogicalStage());
document.addEventListener('fullscreenchange', () => presentation.handleFullscreenChange());
document.addEventListener('webkitfullscreenchange', () => presentation.handleFullscreenChange());
window.addEventListener('beforeunload', () => {
  gameLoop.dispose();
});

gameLoop.start();
