/// <reference types="vite/client" />

import { describe, expect, it } from 'vitest';
import { AssetManifest } from '../src/assets/AssetManifest';
import { MhsAssetMap } from '../src/assets/MhsAssetMap';
import { AssetIds } from '../src/assets/AssetIds';
import { MagusMatchGameApp } from '../src/core/GameApp';
import { LOGICAL_HEIGHT, LOGICAL_WIDTH } from '../src/core/Layout';
import type { BoardRenderState } from '../src/presentation/BoardRenderState';
import type { HudRenderState } from '../src/presentation/HudRenderState';
import type { DrawImageRef, GameRenderer, TextStyle } from '../src/render-2d/GameRenderer';
import { renderFrame } from '../src/render-2d/RenderFrame';

const platformNeutralSources = import.meta.glob('../src/{core,board,generator,run}/**/*.ts', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>;

describe('MHS portability boundaries', () => {
  it('keeps platform-neutral domains free of browser, Three.js, renderer, and MHS imports', () => {
    const violations: string[] = [];

    for (const [filePath, source] of Object.entries(platformNeutralSources)) {
      const importLines = source
        .split(/\r?\n/)
        .filter((line) => /^\s*import\b/.test(line));
      for (const line of importLines) {
        if (/\bfrom\s+['"][^'"]*(three|render-2d|render-three|platform-browser|world-3d|@meta|meta\/)/.test(line)) {
          violations.push(`${filePath} imports platform code: ${line.trim()}`);
        }
      }

      for (const token of ['window', 'document', 'HTMLElement', 'HTMLCanvasElement', 'CanvasRenderingContext2D', 'AudioContext', 'localStorage']) {
        if (new RegExp(`\\b${token}\\b`).test(source)) {
          violations.push(`${filePath} references ${token}`);
        }
      }
    }

    expect(violations).toEqual([]);
  });

  it('can advance the app and read presentation state without DOM objects', () => {
    const app = new MagusMatchGameApp(3129123386, {
      debugLevelType: 'TRIAL',
      skipTutorial: true,
    });

    app.update(1 / 60, []);

    const boardState = app.getBoardRenderState();
    const hudState = app.getHudState();
    const heroWorldState = app.getHeroWorldState();
    const audioState = app.getAudioState();

    expect(boardState.logicalWidth).toBe(LOGICAL_WIDTH);
    expect(boardState.logicalHeight).toBe(LOGICAL_HEIGHT);
    expect(boardState.boardCells.length).toBeGreaterThan(0);
    expect(boardState.matchEnergyTarget?.x).toEqual(expect.any(Number));
    expect(hudState.phase).toBe('IDLE');
    expect(heroWorldState.objects.some((object) => object.objectId === 'actor-mage')).toBe(true);
    expect(audioState.trialWalkingMonsterIds).toEqual(expect.any(Array));
  });
});

describe('MHS render adapter contract', () => {
  it('renders through the explicit drawing-command surface only', () => {
    const renderer = new ContractRenderer();

    renderFrame(renderer, oneTileBoardState(), hudState(), 0);

    const unsupportedOperations = renderer.operations.filter(
      (operation) => !MHS_SUPPORTED_DRAWING_OPERATIONS.has(operation),
    );
    expect(unsupportedOperations).toEqual([]);
  });
});

describe('MHS asset map', () => {
  it('maps every manifest asset to an explicit MHS declaration or browser-only note', () => {
    const missingMappings = Object.values(AssetManifest)
      .filter((entry) => !entry.browserOnly)
      .filter((entry) => (
        entry.futureMhsPath == null ||
        entry.mhsStaticRefKind == null ||
        entry.mhsTemplateKind == null ||
        MhsAssetMap[entry.id] == null
      ))
      .map((entry) => entry.id);

    expect(missingMappings).toEqual([]);
  });

  it('includes actor sizing and corrective rotation metadata for rig assets', () => {
    const rigIssues = Object.values(AssetManifest)
      .filter((entry) => entry.kind === 'rig')
      .filter((entry) => entry.actorTargetHeight == null || entry.correctiveRotationDeg == null)
      .map((entry) => entry.id);

    expect(rigIssues).toEqual([]);
  });
});

const MHS_SUPPORTED_DRAWING_OPERATIONS = new Set([
  'clear',
  'pushTranslate',
  'pushScale',
  'pushRotate',
  'pushAlpha',
  'pushClipRect',
  'pop',
  'drawRect',
  'drawEllipse',
  'drawRing',
  'hasImage',
  'drawImage',
  'drawTintedImage',
  'drawImageFrame',
  'drawTintedImageFrame',
  'drawImageAlphaMaskFill',
  'drawText',
]);

class ContractRenderer implements GameRenderer {
  readonly operations: string[] = [];

  clear(): void {
    this.operations.push('clear');
  }

  pushTranslate(_x: number, _y: number): void {
    this.operations.push('pushTranslate');
  }

  pushScale(_scaleX: number, _scaleY: number, _originX?: number, _originY?: number): void {
    this.operations.push('pushScale');
  }

  pushRotate(_degrees: number, _originX?: number, _originY?: number): void {
    this.operations.push('pushRotate');
  }

  pushAlpha(_alpha: number): void {
    this.operations.push('pushAlpha');
  }

  pushClipRect(_x: number, _y: number, _width: number, _height: number): void {
    this.operations.push('pushClipRect');
  }

  pop(): void {
    this.operations.push('pop');
  }

  drawRect(_color: string, _x: number, _y: number, _width: number, _height: number): void {
    this.operations.push('drawRect');
  }

  drawEllipse(_color: string, _centerX: number, _centerY: number, _radiusX: number, _radiusY: number): void {
    this.operations.push('drawEllipse');
  }

  drawRing(
    _color: string,
    _centerX: number,
    _centerY: number,
    _radiusX: number,
    _radiusY: number,
    _lineWidth: number,
  ): void {
    this.operations.push('drawRing');
  }

  hasImage(_image: DrawImageRef): boolean {
    this.operations.push('hasImage');
    return false;
  }

  drawImage(_image: DrawImageRef, _x: number, _y: number, _width: number, _height: number): void {
    this.operations.push('drawImage');
  }

  drawTintedImage(
    _image: DrawImageRef,
    _color: string,
    _x: number,
    _y: number,
    _width: number,
    _height: number,
  ): void {
    this.operations.push('drawTintedImage');
  }

  drawImageFrame(
    _image: DrawImageRef,
    _sourceX: number,
    _sourceY: number,
    _sourceWidth: number,
    _sourceHeight: number,
    _x: number,
    _y: number,
    _width: number,
    _height: number,
  ): void {
    this.operations.push('drawImageFrame');
  }

  drawTintedImageFrame(
    _image: DrawImageRef,
    _color: string,
    _sourceX: number,
    _sourceY: number,
    _sourceWidth: number,
    _sourceHeight: number,
    _x: number,
    _y: number,
    _width: number,
    _height: number,
  ): void {
    this.operations.push('drawTintedImageFrame');
  }

  drawImageAlphaMaskFill(
    _image: DrawImageRef,
    _color: string,
    _x: number,
    _y: number,
    _width: number,
    _height: number,
    _alpha: number,
  ): void {
    this.operations.push('drawImageAlphaMaskFill');
  }

  drawText(
    _text: string,
    _x: number,
    _y: number,
    _width: number,
    _height: number,
    _style: TextStyle,
  ): void {
    this.operations.push('drawText');
  }
}

function oneTileBoardState(): BoardRenderState {
  return {
    logicalWidth: LOGICAL_WIDTH,
    logicalHeight: LOGICAL_HEIGHT,
    boardCells: [
      {
        tileId: 'tile-0',
        coord: { col: 0, row: 0 },
        assetId: AssetIds.tiles.fire,
        tileType: 'FIRE',
        isPath: false,
        alpha: 1,
      },
    ],
    pathCells: [],
    mageCell: null,
    goalCell: null,
    hintedCells: [],
    selectedCell: null,
    queuedSwap: null,
    shakePixels: 0,
    visualCues: [],
  };
}

function hudState(): HudRenderState {
  return {
    phase: 'IDLE',
    levelText: 'Level 1',
    lives: 3,
    scoreText: '0',
    objectiveText: 'Defeat 3',
    trialEnemyCount: { defeated: 0, total: 3 },
    muted: false,
    bgmMuted: false,
    debugText: 'Seed 1',
  };
}
