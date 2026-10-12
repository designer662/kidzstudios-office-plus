# Office Plus V57 → V58 Migration & Verification

## Preserve the production system

1. Leave the existing Netlify site and database online during testing.
2. Export **all rows** of `ks_shared_state`, `ks_office_chat`, and `ks_office_events` before changing DNS.
3. If possible, save both SQL/CSV backups and a normalized JSON export.
4. Create the Supabase project and run the initial migration SQL before restoring data.
5. Ensure the first authorized administrator has an entry in `ks_staff_members`.
6. Restore records to Supabase **before logging in to the new deployed website** so default UI seeding cannot overwrite the backup.
7. Recheck numeric IDs and auto-increment sequences when importing old chat and event IDs.

## JSON export shape

The optional local import script `scripts/import-json.mjs` understands:

```json
{
  "sharedState": [
    {"scope":"office:staff", "payload":{"staff":[]}, "version":1, "updated_at":"2026-10-09T00:00:00Z"}
  ],
  "chat": [],
  "events": []
}
```

The importer supports both SQL-style snake_case keys and selected camelCase API keys. Provide paths via the command line. **Never commit your exported production data or service-role key to GitHub.**

Example with local environment variables:

```bash
SUPABASE_URL='https://YOUR_PROJECT_REF.supabase.co' \
SUPABASE_SERVICE_ROLE_KEY='YOUR_LOCAL_ONLY_SERVICE_ROLE_KEY' \
node scripts/import-json.mjs ./private-backup.json
```

Verify row counts directly in the Supabase SQL Editor, then adjust imported sequences using:

```sql
SELECT setval(pg_get_serial_sequence('public.ks_office_chat','id'),
  GREATEST(coalesce((SELECT max(id) FROM public.ks_office_chat), 1), 1), true);
SELECT setval(pg_get_serial_sequence('public.ks_office_events','id'),
  GREATEST(coalesce((SELECT max(id) FROM public.ks_office_events), 1), 1), true);
```

## Acceptance tests (use a staging GitHub repository or branch)

- [ ] An account not included in `ks_staff_members` cannot load shared data.
- [ ] Staff login works on two different authorized browsers.
- [ ] V57 **V53-head + smooth-body** model renders with WebGL enabled.
- [ ] Gender selection is retained and new staff appear in 3D.
- [ ] Edit the shared staff directory on PC A: PC B receives update.
- [ ] Send chat message on PC A: PC B receives message and Live Activity notification.
- [ ] Staff identity and browser PC label are stable after a refresh.
- [ ] Jobs and shared form fields sync between users.
- [ ] Reload and navigate all the utility pages; they should stay signed in.
- [ ] Supabase Realtime reconnects after the network goes offline and online.
- [ ] Normal staff cannot clear all chat; an admin can.
- [ ] Existing production records match backup counts.
- [ ] No non-public secret keys are committed or included in Pages artifacts.

## Known trade-offs

- The existing V57 UI primarily uses polling; the bridge adds Realtime-driven refreshes, but polling remains for reliability.
- Until V57 screens pass `expectedVersion` with updates, simultaneous saves to the same JSON scope may overwrite each other.
- Supabase's auth accounts and the workstation-specific PC identity are separate concepts; do not confuse browser labels with verified users.
- GitHub Pages serves source publicly, even when a database login is required. Keep sensitive business records server-side.
- Frontend and SQL logic are packaged, but the actual live Supabase connection has not been tested in this environment.

## Rollback

Keep the existing Netlify site active. If V58 cannot pass production acceptance testing, continue using Netlify V57 and the original database. Do not write to both production databases concurrently after cutover without a conflict/migration plan.
