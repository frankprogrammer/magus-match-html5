import type { CellCoord, LogicalPoint } from '../core/Layout';
import {
  BOARD_RECT,
  LOGICAL_HEIGHT,
  LOGICAL_WIDTH,
  logicalPointToBoardCell,
} from '../core/Layout';
import type { GameInputCommand } from '../core/GameInput';
import type { LevelType } from '../core/Types';

export interface ViewportRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface ClientPoint {
  clientX: number;
  clientY: number;
}

export function clientToLogicalPoint(
  point: ClientPoint,
  viewport: ViewportRect,
): LogicalPoint {
  const scale = Math.min(viewport.width / LOGICAL_WIDTH, viewport.height / LOGICAL_HEIGHT);
  const viewWidth = LOGICAL_WIDTH * scale;
  const viewHeight = LOGICAL_HEIGHT * scale;
  const offsetX = viewport.left + (viewport.width - viewWidth) / 2;
  const offsetY = viewport.top + (viewport.height - viewHeight) / 2;

  return {
    x: (point.clientX - offsetX) / scale,
    y: (point.clientY - offsetY) / scale,
  };
}

export function parseDebugSeed(search: string): number | undefined {
  const params = new URLSearchParams(search);
  const rawSeed = params.get('seed');
  if (rawSeed == null || rawSeed.trim() === '') {
    return undefined;
  }

  const parsed = Number(rawSeed);
  if (!Number.isFinite(parsed)) {
    return undefined;
  }

  const seed = Math.trunc(parsed) >>> 0;
  return seed === 0 ? undefined : seed;
}

export function parseDebugLevelType(search: string): LevelType | undefined {
  const params = new URLSearchParams(search);
  const value = params.get('levelType')?.toUpperCase();
  return value === 'TRIAL' || value === 'JOURNEY' ? value : undefined;
}

export class BrowserInputAdapter {
  private commands: GameInputCommand[] = [];
  private dragStartCell: CellCoord | null = null;
  private dragStartPoint: LogicalPoint | null = null;

  constructor(private readonly stageElement: HTMLElement) {
    this.stageElement.addEventListener('pointerdown', this.onPointerDown);
    this.stageElement.addEventListener('pointerup', this.onPointerUp);
  }

  drainCommands(): GameInputCommand[] {
    const drained = this.commands;
    this.commands = [];
    return drained;
  }

  dispose(): void {
    this.stageElement.removeEventListener('pointerdown', this.onPointerDown);
    this.stageElement.removeEventListener('pointerup', this.onPointerUp);
  }

  private readonly onPointerDown = (event: PointerEvent): void => {
    const logicalPoint = this.eventToLogicalPoint(event);
    this.commands.push({ type: 'dragStart', x: logicalPoint.x, y: logicalPoint.y });
    this.dragStartPoint = logicalPoint;
    this.dragStartCell = logicalPointToBoardCell(logicalPoint);
  };

  private readonly onPointerUp = (event: PointerEvent): void => {
    const logicalPoint = this.eventToLogicalPoint(event);
    this.commands.push({ type: 'dragEnd', x: logicalPoint.x, y: logicalPoint.y });
    this.commands.push({ type: 'tap', x: logicalPoint.x, y: logicalPoint.y });

    const endCell = logicalPointToBoardCell(logicalPoint);
    if (this.dragStartCell != null && endCell != null && !isTapGesture(this.dragStartPoint, logicalPoint)) {
      const dCol = endCell.col - this.dragStartCell.col;
      const dRow = endCell.row - this.dragStartCell.row;
      if (Math.abs(dCol) + Math.abs(dRow) === 1) {
        this.commands.push({ type: 'swap', from: this.dragStartCell, to: endCell });
      }
    }

    this.dragStartCell = null;
    this.dragStartPoint = null;
  };

  private eventToLogicalPoint(event: PointerEvent): LogicalPoint {
    return clientToLogicalPoint(event, this.stageElement.getBoundingClientRect());
  }
}

export { BOARD_RECT, logicalPointToBoardCell };

function isTapGesture(start: LogicalPoint | null, end: LogicalPoint): boolean {
  if (start == null) {
    return true;
  }

  return Math.hypot(end.x - start.x, end.y - start.y) < 16;
}
