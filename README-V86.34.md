# KIDZSTUDIOS Office Plus V86.34 — Node setup CI repair

This GitHub-root ZIP contains the complete V86.33 application plus a **targeted GitHub Actions setup fix**. It is a **CI repair release**, not a verified Smart AI / WebGL production integration release.

## Root cause and fix

The GitHub Actions `Set up Node` step failed before running `npm ci`:

```
Error: Some specified paths were not resolved, unable to cache dependencies.
```

The failed step enabled `actions/setup-node@v4`'s optional `cache: npm` feature, which requires the configured `cache-dependency-path` to resolve at the exact commit being built. The supplied project ZIP contains `source/package.json` and `source/package-lock.json`; the user's live GitHub checkout has not been verified. This release removes the optional npm cache configuration from `.github/workflows/deploy-pages.yml`. **Dependency installation remains `npm ci --prefix source`, with lockfile pinning**. An early explicit check gives an understandable error if the checkout is missing either source file.

## Files changed from the last audit worktree

- `.github/workflows/deploy-pages.yml`: verify expected file layout and disable optional npm cache on Node setup.
- `scripts/test-deployment-setup.mjs`: regression checks for correct checkout layout, workflow and package/lockfile consistency.
- `office-release.json`: update version to 86.34.
- `README-V86.34.md`: this document.

The rest of the V86.33 code and its pre-merge CI/security audit changes are retained, including all public pages, Job Management, Supabase, and 3D simulation files.

## How to upload

1. Make a local backup of your GitHub repository and a separate backup of your live Supabase job data.
2. Extract this ZIP. **Copy the contents** into your local `kidzstudios-office-plus` repository root so the root contains `.github/`, `source/`, `public/`, `scripts/` and `office-release.json`; keep the original `.git/` directory intact.
3. Confirm `source/package.json` and `source/package-lock.json` appear inside that exact root.
4. Use GitHub Desktop to review and commit changes, then push to `main` or a feature branch according to repository rules.
5. Open the **new** Actions run for the new commit (not a rerun of an old commit). Verify `Verify project layout`, `Set up Node`, `Install build and test dependencies`, and every subsequent test individually.
6. If a new failure occurs, copy its **first red step and commit SHA** rather than repeatedly replacing the whole repository.

## Local verification commands

```bash
node scripts/test-deployment-setup.mjs
node scripts/test-public-config.mjs
node scripts/test-stability-runner.mjs
node scripts/check-repo.mjs
node scripts/test-workbook.mjs
node scripts/test-job-data.mjs
node scripts/test-job-validation.mjs
node scripts/test-job-saving.mjs
node scripts/test-job-ui-v86-31.mjs
```

On a machine with npm internet access, additionally run:

```bash
npm ci --prefix source
npm run build:3d --prefix source
node scripts/run-stability-suite.mjs
node scripts/test-v86-22-browser.mjs
```

## Important limitations

- This package removes the **Node setup caching failure** if the workflow at the new commit matches these files. It does not establish what currently exists in your GitHub repository or confirm that a GitHub deployment succeeds.
- The V86 runtime wiring audit documented in `docs/PREMERGE-CI-AND-DEPLOYMENT-AUDIT.md` still identifies unintegrated Smart AI scripts and a missing shared-movement adapter. These need separate application integration and in-browser testing before describing V86.34 as feature-complete or production-ready.
- Full Three.js/WebGL tests require npm dependency installation and a compatible browser runtime; they were not available in the offline analysis environment.
- Neither your live Supabase database nor GitHub deployment has been modified by preparing this archive.
