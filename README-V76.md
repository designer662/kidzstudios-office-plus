# KIDZSTUDIOS Office Plus V76 | 3D Character Click + Mouse Zoom Fix

- Fixed 3D staff selection: click-away now waits until the 3D `pointerup` hit-test finishes before dismissing an existing profile. Selecting another worker does not close the newly opened card.
- Clicking a blank part of the 3D office still closes the profile and emoji popup.
- Enlarged the invisible character hit target and added a nearby on-screen fallback hit-test, without changing character size or appearance.
- Restored mouse-wheel zoom by updating the animated camera zoom target directly. Wheel-up zooms in; wheel-down zooms out. Scroll events are intercepted before OrbitControls and prevented from scrolling the page.
- Existing camera buttons, mouse drag rotation, cinematic auto-rotate, Supabase, job management, moods and responsive profile placement remain intact.
- Added `scripts/test-3d-interactions.mjs` and updated click-away regression tests in GitHub Actions.
- Release footer and static 3D/click-away script cache versions updated to v76.

No database migration required.
