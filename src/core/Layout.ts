export const LOGICAL_WIDTH = 864;
export const LOGICAL_HEIGHT = 1920;
export const HERO_STAGE_HEIGHT = 700;

/** Level title strip (`ui title.png`), scaled to ~60% width; native asset pixel size. */
export const LEVEL_PANEL_NATURAL_SIZE = { width: 950, height: 156 } as const;
export const LEVEL_PANEL_WIDTH_FRAC = 0.6;
export const LEVEL_PANEL_WIDTH = LOGICAL_WIDTH * LEVEL_PANEL_WIDTH_FRAC;
export const LEVEL_PANEL_HEIGHT =
  (LEVEL_PANEL_WIDTH * LEVEL_PANEL_NATURAL_SIZE.height) / LEVEL_PANEL_NATURAL_SIZE.width;
/** Gap between the logical screen top and the title strip. */
export const LEVEL_PANEL_TOP = 18;
export const LEVEL_PANEL_X = (LOGICAL_WIDTH - LEVEL_PANEL_WIDTH) / 2;
/** Keeps labels off decorative ends of the title art. */
export const LEVEL_PANEL_TEXT_INSET_FRAC = 0.14;
export const LEVEL_PANEL_TEXT_X =
  LEVEL_PANEL_X + LEVEL_PANEL_WIDTH * LEVEL_PANEL_TEXT_INSET_FRAC;
export const LEVEL_PANEL_TEXT_WIDTH =
  LEVEL_PANEL_WIDTH - 2 * LEVEL_PANEL_WIDTH * LEVEL_PANEL_TEXT_INSET_FRAC;

/** Game-over header ribbon (`ui title.png`), same aspect as `LEVEL_PANEL_NATURAL_SIZE`. */
export const GAME_OVER_TITLE_NATURAL_SIZE = LEVEL_PANEL_NATURAL_SIZE;
/** Minimum horizontal inset from left/right logical screen edges for the title ribbon. */
export const GAME_OVER_TITLE_SCREEN_PADDING_X = 20;
/** Minimum band height so “GAME OVER” fits before width clamping. */
export const GAME_OVER_TITLE_BAND_MIN_HEIGHT_PX = 150;
/** Legacy title row layout (center line preserved when sizing the ribbon). */
export const GAME_OVER_TITLE_TEXT_TOP_Y = 185;
export const GAME_OVER_TITLE_TEXT_LAYOUT_HEIGHT = 110;
export const GAME_OVER_TITLE_TEXT_CENTER_Y =
  GAME_OVER_TITLE_TEXT_TOP_Y + GAME_OVER_TITLE_TEXT_LAYOUT_HEIGHT / 2;

export function gameOverTitleBannerRect(): {
  x: number;
  y: number;
  width: number;
  height: number;
} {
  const maxWidth = LOGICAL_WIDTH - 2 * GAME_OVER_TITLE_SCREEN_PADDING_X;
  const aspect = GAME_OVER_TITLE_NATURAL_SIZE.width / GAME_OVER_TITLE_NATURAL_SIZE.height;
  let height = GAME_OVER_TITLE_BAND_MIN_HEIGHT_PX;
  let width = height * aspect;
  if (width > maxWidth) {
    width = maxWidth;
    height = width / aspect;
  }

  const x = (LOGICAL_WIDTH - width) / 2;
  const y = GAME_OVER_TITLE_TEXT_CENTER_Y - height / 2;
  return { x, y, width, height };
}

export const HUD_HEIGHT = 150;
/** Matches `RenderFrame` HUD text inset from the logical left edge. */
export const HUD_CONTENT_PADDING_X = 56;
/** HUD banner overlaps the hero strip slightly (matches `RenderFrame` placement). */
export const HUD_VISUAL_OVERLAP_PX = 10;
export const HUD_BAND_TOP_Y = HERO_STAGE_HEIGHT - HUD_VISUAL_OVERLAP_PX;

