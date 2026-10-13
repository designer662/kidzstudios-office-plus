# Office Plus V86.22 — rebuilt simulation

This repair restores a reproducible source build and fixes the seating and movement failures in V86.21.

## Install into your existing project

Use the `PATCH-V86.22.zip` included in the repair package. Extract its contents into the repository root, preserving `public/`, `source/`, `scripts/`, and `.github/`. Commit the changes and let GitHub Actions finish. Refresh the browser with Ctrl+F5 and check **V86.22** in the footer.

The patch includes the missing wall guard and repaired movement timeline. It does not replace Supabase configuration, authentication code, database migrations, or business data. No new migration is required.

The `full-project/` folder is a complete reconstructed project for a fresh checkout or recovery. Its Supabase configuration contains the original placeholders; use your existing repository variables. Do not replace a configured installation wholesale with that folder.

## What changed

- **Correct ownership:** V86.21 incorrectly used zero-based demo IDs. The live roster uses IDs 1–8. Chairs now bind to `deskId`, including all six desk staff; showroom staff remain standing. Construction order no longer assigns ownership.
- **Real joints and contact:** the knee pivots preserve the original meshes and remove the nonuniform parent scale that distorted lower-leg rotation. Soles are placed on the floor and trouser support sits above the cushion.
- **Furniture reach:** desk chairs are pulled toward their worktops and keyboards toward their users. Arms use the registered keyboard position rather than reaching into empty space. The room footprint, walls, worktops, and staff desk assignments remain the same.
- **Ordered transitions:** turn, sit, rise, then walk. The renderer holds a seated character until the rise completes. Seat departure and arrival interpolate continuously in the shared timeline.
- **Collision guard:** full movement segments are checked against walls and worktops. A stale target behind a partition gets a safe local route through a doorway. Starting inside a wall can no longer bypass collision checks.
- **Strict pause:** animation and seating state stop while paused, including when network targets continue arriving.
- **Reproducible build:** character improvements that existed only inside the old bundle are restored to source. `office-3d.js` is generated with esbuild, and the deployment workflow rebuilds and tests it.
- **Controls retained:** wheel zoom, character selection, appearance changes, social cues, and rest animations remain available.

## Rebuild and verify

Node.js 24 is used by the workflow.

```sh
npm ci --prefix source
npm run build:3d --prefix source
node scripts/check-repo.mjs
node scripts/test-v86-22-simulation.mjs
node scripts/test-walking-routes.cjs
node scripts/test-v86-16-simulation-rebuild.mjs
node scripts/test-movement-timeline.mjs
node scripts/test-living-timeline-sync.mjs
npm exec --prefix source -- playwright install chromium
node scripts/test-v86-22-browser.mjs
```

On Linux CI, install the browser with `--with-deps`. An existing Chromium binary can be selected with the `CHROMIUM_EXECUTABLE` environment variable. The browser test uses an isolated local fixture; it does not sign in or write to Supabase.

Older seating test filenames remain as compatibility entry points for the new actual-rig suite. Their former assertions used incorrect roster IDs, mocked limbs, and minifier-specific variable names.

## Debug an installation

Run this in the browser console:

```js
window.office3d.getDiagnostics()
```

The result reports the release, pause state, geometry availability, staff desk bindings, seating phases, positions, targets, and blocked positions. Desk staff should report `seated` at their own desk; Nisa and Athira should report `standing` in the showroom. During departure, `rising` precedes `walking`.

## Verification performed

- Production source compiled successfully; generated bundle syntax and all ten HTML pages checked.
- 432 planned walking routes and 2,220 route segments passed.
- 36,000 real Three.js rig frames across male, classic hijabi, and semi-casual hijabi models passed cushion, sole, hand reach, and no-drift checks.
- Swept renderer movement passed cross-partition, worktop, doorway, and invalid-start checks.
- WebGL browser checks passed for six occupied desks, two standing staff, strict pause, rise-before-walk, smooth departure, return-to-seat, wheel zoom, and appearance rebuild. No runtime errors were observed.
- Existing job data, workbook, authenticated Supabase bridge mock, leader election, timeline replay, and leader failover tests passed.

**Scope:** locally verified. The repaired package has not been deployed to your live GitHub Pages site or tested against your live Supabase project. The complete project was reconstructed from your saved V86.15 project, the V86.19/V86.20 patches, and your uploaded V86.21 patch; use the upgrade patch when preserving any newer repository changes.
