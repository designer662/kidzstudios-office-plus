# Office Plus V86.54-CPU2: GitHub Pages deployment repair

## Confirmed failing deployment

GitHub Actions stopped in `Check site assets and deduplicated runtime` on
`node scripts/test-v86-44-smart-ai.mjs`:

`AssertionError: Shared AI timeline unavailable. Try again online` (line 84).

The CPU1 optimization stopped automatic movement timeline reads while `document.hidden`.
However, user-triggered reset/move commands also called the same `refresh()` function.
The regression test intentionally marks the document hidden, so manual reset could
no longer load the server state. GitHub Actions blocked deployment before the Pages
artifact was published.

## Minimal CPU2 fix

- `public/office-movement-sync.js`: `refresh(force=false)` continues to skip
  periodic refresh when the page is hidden; explicit **Reset Smart AI** and
  **Move character** operations call `refresh(true)` to fetch the latest
  versioned timeline even in a hidden-document test context.
- `public/office-build-info.json`: reports `V86.54-CPU2` for live verification.
- No database schema changes, state reset, auto-refresh frequency increases,
  or legacy tests disabled. All other CPU1 source files remain unchanged.

## Apply from Codespaces (repo root)

1. Make a Git branch backup or verify the current changes are committed.
2. Upload `KIDZSTUDIOS_V86_54_CPU2_CHANGED_FILES.zip` into the repository root.
3. Run commands below (Bash terminal, not browser Console).

```bash
cd "$(git rev-parse --show-toplevel)"
mkdir -p /tmp/ks-cpu2
unzip -oq KIDZSTUDIOS_V86_54_CPU2_CHANGED_FILES.zip -d /tmp/ks-cpu2
bash /tmp/ks-cpu2/apply_v86_54_cpu2.sh "$PWD" --dry-run
bash /tmp/ks-cpu2/apply_v86_54_cpu2.sh "$PWD"
node scripts/test-v86-44-smart-ai.mjs
node scripts/test-v86-54-cpu-hotfix.mjs
git diff --check
git status --short
```

The installer refuses unexpected versions via SHA-256 checks, creates backups
under the Git administrative directory, and can be rerun safely. Do not force
an overwrite if its baseline check fails.

4. Review `git diff`, then deploy:

```bash
git add public/office-movement-sync.js public/office-build-info.json README-V86.54-CPU2.md
git commit -m "Fix hidden-tab Smart AI test and unblock V86.54 CPU deploy"
git push origin main
```

Only use `git push origin main` if you are on the intended `main` branch.
Watch GitHub Actions; it must finish **green**, including browser tests and
Pages deployment. Deploying this frontend patch does not apply the separate
Supabase SQL hotfix and does not demonstrate a reduction in live CPU usage.

## Rollback

Revert the CPU2 commit to restore previous files. The installer also preserves
pre-patch copies under Git's administration directory.
