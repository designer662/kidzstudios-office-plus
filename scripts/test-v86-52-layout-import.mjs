import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
const read=p=>readFileSync(p,'utf8');
const pages=['index','job-management','report','calculator','pricelist-calculator','markup-calculator','commission','file-name-generator','files-compress','orderform1','orderform2'];
for(const name of pages){
 const html=read(`public/${name}.html`);
 const links=(html.match(/office-layout-v86-52\.css/g)||[]).length;
 if(name==='index'){
  assert.equal(links,1,'dashboard alone loads custom alignment stylesheet');
  assert.match(html,/office-layout-v86-52\.css\?v=86\.52\.1/);
 }else assert.equal(links,0,`${name} must retain its previous UI layout`);
}
assert.match(read('public/index.html'),/<body class="ks-dashboard">/,'dashboard scope required');
assert.ok(existsSync('public/office-layout-v86-52.css'));
const css=read('public/office-layout-v86-52.css');
assert.match(css,/body\.ks-dashboard \.ks-master-header \.tool-nav/,'navigation change is dashboard-only');
assert.match(css,/body\.ks-dashboard #mapShell/,'center home canvas');
assert.match(css,/overflow-x:auto!important/,'scrollable navigation');
for(const bad of ['body[data-ks-page=', 'body:not(.ks-dashboard)', '.stats.v44-stats', '.report-page', '.calculator-container']){
 assert.ok(!css.includes(bad),`shared-layout CSS cannot modify other pages: ${bad}`);
}
const job=read('public/job-management.html');
assert.ok(!job.includes('function recordsFromGrid(headers,rows){'),'duplicate Google/Excel parser was not removed');
assert.ok(!job.includes('const EXACT_MAP='),'legacy map duplicated shared aliases');
assert.match(job,/KSJobData\.loadGoogleSheet\(sheetUrl\)/,'shared Google Sheet loader');
assert.match(job,/KSJobData\.recordsFromGrid\(grid\.headers,grid\.rows,FIELDS\)/,'shared date-aware conversion');
assert.match(job,/KSJobs\.validateUniqueRefs\(list\)/,'reject duplicate refs');
assert.match(job,/const result=await saveFile\(backup.blob,backup.name,\{strict:true\}\)/,'verified backup before import');
assert.match(job,/id="exportCsvAll"/,'All Jobs CSV option');
assert.match(job,/function exportAllCsv\(\)\{return exportRowsCsv\(jobs/,'All Jobs export is not silently year-filtered');
assert.match(job,/expectedVersion:version/,'CAS version guard retained');
const sandbox={window:{},AbortController,URL,URLSearchParams,Date,Number,String,Math,Set,Array,Object,TextEncoder,fetch:async()=>({ok:true,status:200,headers:new Headers(),text:async()=>`JOBSHEET/FILES,CUSTOMER,ORDER DATE,ITEM\nKS-101,Client A,15/10/2026,Poster\nKS-102,Client B,2026-10-16,Book\n`}),setTimeout,clearTimeout,Headers};
vm.runInNewContext(read('public/job-data.js'),sandbox);
const fields=[['JOBSHEET/FILES','jobsheetFiles'],['CUSTOMER','customer'],['ORDER DATE','orderDate'],['ITEM','item']];
const source=await sandbox.window.KSJobData.loadGoogleSheet('https://docs.google.com/spreadsheets/d/abc123/edit#gid=0');
const jobs=sandbox.window.KSJobData.recordsFromGrid(source.headers,source.rows,fields);
assert.equal(jobs.length,2);
assert.equal(jobs[0].orderDate,'2026-10-15');
assert.equal(jobs[1].jobsheetFiles,'KS-102');
assert.throws(()=>sandbox.window.KSJobData.parseSheetUrl('https://unsafe.example/x'),/docs.google.com/);
assert.equal(sandbox.window.KSJobData.csvValue('=SUM(1,2)'),`"'=SUM(1,2)"`);
console.log('PASS V86.52.1: only index dashboard styled, original Job Management preserved, Sheet/CSV import/export maintained');
