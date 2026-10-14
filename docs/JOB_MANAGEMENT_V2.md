> **Historical V58 integration notes.** For the current V86.31 implementation, see `JOB_MANAGEMENT_V86_31.md`.

# Job Management V2 · focused reliability upgrade

## Baseline
This change was prepared against the available `kidzstudios-office-plus-main.zip` repository snapshot. Its README identifies it as **V58** (GitHub Pages + Supabase), dated October 2026. It is **not** an inspected V86 source tree. Do not upload the full V58 archive over a newer deployment without first merging the changes.

## Changes
- `public/job-management.html`: transaction-style job saves, optimistic version check, conflict banners, no silent 500-record truncation, size-limit rejection, safer import preview/backup, production entry requirements, and four extra production fields stored in `jobMeta`. CSV exports remain the existing 28 Excel columns; JSON backup contains the extra fields.
- `public/job-rules.js`: shared classification, duplicate-ref checks, JSON payload byte measurement.
- `public/index.html`: loads shared stage classifier in the live inline dashboard script; stopped hiding jobs based solely on old demo identifiers.
- `public/app.js`: matches the shared classifier for future use of the separate dashboard JS.
- `scripts/test-job-rules.mjs`, `scripts/test-job-validation.mjs`, `scripts/test-job-saving.mjs`: isolated regression checks.

## Data compatibility
Shared scope stays `dashboard:jobs`. Existing job fields are normalized in memory; compact 28-field records plus optional `jobMeta` are saved in the same scope. The source retains Supabase RPC `ks_save_shared_state` and its `p_expected_version` compare-and-swap check. No SQL migration is required for this focused update.

## Important limitations
- The existing shared-state Supabase API has a 450,000-byte payload cap. This release removes **silent truncation**, not the server limit. If the limit is reached, saves are rejected without replacing server state. Scaling beyond it requires one-job-per-row storage and a migration.
- Staff authorization stays as in the baseline, where approved staff can write shared state. Fine-grained job finance/security permissions are **not implemented**. They require a server-side RLS/RPC redesign, not UI-only controls.
- The database still provides collection-level version conflict detection, not automatic per-field merging. If another person saves first, the user must review and reopen the latest job before resubmitting.
- Google Sheet imports intentionally replace the whole collection only after a confirmation, and trigger a local JSON export first. Verify the downloaded backup before proceeding with an important import.
- Detailed immutable field-level audit history has not been added. The existing event stream receives a save event.
- Existing jobs already in production can be edited without entering new mandatory production fields. Moving a job *into* production now requires a delivery date, quantity, size breakdown, and approved artwork.
- Live Supabase accounts/data, deployed browser workflows, and the later V86 tree were unavailable for verification here.

## Deployment and manual smoke check
1. Back up your current deployed website and Supabase `dashboard:jobs` payload (not just a CSV).
2. If using exactly this V58 baseline, replace the changed public assets. If using V86 or later, review and selectively merge the change into matching screens; do not replace the full dashboard or simulation.
3. Confirm the Supabase bridge loads, authorized staff can log in, and existing jobs appear with unchanged references.
4. Open two separate authorized browser sessions, edit the same job, save A then B. B must show a conflict without replacing A.
5. Create a job, test missing customer / duplicate reference, and move to Production with missing then complete production fields.
6. Verify both Job Management and Office Pulse agree for SALES/DESIGN/PRODUCTION/CLOSED.
7. Import a small test Google Sheet after verifying the backup download and row count. Export CSV and confirm exactly the original 28 headers.
8. Verify mobile modal scrolling and dropdown behavior before deployment to the whole team.

## Automated tests (from repo root)
```
node scripts/check-repo.mjs
node scripts/test-bridge-mock.mjs
node scripts/test-job-rules.mjs
node scripts/test-job-validation.mjs
node scripts/test-job-saving.mjs
```
