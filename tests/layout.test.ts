import { describe, expect, it } from 'vitest';
import { logicalPointToBoardCell } from '../src/core/Layout';
import { clientToLogicalPoint, parseDebugLevelNumber, parseDebugSeed } from '../src/platform-browser/BrowserInputAdapter';

describe('layout mapping', () => {
  it('maps centered portrait viewport client coordinates into logical coordinates', () => {
    const logical = clientToLogicalPoint(
      { clientX: 270, clientY: 480 },
      { left: 0, top: 0, width: 540, height: 960 },
    );

    expect(logical.x).toBeCloseTo(540);
    expect(logical.y).toBeCloseTo(960);
  });

  it('maps letterboxed desktop viewport client coordinates into logical coordinates', () => {
    const logical = clientToLogicalPoint(
      { clientX: 960, clientY: 540 },
      { left: 0, top: 0, width: 1920, height: 1080 },
    );

    expect(logical.x).toBeCloseTo(540);
    expect(logical.y).toBeCloseTo(960);
  });

  it('maps logical board points to board cells', () => {
    expect(logicalPointToBoardCell({ x: 0, y: 745 })).toEqual({ col: 0, row: 0 });
    expect(logicalPointToBoardCell({ x: 134.99, y: 879.99 })).toEqual({ col: 0, row: 0 });
    expect(logicalPointToBoardCell({ x: 135, y: 880 })).toEqual({ col: 1, row: 1 });
    expect(logicalPointToBoardCell({ x: 1079.99, y: 1824.99 })).toEqual({ col: 7, row: 7 });
  });

  it('returns null for points outside the playable board', () => {
    expect(logicalPointToBoardCell({ x: -1, y: 745 })).toBeNull();
    expect(logicalPointToBoardCell({ x: 0, y: 744.99 })).toBeNull();
    expect(logicalPointToBoardCell({ x: 1080, y: 745 })).toBeNull();
    expect(logicalPointToBoardCell({ x: 0, y: 1825 })).toBeNull();
  });

  it('parses debug seeds from a URL search string', () => {
    expect(parseDebugSeed('?seed=12345')).toBe(12345);
    expect(parseDebugSeed('?seed=0')).toBeUndefined();
    expect(parseDebugSeed('?seed=not-a-number')).toBeUndefined();
    expect(parseDebugSeed('?other=123')).toBeUndefined();
  });

  it('parses debug level numbers from a URL search string', () => {
    expect(parseDebugLevelNumber('?level=2')).toBe(2);
    expect(parseDebugLevelNumber('?level=1.9')).toBe(1);
    expect(parseDebugLevelNumber('?level=0')).toBeUndefined();
    expect(parseDebugLevelNumber('?level=bad')).toBeUndefined();
    expect(parseDebugLevelNumber('?seed=123')).toBeUndefined();
  });
});
