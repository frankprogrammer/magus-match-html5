# Magus Match Build Plan

## 1. Product And Architecture Summary

Magus Match is an endless portrait match-3 save-the-hero game. A run starts with 3 lives, guarantees a Journey level first, then randomly alternates Journey and Trial levels until the player loses all lives. Every successful level ends with the prince celebrating and being yanked away again by an unseen abductor. The build target is a polished HTML5 prototype that can port cleanly to Meta Horizon Studio.

The GDD is the product truth. `HTML5_CANVAS_TO_MHS_BUILD_GUIDE.md` and `THREEJS_TO_META_HORIZON_3D_PORTABILITY_GUIDE.md` are the architecture truth.

Default implementation choice:

- Pure TypeScript core game logic.
- Canvas-style immediate 2D renderer for board and HUD.
- Three.js adapter only for the Hero Stage.
- No Phaser dependency.
- Meta Horizon target is a flat portrait 2.5D stage first, not a headset-immersive v1.

The browser prototype must be built so the core can move to Meta Horizon Studio with adapter replacement rather than a gameplay rewrite.

## 2. Non-Negotiable Constraints

- The game runs in a fixed portrait logical layout based on 1080 x 1920.
- Vertical sections preserve the GDD ratios:
  - Hero Stage: 500 px.
  - Gameplay UI: 150 px.
  - Match Board: 1270 px.
- The match board is always an 8 x 8 grid.
- The board is square, width-fitted, and centered in the Match Board section.
- Core logic must not import DOM, Canvas, Three.js, Phaser, browser audio, browser storage, or Meta Horizon APIs.
- Rendering consumes data-only render state and must not own authoritative game state.
- Input reaches core as normalized commands.
- Audio, telemetry, HUD updates, and persistence are triggered through `GameEvent` values.
- Asset references in gameplay use stable logical IDs, never raw file paths.
- The abductor remains unseen in MVP. Only edge hints such as glove, hook, hand, rope, or silhouette variants may appear.
- MVP includes only Title/Attract, Play, and Game Over screens.
- MVP excludes shop, map, castle decoration, account login, currencies, energy, battle pass, teams, tournaments, hand-authored campaign levels, and mid-run save/resume.

## 3. Source Layout

Use this repo structure when implementing the game:

```text
src/
  main.ts
  core/
    GameApp.ts
    GameEvents.ts
    GameInput.ts
    GameStateMachine.ts
    Rng.ts
    Types.ts
  board/
    Board.ts
    BoardRules.ts
    BoardSolver.ts
    Cascade.ts
    MatchDetection.ts
    PowerUps.ts
    TileTypes.ts
  generator/
    DifficultyTable.ts
    JourneyGenerator.ts
    LevelGenerator.ts
    TrialGenerator.ts
  run/
    Leaderboard.ts
    RunState.ts
    Scoring.ts
  render-2d/
    BoardRenderState.ts
    Canvas2DRenderer.ts
    GameRenderer.ts
    HudRenderState.ts
    RenderFrame.ts
  world-3d/
    HeroWorldState.ts
    TransformState.ts
    WorldObjectState.ts
  render-three/
    ThreeHeroStage.ts
    ThreeObjectFactory.ts
    ThreeAssetLoader.ts
    ThreeCameraController.ts
    ThreePools.ts
  platform-browser/
    BrowserAudioAdapter.ts
    BrowserGameLoop.ts
    BrowserInputAdapter.ts
    BrowserResize.ts
    BrowserStorageAdapter.ts
  assets/
    AssetIds.ts
    AssetManifest.ts
    ArtPrompts.ts
  audio/
    SoundIds.ts
  telemetry/
    Metrics.ts
    TelemetryAdapter.ts
  data/
    tuning.ts
tests/
  *.test.ts
public/
  assets/
    audio/
    backdrops/
    characters/
    tiles/
    ui/
```

Dependency rules:

- `core/`, `board/`, `generator/`, and `run/` are platform-neutral.
- `world-3d/` and `render-2d/*RenderState.ts` are data-only contracts.
- `render-2d/Canvas2DRenderer.ts` may use Canvas APIs.
- `render-three/` is the only place that may import Three.js.
- `platform-browser/` is the only place that may use DOM input, browser loop, browser audio, storage, or resize APIs.
- `main.ts` composes the browser implementation.

## 4. Core Runtime Interfaces

Implement the main game API around this shape:

