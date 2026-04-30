import { AssetIds } from '../assets/AssetIds';
import type {
  BoardAnimationCascadeStep,
  BoardAnimationMovement,
  BoardAnimationRefill,
  BoardAnimationSnapshot,
  BoardAnimationSnapshotCell,
  BoardAnimationTrace,
} from '../board/BoardAnimationTrace';
import {
  getBoardAnimationStepTimings,
  getBoardAnimationTraceDurationMs,
  type BoardAnimationStepTiming,
} from '../board/BoardAnimationTiming';
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
} from '../data/tuning';
import type {
  BoardBurstRingVisualState,
  BoardCellVisualState,
  BoardParticleVisualState,
  BoardRenderState,
} from './BoardRenderState';

const MATCH_PARTICLES_PER_TILE = 12;
const MATCH_PARTICLE_DURATION_MS = 260;
const MATCH_PARTICLE_MIN_DISTANCE_PX = 24;
const MATCH_PARTICLE_MAX_DISTANCE_PX = 62;
const MATCH_PARTICLE_START_RADIUS_PX = 12;
const MATCH_PARTICLE_END_RADIUS_PX = 2.25;
const MATCH_BURST_RING_DURATION_MS = 220;
const MATCH_BURST_RING_MAX_RADIUS_PX = 86;
const MATCH_BURST_RING_START_LINE_WIDTH_PX = 7;
const MATCH_BURST_RING_END_LINE_WIDTH_PX = 1;

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

export class BoardAnimationPresenter {
  private activeAnimation: ActiveBoardAnimation | null = null;
  private lastRevisionId: number | null = null;

