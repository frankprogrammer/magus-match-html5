# 2D Game Build Guide From `cc-meta-c4-plinkov1`

This guide captures the working 2D game pattern used by `cc-meta-c4-plinkov1` so it can be reused when building another Meta Horizon Studio 2D game. The project combines a XAML `DrawingSurface`, a TypeScript game loop, immediate-mode drawing commands, flat script modules, Studio-managed assets, event-driven systems, and a dedicated audio hub.

## Non-Negotiable Project Rules

- scripts need to all be within the `scripts` folder with no child folder.
- Keep TypeScript modules flat: use files such as `scripts/Rendering.ts`, `scripts/Constants.ts`, `scripts/Types.ts`, and `scripts/GameEvents.ts`, not nested script directories.
- Do not manually edit generated or Studio-managed project files unless the task specifically requires it.
- Match the XAML canvas size to the render constants. In Plinko, `xaml/game.xaml` uses `Width="480"` and `Height="800"`, matching `CANVAS_WIDTH` and `CANVAS_HEIGHT`.
- Declare sprite assets with static string literals. The engine resolves `new TextureAsset("@sprites/...")` at build time, so avoid dynamic asset paths.

## Folder And File Structure

The important structure is:

```text
cc-meta-c4-plinkov1/
  scripts/
    Assets.ts
    Constants.ts
    Types.ts
    GameEvents.ts
    PlinkoCanvasViewModel.ts
    PlinkoGameComponent.ts
    Rendering.ts
    PlinkoAudioComponent.ts
    Physics.ts
    Camera.ts
    Dropper.ts
    Input.ts
    Effects.ts
    *.ts.assetmeta
  sprites/
    *.png
    *.png.assetmeta
  assets/
    sounds/
      *.ogg
      *.opus
      *.assetmeta
  xaml/
    game.xaml
    game.xaml.assetmeta
  Noesis/
    CoreUI/
      MainPage.xaml
      CoreUI.noesis
      *.assetmeta
  docs/
    *.md
```

Use `scripts/` for all TypeScript files and their `.ts.assetmeta` sidecars. Use `sprites/` for 2D PNG art and `.png.assetmeta` sidecars. Use `assets/sounds/` for `.ogg` or `.opus` files and their asset metadata. Use `xaml/game.xaml` for the game canvas surface, and `Noesis/CoreUI/` for richer HUD XAML.

## Import Style

Engine imports come first and use Meta package names:

```ts
import {
  Component,
  component,
  subscribe,
  OnWorldUpdateEvent,
  CustomUiComponent,
} from 'meta/worlds';
import { DrawingCommandsBuilder } from 'meta/custom_ui_experimental';
```

Local imports are flat relative imports from the same `scripts/` folder:

```ts
import { gameViewModel } from './PlinkoCanvasViewModel';
import { generatePegPositions, renderFrame } from './Rendering';
import { GameEvents } from './GameEvents';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './Constants';
```

Use `import type` for type-only imports:

```ts
import type { PegPosition, BinDefinition, Ball } from './Types';
```

Asset declarations live in `scripts/Assets.ts`. They use static `TextureAsset` string literals:

```ts
import { TextureAsset } from 'meta/worlds';

export const gameBackgroundTexture =
  new TextureAsset("@sprites/T_GameBackground.png");
export const pegTexture =
  new TextureAsset("@sprites/T_Peg_Style2.png");
```

Do not build texture paths with variables or string concatenation.

## Rendering Structure

The 2D renderer uses a XAML surface plus immediate-mode drawing commands.

`xaml/game.xaml` provides the base visual tree:

- A black root `Grid`.
- A full-bleed background `Image` using `Stretch="UniformToFill"`.
- A `Viewbox Stretch="Uniform"` to scale the gameplay canvas.
- A fixed-size inner `Grid`, `480 x 800` in Plinko.
- A `local:DrawingSurface` bound to `{Binding drawCommands}`.

