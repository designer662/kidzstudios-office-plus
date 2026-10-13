import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const bundle=readFileSync('public/office-3d.js','utf8');
const html=readFileSync('public/index.html','utf8');
const source=readFileSync('source/src/office-scene.ts','utf8');
const release=JSON.parse(readFileSync('office-release.json','utf8'));
const scale=1.5;
assert.equal(release.release,'86.20');
assert.match(bundle,/const FLOOR_SPACE_SCALE=1\.5;/);
assert.match(source,/const FLOOR_SPACE_SCALE=1\.5;/);
assert.ok(html.includes('office-3d.js?v=86.20'),'New build busts browser cache');
const expected=['u.scale.set(FLOOR_SPACE_SCALE,1,FLOOR_SPACE_SCALE)','L.position[0]*FLOOR_SPACE_SCALE','L.position[1]*FLOOR_SPACE_SCALE','focus[0]*FLOOR_SPACE_SCALE','6*FLOOR_SPACE_SCALE','18*FLOOR_SPACE_SCALE'];
for(const marker of expected)assert.ok(bundle.includes(marker),`Missing shared transform: ${marker}`);
assert.match(bundle,/\(i\.visualX\?\?i\.x\)\/2-5\.75/,'Supabase floor-plan units remain unchanged');
assert.match(bundle,/\.root\.position\.y=\.08/,'All character roots anchored to floor');

// Test the actual shipped seating implementation, not an independently copied approximation.
const start=bundle.indexOf('function applyOfficePrecisionV8615(');
const end=bundle.indexOf('// Automatically trims rendering resolution',start);
assert.ok(start>0&&end>start);
const context={Math,Number,Map,Set,console,
 ks15Alpha:(dt,rate)=>1-Math.exp(-dt*rate),
 ks15Mix:(a,b,k)=>a+(b-a)*k,
 ks15Clamp:(x,a,b)=>Math.min(b,Math.max(a,x)),
 KS15_REACH:new Set(['pc']),
};
vm.runInNewContext(bundle.slice(start,end)+'\nthis.align=applyOfficePrecisionV8615;this.findSeat=officeNearestSeatV8618;this.chairs=officeChairAnchorsV8615;',context);
assert.equal(context.chairs.length,11);
const planChairs=[
 [-1.5,-12.45,Math.PI/2],[3.2,-12.45,-Math.PI/2],[-1.5,-10.2,Math.PI/2],[3.2,-10.2,-Math.PI/2],
 [-1.5,-7.95,Math.PI/2],[3.2,-7.95,-Math.PI/2],[-.15,-14.85,Math.PI],[3.1,-14.85,Math.PI],
 [3.2,4.05,Math.PI],[-3.45,2.45,0],[-3.45,4.85,Math.PI]
];
for(const [x,z,yaw] of planChairs){
 const at=context.findSeat(x*scale,z*scale,.05);
 assert.ok(at,`Missing chair at ${x}, ${z}`);
 assert.ok(Math.abs(at.yaw-yaw)<1e-9,'Chair facing must match the 3D furniture');
}
assert.equal(context.findSeat(100,100),null);
assert.equal(context.findSeat(NaN,0),null);
// Long-run test: body lateral correction must not accumulate at 60fps;
// seat height must be deterministic and stable at exact chair coordinate.
const base=context.findSeat(-1.5*scale,-12.45*scale);
const root={position:{x:base.x-.06,z:base.z+.07},rotation:{y:base.yaw},scale:{x:.42},userData:{officeHijabi:true}};
const r={root,body:{position:{x:0,y:-.90,z:0}},walk:0,sit:1,phase:1,precisionV8615:{limbs:[],eyes:[],glints:[],brows:[],smiles:[],weight:0,seatOffsetX:0,seatOffsetZ:0}};
const p={status:'desk',seated:true,action:'pc-work'};
let first=null;
for(let i=0;i<60*240;i++){
 // Replicate the animator's fresh absolute pose every frame.
 r.body.position.x=0;r.body.position.y=-.9;r.body.position.z=0;
 context.align(r,p,i/60,1/60,{chair:base});
 if(i===120)first={...r.body.position};
 assert.ok(Number.isFinite(r.body.position.x)&&Number.isFinite(r.body.position.y)&&Number.isFinite(r.body.position.z));
 assert.ok(Math.hypot(r.body.position.x,r.body.position.z)<.45,'Seated body must stay on cushion');
}
assert.ok(Math.abs(r.body.position.x-first.x)<1e-4,'No time-accumulating X drift');
assert.ok(Math.abs(r.body.position.z-first.z)<1e-4,'No time-accumulating Z drift');
assert.ok(Math.abs(r.body.position.y-(-.94))<1e-9,'Seated hip offset matches cushion');
// Standing up must clear BOTH lateral offsets and extra seating height.
for(let i=0;i<240;i++){
 r.body.position.x=0;r.body.position.y=0;r.body.position.z=0;r.sit=0;
 context.align(r,{...p,seated:false,status:'walking'},i/60,1/60,{});
}
assert.ok(Math.abs(r.body.position.x)<1e-6&&Math.abs(r.body.position.z)<1e-6,'Seat correction clears on departure');
assert.equal(r.body.position.y,0,'Walking body reset to standing height');
assert.match(bundle,/Wh\(Z,seatState\?\{\.\.\.Mt,seated:seatState\.ready\}:Mt/, 'Only enter sitting pose when the new chair controller authorizes it');
assert.match(bundle,/Z\.targetRotation=seatState\.chair\.yaw/, 'Seated staff turn toward their desk');
console.log(`PASS V86.18 regression on V86.19: +20% width/length vs V86.17, ${planChairs.length} chairs with correct yaw; 14,400 seated frames without drift, stand-up release, shared floor-plan intact.`);
