# KIDZSTUDIOS Office Plus V86.30: Scoped Smart AI Furniture Interactions

## Scope delivered

Extends V86.29's single-authority Smart AI planner with a furniture interaction registry based on the actual Three.js fixtures. Supported stations: pantry coffee machine, store supply shelf, showroom sample table, and showroom heat press. It does **not** invent a printer model. Staff can reserve one of these stations, walk to its wall-safe approach point, turn toward the physical object, perform an existing animated gesture, display a contextual bubble, and release the reservation before taking another goal.

- **Input:** the existing role-based Smart AI goal, staff IDs, world fixture coordinates, geometry guard and Supabase movement timeline.
- **Success:** committed walk to an exact approach anchor, non-overlapping reservation, correct facing direction and timed activity on all followers.
- **Loading:** the existing Smart AI status badge shows furniture mapping / waiting for the shared timeline.
- **Ready and active:** status badge shows ready or the current furniture activity; the existing live activity bubble describes the task.
- **Empty:** no staff message when the shared timeline is empty.
- **Blocked:** chooses another goal or retries later without teleporting; waiting badge appears briefly.
- **Sync failure:** badge switches to retrying; renderer retains the last known valid positions rather than starting its own movement planner.
- **WebGL unavailable:** the existing 2D office view stays available. It does not display detailed 3D gestures.

## Files included in the changed-files-only release

| Path | Purpose |
| --- | --- |
| `public/office-furniture-interactions.js` | New inventory and occupancy/approach guard |
| `public/office-smart-ai.js` | Allow showroom staff to choose same-room sample inspection |
| `public/office-movement-sync.js` | Reserve furniture, plan exact approach, synchronize action duration and release |
| `public/index.html` | Load furniture module, propagate furniture ID to 3D and bust script cache |
| `source/src/office-scene.ts` | Register actual equipment from scene and face physical fixture |
| `source/src/suite-bridge.ts` | Pass shared furniture activity into character controller |
| `source/src/office-character.ts` | Cup/drink and shelf interaction gestures |
| `.github/workflows/deploy-pages.yml` | Run furniture regression in CI |
| `scripts/test-v86-30-furniture-ai.mjs` | Occupancy, safe anchors, timeline, states, bridge assertions |
| `scripts/test-v86-29-smart-ai.mjs` | Update expected movement loader version |
| `office-release.json`, `public/office-build-info.json` | Release metadata |

**Deployment:** apply the ZIP's files over an existing V86.29 GitHub repository. Keep other files unchanged. GitHub Actions runs `npm ci --prefix source`, rebuilds `public/office-3d.js` from changed TypeScript, tests the bundle in WebGL, stamps the footer version, and deploys `public`. The existing prebuilt V86.29 `office-3d.js` is intentionally **not** included in the patch; it is generated during GitHub deployment. If you do not use the supplied GitHub workflow, you must run `npm ci --prefix source && npm run build:3d --prefix source` yourself before hosting.

**Dependencies:** existing `three`, `esbuild`, `playwright` from `source/package-lock.json`. No extra dependency, external AI API, or Supabase migration. Turn off older open Office Simulator tabs before testing so the leader doesn't publish stale routes.

## Verification

1. In GitHub Actions check that *Rebuild 3D from source*, *Test Office Simulator stability*, and *Test rebuilt 3D in WebGL* are all green.
2. Open the updated site, clear cache (Ctrl+Shift+R), and confirm V86.30.
3. Open the simulator on two PCs; both should show the same characters using coffee station, stock shelf or showroom stations. Give the planner time to select these autonomously.
4. Watch arrival: the staff member should stop in front of a fixture, rotate toward it and perform a relevant gesture, with a floating bubble. The next goal should only begin after the interaction ends.
5. Open both browser consoles; there should be no exceptions. Check that two staff cannot use one-person stations at once.
6. Test crowded paths, temporary network outage and a follower PC reconnection. No crossing walls, jumping chairs, double movement writers, or sudden positional resets.
7. Confirm staff selection, camera follow, emoji controls and Job Management downloads still work.

## Automated verification / limitations

JavaScript syntax, geometry and new furniture tests, V86.29 AI, movement synchronization, 432 wall-safe walking routes and static repository validation passed locally. TypeScript transpilation reported no syntax diagnostics. A local clean dependency installation timed out, so **actual rebuilt Three.js/WebGL visuals and end-to-end GitHub Actions deployment are not verified here**. These must be checked on the deployed site; the CI workflow will rebuild from the included source.

This is a focused rule-based Smart AI interaction feature, not natural-language AI or a complete physics engine. It does not redesign the office or change the job database.
