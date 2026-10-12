# KIDZSTUDIOS Office Plus V75 | Click-away and panel collision fixes

- Clicking blank office space dismisses the open staff profile and its attached mood picker in one action, and ends camera follow.
- Other popup forms retain their click-away controls from V74.
- The 3D renderer selects characters on `pointerup`, ahead of the browser `click`. V75 dismisses panels on `pointerdown` and prevents that later click from immediately closing a newly opened character profile.
- Staff profile and room cards are measured against the Operations/Office Pulse panel. When there is enough room, the card docks beside Office Pulse with a visible gap. When the viewport cannot accommodate both, Office Pulse is temporarily hidden while the staff card is open; it reappears automatically when the card closes.
- Panels remain scrollable and fit within the office canvas bounds on smaller screens.
- `public/office-profile-layout.js` and `public/office-profile-layout.css` contain the collision-free placement logic. `public/office-outside-close.js` handles pointer-safe dismissal for all 10 pages.
- No Supabase changes needed. Existing moods, notification sounds, Job Management, Excel, and walking routes remain in place.

## Validation

Run `node scripts/test-outside-close.mjs` and `node scripts/test-profile-layout.mjs`. Both run during GitHub Actions deployment alongside the existing checks.
