import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import seating from '../public/office-seating-controller.js';
const bundle=readFileSync('public/office-3d.js','utf8');
const source=readFileSync('source/src/office-scene.ts','utf8');
const html=readFileSync('public/index.html','utf8');
const release=JSON.parse(readFileSync('office-release.json','utf8'));
assert.equal(release.release,'86.21');
assert.ok(html.includes('office-seating-controller.js?v=86.21'));
assert.ok(html.includes('office-3d.js?v=86.21'));
assert.ok(html.indexOf('office-seating-controller.js?v=86.21')<html.indexOf('office-3d.js?v=86.21'));
assert.ok(bundle.includes('window.KSOfficeSeating?.registerChair({x:L*FLOOR_SPACE_SCALE'));
assert.ok(bundle.includes('window.KSOfficeSeating?.resetFurniture()'));
assert.ok(bundle.includes('const furnitureChair=Mt.seated&&Mt.status!=="walking"'));
assert.ok(bundle.includes('if(partner&&!P&&!Mt.seated)'));
assert.ok(source.includes('KSOfficeSeating?.registerChair({x:x*FLOOR_SPACE_SCALE'));

// Run the actual production minified chair constructor with light 3D mocks.
const chairStart=bundle.indexOf('function W(L,B,Z=Math.PI,gt=M){');
const chairEnd=bundle.indexOf('function pt(',chairStart);
assert.ok(chairStart>=0&&chairEnd>chairStart);
const threeGroup=class {constructor(){this.position={set(x,y,z){this.x=x;this.y=y;this.z=z}};this.rotation={};this.scale={setScalar(v){this.x=this.y=this.z=v}};this.children=[]}add(child){this.children.push(child)}};
const records=[];
const mockSeat={registerChair:spec=>records.push(spec)};
const context={Math,window:{KSOfficeSeating:mockSeat},FLOOR_SPACE_SCALE:1.5,
 M:'#333',Le:threeGroup,u:{add(){}},
 y:()=>({rotation:{}}),_:()=>({rotation:{}}),T:()=>({})};
vm.runInNewContext(bundle.slice(chairStart,chairEnd)+';this.makeChair=W;',context);
const p=context.makeChair;
p(4.2,3.5,Math.PI/3);
assert.equal(records.length,1);
assert.ok(Math.abs(records[0].x-6.3)<1e-10);
assert.ok(Math.abs(records[0].z-5.25)<1e-10);
assert.ok(Math.abs(records[0].yaw-Math.PI/3)<1e-10);
assert.ok(Math.abs(records[0].seatHeight-.726)<1e-10,'Actual scaled mesh cushion top');

// Actual furniture is authoritative when available. A moved/rotated chair's
// anchor should change without editing any employee's Supabase navigation.
seating.resetFurniture();
assert.equal(seating.chairs.length,11);
const originals=seating.chairs.map(c=>({...c}));
for(const c of originals){
 const moved=c.index===0
  ?{x:c.x+.25,z:c.z-.15,yaw:c.yaw+.34,seatHeight:.825}
  :{x:c.x,z:c.z,yaw:c.yaw,seatHeight:c.height};
 seating.registerChair(moved);
}
assert.equal(seating.chairs.length,11);
assert.ok(seating.chairs.every(c=>c.source==='scene'));
const seat=seating.chairs[0];
assert.equal(seating.selectChair(seat.x,seat.z,2),seat);
assert.equal(seating.selectChair(originals[0].x,originals[0].z,3),null,'Staff cannot borrow another chair');
for(const id of [4,5,6])assert.equal(seating.selectChair(seat.x,seat.z,id),null,'Standing showroom staff stay standing');

