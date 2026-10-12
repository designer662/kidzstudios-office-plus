# KidzStudios Office Plus V86.1 — Simplified Combined Office Pulse

Based on the previous V86 build. The standalone Operations Command Center has been **removed** and its practical operations overview has been folded into the original **Office Plus / Office Pulse** panel on the 3D office page.

## What changed

- **One operations panel, not two:** Office Pulse is the entry point. Its existing Pulse, Staff, Workload and Jobs tabs remain.
- **Less information above the fold:** Pulse initially shows four actionable KPIs (Active, Due today, Overdue, Done today), a pipeline progress bar, up to three upcoming/overdue jobs, and team workload.
- **Priority jobs are actionable:** Clicking a priority row opens the existing Office Plus job detail experience. This uses the **same in-memory jobs and synchronization** as Office Plus; no second command polling or duplicate API calls.
- **More details on demand:** Stage totals, extended alerts, reconciliation, shortcuts and extra summaries sit under a collapsible `More details` disclosure.
- **3D quality integrated:** The Eco / Balanced / High selector now appears beside the existing office camera controls. Setting stays per-device and applies to the existing shipped Three.js scene.
- **All existing features preserved:** 3D interactions, synced staff movement, chat, staff directory, job management, Kanban, insights, offline shipped 3D bundle, calculators and order forms remain.

## How to use

1. Sign in and open `index.html`. The main 3D office still occupies the workspace; Office Pulse is the only operations panel.
2. Use its four headline metrics to filter the **Jobs** tab, select urgent jobs for details, or click staff names to focus their characters.
3. Open `More details` for full operational breakdowns, or open `Job Management` for editing, Kanban and advanced analytics.
4. Select `Eco`, `Balanced`, or `High` beside camera tools for rendering quality.

## Deployment & limitations

Deploy `public/` with the existing GitHub Pages workflow. Back up your existing deployment and Supabase before replacing files. No SQL migration or additional cloud service is required. Real Supabase deployment was not exercised here. Your current 500-job shared JSON limit and existing access model are unchanged. Live data and multi-user behavior should be verified after publishing.


## V86.2 update
This revision extends the office simulation so staff can actively use the Store, Prayer Room, and Toilets. It also adds persistent gender fields in the staff directory and renders female staff with a hijab-style look in the 3D office bundle.

## V86.3 — Verified developer audit
The complete `public/` folder remains deployable as before. There are no database schema changes.
The new Room picker beside the camera tools navigates to Store, Surau, Toilets, Showroom, Pantry and Workspace.
Graphics default to Eco only on small or reduced-motion screens without a prior saved selection.
The stored CSS, scripts, bundled Three.js renderer and TypeScript source were updated together.
Run `node scripts/check-repo.mjs` then all files matching `scripts/test-*`.
Production Supabase authentication, deployment, and real multi-user changes must be tested against your own environment.

## V86.4 — Simplified controls + uploaded female character

Based on audited V86.3. To use: deploy the **entire `public/` folder** in place of the previous build so the new 3D bundle, styles, and audio engine load together. The deployment workflow still runs all `scripts/test-*` tests before publishing. No database migration is required.

- **Female model:** `source/src/office-character.ts` is derived from the supplied `office-character-hijab(2).ts`. The published `public/office-3d.js` includes the same rose hijab shapes: hood, throat, shoulder drape and front tail. Female staff definitions remain controlled by the Office Plus staff directory. The coffee-specific animation guard is intentionally preserved from V86.3.
- **Room navigation:** the standalone Jump to Room selector is removed. Clickable rooms, room focus APIs, and walking simulations for Store/Surau/Toilets still exist.
- **Sound bar:** shows only a short Day/Night indicator and a single `Sound on/off` toggle. It no longer shows activity counts, volume slider, preview button, or playback-state text. The accessible labels and saved on/off preference remain.
- **Air conditioning:** the continuous fan/air-conditioning track has been eliminated. Optional keyboard/footstep/social office audio events and separate notification chimes remain.
- **Cache refresh:** changed assets use the `v=86.4` browser cache key. Keep filenames and relative paths intact.

### Validation and release caution

`node scripts/check-repo.mjs` and all 25 `scripts/test-*` tests passed on the packaged build. TypeScript syntax/transpilation also passes. The supplied 3D character was integrated into the existing self-contained offline bundle directly because the Three.js/esbuild source dependencies were not available in this build environment. When dependencies become available, rebuild and compare the resulting bundle before publishing another 3D model update. This environment's Chromium cannot initialize WebGL, so final 3D visual inspection and live Supabase multi-user verification remain deployment tasks.


## V86.5 — User-supplied hijabi-character.js model
- Female 3D staff now use the new sculpted model: continuous tailored ivory tunic, layered scarf and detailed sneakers; male character rigs remain unchanged.
- Integrated a custom movement adapter for walking, desk sitting, face turning, blinking and staff emotes.
- Preserved Office Pulse, store/surau/toilet simulation, compact controls and no air-conditioner drone.
- Bounded mesh tessellation for practical isometric rendering performance; offline JavaScript bundle is patched alongside maintainable source.
- IMPORTANT: live WebGL rendering and Supabase multi-user flows require browser/deployment verification.
