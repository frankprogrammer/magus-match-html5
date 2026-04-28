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

export interface LogicalPoint {
  x: number;
  y: number;
}

export interface CellCoord {
  col: number;
  row: number;
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
