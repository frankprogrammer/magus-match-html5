import type { CellCoord } from '../core/Layout';

export const STANDARD_TILE_TYPES = ['FIRE', 'ICE', 'LIGHTNING', 'EARTH'] as const;
export type StandardTileType = (typeof STANDARD_TILE_TYPES)[number];

export const POWER_UP_TILE_TYPES = ['ROCKET_H', 'ROCKET_V', 'TNT', 'LIGHTBALL'] as const;
export type PowerUpTileType = (typeof POWER_UP_TILE_TYPES)[number];

export type SpecialTileType = 'LAND';
export type MatchableTileType = StandardTileType | SpecialTileType;
export type TileType = MatchableTileType | PowerUpTileType;

export type TileState =
  | 'IDLE'
  | 'SWAPPING'
  | 'MATCHED'
  | 'FALLING'
  | 'DETONATING'
  | 'CONVERTED_TO_PATH';

export type BlockerType = 'LOCK' | 'CURSED' | 'BOX' | 'METAL_PLATE' | 'CHAIN' | 'EGG';
export type CellModifier = 'frozen' | 'spawned-this-turn';

export interface Tile {
  id: string;
  type: TileType;
  col: number;
  row: number;
  state: TileState;
  spawnedAtMs: number;
}

export interface Blocker {
  type: BlockerType;
  hp: number;
  position: CellCoord;
}

export interface Cell {
  tile: Tile | null;
  blocker: Blocker | null;
  modifier: CellModifier | null;
  isVoid: boolean;
  isPath: boolean;
}

export function isStandardTileType(type: TileType): type is StandardTileType {
  return (STANDARD_TILE_TYPES as readonly string[]).includes(type);
}

export function isPowerUpTileType(type: TileType): type is PowerUpTileType {
  return (POWER_UP_TILE_TYPES as readonly string[]).includes(type);
}

export function isMatchableTileType(type: TileType): type is MatchableTileType {
  return isStandardTileType(type) || type === 'LAND';
}
