import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html = readFileSync('public/markup-calculator.html','utf8');
const css = readFileSync('public/markup-calculator-redesign.css','utf8');
const workflow = readFileSync('.github/workflows/deploy-pages.yml','utf8');
const once=(id)=>{
  const found=[...html.matchAll(new RegExp(`\\bid="${id}"`,'g'))];
  assert.equal(found.length,1,`Exactly one #${id} must exist after the UI redesign`);
};
assert.match(html,/markup-calculator-redesign\.css\?v=[^"\\]+/,'Load the dedicated redesigned stylesheet after shared styles');
assert.match(html,/class="pricing-hero"/,'Include a clear sales pricing introduction');
assert.match(html,/class="pricing-sidebar"/,'Separate the results from the pricing inputs');
assert.match(html,/<section[^>]*id="markupCard"/,'Preserve input workspace');
assert.match(html,/<section[^>]*id="pricingResults"/,'Preserve right-side live metrics');
for(const id of [
  'quantityInput','costPrice','printingCost','packagingCost','designCost','commissionCost','deliveryCost',
  'deliveryPerOrder','deliveryPerUnit','markupPercent','multiplierInput','targetMarginInput','sellingPriceInput',
  'btnMarkupMode','btnMarginMode','btnMarkupSubMode','btnMultiplierSubMode','btnTargetMarginSubMode',
  'metricSelling','metricIncome','metricCost','metricProfit','marginBadge','roundUpPreview',
  'summaryTotalIncome','summaryTotalCost','summaryTotalProfit','resetBtn','copyBtn',
  'basicCalcGrid','btnEquals','btnClear'
]) once(id);
assert.match(html,/const getCostBreakdown = \(\) =>/,'Do not remove the original job-cost computation');
assert.match(html,/const getAutoSelling = \(allInUnitCost\) =>/,'Keep markup, multiplier and target-margin pricing modes');
assert.match(html,/const setMainMode = \(mode\) =>/,'Preserve reverse-margin pricing');
assert.match(html,/const applyRounding = \(type\) =>/,'Preserve rounding actions');
assert.match(html,/const copyResults = \(\) =>/,'Preserve quotation summary copy');
assert.match(html,/document\.querySelectorAll\('#basicCalcGrid \.digit'\)/,'Preserve the basic calculator');
assert.match(css,/@media\(max-width:550px\)/,'Provide responsive mobile layout');
assert.match(css,/@media\(prefers-reduced-motion:reduce\)/,'Respect reduced motion');
assert.match(css,/\.pricing-sidebar\{[^}]*position:sticky/,'Live results stay in view on large screens');
assert.match(workflow,/node scripts\/test-v86-53-markup-redesign\.mjs/,'Register redesign regression in CI');
console.log('PASS V86.53 Markup & Margin redesign: existing controls, calculations, exports and responsive layout preserved');
