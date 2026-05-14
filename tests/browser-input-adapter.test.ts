import { describe, expect, it } from 'vitest';
import {
  BOARD_RECT,
  BrowserInputAdapter,
  parseOneLifeDoubleSpeedFlag,
  SWAP_DRAG_THRESHOLD_PX,
} from '../src/platform-browser/BrowserInputAdapter';
import { LOGICAL_HEIGHT, LOGICAL_WIDTH } from '../src/core/Layout';

describe('BrowserInputAdapter', () => {
  it('parses the one-life double-speed URL flag by presence', () => {
    expect(parseOneLifeDoubleSpeedFlag('?oneLifeDoubleSpeed')).toBe(true);
    expect(parseOneLifeDoubleSpeedFlag('?seed=123&oneLifeDoubleSpeed=0')).toBe(true);
    expect(parseOneLifeDoubleSpeedFlag('?seed=123')).toBe(false);
  });

  it('emits one horizontal swap when a drag crosses the directional threshold', () => {
    const stage = new FakeStageElement();
    const adapter = new BrowserInputAdapter(stage.asElement());
    const start = cellCenter(2, 3);

    stage.dispatchPointer('pointerdown', start);
    stage.dispatchPointer('pointermove', { x: start.x + SWAP_DRAG_THRESHOLD_PX + 1, y: start.y + 5 });

    expect(adapter.drainCommands()).toEqual([
      { type: 'dragStart', x: start.x, y: start.y },
      { type: 'swap', from: { col: 2, row: 3 }, to: { col: 3, row: 3 } },
    ]);

    stage.dispatchPointer('pointerup', { x: start.x + SWAP_DRAG_THRESHOLD_PX + 1, y: start.y + 5 });

    expect(adapter.drainCommands()).toEqual([
      { type: 'dragEnd', x: start.x + SWAP_DRAG_THRESHOLD_PX + 1, y: start.y + 5 },
    ]);
    expect(stage.capturedPointerIds).toEqual([1]);
    expect(stage.releasedPointerIds).toEqual([1]);
  });

  it('emits one vertical swap when vertical motion is dominant', () => {
    const stage = new FakeStageElement();
    const adapter = new BrowserInputAdapter(stage.asElement());
    const start = cellCenter(2, 3);

    stage.dispatchPointer('pointerdown', start);
    stage.dispatchPointer('pointermove', { x: start.x + 4, y: start.y - SWAP_DRAG_THRESHOLD_PX - 1 });

    expect(adapter.drainCommands()).toEqual([
      { type: 'dragStart', x: start.x, y: start.y },
      { type: 'swap', from: { col: 2, row: 3 }, to: { col: 2, row: 2 } },
    ]);
  });

  it('keeps short movement as a tap', () => {
    const stage = new FakeStageElement();
    const adapter = new BrowserInputAdapter(stage.asElement());
    const start = cellCenter(2, 3);
    const end = { x: start.x + 10, y: start.y + 4 };

    stage.dispatchPointer('pointerdown', start);
    stage.dispatchPointer('pointermove', end);
    stage.dispatchPointer('pointerup', end);

    expect(adapter.drainCommands()).toEqual([
      { type: 'dragStart', x: start.x, y: start.y },
      { type: 'dragEnd', x: end.x, y: end.y },
      { type: 'tap', x: end.x, y: end.y },
    ]);
  });

  it('preserves release-based adjacent swaps when no threshold move was emitted', () => {
    const stage = new FakeStageElement();
    const adapter = new BrowserInputAdapter(stage.asElement());
    const start = cellCenter(2, 3);
    const end = cellCenter(3, 3);

    stage.dispatchPointer('pointerdown', start);
    stage.dispatchPointer('pointerup', end);

    expect(adapter.drainCommands()).toEqual([
      { type: 'dragStart', x: start.x, y: start.y },
      { type: 'dragEnd', x: end.x, y: end.y },
      { type: 'swap', from: { col: 2, row: 3 }, to: { col: 3, row: 3 } },
    ]);
  });

  it('emits a directional swap on pointerup before release enters the adjacent cell', () => {
    const stage = new FakeStageElement();
    const adapter = new BrowserInputAdapter(stage.asElement());
    const start = cellCenter(0, 0);
    const end = { x: start.x + SWAP_DRAG_THRESHOLD_PX + 1, y: start.y };

    expect(end.x).toBeLessThan(BOARD_RECT.x + BOARD_RECT.cellSize);

    stage.dispatchPointer('pointerdown', start);
    stage.dispatchPointer('pointerup', end);

    expect(adapter.drainCommands()).toEqual([
      { type: 'dragStart', x: start.x, y: start.y },
      { type: 'dragEnd', x: end.x, y: end.y },
      { type: 'swap', from: { col: 0, row: 0 }, to: { col: 1, row: 0 } },
    ]);
  });

  it('does not emit a threshold swap outside the board', () => {
    const stage = new FakeStageElement();
    const adapter = new BrowserInputAdapter(stage.asElement());
    const start = cellCenter(0, 0);

    stage.dispatchPointer('pointerdown', start);
    stage.dispatchPointer('pointermove', { x: start.x - SWAP_DRAG_THRESHOLD_PX - 1, y: start.y });
    stage.dispatchPointer('pointerup', { x: start.x - SWAP_DRAG_THRESHOLD_PX - 1, y: start.y });

    expect(adapter.drainCommands()).toEqual([
      { type: 'dragStart', x: start.x, y: start.y },
      { type: 'dragEnd', x: start.x - SWAP_DRAG_THRESHOLD_PX - 1, y: start.y },
    ]);
  });
});

function cellCenter(col: number, row: number): { x: number; y: number } {
  return {
    x: BOARD_RECT.x + (col + 0.5) * BOARD_RECT.cellSize,
    y: BOARD_RECT.y + (row + 0.5) * BOARD_RECT.cellSize,
  };
}

type PointerHandler = (event: PointerEvent) => void;

class FakeStageElement {
  readonly capturedPointerIds: number[] = [];
  readonly releasedPointerIds: number[] = [];
  private readonly handlers = new Map<string, PointerHandler[]>();

  asElement(): HTMLElement {
    return this as unknown as HTMLElement;
  }

  addEventListener(type: string, handler: PointerHandler): void {
    this.handlers.set(type, [...(this.handlers.get(type) ?? []), handler]);
  }

  removeEventListener(type: string, handler: PointerHandler): void {
    this.handlers.set(
      type,
      (this.handlers.get(type) ?? []).filter((candidate) => candidate !== handler),
    );
  }

  getBoundingClientRect(): DOMRect {
    return {
      left: 0,
      top: 0,
      width: LOGICAL_WIDTH,
      height: LOGICAL_HEIGHT,
      right: LOGICAL_WIDTH,
      bottom: LOGICAL_HEIGHT,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect;
  }

  setPointerCapture(pointerId: number): void {
    this.capturedPointerIds.push(pointerId);
  }

  releasePointerCapture(pointerId: number): void {
    this.releasedPointerIds.push(pointerId);
  }

  dispatchPointer(type: string, point: { x: number; y: number }, pointerId = 1): void {
    const event = {
      clientX: point.x,
      clientY: point.y,
      pointerId,
      preventDefault: () => undefined,
    } as unknown as PointerEvent;
    for (const handler of this.handlers.get(type) ?? []) {
      handler(event);
    }
  }
}