```ts
export interface GameApp {
  update(dtSec: number, commands: readonly GameInputCommand[]): void;
  getBoardRenderState(): BoardRenderState;
  getHeroWorldState(): HeroWorldState;
  getHudState(): HudRenderState;
  drainEvents(): GameEvent[];
  reset(seed?: number): void;
}
```

Input commands:

```ts
export type GameInputCommand =
  | { type: 'tap'; x: number; y: number }
  | { type: 'dragStart'; x: number; y: number }
  | { type: 'dragMove'; x: number; y: number }
  | { type: 'dragEnd'; x: number; y: number }
  | { type: 'swap'; from: CellCoord; to: CellCoord }
  | { type: 'pause' }
  | { type: 'restart' }
  | { type: 'muteToggle' };
```

Game events:

```ts
export type GameEvent =
  | { type: 'soundRequested'; soundId: string; intensity?: number; position?: Vec3Data }
  | { type: 'scoreChanged'; score: number }
  | { type: 'levelStarted'; levelNumber: number; levelType: LevelType; seed: number }
  | { type: 'levelEnded'; levelNumber: number; levelType: LevelType; result: 'win' | 'loss' }
  | { type: 'runEnded'; finalScore: number; levelsCleared: number }
  | { type: 'telemetry'; name: string; data: Record<string, string | number | boolean> };
```

State machine:

```text
BOOT -> TITLE -> LEVEL_INTRO -> IDLE -> SWAP_VALIDATING
SWAP_VALIDATING -> RESOLVE_MATCHES or IDLE
RESOLVE_MATCHES -> POWERUP_DETONATE or STAGE_UPDATE
POWERUP_DETONATE -> RESOLVE_MATCHES
STAGE_UPDATE -> CHECK_WIN
CHECK_WIN -> IDLE, WIN, or LOSE
WIN -> INTERSTITIAL
LOSE -> INTERSTITIAL or GAME_OVER
INTERSTITIAL -> LEVEL_INTRO
GAME_OVER -> TITLE or GAME_OVER
```

Input queueing:

- During `RESOLVE_MATCHES` and `POWERUP_DETONATE`, accept one queued swipe.
- Keep only the most recent queued swipe.
- Apply it when all involved tiles return to `IDLE`.

## 5. Data Models

Board:

```ts
export interface CellCoord {
  col: number; // 0..7
  row: number; // 0..7
}

export interface Cell {
  tile: Tile | null;
  blocker: Blocker | null;
  modifier: CellModifier | null;
  isVoid: boolean;
  isPath: boolean;
}

export interface Tile {
  id: string;
  type: TileType;
  col: number;
  row: number;
  state: TileState;
  spawnedAtMs: number;
}
```

Tile types:

- `FIRE`: red spell school, Trial visual only.
- `ICE`: blue spell school, Trial visual only.
- `LIGHTNING`: gold spell school, Trial visual only.
- `EARTH`: green spell school, Trial visual only.
- `LAND`: Journey-only path tile.
- `ROCKET_H`: horizontal bolt.
- `ROCKET_V`: vertical bolt.
- `TNT`: magical bomb.
- `LIGHTBALL`: Mage's Orb.

Generated level:

```ts
export interface GeneratedLevel {
  type: 'JOURNEY' | 'TRIAL';
  difficulty: number;
  seed: number;
  initialBoard: Cell[][];
  journey?: {
    moveBudget: number;
    startCell: CellCoord;
    goalCell: CellCoord;
    landTilePositions: CellCoord[];
    candidatePathSolution: CellCoord[];
  };
  trial?: {
    waveManifest: MonsterSpawn[];
    expectedDurationSec: number;
  };
}
```

Hero world render state:

```ts
export interface HeroWorldState {
  levelType: 'JOURNEY' | 'TRIAL';
  camera: CameraState;
  objects: readonly WorldObjectState[];
  activeProjectiles: readonly ProjectileState[];
  backdropId: string;
  cinematicState: 'none' | 'intro' | 'victory' | 'fail' | 'interstitial';
}
```

World objects use stable `objectId` for runtime instances and stable `templateId` for visual assets. Never use one field for both.

## 6. Asset Manifest

All assets must be declared centrally:

