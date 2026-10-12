## V83 · Orderform native PNG download hotfix
- Fixed the delayed synthetic download click by preparing Blob URLs in Preview and using native download anchors in Orderform 1 and 2.
- Kept V82 shared-live notifications and all other existing features.

## V81 · Realistic Living Office Ambience (2026-10-12)
- Fixed extremely quiet legacy audio graph and made unlock/restart respect browser autoplay policies.
- Added `public/office-ambience-audio.js` with local procedural air-conditioning, keyboard/mouse, footstep and quiet nonverbal office-murmur layers.
- Sound effects respond to V79/V80's **locally rendered Supabase-shared behavior timeline**, with no extra database writes or audio uploads.
- Added a direct **Preview** button, playback status, independent per-device volume and mute, and background-tab lifecycle handling.
- Preserved V80 labels, synchronized character movement, Job Management, Excel, and the separate notification chime controls.
- Added V81 audio mock regression tests to GitHub Actions. No database migration.

## V80 · Smart Floating Labels (2026-10-12)
- Replaced independent 3D label placement with a frame-by-frame, screen-space collision manager so names, mood icons and temporary notifications do not cover one another.
- Combined mood emoji with each clickable character name tag; the separate permanent mood bubble was removed in the 3D view.
- Only one temporary bubble per character appears at a time; conversations and messages take priority over workload and follow cues.
- Temporary workload bubbles auto-expire within 6.5 seconds; follow cues last 4.8 seconds.
- At low zoom or on narrow screens, low-priority notifications hide while names and moods remain available.
- All floating tags stay within the visible office viewport; room labels yield to staff and active conversation overlays.
- Preserved V79 shared movement/behavior timeline, job-driven reactions, click-character selection, mouse zoom, audio controls, and all office tools.
- Introduced `public/office-smart-labels.js` and `.css` as local assets, plus 250 deterministic layout stress scenarios and GitHub Actions checks. No database migration.

## V79 · Living Office+ (2026-10-12)
- More varied department task palettes and calmer after-hours routines, always illustrative rather than real employee tracking.
- Shared leader plans paired conversations and huddles, using alternating checked corridor points and social cooldowns.
- Added timed pantry coffee-break cues, contextual job assignment cues, and a brief synchronized acknowledgment emote.
- Improved work-related 3D arm/head poses and walking weight transfer in both shipped bundle and TypeScript.
- Smoothed daylight changes over successive frames rather than abruptly switching light levels.
- Added live simulated activity summary and independent per-device ambient volume slider; default sound stays muted and hidden-tab pause is preserved.
- Retained V77 Supabase lease/CAS sync, collision-safe routing, existing notifications, job tools, and Excel.
- Added V79 dedicated test coverage to deployment workflow. No Supabase migration.

## V78 · Living Office (2026-10-12)
- Added Supabase-timed shared behavior states for department tasks, coffee breaks, huddles, paired staff conversations and job reactions.
- Updated Three.js character poses for simulated calls, design/desk work, conversations, reviewing, reading and stretching. Added subtle monitor-screen glow and local daylight profiles.
- Added opt-in ambient roomtone with per-device mute and automatic background-tab pause; notification audio is unchanged.
- Preserved V77 authority election, safe walking routes, independent cameras, moods, Job Management, Excel, and outside-click behavior.
- Added scripted V78 behavior and two-browser timeline regression tests to the GitHub deployment workflow.

## V77: Synced 3D character movement
- Shared Supabase movement snapshots with one version-checked lease owner.
- Smooth follower interpolation from route, segment durations and timestamp.
- Leader handover on disconnect; collision-aware routing preserved.
- Added 2-PC movement-timeline mock tests to GitHub Actions.

## V76 – Character interaction and manual zoom fix
- 3D click selection and blank-area dismissal coordinated without moving the profile ahead of the raycast.
- Increased invisible hit area and added projected proximity fallback for character selection.
- Mouse-wheel zoom now changes the smoothed camera zoom target rather than snapping back.
- Added 3D interaction regression test.

## V75 — Reliable blank-space closing and collision-free Office Pulse (2026-10-12)

- Fixed the 3D `pointerup`/`click` race that could immediately close a newly selected character profile.
- Clicking outside an open staff profile now closes its attached mood picker and camera follow in the same action; clicking the mood picker itself keeps the profile open.
- Added collision-aware staff card layout: dock beside Office Pulse when space permits, otherwise temporarily hide the Pulse panel until the profile closes.
- Keep the emoji picker positioned next to the moved profile rather than over Office Pulse.
- Added real Chromium browser fixture checks and automated pointer/layout regression tests; all 10 pages still share outside-dismissal behavior.
- Bumped auto-stamped release metadata to V75; no Supabase migration required.

## V74 — Click outside to close

