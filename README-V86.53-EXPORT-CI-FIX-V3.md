# V86.53 Job Management Export CI Repair V3

## Why the previous deployments failed

The browser regression script attempted to assign `jobs` directly from a `window.__fixtureJobs` helper. However, `jobs` is a private variable inside the Job Management page's JavaScript IIFE, so the helper could be defined in a scope where `jobs` does not exist. GitHub Actions failed before deployment with `ReferenceError: jobs is not defined`.

The V2 patch also did not make it into the user's local working tree because their Codespaces command stopped at `Commit or stash tracked changes first`. Their Codespaces `main` was behind the latest GitHub `main`.

## V3 fix

Only `scripts/test-v86-53-export-browser.mjs` is changed. It now:

- Supplies 260 jobs through an isolated, read-only mock of `/api/state`.
- Waits for the real Job Management `pull()` code to load the jobs.
- Does **not** reference, inject, or assign the page's private `jobs` variable.
- Verifies a complete 260-job CSV and JSON backup.
- Downloads an XLSX workbook and validates its ZIP signature.
- Injects a simulated XLSX generation error and checks visible error handling.
- Prints `V86.53 export fixture v3: mocked shared-state load active` so the GitHub workflow log identifies the revision.

No production application logic, user records, Supabase schema, or authentication code is modified.

## Required CI verification

```bash
node --check scripts/test-v86-53-export-browser.mjs
node scripts/check-repo.mjs
node scripts/test-v86-53-export-browser.mjs
```

`npm ci --prefix source` and Playwright Chromium installation may be required in a fresh Codespace. The existing GitHub Actions workflow already installs these dependencies.

**Note:** The complete project archive is reconstructed from the provided V86.53 test-fix baseline. When GitHub `main` contains later commits, apply the patch-only archive to the updated branch instead of replacing the repository with this older snapshot.
