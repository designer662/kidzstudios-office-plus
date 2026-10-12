# KIDZSTUDIOS Office Plus V71 — Delete dialog fix

## Problem
When you clicked **Delete** while editing a job, the confirmation dialog appeared behind the Edit Job popup. The confirmation modal had a CSS stacking index of `1005` while all standard modals used `10000`.

## Fix
- Set the confirmation modal above the editor (`z-index: 20050`).
- Keep its backdrop and dialog together in the foreground.
- Focus the confirmation's **Cancel** button when it opens, and return focus when it closes.
- Pressing Escape dismisses only the foreground confirmation so the Edit Job popup stays open.

## Deploy
Extract and upload the *contents* of this repository to GitHub, including `.github/workflows`, then commit and wait for GitHub Pages to redeploy. Hard-refresh your site if it still uses an old cached page. No Supabase migration or new keys are required.

## Tests
`node scripts/test-delete-modal.mjs` and `node scripts/check-repo.mjs`.
