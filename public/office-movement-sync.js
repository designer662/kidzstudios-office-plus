/* Office Plus V79: Shared movement + living behavior timeline, one CAS-elected planner, many local renderers.
 * Uses existing authenticated /api/state endpoint + ks_shared_state realtime signals.
 * No per-frame network writes and no changes to local camera controls.
 */
(()=>{
  'use strict';
  const SCOPE='office:movement:v1';
  const LEASE_MS=18000,HEARTBEAT_MS=5500,POLL_MS=2900,TICK_MS=850;
  const id=globalThis.crypto?.randomUUID?.()||`office-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const motion=window.OfficeSuite?.sharedMovement;
  const living=window.OfficeLiving;
  if(!motion)return;
  // Do not run an independent simulation while waiting for authentication/network.
  motion.enable();
  let state=null,version=0,leader=false,lastSave=0,writing=false,reading=false,authorized=false,stopped=false;
  let refreshTimer=null,heartbeatTimer=null,frame=null,signalTimer=null,failedReads=0;
  const clone=p=>JSON.parse(JSON.stringify(p));
  const point=p=>p&&Number.isFinite(+p.x)&&Number.isFinite(+p.y)&&+p.x>=0&&+p.x<=23&&+p.y>=0&&+p.y<=70;
  const livePeople=()=>motion.getPeople();
  const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
  function staffBase(e,now){
    const x=Number(e.visualX??e.x),y=Number(e.visualY??e.y);
    const work=living?.workFor(e)||'typing';
    return {id:Number(e.id),x:clamp(x,0,23),y:clamp(y,0,70),room:e.visualRoomId||e.roomId||'staff',action:work,jobKey:living?.jobKey(e)||'',socialAt:0,nextAt:now+8000+Number(e.id)*1200+Math.random()*11000,walk:null};
  }
  function validStaff(a){
    return Array.isArray(a)&&a.length<=100&&a.every(s=>Number.isInteger(Number(s.id))&&Number.isFinite(Number(s.nextAt))&&point(s)&&(!s.scene||(
      typeof s.scene.text==='string'&&s.scene.text.length<=80&&Number.isFinite(Number(s.scene.from))&&Number.isFinite(Number(s.scene.until))&&s.scene.until>=s.scene.from
    ))&&(!s.walk||(
      Number.isFinite(Number(s.walk.startedAt))&&Number.isFinite(Number(s.walk.endAt))&&
      point(s.walk.from)&&Array.isArray(s.walk.route)&&s.walk.route.length<=250&&s.walk.route.every(point)&&
      Array.isArray(s.walk.segmentMs)&&s.walk.segmentMs.length===s.walk.route.length&&
      s.walk.segmentMs.every(n=>Number.isFinite(+n)&&+n>=100&&+n<120000)
    )));
  }
  function validPayload(p){return p&&p.schema===1&&typeof p.owner==='string'&&Number.isFinite(Number(p.leaseUntil))&&validStaff(p.staff)}
  function seed(now){return {schema:1,owner:id,leaseUntil:now+LEASE_MS,updatedAt:now,staff:livePeople().map(e=>staffBase(e,now))}}
  function movementAt(s,now){
    const w=s.walk;
    const scene=s.scene&&now>=s.scene.from&&now<s.scene.until?s.scene:null;
    const faceTo=['conversation','huddle'].includes(scene?.kind)?s.faceTo||null:null;
    if(!w||!w.route?.length)return {id:s.id,x:s.x,y:s.y,room:s.room,action:s.action,walking:false,scene,faceTo};
    let left=clamp(now-Number(w.startedAt),0,Number(w.endAt)-Number(w.startedAt));
    let previous=w.from;
    for(let i=0;i<w.route.length;i++){
      const ms=Number(w.segmentMs[i]),end=w.route[i];
      if(left<ms){
       const raw=clamp(left/ms,0,1);
       // Gentle acceleration and braking at the very ends of the route,
       // without changing waypoint arrival times on any device.
       const edge=.12;
       const t=i===0&&raw<edge?edge*(2*(raw/edge)**2-(raw/edge)**3):
         i===w.route.length-1&&raw>1-edge?1-edge*(2*((1-raw)/edge)**2-((1-raw)/edge)**3):raw;
       return {id:s.id,x:previous.x+(end.x-previous.x)*t,y:previous.y+(end.y-previous.y)*t,room:s.room,action:'walking',walking:now<w.endAt,scene,faceTo:null};
      }
      left-=ms;previous=end;
    }
    const final=w.seatGoal&&point(w.seatGoal)?w.seatGoal:previous;
    return {id:s.id,x:final.x,y:final.y,room:w.targetZone||s.room,action:w.action||'typing',walking:false,scene,faceTo};
  }
  function render(){
    if(stopped)return;
    if(state&&validPayload(state)){
      const now=Date.now(),positions=state.staff.map(s=>movementAt(s,now));
      motion.render(positions);
      living?.update?.(state,positions);
    }
    if(!document.hidden)frame=requestAnimationFrame(render);else frame=null;
  }
  function beginAnimation(){if(frame==null&&!document.hidden)frame=requestAnimationFrame(render)}
  function reconciled(snapshot,now){
    const current=livePeople(),known=new Set(current.map(e=>Number(e.id)));
    const original=snapshot.staff.length;
    snapshot.staff=snapshot.staff.filter(s=>known.has(Number(s.id)));
    let changed=snapshot.staff.length!==original;
    const existing=new Set(snapshot.staff.map(s=>Number(s.id)));
    for(const e of current)if(!existing.has(Number(e.id))){snapshot.staff.push(staffBase(e,now));changed=true}
    return changed;
  }
  // Shared behavior state is planned only by the elected leader and persisted
  // in the same CAS-protected timeline as walking. Browsers only replay it.
  function attachWalk(s,plan,intent,now){
    if(!plan||!point(plan.from)||!Array.isArray(plan.route)||!plan.route.length||!plan.route.every(point)||!Array.isArray(plan.segmentMs)||plan.segmentMs.length!==plan.route.length)return false;
    const segmentMs=plan.segmentMs.map(ms=>Math.round(clamp(Number(ms),850,40000)));
    const duration=segmentMs.reduce((sum,ms)=>sum+ms,0);
    s.x=plan.from.x;s.y=plan.from.y;
    s.walk={from:plan.from,route:plan.route,segmentMs,startedAt:now,endAt:now+duration,
      targetZone:plan.targetZone,seatGoal:point(plan.seatGoal)?plan.seatGoal:null,action:intent?.action||'typing'};
    s.action='walking';s.faceTo=null;s.nextAt=now+duration+14000;
    return true;
  }
  function pairConversation(snapshot,subject,now){
    if(!living||subject.room==='corridor'||subject.room==='pantry'||(subject.socialAt&&now-subject.socialAt<120000)||subject.scene?.kind==='job')return false;
    const others=snapshot.staff.filter(s=>s!==subject&&!s.walk&&s.room!=='pantry'&&s.room!=='corridor'&&s.nextAt<now+15000&&(!s.socialAt||now-s.socialAt>120000)&&s.scene?.kind!=='job');
    if(!others.length)return false;
    const partner=others[Math.floor(Math.random()*others.length)];
    // Rotate between two verified corridor pairs to avoid a stationary crowd.
    const locations=[[{x:8.6,y:40.3},{x:9.8,y:40.3}],[{x:8.6,y:50.2},{x:9.8,y:50.2}]];
    const targets=locations[Math.floor(Math.random()*locations.length)];
    const p1=motion.plan(Number(subject.id),'corridor',targets[0]),p2=motion.plan(Number(partner.id),'corridor',targets[1]);
    if(!p1||!p2)return false;
    const complete=(p)=>now+p.segmentMs.reduce((a,b)=>a+Math.round(clamp(Number(b),850,40000)),0);
    const meetAt=Math.max(complete(p1),complete(p2))+700;
    const huddle=Math.random()<.42;
    const words=huddle?(living.huddles||['🗓 Project huddle'])[Math.floor(Math.random()*(living.huddles?.length||1))]:living.greetings[Math.floor(Math.random()*living.greetings.length)]||'💬 Team check-in';
    const kind=huddle?'huddle':'conversation';
    for(const [person,plan]of [[subject,p1],[partner,p2]]){
      attachWalk(person,plan,{action:huddle?'meeting':'chat'},now);
      person.faceTo=person===subject?Number(partner.id):Number(subject.id);
      person.scene={kind,text:words,from:meetAt,until:meetAt+12000};
      person.socialAt=now;
      person.nextAt=meetAt+15500;
    }
    return true;
  }
  function evolve(snapshot,now){
    let changed=reconciled(snapshot,now);
    const people=new Map(livePeople().map(p=>[Number(p.id),p]));
    // React only when genuine job/workload data changes, not to guessed jobs.
    for(const s of snapshot.staff){
      const employee=people.get(Number(s.id));if(!employee)continue;
      const fingerprint=living?.jobKey(employee)||'';
      if(s.jobKey===undefined){s.jobKey=fingerprint;changed=true}
      else if(s.jobKey!==fingerprint){
        s.jobKey=fingerprint;changed=true;
        s.scene=fingerprint?{kind:'job',text:living?.jobReaction?.(employee)||'📋 New work assignment',from:now,until:now+8000}:null;
        if(!s.walk){s.action=living?.workFor(employee)||'typing';s.nextAt=now+9000}
      }
      if(s.scene&&s.scene.until<=now){s.scene=null;changed=true}
      if(s.walk&&s.walk.endAt<=now){
        const p=movementAt(s,now);
        s.x=p.x;s.y=p.y;s.room=p.room;s.action=p.action;
        s.walk=null;
        s.nextAt=['conversation','huddle'].includes(s.scene?.kind)?Math.max(now+3000,s.scene.until+2600):
          s.scene?.kind==='break'?Math.max(now+3500,s.scene.until+1000):
          s.scene?.kind==='meeting'?Math.max(now+3500,s.scene.until+1200):now+(s.room==='pantry'?17000:19000)+Math.random()*15000;
        changed=true;
      }
    }
    let walkers=snapshot.staff.filter(s=>s.walk&&s.walk.endAt>now).length;
    for(const s of snapshot.staff){
      if(s.walk||s.nextAt>now||walkers>=2)continue;
      const employee=people.get(Number(s.id));if(!employee)continue;
      // Small synchronized social interlude; only when two movement slots exist.
      if(walkers===0&&Math.random()<.15&&pairConversation(snapshot,s,now)){walkers+=2;changed=true;continue}
      const intent=living?.chooseIntent(employee,s.room,now)||{zone:s.room==='staff'?'pantry':'staff',action:'typing',kind:'work'};
      const work=living?.workFor(employee)||'typing';
      if(intent.zone===((['boss','staff','showroom'].includes(employee.homeRoom))?employee.homeRoom:'staff')&&s.room===intent.zone){
        // Desk / idle animation changes without moving the character through furniture.
        s.action=intent.action||work;
        if(intent.kind==='meeting')s.scene={kind:'meeting',text:'🗓 Planning at the project desk',from:now,until:now+12500};
        s.nextAt=now+13000+Math.random()*19000;
        changed=true;continue;
      }
      motion.render([movementAt(s,now)]);
      const plan=motion.plan(Number(s.id),intent.zone);
      if(!attachWalk(s,plan,intent,now)){
        s.nextAt=now+10000+Math.random()*6000;changed=true;continue;
      }
      if(intent.kind==='meeting'){
        s.scene={kind:'meeting',text:'🗓 Reviewing a team project',from:s.walk.endAt,until:s.walk.endAt+13000};
        s.nextAt=s.walk.endAt+15000;
      }else if(intent.kind==='break'){
        const lines=living?.coffeeLines||['☕ Coffee break'];
        s.scene={kind:'break',text:lines[Math.floor(Math.random()*lines.length)],from:s.walk.endAt,until:s.walk.endAt+17000};
        s.nextAt=s.walk.endAt+19000;
      }
      walkers++;changed=true;
    }
    return changed;
  }
  async function api(method,body){
    const options={method,headers:{accept:'application/json'},cache:'no-store'};
    if(body){options.headers['content-type']='application/json';options.body=JSON.stringify(body)}
    const url=method==='GET'?`/api/state?scope=${encodeURIComponent(SCOPE)}`:'/api/state';
    const response=await fetch(url,options);
    let payload=null;try{payload=await response.json()}catch{}
    return {status:response.status,data:payload};
  }
  function accept(row){
    if(!row||!validPayload(row.payload)||!Number.isFinite(Number(row.version)))return false;
    const nextVersion=Number(row.version);
    if(nextVersion<version)return false;
    state=clone(row.payload);version=nextVersion;
    leader=state.owner===id&&state.leaseUntil>Date.now();
    beginAnimation();return true;
  }
  async function save(payload,expectedVersion){
    if(writing||!authorized||stopped)return false;
    writing=true;
    try{
      const now=Date.now(),next=clone(payload);
      next.updatedAt=now;next.leaseUntil=now+LEASE_MS;
      next.owner=id;
      const res=await api('PUT',{scope:SCOPE,payload:next,clientId:id,expectedVersion});
      if(res.status!==200){leader=false;if(res.status===409)queueRefresh(0);return false}
      const ok=accept(res.data);
      if(ok)lastSave=Date.now();
      return ok;
    }catch(error){leader=false;return false}finally{writing=false}
  }
  async function refresh(){
    if(reading||writing||!authorized||stopped)return;
    reading=true;
    try{
      const {status,data}=await api('GET');
      if(status===404){
        reading=false;
        await save(seed(Date.now()),0);return;
      }
      if(status!==200||!validPayload(data?.payload)){failedReads++;return}
      failedReads=0;
      accept(data);
      const now=Date.now();
      if(state.leaseUntil<=now&&!document.hidden){
        // Optimistic CAS means only one PC can acquire/renew authority.
        const takeOver=clone(state);
        await save(takeOver,version);
      }
    }catch(error){failedReads++}finally{reading=false}
  }
  function queueRefresh(delay=250){
    if(signalTimer||!authorized)return;
    signalTimer=setTimeout(()=>{signalTimer=null;refresh()},delay);
  }
  async function leaderTick(){
    if(!authorized||document.hidden||stopped||writing)return;
    if(!state){queueRefresh();return}
    if(!leader){if(state.leaseUntil<Date.now())queueRefresh();return}
    const now=Date.now(),next=clone(state),changed=evolve(next,now);
    if(changed||now-lastSave>HEARTBEAT_MS)await save(next,version);
  }
  function start(){
    if(authorized||stopped)return;
    authorized=true;
    queueRefresh(0);
    refreshTimer=setInterval(()=>refresh(),POLL_MS);
    heartbeatTimer=setInterval(()=>leaderTick(),TICK_MS);
    beginAnimation();
  }
  function stop(){
    stopped=true;
    if(refreshTimer)clearInterval(refreshTimer);if(heartbeatTimer)clearInterval(heartbeatTimer);
    if(signalTimer)clearTimeout(signalTimer);if(frame!==null)cancelAnimationFrame(frame);
  }
  window.addEventListener('ks:auth-ready',start);
  window.addEventListener('ks:supabase-change',event=>{
    if(event.detail?.table==='ks_shared_state')queueRefresh(220);
  });
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){if(frame!==null)cancelAnimationFrame(frame);frame=null;}
    else {beginAnimation();queueRefresh(0)}
  });
  window.addEventListener('pagehide',stop,{once:true});
  if(document.documentElement.dataset.ksAuth==='ok')start();
  // Pure functions exposed for regression tests; no credentials or controls.
  window.OfficeMovementTimeline={movementAt,validPayload};
})();