```ts
export interface AssetManifestEntry {
  id: string;
  kind: 'texture' | 'model' | 'template' | 'audio' | 'ui' | 'rig' | 'material';
  browserUrl: string;
  futureMhsPath?: string;
  sourceFormat?: 'png' | 'jpg' | 'webp' | 'mp3' | 'ogg' | 'wav' | 'glb' | 'gltf' | 'json';
  unitScale?: number;
  forwardAxis?: '+X' | '-X' | '+Y' | '-Y' | '+Z' | '-Z';
  upAxis?: '+Y' | '+Z';
  pivot?: 'center' | 'bottomCenter' | 'custom';
  collision?: 'none' | 'box' | 'sphere' | 'capsule' | 'mesh' | 'custom';
  artPromptId?: string;
  notes?: string;
}
```

Initial logical asset IDs:

- Tiles: `tile.fire`, `tile.ice`, `tile.lightning`, `tile.earth`, `tile.land`, `tile.path`.
- Power-ups: `power.rocketH`, `power.rocketV`, `power.tnt`, `power.lightball`.
- Backdrops: `backdrop.forest`, `backdrop.crypt`, `backdrop.crystalCave`.
- Characters/rigs: `rig.mage`, `rig.prince`, `rig.kobold`, `rig.tallKobold`.
- Hero-stage props: `prop.princeCage`, `prop.goalFlag`, `prop.abductorGlove`, `prop.abductorHook`, `prop.abductorHand`, `prop.abductorRope`.
- Audio: IDs listed in the Audio section.

Future MHS paths must be static strings in the future port. Do not generate `TextureAsset` or `TemplateAsset` paths dynamically.

## 7. Phase 1: Foundation

Goals:

- Set up Vite + TypeScript.
- Add a browser shell with fixed logical dimensions and responsive scaling.
- Add seedable RNG.
- Add normalized pointer input.
- Add event queue.
- Add asset ID constants.
- Add debug seed support.

Implementation steps:

1. Create project config, scripts, and test runner.
2. Implement logical viewport constants:
   - `LOGICAL_WIDTH = 1080`
   - `LOGICAL_HEIGHT = 1920`
   - `HERO_STAGE_HEIGHT = 500`
   - `HUD_HEIGHT = 150`
   - `BOARD_SECTION_HEIGHT = 1270`
   - `BOARD_SIZE = 8`
   - board rect: `x=0`, `y=745`, `width=1080`, `height=1080`, `cellSize=135`
3. Implement `clientToLogicalPoint`.
4. Implement `logicalPointToBoardCell`.
5. Implement `SeededRng` with deterministic integer and float generation.
6. Implement `GameApp.reset(seed)`.
7. Add debug URL parameter support such as `?seed=12345`.

Acceptance criteria:

- Same seed produces same RNG sequence.
- Browser pointer coordinates map to expected logical positions.
- Board cell mapping is correct at portrait and resized desktop viewports.
- A new run can reset to a known seed without stale state.

Tests:

- RNG determinism.
- Board coordinate mapping.
- Run reset clears event queues and restores initial run values.

## 8. Phase 2: Match-3 Core

Goals:

- Implement the board model and deterministic match-3 rules.
- Keep every rule platform-neutral and unit-tested.

Implementation steps:

1. Implement 8 x 8 `Board`.
2. Implement weighted stratified fill:
   - Fill reading order.
   - Avoid immediate horizontal or vertical match-3.
   - Reshuffle if no valid moves exist.
   - Reshuffle if fewer than 3 valid moves exist.
3. Implement swap validation:
   - Orthogonal adjacency required.
   - Both cells non-void.
   - Both cells contain tiles.
   - Locked/blocking cells cannot swap.
   - Lightball swaps are always valid.
   - Power-up swaps are valid.
   - Otherwise the simulated swap must produce a match.
4. Implement match detection:
   - Horizontal pass.
   - Vertical pass.
   - Merge overlapping runs.
   - Classify 3, 4-straight, 5-straight, L/T 5+.
   - Choose power-up spawn cell from player swap destination or center-of-mass for cascades.
5. Implement cascade:
   - Clear matched tiles.
   - Apply gravity per column from bottom to top.
   - Spawn new tiles from above.
   - Repeat until no matches remain.
6. Implement power-ups:
   - `ROCKET_H`: clear row.
   - `ROCKET_V`: clear column.
   - `TNT`: clear 3 x 3 clipped to board.
   - `LIGHTBALL`: clear all tiles of swapped color.
7. Implement MVP combo stretch only after base power-ups are stable:
   - Rocket + Rocket.
   - TNT + TNT.
   - Lightball + Rocket.
   - Lightball + Lightball.

