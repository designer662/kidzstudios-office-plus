# KIDZSTUDIOS Office Plus V86.54-CPU1

## Scope of the patch

This is a **non-destructive frontend CPU mitigation + an optional database function hotfix** based solely on the uploaded V86.54 source ZIP. It has not been deployed or tested on the user's live Supabase instance. The original 3D renderer, authentication policy, data schema, job records, and save/heartbeat frequency were not changed.

Changes:
- Coalesce identical **simultaneous** PostgREST GET requests. Never cache completed reads or merge mutation requests.
- Reduce dashboard background polling: with Realtime connected, fallback every 45 seconds; without it, 10–12 seconds. Realtime updates remain immediate.
- Reduce shared-form fallback reads: 45s connected / 10s disconnected, keeping CAS/conflict and unsaved-edits protection.
- Reduce Job Management fallback from 3.5s to 12s while visible. Job editor and save guards remain untouched.
- Reduce Report fallback to 45s. Realtime job-change refresh remains enabled.
- Smart AI shared timeline: ignore Realtime events for unrelated scopes, no hidden-tab polling, fallback 12s connected / 9s disconnected. **Leader's 5.5s write heartbeat is unchanged.**
- Add `supabase/migrations/20261019000100_cpu_retry_hotfix.sql` to use `PT409` instead of the old synthetic `40001` version-conflict exception. This is NOT applied by the GitHub Pages build.
- Add CI test for this CPU patch and concurrency assertion to API bridge mock.

## Required rollout order

1. **Back up Supabase data and existing GitHub branch.** Use maintenance/off-peak deployment.
2. In Supabase SQL Editor run `supabase/migrations/20261019000100_cpu_retry_hotfix.sql` if the function still uses `40001`. The file performs only `CREATE OR REPLACE FUNCTION` inside a transaction; it has no DELETE, DROP or TRUNCATE. Confirm the final `pt409_installed = true`. If already patched it can still be run, but isn't necessary.
3. Run the Codespaces patch installer against the **same baseline as the supplied ZIP**. SHA-256 mismatches cause a refusal rather than a forced overwrite.
4. Review `git diff`, commit changed files, push main, and ensure all GitHub Actions checks are green. CDN/browser caches should use the Actions release stamp; hard-refresh each test browser.
5. Verify real staff sign-in, read/write Job Management, stale-write 409 conflict, reporting, chat, and 3D Smart AI across two browser tabs.
6. Measure Supabase CPU and `pg_stat_statements` **live rate** in two 60-second snapshots. These are workload mitigations, **not a verified cure for 100% CPU**. The source may have other traffic sources and actual database CPU wasn't measured in this environment.

## Installation (Codespaces from repository root)

Upload the PATCH ZIP, then run:

```bash
mkdir -p /tmp/ks-cpu1-installer
unzip -oq KIDZSTUDIOS_V86_54_CPU1_CHANGED_FILES.zip -d /tmp/ks-cpu1-installer
bash /tmp/ks-cpu1-installer/apply_v86_54_cpu1.sh "$PWD" --dry-run
bash /tmp/ks-cpu1-installer/apply_v86_54_cpu1.sh "$PWD"
```

**Important:** Installer does not run SQL, push git or restart Supabase. Backup originals go into `.git/ks-cpu1-backups/` (Git ignores it). On a mismatch do not force it: upload your current GitHub repo ZIP for rebase.

## Validation run in development environment

```bash
node scripts/check-repo.mjs
node scripts/test-bridge-mock.mjs
node scripts/test-v86-54-cpu-hotfix.mjs
node scripts/test-v86-43-dashboard-polling.mjs
node scripts/test-shared-sync-production.mjs
node scripts/test-v86-54-all-in-one.mjs
```

Browser/3D integration suites require `npm ci --prefix source` and the Playwright browser installed by GitHub Actions. Live Supabase CPU/DB performance cannot be verified with the static ZIP.

## Git deployment commands (after successful validation)

```bash
git diff --check
git status --short
git add public/supabase-bridge.js public/shared-sync.js public/office-movement-sync.js public/index.html public/job-management.html public/report.js public/office-build-info.json supabase/migrations/20261019000100_cpu_retry_hotfix.sql scripts/test-bridge-mock.mjs scripts/test-v86-43-dashboard-polling.mjs scripts/test-v86-54-cpu-hotfix.mjs .github/workflows/deploy-pages.yml README-V86.54-CPU1.md
git commit -m "Fix Office Plus CPU load and PostgREST retry handling"
git push origin main
```

These commands push only after explicit execution. Confirm the current branch and do not commit generated credentials, local backups or user data.

## Rollback

Revert the CPU1 commit in GitHub and redeploy if frontend behavior regresses. Originals are also backed up by the installer. The SQL hotfix intentionally **should usually remain installed**, because reverting to `40001` can reintroduce the PostgREST 14 retry problem. For a database rollback use your saved previous function definition only after considering that risk.
