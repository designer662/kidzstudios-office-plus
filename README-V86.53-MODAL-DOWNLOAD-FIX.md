# KIDZSTUDIOS V86.53 Job Management Data Hub: downloads blocked by modal close

## Reproduced cause

The Data Hub previously appended a temporary Blob URL link to `document.body` and called `a.click()`. The shipped `office-outside-close.js` document-level capture listener sees that link **outside** the open `exportModal` or `excelImportModal`, calls the close button and cancels the link event before Chrome can start a download. As a result, the export option appears unresponsive even when the workbook or CSV is generated correctly.

## Fix

`downloadBlob()` now appends the temporary link **inside the front-most open dialog**, and the existing delayed URL cleanup is preserved. No jobs are changed, downloaded values are not changed, import/merge operations keep their backup confirmation, and no Supabase schema changes are necessary.

Both existing browser tests (`test-v86-53-export-browser.mjs` and `test-v86-53-job-data-hub-browser.mjs`) now load the **real** `office-outside-close.js` script instead of excluding it. They verify that the outside-click listener is active while CSV, XLSX, JSON and import backups are downloaded.

## Verification

The bug was reproduced in headless Chromium with the shipped outside-click handler: the modal export click generated a success status **but no browser download**. After patching, the same click produced a CSV download. A full Chromium fixture passed XLSX, CSV, JSON backup, import preview, merge and backup-before-merge, with 3 existing records retained and 1 new record added; checked widths 900, 768, 390 and 320 px. The local static Job Data Hub, workbook, outside-click, and repository checks also passed.

The installer applies a **surgical text patch to the existing `public/job-management.html`**, not an entire old HTML snapshot. It synchronizes latest `main`, preserves uncommitted tracked changes in Git stash, and stops before committing if validation or browser tests fail.

For GitHub Codespaces, the installer invokes `playwright install --with-deps chromium` to install missing Linux libraries such as `libatk` before local browser checks. GitHub Actions also has a separate Chromium dependencies step.

**Publishing is not confirmed until `git push` and GitHub Actions report success.** Authenticated live Supabase writes are not part of the download regression.
