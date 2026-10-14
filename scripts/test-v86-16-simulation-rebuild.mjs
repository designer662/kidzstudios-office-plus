import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import vm from 'node:vm';
import {followSceneTarget} from '../source/src/office-navigation.js';

// V86.33 regression: the V86 renderer owns only its local Three.js position.
// The old V86.16 test extracted `separateWorkerPositions` from index.html, a
// function removed when the renderer moved to source/src/suite-bridge.ts.
// Exercise the current source follower rather than a retired inline helper.
const html=readFileSync('public/index.html','utf8');
const timelineSource=readFileSync('public/office-movement-sync.js','utf8');
const bridgeSource=readFileSync('source/src/suite-bridge.ts','utf8');
const geometry=createRequire(import.meta.url)('../public/office-geometry-guard.js');
const fakeMovement={enable(){},getPeople(){return []},render(){},plan(){return null}};
const ctx={
  window:{OfficeSuite:{sharedMovement:fakeMovement},addEventListener(){}},
  document:{hidden:true,documentElement:{dataset:{}},addEventListener(){}},
  Date,Math,Number,Array,JSON,Set,Map,console,globalThis:{crypto:{randomUUID:()=> 'test'}},
  setInterval(){return 1},clearInterval(){},setTimeout(){return 1},clearTimeout(){},
  requestAnimationFrame(){return 1},cancelAnimationFrame(){},
};
vm.runInNewContext(timelineSource,ctx);
const {movementAt,validPayload}=ctx.window.OfficeMovementTimeline;
const now=2_000_000_000_000;
const entry={x:5,y:5},from={x:6,y:5},last={x:10,y:5},seatGoal={x:10.8,y:5.4};
const s={id:3,x:from.x,y:from.y,room:'staff',action:'pc-work',nextAt:now+30000,
  walk:{from,seatStart:entry,route:[last],segmentMs:[2200],startedAt:now+1000,
    endAt:now+1000+950+2200+950,departMs:950,dockMs:950,
    targetZone:'staff',seatGoal,action:'pc-work'}};
assert.equal(validPayload({schema:1,owner:'unit',leaseUntil:now+18000,staff:[s]}),true);
assert.equal(movementAt(s,now).x,entry.x,'Queued departure remains at seat');
assert.equal(movementAt(s,now+1000).x,entry.x,'Departure does not snap to aisle');
assert.equal(movementAt(s,now+1950).x,from.x,'Departure merges into safe aisle');
assert.equal(movementAt(s,now+4150).x,last.x,'Walking ends at planned route endpoint');
assert.equal(movementAt(s,now+5100).x,seatGoal.x,'Docking completes at seat');
assert.equal(movementAt(s,now+5100).walking,false);
for(let tick=now;tick<=now+5400;tick+=10){
  const a=movementAt(s,tick),b=movementAt(s,tick+10);
  assert.ok(Number.isFinite(a.x)&&Number.isFinite(a.y),'No NaN in movement');
  assert.ok(Math.hypot(a.x-b.x,a.y-b.y)<0.1,`No positional snap at ${tick-now}: ${JSON.stringify(a)} => ${JSON.stringify(b)}`);
}
const noDock={...s,walk:{from,route:[last],segmentMs:[2200],startedAt:now,endAt:now+2200,targetZone:'corridor',seatGoal:null,action:'chat'}};
assert.equal(movementAt(noDock,now+2200).x,last.x,'Old V77 timeline snapshots remain compatible');
const invalid={...s,walk:{...s.walk,dockMs:-1}};
assert.equal(validPayload({schema:1,owner:'unit',leaseUntil:now+18000,staff:[invalid]}),false,'Invalid dock values rejected');

// Check that current source maps authoritative coordinates into visual targets.
assert.match(bridgeSource,/function position\(e:Staff\)/,'Shared staff-to-renderer position conversion must exist');
assert.match(bridgeSource,/controller\?\.updatePeople\(staff\.map\(/,'Renderer must consume the shared staff snapshot');
assert.match(bridgeSource,/visualX\?\?e\.x/,'Renderer must use the authoritative fallback position');
assert.match(html,/id="office3dHost"/,'Live dashboard must retain its 3D host');

// Regression: moving the local avatar never overwrites the authoritative
// staff snapshot. The same wall-swept code is used by the real 3D renderer.
const begin=geometry.planToWorld({x:10,y:44.2});
const end=geometry.planToWorld({x:14,y:44.2});
assert(geometry.worldClear(begin,end),'Choose a valid unobstructed corridor');
const person={id:3,x:10,y:44.2,visualX:10,visualY:44.2,status:'walking'};
const expected=JSON.stringify(person);
const rig={root:{position:{...begin}},targetPosition:{...end},person,targetRotation:0};
for(let frame=0;frame<600;frame++){
  const previous={...rig.root.position};
  followSceneTarget(rig,1/60,geometry);
  assert(geometry.worldClear(previous,rig.root.position),'Renderer step must not cross a wall');
  assert(Math.hypot(rig.root.position.x-previous.x,rig.root.position.z-previous.z)<=7.2/60+1e-8,'No teleporting');
  assert.equal(JSON.stringify(person),expected,'Visual follower must not mutate shared staff coordinates');
}
assert(Math.hypot(rig.root.position.x-end.x,rig.root.position.z-end.z)<.02,'Follower must reach the target');
console.log('PASS V86.16/V86.33: timeline compatibility, smooth seat docking, bounded 3D visual motion, immutable shared coordinates');
