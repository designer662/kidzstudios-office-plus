import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const code=readFileSync('public/office-movement-sync.js','utf8');
let now=Date.parse('2026-10-12T02:00:00Z');
let store=null,writeCount=0;
const clone=value=>JSON.parse(JSON.stringify(value));
// Deterministic random choices: test shared meeting behavior, not optional social roll.
const stableMath=Object.create(Math);stableMath.random=()=>.9;
const staff=[
 {id:1,name:'A',department:'Creative Department',x:10,y:10,roomId:'staff',homeRoom:'staff',currentJob:'',workload:[]},
 {id:2,name:'B',department:'Sales and Marketing',x:11,y:13,roomId:'staff',homeRoom:'staff',currentJob:'',workload:[]}
];
async function fetchMock(url,options={}){
 if(options.method==='PUT'){
  const body=JSON.parse(options.body);
  if(Number(body.expectedVersion)!==(store?.version||0))return {status:409,json:async()=>({error:'Conflict'})};
  store={version:(store?.version||0)+1,payload:clone(body.payload)};
  writeCount++;return {status:200,json:async()=>clone(store)};
 }
 return store?{status:200,json:async()=>clone(store)}:{status:404,json:async()=>({})};
}
function browser(name){
 let intervals=[],timeouts=[],rendered=[],events=[];
 const Clock=class extends Date{static now(){return now}};
 const movement={enable(){},getPeople:()=>clone(staff),render:list=>{rendered=list},plan:(id,zone)=>({from:{x:10,y:10},route:[{x:12,y:10}],segmentMs:[1200],targetZone:zone||'showroom',seatGoal:null})};
 const living={
  jobKey:p=>String(p.currentJob||''),workFor:p=>p.department==='Creative Department'?'designing':'calling',
  chooseIntent:()=>({zone:'showroom',action:'meeting',kind:'meeting'}),greetings:['💬 Team chat'],
  update:(_state,items)=>{events=items.filter(x=>x.scene).map(x=>x.scene.text)}
 };
 const context={window:{OfficeSuite:{sharedMovement:movement},OfficeLiving:living,addEventListener(){}},
  document:{hidden:false,documentElement:{dataset:{ksAuth:'ok'}},addEventListener(){}},
  Date:Clock,Math:stableMath,JSON,Number,String,Object,Array,Set,Map,Promise,console,Intl,fetch:fetchMock,
  globalThis:{crypto:{randomUUID:()=>name}},
  setTimeout(fn,delay=0){const v={fn,at:now+delay};timeouts.push(v);return v},clearTimeout(v){timeouts=timeouts.filter(t=>t!==v)},
  setInterval(fn,delay){const v={fn,at:now+delay,delay};intervals.push(v);return v},clearInterval(v){intervals=intervals.filter(t=>t!==v)},
  requestAnimationFrame:()=>1,cancelAnimationFrame(){}
 };
 vm.runInNewContext(code,context,{filename:'office-movement-sync.js'});
 async function flush(){for(let i=0;i<12;i++)await Promise.resolve()}
 async function advance(ms){now+=ms;for(let iteration=0;iteration<12;iteration++){
  const due=timeouts.filter(t=>t.at<=now);timeouts=timeouts.filter(t=>t.at>now);
  if(!due.length)break;for(const t of due)t.fn();await flush();
 }
 for(const t of intervals)if(now>=t.at){t.at=now+t.delay;await t.fn()}
 await flush();}
 return {advance,render:()=>{const item=store?.payload?.staff?.[0];return context.window.OfficeMovementTimeline.movementAt(item,now)},get rendered(){return rendered},get events(){return events}};
}
const a=browser('planner-A'),b=browser('reader-B');
await a.advance(0);await b.advance(0);
assert.equal(store?.payload.owner,'planner-A');
// Leader processes first task event after initial stagger.
await a.advance(55000);
assert.ok(store.payload.staff.some(s=>s.walk?.action==='meeting'||s.scene?.kind==='meeting'),'Leader must publish meeting action and walking route');
const writesAfterLeader=writeCount;
await b.advance(0);await b.advance(2000);
assert.equal(writeCount,writesAfterLeader,'Follower must not write a competing action');
assert.equal(store.payload.owner,'planner-A');
// A synced job change causes a lightweight reaction, not a new unsynced local animation.
staff[0].currentJob='LIVE-JOB-12';
await a.advance(1100);
assert.ok(store.payload.staff.some(s=>s.jobKey==='LIVE-JOB-12'),'Shared planner must persist the job fingerprint');
assert.ok(store.payload.staff.some(s=>s.scene?.kind==='job'),'A live job change creates a synchronized reaction cue');
assert.equal(contextIsSafe(store.payload),true);
function contextIsSafe(payload){return payload.staff.every(s=>!s.scene||s.scene.text.length<=80)}
console.log('PASS V78 shared behavior timeline: one authority, meeting action, follower read-only, job-driven cue, persisted state');
