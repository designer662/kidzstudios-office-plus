# KidzStudios Office Plus V86.41 — Maintenance & Code Audit

Previous baseline: V86.40 (Job Management remains the only Office Pulse job source). This is a maintenance update, not a redesign or database migration.

## Confirmed fixes

1. Replaced `public/index.html`'s separate, outdated ~7.5 KB inline page synchronizer with the maintained `public/shared-sync.js`. The latter includes the V86 sync protection for dirty/saving form state, `pagehide` handling, and realtime-aware polling. Dashboard-only handling preserves local `job-management.html` links, while the existing configurable Google Sheets shortcut remains supported on other tool pages. Existing Drive URL behavior remains intact.
2. Removed `public/netlify-sync.js`, an **identical and unused** duplicate of `public/shared-sync.js` (no live HTML referenced it). Removed `public/app.js`, an unreferenced and stale 138 KB duplicate of much of the active dashboard logic. Legacy Netlify service files are still archived. The deleted files were not loaded by the active GitHub Pages application.
3. Synchronized `office-release.json`, `public/office-build-info.json`, and `source/package.json`/`source/package-lock.json` to V86.41. Version footers are stamped across all pages using the existing `scripts/stamp-version.mjs`.
4. CI now preflights the repository layout, validates deployment setup, runs the complete ten-test simulator stability manifest, and runs the V86.37 Action Queue, V86.38 Pulse, V86.40 single-source and V86.41 dedup regressions. The V86.41 test also audits for exact duplicate public JS files, duplicate static HTML IDs, missing local script dependencies, and release version drift.
5. Updated the obsolete deployment-regression assertion to allow valid lockfile-based npm caching. Cache is retained in CI, with the declared lockfile present.

## Validation and limits

Syntax, static wiring, HTML/local assets, Supabase mocked API, job tests and offline-executable simulator checks can be verified with Node. `npm ci --offline --prefix source` is unavailable in this environment: the required `three@0.180.0` package is **not cached**. Therefore the compiled `public/office-3d.js` is not rebuilt here, and full WebGL integration, networked Supabase synchronization, live deployment, and mobile UI require GitHub Actions/staging validation. The CI rebuild step remains mandatory; **do not bypass it and deploy raw `public/` as an up-to-date 3D build**. Some calculator/order form functions rely on external CDN libraries and are not fully offline standalone. Authentication and shared state also need a reachable configured Supabase instance.

## Regressions to run

```sh
node scripts/test-v86-41-code-cleanup.mjs
node scripts/check-repo.mjs
node scripts/audit-runtime-wiring.mjs
node scripts/test-v86-40-office-pulse-source.mjs
node scripts/test-v86-38-office-pulse.mjs
node scripts/test-v86-37-action-queue.mjs
node scripts/test-bridge-mock.mjs
node scripts/test-deployment-setup.mjs
node scripts/run-stability-suite.mjs
# With installed dependencies and browser:
npm ci --prefix source
npm run build:3d --prefix source
node scripts/test-v86-22-browser.mjs
```

## Improvements recommended next

- Split the large active dashboard inline application (~154 KB) and Job Management (~121 KB HTML) into a shared state/data layer, feature modules, DOM views, and a single bootstrap. Do not just extract and leave parallel copies.
- Consolidate the growing versioned CSS files into layered component styles without changing selector precedence, after visual snapshots exist.
- Add authenticated end-to-end tests for multi-user edits, version conflict handling, offline/reconnection, and 3D furniture/motion interactions. Keep seeded test data in a separate Supabase staging environment.
- For true offline standalone tools, bundle and license third-party `html2canvas` and `jsPDF` dependencies locally; provide a clear no-network mode. Full Supabase-backed real-time features necessarily depend on connectivity unless an offline queue/reconciliation design is built.
- Retire or explicitly archive historical `test-v86-*` assertions that target removed V86.4/V86.8 behavior or exact old asset query strings. Do not interpret their failures as current functional regressions; preserve newer functional invariants.
