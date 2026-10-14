# KidzStudios Office Plus V86.41 — Deployment Retest & Guarded Release

**Date:** 14 October 2026  
**Deployment decision:** CONDITIONAL / NOT YET VERIFIED FOR PRODUCTION. This repository is configured to **block deployment** if the Three.js build, real-browser acceptance test, or final artifact verification fails.

## What was validated locally

- 20 / 20 CI-invoked independent static, data, mock API, UI, security, config, asset and packaging tests **passed**.
- Simulator stability: 9 / 10 passed. The last test cannot import `three` without installing dependencies.
- `npm ci --prefix source` failed due to environment network/DNS (`EAI_AGAIN registry.npmjs.org`). No real rebuild is claimed.
- Chromium launch succeeded, but page navigation was blocked by the container's administrator policy (`ERR_BLOCKED_BY_ADMINISTRATOR`), including `data:` and `file:` navigations. No real WebGL/browser pass is claimed.
- The local `public/supabase-config.js` is a **placeholder**, deliberately not ready to publish. GitHub Actions generates the actual public config using repository variables.
- Static code checks: 10 pages, all inline/standalone JS and reference wiring pass; no syntax errors; `test-bridge-mock`, delete modal and outside-click checks pass.

## Deployment safeguards added

1. `source/scripts/build-3d.mjs` rebuilds `public/office-3d.js` from sources and writes `public/office-3d-build.json` with a SHA-256 fingerprint of the source and output bundle.
2. `scripts/3d-build-integrity.mjs` independently verifies bundle/source/package version alignment. `scripts/test-build-integrity.mjs` exercises the failure cases.
3. `scripts/stamp-version.mjs` updates release footers **and all relative local `.js` and `.css` file versions** (`?v=86.41.<GITHUB_RUN_NUMBER>`) so browser caches cannot keep a stale older 3D file. External CDN links remain unchanged. `scripts/test-version-stamping.mjs` checks this and idempotence.
4. `scripts/test-deploy-artifact.mjs` blocks Pages upload if a fresh build manifest is missing/stale, `.nojekyll` missing, Supabase config is placeholder or unsafe, or dashboard 3D cache version does not match the build.
5. `.github/workflows/deploy-pages.yml` runs source/build-integrity tests, Supabase key security checks, JS/browser/stability checks and final artifact verification *before* upload/deployment. An obsolete root-level `deploy-pages.yml` copy was removed to reduce confusion.

## What still requires an online CI/staging check (mandatory)

- `npm ci --prefix source` installs pinned `three`, `esbuild` and `playwright` dependencies on GitHub Actions.
- `npm run build:3d --prefix source` completes; integrity manifest is emitted and verified.
- `node scripts/run-stability-suite.mjs`: **10/10**.
- `node scripts/test-v86-22-browser.mjs`: Chromium + software WebGL behavioral acceptance **PASS**.
- `node scripts/test-deploy-artifact.mjs`: final validation **PASS** after stamp + .nojekyll.
- Authenticated Supabase staging smoke test, with authorized users: login/logout, office dashboard, staff actions, job edits, second-client sync, conflict handling, reconnect, 3D performance and mobile UI.
- Export tools reference external libraries; they are not fully offline-capable. Real offline support requires vendoring those dependencies.
- 15 historical tests not in the production CI path still fail earlier-version expectations or missing controls (including historic bulk-delete); determine desired behavior separately before treating those features as covered.

## Deployment procedure

1. Back up the currently deployed version and production data. Keep rollback commit available.
2. Extract the ZIP and put the **contents** of `kidzstudios-office-plus-main/` in the GitHub repository root, preserving the hidden `.github/` folder. Do not directly upload raw `public/` as a production build.
3. In GitHub **Settings → Secrets and variables → Actions → Variables**, set `SUPABASE_URL` (`https://...supabase.co`) and `SUPABASE_PUBLISHABLE_KEY` (public `sb_publishable_...` or legacy anon-role JWT only). **Never use service-role or secret keys**.
4. Confirm that your Supabase migrations and RLS policies are installed and that legitimate staff accounts are registered. This ZIP does not apply database migrations automatically.
5. Ensure **Settings → Pages → Source = GitHub Actions**. Push to `main` (or trigger the workflow manually).
6. Confirm **every** workflow step is green, especially `Rebuild 3D from source`, `Test Office Simulator stability`, `Test rebuilt 3D in WebGL`, `Validate deploy artifact (fail closed)`, and `Deploy GitHub Pages`. A red workflow is a release block, not permission to bypass checks.
7. Test with a staging account, a second browser/device, desktop/mobile displays, staff interactions, edit/save + concurrent edits, browser reload/reconnect and the tools requiring external CDN resources.
8. Promote only after staging acceptance; otherwise roll back to your last known good GitHub commit and investigate failures.

**Verdict:** Safe as a **guarded CI deployment candidate**, not independently demonstrated to be a production-ready binary. The ZIP contains build inputs; its checked-in `public/office-3d.js` must be rebuilt on CI. No live backend connection or authorized browser session was tested locally.
