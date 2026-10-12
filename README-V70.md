# Office Plus v70 — data tools, animated moods and smoother 3D

This update builds on the supplied v69 project. Deploy the contents of `public/` using the existing GitHub Pages workflow and Supabase configuration. No database migration is required for these changes. The ZIP does not contain live database credentials.

## Job Management

- **Tools → Import File** accepts `.xlsx`, `.csv`, `.tsv` and `.json` backups. Review the rows, choose Merge / Update or Replace, then confirm.
- **Tools → Load Google Sheets Link** accepts a full spreadsheet URL, including its `gid` tab ID, or a published sheet URL. It previews the data before saving and remembers the last successfully loaded link on this browser. Loading is a one-time import; the source sheet is not edited and does not automatically overwrite jobs.
- Direct link loading requires a sheet that is viewable by link or published. For private sheets, download Excel / CSV from Google Sheets and use Import File. Google account sign-in/OAuth is not included.
- **Tools → Export Data** provides current-view and all-job XLSX, all-job/current/period/year CSV, a yearly summary, the blank Excel template, and a restorable JSON backup.
- The initial view is **All dates**, so older and undated jobs remain visible. Select **Undated** or a year/month to narrow the view. Year-only exports require selecting a year.
- Imports detect headings within the first 20 rows, tolerate reordered columns and common heading aliases, and preserve both ACTUAL COMPLETE columns. Malaysian `DD/MM/YYYY`, Excel date serials and the 1904 Excel date system are supported. CSV preserves quoted commas, line breaks and escaped quotes. Store references/invoice numbers as text in the source file to retain leading zeros.
- Matching job references update imported columns; missing columns in partial spreadsheet/CSV imports retain their existing values. Empty values in an included column intentionally clear that field. JSON backups restore complete records.
- Up to **500 jobs** and **12 MB per imported file**. The existing shared-state payload size limit still applies. Duplicate references and oversized imports are rejected; records are not silently truncated.
- Writes commit to the visible list only after server success. Concurrent changes are rejected using the existing version check. Failed loads preserve the currently loaded jobs. Historical references such as KS-1044 are no longer automatically treated as demo data.

## Office model and moods

- Happy, Sad, Angry and Bad mood have individual animated glyphs. **Busy 💻** adds a gentle typing motion and three animated dots.
- Mood bubbles persist after reload, do not disappear when unfollowing, and remain separate from temporary activity messages. Clearing a mood now persists correctly.
- Increased curvature detail on character heads, hair and limbs; eased position updates; blended sitting label height; smooth zoom; time-based camera damping and rotation. The existing slow automatic rotation, office layout and notification sound remain.
- Reduced-motion preference pauses automatic motion and emoji animations. Hidden tabs skip scene rendering.
- The footer now resolves its Last sync element after it is available and displays successful synchronization times. Office Pulse keeps loaded jobs during a failed refresh.

## Validation

Verified in headless Chromium with mocked Supabase and Google responses: initial load, filtering, CSV import, XLSX export/import, JSON restore, failed and conflicting writes, Google link/tab selection, callback fallback, inaccessible sheets, duplicate/oversized imports, Busy save/reload/clear, and reduced motion. A compressed XLSX fixture also verified multiple sheets, title rows, reordered date columns, both completion dates, a leading-zero invoice and the 1904 date system.

The checks use local fixtures; live Supabase credentials and a user's live Google Sheet were not supplied or tested. Notification audio, API compatibility and 240 existing navigation routes also pass. Character geometry and pose transitions were checked for all eight default rigs, including equivalent 30/120 fps transitions.

Run from the repository root:

```sh
node scripts/check-repo.mjs
node scripts/test-job-data.mjs
node scripts/test-workbook.mjs
node scripts/test-bridge-mock.mjs
node scripts/test-walking-routes.cjs
node scripts/test-notification-sound.mjs
npm ci --prefix source
node source/scripts/test-v70-character.mjs
npm run build:3d --prefix source
```

The 3D build now writes directly to `public/office-3d.js`, keeping the shipped bundle and TypeScript source aligned. The existing `test-v57-*`, `test-head-model.cjs` and `build-v57-offline.cjs` scripts are historical tools for older bundles; use the v70 build and rig test above.

Google transport reference: https://developers.google.com/chart/interactive/docs/spreadsheets
