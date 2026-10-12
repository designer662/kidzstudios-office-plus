# KIDZSTUDIOS Office Plus V67

## Changes from V66

- Removed the Live/Stale / Data Age / Mapping status row from the Office Pulse+ panel. No changes to the underlying Supabase synchronization logic or job-stage classification.
- Moved a concise, automatically updated Last Sync timestamp beside the build version in the dashboard footer, including on narrow screens.
- Improved 3D default auto-rotation on every fresh page load and refresh. When the system has requested reduced motion, the user’s accessibility preference is respected.
- Preserved Office Plus features including 3D staff, emoji mood syncing, route collision avoidance, Supabase, and Excel import/export.

## Deployment

Upload the **contents** of this repository to the existing GitHub repository. Let GitHub Actions deploy the `public/` folder to GitHub Pages. Refresh using Ctrl+Shift+R. No database migration is required.
