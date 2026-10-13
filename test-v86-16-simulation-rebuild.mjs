import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const html=readFileSync('public/index.html','utf8');
const timelineSource=readFileSync('public/office-movement-sync.js','utf8');
const modelSource=readFileSync('public/office-3d.js','utf8');
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

const start=html.indexOf('  function separateWorkerPositions(items){');
const end=html.indexOf('  // A small bridge for the shared movement timeline.',start);
assert.ok(start>=0&&end>start);
const preservePositions=new Function(html.slice(start,end)+'\nreturn separateWorkerPositions;')();
const overlapping=[{id:1,x:7,y:6,walking:false},{id:2,x:7.2,y:6,walking:true}];
assert.deepEqual(preservePositions(overlapping),overlapping,'Follower must not invent divergent client-side coordinates');
console.log('PASS V86.16: continuous aisle departure, smooth seat docking, old timeline compatibility, invariant shared positions (renderer collision behavior is covered by V86.22)');
