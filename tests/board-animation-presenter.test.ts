import { describe, expect, it } from 'vitest';
import {
  createInvalidSwapAnimationTrace,
  createLevelIntroBoardAnimationTrace,
  type BoardAnimationTrace,
} from '../src/board/BoardAnimationTrace';
import { getBoardAnimationTraceDurationMs } from '../src/board/BoardAnimationTiming';
import { createBoardFromTileTypes } from '../src/board/Board';
import { AssetIds } from '../src/assets/AssetIds';
import { BOARD_RECT } from '../src/core/Layout';
import { BoardAnimationPresenter } from '../src/render-2d/BoardAnimationPresenter';
import type { BoardCellVisualState, BoardRenderState } from '../src/render-2d/BoardRenderState';
import {
  INVALID_SWAP_FORWARD_MS,
  INVALID_SWAP_HOLD_MS,
  INVALID_SWAP_RETURN_MS,
} from '../src/data/tuning';

describe('BoardAnimationPresenter', () => {
  it('scales matched tiles down, falls tiles physically, and settles to the authoritative board', () => {
    const presenter = new BoardAnimationPresenter();
    const trace = movementTrace(1, 0, 2);
    const state = boardState(trace);

    presenter.present(state, 0);
    const popping = presenter.present(state, 0.14);
    const cleared = popping.boardCells.find((cell) => cell.tileId === 'clear');
    expect(cleared?.scale).toBeGreaterThan(0);
    expect(cleared?.scale).toBeLessThan(1);

    const falling = presenter.present(state, 0.48);
    const moved = falling.boardCells.find((cell) => cell.tileId === 'moving');
    expect(moved?.renderY).toBeGreaterThan(BOARD_RECT.y);
    expect(moved?.renderY).toBeLessThan(BOARD_RECT.y + 2 * BOARD_RECT.cellSize);

    const earlyFall = presenter.present(state, 0.36);
    const midFall = presenter.present(state, 0.42);
    const lateFall = presenter.present(state, 0.48);
    const earlyY = earlyFall.boardCells.find((cell) => cell.tileId === 'moving')?.renderY ?? BOARD_RECT.y;
    const midY = midFall.boardCells.find((cell) => cell.tileId === 'moving')?.renderY ?? BOARD_RECT.y;
    const lateY = lateFall.boardCells.find((cell) => cell.tileId === 'moving')?.renderY ?? BOARD_RECT.y;
    expect(midY - earlyY).toBeGreaterThan(earlyY - BOARD_RECT.y);
    expect(lateY - midY).toBeGreaterThan(midY - earlyY);

    const settled = presenter.present(state, 2);
    expect(settled.boardCells.map((cell) => cell.tileId).sort()).toEqual(['moving', 'refill']);
    expect(settled.boardCells.find((cell) => cell.tileId === 'moving')?.coord).toEqual({ col: 0, row: 2 });
  });

  it('starts lower tiles in a column before tiles above them', () => {
    const presenter = new BoardAnimationPresenter();
    const trace = stackedMovementTrace();
    const state = boardState(trace);

    presenter.present(state, 0);
    const justAfterFallStart = presenter.present(state, 0.315);
    const lower = justAfterFallStart.boardCells.find((cell) => cell.tileId === 'lower');
    const upper = justAfterFallStart.boardCells.find((cell) => cell.tileId === 'upper');

    expect(lower?.renderY).toBeGreaterThan(BOARD_RECT.y + BOARD_RECT.cellSize);
    expect(upper?.renderY).toBe(BOARD_RECT.y);
  });

  it('delays rocket sweep clears while preserving normal simultaneous pops', () => {
    const presenter = new BoardAnimationPresenter();
    const trace = orderedClearTrace();
    const state = boardState(trace);

    presenter.present(state, 0);
    const earlySweep = presenter.present(state, 0.14);
    const origin = earlySweep.boardCells.find((cell) => cell.tileId === 'origin');
    const delayed = earlySweep.boardCells.find((cell) => cell.tileId === 'delayed');

    expect(origin?.scale).toBeLessThan(1);
    expect(delayed?.scale).toBe(1);
    expect(delayed?.alpha).toBe(1);
  });

  it('emits deterministic colored particles for standard tile pops', () => {
    const presenter = new BoardAnimationPresenter();
    const trace = particleColorTrace();
    const state = boardState(trace);

    presenter.present(state, 0);
    const popping = presenter.present(state, 0.14);
    const repeated = presenter.present(state, 0.14);
    const laterStreams = presenter.present(state, 0.25).matchEnergyStreams ?? [];
    const early = new BoardAnimationPresenter();
    early.present(state, 0);
    const earlyPop = early.present(state, 0.121);

    expect(popping.particles?.map((particle) => particle.color).sort()).toEqual([
      ...Array(12).fill('#27ae60'),
      ...Array(12).fill('#38d5ff'),
      ...Array(12).fill('#eb5757'),
      ...Array(12).fill('#f2c94c'),
    ].sort());
    expect(popping.particles).toEqual(repeated.particles);
    expect(earlyPop.particles?.[0]?.radius).toBeLessThanOrEqual(12);
    expect(earlyPop.particles?.[0]?.radius).toBeGreaterThan(11);
    expect(popping.burstRings).toHaveLength(4);
    expect(popping.burstRings?.every((ring) => ring.color === 'rgba(255, 255, 255, 0.85)')).toBe(true);
    expect(popping.burstRings?.every((ring) => ring.radius > 0)).toBe(true);
    expect(new Set(popping.matchEnergyStreams?.map((stream) => stream.color))).toEqual(
      new Set(['#27ae60', '#38d5ff', '#eb5757', '#f2c94c']),
    );
    expect(popping.matchEnergyStreams).toEqual(repeated.matchEnergyStreams);
    expect(Math.max(...laterStreams.map((stream) => stream.alpha))).toBeCloseTo(1);
    expect(laterStreams.filter((stream) => stream.alpha > 0.75).length).toBeGreaterThan(10);
    expect(Math.max(...(popping.matchEnergyStreams ?? []).map((stream) => stream.radius))).toBeGreaterThan(10);
    expect(laterStreams.some((stream) => stream.x < BOARD_RECT.width / 2)).toBe(true);
    expect(laterStreams.some((stream) => stream.y < BOARD_RECT.y)).toBe(true);
  });

  it('expands and fades the shockwave ring as it moves outward', () => {
    const trace = particleColorTrace();
    const state = boardState(trace);
    const presenter = new BoardAnimationPresenter();

    presenter.present(state, 0);
    const earlyRing = presenter.present(state, 0.13).burstRings?.[0];
    const laterRing = presenter.present(state, 0.25).burstRings?.[0];

    expect(earlyRing?.alpha).toBeLessThanOrEqual(0.42);
    expect(laterRing?.radius).toBeGreaterThan(earlyRing?.radius ?? 0);
    expect(laterRing?.alpha).toBeLessThan(earlyRing?.alpha ?? 1);
    expect(laterRing?.lineWidth).toBeLessThan(earlyRing?.lineWidth ?? 99);
  });

  it('respects delayed clears and omits particles outside active pop timing', () => {
    const presenter = new BoardAnimationPresenter();
    const trace = orderedClearTrace();
    const state = boardState(trace);

    presenter.present(state, 0);
    const beforeDelayedPop = presenter.present(state, 0.14);
    expect(beforeDelayedPop.particles ?? []).toHaveLength(0);
    expect(beforeDelayedPop.burstRings ?? []).toHaveLength(0);
    expect(beforeDelayedPop.matchEnergyStreams ?? []).toHaveLength(0);

    const duringDelayedPop = presenter.present(state, 0.23);
    expect(duringDelayedPop.particles?.every((particle) => particle.color === '#eb5757')).toBe(true);
    expect(duringDelayedPop.particles).toHaveLength(12);
    expect(duringDelayedPop.burstRings).toHaveLength(1);
    expect(duringDelayedPop.burstRings?.[0]?.alpha).toBeLessThanOrEqual(0.42);
    expect(duringDelayedPop.matchEnergyStreams?.length).toBeGreaterThan(0);
    expect(duringDelayedPop.matchEnergyStreams?.every((stream) => stream.color === '#eb5757')).toBe(true);

    const afterParticleWindow = presenter.present(state, 0.5);
    expect(afterParticleWindow.particles ?? []).toHaveLength(0);
    expect(afterParticleWindow.burstRings ?? []).toHaveLength(0);
  });

  it('emits delayed TNT sprite frames from the explosion spritesheet', () => {
    const presenter = new BoardAnimationPresenter();
    const trace = delayedTntTrace();
    const state = boardState(trace);

    presenter.present(state, 0);
    const beforeTnt = presenter.present(state, 0.2);
    const duringTnt = presenter.present(state, 0.23);
    const repeated = presenter.present(state, 0.23);
    const laterTnt = presenter.present(state, 0.34);
    const afterTnt = presenter.present(state, 0.7);

    expect(beforeTnt.tntExplosionSprites ?? []).toHaveLength(0);
    expect(duringTnt.tntExplosionSprites).toHaveLength(1);
    expect(duringTnt.tntExplosionSprites).toEqual(repeated.tntExplosionSprites);
    expect(duringTnt.tntExplosionSprites?.[0]).toMatchObject({
      assetId: AssetIds.spritesheets.tntExplosion,
      frameIndex: 0,
      sourceX: 0,
      sourceY: 0,
      sourceWidth: 128,
      sourceHeight: 128,
      width: 405,
      height: 405,
    });
    expect(laterTnt.tntExplosionSprites?.[0]).toMatchObject({
      frameIndex: 3,
      sourceX: 384,
      sourceY: 0,
    });
    expect(afterTnt.tntExplosionSprites ?? []).toHaveLength(0);
  });

  it('emits horizontal rocket cloud sprites along the row in delayed sweep timing', () => {
    const presenter = new BoardAnimationPresenter();
    const trace = horizontalRocketCloudTrace();
    const state = boardState(trace);

    presenter.present(state, 0);
    const originWave = presenter.present(state, 0.14);
    const delayedWave = presenter.present(state, 0.23);
    const repeated = presenter.present(state, 0.23);
    const laterFrame = presenter.present(state, 0.28);
    const leftExitWave = presenter.present(state, 0.32);
    const rightExitWave = presenter.present(state, 0.54);
    const afterWave = presenter.present(state, 1.0);

    expect(originWave.rocketCloudSprites?.length).toBeGreaterThan(0);
    expect(originWave.rocketCloudSprites?.every((sprite) => sprite.originY > BOARD_RECT.y && sprite.originY < BOARD_RECT.y + BOARD_RECT.cellSize)).toBe(true);
    expect(delayedWave.rocketCloudSprites?.some((sprite) => sprite.originX > BOARD_RECT.x + BOARD_RECT.cellSize * 1.5)).toBe(true);
    expect(delayedWave.rocketCloudSprites?.some((sprite) => sprite.originX < BOARD_RECT.x + BOARD_RECT.cellSize * 1.5)).toBe(true);
    expect(delayedWave.rocketCloudSprites?.some((sprite) => sprite.angleDeg === -90)).toBe(true);
    expect(delayedWave.rocketCloudSprites?.some((sprite) => sprite.angleDeg === 90)).toBe(true);
    expect(delayedWave.rocketCloudSprites?.every((sprite) => sprite.assetId === AssetIds.spritesheets.rocketCloud)).toBe(true);
    expect(delayedWave.rocketCloudSprites).toEqual(repeated.rocketCloudSprites);
    expect(laterFrame.rocketCloudSprites?.some((sprite) => sprite.frameIndex > 0)).toBe(true);
    expect(laterFrame.rocketCloudSprites?.some((sprite) => sprite.sourceX === 128 || sprite.sourceX === 256 || sprite.sourceX === 384)).toBe(true);
    expect(leftExitWave.rocketCloudSprites?.some((sprite) => sprite.originX < BOARD_RECT.x)).toBe(true);
    expect(rightExitWave.rocketCloudSprites?.some((sprite) => sprite.originX > BOARD_RECT.x + BOARD_RECT.width)).toBe(true);
    expect(afterWave.rocketCloudSprites ?? []).toHaveLength(0);
  });

  it('emits vertical rocket cloud sprites along the column', () => {
    const presenter = new BoardAnimationPresenter();
    const trace = verticalRocketClearTrace();
    const state = boardState(trace);

    presenter.present(state, 0);
    const wave = presenter.present(state, 0.23);
    const upExitWave = presenter.present(state, 0.32);
    const downExitWave = presenter.present(state, 0.54);

    expect(wave.rocketCloudSprites?.some((sprite) => sprite.originY > BOARD_RECT.y + BOARD_RECT.cellSize * 1.5)).toBe(true);
    expect(wave.rocketCloudSprites?.some((sprite) => sprite.originY < BOARD_RECT.y + BOARD_RECT.cellSize * 1.5)).toBe(true);
    expect(wave.rocketCloudSprites?.every((sprite) => Math.abs(sprite.originX - (BOARD_RECT.x + BOARD_RECT.cellSize / 2)) < 1)).toBe(true);
    expect(wave.rocketCloudSprites?.some((sprite) => sprite.angleDeg === 0)).toBe(true);
    expect(wave.rocketCloudSprites?.some((sprite) => sprite.angleDeg === 180)).toBe(true);
    expect(upExitWave.rocketCloudSprites?.some((sprite) => sprite.originY < BOARD_RECT.y)).toBe(true);
    expect(downExitWave.rocketCloudSprites?.some((sprite) => sprite.originY > BOARD_RECT.y + BOARD_RECT.height)).toBe(true);
  });

  it('does not emit particles for level intro or nonstandard tile clears', () => {
    const presenter = new BoardAnimationPresenter();
    const introBoard = createBoardFromTileTypes([['FIRE']]);
    const introTrace = createLevelIntroBoardAnimationTrace(introBoard, 31);
    const nonstandardTrace = nonstandardClearTrace();

    presenter.present(boardState(introTrace), 0);
    expect(presenter.present(boardState(introTrace), 0.1).particles ?? []).toHaveLength(0);
    expect(presenter.present(boardState(introTrace), 0.1).burstRings ?? []).toHaveLength(0);
    expect(presenter.present(boardState(introTrace), 0.1).tntExplosionSprites ?? []).toHaveLength(0);
    expect(presenter.present(boardState(introTrace), 0.1).rocketCloudSprites ?? []).toHaveLength(0);
    expect(presenter.present(boardState(introTrace), 0.1).matchEnergyStreams ?? []).toHaveLength(0);

    const secondPresenter = new BoardAnimationPresenter();
    secondPresenter.present(boardState(nonstandardTrace), 0);
    expect(secondPresenter.present(boardState(nonstandardTrace), 0.14).particles ?? []).toHaveLength(0);
    expect(secondPresenter.present(boardState(nonstandardTrace), 0.14).burstRings ?? []).toHaveLength(0);
    expect(secondPresenter.present(boardState(nonstandardTrace), 0.14).matchEnergyStreams ?? []).toHaveLength(0);
  });

  it('retargets shared tiles from their current animated positions when a new trace arrives', () => {
    const presenter = new BoardAnimationPresenter();
    const firstTrace = movementTrace(1, 0, 4);
    const firstState = boardState(firstTrace);

    presenter.present(firstState, 0);
    const midFirst = presenter.present(firstState, 0.48);
    const midY = midFirst.boardCells.find((cell) => cell.tileId === 'moving')?.renderY;

    const secondTrace = movementTrace(2, 4, 7);
    const secondState = boardState(secondTrace);
    const retargeted = presenter.present(secondState, 0.48);
    const retargetedY = retargeted.boardCells.find((cell) => cell.tileId === 'moving')?.renderY;

    expect(midY).toBeDefined();
    expect(retargetedY).toBeCloseTo(midY!, 4);
    expect(retargetedY).not.toBe(BOARD_RECT.y + 4 * BOARD_RECT.cellSize);
  });

  it('keeps gravity retargeting column-locked when prior samples are in a different column', () => {
    const presenter = new BoardAnimationPresenter();
    const firstTrace = movementTraceInColumn(21, 1, 0, 4);
    const firstState = boardState(firstTrace);

    presenter.present(firstState, 0);
    const midFirst = presenter.present(firstState, 0.48);
    const oldMoving = midFirst.boardCells.find((cell) => cell.tileId === 'moving');
    expect(oldMoving?.renderX).toBe(BOARD_RECT.x + BOARD_RECT.cellSize);

    const secondTrace = movementTraceInColumn(22, 0, 4, 7);
    const secondState = boardState(secondTrace);
    presenter.present(secondState, 0.48);
    const secondFalling = presenter.present(secondState, 0.82);
    const moved = secondFalling.boardCells.find((cell) => cell.tileId === 'moving');

    expect(moved?.renderX).toBe(BOARD_RECT.x);
    expect(moved?.renderY).toBeGreaterThan(BOARD_RECT.y + 4 * BOARD_RECT.cellSize);
  });

  it('keeps same-column gravity retargeting smooth on the vertical axis', () => {
    const presenter = new BoardAnimationPresenter();
    const firstTrace = movementTraceInColumn(23, 0, 0, 4);
    const firstState = boardState(firstTrace);

    presenter.present(firstState, 0);
    const midFirst = presenter.present(firstState, 0.48);
    const midY = midFirst.boardCells.find((cell) => cell.tileId === 'moving')?.renderY;

    const secondTrace = movementTraceInColumn(24, 0, 4, 7);
    const secondState = boardState(secondTrace);
    presenter.present(secondState, 0.48);
    const secondFallStart = presenter.present(secondState, 0.78);
    const moved = secondFallStart.boardCells.find((cell) => cell.tileId === 'moving');

    expect(midY).toBeDefined();
    expect(moved?.renderX).toBe(BOARD_RECT.x);
    expect(moved?.renderY).toBeCloseTo(midY!, 4);
    expect(moved?.renderY).not.toBe(BOARD_RECT.y + 4 * BOARD_RECT.cellSize);
  });

  it('animates explicit slide movements horizontally while keeping normal falls column-locked', () => {
    const presenter = new BoardAnimationPresenter();
    const trace = slideMovementTrace();
    const state = boardState(trace);

    presenter.present(state, 0);
    const sliding = presenter.present(state, 0.38);
    const moved = sliding.boardCells.find((cell) => cell.tileId === 'sliding');

    expect(moved?.renderX).toBeLessThan(BOARD_RECT.x + BOARD_RECT.cellSize);
    expect(moved?.renderX).toBeGreaterThan(BOARD_RECT.x);
  });

  it('renders level intro traces as an empty board before tiles fall in', () => {
    const presenter = new BoardAnimationPresenter();
    const board = createBoardFromTileTypes([['FIRE', 'ICE'], ['EARTH', 'LIGHTNING']]);
    const trace = createLevelIntroBoardAnimationTrace(board, 10);
    const state = boardState(trace);

    const start = presenter.present(state, 0);
    expect(start.boardCells.every((cell) => cell.alpha === 0)).toBe(true);

    const falling = presenter.present(state, 0.2);
    expect(falling.boardCells.length).toBeGreaterThan(0);
    expect(falling.boardCells.every((cell) => (cell.renderY ?? BOARD_RECT.y) <= BOARD_RECT.y + cell.coord.row * BOARD_RECT.cellSize)).toBe(true);

    const settled = presenter.present(state, 2);
    expect(settled.boardCells.map((cell) => cell.tileId).sort()).toEqual(
      state.boardCells.map((cell) => cell.tileId).sort(),
    );
  });

  it('animates invalid swaps forward and then back to the authoritative cells', () => {
    const presenter = new BoardAnimationPresenter();
    const board = createBoardFromTileTypes([
      ['FIRE', 'ICE'],
      ['EARTH', 'LIGHTNING'],
    ]);
    const trace = createInvalidSwapAnimationTrace(board, { col: 0, row: 0 }, { col: 1, row: 0 }, 32);
    const state = boardState(trace);

    presenter.present(state, 0);
    const forward = presenter.present(state, INVALID_SWAP_FORWARD_MS / 2000);
    const held = presenter.present(state, (INVALID_SWAP_FORWARD_MS + INVALID_SWAP_HOLD_MS / 2) / 1000);
    const returning = presenter.present(
      state,
      (INVALID_SWAP_FORWARD_MS + INVALID_SWAP_HOLD_MS + INVALID_SWAP_RETURN_MS / 2) / 1000,
    );
    const settled = presenter.present(state, getBoardAnimationTraceDurationMs(trace) / 1000);
    const originalX = BOARD_RECT.x;
    const swappedX = BOARD_RECT.x + BOARD_RECT.cellSize;

    expect(trace.cascadeSteps).toEqual([]);
    expect(getBoardAnimationTraceDurationMs(trace)).toBe(
      INVALID_SWAP_FORWARD_MS + INVALID_SWAP_HOLD_MS + INVALID_SWAP_RETURN_MS,
    );
    expect(forward.boardCells.find((cell) => cell.tileType === 'FIRE')?.renderX).toBeGreaterThan(originalX);
    expect(forward.boardCells.find((cell) => cell.tileType === 'FIRE')?.renderX).toBeLessThan(swappedX);
    expect(held.boardCells.find((cell) => cell.tileType === 'FIRE')?.renderX).toBeCloseTo(swappedX);
    expect(returning.boardCells.find((cell) => cell.tileType === 'FIRE')?.renderX).toBeGreaterThan(originalX);
    expect(returning.boardCells.find((cell) => cell.tileType === 'FIRE')?.renderX).toBeLessThan(swappedX);
    expect(settled).toBe(state);
    expect(settled.boardCells.find((cell) => cell.tileType === 'FIRE')?.coord).toEqual({ col: 0, row: 0 });
  });

  it('uses shared board-layer trace duration for presenter completion', () => {
    const presenter = new BoardAnimationPresenter();
    const trace = movementTrace(11, 0, 7);
    const state = boardState(trace);
    const durationSec = getBoardAnimationTraceDurationMs(trace) / 1000;

    presenter.present(state, 0);
    const almostDone = presenter.present(state, durationSec - 0.001);
    expect(almostDone.boardCells.some((cell) => cell.isGhost)).toBe(true);

    const done = presenter.present(state, durationSec);
    expect(done).toBe(state);
  });

  it('does not retarget previous collapse samples into level intro traces with reused tile IDs', () => {
    const presenter = new BoardAnimationPresenter();
    const collapseTrace = movementTrace(12, 0, 7);
    const collapseState = boardState(collapseTrace);

    presenter.present(collapseState, 0);
    const midCollapse = presenter.present(collapseState, 0.7);
    const oldMovingY = midCollapse.boardCells.find((cell) => cell.tileId === 'moving')?.renderY;
    expect(oldMovingY).toBeGreaterThan(BOARD_RECT.y);

    const introBoard = createBoardFromTileTypes([['FIRE']]);
    const introTrace = {
      ...createLevelIntroBoardAnimationTrace(introBoard, 13),
      cascadeSteps: [
        {
          ...createLevelIntroBoardAnimationTrace(introBoard, 13).cascadeSteps[0],
          finalSnapshot: {
            cells: [snapshotCell('moving', 'FIRE', 0, 0)],
          },
          refillTiles: [
            {
              tileId: 'moving',
              tileType: 'FIRE' as const,
              from: { col: 0, row: -8 },
              to: { col: 0, row: 0 },
              isPath: false,
            },
          ],
        },
      ],
      finalSnapshot: {
        cells: [snapshotCell('moving', 'FIRE', 0, 0)],
      },
    };
    const introState = boardState(introTrace);

    const introStart = presenter.present(introState, 0.7);
    const introCell = introStart.boardCells.find((cell) => cell.tileId === 'moving');

    expect(introCell?.alpha).toBe(0);
    expect(introCell?.renderY).toBe(BOARD_RECT.y - 8 * BOARD_RECT.cellSize);
    expect(introCell?.renderY).not.toBe(oldMovingY);
  });
});