Acceptance criteria:

- Invalid swaps snap back and cost no life.
- Valid swaps resolve matches.
- Cascades continue until board is stable.
- Input queue accepts one queued move during cascades.
- Auto-shuffle produces at least 3 valid moves.

Tests:

- All match shapes.
- Invalid swap rejection.
- Lightball activation.
- Rocket/TNT/Lightball patterns.
- Cascade chains.
- No-move reshuffle.
- Void cell gravity behavior.

## 9. Phase 3: Journey MVP

Goals:

- Build the first complete level type.
- Make level 1 deterministic, readable, and winnable.

Implementation steps:

1. Guarantee level 1 is Journey.
2. Generate start and goal cells from opposite corners.
3. Generate a candidate path using A* with randomized movement cost.
4. Mark candidate path cells as guaranteed-buildable.
5. Seed LAND tiles into roughly half the candidate path cells.
6. Seed LAND tiles into about 20% of off-path cells as options/red herrings.
7. Fill remaining cells using standard tile generation.
8. Verify solvability within move budget.
9. If not solvable, add bonus LAND tiles along the candidate path until accepted.
10. Convert matched LAND cells into permanent path overlay instead of clearing them.
11. Move mage one step after board resolution:
    - Use the longest contiguous path connected to current mage cell.
    - Tie-break toward closest cell to the goal.
12. Detect win when mage reaches goal.
13. Detect fail when move budget reaches zero before goal.
14. Add the first-match hint after 2500ms on level 1 if the player has not moved.

Acceptance criteria:

- Level 1 is playable within 6 seconds from load.
- Given the same seed, Journey generation is identical.
- The first generated Journey level is winnable.
- LAND matches create permanent path cells.
- Standard matches award points but do not move the mage.

Tests:

- Journey seed determinism.
- Candidate path starts and ends at expected cells.
- LAND conversion persists after cascades.
- Mage advances by one legal path step.
- Move budget fail.
- Goal win.

## 10. Phase 4: 2D Board And HUD Polish

Goals:

- Make the board feel fast, readable, and close to Royal Match's "fastest switcher" feel while preserving portability.

Implementation steps:

1. Implement `GameRenderer` with immediate draw calls:
   - `clear`
   - transform push/pop
   - `drawRect`
   - `drawEllipse`
   - `drawImage`
   - `drawText`
2. Implement `Canvas2DRenderer` as the browser adapter.
3. Implement `BoardRenderState` as plain data:
   - cell bounds
   - tile IDs
   - tile visual states
   - path overlay cells
   - power-up indicators
   - selected/queued move markers
   - shake and flash values
4. Implement HUD render state:
   - level number
   - lives
   - score
   - Journey move budget or Trial wave progress
   - transient banners
   - mute state
5. Apply tuning defaults:
   - `SWAP_DURATION_MS = 150`
   - `MATCH_POP_DURATION_MS = 220`
   - `CASCADE_FALL_DURATION_PER_ROW_MS = 60`
   - `CASCADE_ROW_STAGGER_MS = 20`
   - `INPUT_QUEUE_MAX_DEPTH = 1`
   - `CAMERA_SHAKE_MIN = 2`
   - `CAMERA_SHAKE_MAX = 12`
   - `MAGE_WALK_DURATION_MS = 350`
   - `SPELL_PROJECTILE_VISUAL_MS = 80`
   - `FIRST_MATCH_HINT_DELAY_MS = 2500`

Acceptance criteria:

- Text does not overlap at desktop or mobile portrait sizes.
- All interactive cells remain large enough for touch.
- Animation state is derived from render state/events, not authoritative rules.
- Board remains responsive during cascades with queued input.

Browser checks:

- 1080 x 1920 portrait.
- Narrow mobile portrait.
- Desktop resized portrait container.

## 11. Phase 5: Hero Stage 3D Adapter

Goals:

- Implement the top 500 px hero stage as a Three.js adapter consuming `HeroWorldState`.
- Keep Three.js out of core.

Implementation steps:

1. Create `HeroWorldState` with:
   - camera data
   - backdrop ID
   - mage object
   - prince cage object
   - Journey path/goal props
   - Trial monsters
   - active projectile streaks
   - cinematic state
