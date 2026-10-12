# KIDZSTUDIOS Office Plus V78 | Living Office

V78 builds on V77's **one-authority Supabase movement timeline**. Staff characters perform illustrative office activities that are synchronized as **timed behaviors**, without per-frame database writes.

## What's new

- **Department-specific desk actions:** Design, customer calls, production, administration and management review. Characters now use corresponding desk, typing, gesture and idle animations, with subtle monitor activity.
- **Paired conversations:** The shared leader occasionally coordinates two available characters walking to safe, separated corridor points. Both PCs show the same conversation cue. The characters turn to face one another after they arrive.
- **Realistic breaks and huddles:** Lightly scheduled pantry coffee breaks and showroom/project meetings, influenced by Malaysia time. They remain autonomous *simulations*, not real employee attendance data.
- **Daylight cycle:** Morning, daylight, evening and office night-lighting profiles update ambient/sun/fill lighting and exposure in the existing Three.js scene, following Asia/Kuala_Lumpur time. Renderer updates locally: no network activity.
- **Natural movement and poses:** Preserves V66 collision-aware A* routing, V76 character click and mouse zoom, and V77 shared path timing. Adds smooth desk/call/chat/review/stretch poses. Routes, actions, pairing, and start/finish times are published together.
- **Job-driven reactions:** When the authoritative planner notices a change in current job or assigned workload, it publishes a brief `New work assignment` scene cue. No job names or private messages are exposed in the scene cue.
- **Ambient office sound:** New `♫ Ambience on/off` toggle above the 3D view. Separate from notification chimes, local to each browser, persisted in localStorage, **off by default**. Low-volume synthesized roomtone requires an initial user gesture. It stops when the tab is hidden.

## Synchronization architecture

The existing authenticated Supabase `ks_shared_state` scope `office:movement:v1` remains the source of truth. No new table or RLS policy is required. The V77 CAS leader lease and version-based takeover are retained. New, optional fields on staff records (`jobKey`, `scene`, `faceTo`) extend the snapshot; they are safe to omit for older snapshots.

One leader chooses routes and actions; followers render the same positions and scene cues from timestamps. Camera angle, zoom, sound choice, and lighting are local to each viewer. User-triggered chat is *not* conflated with simulated conversation labels. If Supabase is unreachable, the shared simulation pauses instead of letting every PC invent divergent behavior.

### Development and testing

Run from repository root:

```sh
node scripts/check-repo.mjs
node scripts/test-living-office.mjs
node scripts/test-living-timeline-sync.mjs
node scripts/test-movement-timeline.mjs
node scripts/test-walking-routes.cjs
```

The prebuilt `public/office-3d.js` is included for GitHub Pages. Matching TypeScript changes are in `source/src/office-character.ts` and `source/src/office-scene.ts` and can be rebuilt with `npm install && npm run build:3d` in `source/` when npm is available. The release environment used to package V78 could not fetch npm dependencies, so its distributed bundle was patched and syntax-checked directly. Browser GPU, audio and multi-device live Supabase testing should be performed after deployment.

## First-run checklist

1. Deploy the repository to GitHub Pages with the existing Supabase variables and RLS migration from earlier versions.
2. Open the dashboard on two signed-in browsers. Confirm staff travel and activity cues agree after the next timeline update.
3. Click an office character and verify that profile/mood controls still work; wheel zoom and camera rotation remain personal to the browser.
4. Use the `♫ Ambience off` button to enable background sound on that device. Notification sound continues to use its own mute control.
5. Test in desktop and mobile browsers, including with reduced-motion settings. Default ambient audio is muted.

**Important:** All displayed work, conversations, breaks and meeting actions are illustrative animations, not evidence of what actual employees are doing in real time.
