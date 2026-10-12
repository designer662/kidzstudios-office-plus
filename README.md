> **Current build: v70.** See [README-V70.md](README-V70.md) for data import/export, Google Sheets links, animated Busy mood, smoother 3D, and current validation commands.

> **Latest update: V69 Notification Sound.** See [README-V69.md](README-V69.md) for deployment notes.

# KIDZSTUDIOS Office Plus V61 · Header & Excel Upgrade

This GitHub Pages + Supabase release is built on V60. It keeps the local 3D engine, auto-rotate, click-character emoji picker, office chat and staff directory. No new Supabase migration required.

## Changes

- One shared, **two-row responsive header** across all **10 HTML pages**; brand/PC identity/notifications stay on row 1 and the eight tools move to a horizontally scrollable row 2. This prevents overlapping controls on narrower screens.
- Job Management now has **Import Excel Workbook (.xlsx)** with client-side preview and **Merge/Update** or **Replace** choices. Merge defaults to keeping unmatched shared jobs and updating jobs with matching JOBSHEET/FILES or INVOICE.
- **Excel (.xlsx) exports** for the filtered view and the full shared list, plus an **empty 28-column Excel template**.
- Existing Google Sheet import, CSV downloads, JSON backup and Supabase persistence are preserved.
- Excel parsing/writing is local and self-contained in `public/office-workbook.js` with no third-party CDN dependency; supports typical unencrypted `.xlsx` workbooks with ZIP stored or deflate entries. Modern browsers with `DecompressionStream('deflate-raw')` required for compressed third-party `.xlsx` files.
- File import limited to 12 MB and shared saves to 500 jobs (existing database UI limit). Import uses the 28-field Excel schema and requires explicit confirmation before overwriting shared state.

## Deploy to GitHub Pages

**Extract this ZIP, upload the *contents* of the repository to GitHub**, including `.github/workflows`, and let GitHub Actions deploy the `public/` folder. Existing `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` GitHub variables remain in place. Do not publish secret keys.

Reload with **Ctrl+Shift+R** after deployment. No new database migrations or keys are required. The link to `suite-header-v61.css` is added in every HTML page and `office-workbook.js` is loaded only by Job Management.

## Important import notes

1. Export **All Shared Jobs .xlsx** or **JSON backup** before importing anything into your production database.
2. In Job Management, open **Tools → Import Excel Workbook**, choose `.xlsx`, review the count / first 6 records and pick **Merge/Update** (default) or **Replace all shared jobs**.
3. The import doesn't touch Supabase until final confirmation and save. All connected authorized PCs then receive the new shared job data.
4. The workbook should use the provided **28-column template** for reliable matching. Excel files with passwords, `.xls` (legacy binary), `.xlsm` macro formats and more than 500 jobs are not supported.
5. Excel input is for user-provided business records; ensure you trust the source. Workbook formulas are **not evaluated**.

## Tests

- `node scripts/check-repo.mjs` checks the static GitHub repository.
- `node scripts/test-bridge-mock.mjs` runs mocked Supabase API tests.
- `node scripts/test-workbook.mjs` checks workbook ZIP generation and header coverage.

Browser-side `readXlsx` works with modern browser APIs but its visual UI and live Supabase save **still need verification on the deployed GitHub site**.

---

# Office Plus V59: Clean Controls Update

This release removes the floating Motion / Mood / Scene control panel and the bottom-right 3D / Top View toggle buttons requested in the screenshots. The default 3D office remains on screen. The existing 3D engine is still self-contained and does not use any external CDN.

The old button/event handlers are removed from both the TypeScript source and committed 3D bundle so no missing-element crashes occur.

**Preserved:** zoom in/out, reset, fullscreen, room/staff interactions, automatic office movement, randomly displayed workload bubbles, staff and chat management, Live Activity, and GitHub Pages + Supabase backend integration.

**Deploy:** Upload the entire repo contents to the existing GitHub repository, including `.github/workflows`. Supabase credentials stay in GitHub Actions variables. No database migration is required for this UI update. The browser will fetch `office-3d.js?v=59.0` and `office-v59-clean.css?v=59.0` to avoid stale caches.

---

# KIDZSTUDIOS Office Plus V58 · GitHub Pages + Supabase

**GitHub-ready source repository**, based on the V57 **V53 head + smooth body** character bundle. This edition replaces the Netlify API routes with a browser-side Supabase adapter, retaining the existing dashboard, 3D office, Male/Female staff selection, Live Chat, Live Activity, and utility pages.

> **Deployment status:** This package is ready to *configure and deploy*, but **is not deployed**. It needs a GitHub repository, a Supabase project, an administrator account, and a database migration. No production Supabase connection was available during development, so live database behavior has **not been end-to-end tested**.

## Folder map

```text
.github/workflows/deploy-pages.yml    GitHub Actions static-site deployment
public/                               Website files published by GitHub Pages
  index.html                          Office Plus dashboard
  office-3d.js                        Local V57 Three.js bundle (no external Three.js loader)
  supabase-bridge.js                  /api/* -> Supabase REST + Auth + Realtime adapter
  supabase-config.js                  Public placeholder, replaced during deployment
  *.html                              Office tools
supabase/migrations/                  PostgreSQL schema, RLS, RPCs, Realtime publication
scripts/generate-config.mjs          Build config from GitHub repository variables
scripts/check-repo.mjs               Static repository integrity checks
source/                               3D scene TypeScript source (see source/readme.md)
```

## Quick start (in order)

