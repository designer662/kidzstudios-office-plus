# KIDZSTUDIOS Office Plus V86.53: Team Workload Root-Cause Repair

## The recurring bug
Office Pulse's Team workload cards use `#opsStaffLoad .ops-staff-load > button`, not `.workload-row` (which belongs to the separate Workload tab). `office-plus.css` overrides the cards from grid to flex, so the middle text column cannot shrink and Busy/Normal badges can extend past the card.

## Focused correction
- Add `ops-load-copy` to the Office Pulse-generated staff summary span.
- Restore an explicit 3-column grid on the exact Office Pulse cards, with a `minmax(0,1fr)` text column and a stable badge column.
- Wrap the workload details and display the badge below the details for extremely narrow Pulse panels (container width at most 240 px).
- Bump the existing control CSS cache version for GitHub Pages.
- Add a regression test and register it in GitHub Actions.

## Modified files
- `public/index.html`
- `public/office-index-controls-v86-53.css`
- `scripts/test-v86-53-controls-layout.mjs`
- `.github/workflows/deploy-pages.yml`

## Added files
- `scripts/test-v86-53-pulse-workload.mjs`
- `README-V86.53-TEAM-WORKLOAD-FIX.md`

## Verification
```
node scripts/test-v86-53-pulse-workload.mjs
node scripts/test-v86-53-controls-layout.mjs
node scripts/test-v86-38-office-pulse.mjs
node scripts/test-v86-40-office-pulse-source.mjs
node scripts/check-repo.mjs
```

Browser fixture validated card alignment and badge containment at viewport widths 260, 320, 390 and 1440 px with actual project stylesheets. Does not change Smart AI, movement, quality control, Supabase, job saves, or cinematic camera rotation.

After publishing, hard-reload GitHub Pages once to clear any additional browser cache. The stylesheet query version has been updated to `86.53.ui5`.
