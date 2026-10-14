import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {followSceneTarget} from '../source/src/office-navigation.js';

// CI rebuilds office-3d.js with esbuild before this test runs. Minified
// identifiers (e.g. yg, vg, tt) are intentionally NOT part of the public
// interface and can change on any clean build. Exercise the real source
// module directly, and use stable, name-independent smoke checks for the bundle.
const require=createRequire(import.meta.url);
const geometry=require('../public/office-geometry-guard.js');
const bundle=readFileSync('public/office-3d.js','utf8');
const scene=readFileSync('source/src/office-scene.ts','utf8');
const source=readFileSync('source/src/office-navigation.js','utf8');
assert(bundle.length>400_000,'3D build output exists and is not truncated');
assert(source.includes('export function followSceneTarget'),'Walking follower is exported from source');
assert(scene.includes("import {followSceneTarget} from './office-navigation.js'"),'Scene imports the walking follower');
assert(scene.includes('followSceneTarget('),'Scene calls the walking follower');
assert(scene.includes("catchingUp?'walking' as const"),'Source keeps the walking pose during catch-up');
// Check the output has the characteristic adaptive-speed constants; never
// depend on the function name, local variable names or statement adjacency.
for(const token of ['7.2','2.8','2.4']) assert(bundle.includes(token),`3D bundle is missing movement constant ${token}`);

function rig(position,target,status='walking'){
  return {root:{position:{...position}},targetPosition:{...target},person:{status},targetRotation:0};
}
function distance(a,b){return Math.hypot(a.x-b.x,a.z-b.z);}
function run(begin,end,frames,guard=geometry){
  const follower=rig(begin,end),steps=[];
  for(let i=0;i<frames;i++){
    const before={...follower.root.position};
    followSceneTarget(follower,1/60,guard,1.5);
    assert(guard.worldClear(before,follower.root.position,1.5),'Renderer must not cross a wall or workstation');
    const moved=distance(before,follower.root.position);
    steps.push(moved);
    assert(moved<=7.2/60+1e-8,'Catch-up speed must be bounded to avoid teleporting');
  }
  return {follower,steps};
}
const openGeometry={worldClear:()=>true,findWorldPath:()=>null};
const lag=run({x:0,z:0},{x:3,z:0},60,openGeometry);
assert(distance(lag.follower.root.position,{x:3,z:0})<.3,'Catch up with three world units of timeline lag within one second');
assert(lag.steps.some(v=>v>.055),'Lagged character must actually speed up');
const settled=run({x:0,z:0},{x:.08,z:0},60,openGeometry);
assert(distance(settled.follower.root.position,{x:.08,z:0})<.001,'Tiny correction must settle without oscillation');
const begin=geometry.planToWorld({x:10,y:49.2});
const end=geometry.planToWorld({x:14,y:49.2});
assert.equal(geometry.worldClear(begin,end),false,'Test fixture must include a physical wall');
const aroundWall=run(begin,end,2400);
assert(distance(aroundWall.follower.root.position,end)<.03,'Route-aware catch-up must reach target around the wall');
const timeline=readFileSync('public/office-movement-sync.js','utf8');
assert(timeline.includes('const p=movementAt(s,now)'),'Follower replays shared timeline positions');
assert(timeline.includes('motion.render(positions)'),'Position playback remains read-only');
console.log('PASS V86.28: build-name-safe smoke test, source follower, lag recovery, bounded speed, wall avoidance and shared timeline.');
