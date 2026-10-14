# V86.44 Smart AI Essential Patch

Apply **over the full V86.43 project**, preserving folder structure.
Do not deploy this small patch ZIP as a stand-alone website.

1. Back up your existing V86.43 project repository.
2. Replace the listed matching relative paths using this archive.
3. Push the updated project to GitHub; let GitHub Actions run `npm ci`, rebuild the 3D bundle, run simulation + Chromium checks and publish verified Pages artifact.
4. Open Office 3D. Boss and Afiq automatically receive a versioned AI state rebuild on the current movement leader. To force it, use **Reset Afiq/Boss**. **Reset All AI** also resets other staff's simulated positions to their workstations.
5. Reset affects only `office:movement:v1`, never real staff or Job Management records.

Browser/WebGL and live Supabase acceptance could not be verified in this offline environment; CI/deployment gates remain mandatory.
