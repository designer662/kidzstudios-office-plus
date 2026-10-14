# KidzStudios Office Plus V86.44 — Smart AI Movement Recovery

This maintenance update starts from V86.43 and changes only the shared simulated movement system and its release/test wiring. It does **not** modify Supabase tables, real employee records, job management data, appearance profiles, access policies, or customer information.

## Confirmed symptoms and causes

- **Historical timeline deadlock:** the shared simulation can repeatedly fail pedestrian clearance and leave staff in `waiting` for many retry cycles. A local 5-minute eight-staff simulation exposed this behavior.
- **Stale state:** old movement reservations or dates far in the future can indefinitely prevent scheduling.
- **Boss / Afiq onboarding:** V86.43 did not migrate their old activity state. The new movement engine performs a one-time, leader-authorized rebuild of those two characters using the roster desk coordinates.
- **No recovery UI:** previously there was no authenticated way to request a scope-limited reset of the shared AI state.

## Fixes

1. Versioned V86.44 simulation migration (`aiEngineVersion: 2`) and one-time Afiq/Boss state rebuild.
2. Recovery of invalid/future route reservations and excessively delayed schedules.
3. Route preference diversification after repeated denied reservations, prioritizing available corridor routes rather than the same blocked appliance/doorway.
4. Recovery of persistent deadlocks after >=6 failed plans and >=35 seconds in `waiting`: **authoritative re-seating to the worker's own desk**, with a cooldown before new trips. This may cause an intentional one-time visual repositioning; it never plots a route through walls. All connected browsers replay the same CAS-committed state.
5. Two unobtrusive control buttons in the 3D office: **Reset Afiq/Boss** and **Reset All AI**. The second requires confirmation. Both use the existing authenticated `/api/state` version-checked write on scope `office:movement:v1` only.
6. Cache-bust updated Smart AI scripts, synchronize release/package-lock version 86.44, add CI/unit regressions and keep existing full build gate.

## Safe rollout

- Use the **Full Source ZIP** when pushing to GitHub Actions, and run the full locked `npm ci`/3D build, Chromium WebGL test, and deployment gates before production.
- The **Essential Patch ZIP** applies on top of **V86.43**, preserving all other files. Do **not** upload only this patch as a complete website.
- Upon successful deployment, the live movement leader migrates Boss and Afiq automatically. Staff can also click `Reset Afiq/Boss` if a pre-deployment browser continues writing stale state. For a wider jam, click `Reset All AI` and accept the confirmation.
- Resets do **not** clear employee data, jobs, Supabase authentication, or profiles. They restart simulated positions/actions and clear AI walking reservations; **Reset All AI** temporarily returns every character to their starting desk.
- The old site version should be closed on other tabs during deployment, and browser cache refreshed if movement UI remains on V86.43.

## Local verification (2026-10-14)

- All 27 selected independently executable Node regression checks passed after updating historical assertions to follow the new asset version.
- Strict 11-test simulation suite: **10 passed; 1 blocked** (`test-v86-22-simulation.mjs` imports `source/node_modules/three`, which is unavailable offline).
- Five-minute eight-staff in-memory scheduler simulation: both Afiq and Boss initiated multiple successful walks; no writes to production data.
- Static HTML/JS/asset, runtime wiring, build integrity and new CAS reset regression checks passed.
- The local Chromium browser attempt was blocked by browser administrator policy (`ERR_BLOCKED_BY_ADMINISTRATOR` on localhost). **Actual WebGL browser acceptance and live Supabase multi-client behavior remain unverified.**

This is a tested maintenance source release, not a certification of successful live production deployment.
