import { describe, expect, it } from 'vitest';
import { AssetIds } from '../src/assets/AssetIds';
import { MagusMatchGameApp, phaseToCinematicState } from '../src/core/GameApp';
import { HeroStageTemplateIds } from '../src/world-3d/HeroStageTemplates';

describe('HeroWorldState', () => {
  it('includes backdrop, mage, prince cage, goal, and Journey path markers', () => {
    const app = new MagusMatchGameApp(123);
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
    const app = new MagusMatchGameApp(789, { debugLevelType: 'TRIAL' });
    const state = app.getHeroWorldState();

    expect(state.levelType).toBe('TRIAL');
    expect(state.objects.some((object) => object.templateId === HeroStageTemplateIds.mage)).toBe(true);
    expect(state.objects.some((object) => object.templateId === HeroStageTemplateIds.monsterPlaceholder)).toBe(true);
  });

  it('uses the reduced mage world scale for temporary FBX proxy models', () => {
    const journeyMage = new MagusMatchGameApp(123)
      .getHeroWorldState()
      .objects.find((object) => object.templateId === HeroStageTemplateIds.mage);
    const trialMage = new MagusMatchGameApp(123, { debugLevelType: 'TRIAL' })
      .getHeroWorldState()
      .objects.find((object) => object.templateId === HeroStageTemplateIds.mage);

    expect(journeyMage?.transform.scale).toEqual({ x: 0.042, y: 0.075, z: 0.042 });
    expect(trialMage?.transform.scale).toEqual({ x: 0.04, y: 0.068, z: 0.04 });
  });
});
