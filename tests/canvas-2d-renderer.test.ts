import { describe, expect, it } from 'vitest';
import { Canvas2DRenderer } from '../src/render-2d/Canvas2DRenderer';

describe('Canvas2DRenderer', () => {
  it('reduces long text font size down to the configured minimum', () => {
    const ctx = new FakeCanvasContext();
    const renderer = new Canvas2DRenderer(ctx.asCanvasContext(), {}, 1080, 1920);

    renderer.drawText('999999999999999999', 0, 0, 120, 40, {
      fontSize: 34,
      minFontSize: 20,
      fontWeight: 'bold',
      color: '#ffffff',
    });

    expect(ctx.fillTextCalls[0]?.font).toBe('bold 20px Inter, Arial, sans-serif');
  });

  it('keeps the requested font size when text already fits', () => {
    const ctx = new FakeCanvasContext();
    const renderer = new Canvas2DRenderer(ctx.asCanvasContext(), {}, 1080, 1920);

    renderer.drawText('Score 10', 0, 0, 300, 40, {
      fontSize: 34,
      minFontSize: 20,
      fontWeight: 'bold',
      color: '#ffffff',
    });

    expect(ctx.fillTextCalls[0]?.font).toBe('bold 34px Inter, Arial, sans-serif');
  });

  it('draws rings with stroke style and line width', () => {
    const ctx = new FakeCanvasContext();
    const renderer = new Canvas2DRenderer(ctx.asCanvasContext(), {}, 1080, 1920);

    renderer.drawRing('#ffffff', 10, 20, 30, 40, 6);

    expect(ctx.strokeStyle).toBe('#ffffff');
    expect(ctx.lineWidth).toBe(6);
    expect(ctx.strokeCount).toBe(1);
  });

  it('draws image frames with a source rectangle', () => {
    const ctx = new FakeCanvasContext();
    const image = {} as HTMLImageElement;
    const renderer = new Canvas2DRenderer(ctx.asCanvasContext(), { 'sprite.tnt': image }, 1080, 1920);

    renderer.drawImageFrame({ id: 'sprite.tnt' }, 128, 0, 128, 128, 10, 20, 270, 270);

    expect(ctx.drawImageCalls[0]).toMatchObject({
      image,
      sx: 128,
      sy: 0,
      sWidth: 128,
      sHeight: 128,
      x: 10,
      y: 20,
      width: 270,
      height: 270,
    });
  });

  it('draws tinted image frames through an offscreen canvas preserving active source and alpha', () => {
    const ctx = new FakeCanvasContext();
    const tintCtx = new FakeCanvasContext();
    const tintCanvas = new FakeCanvas(tintCtx);
    const originalDocument = globalThis.document;
    Object.defineProperty(globalThis, 'document', {
      value: {
        createElement: () => tintCanvas,
      },
      configurable: true,
    });

    try {
      const image = {} as HTMLImageElement;
      const renderer = new Canvas2DRenderer(ctx.asCanvasContext(), { 'sprite.orb': image }, 1080, 1920);

      renderer.drawTintedImageFrame({ id: 'sprite.orb' }, '#38d5ff', 128, 0, 128, 128, 10, 20, 30, 40);

      expect(tintCanvas.width).toBe(30);
      expect(tintCanvas.height).toBe(40);
      expect(tintCtx.drawImageCalls[0]).toMatchObject({
        image,
        sx: 128,
        sy: 0,
        sWidth: 128,
        sHeight: 128,
        x: 0,
        y: 0,
        width: 30,
        height: 40,
      });
      expect(tintCtx.globalCompositeOperationHistory).toContain('multiply');
      expect(tintCtx.globalCompositeOperationHistory).toContain('destination-in');
      expect(tintCtx.fillStyle).toBe('#38d5ff');
      expect(ctx.drawImageCalls[0]).toMatchObject({
        image: tintCanvas,
        sx: 0,
        sy: 0,
        sWidth: 30,
        sHeight: 40,
        x: 10,
        y: 20,
        width: 30,
        height: 40,
      });
    } finally {
      Object.defineProperty(globalThis, 'document', {
        value: originalDocument,
        configurable: true,
      });
    }
  });

  it('draws image alpha mask fills through an offscreen canvas', () => {
    const ctx = new FakeCanvasContext();
    const maskCtx = new FakeCanvasContext();
    const maskCanvas = new FakeCanvas(maskCtx);
    const originalDocument = globalThis.document;
    Object.defineProperty(globalThis, 'document', {
      value: {
        createElement: () => maskCanvas,
      },
      configurable: true,
    });

    try {
      const image = {} as HTMLImageElement;
      const renderer = new Canvas2DRenderer(ctx.asCanvasContext(), { 'tile.fire': image }, 1080, 1920);

      renderer.drawImageAlphaMaskFill({ id: 'tile.fire' }, '#ffffff', 10, 20, 30, 40, 0.5);

      expect(maskCanvas.width).toBe(30);
      expect(maskCanvas.height).toBe(40);
      expect(maskCtx.drawImageCalls[0]?.image).toBe(image);
      expect(maskCtx.globalCompositeOperationHistory).toContain('source-in');
      expect(maskCtx.fillStyle).toBe('#ffffff');
      expect(maskCtx.globalAlphaHistory).toContain(0.5);
      expect(ctx.drawImageCalls[0]?.image).toBe(maskCanvas);
      expect(ctx.drawImageCalls[0]).toMatchObject({
        sx: 0,
        sy: 0,
        sWidth: 30,
        sHeight: 40,
        x: 10,
        y: 20,
        width: 30,
        height: 40,
      });
    } finally {
      Object.defineProperty(globalThis, 'document', {
        value: originalDocument,
        configurable: true,
      });
    }
  });

  it('draws only the active mask region when reusing a larger offscreen canvas', () => {
    const ctx = new FakeCanvasContext();
    const maskCtx = new FakeCanvasContext();
    const maskCanvas = new FakeCanvas(maskCtx);
    const originalDocument = globalThis.document;
    Object.defineProperty(globalThis, 'document', {
      value: {
        createElement: () => maskCanvas,
      },
      configurable: true,
    });

    try {
      const image = {} as HTMLImageElement;
      const renderer = new Canvas2DRenderer(ctx.asCanvasContext(), { 'tile.fire': image }, 1080, 1920);

      renderer.drawImageAlphaMaskFill({ id: 'tile.fire' }, '#ffffff', 0, 0, 128, 128, 0.5);
      renderer.drawImageAlphaMaskFill({ id: 'tile.fire' }, '#ffffff', 10, 20, 30, 40, 0.5);

      expect(maskCanvas.width).toBe(128);
      expect(maskCanvas.height).toBe(128);
      expect(ctx.drawImageCalls[1]).toMatchObject({
        image: maskCanvas,
        sx: 0,
        sy: 0,
        sWidth: 30,
        sHeight: 40,
        x: 10,
        y: 20,
        width: 30,
        height: 40,
      });
    } finally {
      Object.defineProperty(globalThis, 'document', {
        value: originalDocument,
        configurable: true,
      });
    }
  });

  it('ignores missing image alpha mask fills without throwing', () => {
    const ctx = new FakeCanvasContext();
    const renderer = new Canvas2DRenderer(ctx.asCanvasContext(), {}, 1080, 1920);

    renderer.drawImageAlphaMaskFill({ id: 'missing' }, '#ffffff', 10, 20, 30, 40, 0.5);

    expect(ctx.drawImageCalls).toEqual([]);
  });
});

