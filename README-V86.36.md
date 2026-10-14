# KIDZSTUDIOS Office Plus V86.36

## Smart AI Activity Lifecycle & Recovery

**Source baseline:** The exact user-uploaded `KIDZSTUDIOS_Office_Plus_V86_35_Full_GitHub_Ready(1).zip`.

### What changed

- Staff activity phases are derived from the *existing committed schema-1 movement timeline*: `waiting`, `walking`, `returning`, `aligning`, `interacting`, `activity`, `completing`, and `ready`.
- The leader can indicate an outbound `return` inside an optional, strictly validated `walk.kind`. Older schema-1 payloads without that field remain valid; **no migration is needed**.
- Staff who cannot reserve a real route or workstation remain in place with the existing `action='waiting'` and `nextAt` retry timestamp. Other browsers can display the wait from the shared snapshot.
- The scheduler does not interrupt active scenes if a stale `nextAt` becomes due.
- Equipment scenes with a walking route that starts *before arrival* are rejected by the shared payload validator.
- The small existing Smart AI badge now distinguishes loading, walking, aligning, using equipment, waiting, ready, empty, and synchronization failure. It announces updates accessibly and stays within mobile viewports.
- The existing furniture occupancy guard is reused, not duplicated.
- No additional API requests, polling timers, libraries, database tables, migrations, or external AI calls were introduced.
- The existing 3D renderer, office geometry, staff model and job management code remain unchanged.

### Technical design

`OfficeMovementTimeline.phaseAt(staff, timestamp)` is a pure, testable view over shared state. It does not affect physics or persist redundant phase fields. The `OfficeMovementTimeline.evolve` leader remains the only scheduler and writer. Followers only render the committed route, equipment start time, and retry state. The unchanged optimistic concurrency mechanism protects the timeline.

### Updated files

- `public/office-movement-sync.js` (phase derivation, retry state, scheduling guard, bounded validation)
- `public/office-furniture-interactions.js` (badge text, accessible state feedback)
- `public/office-smart-ai.js` (compact badge on narrow screens)
- `public/index.html` (cache-bust changed JavaScript assets)
- `scripts/test-v86-36-activity-lifecycle.mjs` (new regression coverage)
- `scripts/stability-suite.mjs` (include new regression in CI)
- `scripts/test-stability-runner.mjs` (verify the expanded strict suite)
- `scripts/test-v86-29-smart-ai.mjs`, `scripts/test-v86-30-furniture-ai.mjs` (update version expectations, preserve all prior assertions)
- `office-release.json` (86.36)
- `README-V86.36.md` (this file)

### Verification commands

```bash
node scripts/test-v86-36-activity-lifecycle.mjs
node scripts/test-v86-30-furniture-ai.mjs
node scripts/test-v86-29-smart-ai.mjs
node scripts/test-movement-timeline.mjs
node scripts/test-living-timeline-sync.mjs
node scripts/test-stability-runner.mjs
node scripts/audit-runtime-wiring.mjs
node scripts/check-repo.mjs
```

With dependencies installed, also run:

```bash
npm ci --prefix source
npm run build:3d --prefix source
node scripts/run-stability-suite.mjs
node scripts/test-v86-22-browser.mjs
```

**Known verification limit:** `test-v86-22-simulation.mjs` requires `source/node_modules/three/build/three.module.js`. The ZIP correctly carries package manifests, not installed `node_modules`; that test therefore cannot complete until `npm ci --prefix source` is run. Test the built 3D interface in an authenticated desktop and mobile browser with two connected sessions before merging into production.

### Manual acceptance

1. Open the office while authenticated. The badge should report loading, then ready when the shared state arrives.
2. Observe one staff member plan a route, walk, align at a fixture, interact, complete and return by the normal navigation planner.
3. Let two staff request an occupied fixture; verify that only one uses it, while the other waits or selects a valid alternative.
4. Disconnect the network temporarily, then restore it. The last valid positions should remain visible and the shared state should recover without generating an independent simulation.
5. Open the same office in two authenticated browsers; confirm the same staff coordinates and activity moments.
6. Verify that `dashboard:jobs` data, existing Job Management, mobile controls, and reduced-motion support are unchanged.

### Safe GitHub Website deployment

Extract the ZIP and upload **its contents**, preserving the `.github`, `public`, `scripts`, `source`, and `supabase` folders at repository root. Prefer a new branch and review the GitHub Actions result before merging. Avoid uploading the ZIP itself to the repository as if it were extracted source. No deployment was performed during creation.
