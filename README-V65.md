# KIDZSTUDIOS Office Plus V65

Changes: collision-aware office worker paths, removed editable stage-mapping controls, one-line header across all pages.

## Deploy

Upload extracted repository contents to GitHub and commit to `main`. The existing GitHub Actions workflow deploys `public/` to GitHub Pages. Hard-refresh after deployment. The database schema and Supabase keys stay unchanged.

## Validation

JavaScript syntax and path planner tests are included in `scripts/` or performed during build. Browser/WebGL appearance should also be checked after GitHub Pages deployment.
