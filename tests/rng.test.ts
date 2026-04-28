import { describe, expect, it } from 'vitest';
import { SeededRng } from '../src/core/Rng';

describe('SeededRng', () => {
  it('produces the same sequence for the same seed', () => {
    const first = new SeededRng(12345);
    const second = new SeededRng(12345);

    expect(Array.from({ length: 8 }, () => first.nextUint32())).toEqual(
      Array.from({ length: 8 }, () => second.nextUint32()),
    );
  });

  it('produces different sequences for different seeds', () => {
    const first = new SeededRng(12345);
    const second = new SeededRng(54321);

    expect(Array.from({ length: 8 }, () => first.nextUint32())).not.toEqual(
      Array.from({ length: 8 }, () => second.nextUint32()),
    );
  });

  it('returns integers inside the requested range', () => {
    const rng = new SeededRng(999);

    for (let i = 0; i < 100; i += 1) {
      const value = rng.nextInt(3, 7);
      expect(value).toBeGreaterThanOrEqual(3);
      expect(value).toBeLessThan(7);
      expect(Number.isInteger(value)).toBe(true);
    }
  });
});
