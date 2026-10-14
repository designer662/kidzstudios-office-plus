import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import vm from 'node:vm';
const require=createRequire(import.meta.url);
const seats=require('../public/office-workstations.js');
const geometry=require('../public/office-geometry-guard.js');
const source=readFileSync(new URL('../source/src/office-scene.ts',import.meta.url),'utf8');
const html=readFileSync(new URL('../public/index.html',import.meta.url),'utf8');
const roster=new Function('return '+html.match(/const DEFAULT_EMPLOYEES = (\[[\s\S]*?\n  \]);/)[1])();
const fixture=Array.from({length:14},(_,i)=>({id:i+1,name:'Staff '+(i+1),status:'At desk',homeRoom:'staff',roomId:'staff'}));
const assigned=seats.allocate(roster,geometry);
assert.equal(seats.seats.length,9,'Nine chairs with a dedicated workstation in physical model');
assert.equal(new Set(seats.seats.map(s=>s.id)).size,seats.seats.length);
assert(assigned.every(p=>p.deskId),'Every original staff member has a table');
assert.equal(new Set(assigned.map(p=>p.deskId)).size,8,'Every occupied workstation must be exclusive');
assert.equal(assigned.find(p=>p.id===1).deskId,'B01','Boss keeps their private desk');
assert.equal(assigned.find(p=>p.id===3).deskId,'D01','Afiq keeps the designer desk');
assert(assigned.every(p=>p.homeRoom!=='showroom'),'Existing 8 employees are not evicted when nine desks are available');
const extended=seats.allocate(fixture,geometry);
assert.equal(extended.filter(p=>p.deskId).length,9);
assert.deepEqual(extended.filter(p=>!p.deskId).map(p=>p.id),[10,11,12,13,14]);
for(const person of extended){
 assert.equal(geometry.navBlocked(person.deskX,person.deskY),false,`${person.id}: station can't be inside furniture or wall`);
 if(!person.deskId){assert.equal(person.homeRoom,'showroom');assert.match(person.deskLabel,/Standing in showroom/);assert.equal(person.status,'Standing in showroom');}
 else{assert.equal(seats.seats.find(s=>s.id===person.deskId).x,person.deskX);assert.notEqual(person.homeRoom,'showroom');}
}
const maximum=seats.allocate(Array.from({length:100},(_,i)=>({id:i+1,name:'Staff '+(i+1)})),geometry);
assert.equal(maximum.length,100,'Valid shared roster capacity must never crash the dashboard');
assert.equal(new Set(maximum.map(p=>p.deskX+','+p.deskY)).size,100,'Even extreme showroom density must not duplicate standing coordinates');
assert(maximum.every(p=>!geometry.navBlocked(p.deskX,p.deskY)));
const extras=extended.filter(p=>!p.deskId);
for(let i=0;i<extras.length;i++)for(let j=0;j<i;j++)assert(Math.hypot(extras[i].deskX-extras[j].deskX,extras[i].deskY-extras[j].deskY)>=1.1);
assert.deepEqual(seats.allocate([...fixture].reverse(),geometry).sort((a,b)=>a.id-b.id).map(p=>[p.id,p.deskId,p.deskX,p.deskY]),
 extended.map(p=>[p.id,p.deskId,p.deskX,p.deskY]),'Staff list reorder must not change seat ownership');
