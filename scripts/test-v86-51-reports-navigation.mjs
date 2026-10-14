// V86.51 release gate: reporting semantics, safe CSV, unified notifications, navigation and intro.
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
const file=x=>readFileSync('public/'+x,'utf8');
const context=vm.createContext({TextEncoder,Date,Number,Math,Set,Object,String});
vm.runInContext(file('job-rules.js'),context);vm.runInContext(file('report-data.js'),context);
const M=context.KSReportModel;
assert.ok(M?.summarize);
const data=[
 {jobsheetFiles:'A',orderDate:'2026-10-01',deliveryTime:'2026-10-02',priority:'urgent',currentDepartment:'DESIGN',invoiceAmount:'100',paid:'40',balance:'60',designer:'AFIQ'},
 {jobsheetFiles:'B',orderDate:'2026-10-05',deliveryTime:'2026-10-06',currentDepartment:'CLOSED',invoiceAmount:'240',paid:'240',balance:'0'},
 {jobsheetFiles:'C',orderDate:'2025-09-12',deliveryTime:'2026-11-20',currentDepartment:'PRODUCTION',invoiceAmount:'80',paid:'20'},
 {jobsheetFiles:'D',orderDate:'bad-date',currentDepartment:'SALES',invoiceAmount:'20',paid:'0'}
];
const stats=M.summarize(data,new Date('2026-10-15T12:00:00Z'));
assert.equal(stats.total,4);assert.equal(stats.stages.artwork,1);assert.equal(stats.stages.completed,1);
assert.equal(stats.overdue,1);assert.equal(stats.urgent,1);assert.equal(stats.invoice,440);
assert.equal(stats.paid,300);assert.equal(stats.outstanding,140);assert.equal(stats.undated,1);
assert.equal(stats.months[9],2);assert.deepEqual(Array.from(M.years(data)),[2026,2025]);
assert.equal(M.filtered(data,{year:'2026',month:'9'}).length,2);
assert.equal(M.filtered(data,{stageFilter:'overdue',query:'AFIQ'}).length,1);
assert.equal(M.filtered(data,{year:'2025'}).length,1);
assert.equal(M.date('31/02/2026'),null);
assert.ok(M.safeCSV('=1+1').startsWith('"\'='));
assert.ok(M.safeCSV('-3').startsWith('"\'-'));
for(const page of ['report.html','index.html','job-management.html'])assert.ok(existsSync('public/'+page));
const r=file('report.html'),header=file('suite-header.js'),index=file('index.html'),intro=file('office-plus-ui.js');
for(const path of ['report-data.js','report.js','suite-header.js','supabase-bridge.js'])assert.ok(r.includes(`src="${path}`),'missing report dependency '+path);
assert.ok(r.includes('id="reportRows"')&&r.includes('id="reportMonthly"'));
assert.ok(header.includes("'ksSharedEventSeenV2'")&&header.includes("'ksSharedEventClearedV2'"));
assert.ok(header.includes("window.KSSharedNotifications=Object.freeze"),'single shared notification controller');
assert.ok(header.includes("report.href='report.html'"),'report navigation pill');
assert.ok(header.includes("home.className='ks-home-pill'"),'home pill');
assert.ok(!index.includes('addNotification(event,{initial,local})'),'dashboard must not duplicate shared notifications');
assert.ok(!index.includes('if(notificationBtn)notificationBtn.onclick'),'dashboard must not override header notification handler');
assert.ok(intro.includes('setTimeout(done,1700)')&&intro.includes('ksIntroShownV8651'),'intro bound and once per session');
console.log('PASS V86.51: report metrics, date filters, CSV injection guard, cross-page notification dedup, Home/Reports pills, bounded opening');
