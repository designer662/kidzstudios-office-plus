# KidzStudios Office Plus V86 — Four Upgrades

This is an additive upgrade of the uploaded V85 project. Existing pages, Supabase configuration, office layout, synced movement, profiles, chat, calculators, order forms and Excel import/export have been retained.

## 1. Operations Command Center

Open **Command Center** in the office's top navigation. It shows current saved job counts, due/overdue queues, workload linked by Sales/Designer/Production PIC, workflow distribution, weekly order/completion counts and recorded invoice/paid totals. Staff data comes from the existing OfficeSuite staff directory; jobs come from `dashboard:jobs` in the existing Supabase bridge. Click a staff member in Team to see their associated records; the **Focus in 3D** action focuses that character. When the panel is open on desktop, 3D character selection also updates the Team view.

The Command Center is **read-only**, to avoid introducing a competing job database writer. Use Job Management to edit jobs. Live polling happens while the command panel is open; if the server is unavailable, the panel shows an error and retains previously loaded records instead of pretending that its data are current.

## 2. Kanban Job Management

In `job-management.html`, use **Table / Kanban board / Insights**. The board honors existing month, search and department filters. Drag cards to a stage, or use their accessible **Move to** selector. The operation asks for confirmation, changes `CURRENT DEPARTMENT`, updates `LAST UPDATE`, and calls the **existing** optimistic-concurrency, version-checked `saveAll()` path. On version conflict or other failure, the user must refresh and retry. Clicking **Edit job** opens the original full job editor. **Other / Unmapped** is a read-only group; to classify an unrecognized department, move it into a recognized stage.

## 3. Insights

The dashboard and Job Management views include stage distribution, active/overdue counts, workload summary, order/completion activity during the past seven days and recorded invoice/paid amounts. Calculations use stored Job Management data; simulated movement and chat are *not* counted as real productivity or staff time tracking. The summary is **not** a substitute for accounting or audited revenue. If multiple staff are attached to a job, workload counts overlap intentionally.

## 4. 3D Lighting & Performance

The existing V85 scene, character models, office layout, routing, synced movement and animation remain intact. Added subtle warm studio fill lighting and `Eco / Balanced / High` rendering controls in the Command Center:

- Eco: device pixel ratio <= 1, shadows disabled and warm studio light disabled.
- Balanced: device pixel ratio <= 1.35, 1024 px shadow maps.
- High: device pixel ratio <= 1.75, 2048 px shadow maps and brighter studio fill.

Rendering quality is per device (`ks-3d-quality-v86` localStorage). The shipped `public/office-3d.js` was patched along with maintainable `source/src/office-scene.ts`, so the build works **without requiring `npm install`** for its shipped 3D asset. Source rebuild still requires the `three` and `esbuild` dependencies defined in `source/package.json`.

## Deployment

1. Back up the existing published folder/repository and Supabase data before replacing files.
2. Deploy the contents of this project in the same GitHub Pages workflow as V85. The GitHub Actions workflow deploys the entire `public/` directory.
3. Preserve the existing **public Supabase project URL/publishable key only** and RLS configuration. Do not place service-role keys in browser code.
4. Open `index.html` after sign-in, then the new **Command Center**. Open `job-management.html` to switch views and edit stages.
5. Run `node scripts/check-repo.mjs` and `node scripts/test-command-v86.mjs` before deployment; GitHub Actions also runs the full test suite.

No new Supabase SQL migration is required for the four interface upgrades. **The existing shared JSON job scope, 500-job application limit, RLS behavior, and multi-user security model were not changed.** A future database normalization or permission redesign would require a separate carefully tested schema migration and cannot be presented as already implemented.

## Validation and limitations

- All original 21 repository test scripts passed; the V86 command regression test passes separately.
- Browser fixture using *sample records*: rendered 3 Kanban cards / 5 workflow columns, rendered analytical totals, and verified a confirmed stage move produced a `PRODUCTION` payload via the existing save route.
- The 3D controller could not be tested against an actual authenticated Supabase/browser deployment in this offline testing environment. The existing 3D regression suite passes, but real-world GPU, network, permissions and concurrent edits require validation on your deployed environment.
- This release does not include rewritten photorealistic staff meshes or a full office asset remodel. The 3D upgrade focuses on rendering quality, lighting, stability and preserving existing movement and interactions.
