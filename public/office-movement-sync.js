/* Office Plus V77: Shared movement timeline, one CAS-elected planner, many local renderers.
 * Uses existing authenticated /api/state endpoint + ks_shared_state realtime signals.
 * No per-frame network writes and no changes to local camera controls.
 */
(()=>{
  'use strict';
  const SCOPE='office:movement:v1';
  const LEASE_MS=18000,HEARTBEAT_MS=5500,POLL_MS=2900,TICK_MS=850;
  const id=globalThis.crypto?.randomUUID?.()||`office-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const motion=window.OfficeSuite?.sharedMovement;
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
    return {id:Number(e.id),x:clamp(x,0,23),y:clamp(y,0,70),room:e.visualRoomId||e.roomId||'staff',action:e.motionAction||'typing',nextAt:now+8000+Number(e.id)*1200+Math.random()*11000,walk:null};
  }
  function validStaff(a){
    return Array.isArray(a)&&a.length<=100&&a.every(s=>Number.isInteger(Number(s.id))&&Number.isFinite(Number(s.nextAt))&&point(s)&&(!s.walk||(
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
    if(!w||!w.route?.length)return {id:s.id,x:s.x,y:s.y,room:s.room,action:s.action,walking:false};
    let left=clamp(now-Number(w.startedAt),0,Number(w.endAt)-Number(w.startedAt));
    let previous=w.from;
    for(let i=0;i<w.route.length;i++){
      const ms=Number(w.segmentMs[i]),end=w.route[i];
      if(left<ms){const t=clamp(left/ms,0,1);return {id:s.id,x:previous.x+(end.x-previous.x)*t,y:previous.y+(end.y-previous.y)*t,room:s.room,action:'walking',walking:now<w.endAt};}
      left-=ms;previous=end;
    }
    const final=w.seatGoal&&point(w.seatGoal)?w.seatGoal:previous;
    return {id:s.id,x:final.x,y:final.y,room:w.targetZone||s.room,action:w.action||'typing',walking:false};
  }
  function render(){
    if(stopped)return;
    if(state&&validPayload(state)){
      const now=Date.now(),positions=state.staff.map(s=>movementAt(s,now));
      motion.render(positions);
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
  function evolve(snapshot,now){
    let changed=reconciled(snapshot,now);
    let walkers=snapshot.staff.filter(s=>s.walk&&s.walk.endAt>now).length;
    for(const s of snapshot.staff){
      if(s.walk&&s.walk.endAt<=now){
        const p=movementAt(s,now);
        s.x=p.x;s.y=p.y;s.room=p.room;s.action=p.action;
        s.walk=null;s.nextAt=now+19000+Math.random()*26000;changed=true;
      }
      if(s.walk||s.nextAt>now||walkers>=2)continue;
      // Keep the planning character in sync with the persisted position/room.
      // Movement paths are generated only by the leader, using the existing
      // furniture-aware A* path planner from OfficeSuite.
      motion.render([movementAt(s,now)]);
      const plan=motion.plan(Number(s.id));
      if(!plan||!point(plan.from)||!Array.isArray(plan.route)||!plan.route.length||!plan.route.every(point)){
        s.nextAt=now+10000+Math.random()*5000;changed=true;continue;
      }
      const segmentMs=plan.segmentMs.map(ms=>Math.round(clamp(Number(ms),850,40000)));
      const duration=segmentMs.reduce((sum,ms)=>sum+ms,0);
      s.x=plan.from.x;s.y=plan.from.y;
      s.walk={from:plan.from,route:plan.route,segmentMs,startedAt:now,endAt:now+duration,
        targetZone:plan.targetZone,seatGoal:point(plan.seatGoal)?plan.seatGoal:null,
        action:plan.targetZone==='pantry'?'coffee':plan.targetZone==='showroom'?'meeting':plan.targetZone==='corridor'?'chat':'typing'};
      s.action='walking';walkers++;changed=true;
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
