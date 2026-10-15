import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const html=readFileSync('public/pricelist-calculator.html','utf8');
const css=readFileSync('public/pricelist-redesign-v86-53.css','utf8');

assert.match(html,/pricelist-redesign-v86-53\.css\?v=86\.53\.p1/,'New stylesheet is versioned for GitHub Pages cache');
assert.match(html,/<div class="ks-price-hero"/,'New pricing heading remains inline, not floating');
assert.match(html,/Price List &amp; Quotation/);
assert.match(html,/class="ks-price-flow"/);
assert.match(css,/\.layout-wrapper\{[\s\S]*?grid-template-columns:minmax\(0,1fr\)/,'Balanced two-column workspace');
assert.match(css,/@media\(max-width:650px\)/,'Responsive compact layout');
assert.match(css,/@media\(max-width:350px\)/,'Narrow phone support');
assert.match(css,/\.right-panel\{[\s\S]*?position:sticky/,'Inline desktop quotation summary');
assert.doesNotMatch(css,/\.right-panel\{[^}]*position:fixed/,'Never float the quotation summary');
const categories=['sublimation','silkscreen','dtf_shirt','lanyard','apron','cap','bunting','banner'];
for(const name of categories){
 assert.match(html,new RegExp(`data-category="${name}"`),`Category ${name} preserved`);
 assert.match(html,new RegExp(`id="panel-${name}"`),`Product panel ${name} preserved`);
}
assert.equal((html.match(/class="category-card(?: active)?"/g)||[]).length,8,'All eight category tiles retained');
assert.equal((html.match(/role="button" tabindex="0" aria-pressed=/g)||[]).length,8,'All eight categories keyboard reachable');
assert.match(html,/if \(event\.key === 'Enter' \|\| event\.key === ' '\)/,'Keyboard category action');
for(const id of ['cart-items-container','out_item_total','out_cart_grand','out_cart_deposit','out_cart_balance','comm_type','comm_value','discount_type','discount_value','shipping_fee','custom_design_enabled','finalize-modal','preview-modal','tier-modal','print-quote-document']){
 assert.match(html,new RegExp(`id="${id}"`),`${id} must be preserved`);
}
for(const action of ['calculateCurrentItem','renderCart','addToCart','resetItemForm','generatePriceTiers','copyTiersToClipboard','openFinalizeModal','previewCorporateDocument','generateCorporatePDF','generateCorporatePNG','sendWhatsApp','clearCart']){
 assert.match(html,new RegExp(`function ${action}\\(`),`${action} remains wired`);
}
assert.match(html,/html2canvas\/1\.4\.1/,'PNG dependency preserved');
assert.match(html,/jspdf\/2\.5\.1/,'PDF dependency preserved');
assert.equal(existsSync('public/suite-header.js'),true,'Shared header preserved');
console.log('PASS V86.53 Pricelist redesign: eight categories, quote controls, export functions, keyboard and responsive layout preserved');
