# KidzStudios Office Plus V86.50 — Dedicated Workstations

## Behavior
- Every employee receives an **exclusive, physically rendered workstation** while one is free.
- The office has **9 assignable seats**: B01, B02, D01, D02, S01, S02, S03, S04, A01.
- The six workstations in the main work area retain exclusive chair bindings and monitors on the original V86.49 continuous shared worktable (classic visual design). The rear counter has B02/A01 and Boss keeps B01.
- With the default 8 employees, everybody has a desk. Employee #9 gets the final desk; employees #10+ stand at distinct, navigable showroom positions.
- Deleting a staff member makes that person's desk available to the next staff member according to deterministic employee ID order. Existing default ID-to-seat bindings take priority.
- 2D map and 3D chair bindings share the same desk IDs. Showroom overflow never gets a phantom seat.
- One elected shared-movement leader migrates stale home anchors using the existing movement scope and CAS. Browser viewers do not independently move shared state.
- Staff profiles, jobs, employee appearance, and Supabase schema are untouched. Seating is computed from the existing staff list. No database migration is needed.

## Production deployment
1. Upload the essential patch contents into the *root* of the existing V86.49 GitHub Codespace (or replace with the full-source archive).
2. From the repository root: `git add -A && git commit -m "KidzStudios V86.50 dedicated desks" && git push origin HEAD`.
3. GitHub Actions **must install packages and rebuild `public/office-3d.js` from the updated TypeScript**. The ZIP's legacy compiled bundle is deliberately not promoted as the new production artifact.
4. The workflow runs `node scripts/test-v86-50-workstations.mjs` as a predeploy gate, followed by the existing full simulation and WebGL browser tests. Confirm all checks pass.
5. Validate live Supabase login, Afiq/Boss routing, 8-to-10 staff seat allocation, showroom movement, refresh/re-login and multi-browser state agreement on staging before production.

## Local verification
```bash
node scripts/test-v86-50-workstations.mjs
node scripts/check-repo.mjs
npm ci --prefix source
npm run build:3d --prefix source
node scripts/run-stability-suite.mjs
```

## Verification completed for this package
- Dedicated station unit/integration test: **PASS**.
- Simulator regression: **11/12 PASS**. The remaining case imports Three.js from `source/node_modules`, which is not installed in the current offline test runtime.
- Static JavaScript/HTML/SQL scan: **0 errors** across 10 HTML pages and shipped JS.
- Deployment prerequisite layout and lockfile test: **PASS**.
- Updated TypeScript scene syntax check: **PASS** through the available compiler.
- Chromium WebGL acceptance and online authenticated Supabase tests: **not run in this workspace**. CI is configured to require them.

## Limitations
Very large rosters can physically crowd the showroom even with unique, wall/furniture-safe standing anchors. Expand the floor plan before treating 100 simultaneous 3D avatars as a realistic occupancy target. The existing 3D bundle in this source archive must be rebuilt by GitHub Actions before going live.
