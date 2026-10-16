# KIDZSTUDIOS Office Plus V86.53 | Job Data Hub V2

## What changed

A scoped repair based on `kidzstudios-office-plus-main(2).zip`. No database migrations, authentication changes, pricing changes, or dashboard/3D changes.

1. **Strict backup verification before any import write**
   - Generate a complete JSON backup of the currently loaded shared jobs.
   - Where `showSaveFilePicker()` exists: save to the selected destination, read the file back and compare every byte (plus SHA-256 on secure origins).
   - Other browsers: start a conventional download, then **require the user to select the actually saved backup file**. Verify the file's exact contents before enabling the import write.
   - Wrong backup, canceled operation or failed save: no shared-job write.
   - Recheck the server's current version after backup verification. Version-protected `PUT` remains in place to reject concurrent changes.
2. **Safe merge**
   - Preserve the existing values for blank or absent imported columns, including nested job metadata.
   - Match jobs by normalized `JOBSHEET/FILES`; retain unrelated jobs.
   - Keep Replace All behind an additional explicit confirmation.
3. **Accurate file feedback**
   - Native save + read-back reports *saved and verified*.
   - Standard anchor downloads report *download requested; check Downloads*, not false success.
   - Cancellation and errors keep dialogs open with feedback.
4. **Maintain V86.53 workflows**
   - Current-month startup, all 28 job columns, XLSX/CSV/JSON exports, and Office Pulse sync unchanged.
   - The established outside-dialog click guard remains active during browser regressions.

## Files changed

- `public/job-management.html`: UI and handlers; no separate data-storage layer introduced.
- `scripts/test-v86-53-job-data-hub-browser.mjs`: real Chromium tests for all exports, safe import, rejected and confirmed backups, cancellation, stale versions, simulated native save.
- `scripts/test-v86-53-job-data-hub.mjs`, `scripts/test-job-ui-v86-31.mjs`, `scripts/test-v86-53-operations-upgrade.mjs`, `scripts/test-v86-52-layout-import.mjs`: replace old assumptions that an attempted download proves a backup was saved.
- This README.

## Dependencies

No new npm dependencies. The project already uses Playwright (from `source/package-lock.json`), Chromium, and the browser's Blob/File and Web Crypto APIs. Native Save File Picker is optional; manual file re-selection is the secure fallback. The existing GitHub Actions workflow already runs the Data Hub browser regression; it is not modified.

## Testing

Run from the repository root:

```bash
node scripts/check-repo.mjs
node scripts/test-job-data.mjs
node scripts/test-workbook.mjs
node scripts/test-job-rules.mjs
node scripts/test-job-validation.mjs
node scripts/test-job-saving.mjs
node scripts/test-job-ui-v86-31.mjs
node scripts/test-v86-53-job-data-hub.mjs
node scripts/test-v86-53-operations-upgrade.mjs
node scripts/test-v86-52-layout-import.mjs
node scripts/test-delete-modal.mjs
node scripts/test-outside-close.mjs
node scripts/test-v86-38-office-pulse.mjs
node scripts/test-v86-40-office-pulse-source.mjs
node scripts/test-v86-53-excel-browser.mjs
node scripts/test-v86-53-export-browser.mjs
node scripts/test-v86-53-job-data-hub-browser.mjs
```

If necessary first run `npm ci --prefix source` and `./source/node_modules/.bin/playwright install --with-deps chromium`.

## Manual verification on deployed HTTPS site

1. Open Job Management. Confirm current month auto-selected.
2. Data Hub > Download / Export: verify CSV, XLSX and JSON are usable, and that ordinary fallback downloads show *requested* rather than *saved*.
3. Data Hub > Import: preview a **test workbook** with a new reference. Click Backup & Merge. Verify the backup from the native Save picker or re-select the downloaded JSON file when prompted. Check that the import only proceeds after verification.
4. Test with a wrong JSON backup: the shared jobs must stay unchanged. Cancel verification and confirm no shared write occurred.
5. Test an import containing an existing reference with blank customer/invoice fields: their old values must remain.
6. Test a concurrent modification/version mismatch: the import must stop, and the preview must be restarted.

Never use Replace All on production customer data as a test. Live authenticated Supabase testing and GitHub Pages deployment cannot be verified from an offline source snapshot.

## Deployment note

The one-upload installer checks the SHA-256 of `public/job-management.html` against the supplied ZIP's baseline, **before** overwriting the file. It deliberately stops on a different/newer baseline. Do not bypass this guard without reviewing the code differences.