/** Three-up heart strip in the HUD band (`heart-fill` / `heart-empty`). */
export const HUD_HEART_COUNT = 3;
export const HUD_HEART_NATURAL_WIDTH = 254;
export const HUD_HEART_NATURAL_HEIGHT = 233;
export const HUD_HEART_DISPLAY_HEIGHT = 74;
export const HUD_HEART_DISPLAY_WIDTH =
  (HUD_HEART_DISPLAY_HEIGHT * HUD_HEART_NATURAL_WIDTH) / HUD_HEART_NATURAL_HEIGHT;
export const HUD_HEART_GAP = 12;
/** Positive = shift heart strip toward screen center from `HUD_CONTENT_PADDING_X`. */
export const HUD_HEART_TOWARD_CENTER_NUDGE_PX = 20;
export const HUD_HEART_GROUP_LEFT = HUD_CONTENT_PADDING_X + HUD_HEART_TOWARD_CENTER_NUDGE_PX;
export const HUD_SCORE_TEXT_X =
  HUD_HEART_GROUP_LEFT +
  HUD_HEART_COUNT * HUD_HEART_DISPLAY_WIDTH +
  (HUD_HEART_COUNT - 1) * HUD_HEART_GAP +
  24;

/** Top row height for the “Score” label (see `HUD_SCORE_LABEL_VALUE_GAP_PX` + value row). */
export const HUD_SCORE_LABEL_ROW_HEIGHT = 100;
/** Vertical gap between the label row and the numeric score (smaller = tighter). */
export const HUD_SCORE_LABEL_VALUE_GAP_PX = -50;
export const HUD_SCORE_VALUE_ROW_HEIGHT =
  HUD_HEIGHT - HUD_SCORE_LABEL_ROW_HEIGHT - HUD_SCORE_LABEL_VALUE_GAP_PX;
export const HUD_SCORE_LABEL_COLOR = '#FBBC45';
export const HUD_SCORE_LABEL_FONT_SIZE = 26;
export const HUD_SCORE_LABEL_MIN_FONT_SIZE = 18;
export const HUD_SCORE_VALUE_FONT_SIZE = 34;
export const HUD_SCORE_VALUE_MIN_FONT_SIZE = 20;

/** Trial monster HUD fill bar (`ui-fillbar-bg` / `ui-fillbar-fill`), same height as hearts. */
export const HUD_TRIAL_FILLBAR_BG_NATURAL_SIZE = { width: 2155, height: 563 } as const;
export const HUD_TRIAL_FILLBAR_FRAME_HEIGHT = HUD_HEART_DISPLAY_HEIGHT;
export const HUD_TRIAL_FILLBAR_FRAME_WIDTH =
  (HUD_TRIAL_FILLBAR_FRAME_HEIGHT * HUD_TRIAL_FILLBAR_BG_NATURAL_SIZE.width) /
  HUD_TRIAL_FILLBAR_BG_NATURAL_SIZE.height;
export const HUD_TRIAL_FILLBAR_RIGHT_MARGIN = 50;
/** Positive = shift fill bar toward screen center (leftward). */
export const HUD_TRIAL_FILLBAR_TOWARD_CENTER_NUDGE_PX = 20;
export const HUD_TRIAL_FILLBAR_LEFT_X =
  LOGICAL_WIDTH -
  HUD_TRIAL_FILLBAR_RIGHT_MARGIN -
  HUD_TRIAL_FILLBAR_FRAME_WIDTH -
  HUD_TRIAL_FILLBAR_TOWARD_CENTER_NUDGE_PX;
