// End-to-end Job Management Data Hub using isolated read-only mock API; no live Supabase writes.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {chromium} from '../source/node_modules/playwright/index.mjs';
const read=name=>readFileSync('public/'+name,'utf8');
const excluded=new Set(['supabase-bridge.js','suite-header.js']);
const initial=[
 {jobsheetFiles:'OCT-001',customer:'October job',orderDate:'2026-10-08',item:'Shirt'},
 {jobsheetFiles:'SEP-001',customer:'September job',orderDate:'2026-09-14',item:'Bag'},
 {jobsheetFiles:'UNDATED-001',customer:'Undated job',item:'Mug'}
];
const mock=`<script>(()=>{
 let jobs=${JSON.stringify(initial)},version=7;
 window.__mockState=()=>({jobs,version});
 window.fetch=async(input,options={})=>{
  const url=new URL(String(input),'https://local.test');
  if(url.pathname!=='/api/state')return new Response('',{status:404});
  const scope=url.searchParams.get('scope');
  if((options.method||'GET')==='PUT'){
   const request=JSON.parse(options.body);
   if(request.expectedVersion!==version)return new Response('',{status:409});
   jobs=request.payload.jobs;version++;
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
 const expectedMonth=String(new Date().getMonth()),expectedYear=String(new Date().getFullYear());
 assert.equal(await page.locator('#monthFilter').inputValue(),expectedMonth);
 assert.equal(await page.locator('#yearFilter').inputValue(),expectedYear);
 await page.locator('#exportQuick').click();
 assert.equal(await page.evaluate(() => window.KSOutsideClose?.frontModal()?.id), 'exportModal', 'Real outside-click guard must be loaded');
 assert.match(await page.locator('#exportFoot').innerText(),/Shared total: 3/);
 let event=page.waitForEvent('download');await page.locator('#downloadExcelQuick').click();
 let downloaded=await event;
 const xlsx=readFileSync(await downloaded.path());
 assert.equal(xlsx.subarray(0,4).toString('hex'),'504b0304');
 assert.equal(downloaded.suggestedFilename(),'kidzstudios-jobs-all.xlsx');
 event=page.waitForEvent('download');await page.locator('#exportCsvAll').click();
 const csv=readFileSync(await (await event).path(),'utf8');
 assert.match(csv,/UNDATED-001/);assert.equal(csv.trim().split(/\r?\n/).length,4);
 assert.equal(await page.locator('#exportModal.open').count(),1,'Data Hub remains open after download');
 event=page.waitForEvent('download');await page.locator('#exportBackup').click();
 const backup=JSON.parse(readFileSync(await (await event).path(),'utf8'));
 assert.equal(backup.jobs.length,3);
 await page.locator('#dataHubImportTab').click();
 const fileEvent=page.waitForEvent('filechooser');await page.locator('#importExcelQuick').click();
 await (await fileEvent).setFiles('scripts/fixtures/job-management-import.xlsx');
 await page.locator('#excelImportModal.open').waitFor();
 assert.equal(await page.locator('#excelImportMode').inputValue(),'merge');
 assert.match(await page.locator('#excelImportImpact').innerText(),/3 unrelated shared jobs will remain/);
 event=page.waitForEvent('download');await page.locator('#excelImportConfirm').click();
 const safetyBackup=JSON.parse(readFileSync(await (await event).path(),'utf8'));
 assert.equal(safetyBackup.jobs.length,3,'Backup runs BEFORE import save');
 await page.waitForFunction(()=>window.__mockState().jobs.length===4);
 const merged=await page.evaluate(()=>window.__mockState().jobs.map(j=>j.jobsheetFiles));
 for(const ref of ['OCT-001','SEP-001','UNDATED-001','TEST-XLSX-001'])assert.ok(merged.includes(ref),`Missing merged job ${ref}`);
 assert.deepEqual(errors,[],`JS errors: ${errors.join(', ')}`);
 console.log('PASS V86.53 Job Data Hub Chromium: current month, XLSX/CSV/JSON downloads, import preview, backup-before-merge and 4 retained jobs');
} finally{await browser?.close()}
