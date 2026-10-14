# KidzStudios Office Plus V86.41 — Audit Findings

**Audit date:** 14 October 2026  
**Input:** supplied V86.40 ZIP  
**Output:** maintained V86.41 source repository. This audit is **not** a statement that production WebGL or Supabase is validated.

## Application map

| Responsibility | Active implementation |
|---|---|
| Office dashboard, staff UI and Office Pulse | `public/index.html`, `public/office-pulse-insights.js` |
| Job creation, management and priority queue | `public/job-management.html`, `public/job-data.js`, `public/job-rules.js`, `public/job-attention-queue.js` |
| Authentication, shared state and realtime API | `public/supabase-bridge.js`, `public/shared-sync.js`, Supabase SQL migration |
| 3D visuals and character rigs | generated `public/office-3d.js`, authored files in `source/src/` |
| Shared staff paths, mobility, work behavior | `public/office-movement-sync.js`, `public/office-smart-ai.js`, `public/office-furniture-interactions.js` |
| Build + deployment | `.github/workflows/deploy-pages.yml`, `source/package.json` |

## Fixes implemented

1. **Removed duplicate, unused JavaScript files:** `public/netlify-sync.js` was byte-for-byte identical to the maintained `public/shared-sync.js`. `public/app.js` was an unreferenced old dashboard copy. Neither is linked by active HTML; legacy cached-asset rules were adjusted.
2. **Consolidated dashboard synchronization:** removed the outdated ~7.5 KB inline sync closure from `public/index.html` and loaded one maintained shared module. Kept the latest dirty/saving protection, page-hide save attempt and realtime-aware polling. A scoped condition prevents a configurable external Sheet URL from rewriting dashboard links to local Job Management; other tool pages retain their external shortcut behavior.
3. **Fixed Job Management Delete confirmation:** ensured confirmation overlays the editor, receives keyboard focus, has alert-dialog semantics and closes first on Escape without closing its underlying editor. Focus returns to the previous control when possible.
4. **Restored cross-page click-away behavior:** Job Management now loads the same existing outside-close controller as the other nine public pages. The helper remains a single implementation.
5. **Hardened release integrity:** aligned release metadata and package-lock version to V86.41 and stamped all page footers.
6. **Hardened CI:** added layout preflight, deployment setup test, shared-sync and duplicate-asset regression, modal/click-away regressions, V86.37 Action Queue, V86.38 Pulse, V86.40 single-source test, and **all ten simulator stability tests** rather than a manually reduced subset. Preserved authenticated deploy build and WebGL browser acceptance test.

Static TypeScript AST inspection found **no duplicate named function declarations in the same lexical block** of active JS/TS source. The actual duplication was across files and dashboard-inline implementations. Duplicate files were removed, not renamed.

## Test evidence

- **Original archive:** 22 of 52 automatically invoked `scripts/test-*` files passed in this environment.
- **After maintenance:** 30 of 53 passed locally. 8 require missing Three.js/Playwright dependencies and cannot run here. 15 others fail older assumptions or absent features; these still require feature-by-feature triage, not silent deletion or declarations of success.
- **Strict simulator manifest:** 9/10 passed locally; the remaining V86.22 3D simulation test imports unavailable `three`.
- **Working checks:** JS/inline HTML syntax, static asset references and unique IDs, TS/JS parser scan, job save conflict tests, mocked Supabase state/chat/events API, V86.37 Action Queue, V86.38 Pulse, V86.39 staff mobility, V86.40 single-source logic, V86.41 consolidation and Job Management confirmation/click-away.

### Important unresolved verification

**P0 — rebuild `public/office-3d.js` from the authored sources on CI.** The inherited precompiled bundle was already known to be behind V86.39 source in the earlier release notes. Dependencies (`three@0.180.0`) cannot be installed from this offline runtime; `npm ci --offline` returned `ENOTCACHED`. The unrebuilt checked-in bundle does not validate the latest source fixes. GitHub Actions is configured to install the dependencies and rebuild before deploying.

**P0 — live Supabase and WebGL:** no authorized backend credentials or live browser test were run in this audit. Verify multi-user updates, optimistic concurrency, refresh/reconnection, staff navigation, chair/furniture interaction and mobile behavior on staging before replacing production.

**P1 — outdated tests/feature divergence:** Fifteen remaining tests assert historical asset query strings, minified bundle internals, earlier behavior (e.g., a current-month rather than all-months default), or previous controls (e.g., bulk-delete). A failed historical assertion is not automatically an active bug, but the missing feature can still matter. Verify whether bulk-delete is a requirement before rebuilding it. Upgrade these tests to current behavior with meaningful executable invariants instead of rewriting assertions solely to make them green.

**P1 — offline portability:** selected tool pages still request `html2canvas` and/or `jsPDF` from external CDN domains. Shared Supabase storage and auth require connectivity. Offline viewing/data queueing needs an explicit design and local vendor assets.

## Recommended technical backlog

| Priority | Improvement | Why |
|---|---|---|
| P0 | Run GitHub Actions rebuild and authorized staging acceptance | Production 3D source/build consistency not yet verified |
| P1 | Modularize `index.html` and `job-management.html` by state, API, UI and simulation orchestration | Lower regression risk from large inline scripts |
| P1 | Rewrite/archive obsolete version-string test cases after confirming intended behavior | Meaningful CI with fewer false alarms |
| P1 | Multi-user test fixtures for Supabase version conflicts, network loss and rejoin | Protect shared Job Management and staff state |
| P2 | Bundle external export libraries locally where licensed | Predictable offline tool exports |
| P2 | Make 3D render quality adaptive, defer nonessential panels, consolidate layered CSS | Better mobile CPU/GPU utilization and maintainability |
| P2 | Add accessibility and visual-regression tests for modal focus traps, table scrolling and phone layouts | Catch visual and interaction regressions before deployment |

## Safe deployment steps

Unzip the project and copy the **contents** of `kidzstudios-office-plus-main` into the repository root. Preserve the `.github` directory. Push to the configured `main` branch. Do **not** publish the raw extracted `public` as a final 3D build. Check GitHub Actions output: `npm ci`, `build:3d`, repository checks, simulator suite, Chromium test and GitHub Pages deployment should all succeed. Configure public Supabase URL and publishable key as the workflow requires; do not use service-role keys. If any step fails, resolve it before treating deployment as complete.
