# KIDZSTUDIOS Office Plus V86.54 · CPU3-CI1 Report Export Test Repair

## Why GitHub Actions failed

The 19 October 2026 GitHub Actions log (`logs_106264873762.zip`) stops at
`Test Reports CSV and XLSX in Chromium` with a 30-second timeout waiting for
Playwright's `download` event in `scripts/test-v86-51-report-browser.mjs` line 40.

The browser test opens the shared-notification panel, clears notifications,
then moves directly to the Report export button **without closing the open
notification panel**. That panel may intercept an export click. The production
`public/report.js` download code works in an isolated browser reproduction once
the notification panel is explicitly closed.

## The actual change

Only `scripts/test-v86-51-report-browser.mjs` is modified: after verifying
notification clearing, it closes `#notificationBtn` and verifies `aria-expanded`
becomes `false`, before proceeding with CSV and XLSX download tests.

No production frontend JavaScript, database functions, RLS, report data, or
Supabase configuration files are modified by CPU3-CI1. The project release
remains V86.54-CPU2. This patch unblocks CI; it is not a new CPU optimization.

## Local verification performed

- Before change: the Playwright Reports test reproduced `page.waitForEvent:
  Timeout 30000ms exceeded` using the uploaded CPU2 project.
- After change: the full Reports browser test passed, including CSV content,
  XLSX ZIP signature, UI state, and mobile overflow assertions.
- Non-browser tests passed: Reports navigation, Reports upgrade,
  dashboard/report, Smart AI, V86.54 CPU hotfix, bridge mock, and Job Data Hub.
- Browser tested with installed Chromium 144 and Playwright runtime 1.57.
  GitHub Actions uses its own managed Chromium, so production deployment must
  still be verified on the next GitHub run.

## Safe installation

1. Open GitHub Codespaces for the current `main` branch. Confirm CPU2 is present.
2. Upload `KIDZSTUDIOS_V86_54_CPU3_CI1_CHANGED_FILES.zip` to repository root.
3. In Codespaces **Bash Terminal** (not the browser Console), execute:

```bash
cd "$(git rev-parse --show-toplevel)"
mkdir -p /tmp/ks-cpu3
unzip -oq KIDZSTUDIOS_V86_54_CPU3_CI1_CHANGED_FILES.zip -d /tmp/ks-cpu3
bash /tmp/ks-cpu3/apply_v86_54_cpu3_ci1.sh "$PWD" --dry-run
bash /tmp/ks-cpu3/apply_v86_54_cpu3_ci1.sh "$PWD"
node --check scripts/test-v86-51-report-browser.mjs
node scripts/test-v86-51-reports-navigation.mjs
git diff --check
git status --short
```

If a hash mismatch is reported, do not force overwrite: export latest `main`
and request a patch matched to its source.

4. If dependencies and Chromium are installed, run:

```bash
node scripts/test-v86-51-report-browser.mjs
```

5. Review and commit/push on `main`:

```bash
git add scripts/test-v86-51-report-browser.mjs README-V86.54-CPU3-CI1.md
git commit -m "Fix Reports download browser test notification overlay"
git push origin main
```

6. Confirm `Deploy Office Plus to GitHub Pages` finishes **green**, including
both browser tests and the Deploy GitHub Pages step.

## Not included

This does not establish that Supabase CPU is now lower or that the deployed
website is updated. Measure live CPU and request rates after deployment.
