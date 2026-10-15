# KIDZSTUDIOS V86.53 Markup Calculator Inline V2

## Scope
- Remove both floating tool windows and their floating launch buttons, JS, CSS and obsolete test.
- Compact inline Quotation Snapshot with selling price, income, cost, profit and visible margin. Expandable cost breakdown for details.
- Clean, smaller form/heading and tighter desktop pricing workspace.
- Responsive stacked layout on mobile, including an anchor to the live quotation and an inline, collapsible Basic Calculator.
- Keep original business calculation functions, IDs, price rounding, clipboard and reset logic.

## Changed files
- `public/markup-calculator.html`
- `public/markup-calculator-redesign.css`
- `.github/workflows/deploy-pages.yml`
- `scripts/test-v86-53-markup-inline.mjs` (new)
- `scripts/test-v86-53-markup-floating.mjs` (removed)
- `public/markup-calculator-floating.js` (removed)
- `public/markup-calculator-floating.css` (removed)

## Tests
`node scripts/test-v86-53-markup-inline.mjs`
`node scripts/test-v86-53-markup-redesign.mjs`
`node scripts/check-repo.mjs`
`node scripts/test-workbook.mjs`

## Deployment
A clean V86.53 Markup Floating project is the expected base. The Codespaces patch applies changed files and removes the three obsolete floating files. GitHub Pages deploy is triggered by a successful push to main.
