import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import vm from 'node:vm';

const read=path=>readFileSync(path,'utf8');
const html=read('public/index.html');
const css=read('public/office-live-activity.css');
const presenceJs=read('public/office-online-users.js');
const pages=readdirSync('public').filter(p=>p.endsWith('.html')&&p!=='index.html');

for(const id of ['livePanel','livePanelBody','livePresenceSlot','ksOnlineUsers','liveFeedCount','activityList']){
  const expected=id==='ksOnlineUsers'?0:1; // presence badge is created once by the existing JS
  const actual=(html.match(new RegExp(`id="${id}"`,'g'))||[]).length;
  assert.equal(actual,expected,`#${id} must be defined ${expected} time(s) in index`);
}
assert.ok(html.indexOf('office-live-activity.css')>html.indexOf('office-index-job-style.css'),'Activity style must load last');
assert.match(html,/data-live-filter="all" aria-pressed="true"/);
assert.match(html,/data-live-filter="team" aria-pressed="false"/);
assert.match(html,/data-live-filter="jobs" aria-pressed="false"/);
assert.ok(!presenceJs.includes("document.querySelector('.ks-master-header .header-tools')"),'Online status must not mount in header');
assert.match(presenceJs,/getElementById\('livePresenceSlot'\)/);
for(const page of pages){
  assert.ok(!read('public/'+page).includes('office-live-activity.css'),`${page} must be unaffected`);
}
assert.match(css,/body\.ks-dashboard #livePanel/);

const buttons=['all','team','jobs'].map(filter=>({
  dataset:{liveFilter:filter},handlers:{},attrs:{},active:false,
  addEventListener(type,fn){this.handlers[type]=fn},
  setAttribute(key,value){this.attrs[key]=value},
  classList:{toggle(){}}
}));
const dom={innerHTML:''},counter={textContent:''};
const entries=[
  {type:'staff_updated',title:'Team added',text:'Staff directory updated',createdAt:1000,employeeId:1},
  {type:'job_sync',title:'Order updated',text:'A new order',createdAt:2000},
  {type:'chat_message',title:'Hello',text:'Office chat',createdAt:3000},
  {type:'production_updated',title:'Printed',text:'In production',createdAt:4000},
  {type:'time_brief',title:'Checkpoint',text:'Tasks',createdAt:5000},
  {type:'misc',title:'General',text:'Other update',createdAt:6000}
];
const start=html.indexOf("  let liveFeedFilter='all';");
const end=html.indexOf('  function positionBubbleForEmployee',start);
assert.ok(start!==-1&&end>start,'Cannot locate actual activity filtering and rendering implementation');
const context=vm.createContext({
  activityList:dom,livePanel:{classList:{contains:()=>false}},eventInitialized:true,eventHealth:'live',
  $:s=>s==='#liveFeedCount'?counter:s==='#liveFeedDetail'?{hidden:true,addEventListener(){}}:s==='#liveDetailClose'?{addEventListener(){}}:s==='#liveDetailStaff'?{hidden:true}:null,
  $$:()=>buttons,
  groupedActivityFeed:()=>entries,
  activityTypeLabel:type=>type.toUpperCase(),
  activityFeedGlyph:()=>'*',
  esc:str=>String(str??'').replaceAll('&','&amp;').replaceAll('<','&lt;'),
  clockTime:()=> '12:00',relativeEventTime:()=> 'now',Date
});
vm.runInContext(html.slice(start,end),context);
assert.equal(counter.textContent,'','Filter only renders on a real feed refresh');
vm.runInContext('renderFeed()',context);
assert.equal(counter.textContent,'6 updates');
assert.equal((dom.innerHTML.match(/class="feed-item /g)||[]).length,4,'Default feed shows latest 4 grouped updates');
buttons[2].handlers.click();
assert.equal(counter.textContent,'3 updates','Jobs filter should include jobs, production and office checkpoint');
assert.ok(dom.innerHTML.includes('Order updated')&&dom.innerHTML.includes('Printed'));
assert.ok(!dom.innerHTML.includes('Team added'));
assert.equal(buttons[2].attrs['aria-pressed'],'true');
assert.equal(buttons[0].attrs['aria-pressed'],'false');
buttons[1].handlers.click();
assert.equal(counter.textContent,'2 updates');
assert.ok(dom.innerHTML.includes('Team added')&&dom.innerHTML.includes('Hello'));
assert.ok(!dom.innerHTML.includes('Order updated'));
entries.splice(0,entries.length);
vm.runInContext('renderFeed()',context);
assert.match(dom.innerHTML,/No team updates yet/,'Empty filtered state should be descriptive');
entries.push({type:'job_sync',title:'Order &lt;test>',text:'Safe & good',createdAt:7000});
buttons[0].handlers.click();
vm.runInContext('renderFeed()',context);
assert.equal(counter.textContent,'1 update');
assert.match(dom.innerHTML,/Safe &amp; good/,'Feed values must be escaped');

const handlers=new Map(),counterNode={textContent:''},slot={children:[],append(node){this.children.push(node)}};
let mounted=null;
const doc={
  readyState:'complete',
  getElementById(id){
    if(id==='livePresenceSlot')return slot;
    if(id==='ksOnlineUsers')return mounted;
    if(id==='ksOnlineCount')return counterNode;
    return null;
  },
  createElement(){
    const el={innerHTML:'',attrs:{},classes:{},setAttribute(k,v){this.attrs[k]=v},classList:{toggle(name,active){el.classes[name]=active}}};
    mounted=el;return el;
  }
};
const win={OfficeSupabase:{realtimeConnected:()=>true,onlineCount:()=>2},addEventListener(name,fn){handlers.set(name,fn)}};
vm.runInNewContext(presenceJs,{window:win,document:doc});
assert.equal(slot.children.length,1,'Presence mounts only once in Live Activity');
assert.equal(counterNode.textContent,'2');
assert.match(mounted.attrs['aria-label'],/2 connected browser sessions/);
handlers.get('ks:office-online')({detail:{connected:true,count:5}});
assert.equal(counterNode.textContent,'5','Realtime presence count must update');
handlers.get('ks:office-online')({detail:{connected:false,count:null}});
assert.equal(counterNode.textContent,'—','Offline is not the same as zero browser sessions');
assert.equal(mounted.classes.connected,false);

console.log(`PASS: Live Activity UI structure, safe feed filters and empty states, online presence realtime updates, ${pages.length} other pages unchanged`);