class FakeCanvasContext {
  font = '';
  fillStyle = '';
  strokeStyle = '';
  lineWidth = 1;
  textAlign = '';
  textBaseline = '';
  strokeCount = 0;
  private currentGlobalAlpha = 1;
  private currentGlobalCompositeOperation = 'source-over';
  readonly fillTextCalls: Array<{ text: string; font: string; maxWidth?: number }> = [];
  readonly drawImageCalls: Array<{
    image: unknown;
    sx?: number;
    sy?: number;
    sWidth?: number;
    sHeight?: number;
    x: number;
    y: number;
    width: number;
    height: number;
  }> = [];
  readonly globalAlphaHistory: number[] = [];
  readonly globalCompositeOperationHistory: string[] = [];
  canvas: FakeCanvas;

  constructor() {
    this.canvas = new FakeCanvas(this);
  }

  get globalAlpha(): number {
    return this.currentGlobalAlpha;
  }

  set globalAlpha(value: number) {
    this.currentGlobalAlpha = value;
    this.globalAlphaHistory.push(value);
  }

  get globalCompositeOperation(): string {
    return this.currentGlobalCompositeOperation;
  }

  set globalCompositeOperation(value: string) {
    this.currentGlobalCompositeOperation = value;
    this.globalCompositeOperationHistory.push(value);
  }

  asCanvasContext(): CanvasRenderingContext2D {
    return this as unknown as CanvasRenderingContext2D;
  }

  measureText(text: string): TextMetrics {
    const fontSize = Number(this.font.match(/ (\d+)px /)?.[1] ?? 16);
    return { width: text.length * fontSize * 0.62 } as TextMetrics;
  }

  fillText(text: string, _x: number, _y: number, maxWidth?: number): void {
    this.fillTextCalls.push({ text, font: this.font, maxWidth });
  }

  clearRect(): void {}
  save(): void {}
  translate(): void {}
  scale(): void {}
  rotate(): void {}
  beginPath(): void {}
  rect(): void {}
  clip(): void {}
  restore(): void {}
  fillRect(): void {}
  ellipse(): void {}
  fill(): void {}
  stroke(): void {
    this.strokeCount += 1;
  }
  drawImage(
    image: unknown,
    first: number,
    second: number,
    third: number,
    fourth: number,
    fifth?: number,
    sixth?: number,
    seventh?: number,
    eighth?: number,
  ): void {
    if (
      fifth != null &&
      sixth != null &&
      seventh != null &&
      eighth != null
    ) {
      this.drawImageCalls.push({
        image,
        sx: first,
        sy: second,
        sWidth: third,
        sHeight: fourth,
        x: fifth,
        y: sixth,
        width: seventh,
        height: eighth,
      });
      return;
    }

    this.drawImageCalls.push({ image, x: first, y: second, width: third, height: fourth });
  }
}

class FakeCanvas {
  width = 0;
  height = 0;
  private readonly ctx: FakeCanvasContext;

  constructor(ctx: FakeCanvasContext) {
    this.ctx = ctx;
    this.ctx.canvas = this;
  }

  getContext(contextId: string): CanvasRenderingContext2D | null {
    return contextId === '2d' ? this.ctx.asCanvasContext() : null;
  }
}
