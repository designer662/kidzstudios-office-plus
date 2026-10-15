# V86.53 Job Management Data Hub

- Opens with the current local month (ORDER DATE) selected; This Month returns to the live period. Users may select other periods. On calendar rollover, auto-follow applies only until the user manually selects a period.
- One Data Hub combines all downloads/exports and imports. Export status remains visible without forcibly closing the dialog.
- CSV and XLSX current-view/period/year/all exports, 12-month CSV report, restore-compatible JSON backup, Excel template.
- Unified XLSX/CSV/TSV/JSON import preview with merge-by-JOBSHEET/FILES (default) and explicit replace-all restore. JSON backup is downloaded before any save; failed backup blocks import.
- Existing Supabase API, optimistic version check, save-size guard, unique-reference validation, and production logic remain unchanged.

**Limits:** Authenticated live Supabase and actual website deployment must be checked after CI. Downloads can be blocked by browser policy. Merge updates matching 28-column fields and preserves prior jobMeta only when imports have no metadata.
