# KidzStudios Office Plus V86.43 — Jarvis Dev Pro (Tasks 1, 2, 3)

**Scope:** (1) deep code audit; (2) bug fixes; (3) performance optimization.
**Base:** V86.42 Production Source. No intentional change to staff data, SQL schema, page routing, simulation behaviors, or application features.

## Fixes and optimizations

- `public/supabase-bridge.js`: an offline Supabase membership-check retry **reused the original login gate**. Previously every Retry called `makeGate()` again, leaving multiple `#ks-auth-gate` and sign-out elements. Browser regression added.
- `public/shared-sync.js`: global configuration fetches coalesce, global-config polling runs once per minute instead of every 3.5s, and scoped Supabase Realtime updates don't refetch unrelated form pages. Maintains original 3.5s fallback when Realtime is disconnected and the existing optimistic-concurrency conflict handling. Adds a standard unsaved-changes warning before browser unload.
- `public/index.html`: 4 background polling loops now use fallback intervals of 15–20s when Realtime is connected, while preserving their original fast intervals if it disconnects. Supabase shared-state updates refresh only affected `office:staff` or `dashboard:jobs` records when their scope is available; older events without scope still trigger both.
- `source/src/office-scene.ts`: repeated `.find()` staff/label ID lookups in the animation loop, mood updates and roster updates replaced by prebuilt `Map` indices. Model geometry, appearance, camera, collision, walking, seating and shared movement logic unchanged. **Run the 3D source build before deployment.**
- `.github/workflows/deploy-pages.yml`: versioned V86.43 website artifact and additional regression checks for retry login, scoped polling, synchronization and 3D lookup indices.

## Checks performed here

- **24/24** independent Node tests PASS, including syntax, page structure, job workflows, Supabase mock API, runtime sync safety, deployment guards and new performance tests.
- **9/10** simulation tests PASS; final needs `three` installed.
- **Chromium offline/retry/authenticated DOM smoke PASS** using locally installed Python Playwright against actual bridge JS, with one login gate, one sign-out button and no page errors.
- No exact duplicate public JS files or repeated function declarations found in nonminified public JS.
- TypeScript scene source transpile parsing PASS; **full esbuild/Three.js build and rebuilt WebGL smoke not locally verifiable**.
- Live multi-user Supabase/RLS/authentication, real mobile browser and deployed site have not been tested.

## Deployment — do not skip

1. Push this repository source (including `.github/workflows`) to GitHub (`main`). Do not deploy the unbuilt `public/` directory as production.
2. Configure GitHub Actions repository **Variables** `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`. No service-role keys or secrets in client-side assets.
3. Configure GitHub Pages source: **GitHub Actions**. Confirm required Supabase migration and member/RLS policies.
4. Run **Deploy Office Plus to GitHub Pages**. The workflow installs locked dependencies, rebuilds the Three.js bundle, validates the build digest, runs 3D and Chromium acceptance, stamps assets, and uploads `KidzStudios_OfficePlus_V86.43_Production_Website` only after all gates pass.
5. Before staff rollout: test two real staff browsers (auth/signout, jobs, sync conflict resolution, chat/presence, 3D movement, mobile UI, offline/reconnect, export, database backup and rollback).

The source ZIP is **deployment candidate**, not evidence of a completed verified production deployment.
