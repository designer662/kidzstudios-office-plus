# Jarvis V86.5 Integration and Test Report

## Scope
Integrated the user-provided `hijabi-character.js` geometry for all `female` staff while preserving the V86.4 Office Pulse, Job Management, Store/Surau/Toilet simulation, compact sound controls and male character design.

## Implementation
- Source: `source/src/hijabi-character.js` (tailored shirt, continuous scarf shell, separate scarf bands, eyes, sneakers), `source/src/hijabi-office-adapter.js`, and routing in `source/src/office-character.ts`.
- Bundle: `public/office-3d.js` patched with the model and adapter, so it works offline without fetching Three.js externally.
- Animation: head pivot adjusted, hip pivot groups added, whole-limb walking/sitting/emote adaptations, blink and gaze retained. No cup on female break animations.
- Performance: capped surfaces at 72 x 40 segments; sphere and tube segments reduced to limit per-character mesh cost (test records 36,354 geometry vertices for the model in a geometry-stub test).
- Interaction: scale-compensated female selection collider and focus ring.
- `public/index.html` uses `office-3d.js?v=86.5` to bust previous browser cache.
- Original model preserved at `docs/hijabi-character-upload-original.js`.

## Test results
- **26 / 26** automated regression scripts passing.
- `scripts/check-repo.mjs`: **0** errors; scanned shipped JavaScript and inline scripts across ten HTML pages and SQL schema.
- Both changed TypeScript source files transpiled without syntax diagnostics.
- New V86.5 runtime-stub test instantiates the exact code embedded in the offline bundle, locates the sculpted hijab, verifies 2 eyes, bounds geometry complexity and exercises walk/sit/wave paths.

## Limitations and verification still needed
- The runtime-stub test is not a real WebGL render; cloth clipping, shading, seating alignment and frame rate need inspection on a browser that supports WebGL.
- The supplied character was not a skeleton compatible with Office Plus; whole arms and legs are rotated using custom pivots. Elbow/knee bending is not full skeletal retargeting.
- Live production Supabase and multi-user movement synchronization were not exercised in this container.
- Building from editable source with `npm run build:3d` requires the `three`/`esbuild` npm dependencies. They were not downloadable in the build container, so the distributed offline bundle was patched and independently syntax/runtime-stub checked. A standard source rebuild is possible in a connected environment.
