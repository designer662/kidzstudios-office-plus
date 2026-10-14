# KIDZSTUDIOS Office Plus V86.33: pre-merge and GitHub Pages audit

**Assessment:** CI/security diagnostic patch only. **NOT release-ready for the full V86 Smart AI simulation.** Do not merge the release solely because older job and movement tests are green. No files have been deployed by this package.

## Reproduction / confirmed findings

1. **Critical: missing live simulation integration** (`public/index.html`, script imports around lines 975–982, bottom of page around line 2839, `window.OfficeSuite` around line 2602). The dashboard loads only `office-3d.js?v=57.0`, not the V86.22–86.30 geometry, seating, living, Smart AI, furniture, or shared movement scripts. Although the modules exist in `public`, they are absent from the production page. `OfficeSuite.sharedMovement` is absent, so merely inserting `office-movement-sync.js` will silently return early. `startRandomRoam()` still runs locally. This is a functional release blocker, not a test-only issue. **Do not patch asset tags alone**: an adapter and safe retirement of independent roaming must be designed and browser-tested.
2. **High: configuration could publish privileged JWT** (`scripts/generate-config.mjs`, formerly `/^(sb_publishable_|eyJ)/`). Legacy service-role JWTs commonly begin with `eyJ` and were accepted without inspecting role. The build writes the key directly to `public/supabase-config.js` for GitHub Pages visitors. Updated generator requires an `anon` claim for legacy JWTs and rejects privileged roles. New regression test fails on the V86.33 baseline and passes on this patch. Publishing an `anon` key is normal; never configure service-role / secret keys in GitHub repository variables.
3. **Medium: CI reported one simulator failure per push** (`.github/workflows/deploy-pages.yml`, "Test Office Simulator stability"). A multiline `run` section stops at the first failed node process. This led to repeated cycles repairing one retired-function assertion at a time. New `scripts/stability-suite.mjs` invokes the **same five tests** and reports all failing tests; exits nonzero if any fails. Unit regression exercises success, failure, and continuation after failure.
4. **Medium: retired version tests exist but aren't in the release workflow** (`scripts/test-v86-29-smart-ai.mjs`, `scripts/test-v86-30-furniture-ai.mjs`, other `scripts/test-*`). Several tests expect V86.29/30 script tags absent from the current `index.html`; adding them wholesale to CI before restoring runtime integration would fail. They should become gates after the missing feature wiring is repaired, not silently ignored.
5. **Unverified: Three.js/WebGL behavior** (`scripts/test-v86-22-simulation.mjs`, `scripts/test-v86-22-browser.mjs`). A clean local `npm ci` fails with DNS `EAI_AGAIN` when retrieving `three`. Those tests require GitHub's network/dependency installation and a Chromium WebGL runtime. No full green GitHub run was observed during this audit.

## Modified files (patch scope)

- `scripts/generate-config.mjs`: reject privileged legacy JWT roles and malformed public keys.
- `scripts/test-public-config.mjs`: reject service roles with no file overwrite, and assert accepted public forms.
- `scripts/stability-suite.mjs`: reusable strictly failing, non-short-circuiting simulator regression runner.
- `scripts/run-stability-suite.mjs`: CLI entry point for that runner.
- `scripts/test-stability-runner.mjs`: verifies it reports failures, keeps checking, and still fails CI.
- `scripts/audit-runtime-wiring.mjs`: explicit **read-only** integration diagnostic; exits nonzero until runtime wiring is fixed.
- `.github/workflows/deploy-pages.yml`: run config security test; run all five simulator tests through the strict runner.
- `docs/PREMERGE-CI-AND-DEPLOYMENT-AUDIT.md`: findings, follow-up plan and deployment preflight.

No production page, 3D model, Job Management data, SQL schema or user-facing styles were changed.

## Local checks and limitations

```
node scripts/test-public-config.mjs         # PASS
node scripts/test-stability-runner.mjs       # PASS
node scripts/check-repo.mjs                 # PASS
node scripts/test-workbook.mjs              # PASS
node scripts/test-job-data.mjs              # PASS
node scripts/test-job-rules.mjs             # PASS
node scripts/test-job-validation.mjs        # PASS
node scripts/test-job-saving.mjs            # PASS
node scripts/test-job-ui-v86-31.mjs         # PASS
node scripts/test-bridge-mock.mjs           # PASS
node scripts/run-stability-suite.mjs        # 4/5 pass offline; Three.js dependency unavailable
node scripts/audit-runtime-wiring.mjs       # 9 blocking findings (expected before runtime integration)
```

The config regression test was run against the unmodified V86.33 source: it **failed** as expected because service-role JWTs were accepted; it **passes** after the targeted fix. The stability-runner unit test checks a synthetic failing test sandwiched between successful tests. The CI workflow does not suppress any of its previous five simulator tests.

## GitHub Pages preflight (do not deploy until blockers resolved)

1. Keep the committed repository `main` branch and existing history. Make changes on a review branch, inspect diff, and open a pull request. Do not delete the repo to repair CI.
2. Local on a machine with npm network: `npm ci --prefix source`; `npm run build:3d --prefix source`.
3. Run the test commands above and the complete stability runner. After repairing the missing real runtime adapter and loader ordering, `node scripts/audit-runtime-wiring.mjs` must succeed, and re-enable the V86.29/V86.30 tests in CI.
4. GitHub repository **Settings → Secrets and variables → Actions → Variables**: define `SUPABASE_URL=https://<your-project>.supabase.co` and `SUPABASE_PUBLISHABLE_KEY=sb_publishable_<public-key>` (legacy `anon` JWT supported). Do not put a service-role, `sb_secret_`, password, or any private secret in variables or GitHub Pages. The publishable key is intentionally public.
5. Supabase migrations and Row Level Security policies must already be applied and reviewed in the real Supabase project. GitHub Pages workflow does **not** run migrations. Back up job data separately.
6. GitHub repository **Settings → Pages**: select GitHub Actions as build/deployment source. Ensure `main` is protected as appropriate, and approvals are available for the `github-pages` environment if required.
7. On a new commit, review the **new** GitHub Actions run and confirm the commit SHA. Verify `npm ci`, 3D rebuild, config validation, repository asset check, all job and simulator checks, browser WebGL, upload, and deployment individually.
8. Once deployed after full validation, hard-refresh desktop and mobile, exercise a job create/edit/save/conflict, XLSX import/export, profile/3D fallback, two connected browsers sharing a simulated timeline, chair docking, furniture occupancy, and invalid network/follower recovery. Inspect browser console and Supabase API errors.
9. Rollback plan: redeploy the previous known-good commit via GitHub workflow. Restore Supabase data separately only if the database was modified (this patch makes no DB change).

## What is still needed

The **latest failed GitHub Actions run**, its commit SHA, and full log from the first red step. Existing screenshots are from earlier releases and do not identify the current failing test. Restore `OfficeSuite.sharedMovement` and the intended V86 module loading behavior from a known-good runtime implementation (if one exists), then verify in an actual browser with Supabase and WebGL enabled. Do not declare the feature complete from static file presence alone.
