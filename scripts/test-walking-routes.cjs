const fs=require('fs'),assert=require('node:assert/strict');
const window={KSOfficeGeometry:require('../public/office-geometry-guard.js')};
const src=fs.readFileSync(require('node:path').join(__dirname,'..','public','index.html'),'utf8');
const start=src.indexOf('  const navigationObstacles='),end=src.indexOf('  function setMotionClass(',start);
const gates={staff:{x:8.1,y:25.4},showroom:{x:9.4,y:33},corridor:{x:9.4,y:44.6},pantry:{x:7,y:46},boss:{x:12.1,y:44.6},store:{x:13.2,y:55.1},prayer:{x:11.2,y:59.7},'toilet-a':{x:1.9,y:59.0},'toilet-b':{x:5.5,y:59.0}};
const nav=new Function('staffDeskAssignments','zoneGate','window','const corridorLinkedZones=new Set(["boss","pantry","store","prayer","toilet-a","toilet-b","corridor"]);\n'+src.slice(start,end)+'return {navBlocked,navSnap,navClearLine,safeWalkingRoute,pathBetweenZones};')([],gates,window);
const staff=[{z:'staff',x:17.9,y:10.1},{z:'staff',x:8.5,y:10.1},{z:'staff',x:17.7,y:5.3},{z:'staff',x:11.2,y:5.3},{z:'showroom',x:19,y:28.8},{z:'showroom',x:16,y:32.7},{z:'boss',x:17.9,y:43.1},{z:'staff',x:8.5,y:14.6}];
let count=0,fail=0,totalSegments=0;
const targets=[['staff',{x:8.5,y:10.1}],['showroom',{x:11.1,y:31}],['corridor',{x:9.4,y:40}],['pantry',{x:5.5,y:46}],['boss',{x:17.9,y:43.1}],['store',{x:17,y:53}],['prayer',{x:15,y:63}],['toilet-a',{x:1.9,y:62}],['toilet-b',{x:5.5,y:62}]];
for(let round=0;round<6;round++)for(let k=0;k<staff.length;k++)for(const [zone,base] of targets){
 const s=staff[k],from={x:s.x,y:s.y},start=nav.navBlocked(from.x,from.y)?nav.navSnap(from):from;
 const t={x:base.x+(round-2.5)*.21,y:base.y+(round-2.5)*.13},dest=nav.navBlocked(t.x,t.y)?nav.navSnap(t):t;
 if(!start||!dest){fail++;continue}
 const route=nav.safeWalkingRoute(start,nav.pathBetweenZones(s.z,zone,dest));
 if(!route){fail++;continue}
 count++;let a=start;
 for(const b of route){assert(nav.navClearLine(a,b),`unsafe segment staff${k} ${zone} ${JSON.stringify(a)} -> ${JSON.stringify(b)}`);a=b;totalSegments++}
}
console.log(`V66 route audit: ${count} paths, ${totalSegments} clear segments, ${fail} planner failures`);
assert(count>=400, 'Insufficient valid routes');assert(fail===0,'Unreachable scenario');