function movementTrace(revisionId: number, fromRow: number, toRow: number): BoardAnimationTrace {
  return movementTraceInColumn(revisionId, 0, fromRow, toRow);
}

function slideMovementTrace(): BoardAnimationTrace {
  return {
    kind: 'resolution',
    revisionId: 25,
    swappedCells: null,
    preSwapSnapshot: {
      cells: [snapshotCell('sliding', 'FIRE', 1, 0)],
    },
    postSwapSnapshot: {
      cells: [snapshotCell('sliding', 'FIRE', 1, 0)],
    },
    cascadeSteps: [
      {
        stepIndex: 0,
        beforeClearSnapshot: {
          cells: [snapshotCell('sliding', 'FIRE', 1, 0)],
        },
        beforeGravitySnapshot: {
          cells: [snapshotCell('sliding', 'FIRE', 1, 0)],
        },
        afterGravitySnapshot: {
          cells: [snapshotCell('sliding', 'FIRE', 0, 2)],
        },
        finalSnapshot: {
          cells: [snapshotCell('sliding', 'FIRE', 0, 2)],
        },
        clearedTiles: [],
        fallingTiles: [
          {
            tileId: 'sliding',
            tileType: 'FIRE',
            from: { col: 1, row: 0 },
            to: { col: 0, row: 2 },
            isPath: false,
            movementKind: 'slide',
          },
        ],
        refillTiles: [],
      },
    ],
    finalSnapshot: {
      cells: [snapshotCell('sliding', 'FIRE', 0, 2)],
    },
  };
}

