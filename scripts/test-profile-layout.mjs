import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const code=readFileSync('public/office-profile-layout.js','utf8');
const css=readFileSync('public/office-profile-layout.css','utf8');
const html=readFileSync('public/index.html','utf8');
assert.match(html,/office-profile-layout\.css\?v=75\.0/);
assert.match(html,/office-profile-layout\.js\?v=75\.0/);
assert.match(css,/ks-profile-exclusive #todayPanel/);

function setup({width=1100,height=650,opsX=800,opsW=288,visible=true}={}){
  function create(id,classes=[],rect={left:0,top:0,width:0,height:0}){
    const collection=new Set(classes);
    const props=new Map();
    return {id,rect,
      classList:{contains:key=>collection.has(key),add:(...keys)=>keys.forEach(key=>collection.add(key)),remove:(...keys)=>keys.forEach(key=>collection.delete(key)),toggle:(key,force)=>{if(force)collection.add(key);else collection.delete(key)}},
      style:{setProperty:(key,val)=>props.set(key,val),removeProperty:key=>props.delete(key),getPropertyValue:key=>props.get(key)||''},
      getBoundingClientRect(){return this.rect}
    };
  }
  const shell=create('mapShell',[],{left:20,top:110,width,height});
  const ops=create('todayPanel',[],{left:20+opsX,top:130,width:opsW,height:500});
  ops.display=visible?'block':'none';
  const profile=create('profileCard',['open']);
  const context=create('contextCard');
  const elements=new Map([shell,ops,profile,context].map(el=>[el.id,el]));
  const window={addEventListener(){}};
  const document={getElementById:id=>elements.get(id)||null,documentElement:create('root')};
  const sandbox={document,window,getComputedStyle:el=>({display:el.display||'block'}),
    requestAnimationFrame:callback=>callback(),MutationObserver:class{observe(){}}};
  vm.runInNewContext(code,sandbox);
  const read=(node,key)=>parseFloat(node.style.getPropertyValue(key));
  return {shell,ops,profile,context,read,layout:window.KSOfficeProfileLayout.layout};
}
{
  const t=setup({width:1200,opsX:850});
  assert.ok(t.shell.classList.contains('ks-profile-docked'));
  assert.ok(!t.shell.classList.contains('ks-profile-exclusive'));
  assert.ok(t.read(t.profile,'left')+t.read(t.profile,'width')+14<=850.1,'Sidebar must not overlap profile on desktop');
  assert.ok(t.read(t.profile,'width')>=300);
}
{
  const t=setup({width:690,opsX:305});
  assert.ok(t.shell.classList.contains('ks-profile-docked'));
  assert.ok(t.read(t.profile,'width')>=268);
  assert.ok(t.read(t.profile,'left')+t.read(t.profile,'width')+14<=305.1,'Profile must shrink before hitting the sidebar');
}
{
  const t=setup({width:480,opsX:190});
  assert.ok(t.shell.classList.contains('ks-profile-exclusive'),'Narrow office should give profile exclusive space');
  assert.ok(t.read(t.profile,'left')>=12);
  assert.ok(t.read(t.profile,'width')<=456);
  t.profile.classList.remove('open');t.layout();
  assert.equal(t.shell.classList.contains('ks-profile-exclusive'),false,'Office Pulse should be restored on close');
}
{
  const t=setup({width:470,visible:false});
  assert.ok(t.shell.classList.contains('ks-profile-docked'));
  assert.ok(t.read(t.profile,'left')>=12);
}
console.log('PASS profile docking: full desktop, near-collision, exclusive narrow screens, restore on close, hidden sidebar.');
