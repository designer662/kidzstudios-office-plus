# KidzStudios Office Plus V86.42 — Production release

## Release outcome

- V86.42 retains the existing pages, office simulation, staff management, job management and Supabase bridge.
- The generic page field synchronizer now sends optimistic `expectedVersion` to the Supabase state RPC. A `409` conflict keeps in-progress user edits in the browser and presents two **explicit, confirmed** options: load shared version or save my version.
- Form fields changed while a save request is in flight are queued for a following save instead of silently marked as saved.
- Sync `contenteditable` fields are handled as text; stored remote markup can no longer be inserted through `innerHTML` by the synchronizer. Older rich-text HTML values display as literal text for safety.
- A runtime-level autosave concurrency regression test is included in CI.
- CI rejects the deployment if the 3D bundle cannot be freshly built, required simulator tests fail, WebGL browser acceptance fails, public Supabase configuration is absent/unsafe, or the final static output differs from source fingerprints.
- When all checks pass, GitHub Actions produces an **actual ready-to-upload website ZIP** artifact as well as deploying GitHub Pages.

## Deployment — GitHub Pages (recommended)

1. **Back up** the previous site/repository commit and Supabase records. Make the new version first available on staging if this is a live office environment.
2. Unzip `KidzStudios_OfficePlus_V86.42_Production_Source.zip`. Upload the **contents** of `kidzstudios-office-plus-main/` to the root of your GitHub repository. Keep `.github/workflows/deploy-pages.yml`, `source/`, `scripts/`, `supabase/`, `public/` and `office-release.json` together.
3. In Supabase, apply `supabase/migrations/20261009000100_office_plus.sql` in a fresh compatible project, or inspect/migrate an existing project safely; ensure Row Level Security policies and `ks_is_office_member()` work. Create Supabase Auth users and add approved UUIDs to `public.ks_staff_members`. **Do not publish an unprotected database.**
4. In GitHub repository **Settings → Secrets and variables → Actions → Variables**, create `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`. The URL format is `https://<project-ref>.supabase.co`; key must be `sb_publishable_...` or an *anon*-role legacy JWT. **Never** place `service_role`, `sb_secret_` or database passwords in these variables, uploaded files or browser code.
5. GitHub repository **Settings → Pages → Build and deployment → Source: GitHub Actions**. Push the repository to `main` or use `workflow_dispatch`.
6. Watch the **Deploy Office Plus to GitHub Pages** workflow. Every check must be green, especially `Rebuild 3D from source`, `Test Office Simulator stability` (10/10), `Test rebuilt 3D in WebGL`, `Validate deploy artifact (fail closed)`, and `Deploy GitHub Pages`. Never bypass red checks.
7. After success, GitHub **Actions → successful workflow run → Artifacts** contains `KidzStudios_OfficePlus_V86.42_Production_Website`, a ready-built static website containing generated safe public Supabase config. This is the ZIP to use for a standalone static host if needed. An offline/local copy of `public/` from the *source ZIP* is **not** a built production artifact.
8. Complete the staging acceptance list below using legitimate staff test accounts. Promote/repoint the production domain only after verifying logins, save/reload, dual-browser edits and the 3D scene. Retain the previous successful deployment for rollback.

## Staging acceptance checklist

- Approved staff can sign in; disallowed / inactive staff cannot access data. Sign out invalidates UI access.
- Dashboard and 3D office load with no error console messages; movement, seating, pause, character animation and controls work.
- Job Management can create, edit, validate, save and reload jobs. Job counts and UI match between authenticated devices.
- Edit the *same* synchronized field in two browsers: the second save detects a conflict instead of silently overwriting, and both buttons behave as their confirmation text describes.
- Chat, activity feed, online-user presence and staff data can sync; reconnect and token refresh work.
- Check desktop and mobile widths; check calculators/export features in the intended browser with internet access.
- Run a backup and trial restore of the Supabase project.

## Important limitations

- This source release has **not** been verified here against the user's live Supabase project or hosted production URL. Those credentials and accounts are not present in this ZIP.
- The current offline test container cannot download `three`, `esbuild`, or `playwright`; it cannot independently produce a fresh source-matched `office-3d.js` nor complete the real browser 3D test. GitHub Actions is configured to install dependencies and execute both tests **before** it publishes anything.
- Supabase requires network access; several optional tool exports load external CDN scripts. They are not fully offline-capable. Do not promise offline behavior for those features.
- GitHub Pages does not honor `_headers`; that file is for hosts which support Netlify-style security headers. Configure equivalent HTTP headers in other hosts as appropriate.
- The older V86.x historical test files contain outdated source-shape expectations. Their failures do not substitute for production acceptance; the actively selected CI tests guard the code paths above.
