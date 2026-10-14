import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const get=p=>readFileSync(p,'utf8');
const geometry=get('public/office-geometry-guard.js');
const furnitureCode=get('public/office-furniture-interactions.js');
const syncCode=get('public/office-movement-sync.js');
const html=get('public/index.html');
const source=get('source/src/office-scene.ts');
const bridge=get('source/src/suite-bridge.ts');
const character=get('source/src/office-character.ts');
const workflow=get('.github/workflows/deploy-pages.yml');
assert(html.includes('office-furniture-interactions.js?v=86.36'));
assert(html.indexOf('office-furniture-interactions.js?v=86.36')<html.indexOf('office-movement-sync.js?v=86.39'));
assert(html.includes('office-3d.js?v=86.39'));
const w={};
vm.runInNewContext(geometry,{window:w},{filename:'office-geometry-guard.js'});
vm.runInNewContext(furnitureCode,{window:w},{filename:'office-furniture-interactions.js'});
const f=w.OfficeFurnitureInteractions;
assert.equal(f.version,'86.30');
const badge={dataset:{},textContent:'',title:''};
w.document={getElementById:()=>badge};
for(const state of ['loading','ready','using','empty','waiting','error']){
 f.status(state);assert.equal(badge.dataset.state,state);assert(badge.textContent.length>5);
}

assert.equal(f.list().length,4,'Four real pieces of office equipment should be registered');
for(const e of f.list()){
 assert.equal(w.KSOfficeGeometry.navBlocked(e.point.x,e.point.y),false,`${e.id} approach must be navigable`);
 assert.equal(f.validate(e),true);
 assert(Number.isFinite(e.yaw)&&e.duration>=12000);
 assert(source.includes(`id:'${e.id}'`),`${e.id} must be registered from actual Three.js furniture`);
}
assert.equal(f.forIntent({zone:'pantry',action:'drink'}).id,'coffee-station');
assert.equal(f.forIntent({zone:'store',action:'stocking'}).id,'stock-shelf');
assert.equal(f.forIntent({zone:'showroom',action:'meeting'},{department:'Graphic Design'}).id,'showroom-samples');
assert.equal(f.forIntent({zone:'showroom',action:'meeting'},{department:'Production'}).id,'heat-press');
assert.equal(f.forIntent({zone:'corridor',action:'chat'}),null);
const now=1_805_000_000_000;
const shelf=f.get('stock-shelf');
assert.equal(f.occupied(shelf,{staff:[{id:1,walk:{furnitureId:shelf.id,endAt:now+30000}}]},2,now),true,'Reservation blocks another staff');
assert.equal(f.occupied(shelf,{staff:[{id:1,scene:{furnitureId:shelf.id,until:now+30000}}]},2,now),true,'Using fixture blocks another staff');
assert.equal(f.occupied(shelf,{staff:[{id:1,scene:{furnitureId:shelf.id,until:now-1}}]},2,now),false,'Finished interaction releases fixture');
assert.equal(f.occupied(shelf,{staff:[{id:1,scene:{furnitureId:shelf.id,until:now+1000}}]},1,now),false,'Owner can keep their own reservation');
const root={OfficeFurnitureInteractions:f,OfficeSmartAI:{
 decide(){return {intent:{zone:'pantry',action:'drink',kind:'break',reason:'☕ Coffee'},candidates:[{zone:'pantry',action:'drink',kind:'break',reason:'☕ Coffee'}]};},
 memory(){return {v:1,at:now,focus:.5,energy:.5,social:.5,curiosity:.5,streak:0,decisions:0}},record(){},
 },OfficeLiving:{workFor:()=> 'pc-work',jobKey:()=>'',breakMessage:()=> 'Coffee break'},addEventListener(){}};
const person={id:8,homeRoom:'staff',department:'Production',position:'Production',visualX:13,visualY:15};
const motion={enable(){},getPeople:()=>[person],render(){},plan(id,zone,point){
 assert.equal(zone,'pantry');assert.equal(id,8);
 assert.equal(JSON.stringify(point),JSON.stringify(f.get('coffee-station').point),'Planner must receive physical fixture approach');
 return {from:{x:13,y:15},route:[{x:13,y:22},point],segmentMs:[3500,9000],targetZone:zone,seatGoal:null,seatStart:null};
}};
root.OfficeSuite={sharedMovement:motion};
vm.runInNewContext(syncCode,{window:root,document:{hidden:false,documentElement:{dataset:{ksAuth:'pending'}},addEventListener(){}},
 globalThis:{crypto:{randomUUID:()=> 'furniture-test'}},Math,Date,JSON,Number,String,Object,Array,Set,Map,console},{filename:'office-movement-sync.js'});
const api=root.OfficeMovementTimeline;
const staff={id:8,x:13,y:15,room:'staff',action:'pc-work',nextAt:now-1,lastWalkAt:now-180000,walk:null,scene:null,ai:null,jobKey:''};
const shared={staff:[staff]};
assert.equal(api.evolve(shared,now),true,'Leader should plan an interaction');
assert.equal(staff.walk?.furnitureId,'coffee-station');
assert.equal(staff.scene?.kind,'equipment');
assert.equal(staff.scene.furnitureId,'coffee-station');
assert(staff.nextAt>=staff.scene.until,'Character must not leave fixture before activity completes');
const data={schema:1,owner:'leader',leaseUntil:now+15000,staff:shared.staff};
assert.equal(api.validPayload(data),true,'Existing schema 1 remains valid with optional furniture metadata');
const invalid=structuredClone(data);invalid.staff[0].scene.furnitureId='ghost-printer';
assert.equal(api.validPayload(invalid),false,'Unknown furniture IDs cannot become shared reservations');
assert.equal(api.movementAt(staff,staff.walk.startedAt+200).furnitureId,null,'No premature docking while walking');
const arrived=api.movementAt(staff,staff.scene.from+1000);
assert.equal(arrived.furnitureId,'coffee-station');
assert.equal(arrived.action,'drink');
assert.equal(arrived.walking,false);
assert.equal(api.movementAt(staff,staff.scene.until+100).furnitureId,null,'Release after interaction');
assert(bridge.includes('motionFurnitureId')&&source.includes('fixture.yaw'),'Follower forwards fixture and renderer faces it');
assert(character.includes("['coffee','drink'].includes"),'Drink gesture remains linked to shared action');
const stabilityManifest=readFileSync('scripts/stability-suite.mjs','utf8');
assert(workflow.includes('node scripts/run-stability-suite.mjs'), 'CI must execute the strict simulator suite');
assert(stabilityManifest.includes('test-v86-30-furniture-ai.mjs'), 'CI must guard furniture interactions through the simulator suite');
console.log('PASS V86.30 furniture interactions: four safe anchors, occupancy, priority, single-leader reservation, arrival timing, follower playback, gesture/facing connection, schema and CI wiring.');
