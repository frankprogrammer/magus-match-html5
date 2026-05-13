export interface FullscreenRequestState {
  requestAttempted: boolean;
  fullscreenElement: Element | null;
  canRequestFullscreen: boolean;
  isMobileFullscreenTarget: boolean;
}

export interface FullscreenCapableElement {
  requestFullscreen?: () => Promise<void> | void;
  webkitRequestFullscreen?: () => Promise<void> | void;
  webkitRequestFullScreen?: () => Promise<void> | void;
}

export interface FullscreenCapableDocument {
  fullscreenElement?: Element | null;
  webkitFullscreenElement?: Element | null;
  webkitCurrentFullScreenElement?: Element | null;
}

export function isMobileFullscreenTarget(matchMedia: Window["matchMedia"]): boolean {
  return matchMedia("(hover: none) and (pointer: coarse)").matches;
}

export function getActiveFullscreenElement(documentLike: FullscreenCapableDocument): Element | null {
  return (
    documentLike.fullscreenElement ??
    documentLike.webkitFullscreenElement ??
    documentLike.webkitCurrentFullScreenElement ??
    null
  );
}

export function canRequestElementFullscreen(element: FullscreenCapableElement): boolean {
  return fullscreenRequestFunctionForElement(element) != null;
}

export function requestElementFullscreen(element: FullscreenCapableElement): Promise<void> {
  const request = fullscreenRequestFunctionForElement(element);
  if (request == null) {
    return Promise.reject(new Error("Fullscreen request is not supported by this browser."));
  }

  return Promise.resolve(request.call(element));
}

export function shouldRequestGameFullscreen(state: FullscreenRequestState): boolean {
  return (
    state.isMobileFullscreenTarget &&
    !state.requestAttempted &&
    state.fullscreenElement == null &&
    state.canRequestFullscreen
  );
}

function fullscreenRequestFunctionForElement(
  element: FullscreenCapableElement,
): (() => Promise<void> | void) | null {
  return (
    element.requestFullscreen ??
    element.webkitRequestFullscreen ??
    element.webkitRequestFullScreen ??
    null
  );
}
