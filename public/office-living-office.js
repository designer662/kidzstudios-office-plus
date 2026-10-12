/* V81 Living Office: shared behavior helpers, local atmosphere, opt-in ambience.
 * Illustrative simulated staff actions, never employee-presence monitoring.
 */
(()=>{
 'use strict';
 const STORAGE='ksOfficeAmbientV78'; // Retain existing user preference across upgrade.
 const VOLUME_STORAGE='ksOfficeAmbientVolumeV79';
 const ACTIONS=new Set(['typing','designing','calling','reviewing','admin','production','planning','coffee','meeting','chat','reading','stretching']);
 const greetings=['💬 Quick team catch-up','💬 Project check-in','💬 Sharing an idea','💬 Office catch-up'];
 const huddles=['🗓 Reviewing a project together','🗓 Team planning session','🗓 Project progress huddle'];
 const coffeeLines=['☕ Coffee break','☕ Taking a quick break','☕ Back in a moment'];
 const weightedPick=(pairs,r=Math.random())=>{const total=pairs.reduce((n,[,w])=>n+w,0);let pos=Math.min(.999999,Math.max(0,r))*total;for(const [value,weight] of pairs){pos-=weight;if(pos<0)return value}return pairs[pairs.length-1][0]};
 const taskPalette=(person,hasWork=false)=>{
  const primary=workFor(person),busy=hasWork?6:3;
  switch(primary){
   case 'designing':return [['designing',busy],['typing',2],['reviewing',1],['stretching',.45],['reading',.65]];
   case 'calling':return [['calling',busy],['typing',2],['reviewing',1.4],['stretching',.35]];
   case 'reviewing':return [['reviewing',busy],['planning',2],['reading',2],['calling',.8]];
   case 'production':return [['production',busy],['reviewing',1.7],['typing',1.1],['stretching',.4]];
   case 'admin':return [['admin',busy],['typing',2],['reviewing',1.6],['reading',.7]];
   default:return [['typing',busy],['planning',1],['reading',.7]];
  }
 };
 const jobReaction=person=>({designing:'🎨 Artwork task updated',calling:'📞 Customer task updated',reviewing:'📋 Management task updated',production:'📦 Production task updated',admin:'🗂 Admin task updated',typing:'📋 Work assignment updated'})[workFor(person)]||'📋 Work assignment updated';
 const randomItem=items=>items[Math.floor(Math.random()*items.length)];
 const workFor=person=>{
  const d=String(person?.department||'').toLowerCase(),p=String(person?.position||'').toLowerCase();
  if(/creative|design|artwork/.test(d+' '+p))return 'designing';
  if(/\badmin\b/.test(p))return 'admin';
  if(/sales|marketing/.test(d+' '+p))return 'calling';
  if(/production/.test(d+' '+p))return 'production';
  if(/finance|account/.test(d+' '+p))return 'admin';
  if(/management|boss|director/.test(d+' '+p))return 'reviewing';
  return 'typing';
 };
 function jobKey(person){return [String(person?.currentJob||'').trim(),...(Array.isArray(person?.workload)?person.workload.slice(0,8).map(v=>String(v).trim()):[])].join('|').slice(0,400)}
 function hour(now=Date.now()){
  try {return Number(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kuala_Lumpur',hour:'2-digit',hourCycle:'h23'}).format(new Date(now)))}
  catch(_){return new Date(now).getHours()}
 }
 function daylight(now=Date.now()){
  const h=hour(now);
  if(h>=7&&h<11)return {label:'Morning',sun:2.8,hemi:2.35,fill:1.1,exposure:1.15,sunColor:'#fff0d4',ambientColor:'#fffaf0',background:'#faf9f5'};
  if(h>=11&&h<17)return {label:'Daylight',sun:3.2,hemi:2.4,fill:1.3,exposure:1.2,sunColor:'#fff7e9',ambientColor:'#fffef8',background:'#fafaf9'};
  if(h>=17&&h<20)return {label:'Evening',sun:2.1,hemi:2.15,fill:1.55,exposure:1.13,sunColor:'#ffdaa9',ambientColor:'#fff2e4',background:'#f7f4f1'};
  return {label:'Night · office lights',sun:1.2,hemi:2.2,fill:2.0,exposure:1.17,sunColor:'#ffd8a7',ambientColor:'#f9e8d8',background:'#f3f1f3'};
 }
 // Low-cost monitor activity glows; the screen materials are already in the 3D scene.
 let lastScreenGlow=0;
 function screenGlow(materials,now=Date.now()){
  if(!materials?.get||now-lastScreenGlow<110)return;
  lastScreenGlow=now;
  const base=materials.get('#e3ede7');
  if(base?.emissive){base.emissive.set('#9ecfc4');base.emissiveIntensity=.10+.035*Math.sin(now*.0013)}
  const accent=materials.get('#b5c6d0');
  if(accent?.emissive){accent.emissive.set('#a9c5d9');accent.emissiveIntensity=.06+.02*Math.sin(now*.0009)}
 }
 let lastLight=0,lastTone=null;
 function applyLighting(hemi,sun,fill,renderer,scene){
  const now=Date.now();
  if(hemi&&now-lastLight<600)return; // ~1Hz, avoid per-frame material work.
  if(hemi)lastLight=now;
  const tone=daylight(now),blend=.11;
  const lerp=(obj,key,to)=>{if(obj)obj[key]+=(to-obj[key])*blend};
  if(hemi){lerp(hemi,'intensity',tone.hemi);(hemi.color?.lerp?hemi.color.lerp(new hemi.color.constructor(tone.ambientColor),blend):hemi.color?.set?.(tone.ambientColor))}
  if(sun){lerp(sun,'intensity',tone.sun);(sun.color?.lerp?sun.color.lerp(new sun.color.constructor(tone.sunColor),blend):sun.color?.set?.(tone.sunColor))}
  if(fill)lerp(fill,'intensity',tone.fill);
  if(renderer)lerp(renderer,'toneMappingExposure',tone.exposure);
  if(scene?.background?.lerp)scene.background.lerp(new scene.background.constructor(tone.background),blend);
  else if(scene?.background?.set)scene.background.set(tone.background);
  if(badge&&tone.label!==lastTone){lastTone=tone.label;badge.textContent=`☀ ${tone.label}`;badge.title=`Simulated lighting · ${tone.label} (Malaysia time)`}
 }
 function chooseIntent(person,currentZone,now=Date.now()){
  const h=hour(now),home=['boss','staff','showroom'].includes(person?.homeRoom)?person.homeRoom:'staff';
  const active=!!jobKey(person),work=workFor(person),roll=Math.random();
  // Work is favored when real job data exists; break windows follow MY local time.
  if(currentZone!==home){return {zone:home,action:work,kind:'return'}}
  if(h<8||h>=21)return {zone:home,action:weightedPick(taskPalette(person,active)),kind:'work'};
  // Small break windows, never treating simulations as real attendance data.
  if(h>=12&&h<14&&roll<.49)return {zone:'pantry',action:'coffee',kind:'break'};
  if(h>=9&&h<18&&roll<.11)return {zone:'pantry',action:'coffee',kind:'break'};
  if(h>=9&&h<18&&roll<.18)return {zone:'showroom',action:'meeting',kind:'meeting'};
  if(h>=9&&h<18&&!active&&roll<.24)return {zone:'corridor',action:'chat',kind:'social'};
  // A weighted task rotation produces variety but real assigned work stays first.
  return {zone:home,action:weightedPick(taskPalette(person,active)),kind:'work'};
 }
 const sceneCache=new Map();
 let lastLivingController=null;
 function update(snapshot,positions){
  if(!Array.isArray(positions))return;
  // Calm compact activity overview; count illustrative simulation states only.
  const now=Date.now();
  ambienceEngine?.setActivity(positions);
  if(activityLabel&&now-lastSummary>2800){
   lastSummary=now;
   const walking=positions.filter(p=>p.walking).length;
   const chatting=positions.filter(p=>p.scene?.kind==='conversation'||p.scene?.kind==='huddle').length;
   const resting=positions.filter(p=>p.action==='coffee'&&!p.walking).length;
   activityLabel.textContent=`${walking} walking · ${chatting} social · ${resting} on break`;
  }
  const living=window.office3d;
  if(!living)return;
  if(living!==lastLivingController){sceneCache.clear();lastLivingController=living}
  const inUse=new Set();
  for(const p of positions){
   const s=p.scene;
   if(!s||!Number.isFinite(Number(s.from))||!Number.isFinite(Number(s.until)))continue;
   if(Date.now()<s.from||Date.now()>=s.until)continue;
   const id=Number(p.id),text=String(s.text||'').slice(0,65),tag=`${s.from}:${text}`;
   if(!text)continue;inUse.add(id);
   if(sceneCache.get(id)===tag)continue;
   sceneCache.set(id,tag);
   living?.showBubble?.(id,text,0,'living');
   if(s.kind==='job')living?.playEmote?.('wave',id);
  }
  for(const [id] of sceneCache)if(!inUse.has(id)){
   living?.clearBubble?.(id,'living');sceneCache.delete(id);
  }
 }
 let enabled=false,btn=null,badge=null,volumeControl=null,activityLabel=null,lastSummary=0,previewBtn=null,soundStatus=null;
 let volume=.55;
 try{const savedText=localStorage.getItem(VOLUME_STORAGE);if(savedText!==null){const saved=Number(savedText);if(Number.isFinite(saved)&&saved>=0&&saved<=1)volume=saved}}catch(_){}
 try{enabled=localStorage.getItem(STORAGE)==='on'}catch(_){}
 const ambienceEngine=window.KSOfficeAmbienceAudio?.create?.({onStatus:updateSoundStatus})||null;
 ambienceEngine?.setVolume(volume);
 if(enabled)ambienceEngine?.setEnabled(true,{gesture:false});
 function updateSoundStatus(state){
  if(soundStatus){
   const messages={'playing':'Office audio is playing','tap-to-start':'Click Ambience On or Preview to allow sound','paused':'Paused while tab is hidden','unsupported':'Audio is not supported in this browser','off':'Ambience muted'};
   soundStatus.textContent=messages[state]||'Office ambience ready';
   soundStatus.dataset.state=state;
  }
  syncButton();
 }
 function beginAudio(gesture=false){if(!enabled||document.hidden)return;return ambienceEngine?.start({gesture});}
 function stopAudio(temporary=false){ambienceEngine?.stop({temporary});}
 function setEnabled(value){
  enabled=!!value;
  try{localStorage.setItem(STORAGE,enabled?'on':'off')}catch(_){}
  ambienceEngine?.setEnabled(enabled,{gesture:true});
  syncButton();
 }
 function setVolume(value){
  volume=Math.max(0,Math.min(1,Number(value)||0));
  try{localStorage.setItem(VOLUME_STORAGE,String(volume))}catch(_){}
  ambienceEngine?.setVolume(volume);
  if(volumeControl)volumeControl.value=String(Math.round(volume*100));
 }
 function syncButton(){
  if(!btn)return;
  btn.textContent=enabled?'♫ Ambience on':'♫ Ambience off';
  btn.setAttribute('aria-pressed',String(enabled));
  btn.title=enabled?'Mute simulated office ambience':'Enable simulated office ambience';
  if(previewBtn)previewBtn.hidden=!enabled;
 }
 function attach(){
  if(document.getElementById('ksLivingControls'))return;
  const host=document.getElementById('office3dHost');if(!host)return;
  const controls=document.createElement('div');controls.id='ksLivingControls';controls.className='ks-living-controls';
  badge=document.createElement('span');badge.className='ks-living-daylight';
  btn=document.createElement('button');btn.type='button';btn.className='ks-living-audio';btn.setAttribute('aria-label','Toggle office ambience');
  btn.addEventListener('click',e=>{e.stopPropagation();setEnabled(!enabled)});
  previewBtn=document.createElement('button');previewBtn.type='button';previewBtn.className='ks-living-preview';previewBtn.textContent='▶ Preview';previewBtn.setAttribute('aria-label','Play a short office ambience sound preview');
  previewBtn.addEventListener('click',async e=>{e.stopPropagation();if(!enabled)setEnabled(true);await ambienceEngine?.preview();syncButton()});
  const volumeWrap=document.createElement('label');volumeWrap.className='ks-living-volume';volumeWrap.title='Office ambience volume';volumeWrap.setAttribute('aria-label','Office ambience volume');
  const small=document.createElement('span');small.textContent='Volume';
  volumeControl=document.createElement('input');volumeControl.type='range';volumeControl.min='0';volumeControl.max='100';volumeControl.step='5';volumeControl.value=String(Math.round(volume*100));volumeControl.setAttribute('aria-label','Ambient volume');
  volumeControl.addEventListener('input',e=>{e.stopPropagation();setVolume(Number(volumeControl.value)/100)});
  volumeControl.addEventListener('pointerdown',e=>e.stopPropagation());volumeWrap.append(small,volumeControl);
  activityLabel=document.createElement('span');activityLabel.className='ks-living-activity';activityLabel.textContent='Office warming up';activityLabel.setAttribute('aria-live','off');
  soundStatus=document.createElement('span');soundStatus.className='ks-living-sound-status';soundStatus.setAttribute('role','status');soundStatus.setAttribute('aria-live','polite');
  controls.append(badge,activityLabel,btn,previewBtn,volumeWrap,soundStatus);host.parentElement.appendChild(controls);
  syncButton();updateSoundStatus(enabled?'tap-to-start':'off');applyLighting(null,null,null,null,null);
 }
 // Unlock on the next genuine user gesture, including after a browser restores a tab.
 document.addEventListener('pointerdown',()=>{if(enabled)beginAudio(true)},{capture:true});
 document.addEventListener('keydown',()=>{if(enabled)beginAudio(true)},{capture:true});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAudio(true);else if(enabled)beginAudio(false)});
 window.addEventListener('pagehide',()=>ambienceEngine?.dispose(),{once:true});
 window.addEventListener('storage',ev=>{
  if(ev.key===STORAGE){try{enabled=localStorage.getItem(STORAGE)==='on'}catch(_){}ambienceEngine?.setEnabled(enabled,{gesture:false});syncButton()}
  else if(ev.key===VOLUME_STORAGE){try{const v=Number(localStorage.getItem(VOLUME_STORAGE));if(Number.isFinite(v)&&v>=0&&v<=1)setVolume(v)}catch(_){}}
 });
 window.OfficeLiving={ACTIONS,workFor,jobKey,jobReaction,hour,daylight,applyLighting,screenGlow,chooseIntent,taskPalette,weightedPick,greetings,huddles,coffeeLines,update,attach,isAmbientEnabled:()=>enabled,setAmbientEnabled:setEnabled,setAmbientVolume:setVolume,getAmbientVolume:()=>volume,getAmbientAudioState:()=>ambienceEngine?.state()||"unsupported",previewAmbientAudio:()=>ambienceEngine?.preview(),ambientSoundEngine:ambienceEngine};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',attach,{once:true});else attach();
})();
