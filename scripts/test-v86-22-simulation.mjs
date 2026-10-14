import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import * as T from '../source/node_modules/three/build/three.module.js';
import seating from '../public/office-seating-controller.js';
import geometry from '../public/office-geometry-guard.js';
import {createOfficeMaleRig,createOfficeHijabiRig,animateOfficeHijabi} from '../source/src/office-character-runtime.js';
import {followSceneTarget} from '../source/src/office-navigation.js';

const html=readFileSync('public/index.html','utf8');
const roster=new Function('return '+html.match(/const DEFAULT_EMPLOYEES = (\[[\s\S]*?\n  \]);/)[1])();
assert.deepEqual(roster.map(p=>p.id),[1,2,3,4,5,6,7,8],'Test the live IDs, not the unrelated demo indices');
const chairKeys=['B01','B02','D01','S01','A01','D02'];
seating.resetFurniture();
// Out-of-order construction deliberately prevents an array-index owner mapping.
for(const [i,key] of [...chairKeys].reverse().entries())seating.registerChair({key,x:i*4,z:0,yaw:0,seatHeight:.726});
seating.bindStaff(roster.map(p=>({...p,seatId:p.deskId})));
for(const employee of roster){
  const chair=seating.chairs.find(c=>c.key===employee.deskId);
  if(chair){assert.equal(seating.selectChair(chair.x,chair.z,employee.id),chair);for(const other of roster.filter(p=>p.id!==employee.id))assert.equal(seating.selectChair(chair.x,chair.z,other.id),null);}
  else for(const chair of seating.chairs)assert.equal(seating.selectChair(chair.x,chair.z,employee.id),null,'No showroom phantom seat');
}
assert.equal(seating.registerChair({key:'invalid',x:NaN,z:0,yaw:0,seatHeight:1}),null);
assert.throws(()=>seating.registerChair({key:'B01',x:0,z:0,yaw:0,seatHeight:.7}),/Duplicate/);
seating.bindStaff([{id:123,seatId:'B01'}]);
assert.equal(seating.selectChair(seating.chairs[5].x,0,123)?.key,'B01','Custom staff IDs bind by desk');

let simulated=0;
for(const [model,yaw,height] of [['male',Math.PI/2,.726],['classic',Math.PI,.726],['semi-casual',-.6,.825]]){
  seating.resetFurniture();const chair=seating.registerChair({key:'D01',x:2,z:-8,yaw,seatHeight:height,
    workPoint:{x:2+Math.sin(yaw)*(height>.8?.62:.66),y:1.2395,z:-8+Math.cos(yaw)*(height>.8?.62:.66)}});
  seating.bindStaff([{id:3,seatId:'D01'}]);
  const rig=(model==='male'?createOfficeMaleRig:createOfficeHijabiRig)({id:3,name:'Fixture',appearance:{model}});
  rig.root.position.set(1.64,.08,-7.83);rig.root.rotation.y=yaw;
  rig.root.updateMatrixWorld(true);const beforeBox=new T.Box3().setFromObject(rig.root);
  const knees=seating.installKnees(rig,T);assert.equal(knees.length,2);
  const again=seating.installKnees(rig,T);assert.deepEqual(again,knees,'Installation is idempotent');
  rig.root.updateMatrixWorld(true);const afterBox=new T.Box3().setFromObject(rig.root);
  assert(beforeBox.min.distanceTo(afterBox.min)<1e-6&&beforeBox.max.distanceTo(afterBox.max)<1e-6,'Reparenting must preserve the original mesh');
  const state=rig.seatStateV8620=seating.createState();
  const input={id:3,x:rig.root.position.x,z:rig.root.position.z,yaw,status:'desk',seated:true,speed:0,action:'pc-work'};
  seating.step(state,{...input,yaw:yaw+1},1/60);assert.equal(state.phase,'turning');assert.equal(state.seatMix,0);
  seating.step(state,{...input,speed:.8},1/60);assert.equal(state.phase,'approaching');
  seating.step(state,{...input,canDock:()=>false},1/60);assert.equal(state.chair,null,'No docking across a wall');
  const rootBefore=rig.root.position.clone();
  for(let frame=0;frame<12000;frame++){
    seating.step(state,input,1/60);animateOfficeHijabi(rig,input,frame/60,1/60,0);seating.pose(rig,state);simulated++;
    if(frame>120&&frame%120===0){
      rig.root.updateMatrixWorld(true);
      const hips=[rig.leftLeg,rig.rightLeg].map(l=>l.joint.getWorldPosition(new T.Vector3()));
      const centre=hips[0].clone().add(hips[1]).multiplyScalar(.5);
      assert(Math.hypot(centre.x-chair.x,centre.z-chair.z)<1e-6);
      assert(Math.abs(centre.y-chair.height-.13)<1e-6,'Upper trouser support is above the cushion');
      rig.root.traverse(o=>{if(o.name==='Rubber outsole')assert(Math.abs(new T.Box3().setFromObject(o).min.y-chair.floorY)<1e-5,'Real sole vertices touch the floor');});
      for(const [i,limb] of rig.precisionV8615.limbs.entries()){
        const sign=i===0?-1:1,target=new T.Vector3(chair.workPoint.x+Math.cos(yaw)*sign*.19,chair.workPoint.y+.085,chair.workPoint.z-Math.sin(yaw)*sign*.19);
        const hand=limb.hand.getWorldPosition(new T.Vector3());assert(hand.distanceTo(target)<.004,JSON.stringify({model,frame,hand:hand.toArray(),target:target.toArray(),rest:limb.handRestY,error:hand.distanceTo(target)}));
      }
      assert(rig.root.position.equals(rootBefore),'Poses must not modify shared navigation coordinates');
    }
  }
  const frozen=JSON.stringify(state);seating.step(state,{...input,status:'walking',seated:false},0);assert.equal(JSON.stringify(state),frozen,'Paused state stays exact');
  const walk={...input,status:'walking',seated:false,speed:.8};assert(seating.holdMovement(state,walk));
  let last=state.seatMix;
  for(let i=0;i<120;i++){
    seating.step(state,walk,1/60);assert(state.seatMix<=last);last=state.seatMix;
    animateOfficeHijabi(rig,walk,220+i/60,1/60,.02);seating.pose(rig,state);
  }
  assert.equal(state.seatMix,0);assert.equal(state.chair,null);assert(!seating.holdMovement(state,walk));
  assert(Math.hypot(rig.body.position.x,rig.body.position.z)<1e-8,'Stand-up removes the furniture offset');
  const nap={...input,status:'break',seated:false,action:'sleep'};
  for(let i=0;i<240;i++){seating.step(state,nap,1/60);animateOfficeHijabi(rig,nap,230+i/60,1/60,0);seating.pose(rig,state);}
  assert(rig.body.position.x<-.4&&rig.body.rotation.z<-1,'Non-seated rest animation is preserved');
}

