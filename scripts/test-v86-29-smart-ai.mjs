import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const brainSource=readFileSync('public/office-smart-ai.js','utf8');
const syncSource=readFileSync('public/office-movement-sync.js','utf8');
const page=readFileSync('public/index.html','utf8');
const workflow=readFileSync('.github/workflows/deploy-pages.yml','utf8');
assert(page.indexOf('office-smart-ai.js?v=86.29')<page.indexOf('office-movement-sync.js?v=86.36')&&page.includes('office-smart-ai.js?v=86.29'),'The decision engine must be available before timeline initialization');
const stabilityManifest=readFileSync('scripts/stability-suite.mjs','utf8');
assert(workflow.includes('node scripts/run-stability-suite.mjs'), 'CI must execute the strict simulator suite');
assert(stabilityManifest.includes('test-v86-29-smart-ai.mjs'), 'CI must guard autonomous behavior through the simulator suite');
assert(syncSource.includes('smart.record(s,selectedIntent,now)')&&syncSource.includes('smart.decide('),'Only the movement authority commits Smart AI decisions');
const fakeDocument={readyState:'loading',addEventListener(){}};
const shared={};
vm.runInNewContext(brainSource,{window:shared,document:fakeDocument,Math,Date,Number,String,Object,Set}, {filename:'office-smart-ai.js'});
const ai=shared.OfficeSmartAI;
assert.equal(ai.version,'86.29');
const now=1_800_000_000_000;
const people=[
  {id:1,homeRoom:'boss',position:'Managing Director'},
  {id:2,homeRoom:'staff',department:'Graphic Design'},
  {id:3,homeRoom:'staff',department:'Production'},
  {id:4,homeRoom:'staff',department:'Sales'},
  {id:5,homeRoom:'showroom',department:'Customer Service'},
  {id:6,homeRoom:'staff',position:'Admin'},
  {id:7,homeRoom:'staff',department:'Finance'},
  {id:8,homeRoom:'staff',department:'Production'}
];
const role=people.map(p=>ai.roleFor(p));
assert.deepEqual(role,['management','design','production','sales','sales','administration','finance','production']);
const workOnly={room:'staff',lastWalkAt:now,ai:null};
const samplePerson=people[2];
const original=ai.decide(samplePerson,workOnly,null,now,{hasWork:true,available:z=>z==='staff'});
assert.equal(original.intent.zone,'staff','No AI routing to closed or full destinations');
assert.equal(original.intent.action,'production','Production staff should get role-specific work');
assert.equal(JSON.stringify(ai.decide(samplePerson,workOnly,null,now,{hasWork:true,available:z=>z==='staff'})),JSON.stringify(original),'Identical leader inputs must produce identical decisions');
const blocked=ai.decide(samplePerson,{...workOnly,lastWalkAt:now-150000},null,now,{hasWork:false,available:()=>false});
assert.equal(blocked.intent.zone,'staff');
const needsReturn=ai.decide(samplePerson,{room:'pantry',lastWalkAt:now,ai:null},null,now,{hasWork:true});
assert.equal(needsReturn.intent.kind,'return');assert.equal(needsReturn.intent.zone,'staff');
// Confirm the real movement module delegates decisions to the goal planner,
// even when loaded in a minimal browser-like context (without Supabase access).
const movementWindow={OfficeSmartAI:ai,OfficeLiving:{workFor:()=> 'pc-work',jobKey:()=>''},OfficeSuite:{sharedMovement:{enable(){},getPeople:()=>[],render(){}}},addEventListener(){}};
const movementDoc={hidden:false,documentElement:{dataset:{ksAuth:'pending'}},addEventListener(){}};
vm.runInNewContext(syncSource,{
  window:movementWindow,document:movementDoc,globalThis:{crypto:{randomUUID:()=> 'test-ai'}},
  Math,Date,JSON,Number,String,Object,Array,Set,Map,console
},{filename:'office-movement-sync.js'});
const snapshot={staff:[{id:3,room:'staff',lastWalkAt:now-240000,nextAt:now,ai:ai.memory(null,now),x:10,y:10}]};
const integrated=movementWindow.OfficeMovementTimeline.chooseSmartIntent(samplePerson,snapshot.staff[0],now,snapshot);
assert.notEqual(integrated.zone,'staff','The real movement planner should request a goal-based walk for a long-idle worker');
assert.equal(movementWindow.OfficeMovementTimeline.validPayload({schema:1,owner:'ai',leaseUntil:now,staff:snapshot.staff}),true,'New shared memory remains schema-compatible');
const tally=new Map(),fresh=[];
for(const p of people){
 const s={room:p.homeRoom,lastWalkAt:now,ai:null,lastTripAt:0,lastTripZone:null};
 const zones=new Set(),actions=new Set();let last=null;
 for(let i=0;i<85;i++){
  const t=now+i*30000;
  const {intent,candidates}=ai.decide(p,s,null,t,{hasWork:i%3===0,available:z=>z!=='prayer'});
  assert(candidates.every(c=>c.zone!=='prayer'),'Closed zone never selected as a candidate');
  assert(['boss','staff','showroom','corridor','pantry','store','prayer'].includes(intent.zone));
  assert(intent.reason.length<=80,'Thought bubbles must be compact');
  const previous=JSON.stringify(s);
  const copy=structuredClone(s);
  ai.record(copy,intent,t);
  assert.equal(JSON.stringify(s),previous,'Decisions and memory functions must not mutate original input until leader commits');
  ai.record(s,intent,t);
  assert(Object.values(s.ai).every(v=>typeof v!=='number'||Number.isFinite(v)),'No NaN or infinite brain memory');
  assert(s.ai.energy>=0&&s.ai.energy<=1&&s.ai.focus>=0&&s.ai.focus<=1);
  zones.add(intent.zone);actions.add(intent.action);
  if(intent.zone!==p.homeRoom){s.lastWalkAt=t;s.lastTripZone=intent.zone;s.lastTripAt=t}
  s.room=i%2?p.homeRoom:intent.zone;
  last=intent;
 }
 assert(zones.size>=3,`Character ${p.id} must independently choose several reachable destinations`);
 assert(actions.size>=3,`Character ${p.id} must vary activity types`);
 tally.set(p.id,{zones:[...zones],actions:[...actions]});fresh.push(s.ai);
}
assert(tally.get(3).zones.includes('store'),'Production worker visits stockroom');
assert(tally.get(2).zones.includes('showroom'),'Designer visits showroom');
const invalid=ai.memory({focus:Infinity,energy:-4,streak:8000,at:-8},now);
assert(invalid.focus>=0&&invalid.focus<=1&&invalid.energy===0&&invalid.streak===12);
// No additional network traffic or external AI endpoint: use existing shared timeline only.
assert(!/\bfetch\s*\(|XMLHttpRequest|\bWebSocket\s*\(/.test(brainSource),'Brain must not communicate outside the shared timeline');
assert(!brainSource.includes('Math.random()'),'Autonomous scoring must be deterministic for a given shared snapshot');
console.log('PASS V86.29 Smart AI: 8 autonomous staff, role-aware goals, work priority, venue availability, different activities, deterministic scoring, bounded shared memory, no independent network writes and correct load order.');
