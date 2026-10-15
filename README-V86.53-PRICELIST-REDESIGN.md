# KIDZSTUDIOS Office Plus V86.53 · Price List Calculator UI Redesign

## Purpose
Rebuild the visual interface of `public/pricelist-calculator.html` without changing the pricing engine, saved order records, export functions, or product configurations.

## UI improvements
- New Price List & Quotation header and compact three-step workflow.
- Modern orange/white/charcoal theme consistent with Office Plus.
- Cleaner, keyboard-selectable product category cards across all eight existing products.
- Tighter quantity steppers and grouped add-on controls.
- Inline sticky desktop quotation preview and cart; naturally stacked on mobile.
- Preserved commission, discounts, design fees, shipping, 70% deposit, price tiers, custom sizes, and quotation PDF/PNG/WhatsApp functionality.
- No floating panels or database migration.

## Changed files
- `public/pricelist-calculator.html` (presentation markup and keyboard category affordances)
- `public/pricelist-redesign-v86-53.css` (new isolated visual styles)
- `scripts/test-v86-53-pricelist-redesign.mjs` (new regression test)
- `.github/workflows/deploy-pages.yml` (registers test)
- `README-V86.53-PRICELIST-REDESIGN.md` (this file)

## Verification
- `node scripts/test-v86-53-pricelist-redesign.mjs`
- `node scripts/check-repo.mjs`
- `node scripts/test-v86-53-markup-inline.mjs`
- `node scripts/test-v86-53-markup-redesign.mjs`
- `node scripts/test-workbook.mjs`
- Local isolated Chromium fixture tested at 1440, 900, 768, 390 and 320 px. All had no page JavaScript errors and no horizontal overflow.
- Financial parity comparison against the original V86.53 across all eight product categories, with sample quantities, flat commission, fixed discount and shipping, produced exactly matching quotation data and totals.

## Pending live verification
- Test PDF/PNG exports with online CDN libraries available and check official-document appearance.
- Test WhatsApp opening on a supported device.
- Verify GitHub Pages deployment and actual Supabase/shared-header integration.

## Codespaces
For an existing V86.53 repository, apply the folder-preserving PATCH ZIP, then run the new regression and commit. The patch intentionally **does not overwrite the entire GitHub Actions workflow**. Insert one test line following the existing markup-inline test.

This is a UI-only release. `office-release.json` remains at 86.53.
