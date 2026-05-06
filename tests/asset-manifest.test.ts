import { describe, expect, it } from "vitest";
import { AssetIds } from "../src/assets/AssetIds";
import { AssetManifest } from "../src/assets/AssetManifest";

describe("AssetManifest", () => {
  it("contains entries for all current tiles, power-ups, backdrops, rigs, key props, and sounds", () => {
    const requiredIds = [
      ...Object.values(AssetIds.tiles),
      ...Object.values(AssetIds.powerUps),
      ...Object.values(AssetIds.backdrops),
      ...Object.values(AssetIds.rigs),
      ...Object.values(AssetIds.ui),
      ...Object.values(AssetIds.materials),
      ...Object.values(AssetIds.spritesheets),
      ...Object.values(AssetIds.sounds),
      AssetIds.props.princeCage,
      AssetIds.props.goalFlag,
      AssetIds.props.abductorGlove,
      AssetIds.props.abductorHook,
      AssetIds.props.abductorHand,
      AssetIds.props.abductorRope,
    ];

    for (const id of requiredIds) {
      expect(AssetManifest[id], id).toBeDefined();
      expect(AssetManifest[id].id).toBe(id);
    }
  });

  it("uses static browser URLs, source formats, and future MHS paths", () => {
    for (const entry of Object.values(AssetManifest)) {
      expect(entry.browserUrl).toMatch(/^\/assets\//);
      expect(entry.browserUrl).not.toContain("${");
      expect(entry.sourceFormat).toBeDefined();
      expect(entry.futureMhsPath).toBeDefined();
      expect(entry.futureMhsPath).not.toContain("${");
      if (entry.kind === "audio") {
        expect(entry.browserUrl).toMatch(/^\/assets\/audio\//);
        expect(entry.notes).toContain("SoundComponent");
      } else if (entry.kind === "ui") {
        expect(entry.browserUrl).toMatch(/^\/assets\/ui\//);
      } else {
        expect(entry.artPromptId).toBeDefined();
      }
    }
  });

  it("documents runtime size policy for board textures", () => {
    expect(AssetManifest[AssetIds.tiles.fire].browserUrl).toBe(
      "/assets/tiles/tile-fire.png",
    );
    expect(AssetManifest[AssetIds.tiles.empty].browserUrl).toBe(
      "/assets/tiles/empty.png",
    );
    expect(AssetManifest[AssetIds.powerUps.rocketH].browserUrl).toBe(
      "/assets/powerups/power-rocket-h.png",
    );
    expect(AssetManifest[AssetIds.tiles.fire].runtimeSize).toBe("256x256");
    expect(AssetManifest[AssetIds.backdrops.forest].runtimeSize).toBe(
      "2160x1000",
    );
    expect(AssetManifest[AssetIds.backdrops.castle].browserUrl).toBe(
      "/assets/backdrops/backdrop-castle.png",
    );
    expect(AssetManifest[AssetIds.backdrops.castle].runtimeSize).toBe(
      "cover 1080x500 hero stage",
    );
    expect(AssetManifest[AssetIds.ui.hudBanner].browserUrl).toBe(
      "/assets/ui/ui-banner.png",
    );
    expect(AssetManifest[AssetIds.ui.hudBanner].runtimeSize).toBe("1080x150");
    expect(AssetManifest[AssetIds.ui.boardBackground].browserUrl).toBe(
      "/assets/ui/board-background.png",
    );
    expect(AssetManifest[AssetIds.ui.boardBackground].runtimeSize).toBe(
      "1080x1080",
    );
    expect(AssetManifest[AssetIds.materials.mageTexture].browserUrl).toBe(
      "/assets/rigs/knight2.fbm/knight_texture_final.png",
    );
    expect(AssetManifest[AssetIds.materials.koboldTexture].browserUrl).toBe(
      "/assets/rigs/kobold.fbm/kobold_texture.png",
    );
    expect(AssetManifest[AssetIds.spritesheets.tntExplosion].browserUrl).toBe(
      "/assets/spritesheets/explosion-sprite.png",
    );
    expect(AssetManifest[AssetIds.spritesheets.tntExplosion].runtimeSize).toBe(
      "512x256, 8 frames at 128x128",
    );
    expect(AssetManifest[AssetIds.spritesheets.rocketCloud].browserUrl).toBe(
      "/assets/spritesheets/rocketCloud.png",
    );
    expect(AssetManifest[AssetIds.spritesheets.rocketCloud].runtimeSize).toBe(
      "512x256, 8 frames at 128x128",
    );
    expect(AssetManifest[AssetIds.spritesheets.matchOrb].browserUrl).toBe(
      "/assets/spritesheets/orb.png",
    );
    expect(AssetManifest[AssetIds.spritesheets.matchOrb].runtimeSize).toBe(
      "256x256, 4 frames at 128x128",
    );
  });

  it("maps the temporary mage rig to the dropped FBX player model", () => {
    expect(AssetManifest[AssetIds.rigs.mage]).toMatchObject({
      browserUrl: "/assets/rigs/knight2.fbx",
      sourceFormat: "fbx",
      pivot: "bottomCenter",
      upAxis: "+Y",
    });
  });

  it("maps the temporary kobold rig to the dropped FBX enemy model", () => {
    expect(AssetManifest[AssetIds.rigs.kobold]).toMatchObject({
      browserUrl: "/assets/rigs/kobold.fbx",
      sourceFormat: "fbx",
      pivot: "bottomCenter",
      upAxis: "+Y",
    });
  });
});
