# Office Plus V82: Orderform PNG Repair + Shared Live Notifications

## Orderform 1 and Orderform 2

- Repaired the **Preview → Download PNG** flow. Export works using the original `html2canvas` renderer when available, with a browser-native Canvas fallback when the external CDN is unavailable or rejects an uploaded graphic.
- Switched PNG downloads to **Blob object URLs**, which are more reliable in modern browsers than very large `data:` link downloads.
- Preserved the existing Job Sheet filename convention, image uploads, auto-save, and form layout.
- Export preserves the on-screen form and uploaded imagery. The fallback approximates CSS typography and special decorative effects, so check the actual downloaded PNG if pixel-exact reproduction is essential.
- The original CDN is loaded asynchronously, so it cannot block the page from opening while offline.

## Shared Live Notifications for Other HTML Tools

- All nine non-dashboard HTML tools use only the **shared Supabase `ks_office_events`** feed for their notification bell.
- Supabase Realtime event changes trigger immediate reload of the shared feed, with 15-second fallback polling.
- Existing history loads silently, without false alerts on refresh; new shared events play the existing optional chime.
- The Clear button clears the local unread/view only, never deletes events from Supabase or other PCs.
- The main 3D dashboard keeps its original, more detailed notification controller unchanged.

## Deployment

1. Upload all repository files to the GitHub repository root.
2. Confirm `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` GitHub variables remain set.
3. Commit and wait for the GitHub Pages action to finish. No new migration is needed.
4. Test Orderform 1 and 2: upload a mockup, click Preview, then Download PNG.
5. Open a second tool page in another PC and create a new shared job update. Confirm the notification appears in the bell without refreshing.

## Tests

- `node scripts/check-repo.mjs`
- `node scripts/test-orderform-v82.mjs`
- The original Job Management, Excel, Supabase, movement, and sound regression checks.
- Offline Chromium smoke test generated and downloaded PNG images from **both original Orderform pages**.
