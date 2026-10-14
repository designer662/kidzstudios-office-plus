import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import vm from 'node:vm';
const require=createRequire(import.meta.url);
const base=new URL('../',import.meta.url);
const read=name=>readFileSync(new URL(name,base),'utf8');
const html=read('public/index.html');
const roster=new Function('return '+html.match(/const DEFAULT_EMPLOYEES = (\[[\s\S]*?\n  \]);/)[1])();
const geometry=require('../public/office-geometry-guard.js');
const nav=html.slice(html.indexOf('  const roamZones={'),html.indexOf('  function beginRoam('));
assert(nav.includes('function planSharedRoam'));
const events=new Map();let persisted=null,version=1,writes=0;
const baseTime=Date.now();
const ctx={console,Math,Date,crypto:globalThis.crypto,CustomEvent:class{constructor(type,options){this.type=type;this.detail=options?.detail}},
 window:{KSOfficeGeometry:geometry,addEventListener(type,fn){(events.get(type)||events.set(type,[]).get(type)).push(fn)},dispatchEvent(event){for(const f of events.get(event.type)||[])f(event)}},
 document:{hidden:true,documentElement:{dataset:{}},getElementById(){return null},addEventListener(){}},
 setTimeout(){return 1},setInterval(){return 1},clearTimeout(){},clearInterval(){},requestAnimationFrame(){return 1},cancelAnimationFrame(){},
 async fetch(url,options){if(options.method==='GET')return {status:persisted?200:404,async json(){return persisted?{payload:JSON.parse(JSON.stringify(persisted)),version}:null}};
 const body=JSON.parse(options.body);assert.equal(body.scope,'office:movement:v1');
 if(body.expectedVersion!==version)return{status:409,async json(){return {error:'version conflict'}}};
 version++;writes++;persisted=body.payload;return{status:200,async json(){return{payload:JSON.parse(JSON.stringify(persisted)),version}}};}
};
ctx.globalThis=ctx;ctx.window.document=ctx.document;ctx.employeeById=Object.fromEntries(roster.map(e=>[e.id,e]));
vm.createContext(ctx);
vm.runInContext(nav+'\n;globalThis.planSharedRoam=planSharedRoam;',ctx);
const render=items=>{for(const p of items){const e=ctx.employeeById[p.id];if(e){e.visualX=p.x;e.visualY=p.y;e.visualRoomId=p.room;e.motionWalking=p.walking}}};
ctx.window.OfficeSuite={sharedMovement:{enable(){},getPeople:()=>roster,plan:(id,zone,target)=>ctx.planSharedRoam(ctx.employeeById[id],zone,target),render}};
ctx.window.OfficeLiving={workFor:()=> 'typing',jobKey:()=>'',chooseIntent:()=>({zone:'pantry',action:'drink',kind:'break'}),update(){}};
vm.runInContext(read('public/office-smart-ai.js'),ctx);
vm.runInContext(read('public/office-movement-sync.js'),ctx);
const T=ctx.window.OfficeMovementTimeline;
const fresh=roster.map(e=>({id:e.id,x:e.x,y:e.y,room:e.roomId,action:'typing',jobKey:'',
  socialAt:baseTime,nextAt:baseTime+60000,lastWalkAt:baseTime-1000,walk:null,scene:null,ai:ctx.window.OfficeSmartAI.memory(null,baseTime)}));
