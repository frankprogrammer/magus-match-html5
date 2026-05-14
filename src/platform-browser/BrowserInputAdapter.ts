import type { CellCoord, LogicalPoint } from '../core/Layout';
import {
  BOARD_RECT,
  BOARD_SIZE,
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

export const SWAP_DRAG_THRESHOLD_PX = BOARD_RECT.cellSize * 0.35;

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

export function parseDebugLevelNumber(search: string): number | undefined {
  const params = new URLSearchParams(search);
  const rawLevel = params.get('level');
  if (rawLevel == null || rawLevel.trim() === '') {
    return undefined;
  }

  const parsed = Number(rawLevel);
  if (!Number.isFinite(parsed)) {
    return undefined;
  }

  const level = Math.trunc(parsed);
  return level >= 1 ? level : undefined;
}

export function parseOneLifeDoubleSpeedFlag(search: string): boolean {
  return new URLSearchParams(search).has('oneLifeDoubleSpeed');
}

export class BrowserInputAdapter {
  private commands: GameInputCommand[] = [];
  private dragStartCell: CellCoord | null = null;
  private dragStartPoint: LogicalPoint | null = null;
  private activePointerId: number | null = null;
  private dragConsumed = false;

  constructor(private readonly stageElement: HTMLElement) {
    this.stageElement.addEventListener('pointerdown', this.onPointerDown);
    this.stageElement.addEventListener('pointermove', this.onPointerMove);
    this.stageElement.addEventListener('pointerup', this.onPointerUp);
    this.stageElement.addEventListener('pointercancel', this.onPointerCancel);
  }

  drainCommands(): GameInputCommand[] {
    const drained = this.commands;
    this.commands = [];
    return drained;
  }

  dispose(): void {
    this.stageElement.removeEventListener('pointerdown', this.onPointerDown);
    this.stageElement.removeEventListener('pointermove', this.onPointerMove);
    this.stageElement.removeEventListener('pointerup', this.onPointerUp);
    this.stageElement.removeEventListener('pointercancel', this.onPointerCancel);
  }

  private readonly onPointerDown = (event: PointerEvent): void => {
    const logicalPoint = this.eventToLogicalPoint(event);
    this.commands.push({ type: 'dragStart', x: logicalPoint.x, y: logicalPoint.y });
    this.dragStartPoint = logicalPoint;
    this.dragStartCell = logicalPointToBoardCell(logicalPoint);
    this.activePointerId = event.pointerId;
    this.dragConsumed = false;
    this.stageElement.setPointerCapture?.(event.pointerId);
  };

  private readonly onPointerMove = (event: PointerEvent): void => {
    if (this.activePointerId !== event.pointerId || this.dragConsumed) {
      return;
    }

    const swap = this.getThresholdSwap(this.eventToLogicalPoint(event));
    if (swap == null) {
      return;
    }

    event.preventDefault();
    this.commands.push({ type: 'swap', from: swap.from, to: swap.to });
    this.dragConsumed = true;
  };

  private readonly onPointerUp = (event: PointerEvent): void => {
    if (this.activePointerId !== event.pointerId) {
      return;
    }

    const logicalPoint = this.eventToLogicalPoint(event);
    this.commands.push({ type: 'dragEnd', x: logicalPoint.x, y: logicalPoint.y });
    const isTap = isTapGesture(this.dragStartPoint, logicalPoint);

    const endCell = logicalPointToBoardCell(logicalPoint);
    if (!this.dragConsumed) {
      const thresholdSwap = this.getThresholdSwap(logicalPoint);
      if (thresholdSwap != null) {
        this.commands.push({ type: 'swap', from: thresholdSwap.from, to: thresholdSwap.to });
        this.dragConsumed = true;
      }
    }

    if (isTap && !this.dragConsumed) {
      this.commands.push({ type: 'tap', x: logicalPoint.x, y: logicalPoint.y });
    }

    if (this.dragStartCell != null && endCell != null && !isTap && !this.dragConsumed) {
      const dCol = endCell.col - this.dragStartCell.col;
      const dRow = endCell.row - this.dragStartCell.row;
      if (Math.abs(dCol) + Math.abs(dRow) === 1) {
        this.commands.push({ type: 'swap', from: this.dragStartCell, to: endCell });
      }
    }

    this.finishPointer(event.pointerId);
  };

  private readonly onPointerCancel = (event: PointerEvent): void => {
    if (this.activePointerId === event.pointerId) {
      this.finishPointer(event.pointerId);
    }
  };

  private eventToLogicalPoint(event: PointerEvent): LogicalPoint {
    return clientToLogicalPoint(event, this.stageElement.getBoundingClientRect());
  }

  private getThresholdSwap(currentPoint: LogicalPoint): { from: CellCoord; to: CellCoord } | null {
    if (this.dragStartCell == null || this.dragStartPoint == null) {
      return null;
    }

    const deltaX = currentPoint.x - this.dragStartPoint.x;
    const deltaY = currentPoint.y - this.dragStartPoint.y;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    if (Math.max(absX, absY) < SWAP_DRAG_THRESHOLD_PX) {
      return null;
    }

    const to =
      absX >= absY
        ? { col: this.dragStartCell.col + Math.sign(deltaX), row: this.dragStartCell.row }
        : { col: this.dragStartCell.col, row: this.dragStartCell.row + Math.sign(deltaY) };
    if (!isBoardCoord(to)) {
      return null;
    }

    return { from: this.dragStartCell, to };
  }

  private finishPointer(pointerId: number): void {
    this.stageElement.releasePointerCapture?.(pointerId);
    this.dragStartCell = null;
    this.dragStartPoint = null;
    this.activePointerId = null;
    this.dragConsumed = false;
  }
}

export { BOARD_RECT, logicalPointToBoardCell };

function isTapGesture(start: LogicalPoint | null, end: LogicalPoint): boolean {
  if (start == null) {
    return true;
  }

  return Math.hypot(end.x - start.x, end.y - start.y) < 16;
}

function isBoardCoord(coord: CellCoord): boolean {
  return coord.col >= 0 && coord.row >= 0 && coord.col < BOARD_SIZE && coord.row < BOARD_SIZE;
}
