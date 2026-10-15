// Real Chromium regression for Job Management XLSX: download -> import preview.
// Authenticated Supabase is deliberately excluded from this isolated IO test.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {chromium} from '../source/node_modules/playwright/index.mjs';
const read=name=>readFileSync('public/'+name,'utf8');
const excluded=new Set(['supabase-bridge.js','suite-header.js','office-outside-close.js']);
const mockApi=`<script>window.fetch=async(input,options={})=>{const url=new URL(String(input),'https://local.test');if(url.pathname==='/api/state')return new Response(JSON.stringify({version:1,payload:{jobs:[]}}),{status:200,headers:{'content-type':'application/json'}});return new Response('',{status:404})}</script>`;
let html=read('job-management.html').replace('</head>',mockApi+'</head>');
html=html.replace(/<script\s+src="([^"]+)"[^>]*>\s*<\/script>/gi,(tag,source)=>{
 const name=source.split('?')[0];
 if(excluded.has(name))return '';
 try{return `<script>${read(name).replaceAll('</script','<\\/script')}</script>`}catch{return ''}
}).replace(/<link\s+rel="stylesheet"[^>]*>/gi,'');
let browser;
try{
 browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE||undefined,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1280,height:850},acceptDownloads:true});
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.setContent(html,{waitUntil:'domcontentloaded'});
 await page.waitForFunction(()=>document.querySelector('#syncLabel')?.textContent==='Shared · Live');
 await page.locator('#exportQuick').click();
 assert.equal(await page.locator('#downloadExcelQuick').isVisible(),true);
 const event=page.waitForEvent('download');
 await page.locator('#downloadExcelQuick').click();
 const download=await event;
 assert.equal(download.suggestedFilename(),'kidzstudios-jobs-template.xlsx');
 const exported=readFileSync(await download.path());
 assert.equal(exported.readUInt32LE(0),0x04034b50,'Downloaded XLSX must have a ZIP header');
 // Import a genuine compressed XLSX fixture (ZIP method 8, sharedStrings).
 // This catches failures that signature-only tests missed.
 const sample=readFileSync('scripts/fixtures/job-management-import.xlsx');
 await page.locator('#dataHubImportTab').click();
 assert.equal(await page.locator('#importExcelQuick').isVisible(),true);
 const chooser=page.waitForEvent('filechooser');
 await page.locator('#importExcelQuick').click();
 const picker=await chooser;
 await picker.setFiles({name:'jobs.xlsx',mimeType:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',buffer:sample});
 await page.locator('#excelImportModal.open').waitFor();
 assert.match(await page.locator('#excelImportSummary').innerText(),/1 jobs ready/);
 assert.match(await page.locator('#excelImportRows').innerText(),/TEST-XLSX-001/);
 // Preview must remain a preview: no PUT or replacement before confirmation.
 assert.equal(await page.locator('#excelImportConfirm').isEnabled(),true);
 assert.equal(await page.locator('#excelImportMode').inputValue(),'merge');
 await page.locator('#excelImportCancel').click();
 assert.equal(await page.locator('#excelImportModal.open').count(),0);
 assert.deepEqual(errors,[],`Browser errors: ${errors.join(', ')}`);
 console.log('PASS V86.53 Excel Chromium: download, valid XLSX, import preview, safety confirmation and cancel');
}finally{await browser?.close()}
