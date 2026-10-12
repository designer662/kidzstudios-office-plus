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
