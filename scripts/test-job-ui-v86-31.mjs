import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const html=readFileSync('public/job-management.html','utf8');
const index=readFileSync('public/index.html','utf8');
const workflow=readFileSync('.github/workflows/deploy-pages.yml','utf8');
for(const [name,page] of [['index.html',index],['job-management.html',html]]){
 assert.match(page,/<link rel="stylesheet" href="suite-header-v61\.css\?v=66\.0">/,`${name} loads the corrected shared header`);
}
for(const id of ['importExcelBtn','importExcelFile','excelImportModal','excelImportConfirm','excelImportSummary','exportExcelCurrent','exportExcelAll','exportExcelTemplate','importLocalBtn','importLocalFile']){
 assert(html.includes(`id="${id}"`),`Missing functional control: ${id}`);
}
for(const src of ['job-data.js','office-workbook.js','job-rules.js'])assert(new RegExp(`src="${src.replaceAll('.', '\\.').replaceAll('-', '-')}(?:\\?[^"]+)?"`).test(html),`Missing reusable dependency ${src}`);
for(const id of ['fJobsheetFiles','fCustomer','fOrderDate','fQuantity','fArtworkLink','fInvoiceAmount'])assert(html.includes(`for="${id}"`),`Accessible label missing ${id}`);
assert(html.includes('aria-invalid'), 'Form fields must expose invalid states');
assert(html.includes('100dvh - 16px'),'Editor must be viewport/keyboard height aware');
assert(html.includes('if(saving)return;'),'Reject repeated save submissions');
assert(html.includes("return window.KSJobData.csvValue(v)"),'CSV export must escape spreadsheet formulas');
assert(html.includes('window.KSOfficeWorkbook.readXlsx(file)'),'Excel import must actually parse workbook');
assert(html.includes('window.KSOfficeWorkbook.makeXlsx(headers,rows'),'Excel download must use workbook builder');
assert(html.includes('const ok=await saveAll(`${mode===\'merge\'?\'merged\':\'restored\'} ${preview.list.length} jobs from ${preview.fileName}`,target.list)'),'Excel import must save verified merged or restored rows to shared state');
assert(html.includes('baseVersion:version'),'Excel preview must snapshot server revision');
assert(html.includes('const result=await saveFile(backup.blob,backup.name,{strict:true})'),'Backup must be verified before import');
assert(html.includes("if(result.state!=='verified')throw Error"),'Unverified backup blocks shared database save');
assert(workflow.includes('node scripts/test-job-ui-v86-31.mjs'),'Run the new regression in CI');
const start=html.indexOf('const JOB_ERROR_FIELDS=');
const end=html.indexOf('async function saveEditor()',start);
assert(start>=0&&end>start,'Find real field-level validation mapping');
const seen=[];
const input={id:'fCustomer',closest:()=>({open:false,appendChild(n){seen.push(n)}}),setAttribute(k,v){seen.push([k,v])},focus(){seen.push('focused')},scrollIntoView(){}};
const doc={querySelectorAll:()=>[],getElementById:()=>input,createElement:()=>({id:'',className:'',textContent:''})};
const sandbox={document:doc};vm.createContext(sandbox);
vm.runInContext(html.slice(start,end),sandbox);
sandbox.showJobFieldError('CUSTOMER is required.');
assert(seen.includes('focused'), 'Validation must focus the invalid field');
assert(seen.some(v=>Array.isArray(v)&&v[0]==='aria-invalid'&&v[1]==='true'),'Expose error to assistive technology');
console.log('PASS V86.31: shared header fix, real workbook controls, field focus/ARIA, mobile modal sizing, safe CSV and save guards');
