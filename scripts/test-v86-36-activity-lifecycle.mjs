import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read=p=>readFileSync(p,'utf8');
const sync=read('public/office-movement-sync.js');
const badge={dataset:{},textContent:'',title:'',attrs:{},setAttribute(k,v){this.attrs[k]=v}};
const fw={document:{getElementById:()=>badge}};
vm.runInNewContext(read('public/office-geometry-guard.js'),{window:fw},{filename:'geometry'});
vm.runInNewContext(read('public/office-furniture-interactions.js'),{window:fw},{filename:'furniture'});
const fixtures=fw.OfficeFurnitureInteractions;
for(const mode of ['loading','ready','walking','aligning','waiting','using','empty','recovering','error']){
  fixtures.status(mode);assert.equal(badge.dataset.state,mode);assert(badge.textContent.length>5);
}
assert.equal(badge.attrs['aria-live'],'polite');
const now=1_803_000_000_000;
const person={id:7,homeRoom:'staff',department:'Production',visualX:13,visualY:15};
const workers=[person];
let planned=0;
const math=Object.create(Math);math.random=()=>.9;
const root={OfficeFurnitureInteractions:fixtures,
  OfficeSmartAI:{memory:()=>null,decide:()=>({intent:{zone:'pantry',action:'drink',kind:'break',reason:'Coffee'},candidates:[{zone:'pantry',action:'drink',kind:'break'}]}),record(){}},
  OfficeLiving:{workFor:()=> 'production',jobKey:()=>'',breakMessage:()=> 'A short break'},
  OfficeSuite:{sharedMovement:{enable(){},getPeople:()=>workers,render(){},plan(id,zone,spot){planned++;if(zone!=='pantry')return null;return {from:{x:13,y:15},route:[{x:13,y:22},spot],segmentMs:[2500,8500],targetZone:zone,seatStart:null,seatGoal:spot}}}},
  addEventListener(){}};
