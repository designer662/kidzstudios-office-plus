import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const source=readFileSync('public/office-movement-sync.js','utf8');
let currentTime=1_800_000_000_000;
let store=null,reads=0,writes=0,staleRejects=0;
const clone=x=>JSON.parse(JSON.stringify(x));
const api=async(url,opts={})=>{
  if(opts.method==='PUT'){
    const body=JSON.parse(opts.body);
    const expected=body.expectedVersion;
    if(store&&Number(expected)!==store.version){staleRejects++;return {status:409,json:async()=>({error:'Conflict'})};}
    if(!store&&expected!==0){staleRejects++;return {status:409,json:async()=>({error:'Conflict'})};}
    store={version:(store?.version||0)+1,payload:clone(body.payload)};writes++;
    return {status:200,json:async()=>clone(store)};
  }
  reads++;
  return !store?{status:404,json:async()=>({})}:{status:200,json:async()=>clone(store)};
};
const people=[{id:1,x:10,y:10,roomId:'staff',visualRoomId:'staff',motionAction:'typing',homeRoom:'staff'},
 {id:2,x:12,y:16,roomId:'staff',visualRoomId:'staff',motionAction:'typing',homeRoom:'staff'}];
function client(name){
  const intervals=[];const timers=[];const listeners=new Map();let lastRendered=[];let enabled=false;
  const on=(target,event,fn)=>listeners.set(`${target}:${event}`,fn);
  const clock=class FakeDate extends Date{static now(){return currentTime}};
  const context={Date:clock,Math,JSON,Number,String,Object,Array,console,Promise,Set,Map,
    fetch:api,crypto:{randomUUID:()=>name},
    window:{OfficeSuite:{sharedMovement:{
      enable(){enabled=true},getPeople:()=>clone(people),
      render(list){lastRendered=list},
      plan(id){return {from:{x:10,y:10},route:[{x:12,y:10}],segmentMs:[1200],targetZone:'showroom',seatGoal:null}}
    }},addEventListener:(event,fn)=>on('window',event,fn)},
    document:{hidden:false,documentElement:{dataset:{ksAuth:'ok'}},addEventListener:(event,fn)=>on('doc',event,fn)},
    setTimeout(fn,ms=0){const item={fn,at:currentTime+ms};timers.push(item);return item},
    clearTimeout(item){const i=timers.indexOf(item);if(i>=0)timers.splice(i,1)},
    setInterval(fn,ms){intervals.push({fn,ms,at:currentTime+ms});return intervals.at(-1)},
    clearInterval(item){const i=intervals.indexOf(item);if(i>=0)intervals.splice(i,1)},
    requestAnimationFrame(fn){return 1},cancelAnimationFrame(){},
    globalThis:{crypto:{randomUUID:()=>name}},
  };
  vm.runInNewContext(source,context,{filename:'office-movement-sync.js'});
  async function flush(){for(let i=0;i<8;i++)await Promise.resolve()}
  async function advance(ms){
    currentTime+=ms;
    for(let i=0;i<8;i++){
      const ready=timers.filter(t=>t.at<=currentTime);
      timers.splice(0,timers.length,...timers.filter(t=>t.at>currentTime));
      for(const t of ready)t.fn();
      if(!ready.length)break;await flush();
    }
    for(const interval of intervals){if(interval.at<=currentTime){interval.at=currentTime+interval.ms;await interval.fn()}}
    await flush();
  }
  return {advance,emit:(name)=>listeners.get(name)?.(),get lastRendered(){return lastRendered},get enabled(){return enabled},get timeline(){return context.window.OfficeMovementTimeline}};
}
const a=client('browser-A');const b=client('browser-B');
assert(a.enabled&&b.enabled,'Legacy local roaming must be disabled on every client');
await a.advance(0);await b.advance(0);
assert(store,'A shared snapshot should be created');
assert.equal(store.payload.owner,'browser-A','First client becomes route authority');
assert.equal(store.version,1,'Only one initialization write');
await a.advance(850);await b.advance(0);
assert.equal(store.payload.owner,'browser-A');
assert.equal(store.payload.staff.length,2);
// Pure deterministic interpolation: any browser with same timeline and time sees identical positions.
const snap={id:1,x:10,y:10,room:'staff',action:'typing',walk:{from:{x:10,y:10},route:[{x:13,y:10},{x:13,y:13}],segmentMs:[1200,1500],startedAt:currentTime,endAt:currentTime+2700,targetZone:'showroom',action:'meeting',seatGoal:null}};
const pos=a.timeline.movementAt(snap,currentTime+1800),pos2=b.timeline.movementAt(snap,currentTime+1800);
assert.deepEqual(JSON.parse(JSON.stringify(pos)),JSON.parse(JSON.stringify(pos2)));
assert.equal(pos.x,13);assert.equal(pos.y,11.2);assert.equal(pos.walking,true);
assert.equal(a.timeline.movementAt(snap,currentTime+2800).walking,false);
assert.equal(a.timeline.movementAt(snap,currentTime+2800).room,'showroom');
assert.equal(a.timeline.validPayload({schema:1,owner:'a',leaseUntil:currentTime,staff:[snap]}),false,'Missing idle nextAt rejected');
assert.equal(a.timeline.validPayload({schema:1,owner:'a',leaseUntil:currentTime,staff:[{...snap,nextAt:currentTime}]}),true);
// Only the authority may write while lease is active.
const before=writes;
await b.advance(2900);
assert.equal(writes,before,'Follower does not publish its own route');
// Losing owner: after lease expiry follower takes over with CAS, without resetting route history.
await b.advance(19000);
assert.equal(store.payload.owner,'browser-B','Follower takes over expired lease');
const firstWriteAfterTakeover=writes;
await a.advance(2900);
assert.equal(store.payload.owner,'browser-B','Previous leader respects new owner');
assert.equal(writes,firstWriteAfterTakeover,'Previous leader cannot overwrite new lease');
console.log(`PASS movement sync: shared snapshot, one leader, follower read-only, deterministic interpolation, lease failover; ${reads} reads / ${writes} writes / ${staleRejects} stale rejects`);
