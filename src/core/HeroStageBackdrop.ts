import { AssetIds } from '../assets/AssetIds';

const ORDERED_HERO_BACKDROP_IDS = [
  AssetIds.backdrops.castle,
  AssetIds.backdrops.bg2,
  AssetIds.backdrops.bg3,
  AssetIds.backdrops.bg4,
  AssetIds.backdrops.bg5,
  AssetIds.backdrops.bg6,
  AssetIds.backdrops.bg7,
] as const;

/** Three levels per backdrop before advancing (e.g. bg1 for levels 1–3). */
export const HERO_STAGE_BACKDROP_LEVELS_PER_BLOCK = 3;
/** After 24 levels the sequence repeats (levels 22–24 stay on bg7; level 25 is bg1 again). */
export const HERO_STAGE_BACKDROP_CYCLE_LEVEL_SPAN = 24;

/**
 * Which hero-stage texture to show for a run level number.
 * Cycles bg1…bg7 in blocks of three levels; levels 19–24 use bg6 then bg7 (last block duplicated for 22–24);
 * then repeats from bg1 on level 25.
 */
export function heroStageBackdropAssetIdForLevel(levelNumber: number): string {
  const level = Math.max(1, Math.floor(levelNumber));
  const positionInCycle = (level - 1) % HERO_STAGE_BACKDROP_CYCLE_LEVEL_SPAN;
  const segment = Math.floor(positionInCycle / HERO_STAGE_BACKDROP_LEVELS_PER_BLOCK);
  const slot = segment <= 5 ? segment : 6;
  return ORDERED_HERO_BACKDROP_IDS[slot];
}