function movementTraceInColumn(revisionId: number, col: number, fromRow: number, toRow: number): BoardAnimationTrace {
  const clearCol = col === 0 ? 1 : 0;
  return {
    kind: 'resolution',
    revisionId,
    swappedCells: null,
    preSwapSnapshot: {
      cells: [snapshotCell('moving', 'FIRE', col, fromRow), snapshotCell('clear', 'ICE', clearCol, 1)],
    },
    postSwapSnapshot: {
      cells: [snapshotCell('moving', 'FIRE', col, fromRow), snapshotCell('clear', 'ICE', clearCol, 1)],
    },
    cascadeSteps: [
      {
        stepIndex: 0,
        beforeClearSnapshot: {
          cells: [snapshotCell('moving', 'FIRE', col, fromRow), snapshotCell('clear', 'ICE', clearCol, 1)],
        },
        beforeGravitySnapshot: {
          cells: [snapshotCell('moving', 'FIRE', col, fromRow)],
        },
        afterGravitySnapshot: {
          cells: [snapshotCell('moving', 'FIRE', col, toRow)],
        },
        finalSnapshot: {
          cells: [snapshotCell('refill', 'EARTH', col, 0), snapshotCell('moving', 'FIRE', col, toRow)],
        },
        clearedTiles: [snapshotCell('clear', 'ICE', clearCol, 1)],
        fallingTiles: [
          {
            tileId: 'moving',
            tileType: 'FIRE',
            from: { col, row: fromRow },
            to: { col, row: toRow },
            isPath: false,
          },
        ],
        refillTiles: [
          {
            tileId: 'refill',
            tileType: 'EARTH',
            from: { col, row: -1 },
            to: { col, row: 0 },
            isPath: false,
          },
        ],
      },
    ],
    finalSnapshot: {
      cells: [snapshotCell('refill', 'EARTH', col, 0), snapshotCell('moving', 'FIRE', col, toRow)],
    },
  };
}

