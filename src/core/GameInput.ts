import type { CellCoord } from './Layout';

export type GameInputCommand =
  | { type: 'tap'; x: number; y: number }
  | { type: 'dragStart'; x: number; y: number }
  | { type: 'dragMove'; x: number; y: number }
  | { type: 'dragEnd'; x: number; y: number }
  | { type: 'swap'; from: CellCoord; to: CellCoord }
  | { type: 'pause' }
  | { type: 'restart' }
  | { type: 'muteToggle' };
