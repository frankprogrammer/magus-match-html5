import { AssetIds } from '../assets/AssetIds';
import type {
  BoardAnimationCascadeStep,
  BoardAnimationMovement,
  BoardAnimationRefill,
  BoardAnimationSnapshot,
  BoardAnimationSnapshotCell,
  BoardAnimationTrace,
} from '../board/BoardAnimationTrace';
import type { TileType } from '../board/TileTypes';
import { BOARD_RECT } from '../core/Layout';
import type { CellCoord } from '../core/Layout';
import {
  TILE_FALL_DURATION_PER_ROW_MS,
  TILE_FALL_MAX_MS,
  TILE_FALL_MIN_MS,
  TILE_LANDING_SETTLE_MS,
  TILE_MATCH_SCALE_DOWN_MS,
  TILE_SWAP_RETARGET_MS,
  CASCADE_ROW_STAGGER_MS,
} from '../data/tuning';
import type { BoardCellVisualState, BoardRenderState } from './BoardRenderState';

interface VisualSample {
  renderX: number;
  renderY: number;
  scale: number;
  alpha: number;
}

interface ActiveBoardAnimation {
  trace: BoardAnimationTrace;
  startSec: number;
  retargetStarts: Map<string, VisualSample>;
}

interface StepTiming {
  step: BoardAnimationCascadeStep;
  popStartMs: number;
  fallStartMs: number;
  endMs: number;
}

export class BoardAnimationPresenter {
  private activeAnimation: ActiveBoardAnimation | null = null;
  private lastRevisionId: number | null = null;

  present(authoritativeState: BoardRenderState, elapsedSec: number): BoardRenderState {
    const trace = authoritativeState.animationTrace ?? null;
    if (trace != null && trace.revisionId !== this.lastRevisionId) {
      const currentState = this.activeAnimation == null
        ? null
        : this.sampleActiveAnimation(authoritativeState, elapsedSec);
      this.activeAnimation = {
        trace,
        startSec: elapsedSec,
        retargetStarts: currentState == null ? new Map() : sampleCells(currentState),
      };
      this.lastRevisionId = trace.revisionId;
    }

    if (this.activeAnimation == null) {
      return authoritativeState;
    }

    const animatedState = this.sampleActiveAnimation(authoritativeState, elapsedSec);
    if (this.isAnimationComplete(elapsedSec)) {
      this.activeAnimation = null;
      return authoritativeState;
    }

    return animatedState;
  }

  private sampleActiveAnimation(authoritativeState: BoardRenderState, elapsedSec: number): BoardRenderState {
    if (this.activeAnimation == null) {
      return authoritativeState;
    }

    const elapsedMs = Math.max(0, (elapsedSec - this.activeAnimation.startSec) * 1000);
    const trace = this.activeAnimation.trace;
    const stepTimings = buildStepTimings(trace);
    const boardCells = sampleTraceCells(trace, stepTimings, elapsedMs, this.activeAnimation.retargetStarts);

    return {
      ...authoritativeState,
      boardCells,
    };
  }

  private isAnimationComplete(elapsedSec: number): boolean {
    if (this.activeAnimation == null) {
      return true;
    }

    const totalMs = getTraceDurationMs(this.activeAnimation.trace);
    const elapsedMs = Math.max(0, (elapsedSec - this.activeAnimation.startSec) * 1000);
    return elapsedMs >= totalMs;
  }
}

export function getTraceDurationMs(trace: BoardAnimationTrace): number {
  const stepTimings = buildStepTimings(trace);
  return stepTimings.length === 0 ? TILE_SWAP_RETARGET_MS : stepTimings[stepTimings.length - 1].endMs;
}

function sampleTraceCells(
  trace: BoardAnimationTrace,
  stepTimings: readonly StepTiming[],
  elapsedMs: number,
  retargetStarts: ReadonlyMap<string, VisualSample>,
): BoardCellVisualState[] {
  if (elapsedMs < TILE_SWAP_RETARGET_MS || stepTimings.length === 0) {
    return sampleSwapCells(trace, elapsedMs, retargetStarts);
  }

  const activeStep = stepTimings.find((timing) => elapsedMs < timing.endMs);
  if (activeStep == null) {
    return snapshotToCells(trace.finalSnapshot);
  }

  if (elapsedMs < activeStep.fallStartMs) {
    return samplePopCells(activeStep.step, elapsedMs - activeStep.popStartMs);
  }

  return sampleFallCells(activeStep.step, elapsedMs - activeStep.fallStartMs, activeStep.endMs - activeStep.fallStartMs, retargetStarts);
}