2. Implement `ThreeHeroStage`:
   - owns `THREE.Scene`, camera, renderer, object cache, model/texture cache, pools.
   - maps `WorldObjectState` to `THREE.Object3D`.
   - uses stable `objectId` to create/update/release objects.
3. Add placeholder visual assets first:
   - colored billboards for mage, prince, monsters.
   - backdrop planes.
   - simple projectile streak meshes.
4. Add camera framing for flat portrait stage.
5. Add victory/fail cinematic state support:
   - mage victory pose.
   - prince celebration.
   - 250ms cage yank with one-frame motion blur impression.
   - mage stunned/shrug reaction.
   - 1.5s fail beat.
6. Add path and goal markers for Journey.
7. Add monster lane positions for Trial.

Acceptance criteria:

- Hero Stage works with placeholder art before final assets.
- Three.js imports exist only under `render-three/`.
- Object cache is private to adapter.
- No gameplay state is stored on Three.js objects.
- Stage can represent Journey and Trial with the same layout.

Porting notes:

- `WorldObjectState.templateId` maps to future MHS `TemplateAsset`.
- `WorldObjectState.transform` maps to future `TransformComponent`.
- `replication: 'localCosmetic'` maps to future `NetworkMode.LocalOnly`.
- `replication: 'sharedGameplay'` maps to future networked/spawned gameplay templates.

## 12. Phase 6: Trial MVP

Goals:

- Build the second complete level type around real-time pressure and instant spell feedback.

Implementation steps:

1. Generate Trial waves from difficulty bands:
   - Difficulty 1-3: 3 basic kobolds, slow.
   - Difficulty 4-7: 5 kobolds, 1 tall kobold, slow.
   - Difficulty 8-12: 6 kobolds, 2 tall kobolds, medium.
   - Difficulty 13-18: 7 kobolds, 3 tall kobolds, occasional mini-boss, medium.
   - Difficulty 19+: mixed waves, mini-bosses, multi-wave, fast.
2. Use five horizontal spawn lanes.
3. Spawn monsters by `spawnTimeMs`.
4. Move monsters downward by `walkSpeed * dtSec`.
5. Detect fail when any monster reaches the mage standing line.
6. On each match:
   - Determine spell school from tile type.
   - Apply damage on the same frame.
   - Pick nearest alive monster.
   - Emit projectile VFX state lasting about 80ms.
   - Emit impact VFX and sound events.
7. Apply damage scaling:
   - 3-match: base damage.
   - 4-match: about 2x damage.
   - Cascades: +0.25x damage per cascade tick.
   - Power-ups: multi-shot behavior per GDD, not AoE damage.
8. Verify clearability:
   - Simulate average skill at about 1.5 matches/sec and 20% damage efficiency.
   - If not clearable, reduce monster HP by 10% and retest.

Acceptance criteria:

- Easy Trial levels can be cleared by the average-skill simulation.
- Spell schools differ only visually and sonically.
- Projectiles are visual-only; damage is instant.
- Monsters can damage/fail the level only by reaching the mage line.

Tests:

- Trial generation by difficulty band.
- Wave spawn timing determinism.
- Nearest-target selection.
- Damage scaling.
- Fail line detection.
- Clearability adjustment.

## 13. Phase 7: Run Meta And Screens

Goals:

- Connect levels into a replayable run with scoring, lives, transitions, and leaderboard.

Implementation steps:

1. Implement run state:
   - lives start at 3.
   - level number starts at 1.
   - difficulty starts at 1.
   - levels cleared starts at 0.
   - score starts at 0.
2. Level type rules:
   - First level is always Journey.
   - Later levels roll 50/50 Journey/Trial.
3. Scoring:
   - Cleared Journey: 1000 base + 50 per move remaining.
   - Cleared Trial: 1000 base + 100 per match-per-second above 1.0 average.
   - Combo match: 100 each.
   - Power-up created: 200 each.
   - Power-up combo stretch: 500.
   - Difficulty multiplier: `1 + 0.1 * difficulty`, applied to base clear points.
4. Loss:
   - Failure costs 1 life.
   - If lives remain, continue to next level.
   - If no lives remain, enter Game Over.
5. Title/Attract screen:
   - Logo.
   - Play button.
   - Hall of Heroes Top 10 preview.
   - Lightweight autoplay demo loop.
6. Play screen:
   - Hero Stage.
   - HUD strip.
   - Match Board.
   - Tiny mute toggle.
7. Game Over screen:
   - final score.
   - high score.
   - Top 10 leaderboard.
   - highlight qualified rank.
   - Try Again button.
