import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import vm from 'node:vm';
const require=createRequire(import.meta.url);
const source=readFileSync('source/src/office-navigation.js','utf8');
// Evaluate the JavaScript module without requiring the production Three.js build.
const sourceFunction=new Function(source.replace('export function followSceneTarget','function followSceneTarget')+'\nreturn followSceneTarget;')();
const bundle=readFileSync('public/office-3d.js','utf8');
const start=bundle.indexOf('function yg(s,t,e,n=1.5){');
const end=bundle.indexOf('function vg(',start);
assert(start>0&&end>start,'Locate the deployed minified navigation function');
const bundledFunction=vm.runInNewContext('('+bundle.slice(start,end)+')',{Math,Number});
assert(bundle.includes('ksCatchUp?"walking":tt.status'),'Built script keeps delayed arrival animated');
assert(readFileSync('source/src/office-scene.ts','utf8').includes("catchingUp?'walking' as const"),'Rebuild source matches deployed walking pose');
const geometry=require('../public/office-geometry-guard.js');
function rig(position,target,status='walking'){
 return {root:{position:{...position}},targetPosition:{...target},person:{status},targetRotation:0};
}
function distance(a,b){return Math.hypot(a.x-b.x,a.z-b.z)}
function run(fn,begin,end,frames,guard=geometry){
 const follower=rig(begin,end),steps=[];
 for(let i=0;i<frames;i++){
  const before={...follower.root.position};fn(follower,1/60,guard,1.5);
  assert(guard.worldClear(before,follower.root.position,1.5),'Renderer must not cross a wall or workstation');
  const step=distance(before,follower.root.position);steps.push(step);
  assert(step<=7.2/60+1e-8,'Catch-up speed is bounded: no teleport');
 }
 return {follower,steps};
}
const openGeometry={worldClear:()=>true,findWorldPath:()=>null};
for(const fn of [sourceFunction,bundledFunction]){
 const slow=run(fn,{x:0,z:0},{x:3,z:0},60,openGeometry);
 assert(distance(slow.follower.root.position,{x:3,z:0})<.3,'Recover three-world-unit timeline lag within a second');
 assert(slow.steps.some(v=>v>.055),'Delayed follower actually increases speed');
 const seated=run(fn,{x:0,z:0},{x:.08,z:0},60,openGeometry);
 assert(distance(seated.follower.root.position,{x:.08,z:0})<.001,'Tiny network correction settles without oscillation');
}
const begin=geometry.planToWorld({x:10,y:49.2});
const endPoint=geometry.planToWorld({x:14,y:49.2});
assert.equal(geometry.worldClear(begin,endPoint),false,'Fixture has a real intervening wall');
for(const fn of [sourceFunction,bundledFunction]){
 const results=run(fn,begin,endPoint,2400);
 assert(distance(results.follower.root.position,endPoint)<.03,'Route-aware catch-up reaches the target around walls');
}
// Same timestamped timeline yields identical positions on all PCs; render cannot
// silently invent different follower positions or write extra movement state.
const timeline=readFileSync('public/office-movement-sync.js','utf8');
assert(timeline.includes('const p=movementAt(s,now)'),'Follower still replays the shared committed timeline');
assert(timeline.includes('motion.render(positions)'),'Position playback stays read-only');
console.log('PASS V86.28: prebuilt/source follower parity, lag recovery, speed limit, wall-safe route, settled position, walking gait and shared timeline.');
