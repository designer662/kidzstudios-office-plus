// Browser regression: full CSV/backup download plus graceful XLSX failure.
// Excludes authentication: checks the file/download UI only, never writes shared jobs.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {chromium} from '../source/node_modules/playwright/index.mjs';
const root='public/';const read=name=>readFileSync(root+name,'utf8');
const excluded=new Set(['supabase-bridge.js','suite-header.js','office-outside-close.js']);
let html=read('job-management.html');
html=html.replace(/<script\s+src="([^"]+)"[^>]*>\s*<\/script>/gi,(tag,source)=>{
 const name=source.split('?')[0];if(excluded.has(name))return '';
 try{return `<script>${read(name).replaceAll('</script','<\\/script')}</script>`}catch{return ''}
}).replace(/<link\s+rel="stylesheet"[^>]*>/gi,'');
html=html.replace('})();\n</script>','window.__fixtureJobs = records=>{jobs=records;render()};})();\n</script>');
let browser;
try{
 browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE||undefined,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1200,height:820},acceptDownloads:true});
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.setContent(html,{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>window.__fixtureJobs(Array.from({length:260},(_,i)=>({jobsheetFiles:`TEST-${String(i+1).padStart(3,'0')}`,customer:`Customer ${i}`,orderDate:'2026-10-15',currentDepartment:'PRODUCTION'}))));
 await page.locator('#exportQuick').click();
 assert.equal(await page.locator('#exportModal.open').count(),1);
 const csvEvent=page.waitForEvent('download');await page.locator('#exportCsvAll').click();
 const csv=await csvEvent;const text=readFileSync(await csv.path(),'utf8');
 assert.match(csv.suggestedFilename(),/\.csv$/i);assert.match(text,/TEST-260/);
 assert.equal(text.trim().split(/\r?\n/).length,261,'Exports all 260 records and header');
 await page.locator('#exportQuick').click();
 const backupEvent=page.waitForEvent('download');await page.locator('#exportBackup').click();
 const json=JSON.parse(readFileSync(await (await backupEvent).path(),'utf8'));
 assert.equal(json.jobs.length,260,'JSON backup must include every shared job');
 await page.locator('#exportQuick').click();
 await page.evaluate(()=>{window.KSOfficeWorkbook={makeXlsx(){throw new Error('TEST-XLSX-FAILURE')}}});
 await page.locator('#exportExcelAll').click();
 assert.equal(await page.locator('#exportModal.open').count(),1,'Dialog must stay open if XLSX fails');
 assert.match(await page.locator('#exportStatus').innerText(),/failed/i);
 assert.deepEqual(errors,[]);
 console.log('PASS V86.53 export browser: 260-row CSV, complete JSON backup, visible XLSX failure state');
}finally{await browser?.close()}