**1. Create Supabase project** at <https://supabase.com/dashboard>. In **SQL Editor**, run the full SQL file `supabase/migrations/20261009000100_office_plus.sql`. It creates the app tables, row-level security, authorized-staff directory, API functions, and Realtime publication entries.

**2. Create your admin login** using **Authentication → Users → Add user** (email/password). Then authorize that user in **SQL Editor**, replacing the email:

```sql
INSERT INTO public.ks_staff_members(user_id,role,active)
SELECT id,'admin',true FROM auth.users WHERE email='YOUR_ADMIN_EMAIL@example.com'
ON CONFLICT (user_id) DO UPDATE SET role='admin',active=true;
```

To add another person, create their Supabase Auth account, then insert `role='staff'` for their user ID. Never leave business data accessible to anonymous visitors. Self-registration should stay disabled unless your team sets up an approval flow.

**3. Create GitHub repository.** Recommended name `kidzstudios-office-plus`. Upload **all contents of this repository**, including the hidden `.github` directory, to the `main` branch. With Git CLI:

```bash
git init
git add .
git commit -m "Office Plus V58: GitHub Pages and Supabase migration"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kidzstudios-office-plus.git
git push -u origin main
```

Create the empty repository on GitHub **before** pushing. Do not put service-role or secret keys in the repository or browser. For UI-only upload, drag the files into **Add file → Upload files** in a new GitHub repository (be sure `.github/workflows/deploy-pages.yml` is included).

**4. Add GitHub Actions repository variables** in **Settings → Secrets and variables → Actions → Variables**:

| Variable | Example/value |
|---|---|
| `SUPABASE_URL` | `https://YOUR_PROJECT_REF.supabase.co` |
| `SUPABASE_PUBLISHABLE_KEY` | Project publishable key (`sb_publishable_...`) or legacy anon key |

Both values are *public client configuration* and will be included in the deployed JavaScript. **Do not use a Supabase `service_role` or `sb_secret_` key**. Use Row Level Security instead.

**5. Enable Pages deployment** in **Settings → Pages → Build and deployment → Source: GitHub Actions**. Push a commit (or run the workflow manually under **Actions → Deploy Office Plus to GitHub Pages**). The workflow validates the files, generates the public configuration, and publishes `public/`.

Expected URL: `https://YOUR_USERNAME.github.io/kidzstudios-office-plus/` (unless configured otherwise).

**6. Sign in**, verify the office dashboard, then open it on another authorized PC. Test staff updates, chat, Live Activity, 3D rendering, and refresh persistence. Existing V57 default staff still appears until the shared directory is loaded.

### Migrating existing live Netlify data

**Back up your production Netlify database before opening the new site.** The schema matches the old `ks_shared_state`, `ks_office_chat`, and `ks_office_events` tables. Export the actual rows through the Netlify database/admin SQL tools, then restore them to Supabase using controlled SQL/CSV import or `scripts/import-json.mjs` with a local-only service role key. **Do not overwrite the production database** or abandon Netlify until records and workflows have been verified. See [Migration and tests](docs/MIGRATION.md).

If you do not migrate data first, the new Supabase database starts empty, and the existing application can seed its built-in staff entries.

## How syncing works

The dashboard still sends `fetch('/api/state')`, `/api/chat`, and `/api/events`. The **first script in each website page** intercepts only these paths and talks securely to Supabase PostgreSQL over HTTPS. User authentication is via Supabase email/password, while RLS blocks unapproved accounts. Changes are pushed through Supabase Realtime WebSockets and the original polling remains as a reconnect fallback. PC/browser ID persists as a workstation label; **it is not a security credential**.

* `state` saves JSON payloads and version information. Existing V57 screens still have last-write-wins semantics unless their saves provide `expectedVersion`.
* `chat` stores chat messages with an authenticated author UID and generates an activity event atomically.
* `events` stores notifications with optional de-duplication keys.
* The dashboard listens for Realtime updates, and every page has periodic polling as fallback.
* Chat GET shows the last 24 hours. Run the optional Supabase Cron cleanup from the SQL file to physically delete old rows.

## Security limitations before real business use

GitHub Pages is **public static hosting**. The login gate protects calls to Supabase, not the HTML/JavaScript source files. The original V57 source contains default staff names and existing shared document/Google link references. **Review and remove confidential values before publishing.** Consider storing sensitive office data only in Supabase and fetching it after authentication instead of embedding it in `public/`.

The initial RLS design allows all approved staff to read and update shared state. Only admins can clear chat history. If roles should limit staff editing, pricing, customer data, or settings, extend RLS and move sensitive business operations into trusted Edge Functions. Chat messages retain a verified `author_uid`, but editable display names/client IDs are attribution rather than identity verification. Make sure documents linked through Google Drive/Sheets have their own access controls.

Supabase auth refresh tokens are stored in this browser's local storage so staff remain signed in when switching pages. Use trusted office PCs, HTTPS, individual logins, and sign out on shared devices. Avoid putting passwords, financial data, or credentials into shared browser-synced form fields.

## Build and development

Production Pages build needs only Node.js (preinstalled on GitHub Actions), **not Netlify**. Test the file structure locally:

```bash
node scripts/check-repo.mjs
```

If changing character TypeScript, consult `source/readme.md`; `public/office-3d.js` is currently the tested V57 bundle and should be copied from a successful local rebuild. This migration intentionally does not redesign the V57 characters.

## References

- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase Realtime Postgres Changes](https://supabase.com/docs/guides/realtime/postgres-changes)
