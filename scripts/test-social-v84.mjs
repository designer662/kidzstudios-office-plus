import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const source=readFileSync('public/office-movement-sync.js','utf8');
const livingSource=readFileSync('public/office-living-office.js','utf8');
const html=readFileSync('public/index.html','utf8');
const css=readFileSync('public/office-living-office.css','utf8');

const now=Date.parse('2026-10-12T07:00:00Z');
let clock=now;
const MathFixed=Object.create(Math);
MathFixed.random=()=>0.12; // Deterministic first candidate, conversation instead of huddle.
const roster=[{id:3,name:'Afiq',x:17.9,y:10.1,homeRoom:'staff',roomId:'staff',department:'Creative Department'},
  {id:7,name:'Minn',x:8.5,y:10.1,homeRoom:'staff',roomId:'staff',department:'Creative Department'}];
const movements=[];
const motion={enable(){},getPeople:()=>roster,render(list){movements.push(...list)},plan:(id,zone,point)=>({from:{x:roster.find(p=>p.id===id).x,y:roster.find(p=>p.id===id).y},route:[{...point}],segmentMs:[1200],targetZone:zone,seatGoal:null})};
const audioEvents=[];
const DateFixed=class extends Date{constructor(...args){super(...(args.length?args:[clock]))}static now(){return clock}};
const storage=new Map();
const mock3D={showBubble:(...params)=>audioEvents.push(['show',...params]),clearBubble:(...params)=>audioEvents.push(['clear',...params]),playEmote:()=>{}};
const livingWindow={office3d:mock3D,addEventListener(){}};
const contextLiving={window:livingWindow,localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v)},document:{readyState:'loading',hidden:false,addEventListener(){}},Date:DateFixed,Math:MathFixed,Intl,console};
vm.runInNewContext(livingSource,contextLiving,{filename:'office-living-office.js'});
const living=livingWindow.OfficeLiving;
assert.ok(living.dialogues?.conversation.length&&living.dialogues?.huddle.length,'Two dialogue types');

// Expose planner only in the test VM. The published application does not expose mutable planning controls.
const testCode=source.replace('window.OfficeMovementTimeline={movementAt,validPayload};', 'window.OfficeMovementTimeline={movementAt,validPayload,pairConversation};');
assert.notEqual(testCode,source,'Found test instrumentation hook');
const win={OfficeSuite:{sharedMovement:motion},OfficeLiving:living,addEventListener(){}};
const sandbox={window:win,document:{documentElement:{dataset:{ksAuth:'pending'}},hidden:false,addEventListener(){}},globalThis:{crypto:{randomUUID:()=>"unit-test"}},Date:DateFixed,Math:MathFixed,console,Intl,setInterval(){},setTimeout(){},requestAnimationFrame(){}};
vm.runInNewContext(testCode,sandbox,{filename:'office-movement-sync.js'});
const timeline=win.OfficeMovementTimeline;
const snapshot={schema:1,owner:'sim-planner',leaseUntil:now+20000,staff:[
 {id:3,x:17.9,y:10.1,room:'staff',action:'typing',nextAt:now+1000,walk:null},
 {id:7,x:8.5,y:10.1,room:'staff',action:'typing',nextAt:now+1100,walk:null}
]};
assert.equal(timeline.pairConversation(snapshot,snapshot.staff[0],now),true,'Paired meeting planned');
const [first,second]=snapshot.staff;
const final=(s)=>s.walk.route.at(-1);
const meters=Math.hypot(final(first).x-final(second).x,final(first).y-final(second).y)/2;
assert.ok(meters>=1.9,`Character gap should be comfortable: ${meters.toFixed(2)} world units`);
assert.ok(first.walk&&second.walk,'Both characters walk to meeting');
assert.equal(first.faceTo,second.id);assert.equal(second.faceTo,first.id);
assert.equal(first.scene.from,second.scene.from);
assert.equal(first.scene.until,second.scene.until);
assert.equal(first.scene.speakerId,first.id);
assert.equal(first.scene.partnerId,second.id);
assert.equal(first.scene.turnMs,2800);
assert.equal(first.scene.dialogue.length,6);
assert.deepEqual(Array.from(first.scene.dialogue),Array.from(second.scene.dialogue),'Shared script identical on both PCs');
assert.equal(timeline.validPayload(snapshot),true,'New scene fields are valid for Supabase');
const sample=()=>snapshot.staff.map(s=>timeline.movementAt(s,clock));
clock=first.scene.from+100;
assert.equal(sample()[0].walking,false,'Conversation starts only after both arrive');
assert.equal(sample()[0].faceTo,second.id);
assert.equal(sample()[1].faceTo,first.id);
living.update(snapshot,sample());
let shows=audioEvents.filter(event=>event[0]==='show');
assert.equal(shows.length,1,'Only current speaker creates a bubble');
assert.equal(shows[0][1],first.id,'First turn belongs to first speaker');
assert.equal(shows[0][4],'conversation','Smart Label priority uses conversation category');
assert.equal(shows[0][2],first.scene.dialogue[0]);
living.update(snapshot,sample());
assert.equal(audioEvents.filter(event=>event[0]==='show').length,1,'No duplicate bubble every frame');
clock=first.scene.from+first.scene.turnMs+100;
living.update(snapshot,sample());
shows=audioEvents.filter(event=>event[0]==='show');
assert.equal(shows.length,2,'New turn creates another bubble');
assert.equal(shows[1][1],second.id,'Second turn belongs to partner');
assert.equal(shows[1][2],first.scene.dialogue[1]);
assert.ok(audioEvents.some(event=>event[0]==='clear'&&event[1]===first.id&&event[2]==='conversation'),'Previous speaker bubble cleared');
for(let turn=2;turn<6;turn++){
 clock=first.scene.from+turn*first.scene.turnMs+50;
 living.update(snapshot,sample());
 const last=audioEvents.filter(event=>event[0]==='show').at(-1);
 assert.equal(last[1],turn%2===0?first.id:second.id);
 assert.equal(last[2],first.scene.dialogue[turn]);
}
assert.equal(audioEvents.filter(event=>event[0]==='show').length,6,'Six distinct dialogue turns shown');
clock=first.scene.until+100;
living.update(snapshot,sample());
assert.equal(audioEvents.at(-1)[0],'clear','Conversation bubbles removed after ending');
assert.match(css,/data-bubble-kind="conversation"/,'Distinct conversation bubble visual style');
assert.match(html,/office-movement-sync\.js\?v=84\.0/,'Cache bust the new movement code');
console.log(`PASS V84 natural social interaction: ${meters.toFixed(2)} world unit distance, facing, 6 alternating shared speech bubbles, cleanup and migration compatibility`);
