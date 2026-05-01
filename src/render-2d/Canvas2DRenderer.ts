import type { DrawImageRef, GameRenderer, TextStyle } from './GameRenderer';

export class Canvas2DRenderer implements GameRenderer {
  private maskCanvas: HTMLCanvasElement | null = null;
  private maskCtx: CanvasRenderingContext2D | null = null;

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

  pushClipRect(x: number, y: number, width: number, height: number): void {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    this.ctx.clip();
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

  drawRing(
    color: string,
    centerX: number,
    centerY: number,
    radiusX: number,
    radiusY: number,
    lineWidth: number,
  ): void {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.beginPath();
    this.ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
    this.ctx.stroke();
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

  drawImageFrame(
    image: DrawImageRef,
    sourceX: number,
    sourceY: number,
    sourceWidth: number,
    sourceHeight: number,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    const img = this.images[image.id];
    if (img == null || sourceWidth <= 0 || sourceHeight <= 0 || width <= 0 || height <= 0) {
      return;
    }

    this.ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
  }

  drawImageAlphaMaskFill(
    image: DrawImageRef,
    color: string,
    x: number,
    y: number,
    width: number,
    height: number,
    alpha: number,
  ): void {
    const img = this.images[image.id];
    if (img == null || width <= 0 || height <= 0 || alpha <= 0) {
      return;
    }

    const maskCtx = this.getMaskContext(Math.ceil(width), Math.ceil(height));
    if (maskCtx == null) {
      return;
    }

    const maskWidth = Math.ceil(width);
    const maskHeight = Math.ceil(height);
    maskCtx.clearRect(0, 0, maskWidth, maskHeight);
    maskCtx.globalCompositeOperation = 'source-over';
    maskCtx.globalAlpha = 1;
    maskCtx.drawImage(img, 0, 0, maskWidth, maskHeight);
    maskCtx.globalCompositeOperation = 'source-in';
    maskCtx.globalAlpha = Math.max(0, Math.min(1, alpha));
    maskCtx.fillStyle = color;
    maskCtx.fillRect(0, 0, maskWidth, maskHeight);
    maskCtx.globalAlpha = 1;
    maskCtx.globalCompositeOperation = 'source-over';

    this.ctx.drawImage(maskCtx.canvas, 0, 0, maskWidth, maskHeight, x, y, width, height);
  }

  drawText(text: string, x: number, y: number, width: number, height: number, style: TextStyle): void {
    this.ctx.fillStyle = style.color;
    this.ctx.font = fontString(style, style.fontSize);
    const minFontSize = Math.min(style.fontSize, style.minFontSize ?? style.fontSize);
    let fittedFontSize = style.fontSize;
    while (fittedFontSize > minFontSize && this.ctx.measureText(text).width > width) {
      fittedFontSize -= 1;
      this.ctx.font = fontString(style, fittedFontSize);
    }
    this.ctx.textAlign = style.align ?? 'left';
    this.ctx.textBaseline = 'middle';
    const tx = style.align === 'center' ? x + width / 2 : style.align === 'right' ? x + width : x;
    this.ctx.fillText(text, tx, y + height / 2, width);
  }

  private getMaskContext(width: number, height: number): CanvasRenderingContext2D | null {
    if (this.maskCanvas == null) {
      if (typeof document === 'undefined') {
        return null;
      }

      this.maskCanvas = document.createElement('canvas');
      this.maskCtx = this.maskCanvas.getContext('2d');
    }

    if (this.maskCtx == null || this.maskCanvas == null) {
      return null;
    }

    if (this.maskCanvas.width < width) {
      this.maskCanvas.width = width;
    }
    if (this.maskCanvas.height < height) {
      this.maskCanvas.height = height;
    }

    return this.maskCtx;
  }
}

function fontString(style: TextStyle, fontSize: number): string {
  return `${style.fontWeight ?? 'normal'} ${fontSize}px ${style.fontFamily ?? 'Inter, Arial, sans-serif'}`;
}
