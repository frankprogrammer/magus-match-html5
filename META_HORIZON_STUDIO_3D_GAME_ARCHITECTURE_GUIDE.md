# Meta Horizon Studio 3D Game Architecture Guide

This guide is the generic target document for AI agents building new 3D games in
Meta Horizon Studio or porting 3D games into Meta Horizon Studio from other
engines and browser runtimes.

Use this document for architecture, structure, ownership, spawning, lifecycle,
UI, audio, persistence, and networking decisions.

Use `SLIPSTREAM_META_HORIZON_3D_GAME_AI_GUIDE.md` as a concrete case study of
these patterns in one real project.

Use `THREEJS_TO_META_HORIZON_3D_PORTABILITY_GUIDE.md` when the source project is
being built in Three.js first and later ported into Meta Horizon Studio.

## 1. Core Principle

A good Meta Horizon Studio 3D game is built around these separations:

- static scene bootstrap versus runtime-spawned gameplay objects
- authoritative gameplay state versus presentation state
- shared gameplay entities versus local cosmetic effects
- generic game logic versus Horizon-specific adapter code
- runtime services versus entity-specific components

The engine-facing parts of the project should be thin. The game-facing parts
should be stable.

Good dependency direction:

```text
Game rules and state
  -> produce commands, desired world state, HUD state, and events

Horizon adapters and components
  -> spawn templates
  -> move transforms
  -> update UI
  -> play audio
  -> save data
```

Bad dependency direction:

```text
Mesh or UI component state
  -> directly becomes game state

Random scene entity names
  -> directly become game architecture

Per-frame native component polling
  -> becomes the only source of truth
```

Design target:

- game logic should survive a scene rewrite
- assets should survive a UI rewrite
- UI should survive a camera rewrite
- gameplay objects should survive a template reimport

## 2. Canonical Project Anatomy

Most Meta Horizon Studio 3D projects should revolve around a structure like this:

```text
YourProject/
  YourProject.hzproject
  space.hstf
  player.hstf
  tsconfig.custom.json
  materialMap.json
  Assets/
  Templates/
  UI/
  scripts/
  generated/
  Docs/
```

### Root Files

- `YourProject.hzproject`
  - project descriptor
  - world ID
  - collision layers
  - editor version
  - player settings

- `space.hstf`
  - main world scene
  - static scene root
  - camera/light/UI/audio/bootstrap entities

- `player.hstf`
  - player template if the project uses one
  - may be central in character-driven games
  - may be secondary in games where the visible gameplay actor is spawned at runtime

- `tsconfig.custom.json`
  - safe place for TypeScript edit-time customization
  - does not replace Studio-managed transpilation behavior

- `materialMap.json`
  - material/shader mapping used by imports or material conversion workflows

### Key Directories

- `Assets/`
  - source meshes, textures, audio, materials, sky assets, and imported content
  - usually includes paired `.assetmeta` files

- `Templates/`
  - reusable `.hstf` templates
  - runtime-spawned prefabs for gameplay objects, environment chunks, effects,
    and utility entities

- `UI/`
  - XAML layouts
  - screen-space or world-space custom UI assets

- `scripts/`
  - TypeScript game logic
  - components, services, systems, events, helpers, config modules

- `generated/`
  - generated UI view model bridges and other generated artifacts
  - do not hand-edit unless the project explicitly requires it

- `Docs/`
  - architecture notes
  - design docs
  - AI handoff docs

### `.assetmeta` Files

`.assetmeta` files are part of the actual project structure, not noise.

They commonly contain:

- ingestion IDs
- pipeline versions
- import settings
- mesh/material generation settings
- collision generation settings
- template generation settings

AI agents should avoid deleting or casually rewriting `.assetmeta` files.

## 3. Recommended Script Structure

The exact folder names can vary, but the responsibilities should stay clean.

Recommended `scripts/` shape:

```text
scripts/
  core/
    Types.ts
    Events.ts
    Constants.ts
    Version.ts
  config/
    GameConfig.ts
    AssetConfig.ts
    BalanceConfig.ts
  components/
    bootstrap/
    gameplay/
    camera/
    ui/
    audio/
    persistence/
  services/
    GameStateService.ts
    AudioService.ts
    PersistenceService.ts
  systems/
    SpawnSystem.ts
    CameraSystem.ts
    CollisionSystem.ts
    UiSystem.ts
  data/
    tables/
  utils/
    Math.ts
    Timers.ts
    Random.ts
```

