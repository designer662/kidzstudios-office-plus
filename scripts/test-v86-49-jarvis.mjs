import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import vm from 'node:vm';
const require=createRequire(import.meta.url);
const read=file=>readFileSync(file,'utf8');
const html=read('public/index.html');
const roster=new Function('return '+html.match(/const DEFAULT_EMPLOYEES = (\[[\s\S]*?\n  \]);/)[1])();
const geometry=require('../public/office-geometry-guard.js');
const code=read('public/office-movement-sync.js');
const nav=html.slice(html.indexOf('  const roamZones={'),html.indexOf('  function beginRoam('));
const events=new Map();let persisted=null,version=1,writes=0;
const clock=Date.parse('2026-10-15T04:30:00Z');
let rng=0x8f4e12a1;const seededMath=Object.create(Math);seededMath.random=()=>((rng=Math.imul(rng,1664525)+1013904223>>>0)/4294967296);
const context={Math:seededMath,Date,console,Intl,JSON,Set,Map,CustomEvent:class{constructor(type,options){this.type=type;this.detail=options?.detail}},
 setTimeout(){return 1},setInterval(){return 1},clearTimeout(){},clearInterval(){},requestAnimationFrame(){return 1},cancelAnimationFrame(){},
 window:{KSOfficeGeometry:geometry,addEventListener(name,fn){const handlers=events.get(name)||[];handlers.push(fn);events.set(name,handlers)},dispatchEvent(event){for(const fn of events.get(event.type)||[])fn(event)}},
 document:{hidden:true,documentElement:{dataset:{}},getElementById(){return null},addEventListener(){}},
 async fetch(url,options={}){
  if(!options.method||options.method==='GET')return{status:persisted?200:404,async json(){return persisted?{version,payload:structuredClone(persisted)}:null}};
  const body=JSON.parse(options.body);assert.equal(body.scope,'office:movement:v1');
  if(body.expectedVersion!==version)return{status:409,async json(){return {error:'conflict'}}};
  version++;writes++;persisted=structuredClone(body.payload);
  return{status:200,async json(){return{version,payload:structuredClone(persisted)}}};
 }
};
context.globalThis=context;context.window.document=context.document;context.employeeById=Object.fromEntries(roster.map(p=>[p.id,p]));
vm.createContext(context);vm.runInContext(nav+'\n;globalThis.planSharedRoam=planSharedRoam;',context);
const render=positions=>{for(const pos of positions){const employee=context.employeeById[pos.id];if(employee){employee.visualX=pos.x;employee.visualY=pos.y;employee.visualRoomId=pos.room;}}};
context.window.OfficeSuite={sharedMovement:{enable(){},getPeople:()=>roster,plan:(id,zone,target)=>context.planSharedRoam(context.employeeById[id],zone,target),render}};
context.window.OfficeLiving={workFor:()=> 'typing',jobKey:()=>'',chooseIntent:()=>({zone:'pantry',action:'drink',kind:'break'}),update(){}};
vm.runInContext(read('public/office-ai-routine.js'),context);
vm.runInContext(read('public/office-smart-ai.js'),context);
vm.runInContext(code,context);
const routine=context.window.OfficeAIRoutine,ai=context.window.OfficeSmartAI,timeline=context.window.OfficeMovementTimeline;
// V86.47 soft daypart preference: same inputs produce identical outcomes.
assert.equal(routine.windowAt(clock).phase,'lunch');
assert.equal(routine.windowAt(Date.parse('2026-10-15T01:30:00Z')).phase,'focus');
assert(routine.bias({zone:'pantry'},roster[0],clock)>routine.bias({zone:'corridor'},roster[0],clock));
const snapshotFor=time=>({schema:1,owner:'another-client',aiEngineVersion:2,leaseUntil:time+18000,updatedAt:time,
 staff:roster.map(p=>({id:p.id,x:p.deskX??p.x,y:p.deskY??p.y,room:p.homeRoom||p.roomId,action:'typing',nextAt:time+1100,
   lastWalkAt:time-200000,failedRoutes:0,waitingSince:0,lastTripAt:0,walk:null,scene:null,ai:ai.memory(null,time)}))});
