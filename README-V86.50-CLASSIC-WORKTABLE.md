# V86.50 — Classic Worktable Visual Restore

## Scope
Restore only the **V86.49 classic 3D office desk design** (continuous wood island, original supports and center divider), while retaining V86.50 exclusive seat/monitor assignments.

- Retains all **9** physical chair/monitor-based workstations: `B01`, `B02`, `D01`, `D02`, `S01`, `S02`, `S03`, `S04`, `A01`.
- Main shared island has **six exclusive work positions**. Staff sharing the physical table do **not** share logical workstation IDs.
- Boss office, rear two-seat counter, 2D seating map, show-room overflow, AI routes, data, and Supabase sync are unchanged.
- No new tables, no moved chairs, no moved monitors and **no database migration**.

## Apply to Codespaces
Upload the essential patch archive to repository root, then:

```bash
unzip -o KidzStudios_V86.50_Classic_Table_Visual_Patch.zip -d .
rm KidzStudios_V86.50_Classic_Table_Visual_Patch.zip
node scripts/test-v86-50-workstations.mjs
git add source/src/office-scene.ts scripts/test-v86-50-workstations.mjs README-V86.50-CLASSIC-WORKTABLE.md
git commit -m "Restore classic office table design without changing staff seats"
git push origin HEAD
```

The existing GitHub Actions pipeline must rebuild `public/office-3d.js` from TypeScript. **Do not deploy the stale precompiled bundle**. Confirm all CI gates and the live 3D visuals pass before using production.
