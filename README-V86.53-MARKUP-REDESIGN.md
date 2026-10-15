# KIDZSTUDIOS Office Plus · V86.53 Markup & Margin Redesign

This update is based on the latest V86.53 full project with the Reports upgrade and Team Workload repair.
It refreshes `markup-calculator.html` into a two-column sales pricing workspace with live quotation results.

## Design improvements

- Clear Markup & Margin heading and explanatory intro.
- Pricing input card with job setup, extra costs, delivery, method selection and rounding.
- Dedicated quotation-results card with selling price, income, cost, profit, margin badge and order summary.
- Basic calculator beneath the results card.
- Warm neutral KIDZSTUDIOS Office styling with restrained orange and green indicators.
- Desktop sticky results; stacked layout on tablet and mobile; 320 px minimum tested.
- Updated input labels, button selection accessibility, focus feedback, and reduced-motion support.

## Behavior preserved

- Pricing by markup, multiplier, target margin, and entered selling price.
- Cost breakdown and delivery charged per unit or per order.
- Price rounding, profit/margin calculation, quotation summary copy, reset.
- Basic calculator and existing shared top navigation.
- No new API calls, server writes, database migration or third-party dependencies.

## Files

- `public/markup-calculator.html` (markup restructure and existing calculation handlers retained)
- `public/markup-calculator-redesign.css` (new standalone styling)
- `scripts/test-v86-53-markup-redesign.mjs` (new regression)
- `.github/workflows/deploy-pages.yml` (run regression during CI)
- `README-V86.53-MARKUP-REDESIGN.md` (this document)

## Verification

From project root:

```bash
node scripts/test-v86-53-markup-redesign.mjs
node scripts/check-repo.mjs
node scripts/test-workbook.mjs
node scripts/test-v86-53-report-upgrade.mjs
```

Additionally, an isolated Chromium test confirmed computed outputs for markup, multiplier, target margin,
reverse margin, delivery modes, rounding, and the basic calculator. Responsive layouts tested at 1440,
900, 768, 390 and 320 px without horizontal overflow or JavaScript errors in that fixture.

Full live GitHub Pages, Supabase, and cross-browser behavior must be verified after deployment.
The existing job data and production workflows are not changed.
