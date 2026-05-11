export const LockedStyleLanguage = [
  'Hand-painted storybook fantasy, cozy bright casual puzzle game readability,',
  'clean silhouette, saturated accents, soft painterly texture, readable at small',
  'mobile size, no text, no UI labels, no watermark, no harsh realism.',
  'Palette anchor: royal purple #4B2E83, aged gold #C8A24B, parchment cream',
  '#F5E9C9, with distinct spell colors for fire red, ice blue, lightning gold,',
  'and earth green.',
].join(' ');

export const GeneralArtPromptRules = [
  'Ask for transparent PNG when the asset is a tile, icon, character part, VFX element, or prop.',
  'Ask for no text, no letters, no numbers, no UI chrome baked into art.',
  'Ask for consistent camera angle and lighting across a batch.',
  'Ask for centered subject with padding.',
  'Ask for isolated character body parts when the output is destined for Blender cutout rigging.',
  'Generate all character parts from one locked style reference and seed family before rigging.',
  'Reject inconsistent character parts before Blender work begins.',
] as const;

export type ArtPromptId =
  | 'prompt.tiles.standard'
  | 'prompt.tiles.journey'
  | 'prompt.powerups.standard'
  | 'prompt.backdrops.hero'
  | 'prompt.rig.mage'
  | 'prompt.rig.prince'
  | 'prompt.rig.kobolds'
  | 'prompt.props.abductor';

export interface ArtPromptBatch {
  id: ArtPromptId;
  title: string;
  outputUse: string;
  prompt: string;
  expectedFiles: readonly string[];
  notes: string;
}

