import type { CellCoord } from '../core/Layout';
import { BOARD_SIZE } from '../core/Layout';
import type { Board } from './Board';
import { getCell, uniqueCoords } from './Board';
import { areAdjacent, simulateSwap } from './BoardRules';
import { detectMatches } from './MatchDetection';
import { isStandardTileType } from './TileTypes';

export interface BoardMatchHint {
  from: CellCoord;
  to: CellCoord;
  movingCell: CellCoord;
  direction: CellCoord;
  flashCells: readonly CellCoord[];
}

export function findStandardMatchHints(board: Board): BoardMatchHint[] {
  const hints: BoardMatchHint[] = [];

  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const from = { col, row };
      const right = { col: col + 1, row };
      const down = { col, row: row + 1 };

      if (col + 1 < BOARD_SIZE) {
        const hint = createStandardMatchHint(board, from, right);
        if (hint != null) {
          hints.push(hint);
        }
      }

      if (row + 1 < BOARD_SIZE) {
        const hint = createStandardMatchHint(board, from, down);
        if (hint != null) {
          hints.push(hint);
        }
      }
    }
  }

  return hints;
}

export function createStandardMatchHint(
  board: Board,
  from: CellCoord,
  to: CellCoord,
): BoardMatchHint | null {
  if (!areAdjacent(from, to)) {
    return null;
  }

  const fromCell = getCell(board, from);
  const toCell = getCell(board, to);
  if (
    fromCell == null ||
    toCell == null ||
    fromCell.isVoid ||
    toCell.isVoid ||
    fromCell.tile == null ||
    toCell.tile == null ||
    !isStandardTileType(fromCell.tile.type) ||
    !isStandardTileType(toCell.tile.type)
  ) {
    return null;
  }

  const simulatedBoard = simulateSwap(board, from, to);
  const matches = detectMatches(simulatedBoard, { preferredSpawnCell: to }).filter((match) =>
    match.tiles.some((coord) => coordsEqual(coord, from) || coordsEqual(coord, to)),
  );
  if (matches.length === 0) {
    return null;
  }

  const primaryMatch =
    matches.find((match) => match.tiles.some((coord) => coordsEqual(coord, to))) ?? matches[0];
  const movingCell = primaryMatch.tiles.some((coord) => coordsEqual(coord, to)) ? from : to;
  const targetCell = coordsEqual(movingCell, from) ? to : from;

  return {
    from,
    to,
    movingCell,
    direction: {
      col: targetCell.col - movingCell.col,
      row: targetCell.row - movingCell.row,
    },
    flashCells: uniqueCoords(matches.flatMap((match) => match.tiles.map((coord) => mapPostSwapCoordToOriginal(coord, from, to)))),
  };
}

function mapPostSwapCoordToOriginal(coord: CellCoord, from: CellCoord, to: CellCoord): CellCoord {
  if (coordsEqual(coord, to)) {
    return { ...from };
  }

  if (coordsEqual(coord, from)) {
    return { ...to };
  }

  return { ...coord };
}

function coordsEqual(first: CellCoord, second: CellCoord): boolean {
  return first.col === second.col && first.row === second.row;
}
