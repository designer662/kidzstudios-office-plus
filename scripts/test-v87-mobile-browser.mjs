import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {chromium} from '../source/node_modules/playwright/index.mjs';
const css=['suite-header-v61.css','suite-header-minimal.css','office-responsive-v87.css'].map(f=>readFileSync('public/'+f,'utf8')).join('\n');
const js=readFileSync('public/office-mobile-nav.js','utf8');
let browser;
try{
 browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE||undefined,args:['--no-sandbox']});
 for(const name of ['index.html','job-management.html','report.html','orderform1.html']){
  const src=readFileSync('public/'+name,'utf8');
  const header=src.match(/<header\b[^>]*class="[^"]*ks-master-header[^"]*"[^>]*>[\s\S]*?<\/header>/i)?.[0];
  assert(header,`Missing shared header in ${name}`);
  for(const width of [320,390,768,1200]){
   const page=await browser.newPage({viewport:{width,height:844}});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.setContent(`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}</style></head><body>${header}</body></html>`);
   // suite-header.js dynamically adds the reports link before the menu runs.
   await page.evaluate(()=>{const a=document.createElement('a');a.className='tool-nav-btn';a.href='report.html';a.dataset.tool='Reports';a.innerHTML='<span class="nav-tool-icon">▥</span><span>Reports</span>';document.querySelector('.tool-nav').append(a)});
   await page.addScriptTag({content:js});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width,`Page overflow at ${width} in ${name}`);
   assert.equal(await page.locator('#ksMobileMenu').isVisible(),width<=900,`Menu breakpoint in ${name}`);
   if(width<=900){
    await page.locator('#ksMobileMenu').click();
    assert.equal(await page.locator('#ksMobileLayer').isVisible(),true);
    assert.equal(await page.locator('.ks-mobile-menu-link').count(),10);
    assert.equal(await page.locator('#ksMobileMenu').getAttribute('aria-expanded'),'true');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#ksMobileLayer').isVisible(),false);
    assert.equal(await page.locator('#ksMobileMenu').getAttribute('aria-expanded'),'false');
   }
   assert.deepEqual(errors,[],`Browser JS errors in ${name} at ${width}`);
   await page.close();
  }
 }
 console.log('PASS V87 Chromium responsive nav on 4 pages × 4 device widths, overflow, open, Escape, focus, accessibility');
}finally{await browser?.close()}
