import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import seating from '../public/office-seating-controller.js';
const bundle=readFileSync('public/office-3d.js','utf8');
const html=readFileSync('public/index.html','utf8');
const source=readFileSync('source/src/office-scene.ts','utf8');
const release=JSON.parse(readFileSync('office-release.json','utf8'));
assert.equal(release.release,'86.20');
assert.ok(html.includes('office-seating-controller.js?v=86.20'));
assert.ok(html.indexOf('office-seating-controller.js?v=86.20')<html.indexOf('office-3d.js?v=86.20'));
assert.ok(bundle.includes('window.KSOfficeSeating?.installKnees(B,__KS3D)'));
assert.ok(bundle.includes('seating.pose(Z,seatState,L)'));
assert.ok(bundle.includes('Z.precisionSceneV8615={chair:null'));
assert.ok(source.includes('seating.pose(h,seatState,dt)'));
assert.equal(seating.chairs.length,11);
// Real staff seat mapping from the V86.19 roster. The older table had IDs shifted.
for(const [id,index] of [[0,8],[1,6],[2,0],[3,1],[7,7]]){
 const c=seating.chairs[index];
 assert.equal(c.staffId,id);
 assert.equal(seating.findChair(c.x,c.z,id)?.index,index);
 assert.equal(seating.findChair(c.x,c.z,(id+1)%8),null,'Another worker cannot borrow an assigned chair');
}
assert.equal(seating.findChair(3.75*1.5,-3.1*1.5,4),null,'Nisa is standing in showroom');
const chair=seating.chairs[0];
const nav={id:2,x:chair.x-.38,z:chair.z+.27,yaw:chair.yaw+.8,seated:true,status:'desk',speed:0};
let state=seating.createState();
state=seating.step(state,nav,1/60);
assert.ok(['turning','approaching'].includes(state.phase));
assert.equal(state.ready,false,'Cannot start sitting while facing wrong direction');
nav.yaw=chair.yaw;
for(let i=0;i<180;i++)state=seating.step(state,nav,1/60);
assert.equal(state.phase,'seated');
assert.ok(state.seatMix>.985);
// Test imported-avatar local hip coordinates with independently rotating root.
const root={position:{x:nav.x,y:.08,z:nav.z},rotation:{y:nav.yaw},scale:{x:.42}};
const rig={root,body:{position:{x:0,y:0,z:0}},chest:{rotation:{x:.1}},leftLeg:{joint:{rotation:{x:0}}},rightLeg:{joint:{rotation:{x:0}}},walk:0,sleep:0,gait:0};
class Node {constructor(){this.children=[];this.position={x:0,y:0,z:0};this.rotation={x:0,y:0,z:0};this.name=''}add(obj){this.children.push(obj);obj.parent=this;}remove(obj){this.children.splice(this.children.indexOf(obj),1);obj.parent=null;}}
function makeLeg(name){const hip=new Node(),leg=new Node();leg.name=name;hip.add(leg);for(const [part,y] of [['Upper trouser leg',0],['Lower trouser leg',0],['Sneaker upper',.28],['Cotton shoelace',.1]]){const piece=new Node();piece.name=part;piece.position.y=y;leg.add(piece);}return {joint:hip};}
rig.leftLeg=makeLeg('Left leg');rig.rightLeg=makeLeg('Right leg');
const knees=seating.installKnees(rig,{Group:Node});
assert.equal(knees.length,2);
assert.strictEqual(seating.installKnees(rig,{Group:Node}),knees,'Knees not reparented twice');
for(const limb of [rig.leftLeg,rig.rightLeg]){const leg=limb.joint.children[0];assert.ok(leg.children.some(v=>v.name==='Upper trouser leg'));const knee=leg.children.find(v=>v.name==='Office sitting knee');assert.ok(knee.children.some(v=>v.name==='Lower trouser leg'));assert.ok(Math.abs(knee.children.find(v=>v.name==='Sneaker upper').position.y-(.28-1.315))<1e-9);}
const unchanged={...root.position};
for(let frame=0;frame<36000;frame++){
 // This controller must replace legacy body offsets, not accumulate on top of them.
 rig.body.position.x=rig.body.position.z=rig.body.position.y=0;
 seating.pose(rig,state,1/60);
 const c=Math.cos(root.rotation.y),sn=Math.sin(root.rotation.y),scale=root.scale.x;
 const hipX=root.position.x+scale*(rig.body.position.x*c+rig.body.position.z*sn);
 const hipZ=root.position.z+scale*(-rig.body.position.x*sn+rig.body.position.z*c);
 assert.ok(Math.hypot(hipX-chair.x,hipZ-chair.z)<1e-7,'Pelvis stays centered on the chair');
 assert.ok(Math.abs((root.position.y+(2.48+rig.body.position.y)*scale)-.726)<.001,'Pelvis at cushion height');
}
assert.deepEqual(root.position,unchanged,'Shared navigation root is NEVER modified');
assert.ok(knees.every(k=>Math.abs(k.rotation.x-1.13)<1e-8));
assert.ok([rig.leftLeg,rig.rightLeg].every(l=>Math.abs(l.joint.rotation.x+1.15)<1e-8));
// On departure, the visual pose releases smoothly. Walking cannot keep a chair.
nav.status='walking';nav.seated=false;nav.speed=.8;
let last=state.seatMix;
for(let frame=0;frame<180;frame++){
 seating.step(state,nav,1/60);
 assert.ok(state.seatMix<=last+1e-8);
 last=state.seatMix;
 seating.pose(rig,state,1/60);
 if(frame===0)assert.ok(Math.hypot(rig.body.position.x,rig.body.position.z)>.5,'Rising keeps the chair anchor, without a one-frame lateral snap');
}
assert.ok(state.seatMix<1e-6);
assert.ok(Math.hypot(rig.body.position.x,rig.body.position.z)<1e-5);
assert.ok(knees.every(k=>Math.abs(k.rotation.x)<1e-5));
assert.ok(Math.abs(rig.body.position.y)<1e-4);
console.log('PASS V86.20: correct real staff chairs; turn-before-sit, seated knee pivots, 36,000 stable hip/cushion frames, clean stand-up, no navigation-root modification.');
