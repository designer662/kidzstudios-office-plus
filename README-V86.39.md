# KIDZSTUDIOS Office Plus V86.39 — Smart AI Staff Mobility Recovery

**Built from:** Full V86.38 GitHub-ready repository (Office Pulse V2 + Job Management Action Queue + V86.36 Smart AI lifecycle).  
**Change scope:** Smart AI scheduling, shared collision clearance, furniture-start visual recovery, and regression tests.  
**Database changes:** None. **New npm dependencies:** None. **Deployment performed:** No.

## What was actually wrong

1. **Long-desk-time priority:** `chooseSmartIntent()` returned an AI desk-work decision before reaching its existing 115-second mobility opportunity. A persistently desk-preferring character could remain stationary despite open destinations.
2. **Blocked route back home:** When already away from their home room, the planner offered **only** the homeward route. A congested doorway led to repeated identical failures. The homeward route remains first; bounded, capacity-checked alternative goals are now considered when that route cannot be reserved.
3. **Permanent parked-desk collision:** `routeHasClearance()` enforced the full 1.85-unit moving-pedestrian gap around every stationary employee, including those parked at their assigned desks. The **real V86.38 showroom route** passed 1.7 units from a colleague's desk and could be rejected forever. V86.39 allows **1.45 units only** for an authenticated staff-directory match parked within .65 units of their assigned desk. The original 1.85-unit gap remains for moving or unrecognized characters.
4. **3D follower trapped in a furniture collision box:** `followSceneTarget()` could not move from a chair/worktop-covered initial position because navigation A* refuses a blocked starting cell. A narrow geometry-checked outward departure now works **only when the authoritative timeline says walking**. Structural walls and other furniture remain impassable. There is no teleport or additional independent route writer.

Some desk work, meetings and equipment interactions are intentionally stationary; this release **does not make characters move constantly**.

## Updated or added files

- `public/office-movement-sync.js` — enforced periodic mobility consideration, detours for congested returns, tighter distinction between desk-parked and moving collision gaps.
- `public/office-geometry-guard.js` — wall-safe, furniture-only start recovery predicate.
- `source/src/office-navigation.js` — uses the predicate for 3D follower movement from an obstructed furniture start.
- `public/index.html` — versioned asset references for geometry, shared scheduler and rebuilt 3D bundle (`?v=86.39`).
- `scripts/test-v86-39-staff-mobility.mjs` — new red/green regression tests for these failure modes.
- `scripts/stability-suite.mjs`, `scripts/test-stability-runner.mjs` — register and verify the new strict regression check.
- `scripts/test-v86-29-smart-ai.mjs`, `scripts/test-v86-30-furniture-ai.mjs`, `scripts/test-v86-36-activity-lifecycle.mjs` — update cache-version assertions, preserving existing behavior checks.
- `office-release.json` and this README.

## Reproduction evidence and tests

The new regression originally failed on the V86.38 early-return logic. Additional isolated assertions failed before the desk-clearance, alternative-route and 3D follower corrections and pass after the change.

The real baseline's showroom worker could not reserve a corridor departure while a colleague stood at a nearby assigned desk. In a mocked browser execution with the existing route planner, that worker now receives a committed corridor walk after the collision safety correction. This is a source-level browser reproduction, **not** a live Supabase/Three.js verification.

From repository root:

```bash
node scripts/test-v86-39-staff-mobility.mjs
node scripts/test-v86-36-activity-lifecycle.mjs
node scripts/test-v86-30-furniture-ai.mjs
node scripts/test-v86-29-smart-ai.mjs
node scripts/test-v86-28-synchronized-walking.mjs
node scripts/test-movement-timeline.mjs
node scripts/test-stability-runner.mjs
node scripts/audit-runtime-wiring.mjs
node scripts/check-repo.mjs
```

To verify the **actual rebuilt 3D viewer** (GitHub Actions performs these steps):

```bash
npm ci --prefix source
npm run build:3d --prefix source
node scripts/run-stability-suite.mjs
node scripts/test-v86-22-browser.mjs
```

### Build limitation

This offline environment could not download `three@0.180.0` (npm returned `EAI_AGAIN`). The source-side 3D fix is included in `source/src/office-navigation.js`, but the archived `public/office-3d.js` is still the prior generated bundle. **GitHub Actions must run the existing `npm ci` and `build:3d` steps before deploying.** Do not publish the extracted `public/` folder by itself without rebuilding the 3D bundle. The local stability suite completed 9 of 10 checks; the remaining `test-v86-22-simulation.mjs` requires Three.js.

## Live acceptance test before production use

1. Open Office Plus in two authenticated browsers and confirm one shared simulation leader and matching staff positions.
2. Watch the showroom staff near the desk cluster: they should be offered a safe corridor/nearby destination, rather than remaining on `Waiting for clear route` indefinitely.
3. Confirm another staff member visibly stands up and walks away from a desk without a frozen 3D body while the 2D position moves.
4. Place a second worker on an intersecting walking route: the normal **1.85-unit moving-person clearance** must still block collisions.
5. Interrupt and restore the network; the last accepted state must remain visible and the rightful leader must resume writing.
6. Check that legitimate seated work, equipment interactions, Office Pulse, Job Management, imports/exports, Supabase and mobile layouts are unaffected.
7. Verify the **new commit's** GitHub Actions workflow completed every step, including the rebuilt WebGL browser test.

No guarantees of universal movement are made when all safe paths or shared-state services are unavailable. The scheduler should wait rather than cross walls, overlap walking people or teleport.
