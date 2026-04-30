import type { AssetManifestEntry } from '../assets/AssetManifest';
import { getTextureAssetEntries } from '../assets/AssetManifest';
import { resolveBrowserAssetUrl } from './BrowserAssetUrl';

export type BrowserImageMap = Record<string, HTMLImageElement>;

export async function loadBrowserImages(
  entries: readonly AssetManifestEntry[] = getTextureAssetEntries(),
): Promise<BrowserImageMap> {
  const loadedEntries = await Promise.all(entries.map(loadImageEntry));
  return Object.fromEntries(
    loadedEntries.filter((entry): entry is [string, HTMLImageElement] => entry != null),
  );
}

function loadImageEntry(entry: AssetManifestEntry): Promise<[string, HTMLImageElement] | null> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve([entry.id, image]);
    image.onerror = () => resolve(null);
    image.src = resolveBrowserAssetUrl(entry.browserUrl);
  });
}
