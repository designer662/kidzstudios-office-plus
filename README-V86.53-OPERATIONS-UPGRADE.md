# KIDZSTUDIOS Office Plus V86.53: Export, Price List, Live Activity

Incremental release built on `KIDZSTUDIOS_Office_Plus_V86_53_Pricelist_Clean_Excel_Repair_FULL_GITHUB_READY.zip`.
No database changes, no new runtime dependencies, no modifications to Smart AI or Three.js engine.

## Changed files
- `public/job-management.html`: visible Export Data button, modal status text, catches export errors and only dismisses modal after success.
- `public/pricelist-calculator.html`: includes Markup-style workspace CSS; existing pricing JS preserved unchanged.
- `public/pricelist-markup-workspace.css`: responsive inline pricing layout coordinated with Markup Calculator.
- `public/index.html`: Live Activity search, pause/resume, manual refresh, show more/less, accessible event detail + staff action.
- `public/office-live-activity.css`: layout and focus styles for those controls.
- `scripts/test-v86-53-operations-upgrade.mjs`: source invariants and UI integration assertions.
- `scripts/test-v86-53-export-browser.mjs`: browser regression with 260 jobs, CSV, JSON, error handling.
- `.github/workflows/deploy-pages.yml`: adds the source test and browser export regression.

## Test coverage
- Browser mock: CSV All (260 records, all included), JSON backup (260), simulated XLSX failure (dialog remains visible, error displayed).
- Live Activity isolated browser harness: search, pause, receive updates while paused, resume, event details and close.
- Price List Chromium layout at 1440, 390, 320 px without horizontal overflow.
- Preserved original inline Price List calculation scripts exactly.
- Existing workbook, job rules/validation/saving, Office Pulse, markup and report tests.

## Usage
- Open Job Management > Export Data to choose CSV, XLSX, yearly summary or JSON backup.
- The whole-job exports use the complete shared job list loaded into that browser; if sync fails, verify freshness before exporting.
- Price List retains existing quantity/size, commission, shipping, discount, deposit, quote cart and sharing/export logic.
- Live Activity > Search / Pause / Refresh / More; select any feed item to view details. Pause only freezes the local display; it never pauses Supabase events or the simulation.

## Open verification items
- Login-protected Supabase record export on live GitHub Pages; test with actual user permissions.
- Browser popup/download permission policies vary; verify downloaded filenames and destination.
- Source-level and isolated browser checks are not an end-to-end WebGL production test.
