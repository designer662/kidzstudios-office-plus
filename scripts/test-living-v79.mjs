import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const livingJS=readFileSync('public/office-living-office.js','utf8');
const movementJS=readFileSync('public/office-movement-sync.js','utf8');
const bundle=readFileSync('public/office-3d.js','utf8');
const source=readFileSync('source/src/office-character.ts','utf8');
const header=readFileSync('public/index.html','utf8');
const store=new Map();
const time=Date.parse('2026-10-12T05:00:00Z'); // 13:00 in Malaysia
let randomValue=.92;
const math=Object.create(Math);math.random=()=>randomValue;
const web={office3d:{showBubble:(...x)=>events.push(['bubble',...x]),playEmote:(...x)=>events.push(['emote',...x]),clearBubble:(...x)=>events.push(['clear',...x])},addEventListener(){}};
const events=[];
const DateFixed=class extends Date { constructor(...a){super(...(a.length?a:[time]))} static now(){return time} };
const ctx={window:web,localStorage:{getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,v)},document:{readyState:'loading',hidden:false,addEventListener(){}},Math:math,Date:DateFixed,Intl,console};
vm.runInNewContext(livingJS,ctx,{filename:'office-living-office.js'});
const L=web.OfficeLiving;
assert.ok(L&&L.taskPalette&&L.jobReaction,'V79 helper API');
const examples=[
 [{department:'Creative Department'},'designing','Artwork'],
 [{department:'Sales and Marketing'},'calling','Customer'],
 [{department:'Management'},'reviewing','Management'],
 [{department:'Production Management'},'production','Production'],
 [{department:'Finance Department'},'admin','Admin'],
];
for(const [person,kind,jobTerm] of examples){
 assert.equal(L.workFor(person),kind);
 assert.ok(L.taskPalette(person).length>=4);
 assert.ok(L.taskPalette(person,true).find(e=>e[0]===kind)[1]>L.taskPalette(person,false).find(e=>e[0]===kind)[1]);
 assert.ok(L.jobReaction(person).includes(jobTerm));
}
const design={department:'Creative Department',homeRoom:'staff',currentJob:'JOB-125'};
assert.equal(L.chooseIntent(design,'staff').zone,'staff');
const actions=new Set();
for(const rv of [.1,.3,.5,.7,.9,.98]){
 randomValue=rv;
 const result=L.weightedPick(L.taskPalette(design,true),rv);
 actions.add(result);
}
assert.ok(actions.size>=3,'Job-bearing staff should have several simulated tasks');
assert.ok(L.coffeeLines.length>=2&&L.huddles.length>=2);
assert.equal(L.isAmbientEnabled(),false,'Quiet default');
assert.equal(L.getAmbientVolume(),.55,'First-run ambience defaults to moderate volume rather than zero');
L.setAmbientVolume(.35);
assert.equal(L.getAmbientVolume(),.35);
assert.equal(store.get('ksOfficeAmbientVolumeV79'),'0.35','Per-device volume persists');
L.setAmbientVolume(2);assert.equal(L.getAmbientVolume(),1,'Volume clamps to 100%');
const cue={id:2,scene:{kind:'job',text:'📋 Work assignment updated',from:time-10,until:time+1000}};
L.update({},[cue]);
assert.equal(events.filter(e=>e[0]==='emote').length,1);
L.update({},[cue]);
assert.equal(events.filter(e=>e[0]==='emote').length,1,'Job acknowledgment plays once per scene');
assert.match(movementJS,/socialAt:0/,'Cooldown must live in shared snapshot');
assert.match(movementJS,/faceTo=\['conversation','huddle'\]/,'Huddle partners should face each other');
assert.match(movementJS,/breakMessage/,'Shared break messages should match the destination room');
assert.equal(L.breakMessage('prayer'),'Quiet personal break');
assert.equal(L.breakMessage('toilet-a'),'Back shortly');
assert.ok(L.breakMessage('pantry').length>0);
assert.match(movementJS,/Math\.random\(\)<\.15&&pairConversation/,'Social decisions remain leader-owned');
assert.match(bundle,/L==="wave"&&\(Z\.waveStart=Q\)/,'Shipped 3D bundle must acknowledge job updates');
assert.match(bundle,/t\.action==="production"/);
assert.match(bundle,/t\.action==="planning"/);
assert.match(source,/p\.action==='meeting'/,'TypeScript source must include new gestures');
assert.ok(header.includes('office-living-office.js?v=84.0'));
console.log('PASS V79 richer department behaviors, job acknowledgment, social huddles, break cues, opt-in variable ambience and shipped 3D gestures');