  present(authoritativeState: BoardRenderState, elapsedSec: number): BoardRenderState {
    const trace = authoritativeState.animationTrace ?? null;
    if (trace != null && trace.revisionId !== this.lastRevisionId) {
      const currentState = this.activeAnimation == null || !shouldRetargetIntoTrace(trace)
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
    const stepTimings = getBoardAnimationStepTimings(trace);
    const boardCells = sampleTraceCells(trace, stepTimings, elapsedMs, this.activeAnimation.retargetStarts);
    const particles = sampleTraceParticles(trace, stepTimings, elapsedMs);
    const burstRings = sampleTraceBurstRings(trace, stepTimings, elapsedMs);

    return {
      ...authoritativeState,
      boardCells,
      particles,
      burstRings,
    };
  }

  private isAnimationComplete(elapsedSec: number): boolean {
    if (this.activeAnimation == null) {
      return true;
    }

    const totalMs = getBoardAnimationTraceDurationMs(this.activeAnimation.trace);
    const elapsedMs = Math.max(0, (elapsedSec - this.activeAnimation.startSec) * 1000);
    return elapsedMs >= totalMs;
  }
}

function shouldRetargetIntoTrace(trace: BoardAnimationTrace): boolean {
  return trace.kind !== 'levelIntro';
}

function sampleTraceCells(
  trace: BoardAnimationTrace,
  stepTimings: readonly BoardAnimationStepTiming[],
  elapsedMs: number,
  retargetStarts: ReadonlyMap<string, VisualSample>,
): BoardCellVisualState[] {
  if (trace.kind !== 'levelIntro' && (elapsedMs < TILE_SWAP_RETARGET_MS || stepTimings.length === 0)) {
    return sampleSwapCells(trace, elapsedMs, retargetStarts);
  }

  const activeStep = stepTimings.find((timing) => elapsedMs < timing.endMs);
  if (activeStep == null) {
    return snapshotToCells(trace.finalSnapshot);
  }

  if (elapsedMs < activeStep.fallStartMs) {
    return samplePopCells(activeStep.step, elapsedMs - activeStep.popStartMs);
  }

  return sampleFallCells(
    activeStep.step,
    elapsedMs - activeStep.fallStartMs,
    activeStep.endMs - activeStep.fallStartMs,
    activeStep.fallDelaysByTileId,
    retargetStarts,
    trace.kind === 'levelIntro',
  );
}

function sampleTraceParticles(
  trace: BoardAnimationTrace,
  stepTimings: readonly BoardAnimationStepTiming[],
  elapsedMs: number,
): BoardParticleVisualState[] {
  if (trace.kind === 'levelIntro') {
    return [];
  }

  const activeStep = stepTimings.find((timing) => elapsedMs < timing.fallStartMs);
  if (activeStep == null) {
    return [];
  }

  const stepElapsedMs = elapsedMs - activeStep.popStartMs;
  if (stepElapsedMs < 0) {
    return [];
  }

  return activeStep.step.clearedTiles.flatMap((tile) => sampleClearedTileParticles(tile, stepElapsedMs));
}

function sampleTraceBurstRings(
  trace: BoardAnimationTrace,
  stepTimings: readonly BoardAnimationStepTiming[],
  elapsedMs: number,
): BoardBurstRingVisualState[] {
  if (trace.kind === 'levelIntro') {
    return [];
  }

  const activeStep = stepTimings.find((timing) => elapsedMs < timing.fallStartMs);
  if (activeStep == null) {
    return [];
  }

  const stepElapsedMs = elapsedMs - activeStep.popStartMs;
  if (stepElapsedMs < 0) {
    return [];
  }

  return activeStep.step.clearedTiles
    .filter((tile) => particleColorForTileType(tile.tileType) != null)
    .map((tile) => sampleClearedTileBurstRing(tile, stepElapsedMs))
    .filter((ring): ring is BoardBurstRingVisualState => ring != null);
}

function sampleClearedTileParticles(
  tile: BoardAnimationCascadeStep['clearedTiles'][number],
  stepElapsedMs: number,
): BoardParticleVisualState[] {
  const color = particleColorForTileType(tile.tileType);
  if (color == null) {
    return [];
  }

  const localElapsedMs = stepElapsedMs - (tile.clearDelayMs ?? 0);
  if (localElapsedMs < 0 || localElapsedMs > MATCH_PARTICLE_DURATION_MS) {
    return [];
  }

  const progress = clamp01(localElapsedMs / MATCH_PARTICLE_DURATION_MS);
  const centerX = BOARD_RECT.x + tile.coord.col * BOARD_RECT.cellSize + BOARD_RECT.cellSize / 2;
  const centerY = BOARD_RECT.y + tile.coord.row * BOARD_RECT.cellSize + BOARD_RECT.cellSize / 2;

  return Array.from({ length: MATCH_PARTICLES_PER_TILE }, (_, index) => {
    const randomA = deterministicUnit(`${tile.tileId}:${index}:a`);
    const randomB = deterministicUnit(`${tile.tileId}:${index}:b`);
    const angle = randomA * Math.PI * 2;
    const distance = lerp(MATCH_PARTICLE_MIN_DISTANCE_PX, MATCH_PARTICLE_MAX_DISTANCE_PX, randomB) * easeOutCubic(progress);
    const radius = lerp(MATCH_PARTICLE_START_RADIUS_PX, MATCH_PARTICLE_END_RADIUS_PX, progress);
    return {
      particleId: `${tile.tileId}-pop-${index}`,
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance,
      radius,
      color,
      alpha: 1 - progress,
      zIndex: 20,
    };
  });
}

function sampleClearedTileBurstRing(
  tile: BoardAnimationCascadeStep['clearedTiles'][number],
  stepElapsedMs: number,
): BoardBurstRingVisualState | null {
  const localElapsedMs = stepElapsedMs - (tile.clearDelayMs ?? 0);
  if (localElapsedMs < 0 || localElapsedMs > MATCH_BURST_RING_DURATION_MS) {
    return null;
  }

  const progress = clamp01(localElapsedMs / MATCH_BURST_RING_DURATION_MS);
  const eased = easeOutCubic(progress);
  return {
    ringId: `${tile.tileId}-burst-ring`,
    x: BOARD_RECT.x + tile.coord.col * BOARD_RECT.cellSize + BOARD_RECT.cellSize / 2,
    y: BOARD_RECT.y + tile.coord.row * BOARD_RECT.cellSize + BOARD_RECT.cellSize / 2,
    radius: MATCH_BURST_RING_MAX_RADIUS_PX * eased,
    lineWidth: lerp(MATCH_BURST_RING_START_LINE_WIDTH_PX, MATCH_BURST_RING_END_LINE_WIDTH_PX, progress),
    color: 'rgba(255, 255, 255, 0.85)',
    alpha: 0.42 * Math.pow(1 - progress, 1.4),
    zIndex: 15,
  };
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
  const clearedById = new Map(step.clearedTiles.map((tile) => [tile.tileId, tile]));

  return step.beforeClearSnapshot.cells.map((cell) =>
    snapshotCellToRenderCell(cell, clearedById.has(cell.tileId)
      ? clearedTileOverrides(clearedById.get(cell.tileId)!, stepElapsedMs)
      : { zIndex: 0 }),
  );
}

function clearedTileOverrides(
  tile: { clearDelayMs?: number },
  stepElapsedMs: number,
): Partial<Pick<BoardCellVisualState, 'scale' | 'alpha' | 'zIndex'>> {
  const popProgress = clamp01((stepElapsedMs - (tile.clearDelayMs ?? 0)) / TILE_MATCH_SCALE_DOWN_MS);
  if (popProgress <= 0) {
    return { scale: 1, alpha: 1, zIndex: 8 };
  }

  return {
    scale: 1 - easeOutCubic(popProgress),
    alpha: 1 - popProgress,
    zIndex: 8,
  };
}

function sampleFallCells(
  step: BoardAnimationCascadeStep,
  stepElapsedMs: number,
  stepDurationMs: number,
  fallDelaysByTileId: ReadonlyMap<string, number>,
  retargetStarts: ReadonlyMap<string, VisualSample>,
  isLevelIntro: boolean,
): BoardCellVisualState[] {
  const movingIds = new Set([
    ...step.fallingTiles.map((movement) => movement.tileId),
    ...step.refillTiles.map((refill) => refill.tileId),
  ]);
  const cells: BoardCellVisualState[] = step.beforeGravitySnapshot.cells
    .filter((cell) => !movingIds.has(cell.tileId))
    .map((cell) => snapshotCellToRenderCell(cell, { zIndex: 0 }));

  for (const movement of step.fallingTiles) {
    cells.push(sampleMovingTile(movement, stepElapsedMs, stepDurationMs, fallDelaysByTileId, retargetStarts, 6, isLevelIntro));
  }

  for (const refill of step.refillTiles) {
    cells.push(sampleMovingTile(refill, stepElapsedMs, stepDurationMs, fallDelaysByTileId, retargetStarts, 7, isLevelIntro));
  }

  return cells;
}

function sampleMovingTile(
  movement: BoardAnimationMovement | BoardAnimationRefill,
  stepElapsedMs: number,
  stepDurationMs: number,
  fallDelaysByTileId: ReadonlyMap<string, number>,
  retargetStarts: ReadonlyMap<string, VisualSample>,
  zIndex: number,
  isLevelIntro: boolean,
): BoardCellVisualState {
  const distanceRows = Math.max(1, Math.abs(movement.to.row - movement.from.row));
  const delayMs = fallDelaysByTileId.get(movement.tileId) ?? 0;
  const fallMs = clamp(
    distanceRows * TILE_FALL_DURATION_PER_ROW_MS + TILE_LANDING_SETTLE_MS,
    TILE_FALL_MIN_MS,
    Math.min(TILE_FALL_MAX_MS, stepDurationMs),
  );
  const progress = clamp01((stepElapsedMs - delayMs) / fallMs);
  const eased = gravityFallEase(progress);
  const target = coordToRender(movement.to);
  const isSlide = 'movementKind' in movement && movement.movementKind === 'slide';
  const start = isSlide
    ? startPositionForSlideMovement(movement, retargetStarts)
    : startPositionForGravityMovement(movement, target, retargetStarts);
  const settleScale = landingScale(progress);

  return {
    tileId: movement.tileId,
    coord: movement.to,
    assetId: assetIdForTileType(movement.tileType),
    tileType: movement.tileType,
    isPath: movement.isPath,
    alpha: (isLevelIntro || movement.from.row < 0) && progress <= 0 ? 0 : 1,
    renderX: isSlide ? lerp(start.renderX, target.renderX, eased) : target.renderX,
    renderY: lerp(start.renderY, target.renderY, eased),
    scale: settleScale,
    zIndex,
    isGhost: true,
  };
}

function startPositionForSlideMovement(
  movement: BoardAnimationMovement | BoardAnimationRefill,
  retargetStarts: ReadonlyMap<string, VisualSample>,
): VisualSample {
  return retargetStarts.get(movement.tileId) ?? coordToRender(movement.from);
}

function startPositionForGravityMovement(
  movement: BoardAnimationMovement | BoardAnimationRefill,
  target: VisualSample,
  retargetStarts: ReadonlyMap<string, VisualSample>,
): VisualSample {
  const columnLockedStart = coordToRender({ col: movement.to.col, row: movement.from.row });
  const retarget = retargetStarts.get(movement.tileId);

  if (retarget == null || Math.abs(retarget.renderX - target.renderX) > 0.5) {
    return {
      ...columnLockedStart,
      renderX: target.renderX,
    };
  }

  return {
    ...retarget,
    renderX: target.renderX,
  };
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

function gravityFallEase(progress: number): number {
  const clamped = clamp01(progress);
  const settleStart = 0.82;

  if (clamped < settleStart) {
    return Math.pow(clamped / settleStart, 2.4) * 0.96;
  }

  const settleProgress = (clamped - settleStart) / (1 - settleStart);
  const settle = 0.96 + (1 - 0.96) * easeOutCubic(settleProgress);
  const bounce = Math.sin(settleProgress * Math.PI * 2) * 0.015 * (1 - settleProgress);
  return clamp01(settle + bounce);
}

function landingScale(progress: number): number {
  const clamped = clamp01(progress);
  if (clamped < 0.72) {
    return 1;
  }

  const settleProgress = (clamped - 0.72) / 0.28;
  return 1 + Math.sin(settleProgress * Math.PI * 2) * 0.045 * (1 - settleProgress);
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

function particleColorForTileType(type: TileType): string | null {
  switch (type) {
    case 'FIRE':
      return '#eb5757';
    case 'ICE':
      return '#38d5ff';
    case 'LIGHTNING':
      return '#f2c94c';
    case 'EARTH':
      return '#27ae60';
    case 'LAND':
    case 'ROCKET_H':
    case 'ROCKET_V':
    case 'TNT':
    case 'LIGHTBALL':
      return null;
  }
}

function deterministicUnit(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0) / 4294967296;
}
