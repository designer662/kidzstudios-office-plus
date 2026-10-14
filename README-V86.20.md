# KIDZSTUDIOS Office Plus V86.20 | Full Sitting Animation Rebuild

**Patch type:** Changed files only, applied on top of V86.19. Preserve all other repository files.

## Why this is a rebuild rather than another offset patch

V86.19's seat logic had two limitations: (1) desk IDs in the legacy seat-target table were shifted relative to the actual live roster; (2) imported character legs contained a single rigid mesh per leg and therefore could not bend at the knee during sitting. A floating/offset correction could centre the body but still show wrong leg positions.

## Changes

- Added `public/office-seating-controller.js`, a standalone, deterministic presentation-only state machine: approach > turn > sit > seated > rise > stand. The staff's Supabase navigation root is NEVER moved to compensate for the seated pose.
- Corrected assigned desk IDs to the shipped staff roster: Boss #0, Cikda #1, Minn #2, Afiq #3 and Lisa #7. Nisa and Athira stay standing unless a valid, reachable seat is independently supported by future staff data.
- Articulated knees created from the *existing* male, classic hijab, and casual hijab rigs, by preserving all existing leg mesh shapes/materials and reparenting lower-leg meshes to new knee joints.
- Calibrated the seat pelvis at chair cushion height (0.726 rendered units) accounting for `.42` avatar scale, `.08` scene floor offset, and the enlarged office's X/Z-only scale.
- Applied the exact chair-centered offset in the avatar-local body, not the synchronized root; resets absolutely per frame to prevent accumulated drift.
- Sitting only begins once the character reaches its chair, faces the desk, and is stationary. Rising clears the visual seat correction and returns knees to neutral.
- Old precision code stays for backwards compatibility, but its chair correction is no longer applied by the active rendering loop. The new controller is the single authority for visual seat placement.
- Retained V86.19 expanded office, 25-wall collision geometry, synchronized movement timeline, notifications, audio, Orderforms, Job Management, Supabase and character designs.

## Deployment

1. Extract `KIDZSTUDIOS-V86.20-CHANGED-FILES-ONLY.zip`.
2. Upload/replace matching paths in the existing GitHub repository. Do **not** delete other files.
3. Commit and wait for GitHub Pages Actions.
4. Close older Office Simulator tabs on all PCs, then re-open and hard-refresh (Ctrl + Shift + R).
5. Verify the footer reads `v86.20` and check Boss, Cikda, Minn, Afiq and Lisa sitting at their assigned chairs.

No Supabase migrations required.

## Tests and verification

- `node scripts/test-v86-20-seating-rebuild.mjs` checks real staff chair mapping, turn-before-sit, accurate chair height, 36,000 simulated seated frames, knee pivots, rising, and root stability.
- Older V86.18/V86.19 seating tests (legacy helper and wall collision regression) still pass.
- The GitHub Actions deployment suite includes V86.20's test.
- `node scripts/test-walking-routes.cjs` confirms 432 planned routes, 2220 segments, 0 planner failures.
- `node scripts/check-repo.mjs` checks all HTML pages and JavaScript assets.

**Known limitation:** Browser-based WebGL screenshot validation was blocked in this environment (`net::ERR_BLOCKED_BY_ADMINISTRATOR` for the local preview address). The final visual look must be confirmed after deployment. Audio/character editor scripts remain untouched. Legacy tests which hard-code obsolete releases and old script load orders may fail if invoked manually; they are not deployment gates.
