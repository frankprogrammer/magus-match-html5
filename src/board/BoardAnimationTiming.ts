import type {
  BoardAnimationCascadeStep,
  BoardAnimationMovement,
  BoardAnimationRefill,
  BoardAnimationTrace,
} from './BoardAnimationTrace';
import {
  CASCADE_ROW_STAGGER_MS,
  TILE_FALL_DURATION_PER_ROW_MS,
  TILE_FALL_MAX_MS,
  TILE_FALL_MIN_MS,
  TILE_LANDING_SETTLE_MS,
  TILE_MATCH_SCALE_DOWN_MS,
  TILE_SWAP_RETARGET_MS,
} from '../data/tuning';

export interface BoardAnimationStepTiming {
  step: BoardAnimationCascadeStep;
  popStartMs: number;
  fallStartMs: number;
  endMs: number;
  fallDelaysByTileId: ReadonlyMap<string, number>;
}

export function getBoardAnimationTraceDurationMs(trace: BoardAnimationTrace): number {
  const stepTimings = getBoardAnimationStepTimings(trace);
  return stepTimings.length === 0 ? TILE_SWAP_RETARGET_MS : stepTimings[stepTimings.length - 1].endMs;
}

export function getBoardAnimationStepTimings(trace: BoardAnimationTrace): BoardAnimationStepTiming[] {
  let cursorMs = trace.kind === 'levelIntro' ? 0 : TILE_SWAP_RETARGET_MS;
  return trace.cascadeSteps.map((step) => {
    const popStartMs = cursorMs;
    const fallStartMs = popStartMs + getStepClearDurationMs(trace, step);
    const fallDelaysByTileId = getColumnFallDelays(step);
    const fallDurationMs = getStepFallDurationMs(step);
    const timing = {
      step,
      popStartMs,
      fallStartMs,
      endMs: fallStartMs + fallDurationMs,
      fallDelaysByTileId,
    };
    cursorMs = timing.endMs;
    return timing;
  });
}

function getStepClearDurationMs(trace: BoardAnimationTrace, step: BoardAnimationCascadeStep): number {
  if (trace.kind === 'levelIntro') {
    return 0;
  }

  const maxDelayMs = Math.max(0, ...step.clearedTiles.map((tile) => tile.clearDelayMs ?? 0));
  return maxDelayMs + TILE_MATCH_SCALE_DOWN_MS;
}

function getStepFallDurationMs(step: BoardAnimationCascadeStep): number {
  const fallDelaysByTileId = getColumnFallDelays(step);
  const longestMovementMs = getStepMovements(step).reduce((longest, movement) => {
    const distanceRows = Math.max(1, Math.abs(movement.to.row - movement.from.row));
    const fallMs = clamp(
      distanceRows * TILE_FALL_DURATION_PER_ROW_MS + TILE_LANDING_SETTLE_MS,
      TILE_FALL_MIN_MS,
      TILE_FALL_MAX_MS,
    );
    return Math.max(longest, (fallDelaysByTileId.get(movement.tileId) ?? 0) + fallMs);
  }, TILE_FALL_MIN_MS);
  return Math.max(TILE_FALL_MIN_MS, longestMovementMs);
}

function getColumnFallDelays(step: BoardAnimationCascadeStep): ReadonlyMap<string, number> {
  const columns = new Map<number, Array<BoardAnimationMovement | BoardAnimationRefill>>();
  for (const movement of getStepMovements(step)) {
    columns.set(movement.to.col, [...(columns.get(movement.to.col) ?? []), movement]);
  }

  const delays = new Map<string, number>();
  for (const columnMovements of columns.values()) {
    const bottomFirst = [...columnMovements].sort((first, second) =>
      second.to.row - first.to.row ||
      second.from.row - first.from.row ||
      first.tileId.localeCompare(second.tileId),
    );
    bottomFirst.forEach((movement, index) => {
      delays.set(movement.tileId, index * CASCADE_ROW_STAGGER_MS);
    });
  }

  return delays;
}

function getStepMovements(step: BoardAnimationCascadeStep): Array<BoardAnimationMovement | BoardAnimationRefill> {
  return [...step.fallingTiles, ...step.refillTiles];
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
