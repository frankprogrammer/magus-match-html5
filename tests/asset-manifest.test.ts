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
    expect(AssetManifest[AssetIds.powerUps.orb].browserUrl).toBe(
      "/assets/powerups/orb.png",
    );
    expect(AssetManifest[AssetIds.powerUps.orb].runtimeSize).toBe("256x256");
    expect(AssetManifest[AssetIds.powerUps.lightballStream].browserUrl).toBe(
      "/assets/powerups/lightning.png",
    );
    expect(AssetManifest[AssetIds.powerUps.lightballStream].runtimeSize).toBe(
      "256x85",
    );
    expect(AssetManifest[AssetIds.tiles.fire].runtimeSize).toBe("256x256");
    expect(AssetManifest[AssetIds.backdrops.forest].runtimeSize).toBe(
      "2160x1000",
    );
    expect(AssetManifest[AssetIds.backdrops.castle].browserUrl).toBe(
      "/assets/backdrops/bg1.png",
    );
    expect(AssetManifest[AssetIds.backdrops.castle].runtimeSize).toBe(
      "cover 864x700 hero stage",
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
    expect(AssetManifest[AssetIds.ui.tutorialFinger].browserUrl).toBe(
      "/assets/ui/finger.png",
    );
    expect(AssetManifest[AssetIds.ui.tutorialFinger].runtimeSize).toBe(
      "256x256",
    );
    expect(AssetManifest[AssetIds.ui.activateEarth].browserUrl).toBe(
      "/assets/ui/activate-earth.png",
    );
    expect(AssetManifest[AssetIds.ui.activateFire].browserUrl).toBe(
      "/assets/ui/activate-fire.png",
    );
    expect(AssetManifest[AssetIds.ui.activateIce].browserUrl).toBe(
      "/assets/ui/activate-ice.png",
    );
    expect(AssetManifest[AssetIds.ui.activateLightning].browserUrl).toBe(
      "/assets/ui/activate-lightning.png",
    );
    expect(AssetManifest[AssetIds.ui.levelCleared].browserUrl).toBe(
      "/assets/ui/level-cleared.png",
    );
    expect(AssetManifest[AssetIds.ui.floorCleared].browserUrl).toBe(
      "/assets/ui/floor-cleared.png",
    );
    expect(AssetManifest[AssetIds.ui.lifeLost].browserUrl).toBe(
      "/assets/ui/life-lost.png",
    );
    expect(AssetManifest[AssetIds.ui.gameOver].browserUrl).toBe(
      "/assets/ui/game-over.png",
    );
    expect(AssetManifest[AssetIds.ui.activateEarth].runtimeSize).toBe(
      "800x450 display",
    );
    expect(AssetManifest[AssetIds.ui.levelCleared].runtimeSize).toBe(
      "800x450 display",
    );
    expect(AssetManifest[AssetIds.ui.floorCleared].runtimeSize).toBe(
      "800x450 display",
    );
    expect(AssetManifest[AssetIds.ui.lifeLost].runtimeSize).toBe(
      "800x450 display",
    );
    expect(AssetManifest[AssetIds.ui.gameOver].runtimeSize).toBe(
      "800x450 display",
    );
    expect(AssetManifest[AssetIds.materials.mageTexture].browserUrl).toBe(
      "/assets/rigs/knight2.fbm/knight_texture_final.png",
    );
    expect(AssetManifest[AssetIds.materials.koboldTexture].browserUrl).toBe(
      "/assets/rigs/kobold.fbm/kobold_texture.png",
    );
    expect(AssetManifest[AssetIds.materials.bossTexture].browserUrl).toBe(
      "/assets/rigs/boss.fbm/kobold_boss_texture.png",
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
    expect(AssetManifest[AssetIds.spritesheets.fireBurn].browserUrl).toBe(
      "/assets/spritesheets/fire-sheet.png",
    );
    expect(AssetManifest[AssetIds.spritesheets.fireBurn].runtimeSize).toBe(
      "1774x887, 8 frames in a 4x2 grid",
    );
    expect(AssetManifest[AssetIds.spritesheets.earthImpact].browserUrl).toBe(
      "/assets/spritesheets/rock-sheet.png",
    );
    expect(AssetManifest[AssetIds.spritesheets.earthImpact].runtimeSize).toBe(
      "1254x1254, 4 frames in a 2x2 grid",
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

  it("maps the temporary boss rig to the dropped FBX mini-boss model", () => {
    expect(AssetManifest[AssetIds.rigs.boss]).toMatchObject({
      browserUrl: "/assets/rigs/boss.fbx",
      sourceFormat: "fbx",
      pivot: "bottomCenter",
      upAxis: "+Y",
    });
  });
});