### Component Versus Service

Use components for entity-local behavior:

- trigger behavior
- actor behavior
- pickup behavior
- camera host behavior
- UI bridge behavior

Use services for world-scoped or cross-entity behavior:

- score tracking
- run state
- match flow
- persistence
- cross-system event routing
- shared data access

Use plain classes for pure logic where possible:

- collision math
- spawn planners
- state machines
- timers
- camera math
- content selection logic

Do not make every concern a component if it does not need to live on an entity.

## 4. Static Scene Bootstrap

`space.hstf` should contain the minimum static structure needed to start the
world and hand off to runtime systems.

Typical generic scene entities:

- `WorldRoot`
  - root scene settings
  - fog, physics, shadow, scene components

- `Camera`
  - camera component
  - custom camera controller script if needed

- `DirectionalLight` or equivalent scene lighting entities

- `BootstrapComponent` host
  - one small component responsible for startup sequencing

- `GameplayManager` or game root entity
  - runtime owner for gameplay systems, UI wiring, and shared audio

- `HudRoot`
  - screen-space custom UI

- `MenuRoot`
  - menu or game-over custom UI if separate

- `AudioHub`
  - named child sound entities

- `PersistenceAnchor`
  - server-owned persistence bridge entity

Not every project needs all of these names, but every project benefits from the
same separation of concerns.

### Startup Patterns

There are two healthy startup patterns:

1. Static gameplay root in `space.hstf`
2. Small startup component that spawns a gameplay template at runtime

The second pattern is useful when:

- gameplay should be loaded as one unit
- you want to swap modes or scenes later
- you want a clean boundary between bootstrap scene and runtime content

A generic startup loader typically:

- subscribes to `OnEntityStartEvent`
- guards out server or non-owner contexts as needed
- enables device-specific input modes if needed
- spawns a gameplay template through `WorldService.get().spawnTemplate`
- prevents double spawn with a static or service-level guard

## 5. Runtime 3D World Architecture

A good MHS 3D project treats the static scene as the bootstrap layer and
runtime-spawned templates as the active gameplay layer.

### Template-Driven Runtime

Common runtime-spawned categories:

- player-controlled actor visuals
- enemies and NPCs
- projectiles
- collectibles
- hazards
- moving platforms
- environment chunks or encounter chunks
- local VFX
- temporary gameplay markers

Prefer templates for objects that:

- need to be created and destroyed at runtime
- repeat often
- have stable child entity contracts
- need shared art/logic structure

### Generic Template Contract

A reusable gameplay template should usually have:

```text
Root
  Visuals
  Collider
  Optional child sockets or labels
  Optional child audio entities
```

Helpful child types:

- `Visuals`
  - imported mesh or graphics root

- `Collider`
  - physics representation

- `Label`
  - `WorldTextComponent` host when world text is needed

- `AudioChild`
  - `SoundComponent` host for local or positional sounds

- `Socket` or attach point entities
  - attachment points for weapons, UI markers, or spawned sub-objects

### Child Name Contracts

If code uses `findChildrenWithName`, those names become part of the architecture.

That is fine, but it must be intentional.

Rules:

- keep names stable
- centralize the constants in code
- document them
- do not rename child entities casually after scripts depend on them

## 6. Asset And File Loading

Meta Horizon Studio is asset-pipeline-driven, not ad hoc runtime-loader-driven.

Code should normally reference imported assets through typed declarations and
template paths, not raw file path strings spread across the project.

### Preferred Asset Mindset

Source assets live in `Assets/`, but runtime game code should usually use:

- `TemplateAsset` for spawnable prefabs
- typed asset references exposed as properties when editor assignment is useful
- static config declarations for well-known project assets

Typical source formats:

- meshes:
  - FBX
  - GLB/GLTF if supported by the project workflow
- textures:
  - PNG
  - JPG
  - other formats only if the project pipeline accepts them cleanly
- audio:
  - MP3
  - WAV
  - OGG if the project workflow supports it

### Generic Asset Config Pattern

Use a central config module for known runtime template references:

```ts
import { TemplateAsset } from "meta/worlds";

export const ASSETS = {
  playerTemplate: new TemplateAsset("@Templates/Player.hstf"),
  enemyTemplate: new TemplateAsset("@Templates/Enemy.hstf"),
  pickupTemplate: new TemplateAsset("@Templates/Pickup.hstf"),
  localFxTemplate: new TemplateAsset("@Templates/Primitives/Cube.hstf"),
} as const;
```