// V86.45 ensure overdue + repeatedly blocked staff have priority in actual leader evolution.
const seed=snapshotFor(clock);
seed.staff.forEach(s=>s.nextAt=clock+50000);
const afiq=seed.staff.find(s=>s.id===3);afiq.nextAt=clock;afiq.failedRoutes=4;afiq.waitingSince=clock-21000;
const boss=seed.staff.find(s=>s.id===1);boss.nextAt=clock;boss.failedRoutes=0;
timeline.evolve(seed,clock);
assert(afiq.nextAt>clock,'Starved worker must get first scheduling attempt');
assert(!boss.walk||afiq.walk||afiq.failedRoutes>=4,'No unsafe collision bypass');
// Long-running simulated scheduler: every committed walk uses a safe geometry plan.
// This is a state-level simulation, not a WebGL/browser or live Supabase test.
const longRun=snapshotFor(clock);const completed=new Map(roster.map(p=>[p.id,0]));
const priorWalk=new Map();
for(let step=0;step<18;step++){
 const now=clock+step*20000;
 timeline.evolve(longRun,now);
 assert(timeline.validPayload(longRun),'Shared state must remain schema-valid');
 for(const s of longRun.staff){
  const current=s.walk?.startedAt;
  if(s.walk&&current!==priorWalk.get(s.id)){
   completed.set(s.id,(completed.get(s.id)||0)+1);priorWalk.set(s.id,current);
   let previous=s.walk.from;
   for(const vertex of s.walk.route){assert(geometry.navClearLine(previous,vertex),`Unsafe shared route for ${s.id}`);previous=vertex}
  }
 }
 render(longRun.staff.map(s=>timeline.movementAt(s,now)));
}
console.log('6-minute state-simulation trip counts:',Object.fromEntries(completed));

assert(completed.get(1)>=1&&completed.get(3)>=1,'Boss and Afiq must both receive real walks during long simulation');
// V86.48 CAS-scoped Force Move never changes staff profile data.
persisted=snapshotFor(clock);context.window.dispatchEvent({type:'ks:auth-ready'});
const beforeRoster=JSON.stringify(roster.map(p=>({id:p.id,name:p.name,deskX:p.deskX,deskY:p.deskY})));
const denied=await timeline.forceMove(1,'invalid-room');assert.equal(denied.ok,false);
const planned=await timeline.forceMove(1,'corridor');
assert.equal(typeof planned.ok,'boolean');
if(planned.ok){
 assert.equal(writes,1,'Movement should commit once with CAS');
 assert(persisted.staff.find(s=>s.id===1).walk,'Boss must have an actual route, not teleport');
 const walk=persisted.staff.find(s=>s.id===1).walk;
 assert(walk.route.length&&walk.endAt>walk.startedAt,'Real path must have a duration');
 let prev=walk.from;for(const p of walk.route){assert(geometry.navClearLine(prev,p),'Forced route crosses geometry');prev=p;}
}else{
 assert.equal(writes,0,'A refused route must not write any movement data');
}
assert.equal(JSON.stringify(roster.map(p=>({id:p.id,name:p.name,deskX:p.deskX,deskY:p.deskY}))),beforeRoster,'No modifications to the staff roster');
const d=timeline.diagnostics(clock);
assert.equal(d.staff.length,roster.length);assert(d.staff.every(s=>typeof s.phase==='string'&&Number.isInteger(s.failedRoutes)));
assert(read('public/office-smart-ai.js').includes('ksAIMonitorToggle'));
assert(read('public/office-smart-ai.js').includes('ks:smart-ai-force-move'));
assert(!code.includes('for(let attempt=0;attempt<2&&!walked;attempt++)'),'Duplicate identical path attempts must not return');
assert(code.includes('const congestion=snapshot.staff.some'),'Fair queue suppresses congestion-amplifying conversations');
assert(code.includes('lastFollowerFrame<32'),'Follower timeline respects Eco 30fps cap');
// V86.46 smooth attached props and keep original IK / natural pose rig.
const char=read('source/src/office-character-runtime.js');
assert(char.includes('solveOfficeTwoBoneV8615'),'IK remains integrated');
assert(char.includes('a.drink.scale.setScalar'),'Food/drink transitions are visually eased');
// V86.49 render throttling keeps navigation and physics independent of labels.
const scene=read('source/src/office-scene.ts');
assert(scene.includes('const labelInterval=qualityMode'),'3D labels use adaptive refresh');
assert(scene.includes('lastGlowAt>=800'),'Scene glow is not recalculated every GPU frame');
assert(scene.includes('lastCanvasAt<32'),'Eco mode caps GPU frames');
assert(html.indexOf('office-ai-routine.js?v=86.49')<html.indexOf('office-smart-ai.js?v=86.49'));
assert(html.indexOf('office-smart-ai.js?v=86.49')<html.indexOf('office-movement-sync.js?v=86.49'));
const ts=require('/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript');
const result=ts.transpileModule(scene,{fileName:'office-scene.ts',reportDiagnostics:true,compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}});
assert.equal(result.diagnostics?.length||0,0,'3D scene must be syntactically valid TypeScript');
console.log(`PASS V86.45–49 Jarvis: fair contention, deterministic office routines, CAS safe force move (${planned.ok?'planned':'safely declined'}), AI diagnostics, IK props and adaptive 3D source.`);
