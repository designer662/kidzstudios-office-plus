import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const engineSource=readFileSync('public/office-ambience-audio.js','utf8');
const livingSource=readFileSync('public/office-living-office.js','utf8');
const notificationSource=readFileSync('public/office-notification-sound.js','utf8');
const html=readFileSync('public/index.html','utf8');
const enginePath=html.indexOf('<script src="office-ambience-audio.js?v=81.0" defer></script>');
const livingPath=html.indexOf('<script src="office-living-office.js?v=84.0" defer></script>');
assert.ok(enginePath>0&&livingPath>enginePath,'Audio engine must load before Living Office');
assert.ok(html.includes('office-notification-sound.js'),'Separate notification sounds preserved');

let newContexts=0,resumes=0,started=0,stopped=0,intervals=new Map(),intervalId=0;
class Param{
 constructor(v=0){this.value=v}
 setValueAtTime(v){this.value=v}
 linearRampToValueAtTime(v){this.value=v}
 exponentialRampToValueAtTime(v){this.value=v}
 setTargetAtTime(v){this.value=v}
}
class Node{
 constructor(){this.gain=new Param(1);this.frequency=new Param(1);this.playbackRate=new Param(1);this.Q=new Param(1);this.onended=null;this.buffer=null;this.loop=false}
 connect(target){assert.ok(target,'Audio graph target must exist');return target}
 disconnect(){}
 start(){started++}
 stop(){stopped++;this.onended?.()}
}
class AudioContextMock{
 constructor(){newContexts++;this.state='suspended';this.currentTime=0;this.sampleRate=12000;this.destination=new Node()}
 async resume(){resumes++;this.state='running'}
 async close(){this.state='closed'}
 createBuffer(channels,len){assert.equal(channels,1);return {getChannelData:()=>new Float32Array(len)}}
 createGain(){return new Node()}
 createBiquadFilter(){return new Node()}
 createBufferSource(){return new Node()}
 createOscillator(){return new Node()}
}
const listeners=new Map();
const fakeDocument={hidden:false,readyState:'loading',addEventListener:(type,cb)=>{const old=listeners.get(type)||[];old.push(cb);listeners.set(type,old)}};
const store=new Map();
const window={AudioContext:AudioContextMock,addEventListener:(type,cb)=>listeners.set('window:'+type,[cb]),office3d:{showBubble(){},clearBubble(){},playEmote(){}}};
const globals={window,document:fakeDocument,localStorage:{getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,String(v))},
 setInterval:(fn,ms)=>{const id=++intervalId;intervals.set(id,{fn,ms});return id},clearInterval:id=>intervals.delete(id),
 console,Math,Date,Intl};
vm.runInNewContext(engineSource,globals,{filename:'office-ambience-audio.js'});
vm.runInNewContext(livingSource,globals,{filename:'office-living-office.js'});
const office=window.OfficeLiving;
const eng=office.ambientSoundEngine;
assert.ok(eng,'OfficeLiving uses dedicated V81 sound engine');
assert.equal(newContexts,0,'No audio context before user gesture');
assert.equal(eng.state(),'off');
assert.equal(office.getAmbientVolume(),.55,'Existing volume default preserved');

await eng.setEnabled(true,{gesture:false});
assert.equal(eng.state(),'tap-to-start','Browser audio unlock must require user gesture');
assert.equal(newContexts,0,'Do not silently create context without gesture');
await eng.start({gesture:true});
assert.equal(eng.state(),'playing','Gesture starts engine after context.resume');
assert.equal(newContexts,1);assert.equal(resumes,1);
assert.ok(started>=3,'ventilation base and two fan tones started');
assert.equal(intervals.size,1,'Only one ambience scheduler created');
await eng.start({gesture:true});
assert.equal(newContexts,1,'Repeated pointerdown must reuse context');
assert.equal(intervals.size,1,'Repeated pointerdown must not duplicate loops');

eng.setActivity([
 {id:1,action:'designing',walking:false},
 {id:2,action:'walking',walking:true},
 {id:3,action:'chat',scene:{kind:'conversation'}},
 {id:4,action:'meeting',scene:{kind:'huddle'}}
]);
assert.equal(eng.getActivity().walking,1);
assert.equal(eng.getActivity().working,1);
assert.equal(eng.getActivity().chatting,1);
assert.equal(eng.getActivity().meeting,1);
for(let i=0;i<30;i++)for(const timer of [...intervals.values()])timer.fn();
assert.ok(started>10,'Footsteps/typing and quiet office speech cues are scheduled');
await eng.preview();
assert.equal(eng.state(),'playing','Preview starts and remains audible');
assert.ok(eng.getContext()?.state==='running');
eng.setVolume(.22);
assert.equal(eng.getVolume(),.22);

office.setAmbientEnabled(true);await Promise.resolve();await Promise.resolve();
fakeDocument.hidden=true;for(const fn of listeners.get('visibilitychange')||[])fn();
assert.equal(eng.state(),'paused','Visibility pause must stop sound loops');
assert.equal(intervals.size,0);
assert.ok(stopped>=3,'Loop sources must stop when tab hidden');
fakeDocument.hidden=false;for(const fn of listeners.get('visibilitychange')||[])fn();
await Promise.resolve();await Promise.resolve();
assert.equal(eng.state(),'playing','Visible tab may resume when context is still running');
assert.equal(intervals.size,1);

office.setAmbientEnabled(false);assert.equal(eng.state(),'off','Mute stops audio');assert.equal(intervals.size,0);
assert.equal(office.isAmbientEnabled(),false,'UI sound preference must remain independent');
await eng.start({gesture:true});assert.equal(eng.state(),'off','Disabled ambience cannot restart');
eng.dispose();assert.equal(intervals.size,0,'Dispose removes scheduler');

assert.match(livingSource,/ksOfficeAmbientV78/,'Original ambience setting remains compatible');
assert.match(livingSource,/ksOfficeAmbientVolumeV79/,'Original volume preference remains compatible');
assert.match(notificationSource,/ksOfficeNotificationSoundV1/,'Chimes keep an independent mute preference');
console.log('PASS V81 audio: gesture unlock, ventilation, typing, footsteps, murmur, preview, mute, volume, tab visibility, no duplicate loops, independent chimes');
