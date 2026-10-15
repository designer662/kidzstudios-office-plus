import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read=path=>readFileSync(path,'utf8');
const model=vm.createContext({TextEncoder,Date,Map,Set,Math,Object,Number,Array,String});
vm.runInContext(read('public/job-rules.js'),model);
vm.runInContext(read('public/report-data.js'),model);
const M=model.KSReportModel;
const records=Array.from({length:257},(_,i)=>({
  jobsheetFiles:'JOB-'+String(i+1).padStart(3,'0'),
  customer:i===0?'=DANGEROUS':'Client '+(i+1),
  item:'T-shirt',currentDepartment:i===0?'COMPLETED':'PRODUCTION',
  orderDate:'2026-10-01',invoiceAmount:'100',paid:'30'
}));
assert.equal(M.pageSlice(records,1,25).items.length,25);
assert.equal(M.pageSlice(records,11,25).items.length,7);
assert.equal(M.pageSlice(records,11,25).items[6].jobsheetFiles,'JOB-257');
assert.equal(M.pageSlice(records,99,25).page,11);
assert.equal(M.pageSlice(records,-7,25).page,1);
assert.equal(M.pageSlice(records,1,'untrusted').pageSize,25);
assert.equal(M.pageSlice([],2,50).pages,1);
assert.equal(M.pageSlice([],2,50).from,0);
assert.equal(M.balanceFor(records[1]),70);
assert.equal(M.balanceFor({...records[1],balance:'15'}),15);
const csv=M.exportCSV(records);
const lines=csv.replace(/^\ufeff/,'').split('\r\n');
assert.equal(lines.length,258,'CSV exports every filtered record beyond old 250 limit');
assert.match(csv,/'=DANGEROUS/,'Spreadsheet formula injection protected');
assert.match(lines[1],/"completed"/,'CSV exports classified stage');
assert.match(lines[2],/"70\.00"$/,'CSV balance computed when stored balance absent');
const html=read('public/report.html'),js=read('public/report.js');
for(const id of ['reportPageSize','reportPrevPage','reportNextPage','reportPageInfo']){
 assert.match(html,new RegExp(`id="${id}"`),`${id} available`);
 assert.match(js,new RegExp(id),`${id} wired`);
}
assert.match(js,/encodeURIComponent\(ref\)/,'Job editor link encodes the job reference');
assert.match(js,/incoming<version/,'Older Supabase versions must not replace newer accepted data');
assert.match(js,/M\.exportCSV\(current\)/,'Export all filtered records, not just current page');
assert.doesNotMatch(js,/current\.slice\(0,250\)/,'No silent 250-row UI cap');
assert.match(html,/report\.css\?v=86\.53\.reports1/,'CSS cache bumped for deployed pages');
assert.match(html,/report\.js\?v=86\.53\.reports1/,'JS cache bumped for deployed pages');
console.log('PASS V86.53 report: 257 jobs paginated without truncation, computed balances, protected CSV, deep-link, stale data guard, and controls wired');