`scripts/PlinkoCanvasViewModel.ts` exposes the command string:

```ts
@uiViewModel()
export class PlinkoCanvasViewModel extends UiViewModel {
  drawCommands: string = '';
  override readonly events = {};
}

export const gameViewModel = new PlinkoCanvasViewModel();
```

`scripts/PlinkoGameComponent.ts` owns the builder and pushes commands after each simulation tick:

```ts
private builder: DrawingCommandsBuilder = new DrawingCommandsBuilder();

private render(): void {
  renderFrame(this.builder, renderState);
  this.builder.applyTo(gameViewModel, 'drawCommands');
}
```

## Studio Entity Setup

The XAML and scripts are not enough by themselves. A 2D game needs a Studio entity that hosts the screen-space Custom UI and the main game component.

For a new 2D game, create this entity automatically as part of the initial scaffold:

```text
Match3 or GameRoot entity
  Custom UI component
    UI Type: Screen Space
    UI Asset: xaml/game.xaml
    Is Interactable: true
  Main game component
    Example: Match3GameComponent
```

The main game component must run on the same entity as the `CustomUiComponent` unless the code is intentionally written to reference another entity. On `OnEntityCreateEvent`, the component should read `this.entity.getComponent(CustomUiComponent)` and assign the canvas ViewModel:

```ts
const customUi = this.entity.getComponent(CustomUiComponent);
if (customUi != null) {
  customUi.dataContext = gameViewModel;
}
```

For the Match-3 project, the working Phase 0 setup was:

- Create a new entity named `Match3`.
- Add a `Custom UI` component.
- Set `UI Type` to `Screen Space`.
- Set `UI Asset` to `game.xaml`.
- Set `Is Interactable` to `true`.
- Add the `Match3GameComponent` script component to the same entity.

Future Codex scaffolds should include this Studio-side wiring step in the implementation plan and, when possible, make the corresponding project/scene changes directly instead of only creating files.

`scripts/Rendering.ts` owns the actual draw functions. It rebuilds the frame each time with `DrawingCommandsBuilder`, using small focused functions such as:

- `drawGround`
- `drawWalls`
- `drawPegs`
- `drawAutoDroppers`
- `drawDropper`
- `drawTapPrompt`
- `drawBall`
- particle drawing through `ParticleSystem`
- `drawBins`
- screen-space overlays after the camera transform is popped

The render flow is:

1. `builder.clear()`.
2. Push camera transforms: center translate, camera scale, world translate.
3. Draw world-space elements in stable back-to-front order.
4. Draw particles that should live in world space.
5. Draw bins and foreground world elements.
6. Pop the camera transforms.
7. Draw screen-space elements.
8. Apply the command string to the ViewModel.

Reusable drawing resources are created outside the per-frame path where possible. Plinko pre-creates `SolidBrush` and `Font` instances for walls, labels, glows, timer bars, and text. Temporary brushes are only created when alpha or color changes per particle.

## Game Architecture

`PlinkoGameComponent` is the orchestrator and state machine. It subscribes to Meta lifecycle and input events, owns the current game state, updates simulation, and renders in late update.

Typical responsibilities:

- `OnEntityCreateEvent`: connect `CustomUiComponent.dataContext` to `gameViewModel`, generate pegs and bins, create the dropper and camera.
- `OnEntityStartEvent`: enable input, initialize auto systems, enter idle, and render the first frame.
- `OnWorldUpdateEvent`: update timers, input-driven state, physics, particles, camera, auto-droppers, and game state transitions.
- `OnLateWorldUpdateEvent`: call `render()`.

Shared modules stay flat in `scripts/`:

