# Kidzstudios Office Plus V86.51 — Jarvis report and shared navigation release

Baseline: V86.50 Classic Table + Staff/Emoji Dedup. This patch does **not** change the existing 3D scene, furniture, seating algorithm, staff records, Job Management writes, or Supabase database schema.

## Features

1. **Opening** — short first-visit-per-tab intro (maximum 1.7 seconds), immediately cancellable by user input. No indefinite hidden dashboard; does not require 3D to finish loading; reduced-motion users skip it.
2. **Notifications** — one shared event feed handler in `suite-header.js` on every HTML page, including Dashboard. Supabase `ks_office_events` is the only notification feed; local activity is still shown in Office Pulse without duplicating notifications. LocalStorage persists the seen/cleared watermark across page navigation and same-origin tabs; the Clear button changes only this browser's view and does not delete database events.
3. **`report.html`** — read-only shared Job Management (`dashboard:jobs`) analytics: job totals, active/completed/overdue/urgent, invoice/payment/balance, monthly order volume, production stages, searchable register, year/month/stage filtering, print, and CSV export. CSV values beginning with spreadsheet formula characters are neutralized. Only the first 250 filtered jobs display in the table for performance; all filtered jobs are included in summary and CSV.
4. **Navigation** — branded **Home / Kidzstudios Office** pill with house icon. Added a **Reports** pill next to Job Management on every page. Consistent active states.
5. **Alignment** — centered tool pills where space allows; balanced Home/tools/notifications; horizontal scrolling for overflow rather than hiding functionality, improved desktop-to-mobile layout and centered map on large desktops.

## Production deployment

Use the **Full Source** ZIP, or apply the **Essential Patch** to the V86.50 Classic Table + Staff/Emoji Dedup repository. In Codespaces, after extracting the patch from the repo root:

```bash
node scripts/test-v86-51-reports-navigation.mjs
node scripts/test-v86-50-profile-dedup.mjs
node scripts/check-repo.mjs
git add -A
git commit -m "V86.51 reports and unified office navigation"
git push origin HEAD
```

The Github Actions workflow now includes V86.51 Node and Chromium tests. It must still install Three.js, rebuild the 3D bundle, complete all simulator/WebGL tests, stamp local assets with a build identifier, and validate the artifact before publishing.

## Verification performed locally

- **25/25** relevant Node static/integration checks passed.
- **Chromium isolated UI test** passed: render report metrics, common Home/Reports pills, shared notifications and Clear, zero uncaught exceptions, 390px mobile width without horizontal overflow. The isolated browser used *mock data* and inlined local CSS/JS because this environment blocks navigation to localhost.
- Live Supabase authentication/data, actual page-to-page network sync, and production WebGL remain **unverified** here. Deploy to staging or run GitHub Actions to verify the integrated site; the release is a deployment candidate, not a certified production build.

## Data and limitations

- Report never uses PUT/POST. It fetches a read-only `dashboard:jobs` snapshot and listens for Supabase table events, with a 15-second polling fallback. Requires valid Supabase connection, membership, RLS, and existing jobs.
- Report totals derive from stored Job Management data. Stage classification reuses existing `job-rules.js`. Payment summaries cannot verify accounting correctness; they reflect recorded fields only.
- `Clear` affects notification visibility for the current browser origin, not staff records or shared notifications on other devices.
- No database migrations or new third-party dependencies.
