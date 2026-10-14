import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const html=readFileSync('public/index.html','utf8');
function between(begin,end){const start=html.indexOf(`  function ${begin}(`),stop=html.indexOf(`  function ${end}(`,start+1);assert(start>=0&&stop>start,`Missing ${begin}`);return html.slice(start,stop)}
function exercise(name,source,tickMs,connectedPeriod,offlinePeriod,initialRead=true){
 let now=1_000_000,connected=true,requests=0,timer=null,onEvent=null;
 const fakeDate=class extends Date{static now(){return now}};
 const deps={Date:fakeDate,document:{hidden:false},window:{OfficeSupabase:{realtimeConnected:()=>connected},addEventListener:(n,fn)=>{if(n==='ks:supabase-change')onEvent=fn}},
  eventPollTimer:null,chatPollTimer:null,jobAutoTimer:null,staffPollTimer:null,
  staffEditorModal:{classList:{contains:()=>false}},workloadEditorModal:{classList:{contains:()=>false}},
  renderChatSenders(){},pullOfficeEvents(){requests++},pullChat(){requests++},loadJobsFromManagement(){requests++},loadStaffDirectory(){requests++},
  refreshJobsFromSharedCache(){requests++},STAFF_DIRECTORY_SCOPE:'office:staff',
  setInterval(fn){timer=fn;return 123},clearInterval(){},console};
 const ctx=vm.createContext(deps);
 vm.runInContext(source+`\nglobalThis.__start=${name}`,ctx);
 ctx.__start();const base=initialRead?1:0;assert.equal(requests,base,`${name}: initial load pattern preserved`);
 const advance=(ms)=>{now+=ms;timer();};
 for(let t=tickMs;t<connectedPeriod;t+=tickMs)advance(tickMs);
 assert.equal(requests,base,`${name}: no redundant reads with realtime connected`);
 advance(tickMs);assert.equal(requests,base+1,`${name}: safety fallback still fires`);
 connected=false;for(let t=tickMs;t<offlinePeriod;t+=tickMs)advance(tickMs);
 assert.equal(requests,base+1,`${name}: short offline interval retained`);
 advance(tickMs);assert.equal(requests,base+2,`${name}: offline fallback fetches data promptly`);
 return {ctx,onEvent,get count(){return requests}};
}
const events=exercise('startEventStream',between('startEventStream','normalizeKey'),2000,15000,2000);
const state=events.onEvent;assert(state,'Realtime change handler installed');
let previous=events.count;
state({detail:{table:'ks_shared_state',payload:{data:{record:{scope:'other:page'}}}}});assert.equal(events.count,previous,'Unrelated scope ignored');
state({detail:{table:'ks_shared_state',payload:{data:{record:{scope:'office:staff'}}}}});assert.equal(events.count,previous+1,'Staff event reloads staff only');
previous=events.count;
state({detail:{table:'ks_shared_state',payload:{data:{record:{scope:'dashboard:jobs'}}}}});assert.equal(events.count,previous+1,'Job event reloads jobs only');
previous=events.count;
state({detail:{table:'ks_shared_state',payload:{data:{}}}});assert.equal(events.count,previous+2,'Legacy unscoped events preserve compatibility');
exercise('startChat',between('startChat','syncFollowChip'),3500,20000,3500);
exercise('startJobAutoSync',between('startJobAutoSync','normalizeDepartment'),3500,15000,3500,false);
exercise('startStaffDirectorySync',between('startStaffDirectorySync','polygonBounds'),2500,15000,2500);
console.log('PASS V86.43 dashboard polling: 4 realtime-aware loops, immediate offline fallback, filtered staff/job events, legacy events retained.');
