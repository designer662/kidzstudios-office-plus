# Deploy & Verify V81

1. Extract the ZIP; **do not upload a single nested ZIP folder**. Put `.github`, `public`, `scripts`, `supabase`, and root metadata in your existing GitHub repository.
2. Confirm your existing Supabase repository variables remain configured, then commit. Wait for GitHub Actions to complete.
3. Hard refresh with Ctrl + Shift + R and confirm the footer shows `v81` (possibly with a build number).
4. Open the Office Simulator. Click **♫ Ambience off** to enable audio. Increase volume if needed, then click **▶ Preview**.
5. Test a character walking and a simulated conversation. Footsteps, subtle typing, quiet murmurs and steady ventilation are generated locally from the shared behavior timeline.
6. Open Notifications and verify notification chimes can be muted independently of Ambience.
7. Hide the browser tab and confirm ambience pauses, then return and allow an extra click if the browser needs to unlock audio again.

No Supabase schema migration or API credentials are required beyond your existing site setup. Audio playback must be verified in a real browser/device after deployment.
