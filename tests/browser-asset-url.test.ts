import { describe, expect, it } from 'vitest';
import { resolveBrowserAssetUrl } from '../src/platform-browser/BrowserAssetUrl';

describe('resolveBrowserAssetUrl', () => {
  it('resolves root-relative manifest assets against root base', () => {
    expect(resolveBrowserAssetUrl('/assets/tiles/tile-fire.png', '/')).toBe('/assets/tiles/tile-fire.png');
  });

  it('resolves root-relative manifest assets against a project Pages base', () => {
    expect(resolveBrowserAssetUrl('/assets/tiles/tile-fire.png', '/magus-match-html5/')).toBe(
      '/magus-match-html5/assets/tiles/tile-fire.png',
    );
  });

  it('resolves root-relative manifest assets against a branch Pages base', () => {
    expect(resolveBrowserAssetUrl('/assets/tiles/tile-fire.png', '/magus-match-html5/branches/test-branch/')).toBe(
      '/magus-match-html5/branches/test-branch/assets/tiles/tile-fire.png',
    );
  });

  it('resolves root-relative manifest assets against document base when Vite base is relative', () => {
    expect(
      resolveBrowserAssetUrl('/assets/tiles/tile-fire.png', './', 'https://frankprogrammer.github.io/magus-match-html5/'),
    ).toBe('https://frankprogrammer.github.io/magus-match-html5/assets/tiles/tile-fire.png');
  });

  it('resolves branch-preview assets against document base when Vite base is relative', () => {
    expect(
      resolveBrowserAssetUrl(
        '/assets/tiles/tile-fire.png',
        './',
        'https://frankprogrammer.github.io/magus-match-html5/branches/test-branch/',
      ),
    ).toBe('https://frankprogrammer.github.io/magus-match-html5/branches/test-branch/assets/tiles/tile-fire.png');
  });

  it('ignores query strings and index filenames when resolving against a relative Vite base', () => {
    expect(
      resolveBrowserAssetUrl(
        '/assets/ui/ui-banner.png',
        './',
        'https://frankprogrammer.github.io/magus-match-html5/index.html?levelType=trial',
      ),
    ).toBe('https://frankprogrammer.github.io/magus-match-html5/assets/ui/ui-banner.png');
  });

  it('preserves external and special URLs', () => {
    expect(resolveBrowserAssetUrl('https://example.com/tile.png', '/magus-match-html5/')).toBe(
      'https://example.com/tile.png',
    );
    expect(resolveBrowserAssetUrl('data:image/png;base64,abc', '/magus-match-html5/')).toBe(
      'data:image/png;base64,abc',
    );
    expect(resolveBrowserAssetUrl('blob:https://example.com/id', '/magus-match-html5/')).toBe(
      'blob:https://example.com/id',
    );
  });
});
