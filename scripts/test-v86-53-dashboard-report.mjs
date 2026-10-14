import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import vm from 'node:vm';
const rd=p=>readFileSync(p,'utf8');
const pages=readdirSync('public').filter(p=>p.endsWith('.html'));
assert.equal(pages.length,11,'All 11 pages remain available');
for(const page of pages){
  const html=rd('public/'+page);
  assert.equal((html.match(/suite-header-minimal\.css\?v=86\.53/g)||[]).length,1,`Shared minimalist header required in ${page}`);
  assert.match(html,/suite-header-v61\.css/,`Header controller CSS missing in ${page}`);
  assert.match(html,/suite-header\.js/,`Shared header logic missing in ${page}`);
  if(page!=='index.html')assert.ok(!html.includes('office-fullscreen.css'),`${page} must retain its original content design`);
}
const home=rd('public/index.html'),living=rd('public/office-living-office.js'),smart=rd('public/office-smart-ai.js');
assert.match(home,/id="ksOfficeFullscreen"/,'Immersive simulator button');
assert.match(home,/office-fullscreen\.js\?v=86\.53/);
assert.match(living,/id='ksResetAI'/);
assert.match(living,/ks:smart-ai-reset-request/);
assert.match(living,/target:'all'/,'Only full simulation reset');
assert.ok(!smart.includes("['priority','Reset Afiq/Boss']"),'Remove specialized Afiq/Boss reset UI');
assert.match(rd('public/office-fullscreen.css'),/#ksAIMonitorToggle\{display:none!important\}/,'No visible monitor launcher');
assert.match(rd('public/office-fullscreen.css'),/#mapShell\{/,'Fullscreen layout must be scoped to dashboard');
const report=rd('public/report.html');
for(const id of ['kpiCompletionRate','kpiDueSoon','kpiAverageInvoice','kpiCollectionRate','reportCustomers','reportHealth']){
 assert.match(report,new RegExp(`id="${id}"`),`Missing report insight ${id}`);
 assert.match(rd('public/report.js'),new RegExp(id),`Unpopulated report insight ${id}`);
}
const window={KSJobs:{stage(j){return j.stage||'orders'}}};
vm.runInNewContext(rd('public/report-data.js'),{window,Date,Map,Set,Math,Object,Number,Array,String});
const M=window.KSReportModel,now=new Date('2026-10-15T12:00:00+08:00');
const jobs=[
 {customer:'Alpha',jobsheetFiles:'A',stage:'orders',deliveryTime:'2026-10-18',orderDate:'2026-10-01',invoiceAmount:'100',paid:'40'},
 {customer:'Alpha',jobsheetFiles:'B',stage:'completed',deliveryTime:'2026-10-10',orderDate:'2026-10-02',invoiceAmount:'200',paid:'200'},
 {customer:'Beta',jobsheetFiles:'C',stage:'production',deliveryTime:'2026-10-11',orderDate:'2026-10-03',invoiceAmount:'300',paid:'0'},
 {customer:'',jobsheetFiles:'',stage:'orders',orderDate:'2026-10-04',invoiceAmount:'0',paid:'0'}
];
const s=M.summarize(jobs,now);
assert.equal(s.total,4);assert.equal(s.completionRate,25);assert.equal(s.dueSoon,1);assert.equal(s.overdue,1);
assert.equal(s.averageInvoice,150);assert.equal(s.collectionRate,40);assert.equal(s.missingCustomer,1);assert.equal(s.missingRef,1);assert.equal(s.missingDelivery,1);
assert.equal(s.topCustomers[0].name,'Alpha');assert.equal(s.topCustomers[0].count,2);
assert.equal(M.summarize([],now).averageInvoice,0,'Empty reports avoid division by zero');
assert.equal(M.safeCSV('=HYPERLINK(1)'),"\"'=HYPERLINK(1)\"",'Spreadsheet formula injection protection retained');
const release=JSON.parse(rd('office-release.json'));
assert.equal(release.release,'86.53');
console.log(`PASS V86.53: ${pages.length} consistent headers, full-viewport simulator, single Reset AI, hidden debug UI, rich read-only report metrics and data safeguards`);
