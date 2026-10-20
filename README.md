# Kidz Studios Office Plus — mobile refresh (V87)

Office Plus is an 11-page static web app served from `public/`, with an optional 3D rebuild in `source/`.

## Deploy

Push this repository to GitHub with the provided `.github/workflows` workflow. GitHub Actions installs dependencies, rebuilds the 3D scene, verifies configuration, tests the site, and deploys `public/` to GitHub Pages.

Configure the GitHub Actions repository variables `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`. **Never use a Supabase service-role key in public configuration.** Set up Supabase migrations separately with backups and careful review.

For local validation, run `node scripts/check-repo.mjs` and `node scripts/audit-runtime-wiring.mjs` from the repository root. For complete build / browser tests, run `npm ci --prefix source` and the CI commands in `.github/workflows`.

## Responsive redesign

- All 11 HTML pages load `public/office-responsive-v87.css` and `public/office-mobile-nav.js`.
- Under 900px, the crowded desktop navigation becomes an accessible **Menu** button opening a categorized, touch-friendly drawer.
- Supports Escape/backdrop closing, keyboard focus handling, screen-reader labels, safe areas, and reduced motion.
- Main 3D dashboard also loads the existing `office-mobile-layout.css` that was previously present but unreferenced.
- Mobile form elements remain legible and notifications stay inside the viewport.

## Cleanup

Historical version-specific markdown files, four old patch ZIPs, the old screenshot, and old QA JSON summaries were removed. Active HTML, JavaScript, CSS, SQL migrations, source files, CI scripts, fixtures, and legacy Netlify database/functions are retained. Detailed removals are recorded in `CLEANUP-MANIFEST.json`. No live customer records or database tables were changed.

## Release acceptance checklist

On a test deployment (not production), verify on a 360–390px phone and a tablet:
1. Open Menu, navigate to Jobs, Reports, Pricelist, Orders, and Files; close with Escape and by touching the backdrop.
2. Check the job table and reports can scroll horizontally without shifting the whole page.
3. Check A4 job sheets retain print/export dimensions; swipe the job sheet horizontally to edit it.
4. Create, edit, and save a test job; confirm live database sync and notifications still work.
5. Import/export XLSX and create a quotation; test file compression and commission calculations.
6. Load the 3D dashboard and confirm controls, quality mode, chat and staff overlays are usable on a phone.
7. Check PDF/PNG exports and print previews with the correct paper layout.

**Validation status:** Static wiring and targeted responsive Chromium fixture tests passed locally. Existing project tests had 25 failures before and after the update; no new regressions in the matched test set. Full end-to-end/browser coverage and live Supabase deployment need the GitHub Actions dependency install and deployed environment.

## Job Management row deletion (V87.1)

- The Jobs Table **Actions** column includes a red trash Delete button immediately beside Duplicate. On mobile, action buttons have larger touch targets.
- Deleting requires a distinct confirmation; cancelling leaves records unchanged.
- Deletion uses the same version-checked shared database save as the editor Delete button and updates Office Pulse through the existing event.
- A stale record or another save in progress cancels deletion without removing a job. This is a permanent shared-record removal: export a backup before deleting important jobs.
- Regression: `node scripts/test-v87-job-row-delete.mjs`.
