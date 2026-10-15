# KIDZSTUDIOS Office Plus · V86.53 UI Revision 2

**Base:** V86.53 UI Control Layout full project. This is a focused UI-only update; the release number remains V86.53. No Supabase migration and no simulation logic changes.

## Change

- Removed the **Zoom out − / Rotate ↻ / Zoom in +** camera-control pill entirely.
- Deleted the obsolete button click bindings from `public/index.html`, the camera-control relocation from `public/office-living-office.js`, and its styles.
- Kept **Reset AI**, **Fullscreen**, centered Chat, and the top-centered Following notice.
- Preserved **cinematic automatic camera rotation by default**. The existing 3D bridge explicitly calls `setRotating(!paused)` on initial load and after Reset. The Three.js orbit uses its established slow rate, `.24`, with reduced-motion respected.
- Mouse/trackpad scene rotation and scroll-to-zoom remain available. Manual keyboard rotation shortcuts remain available.
- Refreshed the two modified CSS/JS asset cache stamps to `86.53.ui2` so GitHub Pages clients retrieve the correct UI.

## Changed files

- `public/index.html`
- `public/office-living-office.js`
- `public/office-index-controls-v86-53.css`
- `scripts/test-v86-53-controls-layout.mjs`
- `README-V86.53-CINEMATIC-CAMERA.md`

## Verification

From repository root:

```bash
node scripts/test-v86-53-controls-layout.mjs
node scripts/test-v86-53-dashboard-report.mjs
node scripts/test-v86-54-header-parity.mjs
node scripts/check-repo.mjs
```

Confirm in desktop and mobile browsers that the three-button camera pill is absent, Fullscreen remains operable beside Reset AI, Chat stays centered (desktop), and Following appears top-center. In a real WebGL browser with reduced motion **off**, wait for 3D initialization and verify the camera slowly orbits without any user action. Respect system reduced-motion settings: rotation should pause when reduced motion is requested.

## Deployment notes

Upload the **patch-only** ZIP files to matching repository paths in GitHub Codespaces or GitHub Web. Don't upload the ZIP itself as a project file. CI and GitHub Pages deploy after a commit reaches `main`, subject to your repository workflow and protections. No live deployment performed here.
