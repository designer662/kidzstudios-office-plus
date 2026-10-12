import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read=path=>readFileSync(path,'utf8');
const win={};
vm.runInNewContext(read('public/office-command-data.js'),{window:win,Date,Number,String,Object,Math,Array,Set,JSON,RegExp});
const d=win.KSCommandData;
assert.ok(d,'shared command data module loads');
assert.equal(d.escapeHTML('<img src=x onerror="boom">'),'&lt;img src=x onerror=&quot;boom&quot;&gt;');
assert.equal(d.date('2026-02-30'),null,'reject invalid date');
assert.equal(d.date('31/02/2026'),null,'reject invalid European date');
assert.equal(d.date('12/10/2026')?.getDate(),12);
const jobs=[
 {jobsheetFiles:'JB-001',currentDepartment:'DESIGN',designer:'Afiq',sales:'Mirul',orderDate:'2026-10-11',deliveryTime:'2026-10-10',priority:'URGENT',invoiceAmount:'RM 450',paid:'200'},
 {jobsheetFiles:'JB-002',currentDepartment:'SALES',sales:'Nisa',orderDate:'2026-10-12',deliveryTime:'2026-10-14',invoiceAmount:'100',paid:'100'},
 {jobsheetFiles:'JB-003',currentDepartment:'CLOSED',designer:'Afiq',actualComplete2:'2026-10-12',orderDate:'2026-10-10',invoiceAmount:'300',paid:'300'}
];
assert.equal(d.stage(jobs[0]),'artwork');
assert.equal(d.stage(jobs[2]),'completed');
assert.equal(d.forStaff(jobs,'AFIQ').length,2,'normalized exact staff assignment');
assert.equal(d.forStaff(jobs,'Fiq').length,0,'no substring false matches');
const report=d.report(jobs,new Date(2026,9,12));
assert.equal(report.total,3);assert.equal(report.active,2);assert.equal(report.overdue,1);assert.equal(report.stages.completed,1);assert.equal(report.invoiceTotal,850);assert.equal(report.paidTotal,600);
assert.equal(report.weekly.length,7);assert.equal(report.weekly.at(-1).ordered,1);
assert.equal(d.peopleLoad(jobs,[{name:'Afiq'},{name:'Nisa'}])[0].name,'Afiq');
const index=read('public/index.html'),job=read('public/job-management.html'),scene=read('source/src/office-scene.ts'),bundle=read('public/office-3d.js');
for(const item of ['office-command-data.js','office-quality.js','office-pulse-integrated.css','office-command.css'])assert.ok(index.includes(item),`dashboard asset ${item} wired`);
assert.ok(index.includes('office-3d.js?v=86.6'),'changed 3D bundle cache-busted');
assert.ok(!index.includes('office-command-center.js'),'duplicate command drawer removed');
assert.match(index,/id="ksPulsePriority"/);
assert.match(index,/id="ksVisualQuality"/);
assert.match(index,/function renderPulsePriority\(\)/);
assert.match(index,/<details class="ks-pulse-extra"/);
for(const item of ['job-command-board.js','office-command-data.js','office-command.css','KSJobEnhanced?.connect'])assert.ok(job.includes(item),`job module ${item} wired`);
assert.ok(job.includes('return saveAll('),'board stage changes reuse versioned saves');
assert.match(scene,/function setQuality\(mode:OfficeQuality\)/);
assert.match(scene,/const accent=new THREE.DirectionalLight/);
assert.match(bundle,/setQuality\(L\)/);
assert.match(bundle,/accent\.intensity/);
assert.match(read('public/job-command-board.js'),/confirm\(`/,'stage change requires user confirmation');
console.log('PASS V86 command calculations, overdue dates, safe escaping, staff links, stage writes, adaptive 3D and integration assets');
