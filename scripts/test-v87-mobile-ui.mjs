import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync} from 'node:fs';
const pages = readdirSync('public').filter(name => name.endsWith('.html'));
assert.equal(pages.length,11,'Expect all 11 shipped pages');
for (const name of pages){
 const html=readFileSync('public/'+name,'utf8');
 assert.match(html,/office-responsive-v87\.css\?v=87\.0/,'Missing responsive CSS on '+name);
 assert.match(html,/office-mobile-nav\.js\?v=87\.0/,'Missing menu JS on '+name);
 assert(html.indexOf('suite-header.js?v=86.54') < html.indexOf('office-mobile-nav.js?v=87.0'),'Menu must load after suite header on '+name);
 assert(!html.includes('maximum-scale=1.0'),'Phone zoom must not be disabled on '+name);
}
assert.match(readFileSync('public/index.html','utf8'),/office-mobile-layout\.css\?v=86\.54/);
const js=readFileSync('public/office-mobile-nav.js','utf8');
for(const token of ['aria-expanded','aria-modal','Escape','matchMedia','ks-mobile-menu-open','aria-current','preventScroll']) assert(js.includes(token),'Missing accessible menu behavior: '+token);
const css=readFileSync('public/office-responsive-v87.css','utf8');
for(const token of ['@media(max-width:900px)','safe-area-inset-bottom','prefers-reduced-motion','overscroll-behavior-x','@media print']) assert(css.includes(token),'Missing mobile handling: '+token);
for(const archive of readdirSync('.').filter(n=>n.endsWith('.zip')))assert.fail(`Unexpected historic root patch archive: ${archive}`);
assert(existsSync('supabase/migrations/20261009000100_office_plus.sql'));
console.log(`PASS V87 responsive: all ${pages.length} pages, phone navigation, print fidelity, no historic patch archives`);