- Standardized outside-click dismissal across all 10 pages.
- Preserved modal state through existing Close/Cancel actions.
- Added foreground-first dismissal for Job Management confirmation dialogs.
- Added click-away close for notifications, chat, character mood popup, profile cards, Office Pulse/Live Activity, job dropdowns, and orderform previews.
- Added deployment regression test and bumped release metadata to 74.

## V73 · Current month and synchronized build footers
- Job Management opens with local current month/year selected, while other periods remain accessible.
- Unified footer version across all 10 pages; GitHub Actions stamps a unique build number with every deployment.
- Release number stored in `office-release.json`; no database migration.

## V72 — Bulk delete and row trash controls (2026-10-12)

- Added row checkboxes and filtered select-all in Job Management.
- Added live selection count, clear selection, and multi-delete confirmation.
- Added single-job trash icon immediately after Duplicate in each row.
- Reuses foreground confirmation modal; protects against stale Supabase records and unexpected deletes.
- Preserved Excel, 3D office, moods, notifications and shared state.
- Added dedicated regression test and GitHub Actions workflow check.

## V71 — Delete confirmation display fix (2026-10-12)

- Fixed Job Management Delete confirmation appearing behind its Edit Job modal. The previous CSS assigned a lower stacking level to `#confirmModal` than the editor overlay.
- The Delete confirmation now stays above all job dialogs, with accessible alert-dialog semantics and initial keyboard focus on Cancel.
- Pressing Escape dismisses the foreground Delete confirmation without unexpectedly closing the Edit Job form.
- No changes to saved jobs, Supabase tables, import/export, 3D office, or the rest of the UI.
- Regression test: `node scripts/test-delete-modal.mjs`.

## v70 — data reliability, Google Sheets links, animated moods and smoother 3D

- Added XLSX/CSV/TSV/JSON import and full CSV export, shared previews, duplicate/limit validation and safe save failure handling.
- Added pasted Google Sheets links with tab selection and callback fallback.
- Fixed hidden undated/older jobs, automatic legacy-reference removal, blank mood resets and footer Last sync.
- Added animated moods and Busy; preserved bubbles independently from temporary messages.
- Smoothed geometry, camera damping/zoom, character motion and label height; aligned TypeScript build with public assets.
- Added semantic data and character tests. See README-V70.md for tested limits and setup.

## V69 · Notification Chime
- Added browser notification sound for new office updates, with a soft chat-specific variant
- Added per-PC Sound on / Muted control inside the notifications panel
- No noise for historical events, local dashboard events, hidden tabs, or repeated update bursts
- Applied audio controls and update detection across dashboard and tool pages

## V68 — Cinematic Auto-Rotation (2026-10-12)

- Reduced Three.js OrbitControls autoRotateSpeed to 0.24 from 0.8.
- Preserved automatic startup, zoom, and Supabase features.
- Updated footer and 3D asset cache-busting version.

## V61 · Responsive headers + Excel import/export

- Responsive two-row header fixes overlap throughout all 10 pages.
- Local XLSX reader/writer, Excel import review modal and guarded shared Merge/Replace.
- Current-view, all-jobs and blank-template XLSX exports for 28 columns.
- Preserved V60 auto-rotate and click-character Happy/Sad/Angry/Bad Mood emojis.

# V58.2 – layout, redesign, motion, cleanup

## UI / UX
- **Office Pulse+ redesigned**: full-height side panel, sliding-thumb tabs, KPI tiles with colour accents and count-up numbers, card rows with hover/enter motion, cleaner header.
- **No more clashes on desktop**: the panel, map tools, chat button, live activity, follow chip and the sync/version/note strip each have their own zone (verified at 1440, 1280 and 1024 wide).
- **Mobile app shell (<= 920px)**: bottom navigation (Office / Pulse / Activity / Chat); Pulse, Activity and Chat open as slide-up sheets with a scrim; toolbar becomes scrollable rows; zoom tools float above the nav; sign-out becomes compact.
- **Cinematic intro after sign-in**: letterbox + title card, slow zoom-in with a gentle orbit, then the UI glides in and the camera hands over to slow auto-rotate. Click, tap, scroll or any key skips it. Respects reduced-motion.
- **Page transitions** on every page (Job Management, calculators, order forms ...): content fades out with a progress line, then glides in on the next page.

## Cleanup
- Removed unused/obsolete files: `public/app.js`, `public/styles.css`, the whole `legacy/` folder (Netlify functions, old migrations, 624 KB preview image), old patch/build scripts and a duplicate head test in `source/scripts`.
- `public/netlify-sync.js` renamed to `public/shared-sync.js`; leftover "Netlify" wording in the UI now says Supabase.
- `source/package.json` no longer pulls Netlify packages.

# V58.1 – debug, review and UX pass