8. Leaderboard:
   - Local persistent Top 10 for MVP.
   - Generated heroic title default names.
   - Optional name editing only if it does not delay MVP.

Acceptance criteria:

- A run can continue across mixed level types.
- Game Over occurs exactly after the third failed level.
- Try Again starts a new run with a new seed unless debug seed is specified.
- Local leaderboard survives browser reload.

## 14. Phase 8: Art Generation With ChatGPT

Goals:

- Produce a repeatable art-generation workflow that keeps style consistent and assets easy to rig or port.

Locked style language:

```text
Hand-painted storybook fantasy, cozy bright casual puzzle game readability,
clean silhouette, saturated accents, soft painterly texture, readable at small
mobile size, no text, no UI labels, no watermark, no harsh realism.
Palette anchor: royal purple #4B2E83, aged gold #C8A24B, parchment cream
#F5E9C9, with distinct spell colors for fire red, ice blue, lightning gold,
and earth green.
```

General ChatGPT art prompt rules:

- Ask for transparent PNG when the asset is a tile, icon, character part, VFX element, or prop.
- Ask for no text, no letters, no numbers, no UI chrome baked into art.
- Ask for consistent camera angle and lighting across a batch.
- Ask for centered subject with padding.
- Ask for isolated character body parts when the output is destined for Blender cutout rigging.
- Keep selected prompts and output notes in `assets/ArtPrompts.ts` and `assets/AssetManifest.ts`.
- Generate all character parts from one locked style reference and seed family before rigging.
- Reject inconsistent character parts before Blender work begins.

Prompt batch: standard tiles:

```text
Create four square match-3 tile icons for a vertical fantasy puzzle game,
same shape and perspective, transparent background, no text. Style: [locked
style language]. Tiles: fire flame symbol in saturated red, ice snowflake/shard
symbol in bright blue, lightning bolt symbol in warm gold, earth stone shard
symbol in bright green. Each tile must be readable at 100 x 100 px and share
the same border treatment.
```

Prompt batch: Journey land/path tiles:

```text
Create a small cohesive set of square terrain chips for a fantasy match-3 board,
transparent background, no text, same perspective as tile icons. Include
unbuilt land tile, converted glowing walkable path tile, goal-adjacent path
variant, and subtle edge transition variant. Style: [locked style language].
Readable at 100 x 100 px.
```

Prompt batch: power-up icons:

```text
Create four square match-3 power-up icons, transparent background, no text,
same perspective and border treatment. Style: [locked style language].
Icons: horizontal magical bolt rocket, vertical magical bolt rocket, magical
bomb/TNT orb, mage's lightball orb. Make them high energy but readable at
100 x 100 px.
```

Prompt batch: backdrops:

```text
Create three portrait fantasy backdrop paintings for the top hero stage of a
mobile match-3 game, no characters, no text, no UI, designed for parallax layers.
Style: [locked style language]. Backdrops: warm sunlit forest ruin, dusty
ancient crypt path, glowing crystal cave. Keep a clear center stage area for
characters and a readable silhouette at mobile size.
```

Prompt batch: mage body parts:

```text
Create separate transparent PNG body parts for a heroic young mage-knight cutout
puppet rig, consistent lighting and style, no text. Style: [locked style
language]. Character: flowing cape, simple pauldron, staff hand, sword on hip,
crown-like helm silhouette, friendly capable expression. Output parts separated:
head, torso, upper arms, forearms, hands, staff, cape, hips, thighs, calves,
boots, optional sword.
```

Prompt batch: prince body parts:

```text
Create separate transparent PNG body parts for a young prince inside a small
fantasy cage, cutout puppet rig, consistent lighting and style, no text. Style:
[locked style language]. Expression should support cowering, cheering, and
sudden surprise. Output prince parts separately from cage parts: head, eyes or
face variants, torso, arms, hands, legs, cage frame, cage door, hanging hook.
```

Prompt batch: kobold and tall kobold:

```text
Create separate transparent PNG body parts for cartoon fantasy kobold enemies
for a cozy match-3 game, not scary, goofy underbite, oversized simple weapon,
bow-legged walk, no text. Style: [locked style language]. Produce basic kobold
and taller kobold variants with shared proportions where possible for rig reuse.
Output parts: head, jaw/face variants, torso, upper arms, forearms, hands,
weapon, thighs, calves, feet, optional tail.
```