/** Kobold badge on trial monster bar; height relative to fill bar frame. */
export const HUD_TRIAL_FILLBAR_KOBOLD_NATURAL_SIZE = { width: 447, height: 429 } as const;
export const HUD_TRIAL_FILLBAR_KOBOLD_HEIGHT_FRAC = 0.8;
/** Horizontal inset for purple fill inside the gold frame (trial HUD bar). */
export const TRIAL_FILLBAR_INNER_PAD_X_FRAC = 0.06;
export const TRIAL_FILLBAR_INNER_WIDTH_FRAC = 0.91;
/** Fill sprite height as a fraction of full frame height (centered vertically). */
export const TRIAL_FILLBAR_FILL_HEIGHT_FRAC = 0.645;
/** Fine-tune painted fill vs frame (positive = right). Applied to fill draw and RTL clip together. */
export const TRIAL_FILLBAR_FILL_OFFSET_X_PX = -5;
/** Fine-tune painted fill vs frame (negative = up). Applied to fill draw and RTL clip together. */
export const TRIAL_FILLBAR_FILL_OFFSET_Y_PX = -2;
/** Journey / non-trial objective column (legacy layout). */
export function hudObjectiveTextLayoutLegacy(): { x: number; width: number } {
  const width = Math.min(300, LOGICAL_WIDTH - 2 * HUD_CONTENT_PADDING_X);
  const x = LOGICAL_WIDTH - HUD_CONTENT_PADDING_X - width;
  return { x, width };
}

export const BOARD_SECTION_HEIGHT = LOGICAL_HEIGHT - HERO_STAGE_HEIGHT - HUD_HEIGHT;
export const BOARD_SIZE = 8;
export const BOARD_SECTION_TOP = HERO_STAGE_HEIGHT + HUD_HEIGHT;
export const BOARD_PIXEL_SIZE = Math.min(LOGICAL_WIDTH, BOARD_SECTION_HEIGHT);
export const BOARD_HORIZONTAL_MARGIN = (LOGICAL_WIDTH - BOARD_PIXEL_SIZE) / 2;
export const BOARD_VERTICAL_MARGIN = (BOARD_SECTION_HEIGHT - BOARD_PIXEL_SIZE) / 2;

export const BOARD_RECT = {
  x: BOARD_HORIZONTAL_MARGIN,
  y: BOARD_SECTION_TOP + BOARD_VERTICAL_MARGIN,
  width: BOARD_PIXEL_SIZE,
  height: BOARD_PIXEL_SIZE,
  cellSize: BOARD_PIXEL_SIZE / BOARD_SIZE,
} as const;

export interface UiRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const GAME_OVER_TRY_AGAIN_BUTTON_RECT: UiRect = {
  x: (LOGICAL_WIDTH - 480) / 2,
  y: 1570,
  width: 480,
  height: 112,
};

export const HUD_MUTE_TOGGLE_RECT: UiRect = {
  x: LOGICAL_WIDTH - 150,
  y: HERO_STAGE_HEIGHT,
  width: 150,
  height: HUD_HEIGHT,
};

const HUD_BGM_TOGGLE_DIAMETER = 72;
const HUD_BGM_RIGHT_MARGIN = 8;
const HUD_BGM_TOP_MARGIN = 8;

/** Circular BGM toggle at the logical screen top-right (not the HUD strip). */
export const HUD_BGM_TOGGLE_RECT: UiRect = {
  x: LOGICAL_WIDTH - HUD_BGM_RIGHT_MARGIN - HUD_BGM_TOGGLE_DIAMETER,
  y: HUD_BGM_TOP_MARGIN,
  width: HUD_BGM_TOGGLE_DIAMETER,
  height: HUD_BGM_TOGGLE_DIAMETER,
};

export interface LogicalPoint {
  x: number;
  y: number;
}

export function pointInHudBgmToggle(point: LogicalPoint): boolean {
  const rect = HUD_BGM_TOGGLE_RECT;
  const centerX = rect.x + rect.width / 2;
  const centerY = rect.y + rect.height / 2;
  const radius = rect.width / 2;
  return Math.hypot(point.x - centerX, point.y - centerY) <= radius;
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
