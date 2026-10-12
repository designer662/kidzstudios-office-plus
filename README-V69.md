# Office Plus V69 · Notification Sound

This update adds a gentle two-tone notification chime to incoming Office Plus events on **all 10 web pages** (dashboard and utilities), including staff changes, workload changes, job updates, emoji mood updates and shared live-chat updates.

## Features
- New shared sound module: `public/office-notification-sound.js`
- Sound defaults to **On** and can be muted using the **Sound on / Muted** button within the bell notification panel
- Mute setting is stored locally on each browser/PC using `localStorage`
- First fetch establishes a baseline: historical events do **not** make a sound
- Dashboard does **not** ring for events posted by the same browser
- Tool pages poll events and only ring for recent, newly arrived events
- Repeated events in a burst produce one chime (1.1-second cooldown)
- No notification sound when the browser tab is hidden

**Browser requirement:** Web browsers usually prevent audio playback until you click or press a key on the website. Once you interact with the site, new notifications can play sound.

## Deployment
Replace the repository files in GitHub, commit, wait for GitHub Pages deployment, and hard-refresh your browser. No Supabase database migration is needed.

## Validation
Run `node scripts/test-notification-sound.mjs` to test the unlock, sound, cooldown, mute, and storage behavior.
