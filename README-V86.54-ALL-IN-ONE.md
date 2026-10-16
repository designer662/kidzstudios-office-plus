# KIDZSTUDIOS Office Plus V86.54 · Integrated Release

## Baseline and boundaries

Rebased on the latest **available** V86.53 editable-Google-Sheet-import full project (267 files). This is a source snapshot, **not a verified copy of the user's live GitHub `main`**. The provided Codespaces installer verifies SHA-256 hashes of every affected file after fetching `origin/main` and aborts on a mismatched baseline. It never overwrites a different version silently.

## Integrated capabilities

1. **Job Management:** Retains automatic current-month selection, all existing 28 Excel fields, current-view and all-jobs exports, status feedback, and role/permission handling. Export actions are now serialized so repeated clicks cannot launch overlapping downloads or show conflicting success/error messages.
2. **Data Hub:** Keeps personal editable Google Sheet URL, file/XLSX/CSV/JSON import, merge-by-reference, backup readback verification, conflict detection, and payload limits. Duplicate export requests display a wait message; merge/replace remain blocked until backup integrity passes.
3. **Index & Live Activity:** Keeps genuine Connecting/Live/Reconnecting/Offline synchronization and startup recovery, adds a guard that prevents registering the browser online/offline/realtime listeners more than once.
4. **Office Pulse:** Its Last Sync indicator now timestamps successful shared-job retrieval rather than an earlier job's last-save time. Cached and offline states remain visible after failures.
5. **Smart AI & 3D:** Original 3D engine, locations, movement algorithms, and leader/follower logic are unchanged. The diagnostic Plan Move and Reset AI controls now recover if a server response fails to arrive, instead of staying disabled indefinitely. Previous feature modules are preserved.
6. **Price List:** All eight categories, quote formulas, export, commission, discounts, and deposit functions are unchanged. Toast messages now use text nodes instead of interpreting dynamic content as HTML.
7. **Markup Calculator:** Original pricing calculations and layout are unchanged. Legacy clipboard fallback now only claims success if the copy operation actually succeeds.
8. **Reports:** Adds CSV/XLSX export choices for all filtered jobs, not just the current pagination page. Uses the existing `office-workbook.js` generator; both downloads show accurate requested/failed states. The report table supplies identical 13-column data for XLSX.
9. **Security & Supabase:** No new schema, permissions, exposed service keys, or unsafe downloads. Existing URL allowlist, optimistic concurrency, protected exports, and read-only report access are preserved. No third-party application dependencies added.
10. **CI & Release:** Version 86.54 registered in release metadata and package lock; existing historic regression assertions no longer require obsolete asset-cache numbers. CI runs the integrated contract and the existing real Chromium report download test (now including XLSX); the existing Simulator and Job Data Hub tests remain mandatory.

## Files changed

Production UI/runtime: `public/index.html`, `public/job-management.html`, `public/report.html`, `public/report.js`, `public/report-data.js`, `public/office-smart-ai.js`, `public/pricelist-calculator.html`, `public/markup-calculator.html`, `public/office-build-info.json`.

Release/build: `office-release.json`, `source/package.json`, `source/package-lock.json`, `.github/workflows/deploy-pages.yml`.

Regression tests: `scripts/test-v86-54-all-in-one.mjs`, `scripts/test-v86-51-report-browser.mjs` and existing tests updated to accept release-stamped local script/style URLs (historical V86.29–49 simulator, V86.41 cleanup, V86.53 header/pricing/report tests).

## Verified locally

- `node scripts/check-repo.mjs`, `node scripts/test-v86-54-all-in-one.mjs`, current-month/Data Hub, Office Pulse, Index Stability, Smart AI, Markup, Price List and Reports static checks pass.
- Actual Chromium Reports export verified with 3 records: sanitized CSV, valid ZIP-based XLSX opened with independent `openpyxl` (13 columns, 3 rows), no page errors or mobile horizontal overflow at 390px.
- Full Smart AI historical logic and 3D movement tests that require no `three` installation pass.

## Pending / known limits

- This container has no cached `three` and Node Playwright package installation is unavailable here. The complete 3D simulation runner and Node-based Chromium CI scripts must run on GitHub Actions after its `npm ci --prefix source` step. Browser tests in this release were executed with installed Python Playwright and system Chromium, except for remaining GitHub-only tests.
- Authentication, live Supabase writes, customer data, and GitHub Pages deployment were **not** modified or tested here. The provided installer publishes only after local, dependency-free checks pass; final publication additionally requires **green GitHub Actions**.
- An ordinary browser download click does not guarantee the file reached disk. Strict backup-before-import verification continues to require reading back the saved file.

## Codespaces publication

Upload `KIDZSTUDIOS_V86_54_ALL_IN_ONE_ONE_UPLOAD.zip` to repository root, then run:

```bash
unzip -oq KIDZSTUDIOS_V86_54_ALL_IN_ONE_ONE_UPLOAD.zip && bash apply_v86_54_all_in_one.sh
```

If the hash check rejects your GitHub branch, **stop** and provide the latest GitHub source ZIP. Do not force-overwrite newer changes. After a successful push check the associated GitHub Actions run and test the deployed features with your authenticated account.
