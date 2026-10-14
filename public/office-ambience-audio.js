/* KIDZSTUDIOS Office Plus V81 - procedural, opt-in office ambience.
 * No copyrighted recordings, external downloads or speech synthesis.
 * Each browser keeps its own AudioContext and volume. Notification chimes are separate.
 */
(()=>{
 'use strict';
 const clamp=(n,min,max)=>Math.min(max,Math.max(min,Number(n)||0));
 const AudioCtor=()=>window.AudioContext||window.webkitAudioContext;
 function create({onStatus=()=>{}}={}){
  let context=null,master=null,sources=[],tickTimer=null,enabled=false,disposed=false;
  let volume=.55,activity={walking:0,working:0,chatting:0,meeting:0,coffee:0},lastTickAt=0;
  let status='off',generation=0;
  const notify=(value)=>{if(status!==value){status=value;onStatus(value)}};
  function cleanupGraph(){
   if(tickTimer!==null){clearInterval(tickTimer);tickTimer=null}
   for(const node of sources){try{node.stop()}catch(_){}try{node.disconnect()}catch(_){}}
   sources=[];
   if(master){try{master.disconnect()}catch(_){}master=null}
  }
  function state(){return status}
  function getContext(){return context}
  function makeBuffer(seconds=1){
   const len=Math.max(256,Math.round(context.sampleRate*seconds));
   const b=context.createBuffer(1,len,context.sampleRate),data=b.getChannelData(0);
   for(let k=0;k<len;k++)data[k]=Math.random()*2-1;
   return b;
  }
  function gain(level){const g=context.createGain();g.gain.value=level;return g}
  function filter(type,freq,q=.7){const f=context.createBiquadFilter();f.type=type;f.frequency.value=freq;f.Q.value=q;return f}
  function track(source){sources.push(source);return source}
  // No air-conditioning or fan loop: only sparse activity-triggered effects.
  function startBackground(){
   master=gain(.36*volume);master.connect(context.destination);
   tickTimer=setInterval(schedule,720);
  }
  // Most modern browsers require a fresh pointer/key gesture before context.resume().
  // Do not manufacture a gesture or claim success until state === 'running'.
  async function start({gesture=false}={}){
   if(disposed||!enabled)return false;
   if(document.hidden){notify('paused');return false}
   if(!AudioCtor()){notify('unsupported');return false}
   const myGeneration=generation;
   try{
    if(!context||context.state==='closed'){
     if(!gesture){notify('tap-to-start');return false}
     context=new (AudioCtor())();
    }
    if(context.state!=='running'){
     if(!gesture){notify('tap-to-start');return false}
     // resume() is called synchronously inside the initiating user gesture.
     await context.resume();
    }
    if(myGeneration!==generation||disposed||!enabled||document.hidden)return false;
    if(context.state!=='running'){notify('tap-to-start');return false}
    if(!master)startBackground();
    notify('playing');return true;
   }catch(error){cleanupGraph();notify('tap-to-start');return false}
  }
  function stop({temporary=false}={}){
   generation++;
   cleanupGraph();
   notify(enabled&&temporary?'paused':'off');
  }
  function setEnabled(next,{gesture=false}={}){
   enabled=Boolean(next);
   if(!enabled){stop();return Promise.resolve(false)}
   return start({gesture});
  }
  function setVolume(v){
   volume=clamp(v,0,1);
   if(master&&context?.state==='running')master.gain.setTargetAtTime(.36*volume,context.currentTime,.055);
   return volume;
  }
  function setActivity(positions=[]){
   if(!Array.isArray(positions))return;
   let walking=0,working=0,chatting=0,meeting=0,coffee=0;
   for(const p of positions){
    if(p.walking||p.action==='walking'){walking++;continue}
    const action=String(p.action||'');
    const scene=String(p.scene?.kind||'');
    if(['chat','conversation','calling'].includes(action)||scene==='conversation')chatting++;
    if(action==='meeting'||scene==='huddle'||scene==='meeting')meeting++;
    if(action==='coffee'||scene==='break')coffee++;
    if(['typing','designing','production','admin','reviewing','planning','reading'].includes(action))working++;
   }
   activity={walking,working,chatting,meeting,coffee};
  }
  // Short generated sounds share the same per-device master, avoiding an asset fetch.
  function transient(at,{frequency=1500,length=.075,level=.12,rate=1,buffer=null}={}){
   if(!context||!master||context.state!=='running')return;
   const src=context.createBufferSource();src.buffer=buffer||makeBuffer(.14);src.playbackRate.value=rate;
   const bp=filter('bandpass',frequency,.8),env=context.createGain();
   env.gain.setValueAtTime(.00001,at);
   env.gain.linearRampToValueAtTime(level,at+.004);
   env.gain.exponentialRampToValueAtTime(.00001,at+length);
   src.connect(bp);bp.connect(env);env.connect(master);
   src.start(at);src.stop(at+Math.min(.13,length+.012));
   src.onended=()=>{try{src.disconnect();bp.disconnect();env.disconnect()}catch(_){}};
  }
  function typeBurst(at=context.currentTime+.012){
   const count=2+Math.floor(Math.random()*3),buffer=makeBuffer(.14);
   for(let k=0;k<count;k++)transient(at+k*(.075+Math.random()*.045),{frequency:1700+Math.random()*1100,length:.032+Math.random()*.025,level:.10+Math.random()*.075,rate:.8+Math.random()*.35,buffer});
   if(Math.random()<.34)transient(at+.3,{frequency:950,length:.045,level:.09,buffer}); // mouse click
  }
  function step(at=context.currentTime+.012){
   for(const offset of [0,.31]){
    const t=at+offset,src=context.createOscillator(),g=context.createGain();
    src.type='sine';src.frequency.setValueAtTime(125,t);src.frequency.exponentialRampToValueAtTime(78,t+.095);
    g.gain.setValueAtTime(.00001,t);g.gain.linearRampToValueAtTime(.11,t+.012);g.gain.exponentialRampToValueAtTime(.00001,t+.11);
    src.connect(g);g.connect(master);src.start(t);src.stop(t+.125);
    src.onended=()=>{try{src.disconnect();g.disconnect()}catch(_){}};
    transient(t,{frequency:410,length:.055,level:.11});
   }
  }
  function murmur(at=context.currentTime+.02){
   // Nonverbal, heavily filtered synthetic vowels, NOT intelligible conversations.
   const base=150+Math.random()*65;
   const src=context.createOscillator(),env=context.createGain(),lp=filter('lowpass',640);
   src.type='triangle';src.frequency.setValueAtTime(base,at);
   src.frequency.linearRampToValueAtTime(base*(.92+Math.random()*.18),at+.38);
   env.gain.setValueAtTime(.00001,at);
   env.gain.linearRampToValueAtTime(.025,at+.09);
   env.gain.setValueAtTime(.025,at+.17);
   env.gain.linearRampToValueAtTime(.007,at+.24);
   env.gain.linearRampToValueAtTime(.019,at+.31);
   env.gain.exponentialRampToValueAtTime(.00001,at+.52);
   src.connect(lp);lp.connect(env);env.connect(master);src.start(at);src.stop(at+.53);
   src.onended=()=>{try{src.disconnect();lp.disconnect();env.disconnect()}catch(_){}};
  }
  function schedule(){
   if(!enabled||document.hidden||!master||context?.state!=='running')return;
   // Activity-aware effects are sparse, with no continuous air-conditioning or fan noise.
   const a=activity,r=Math.random(),time=context.currentTime+.025;
   if((a.chatting||a.meeting)&&r<.14)murmur(time);
   else if(a.walking&&r<.36)step(time);
   else if(a.working&&r<.69)typeBurst(time);
   else if(a.coffee&&r<.78)transient(time,{frequency:740,length:.06,level:.075});
   else if(a.working&&r<.83)transient(time,{frequency:1250,length:.039,level:.08});
   lastTickAt=Date.now();
  }
  // A quick audible check immediately after clicking the Preview button.
  async function preview(){
   if(!enabled)enabled=true;
   const ok=await start({gesture:true});
   if(!ok||!master)return false;
   typeBurst(context.currentTime+.035);step(context.currentTime+.47);murmur(context.currentTime+1.22);
   return true;
  }
  function dispose(){disposed=true;enabled=false;stop();if(context?.state!=='closed')try{context?.close?.()?.catch?.(()=>{})}catch(_){}context=null}
  return {start,setEnabled,setVolume,setActivity,preview,stop,dispose,state,getContext,isEnabled:()=>enabled,getVolume:()=>volume,getActivity:()=>({...activity})};
 }
 window.KSOfficeAmbienceAudio={create};
})();
