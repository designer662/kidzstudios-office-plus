# KIDZSTUDIOS Office Plus V86.38 — Office Pulse Command Center V2

**Baseline:** V86.37, including Smart AI V86.36 and Production Action Queue V86.37.

## Summary

- Office Pulse uses the existing V86.37 `KSJobAttention` classifier for a reason-based priority preview, including overdue work, missing production information, unassigned jobs and invalid dates.
- Adds a clickable **Need action** KPI and direct, encoded job-reference links to the existing Job Management editor. The editor safely handles missing, invalid, and duplicate references.
- Shared, read-only `KSPulseInsights` snapshot calculations underpin Office Pulse activity counts, deadline counts, completion counts, and the priority counter. Date boundaries use the Malaysia calendar day.
- Explicit loading, empty, live, cached/sheet-preview and offline/failure messages. On a refresh error, the last accepted snapshot is retained.
- In legacy Google Sheets source mode, Office Pulse shows the Sheet as a **read-only preview**. Removed the former Sheet-to-`dashboard:jobs` write that silently truncated data to 250 records. To permanently import Sheet content, use the existing protected Job Management import workflow.
- Expands compact Pulse scrollability and updates priority presentation without changing 3D movement, furniture interaction, database schema, or Job Management save logic.

## Changed / added files

1. `public/index.html` — Pulse metrics, data status, priority links, shared-state refresh and read-only Sheet handling.
2. `public/office-pulse-integrated.css` — compact, expanded and mobile presentation.
3. `public/office-pulse-insights.js` — new read-only reporting, Malaysia date and safe reference matching module.
4. `public/job-management.html` — opens the existing editor for a unique `?view=queue&job=<reference>` link after the shared job load.
5. `scripts/test-v86-38-office-pulse.mjs` — new deterministic regression test.
6. `.github/workflows/deploy-pages.yml` — registers the V86.38 test.
7. `office-release.json` — release metadata.
8. `README-V86.38.md` — this document.

## Data flow

`dashboard:jobs` / existing Sheet-preview reader → normalized jobs → `KSJobs` / `KSJobAttention` / `KSPulseInsights` → Office Pulse → reference-based Job Management deep link → existing validated editor/save flow.

The Pulse view does **not** create or update jobs. No new Supabase table or external dependency is required.

## Local verification performed

- All 21 selected local Node.js / repository regression checks passed; see test scripts under `scripts/`.
- Browser test with mock shared job data: Office Pulse priorities appeared at desktop (1440 px), 390 px and 320 px without JavaScript errors. The compact Pulse was inside the viewport.
- Browser test with mock data: clicking a targeted job link opens the correct existing editor at 1440, 390 and 320 px.
- Mocked refresh failure: previous priority cards remained visible, with an offline/stale warning.
- New regression assertions cover 520 synthetic jobs with no truncation, deadline classification, completion rules, Malaysia day boundary, reference encoding, duplicate reference handling, and the absence of the unsafe Sheet writer.
- ZIP integrity verified during release packaging.

**Not verified here:** live authenticated Supabase operations, real Google Sheets data, hosted GitHub Actions build, and production Three.js/WebGL rendering. The runner environment cannot navigate to local URLs, so the browser tests inject application assets and mock API responses. Run the full GitHub CI workflow and staging tests before production use.

## Reproducing tests

```bash
node scripts/test-v86-38-office-pulse.mjs
node scripts/test-v86-37-action-queue.mjs
node scripts/test-job-saving.mjs
node scripts/test-job-validation.mjs
node scripts/check-repo.mjs
node scripts/audit-runtime-wiring.mjs
```

For the complete hosted build, verify `source/package-lock.json` exists, run `npm ci --prefix source`, then run the current GitHub Actions workflow, including the real browser/WebGL job.

## GitHub Web deployment (do not upload the ZIP itself)

1. Back up your current `main` branch and Supabase job data.
2. Create a branch such as `v86-38-office-pulse` in the GitHub website.
3. Extract the patch ZIP and upload its **contents** to the matching paths, including the hidden `.github/workflows/` path. Alternatively upload the complete full ZIP contents to a fresh branch rooted at the repository (never as an extra parent folder).
4. Review the pull-request diff: only the listed eight files should be changed. The V86.36 Smart AI simulation files should be unchanged.
5. In GitHub Actions, use `workflow_dispatch` and select your feature branch for the deployment workflow. **Caution:** this workflow publishes to GitHub Pages, so do not dispatch it merely to test a branch if you do not want deployment. Instead run the commands above locally or add a separate non-deploying PR test workflow before merge.
6. Merge only after authorization and production test verification; pushes to `main` trigger the current GitHub Pages workflow.

## Manual staging acceptance

- Sign in, load Office Pulse and confirm counts against the saved Job Management records.
- Open each top priority card and verify the exact job reference and customer; inspect a missing or duplicated reference.
- Simulate API errors and confirm cached priority records remain visible with a stale warning.
- Review compact and expanded panels at 320, 390, 430 and desktop widths, including scrolling and keyboard focus.
- Switch to the optional Google Sheets source only in an isolated staging setting; confirm refresh makes **no PUT** to `dashboard:jobs` and retains all shared records.
- Verify changes saved through the authorized Job Management editor are reflected in Office Pulse.
- Confirm Smart AI movement, furniture actions, dialogue and 3D/WebGL rendering are unaffected.

## Known constraints

- `dashboard:jobs` remains an all-jobs shared JSON collection. This release does not migrate to per-job database rows or add role-specific read permissions.
- The existing legacy stage mapping and current Action Queue status rules are preserved. Unrecognized statuses still require human review.
- The date KPI uses Malaysia local day; some older standalone filters/formatting outside the new KPI continue to use their original conventions.
- Access and authorization depend on the deployed Supabase bridge and RLS configuration, not on navigation links or UI controls.
