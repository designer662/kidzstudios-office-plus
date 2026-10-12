# KidzStudios Office Plus V86.6 — Refined Custom Hijabi Character

Baseline: V86.5. Female 3D staff use the newly supplied `hijabi-character (1).js` model.

## Changed
- Updated women's 3D model with smoother rounded cheek/chin surface, sculpted hijab face opening, seamless-normal corrections, and continuous scarf connections.
- Kept user model sphere geometry density (32 x 24) and mesh/volume caches (48 x 32) without further simplification.
- Preserved the original geometry and constants while adding head/hip animation pivots for walking/sitting/head motion.
- Retained male rig, compact Day/Night + Sound On/Off controls, no aircond drone, Store/Surau/Toilet simulation, Office Pulse and existing database code.
- Bundled the update in `public/office-3d.js` for offline use. No runtime model import or new CDN dependency.

## Files
- `source/reference-models/hijabi-character-v86-6-original.js`: user's unchanged uploaded model
- `source/src/hijabi-character.js`: Office Plus pivot-adapted updated model
- `source/src/hijabi-office-adapter.js`: V86.5 movement adapter retained
- `public/office-3d.js`: shipped offline 3D bundle with updated female model

## Install
Publish or replace with `public/` from this ZIP using the existing project deployment flow. Hard refresh the browser after deploying.

## Verification
See `AUDIT-V86.6.md`. Automated tests cannot replace live WebGL visual checks for sitting alignment, clipping and shadowing. No live Supabase data is changed by this package.
