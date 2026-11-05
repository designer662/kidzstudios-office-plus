/* KIDZSTUDIOS Office Plus V86.49: deterministic, furniture/route-aware autonomous staff decisions.
 * Goal-based SIMULATION, not an LLM or a judgement about actual employee behaviour.
 * Only the elected movement leader calls decide/record; followers replay shared actions.
 */
(()=>{
 'use strict';
 const HOME=new Set(['boss','staff','showroom']);
 const ZONES=new Set(['boss','staff','showroom','corridor','pantry','store','prayer']);
 const ACTIONS=new Set(['pc-work','designing','reviewing','production','calling','admin','planning','reading','stretching','stocking','drink','eat','chat','meeting']);
 const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
 const validHome=person=>HOME.has(person?.homeRoom)?person.homeRoom:'staff';
 const hash=(id,time,salt=0)=>{
  let x=(Math.imul(Number(id)||1,2654435761)^Math.floor(time/23000)^Math.imul(salt+7,2246822519))>>>0;
  x^=x>>>16;x=Math.imul(x,2246822507);x^=x>>>13;x=Math.imul(x,3266489909);x^=x>>>16;
  return (x>>>0)/4294967296;
 };
 const roleFor=person=>{
  const role=`${person?.department||''} ${person?.position||''} ${person?.role||''}`.toLowerCase();
  if(/design|creative|artwork/.test(role))return 'design';
  if(/production|print|warehouse/.test(role))return 'production';
  if(/sales|marketing|customer/.test(role))return 'sales';
  if(/director|management|boss|manager/.test(role))return 'management';
  if(/finance|account/.test(role))return 'finance';
  if(/admin|operations|office assistant/.test(role))return 'administration';
  return 'operations';
 };
 function memory(value,now=Date.now()){
  const ai=value&&typeof value==='object'?value:{};
  return {
   v:1,at:Number.isFinite(+ai.at)?Math.min(now,Math.max(0,+ai.at)):now,
   focus:clamp(Number.isFinite(+ai.focus)?+ai.focus:.66),
   energy:clamp(Number.isFinite(+ai.energy)?+ai.energy:.72),
   social:clamp(Number.isFinite(+ai.social)?+ai.social:.48),
   curiosity:clamp(Number.isFinite(+ai.curiosity)?+ai.curiosity:.60),
   lastZone:ZONES.has(ai.lastZone)?ai.lastZone:null,
   lastAction:ACTIONS.has(ai.lastAction)?ai.lastAction:null,
   streak:Math.max(0,Math.min(12,Math.floor(+ai.streak||0))),
   decisions:Math.max(0,Math.min(1000000,Math.floor(+ai.decisions||0)))
  };
 }
 // The needs are animated simulation values, not measurements of real employees.
 function evolved(raw,now,working){
  const m=memory(raw,now),minutes=clamp((now-m.at)/60000,0,12);
  m.focus=clamp(m.focus+(working?-.016:.020)*minutes);
  m.energy=clamp(m.energy+(working?-.012:.028)*minutes);
  m.social=clamp(m.social+(working?.010:-.016)*minutes);
  m.curiosity=clamp(m.curiosity+(working?.009:-.014)*minutes);
  m.at=now;
  return m;
 }
 function workChoice(person,role,at,streak,hasWork){
  const options={
   design:['designing','pc-work','reviewing','planning'],
   production:['production','pc-work','reviewing','planning'],
   sales:['calling','pc-work','planning','reviewing'],
   management:['reviewing','planning','calling','pc-work'],
   finance:['admin','reviewing','pc-work','planning'],
   administration:['admin','pc-work','reviewing','planning'],
   operations:['pc-work','reviewing','reading','planning']
  }[role];
  if(hasWork&&streak<2)return options[0];
  return options[Math.floor(hash(person?.id,at,streak+13)*options.length)];
 }
 const GOALS={
  pantry:{zone:'pantry',action:'drink',kind:'break',reason:'☕ Taking a coffee break'},
  corridor:{zone:'corridor',action:'chat',kind:'social',reason:'💬 Checking in with colleagues'},
  showroom:{zone:'showroom',action:'meeting',kind:'meeting',reason:'💡 Reviewing ideas in the showroom'},
  store:{zone:'store',action:'stocking',kind:'work',reason:'📦 Checking materials and stock'},
  prayer:{zone:'prayer',action:'reading',kind:'break',reason:'📖 Taking a quiet break'}
 };
 function decide(person,staff,snapshot,now=Date.now(),context={}){
  const home=validHome(person),role=roleFor(person),hasWork=!!context.hasWork;
  const zone=staff?.room||home;
  const available=typeof context.available==='function'?context.available:()=>true;
  const sinceWalk=Math.max(0,now-(Number(staff?.lastWalkAt)||now));
  const previous=evolved(staff?.ai,now,zone===home);
  const action=workChoice(person,role,now,previous.streak,hasWork);
  const work={zone:home,action,kind:'work',reason:({design:'🎨 Working on artwork',production:'🖨 Preparing production',sales:'📞 Following up on customers',management:'📋 Reviewing projects',finance:'🗂 Checking records',administration:'🗃 Organizing office work',operations:'💻 Working at the desk'})[role]};
  // All off-desk routes return through the collision-safe planner; no teleporting to the chair.
  if(zone!==home)return {intent:{...work,kind:'return'},candidates:[],brain:previous};
  const scoreWork=(hasWork?80:57)+previous.focus*21-(1-previous.energy)*13-Math.min(30,previous.streak*7)-(sinceWalk>115000?65:0);
  const ranked=[{...work,score:scoreWork}];
  // Showroom-based staff can inspect the real sample table even when it is in
  // their home room. A same-room interaction still needs a walking route.
  if(home==='showroom'&&sinceWalk>65000&&available('showroom'))
   ranked.push({zone:'showroom',action:'meeting',kind:'equipment',reason:'👕 Reviewing showroom samples',score:scoreWork+34});
  for(const key of ['pantry','corridor','showroom','store','prayer']){
   const item=GOALS[key];
   if(item.zone===home||!available(item.zone))continue;
   const affinity=key==='store'?(role==='production'?33:role==='operations'?15:-15):
    key==='showroom'?(role==='design'||role==='sales'||role==='management'?27:6):
    key==='corridor'?(role==='sales'?17:10):key==='pantry'?9:0;
   const need=key==='pantry'?(1-previous.energy)*37:key==='corridor'?previous.social*36:
    key==='prayer'?(1-previous.focus)*26:key==='store'?previous.curiosity*22:previous.curiosity*29;
   const elapsed=sinceWalk>115000?58:sinceWalk>65000?21:0;
   const recent=(staff.lastTripZone===key&&now-(Number(staff.lastTripAt)||0)<165000)?45:0;
   const repeated=(previous.lastZone===key?21:0);
   const jitter=(hash(person?.id,now,['pantry','corridor','showroom','store','prayer'].indexOf(key))*16)-8;
   ranked.push({...item,score:31+affinity+need+elapsed-recent-repeated+jitter});
  }
  // Workday rhythm only nudges simulated goals, never bypasses route safety.
  const routine=window.OfficeAIRoutine;
  if(routine)for(const goal of ranked)goal.score+=routine.bias(goal,person,now);
  ranked.sort((a,b)=>b.score-a.score||a.zone.localeCompare(b.zone));
  // Candidate fallback follows the ranked preference without altering the selected goal.
  const candidates=ranked.map(({score,...intent})=>intent);
  return {intent:candidates[0]||work,candidates,brain:previous};
 }
 function record(staff,intent,now=Date.now()){
  const m=evolved(staff?.ai,now,intent?.kind==='work');
  const zone=ZONES.has(intent?.zone)?intent.zone:null;
  const action=ACTIONS.has(intent?.action)?intent.action:'pc-work';
  m.streak=zone===m.lastZone?Math.min(12,m.streak+1):0;
  m.lastZone=zone;m.lastAction=action;m.decisions++;m.at=now;
  if(intent?.kind==='work'||intent?.kind==='return'){
   m.energy=clamp(m.energy-.025);m.focus=clamp(m.focus-.015);m.social=clamp(m.social+.045);
  }else if(intent?.kind==='social'){
   m.social=clamp(m.social-.28);m.focus=clamp(m.focus+.06);
  }else if(intent?.kind==='break'){
   m.energy=clamp(m.energy+.22);m.focus=clamp(m.focus+.14);
  }else if(intent?.kind==='meeting'){
   m.curiosity=clamp(m.curiosity-.24);m.focus=clamp(m.focus+.05);
  }else if(zone==='store')m.curiosity=clamp(m.curiosity-.20);
  staff.ai=m;
  return m;
 }
 function initUI(){
  if(document.getElementById('ksSmartAIStatus'))return;
  const host=document.getElementById('office3dHost');if(!host?.parentElement)return;
  const label=document.createElement('span');label.id='ksSmartAIStatus';
  label.textContent='🧠 Smart AI active';
  label.title='Goal-based simulated staff: role-aware activities, destination memory and collision-safe shared movement. Not a real employee activity monitor or cloud AI.';
  label.setAttribute('aria-label','Smart AI character simulation enabled');
  label.style.cssText='position:absolute;bottom:12px;left:12px;z-index:8;padding:5px 10px;border:1px solid #b9d8cb;border-radius:999px;background:rgba(255,255,255,.92);color:#225a47;font:600 11px system-ui,sans-serif;pointer-events:none;max-width:min(80vw,320px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-shadow:0 2px 8px #0001;';
  const parent=host.parentElement;
  if(typeof getComputedStyle==='function'&&getComputedStyle(parent).position==='static')parent.style.position='relative';
  parent.appendChild(label);
  const controls=document.createElement('div');controls.id='ksSmartAIControls';
  controls.style.cssText='position:absolute;bottom:42px;left:12px;z-index:9;display:flex;gap:5px;flex-wrap:wrap;max-width:calc(100% - 24px);';
  let resetGuardTimer=null;
  for(const [target,caption] of [['all','Reset All AI']]){
   const button=document.createElement('button');button.type='button';
   button.textContent=caption;button.dataset.target=target;
   button.setAttribute('aria-label',caption+' movement simulation');
   button.style.cssText='border:1px solid #b9d8cb;border-radius:9px;padding:5px 8px;background:#fff;color:#225a47;cursor:pointer;font:600 11px system-ui,sans-serif;box-shadow:0 2px 8px #0001';
   button.addEventListener('click',()=>{
    if(target==='all'&&!window.confirm('Reset movement and AI activity for ALL staff? Job records and staff profiles will remain unchanged.'))return;
    for(const btn of controls.querySelectorAll('button[data-target]'))btn.disabled=true;
    label.textContent='🧠 Resetting Smart AI…';
    clearTimeout(resetGuardTimer);
    resetGuardTimer=setTimeout(()=>{for(const btn of controls.querySelectorAll('button[data-target]'))btn.disabled=false;label.textContent='AI reset response delayed. Check staff state before retrying.';},15000);
    window.dispatchEvent(new CustomEvent('ks:smart-ai-reset-request',{detail:{target}}));
   });
   controls.appendChild(button);
  }
  const notice=document.createElement('span');notice.id='ksSmartAIResetMessage';
  notice.style.cssText='font:600 11px/1.4 system-ui,sans-serif;color:#225a47;background:#fffffff5;padding:5px 8px;border:1px solid #b9d8cb;border-radius:8px;display:none';
  controls.appendChild(notice);
  parent.appendChild(controls);
  const toggle=document.createElement('button');toggle.type='button';toggle.textContent='AI Monitor';
  toggle.id='ksAIMonitorToggle';toggle.setAttribute('aria-expanded','false');
  toggle.style.cssText='border:1px solid #b9d8cb;border-radius:9px;padding:5px 8px;background:#fff;color:#225a47;cursor:pointer;font:600 11px system-ui,sans-serif;';
  controls.appendChild(toggle);
  const monitor=document.createElement('section');monitor.id='ksAIMonitor';monitor.hidden=true;
  monitor.setAttribute('aria-label','Live office AI simulation diagnostics');
  monitor.style.cssText='position:absolute;bottom:82px;left:12px;z-index:12;max-width:min(95vw,390px);width:355px;max-height:min(60vh,480px);overflow:auto;background:#fff;color:#1d3f34;border:1px solid #b9d8cb;border-radius:12px;box-shadow:0 6px 30px #0003;padding:12px;font:12px/1.45 system-ui,sans-serif;';
  const heading=document.createElement('div');heading.textContent='Smart AI · Movement Monitor';heading.style.cssText='font-weight:750;font-size:14px;margin-bottom:7px;';
  const health=document.createElement('div');health.id='ksAIHealth';health.textContent='Awaiting simulation state…';health.style.marginBottom='8px';
  const picker=document.createElement('select');picker.id='ksAIStaffPick';picker.setAttribute('aria-label','Choose simulated staff');picker.style.cssText='padding:6px;max-width:100%;margin-right:5px';
  const zonePicker=document.createElement('select');zonePicker.id='ksAIZonePick';zonePicker.setAttribute('aria-label','Choose safe destination');zonePicker.style.cssText='padding:6px;max-width:100%';
  for(const zone of ['corridor','pantry','showroom','store','prayer','boss','staff']){
   const option=document.createElement('option');option.value=zone;option.textContent=zone;zonePicker.appendChild(option);
  }
  const move=document.createElement('button');move.type='button';move.textContent='Plan safe move';move.style.cssText='margin:8px 0;border-radius:7px;padding:7px;background:#225a47;color:white;border:0;cursor:pointer';
  const details=document.createElement('div');details.id='ksAIStaffDetails';details.setAttribute('aria-live','polite');
  const route=document.createElement('div');route.id='ksAIRoutePreview';
  const result=document.createElement('div');result.id='ksAICommandResult';result.setAttribute('role','status');
  monitor.append(heading,health,picker,zonePicker,move,details,route,result);parent.appendChild(monitor);
  let latest=null;
  const redraw=()=>{
   if(!latest||monitor.hidden)return;
   const s=latest.staff.find(row=>String(row.id)===picker.value);
   if(!s){details.textContent='Choose a staff member';route.replaceChildren();return}
   details.textContent=`${s.phase.toUpperCase()} · ${s.label} · Room: ${s.zone}${s.targetZone?' → '+s.targetZone:''} · Failed routes: ${s.failedRoutes} · Waiting: ${s.waitingSeconds}s`;
   // Plan coordinates rendered in an isolated SVG. Never insert remote HTML.
   route.replaceChildren();
   if(s.route?.length>1){
    const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');
    svg.setAttribute('viewBox','0 0 230 700');svg.setAttribute('width','115');svg.setAttribute('height','210');svg.setAttribute('role','img');svg.setAttribute('aria-label','Reserved route floor plan');
    const path=document.createElementNS(ns,'polyline');path.setAttribute('points',s.route.map(p=>`${Math.max(0,Math.min(23,+p.x))*10},${Math.max(0,Math.min(70,+p.y))*10}`).join(' '));
    path.setAttribute('fill','none');path.setAttribute('stroke','#16795c');path.setAttribute('stroke-width','8');path.setAttribute('stroke-linecap','round');svg.appendChild(path);route.appendChild(svg);
   }
  };
  toggle.addEventListener('click',()=>{monitor.hidden=!monitor.hidden;toggle.setAttribute('aria-expanded',String(!monitor.hidden));redraw()});
  picker.addEventListener('change',redraw);
  let moveGuardTimer=null;
  move.addEventListener('click',()=>{
   const staffId=Number(picker.value);if(!Number.isInteger(staffId))return;
   move.disabled=true;result.textContent='Checking safe movement route…';
   clearTimeout(moveGuardTimer);
   moveGuardTimer=setTimeout(()=>{move.disabled=false;result.textContent='Movement request timed out. You can retry safely.';},12000);
   window.dispatchEvent(new CustomEvent('ks:smart-ai-force-move',{detail:{id:staffId,zone:zonePicker.value}}));
  });
  window.addEventListener('ks:smart-ai-force-result',event=>{
   clearTimeout(moveGuardTimer);moveGuardTimer=null;
   move.disabled=false;result.textContent=(event.detail?.ok?'✓ ':'⚠ ')+(event.detail?.message||'Command finished');
  });
  window.addEventListener('ks:ai-diagnostics',event=>{
   latest=event.detail;if(monitor.hidden)return;
   health.textContent=`${latest?.online?'Synced':'Offline / reconnecting'} · ${latest?.leader?'Leader':'Follower'} · Timeline v${latest?.version||0}`;
   const old=picker.value,ids=new Set((latest?.staff||[]).map(s=>String(s.id)));
   if(picker.options.length!==ids.size||[...picker.options].some(o=>!ids.has(o.value))){
    picker.replaceChildren();const people=window.OfficeSuite?.sharedMovement?.getPeople?.()||[];
    for(const s of latest.staff||[]){const opt=document.createElement('option');opt.value=String(s.id);opt.textContent=people.find(p=>Number(p.id)===s.id)?.name||`Staff ${s.id}`;picker.appendChild(opt)}
    if(ids.has(old))picker.value=old;
   }
   redraw();
  });
  let noticeTimeout;
  window.addEventListener('ks:smart-ai-reset-result',event=>{
   clearTimeout(resetGuardTimer);resetGuardTimer=null;
   for(const btn of controls.querySelectorAll('button[data-target]'))btn.disabled=false;
   const message=(event.detail?.ok?'✅ ':'⚠️ ')+(event.detail?.message||'Smart AI reset finished');
   label.textContent=message;notice.textContent=message;notice.style.display='inline-block';
   clearTimeout(noticeTimeout);noticeTimeout=setTimeout(()=>{notice.style.display='none'},8000);
  });
  window.OfficeFurnitureInteractions?.status?.('loading');
 }
 window.OfficeSmartAI={version:'86.49',roleFor,memory,evolved,decide,record,initUI};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initUI,{once:true});else initUI();
})();