Prompt batch: abductor hints:

```text
Create transparent PNG edge-of-frame prop hints for an unseen comedic abductor
in a fantasy puzzle game, no full character, no text. Style: [locked style
language]. Props: giant glove hand, curved hook, magical spectral hand, rope
loop, claw silhouette, tentacle-like silhouette. Each should work as a brief
250ms cage-yank visual from the top or side edge.
```

Blender rig pipeline:

1. Lock style reference and selected character parts.
2. Import PNG body parts as image planes.
3. Alpha-trim with the Tessellate Texture Plane workflow.
4. Build armature.
5. Weight paint.
6. Animate required MVP clips.
7. Export atlas + skeletal JSON or agreed runtime format.
8. Add final exported files to the asset manifest.
9. Run the early Horizon smoke test with mage rig animation after Journey MVP.

MVP rigs and animations:

- Mage: idle, cast spell, combat cast, victory, walk.
- Prince in cage: cower, victory/cheer, surprise/yank.
- Basic kobold: walk, taking damage, defeat.
- Tall kobold: walk, taking damage, defeat.
- Magical spell projectile: cast on tile, moving streak, impact.

Fallback if rigging is too slow:

- If the mage rig takes more than 3 days, descope tall kobold and mini-boss visuals to scaled/recolored basic kobold variants.
- If custom rig runtime is risky, validate Spine or atlas-frame fallback before implementing additional rigs.

## 15. Phase 9: Audio And Juice

Goals:

- Make feedback punchy while keeping audio platform-adapter driven.

Sound IDs:

- `sound.tileMatch`
- `sound.comboPitchStep`
- `sound.spell.fire.whoosh`
- `sound.spell.ice.whoosh`
- `sound.spell.lightning.whoosh`
- `sound.spell.earth.whoosh`
- `sound.spell.fire.impact`
- `sound.spell.ice.impact`
- `sound.spell.lightning.impact`
- `sound.spell.earth.impact`
- `sound.pathConvert`
- `sound.mageWalk`
- `sound.monsterDamage`
- `sound.monsterDefeat`
- `sound.powerupCreate`
- `sound.victorySting`
- `sound.cageYankWhoosh`
- `sound.runEnd`

Implementation steps:

1. Emit `soundRequested` events from gameplay outcomes.
2. Implement `BrowserAudioAdapter` that maps sound IDs to loaded audio files.
3. Add mute toggle state in browser platform layer.
4. Pitch tile-match sound upward per cascade step.
5. Keep positional audio data optional in events for future Horizon spatialization.
6. Add future MHS notes:
   - Global sounds map to named `SoundComponent` children under a manager entity.
   - Template-local sounds map to named child sound emitters in spawned templates.
   - The cage-yank whoosh must remain a stable signature cue.

Visual juice checklist:

- Tile swap overshoot.
- Match pop and sparkle.
- School-colored particle burst.
- Projectile launch flash.
- Projectile impact burst.
- Damage popup.
- Path glow trail.
- Power-up pulse.
- Screen/board shake within comfort budget.
- Victory slow-motion into sudden cage yank.

## 16. Phase 10: Telemetry And Tuning

Goals:

- Collect useful playtest and launch metrics from day one.

Events to log:

- Time to first match, target under 6 seconds.
- Survival rate per level number.
- Average run length, target 8-10 cleared levels for average player.
- Journey fail rate.
- Trial fail rate.
- Which level type ends runs more often.
- Try Again click within 3 seconds of run end, target over 50%.
- Share engagement on Game Over.
- Session length.
- Runs per session.
- Debug seed for failed or anomalous runs.

Difficulty survival targets:

- Level 1: 95%+ survival.
- Levels 2-4: 88-92% survival per level.
- Levels 5-8: 75-85% survival per level.
- Levels 9-12: 60-70% survival per level.
- Level 13+: about 50%, asymptoting toward 40% around level 20+.

Retuning rule:

- After 1000 runs, if metrics deviate from target bands by more than 15 percentage points, adjust difficulty scaling.
- Adjustment priority:
  1. Journey move budget.
  2. Trial monster HP.
  3. Trial monster walk speed.
  4. LAND density.

## 17. Phase 11: Horizon Port Prep

Goals:

- Keep the HTML5 prototype ready for a practical Meta Horizon Studio port.

Required architecture checklist:

