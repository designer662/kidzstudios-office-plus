import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const html=readFileSync('public/job-management.html','utf8');
const workflow=readFileSync('.github/workflows/deploy-pages.yml','utf8');
for(const file of ['job-rules.js','office-command-data.js','job-attention-queue.js']){
  assert(html.includes(`src="${file}"`),`Missing Action Queue dependency: ${file}`);
}
for(const id of ['jobViewTable','jobViewQueue','jobTableView','actionQueueView','attentionCategory','attentionItems','attentionStatus','attentionRefresh']){
  assert(html.includes(`id="${id}"`),`Missing Action Queue control ${id}`);
}
assert(html.includes('function renderActionQueue()'), 'Queue must render from active Job Management shared records');
assert(html.includes('window.KSJobAttention.evaluate(jobs'), 'Queue must evaluate full shared dataset, not period-filtered data');
assert(html.includes('openEditor(idx)'), 'Queue must open existing editor instead of implementing a second save path');
assert(html.includes('queueLoadState'), 'Queue must distinguish initial loading, stale and failed states');
assert(workflow.includes('node scripts/test-v86-37-action-queue.mjs'), 'New queue regression belongs to CI');
const sandbox={window:{},TextEncoder,Date,Intl};
sandbox.window=sandbox;vm.createContext(sandbox);
for(const file of ['job-rules.js','office-command-data.js','job-attention-queue.js']){
  vm.runInContext(readFileSync(`public/${file}`,'utf8'),sandbox,{filename:file});
}
const api=sandbox.KSJobAttention;
assert(api?.evaluate && api?.filter && api?.summary,'Pure Action Queue API must exist');
const now=new Date(2026,9,14,12,0,0);
const job=(ref,rest={})=>({jobsheetFiles:ref,customer:'Customer <Test>',currentDepartment:'PRODUCTION',sales:'Ali',designer:'Min',productionPic:'Tom',deliveryTime:'2026-10-29',jobMeta:{quantity:'10',sizeBreakdown:'M:10',artworkApproved:'yes'},...rest});
const input=[
  job('COMP',{currentDepartment:'CLOSED',deliveryTime:'2026-10-01'}),
  job('OVER',{deliveryTime:'2026-10-12'}),
  job('TODAY',{deliveryTime:'2026-10-14'}),
  job('SOON',{deliveryTime:'2026-10-16'}),
  job('READY'),
  job('MISSING',{jobMeta:{quantity:'',sizeBreakdown:'',artworkApproved:''}}),
  job('ASSIGN',{productionPic:''}),
  job('NO-DATE',{deliveryTime:''}),
  job('INVALID',{deliveryTime:'2026-02-30'}),
  job('UNKNOWN',{currentDepartment:'ACCOUNTS'}),
  job('HOLD',{currentDepartment:'ON HOLD',deliveryTime:'2026-10-12'}),
  job('CANCELLED',{currentDepartment:'CANCELLED',deliveryTime:'2026-10-12'}),
  job('URGENT',{deliveryTime:'2026-10-12',priority:'URGENT'}),
  job('MULTI',{deliveryTime:'2026-10-12',productionPic:'',jobMeta:{}}),
  job('YEAR-OLD',{deliveryTime:'2024-01-01',orderDate:'2024-01-01'}),
];
const copy=JSON.stringify(input);
const result=api.evaluate(input,now);
assert.equal(JSON.stringify(input),copy,'Classification must not mutate shared jobs');
const refs=result.map(r=>r.ref);
assert(!refs.includes('COMP')&&!refs.includes('CANCELLED')&&!refs.includes('READY'));
assert.equal(result[0].ref,'URGENT','Urgent breaks ties inside the highest severity');
assert.equal(result[1].ref,'YEAR-OLD','Oldest overdue first within non-urgent overdue');
assert(result.find(x=>x.ref==='MULTI').reasons.length>=2,'Multiple warnings stored on one job');
assert.equal(refs.filter(r=>r==='MULTI').length,1,'No duplicate jobs');
assert.equal(result.find(x=>x.ref==='HOLD').primary.category,'status','Held jobs are not overdue');
for(const [ref,category] of [['OVER','overdue'],['TODAY','today'],['SOON','soon'],['MISSING','production'],['ASSIGN','assignment'],['NO-DATE','data'],['INVALID','data'],['UNKNOWN','status']]){
  assert(result.find(x=>x.ref===ref)?.reasons.some(r=>r.category===category),`${ref} must include ${category}`);
}
assert.equal(result.find(x=>x.ref==='INVALID').dueDays,null,'Invalid date cannot imply overdue');
assert.equal(api.filter(result,'overdue').length,4,'Filter by overlapping reasons, no duplicate rows');
assert.equal(api.filter(result,'production').some(x=>x.ref==='MULTI'),true);
assert.equal(api.filter(result,'nothing').length,0);
assert.equal(api.summary(result).overdue,4);
assert.equal(api.evaluate([],now).length,0);
assert.equal(api.evaluate([job('DUE',{deliveryTime:'14/10/2026'})],now)[0].primary.category,'today');
assert.equal(api.evaluate([job('BAD',{deliveryTime:'31/02/2026'})],now)[0].primary.category,'data');
assert.equal(api.evaluate([job('FUTURE',{deliveryTime:'2026-10-17'})],now)[0].primary.category,'soon');
const result2=api.evaluate(input,now);
assert.deepEqual(JSON.parse(JSON.stringify(result)),JSON.parse(JSON.stringify(result2)),'Classification deterministic');
console.log('PASS V86.37 Action Queue: all-history priority, reasons, filters, validation, no mutation, UI wiring');
