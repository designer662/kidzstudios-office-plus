import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';

// Actual shared-sync runtime in a tiny DOM fixture. Exercises race, CAS, and unsafe HTML.
const handlers=new Map(),timers=[],elements=new Map();
class Element{
  constructor(tag='div') {this.tagName=tag.toUpperCase();this.dataset={};this.style={};this.listeners=new Map();this.value='';this.textContent='';this.innerText='';this.type='text';this.id='';this.name='';this.isContentEditable=false;this.children=[];this.disabled=false;}
  get innerHTML(){return this._html||'';}
  set innerHTML(s){this._html=String(s);this.htmlWriteCount=(this.htmlWriteCount||0)+1;}
  append(...children){this.children.push(...children);for(const el of children)if(el.id)elements.set(el.id,el);}
  appendChild(el){this.append(el);}
  remove(){elements.delete(this.id);}
  setAttribute(key,v){this[key]=v;}
  querySelector(tag){if(tag==='span'){this._span||=new Element('span');return this._span;}return null;}
  addEventListener(name,fn){this.listeners.set(name,fn);}
  matches(){return this.isContentEditable||['INPUT','SELECT','TEXTAREA'].includes(this.tagName);}
  closest(){return null;}
  dispatchEvent(){}
}
class Input extends Element {constructor(){super('input');}}
class Select extends Element {constructor(){super('select');}}
class Textarea extends Element {constructor(){super('textarea');}}
const input=new Input();input.id='name';
const editable=new Element('div');editable.id='details';editable.isContentEditable=true;elements.set('name',input);elements.set('details',editable);
const body=new Element('body');body.append=(...els)=>{for(const el of els){body.children.push(el);if(el.id)elements.set(el.id,el);}};
body.appendChild=body.append;
const document={readyState:'complete',hidden:false,activeElement:null,body,
 createElement:tag=>new Element(tag),getElementById:id=>elements.get(id)||null,
 querySelectorAll(selector){if(selector==='input,select,textarea,[contenteditable="true"]')return [input,editable];if(selector==='a')return [];return [];},
 querySelector(){return null;},addEventListener(name,fn){handlers.set(name,fn);}};
let serverVersion=1,remote={fields:{'id:name':{t:'text',v:'Server'},'id:details':{t:'contenteditable',v:'<img src=x onerror=alert(1)>'}}};
const saves=[],hold=[],confirms=[];
let holdNext=false;
const reply=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json'}});
async function fetch(url,opt={}){
 const u=new URL(url,'https://example.org/app/index.html');
 if(u.searchParams.get('scope')==='config:global')return reply({},404);
 if(opt.method==='PUT'){
  const req=JSON.parse(opt.body);saves.push(req);
  if(holdNext){holdNext=false;await new Promise(resolve=>hold.push(resolve));}
  if(req.expectedVersion!==serverVersion)return reply({error:'Conflict'},409);
  remote=req.payload;serverVersion++;
  return reply({version:serverVersion,payload:remote});
 }
 return reply({version:serverVersion,payload:remote});
}
const window={dispatchEvent(){},confirm:message=>{confirms.push(message);return true;},addEventListener(){},OfficeSupabase:{realtimeConnected:()=>false}};
const context={window,document,location:{pathname:'/app/index.html',protocol:'https:'},fetch,Response,
 HTMLElement:Element,HTMLInputElement:Input,HTMLSelectElement:Select,HTMLTextAreaElement:Textarea,
 Event:class{},CustomEvent:class{},CSS:{escape:s=>s},crypto:{randomUUID:()=> 'unique'},
 setTimeout:(fn)=>{timers.push(fn);return timers.length;},clearTimeout:()=>{},setInterval:()=>1,
 console,Date,Math,Object,Array,Promise,JSON,Set,URL,encodeURIComponent};
vm.runInNewContext(readFileSync('public/shared-sync.js','utf8'),context,{filename:'shared-sync.js'});
async function flush(){let n=0;while(timers.length){const f=timers.shift();f();await new Promise(r=>setImmediate(r));if(++n>50)throw Error('unbounded timer');}}
await flush();
assert.equal(input.value,'Server','Remote state populates input');
assert.equal(editable.textContent,'<img src=x onerror=alert(1)>','Remote HTML must display as text');
assert.equal(editable.htmlWriteCount,undefined,'Never inject synchronized HTML');
input.value='Draft 1';handlers.get('input')({target:input});
holdNext=true;
let scheduled=timers.shift();scheduled();await new Promise(r=>setImmediate(r));
assert.equal(saves.length,1,'First save started');assert.equal(saves[0].expectedVersion,1,'CAS token sent');
input.value='Draft 2';handlers.get('input')({target:input});
hold.shift()();await new Promise(r=>setImmediate(r));await flush();
assert.equal(saves.length,2,'Edit occurring during in-flight save is retried');
assert.equal(saves[1].expectedVersion,2,'Second save uses server response version');
assert.equal(remote.fields['id:name'].v,'Draft 2');
// Another tab changes the shared record before this client saves.
serverVersion++;remote={fields:{'id:name':{t:'text',v:'Other tab'},'id:details':{t:'contenteditable',v:'safe'}}};
input.value='My unsaved edit';handlers.get('input')({target:input});await flush();
assert.equal(saves.at(-1).expectedVersion,3,'Stale version is rejected');
assert.equal(remote.fields['id:name'].v,'Other tab','Remote record was not overwritten');
assert.equal(input.value,'My unsaved edit','Local unsaved changes survive conflict');
const banner=elements.get('ksSharedConflict');assert(banner,'Visible conflict resolution');
const actions=banner.children[2],refresh=actions.children[0];
await refresh.listeners.get('click')();
assert.equal(input.value,'Other tab','Explicit refresh loads server values');
assert.equal(elements.has('ksSharedConflict'),false,'Conflict banner removed');
assert.equal(confirms.length,1,'Destructive refresh requires confirmation');
console.log('PASS production shared sync: CAS, inflight changes persisted, stale overwrite blocked, explicit conflict UI, stored HTML never injected.');