function stackedMovementTrace(): BoardAnimationTrace {
  return {
    kind: 'resolution',
    revisionId: 3,
    swappedCells: null,
    preSwapSnapshot: {
      cells: [snapshotCell('upper', 'FIRE', 0, 0), snapshotCell('lower', 'ICE', 0, 1)],
    },
    postSwapSnapshot: {
      cells: [snapshotCell('upper', 'FIRE', 0, 0), snapshotCell('lower', 'ICE', 0, 1)],
    },
    cascadeSteps: [
      {
        stepIndex: 0,
        beforeClearSnapshot: {
          cells: [snapshotCell('upper', 'FIRE', 0, 0), snapshotCell('lower', 'ICE', 0, 1)],
        },
        beforeGravitySnapshot: {
          cells: [snapshotCell('upper', 'FIRE', 0, 0), snapshotCell('lower', 'ICE', 0, 1)],
        },
        afterGravitySnapshot: {
          cells: [snapshotCell('upper', 'FIRE', 0, 1), snapshotCell('lower', 'ICE', 0, 2)],
        },
        finalSnapshot: {
          cells: [snapshotCell('upper', 'FIRE', 0, 1), snapshotCell('lower', 'ICE', 0, 2)],
        },
        clearedTiles: [],
        fallingTiles: [
          {
            tileId: 'upper',
            tileType: 'FIRE',
            from: { col: 0, row: 0 },
            to: { col: 0, row: 1 },
            isPath: false,
          },
          {
            tileId: 'lower',
            tileType: 'ICE',
            from: { col: 0, row: 1 },
            to: { col: 0, row: 2 },
            isPath: false,
          },
        ],
        refillTiles: [],
      },
    ],
    finalSnapshot: {
      cells: [snapshotCell('upper', 'FIRE', 0, 1), snapshotCell('lower', 'ICE', 0, 2)],
    },
  };
}