- Core logic compiles without DOM, Canvas, Three.js, Phaser, or MHS imports.
- Board rendering uses `GameRenderer` and `BoardRenderState`.
- Hero Stage uses data-only `HeroWorldState`.
- Three.js object cache stays private to `render-three/`.
- Input is normalized into `GameInputCommand`.
- Audio is event-driven through stable sound IDs.
- HUD is data-driven through `HudRenderState`.
- Assets use static logical IDs and manifest entries.
- Future MHS paths are known for key assets/templates.
- No gameplay behavior depends on browser-only shaders, CSS animation, DOM layout, or Three.js scene traversal.
- Save data contains plain JSON-compatible data.

Future MHS mapping:

```text
Canvas2DRenderer           -> DrawingCommandsBuilder renderer
BoardRenderState           -> DrawingSurface draw commands
HeroWorldState             -> flat 2.5D stage entities/templates
Three Object3D             -> Entity + TransformComponent
templateId                 -> TemplateAsset static declaration
texture asset ID           -> TextureAsset static declaration
BrowserAudioAdapter        -> SoundComponent entities
BrowserInputAdapter        -> focused interaction/raycast input adapter
HudRenderState             -> Noesis XAML view model or canvas HUD draw state
local leaderboard          -> PlayerVariablesService or later platform service
```

First Horizon smoke test:

- Run after Journey MVP.
- Validate one board render path plus one animated mage rig.
- Target 60fps on mobile Horizon.
- Confirm touch or pointer input maps to the same logical board coordinates.
- Confirm flat portrait stage framing is legible in mobile and headset contexts.

## 18. Test Plan

Unit tests:

- Seeded RNG determinism.
- Board fill avoids initial matches.
- Board fill has at least 3 valid moves.
- Swap validation.
- Match classification.
- Power-up creation.
- Power-up detonation.
- Cascade resolution.
- Void cell gravity.
- Journey generation.
- Journey path conversion.
- Mage path step.
- Trial wave generation.
- Trial damage scaling.
- Trial fail line.
- Scoring.
- Run state.
- Leaderboard ordering.

Integration tests:

- Full Journey win.
- Full Journey fail.
- Full Trial win.
- Full Trial fail.
- Level transition after win.
- Level transition after loss with lives remaining.
- Game Over after third failed level.
- Try Again starts clean run.
- Local leaderboard persists.

Browser validation:

- Desktop portrait scaling.
- Mobile portrait scaling.
- Board cell hit detection.
- HUD text fit.
- Title screen first-frame render.
- Play screen first interactable state under 6 seconds.
- Game Over screenshot readability.

Performance checks:

- 60fps target.
- 45fps acceptable only during peak Trial waves with 5+ spell projectiles.
- 64 board tiles.
- Up to 8 active rigged puppets.
- Character atlas size at or below 2048 x 2048 per rig.
- Total asset memory under 100MB.
- Load time to first playable frame under 2 seconds where feasible.

Portability checks:

- Run a dependency scan to confirm no forbidden imports in core modules.
- Verify asset manifest has no dynamic future MHS path construction.
- Verify render state contains no platform objects.
- Verify audio and telemetry are event-driven.

## 19. Implementation Order

Build in this order:

1. Foundation and tests.
2. Board rules and tests.
3. Journey generator and Journey MVP.
4. Canvas board/HUD renderer.
5. Three.js Hero Stage placeholder adapter.
6. Trial generator and Trial MVP.
7. Run meta, screens, leaderboard.
8. Art prompt pipeline and placeholder replacement.
9. Audio adapter and juice pass.
10. Telemetry and difficulty tuning hooks.
11. Horizon smoke test and port-readiness audit.

Do not tune Journey and Trial simultaneously. Finish Journey to playable and understandable first, then build Trial.

## 20. Done Criteria For Polished MVP

The MVP is ready when:

- A new player can start and make the first match in under 6 seconds.
- Journey level 1 teaches the path mechanic without a modal tutorial.
- Journey and Trial are both playable end to end.
- The run loop works across multiple levels and ends after 3 failed levels.
- The prince rescue/yank gag is implemented and readable in about 3 seconds.
- Game Over shows final score, high score, leaderboard, and Try Again.
- Local leaderboard persists.
- Audio and visual feedback exists for all core actions.
- The game can produce Reels footage showing Trial, Journey, and the cage-yank punchline.
- Core modules remain platform-neutral.
- A future Horizon port path is documented and mechanically plausible.