Benefits:

- one place for asset contracts
- easier AI inspection
- easier replacement during iteration
- less path drift

### Avoid Dynamic Path Construction

Avoid patterns like:

```ts
new TemplateAsset("@Templates/" + someName + ".hstf")
```

Prefer declared mappings:

```ts
const TemplateById = {
  player: new TemplateAsset("@Templates/Player.hstf"),
  enemyFast: new TemplateAsset("@Templates/EnemyFast.hstf"),
  enemyHeavy: new TemplateAsset("@Templates/EnemyHeavy.hstf"),
} as const;
```

### Import Pipeline Notes

AI agents should assume:

- imported art choices may affect scale, rotation, pivot, and collision
- corrective rotation may be needed
- mesh and collider authoring are different concerns
- reimporting may change internal asset details even when template paths stay stable

Document for each important asset:

- intended world scale
- forward direction
- pivot expectation
- collision intent
- whether the template is gameplay-visible or cosmetic-only

## 7. Spawning, Destruction, And Pooling

### Spawn Rules

Use `WorldService.get().spawnTemplate` for objects that need runtime lifetime
control.

This is especially important because edit-time placed entities are not a good
fit for objects that must be destroyed or frequently recreated.

Typical spawn contract:

```ts
await WorldService.get().spawnTemplate({
  templateAsset: someTemplate,
  networkMode: NetworkMode.Networked,
  position: somePosition,
  rotation: someRotation,
  scale: someScale,
});
```

### Network Intent

Use `NetworkMode.Networked` for:

- gameplay-visible objects
- objects whose existence matters to multiple players
- shared pickups, hazards, enemies, interactables

Use `NetworkMode.LocalOnly` for:

- cosmetic-only VFX
- local trails
- local particles
- camera-attached visuals
- local helper visuals

This distinction should be part of the object design, not an afterthought.

### Pooling

Pool objects that spawn repeatedly:

- projectiles
- damage popups
- temporary markers
- trails
- particles
- repeated hazard instances
- chunked environment pieces

Generic pooled object lifecycle:

1. spawn once
2. cache the entity and important components
3. hide when inactive
4. reactivate with new transform/state
5. destroy only on teardown or invalidation

Hidden pooled objects are often moved below the world, for example:

```text
(0, -1000, 0)
```

That is a valid generic pattern when visibility toggles are insufficient or
component-level visibility is not the right abstraction.

### Async Spawn Safety

If reset or teardown can happen while spawn is in flight, use a version token.

Pattern:

- increment build/reset version before rebuild
- capture version before `await`
- after spawn, compare version
- destroy stale entity if the version no longer matches

This prevents ghost entities after reset.

## 8. Transform Ownership

Every moving gameplay object should have a clear transform owner.

Possible owners:

- the object's own component
- a world system such as `SpawnSystem` or `MovementSystem`
- a manager component during a scripted sequence
- a service when it coordinates many runtime objects

Bad pattern:

- multiple unrelated systems writing to the same transform every frame

Good pattern:

- one system owns authoritative transform intent
- other systems read transform state or request changes through events/methods

### Transform Guidance

Use:

- `TransformComponent.worldPosition`
- `TransformComponent.worldRotation`
- `TransformComponent.worldScale`

Use teleport/discontinuous movement APIs when the motion should not interpolate.

For generic design:

- document whether the object moves kinematically, physically, or on rails
- keep visual offsets separate from gameplay position when helpful
- do not mix gameplay coordinate intent with purely cosmetic wobble unless one
  layer clearly wraps the other

## 9. Camera Architecture

Camera systems should be treated as first-class architecture, not loose scripts.

### Generic Camera Responsibilities

A camera system may own:

- active camera mode
- follow target resolution
- framing offsets
- FOV changes
- collision adjustment
- camera shake
- cinematic state
- local decorative sky/backdrop visuals

### Recommended Pattern

- one main camera controller component
- one camera entity in the static scene
- any supporting math extracted into helper classes/functions
- gameplay systems consume camera-relative direction only through a clean API

For example:

- camera system exposes forward/right direction helpers
- movement system consumes those helpers
- gameplay logic does not directly own camera transforms

### Camera As Presentation

The camera should present gameplay state. It should not become gameplay state.

Examples of presentation-only camera behavior:

