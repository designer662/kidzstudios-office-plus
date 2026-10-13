# KIDZSTUDIOS Office Plus V86.19 | Chair & Wall Repair

**Changed files only.** Copy the included repository-relative files to the matching paths in your existing V86.18 GitHub repository and commit.

## Repairs

1. A single shared geometry module (`public/office-geometry-guard.js`) describes the 25 physical walls and the notched floor outline in existing, *unscaled* floor-plan coordinates. Both the planner and 3D client use it, preserving the 1.5x larger 3D scene while the saved Supabase positions keep their old coordinate system.
2. Existing navigation routes are calculated around physical walls rather than solely around furniture. Doorways remain walkable. Corrected store, Toilet A and Toilet B entrance waypoints.
3. 3D remote-position interpolation uses a wall sweep to prevent visible smoothing across solid partitions. Existing pre-upgrade Supabase route snapshots may remain active until the planner is replaced.
4. Stationary avatars may align their model hips to the exact cushion centre with bounded character-local translation; the authoritative navigation root and stored coordinates are untouched. Known staff are assigned their own chairs. Non-chair showroom staff are not forced to sit.
5. Retains V86.18 enlarged layout, staff clothing/models, chat bubbles, audio, Office Plus tools and shared Supabase timeline. No SQL migration.

## Files included

All paths mirror the GitHub repository root. **Do not upload the ZIP itself into `public/`**. Extract first.

## Verification

- `node scripts/test-walking-routes.cjs`: 432 paths / 2,220 safe segments / zero failed plans.
- `node scripts/test-v86-19-wall-chair.mjs`: wall/floor geometry, open doors, wall-stop interpolation, chair ownership and 36,000 seated simulation frames.
- `node scripts/test-v86-18-office-seating.mjs`: original V86.18 seating checks retained.
- `node scripts/test-v86-16-simulation-rebuild.mjs`, `node scripts/test-movement-timeline.mjs`, `node scripts/test-3d-interactions.mjs`, `node scripts/check-repo.mjs`: pass.

A live WebGL screenshot in the coding environment was blocked, so please verify the actual appearance after GitHub Pages deploy. Close any outdated Office Simulator tabs on all PCs and hard-refresh every PC after deploying the new version to stop outdated controllers from planning through walls.