function orderedClearTrace(): BoardAnimationTrace {
  return {
    kind: 'resolution',
    revisionId: 4,
    swappedCells: null,
    preSwapSnapshot: {
      cells: [snapshotCell('origin', 'ROCKET_H', 0, 0), snapshotCell('delayed', 'FIRE', 1, 0)],
    },
    postSwapSnapshot: {
      cells: [snapshotCell('origin', 'ROCKET_H', 0, 0), snapshotCell('delayed', 'FIRE', 1, 0)],
    },
    cascadeSteps: [
      {
        stepIndex: 0,
        beforeClearSnapshot: {
          cells: [snapshotCell('origin', 'ROCKET_H', 0, 0), snapshotCell('delayed', 'FIRE', 1, 0)],
        },
        beforeGravitySnapshot: {
          cells: [],
        },
        afterGravitySnapshot: {
          cells: [],
        },
        finalSnapshot: {
          cells: [],
        },
        clearedTiles: [
          snapshotCell('origin', 'ROCKET_H', 0, 0),
          { ...snapshotCell('delayed', 'FIRE', 1, 0), clearDelayMs: 90 },
        ],
        fallingTiles: [],
        refillTiles: [],
      },
    ],
    finalSnapshot: {
      cells: [],
    },
  };
}

function horizontalRocketCloudTrace(): BoardAnimationTrace {
  const cells = [
    snapshotCell('left', 'FIRE', 0, 0),
    snapshotCell('origin', 'ROCKET_H', 1, 0),
    snapshotCell('right', 'ICE', 2, 0),
  ];
  return {
    kind: 'resolution',
    revisionId: 4,
    swappedCells: null,
    preSwapSnapshot: {
      cells,
    },
    postSwapSnapshot: {
      cells,
    },
    cascadeSteps: [
      {
        stepIndex: 0,
        beforeClearSnapshot: {
          cells,
        },
        beforeGravitySnapshot: {
          cells: [],
        },
        afterGravitySnapshot: {
          cells: [],
        },
        finalSnapshot: {
          cells: [],
        },
        clearedTiles: [
          cells[1],
          { ...cells[0], clearDelayMs: 45 },
          { ...cells[2], clearDelayMs: 45 },
        ],
        fallingTiles: [],
        refillTiles: [],
      },
    ],
    finalSnapshot: {
      cells: [],
    },
  };
}

