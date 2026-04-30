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
});

class FakeCanvasContext {
  font = '';
  fillStyle = '';
  textAlign = '';
  textBaseline = '';
  globalAlpha = 1;
  readonly fillTextCalls: Array<{ text: string; font: string; maxWidth?: number }> = [];

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
  drawImage(): void {}
}
