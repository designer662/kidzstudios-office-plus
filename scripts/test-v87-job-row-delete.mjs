import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const html=readFileSync('public/job-management.html','utf8');
assert.match(html,/<button class="mini copy"[^>]*>⧉<\/button><button class="mini delete"/,'Delete control must immediately follow Duplicate');
assert.match(html,/aria-label="Delete job \$\{esc\(j\.jobsheetFiles/,'Row Delete action must be accessible');
assert.match(html,/if\(del\)\{e\.stopPropagation\(\);requestDeleteJob\(Number\(del\.dataset\.index\)\);return\}/,'Row Delete must not trigger row editor');
assert.match(html,/\.mini\.delete\{color:var\(--red\)/,'Delete action must be red');
assert.match(html,/classList\.toggle\('danger',label==='Delete'\)/,'Destructive confirmation must look distinct');
const start=html.indexOf('function requestDeleteJob('),end=html.indexOf("$('#editorClose').onclick",start);
assert(start>0&&end>start,'Locate shared delete handler');
function fixture(){
 const calls={confirms:[],saves:[],toasts:[],warnings:[],closed:0};
 const context={jobsEverLoaded:true,queueLoadState:'ready',saving:false,jobs:[{jobsheetFiles:'KS-101',customer:'Customer A'},{jobsheetFiles:'KS-102',customer:'Customer B'}],version:3,editorBaseVersion:3,
  Number, String,
  toast:x=>calls.toasts.push(x),setJobWarning:x=>calls.warnings.push(x),
  ask:(title,copy,fn,label)=>calls.confirms.push({title,copy,fn,label}),
  saveAll:async(reason,next)=>{calls.saves.push({reason,next});context.jobs=next;context.version++;return true},
  closeEditor:()=>calls.closed++};
 vm.createContext(context);vm.runInContext(html.slice(start,end),context);return {context,calls};
}
{
 const {context,calls}=fixture();context.requestDeleteJob(0);
 assert.equal(calls.confirms.length,1);assert.equal(calls.confirms[0].label,'Delete');
 assert(calls.confirms[0].copy.includes('KS-101'));assert.equal(calls.saves.length,0,'Must not delete before explicit confirmation');
 await calls.confirms[0].fn();assert.equal(calls.saves.length,1);assert.equal(context.jobs.length,1);assert.equal(context.jobs[0].jobsheetFiles,'KS-102');
 assert.equal(calls.closed,0,'Direct row delete should not close job editor');
}
{
 const {context,calls}=fixture();context.requestDeleteJob(1);assert.equal(calls.saves.length,0,'Cancel leaves unchanged records');
 assert.equal(context.jobs.length,2);
}
{
 const {context,calls}=fixture();context.requestDeleteJob(0);
 context.version=4;await calls.confirms[0].fn();
 assert.equal(calls.saves.length,0,'Reject a stale server version after confirmation');
 assert.match(calls.warnings[0],/Nothing was deleted/);
}
{
 const {context,calls}=fixture();context.requestDeleteJob(0);
 context.jobs.reverse();await calls.confirms[0].fn();assert.equal(calls.saves.length,0,'Reject changed row indexes after confirmation');
}
{
 const {context,calls}=fixture();context.requestDeleteJob(0,{fromEditor:true});await calls.confirms[0].fn();assert.equal(calls.closed,1,'Editor delete continues to close editor on success');
}
{
 const {context,calls}=fixture();context.saving=true;context.requestDeleteJob(0);assert.equal(calls.confirms.length,0,'Cannot delete while another save runs');
}
{
 const {context,calls}=fixture();context.jobsEverLoaded=false;context.requestDeleteJob(0);assert.equal(calls.confirms.length,0,'Cannot delete before server has loaded');
}
console.log('PASS V87 row Delete: inline placement, red button, accessibility, explicit confirmation, version/record validation, editor compatibility');
