# Office Plus V86.5 — User-supplied female character model

Baseline: V86.4. The user-provided `hijabi-character.js` is integrated into both editable source and `public/office-3d.js` (offline build).

- `source/src/hijabi-character.js` — original model, with only animation pivot and adaptive mesh-density adjustments.
- `source/src/hijabi-office-adapter.js` — Office Plus character-rig and animation bridge.
- `source/src/office-character.ts` — female models routed to custom adapter; male rigs unchanged.
- `public/office-3d.js` — self-contained offline JavaScript, no runtime CDN dependency.

**Deployment:** Publish the `public/` directory using the same setup as V86.4. Clear cache or hard-refresh after deployment.

**Source rebuild:** In a connected environment, `cd source && npm ci && npm run build:3d` to regenerate the bundled Three.js code from source. The bundle supplied in this ZIP is already patched.

**Important:** Only the new character appearance has changed. The uploaded model has different proportions and does not include separate elbow/knee skeletal meshes; the adapter pivots whole limbs for walking and sitting. This is a best-effort compatibility implementation, not full skeletal retargeting.
