# KIDZSTUDIOS Office Plus V66 — Centered Header + Safer Staff Simulation

- Centers the tool shortcut group across the header on wide desktops; retains safe scroll on narrower screens.
- Rebuilt furniture collision rectangles to match major worktops in the shipped 3D model, rather than small desk label points.
- Prevents diagonal corner-cutting and validates every simulated walking segment against expanded furniture outlines.
- Uses A* with a heap for faster route planning, and retains stand-up/desk docking instead of animating through tabletops.
- Improves walking concurrency accounting when the planner cannot find a route.
- Existing emojis, Supabase sync and Excel import/export are preserved.

Deploy the *contents* of this repository ZIP on the main branch. No Supabase database migration is needed. Recheck in a WebGL-capable browser.
