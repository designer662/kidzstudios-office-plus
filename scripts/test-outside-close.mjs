import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import vm from 'node:vm';

const source=readFileSync('public/office-outside-close.js','utf8');
const pages=readdirSync('public').filter(name=>name.endsWith('.html'));
assert.equal(pages.length,10,'Expected 10 public pages');
for(const name of pages){
  const html=readFileSync('public/'+name,'utf8');
  assert.equal((html.match(/office-outside-close\.js\?v=74\.0/g)||[]).length,1,`Missing or duplicate outside-close script on ${name}`);
}

function setup(){
  const nodes=new Map(), listeners=new Map();
  function element(id,{open=false,parent=null,display='',tag='div'}={}){
    const values=new Set(open?['open']:[]);
    const obj={id,tagName:tag.toUpperCase(),style:{display},parent,children:[],disabled:false,clicked:0,
      classList:{contains:k=>values.has(k),add:k=>values.add(k),remove:k=>values.delete(k)},
      contains(other){for(let current=other;current;current=current.parent)if(current===obj)return true;return false},
      closest(selector){if(selector.includes('button')&&obj.tagName==='BUTTON')return obj;return null},
      querySelector(selector){return obj.children.find(c=>(selector==='.dialog'||selector==='.job-link-dialog')&&c.kind==='dialog'||selector==='.modal-content'&&c.kind==='content'||selector==='.close-btn'&&c.kind==='close-btn'||selector==='.temp-user-dialog'&&c.kind==='temp-user-dialog'||selector==='.close-mini'&&c.kind==='close-mini')||null},
      click(){obj.clicked++;obj.onClick?.()},
      onClick:null};
    if(parent)parent.children.push(obj);
    if(id)nodes.set(id,obj);
    return obj;
  }
  const document={
    getElementById:id=>nodes.get(id)||null,
    querySelector:selector=>{
      if(selector==='[data-ops-tab="pulse"]')return nodes.get('pulse')||null;
      if(selector==='.notification-wrap')return nodes.get('notification-wrap')||null;
      return null;
    },
    querySelectorAll:selector=>selector==='details[open]'?([...nodes.values()].filter(n=>n.tagName==='DETAILS'&&n.open)):
      selector==='.combo-shell.open'?[...nodes.values()].filter(n=>n.kind==='combo'&&n.classList.contains('open')):[],
    addEventListener:(name,fn)=>listeners.set(name,fn)
  };
  const window={};
  vm.runInNewContext(source,{document,window});
  const dispatch=(target,options={})=>{
    let prevented=false,stopped=false;
    const event={target,button:0,preventDefault:()=>{prevented=true},stopImmediatePropagation:()=>{stopped=true},...options};
    listeners.get('click')(event);
    return {prevented,stopped};
  };
  return {element,nodes,dispatch,window};
}

// A foreground confirmation closes by itself, without closing the editor behind it.
{
 const t=setup();
 const editor=t.element('editor',{open:true}), editorDialog=t.element(null,{parent:editor});editorDialog.kind='dialog';
 const confirm=t.element('confirmModal',{open:true}), confirmDialog=t.element(null,{parent:confirm});confirmDialog.kind='dialog';
 const cancel=t.element('confirmClose',{tag:'button'});cancel.onClick=()=>confirm.classList.remove('open');
 const editClose=t.element('editorClose',{tag:'button'});editClose.onClick=()=>editor.classList.remove('open');
 t.dispatch(t.element(null,{parent:confirmDialog}));
 assert.ok(confirm.classList.contains('open'),'Click inside confirmation should keep it open');
 const result=t.dispatch(t.element());
 assert.ok(!confirm.classList.contains('open'),'Outside click should close confirmation');
 assert.ok(editor.classList.contains('open'),'Underlying editor must remain open');
 assert.equal(result.prevented,true,'Underlying click must not pass through modal');
 t.dispatch(t.element());
 assert.ok(!editor.classList.contains('open'),'Second click may close editor');
}
// Staff editor inside clicks preserved; outside click should close via its native button.
{
 const t=setup(), modal=t.element('staffEditorModal',{open:true});
 const content=t.element(null,{parent:modal});content.kind='dialog';
 const field=t.element(null,{parent:content});
 const close=t.element('staffEditorClose',{tag:'button'});close.onClick=()=>modal.classList.remove('open');
 t.dispatch(field);assert.ok(modal.classList.contains('open'));
 t.dispatch(t.element());assert.ok(!modal.classList.contains('open'));
 assert.equal(close.clicked,1);
}
// A dropdown closes on empty click but not on a click inside itself.
{
 const t=setup(), details=t.element('tools',{tag:'details'});details.open=true;
 const content=t.element(null,{parent:details});
 t.dispatch(content);assert.equal(details.open,true);
 t.dispatch(t.element());assert.equal(details.open,false);
}
// Notifications, chat and character popup close separately.
{
 const t=setup();
 const notification=t.element('notificationPanel',{open:true});
 const wrap=t.element('notification-wrap');notification.parent=wrap;wrap.children.push(notification);
 const button=t.element('notificationBtn',{tag:'button'});button.onClick=()=>notification.classList.remove('open');
 t.dispatch(t.element());assert.ok(!notification.classList.contains('open'));
 const chat=t.element('officeChat',{open:true});
 const chatClose=t.element('chatCloseBtn',{tag:'button'});chatClose.onClick=()=>chat.classList.remove('open');
 t.dispatch(t.element());assert.ok(!chat.classList.contains('open'));
 const picker=t.element('characterEmojiPicker');picker.hidden=false;
 const emojiClose=t.element('characterEmojiClose',{tag:'button'});emojiClose.onClick=()=>{picker.hidden=true};
 t.dispatch(t.element());assert.equal(picker.hidden,true);
}
// Order form preview should invoke its own cleanup, not merely hide the overlay.
{
 const t=setup(), preview=t.element('previewModal',{display:'block'});
 const content=t.element(null,{parent:preview});content.kind='content';
 const close=t.element(null,{parent:preview});close.kind='close-btn';close.onClick=()=>preview.style.display='none';
 t.dispatch(t.element());assert.equal(preview.style.display,'none');assert.equal(close.clicked,1);
}
console.log(`PASS click-away tests: modal priority, field protection, dropdowns, shared panels, preview cleanup, ${pages.length} pages.`);
