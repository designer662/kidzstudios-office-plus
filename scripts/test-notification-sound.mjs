import vm from 'node:vm';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

let currentTime=100000,hidden=false;
const store=new Map();
const events=new Map();
const oscStarts=[];
let button;
const makeNode=()=>({connected:true,isConnected:true,textContent:'',attrs:{},setAttribute(k,v){this.attrs[k]=v},addEventListener(type,fn){this['on'+type]=fn}});
const clearBtn=makeNode();
const head={querySelector(selector){return selector==='#notificationClearBtn'?clearBtn:selector==='.ks-sound-toggle'?button:null;},insertBefore(el){button=el},appendChild(el){button=el}};
const panel={querySelector:()=>head};
class AudioContextMock {
  state='running';currentTime=1;destination={};
  createOscillator(){return {type:'',frequency:{setValueAtTime(){}},connect(){},start(){oscStarts.push(1)},stop(){},disconnect(){},onended:null}};
  createGain(){return {gain:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},disconnect(){}}}
  resume(){this.state='running';return Promise.resolve()}
}
const doc={get hidden(){return hidden},readyState:'complete',head:{appendChild(){}},getElementById(id){return id==='notificationPanel'?panel:null},createElement(){return makeNode()},addEventListener(type,fn){events.set(type,fn)}};
const context={document:doc,window:{AudioContext:AudioContextMock,addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},Date:{now:()=>currentTime},console};
vm.runInNewContext(readFileSync('public/office-notification-sound.js','utf8'),context);
const sound=context.window.KSNotificationSound;
assert.ok(button,'Sound toggle injected into notification panel');
assert.equal(sound.isEnabled(),true);
assert.equal(sound.play('update'),false,'No sound until a user gesture unlocks AudioContext');
assert.equal(oscStarts.length,0);
events.get('pointerdown')();
assert.equal(sound.play('update'),true);
assert.equal(oscStarts.length,2,'New update produces two-tone chime');
assert.equal(sound.play('chat_message'),false,'Rapid repeat is rate-limited');
currentTime+=2000;
hidden=true;
assert.equal(sound.play('chat_message'),false,'Background tab does not ring');
hidden=false;
assert.equal(sound.play('chat_message'),true);
assert.equal(oscStarts.length,4);
button.onclick({stopPropagation(){}});
assert.equal(sound.isEnabled(),false);
assert.equal(store.get('ksOfficeNotificationSoundV1'),'off');
currentTime+=2000;
assert.equal(sound.play('update'),false,'Muted setting suppresses sound');
button.onclick({stopPropagation(){}});
assert.equal(sound.isEnabled(),true);
assert.equal(store.get('ksOfficeNotificationSoundV1'),'on');
console.log('PASS: audio unlock, new update chime, repeat throttling, hidden-page silence, persistent mute/unmute control');
