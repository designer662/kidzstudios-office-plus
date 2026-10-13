import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import geometry from '../public/office-geometry-guard.js';
const s=readFileSync('public/office-3d.js','utf8');
const h=readFileSync('public/index.html','utf8');
const version=JSON.parse(readFileSync('office-release.json','utf8'));
assert.equal(version.release,'86.19');
assert.ok(h.includes('office-geometry-guard.js?v=86.19'));
assert.ok(h.includes('office-3d.js?v=86.19'));
assert.equal(geometry.walls.length,25);
assert.equal(geometry.footprint.length,10);
assert.equal(geometry.blocked(17,40),false);
assert.equal(geometry.blocked(11.7,40),true,'Boss partition must collide');
assert.equal(geometry.blocked(11.7,44.2),false,'Boss doorway must remain open');
assert.equal(geometry.blocked(11.7,49.5),true,'Store partition must collide');
assert.equal(geometry.blocked(11.7,55.1),false,'Store entrance must remain open');
assert.equal(geometry.blocked(5.5,56.9),false,'Toilet B door is open');
assert.equal(geometry.blocked(3.8,61.5),true,'Toilet divider must collide');
assert.equal(geometry.pointInFloor(1,20),false,'Notched exterior space has no floor');
assert.equal(geometry.pointInFloor(8,20),true);
const a={x:10.0,y:49.2},b={x:14,y:49.2};
assert.equal(geometry.clearLine(a,b),false,'A character may not cross a solid wall');
const start={x:(a.x/2-5.75)*1.5,z:(a.y/2-17.5)*1.5};
const finish={x:(b.x/2-5.75)*1.5,z:(b.y/2-17.5)*1.5};
const stop=geometry.constrainWorldSegment(start,finish,1.5);
assert.notDeepEqual(stop,finish,'Renderer must stop before the solid partition');
assert.equal(geometry.blocked(stop.x/1.5*2+11.5,stop.z/1.5*2+35),false);
const entry={x:10,y:44.2},exit={x:14,y:44.2};
assert.equal(geometry.clearLine(entry,exit),true,'Staff can walk through an actual doorway');
const begin=s.indexOf('function applyOfficePrecisionV8615('),end=s.indexOf('// Automatically trims rendering resolution',begin);
assert.ok(begin>0&&end>begin);
const ctx={Math,Number,Map,Set,console,ks15Alpha:(dt,rate)=>1-Math.exp(-dt*rate),ks15Mix:(a,b,k)=>a+(b-a)*k,ks15Clamp:(x,min,max)=>Math.min(max,Math.max(min,x)),KS15_REACH:new Set(['pc'])};
vm.runInNewContext(s.slice(begin,end)+'\nthis.align=applyOfficePrecisionV8615;this.chairs=officeChairAnchorsV8615;this.find=officeNearestSeatV8618;',ctx);
const staffSeats={7:0,3:1,4:2,2:6,6:7,1:8};
for(const [staffId,index] of Object.entries(staffSeats)){
 const c=ctx.chairs[index];
 assert.equal(ctx.find(c.x,c.z,.02,Number(staffId))?.staffId,Number(staffId));
 const bad=ctx.chairs[(index+1)%ctx.chairs.length];
 assert.equal(ctx.find(bad.x,bad.z,.02,Number(staffId)),null,'Staff cannot dock into another staff chair');
}
assert.equal(ctx.find(3.75*1.5,-3.1*1.5,.88,5),null,'Nisa must stand in the showroom, not pretend to sit without a chair');
// Check a misaligned staff position 0.64 scene units from the cushion. This was
// beyond the old +/-0.42 local offset and visibly put staff beside the chair.
const chair=ctx.chairs[2];
const root={position:{x:chair.x-.46,z:chair.z+.44},rotation:{y:chair.yaw},scale:{x:.42},userData:{officeHijabi:true}};
const person={status:'desk',seated:true,action:'pc-work'};
const rig={root,body:{position:{x:0,y:-.9,z:0}},walk:0,sit:1,sleep:0,phase:1,precisionV8615:{limbs:[],eyes:[],glints:[],brows:[],smiles:[],weight:0,seatOffsetX:0,seatOffsetZ:0}};
for(let frame=0;frame<600*60;frame++){
 rig.body.position.x=0;rig.body.position.y=-.9;rig.body.position.z=0;
 ctx.align(rig,person,frame/60,1/60,{chair});
 if(frame>120){
  const theta=root.rotation.y,c=Math.cos(theta),s=Math.sin(theta),scale=root.scale.x;
  const worldX=root.position.x+scale*(rig.body.position.x*c+rig.body.position.z*s);
  const worldZ=root.position.z+scale*(-rig.body.position.x*s+rig.body.position.z*c);
  assert.ok(Math.hypot(worldX-chair.x,worldZ-chair.z)<.001,'Seated hips center exactly on the cushion, without drifting');
 }
}
assert.ok(Math.abs(rig.body.position.y+0.94)<1e-9,'Seated hip height remains calibrated');
for(let frame=0;frame<240;frame++){
 rig.body.position.x=rig.body.position.z=rig.body.position.y=0;rig.sit=0;
 ctx.align(rig,{...person,seated:false,status:'walking'},frame/60,1/60,{});
}
assert.ok(Math.hypot(rig.body.position.x,rig.body.position.z)<1e-5,'Walking removes the seat alignment');
assert.ok(s.includes('guard.constrainWorldSegment(Z.root.position,candidate,FLOOR_SPACE_SCALE)'));
console.log('PASS V86.19: 25 walls, floor footprint and door gaps, no crossing through solid partitions; 6 assigned seats, showroom standing, 36,000 offset-stable frames.');
