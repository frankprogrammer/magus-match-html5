import { describe, expect, it } from 'vitest';
import { AssetIds } from '../src/assets/AssetIds';
import {
  createTrialEarthImpactObjects,
  createTrialMonsterFireBurnObjects,
  createTrialMonsterHealthBarObjects,
  healthBarTintForRatio,
  MagusMatchGameApp,
  MAGE_WORLD_SCALE,
  MAGE_WORLD_Y_OFFSET,
  MINI_BOSS_WORLD_SCALE,
  phaseToCinematicState,
  TRIAL_ACTOR_ENTRANCE_ENEMY_DURATION_SEC,
  TRIAL_ACTOR_ENTRANCE_MAGE_DURATION_SEC,
  TRIAL_ACTOR_ENTRANCE_OFFSCREEN_X_OFFSET,
  TRIAL_ACTOR_ENTRANCE_TOTAL_DURATION_SEC,
  TRIAL_MAGE_EXIT_DURATION_SEC,
  TRIAL_MAGE_EXIT_OFFSCREEN_X_OFFSET,
  trialMonsterHitShakeOffset,
} from '../src/core/GameApp';
import {
  getTrialMageWorldPosition,
  getTrialMonsterSpellHitWorldPosition,
  getTrialMonsterWorldPosition,
  KOBOLD_CLUB_NODE_NAMES,
  KOBOLD_DEFEAT_FADE_SEC,
  KOBOLD_HEAD_NODE_NAMES,
  koboldModelVariantForMonster,
  TRIAL_MONSTER_BOTTOM_VISUAL_Y_OFFSET,
  TRIAL_MONSTER_TOP_VISUAL_Y_OFFSET,
} from '../src/generator/TrialRules';
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

  it('emits node visibility overrides for Trial kobold head and club variants', () => {
    const app = new MagusMatchGameApp(789);
    const runtime = app.getTrialRuntimeForDebug();
    const monster = runtime?.monsters[0];
    if (monster == null) {
      throw new Error('Expected Trial monster.');
    }

    const monsterObject = app
      .getHeroWorldState()
      .objects.find((object) => object.objectId === `trial-monster-${monster.monsterId}`);
    const variant = monster.modelVariant ?? koboldModelVariantForMonster(789, monster.monsterId);

    expect(monsterObject?.nodeVisibility?.visibleNodeNames).toEqual([
      variant.headNodeName,
      variant.clubNodeName,
    ]);
    expect(monsterObject?.nodeVisibility?.hiddenNodeNames).toEqual([
      ...KOBOLD_HEAD_NODE_NAMES.filter((nodeName) => nodeName !== variant.headNodeName),
      ...KOBOLD_CLUB_NODE_NAMES.filter((nodeName) => nodeName !== variant.clubNodeName),
    ]);
  });

  it('uses the boss template without kobold variation overrides for mini-boss monsters', () => {
    const app = new MagusMatchGameApp(789, { debugLevelType: 'TRIAL' });
    const runtime = app.getTrialRuntimeForDebug();
    if (runtime == null || runtime.monsters[0] == null) {
      throw new Error('Expected Trial runtime.');
    }
    finishTrialEntrance(app);

    setTrialRuntimeForDebug(app, {
      ...runtime,
      monsters: [
        {
          ...runtime.monsters[0],
          monsterId: 'boss',
          kind: 'miniBoss',
        },
      ],
    });

    const level = app.getCurrentLevelForDebug();
    if (level?.type !== 'TRIAL') {
      throw new Error('Expected Trial level.');
    }

    const boss = app.getHeroWorldState().objects.find((object) => object.objectId === 'trial-monster-boss');
    const bossTrack = app
      .getHeroWorldState()
      .objects.find((object) => object.objectId === 'trial-monster-boss-health-track');
    const bossFill = app
      .getHeroWorldState()
      .objects.find((object) => object.objectId === 'trial-monster-boss-health-fill');
    const baseMonsterPosition = getTrialMonsterWorldPosition(level, runtime.monsters[0]);
    const visualYOffset = runtime.monsters[0].visualYOffset ?? 0;

    expect(boss?.templateId).toBe(HeroStageTemplateIds.miniBoss);
    expect(boss?.transform.scale).toEqual(MINI_BOSS_WORLD_SCALE);
    expect(boss?.transform.position.y).toBeCloseTo(baseMonsterPosition.y - 2.28 + visualYOffset);
    expect(boss?.nodeVisibility).toBeUndefined();
    expect((bossTrack?.transform.position.y ?? 0) - (boss?.transform.position.y ?? 0)).toBeCloseTo(5.8);
    expect(bossTrack?.transform.scale.x).toBeCloseTo(1.84);
    expect(bossTrack?.transform.scale.y).toBeCloseTo(0.36);
    expect(bossFill?.transform.scale.y).toBeCloseTo(0.22);
  });

  it('emits node visibility overrides for tutorial kobolds', () => {
    const app = new MagusMatchGameApp(555);

    const runtime = app.getTrialRuntimeForDebug();
    const level = app.getCurrentLevelForDebug();
    const tutorialMonster = runtime?.monsters.find((monster) => monster.monsterId === 'tutorial-kobold-0');
    const tutorialObject = app
      .getHeroWorldState()
      .objects.find((object) => object.objectId === 'trial-monster-tutorial-kobold-0');

    expect(level?.type).toBe('TRIAL');
    expect(tutorialMonster?.modelVariant).toEqual(
      koboldModelVariantForMonster(level?.seed ?? 0, 'tutorial-kobold-0'),
    );
    expect(tutorialObject?.nodeVisibility?.visibleNodeNames).toEqual([
      tutorialMonster?.modelVariant?.headNodeName,
      tutorialMonster?.modelVariant?.clubNodeName,
    ]);
    expect(tutorialObject?.nodeVisibility?.hiddenNodeNames).toHaveLength(4);
  });

  it('includes stable Trial enemy health bar objects above alive monsters', () => {
    const app = new MagusMatchGameApp(789, { debugLevelType: 'TRIAL' });
    finishTrialEntrance(app);
    const state = app.getHeroWorldState();
    const monster = state.objects.find((object) => object.templateId === HeroStageTemplateIds.monsterPlaceholder);
    const track = state.objects.find((object) => object.templateId === HeroStageTemplateIds.healthBarTrack);
    const fill = state.objects.find((object) => object.templateId === HeroStageTemplateIds.healthBarFill);

    expect(monster).toBeDefined();
    expect(track?.objectId).toBe('trial-monster-trial-1-0-health-track');
    expect(fill?.objectId).toBe('trial-monster-trial-1-0-health-fill');
    expect(track?.replication).toBe('localCosmetic');
    expect(fill?.replication).toBe('localCosmetic');
    expect(track?.transform.position.y).toBeGreaterThan(monster?.transform.position.y ?? 0);
    expect((track?.transform.position.y ?? 0) - (monster?.transform.position.y ?? 0)).toBeCloseTo(3.72);
    expect(fill?.transform.scale.x).toBeCloseTo(track?.transform.scale.x ?? 0);
    expect(track?.transform.scale.y).toBeCloseTo(0.18);
    expect(fill?.transform.scale.y).toBeCloseTo(0.11);
    expect(fill?.tintHex).toBe('#27ae60');
  });

  it('renders Trial actor entrance with enemies tweening in before the mage', () => {
    const startApp = new MagusMatchGameApp(789, { debugLevelType: 'TRIAL' });
    const finalApp = new MagusMatchGameApp(789, { debugLevelType: 'TRIAL' });
    finishTrialEntrance(finalApp);

    const runtime = startApp.getTrialRuntimeForDebug();
    if (runtime == null || runtime.monsters[0] == null) {
      throw new Error('Expected Trial runtime.');
    }
    const monsterId = `trial-monster-${runtime.monsters[0].monsterId}`;

    const startMonster = getHeroObject(startApp, monsterId);
    const startMage = getHeroObject(startApp, 'actor-mage');
    const finalMonster = getHeroObject(finalApp, monsterId);
    const finalTrack = getHeroObject(finalApp, `${monsterId}-health-track`);
    const finalMage = getHeroObject(finalApp, 'actor-mage');

    expect(startMonster.transform.position.x).toBeCloseTo(
      finalMonster.transform.position.x + TRIAL_ACTOR_ENTRANCE_OFFSCREEN_X_OFFSET,
    );
    expect(startMage.transform.position.x).toBeCloseTo(
      finalMage.transform.position.x - TRIAL_ACTOR_ENTRANCE_OFFSCREEN_X_OFFSET,
    );
    expect(startApp.getHeroWorldState().objects.some((object) => object.objectId === `${monsterId}-health-track`)).toBe(
      false,
    );
    expect(finalTrack.transform.position.x).toBeCloseTo(finalMonster.transform.position.x);

    const midApp = new MagusMatchGameApp(789, { debugLevelType: 'TRIAL' });
    midApp.update(TRIAL_ACTOR_ENTRANCE_ENEMY_DURATION_SEC / 2, []);
    const midMonster = getHeroObject(midApp, monsterId);
    const midMage = getHeroObject(midApp, 'actor-mage');
    expect(midMonster.transform.position.x).toBeGreaterThan(finalMonster.transform.position.x);
    expect(midMonster.transform.position.x).toBeLessThan(startMonster.transform.position.x);
    expect(midMage.transform.position.x).toBeCloseTo(startMage.transform.position.x);

    const enemyDoneApp = new MagusMatchGameApp(789, { debugLevelType: 'TRIAL' });
    enemyDoneApp.update(TRIAL_ACTOR_ENTRANCE_ENEMY_DURATION_SEC, []);
    expect(getHeroObject(enemyDoneApp, monsterId).transform.position.x).toBeCloseTo(
      finalMonster.transform.position.x,
    );
    expect(getHeroObject(enemyDoneApp, 'actor-mage').transform.position.x).toBeCloseTo(
      startMage.transform.position.x,
    );

    enemyDoneApp.update(TRIAL_ACTOR_ENTRANCE_MAGE_DURATION_SEC / 2, []);
    const mageMidTween = getHeroObject(enemyDoneApp, 'actor-mage');
    expect(mageMidTween.transform.position.x).toBeGreaterThan(startMage.transform.position.x);
    expect(mageMidTween.transform.position.x).toBeLessThan(finalMage.transform.position.x);
  });

  it('uses the same entrance sequence for tutorial kobolds and shows health bars after the entrance', () => {
    const startApp = new MagusMatchGameApp(555);
    const finalApp = new MagusMatchGameApp(555);
    finishTrialEntrance(finalApp);

    const monsterId = 'trial-monster-tutorial-kobold-0';
    const startMonster = getHeroObject(startApp, monsterId);
    const startMage = getHeroObject(startApp, 'actor-mage');
    const finalMonster = getHeroObject(finalApp, monsterId);
    const finalTrack = getHeroObject(finalApp, `${monsterId}-health-track`);
    const finalMage = getHeroObject(finalApp, 'actor-mage');

    expect(startMonster.transform.position.x).toBeCloseTo(
      finalMonster.transform.position.x + TRIAL_ACTOR_ENTRANCE_OFFSCREEN_X_OFFSET,
    );
    expect(startMage.transform.position.x).toBeCloseTo(
      finalMage.transform.position.x - TRIAL_ACTOR_ENTRANCE_OFFSCREEN_X_OFFSET,
    );
    expect(startApp.getHeroWorldState().objects.some((object) => object.objectId === `${monsterId}-health-track`)).toBe(
      false,
    );
    expect(finalTrack.transform.position.x).toBeCloseTo(finalMonster.transform.position.x);
    expect(finalTrack.transform.position.y).toBeGreaterThan(finalMonster.transform.position.y);
    const finalLevel = finalApp.getCurrentLevelForDebug();
    if (finalLevel?.type !== 'TRIAL') {
      throw new Error('Expected Trial level.');
    }
    const tutorialForegroundDownWorld = (100 / 1.5) * (10.8 / 864);
    expect(finalMage.transform.position.y).toBeCloseTo(
      getTrialMageWorldPosition(finalLevel).y + MAGE_WORLD_Y_OFFSET - tutorialForegroundDownWorld,
    );
  });

  it('tweens the Trial mage off-screen right on wins without moving enemies', () => {
    const app = new MagusMatchGameApp(789, { debugLevelType: 'TRIAL' });
    finishTrialEntrance(app);

    const runtime = app.getTrialRuntimeForDebug();
    if (runtime == null || runtime.monsters[0] == null) {
      throw new Error('Expected Trial runtime.');
    }
    const monsterId = `trial-monster-${runtime.monsters[0].monsterId}`;
    const normalMage = getHeroObject(app, 'actor-mage');
    const normalMonster = getHeroObject(app, monsterId);

    beginLevelResultForDebug(app, 'win');
    const exitStartMage = getHeroObject(app, 'actor-mage');
    const exitStartMonster = getHeroObject(app, monsterId);
    expect(exitStartMage.transform.position.x).toBeCloseTo(normalMage.transform.position.x);
    expect(exitStartMage.transform.position.y).toBeCloseTo(normalMage.transform.position.y);
    expect(exitStartMonster.transform.position.x).toBeCloseTo(normalMonster.transform.position.x);

    app.update(TRIAL_MAGE_EXIT_DURATION_SEC / 2, []);
    const midExitMage = getHeroObject(app, 'actor-mage');
    expect(midExitMage.transform.position.x).toBeGreaterThan(normalMage.transform.position.x);
    expect(midExitMage.transform.position.x).toBeLessThan(
      normalMage.transform.position.x + TRIAL_MAGE_EXIT_OFFSCREEN_X_OFFSET,
    );
    expect(midExitMage.transform.position.y).toBeCloseTo(normalMage.transform.position.y);

    app.update(TRIAL_MAGE_EXIT_DURATION_SEC / 2, []);
    const exitEndMage = getHeroObject(app, 'actor-mage');
    const exitEndMonster = getHeroObject(app, monsterId);
    expect(exitEndMage.transform.position.x).toBeCloseTo(
      normalMage.transform.position.x + TRIAL_MAGE_EXIT_OFFSCREEN_X_OFFSET,
    );
    expect(exitEndMage.transform.position.y).toBeCloseTo(normalMage.transform.position.y);
    expect(exitEndMonster.transform.position.x).toBeCloseTo(normalMonster.transform.position.x);
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

  it('uses delayed displayed health for Trial health bar fill and tint', () => {
    const bars = createTrialMonsterHealthBarObjects(
      {
        monsterId: 'delayed',
        kind: 'kobold',
        laneId: 0,
        hp: 20,
        healthBarHp: 60,
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
    expect(fill?.transform.scale.x).toBeCloseTo((track?.transform.scale.x ?? 0) * 0.6);
    expect(fill?.tintHex).toBe('#27ae60');
  });

  it('applies the same Trial hit shake offset to the enemy and health bar objects', () => {
    const app = new MagusMatchGameApp(789);
    const runtime = app.getTrialRuntimeForDebug();
    if (runtime == null) {
      throw new Error('Expected Trial runtime.');
    }
    finishTrialEntrance(app);

    const monster = {
      ...runtime.monsters[0],
      hp: 15,
      maxHp: 30,
      hitShakeRemainingSec: 0.13,
      hitShakeDurationSec: 0.18,
    };
    setTrialRuntimeForDebug(app, {
      ...runtime,
      monsters: [monster],
    });

    const shakenState = app.getHeroWorldState();
    setTrialRuntimeForDebug(app, {
      ...runtime,
      monsters: [{ ...monster, hitShakeRemainingSec: undefined, hitShakeDurationSec: undefined }],
    });
    const stableState = app.getHeroWorldState();
    const offset = trialMonsterHitShakeOffset(monster);

    const shakenMonster = shakenState.objects.find((object) => object.objectId === `trial-monster-${monster.monsterId}`);
    const shakenTrack = shakenState.objects.find((object) => object.objectId === `trial-monster-${monster.monsterId}-health-track`);
    const shakenFill = shakenState.objects.find((object) => object.objectId === `trial-monster-${monster.monsterId}-health-fill`);
    const stableMonster = stableState.objects.find((object) => object.objectId === `trial-monster-${monster.monsterId}`);
    const stableTrack = stableState.objects.find((object) => object.objectId === `trial-monster-${monster.monsterId}-health-track`);
    const stableFill = stableState.objects.find((object) => object.objectId === `trial-monster-${monster.monsterId}-health-fill`);

    expect(offset.x).not.toBe(0);
    expect(shakenMonster?.transform.position.x).toBeCloseTo((stableMonster?.transform.position.x ?? 0) + offset.x);
    expect(shakenMonster?.transform.position.y).toBeCloseTo((stableMonster?.transform.position.y ?? 0) + offset.y);
    expect(shakenTrack?.transform.position.x).toBeCloseTo((stableTrack?.transform.position.x ?? 0) + offset.x);
    expect(shakenTrack?.transform.position.y).toBeCloseTo((stableTrack?.transform.position.y ?? 0) + offset.y);
    expect(shakenFill?.transform.position.x).toBeCloseTo((stableFill?.transform.position.x ?? 0) + offset.x);
    expect(shakenFill?.transform.position.y).toBeCloseTo((stableFill?.transform.position.y ?? 0) + offset.y);
  });

  it('applies Trial monster visual y offsets to the enemy and health bar objects', () => {
    const app = new MagusMatchGameApp(789);
    const runtime = app.getTrialRuntimeForDebug();
    if (runtime == null) {
      throw new Error('Expected Trial runtime.');
    }
    finishTrialEntrance(app);

    const monster = {
      ...runtime.monsters[0],
      hp: 15,
      maxHp: 30,
      visualYOffset: TRIAL_MONSTER_TOP_VISUAL_Y_OFFSET,
    };
    setTrialRuntimeForDebug(app, {
      ...runtime,
      monsters: [monster],
    });
    const raisedState = app.getHeroWorldState();

    setTrialRuntimeForDebug(app, {
      ...runtime,
      monsters: [{ ...monster, visualYOffset: TRIAL_MONSTER_BOTTOM_VISUAL_Y_OFFSET }],
    });
    const loweredState = app.getHeroWorldState();

    const raisedMonster = raisedState.objects.find((object) => object.objectId === `trial-monster-${monster.monsterId}`);
    const raisedTrack = raisedState.objects.find((object) => object.objectId === `trial-monster-${monster.monsterId}-health-track`);
    const loweredMonster = loweredState.objects.find((object) => object.objectId === `trial-monster-${monster.monsterId}`);
    const loweredTrack = loweredState.objects.find((object) => object.objectId === `trial-monster-${monster.monsterId}-health-track`);

    const expectedOffsetDelta = TRIAL_MONSTER_TOP_VISUAL_Y_OFFSET - TRIAL_MONSTER_BOTTOM_VISUAL_Y_OFFSET;
    expect((raisedMonster?.transform.position.y ?? 0) - (loweredMonster?.transform.position.y ?? 0)).toBeCloseTo(expectedOffsetDelta);
    expect((raisedTrack?.transform.position.y ?? 0) - (loweredTrack?.transform.position.y ?? 0)).toBeCloseTo(expectedOffsetDelta);
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

  it('omits lethal hit health bars even when stale delayed health state exists', () => {
    const bars = createTrialMonsterHealthBarObjects(
      {
        monsterId: 'pending-lethal',
        kind: 'kobold',
        laneId: 0,
        hp: 0,
        healthBarHp: 15,
        healthBarUpdateQueue: [{ delaySec: 0.12, hp: 0 }],
        maxHp: 30,
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
    const trialApp = new MagusMatchGameApp(123, { debugLevelType: 'TRIAL' });
    finishTrialEntrance(trialApp);
    const trialMage = trialApp
      .getHeroWorldState()
      .objects.find((object) => object.templateId === HeroStageTemplateIds.mage);
    const trialLevel = trialApp.getCurrentLevelForDebug();
    const baseTrialMagePosition = trialLevel?.type === 'TRIAL' ? getTrialMageWorldPosition(trialLevel) : null;

    expect(journeyMage?.transform.scale).toEqual(MAGE_WORLD_SCALE);
    expect(trialMage?.transform.scale).toEqual(MAGE_WORLD_SCALE);
    expect(MAGE_WORLD_SCALE).toEqual({ x: 3, y: 3, z: 3 });
    expect(MAGE_WORLD_Y_OFFSET).toBeCloseTo(-2.095);
    expect(journeyMage?.transform.position.y).toBeLessThan(1.6);
    expect(trialMage?.transform.position.y).toBeCloseTo((baseTrialMagePosition?.y ?? 0) + MAGE_WORLD_Y_OFFSET);
    expect(trialMage?.transform.position.x).toBeCloseTo(baseTrialMagePosition?.x ?? 0);
  });

  it('places the Trial contact marker at the mage front edge', () => {
    const app = new MagusMatchGameApp(123);
    const state = app.getHeroWorldState();
    const level = app.getCurrentLevelForDebug();
    const contactMarker = state.objects.find((object) => object.objectId === 'trial-fail-line');

    expect(level?.type).toBe('TRIAL');
    expect(contactMarker?.templateId).toBe(HeroStageTemplateIds.pathMarker);
    expect(contactMarker?.transform.position.x).toBeCloseTo(level?.type === 'TRIAL' ? level.trial.contactX : 0);
  });

  it('uses player scale and FBX material colors for Trial enemies', () => {
    const app = new MagusMatchGameApp(789, { debugLevelType: 'TRIAL' });
    const state = app.getHeroWorldState();
    const level = app.getCurrentLevelForDebug();
    const runtime = app.getTrialRuntimeForDebug();
    const monster = state.objects.find((object) => object.templateId === HeroStageTemplateIds.monsterPlaceholder);
    const baseMonsterPosition =
      level?.type === 'TRIAL' && runtime != null
        ? getTrialMonsterWorldPosition(level, runtime.monsters[0])
        : null;
    const visualYOffset = runtime?.monsters[0].visualYOffset ?? 0;

    expect(monster?.transform.scale).toEqual(MAGE_WORLD_SCALE);
    expect(monster?.tintHex).toBeUndefined();
    expect(monster?.animationPaused).toBeUndefined();
    expect(monster?.transform.position.y).toBeCloseTo((baseMonsterPosition?.y ?? -0.85) - 1.49 + visualYOffset);
  });

  it('orders Trial enemies so right-side and newer monsters draw above older left-side monsters', () => {
    const app = new MagusMatchGameApp(789, { debugLevelType: 'TRIAL' });
    const runtime = app.getTrialRuntimeForDebug();
    if (runtime == null || runtime.monsters[0] == null) {
      throw new Error('Expected Trial runtime.');
    }

    const baseMonster = runtime.monsters[0];
    setTrialRuntimeForDebug(app, {
      ...runtime,
      monsters: [
        { ...baseMonster, monsterId: 'left-old', x: -1, spawnTimeMs: 0 },
        { ...baseMonster, monsterId: 'left-new', x: -1, spawnTimeMs: 1000 },
        { ...baseMonster, monsterId: 'right-newest', x: 2, spawnTimeMs: 2000 },
      ],
      totalMonsters: 3,
    });

    const objects = app.getHeroWorldState().objects;
    const leftOld = objects.find((object) => object.objectId === 'trial-monster-left-old');
    const leftNew = objects.find((object) => object.objectId === 'trial-monster-left-new');
    const rightNewest = objects.find((object) => object.objectId === 'trial-monster-right-newest');

    expect(leftOld?.renderOrder).toBeLessThan(leftNew?.renderOrder ?? 0);
    expect(leftNew?.renderOrder).toBeLessThan(rightNewest?.renderOrder ?? 0);
    expect(leftOld?.materialDepthTest).toBe(false);
    expect(leftNew?.materialDepthTest).toBe(false);
    expect(rightNewest?.materialDepthTest).toBe(false);
    expect(rightNewest?.renderOrder).toBeLessThan(5);
  });

  it('emits a pulsing cyan tint for frozen Trial enemies without tinting health bars', () => {
    const app = new MagusMatchGameApp(789, { debugLevelType: 'TRIAL' });
    const runtime = app.getTrialRuntimeForDebug();
    if (runtime == null) {
      throw new Error('Expected Trial runtime.');
    }
    finishTrialEntrance(app);

    setTrialRuntimeForDebug(app, {
      ...runtime,
      elapsedMs: 0,
      monsters: [{ ...runtime.monsters[0], hp: 15, maxHp: 30, iceFreezeRemainingSec: 1, iceFreezeDurationSec: 1.5 }],
    });

    const state = app.getHeroWorldState();
    const monster = state.objects.find((object) => object.templateId === HeroStageTemplateIds.monsterPlaceholder);
    const track = state.objects.find((object) => object.templateId === HeroStageTemplateIds.healthBarTrack);
    const fill = state.objects.find((object) => object.templateId === HeroStageTemplateIds.healthBarFill);

    expect(monster?.tintHex).toBe('#52dcff');
    expect(monster?.animationPaused).toBe(true);
    expect(track).toBeDefined();
    expect(track?.tintHex).toBeUndefined();
    expect(fill?.tintHex).toBe('#f2c94c');
  });

  it('uses walk animation for living and projectile-pending defeated Trial monsters', () => {
    const app = new MagusMatchGameApp(789);
    const runtime = app.getTrialRuntimeForDebug();
    if (runtime == null) {
      throw new Error('Expected Trial runtime.');
    }

    const livingState = app.getHeroWorldState();
    const livingMonster = livingState.objects.find((object) => object.templateId === HeroStageTemplateIds.monsterPlaceholder);
    expect(livingMonster?.animationId).toBe('walk');

    setTrialRuntimeForDebug(app, {
      ...runtime,
      monsters: [{ ...runtime.monsters[0], hp: 0, defeatDelaySec: 0.2 }],
    });
    const pendingMonster = app
      .getHeroWorldState()
      .objects.find((object) => object.templateId === HeroStageTemplateIds.monsterPlaceholder);

    expect(pendingMonster?.animationId).toBe('walk');
  });

  it('pauses Trial mage, kobold, tall kobold, and mini-boss actor animations on Game Over', () => {
    const app = new MagusMatchGameApp(789, { debugLevelType: 'TRIAL' });
    const runtime = app.getTrialRuntimeForDebug();
    if (runtime == null || runtime.monsters[0] == null) {
      throw new Error('Expected Trial runtime.');
    }

    for (let loss = 0; loss < 3; loss += 1) {
      finishTrialEntrance(app);
      beginLevelResultForDebug(app, 'loss');
      app.update(1.2, []);
    }

    const baseMonster = runtime.monsters[0];
    setTrialRuntimeForDebug(app, {
      ...runtime,
      monsters: [
        { ...baseMonster, monsterId: 'game-over-kobold', kind: 'kobold', hp: 10, maxHp: 10 },
        { ...baseMonster, monsterId: 'game-over-tall', kind: 'tallKobold', hp: 10, maxHp: 10 },
        { ...baseMonster, monsterId: 'game-over-boss', kind: 'miniBoss', hp: 40, maxHp: 40 },
      ],
      totalMonsters: 3,
      nextSpawnIndex: 3,
    });

    const state = app.getHeroWorldState();
    const mage = state.objects.find((object) => object.objectId === 'actor-mage');
    const kobold = state.objects.find((object) => object.objectId === 'trial-monster-game-over-kobold');
    const tallKobold = state.objects.find((object) => object.objectId === 'trial-monster-game-over-tall');
    const miniBoss = state.objects.find((object) => object.objectId === 'trial-monster-game-over-boss');

    expect(app.getHudState().phase).toBe('GAME_OVER');
    expect(mage?.animationPaused).toBe(true);
    expect(kobold?.templateId).toBe(HeroStageTemplateIds.monsterPlaceholder);
    expect(tallKobold?.templateId).toBe(HeroStageTemplateIds.monsterPlaceholder);
    expect(miniBoss?.templateId).toBe(HeroStageTemplateIds.miniBoss);
    expect(kobold?.animationPaused).toBe(true);
    expect(tallKobold?.animationPaused).toBe(true);
    expect(miniBoss?.animationPaused).toBe(true);
  });

  it('uses defeat animation for Trial monsters during the kobold defeat timer', () => {
    const app = new MagusMatchGameApp(789);
    const runtime = app.getTrialRuntimeForDebug();
    if (runtime == null) {
      throw new Error('Expected Trial runtime.');
    }

    setTrialRuntimeForDebug(app, {
      ...runtime,
      monsters: [
        {
          ...runtime.monsters[0],
          hp: 0,
          defeatDelaySec: 0,
          defeatAnimationRemainingSec: 0.5,
          defeatAnimationDurationSec: 1,
        },
      ],
    });

    const state = app.getHeroWorldState();
    const monster = state.objects.find((object) => object.templateId === HeroStageTemplateIds.monsterPlaceholder);

    expect(monster?.animationId).toBe('defeat');
    expect(monster?.animationPaused).toBeUndefined();
    expect(state.objects.some((object) => object.templateId === HeroStageTemplateIds.healthBarTrack)).toBe(false);
    expect(state.objects.some((object) => object.templateId === HeroStageTemplateIds.healthBarFill)).toBe(false);
  });

  it('fades Trial monsters out after the kobold defeat animation finishes', () => {
    const app = new MagusMatchGameApp(789);
    const runtime = app.getTrialRuntimeForDebug();
    if (runtime == null) {
      throw new Error('Expected Trial runtime.');
    }

    const fadingMonster = {
      ...runtime.monsters[0],
      hp: 0,
      defeatDelaySec: 0,
      defeatAnimationRemainingSec: 0,
      defeatAnimationDurationSec: 1,
      defeatFadeRemainingSec: KOBOLD_DEFEAT_FADE_SEC,
      defeatFadeDurationSec: KOBOLD_DEFEAT_FADE_SEC,
    };

    setTrialRuntimeForDebug(app, {
      ...runtime,
      monsters: [fadingMonster],
    });

    const startState = app.getHeroWorldState();
    const startMonster = startState.objects.find((object) => object.templateId === HeroStageTemplateIds.monsterPlaceholder);

    expect(startMonster?.animationId).toBe('defeat');
    expect(startMonster?.opacity).toBeCloseTo(1);

    setTrialRuntimeForDebug(app, {
      ...runtime,
      monsters: [{ ...fadingMonster, defeatFadeRemainingSec: KOBOLD_DEFEAT_FADE_SEC / 3 }],
    });

    const state = app.getHeroWorldState();
    const monster = state.objects.find((object) => object.templateId === HeroStageTemplateIds.monsterPlaceholder);

    expect(monster?.animationId).toBe('defeat');
    expect(monster?.opacity).toBeCloseTo(1 / 3);
    expect(state.objects.some((object) => object.templateId === HeroStageTemplateIds.healthBarTrack)).toBe(false);
    expect(state.objects.some((object) => object.templateId === HeroStageTemplateIds.healthBarFill)).toBe(false);
  });

  it('adds a fire burn sprite at a burning Trial monster feet', () => {
    const app = new MagusMatchGameApp(789);
    const runtime = app.getTrialRuntimeForDebug();
    if (runtime == null) {
      throw new Error('Expected Trial runtime.');
    }

    setTrialRuntimeForDebug(app, {
      ...runtime,
      elapsedMs: 1250,
      monsters: [
        {
          ...runtime.monsters[0],
          monsterId: 'burning',
          hp: 25,
          fireBurnStacks: [
            {
              burnId: 'burn-0',
              damage: 10,
              tickDelayQueueSec: [0.5, 1, 1.5, 2],
              visualRemainingSec: 1.5,
              visualDurationSec: 2,
            },
          ],
        },
      ],
    });

    const state = app.getHeroWorldState();
    const monster = state.objects.find((object) => object.objectId === 'trial-monster-burning');
    const fireBurn = state.objects.find((object) => object.templateId === HeroStageTemplateIds.fireBurn);

    expect(fireBurn).toMatchObject({
      objectId: 'trial-monster-burning-fire-burn',
      visible: true,
      replication: 'localCosmetic',
      renderOrder: 12,
      animationTimeSec: 1.25,
      transform: {
        scale: { x: 3.3, y: 3.3, z: 1 },
      },
    });
    expect(fireBurn?.transform.position.x).toBeCloseTo(monster?.transform.position.x ?? 0);
    expect(fireBurn?.transform.position.y).toBeGreaterThan(monster?.transform.position.y ?? 0);
    expect(fireBurn?.transform.position.y).toBeCloseTo((monster?.transform.position.y ?? 0) + 1.2425);
    expect(fireBurn?.transform.position.z).toBeGreaterThan(monster?.transform.position.z ?? 0);
  });

  it('keeps the fire burn visual while any active stack remains after activation delay', () => {
    const position = { x: 1, y: 2, z: 3 };
    const active = createTrialMonsterFireBurnObjects(
      {
        monsterId: 'stacked',
        kind: 'kobold',
        laneId: 0,
        hp: 20,
        maxHp: 30,
        x: 1,
        spawnTimeMs: 0,
        walkSpeed: 0,
        scoreValue: 5,
        fireBurnStacks: [
          {
            burnId: 'expired',
            damage: 10,
            tickDelayQueueSec: [],
            visualRemainingSec: 0,
            visualDurationSec: 2,
          },
          {
            burnId: 'active',
            damage: 10,
            tickDelayQueueSec: [0.5],
            visualRemainingSec: 0.5,
            visualDurationSec: 2,
          },
        ],
      },
      position,
      0.75,
    );
    const expired = createTrialMonsterFireBurnObjects(
      {
        monsterId: 'expired',
        kind: 'kobold',
        laneId: 0,
        hp: 20,
        maxHp: 30,
        x: 1,
        spawnTimeMs: 0,
        walkSpeed: 0,
        scoreValue: 5,
        fireBurnStacks: [
          {
            burnId: 'expired',
            damage: 10,
            tickDelayQueueSec: [],
            visualRemainingSec: 0,
            visualDurationSec: 2,
          },
        ],
      },
      position,
      0.75,
    );
    const delayed = createTrialMonsterFireBurnObjects(
      {
        monsterId: 'delayed',
        kind: 'kobold',
        laneId: 0,
        hp: 20,
        maxHp: 30,
        x: 1,
        spawnTimeMs: 0,
        walkSpeed: 0,
        scoreValue: 5,
        fireBurnStacks: [
          {
            burnId: 'delayed',
            damage: 10,
            activationDelaySec: 0.25,
            tickDelayQueueSec: [0.5],
            visualRemainingSec: 2,
            visualDurationSec: 2,
          },
        ],
      },
      position,
      0.75,
    );

    expect(active).toHaveLength(1);
    expect(expired).toEqual([]);
    expect(delayed).toEqual([]);
  });

  it('scales and offsets the mini-boss fire burn visual', () => {
    const position = { x: 1, y: 2, z: 3 };
    const fireBurn = createTrialMonsterFireBurnObjects(
      {
        monsterId: 'boss-burning',
        kind: 'miniBoss',
        laneId: 0,
        hp: 20,
        maxHp: 30,
        x: 1,
        spawnTimeMs: 0,
        walkSpeed: 0,
        scoreValue: 5,
        fireBurnStacks: [
          {
            burnId: 'active',
            damage: 10,
            tickDelayQueueSec: [0.5],
            visualRemainingSec: 0.5,
            visualDurationSec: 2,
          },
        ],
      },
      position,
      0.75,
    )[0];

    expect(fireBurn?.transform.scale.x).toBeCloseTo(4.95);
    expect(fireBurn?.transform.scale.y).toBeCloseTo(4.95);
    expect(fireBurn?.transform.scale.z).toBe(1);
    expect(fireBurn?.transform.position.x).toBeCloseTo(position.x + 0.25);
    expect(fireBurn?.transform.position.y).toBeCloseTo(position.y + 1.2425);
  });

  it('adds an earth impact sprite centered on the monster x and attack hit y', () => {
    const app = new MagusMatchGameApp(789);
    const runtime = app.getTrialRuntimeForDebug();
    const level = app.getCurrentLevelForDebug();
    if (runtime == null || level?.type !== 'TRIAL') {
      throw new Error('Expected Trial runtime.');
    }

    const hitWorldPosition = getTrialMonsterSpellHitWorldPosition(level, runtime.monsters[0]);
    setTrialRuntimeForDebug(app, {
      ...runtime,
      impactVfx: [
        {
          vfxId: 'earth-impact-test',
          schoolId: 'earth',
          targetMonsterId: runtime.monsters[0].monsterId,
          hitWorldPosition,
          activationDelaySec: 0,
          remainingSec: 0.25,
          durationSec: 1 / 3,
        },
      ],
    });

    const state = app.getHeroWorldState();
    const monster = state.objects.find((object) => object.templateId === HeroStageTemplateIds.monsterPlaceholder);
    const earthImpact = state.objects.find((object) => object.templateId === HeroStageTemplateIds.earthImpact);

    expect(earthImpact).toMatchObject({
      objectId: 'trial-earth-impact-test',
      renderOrder: 14,
      replication: 'localCosmetic',
      animationTimeSec: 1 / 3 - 0.25,
      transform: {
        scale: { x: 3.5, y: 3.5, z: 1 },
      },
    });
    expect(earthImpact?.transform.position.x).toBeCloseTo(monster?.transform.position.x ?? 0);
    expect(earthImpact?.transform.position.y).toBeCloseTo(hitWorldPosition.y + 0.625);
    expect(earthImpact?.transform.position.y).toBeGreaterThan(monster?.transform.position.y ?? 0);
  });

  it('hides inactive and expired earth impact sprites', () => {
    const active = createTrialEarthImpactObjects(
      {
        vfxId: 'active',
        schoolId: 'earth',
        targetMonsterId: 'target',
        hitWorldPosition: { x: 1, y: 2, z: 3 },
        activationDelaySec: 0,
        remainingSec: 0.2,
        durationSec: 1 / 3,
      },
      new Map([['target', { x: 4, y: -1, z: 0 }]]),
    );
    const delayed = createTrialEarthImpactObjects(
      {
        vfxId: 'delayed',
        schoolId: 'earth',
        targetMonsterId: 'target',
        hitWorldPosition: { x: 1, y: 2, z: 3 },
        activationDelaySec: 0.1,
        remainingSec: 0.2,
        durationSec: 1 / 3,
      },
      new Map([['target', { x: 4, y: -1, z: 0 }]]),
    );
    const expired = createTrialEarthImpactObjects(
      {
        vfxId: 'expired',
        schoolId: 'earth',
        targetMonsterId: 'target',
        hitWorldPosition: { x: 1, y: 2, z: 3 },
        activationDelaySec: 0,
        remainingSec: 0,
        durationSec: 1 / 3,
      },
      new Map([['target', { x: 4, y: -1, z: 0 }]]),
    );

    expect(active).toHaveLength(1);
    expect(active[0].transform.position.x).toBeCloseTo(4);
    expect(active[0].transform.position.y).toBeCloseTo(2.625);
    expect(delayed).toEqual([]);
    expect(expired).toEqual([]);
  });
});

function setTrialRuntimeForDebug(app: MagusMatchGameApp, runtime: NonNullable<ReturnType<MagusMatchGameApp['getTrialRuntimeForDebug']>>): void {
  (app as unknown as { trialRuntime: typeof runtime }).trialRuntime = runtime;
}

function beginLevelResultForDebug(app: MagusMatchGameApp, result: 'win' | 'loss'): void {
  (app as unknown as { beginLevelResult: (result: 'win' | 'loss') => void }).beginLevelResult(result);
}

function finishTrialEntrance(app: MagusMatchGameApp): void {
  app.update(TRIAL_ACTOR_ENTRANCE_TOTAL_DURATION_SEC, []);
}

function getHeroObject(app: MagusMatchGameApp, objectId: string) {
  const object = app.getHeroWorldState().objects.find((candidate) => candidate.objectId === objectId);
  if (object == null) {
    throw new Error(`Expected hero object ${objectId}.`);
  }
  return object;
}
