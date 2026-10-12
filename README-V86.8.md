# KidzStudios Office Plus V86.8 — Male Character Studio

- Baseline: V86.7 Character Studio.
- User-supplied model: `source/reference-models/male-character-original.js`.
- Adapted model: `source/src/male-character.js`, and new rig `source/src/male-office-adapter.js`.
- Runtime: `public/office-3d.js` includes the male and female 3D models; no CDN loading required.
- Character Editor: Office Pulse → Staff → Edit Staff → select Male → Hair style (Fade, Quiff, Side Part, Korean, Messy), hair colour, shirt, pants, glasses → Save staff.
- Customizations persist in the existing shared `office:staff` record and are picked up by the normal office polling interval.
- Male model is the new Semi-casual model by default, including existing staff whose V86.7 appearance contained model `classic`.
- Female customization is unchanged.
- The small 2D preview is illustrative, not a WebGL render; verify actual poses with a live browser after deploy.
- For GitHub Pages, deploy contents of `public/` through the existing workflow. Check `office-build-info.json` reports release `86.8`.