let st=seating.createState();
const nav={id:2,x:seat.x-.35,z:seat.z+.16,yaw:seat.yaw+1.1,status:'desk',seated:true,speed:0};
seating.step(st,nav,1/60);
assert.equal(st.phase,'turning');assert.equal(st.ready,false);
nav.yaw=seat.yaw;
nav.speed=.3;
seating.step(st,nav,1/60);
assert.equal(st.phase,'approaching');assert.equal(st.ready,false);
nav.speed=0;
for(let frame=0;frame<210;frame++)seating.step(st,nav,1/60);
assert.equal(st.phase,'seated');assert.equal(st.seatMix,1);assert.equal(st.dockMix,1);

const root={position:{x:nav.x,y:.08,z:nav.z},rotation:{y:nav.yaw},scale:{x:.42}};
class Node{constructor(){this.name='';this.position={x:0,y:0,z:0};this.rotation={x:0};this.children=[]}add(o){this.children.push(o);o.parent=this}remove(o){this.children.splice(this.children.indexOf(o),1);o.parent=null}}
const limbs=['Left leg','Right leg'].map(name=>{
 const hip=new Node(),leg=new Node();leg.name=name;hip.add(leg);
 for(const part of ['Upper trouser leg','Soft articulated knee','Lower trouser leg','Rubber outsole','Sneaker upper','Cotton shoelace']){
  const mesh=new Node();mesh.name=part;leg.add(mesh);
 }
 return {joint:hip};
});
const rig={root,body:{position:{x:0,y:0,z:0}},chest:{rotation:{x:.1}},leftLeg:limbs[0],rightLeg:limbs[1],walk:0,sleep:0,gait:0};
const knees=seating.installKnees(rig,{Group:Node});
assert.equal(knees.length,2);
assert.strictEqual(seating.installKnees(rig,{Group:Node}),knees);
for(const limb of limbs){
 const leg=limb.joint.children[0],knee=leg.children.find(c=>c.name==='Furniture knee pivot');
 assert.ok(leg.children.find(c=>c.name==='Upper trouser leg'));
 for(const part of ['Soft articulated knee','Lower trouser leg','Rubber outsole','Sneaker upper','Cotton shoelace'])assert.ok(knee.children.find(c=>c.name===part));
}
const initialRoot={...root.position};
for(let i=0;i<36000;i++){
 rig.body.position.x=rig.body.position.y=rig.body.position.z=0;
 rig.leftLeg.joint.rotation.x=rig.rightLeg.joint.rotation.x=-1.15;
 seating.pose(rig,st,1/60);
 const cs=Math.cos(root.rotation.y),sn=Math.sin(root.rotation.y);
 const pelvisX=root.position.x+.42*(rig.body.position.x*cs+rig.body.position.z*sn);
 const pelvisZ=root.position.z+.42*(-rig.body.position.x*sn+rig.body.position.z*cs);
 const pelvisY=root.position.y+.42*(2.48+rig.body.position.y);
 assert.ok(Math.hypot(pelvisX-seat.x,pelvisZ-seat.z)<1e-7,'Pelvis is on actual registered chair');
 assert.ok(Math.abs(pelvisY-seat.height)<1e-7,'Pelvis uses actual furniture cushion height');
}
assert.deepEqual(root.position,initialRoot,'No shared navigation modifications');
assert.ok(knees.every(k=>Math.abs(k.rotation.x-1.2)<1e-8));
nav.status='walking';nav.seated=false;nav.speed=.8;
let prev=st.seatMix;
for(let i=0;i<300;i++){
 seating.step(st,nav,1/60);seating.pose(rig,st,1/60);
 assert.ok(st.seatMix<=prev+1e-9);prev=st.seatMix;
}
assert.equal(st.seatMix,0);assert.equal(st.dockMix,0);
assert.ok(Math.hypot(rig.body.position.x,rig.body.position.z)<1e-5);
assert.ok(knees.every(k=>Math.abs(k.rotation.x)<1e-5));
seating.resetFurniture();
assert.equal(seating.chairs.length,11);
console.log('PASS V86.21: actual 3D furniture anchors, moved/rotated seats, height adaptation, staff chair ownership, turn/approach/dock/rise, 36,000 grounded frames, no Supabase root drift.');
