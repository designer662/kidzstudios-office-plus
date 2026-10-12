# V86.6 Custom Hijab Model — Integration & Test Report

## Request
Replace the current Office Plus V86.5 female character with the user's newly uploaded `hijabi-character (1).js` model, preserving everything else.

## Applied changes
- Replaced the female model geometry in editable source and the prebuilt offline Three.js bundle (`public/office-3d.js`).
- Preserved the newly supplied smooth cheeks/chin, face-depth-aligned eyes/brows/lips, folded hijab opening, pole and seam normal smoothing, continuous scarf fabric, and original long shirt/trousers/shoes.
- Added only the Office Plus-specific head and leg pivot placements and returned `body` in the model API; unchanged uploaded source is saved under `source/reference-models/`.
- Retained existing movement adapter from V86.5 for walking, sitting, gestures, blinking and head turns; male characters stay on the original rig.
- Updated the 3D bundle URL to `office-3d.js?v=86.6` to invalidate browser cache, and updated `public/office-build-info.json`.
- Existing Store, Surau, Toilets, Office Pulse, compact sound controls, no AC hum, and Supabase integration are unchanged.

## Checks
- **27/27 project regression scripts passed** (`scripts/test-*.mjs` and `scripts/test-*.cjs`).
- New model test checks sculpted geometry, seam-normal helper, continuous scarf geometry, offline bundle injection, unchanged original reference, and feature preservation.
- Construction + animation simulation test instantiated the **actual injected model code**, verified both eyes, **27,937 modeled vertices**, walking, seating and gestures without exceptions.
- Repository checker: **0 errors**, including JavaScript syntax, 10 HTML pages and required assets.
- `node --check public/office-3d.js` and `node --check source/src/hijabi-character.js`: passed.

## Limits and deployment precautions
- **No live WebGL screenshot, 3D visual alignment validation, or multi-user Supabase test** in this environment. Inspect scarf/neck clipping and chair seating on actual target browsers before production rollout.
- Three.js source dependencies were not present locally. The shipped precompiled bundle was updated in place; a clean `npm ci && npm run build:3d` in a connected environment is still recommended to verify source-build reproducibility.
- Replacing static `public/` assets does not migrate or modify production data.
