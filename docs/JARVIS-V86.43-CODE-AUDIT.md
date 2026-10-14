# KidzStudios Office Plus — Jarvis V86.43 Audit & QA Report

**Date:** 14 October 2026  
**Original:** V86.42 Production Source  
**Release:** V86.43 Jarvis Audit, Debug & Optimization  
**Status:** 24/24 isolated tests PASS, web production verification still gated.

## 1. Confirmed bugs and fixes

| Area | Observed problem | Fix | Verification |
| --- | --- | --- | --- |
| Authentication | When an approved staff session fails membership verification due to network loss, Retry calls `init()` and created a second login gate and sign-out element. | Idempotent `makeGate()` initialization. | Chromium offline→retry→authenticated smoke PASS; single gate and signout, no browser exceptions. CI Chromium regression added. |
| Background sync | Config was polled alongside page state every 3.5 seconds, even when unchanged. | Separate 60-second fallback config poll, coalesced requests. | JS runtime fixture PASS. |
| Shared state Realtime | Updates for unrelated shared-state scopes triggered redundant page/config fetches. | Filter by `payload.data.record.scope` when supplied and retain legacy fallback. | Runtime fixture PASS. |
| Unsaved edits | Closing a tab while shared changes were pending had no user-facing warning. | Native `beforeunload` guard while dirty, saving or conflicted. | Runtime fixture PASS. |
| Dashboard | Chat, office events, jobs and staff all repeatedly polled regardless of active Supabase Realtime. | Longer 15–20s fallback when connected, original fast polling restored when disconnected; scope filtering of staff vs job updates. | Four-loop VM runtime regression PASS. |
| 3D performance | Repeated linear `humans.find` and `nameLabels.find` lookups on animation-frame hot path. | Indexed Map lookups for human and label IDs, without changing simulation logic. | AST/text regression and TS source syntax parsing PASS; compiled WebGL not yet validated. |

## 2. Audit scope

- 10 HTML pages and shipped public JS passed syntax/asset wiring tests.
- 29 public JavaScript files checked for exact SHA-256 duplicates: none.
- Named function declarations within non-minified public JS: no repeated declarations found by structural scan.
- Existing Job Management validation/save, Office Pulse, action queue, date filters, delete modal, click-away, public Supabase bridge and optimistic version protection all pass regression checks.
- Existing staff and jobs are held in Supabase, not in the source ZIP; this patch does not migrate or reset them.

## 3. Performance intent (not a production benchmark)

| Network activity | V86.42 timer | V86.43 when Realtime connected | Without Realtime |
| --- | ---: | ---: | ---: |
| Global config | 3.5 s | 60 s | 60 s |
| Office events | 2 s | 15 s | 2 s |
| Staff roster | 2.5 s | 15 s | 2.5 s |
| Jobs | 3.5 s | 15 s | 3.5 s |
| Chat | 3.5 s | 20 s | 3.5 s |
| Page form state | 20 s | 20 s + live change events | 3.5 s |

The interval values are configured cadences; real network traffic and actual 3D FPS have **not** been benchmarked on production devices.

## 4. Test report

- `reports/QA-V86.43-Results.json`: **24 of 24 independent tests PASS**.
- `node scripts/run-stability-suite.mjs`: **9 of 10 PASS**, one blocked by absent `source/node_modules/three`.
- Chromium auth retry smoke using local Python Playwright: **PASS** (initial offline network error then success on Retry; exactly one overlay and one signout).
- Source TypeScript scene syntax: **PASS** via installed TypeScript transpiler.
- Full `npm ci`, production 3D build, WebGL acceptance and live Supabase tests: **not validated locally**. The CI workflow strictly enforces build integrity and browser acceptance.

## 5. Remaining priorities

**P0** Pass the locked dependency 3D build, simulator and Chromium acceptance in GitHub Actions. Test real staff roles and Supabase RLS on staging prior to production.  
**P1** Introduce per-job database rows if the shared jobs payload approaches 440 kB; test multi-user merge/conflict and data backups.  
**P2** Profile GPU render time and DOM layout on mobile under real staff load; consider on-demand panel rendering if profiles grow.

## 6. File integrity and release instructions

Use the full-source ZIP for repository deployment; use essential-files-only ZIP to overlay an **identical V86.42 Production Source** tree. Always copy modified files preserving paths and push them as a GitHub commit. Do **not** directly publish the ZIP's unrebuilt `public/` folder to production. Release metadata and package lock both show V86.43.
