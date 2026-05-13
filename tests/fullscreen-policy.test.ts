import { describe, expect, it } from 'vitest';
import {
  canRequestElementFullscreen,
  getActiveFullscreenElement,
  isMobileFullscreenTarget,
  requestElementFullscreen,
  shouldRequestGameFullscreen,
} from '../src/platform-browser/FullscreenPolicy';

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

  it('detects standard and WebKit fullscreen request support', () => {
    expect(canRequestElementFullscreen({ requestFullscreen: () => undefined })).toBe(true);
    expect(canRequestElementFullscreen({ webkitRequestFullscreen: () => undefined })).toBe(true);
    expect(canRequestElementFullscreen({ webkitRequestFullScreen: () => undefined })).toBe(true);
    expect(canRequestElementFullscreen({})).toBe(false);
  });

  it('requests fullscreen through the WebKit prefixed mobile API when needed', async () => {
    let requested = false;
    const element = {
      webkitRequestFullscreen: () => {
        requested = true;
      },
    };

    await requestElementFullscreen(element);

    expect(requested).toBe(true);
  });

  it('detects active fullscreen elements from standard or WebKit document fields', () => {
    const standard = {} as Element;
    const webkit = {} as Element;
    const legacyWebkit = {} as Element;

    expect(getActiveFullscreenElement({ fullscreenElement: standard })).toBe(standard);
    expect(getActiveFullscreenElement({ webkitFullscreenElement: webkit })).toBe(webkit);
    expect(getActiveFullscreenElement({ webkitCurrentFullScreenElement: legacyWebkit })).toBe(legacyWebkit);
    expect(getActiveFullscreenElement({})).toBeNull();
  });
});
