# KIDZSTUDIOS Office Plus V86.53: Cleaner Pricelist and Job Management Excel Reliability

Base: V86.53 Price List Redesign. This is a scoped update. No live deployment or Supabase database migration.

## Price List interface

- Removed decorative three-step badges and unnecessary visual decoration.
- Reduced overly large cards, border radii, shadows and visual clutter.
- Preserved all eight product categories, quote cart, commission, discounts, delivery, deposits, price tiers, PDF/PNG export and WhatsApp integration.
- No pricing formulas or product field IDs changed.

## Job Management Excel workflow

- Added visible **Import Excel** and **Download Excel** actions beside Add Job.
- Moved the hidden Excel file picker outside the Tools disclosure to avoid browser-specific picker failures when menus close.
- Kept original Tools menu Excel import and all current Export Data options.
- Added cache-versioned Excel / job-data modules to prevent stale browser scripts after redeployments.
- Made Excel export errors visible and kept object URLs alive long enough for browsers to begin downloading.
- Improved importer error messaging and compatibility for compressed XLSX with shared strings, including workbook relationship paths.
- Preserved the import preview, duplicate-ref validation, confirmed backup, and version-aware replace. **Import will replace shared jobs only after explicit confirmation**.

## Regressions and verification

- New `scripts/test-v86-53-excel-browser.mjs` opens Chromium, downloads a blank XLSX, loads an actual compressed XLSX fixture with shared strings, verifies preview/confirmation, and cancels without modifying shared jobs. GitHub Actions runs this after installing Chromium.
- Local isolated Chromium test of actual compressed XLSX preview and download passed.
- Downloaded XLSX was also independently parsed by a spreadsheet reader.
- 13 code/regression checks passed, including workbook, Job Management, Office Pulse, Price List and repository integrity.
- Responsive Price List checks passed at 1440, 900, 768, 390 and 320px.
- Live authenticated Supabase saving, user browser settings, and GitHub Pages publication remain to be checked.

## Changed files

- `public/job-management.html`
- `public/office-workbook.js`
- `public/pricelist-calculator.html`
- `public/pricelist-clean-v86-53.css` (new)
- `scripts/test-job-ui-v86-31.mjs`
- `scripts/test-v86-53-pricelist-redesign.mjs`
- `scripts/test-v86-53-excel-browser.mjs` (new)
- `scripts/fixtures/job-management-import.xlsx` (new, synthetic data only)
- `.github/workflows/deploy-pages.yml` (new Chromium Excel regression)

## Deployment checks

1. Deploy on a new branch or back up `main` before merging.
2. Check the newest GitHub Actions run for the Excel browser test and all other CI tests.
3. Sign in, open Job Management, select Download Excel, and open it locally.
4. Select Import Excel using a copy of your existing workbook; inspect the preview **without clicking Replace** until all rows and the backup plan have been reviewed.
5. Open Price List and verify all eight categories and calculated totals.

**No data was imported or replaced during package development.**