- shake
- FOV kick
- local sky plane
- screen framing changes
- local follow smoothing

## 10. Code Structure And Lifecycle

### Common Useful Lifecycle Events

- `OnEntityCreateEvent`
  - component setup
  - cache component references

- `OnEntityStartEvent`
  - world-ready startup
  - cross-entity discovery
  - input enablement
  - initial spawn triggers

- `OnWorldUpdateEvent`
  - per-frame simulation
  - transform updates
  - timed effects
  - state-driven UI refresh

- `OnEntityDestroyEvent`
  - cleanup
  - unsubscribe from external references if needed

### Caching Native Components

Native bridge calls are expensive. Cache component references early when
possible.

Typical cached components:

- `TransformComponent`
- `MeshComponent`
- `PhysicsBodyComponent`
- `SoundComponent`
- `CustomUiComponent`
- `WorldTextComponent`

Avoid refetching these every frame if the entity structure is stable.

### Keep Update Loops Lean

Per-frame code should:

- do the minimum required work
- avoid repeated entity searches
- avoid repeated child-name scans where caching is possible
- avoid repeated expensive allocation patterns

Use:

- event-driven updates
- cached references
- local plain-data state
- pure helper functions

## 11. Networking And Ownership

Networking boundaries should be explicit in the architecture.

### Authority Rules

Separate:

- server-authoritative gameplay state
- owner-client input and presentation
- local-only presentation effects

Useful patterns:

- client-side guards for local presentation
- server-side guards for persistence and authoritative state changes
- `ExecuteOn` where appropriate
- `NetworkMode.Networked` for shared objects
- `NetworkMode.LocalOnly` for cosmetic-only visuals

### Generic Ownership Guidance

Client or owner side usually handles:

- local HUD
- local camera
- local-only VFX
- device-specific input translation

Server or authoritative layer usually handles:

- score submission
- saved progress mutation
- authoritative spawn/despawn for shared objects
- multiplayer-visible gameplay transitions

Do not hide authority decisions inside random components. Make them obvious in
system boundaries and naming.

## 12. Input Architecture

Input should be normalized before it becomes gameplay intent.

Typical layers:

- device input
  - touch
  - XR
  - keyboard/gamepad where relevant

- input adapter
  - converts raw input to normalized game commands

- gameplay systems
  - consume commands
  - do not depend on raw device API shapes

### Focused Interaction

For non-XR touch or pointer-driven projects, focused interaction setup often
belongs in bootstrap or the main manager layer, not in every gameplay object.

The input architecture should answer:

- who enables focused interaction
- who owns the active touch/pointer stream
- how screen positions are normalized
- how commands are forwarded into gameplay systems

## 13. UI Architecture

Meta Horizon Studio UI should be treated as a separate layer from 3D gameplay.

### Screen UI

Screen UI usually uses:

- XAML layouts in `UI/`
- a view model class
- `CustomUiComponent`
- `dataContext` binding

Recommended separation:

- XAML owns layout
- view model owns UI-facing values
- gameplay systems publish state
- UI bridge component assigns `dataContext` and visibility

### World UI

World UI usually uses:

- `WorldTextComponent`
- world-space indicators
- template child labels
- attachment or marker entities

Use world text and markers when the information belongs to an in-world object.
Use screen-space UI when it belongs to the player session.

### Generic UI Contracts

Document:

- which UI is screen-space
- which UI is world-space
- which component/service owns updates
- which fields are bound in the view model
- which UI events become local or network events

## 14. Audio Architecture

Audio should be event-driven and named.

### Recommended Audio Layers

- `AudioHub` or equivalent static scene root
  - shared music
  - one-shot SFX
  - global ambience

- template child audio entities
  - positional sounds attached to runtime-spawned objects

- audio service or manager
  - resolves sound IDs
  - caches sound components
  - applies playback rules

### Generic Audio Rules

- use stable sound IDs
- cache `SoundComponent` references
- keep spatial versus non-spatial intent explicit
- keep gameplay code emitting events or method calls, not raw sound entity searches

Examples of good separation:

- gameplay emits "play pickup sound"
- audio system decides which entity/component actually plays it

## 15. Persistence Architecture

Persistence should be anchored to a server-owned or authoritative path, not
mixed into arbitrary gameplay visuals.

### Recommended Pattern

- static persistence anchor entity in the scene
- persistence component on that entity
- persistence service handling stored values
- gameplay manager requests save/load through events or service methods