function verticalRocketClearTrace(): BoardAnimationTrace {
  const cells = [
    snapshotCell('up', 'FIRE', 0, 0),
    snapshotCell('origin', 'ROCKET_V', 0, 1),
    snapshotCell('down', 'ICE', 0, 2),
  ];
  return {
    kind: 'resolution',
    revisionId: 41,
    swappedCells: null,
    preSwapSnapshot: {
      cells,
    },
    postSwapSnapshot: {
      cells,
    },
    cascadeSteps: [
      {
        stepIndex: 0,
        beforeClearSnapshot: {
          cells,
        },
        beforeGravitySnapshot: {
          cells: [],
        },
        afterGravitySnapshot: {
          cells: [],
        },
        finalSnapshot: {
          cells: [],
        },
        clearedTiles: [
          cells[1],
          { ...cells[0], clearDelayMs: 45 },
          { ...cells[2], clearDelayMs: 45 },
        ],
        fallingTiles: [],
        refillTiles: [],
      },
    ],
    finalSnapshot: {
      cells: [],
    },
  };
}

function delayedTntTrace(): BoardAnimationTrace {
  const cells = [snapshotCell('tnt', 'TNT', 2, 0)];
  return {
    kind: 'resolution',
    revisionId: 28,
    swappedCells: null,
    preSwapSnapshot: { cells },
    postSwapSnapshot: { cells },
    cascadeSteps: [
      {
        stepIndex: 0,
        beforeClearSnapshot: { cells },
        beforeGravitySnapshot: { cells: [] },
        afterGravitySnapshot: { cells: [] },
        finalSnapshot: { cells: [] },
        clearedTiles: [{ ...cells[0], clearDelayMs: 90 }],
        fallingTiles: [],
        refillTiles: [],
      },
    ],
    finalSnapshot: { cells: [] },
  };
}

