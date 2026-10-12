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
