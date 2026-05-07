export interface FullscreenRequestState {
  requestAttempted: boolean;
  fullscreenElement: Element | null;
  canRequestFullscreen: boolean;
  isMobileFullscreenTarget: boolean;
}

export function isMobileFullscreenTarget(matchMedia: Window["matchMedia"]): boolean {
  return matchMedia("(hover: none) and (pointer: coarse)").matches;
}

export function shouldRequestGameFullscreen(state: FullscreenRequestState): boolean {
  return (
    state.isMobileFullscreenTarget &&
    !state.requestAttempted &&
    state.fullscreenElement == null &&
    state.canRequestFullscreen
  );
}
