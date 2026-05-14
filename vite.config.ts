import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: './',
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/**/*.test.ts'],
    exclude: ['node_modules/**', 'dist/**', '.worktrees/**'],
  },
});
