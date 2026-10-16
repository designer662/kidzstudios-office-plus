# KIDZSTUDIOS Office Plus V86.53: Index Stability

## Scope
Main dashboard reliability only. This patch changes no Supabase schema, Job Management, pricing calculations, 3D office or Smart AI simulation files.

### Live Activity
- Begins Connecting and changes to Live only after a valid successful `/api/events` response, including empty responses.
- Shows Reconnecting after transient failures, Offline after three consecutive failures or browser disconnection.
- Reuses existing event polling and realtime listeners; does not create competing timers.
- Retains cached activity rows and All/Team/Jobs filters. The removed search and Pause/Refresh/More toolbar remain absent.
- Rechecks on return from a suspended tab.

### Startup guard
- Registers ahead of the inline dashboard controller.
- Shows a safe error notice for a critical controller error or authenticated incomplete startup.
- Retry reloads the page once, rather than running a second controller or subscription set.

### Event delivery
- Staff, workload, mood and shared Drive saves distinguish primary save success from activity-event publishing success.
- Failed activity publishing reports partial success. No automatic event reposts were added.
- Failed primary saves remain errors.

## Changed files
- `public/index.html`
- `public/office-live-activity.css`
- `scripts/test-live-activity-ui.mjs`
- `scripts/test-v86-43-dashboard-polling.mjs`
- `scripts/test-v86-53-index-stability.mjs` (new)
- `.github/workflows/deploy-pages.yml` (two CI registrations, done by Codespaces installer)
- This README

## Verification
```bash
node scripts/check-repo.mjs
node scripts/test-v86-53-index-stability.mjs
node scripts/test-live-activity-ui.mjs
node scripts/test-v86-43-dashboard-polling.mjs
node scripts/test-v86-53-operations-upgrade.mjs
node scripts/test-v86-44-smart-ai.mjs
node scripts/test-v86-53-controls-layout.mjs
```

Chromium isolated UI checks passed for event health and startup guard. Authenticated live Supabase, real staff changes and GitHub Pages deployment must be verified after publishing.

## Deployment precautions
One-upload Codespaces installer compares SHA-256 digests of existing files against inspected V86.53 ZIP before changing them. Newer source changes trigger a safe stop, not an overwrite. Stashed uncommitted tracked work is preserved for manual review.
