# KIDZSTUDIOS Office Plus V86.40 · Office Pulse: Job Management Only

Baseline: **V86.39**, including existing Smart AI movement, furniture interactions, Job Management V2, Action Queue, and Office Pulse V2.

## Requested change

Office Pulse no longer allows editing the Job Management/Google Sheets source URL. The pencil button and its link-edit modal have been removed. All Job Management links *inside Office Pulse* now lead to the local `job-management.html`, including the resource shortcut and Jobs tab. Priority links still target specific jobs in the existing editor.

Office Pulse loads job data **only** through `/api/state?scope=dashboard%3Ajobs`, the authoritative shared job collection written by Job Management. Refresh and the existing 3.5-second background sync use the same read-only loader. The former Google Sheets visualization feed, fallback, and saved link override cannot become a second data source. The generic global-settings handler no longer rewrites the local job links. An unrelated Google Drive shortcut and its configuration remain unchanged.

No schema migration, new dependency, or change to Job Management imports was required. If staff need to import from Sheets, they may continue doing that *inside Job Management*. Office Pulse itself cannot directly import or save from Sheets.

## Files changed

- `public/index.html`: remove pencil / URL editor, Sheet data paths, and external Sheet links inside Pulse; use only shared Job Management data; preserve refresh, tabs, priority links, and sync failure states.
- `public/office-outside-close.js`: remove the deleted link modal from the close-handler list.
- `scripts/test-v86-40-office-pulse-source.mjs` (new): regression for a single source, consistent links, version-safe refresh, offline retention, and recovery.
- `.github/workflows/deploy-pages.yml`: run new regression with existing Office Pulse / Job Management checks.
- `office-release.json`: V86.40 metadata.
- `README-V86.40.md`: notes.

## Checks

Run at repository root:

```sh
node scripts/test-v86-40-office-pulse-source.mjs
node scripts/test-v86-38-office-pulse.mjs
node scripts/test-v86-37-action-queue.mjs
node scripts/test-job-data.mjs
node scripts/test-workbook.mjs
node scripts/test-job-saving.mjs
node scripts/test-bridge-mock.mjs
node scripts/check-repo.mjs
```

The new regression **fails on the old V86.39 header** and passes after this update.

## Browser / staging verification

1. Load Office Plus as an authenticated staff user. Office Pulse header should show the source indicator, expand button, and Refresh. **No pencil button.**
2. Expand Office Pulse. Open the Job Management resource shortcut, Jobs tab shortcut, and a priority item. All must open `job-management.html`, not Google Sheets.
3. Add or update a job in Job Management and save. Return to Office Pulse. The counts, statuses and priority preview must update after sync or Refresh.
4. In DevTools Network, filter `dashboard%3Ajobs` or `/api/state`. Verify job data is read using `GET`; no `docs.google.com/.../gviz/tq` requests or link-update `PUT` requests occur from Pulse.
5. Disconnect network, Refresh, verify the last accepted numbers remain with an offline warning; reconnect and Refresh, verify latest job data returns.
6. Check Smart AI movement and the 3D office remain functional (source files untouched).

Known limitations: live Supabase, real GitHub Pages deployment, and WebGL behavior must still be verified in an authorized staging environment.
