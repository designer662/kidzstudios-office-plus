# KidzStudios Office Plus — V86.4 integration report

## Scope
Update from V86.3, retaining original Office Pulse, jobs, staff, chat, tools, walking routes and shared data. Three requested UI/audio changes plus replacement of the female 3D character with the uploaded TypeScript model.

## Changed behavior
1. Removed Jump to Room selector, script and CSS rules. Existing clickable room navigation remains.
2. Simplified the floating strip to a Day/Night indicator and a single Sound On/Off button. Previous activity, volume, preview and playback message elements are gone; sound preference is still persisted.
3. Removed continuous air-conditioning/fan sound generators. Occasional simulated keyboard, footstep and social sounds remain opt-in; notification sounds are separate.
4. Replaced female staff's simple hijab with the supplied rose hijab model: open-front hood, scalp coverage, throat/neck cover, shoulder drape, tailored front tail. Updated TypeScript source and shipped self-contained JavaScript. Explicitly retained the prior coffee-only animation guard to avoid cups during prayer/toilet breaks.

## Validation
- 25 of 25 automated regression scripts passed.
- `scripts/check-repo.mjs`: 10 HTML pages, shipped JS, inline scripts, SQL section checks; 0 errors.
- TypeScript `transpileModule`: 0 syntax diagnostics.
- Character model assets are procedural 3D geometry, already compiled into `public/office-3d.js`; no additional external models are required.
- WebGL live render not verified: Chromium could not obtain a WebGL context in this sandbox.
- Real deployment / Supabase multi-user behavior not verified; no schema changes were made.

## Known considerations
- The source build tools (`three`, `esbuild`) were unavailable locally, so the shipped self-contained bundle was patched to match the newly supplied TypeScript model. Future source rebuilds should be checked against the bundled result.
- Sound defaults respect the existing local-storage preference; some browsers require user interaction before enabling audio.
- Deploy all files under `public/` together. Avoid updating only `office-character.ts` since browsers run `office-3d.js`.
