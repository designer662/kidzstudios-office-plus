# KIDZSTUDIOS Office Plus V72 — Multi-Select and Row Delete

V72 is based on V71 and preserves the Job Management, Excel import/export, staff, moods, 3D simulation and Supabase features.

## What's new

- A checkbox at the start of each Job Management table row.
- **Select all visible jobs** in the table header (respects month/year/search/filter selections).
- A selection count and **Delete selected (N)** button under the filters. Selection may include jobs currently hidden by filters; the count is always shown and the confirmation gives a preview.
- A **trash button immediately to the right of Duplicate** in each job row, using the same foreground confirmation dialog as V71.
- **Clear selection** button without changing saved records.
- Delete requests are blocked if another PC has changed the shared Supabase version or any of the selected records before confirmation is accepted. Supabase's existing `expectedVersion` check remains active.
- Deletes run as **one confirmed shared save**; the Job Management updated event refreshes Office Pulse as before. No database migration is required.

## Using bulk delete

1. Open Job Management. Tick jobs individually or tick the select-all checkbox in the table heading.
2. Review the **N selected** indicator. Selecting another filtered view retains previous selections until cleared; the indicator also tells you how many selected are visible in the current view.
3. Press **Delete selected (N)**.
4. Review the modal and choose **Delete N jobs** or **Cancel**.

Deletes cannot be undone through this UI. Export a full JSON backup using **Tools → Export Data** before a large cleanup.

## Deploy

Extract and upload the **contents** of this GitHub-ready repository (including `.github/workflows`) into your existing repository. Commit to the `main` branch and let GitHub Pages deploy. Hard-refresh after deployment if the browser still shows the previous version. No new Supabase migration is needed.

## Tests

- `node scripts/test-bulk-delete.mjs`: selection, filtered select-all, confirmation, single/bulk deletion and stale-data safety.
- `node scripts/test-delete-modal.mjs`: confirms Delete dialog stays in front of the editor.
- `node scripts/check-repo.mjs`: checks all 10 shipped HTML pages and JavaScript.
- `node scripts/test-bridge-mock.mjs`: Supabase adapter mocked checks.

Browser-level visual inspection and live Supabase write testing still require your deployed website.
