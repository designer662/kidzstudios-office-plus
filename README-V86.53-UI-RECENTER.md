# KIDZSTUDIOS Office Plus V86.53 UI Recenter Patch

Focused UI update on top of the V86.53 cinematic-auto-rotate build.

## Changes
- Moved the 3D quality control beside Fullscreen in the top control group.
- Kept automatic cinematic camera rotation enabled by default.
- Centered the desktop Chat launcher and chat panel to the viewport.
- Centered the Following chip to the viewport so it no longer drifts with panel layout.
- Preserved Reset AI, Fullscreen, Smart AI, furniture interactions, Office Pulse, and Job Management.

## Changed files
- public/index.html
- public/office-index-controls-v86-53.css
- public/office-living-office.js
- scripts/test-v86-53-controls-layout.mjs

## Verification
- node scripts/test-v86-53-controls-layout.mjs
- node scripts/check-repo.mjs
