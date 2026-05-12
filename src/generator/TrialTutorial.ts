import type { CellCoord } from '../core/Layout';
import { BOARD_SIZE } from '../core/Layout';
import {
  cloneBoard,
  coordKey,
  createBoardScopedTileIdFactory,
  createTile,
  getCell,
  type Board,
} from '../board/Board';
import { validateSwap, simulateSwap } from '../board/BoardRules';
import { detectMatches } from '../board/MatchDetection';
import type { StandardTileType } from '../board/TileTypes';

export interface TrialTutorialBoardSetup {
  board: Board;
  allowedSwap: { from: CellCoord; to: CellCoord };
  flashCells: readonly CellCoord[];
  matchCells: readonly CellCoord[];
  movingCell: CellCoord;
  direction: CellCoord;
}

const PATCH_TYPES: readonly {
  offset: CellCoord;
  type: StandardTileType;
}[] = [
  { offset: { col: 0, row: 0 }, type: 'LIGHTNING' },
  { offset: { col: 1, row: 0 }, type: 'FIRE' },
  { offset: { col: 2, row: 0 }, type: 'LIGHTNING' },
  { offset: { col: 0, row: 1 }, type: 'ICE' },
  { offset: { col: 1, row: 1 }, type: 'LIGHTNING' },
  { offset: { col: 2, row: 1 }, type: 'EARTH' },
];

const FALLBACK_PATTERN: readonly StandardTileType[] = ['FIRE', 'ICE', 'LIGHTNING', 'EARTH'];

export function createTrialTutorialBoardSetup(baseBoard: Board): TrialTutorialBoardSetup {
  for (const origin of patchOrigins()) {
    const setup = tryCreateSetup(baseBoard, origin);
    if (setup != null) {
      return setup;
    }
  }

  for (let variant = 0; variant < FALLBACK_PATTERN.length; variant += 1) {
    const patternedBoard = createPatternedBoard(baseBoard, variant);
    for (const origin of patchOrigins()) {
      const setup = tryCreateSetup(patternedBoard, origin);
      if (setup != null) {
        return setup;
      }
    }
  }

  throw new Error('Unable to create a valid Trial tutorial lightning board.');
}

export function isTrialTutorialSwap(
  setup: Pick<TrialTutorialBoardSetup, 'allowedSwap'>,
  from: CellCoord,
  to: CellCoord,
): boolean {
  return (
    (coordsEqual(from, setup.allowedSwap.from) && coordsEqual(to, setup.allowedSwap.to)) ||
    (coordsEqual(from, setup.allowedSwap.to) && coordsEqual(to, setup.allowedSwap.from))
  );
}

function tryCreateSetup(baseBoard: Board, origin: CellCoord): TrialTutorialBoardSetup | null {
  const board = cloneBoard(baseBoard);
  const nextTileId = createBoardScopedTileIdFactory(board, 'trial-tutorial-tile');

  for (const patch of PATCH_TYPES) {
    const coord = {
      col: origin.col + patch.offset.col,
      row: origin.row + patch.offset.row,
    };
    if (!setTutorialTileType(board, coord, patch.type, nextTileId)) {
      return null;
    }
  }

  const allowedSwap = {
    from: { col: origin.col + 1, row: origin.row + 1 },
    to: { col: origin.col + 1, row: origin.row },
  };
  const matchCells = [
    { col: origin.col, row: origin.row },
    { ...allowedSwap.from },
    { col: origin.col + 2, row: origin.row },
  ];
  const flashCells = [{ ...allowedSwap.to }, { ...allowedSwap.from }];
  const setup: TrialTutorialBoardSetup = {
    board,
    allowedSwap,
    flashCells,
    matchCells,
    movingCell: { ...allowedSwap.from },
    direction: {
      col: allowedSwap.to.col - allowedSwap.from.col,
      row: allowedSwap.to.row - allowedSwap.from.row,
    },
  };

  return isValidTutorialSetup(setup) ? setup : null;
}

function setTutorialTileType(
  board: Board,
  coord: CellCoord,
  type: StandardTileType,
  nextTileId: () => string,
): boolean {
  const cell = getCell(board, coord);
  if (cell == null || cell.isVoid || cell.blocker != null) {
    return false;
  }

  cell.tile =
    cell.tile == null
      ? createTile(type, coord.col, coord.row, nextTileId)
      : {
          ...cell.tile,
          type,
          col: coord.col,
          row: coord.row,
        };
  return true;
}

function isValidTutorialSetup(setup: TrialTutorialBoardSetup): boolean {
  if (detectMatches(setup.board).length > 0) {
    return false;
  }

  if (!validateSwap(setup.board, setup.allowedSwap.from, setup.allowedSwap.to).valid) {
    return false;
  }

  const postSwapBoard = simulateSwap(setup.board, setup.allowedSwap.from, setup.allowedSwap.to);
  const postSwapMatchCells = [
    { col: setup.allowedSwap.to.col - 1, row: setup.allowedSwap.to.row },
    { ...setup.allowedSwap.to },
    { col: setup.allowedSwap.to.col + 1, row: setup.allowedSwap.to.row },
  ];
  return detectMatches(postSwapBoard, { preferredSpawnCell: setup.allowedSwap.to }).some(
    (match) =>
      match.tileType === 'LIGHTNING' &&
      postSwapMatchCells.every((coord) => match.tiles.some((matchCoord) => coordsEqual(matchCoord, coord))),
  );
}

function createPatternedBoard(baseBoard: Board, variant: number): Board {
  const board = cloneBoard(baseBoard);
  const nextTileId = createBoardScopedTileIdFactory(board, 'trial-tutorial-fallback-tile');
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const cell = board[row][col];
      if (cell.isVoid) {
        continue;
      }

      const type = FALLBACK_PATTERN[(col + row * 2 + variant) % FALLBACK_PATTERN.length];
      cell.tile =
        cell.tile == null
          ? createTile(type, col, row, nextTileId)
          : {
              ...cell.tile,
              type,
              col,
              row,
            };
    }
  }

  return board;
}

function patchOrigins(): CellCoord[] {
  const origins: CellCoord[] = [];
  for (let row = 1; row < BOARD_SIZE - 1; row += 1) {
    for (let col = 0; col <= BOARD_SIZE - 3; col += 1) {
      origins.push({ col, row });
    }
  }

  return origins.sort((first, second) => {
    const firstDistance = Math.abs(first.col - 2) + Math.abs(first.row - 3);
    const secondDistance = Math.abs(second.col - 2) + Math.abs(second.row - 3);
    return firstDistance - secondDistance || first.row - second.row || first.col - second.col;
  });
}

function coordsEqual(first: CellCoord, second: CellCoord): boolean {
  return coordKey(first) === coordKey(second);
}
