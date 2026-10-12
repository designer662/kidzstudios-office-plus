# Deploy and verify KIDZSTUDIOS Office Plus V79

This ZIP contains `.github/`, `public/`, `scripts/`, `supabase/` and README files **at the ZIP root**. Do not upload an extra enclosing folder.

1. Unzip the package. Copy the repository **contents** into the GitHub repository's root (the same level as `.github/`, `public/`, etc.). Do not place the ZIP contents in a new subfolder.
2. Commit to the `main` branch. In **GitHub → Actions**, wait for **Deploy Office Plus to GitHub Pages** to complete successfully. Verify GitHub Pages is set to GitHub Actions.
3. On the deployed dashboard, check the footer shows `v79` or `v79.<build>` and the 3D office contains the **♫ Ambience** button with a **Volume** slider.
4. Check `https://<your-Pages-URL>/<base-path>/office-build-info.json` from the deployed site root. A successful V79 deployment shows `"release": "v79"`. This works even if your browser has old cached CSS.
5. Press **Ctrl + Shift + R** or open the deployed URL in a private window.
6. Close older V77/V78 simulator tabs on other PCs during the first V79 test: an older browser may temporarily remain the elected shared-movement planner. After the old tab stops, V79 can take over after the lease expires (typically under 30 seconds).
7. Make sure Supabase is configured and you are signed in. Ambient audio starts muted and requires a button click to enable. Some office activities are subtle and take 20–60 seconds to cycle.

This package keeps the same database scope and requires no SQL migration. It moves the V79 Living Office controls below the old top heading so they do not overlap the toolbar.

If the site does not show V79, share your GitHub Pages URL and a screenshot of the GitHub Actions deployment result for targeted debugging.
