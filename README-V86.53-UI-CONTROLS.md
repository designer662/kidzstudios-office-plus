# KIDZSTUDIOS Office Plus · V86.53 UI Controls Update

Baseline: the exact uploaded `kidzstudios-office-plus-main_5.zip` (repository metadata V86.53).
No database changes, business logic changes, simulation changes or new dependencies.

## Changes

1. Desktop Chat launcher moves to horizontal center of simulator. Existing mobile Chat bottom navigation remains as-is.
2. The existing fullscreen button moves beside **Reset AI** and uses the same rounded pill design.
3. The **Following** character notification moves to the top horizontal center of the office.
4. Zoom Out, Rotate, and Zoom In move beside Fullscreen. The former Home/Reset View button now rotates the model by 15 degrees using the existing rotation handler.
5. The duplicate fullscreen and redundant visible rotation bar are removed from the on-screen toolbar, preserving existing internal readout logic and 3D quality selector.

## Modified files

- `public/index.html`: rotate button, handlers, CSS reference and cache stamp.
- `public/office-living-office.js`: move existing DOM controls beside Reset AI, keeping original listeners.
- `public/office-index-controls-v86-53.css` (new): scoped desktop/mobile layout.
- `scripts/test-v86-53-controls-layout.mjs` (new): targeted CI regression.
- `.github/workflows/deploy-pages.yml`: register targeted test.
- `README-V86.53-UI-CONTROLS.md` (new): release notes.

## Verify

Run from repository root:

```bash
node scripts/test-v86-53-controls-layout.mjs
node scripts/test-v86-53-dashboard-report.mjs
node scripts/test-v86-54-header-parity.mjs
node scripts/check-repo.mjs
```

Then verify in a browser on desktop and at 920, 390, 320 px:

- Fullscreen works and Esc exits.
- Zoom +/- changes scale, Rotate turns the 3D camera or 2D fallback.
- Chat launches from bottom center on desktop; mobile continues to use the existing Chat tab.
- Following chip appears top center and Stop Following closes it.
- No controls overlap or produce horizontal overflow.

Local browser verification is a controlled UI fixture. Full authenticated Supabase/WebGL and hosted Pages behavior require staging verification.
