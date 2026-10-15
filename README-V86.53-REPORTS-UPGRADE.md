# KIDZSTUDIOS Office Plus V86.53 · Reports Upgrade

This is a focused, read-only upgrade to the **existing V86.53 Reports page**. No Supabase schema, 3D engine, Smart AI, or Job Management save logic is changed.

## User-facing improvements

1. **Complete Job Register pagination.** All matching jobs remain accessible in pages of 25, 50, or 100 rows. The former first-250-rows display limitation is removed.
2. **Open Job Management by reference.** Clicking a non-empty reference opens `job-management.html?job=<encoded-reference>` and reuses its existing editor and validation rules. A report does not edit saved data.
3. **Accurate filtered CSV.** Export includes every filtered job, not just the visible page. Balance falls back to invoiced minus paid; exported stage uses the same classification used by the report. CSV formula escaping remains enabled.
4. **Reliable refresh.** A failed refresh retains the previous snapshot; older-version responses cannot replace newer accepted data. Visible loading, stale, error, empty, and successful states are provided.
5. **Responsive controls.** Pagination controls wrap on mobile, keyboard buttons remain accessible, and the horizontal job register table still scrolls within its card.

## Changed files

- `public/report.html`: register navigation controls and documented print scope
- `public/report.css`: responsive pagination and link styles
- `public/report.js`: page navigation, deep links, CSV export and refresh states
- `public/report-data.js`: pure pagination, balance, safe CSV helpers
- `scripts/test-v86-53-report-upgrade.mjs`: regression coverage
- `.github/workflows/deploy-pages.yml`: run the new test in CI
- `README-V86.53-REPORTS-UPGRADE.md`: documentation

## Verification

Run from repository root:

```sh
node scripts/test-v86-53-report-upgrade.mjs
node scripts/test-v86-51-reports-navigation.mjs
node scripts/test-v86-53-dashboard-report.mjs
node scripts/check-repo.mjs
```

A local mock-browser fixture also verified report behavior on 1440, 390 and 320 px viewports with 263 jobs. **Live** Supabase access and GitHub Pages deployment must still be tested in your actual environment.

## Scope and limitations

- Reports remain read-only. Existing Supabase permissions are not changed.
- Printing includes the **currently visible** register page alongside report totals and charts. CSV exports all filtered jobs.
- No new dependencies or database migrations.
- The existing backend's data permissions determine which authenticated users may access financial information; this patch does not introduce new role restrictions.

## Deployment

Upload the Codespaces patch archive to the repository root, apply the patch using the supplied validated terminal command, run tests, commit to `main`, and verify the new GitHub Actions run. The patch is intended for the V86.53 Team Workload repaired source.