export const ArtPrompts: readonly ArtPromptBatch[] = [
  {
    id: 'prompt.tiles.standard',
    title: 'Standard match-3 tile icons',
    outputUse: 'Runtime board tile textures at 256x256 transparent PNG.',
    prompt: withLockedStyle(
      [
        'Create four square match-3 tile icons for a vertical fantasy puzzle game,',
        'same shape and perspective, transparent background, no text.',
        'Tiles: fire flame symbol in saturated red, ice snowflake/shard symbol in bright blue,',
        'lightning bolt symbol in warm gold, earth stone shard symbol in bright green.',
        'Each tile must be readable at 100 x 100 px and share the same border treatment.',
      ].join(' '),
    ),
    expectedFiles: [
      'tile-fire.png',
      'tile-ice.png',
      'tile-lightning.png',
      'tile-earth.png',
    ],
    notes: 'Keep original masters at 512x512 or 1024x1024; export game-ready 256x256 PNGs.',
  },
  {
    id: 'prompt.tiles.journey',
    title: 'Journey land and path chips',
    outputUse: 'Runtime Journey terrain tile textures at 256x256 transparent PNG.',
    prompt: withLockedStyle(
      [
        'Create a small cohesive set of square terrain chips for a fantasy match-3 board,',
        'transparent background, no text, same perspective as tile icons.',
        'Include unbuilt land tile, converted glowing walkable path tile,',
        'goal-adjacent path variant, and subtle edge transition variant.',
        'Readable at 100 x 100 px.',
      ].join(' '),
    ),
    expectedFiles: ['tile-land.png', 'tile-path.png'],
    notes: 'Only land and path are wired in MVP; keep extra variants as source notes until renderer uses them.',
  },
  {
    id: 'prompt.powerups.standard',
    title: 'Power-up icons',
    outputUse: 'Runtime power-up tile textures at 256x256 transparent PNG.',
    prompt: withLockedStyle(
      [
        'Create four square match-3 power-up icons, transparent background, no text,',
        'same perspective and border treatment.',
        'Icons: horizontal magical bolt rocket, vertical magical bolt rocket,',
        "magical bomb/TNT orb, mage's lightball orb.",
        'Make them high energy but readable at 100 x 100 px.',
      ].join(' '),
    ),
    expectedFiles: [
      'power-rocket-h.png',
      'power-rocket-v.png',
      'power-tnt.png',
      'power-lightball.png',
    ],
    notes: 'Horizontal and vertical rockets need clearly distinct silhouettes at 100px.',
  },
  {
    id: 'prompt.backdrops.hero',
    title: 'Hero stage backdrops',
    outputUse: 'Hero-stage 2.5D backdrop plates at 2160x1000 PNG or WebP, cover-cropped into an 864x700 stage.',
    prompt: withLockedStyle(
      [
        'Create three portrait fantasy backdrop paintings for the top hero stage of a mobile match-3 game,',
        'no characters, no text, no UI, designed for parallax layers.',
        'Backdrops: warm sunlit forest ruin, dusty ancient crypt path, glowing crystal cave.',
        'Keep a clear center stage area for characters and a readable silhouette at mobile size.',
      ].join(' '),
    ),
    expectedFiles: ['backdrop-forest.png', 'backdrop-crypt.png', 'backdrop-crystal-cave.png'],
    notes: 'Runtime uses 864x700 logical hero-stage cover cropping; existing 2160x1000 source art is reused.',
  },
  {
    id: 'prompt.rig.mage',
    title: 'Mage cutout rig parts',
    outputUse: 'Transparent PNG character parts for Blender cutout rigging.',
    prompt: withLockedStyle(
      [
        'Create separate transparent PNG body parts for a heroic young mage-knight cutout puppet rig,',
        'consistent lighting and style, no text.',
        'Character: flowing cape, simple pauldron, staff hand, sword on hip,',
        'crown-like helm silhouette, friendly capable expression.',
        'Output parts separated: head, torso, upper arms, forearms, hands, staff, cape, hips, thighs, calves, boots, optional sword.',
      ].join(' '),
    ),
    expectedFiles: ['mage-parts-source.png'],
    notes: 'Use one locked style reference and seed family before separating final rig parts.',
  },
  {
    id: 'prompt.rig.prince',
    title: 'Prince and cage cutout rig parts',
    outputUse: 'Transparent PNG character and cage parts for Blender cutout rigging.',
    prompt: withLockedStyle(
      [
        'Create separate transparent PNG body parts for a young prince inside a small fantasy cage,',
        'cutout puppet rig, consistent lighting and style, no text.',
        'Expression should support cowering, cheering, and sudden surprise.',
        'Output prince parts separately from cage parts: head, eyes or face variants, torso, arms, hands, legs, cage frame, cage door, hanging hook.',
      ].join(' '),
    ),
    expectedFiles: ['prince-parts-source.png'],
    notes: 'Keep cage frame, cage door, and hanging hook separated from prince body pieces.',
  },
  {
    id: 'prompt.rig.kobolds',
    title: 'Kobold enemy cutout rig parts',
    outputUse: 'Transparent PNG enemy parts for Blender cutout rigging.',
    prompt: withLockedStyle(
      [
        'Create separate transparent PNG body parts for cartoon fantasy kobold enemies for a cozy match-3 game,',
        'not scary, goofy underbite, oversized simple weapon, bow-legged walk, no text.',
        'Produce basic kobold and taller kobold variants with shared proportions where possible for rig reuse.',
        'Output parts: head, jaw/face variants, torso, upper arms, forearms, hands, weapon, thighs, calves, feet, optional tail.',
      ].join(' '),
    ),
    expectedFiles: ['kobold-parts-source.png', 'tall-kobold-parts-source.png'],
    notes: 'Tall kobold should share rig-friendly proportions with basic kobold where possible.',
  },
  {
    id: 'prompt.props.abductor',
    title: 'Abductor hint props',
    outputUse: 'Transparent PNG edge-of-frame prop hints for later cage-yank VFX.',
    prompt: withLockedStyle(
      [
        'Create transparent PNG edge-of-frame prop hints for an unseen comedic abductor in a fantasy puzzle game,',
        'no full character, no text.',
        'Props: giant glove hand, curved hook, magical spectral hand, rope loop, claw silhouette, tentacle-like silhouette.',
        'Each should work as a brief 250ms cage-yank visual from the top or side edge.',
      ].join(' '),
    ),
    expectedFiles: [
      'prop-abductor-glove.png',
      'prop-abductor-hook.png',
      'prop-abductor-hand.png',
      'prop-abductor-rope.png',
    ],
    notes: 'Keep the abductor mysterious; do not make a full character.',
  },
];

export function getArtPrompt(id: ArtPromptId): ArtPromptBatch {
  const prompt = ArtPrompts.find((candidate) => candidate.id === id);
  if (prompt == null) {
    throw new Error(`Unknown art prompt id: ${id}`);
  }

  return prompt;
}

function withLockedStyle(prompt: string): string {
  return `${prompt} Style: ${LockedStyleLanguage}`;
}