- `Types.ts`: shared interfaces and enums such as `Ball`, `PegPosition`, `BinDefinition`, `GameState`, `DropperState`, and `CameraState`.
- `Constants.ts`: gameplay tuning, render sizes, camera values, UI values, upgrade configs, audio volumes, and formatting helpers.
- `Assets.ts`: all `TextureAsset` declarations and sprite arrays.
- `Rendering.ts`: draw commands and render-state interface.
- `Physics.ts`: ball, wall, peg, and bin collision behavior.
- `Camera.ts`: camera follow, shake, zoom, transition, and transform helpers.
- `Dropper.ts`: player dropper animation, charging, release, and reaction state.
- `Input.ts`: focused interaction or touch input handling.
- `Effects.ts`: particles, floating text, coins, and mixed world/screen-space effects.
- `GameEvents.ts`: serializable local events for decoupled systems.
- Service/component files: persistence, upgrades, leaderboard, HUD, and audio.

`GameEvents.ts` is the decoupling layer. Define payload classes with `@serializable()` and expose `LocalEvent` instances:

```ts
export const GameEvents = {
  pegHit: new LocalEvent<PegHitPayload>('PegHit', PegHitPayload),
  ballLanded: new LocalEvent<BallLandedPayload>('BallLanded', BallLandedPayload),
  chargingStarted: new LocalEvent<ChargingStartedPayload>('ChargingStarted', ChargingStartedPayload),
};
```

Gameplay emits events with `EventService.sendLocally(...)`. Audio, HUD, upgrades, persistence, and other systems subscribe with `@subscribe(...)`.

## Audio Coding Pattern

`scripts/PlinkoAudioComponent.ts` is attached to an `AudioHub` entity in Studio. The component does not hard-code asset references. Instead, it scans child entities on start and looks for `SoundComponent` instances by keyword-matching the child entity name.

Expected Studio hierarchy:

```text
AudioHub (PlinkoAudioComponent)
  PegHit        (SoundComponent)
  BallLand      (SoundComponent)
  Cluck         (SoundComponent)
  Squeeze       (SoundComponent)
  Purchase      (SoundComponent)
  Hatch         (SoundComponent)
  CoinJingle    (SoundComponent)
  JackpotLarge  (SoundComponent)
  JackpotNormal (SoundComponent)
  NormalWin     (SoundComponent)
  Music         (SoundComponent)
```

Observed audio files in `assets/sounds/`:

- `MUSIC_ChickenPlinko_Backtrack.ogg`
- `SFX_Bounce_Ding.ogg`
- `SFX_Branny_ChickenSqueeze01.opus`
- `SFX_Branny_ChickenSqueeze02.opus`
- `SFX_Branny_ChickenSqueeze03.opus`
- `SFX_ChickenCluck.opus`
- `SFX_GoldJingle.ogg`
- `SFX_Jackpot_LargeWin.ogg`
- `SFX_Jackpot_Normal.ogg`
- `SFX_NormalWin.ogg`

The discovery pass checks names with case-insensitive keywords:

- Peg hit: `peghit`, `peg`
- Ball land: `land`, `ballland`
- Squeeze or charge: `squeeze`, `charge`
- Cluck or chicken: `cluck`, `chicken`
- Purchase: `purchase`, `buy`, `upgrade`
- Large jackpot: `jackpotlarge`, `largewin`
- Normal jackpot: `jackpotnormal`, `jackpot`
- Low win: `normalwin`, `winlow`
- Hatch: `hatch`, `crack`
- Coin jingle: `coin`, `jingle`
- Music: `music`, `backtrack`, `bgm`

SFX playback pattern:

- Subscribe to `GameEvents.pegHit`, `ballLanded`, `ballDropped`, `chargingStarted`, `hatchStarted`, `coinArrived`, and `upgradePurchased`.
- Set `comp.loop = false` for one-shot SFX.
- Set `comp.playVolume` from constants such as `AUDIO_SFX_VOLUME`, `AUDIO_VOLUME_PEG_HIT`, and `AUDIO_VOLUME_HATCH`.
- Use `AudioEmitterType.NonSpatial` for 2D UI/game audio with no spatial falloff.
- Create `SoundPlayInfo`, set fade fields when needed, then call `comp.play(info)`.
- Use `minMaxPitch = new Vec2(min, max)` for variation or combo pitch scaling.

