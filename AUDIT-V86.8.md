# KidzStudios Office Plus V86.8 — Male Character Studio Audit

## Changes
- Supplied `male-character.js` retained unchanged at `source/reference-models/male-character-original.js`.
- Adapted source at `source/src/male-character.js` adds hip joints for the existing Office Plus walking/sitting rig and includes `body` in the model API (required by animations).
- New `source/src/male-office-adapter.js` integrates 5 hairstyles (`fade`, `quiff`, `sidepart`, `korean`, `messy`), validated `#RRGGBB` hair/shirt/pants colours, and optional glasses.
- Existing male staff automatically use the new semi-casual male model, even when their V86.7 appearance record says `model: classic`.
- `public/office-3d.js` is the updated **self-contained/offline 3D bundle**. Male and female characters retain the same movement system and selected-character interaction region.
- Edit Staff now has hairstyle selector, 8 hair-colour presets and custom picker for male staff; glasses and clothing colours remain shared; existing female hijab outfit/scarf colour settings are preserved.
- `office:staff` saved data continues using the same shared appearance JSON object. There is no database schema migration.
- Page HTML, `public/office-build-info.json` and version footer are marked V86.8. The root `office-release.json` and stamping utility also support the dotted release number.

## Verification
- `node scripts/check-repo.mjs`: 10 pages, JS/inline JS and SQL checks; **0 errors**.
- Automated regression scripts: **29 of 29 passed**.
- New `scripts/test-v86-8-male-studio.mjs`: verified shipped bundle model construction for all five hairstyles, colour/visibility controls, eye meshes, glasses toggle, animation API, safe input normalization, continued female model presence.
- Chromium browser `page.set_content` smoke test with actual `office-character-studio.js` and CSS at desktop (1100px) and mobile (390px): both passed editor UI control visibility, input handling, gender switching and horizontal overflow checks.
- Both `source/src/male-character.js` and `source/src/male-office-adapter.js` passed Node.js parser syntax validation.
- **Not verified:** Full live WebGL render, physically accurate chair contact/clipping, and multi-client Supabase persistence on production deployment. Those need staging/live browser QA.

## Deployment: GitHub Pages
To update `https://designer662.github.io/kidzstudios-office-plus/`, push **all updated `public/` contents** to the repository `public/` (and scripts/workflow/source if preserving development history). Merely uploading the ZIP to a different folder or replacing a single `.js` file will not update the live site. Check `/office-build-info.json` after the GitHub Pages workflow finishes: it must report `86.8`. Refresh with `Ctrl + Shift + R`. Then open Office Pulse > Staff > Edit Staff and save a male character’s preferences.
