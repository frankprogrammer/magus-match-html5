export interface DrawImageRef {
  id: string;
}

export interface TextStyle {
  fontSize: number;
  minFontSize?: number;
  fontFamily?: string;
  fontWeight?: 'normal' | 'bold';
  color: string;
  align?: 'left' | 'center' | 'right';
}

export interface GameRenderer {
  clear(): void;

  pushTranslate(x: number, y: number): void;
  pushScale(scaleX: number, scaleY: number, originX?: number, originY?: number): void;
  pushRotate(degrees: number, originX?: number, originY?: number): void;
  pushAlpha(alpha: number): void;
  pushClipRect(x: number, y: number, width: number, height: number): void;
  pop(): void;

  drawRect(color: string, x: number, y: number, width: number, height: number): void;
  drawEllipse(color: string, centerX: number, centerY: number, radiusX: number, radiusY: number): void;
  drawRing(
    color: string,
    centerX: number,
    centerY: number,
    radiusX: number,
    radiusY: number,
    lineWidth: number,
  ): void;
  hasImage(image: DrawImageRef): boolean;
  drawImage(image: DrawImageRef, x: number, y: number, width: number, height: number): void;
  drawTintedImage(
    image: DrawImageRef,
    color: string,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void;
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
  ): void;
  drawTintedImageFrame(
    image: DrawImageRef,
    color: string,
    sourceX: number,
    sourceY: number,
    sourceWidth: number,
    sourceHeight: number,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void;
  drawImageAlphaMaskFill(
    image: DrawImageRef,
    color: string,
    x: number,
    y: number,
    width: number,
    height: number,
    alpha: number,
  ): void;
  drawText(text: string, x: number, y: number, width: number, height: number, style: TextStyle): void;
}
