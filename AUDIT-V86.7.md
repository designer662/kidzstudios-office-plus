# KidzStudios Office Plus V86.7 — Character Studio Audit

## Scope
Base: **V86.6 Refined Hijab**. Added the user's `hijabi-character-semi-casual.js` model alongside the existing classic long-shirt model. Existing male characters, Office Pulse, Job Management, Supabase bridge, Store, Surau, Toilets, sound settings, and staff movements are preserved.

## Features delivered
- **Edit Staff → Character customization**: choose **Classic Long Shirt** or **Semi-Casual Shirt** for female characters.
- **Colors**: individually select hijab, shirt, and pants colours using curated 8-colour palettes or the native colour picker; guards enforce `#RRGGBB` values.
- **Glasses**: staff-specific on/off option on both female models and the existing male model.
- **Male staff**: existing character shape retained; shirt, pants and glasses are customizable.
- **Preview**: lightweight, accessible approximate 2D avatar to see colours/outfit/glasses before saving (not a full WebGL preview).
- **Shared persistence**: `appearance: {model, scarfColor, shirtColor, pantsColor, glasses}` is serialized with the existing `office:staff` records. Reading older records produces backwards-compatible defaults. Model changes refresh the 3D roster through its existing staff polling/rebuild mechanism. No database migration was added.
- **Offline**: `public/office-3d.js` has both models and glasses/colour logic in the self-contained bundle; there is no new runtime CDN fetch.

## Verification
- **28 / 28** repository regression scripts passed (including the V86.7 persistence/validator/UI/model integration assertions and mocked female model construction/animation tests).
- `node scripts/check-repo.mjs`: **10 HTML pages checked**, shipped JavaScript and inline scripts checked, **0 errors**.
- `node --check` succeeded on `public/office-3d.js` and `public/office-character-studio.js`.
- Browser fixture in headless Chromium using the real Editor DOM, CSS and JavaScript passed desktop/mobile controls, palette, glasses toggle and gender-dependent controls; screenshot: `kidzstudios-v867-character-studio-preview.png` distributed separately.
- Mocked Three.js construction covers **Classic glasses on**, **Semi-Casual glasses on/off**, eye meshes, style selection, movement and sitting calls without JavaScript exceptions.

## Limitations
- Headless Chromium here did not provide a functioning WebGL context. Full visual verification of the actual office 3D scene and seated/clipping alignment is still necessary on a machine with WebGL enabled.
- Live Supabase authentication, multi-user concurrent writes, and deployed end-to-end real-time sync were **not** tested. Existing `office:staff` save semantics were reused rather than rewritten.
- The offline `public/office-3d.js` was patched to match the source adapter because local `three`/`esbuild` dependencies were not available for a fresh package build. The new model is included in both sources and shipped bundle, with runtime construction tested in a mock Three.js harness.

## Use
Deploy `public/` using the same workflow as previous versions. Open **Office Pulse → Staff → Edit Staff → Character customization**, select outfit, colours and glasses, then click **Save staff**. Changes appear in the 3D office on successful save and should propagate to other connected clients at the next staff poll. Hard refresh after deployment if the older bundle is cached.
