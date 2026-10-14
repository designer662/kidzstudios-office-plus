# Office Plus V86.21: Furniture-Aware Smart Seating

**Changed-files-only patch for V86.20.** This is a geometry-aware deterministic pose controller, not a cloud AI model.

- Chair centre, rotation and cushion height register directly from actual Three.js chair construction, instead of relying solely on hard-coded chair coordinates. The existing room layout and furniture remain unchanged.
- Named staff dock to assigned furniture: Boss #0, Cikda #1, Minn #2, Afiq #3, Lisa #7. Showroom staff are never snapped into someone else’s desk.
- Facing priority is given to the chair while seated, overriding temporary social-facing reactions. Character turns before sitting.
- Smooth approach / turn / sit / seated / rise transitions, with absolute per-frame pelvis adjustments and active upper-leg/lower-leg articulation.
- Dynamic seat height calculated from furniture geometry and avatar scale. Supabase navigation roots and wall-aware routes unchanged.

## Deployment
Extract ZIP over your existing V86.20 GitHub repository and retain folder paths. Do not delete unlisted files. Wait for GitHub Actions, then hard-refresh all PCs. Check page footer V86.21. No new Supabase migrations.

## Verification
Use the included furniture, movement, and existing regression tests. Live 3D appearance still requires checking in a deployed browser.