// Sweep the actual renderer follower through a cross-partition stale target.
for(const [start,end] of [[{x:10,y:49.2},{x:14,y:49.2}],[{x:8.5,y:10.1},{x:17.9,y:43.1}],[{x:5.5,y:62},{x:17,y:53}]]){
  const a=geometry.planToWorld(start),b=geometry.planToWorld(end);
  const rig={root:{position:new T.Vector3(a.x,.08,a.z)},targetPosition:new T.Vector3(b.x,.08,b.z),person:{status:'walking'},targetRotation:0};
  const path=geometry.findWorldPath(a,b);assert(path?.length,'Every reachable target has a route');
  for(let i=0;i<6000&&rig.root.position.distanceTo(rig.targetPosition)>.01;i++){
    const before=rig.root.position.clone();followSceneTarget(rig,1/60,geometry);
    assert(geometry.worldClear(before,rig.root.position),'No renderer frame crosses a wall or worktop');
    // V86.28 permits adaptive, wall-swept catch-up up to 7.2 units/s,
    // replacing V86.22's obsolete 2.4 units/s fixed-speed limit.
    // Keep a strict per-frame displacement cap to prevent teleporting.
    assert(before.distanceTo(rig.root.position)<=7.2/60+1e-8,'Catch-up cannot teleport');
  }
  assert(rig.root.position.distanceTo(rig.targetPosition)<.01,'Follower must route around the partition, not stay stuck');
}
assert(!geometry.clearLine({x:10,y:49.2},{x:14,y:49.2}));
assert(geometry.clearLine({x:10,y:44.2},{x:14,y:44.2}),'Actual door remains open');
const invalid=geometry.planToWorld({x:11.7,y:49.2}),destination=geometry.planToWorld({x:14,y:49.2});
assert.deepEqual(geometry.constrainWorldSegment(invalid,destination),invalid,'Embedded starts cannot bypass the wall guard');
assert.equal(geometry.findWorldPath(invalid,destination),null);
for(const match of html.matchAll(/<script\b[^>]*src=["']([^"']+)["']/g)){
  const file=match[1].split('?')[0];if(!/^https?:/.test(file))assert(existsSync('public/'+file),'Missing script '+file);
}
seating.resetFurniture();
console.log(`PASS V86.22: live desk ownership, reordered chairs, ${simulated} actual-rig frames, cushion/sole/keyboard contact, pause, rise, preserved rest, swept wall/worktop routes, complete assets.`);