## Bugs fixed
- **Realtime died after ~1 hour**: the refreshed access token was never sent to the open WebSocket. It is now pushed on every refresh.
- **Realtime reconnect delay was wrong**: the reconnect counter was also used as the message ref, so back-off drifted to the 24s ceiling. Separate counters now; back-off resets on a successful join.
- **Signed out by a network blip**: any network failure at start-up or refresh cleared the saved session and said "not approved". Network errors now keep the session and show a Retry button.
- **Multi-tab sign-out**: two tabs refreshing the same token could log each other out. Tabs now adopt a token refreshed by another tab, and sign-in/out propagates through the `storage` event.
- **Unsaved edits overwritten**: `shared-sync.js` applied remote data on top of fields still being typed. Remote data is deferred while a local save is pending.
- **Edits lost on tab close**: saves now use `keepalive` and a `pagehide` flush.
- **Excess traffic**: pages polled every 3.5 s even with realtime connected; now 20 s when realtime is joined.
- **SQL migration could not be re-run** (policies already existed). Policies are now dropped first.
- **Flash of the private dashboard** before the sign-in gate appeared: page content is hidden until authenticated.
- **False "fallback mode" banner**: a single stray promise rejection (or a pre-login 401) triggered a permanent banner. It now needs repeated real errors, auto-hides and can be dismissed.
- Unpinned CDN scripts (`flatpickr`, `canvas-confetti`) pinned to exact versions.
- Removed duplicate `deploy-pages.yml` from the repo root (the live one is `.github/workflows/`).
- Version badge said v53; now v58.

## UI/UX
- Sign-in: show/hide password, autofocus, error announcements (`role=alert`), dark-mode support, "Signing in…" feedback, Retry on connection errors.
- Sign-out button moved into the header instead of floating over content.
- Text below 10px (about 250 declarations) raised to 10px.
- Visible focus rings, 44px touch targets on touch devices, reduced-motion support, print rules (`public/office-ux.css`).
- Status chip and version badge no longer overlap; stray horizontal scroll removed.
- Temp-user dialog returns focus to its trigger when closed.

## Not changed (needs your decision)
- Default Google Sheet / Drive URLs are hardcoded in `shared-sync.js` and `index.html`; GitHub Pages is public, so remove them if they are private.
- `files-compress.html` uses the Tailwind Play CDN, which is meant for development only.
- On phones the Chat launcher and the "Shared" status chip sit close together at the bottom-left.
- Live Supabase behaviour is still untested end to end; I only verified against mocks and a mocked-browser render.

## V59 — Clean 3D controls (2026-10-12)
- Removed the Motion, Mood, and Scene toolbar from the office canvas.
- Removed the 3D Office / Top View toggle controls next to zoom.
- Removed the associated event handlers from the dashboard and standalone 3D bundle.
- Kept the 3D office as the default view; retained zoom, reset, fullscreen, live activity, staff, and chat features.
- Reclaimed the unused space above the 3D scene.
- Preserved automatic staff movement and random workload notifications; removed automatic reaction emote bubbles from the V58 UI addition.
- No database migration needed.

## V65 - Path safety, Mapping removal, linear navigation

- Added obstacle-aware grid navigation for office staff to walk around furniture rather than through work tables.
- Removed Status-to-Pipeline Mapping editor and its event handlers. Fixed default stage categories still drive Office Pulse counts.
- Replaced the two-row suite header with one compact, horizontal desktop bar across all 10 pages, with scrollable shortcuts on narrow screens.
- Supabase schema unchanged.

## V66: Centered header and stronger collision avoidance
- Centered navigation within header and added safe scrolling on small screens.
- Rebuilt 3D furniture clearance map and path planner with verified line-of-sight path smoothing.
- Safer chair transitions and walking concurrency handling.

## V67 — Cleaner Pulse Sync UI + Default Auto Rotation (2026-10-12)
- Removed the visible Live/Stale, Data Age, and obsolete Mapping status row from Office Pulse+.
- Displayed the last successful Job Management sync time immediately beside the dashboard build version at the footer, keeping Supabase updates active.
- Fixed the 3D camera startup sequence so auto-rotation begins automatically on load and refresh (unless reduced-motion is requested by the operating system); adjusted its speed and preserved the intended default zoom.
- No database schema changes; GitHub Pages + Supabase deployment remains unchanged.

## V82: Reliable Orderform PNG and Supabase-only shared notifications

- Repaired Orderform 1/2 preview and PNG downloading with a Canvas fallback and Blob-based save. Confirmed both downloadable PNGs in an offline Chromium test.
- Made the external `html2canvas` script non-blocking and retained it as the primary high-fidelity renderer where available.
- Tool-page notification bells use shared Supabase office events only, refresh on Realtime changes, silently baseline old events, and support browser-local clear/read state.
- Kept the dashboard's notification system and all prior data, 3D, and sound features unchanged.
