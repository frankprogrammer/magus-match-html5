// @ts-nocheck

import { describe, expect, it } from 'vitest';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const mhsRoot = join(repoRoot, 'magusMatchMHS');

describe('MHS Trial-only port guard', () => {
  it('does not copy removed Journey tile assets into the MHS sprites folder', () => {
    const tileDir = join(mhsRoot, 'sprites', 'tiles');
    const tileNames = existsSync(tileDir) ? readdirSync(tileDir) : [];

    expect(tileNames).not.toContain('tile-land.png');
    expect(tileNames).not.toContain('tile-path.png');
  });

  it('keeps MHS runtime scripts free of Journey and LAND/path gameplay identifiers', () => {
    const scriptsDir = join(mhsRoot, 'scripts');
    const files = listFiles(scriptsDir, '.ts').filter((file) => !file.endsWith('.assetmeta'));
    const violations: string[] = [];
    const forbidden = [
      { label: 'Journey mode', pattern: /\bJOURNEY\b|\bJourney\b|\bjourney\b/ },
      { label: 'LAND tile type', pattern: /\bLAND\b/ },
      { label: 'Journey tile assets', pattern: /tile-land|tile-path|tile\.land|tile\.path/ },
    ];

    for (const file of files) {
      const source = readFileSync(file, 'utf8');
      for (const rule of forbidden) {
        if (rule.pattern.test(source)) {
          violations.push(`${file}: ${rule.label}`);
        }
      }
    }

    expect(violations).toEqual([]);
  });
});

function listFiles(root: string, extension: string): string[] {
  if (!existsSync(root)) {
    return [];
  }

  return readdirSync(root).flatMap((name) => {
    const fullPath = join(root, name);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      return listFiles(fullPath, extension);
    }

    return fullPath.endsWith(extension) ? [fullPath] : [];
  });
}
