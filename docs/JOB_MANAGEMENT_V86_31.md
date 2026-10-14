# Job Management V86.31 | Implementation and Operations Guide

## Architecture verified from the uploaded V86.30 source

- The interactive Job Management page is `public/job-management.html`, with an inline event/controller and a 28-column compatibility schema (`FIELDS`).
- `public/job-data.js` parses Google Sheets, CSV, TSV and JSON; `public/office-workbook.js` reads/writes XLSX in the browser, including compressed XLSX; `public/job-rules.js` classifies pipeline stages, measures payload bytes and detects duplicate references.
- `public/index.html` presents Office Pulse and reads the shared `dashboard:jobs` scope through the existing `public/supabase-bridge.js` adapter.
- The Supabase database continues to hold the entire job collection as shared JSON state. Saves use `expectedVersion` optimistic conflict protection. No new SQL migration or third-party dependency was introduced.
- The V86.30 office simulator and Smart AI modules were left untouched by this upgrade.

## Implemented changes

1. **CI fix:** `public/index.html` and `public/job-management.html` now both load `suite-header-v61.css?v=66.0`. The existing ten-page workbook assertion passes.
2. **Native Excel:** new `Tools > Import Excel Workbook` supports `.xlsx` with parsed row validation, row-count preview, sample records, revision check, JSON backup download before shared replacement, and clear failure feedback. `Export Data` now includes current-view XLSX, all-jobs XLSX and blank 28-column template.
3. **Local files:** `Tools > Import CSV / TSV / JSON` parses local files using the existing data library, validates job references, previews replacement counts, and offers backup-before-replace confirmation.
4. **Safe exports:** CSV export uses `KSJobData.csvValue` to prevent spreadsheet formula execution on user-controlled strings.
5. **Accessible editor:** every 28+ input has an explicit accessible label; invalid fields receive an inline message, `aria-invalid`, focus and expanded accordion. Failed saves retain entered values. Save buttons show busy state and reject duplicate submissions.
6. **Mobile editor:** independently scrollable form body, always-accessible footer and responsive dynamic viewport sizing (`dvh`), avoiding arbitrary fixed offsets.
7. **Tests:** `scripts/test-job-ui-v86-31.mjs` is called by GitHub Actions alongside existing workbook, job data, saving, validation and Supabase bridge checks.

## Workflow and success states

1. Open Job Management; see loading/empty/offline status, and live job list if authenticated.
2. Add/edit a job. Required fields are job reference, customer, order date, and item or printing type. Moving a new job into Production requires delivery date, quantity, size breakdown and artwork approval.
3. Press Save Job. While saving, the action is disabled and status shows Saving. On success the modal closes, a toast appears, and Office Pulse reads updated shared records. On validation error the form stays open and focuses the invalid field. On version conflict or HTTP failure the server is not overwritten and the form remains open for recovery.
4. Tools > Export Data downloads XLSX/CSV, yearly summary or JSON backup. Tools > Import Excel Workbook shows a preview, then requires explicit replacement confirmation; any 409 conflict rejects the replacement.
5. For a local CSV/JSON import, confirm the row count and replacement warning. A JSON backup export is initiated before writing to Supabase.

## Data and security limitations

- No schema migration: Supabase shared JSON payload has a 450 kB server cap. The existing save routine rejects payloads above 440 kB, rather than silently dropping records. Beyond this size, a job-per-row schema and migration is required.
- Import **replaces**, never merges. A 28-column workbook does not contain optional `jobMeta` (quantity, size breakdown, artwork approval/link) from prior records; such metadata is included in JSON backup. Test in a staging database first and verify the backup file exists on disk before using replacement on important data.
- Conflict resolution remains whole-collection optimistic version checking, not field-level merging. Saved form state is preserved in the browser when a save fails; it is not durable offline storage.
- Job-specific role restrictions, payment visibility RLS, and immutable per-field audit trail are not implemented. Current permissions are defined by the existing Supabase policies and should be reviewed before giving broader staff access.
- Live Supabase authentication, production save/restore, and GitHub Pages deployment were not accessible for verification from this environment.

## Verification commands (repository root)

```sh
node scripts/check-repo.mjs
node scripts/test-workbook.mjs
node scripts/test-job-data.mjs
node scripts/test-job-rules.mjs
node scripts/test-job-validation.mjs
node scripts/test-job-saving.mjs
node scripts/test-job-ui-v86-31.mjs
node scripts/test-bridge-mock.mjs
```

For the full simulator build and browser tests (GitHub Actions automatically does this), ensure Node 24 and install dependencies using `npm ci --prefix source`, then run `npm run build:3d --prefix source` and the workflow's simulation/browser steps. A local offline install could not fetch the existing `three` dependency and those runtime checks therefore remain unverified here.

## Manual acceptance checks

- [ ] Authenticated staff can load existing jobs and Office Pulse totals agree with Job Management.
- [ ] Edit/create saves in Supabase and survives refresh; concurrent editor B receives a conflict after A saves first.
- [ ] Missing customer/job reference and production requirements focus the correct field and retain typed values.
- [ ] Import CSV/TSV/JSON and XLSX only after reviewing row counts and confirming JSON backup; 28-column export has unchanged column order.
- [ ] Smartphone widths 320/390/430 px: editor scrolls, keyboard does not hide Save Job, no page-wide overlap; desktop retains header and layout.
- [ ] GitHub Actions all jobs green, version footer 86.31, simulated characters still navigate and interact as V86.30.
- [ ] Live RLS/auth and shared-state payload limits reviewed with the real production account.
