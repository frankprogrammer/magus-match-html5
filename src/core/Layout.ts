export const LOGICAL_WIDTH = 1080;
export const LOGICAL_HEIGHT = 1920;
export const HERO_STAGE_HEIGHT = 500;
export const HUD_HEIGHT = 150;
export const BOARD_SECTION_HEIGHT = 1270;
export const BOARD_SIZE = 8;
export const BOARD_SECTION_TOP = HERO_STAGE_HEIGHT + HUD_HEIGHT;
export const BOARD_VERTICAL_MARGIN = (BOARD_SECTION_HEIGHT - LOGICAL_WIDTH) / 2;

export const BOARD_RECT = {
  x: 0,
  y: BOARD_SECTION_TOP + BOARD_VERTICAL_MARGIN,
  width: LOGICAL_WIDTH,
  height: LOGICAL_WIDTH,
  cellSize: LOGICAL_WIDTH / BOARD_SIZE,
} as const;

export interface UiRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const TITLE_PLAY_BUTTON_RECT: UiRect = {
  x: 300,
  y: 1040,
  width: 480,
  height: 112,
};

export const GAME_OVER_TRY_AGAIN_BUTTON_RECT: UiRect = {
  x: 300,
  y: 1570,
  width: 480,
  height: 112,
};

export const HUD_MUTE_TOGGLE_RECT: UiRect = {
  x: 930,
  y: HERO_STAGE_HEIGHT,
  width: 150,
  height: HUD_HEIGHT,
};

export interface LogicalPoint {
  x: number;
  y: number;
}

export interface CellCoord {
  col: number;
  row: number;
}

export function pointInRect(point: LogicalPoint, rect: UiRect): boolean {
  return (
    point.x >= rect.x &&
    point.y >= rect.y &&
    point.x < rect.x + rect.width &&
    point.y < rect.y + rect.height
  );
}

export function logicalPointToBoardCell(point: LogicalPoint): CellCoord | null {
  const localX = point.x - BOARD_RECT.x;
  const localY = point.y - BOARD_RECT.y;

  if (
    localX < 0 ||
    localY < 0 ||
    localX >= BOARD_RECT.width ||
    localY >= BOARD_RECT.height
  ) {
    return null;
  }

  return {
    col: Math.floor(localX / BOARD_RECT.cellSize),
    row: Math.floor(localY / BOARD_RECT.cellSize),
  };
}
