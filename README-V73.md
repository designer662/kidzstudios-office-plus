# Office Plus V73 — Current Month + Automatic Footer Version

## Job Management
On **every new page load or refresh**, Job Management defaults its year and month dropdowns to the browser's **current local year and month** (using each job's **ORDER DATE**). This does not delete or alter other months' jobs. Users can still change filters to another month, year, undated jobs, or all dates.

## Unified build version footer
- Every HTML page footer now starts at `v73` in the downloadable repository.
- `office-release.json` contains the release number.
- `node scripts/stamp-version.mjs` updates every footer; the dashboard retains its 3D tag and dynamic Last Sync status.
- GitHub Actions runs the same stamping command **on every deployment**. `GITHUB_RUN_NUMBER` adds an automatically increasing suffix, e.g., `v73.51`. No need to manually find and change 10 footer labels.
- To start a future major version, change `office-release.json` once (for example `74`).
- No Supabase schema changes are needed.

## Upload
Extract repository contents, upload to GitHub `main`, and let GitHub Actions deploy. The workflow handles the version stamping. Hard refresh if an old cached page persists.
