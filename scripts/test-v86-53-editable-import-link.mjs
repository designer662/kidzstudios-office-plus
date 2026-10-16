// The Google Sheet URL can be edited, saved locally, imported, and reset.
// Chromium test uses mocked API and Google Sheet CSV; never touches real data.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {chromium} from '../source/node_modules/playwright/index.mjs';
const read=name=>readFileSync('public/'+name,'utf8');
const configured='https://docs.google.com/spreadsheets/d/configSheet123/edit?gid=22';
const first='https://docs.google.com/spreadsheets/d/firstSheet123/edit?gid=45';
const second='https://docs.google.com/spreadsheets/d/secondSheet123/edit?gid=56';
const mock=`<script>(()=>{
 const memory=window.__sheetMemory||(window.__sheetMemory={});
 Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>memory[k]??null,setItem:(k,v)=>{memory[k]=String(v)},removeItem:k=>{delete memory[k]}}});
 let writes=0,reads=[];
 window.__linkFixture=()=>({writes,reads});
 window.fetch=async(input,options={})=>{
  const u=new URL(String(input),'https://office.test');
  if(u.hostname==='docs.google.com'&&u.pathname.includes('/export')){
   reads.push(u.href);
   return new Response('JOBSHEET/FILES,CUSTOMER,ITEM\\nLINK-001,Imported from link,Shirt\\n',{status:200,headers:{'content-type':'text/csv'}});
  }
  if(u.pathname==='/api/state'){
   const scope=u.searchParams.get('scope');
   if(options.method==='PUT'){writes++;return new Response('',{status:409})}
   const payload=scope==='config:global'?{jobManagementUrl:${JSON.stringify(configured)}}:scope==='dashboard:jobs'?{jobs:[{jobsheetFiles:'KEEP-001',customer:'Existing',item:'Bag'}],savedAt:Date.now()}:{};
   return new Response(JSON.stringify({version:7,payload}),{status:200,headers:{'content-type':'application/json'}});
  }
  return new Response('',{status:404});
 };
})();</script>`;
let html=read('job-management.html').replace('</head>',mock+'</head>');
html=html.replace(/<script\s+src="([^"]+)"[^>]*>\s*<\/script>/gi,(_tag,src)=>{
 const name=src.split('?')[0];
 if(['supabase-bridge.js','suite-header.js'].includes(name))return '';
 return `<script>${read(name).replaceAll('</script','<\\/script')}</script>`;
}).replace(/<link\s+rel="stylesheet"[^>]*>/gi,'');
let browser;
try{
 browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE||undefined,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:390,height:844}});
 const errors=[];page.on('pageerror',err=>errors.push(err.message));
 await page.setContent(html,{waitUntil:'domcontentloaded'});
 await page.waitForFunction(()=>document.querySelector('#syncLabel')?.textContent==='Shared · Live');
 await page.locator('#exportQuick').click();await page.locator('#dataHubImportTab').click();
 assert.equal(await page.locator('#sheetImportUrl').inputValue(),configured,'Configured link must load in editable field');
 await page.locator('#sheetImportUrl').fill('javascript:alert(1)');
 await page.locator('#saveSheetLinkBtn').click();
 assert.match(await page.locator('#sheetImportStatus').innerText(),/Use a https:\/\/docs.google.com/);
 assert.equal(await page.locator('#openSheetBtn').getAttribute('href'),null,'Invalid link must not be opened');
 await page.locator('#sheetImportUrl').fill(first);
 await page.locator('#saveSheetLinkBtn').click();
 assert.match(await page.locator('#sheetImportStatus').innerText(),/saved on this browser/);
 assert.equal(await page.evaluate(()=>localStorage.getItem('ks:job-management:sheet-import-url:v1')),first);
 assert.match(await page.locator('#openSheetBtn').getAttribute('href'),/firstSheet123/);
 await page.setContent(html,{waitUntil:'domcontentloaded'});
 await page.waitForFunction(()=>document.querySelector('#syncLabel')?.textContent==='Shared · Live');
 await page.locator('#exportQuick').click();await page.locator('#dataHubImportTab').click();
 assert.equal(await page.locator('#sheetImportUrl').inputValue(),first,'Saved link must survive reload');
 await page.locator('#sheetImportUrl').fill(second);
 await page.locator('#importBtn').click();
 await page.locator('#excelImportModal.open').waitFor();
 assert.match(await page.locator('#excelImportSummary').innerText(),/1 jobs ready/);
 assert.equal(await page.locator('#excelImportMode').inputValue(),'merge');
 assert.equal(await page.evaluate(()=>window.__linkFixture().writes),0,'Preview must not save shared jobs');
 assert.match((await page.evaluate(()=>window.__linkFixture().reads)).at(-1),/secondSheet123\/export\?format=csv&gid=56/);
 assert.equal(await page.evaluate(()=>localStorage.getItem('ks:job-management:sheet-import-url:v1')),second,'Imported link must be remembered');
 await page.locator('#excelImportCancel').click();
 await page.locator('#resetSheetLinkBtn').click();
 assert.equal(await page.locator('#sheetImportUrl').inputValue(),configured);
 assert.equal(await page.evaluate(()=>localStorage.getItem('ks:job-management:sheet-import-url:v1')),null);
 assert.equal(await page.evaluate(()=>window.__linkFixture().writes),0);
 assert.deepEqual(errors,[],`Page errors: ${errors.join('; ')}`);
 console.log('PASS V86.53 editable import link: validation, save, reload, change, import preview, reset, zero writes');
} finally {await browser?.close()}
