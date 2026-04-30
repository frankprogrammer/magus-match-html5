import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import {
  projectileColor,
  projectileMaterialSettings,
  projectileParticleColorComponents,
  projectileQuadScale,
} from '../src/render-three/ThreeHeroStage';

describe('ThreeHeroStage projectile VFX', () => {
  it('maps spell schools to the requested tile colors', () => {
    expect(projectileColor('earth')).toBe('#27ae60');
    expect(projectileColor('fire')).toBe('#ff8a1f');
    expect(projectileColor('ice')).toBe('#38d5ff');
    expect(projectileColor('lightning')).toBe('#f2c94c');
  });

  it('uses the same school tint for match and bomb projectile particles', () => {
    const matchIce = projectileParticleColorComponents({ schoolId: 'ice', effectKind: 'match' });
    const bombIce = projectileParticleColorComponents({ schoolId: 'ice', effectKind: 'bomb' });
    const bombFire = projectileParticleColorComponents({ schoolId: 'fire', effectKind: 'bomb' });

    expect(bombIce).toEqual(matchIce);
    expect(bombIce).not.toEqual(bombFire);
  });

  it('uses explicit tinted material settings for match and bomb projectiles', () => {
    expect(projectileMaterialSettings({ schoolId: 'earth', effectKind: 'match' })).toMatchObject({
      color: projectileColor('earth'),
      blending: THREE.NormalBlending,
      transparent: true,
    });
    expect(projectileMaterialSettings({ schoolId: 'lightning', effectKind: 'bomb' })).toMatchObject({
      color: projectileColor('lightning'),
      transparent: true,
    });
  });

  it('uses larger vertically stretched quad scales for match and bomb particles', () => {
    expect(projectileQuadScale('match')).toEqual({ x: 0.27, y: 0.36 });
    expect(projectileQuadScale('bomb')).toEqual({ x: 0.6, y: 0.78 });
    expect(projectileQuadScale('match').y).toBeGreaterThan(projectileQuadScale('match').x);
    expect(projectileQuadScale('bomb').y).toBeGreaterThan(projectileQuadScale('bomb').x);
  });
});
