# KIDZSTUDIOS Office Plus V68 — Cinematic Auto-Rotation

- Reduced Office 3D auto-rotation speed from `0.8` to `0.24`, approximately 70% slower, for a calm cinematic orbit.
- Automatic rotation remains enabled when opening or refreshing the dashboard, unless the device requests reduced motion.
- Existing default camera zoom (1.14×), staff simulation, Supabase synchronization, mood reactions, and job management remain unchanged.
- Dashboard footer now shows `v68 · 3D` and the 3D script URL uses `?v=68.0` to avoid stale browser caches.

## Deployment

Upload the contents of this repository to the existing GitHub repository, preserving `.github/workflows`. Let GitHub Actions deploy the `public/` folder, then hard-refresh the website. No Supabase migration needed.

## Verification

Check the scene in a WebGL-capable browser: the office should rotate automatically but take noticeably longer to orbit. If you have reduced-motion settings enabled, auto-rotation stays disabled.
