import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';

const html=readFileSync('public/index.html','utf8');
const css=readFileSync('public/office-live-activity.css','utf8');
const extract=(a,b)=>{
  const i=html.indexOf(a),j=html.indexOf(b,i+a.length);
  assert.ok(i>=0&&j>i,`Required source region not found: ${a}`);
  return html.slice(i,j);
};
const health=extract("  let eventHealth='connecting'",'  function maybePushOpsTimeBrief');
const events=extract('  async function postOfficeEvent(', '  function normalizeKey(');
assert.match(html,/id="liveLabel">Connecting…/);
assert.match(html,/data-sync-state="connecting"/);
assert.ok(html.indexOf('id="ks-index-boot-guard"')<html.indexOf('id="ks-main-js"'),'Boot monitor must install before inline controller');
assert.match(css,/data-sync-state="offline"/);
assert.ok(!html.includes('id="liveFeedSearch"')&&!html.includes('id="liveFeedPause"'),'Removed toolbar must stay removed');

let connected=true,online=true,sent=0,processed=[],polls=0,saveEvent=true;
const label={textContent:''},panel={dataset:{syncState:'connecting'}},registered=new Map(),intervals=[];
const context=vm.createContext({
  liveLabel:label,livePanel:panel,Date,console,
  navigator:{get onLine(){return online}},
  window:{OfficeSupabase:{realtimeConnected:()=>connected},addEventListener:(name,fn)=>registered.set(name,fn)},
  document:{hidden:false,addEventListener:(name,fn)=>registered.set(name,fn)},
  renderFeed(){},renderOpsSyncMeta(){},maybePushOpsTimeBrief(){},
  clockTime:()=> '10:30',eventPollTimer:null,clockTimer:null,
  EVENTS_API:'/api/events',eventClientId:'fixture',eventInitialized:false,lastEventId:0,
  staffEditorModal:{classList:{contains:()=>false}},STAFF_DIRECTORY_SCOPE:'office:staff',
  fetch:async (url,opts)=>{
    if(opts?.method==='POST'){
      return {ok:saveEvent,status:saveEvent?200:503,json:async()=>({event:saveEvent?{id:100,eventType:'staff_updated',sourceClient:'fixture'}:undefined})};
    }
    polls++;
    if(!connected)return {ok:false,status:503};
    return {ok:true,json:async()=>({events:[]})};
  },
  handleOfficeEvent:(event)=>processed.push(event),
  setInterval(fn){intervals.push(fn);return intervals.length},clearInterval(){},
  pullChat(){},loadStaffDirectory(){},refreshJobsFromSharedCache(){},
  showNotificationToast(){},
});
vm.runInContext(health+'\n'+events,context);
const state=()=>panel.dataset.syncState;
assert.equal(state(),'connecting');
assert.match(label.textContent,/^$/);
vm.runInContext('startEventStream()',context);
// The initial request completes asynchronously.
await vm.runInContext('eventPullPromise',context);
assert.equal(state(),'live');
assert.match(label.textContent,/Live · 10:30/);
assert.equal(polls,1);
connected=false;
await vm.runInContext('pullOfficeEvents()',context);
assert.equal(state(),'reconnecting');
await vm.runInContext('pullOfficeEvents()',context);
assert.equal(state(),'reconnecting');
await vm.runInContext('pullOfficeEvents()',context);
assert.equal(state(),'offline');
connected=true;
await vm.runInContext('pullOfficeEvents()',context);
assert.equal(state(),'live');
assert.equal(vm.runInContext('eventFailureCount',context),0);
online=false;registered.get('offline')();
assert.equal(state(),'offline');
const before=polls;
await vm.runInContext('pullOfficeEvents()',context);
assert.equal(polls,before,'Offline signal avoids pointless fetch');
online=true;registered.get('online')();
await vm.runInContext('eventPullPromise',context);
assert.equal(state(),'live');
// A foreground event makes health uncertain until next GET response.
connected=false;
registered.get('visibilitychange')();
assert.equal(state(),'reconnecting');
await vm.runInContext('eventPullPromise',context);
assert.equal(state(),'reconnecting');
connected=true;
await vm.runInContext('pullOfficeEvents()',context);
assert.equal(state(),'live');
// Failed activity publishing is a separate outcome from the already-saved staff update.
saveEvent=false;
assert.equal(await vm.runInContext("postOfficeEvent({eventType:'staff_updated',title:'Changed'})",context),null);
saveEvent=true;
assert.equal((await vm.runInContext("postOfficeEvent({eventType:'staff_updated',title:'Changed'})",context)).id,100);
assert.equal(processed.length,1);
assert.match(html,/staffEditorStatus\.textContent=delivered\?/);
assert.match(html,/workloadEditorStatus\.textContent=delivered\?/);
assert.match(html,/if\(!delivered\)warnEventDelivery\(\)/);

const bootSource=extract('<script id="ks-index-boot-guard">','</script>').replace(/^<script[^>]*>\s*/,'');
function bootFixture(){
 const handlers=new Map(),elements=[],scheduled=[];let reloaded=0;
 const body={append(el){elements.push(el)}};
 const document={readyState:'complete',documentElement:{dataset:{ksAuth:'ok'}},body,
   createElement(tag){return {tagName:tag,style:{},attributes:{},children:[],removed:false,setAttribute(k,v){this.attributes[k]=v},append(...a){this.children.push(...a)},remove(){this.removed=true}}},
   addEventListener(name,fn){handlers.set(name,fn)}};
 const win={addEventListener(name,fn){handlers.set(name,fn)}};
 vm.runInNewContext(bootSource,{window:win,document,location:{reload(){reloaded++}},setTimeout(fn){scheduled.push(fn);return scheduled.length},clearTimeout(){}});
 return {handlers,elements,scheduled,get reloaded(){return reloaded}};
}
const normal=bootFixture();
normal.handlers.get('ks:suite-ready')();
normal.scheduled[0]();
assert.equal(normal.elements.length,0,'Successful startup should not show a warning');
const failure=bootFixture();
failure.handlers.get('error')({message:'ReferenceError',filename:'https://example.test/index.html'});
assert.equal(failure.elements.length,1);
const warning=failure.elements[0];
assert.equal(warning.attributes.role,'alert');
const retry=warning.children.find(el=>el.textContent==='Retry');
assert.ok(retry,'Startup warning must provide Retry');
retry.onclick();assert.equal(failure.reloaded,1,'Retry performs one browser navigation, not duplicate subscriptions');
failure.handlers.get('ks:suite-ready')();assert.equal(warning.removed,true);
const delayed=bootFixture();delayed.scheduled[0]();
assert.equal(delayed.elements.length,1,'Authenticated incomplete startup should be detectable');
const pending=bootFixture();pending.handlers.get('unhandledrejection')({reason:new Error('dashboard startup failed')});
assert.equal(pending.elements.length,1,'Critical startup rejection should surface');

console.log('PASS V86.53 index stability: event health transitions, empty success, offline/online, resume, post failure, early boot guard, safe Retry');
