import { describe, expect, it } from 'vitest';
import { AssetIds } from '../src/assets/AssetIds';
import {
  createTrialMonsterHealthBarObjects,
  healthBarTintForRatio,
  MagusMatchGameApp,
  MAGE_WORLD_SCALE,
  phaseToCinematicState,
} from '../src/core/GameApp';
import { getTrialMageWorldPosition } from '../src/generator/TrialRules';
import { HeroStageTemplateIds } from '../src/world-3d/HeroStageTemplates';

describe('HeroWorldState', () => {
  it('includes backdrop, mage, prince cage, goal, and Journey path markers', () => {
    const app = new MagusMatchGameApp(123, { debugLevelType: 'JOURNEY' });
    const state = app.getHeroWorldState();
    const objectsByTemplate = new Map(state.objects.map((object) => [object.templateId, object]));

    expect(state.levelType).toBe('JOURNEY');
    expect(state.backdropId).toBe(AssetIds.backdrops.castle);
    expect(objectsByTemplate.has(HeroStageTemplateIds.backdropForest)).toBe(true);
    expect(objectsByTemplate.has(HeroStageTemplateIds.mage)).toBe(true);
    expect(objectsByTemplate.has(HeroStageTemplateIds.princeCage)).toBe(true);
    expect(objectsByTemplate.has(HeroStageTemplateIds.goalFlag)).toBe(true);
    expect(state.objects.some((object) => object.templateId === HeroStageTemplateIds.pathMarker)).toBe(true);
  });

  it('uses stable object IDs across repeated state reads', () => {
    const app = new MagusMatchGameApp(456);

    expect(app.getHeroWorldState().objects.map((object) => object.objectId)).toEqual(
      app.getHeroWorldState().objects.map((object) => object.objectId),
    );
  });

  it('maps core phases to cinematic states', () => {
    expect(phaseToCinematicState('IDLE')).toBe('none');
    expect(phaseToCinematicState('WIN')).toBe('victory');
    expect(phaseToCinematicState('LOSE')).toBe('fail');
  });

  it('keeps camera state as plain data', () => {
    const camera = new MagusMatchGameApp(789).getHeroWorldState().camera;

    expect(camera).toEqual({
      mode: 'fixed',
      position: { x: 0, y: 0, z: 12 },
      target: { x: 0, y: 0, z: 0 },
      fovDeg: 35,
    });
    expect(JSON.parse(JSON.stringify(camera))).toEqual(camera);
  });

  it('includes Trial mage and monster placeholders for debug Trial levels', () => {
    const app = new MagusMatchGameApp(789);
    const state = app.getHeroWorldState();

    expect(state.levelType).toBe('TRIAL');
    expect(state.objects.some((object) => object.templateId === HeroStageTemplateIds.mage)).toBe(true);
    expect(state.objects.some((object) => object.templateId === HeroStageTemplateIds.monsterPlaceholder)).toBe(true);
  });

  it('includes stable Trial enemy health bar objects above alive monsters', () => {
    const state = new MagusMatchGameApp(789).getHeroWorldState();
    const monster = state.objects.find((object) => object.templateId === HeroStageTemplateIds.monsterPlaceholder);
    const track = state.objects.find((object) => object.templateId === HeroStageTemplateIds.healthBarTrack);
    const fill = state.objects.find((object) => object.templateId === HeroStageTemplateIds.healthBarFill);

    expect(monster).toBeDefined();
    expect(track?.objectId).toBe('trial-monster-trial-1-0-health-track');
    expect(fill?.objectId).toBe('trial-monster-trial-1-0-health-fill');
    expect(track?.replication).toBe('localCosmetic');
    expect(fill?.replication).toBe('localCosmetic');
    expect(track?.transform.position.y).toBeGreaterThan(monster?.transform.position.y ?? 0);
    expect(fill?.transform.scale.x).toBeCloseTo(track?.transform.scale.x ?? 0);
    expect(track?.transform.scale.y).toBeCloseTo(0.18);
    expect(fill?.transform.scale.y).toBeCloseTo(0.11);
    expect(fill?.tintHex).toBe('#27ae60');
  });

  it('scales and colors health bar fill from monster health ratio', () => {
    const bars = createTrialMonsterHealthBarObjects(
      {
        monsterId: 'low',
        kind: 'kobold',
        laneId: 0,
        hp: 20,
        maxHp: 100,
        x: 0,
        spawnTimeMs: 0,
        walkSpeed: 0.2,
        scoreValue: 100,
      },
      { x: 2, y: -0.5, z: 0.35 },
    );
    const track = bars.find((object) => object.templateId === HeroStageTemplateIds.healthBarTrack);
    const fill = bars.find((object) => object.templateId === HeroStageTemplateIds.healthBarFill);

    expect(bars).toHaveLength(2);
    expect(fill?.transform.scale.x).toBeCloseTo((track?.transform.scale.x ?? 0) * 0.2);
    expect(fill?.transform.position.x).toBeLessThan(track?.transform.position.x ?? 0);
    expect(fill?.tintHex).toBe('#eb5757');
  });

  it('omits health bar objects for defeated monsters', () => {
    const bars = createTrialMonsterHealthBarObjects(
      {
        monsterId: 'defeated',
        kind: 'kobold',
        laneId: 0,
        hp: 0,
        maxHp: 100,
        x: 0,
        spawnTimeMs: 0,
        walkSpeed: 0.2,
        scoreValue: 100,
      },
      { x: 2, y: -0.5, z: 0.35 },
    );

    expect(bars).toEqual([]);
  });

  it('maps health bar color thresholds to green, gold, and red', () => {
    expect(healthBarTintForRatio(0.75)).toBe('#27ae60');
    expect(healthBarTintForRatio(0.5)).toBe('#f2c94c');
    expect(healthBarTintForRatio(0.25)).toBe('#f2c94c');
    expect(healthBarTintForRatio(0.24)).toBe('#eb5757');
  });

  it('uses doubled readable mage world scale for normalized FBX models', () => {
    const journeyMage = new MagusMatchGameApp(123, { debugLevelType: 'JOURNEY' })
      .getHeroWorldState()
      .objects.find((object) => object.templateId === HeroStageTemplateIds.mage);
    const trialMage = new MagusMatchGameApp(123)
      .getHeroWorldState()
      .objects.find((object) => object.templateId === HeroStageTemplateIds.mage);
    const trialLevel = new MagusMatchGameApp(123).getCurrentLevelForDebug();
    const baseTrialMagePosition = trialLevel?.type === 'TRIAL' ? getTrialMageWorldPosition(trialLevel) : null;

    expect(journeyMage?.transform.scale).toEqual(MAGE_WORLD_SCALE);
    expect(trialMage?.transform.scale).toEqual(MAGE_WORLD_SCALE);
    expect(MAGE_WORLD_SCALE).toEqual({ x: 2, y: 2, z: 2 });
    expect(journeyMage?.transform.position.y).toBeLessThan(1.6);
    expect(trialMage?.transform.position.y).toBeLessThan(-0.85);
    expect(trialMage?.transform.position.x).toBeCloseTo((baseTrialMagePosition?.x ?? 0) + 0.85);
  });

  it('doubles Trial enemy scales and lowers their world positions', () => {
    const state = new MagusMatchGameApp(789).getHeroWorldState();
    const monster = state.objects.find((object) => object.templateId === HeroStageTemplateIds.monsterPlaceholder);

    expect(monster?.transform.scale).toEqual({ x: 0.92, y: 1.24, z: 0.92 });
    expect(monster?.transform.position.y).toBeLessThan(-0.85);
  });
});
