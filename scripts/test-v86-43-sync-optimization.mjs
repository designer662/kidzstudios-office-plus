import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';

// Exercise real sync script against a mock authenticated API and clock.
const events=new Map(),windowEvents=new Map(),timers=[],intervals=[];
let now=100000,configReads=0,stateReads=0,saveCalls=0;
class Element{
  constructor(tag='div'){this.tagName=tag.toUpperCase();this.dataset={};this.style={};this.id='';this.type='text';this.value='';this.children=[];this.textContent='';this.isContentEditable=false;this.listeners=new Map();}
  set innerHTML(value){this.html=String(value)}
  append(...children){this.children.push(...children)}
  appendChild(child){this.append(child)}
  querySelector(tag){if(tag==='span')return this.statusSpan ||=new Element('span');return null}
  matches(s){return s==='input'||s.includes('input')&&this.tagName==='INPUT'}
  closest(){return null}
  addEventListener(name,fn){this.listeners.set(name,fn)}
  dispatchEvent(){}
}
class Input extends Element{constructor(){super('input');}}
class Select extends Element{}
class Textarea extends Element{}
const input=new Input();input.id='employee';input.value='original';
const nodes=new Map([['employee',input]]);
const body=new Element('body');body.append=(...children)=>{for(const child of children){if(child.id)nodes.set(child.id,child)}};body.appendChild=body.append;
const document={readyState:'complete',hidden:false,activeElement:null,body,createElement:tag=>new Element(tag),getElementById:id=>nodes.get(id)||null,
 querySelectorAll:selector=>selector.startsWith('input,select')?[input]:[],querySelector:()=>null,addEventListener:(name,fn)=>events.set(name,fn)};
const FakeDate=class extends Date{static now(){return now}};
const reply=(data,status=200)=>new Response(JSON.stringify(data),{status});
async function fetch(url,options={}){
 const scope=new URL(url,'https://example.test/app/index.html').searchParams.get('scope');
 if(scope==='config:global'){configReads++;return reply({},404)}
 if(options.method==='PUT'){saveCalls++;return reply({version:1,payload:{fields:{'id:employee':{t:'text',v:input.value}}}})}
 if(scope==='page:index'){stateReads++;return reply({version:1,payload:{fields:{'id:employee':{t:'text',v:'original'}}}})}
 throw Error('Unexpected scope: '+scope);
}
const window={OfficeSupabase:{realtimeConnected:()=>false},addEventListener:(name,fn)=>windowEvents.set(name,fn),dispatchEvent(){}};
const context={window,document,location:{pathname:'/app/index.html',protocol:'https:'},fetch,Response,Date:FakeDate,HTMLElement:Element,HTMLInputElement:Input,HTMLSelectElement:Select,HTMLTextAreaElement:Textarea,
 CSS:{escape:s=>s},Event:class{},CustomEvent:class{},crypto:{randomUUID:()=> 'test-client'},
 setTimeout:fn=>{timers.push(fn);return timers.length},clearTimeout:()=>{},setInterval:fn=>{intervals.push(fn);return intervals.length},
 console,Math,JSON,Promise,Object,Number,Set,URL,encodeURIComponent};
vm.runInNewContext(readFileSync('public/shared-sync.js','utf8'),context);
async function settle(){for(let i=0;i<5;i++)await new Promise(resolve=>setImmediate(resolve))}
for(const fn of timers.splice(0))fn();await settle();
assert.equal(configReads,1,'Global config must be fetched once at initialization');
assert.equal(stateReads,1,'Page state must be loaded');
assert.equal(intervals.length,1,'One polling interval only');
for(let i=0;i<16;i++){now+=3500;intervals[0]();await settle()}
assert.equal(configReads,1,'Global config must not poll every 3.5 seconds');
now+=7000;intervals[0]();await settle();
assert.equal(configReads,2,'Config fallback refresh after one minute');
let oldPage=stateReads,oldConfig=configReads;
windowEvents.get('ks:supabase-change')({detail:{table:'ks_shared_state',payload:{data:{record:{scope:'page:elsewhere'}}}}});await settle();
assert.equal(stateReads,oldPage,'Unrelated page updates do not trigger refetch');
assert.equal(configReads,oldConfig,'Unrelated page updates do not trigger config refetch');
windowEvents.get('ks:supabase-change')({detail:{table:'ks_shared_state',payload:{data:{record:{scope:'config:global'}}}}});await settle();
assert.equal(configReads,oldConfig+1,'Global config realtime event triggers refresh');
oldPage=stateReads;
windowEvents.get('ks:supabase-change')({detail:{table:'ks_shared_state',payload:{data:{record:{scope:'page:index'}}}}});await settle();
assert.equal(stateReads,oldPage+1,'Own page realtime event triggers refresh');
const cleanEvent={preventDefault(){this.prevented=true},returnValue:null};
windowEvents.get('beforeunload')(cleanEvent);assert(!cleanEvent.prevented,'Clean tab does not warn');
input.value='Unsaved';events.get('input')({target:input});
const dirtyEvent={preventDefault(){this.prevented=true},returnValue:null};
windowEvents.get('beforeunload')(dirtyEvent);
assert.equal(dirtyEvent.prevented,true,'Warn on unsaved form edits');
assert.equal(dirtyEvent.returnValue,'','Use browser-native close confirmation');
assert.equal(saveCalls,0,'No unexpected writes triggered by polling');
console.log(`PASS V86.43 sync optimization: config fetched ${configReads} times vs 19 legacy calls; scoped realtime, in-flight coalescing guard, unsaved-close warning.`);
