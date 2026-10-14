# KIDZSTUDIOS Office Plus V86.31: Job Management Full Upgrade

**Base:** exact `kidzstudios-office-plus-main_4.zip` V86.30 upload, including the latest furniture-aware simulation. This is a forward upgrade and does not revert to V58 or V70.

### Changes

- Fixed GitHub Actions `index.html missing shared header fix` assertion and restored the same CSS on Job Management.
- Implemented native XLSX preview/import and XLSX exports (current, all, template) using existing `office-workbook.js`.
- Added local CSV/TSV/JSON import with preview and backup-before-replace action.
- Improved Job Management form accessibility, validation feedback, duplicate-save prevention, and mobile scroll behavior.
- Prevented spreadsheet formula execution in CSV exports by reusing shared safe-escaping implementation.
- Added V86.31 regression tests to the existing GitHub Actions workflow; retained Supabase version-safe saves and V86.30 simulator source.

**Important:** No live database writes, migrations, or deployments were performed. The new local test verifies the code and the workbook test now passes. 3D/WebGL rebuild and live Supabase remain unverified because this environment cannot install npm dependencies offline or access the deployment browser. See `docs/JOB_MANAGEMENT_V86_31.md` for workflow, limitations and acceptance checks.

**Deploy:** Back up your repository and `dashboard:jobs` JSON first; upload the full ZIP contents (the contents of `kidzstudios-office-plus-main/`) to the repository `main` branch. GitHub Actions installs the original locked dependencies, rebuilds the 3D bundle and runs validation before deploying `public` to Pages. Inspect all action steps before using production import/replacement.
