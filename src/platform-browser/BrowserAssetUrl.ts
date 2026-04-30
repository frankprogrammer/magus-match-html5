export function resolveBrowserAssetUrl(url: string, baseUrl = getViteBaseUrl()): string {
  if (isAbsoluteOrSpecialUrl(url)) {
    return url;
  }

  const normalizedBase = normalizeBaseUrl(baseUrl);
  const normalizedPath = url.replace(/^\/+/, '');
  return `${normalizedBase}${normalizedPath}`;
}

function getViteBaseUrl(): string {
  const meta = import.meta as ImportMeta & { env?: { BASE_URL?: string } };
  return meta.env?.BASE_URL ?? '/';
}

function normalizeBaseUrl(baseUrl: string): string {
  if (baseUrl.trim() === '') {
    return '/';
  }

  return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
}

function isAbsoluteOrSpecialUrl(url: string): boolean {
  return /^[a-z][a-z\d+\-.]*:/i.test(url) || url.startsWith('//');
}
