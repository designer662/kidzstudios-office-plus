# KIDZSTUDIOS Office Plus V80 · Smart Floating Labels

## Overview
V80 fixes overlap between the character name, permanent mood emoji, conversation and workload notifications in the 3D office. The latest version builds directly on the corrected V79 ZIP, keeping all Job Management, Supabase, Live Activity, 3D camera and Living Office features.

## What's changed

1. **Collision-aware labels:** The camera renders normally and a small local layout manager assigns screen-space positions to visible labels every frame. Names are laid out first. Notifications fit into free areas, and hide gracefully if no safe space exists. Room names receive last priority.
2. **Name and mood together:** A character's name and persisted mood appear in the same compact clickable badge. No extra permanent emoji box is created in the 3D scene.
3. **One bubble per character:** Chat and social conversation cues take priority over workload and follow notifications. Unselected queued bubbles may become visible after higher-priority cues expire if still valid.
4. **Less clutter at lower zoom:** Names and moods remain; low-priority workload or follow bubbles are suppressed when the camera zoom is below `0.92` or the 3D viewport is narrower than `600px`.
5. **Auto-expiry:** Workload notifications display for no longer than 6.5 seconds; follow labels for 4.8 seconds. Full workload data remains in Staff Profile and Job Management.
6. **Viewport protection:** All displayed labels are constrained to the 3D viewport so they don't clip off its sides.

### Source files
- `public/office-smart-labels.js`: standalone screen-space label placement and priority rules.
- `public/office-smart-labels.css`: merged name/mood badge and temporary bubble presentation.
- `public/office-3d.js`: 3D renderer integration. The matching source changes are also reflected in `source/src/office-scene.ts` and `source/src/suite-bridge.ts`.

### Tests
- `node scripts/test-smart-labels.mjs`: 250 generated scene layouts, no overlap or off-screen labels, chat priority, compact zoom, mood attachment, and integration assertions.
- `node scripts/check-repo.mjs`: all HTML/JS and Supabase migration checks.
- All pre-existing movement, Job Management, Excel, popup, and notification regression tests.

### Deployment
Extract the ZIP and upload its **contents** at the root of your GitHub repository (`.github/`, `public/`, etc.), not into a nested folder. Commit to `main` and wait for GitHub Pages Actions to complete. Use **Ctrl+Shift+R** to clear old cached scripts. The footer and `public/office-build-info.json` should say `v80` (the footer may include a GitHub Actions build number).

**No Supabase migration required.** Layout and camera positions are per-device; moods and movement remain synchronized. Actual WebGL appearance must be checked in your deployed browser.
