import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html=fs.readFileSync('public/job-management.html','utf8');
const must=[
  'id="jobSelectAll"', 'id="jobSelectionCount"', 'id="bulkDeleteBtn"',
  'id="jobSelectionClear"', 'class="mini trash"', 'class="job-row-check"',
  'requestDeleteJobs([+trash.dataset.index])',
  "requestDeleteJobs([...selectedJobIndices])",
  "selectedJobIndices.clear();render();",
  "if(jobsLoaded&&Number(row?.version||0)!==version)selectedJobIndices.clear()"
];
for(const phrase of must)assert.ok(html.includes(phrase),`Missing UI or synchronization protection: ${phrase}`);
assert.match(html, /id="confirmModal"/);

function functionSource(name){
 const search=`function ${name}(`;
 const i=html.indexOf(search);assert.ok(i>=0,`Missing ${name}`);
 const brace=html.indexOf('{',i);
 let depth=0,quote=null,escape=false;
 // Function boundaries in this test are based on known adjacent declarations rather than parsing template literals.
 const next=html.indexOf('\nfunction ',brace+1);
 assert.ok(next>brace,`Missing next function after ${name}`);
 return html.slice(i,next);
}
let jobs=[
 {jobsheetFiles:'ORD-01',customer:'A'},
 {jobsheetFiles:'ORD-02',customer:'B'},
 {jobsheetFiles:'ORD-03',customer:'C'},
 {jobsheetFiles:'ORD-04',customer:'D'}
];
let visible=[0,1,2,3], version=11, saving=false, jobsLoaded=true;
const selectedJobIndices=new Set();
const renders=[],toasts=[],confirms=[],saved=[];
const ctx={
 selectedJobIndices,jobs,version,saving,jobsLoaded,Set,JSON,Number,
 render:()=>renders.push([...selectedJobIndices]),
 filtered:()=>visible.map(i=>({i,j:jobs[i]})),
 ask:(title,copy,fn,label)=>confirms.push({title,copy,fn,label}),
 saveAll:async(reason,candidate)=>{saved.push({reason,candidate});return true},
 toast:text=>toasts.push(text),
 closeEditor:()=>{},
 $:()=>({classList:{contains:()=>false}})
};
vm.createContext(ctx);
vm.runInContext(['toggleJobSelection','selectAllVisibleJobs','requestDeleteJobs'].map(functionSource).join('\n'),ctx);

ctx.toggleJobSelection(1,true);
ctx.toggleJobSelection(3,true);
assert.deepEqual([...selectedJobIndices],[1,3],'Individual row checkbox selection');
visible=[1,2];ctx.selectAllVisibleJobs(true);
assert.deepEqual([...selectedJobIndices],[1,3,2],'Select all in filtered view retains off-filter selections');
ctx.selectAllVisibleJobs(false);
assert.deepEqual([...selectedJobIndices],[3],'Clear visible selection should not clear off-filter selection');

ctx.requestDeleteJobs([3]);
assert.equal(confirms[0].title,'Delete job?');
assert.equal(saved.length,0,'No deletion before confirmation');
await confirms[0].fn();
assert.equal(saved.length,1);
assert.deepEqual(saved[0].candidate.map(j=>j.jobsheetFiles),['ORD-01','ORD-02','ORD-03']);

saved.length=0;confirms.length=0;
ctx.requestDeleteJobs([0,2]);
assert.match(confirms[0].title,/Delete 2 selected jobs/);
assert.equal(saved.length,0,'Bulk delete must require confirmation');
await confirms[0].fn();
assert.equal(saved.length,1);
assert.deepEqual(saved[0].candidate.map(j=>j.jobsheetFiles),['ORD-02','ORD-04']);

saved.length=0;confirms.length=0;
ctx.requestDeleteJobs([1,2]);
ctx.version=12;
await confirms[0].fn();
assert.equal(saved.length,0,'Reject stale Supabase revision');
assert.ok(toasts.at(-1).includes('Refresh'));

saved.length=0;confirms.length=0;ctx.version=11;
ctx.requestDeleteJobs([0]);
jobs[0]={jobsheetFiles:'NEW-ITEM',customer:'changed'};
await confirms[0].fn();
assert.equal(saved.length,0,'Reject modified record at selected index');
console.log('PASS bulk selection, filtered select-all, single/bulk delete, confirmation, stale version & changed record guards');
