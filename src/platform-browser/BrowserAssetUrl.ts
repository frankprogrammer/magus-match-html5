/// <reference types="vite/client" />

const VITE_BASE_URL = import.meta.env.BASE_URL;

export function resolveBrowserAssetUrl(
  url: string,
  baseUrl = VITE_BASE_URL,
  documentBaseUrl = getDocumentBaseUrl(),
): string {
  if (isAbsoluteOrSpecialUrl(url)) {
    return url;
  }

  const normalizedPath = url.replace(/^\/+/, '');

  if (isRelativeBaseUrl(baseUrl)) {
    if (documentBaseUrl != null) {
      return new URL(normalizedPath, toDirectoryBaseUrl(documentBaseUrl)).toString();
    }

    return `./${normalizedPath}`;
  }

  const normalizedBase = normalizeBaseUrl(baseUrl);
  return `${normalizedBase}${normalizedPath}`;
}

function getDocumentBaseUrl(): string | undefined {
  return typeof document === 'undefined' ? undefined : document.baseURI;
}

function normalizeBaseUrl(baseUrl: string): string {
  if (baseUrl.trim() === '') {
    return '/';
  }

  return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
}

function isRelativeBaseUrl(baseUrl: string): boolean {
  const trimmedBase = baseUrl.trim();
  return trimmedBase === '' || trimmedBase === './' || trimmedBase === '.';
}

function toDirectoryBaseUrl(baseUrl: string): string {
  try {
    return new URL('.', baseUrl).toString();
  } catch {
    return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  }
}

function isAbsoluteOrSpecialUrl(url: string): boolean {
  return /^[a-z][a-z\d+\-.]*:/i.test(url) || url.startsWith('//');
}
