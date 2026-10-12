# KIDZSTUDIOS Office Plus V77 | Shared Character Movement Timeline

**Option B: shared timeline**, using the existing authenticated Supabase `ks_shared_state` API, scope `office:movement:v1`.

## How it works

1. The first signed-in dashboard claims a short leader lease with a version-checked (CAS) shared-state write.
2. Only that tab chooses walking destinations and collision-aware A* routes.
3. It publishes whole walking routes, segment durations, and a shared start timestamp. No per-frame updates go to Supabase.
4. Other signed-in dashboards interpolate movement in their own browser using those timestamps, preserving fluid 3D animations while their cameras stay independent.
5. Followers poll every ~2.9 seconds and also react to Supabase Realtime changes to pull an updated snapshot. The planner renews its lease roughly every 5.5 seconds.
6. When the leader goes offline/hidden and its 18-second lease expires, a visible dashboard takes over via an atomic version check. A reconnecting client will load the latest snapshot and resume the timeline.

**Note:** Different computers may have slightly different system clocks/network latency, so movement positions may differ briefly. Staff states and routes remain shared, but this is an illustrative office simulation, not a physical employee-tracking system. If Supabase is unreachable, the shared simulation pauses rather than allowing each PC to generate conflicting routes.

### No database migration

The implementation reuses the existing `ks_shared_state` table and `ks_save_shared_state` function with `expectedVersion` conflict protection. No schema updates or additional Supabase credentials are needed.

### Tests

`node scripts/test-movement-timeline.mjs` runs mocked two-browser authority election, follower behavior, deterministic interpolation, validation, and failover. The test is also included in the GitHub Pages deployment workflow.

All V76 features, including staff profiles, moods, camera controls, notification sound, job management, and Excel tools, are retained.
