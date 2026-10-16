// Isolated Chromium regression: production modal handlers + strict backup read-back.
// Never connects to production Supabase or writes customer data.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {chromium} from '../source/node_modules/playwright/index.mjs';
const read=name=>readFileSync('public/'+name,'utf8');
const excluded=new Set(['supabase-bridge.js','suite-header.js']);
const initial=[
 {jobsheetFiles:'OCT-001',customer:'October job',orderDate:'2026-10-08',item:'Shirt',invoice:'INV-KEEP'},
 {jobsheetFiles:'SEP-001',customer:'September job',orderDate:'2026-09-14',item:'Bag'},
 {jobsheetFiles:'UNDATED-001',customer:'Undated job',item:'Mug'}
];
const mock=`<script>(()=>{
 let jobs=${JSON.stringify(initial)},version=7,writeCount=0;
 // Force the normal browser download/reselect path for automated tests.
 Object.defineProperty(window,'showSaveFilePicker',{configurable:true,value:undefined});
 window.__mockState=()=>({jobs,version,writeCount});
 window.__mockAdvance=()=>version++;
 window.fetch=async(input,options={})=>{
  const url=new URL(String(input),'https://local.test');
  if(url.pathname!=='/api/state')return new Response('',{status:404});
  const scope=url.searchParams.get('scope');
  if((options.method||'GET')==='PUT'){
   const request=JSON.parse(options.body);
   if(request.expectedVersion!==version)return new Response('',{status:409});
   if(request.scope==='dashboard:jobs'){jobs=request.payload.jobs;writeCount++;version++}
   return new Response(JSON.stringify({version,payload:request.payload}),{status:200,headers:{'content-type':'application/json'}});
  }
  const data=scope==='dashboard:jobs'?{version,payload:{jobs,savedAt:Date.now()}}:{version:1,payload:{}};
  return new Response(JSON.stringify(data),{status:200,headers:{'content-type':'application/json'}});
 };
})();</script>`;
let html=read('job-management.html').replace('</head>',mock+'</head>');
html=html.replace(/<script\s+src="([^"]+)"[^>]*>\s*<\/script>/gi,(tag,src)=>{
 const name=src.split('?')[0];if(excluded.has(name))return '';
 return `<script>${read(name).replaceAll('</script','<\\/script')}</script>`;
}).replace(/<link\s+rel="stylesheet"[^>]*>/gi,'');
let browser;
try{
 browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE||undefined,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1280,height:850},acceptDownloads:true});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setContent(html,{waitUntil:'domcontentloaded'});
 await page.waitForFunction(()=>document.querySelector('#syncLabel')?.textContent==='Shared · Live');
 assert.equal(await page.locator('#monthFilter').inputValue(),String(new Date().getMonth()));
 assert.equal(await page.locator('#yearFilter').inputValue(),String(new Date().getFullYear()));
 await page.locator('#exportQuick').click();
 assert.equal(await page.evaluate(()=>window.KSOutsideClose?.frontModal()?.id),'exportModal');
 assert.match(await page.locator('#exportFoot').innerText(),/Shared total: 3/);
 let event=page.waitForEvent('download');await page.locator('#downloadExcelQuick').click();
 let download=await event;
 const xlsx=readFileSync(await download.path());
 assert.equal(xlsx.subarray(0,4).toString('hex'),'504b0304');
 assert.equal(download.suggestedFilename(),'kidzstudios-jobs-all.xlsx');
 event=page.waitForEvent('download');await page.locator('#exportCsvAll').click();
 const csv=readFileSync(await (await event).path(),'utf8');
 assert.match(csv,/UNDATED-001/);assert.equal(csv.trim().split(/\r?\n/).length,4);
 assert.match(await page.locator('#exportStatus').innerText(),/Download requested/);
 assert.equal(await page.locator('#exportModal.open').count(),1);
 event=page.waitForEvent('download');await page.locator('#exportBackup').click();
 const backup=JSON.parse(readFileSync(await (await event).path(),'utf8'));
 assert.equal(backup.jobs.length,3);
 await page.locator('#dataHubImportTab').click();
 let fileEvent=page.waitForEvent('filechooser');await page.locator('#importExcelQuick').click();
 await (await fileEvent).setFiles('scripts/fixtures/job-management-import.xlsx');
 await page.locator('#excelImportModal.open').waitFor();
 assert.equal(await page.locator('#excelImportMode').inputValue(),'merge');
 // Shared jobs MUST NOT be touched when download triggers.
 event=page.waitForEvent('download');await page.locator('#excelImportConfirm').click();
 download=await event;
 const safetyBytes=readFileSync(await download.path());
 assert.equal(JSON.parse(safetyBytes.toString()).jobs.length,3);
 assert.equal(await page.evaluate(()=>window.__mockState().writeCount),0);
 await page.locator('#backupVerifyPanel:visible').waitFor();
 // Wrong saved file must fail verification and block import.
 fileEvent=page.waitForEvent('filechooser');await page.locator('#backupVerifyChoose').click();
 await (await fileEvent).setFiles({name:'wrong.json',mimeType:'application/json',buffer:Buffer.from('{}')});
 assert.match(await page.locator('#backupVerifyStatus').innerText(),/does not match/);
 assert.equal(await page.evaluate(()=>window.__mockState().writeCount),0);
 // Correct saved file allows the version check and the write.
 fileEvent=page.waitForEvent('filechooser');await page.locator('#backupVerifyChoose').click();
 await (await fileEvent).setFiles({name:'backup.json',mimeType:'application/json',buffer:safetyBytes});
 await page.waitForFunction(()=>window.__mockState().jobs.length===4);
 assert.equal(await page.evaluate(()=>window.__mockState().writeCount),1);
 const merged=await page.evaluate(()=>window.__mockState().jobs.map(j=>j.jobsheetFiles));
 for(const ref of ['OCT-001','SEP-001','UNDATED-001','TEST-XLSX-001'])assert.ok(merged.includes(ref),`Missing merged job ${ref}`);
 // A second import with a blank customer may not erase it.
 await page.locator('#dataHubImportTab').click();
 fileEvent=page.waitForEvent('filechooser');await page.locator('#importExcelQuick').click();
 await (await fileEvent).setFiles({name:'partial.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({jobs:[{jobsheetFiles:'OCT-001',customer:'',item:'Updated shirt'}]}))});
 await page.locator('#excelImportModal.open').waitFor();
 event=page.waitForEvent('download');await page.locator('#excelImportConfirm').click();
 download=await event;
 const backupForPartial=readFileSync(await download.path());
 fileEvent=page.waitForEvent('filechooser');await page.locator('#backupVerifyChoose').click();
 await (await fileEvent).setFiles({name:'backup.json',mimeType:'application/json',buffer:backupForPartial});
 await page.waitForFunction(()=>window.__mockState().writeCount===2);
 assert.equal(await page.evaluate(()=>window.__mockState().jobs.find(j=>j.jobsheetFiles==='OCT-001').customer),'October job');
 assert.equal(await page.evaluate(()=>window.__mockState().jobs.find(j=>j.jobsheetFiles==='OCT-001').item),'Updated shirt');
 // Cancellation blocks writes and leaves preview for retry.
 await page.locator('#dataHubImportTab').click();
 fileEvent=page.waitForEvent('filechooser');await page.locator('#importExcelQuick').click();
 await (await fileEvent).setFiles({name:'new.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({jobs:[{jobsheetFiles:'CANCEL-001',customer:'Cancel me'}]}))});
 await page.locator('#excelImportModal.open').waitFor();
 event=page.waitForEvent('download');await page.locator('#excelImportConfirm').click();await event;
 await page.locator('#backupVerifyCancel').click();
 assert.match(await page.locator('#excelImportSummary').innerText(),/not saved/i);
 assert.equal(await page.evaluate(()=>window.__mockState().writeCount),2);
 // Browser-side stale version is stopped before PUT.
 event=page.waitForEvent('download');await page.locator('#excelImportConfirm').click();download=await event;
 const staleBackup=readFileSync(await download.path());
 await page.evaluate(()=>window.__mockAdvance());
 fileEvent=page.waitForEvent('filechooser');await page.locator('#backupVerifyChoose').click();
 await (await fileEvent).setFiles({name:'backup.json',mimeType:'application/json',buffer:staleBackup});
 await page.waitForFunction(()=>document.querySelector('#excelImportSummary')?.textContent.includes('not saved'));
 assert.equal(await page.evaluate(()=>window.__mockState().writeCount),2);
 // Simulated native picker via the real Export button: save, read-back, cancel.
 await page.evaluate(()=>{
  Object.defineProperty(window,'showSaveFilePicker',{configurable:true,writable:true,value:async()=>{
   let stored=null;
   return{
    createWritable:async()=>({write:async blob=>{stored=blob},close:async()=>{},abort:async()=>{}}),
    getFile:async()=>new File([await stored.arrayBuffer()],'verified.json',{type:'application/json'})
   };
  }});
 });
 await page.locator('#excelImportCancel').click();
 await page.locator('#dataHubExportTab').click();
 await page.locator('#exportBackup').click();
 await page.waitForFunction(()=>document.querySelector('#exportStatus')?.textContent.includes('File saved and verified'));
 assert.match(await page.locator('#exportStatus').innerText(),/File saved and verified/);
 await page.evaluate(()=>{window.showSaveFilePicker=async()=>{throw new DOMException('Canceled','AbortError')}});
 await page.locator('#exportBackup').click();
 await page.waitForFunction(()=>document.querySelector('#exportStatus')?.textContent.includes('Save cancelled'));
 assert.match(await page.locator('#exportStatus').innerText(),/Save cancelled/);
 assert.deepEqual(errors,[],`JS errors: ${errors.join(', ')}`);
 console.log('PASS V86.53 Data Hub V2: all exports; strict backup mismatch/cancel/verified; sparse merge; stale-version block');
} finally{await browser?.close()}
