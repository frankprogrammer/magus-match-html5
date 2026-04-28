import type { CellCoord } from '../core/Layout';
import { BOARD_SIZE } from '../core/Layout';
import type { Board } from './Board';
import { coordKey, sortCoords, uniqueCoords } from './Board';
import { isMatchableTileType, type MatchableTileType, type PowerUpTileType } from './TileTypes';

export type MatchAxis = 'horizontal' | 'vertical';
export type MatchShape = 'basic' | 'rocketH' | 'rocketV' | 'lightball' | 'tnt';

export interface MatchGroup {
  tiles: readonly CellCoord[];
  tileType: MatchableTileType;
  axes: readonly MatchAxis[];
  shape: MatchShape;
  spawnPowerUp: PowerUpTileType | null;
  spawnCell: CellCoord;
}

interface MatchRun {
  axis: MatchAxis;
  tileType: MatchableTileType;
  coords: CellCoord[];
}

export interface DetectMatchOptions {
  preferredSpawnCell?: CellCoord;
}

export function detectMatches(board: Board, options: DetectMatchOptions = {}): MatchGroup[] {
  const runs = [...findHorizontalRuns(board), ...findVerticalRuns(board)];
  if (runs.length === 0) {
    return [];
  }

  const parents = runs.map((_, index) => index);
  const find = (index: number): number => {
    let parent = parents[index];
    while (parent !== parents[parent]) {
      parent = parents[parent];
    }
    parents[index] = parent;
    return parent;
  };
  const union = (first: number, second: number): void => {
    const firstRoot = find(first);
    const secondRoot = find(second);
    if (firstRoot !== secondRoot) {
      parents[secondRoot] = firstRoot;
    }
  };

  const runIndexesByCoord = new Map<string, number[]>();
  runs.forEach((run, runIndex) => {
    for (const coord of run.coords) {
      const key = coordKey(coord);
      const indexes = runIndexesByCoord.get(key) ?? [];
      indexes.push(runIndex);
      runIndexesByCoord.set(key, indexes);
    }
  });

  for (const indexes of runIndexesByCoord.values()) {
    for (let i = 1; i < indexes.length; i += 1) {
      const first = indexes[0];
      const next = indexes[i];
      if (runs[first].tileType === runs[next].tileType) {
        union(first, next);
      }
    }
  }

  const runsByRoot = new Map<number, MatchRun[]>();
  runs.forEach((run, runIndex) => {
    const root = find(runIndex);
    const groupRuns = runsByRoot.get(root) ?? [];
    groupRuns.push(run);
    runsByRoot.set(root, groupRuns);
  });

  return [...runsByRoot.values()]
    .map((groupRuns) => createMatchGroup(groupRuns, options.preferredSpawnCell))
    .sort((first, second) => first.spawnCell.row - second.spawnCell.row || first.spawnCell.col - second.spawnCell.col);
}

function findHorizontalRuns(board: Board): MatchRun[] {
  const runs: MatchRun[] = [];
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    let col = 0;
    while (col < BOARD_SIZE) {
      const tile = board[row][col].tile;
      if (tile == null || !isMatchableTileType(tile.type)) {
        col += 1;
        continue;
      }

      const startCol = col;
      const tileType = tile.type;
      while (col < BOARD_SIZE && board[row][col].tile?.type === tileType) {
        col += 1;
      }

      if (col - startCol >= 3) {
        runs.push({
          axis: 'horizontal',
          tileType,
          coords: Array.from({ length: col - startCol }, (_, index) => ({
            col: startCol + index,
            row,
          })),
        });
      }
    }
  }

  return runs;
}

function findVerticalRuns(board: Board): MatchRun[] {
  const runs: MatchRun[] = [];
  for (let col = 0; col < BOARD_SIZE; col += 1) {
    let row = 0;
    while (row < BOARD_SIZE) {
      const tile = board[row][col].tile;
      if (tile == null || !isMatchableTileType(tile.type)) {
        row += 1;
        continue;
      }

      const startRow = row;
      const tileType = tile.type;
      while (row < BOARD_SIZE && board[row][col].tile?.type === tileType) {
        row += 1;
      }

      if (row - startRow >= 3) {
        runs.push({
          axis: 'vertical',
          tileType,
          coords: Array.from({ length: row - startRow }, (_, index) => ({
            col,
            row: startRow + index,
          })),
        });
      }
    }
  }

  return runs;
}

function createMatchGroup(runs: readonly MatchRun[], preferredSpawnCell?: CellCoord): MatchGroup {
  const tiles = uniqueCoords(runs.flatMap((run) => run.coords));
  const axes = [...new Set(runs.map((run) => run.axis))].sort();
  const shape = classifyMatch(runs, tiles.length);
  const spawnPowerUp = powerUpForShape(shape);

  return {
    tiles,
    tileType: runs[0].tileType,
    axes,
    shape,
    spawnPowerUp,
    spawnCell: chooseSpawnCell(tiles, preferredSpawnCell),
  };
}

function classifyMatch(runs: readonly MatchRun[], tileCount: number): MatchShape {
  const axes = new Set(runs.map((run) => run.axis));
  if (axes.size > 1 && tileCount >= 5) {
    return 'tnt';
  }

  const longestRun = Math.max(...runs.map((run) => run.coords.length));
  if (longestRun >= 5) {
    return 'lightball';
  }

  if (longestRun === 4) {
    return runs.find((run) => run.coords.length === 4)?.axis === 'vertical' ? 'rocketV' : 'rocketH';
  }

  return 'basic';
}

function powerUpForShape(shape: MatchShape): PowerUpTileType | null {
  switch (shape) {
    case 'rocketH':
      return 'ROCKET_H';
    case 'rocketV':
      return 'ROCKET_V';
    case 'lightball':
      return 'LIGHTBALL';
    case 'tnt':
      return 'TNT';
    case 'basic':
      return null;
  }
}

function chooseSpawnCell(tiles: readonly CellCoord[], preferredSpawnCell?: CellCoord): CellCoord {
  if (preferredSpawnCell != null && tiles.some((coord) => coord.col === preferredSpawnCell.col && coord.row === preferredSpawnCell.row)) {
    return { ...preferredSpawnCell };
  }

  const center = tiles.reduce(
    (sum, coord) => ({ col: sum.col + coord.col, row: sum.row + coord.row }),
    { col: 0, row: 0 },
  );
  const centerCol = center.col / tiles.length;
  const centerRow = center.row / tiles.length;

  return sortCoords(tiles).reduce((best, coord) => {
    const bestDistance = squaredDistance(best, centerCol, centerRow);
    const coordDistance = squaredDistance(coord, centerCol, centerRow);
    return coordDistance < bestDistance ? coord : best;
  });
}

function squaredDistance(coord: CellCoord, col: number, row: number): number {
  return (coord.col - col) ** 2 + (coord.row - row) ** 2;
}
