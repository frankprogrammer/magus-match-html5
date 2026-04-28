import type { DrawImageRef, GameRenderer, TextStyle } from './GameRenderer';

export class Canvas2DRenderer implements GameRenderer {
  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private images: Record<string, HTMLImageElement>,
    private readonly width: number,
    private readonly height: number,
  ) {}

  setImages(images: Record<string, HTMLImageElement>): void {
    this.images = images;
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  pushTranslate(x: number, y: number): void {
    this.ctx.save();
    this.ctx.translate(x, y);
  }

  pushScale(scaleX: number, scaleY: number, originX = 0, originY = 0): void {
    this.ctx.save();
    this.ctx.translate(originX, originY);
    this.ctx.scale(scaleX, scaleY);
    this.ctx.translate(-originX, -originY);
  }

  pushRotate(degrees: number, originX = 0, originY = 0): void {
    this.ctx.save();
    this.ctx.translate(originX, originY);
    this.ctx.rotate((degrees * Math.PI) / 180);
    this.ctx.translate(-originX, -originY);
  }

  pushAlpha(alpha: number): void {
    this.ctx.save();
    this.ctx.globalAlpha *= Math.max(0, Math.min(1, alpha));
  }

  pop(): void {
    this.ctx.restore();
  }

  drawRect(color: string, x: number, y: number, width: number, height: number): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  drawEllipse(color: string, centerX: number, centerY: number, radiusX: number, radiusY: number): void {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
    this.ctx.fill();
  }

  hasImage(image: DrawImageRef): boolean {
    return this.images[image.id] != null;
  }

  drawImage(image: DrawImageRef, x: number, y: number, width: number, height: number): void {
    const img = this.images[image.id];
    if (img == null) {
      return;
    }

    this.ctx.drawImage(img, x, y, width, height);
  }

  drawText(text: string, x: number, y: number, width: number, height: number, style: TextStyle): void {
    this.ctx.fillStyle = style.color;
    this.ctx.font = `${style.fontWeight ?? 'normal'} ${style.fontSize}px ${
      style.fontFamily ?? 'Inter, Arial, sans-serif'
    }`;
    this.ctx.textAlign = style.align ?? 'left';
    this.ctx.textBaseline = 'middle';
    const tx = style.align === 'center' ? x + width / 2 : style.align === 'right' ? x + width : x;
    this.ctx.fillText(text, tx, y + height / 2, width);
  }
}