const afterRemoval=seats.allocate(fixture.filter(p=>p.id!==3),geometry);
assert.equal(afterRemoval.find(p=>p.id===9).deskId,'D01','Vacant fixed seat gets reused deterministically');
assert.equal(afterRemoval.find(p=>p.id===10).deskId,'S04','Next staff gets final free workstation');
assert.equal(afterRemoval.filter(p=>!p.deskId).length,4);
const allIds=[...new Set(seats.seats.map(s=>s.id))];
for(const key of allIds)assert(source.includes(`'${key}'`),`Physical office 3D must register ${key}`);
assert(source.includes('Six individual worktables'),'Six distinct tabletops (not one shared island) required');
assert(html.includes('office-workstations.js?v=86.50'));
assert(html.includes('window.KSOfficeWorkstations.allocate(next,window.KSOfficeGeometry)'));
assert(html.includes("employees.find(e=>e.deskId===d.deskId)"),'2D clickable desk is assigned from the actual roster');
for(const key of ['B02','A01'])assert(html.includes(`{deskId:'${key}',`),'2D needs real rear counter desks for every character');
// Bind 3D scene keys to owners, regardless of physical creation order.
const seating=require('../public/office-seating-controller.js');
seating.resetFurniture();for(const [i,s] of [...seats.seats].reverse().entries())seating.registerChair({key:s.id,x:i*3,z:0,yaw:Math.PI,seatHeight:.726});
seating.bindStaff(extended.map(e=>({id:e.id,seatId:e.deskId})));
for(const p of extended){
 const chair=seating.chairs.find(s=>s.key===p.deskId);
 assert.equal(chair?seating.selectChair(chair.x,chair.z,p.id)?.key:null,p.deskId||null);
 if(!p.deskId)assert(seating.chairs.every(c=>seating.selectChair(c.x,c.z,p.id)===null));
}
// One elected timeline leader migrates old seating without touching roster.
const nav=html.slice(html.indexOf('  const roamZones={'),html.indexOf('  function beginRoam('));
const events=new Map();let writes=0;
const context={Math,Date,console,Intl,JSON,Set,Map,CustomEvent:class{},
 window:{KSOfficeGeometry:geometry,addEventListener(name,fn){(events.get(name)||events.set(name,[]).get(name)).push(fn)},dispatchEvent(){}},
 document:{hidden:true,documentElement:{dataset:{}},getElementById(){return null},addEventListener(){}},
 setTimeout(){return 1},setInterval(){return 1},clearTimeout(){},clearInterval(){},requestAnimationFrame(){return 1},cancelAnimationFrame(){},
 fetch(){writes++;throw new Error('No API writes expected during local simulation');}};
context.globalThis=context;context.window.document=context.document;
context.employeeById=Object.fromEntries(extended.map(e=>[e.id,e]));vm.createContext(context);
vm.runInContext(nav+'\n;globalThis.planSharedRoam=planSharedRoam;',context);
context.window.OfficeSuite={sharedMovement:{enable(){},getPeople:()=>extended,plan:(id,zone,target)=>context.planSharedRoam(context.employeeById[id],zone,target),render(){}}};
context.window.OfficeLiving={workFor:()=> 'typing',jobKey:()=>'',chooseIntent:()=>({zone:'pantry',action:'drink',kind:'break'}),update(){}};
vm.runInContext(readFileSync(new URL('../public/office-smart-ai.js',import.meta.url),'utf8'),context);
vm.runInContext(readFileSync(new URL('../public/office-movement-sync.js',import.meta.url),'utf8'),context);
const timeline=context.window.OfficeMovementTimeline, now=Date.now();
const old={schema:1,owner:'leader',aiEngineVersion:2,leaseUntil:now+5000,updatedAt:now,staff:extended.map(p=>({id:p.id,
 x:p.id===3?17.9:p.deskX,y:p.id===3?10.1:p.deskY,room:p.homeRoom,action:'typing',nextAt:now+60000,
 lastWalkAt:now-5000,failedRoutes:0,walk:null,scene:null}))};
assert(timeline.evolve(old,now),'Legacy timeline adopts new desk mapping');
assert.equal(old.staff.find(s=>s.id===3).x,16.62,'Afiq gets migrated to real physical seat');
assert.equal(old.staff.find(s=>s.id===10).room,'showroom');
assert.equal(old.staff.find(s=>s.id===10).x,extended.find(e=>e.id===10).deskX);
const first=old.staff.map(s=>[s.id,s.homeX,s.homeY,s.homeDeskId,s.x,s.y,s.nextAt]);
timeline.evolve(old,now+1000);
assert.deepEqual(old.staff.map(s=>[s.id,s.homeX,s.homeY,s.homeDeskId,s.x,s.y,s.nextAt]),first,'Seat ownership migration is idempotent');
assert(timeline.validPayload(old),'Reallocated movement timeline remains valid');
assert.equal(writes,0,'No staff/database mutation from seating module');
console.log('PASS V86.50: 9 exclusive physical desks, per-person worktables, showroom overflow, dynamic vacancy refill, stable IDs, geometry, shared-AI timeline migration and no data writes.');
