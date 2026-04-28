export interface DrawImageRef {
  id: string;
}

export interface TextStyle {
  fontSize: number;
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
  pop(): void;

  drawRect(color: string, x: number, y: number, width: number, height: number): void;
  drawEllipse(color: string, centerX: number, centerY: number, radiusX: number, radiusY: number): void;
  drawImage(image: DrawImageRef, x: number, y: number, width: number, height: number): void;
  drawText(text: string, x: number, y: number, width: number, height: number, style: TextStyle): void;
}
