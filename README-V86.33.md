# KIDZSTUDIOS Office Plus V86.33: Office Simulator CI repair

## Why V86.32 was not enough

The previous change repaired `scripts/test-walking-routes.cjs`, but GitHub Actions executes several tests sequentially under **Test Office Simulator stability**. The next failing test was `scripts/test-v86-16-simulation-rebuild.mjs`, which parsed a retired `separateWorkerPositions` function out of `public/index.html`. The current 3D renderer moved to `source/src/suite-bridge.ts` and `source/src/office-navigation.js`, so no such inline helper exists. This test failed irrespective of whether the real movement was correct.

## Fix

- Updated only `scripts/test-v86-16-simulation-rebuild.mjs` to use the current production geometry guard and `followSceneTarget` source.
- Kept the smooth movement/docking assertions and added regressions against illegal wall-crossing, teleporting, and mutations of the authoritative staff coordinates.
- Updated the two release metadata JSON files to **86.33**; no production runtime or Supabase logic was changed.
- Retained all V86.32/Job Management changes and GitHub Actions workflow.

## Verification in this environment

PASS: repository integrity; job data, workbook, shared rules, validation, saving, UI; Supabase bridge mocks; walking route sweep (1,139 safe segments); movement timeline; living timeline sync; V86.16/V86.33 current-renderer regression. The new test failed on the V86.32 archive and passes with the fix.

**Not verified:** `npm ci`, the Three.js build, real WebGL browser, and live Supabase because the npm registry was unreachable (`EAI_AGAIN`). `scripts/test-v86-22-simulation.mjs` needs installed `three` dependencies. `scripts/test-v86-30-furniture-ai.mjs` is an additional older release test that still fails on its index.html asset-version assertions; this test is not currently in the CI stability step. Passing the listed local tests does not guarantee a fully green remote workflow.

## Deploy without deleting your repository

Use the **one-file test patch** when V86.32 is already committed: replace `scripts/test-v86-16-simulation-rebuild.mjs` in the repository root; commit and push. The full package adds release metadata and this note. Select the latest run for the **new commit**, not an earlier failed run. If the latest run still fails, copy the name of the first red step and the exact error log.
