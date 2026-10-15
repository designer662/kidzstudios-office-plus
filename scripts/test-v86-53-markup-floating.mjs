import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync('public/markup-calculator.html','utf8');
const css=readFileSync('public/markup-calculator-floating.css','utf8');
const js=readFileSync('public/markup-calculator-floating.js','utf8');
const workflow=readFileSync('.github/workflows/deploy-pages.yml','utf8');
for(const id of ['pricingResults','basicCalculatorPanel','toggleQuotationFloat','toggleBasicFloat','basicCalcGrid','copyBtn']){
  assert.equal([...html.matchAll(new RegExp(`id="${id}"`,'g'))].length,1,`${id}: retain one functional element`);
}
assert.match(html,/markup-calculator-floating\.css\?v=86\.53\.float1/);
assert.match(html,/markup-calculator-floating\.js\?v=86\.53\.float1/);
assert.match(js,/document\.body\.appendChild\(panel\)/,'Move original UI panels; never duplicate their IDs');
assert.match(js,/panel\.hidden=!open/,'Panels can be closed and reopened');
assert.match(js,/panel\.style\.left=x\+'px'/,'Desktop supports dragging');
assert.match(js,/if\(open&&!large\(\)\)/,'Compact view opens one panel at a time');
assert.match(js,/event\.key!==\x27Escape\x27/,'Keyboard escape closes an open panel');
assert.match(css,/\.ks-float-window\[hidden\]\{display:none!important\}/,'Hide closed dialogs regardless of legacy card styles');
assert.match(css,/@media\(max-width:600px\)/,'Mobile floating window layout');
assert.match(css,/@media print/,'Print view remains supported');
assert.match(workflow,/node scripts\/test-v86-53-markup-floating\.mjs/,'Run new regression in GitHub CI');
console.log('PASS V86.53 floating Markup Calculator: windows, dock, drag, mobile, print and original inputs preserved');
