import { describe, expect, it } from "vitest";
import { AssetIds } from "../src/assets/AssetIds";
import { heroStageBackdropAssetIdForLevel } from "../src/core/HeroStageBackdrop";

describe("heroStageBackdropAssetIdForLevel", () => {
  it("uses bg1 for levels 1–3", () => {
    expect(heroStageBackdropAssetIdForLevel(1)).toBe(AssetIds.backdrops.castle);
    expect(heroStageBackdropAssetIdForLevel(2)).toBe(AssetIds.backdrops.castle);
    expect(heroStageBackdropAssetIdForLevel(3)).toBe(AssetIds.backdrops.castle);
  });

  it("advances every three levels through bg7", () => {
    expect(heroStageBackdropAssetIdForLevel(4)).toBe(AssetIds.backdrops.bg2);
    expect(heroStageBackdropAssetIdForLevel(7)).toBe(AssetIds.backdrops.bg3);
    expect(heroStageBackdropAssetIdForLevel(10)).toBe(AssetIds.backdrops.bg4);
    expect(heroStageBackdropAssetIdForLevel(13)).toBe(AssetIds.backdrops.bg5);
    expect(heroStageBackdropAssetIdForLevel(16)).toBe(AssetIds.backdrops.bg6);
  });

  it("uses bg7 for levels 19–24", () => {
    for (const level of [19, 20, 21, 22, 23, 24]) {
      expect(heroStageBackdropAssetIdForLevel(level)).toBe(AssetIds.backdrops.bg7);
    }
  });

  it("returns to bg1 on level 25 and repeats the 24-level pattern", () => {
    expect(heroStageBackdropAssetIdForLevel(25)).toBe(AssetIds.backdrops.castle);
    expect(heroStageBackdropAssetIdForLevel(28)).toBe(AssetIds.backdrops.bg2);
  });

  it("clamps non-positive or fractional input to level 1 backdrop", () => {
    expect(heroStageBackdropAssetIdForLevel(0)).toBe(AssetIds.backdrops.castle);
    expect(heroStageBackdropAssetIdForLevel(-1)).toBe(AssetIds.backdrops.castle);
    expect(heroStageBackdropAssetIdForLevel(1.2)).toBe(AssetIds.backdrops.castle);
  });
});
