import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const distDir = 'dist';
const jsFiles = collectJsFiles(join(distDir, 'assets'));

if (jsFiles.length === 0) {
  throw new Error('No built JavaScript files found under dist/assets.');
}

const offenders = jsFiles.filter((filePath) => readFileSync(filePath, 'utf8').includes('import.meta.env'));

if (offenders.length > 0) {
  throw new Error(`Built asset resolver still contains raw import.meta.env access: ${offenders.join(', ')}`);
}

function collectJsFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    const stats = statSync(path);

    if (stats.isDirectory()) {
      return collectJsFiles(path);
    }

    return entry.endsWith('.js') ? [path] : [];
  });
}
