# KIDZSTUDIOS Office Plus V81 · Realistic Office Ambience

V81 is based on the V80 Smart Floating Labels GitHub Pages + Supabase repository. It replaces V79's nearly inaudible single air-conditioning tone with a procedural Web Audio sound engine, while retaining character activity and movement synchronization, all Job Management features, and independent notification sounds.

## V81 enhancements

- **Reliable audio permission flow:** The user's click on **♫ Ambience off** creates/unlocks the AudioContext directly from the user gesture. A browser that has already saved ambience `on` displays an instruction until it receives the next click/key press. No audio attempts to bypass autoplay restrictions.
- **Improved audibility:** The master volume and layered gain structure are balanced so ambience can be heard on ordinary laptop speakers at a reasonable setting without drowning out notifications.
- **Continuous ventilation:** Filtered air movement plus gentle fan harmonics form a quiet, non-intrusive sound bed.
- **Typing and mouse clicks:** Sparse, procedurally generated keyboard and mouse transients are played when the shared movement timeline reports characters working at their desks.
- **Footsteps:** Soft two-step noises are played while staff are walking in the synchronized scene.
- **Distant conversation:** Brief nonverbal synthetic murmur tones are played during simulated conversations and meetings. These contain no recorded speech and do **not** capture the microphone.
- **Preview:** The visible **▶ Preview** control plays an immediate short typing, footsteps, and murmur demonstration after ambience is enabled.
- **Volume and privacy:** The existing independent ambient volume slider (default 55%), on/off setting, and notification sound settings are maintained per-device. All sounds are synthesized locally, with no external audio files or API requests.
- **Background safety:** Sound stops when the tab becomes hidden, resumes when permitted, and waits for another user gesture if the browser re-suspends its audio context.

## Using the sound controls

1. Open the Office Simulator and click **♫ Ambience off** to switch it **On**. This click permits browser playback.
2. Adjust the volume slider. Click **▶ Preview** to verify your speaker/headphone output.
3. New job/chat notification chimes continue using their **separate** sound toggle in Notifications.
4. If sound doesn't start, ensure browser/site sound permissions and device output are enabled; then click the Ambience button or Preview again. A suspended context is not force-started without a user gesture.

## Files

- `public/office-ambience-audio.js` (new): dedicated Web Audio engine, procedural effects, graph lifecycle, and activity-driven scheduling.
- `public/office-living-office.js`: connects the existing Supabase-derived scene replay and local sound controls to the engine.
- `public/office-living-office.css`: styles the preview and audio status controls.
- `public/index.html`: loads the new engine ahead of Living Office and cache-busts V81 audio files.
- `scripts/test-ambience-v81.mjs`: mocked AudioContext tests for unlock, looping, preview, volume, muting, tab state, and independent notification preferences.

## Validation and limitations

Run `node scripts/test-ambience-v81.mjs` and `node scripts/check-repo.mjs`. The existing shared movement, Job Management, Excel, mood, notification and 3D interaction regression tests also run in GitHub Actions.

**The sounds are generated effects rather than actual environmental recordings.** The silent-autoplay and output-volume restrictions of different browsers cannot be fully verified until the deployed site is opened in a real browser with a working audio device. No SQL migrations, new services, or environment variables are needed.

## GitHub deployment

Extract the ZIP and upload the **contents directly into the repository root** so `.github/`, `public/`, `scripts/`, and `supabase/` are top-level folders. Commit to `main`, wait for the GitHub Pages deployment to finish, and hard-refresh the page. Check `public/office-build-info.json` or the app footer for `v81`.
