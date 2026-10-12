# KIDZSTUDIOS Office Plus V79 | Living Office+

V79 expands V78's **shared Supabase movement/behavior timeline**, retaining the V77 CAS-elected leader. **Illustrative** animations do not represent verified employee activity or attendance.

## Eight upgrades

1. **Smart department routines:** Expanded weighted activity palettes. Creative teams design, type, review and stretch; sales staff make calls and handle follow-ups; management plans and reviews; production performs task review; finance/admin processes paperwork. Tasks rotate at appropriate intervals without ignoring live assigned work. Activity is quieter at night based on Malaysia time.
2. **Staff conversations:** The shared controller can schedule *two-person* conversations and project huddles. It selects a walking route to one of two corridor meeting places. Both characters orient to each other, share one start time and show the same cue on other PCs. Social cooldown avoids repeated consecutive meetings.
3. **Desk gestures:** The prebuilt Three.js bundle and TypeScript source include differentiable animation for designing, administration, production, planning and meetings, plus previous typing, telephone, reading and stretching animations. Gentle weight transfer enhances walk transitions.
4. **Breaks and meetings:** Pantry trips include a brief simulated coffee cue after arrival. Meeting actions can also occur at the assigned room desk when appropriate. Coffee cup animation, paired huddles and room behavior continue to be shared without frame-by-frame writes.
5. **Dynamic lighting:** Four Malaysia-time color/intensity profiles with interpolated lighting and exposure, minimizing sudden changes. Monitor glow updates are rate-limited to reduce unnecessary GPU work.
6. **Natural walking:** V66 obstacle-aware path routing remains intact; V79 gently accelerates and decelerates on the outer edges of a shared route without altering waypoint timing or introducing different per-PC routes.
7. **Job reactions:** A *real change* in a job/workload fingerprint generates a role-specific non-sensitive cue and a short character acknowledgment wave. No customer/job details or private communications are invented or displayed in the cue.
8. **Ambient sound:** Independent ambient On/Off and **Volume** controls. Both save locally per browser, start muted by default, stop when the tab is hidden, and are separate from alert sounds. A filtered low-volume noise layer simulates distant ventilation and background office roomtone. The browser may require an explicit click before audio starts.

## Live shared behavior

- `public/office-movement-sync.js`: authoritative actions, routes, shared scenes and time-bound job cues.
- `public/office-living-office.js`: local animations presentation, schedules, scene cues, lighting, sound and small overview.
- `public/office-3d.js`: GitHub-ready prebuilt scene with additional poses and wave acknowledgment.
- `source/src/office-character.ts` and `source/src/office-scene.ts`: companion TypeScript scene code.

The shared snapshot remains `office:movement:v1` in existing authenticated `ks_shared_state`. There is **no Supabase migration**. Individual zoom/rotation, audio preferences and lighting presentation remain local. On disconnect/reload, clients use the saved timeline; if the shared backend is unavailable, the simulator does not independently generate competing shared movements.

### Development checks

Run from repository root:

```bash
node scripts/check-repo.mjs
node scripts/test-living-v79.mjs
node scripts/test-living-office.mjs
node scripts/test-living-timeline-sync.mjs
node scripts/test-movement-timeline.mjs
node scripts/test-walking-routes.cjs
```

GitHub Actions runs these plus the existing Excel, Job Management and notification tests. Live browser checks of WebGL, device audio and multiple signed-in Supabase clients are still recommended.

### Deploy

Extract ZIP and upload **repository contents**, including `.github`, `public`, `scripts` and `supabase`. Deploy with GitHub Actions. Your existing `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` variables stay unchanged. Reload with Ctrl+Shift+R. The footer reports V79 plus GitHub's deployment number.
