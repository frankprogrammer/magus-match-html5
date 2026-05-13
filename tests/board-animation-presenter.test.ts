import { describe, expect, it } from 'vitest';
import {
  createInvalidSwapAnimationTrace,
  createLevelIntroBoardAnimationTrace,
  type BoardAnimationTrace,
} from '../src/board/BoardAnimationTrace';
import { getBoardAnimationTraceDurationMs } from '../src/board/BoardAnimationTiming';
import { createBoardFromTileTypes } from '../src/board/Board';
import { AssetIds } from '../src/assets/AssetIds';
import { BOARD_RECT, LOGICAL_HEIGHT, LOGICAL_WIDTH } from '../src/core/Layout';
import { BoardAnimationPresenter } from '../src/render-2d/BoardAnimationPresenter';
import type {
  BoardCellVisualState,
  BoardRenderState,
  FloatingTutorialTileRole,
} from '../src/render-2d/BoardRenderState';
import {
  INVALID_SWAP_FORWARD_MS,
  INVALID_SWAP_HOLD_MS,
  INVALID_SWAP_RETURN_MS,
  LIGHTBALL_COLLECTION_STREAM_HOLD_MS,
  LIGHTBALL_COLLECTION_STREAM_TRAVEL_MS,
  LIGHTBALL_COLLECTION_WAVE_MS,
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
    const acceleratedStreams = presenter.present(state, 0.36).matchEnergyStreams ?? [];
    const nearTargetStreams = presenter.present(state, 0.45).matchEnergyStreams ?? [];
    const shrinkingStreams = presenter.present(state, 0.585).matchEnergyStreams ?? [];
    const afterArrivalStreams = presenter.present(state, 0.69).matchEnergyStreams ?? [];
    const targetedPresenter = new BoardAnimationPresenter();
    targetedPresenter.present(state, 0, { matchEnergyTarget: { x: 320, y: 160 } });
    const targetedStreams = targetedPresenter.present(state, 0.45, { matchEnergyTarget: { x: 320, y: 160 } }).matchEnergyStreams ?? [];
    const early = new BoardAnimationPresenter();
    early.present(state, 0);
    const earlyPop = early.present(state, 0.121);
    const earlyFireStream = popping.matchEnergyStreams?.find((stream) => stream.streamId === 'fire-energy-0');
    const middleFireStream = laterStreams.find((stream) => stream.streamId === 'fire-energy-0');
    const acceleratedFireStream = acceleratedStreams.find((stream) => stream.streamId === 'fire-energy-0');
    const shrinkingFireStream = shrinkingStreams.find((stream) => stream.streamId === 'fire-energy-0');
    const defaultNearTargetFireStream = nearTargetStreams.find((stream) => stream.streamId === 'fire-energy-0');
    const targetedFireStream = targetedStreams.find((stream) => stream.streamId === 'fire-energy-0');
    const fireStart = {
      x: BOARD_RECT.x + BOARD_RECT.cellSize / 2,
      y: BOARD_RECT.y + BOARD_RECT.cellSize / 2,
    };
    const mageTarget = { x: 120, y: 180 };
    const totalTravelDistance = distance(fireStart, mageTarget);
    const earlyTravel = distance(fireStart, earlyFireStream ?? fireStart);
    const earlyProjection = projectedProgress(fireStart, mageTarget, earlyFireStream ?? fireStart);
    const middleProjection = projectedProgress(fireStart, mageTarget, middleFireStream ?? fireStart);
    const acceleratedProjection = projectedProgress(fireStart, mageTarget, acceleratedFireStream ?? fireStart);

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
    expect(popping.matchEnergyStreams).toHaveLength(20);
    expect(new Set(popping.matchEnergyStreams?.map((stream) => stream.color))).toEqual(
      new Set(['#00ff3f', '#00d8ff', '#ff7000', '#fff000']),
    );
    expect(popping.matchEnergyStreams).toEqual(repeated.matchEnergyStreams);
    expect(popping.matchEnergyStreams?.every((stream) => stream.assetId === AssetIds.powerUps.orb)).toBe(true);
    expect(popping.matchEnergyStreams?.every((stream) => stream.alpha === 1)).toBe(true);
    expect(Math.max(...laterStreams.map((stream) => stream.alpha))).toBeCloseTo(1);
    expect(laterStreams.filter((stream) => stream.alpha > 0.75).length).toBeGreaterThan(10);
    expect(shrinkingStreams.length).toBeGreaterThan(0);
    expect(shrinkingStreams.every((stream) => stream.alpha === 1)).toBe(true);
    expect(afterArrivalStreams).toHaveLength(0);
    expect(Math.max(...(popping.matchEnergyStreams ?? []).map((stream) => stream.radius))).toBeGreaterThan(10);
    expect(middleFireStream?.radius).toBeCloseTo(earlyFireStream?.radius ?? 0);
    expect(acceleratedFireStream?.radius).toBeCloseTo(earlyFireStream?.radius ?? 0);
    expect(shrinkingFireStream?.radius).toBeLessThan((earlyFireStream?.radius ?? 0) * 0.6);
    expect(shrinkingFireStream?.radius).toBeGreaterThan(0);
    expect(middleFireStream?.width).toBeCloseTo(earlyFireStream?.width ?? 0);
    expect(acceleratedFireStream?.width).toBeCloseTo(earlyFireStream?.width ?? 0);
    expect(shrinkingFireStream?.width).toBeLessThan((earlyFireStream?.width ?? 0) * 0.6);
    expect(targetedFireStream?.x).toBeGreaterThan(defaultNearTargetFireStream?.x ?? 0);
    expect(laterStreams.some((stream) => stream.x < BOARD_RECT.width / 2)).toBe(true);
    expect(nearTargetStreams.some((stream) => stream.y < BOARD_RECT.y)).toBe(true);
    expect(earlyTravel).toBeLessThan(totalTravelDistance * 0.1);
    expect(earlyProjection).toBeLessThan(0.1);
    expect(acceleratedProjection - middleProjection).toBeGreaterThan(middleProjection - earlyProjection);
  });

  it('projects tutorial swap and match energy streams onto the floating match overlay', () => {
    const presenter = new BoardAnimationPresenter();
    const trace = floatingTutorialTrace();
    const state = boardState(trace);
    state.tutorialPresentation = {
      mode: 'tutorialFullHero',
      heroHeight: LOGICAL_HEIGHT,
      sceneScale: 1.5,
      hideHud: true,
      hideBoard: true,
      floatingMatch: floatingTutorialMatchState('resolving'),
    };
    const target = { x: 120, y: 220 };

    presenter.present(state, 0, { matchEnergyTarget: target });
    const swapping = presenter.present(state, 0.06, { matchEnergyTarget: target });
    const swappingTiles = swapping.tutorialPresentation?.floatingMatch?.tiles ?? [];
    const lowerLightning = swappingTiles.find((tile) => tile.role === 'lowerLightning');
    const earth = swappingTiles.find((tile) => tile.role === 'earth');
    expect(lowerLightning?.rect.y).toBeGreaterThan(1228);
    expect(lowerLightning?.rect.y).toBeLessThan(1438);
    expect(earth?.rect.y).toBeGreaterThan(1228);
    expect(earth?.rect.y).toBeLessThan(1438);
    expect(lowerLightning?.rect.width).toBe(192);
    expect(earth?.rect.width).toBe(192);

    const popping = presenter.present(state, 0.13, { matchEnergyTarget: target });
    const streams = popping.tutorialPresentation?.floatingMatch?.matchEnergyStreams ?? [];
    const hiddenTiles = popping.tutorialPresentation?.floatingMatch?.tiles ?? [];
    const topLeftStream = streams.find((stream) => stream.streamId === 'top-left-lightning-energy-0');
    expect(streams).toHaveLength(15);
    expect(topLeftStream?.color).toBe('#fff000');
    expect(distance(topLeftStream ?? target, { x: 222, y: 1324 })).toBeLessThan(90);
    expect(hiddenTiles).toHaveLength(4);
    expect(hiddenTiles.every((tile) => tile.alpha === 0)).toBe(true);

    const later = presenter.present(state, 0.35, { matchEnergyTarget: target });
    const laterStreams = later.tutorialPresentation?.floatingMatch?.matchEnergyStreams ?? [];
    const laterTiles = later.tutorialPresentation?.floatingMatch?.tiles ?? [];
    expect(laterStreams.length).toBeGreaterThan(0);
    expect(laterTiles.every((tile) => tile.alpha === 0)).toBe(true);
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
    expect(duringDelayedPop.matchEnergyStreams?.every((stream) => stream.color === '#ff7000')).toBe(true);

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

  it('emits scrolling Lightball lightning streams toward delayed target-color clears', () => {
    const presenter = new BoardAnimationPresenter();
    const trace = lightballWaveTrace();
    const state = boardState(trace);

    presenter.present(state, 0);
    const early = presenter.present(state, 0.13);
    const travel = presenter.present(state, 0.25);
    const hold = presenter.present(state, 0.42);
    const laterHold = presenter.present(state, 0.62);
    const repeatedHold = presenter.present(state, 0.62);
    const afterTargetClear = presenter.present(state, 0.88);

    const earlyStream = early.lightballStreams?.[0];
    const travelStream = travel.lightballStreams?.[0];
    const holdStream = hold.lightballStreams?.[0];
    const laterHoldStream = laterHold.lightballStreams?.[0];
    const origin = {
      x: BOARD_RECT.x + BOARD_RECT.cellSize / 2,
      y: BOARD_RECT.y + BOARD_RECT.cellSize / 2,
    };
    const target = {
      x: BOARD_RECT.x + BOARD_RECT.cellSize * 2 + BOARD_RECT.cellSize / 2,
      y: BOARD_RECT.y + BOARD_RECT.cellSize / 2,
    };
    const fullLength = distance(origin, target);

    expect(early.lightballStreams).toHaveLength(1);
    expect(earlyStream).toMatchObject({
      streamId: 'lightball-lightball-stream-fire',
      assetId: AssetIds.powerUps.lightballStream,
      startX: origin.x,
      startY: origin.y,
      color: '#ff7000',
      alpha: 0.96,
      thickness: 64,
      tileWidth: 192,
      tileHeight: 64,
      angleDeg: 0,
    });
    expect(earlyStream?.length).toBeGreaterThan(0);
    expect(earlyStream?.length).toBeLessThan(fullLength * 0.1);
    expect(travelStream?.length).toBeGreaterThan(earlyStream?.length ?? 0);
    expect(travelStream?.length).toBeLessThan(fullLength);
    expect(holdStream?.length).toBeCloseTo(fullLength);
    expect(laterHoldStream?.length).toBeCloseTo(fullLength);
    expect(laterHoldStream?.textureOffsetX).not.toBe(holdStream?.textureOffsetX);
    expect(laterHold.lightballStreams).toEqual(repeatedHold.lightballStreams);
    expect(afterTargetClear.lightballStreams ?? []).toHaveLength(0);
    expect(trace.cascadeSteps[0].clearedTiles[1].clearDelayMs).toBe(LIGHTBALL_COLLECTION_WAVE_MS);
    expect(LIGHTBALL_COLLECTION_WAVE_MS).toBe(
      LIGHTBALL_COLLECTION_STREAM_TRAVEL_MS + LIGHTBALL_COLLECTION_STREAM_HOLD_MS,
    );
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
    expect(delayedWave.rocketCloudSprites).toHaveLength(10);
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
    expect(presenter.present(boardState(introTrace), 0.1).lightballStreams ?? []).toHaveLength(0);

    const secondPresenter = new BoardAnimationPresenter();
    secondPresenter.present(boardState(nonstandardTrace), 0);
    expect(secondPresenter.present(boardState(nonstandardTrace), 0.14).particles ?? []).toHaveLength(0);
    expect(secondPresenter.present(boardState(nonstandardTrace), 0.14).burstRings ?? []).toHaveLength(0);
    expect(secondPresenter.present(boardState(nonstandardTrace), 0.14).matchEnergyStreams ?? []).toHaveLength(0);
    expect(secondPresenter.present(boardState(nonstandardTrace), 0.14).lightballStreams ?? []).toHaveLength(0);
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

function lightballWaveTrace(): BoardAnimationTrace {
  const cells = [
    snapshotCell('lightball', 'LIGHTBALL', 0, 0),
    snapshotCell('fire', 'FIRE', 2, 0),
    snapshotCell('ice', 'ICE', 3, 0),
  ];
  return {
    kind: 'resolution',
    revisionId: 29,
    swappedCells: null,
    preSwapSnapshot: { cells },
    postSwapSnapshot: { cells },
    cascadeSteps: [
      {
        stepIndex: 0,
        beforeClearSnapshot: { cells },
        beforeGravitySnapshot: { cells: [cells[2]] },
        afterGravitySnapshot: { cells: [cells[2]] },
        finalSnapshot: { cells: [cells[2]] },
        clearedTiles: [
          cells[0],
          { ...cells[1], clearDelayMs: LIGHTBALL_COLLECTION_WAVE_MS },
        ],
        fallingTiles: [],
        refillTiles: [],
      },
    ],
    finalSnapshot: { cells: [cells[2]] },
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

function floatingTutorialTrace(): BoardAnimationTrace {
  const preSwapCells = [
    snapshotCell('top-left-lightning', 'LIGHTNING', 2, 2),
    snapshotCell('earth', 'EARTH', 3, 2),
    snapshotCell('top-right-lightning', 'LIGHTNING', 4, 2),
    snapshotCell('lower-lightning', 'LIGHTNING', 3, 3),
  ];
  const postSwapCells = [
    snapshotCell('top-left-lightning', 'LIGHTNING', 2, 2),
    snapshotCell('lower-lightning', 'LIGHTNING', 3, 2),
    snapshotCell('top-right-lightning', 'LIGHTNING', 4, 2),
    snapshotCell('earth', 'EARTH', 3, 3),
  ];
  return {
    kind: 'resolution',
    revisionId: 57,
    swappedCells: {
      from: { col: 3, row: 3 },
      to: { col: 3, row: 2 },
    },
    preSwapSnapshot: { cells: preSwapCells },
    postSwapSnapshot: { cells: postSwapCells },
    cascadeSteps: [
      {
        stepIndex: 0,
        beforeClearSnapshot: { cells: postSwapCells },
        beforeGravitySnapshot: { cells: [snapshotCell('earth', 'EARTH', 3, 3)] },
        afterGravitySnapshot: { cells: [snapshotCell('earth', 'EARTH', 3, 3)] },
        finalSnapshot: { cells: [snapshotCell('earth', 'EARTH', 3, 3)] },
        clearedTiles: [
          snapshotCell('top-left-lightning', 'LIGHTNING', 2, 2),
          snapshotCell('lower-lightning', 'LIGHTNING', 3, 2),
          snapshotCell('top-right-lightning', 'LIGHTNING', 4, 2),
        ],
        fallingTiles: [],
        refillTiles: [],
      },
    ],
    finalSnapshot: { cells: [snapshotCell('earth', 'EARTH', 3, 3)] },
  };
}

function floatingTutorialMatchState(phase: 'idle' | 'resolving'): NonNullable<
  NonNullable<BoardRenderState['tutorialPresentation']>['floatingMatch']
> {
  return {
    phase,
    tiles: [
      floatingTutorialTile('topLeftLightning', 'LIGHTNING', { col: 2, row: 2 }, 126, 1228, 20),
      floatingTutorialTile('earth', 'EARTH', { col: 3, row: 2 }, 336, 1228, 21),
      floatingTutorialTile('topRightLightning', 'LIGHTNING', { col: 4, row: 2 }, 546, 1228, 22),
      floatingTutorialTile('lowerLightning', 'LIGHTNING', { col: 3, row: 3 }, 336, 1438, 24),
    ],
    allowedDrag: {
      fromRole: 'lowerLightning',
      toRole: 'earth',
    },
  };
}

function floatingTutorialTile(
  role: FloatingTutorialTileRole,
  tileType: BoardCellVisualState['tileType'],
  sourceCoord: { col: number; row: number },
  x: number,
  y: number,
  zIndex: number,
) {
  return {
    tileId: `floating-${role}`,
    role,
    tileType,
    assetId: floatingTutorialAssetId(tileType),
    sourceCoord,
    rect: { x, y, width: 192, height: 192 },
    alpha: 1,
    flash: 0,
    scale: 1,
    zIndex,
  };
}

function floatingTutorialAssetId(tileType: BoardCellVisualState['tileType']): string {
  switch (tileType) {
    case 'EARTH':
      return AssetIds.tiles.earth;
    case 'FIRE':
      return AssetIds.tiles.fire;
    case 'ICE':
      return AssetIds.tiles.ice;
    case 'LIGHTNING':
      return AssetIds.tiles.lightning;
    default:
      throw new Error(`Unexpected floating tutorial tile type ${tileType}.`);
  }
}

function boardState(trace: BoardAnimationTrace): BoardRenderState {
  return {
    logicalWidth: LOGICAL_WIDTH,
    logicalHeight: LOGICAL_HEIGHT,
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

function distance(first: { x: number; y: number }, second: { x: number; y: number }): number {
  return Math.hypot(second.x - first.x, second.y - first.y);
}

function projectedProgress(
  start: { x: number; y: number },
  target: { x: number; y: number },
  point: { x: number; y: number },
): number {
  const travelX = target.x - start.x;
  const travelY = target.y - start.y;
  const pointX = point.x - start.x;
  const pointY = point.y - start.y;
  const travelLengthSquared = travelX * travelX + travelY * travelY;
  return travelLengthSquared === 0 ? 1 : (pointX * travelX + pointY * travelY) / travelLengthSquared;
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
