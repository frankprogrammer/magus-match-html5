import { describe, expect, it } from 'vitest';
import { projectileColor } from '../src/render-three/ThreeHeroStage';

describe('ThreeHeroStage projectile VFX', () => {
  it('maps spell schools to the requested tile colors', () => {
    expect(projectileColor('earth')).toBe('#27ae60');
    expect(projectileColor('fire')).toBe('#eb5757');
    expect(projectileColor('ice')).toBe('#38d5ff');
    expect(projectileColor('lightning')).toBe('#f2c94c');
  });
});
