# KidzStudios Office Plus V86.7 — Character Studio

**Baseline:** V86.6. Adds user-supplied semi-casual female model while keeping the classic model.

## How to customize a character
1. Open Office Plus → Office Pulse → Staff → choose an employee → Edit Staff.
2. Choose Character gender. For female characters choose Classic Long Shirt or Semi-Casual Shirt.
3. Select Hijab, Shirt and Pants colours with swatches or a colour picker; turn glasses on or off. Male characters support Shirt/Pants colours and Glasses.
4. Click Save staff. This saves the `appearance` object inside the existing shared `office:staff` record. Another browser will update after its usual staff poll.

Changes do **not** apply to live 3D until Save staff succeeds. The 2D preview is illustrative, not a true WebGL preview.

## Files
- `source/reference-models/hijabi-character-semi-casual-original.js` — unchanged uploaded model
- `source/src/hijabi-character-semi-casual.js` — head/hip pivots adapted to Office Plus
- `source/src/hijabi-office-adapter.js` — two female models + custom colour + glasses
- `public/office-3d.js` — offline self-contained Three.js bundle updated
- `public/office-character-studio.js/css` — UI, validation and colour controls

## Verification
See `AUDIT-V86.7.md`. A true WebGL browser visual smoke test on your deployment remains recommended.
