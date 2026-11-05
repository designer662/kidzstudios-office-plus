# Kidz Studios Office Plus — bug and UI/UX audit

**Date:** 5 November 2026  
**Scope:** The supplied ZIP, all 11 pages, shared navigation, dashboard panels, job register, browser sync and 3D startup.

The corrected project is included in the accompanying ZIP. No website was deployed and no live customer records were accessed or changed.

## Confirmed issues corrected

| Area | Finding | Correction |
| --- | --- | --- |
| Dashboard navigation | Mobile Menu appeared alongside the desktop tool row because dashboard CSS overrode the responsive rules. | Matched the dashboard selector priority so one workspace navigation is visible at each breakpoint. |
| Job register | Long customer names painted into the Item column; unrestricted wrapping could squeeze references and products into narrow columns. | Added readable column widths, bounded wrapping, keyboard scrolling and a horizontal scroll hint. |
| Mobile panels | Desktop anchors and an undefined navigation height placed Pulse, Activity and Chat incorrectly. | Kept sheets inside the viewport and above a consistent 64px navigation bar, including landscape. |
| Staff profiles | Inline desktop coordinates overrode mobile profile styles. | Added explicit mobile positioning; opening a staff profile closes competing sheets. Desktop docking remains separate from Office Pulse. |
| Sheet toggles | Click-away handling closed a sheet on pointerdown, then the tab click reopened it. | Let section controls own their toggle state and update selection immediately. |
| Sync badge | The floating sync indicator could cover the lower portion of an open sheet. | Hide the floating badge while a mobile sheet or profile is open. |
| Missing tool | Printing Calculator existed but had no workspace navigation link. | Added one link to the shared header and mobile menu. |
| Local settings | Generic form sync could capture or restore a temporary operator name, sign-in email, chat draft or graphics preference. | Excluded these controls from both shared capture and shared restore, including older snapshots. |
| Concurrent first save | Sending a null version for an initially missing shared form could bypass stale-write protection. | Send version zero and reject concurrent creation; added a regression that simulates this race. |
| Quotation branding | Two quotation templates referenced an unavailable placeholder image. | Use the included official Kidz Studios logo (`logo1.png`). |
| Startup work | The 3D renderer could initialize behind the sign-in screen; authentication event and fallback polling could also boot dashboard helpers twice. | Start rendering after authentication and make dashboard bootstrap run once. No numerical performance benchmark is claimed. |
| Fallback controls | Pulse opening was wired inside the 3D bridge. | Moved that UI handler into the dashboard so the fallback map retains working Operations controls. |
| Accessibility | Background controls remained reachable while the mobile menu was open; sheet motion and small scene controls needed adjustment. | Added background inertness and focus restoration, respected reduced motion, enlarged scene controls and replaced the fullscreen glyph with SVG. |

## Verification

| Check | Result |
| --- | --- |
| HTML/JavaScript syntax and local asset wiring | Pass: all 11 pages; zero syntax or missing-asset blockers. |
| Current CI static/unit/configuration checks | 46 / 46 passed. |
| Simulator regression checks | 12 / 12 passed. |
| Browser suites | 9 / 9 passed, including authentication recovery, workbook import/export, backup verification, report downloads and actual WebGL. |
| Full-page UI regression | 82 layout/interaction cases passed: all 11 pages at 320, 390, 768, 900, 901 and 1440px; mobile sheets and landscape; desktop profile separation. |
| Shared-form regression | Passed local-field isolation and concurrent first-save protection; ordinary pricing inputs still save and calculate correctly. |
| Print layout | A4 landscape job-sheet dimensions preserved while the editing container scrolls on phones. |
| Actual 3D startup | No canvas before authentication; exactly one renderer after authentication. Seating, walking, pause, zoom and appearance rebuilding passed. |

Screens were also reviewed visually with the real 3D bundle and synthetic jobs. Deliberately wide tables and A4 sheets scroll within their own containers.

## Remaining limits and inherited test failures

- The supplied public Supabase configuration contains placeholders. Live authentication, realtime collaboration and production writes still require the existing GitHub repository variables and a configured test deployment.
- Database behavior was tested with isolated fixtures. PDF/OCR/compression integrations that depend on external CDN libraries were not exhaustively exercised with real documents.
- The matched archive test set remains **60 / 80 passing, with no new failures**. Nineteen retained historical checks still assert earlier asset versions, minified symbol names or older UI contracts, including bulk-delete selection controls absent from the shipped interface. They were not removed or silently marked passing. The twentieth failure is the deployment-artifact check while Supabase placeholders remain. The exact scripts and outcomes are in `VALIDATION-REPORT.json`.

## Reproduce and deploy

From the project root, install dependencies with `npm ci --prefix source`. Run `node scripts/check-repo.mjs`, `node scripts/audit-runtime-wiring.mjs`, and `npm run test:ui --prefix source` after installing Playwright Chromium. The updated GitHub workflow runs the full-page UI regression alongside the existing checks.

Commit the complete corrected project to use the existing build/deployment workflow. Configure `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` as already described in README. This audit does not publish a deployment or apply database migrations.
