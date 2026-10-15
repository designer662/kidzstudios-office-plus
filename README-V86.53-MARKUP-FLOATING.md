# KIDZSTUDIOS Office Plus V86.53 · Floating Markup Utilities

Focused upgrade continuing from the V86.53 Markup & Margin Calculator redesign.

## Features
- Quotation Snapshot is a live, movable floating window on desktop and opens with the page at >=1200 px.
- Basic Calculator is an independent floating window opened from the fixed utility dock.
- Both tools can be open simultaneously on larger screens and dragged from their headings.
- On smaller screens, only one panel opens at a time to avoid covering the pricing form. Both start closed on small screens.
- Either panel can close with its X button or the Escape key.
- Existing pricing modes, formulas, IDs, reset, copy, calculator keys, and inline no-JavaScript fallback are preserved.
- Print stylesheet shows the quotation and excludes the basic calculator and floating launcher.

## Files
- public/markup-calculator.html
- public/markup-calculator-floating.css (new)
- public/markup-calculator-floating.js (new)
- scripts/test-v86-53-markup-floating.mjs (new)
- .github/workflows/deploy-pages.yml
- README-V86.53-MARKUP-FLOATING.md (this file)

## Verification
Run from the repository root:

```sh
node scripts/test-v86-53-markup-floating.mjs
node scripts/test-v86-53-markup-redesign.mjs
node scripts/check-repo.mjs
```

The browser behavior was also verified locally using isolated Chromium fixtures at 1440, 900, 390, and 320 px: correct quoting totals, basic digit input, opening/closing, Esc, desktop dragging, and no horizontal overflow.

Live GitHub Pages / Supabase not deployed or verified. No new dependencies, migrations, or changes to pricing formulas.
