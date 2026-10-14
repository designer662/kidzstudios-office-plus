# KIDZSTUDIOS Office Plus V86.37

## Production Priority & Action Queue (built on V86.36 Smart AI)

**Baseline:** `KIDZSTUDIOS_Office_Plus_V86_36_Full_GitHub_Ready.zip`.

The V86.36 Smart AI Staff Activity Lifecycle, movement synchronization, 3D files, furniture interactions, and Job Management V2 remain intact. This release adds a **read-only Action Queue** inside Job Management. No Supabase migrations or new npm dependencies.

### Changes

- `public/job-attention-queue.js` **(new)**: pure, deterministic classification of jobs across all years; overdue, due today, due in 1–3 days, production readiness, missing staff, invalid/missing due date, and hold/unmapped status. Closed/cancelled jobs excluded. One card per job, with all actionable reasons. No writes.
- `public/job-management.html` **(modified)**: Jobs Table / Action Queue toggle, summary counts, filter, clear loading/empty/stale/error states, and Open Job reusing the existing editor and save protection. Escaped customer/ref text, accessible controls, mobile layout. Reads `window.KSJobAttention` based on the accepted `dashboard:jobs` state. Table and original Excel exports are preserved.
- `.github/workflows/deploy-pages.yml` **(modified)**: runs Action Queue regression together with Job Management checks.
- `scripts/test-v86-37-action-queue.mjs` **(new)**: covers logic, field warnings, ordering, status exceptions, read-only behavior, UI wiring, and CI registration.
- `office-release.json` **(modified)**: version `86.37`.
- `README-V86.37.md` **(new)**: release notes and verification steps.

### User flow

1. Sign in through existing Supabase authorization and open **Job Management**.
2. Select **Action Queue** above the Jobs Table.
3. See counts and the highest-priority jobs from all saved years (independent of the Jobs Table's year/month filters).
4. Filter by warning reason, read the suggested next action, and click **Open Job**.
5. Save changes in the **existing** editor. The queue recalculates only when the server accepts updated job records.
6. Click **Refresh priorities** to request the latest shared records. On network failure, a previously loaded queue stays visible with an explicit stale warning.

### Priority rules

1. Overdue
2. Due today
3. Due in 1–3 calendar days
4. Production not ready (quantity, sizes, approval)
5. Missing stage-appropriate assignment
6. Missing or invalid delivery date
7. Held or unrecognized status requiring review

`URGENT` wins within the same rank; earlier deadlines and then job references break further ties. Held jobs are not marked overdue; cancelled/completed jobs are excluded. Warning cards do **not** update the original job's status, staff assignment, customer or financial data.

### Required verification

Run from the repository root:

```sh
node scripts/test-v86-37-action-queue.mjs
node scripts/test-job-data.mjs
node scripts/test-workbook.mjs
node scripts/test-job-rules.mjs
node scripts/test-job-validation.mjs
node scripts/test-job-saving.mjs
node scripts/test-job-ui-v86-31.mjs
node scripts/test-v86-36-activity-lifecycle.mjs
node scripts/test-v86-29-smart-ai.mjs
node scripts/test-v86-30-furniture-ai.mjs
node scripts/test-bridge-mock.mjs
node scripts/check-repo.mjs
```

For CI with 3D support: `npm ci --prefix source && npm run build:3d --prefix source` and run GitHub Actions. Perform a staging browser check with authenticated users, including an unchanged/updated/deleted job, offline refresh, desktop/mobile display, and two editing clients.

### Known limits

- Local Chromium UI checks were executed with a **mocked**, not live, Supabase bridge using inline test documents because local HTTP navigation is restricted in this environment.
- Full WebGL/Three.js build and live multi-client Supabase testing are still required in GitHub Actions / staging. These are not claimed to pass in this environment.
- Existing shared JSON state size/concurrency limits remain. This view is read-only, and it does not repair the separate optional Google Sheets cache truncation path.
- User-added custom department labels outside the existing stage rules are flagged for status review rather than automatically guessed.

### Deployment (GitHub web)

Back up the repository and job data first. Extract **Full GitHub Ready** ZIP and upload its actual contents to the matching repository-root paths on a new branch, or merge **Patch Only** into an existing verified V86.36 checkout. Do not upload the ZIP itself as a replacement. Run the new branch's tests and verify live Job Management before merging into `main`. No deployment was performed here.