// Actual Afiq and Boss coordinates with real walls and worktop obstacles.
for(const id of [1,3]){
 const person=roster.find(e=>e.id===id);
 for(const zone of ['corridor','showroom','pantry']){
  const path=ctx.planSharedRoam(person,zone);
  assert(path?.route?.length,`${person.name} must have an escape route to ${zone}`);
  let prev=path.from;
  for(const next of path.route){assert(geometry.navClearLine(prev,next),`${person.name} route clips geometry`);prev=next;}
 }
}
const legacy={schema:1,owner:'old-browser',leaseUntil:baseTime+18000,staff:structuredClone(fresh)};
legacy.staff.find(s=>s.id===1).nextAt=baseTime+10**10;
legacy.staff.find(s=>s.id===3).action='waiting';
legacy.staff.find(s=>s.id===3).waitingSince=baseTime-400000;
const otherBefore=structuredClone(legacy.staff.find(s=>s.id===2));
assert(T.repairStaleTimeline(legacy,baseTime));
assert.equal(legacy.aiEngineVersion,2);
assert.equal(legacy.staff.find(s=>s.id===1).x,17.9);
assert.equal(legacy.staff.find(s=>s.id===3).y,10.1);
assert(legacy.staff.find(s=>s.id===1).nextAt-baseTime<5000);
assert(legacy.staff.find(s=>s.id===3).nextAt-baseTime<5000);
assert.deepEqual(legacy.staff.find(s=>s.id===2),otherBefore,'Migration must preserve other staff AI state');
assert(!T.repairStaleTimeline(legacy,baseTime),'Version migration must happen only once');
// Repeated collision refusals must heal a deterministic deadlock; no client-side
// repositioning or writes to any non-movement endpoint.
const deadlocked=legacy.staff.find(s=>s.id===1);
Object.assign(deadlocked,{x:9.4,y:44,room:'corridor',action:'waiting',walk:null,
  failedRoutes:9,waitingSince:baseTime-55000,nextAt:baseTime+10000});
assert(T.repairStaleTimeline(legacy,baseTime));
assert.equal(deadlocked.room,'boss');
assert.equal(deadlocked.x,17.9);
assert.equal(deadlocked.failedRoutes,0);
assert.equal(deadlocked.recoveryCount,1);
assert(deadlocked.nextAt>baseTime+15000);
assert(!T.repairStaleTimeline(legacy,baseTime),'Deadlock recovery must not repeat on the next tick');
// A corrupt far-future reservation cannot keep an employee waiting indefinitely.
legacy.staff[1].walk={startedAt:baseTime+100000,endAt:baseTime+150000};
assert(T.repairStaleTimeline(legacy,baseTime));
assert.equal(legacy.staff[1].walk,null);
const resetIds=new Set([1,3]);
assert(T.rebuildStaff(legacy,resetIds,baseTime));
assert.equal(legacy.staff.find(s=>s.id===1).walk,null);
assert.equal(legacy.staff.find(s=>s.id===3).failedRoutes,0);
// Reset movement, not payroll, staff roster, jobs or another Supabase scope.
persisted={schema:1,aiEngineVersion:2,owner:'old',leaseUntil:baseTime+18000,updatedAt:baseTime,staff:structuredClone(fresh)};
persisted.staff.find(s=>s.id===1).walk={from:{x:17.9,y:43.1},route:[{x:12.1,y:44.6}],segmentMs:[4000],startedAt:baseTime,endAt:baseTime+4000,targetZone:'corridor'};
const beforeOther=structuredClone(persisted.staff.find(s=>s.id===7));
ctx.window.dispatchEvent({type:'ks:auth-ready'});
const done=await T.resetSmartAI('priority');
assert(done.ok,done.message);assert.equal(writes,1);
assert(!persisted.staff.find(s=>s.id===1).walk);
assert(!persisted.staff.find(s=>s.id===3).walk);
assert.deepEqual(persisted.staff.find(s=>s.id===7),beforeOther);
assert.deepEqual(roster.map(e=>e.id),[1,2,3,4,5,6,7,8]);
const all=await T.resetSmartAI('all');assert(all.ok);assert.equal(writes,2);
assert(persisted.staff.every(s=>!s.walk&&s.lastWalkAt<baseTime-110000));
assert(read('public/office-smart-ai.js').includes('Reset Afiq/Boss'));
assert(html.includes('office-movement-sync.js?v=86.49'));
console.log('PASS V86.44 Smart AI: boss/afiq reachable, legacy recovery idempotent, deadlock back-to-desk, stale walk reset, scoped CAS reset, all-staff rebuild and safe navigation.');
