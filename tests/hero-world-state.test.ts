import { describe, expect, it } from 'vitest';
import { AssetIds } from '../src/assets/AssetIds';
import {
  createTrialEarthImpactObjects,
  createTrialMonsterFireBurnObjects,
  createTrialMonsterHealthBarObjects,
  healthBarTintForRatio,
  MagusMatchGameApp,
  MAGE_WORLD_SCALE,
  phaseToCinematicState,
  trialMonsterHitShakeOffset,
} from '../src/core/GameApp';
import { getTrialMageWorldPosition, getTrialMonsterWorldPosition, KOBOLD_DEFEAT_FADE_SEC } from '../src/generator/TrialRules';
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
    expect((track?.transform.position.y ?? 0) - (monster?.transform.position.y ?? 0)).toBeCloseTo(3.72);
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

    const monster = {
      ...runtime.monsters[0],
      hp: 15,
      maxHp: 30,
      visualYOffset: 0.16,
    };
    setTrialRuntimeForDebug(app, {
      ...runtime,
      monsters: [monster],
    });
    const raisedState = app.getHeroWorldState();

    setTrialRuntimeForDebug(app, {
      ...runtime,
      monsters: [{ ...monster, visualYOffset: -0.16 }],
    });
    const loweredState = app.getHeroWorldState();

    const raisedMonster = raisedState.objects.find((object) => object.objectId === `trial-monster-${monster.monsterId}`);
    const raisedTrack = raisedState.objects.find((object) => object.objectId === `trial-monster-${monster.monsterId}-health-track`);
    const loweredMonster = loweredState.objects.find((object) => object.objectId === `trial-monster-${monster.monsterId}`);
    const loweredTrack = loweredState.objects.find((object) => object.objectId === `trial-monster-${monster.monsterId}-health-track`);

    expect((raisedMonster?.transform.position.y ?? 0) - (loweredMonster?.transform.position.y ?? 0)).toBeCloseTo(0.32);
    expect((raisedTrack?.transform.position.y ?? 0) - (loweredTrack?.transform.position.y ?? 0)).toBeCloseTo(0.32);
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
    const trialApp = new MagusMatchGameApp(123);
    const trialMage = trialApp
      .getHeroWorldState()
      .objects.find((object) => object.templateId === HeroStageTemplateIds.mage);
    const trialLevel = trialApp.getCurrentLevelForDebug();
    const baseTrialMagePosition = trialLevel?.type === 'TRIAL' ? getTrialMageWorldPosition(trialLevel) : null;

    expect(journeyMage?.transform.scale).toEqual(MAGE_WORLD_SCALE);
    expect(trialMage?.transform.scale).toEqual(MAGE_WORLD_SCALE);
    expect(MAGE_WORLD_SCALE).toEqual({ x: 3, y: 3, z: 3 });
    expect(journeyMage?.transform.position.y).toBeLessThan(1.6);
    expect(trialMage?.transform.position.y).toBeLessThan(-0.85);
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
    const app = new MagusMatchGameApp(789);
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

  it('emits a pulsing cyan tint for frozen Trial enemies without tinting health bars', () => {
    const app = new MagusMatchGameApp(789);
    const runtime = app.getTrialRuntimeForDebug();
    if (runtime == null) {
      throw new Error('Expected Trial runtime.');
    }

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

  it('adds an earth impact sprite centered on the monster x and attack hit y', () => {
    const app = new MagusMatchGameApp(789);
    const runtime = app.getTrialRuntimeForDebug();
    const level = app.getCurrentLevelForDebug();
    if (runtime == null || level?.type !== 'TRIAL') {
      throw new Error('Expected Trial runtime.');
    }

    const hitWorldPosition = getTrialMonsterWorldPosition(level, runtime.monsters[0]);
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
        scale: { x: 2.4, y: 2.4, z: 1 },
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
