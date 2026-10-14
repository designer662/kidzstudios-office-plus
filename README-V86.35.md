# KIDZSTUDIOS Office Plus V86.35 — Consolidated GitHub Root Package

## Why this exists

The user-supplied `v86-30-FURNITURE-SMART-AI-CHANGED-FILES-ONLY` ZIP is **a 13-file patch**, not a full repository. V86.34 already contained its 3D TypeScript, Smart AI, furniture interaction and movement scripts, but it still shipped a V58-era dashboard `public/index.html`. This consolidated release restores the V86.30 dashboard and retains newer V86.31–V86.34 Job Management, security, and GitHub Actions fixes.

## Change scope vs V86.34

- `public/index.html`: restored the V86.30 furniture-aware Smart AI dashboard with correct geometry/seating/furniture script load order, shared movement adapter and synchronized action playback. Footer release updated to V86.35.
- `scripts/stability-suite.mjs`: restore the V86.28, V86.29 and V86.30 checks to CI (8 simulator tests total).
- `scripts/test-stability-runner.mjs`, `scripts/test-v86-29-smart-ai.mjs`, `scripts/test-v86-30-furniture-ai.mjs`: assert that CI invokes the suite and it registers the AI regressions. No weakening or skips.
- `.github/workflows/deploy-pages.yml`: run the static runtime wiring audit before deploying. Retains the V86.34 npm cache fix and Supabase security validation.
- `office-release.json`, `public/office-build-info.json`: updated release metadata.
- `README-V86.35.md`: this document.

The V86.31 Job Management module, changed API/saving behavior, and all original furniture-aware TypeScript source files are retained without changes.

## Verification

From the extracted **repository root**:

```bash
node scripts/test-deployment-setup.mjs
node scripts/check-repo.mjs
node scripts/audit-runtime-wiring.mjs
node scripts/test-job-data.mjs
node scripts/test-workbook.mjs
node scripts/test-job-ui-v86-31.mjs
node scripts/test-public-config.mjs
node scripts/test-stability-runner.mjs
node scripts/test-v86-28-synchronized-walking.mjs
node scripts/test-v86-29-smart-ai.mjs
node scripts/test-v86-30-furniture-ai.mjs
npm ci --prefix source
npm run build:3d --prefix source
node scripts/run-stability-suite.mjs
node scripts/test-v86-22-browser.mjs
```

The last four commands require network access, downloaded `three` / `esbuild` / `playwright` dependencies and a working browser. Their execution must be verified by GitHub Actions and in a real deployed browser. Local static tests and the V86.28–V86.30 behavior tests pass. The V86.22 3D simulation test is blocked locally because `source/node_modules/three` is unavailable. The static audit can confirm script references but **cannot establish the runtime correctness** of 3D navigation, animations or Supabase leader/follower synchronization.

## Website-only GitHub upload

1. Back up the current `main` branch and independently export critical Supabase job data.
2. Extract the ZIP locally. Do **not** upload the ZIP file itself to the repository and do not nest the files inside an extra project folder.
3. In GitHub web, create an `upgrade-v86-35` branch from the latest `main` commit. Upload the extracted root folders/files into that branch, maintaining `.github/`, `public/`, `scripts/`, `source/`, `supabase/` and root filenames. GitHub's web uploader may require batches.
4. Verify `public/index.html`, `source/package-lock.json` and `.github/workflows/deploy-pages.yml` are located at the repository root paths. Review any obsolete files left in the branch: web upload overwrites matching files but does not automatically delete extras.
5. Open a pull request to `main`, review the diff and confirm Actions checks, including the real 3D/WebGL browser check, succeed before merging. Validate live Job Management forms, Excel export and two-browser staff synchronization after deploying.

## Open issues and non-CI legacy tests

A wider optional regression sweep found **16 older standalone tests failing**, including old markup/cache-version assertions, character-studio assumptions, and a prior job-period test expecting the current month instead of the current all-months default. These tests are not included in the current GitHub Actions workflow and were **not made green by weakening assertions or altering product behavior**. They require separate evidence-based modernization before the entire historical test set can be claimed passing. The CI-selected V86.22 simulation test and the rebuilt browser test remain unverified locally due to missing installed dependencies.

No live deployment or database migration was performed to prepare this package.