function sampleSwapCells(
  trace: BoardAnimationTrace,
  elapsedMs: number,
  retargetStarts: ReadonlyMap<string, VisualSample>,
): BoardCellVisualState[] {
  const progress = clamp01(elapsedMs / TILE_SWAP_RETARGET_MS);
  return trace.postSwapSnapshot.cells.map((cell) => {
    const target = coordToRender(cell.coord);
    const retarget = retargetStarts.get(cell.tileId);
    const preSwapCell = trace.preSwapSnapshot.cells.find((candidate) => candidate.tileId === cell.tileId);
    const start = retarget ?? (preSwapCell == null ? target : coordToRender(preSwapCell.coord));
    const eased = easeOutCubic(progress);
    return snapshotCellToRenderCell(cell, {
      renderX: lerp(start.renderX, target.renderX, eased),
      renderY: lerp(start.renderY, target.renderY, eased),
      scale: lerp(start.scale, 1, eased),
      alpha: lerp(start.alpha, 1, eased),
      zIndex: 5,
    });
  });
}

function samplePopCells(step: BoardAnimationCascadeStep, stepElapsedMs: number): BoardCellVisualState[] {
  const clearedIds = new Set(step.clearedTiles.map((tile) => tile.tileId));
  const popProgress = clamp01(stepElapsedMs / TILE_MATCH_SCALE_DOWN_MS);
  const popScale = 1 - easeOutCubic(popProgress);

  return step.beforeClearSnapshot.cells.map((cell) =>
    snapshotCellToRenderCell(cell, clearedIds.has(cell.tileId)
      ? {
          scale: popScale,
          alpha: 1 - popProgress,
          zIndex: 8,
        }
      : { zIndex: 0 }),
  );
}

function sampleFallCells(
  step: BoardAnimationCascadeStep,
  stepElapsedMs: number,
  stepDurationMs: number,
  retargetStarts: ReadonlyMap<string, VisualSample>,
): BoardCellVisualState[] {
  const movingIds = new Set([
    ...step.fallingTiles.map((movement) => movement.tileId),
    ...step.refillTiles.map((refill) => refill.tileId),
  ]);
  const cells: BoardCellVisualState[] = step.beforeGravitySnapshot.cells
    .filter((cell) => !movingIds.has(cell.tileId))
    .map((cell) => snapshotCellToRenderCell(cell, { zIndex: 0 }));

  for (const movement of step.fallingTiles) {
    cells.push(sampleMovingTile(movement, stepElapsedMs, stepDurationMs, retargetStarts, 6));
  }

  for (const refill of step.refillTiles) {
    cells.push(sampleMovingTile(refill, stepElapsedMs, stepDurationMs, retargetStarts, 7));
  }

  return cells;
}

function sampleMovingTile(
  movement: BoardAnimationMovement | BoardAnimationRefill,
  stepElapsedMs: number,
  stepDurationMs: number,
  retargetStarts: ReadonlyMap<string, VisualSample>,
  zIndex: number,
): BoardCellVisualState {
  const distanceRows = Math.max(1, Math.abs(movement.to.row - movement.from.row));
  const delayMs = Math.max(0, movement.to.row) * CASCADE_ROW_STAGGER_MS;
  const fallMs = clamp(
    distanceRows * TILE_FALL_DURATION_PER_ROW_MS + TILE_LANDING_SETTLE_MS,
    TILE_FALL_MIN_MS,
    Math.min(TILE_FALL_MAX_MS, stepDurationMs),
  );
  const progress = clamp01((stepElapsedMs - delayMs) / fallMs);
  const eased = physicalFallEase(progress);
  const start = retargetStarts.get(movement.tileId) ?? coordToRender(movement.from);
  const target = coordToRender(movement.to);
  const settleScale = 1 + Math.sin(progress * Math.PI) * 0.045 * (1 - progress);

  return {
    tileId: movement.tileId,
    coord: movement.to,
    assetId: assetIdForTileType(movement.tileType),
    tileType: movement.tileType,
    isPath: movement.isPath,
    alpha: progress <= 0 ? 0 : 1,
    renderX: lerp(start.renderX, target.renderX, eased),
    renderY: lerp(start.renderY, target.renderY, eased),
    scale: settleScale,
    zIndex,
    isGhost: true,
  };
}

