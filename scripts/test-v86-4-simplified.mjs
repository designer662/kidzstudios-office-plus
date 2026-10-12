import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read=p=>readFileSync(p,'utf8');
const html=read('public/index.html'),living=read('public/office-living-office.js'),audio=read('public/office-ambience-audio.js'),character=read('source/src/office-character.ts'),bundle=read('public/office-3d.js');
assert.match(html,/office-living-office\.css\?v=86\.4/,'Sound bar CSS cache is refreshed');
assert.match(html,/office-living-office\.js\?v=86\.4/,'Sound bar code cache is refreshed');
assert.match(html,/office-3d\.js\?v=86\.5/,'Hijab 3D code cache is refreshed');
assert.doesNotMatch(html,/ksRoomJump|office-room-nav\.js/,'No redundant room picker');
for(const selector of ['ks-living-preview','ks-living-volume','ks-living-activity','ks-living-sound-status'])assert.ok(!living.includes(selector),'Removed legacy control '+selector);
assert.doesNotMatch(audio,/ventLow|ventWhisper|fan\.start\(\)|harmonic\.start\(\)/,'No continuous AC sound');
assert.match(character,/const cloth='#c67b70'/,'Uploaded cloth color preserved');
for(const name of ['hijab-hood-v1','hijab-throat-v1','hijab-shoulders-v1','hijab-front-tail-v1']){
 assert.ok(character.includes(name),'Source missing '+name);assert.ok(bundle.includes(name),'Bundle missing '+name);
}
assert.match(character,/const rest=p\.status==='break'&&p\.action==='coffee'/,'Prayer and toilet breaks should not use coffee animation');
const listeners=new Map(),children=[],elements=new Map(),writes=new Map();
function element(tag){return {tag,children:[],className:'',textContent:'',hidden:false,attributes:{},addEventListener(type,cb){this.events??={};this.events[type]=cb},append(...nodes){this.children.push(...nodes);children.push(...nodes)},appendChild(node){this.children.push(node);return node},setAttribute(k,v){this.attributes[k]=v}}}
const host=element('div');host.parentElement=element('div');elements.set('office3dHost',host);
const fakeWindow={addEventListener(n,cb){listeners.set('window:'+n,cb)},office3d:{}};
const ctx={window:fakeWindow,document:{readyState:'complete',hidden:false,getElementById:id=>elements.get(id)||null,createElement:element,addEventListener(n,cb){listeners.set(n,cb)}},localStorage:{getItem:()=>null,setItem:(k,v)=>writes.set(k,v)},console,Date,Intl,Math};
vm.runInNewContext(living,ctx,{filename:'office-living-office.js'});
const controls=host.parentElement.children[0];
assert.equal(controls.id,'ksLivingControls');assert.equal(controls.children.length,2,'Only day/night label and sound toggle are rendered');
const [lighting,toggle]=controls.children;assert.equal(lighting.className,'ks-living-daylight');assert.equal(toggle.className,'ks-living-audio');
assert.match(lighting.textContent,/Day|Night|Evening/);assert.equal(toggle.textContent,'♫ Sound off');assert.equal(toggle.attributes['aria-pressed'],'false');
toggle.events.click({stopPropagation(){}});assert.equal(toggle.textContent,'♫ Sound on');assert.equal(toggle.attributes['aria-pressed'],'true');assert.equal(writes.get('ksOfficeAmbientV78'),'on');
toggle.events.click({stopPropagation(){}});assert.equal(toggle.textContent,'♫ Sound off');assert.equal(writes.get('ksOfficeAmbientV78'),'off');
console.log('PASS V86.4 compact Day/Night + sound switch, persistent toggle, removed controls and room jump, zero AC sources, bundled uploaded hijab');