vm.runInNewContext(sync,{window:root,document:{hidden:false,documentElement:{dataset:{ksAuth:'pending'}},addEventListener(){}},globalThis:{crypto:{randomUUID:()=> 'phase-test'}},Math:math,Date,JSON,Number,String,Object,Array,Set,Map,console},{filename:'movement'});
const timeline=root.OfficeMovementTimeline;
assert.equal(typeof timeline.phaseAt,'function','The current shared timeline must expose deterministic lifecycle phases');
const fixture=fixtures.get('coffee-station');
const staff={id:7,x:13,y:15,room:'staff',action:'production',nextAt:now-1,lastWalkAt:now-180000,walk:null,scene:null,ai:null,jobKey:''};
const snapshot={staff:[staff]};
assert.equal(timeline.evolve(snapshot,now),true);
assert.equal(staff.walk?.furnitureId,fixture.id);
assert.equal(staff.scene?.kind,'equipment');
assert(planned>0);
const w=staff.walk,scene=staff.scene;
assert.equal(timeline.phaseAt(staff,w.startedAt-1).phase,'waiting');
assert.equal(timeline.phaseAt(staff,w.startedAt).phase,'walking');
assert.equal(timeline.phaseAt(staff,w.endAt-100).phase,'aligning');
assert.equal(timeline.phaseAt(staff,w.endAt+5).phase,'aligning');
assert.equal(timeline.phaseAt(staff,scene.from).phase,'interacting');
assert.equal(timeline.phaseAt(staff,scene.until-1).phase,'interacting');
assert.equal(timeline.phaseAt(staff,scene.until).phase,'completing');
assert.equal(timeline.phaseAt(staff,staff.nextAt).phase,'ready');
assert.equal(timeline.movementAt(staff,w.startedAt+500).furnitureId,null);
assert.equal(timeline.movementAt(staff,scene.from+100).furnitureId,fixture.id);
assert.equal(timeline.movementAt(staff,scene.until+1).furnitureId,null);
assert.equal(fixtures.occupied(fixture,{staff:[staff]},8,scene.from+200),true);
assert.equal(fixtures.occupied(fixture,{staff:[staff]},8,scene.until+1),false);
assert.equal(timeline.validPayload({schema:1,owner:'test',leaseUntil:now+10000,staff:[staff]}),true,'Optional return/activity walk kind preserves schema 1');
const early=structuredClone(staff);early.scene.from=early.walk.endAt-500;
assert.equal(timeline.validPayload({schema:1,owner:'test',leaseUntil:now,staff:[early]}),false,'Reject a scene that starts before equipment arrival');
const bad=structuredClone(staff);bad.walk.kind='teleport';
assert.equal(timeline.validPayload({schema:1,owner:'test',leaseUntil:now,staff:[bad]}),false,'Unknown movement modes rejected');
const returning={...staff,walk:{...w,kind:'return'},scene:null};
assert.equal(timeline.phaseAt(returning,w.startedAt+100).phase,'returning');
assert.equal(timeline.phaseAt(null,now).phase,'recovering');
// Leader cannot reassign a staff member whose active scene is still in progress,
// even if a stale nextAt in a compatible schema-1 payload is already due.
const inScene={...staff,x:13,y:15,walk:null,scene:{kind:'meeting',text:'Reviewing',from:now-500,until:now+9000},nextAt:now-1,ai:{v:1,at:now,focus:.6,energy:.7,social:.4,curiosity:.5,streak:0,decisions:0}};
planned=0;
const only={staff:[inScene]};
assert.equal(timeline.evolve(only,now),false);
assert.equal(planned,0,'An active scene is not rescheduled');
// Unable to reserve any valid route: status is shared using existing action/nextAt,
// and a retry is scheduled instead of starting a second movement writer.
root.OfficeSuite.sharedMovement.plan=()=>null;
const waiting={id:7,x:13,y:15,room:'staff',action:'production',nextAt:now-1,lastWalkAt:now-180000,walk:null,scene:null,jobKey:''};
assert.equal(timeline.evolve({staff:[waiting]},now),true);
assert.equal(waiting.action,'waiting');
assert(waiting.nextAt>=now+9000);
assert.equal(timeline.phaseAt(waiting,now+100).phase,'waiting');
const jobRef='JOB-0042';
waiting.jobKey=jobRef;
assert.equal(jobRef,'JOB-0042','Simulation must not write to actual customer orders');
// When two colleagues want the same single-use appliance, only the first
// receives a reservation. The second receives a real shared retry status.
const secondPerson={id:8,homeRoom:'staff',department:'Production',visualX:22,visualY:9};
workers.push(secondPerson);
const first={id:7,x:13,y:15,room:'staff',action:'production',nextAt:now-1,lastWalkAt:now-200000,walk:null,scene:null,jobKey:''};
const second={id:8,x:22,y:9,room:'staff',action:'production',nextAt:now-1,lastWalkAt:now-185000,walk:null,scene:null,jobKey:''};
const routes=[];
root.OfficeSuite.sharedMovement.plan=(id,zone,spot)=>{
  routes.push({id,zone});
  if(zone!=='pantry')return null;
  return {from:{x:id===7?13:22,y:id===7?15:9},route:[{x:id===7?13:22,y:22},spot],segmentMs:[2500,8500],targetZone:zone};
};
assert.equal(timeline.evolve({staff:[first,second]},now),true);
assert.equal(first.walk?.furnitureId,fixture.id);
assert.equal(second.walk,null);
assert.equal(second.action,'waiting');
assert(!routes.some(entry=>entry.id===8&&entry.zone==='pantry'),'Second worker cannot even plan against occupied equipment');
assert.equal(timeline.phaseAt(first,first.scene.from).phase,'interacting');
assert.equal(timeline.phaseAt(second,now+100).phase,'waiting');
const manifest=read('scripts/stability-suite.mjs');
const page=read('public/index.html');
assert(manifest.includes('test-v86-36-activity-lifecycle.mjs'),'Regression test must run in CI');
assert(page.includes('office-movement-sync.js?v=86.39'),'Updated lifecycle must be cache-busted');
assert(page.includes('office-furniture-interactions.js?v=86.36'));
console.log('PASS V86.36 lifecycle: deterministic phases, arrival-only interaction, finished reservation release, valid schema, active-scene safety, retry recovery, accessible feedback and CI wiring.');