function particleColorTrace(): BoardAnimationTrace {
  const cells = [
    snapshotCell('fire', 'FIRE', 0, 0),
    snapshotCell('ice', 'ICE', 1, 0),
    snapshotCell('lightning', 'LIGHTNING', 2, 0),
    snapshotCell('earth', 'EARTH', 3, 0),
  ];
  return {
    kind: 'resolution',
    revisionId: 26,
    swappedCells: null,
    preSwapSnapshot: { cells },
    postSwapSnapshot: { cells },
    cascadeSteps: [
      {
        stepIndex: 0,
        beforeClearSnapshot: { cells },
        beforeGravitySnapshot: { cells: [] },
        afterGravitySnapshot: { cells: [] },
        finalSnapshot: { cells: [] },
        clearedTiles: cells,
        fallingTiles: [],
        refillTiles: [],
      },
    ],
    finalSnapshot: { cells: [] },
  };
}

function nonstandardClearTrace(): BoardAnimationTrace {
  const cells = [
    snapshotCell('land', 'LAND', 0, 0),
    snapshotCell('rocket', 'ROCKET_H', 1, 0),
    snapshotCell('tnt', 'TNT', 2, 0),
    snapshotCell('lightball', 'LIGHTBALL', 3, 0),
  ];
  return {
    kind: 'resolution',
    revisionId: 27,
    swappedCells: null,
    preSwapSnapshot: { cells },
    postSwapSnapshot: { cells },
    cascadeSteps: [
      {
        stepIndex: 0,
        beforeClearSnapshot: { cells },
        beforeGravitySnapshot: { cells: [] },
        afterGravitySnapshot: { cells: [] },
        finalSnapshot: { cells: [] },
        clearedTiles: cells,
        fallingTiles: [],
        refillTiles: [],
      },
    ],
    finalSnapshot: { cells: [] },
  };
}

function boardState(trace: BoardAnimationTrace): BoardRenderState {
  return {
    logicalWidth: 1080,
    logicalHeight: 1920,
    boardCells: trace.finalSnapshot.cells.map((cell) => renderCell(cell.tileId, cell.tileType, cell.coord.col, cell.coord.row)),
    pathCells: [],
    mageCell: null,
    goalCell: null,
    hintedCells: [],
    selectedCell: null,
    queuedSwap: null,
    shakePixels: 0,
    visualCues: [],
    animationTrace: trace,
  };
}

function snapshotCell(
  tileId: string,
  tileType: BoardCellVisualState['tileType'],
  col: number,
  row: number,
) {
  return {
    tileId,
    tileType,
    coord: { col, row },
    isPath: false,
  };
}

function renderCell(
  tileId: string,
  tileType: BoardCellVisualState['tileType'],
  col: number,
  row: number,
): BoardCellVisualState {
  return {
    tileId,
    coord: { col, row },
    assetId: `tile.${tileType.toLowerCase()}`,
    tileType,
    isPath: false,
    alpha: 1,
  };
}
