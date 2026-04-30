# GitHub Pages Deployment

This repo publishes playable builds through GitHub Pages.

## URLs

- Main build: `https://frankprogrammer.github.io/magus-match-html5/`
- Branch build: `https://frankprogrammer.github.io/magus-match-html5/branches/<branch-slug>/`

Branch slugs are lowercased and URL-safe. For example, `feature/trial-duel` deploys to:

`https://frankprogrammer.github.io/magus-match-html5/branches/feature-trial-duel/`

## GitHub Settings

1. Push `.github/workflows/deploy-pages.yml` to GitHub.
2. Open `frankprogrammer/magus-match-html5` on GitHub.
3. Go to `Settings > Actions > General`.
4. Under `Workflow permissions`, choose `Read and write permissions`.
5. Save.
6. Go to `Settings > Pages`.
7. Under `Build and deployment`, choose `Deploy from a branch`.
8. Set branch to `gh-pages`.
9. Set folder to `/ (root)`.
10. Save.

## Workflow Behavior

Every branch push runs:

```bash
npm ci
npm run test
npm run build
```

Then it publishes:

- `main` to the root of the `gh-pages` branch.
- Any other branch to `branches/<branch-slug>/`.

The workflow preserves existing deployed folders, so updating one branch preview does not delete the main build or other branch previews.

For branch previews, the workflow merges the latest `origin/main` into the pushed branch before building. This keeps branch preview builds current with `main` while still including the branch changes. If the merge conflicts, the workflow fails and the branch needs to be updated locally.

Each deploy includes `build-info.json` so you can verify what was published:

- Main: `https://frankprogrammer.github.io/magus-match-html5/build-info.json`
- Branch: `https://frankprogrammer.github.io/magus-match-html5/branches/<branch-slug>/build-info.json`

## Local Checks

Run these before pushing:

```bash
npm.cmd run test
npm.cmd run build
```

The app uses a relative Vite base and a runtime asset URL resolver so public assets load correctly from both the root Pages URL and nested branch preview folders.
