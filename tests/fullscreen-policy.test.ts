import { describe, expect, it } from 'vitest';
import { isMobileFullscreenTarget, shouldRequestGameFullscreen } from '../src/platform-browser/FullscreenPolicy';

describe('FullscreenPolicy', () => {
  it('treats coarse pointer no-hover environments as mobile fullscreen targets', () => {
    const matchMedia = (query: string) => ({
      matches: query === '(hover: none) and (pointer: coarse)',
    }) as MediaQueryList;

    expect(isMobileFullscreenTarget(matchMedia)).toBe(true);
  });

  it('does not request fullscreen on desktop pointer environments', () => {
    expect(shouldRequestGameFullscreen({
      requestAttempted: false,
      fullscreenElement: null,
      canRequestFullscreen: true,
      isMobileFullscreenTarget: false,
    })).toBe(false);
  });

  it('requests fullscreen on mobile when available and not already attempted', () => {
    expect(shouldRequestGameFullscreen({
      requestAttempted: false,
      fullscreenElement: null,
      canRequestFullscreen: true,
      isMobileFullscreenTarget: true,
    })).toBe(true);
  });

  it('does not request fullscreen again once attempted or already fullscreen', () => {
    expect(shouldRequestGameFullscreen({
      requestAttempted: true,
      fullscreenElement: null,
      canRequestFullscreen: true,
      isMobileFullscreenTarget: true,
    })).toBe(false);

    expect(shouldRequestGameFullscreen({
      requestAttempted: false,
      fullscreenElement: {} as Element,
      canRequestFullscreen: true,
      isMobileFullscreenTarget: true,
    })).toBe(false);
  });
});
