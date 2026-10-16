# V86.53 · Editable Google Sheet Import Link

## What changed

In **Job Management → Data Hub → Import & Merge**, the Google Sheet source URL is now an editable field. You can paste a new Google Sheet URL (including its `gid` tab identifier), press **Save Link** to remember it on the current browser, or press **Import from Link** immediately to preview jobs. A successful link import preview also remembers the URL. **Reset** restores the centrally configured link and clears the browser override.

The Tools menu **Open Google Sheet** shortcut points to the currently selected valid URL. Invalid or non-Google URLs are rejected. Loading, success, and error feedback appears below the input. Importing does not immediately write to Supabase: the existing Merge/Replace preview and strict verified JSON backup gate remain mandatory.

**Storage:** Link preferences are saved in the current browser's `localStorage` under `ks:job-management:sheet-import-url:v1`. They are *not* saved into global Supabase configuration, are not shared across staff browsers, and will be removed if browser site data is cleared. The existing `config:global.jobManagementUrl` or compiled default remains the fallback. Only a `https://docs.google.com/spreadsheets/d/…` link can be imported; the Sheet must be link-viewable or published for the browser loader to read its rows. Private Sheets can still be imported as downloaded XLSX/CSV files.

## Changed files

- `public/job-management.html`: UI, validation, local persistence, data-source selection and import feedback
- `scripts/test-v86-53-editable-import-link.mjs`: browser regression (validation, save, reload, import preview, reset, zero server writes)
- `scripts/test-v86-52-layout-import.mjs`: update old source assertion to check validated editable URL
- `.github/workflows/deploy-pages.yml`: register browser regression after existing Data Hub browser check
- This document

No changes to `job-data.js`, `office-workbook.js`, Supabase, schema, Smart AI or pricing calculations.

## Verification

Run from the repository root:

```bash
node scripts/check-repo.mjs
node scripts/test-job-data.mjs
node scripts/test-workbook.mjs
node scripts/test-v86-52-layout-import.mjs
node scripts/test-v86-53-job-data-hub.mjs
node scripts/test-v86-53-operations-upgrade.mjs
node scripts/test-v86-53-editable-import-link.mjs
node scripts/test-v86-53-job-data-hub-browser.mjs
```

Browser tests need installed Playwright (`npm ci --prefix source`) and a Chromium binary. On a fresh Linux Codespace, `./source/node_modules/.bin/playwright install --with-deps chromium` installs the browser and system libraries.

For live testing: open Job Management, then Data Hub → Import & Merge. Change the link and Save, reload, verify it remained, then click Import from Link. Verify the preview before selecting any Merge/Replace action. Confirm no jobs were modified by merely viewing the preview. Reset to return to configured source. Live authenticated Supabase and GitHub Pages deployment must be confirmed separately.