Typical responsibilities:

- load player variables
- save progression
- submit leaderboard entries
- notify owner client of updated values

Persistence should not depend on:

- local cosmetic entities
- transient UI state
- visual-only runtime objects

## 16. Generic Main Manager Pattern

Many 3D games benefit from one main gameplay manager component, even if services
and subsystems do most of the work.

Typical `GameplayManager` responsibilities:

- startup sequencing
- runtime system construction
- UI root discovery and binding
- audio root discovery and caching
- main update orchestration
- mode transitions
- teardown/reset

Typical responsibilities that should stay outside it:

- raw collision math
- asset authoring policy
- low-level camera math
- reusable timers
- reusable input adapters

The manager should orchestrate, not contain every implementation detail.

## 17. Generic Config Pattern

Centralize tunables and static references.

A good config layer commonly contains:

- template references
- scene names
- UI names
- audio names
- timing values
- speeds, cooldowns, and bounds
- render tuning
- camera tuning
- gameplay balance values

Do not scatter:

- template paths
- entity name strings
- UI binding constants
- sound names
- magic gameplay numbers

across unrelated modules.

## 18. Performance Guidance

### Minimize Bridge Calls

Be careful with repeated calls into native components and services.

Strategies:

- cache component references
- cache entity lookups
- batch state decisions in TypeScript before writing native component values
- avoid repeated child searches in hot loops

### Use Plain Data Internally

Prefer plain TypeScript state for:

- simulation
- timers
- selection logic
- spawn planning
- pooled object bookkeeping

Then apply the results to native components in a controlled step.

### Prefer Pooling For Repeated Effects

Repeated spawn/destroy cycles for small visuals are rarely ideal.

Pool when the objects:

- are short-lived
- repeat often
- use the same template
- only differ by transform, tint, or small state

## 19. AI Build Checklist

Before changing a Meta Horizon Studio 3D project, inspect:

- [ ] active `.hzproject`
- [ ] `space.hstf`
- [ ] whether gameplay is static-scene-driven or runtime-template-driven
- [ ] `player.hstf` role in the project
- [ ] `Assets/` and critical `.assetmeta` files
- [ ] `Templates/` and child-name contracts
- [ ] `UI/` files and bound view model fields
- [ ] `scripts/` layout and whether components, services, and systems are cleanly separated
- [ ] authority boundaries: client, owner, server, local cosmetic
- [ ] `NetworkMode.Networked` versus `NetworkMode.LocalOnly` usage
- [ ] spawn pathways using `WorldService.get().spawnTemplate`
- [ ] pooling patterns for repeated objects
- [ ] who owns transforms for major runtime objects
- [ ] camera ownership and whether it is presentation-only
- [ ] audio entity naming and caching strategy
- [ ] persistence anchor and save/load flow
- [ ] config modules and hard-coded strings

Before renaming anything, search for:

```text
findChildrenWithName
TemplateAsset(
spawnTemplate(
NetworkMode.
dataContext
```

Before adding a new gameplay object, decide:

- [ ] Is it static scene content or runtime-spawned content?
- [ ] Is it shared gameplay or local cosmetic?
- [ ] Does it need a reusable template?
- [ ] Does it need pooled lifetime?
- [ ] Does it need world UI or screen UI?
- [ ] Does it need positional audio?
- [ ] Does it need persistence hooks?
- [ ] Does it need a stable child-name contract?

## 20. Suggested Neutral Naming

These names are safe generic patterns for AI-generated projects:

- `BootstrapComponent`
- `WorldRoot`
- `GameplayManager`
- `AudioHub`
- `HudRoot`
- `MenuRoot`
- `PersistenceAnchor`
- `CameraController`
- `SpawnSystem`
- `CollisionSystem`
- `UiBridgeComponent`
- `GameStateService`

Use project-specific names only when they clarify domain meaning.

## 21. How To Use This Guide

If you are building a brand new MHS 3D game:

- start from this guide
- adapt the neutral structure to the game's domain
- keep the architecture generic and inspectable

If you are porting from Three.js:

- first follow `THREEJS_TO_META_HORIZON_3D_PORTABILITY_GUIDE.md`
- then implement the MHS target using this guide

If you need a real example:

- use `SLIPSTREAM_META_HORIZON_3D_GAME_AI_GUIDE.md` as a concrete project-level
  case study of these patterns

