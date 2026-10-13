# KIDZSTUDIOS Office Plus V86.23 — Staff selection and camera follow fix

**Base:** the user's uploaded `kidzstudios-office-plus-v86-22.zip` (`kidzstudios-office-plus-v86-22-REBUILD/`). Install the **changed-files-only** ZIP on top of that version, preserving paths and existing business data.

## Fixes

- **Staff and Emoji tabs:** Selecting a 3D staff character, a 2D character, or a staff item now opens one persistent staff profile with visible **Staff** and **Emoji** tabs. Emoji choices are inside the profile rather than in an easily overlapped floating picker; they reuse the existing shared mood-save and notification logic. The original fallback picker stays available for legacy workflows.
- **Camera follow:** Clicking a character starts smooth 3D follow with a more readable framing zoom (2.35 instead of 3.2). A simple mouse click does not cancel following. Deliberate camera dragging cancels follow; scrolling and zoom buttons adjust follow zoom without being immediately reset. Following remains local to each PC.
- **Live staff update:** If the 3D scene rebuilds due to staff name/appearance changes, restore the selected staff and camera follow, if that employee still exists.
- **Preservation:** V86.22 furniture-aware seating, wall collision, shared Supabase timeline, job data, staff list, and all other pages are unchanged except version footers.

## Validation

```sh
node scripts/check-repo.mjs
node scripts/test-v86-23-staff-ui.mjs
node scripts/test-movement-timeline.mjs
node scripts/test-walking-routes.cjs
```

GitHub Actions installs `source` dependencies, then **rebuilds** `public/office-3d.js` from the matching `source/src/office-scene.ts` and `source/src/suite-bridge.ts` before deploying.

**Browser verification:** the staff profile and Emoji tab were exercised using Chromium's 2D fallback and displayed correctly on a 1440px viewport. WebGL testing could not complete locally because Chromium could not initialize a GPU context. Confirm follow behaviour in the deployed 3D simulator.

No Supabase migration is required.
