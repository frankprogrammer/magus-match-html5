const DEFAULT_SEED = 0x9e3779b9;

export class SeededRng {
  private state: number;

  constructor(seed = DEFAULT_SEED) {
    this.state = seed >>> 0;
    if (this.state === 0) {
      this.state = DEFAULT_SEED;
    }
  }

  nextUint32(): number {
    let x = this.state;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    this.state = x >>> 0;
    return this.state;
  }

  nextFloat(): number {
    return this.nextUint32() / 0x100000000;
  }

  nextInt(minInclusive: number, maxExclusive: number): number {
    if (!Number.isInteger(minInclusive) || !Number.isInteger(maxExclusive)) {
      throw new Error('nextInt bounds must be integers.');
    }

    if (maxExclusive <= minInclusive) {
      throw new Error('nextInt maxExclusive must be greater than minInclusive.');
    }

    return minInclusive + Math.floor(this.nextFloat() * (maxExclusive - minInclusive));
  }

  getState(): number {
    return this.state;
  }
}

export function createRandomSeed(): number {
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    return values[0] === 0 ? DEFAULT_SEED : values[0];
  }

  const seed = Math.floor(Math.random() * 0xffffffff) >>> 0;
  return seed === 0 ? DEFAULT_SEED : seed;
}
