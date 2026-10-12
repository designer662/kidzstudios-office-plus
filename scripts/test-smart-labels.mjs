import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {layout,overlaps,moodEmoji,rank}=require('../public/office-smart-labels.js');
const bundle=readFileSync('public/office-3d.js','utf8');
const html=readFileSync('public/index.html','utf8');
assert.ok(html.indexOf('office-smart-labels.js?v=80')<html.indexOf('office-3d.js?v='),'Label manager loads before Three.js');
assert.ok(html.includes('office-smart-labels.css?v=80'));
assert.ok(bundle.includes('KSLabelLayout?.layout'),'Bundled 3D renderer must use collision-aware manager');
assert.ok(bundle.includes('function setMood('),'Mood is integrated into the character name label');
assert.ok(bundle.includes('if(gt==="emoji"){setMood(L,B);return}'),'Mood must not create a separate 3D bubble');
assert.ok(bundle.includes('if(gt==="follow"&&Z===0)Z=4800'),'Follow bubble is temporary');
assert.equal(moodEmoji.happy,'😊');assert.ok(rank('chat')>rank('workload'));assert.ok(rank('workload')>rank('follow'));
const VP={width:830,height:580};
const base=[
{id:1,x:400,y:220,width:78,height:27,visible:true,focused:true},
{id:2,x:401,y:220,width:78,height:27,visible:true},
{id:3,x:410,y:220,width:88,height:27,visible:true},
{id:4,x:410,y:220,width:88,height:27,visible:true},
{id:5,x:410,y:220,width:88,height:27,visible:true},
];
let l=layout({names:base,viewport:VP,bubbles:[
 {id:1,key:'1:workload',kind:'workload',visible:true,width:182,height:46},
 {id:1,key:'1:chat',kind:'chat',visible:true,width:185,height:45},
 {id:2,key:'2:living',kind:'living',visible:true,width:140,height:39},
 {id:3,key:'3:workload',kind:'workload',visible:true,width:140,height:39}
],rooms:[{id:1,x:405,y:208,width:110,height:25,visible:true}],zoom:1.2});
assert.ok(l.names.find(n=>n.id===1).visible,'Focused name visible');
assert.ok(!l.bubbles.some(b=>b.key==='1:workload'),'Only one bubble is considered for each character');
function assertNoOverlap(groups, viewport){const visible=groups.filter(x=>x.visible);for(const r of visible){assert.ok(r.x>=-.01&&r.y>=-.01&&r.x+r.w<=viewport.width+.01&&r.y+r.h<=viewport.height+.01);for(const other of visible){if(other===r)continue;assert.ok(!overlaps(r,other),'Visible labels must not overlap: '+JSON.stringify([r,other]));}}}
assertNoOverlap([...l.names,...l.bubbles],VP);
assert.ok(l.bubbles.every(b=>!b.visible||b.key!=='1:workload'));
l=layout({names:base,viewport:VP,bubbles:[{id:1,key:'1:workload',kind:'workload',visible:true,width:160,height:42},{id:2,key:'2:chat',kind:'chat',visible:true,width:165,height:44}],zoom:.75});
assert.equal(l.bubbles.find(b=>b.key==='1:workload')?.visible,false,'Zoomed out hides workload');
assert.equal(l.bubbles.find(b=>b.key==='2:chat')?.visible,true,'Zoomed out can still show high-priority conversation');
// Stress test while virtual camera orbits: labels remain inside bounds, no name/bubble collision.
let seed=12345;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
for(let i=0;i<250;i++){
 const viewport={width:300+Math.floor(rand()*1150),height:250+Math.floor(rand()*750)};
 const names=Array.from({length:8},(_,j)=>({id:j+1,x:rand()*viewport.width,y:rand()*viewport.height,width:55+Math.floor(rand()*65),height:24,visible:true,focused:j===0}));
 const bubbles=names.map(n=>({id:n.id,key:n.id+':chat',kind:i%3===0?'chat':'workload',width:120+Math.floor(rand()*75),height:30+Math.floor(rand()*34),visible:true}));
 const out=layout({names,bubbles,viewport,zoom:rand()*3+.65});
 assertNoOverlap([...out.names,...out.bubbles],viewport);
}
console.log('PASS V80 3D smart labels, mood/name merge, priority, auto-hide rules, screen bounds, and 250 layout simulations');
