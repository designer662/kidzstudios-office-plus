import {readFileSync} from 'node:fs';
import {strict as assert} from 'node:assert';
import vm from 'node:vm';
const pages=['index.html','job-management.html','calculator.html','pricelist-calculator.html','markup-calculator.html','orderform1.html','orderform2.html','commission.html','file-name-generator.html','files-compress.html'];
for(const page of pages){const html=readFileSync(`public/${page}`,'utf8');assert(html.includes('suite-header-v61.css'),`${page} missing shared header fix`);assert(/class="[^"]*ks-master-header/.test(html),`${page} missing master header`)}
const jm=readFileSync('public/job-management.html','utf8');
for(const id of ['importExcelFile','excelImportModal','excelImportConfirm','exportExcelCurrent','exportExcelAll','exportExcelTemplate'])assert(jm.includes(`id="${id}"`),`Missing ${id}`);
globalThis.window=globalThis;
vm.runInThisContext(readFileSync('public/office-workbook.js','utf8'));
const headers=['JOBSHEET/FILES','INVOICE','CUSTOMER','PRIORITY','ITEM','DESIGN CHARGE','TYPE OF PRINTING','ARTWORK STATUS','PAYMENT STATUS','COLLECTION','ORDER DATE','DELIVERY TIME','ACTUAL COMPLETE','DAYS LEFT','SALES','DESIGNER','SUPPLIER','SUPPLIER STATUS','PRODUCTION PIC','QC STATUS','ACTUAL COMPLETE','INVOICE AMOUNT','PAID','BALANCE','CURRENT DEPARTMENT','DAYS LEFT','LAST UPDATE','REMARK'];
const row=Array(28).fill('');row[0]='KS-100';row[1]='000456';row[2]='Customer <&>';row[10]='2026-10-12';row[21]='1200.50';row[27]='=NotAFormula';
const data=new Uint8Array(await KSOfficeWorkbook.makeXlsx(headers,[row]).arrayBuffer());
const v=new DataView(data.buffer);assert.equal(v.getUint32(0,true),0x04034b50,'Not a ZIP header');
assert.equal(v.getUint32(data.length-22,true),0x06054b50,'Not a ZIP end header');
const zipped=new TextDecoder().decode(data);
assert(zipped.includes('Customer &lt;&amp;&gt;'),'XML escaping failed');
assert(zipped.includes('<t xml:space="preserve">=NotAFormula</t>'),'Formula should be plain text');
console.log('PASS: 10 headers, Excel controls, valid ZIP signatures, 28-column workbook, escaped/safe values');
