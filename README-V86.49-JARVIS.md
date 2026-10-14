# KidzStudios Office Plus V86.49 — JARVIS Five-Stage Upgrade

**Source baseline:** V86.44. **Release:** V86.49. **Scope:** movement engine, natural activities, simulation-only staff routines, AI controls and rendering performance. All database schema and staff/job data formats retained.

## The five completed source stages

1. **V86.45 — Smart Movement**: give retries/starved workers first scheduler consideration, suspend spontaneous two-person conversations during congested states, and eliminate the duplicate attempt to plan exactly the same geometry route within one tick. Existing safe-route, time-slot collision reservations and leader CAS remain mandatory.
2. **V86.46 — Natural Animation**: smooth handheld drink/food/stock prop fades instead of popping immediately. Retain previously implemented blended walks/sits, facial animations and two-bone IK for male and female avatars.
3. **V86.47 — Office Routine**: load `public/office-ai-routine.js` before Smart AI. Deterministic, soft preferences for simulated morning work, lunch, collaboration and evening activity in the Asia/Kuala_Lumpur timezone. Does **not** track real working hours or override jobs, room capacity or collision protection.
4. **V86.48 — AI Monitor & Force Move**: new compact in-scene Monitor shows leader/follower state, per-staff phase, target room, failure count, wait duration and an SVG preview of any reserved route. Force Move uses the existing collision-safe planner, one version-checked server write and safe refusal on blockage. All staff/jobs/payroll schema remain untouched.
5. **V86.49 — Performance**: Eco rendering and follower simulation capped near 30 FPS; bounded label placement refresh (Eco ~11 FPS, Balanced ~17 FPS, High ~26 FPS); material screen-glow updates at most every 800 ms. Existing adaptive pixel ratio and material batching remain in place.

## What was tested

- **26/26** local CI-style code, asset, security fixture, Job Management, sync and deployment checks: PASS.
- **11/12** strict simulator checks: 11 PASS; `test-v86-22-simulation.mjs` requires missing local `three` package.
- New regression: deterministic 6-minute timeline, authentic floor-plan geometry, collision-safe manually planned Boss route, Boss/Afiq each making multiple movements, saved-state CAS, unchanged staff roster, syntactically valid TypeScript source.
- `scripts/check-repo.mjs` and `scripts/audit-runtime-wiring.mjs`: PASS, 0 blockers.
- `npm ci --prefix source`: **NOT AVAILABLE LOCALLY** (`EAI_AGAIN` fetching npm registry). Consequently updated `office-3d.js` **has not been rebuilt** in this ZIP.
- Browser/WebGL and multi-session live Supabase acceptance: **NOT VERIFIED** here.

## How to deploy

1. Upload the **full source ZIP contents**, not a direct copy of the `public/` folder, into the main branch of the GitHub repo.
2. Configure required GitHub Actions variables for the public Supabase URL and **publishable**, never service-role, key.
3. Let `.github/workflows/deploy-pages.yml` run. The workflow installs exact pinned npm dependencies, rebuilds 3D and verifies its SHA-256 manifest, checks all tests, executes Chromium/WebGL acceptance, and **only then** publishes GitHub Pages.
4. Retrieve the `KidzStudios_OfficePlus_V86.49_Production_Website` artifact **after** the GitHub workflow passes.
5. Validate multiple authenticated users, staff edits, Boss/Afiq movement and monitor Force Move on staging. Check mobile GPU behavior, then publish to production.
6. On rollback, restore previous source and compiled artifacts together and refresh every active tab to avoid old movement leaders.

**Important:** The included `public/office-3d.js` remains the last precompiled 3D bundle from V86.44. Do not serve it as the *verified* new V86.49 bundle; the CI rebuild is mandatory.

To patch an existing V86.44 checkout, extract the Essential Patch ZIP at the project root and allow GitHub Actions to rebuild. No manual SQL migrations are required for these changes.
