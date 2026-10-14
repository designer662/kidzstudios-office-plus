import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const html=readFileSync('public/job-management.html','utf8');
const start=html.indexOf('async function saveAll(reason=');
const end=html.indexOf('async function pullAfterConflict()',start);
assert.ok(start>=0&&end>start,'Find actual inline Job Management save function');
const code=html.slice(start,end);
const alerts=[],requests=[];
const context={
 window:{KSJobs:{validateUniqueRefs:jobs=>'',payloadSize:v=>new TextEncoder().encode(JSON.stringify(v)).length}},
 TextEncoder, JSON, Date, Math, Number, String,
 savedAt:0, version:1, jobs:[], saving:false, clientId:'test-workstation',API:'/api/state',JOBS_SCOPE:'dashboard:jobs',
 hashString:()=> 'sig', currentActor:()=>({name:'Test'}),
 compactJob:j=>({...j}),normalizeJob:j=>({...j}),
 '$':()=>({disabled:false}),
 setJobWarning:s=>alerts.push(s),setSync:()=>{},toast:()=>{},render:()=>{},counts:()=>({}),postEvent:async()=>{},
 pullAfterConflict:async()=>{alerts.push('server refresh invoked')},
 fetch:async(_url,opt)=>{
   const body=JSON.parse(opt.body);requests.push(body);
   return {ok:body.expectedVersion===context.version,status:body.expectedVersion===context.version?200:409,json:async()=>({version:2})};
 }
};
vm.createContext(context);
vm.runInContext(code+';globalThis.executeSave=saveAll;',context);
const many=Array.from({length:501},(_,i)=>({jobsheetFiles:`TEST-${i}`}));
const first=await context.executeSave('bulk test',many);if(!first)console.log('failure details',alerts,requests.length);assert.equal(first,true);
assert.equal(context.jobs.length,501,'No 500-record slice allowed');
assert.equal(requests[0].payload.jobs.length,501);
assert.equal(requests[0].expectedVersion,1);
assert.equal(context.version,2);
context.fetch=async(_url,opt)=>{requests.push(JSON.parse(opt.body));return{ok:false,status:409};};
assert.equal(await context.executeSave('conflict test',many.slice(0,1)),false);
assert.equal(context.jobs.length,501,'Conflicted save must not mutate local accepted state');
assert.ok(alerts.some(x=>x.includes('Another staff member')));
assert.ok(alerts.some(x=>x.includes('server refresh invoked')));
const reqBefore=requests.length;
const huge=Array.from({length:14000},(_,i)=>({jobsheetFiles:`TEST-${i}`,customer:'Long sample customer'}));
assert.equal(await context.executeSave('oversize test',huge),false);
assert.equal(requests.length,reqBefore,'Oversized payload must not call server or truncate');
assert.equal(context.jobs.length,501);
console.log('PASS: 501 jobs saved without truncation, expectedVersion sent, conflict rejected, oversized save blocked');
