import { createTrialTutorialBoardSetup } from '../src/generator/TrialTutorial';
import { generateTrialLevel } from '../src/generator/TrialGenerator';
import { validateSwap, simulateSwap } from '../src/board/BoardRules';
import { detectMatches } from '../src/board/MatchDetection';
import { coordKey, type Board } from '../src/board/Board';

describe('Trial tutorial setup', () => {
  it('injects a valid lightning swap without creating starting matches', () => {
    const level = generateTrialLevel({ difficulty: 1, seed: 1337823941 });
    const setup = createTrialTutorialBoardSetup(level.initialBoard);

    expect(detectMatches(setup.board)).toHaveLength(0);
    expect(validateSwap(setup.board, setup.allowedSwap.from, setup.allowedSwap.to).valid).toBe(true);
    expect(setup.flashCells).toEqual([setup.allowedSwap.to, setup.allowedSwap.from]);
    expect(setup.board[setup.allowedSwap.to.row][setup.allowedSwap.to.col].tile?.type).toBe('FIRE');
    expect(setup.board[setup.allowedSwap.from.row][setup.allowedSwap.from.col].tile?.type).toBe('LIGHTNING');
    expect(setup.matchCells).toHaveLength(3);
    expect(setup.flashCells).toContainEqual(setup.allowedSwap.to);
    expect(
      setup.matchCells
        .map((coord) => setup.board[coord.row][coord.col].tile?.type)
        .filter((type) => type === 'LIGHTNING'),
    ).toHaveLength(3);
    expect(setup.movingCell).toEqual(setup.allowedSwap.from);
    expect(setup.direction).toEqual({
      col: setup.allowedSwap.to.col - setup.allowedSwap.from.col,
      row: setup.allowedSwap.to.row - setup.allowedSwap.from.row,
    });

    const postSwapBoard = simulateSwap(setup.board, setup.allowedSwap.from, setup.allowedSwap.to);
    const postSwapMatches = detectMatches(postSwapBoard, { preferredSpawnCell: setup.allowedSwap.to });
    expect(
      postSwapMatches.some(
        (match) =>
          match.tileType === 'LIGHTNING' &&
          match.tiles.some((coord) => coordKey(coord) === coordKey(setup.allowedSwap.to)),
      ),
    ).toBe(true);
  });

  it('is deterministic for the same generated board', () => {
    const firstLevel = generateTrialLevel({ difficulty: 1, seed: 4088670725 });
    const secondLevel = generateTrialLevel({ difficulty: 1, seed: 4088670725 });

    const first = createTrialTutorialBoardSetup(firstLevel.initialBoard);
    const second = createTrialTutorialBoardSetup(secondLevel.initialBoard);

    expect(first.allowedSwap).toEqual(second.allowedSwap);
    expect(first.flashCells).toEqual(second.flashCells);
    expect(boardSignature(first.board)).toBe(boardSignature(second.board));
  });
});

function boardSignature(board: Board): string {
  return board
    .map((row) =>
      row
        .map((cell) => {
          if (cell.isVoid) {
            return 'void';
          }

          return cell.tile?.type ?? 'empty';
        })
        .join(','),
    )
    .join('|');
}