function buildStepTimings(trace: BoardAnimationTrace): StepTiming[] {
  let cursorMs = TILE_SWAP_RETARGET_MS;
  return trace.cascadeSteps.map((step) => {
    const popStartMs = cursorMs;
    const fallStartMs = popStartMs + TILE_MATCH_SCALE_DOWN_MS;
    const fallDurationMs = getStepFallDurationMs(step);
    const timing = {
      step,
      popStartMs,
      fallStartMs,
      endMs: fallStartMs + fallDurationMs,
    };
    cursorMs = timing.endMs;
    return timing;
  });
}

function getStepFallDurationMs(step: BoardAnimationCascadeStep): number {
  const distances = [
    ...step.fallingTiles.map((movement) => Math.max(1, Math.abs(movement.to.row - movement.from.row))),
    ...step.refillTiles.map((refill) => Math.max(1, Math.abs(refill.to.row - refill.from.row))),
  ];
  const maxDistance = Math.max(1, ...distances);
  const maxRow = Math.max(0, ...step.fallingTiles.map((movement) => movement.to.row), ...step.refillTiles.map((refill) => refill.to.row));
  return clamp(
    maxDistance * TILE_FALL_DURATION_PER_ROW_MS + maxRow * CASCADE_ROW_STAGGER_MS + TILE_LANDING_SETTLE_MS,
    TILE_FALL_MIN_MS,
    TILE_FALL_MAX_MS,
  );
}

function snapshotToCells(snapshot: BoardAnimationSnapshot): BoardCellVisualState[] {
  return snapshot.cells.map((cell) => snapshotCellToRenderCell(cell, { zIndex: 0 }));
}

function snapshotCellToRenderCell(
  cell: BoardAnimationSnapshotCell,
  overrides: Partial<Pick<BoardCellVisualState, 'renderX' | 'renderY' | 'scale' | 'alpha' | 'zIndex' | 'isGhost'>> = {},
): BoardCellVisualState {
  return {
    tileId: cell.tileId,
    coord: cell.coord,
    assetId: assetIdForTileType(cell.tileType),
    tileType: cell.tileType,
    isPath: cell.isPath,
    alpha: overrides.alpha ?? 1,
    renderX: overrides.renderX,
    renderY: overrides.renderY,
    scale: overrides.scale,
    zIndex: overrides.zIndex,
    isGhost: overrides.isGhost,
  };
}

function sampleCells(state: BoardRenderState): Map<string, VisualSample> {
  return new Map(
    state.boardCells.map((cell) => {
      const defaultPosition = coordToRender(cell.coord);
      return [
        cell.tileId,
        {
          renderX: cell.renderX ?? defaultPosition.renderX,
          renderY: cell.renderY ?? defaultPosition.renderY,
          scale: cell.scale ?? 1,
          alpha: cell.alpha,
        },
      ];
    }),
  );
}

function coordToRender(coord: CellCoord): VisualSample {
  return {
    renderX: BOARD_RECT.x + coord.col * BOARD_RECT.cellSize,
    renderY: BOARD_RECT.y + coord.row * BOARD_RECT.cellSize,
    scale: 1,
    alpha: 1,
  };
}

function physicalFallEase(progress: number): number {
  const clamped = clamp01(progress);
  const eased = easeOutCubic(clamped);
  const overshoot = Math.sin(clamped * Math.PI) * 0.08 * (1 - clamped);
  return clamp01(eased + overshoot);
}

function easeOutCubic(value: number): number {
  return 1 - Math.pow(1 - clamp01(value), 3);
}

function lerp(from: number, to: number, progress: number): number {
  return from + (to - from) * progress;
}

function clamp01(value: number): number {
  return clamp(value, 0, 1);
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function assetIdForTileType(type: TileType): string {
  switch (type) {
    case 'FIRE':
      return AssetIds.tiles.fire;
    case 'ICE':
      return AssetIds.tiles.ice;
    case 'LIGHTNING':
      return AssetIds.tiles.lightning;
    case 'EARTH':
      return AssetIds.tiles.earth;
    case 'LAND':
      return AssetIds.tiles.land;
    case 'ROCKET_H':
      return AssetIds.powerUps.rocketH;
    case 'ROCKET_V':
      return AssetIds.powerUps.rocketV;
    case 'TNT':
      return AssetIds.powerUps.tnt;
    case 'LIGHTBALL':
      return AssetIds.powerUps.lightball;
  }
}
