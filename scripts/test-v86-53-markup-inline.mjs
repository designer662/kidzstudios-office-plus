import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const html = readFileSync('public/markup-calculator.html','utf8');
const css = readFileSync('public/markup-calculator-redesign.css','utf8');
const ci = readFileSync('.github/workflows/deploy-pages.yml','utf8');
for(const id of ['pricingResults','basicCalculatorPanel','metricSelling','metricIncome','metricCost','metricProfit','marginBadge','copyBtn','resetBtn','basicCalcGrid']){
  assert.equal([...html.matchAll(new RegExp('id="'+id+'"','g'))].length,1,'Only one live '+id);
}
assert.match(html,/id="quoteCostBreakdown"/, 'Expandable breakdown');
assert.match(html,/id="basicCalcDisclosure"/, 'Inline optional calculator');
assert.match(html,/href="#pricingResults"/, 'Mobile shortcut to quotation');
assert.match(html,/markup-calculator-redesign\.css\?v=86\.53\.pricing2/,'Stylesheet cache bust');
for(const token of ['markup-calculator-floating.js','markup-calculator-floating.css','ks-floating-dock','ks-float-trigger','data-close-float','data-float-handle'])
  assert.ok(!html.includes(token),`Remove ${token}`);
for(const path of ['public/markup-calculator-floating.js','public/markup-calculator-floating.css','scripts/test-v86-53-markup-floating.mjs'])
  assert.equal(existsSync(path),false,`Remove obsolete ${path}`);
assert.match(css,/\.ks-inline-calculator\{/, 'Inline calculator styling');
assert.match(css,/\.ks-quote-breakdown\{/, 'Compact quotation details');
assert.match(ci,/node scripts\/test-v86-53-markup-inline\.mjs/,'CI must test new inline design');
assert.doesNotMatch(ci,/test-v86-53-markup-floating\.mjs/,'CI must not run old floating test');
console.log('PASS V86.53 compact inline markup: no floating UI; all original calculator ids, mobile jump and CI retained');