Music playback pattern:

- Keep a `musicStarted` boolean.
- Start music lazily, in Plinko on first `chargingStarted`.
- Set `musicSound.loop = true`.
- Set `musicSound.playVolume = AUDIO_MUSIC_VOLUME`.
- Set `musicSound.soundEmitterType = AudioEmitterType.NonSpatial`.
- Use `SoundPlayInfo.fadeInDuration = AUDIO_MUSIC_FADE_IN`.

## New 2D Game Checklist

Use this checklist when starting another 2D game from this pattern:

1. Create a flat `scripts/` folder and keep every `.ts` file directly inside it.
2. Add `Types.ts` for shared data shapes and enums.
3. Add `Constants.ts` for canvas size, gameplay tuning, rendering values, camera values, and audio values.
4. Add `Assets.ts` with static `TextureAsset("@sprites/...")` declarations.
5. Put PNG art in `sprites/` and verify `.png.assetmeta` files are present.
6. Put audio in `assets/sounds/` and verify `.ogg` or `.opus` assets have `.assetmeta` files.
7. Build `xaml/game.xaml` with a full-bleed background image, a fixed-size `DrawingSurface`, and a command binding.
8. Add a canvas ViewModel with a `drawCommands: string` field.
9. Add the main game component with `DrawingCommandsBuilder`, lifecycle subscriptions, update logic, and a late-update render call.
10. Create a Studio entity for the game, such as `Match3` or `GameRoot`.
11. Add a `Custom UI` component to that entity, set `UI Type` to `Screen Space`, set `UI Asset` to `xaml/game.xaml`, and set `Is Interactable` to `true`.
12. Add the main game script component to the same entity so it can call `this.entity.getComponent(CustomUiComponent)` and assign `customUi.dataContext`.
13. Add `Rendering.ts` with `renderFrame(builder, state)` and small draw functions for each visual layer.
14. Use `builder.pushTranslate`, `pushScale`, and `pushRotate` for camera and sprite transforms, and pop every pushed transform.
15. Emit local gameplay events through `GameEvents.ts` instead of calling audio or UI systems directly.
16. Add `PlinkoAudioComponent`-style audio: an `AudioHub`, named child sound entities, keyword discovery, non-spatial SFX, pitch variation, and lazy looping music.
17. Add HUD ViewModels and Noesis XAML only for overlay UI; keep moment-to-moment gameplay visuals in the drawing surface.
18. Verify the XAML canvas dimensions match `CANVAS_WIDTH` and `CANVAS_HEIGHT`.
19. Verify all scripts remain directly in `scripts/` with no child folders.
20. Verify the game entity has `Custom UI` and the main game script component attached to the same entity.
21. Verify rendering still works after replacing placeholder art with final sprites.
22. Verify all event-driven sounds play from gameplay events and that missing optional sounds fail safely.

## Practical Extension Notes

- To add a new visual object, add its state to `Types.ts`, update the main game state in `PlinkoGameComponent`, add constants in `Constants.ts`, then draw it from `Rendering.ts`.
- To add a new sprite, add the PNG to `sprites/`, declare it in `Assets.ts`, and import it into `Rendering.ts` or `Effects.ts`.
- To add a new sound, add the audio file to `assets/sounds/`, create a child entity under `AudioHub` with a matching keyword name, add or reuse a `GameEvents` event, and subscribe in `PlinkoAudioComponent`.
- To add new UI, put persistent overlay state in a `UiViewModel`, bind it from Noesis XAML, and drive it from events or the main game component.
- To keep rendering stable, draw in a consistent order and keep camera-space drawing separate from screen-space drawing.
