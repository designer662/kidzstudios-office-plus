/* Office Plus V86.44: Recoverable shared collision-safe Smart AI movement.
 * Uses existing authenticated /api/state endpoint + ks_shared_state realtime signals.
 * No per-frame network writes and no changes to local camera controls.
 */
(()=>{
  'use strict';
  const SCOPE='office:movement:v1';
  const ENGINE_REVISION=2, STALL_LIMIT_MS=180000, FORCE_WALK_AFTER_MS=115000;
  const LEASE_MS=18000,HEARTBEAT_MS=5500,POLL_MS=2900,TICK_MS=850;
  // Office floor-plan units: roughly two units per world-space metre.
  const MIN_STAFF_GAP=1.85, MIN_PARKED_DESK_GAP=1.45, CHECK_MS=140, DEPARTURE_STEP_MS=1500, MAX_DEPARTURE_WAIT_MS=30000;
  const MAX_ACTIVE_WALKERS=3, ESCAPE_GRACE_MS=3600;
  const id=globalThis.crypto?.randomUUID?.()||`office-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const motion=window.OfficeSuite?.sharedMovement;
  const living=window.OfficeLiving;
  const smart=window.OfficeSmartAI;
  const furniture=window.OfficeFurnitureInteractions;
  if(!motion)return;
  // Do not run an independent simulation while waiting for authentication/network.
  motion.enable();
  let state=null,version=0,leader=false,lastSave=0,writing=false,reading=false,authorized=false,stopped=false;
  let refreshTimer=null,heartbeatTimer=null,frame=null,signalTimer=null,failedReads=0,uiWaitUntil=0;
  const clone=p=>JSON.parse(JSON.stringify(p));
  const point=p=>p&&Number.isFinite(+p.x)&&Number.isFinite(+p.y)&&+p.x>=0&&+p.x<=23&&+p.y>=0&&+p.y<=70;
  const livePeople=()=>motion.getPeople();
  const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
  // Capacity reflects usable *interaction spots*, not the full room footprint.
  // All reservations are committed by the timeline leader and replayed by viewers.
  const ZONE_CAPACITY=Object.freeze({corridor:2,pantry:2,store:2,prayer:2,'toilet-a':1,'toilet-b':1,showroom:3});
  const BREAK_COOLDOWN_MS=90000, REPEAT_ZONE_MS=150000;
  const WALK_OPPORTUNITY_MS=FORCE_WALK_AFTER_MS; // At least attempt a walk periodically, including after business hours.
  const WALK_RETRY_MS=9000;

  const homeFor=e=>['boss','staff','showroom'].includes(e?.homeRoom)?e.homeRoom:'staff';
  const occupiedZone=s=>s.walk?.targetZone||s.room;
  function zoneHasSpace(snapshot,subject,zone){
    const limit=ZONE_CAPACITY[zone];
    if(!limit||occupiedZone(subject)===zone)return true;
    let count=0;
    for(const other of snapshot.staff){
      if(other===subject)continue;
      if(occupiedZone(other)===zone&&++count>=limit)return false;
    }
    return true;
  }
  function chooseSmartIntent(employee,s,now,snapshot){
    const home=homeFor(employee),work=living?.workFor(employee)||'typing';
    // Away staff always return home through real routes, not a renderer snap.
    if(s.room!==home)return {zone:home,action:work,kind:'return'};
    if(smart){
      const decision=smart.decide(employee,s,snapshot,now,{
        hasWork:!!living?.jobKey(employee),available:zone=>zoneHasSpace(snapshot,s,zone)
      });
      if(decision?.intent?.zone&&decision.intent.zone!==s.room&&zoneHasSpace(snapshot,s,decision.intent.zone))return decision.intent;
      // A desk-preferred decision must not shadow the mobility watchdog.
      // Once an eligible worker has stayed at their desk too long, offer a
      // *real*, capacity-checked destination before settling for desk work.
      if(decision?.intent?.zone===home){
        const opportunity=movementOpportunity(employee,s,now,snapshot);
        return opportunity||decision.intent;
      }
    }
    const opportunity=movementOpportunity(employee,s,now,snapshot);
    if(opportunity)return opportunity;
    const proposed=living?.chooseIntent(employee,s.room,now)||{zone:home,action:work,kind:'work'};
    const intent={...proposed};
    if(!intent.zone||!['boss','staff','showroom','corridor','pantry','store','prayer','toilet-a','toilet-b'].includes(intent.zone))
      return {zone:home,action:work,kind:'work'};
    if(intent.zone===home)return intent;
    const isBreak=intent.kind==='break';
    const coolingBreak=isBreak&&Number.isFinite(s.lastBreakAt)&&now-s.lastBreakAt<BREAK_COOLDOWN_MS;
    const repeatRoom=s.lastTripZone===intent.zone&&Number.isFinite(s.lastTripAt)&&now-s.lastTripAt<REPEAT_ZONE_MS;
    if(coolingBreak||repeatRoom||!zoneHasSpace(snapshot,s,intent.zone))
      return {zone:home,action:work==='typing'?'pc-work':work,kind:'work'};
    return intent;
  }
  // No extra timer or movement writer: this is evaluated only by the leader
  // when the existing nextAt scheduler makes a worker eligible again.
  function movementOpportunity(employee,s,now,snapshot){
    const home=homeFor(employee),last=Number(s.lastWalkAt);
    if(s.room!==home||!Number.isFinite(last)||now-last<WALK_OPPORTUNITY_MS)return null;
    const destinations=home==='showroom'?['corridor','pantry','store']:
      home==='boss'?['corridor','showroom','pantry','store']:
      ['corridor','showroom','pantry','store','prayer'];
    const offset=(Number(s.id)+Math.floor(now/90000))%destinations.length;
    for(let i=0;i<destinations.length;i++){
      const zone=destinations[(offset+i)%destinations.length];
      if(zone!==home&&zoneHasSpace(snapshot,s,zone))
        return {zone,action:zone==='pantry'?'drink':zone==='store'?'stocking':zone==='prayer'?'reading':zone==='showroom'?'meeting':'chat',kind:'roam',reason:'🚶 Visiting a shared work area'};
    }
    return null; // Never force movement into an occupied room.
  }
  function staffBase(e,now){
    const x=Number(e.visualX??e.x),y=Number(e.visualY??e.y);
    const work=living?.workFor(e)||'typing';
    return {id:Number(e.id),x:clamp(x,0,23),y:clamp(y,0,70),room:e.visualRoomId||e.roomId||'staff',action:work,jobKey:living?.jobKey(e)||'',socialAt:0,nextAt:now+8000+Number(e.id)*1200+Math.random()*11000,lastWalkAt:now-(Number(e.id)%4)*16000,failedRoutes:0,waitingSince:0,walk:null,lastTripZone:null,lastTripAt:0,lastBreakAt:0,ai:smart?.memory(null,now)};
  }
  function validStaff(a){
    return Array.isArray(a)&&a.length<=100&&a.every(s=>(!s.ai||(
      s.ai.v===1&&['at','focus','energy','social','curiosity','streak','decisions'].every(k=>Number.isFinite(Number(s.ai[k])))&&
      ['focus','energy','social','curiosity'].every(k=>Number(s.ai[k])>=0&&Number(s.ai[k])<=1)&&
      Number(s.ai.streak)>=0&&Number(s.ai.streak)<=12&&Number(s.ai.decisions)>=0&&Number(s.ai.decisions)<=1000000&&
      (!s.ai.lastZone||['boss','staff','showroom','corridor','pantry','store','prayer'].includes(s.ai.lastZone))&&
      (!s.ai.lastAction||typeof s.ai.lastAction==='string'&&s.ai.lastAction.length<=24)
    ))&&Number.isInteger(Number(s.id))&&Number.isFinite(Number(s.nextAt))&&point(s)&&(!s.scene||(
      typeof s.scene.text==='string'&&s.scene.text.length<=80&&Number.isFinite(Number(s.scene.from))&&Number.isFinite(Number(s.scene.until))&&s.scene.until>=s.scene.from&&
      (!s.scene.furnitureId||(typeof s.scene.furnitureId==='string'&&s.scene.furnitureId.length<=64&&Boolean(furniture?.get(s.scene.furnitureId))))&&
      (!s.scene.furnitureId||!s.walk||Number(s.scene.from)>=Number(s.walk.endAt))&&
      (!s.scene.dialogue||(Array.isArray(s.scene.dialogue)&&s.scene.dialogue.length>=2&&s.scene.dialogue.length<=8&&s.scene.dialogue.every(line=>typeof line==='string'&&line.length<=80)&&
        Number.isInteger(Number(s.scene.speakerId))&&Number.isInteger(Number(s.scene.partnerId))&&s.scene.speakerId!==s.scene.partnerId&&Number(s.scene.turnMs)>=1800&&Number(s.scene.turnMs)<=6000))
    ))&&(!s.walk||(
      Number.isFinite(Number(s.walk.startedAt))&&Number.isFinite(Number(s.walk.endAt))&&
      point(s.walk.from)&&Array.isArray(s.walk.route)&&s.walk.route.length<=250&&s.walk.route.every(point)&&
      Array.isArray(s.walk.segmentMs)&&s.walk.segmentMs.length===s.walk.route.length&&
      s.walk.segmentMs.every(n=>Number.isFinite(+n)&&+n>=100&&+n<120000)&&
      (s.walk.kind===undefined||['return','activity'].includes(s.walk.kind))&&
      (!s.walk.furnitureId||(typeof s.walk.furnitureId==='string'&&s.walk.furnitureId.length<=64&&Boolean(furniture?.get(s.walk.furnitureId))))&&
      (!s.walk.seatStart||point(s.walk.seatStart))&&(!s.walk.seatGoal||point(s.walk.seatGoal))&&
      ['departMs','dockMs'].every(k=>s.walk[k]===undefined||(Number.isFinite(s.walk[k])&&s.walk[k]>=0&&s.walk[k]<=5000))&&
      Number(s.walk.endAt)>=Number(s.walk.startedAt)
    )));
  }
  function validPayload(p){return p&&p.schema===1&&typeof p.owner==='string'&&Number.isFinite(Number(p.leaseUntil))&&validStaff(p.staff)}
  function seed(now){return {schema:1,aiEngineVersion:ENGINE_REVISION,owner:id,leaseUntil:now+LEASE_MS,updatedAt:now,staff:livePeople().map(e=>staffBase(e,now))}}
  // Rebuild SIMULATION coordinates from the real roster desks, never a stale
  // visualX / visualRoomId inherited from an old server movement timeline.
  function homeBase(e,now){
    const fresh={...e,visualX:Number.isFinite(+e.deskX)?+e.deskX:e.x,
      visualY:Number.isFinite(+e.deskY)?+e.deskY:e.y,visualRoomId:homeFor(e)};
    const s=staffBase(fresh,now);
    s.room=homeFor(e);s.walk=null;s.scene=null;
    s.nextAt=now+1200+Number(e.id)*300;
    s.lastWalkAt=now-WALK_OPPORTUNITY_MS-20000;
    return s;
  }
  // Reset only the movement/AI timeline. Never change the staff roster, jobs,
  // personal appearance, salary records or any other Supabase scope.
  function rebuildStaff(snapshot,ids,now){
    const directory=new Map(livePeople().map(e=>[Number(e.id),e]));
    let changed=false;
    snapshot.staff=snapshot.staff.map(s=>{
      const employee=directory.get(Number(s.id));
      if(!employee||!ids.has(Number(s.id)))return s;
      changed=true;return homeBase(employee,now);
    });
    for(const employee of directory.values()){
      if(ids.has(Number(employee.id))&&!snapshot.staff.some(s=>Number(s.id)===Number(employee.id))){
        snapshot.staff.push(homeBase(employee,now));changed=true;
      }
    }
    if(changed)snapshot.aiEngineVersion=ENGINE_REVISION;
    return changed;
  }
  function priorityStaffIds(){
    const byName=livePeople().filter(e=>/^(afiq|boss)$/i.test(String(e.name||'').trim())).map(e=>Number(e.id));
    return new Set(byName);
  }
  function repairStaleTimeline(snapshot,now){
    let changed=false;
    // One-time migration from V86.43: reset Afiq and Boss' movement memory,
    // without altering any colleagues' state. If the names were customized,
    // the other state is preserved rather than guessing an identity.
    if(Number(snapshot.aiEngineVersion||0)<ENGINE_REVISION&&priorityStaffIds().size){
      changed=rebuildStaff(snapshot,priorityStaffIds(),now)||changed;
      snapshot.aiEngineVersion=ENGINE_REVISION;changed=true;
    }
    const workers=new Map(livePeople().map(e=>[Number(e.id),e]));
    for(const s of snapshot.staff){
      // A narrow doorway can become cyclically blocked by other idle avatars.
      // After several unsuccessful reservations, perform one authoritative
      // re-seating at the worker's OWN assigned desk (never mid-walk). This is
      // an explicit AI state recovery, not a physical route through a wall.
      const failed=Number(s.failedRoutes)||0,waitingSince=Number(s.waitingSince)||0;
      const employee=workers.get(Number(s.id));
      if(employee&&!s.walk&&s.action==='waiting'&&failed>=6&&
        waitingSince>0&&now-waitingSince>=35000&&
        now-(Number(s.lastRecoveredAt)||0)>=120000){
        const attempts=Math.min(100,(Number(s.recoveryCount)||0)+1);
        Object.assign(s,homeBase(employee,now),{
          lastRecoveredAt:now,recoveryCount:attempts,lastWalkAt:now,
          nextAt:now+16000+Number(s.id)*400,
          scene:{kind:'activity',text:'↩ Reconnected to workstation',from:now,until:now+4500}
        });
        changed=true;continue;
      }
      if(s.walk&&(s.walk.startedAt>now+MAX_DEPARTURE_WAIT_MS+20000||
        s.walk.endAt>now+STALL_LIMIT_MS||s.walk.endAt<s.walk.startedAt)){
        // An impossible/future reservation must not hold a character forever.
        // Keep the last committed safe position and let the planner retry.
        s.walk=null;s.scene=null;s.action='waiting';s.nextAt=now+500;
        s.waitingSince=now;s.failedRoutes=0;changed=true;
      }
      if(!s.walk&&s.nextAt>now+STALL_LIMIT_MS){
        s.nextAt=now+500;s.scene=null;changed=true;
      }
      if(!s.walk&&s.action==='waiting'&&Number.isFinite(+s.waitingSince)&&
        s.waitingSince>0&&now-s.waitingSince>STALL_LIMIT_MS){
        // Preserve location; do not teleport through furniture or office walls.
        s.failedRoutes=0;s.waitingSince=0;s.nextAt=now+300;
        s.lastWalkAt=now-WALK_OPPORTUNITY_MS-20000;changed=true;
      }
    }
    return changed;
  }
  function movementAt(s,now){
    const w=s.walk;
    const scene=s.scene&&now>=s.scene.from&&now<s.scene.until?s.scene:null;
    const faceTo=['conversation','huddle'].includes(scene?.kind)?s.faceTo||null:null;
    const furnitureId=scene?.kind==='equipment'?scene.furnitureId||null:null;
    if(!w||!w.route?.length)return {id:s.id,x:s.x,y:s.y,room:s.room,action:s.action,walking:false,scene,faceTo,furnitureId};
    const departMs=w.departMs||0,dockMs=w.dockMs||0,start=w.seatStart||w.from;
    const result=(p,walking,action,room=s.room)=>({id:s.id,x:p.x,y:p.y,room,action,walking,scene,faceTo:walking?null:faceTo,furnitureId:walking?null:furnitureId});
    const blend=(a,b,t)=>{t=clamp(t,0,1);t=t*t*(3-2*t);return {x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t}};
    if(now<w.startedAt)return result(start,false,'waiting');
    let left=Math.max(0,now-w.startedAt);
    if(departMs&&left<departMs)return result(blend(start,w.from,left/departMs),true,'walking');
    left-=departMs;let previous=w.from;
    for(let i=0;i<w.route.length;i++){
      const ms=Number(w.segmentMs[i]),end=w.route[i];
      if(left<ms){
        const raw=clamp(left/ms,0,1),edge=.12;
        const t=i===0&&raw<edge?edge*(2*(raw/edge)**2-(raw/edge)**3):
          i===w.route.length-1&&raw>1-edge?1-edge*(2*((1-raw)/edge)**2-((1-raw)/edge)**3):raw;
        return result({x:previous.x+(end.x-previous.x)*t,y:previous.y+(end.y-previous.y)*t},true,'walking');
      }
      left-=ms;previous=end;
    }
    const final=w.seatGoal&&point(w.seatGoal)?w.seatGoal:previous;
    if(dockMs&&left<dockMs)return result(blend(previous,final,left/dockMs),true,'walking');
    return result(final,false,w.action||'typing',w.targetZone||s.room);
  }
  // V86.36: derive activity phases only from the committed schema-1 timeline.
  // Followers never make independent decisions or persist these display fields.
  function phaseAt(s,now){
    if(!s||!Number.isFinite(now))return {phase:'recovering',label:'Waiting for shared state'};
    const w=s.walk,scene=s.scene;
    if(w&&now<Number(w.startedAt))return {phase:'waiting',label:'Waiting to depart'};
    if(w&&now<Number(w.endAt)){
      if(Number(w.dockMs)>0&&now>=Number(w.endAt)-Number(w.dockMs))
        return {phase:'aligning',label:'Approaching destination'};
      return w.kind==='return'?{phase:'returning',label:'Returning to workstation'}:
        {phase:'walking',label:'Walking to destination'};
    }
    if(scene&&now>=Number(scene.from)&&now<Number(scene.until)){
      if(scene.kind==='equipment')return {phase:'interacting',label:String(scene.text||'Using equipment').slice(0,80)};
      return {phase:'activity',label:String(scene.text||'Working').slice(0,80)};
    }
    if(w&&scene?.kind==='equipment'&&now>=Number(w.endAt)&&now<Number(scene.from))
      return {phase:'aligning',label:'Getting ready at equipment'};
    if(scene&&now>=Number(scene.until)&&now<Number(s.nextAt))
      return {phase:'completing',label:'Finishing activity'};
    if(s.action==='waiting'&&now<Number(s.nextAt))
      return {phase:'waiting',label:'Waiting for clear route'};
    return {phase:'ready',label:'Ready for next activity'};
  }
  function headingAt(s,now){
    if(!s.walk)return null;
    // Sample forward direction on the committed timeline rather than deriving
    // orientation from a late network target (which can flip 180 degrees).
    const a=movementAt(s,Math.max(s.walk.startedAt,now-90));
    const b=movementAt(s,Math.min(s.walk.endAt,now+90));
    let dx=b.x-a.x,dy=b.y-a.y;
    if(Math.hypot(dx,dy)<.0001){
      const legs=[s.walk.from,...s.walk.route,...(s.walk.seatGoal?[s.walk.seatGoal]:[])];
      for(let i=legs.length-1;i>0;i--){dx=legs[i].x-legs[i-1].x;dy=legs[i].y-legs[i-1].y;if(Math.hypot(dx,dy)>.01)break}
    }
    return Math.hypot(dx,dy)>.001?Math.atan2(dx,dy):null;
  }
  function render(){
    if(stopped)return;
    if(state&&validPayload(state)){
      const now=Date.now(),positions=state.staff.map(s=>{
        const p=movementAt(s,now),activity=phaseAt(s,now);
        p.phase=activity.phase;
        if(p.walking)p.heading=headingAt(s,now);
        return p;
      });
      motion.render(positions);
      living?.update?.(state,positions);
      if(furniture){
        const interacting=state.staff.find(s=>phaseAt(s,now).phase==='interacting');
        const phases=new Set(positions.map(p=>p.phase));
        if(failedReads>2)furniture.status('error');
        else if(!state.staff.length)furniture.status('empty');
        else if(interacting)furniture.status('using',`🧠 ${phaseAt(interacting,now).label}`);
        else if(phases.has('waiting')||now<uiWaitUntil)furniture.status('waiting');
        else if(phases.has('aligning'))furniture.status('aligning');
        else if(phases.has('walking')||phases.has('returning'))furniture.status('walking');
        else furniture.status('ready');
      }
    }
    if(!document.hidden)frame=requestAnimationFrame(render);else frame=null;
  }
  function beginAnimation(){if(frame==null&&!document.hidden)frame=requestAnimationFrame(render)}
  function reconciled(snapshot,now){
    const current=livePeople(),known=new Set(current.map(e=>Number(e.id)));
    const original=snapshot.staff.length;
    snapshot.staff=snapshot.staff.filter(s=>known.has(Number(s.id)));
    let changed=snapshot.staff.length!==original;
    for(const s of snapshot.staff){
      if(!Number.isFinite(Number(s.lastWalkAt))||s.lastWalkAt==null){s.lastWalkAt=now-((Number(s.id)%4)*16000);changed=true}
      if(smart&&!s.ai){s.ai=smart.memory(null,now);changed=true}
    }

    const existing=new Set(snapshot.staff.map(s=>Number(s.id)));
    for(const e of current)if(!existing.has(Number(e.id))){snapshot.staff.push(staffBase(e,now));changed=true}
    return changed;
  }
  // Shared behavior state is planned only by the elected leader and persisted
  // in the same CAS-protected timeline as walking. Browsers only replay it.
  // Simulate the whole reserved trajectory, including the worker's stationary
  // position before departure and after arrival. The leader runs this once per
  // planned walk, and all followers replay the same committed timestamps.
  function candidateWalk(plan,intent,now,delay){
    if(!plan||!point(plan.from)||!Array.isArray(plan.route)||!plan.route.length||!plan.route.every(point)||
       !Array.isArray(plan.segmentMs)||plan.segmentMs.length!==plan.route.length)return null;
    const segmentMs=plan.segmentMs.map(ms=>Math.round(clamp(Number(ms),850,40000)));
    if(segmentMs.some(ms=>!Number.isFinite(ms)))return null;
    const departMs=point(plan.seatStart)?950:0,dockMs=point(plan.seatGoal)?950:0;
    const duration=segmentMs.reduce((sum,ms)=>sum+ms,0)+departMs+dockMs;
    if(!duration||duration>115000)return null;
    return {from:plan.from,seatStart:point(plan.seatStart)?plan.seatStart:null,departMs,dockMs,route:plan.route,segmentMs,startedAt:now+delay,endAt:now+delay+duration,
      kind:intent?.kind==='return'?'return':'activity',
      targetZone:plan.targetZone,seatGoal:point(plan.seatGoal)?plan.seatGoal:null,action:intent?.action==='typing'?'pc-work':intent?.action||'pc-work'};
  }
  function routeHasClearance(snapshot,subject,walk,now){
    const others=snapshot?.staff?.filter(s=>Number(s.id)!==Number(subject.id))||[];
    if(!others.length)return true;
    const candidate={...subject,x:walk.from.x,y:walk.from.y,walk};
    const launch=movementAt(candidate,walk.startedAt);
    // A pre-existing seating overlap must not permanently trap both employees.
    // Grant an *outbound only* clearance grace for an idle neighbor. The moving
    // employee may leave the overlap, but may never approach more closely.
    // Moving neighbors, new overlaps and destination overlaps stay forbidden.
    const directory=new Map(livePeople().map(employee=>[Number(employee.id),employee]));
    const baselines=others.map(other=>{
      const beside=movementAt(other,walk.startedAt);
      const distance=Math.hypot(launch.x-beside.x,launch.y-beside.y);
      const employee=directory.get(Number(other.id));
      // A parked colleague inside their assigned desk clearance is not a
      // second moving pedestrian. The route is already checked against wall
      // and furniture geometry by the planner. Using the full walking gap
      // around every desk permanently trapped showroom and admin characters.
      const parked=Boolean(employee&&other.room===homeFor(employee)&&
        Number.isFinite(Number(employee.deskX))&&Number.isFinite(Number(employee.deskY))&&
        Math.hypot(beside.x-Number(employee.deskX),beside.y-Number(employee.deskY))<.65&&
        (!other.walk||other.walk.endAt<=now));
      const clearance=parked?MIN_PARKED_DESK_GAP:MIN_STAFF_GAP;
      return {other,distance,clearance,canEscape:distance<clearance&&(!other.walk||other.walk.endAt<=now)};
    });
    const isSafe=(time)=>{
      const here=movementAt(candidate,time);
      for(const {other,distance,clearance,canEscape} of baselines){
        const there=movementAt(other,time);
        const gap=Math.hypot(here.x-there.x,here.y-there.y);
        if(gap>=clearance)continue;
        const waiting=time<=walk.startedAt;
        const elapsed=time-walk.startedAt;
        // Only tolerate an overlap which existed before this reservation,
        // and only while a character is demonstrably moving *out* of it.
        if(canEscape&&(waiting||elapsed<=ESCAPE_GRACE_MS)&&
           gap>=distance-.09&&(waiting||elapsed<2200||gap>distance+.12))continue;
        return false;
      }
      return true;
    };
    // 140 ms sampling limits tunneling at full avatar walking speed.
    for(let time=now;time<=walk.endAt;time+=CHECK_MS){
      if(!isSafe(time))return false;
    }
    // Sample the endpoint exactly, independently of the frame step.
    return isSafe(walk.endAt);
  }
  function attachWalk(s,plan,intent,now,snapshot){
    // Don't send two people through the same doorway / workstation at once.
    // If no free time slot exists, leave the worker in place and retry later.
    for(let delay=0;delay<=MAX_DEPARTURE_WAIT_MS;delay+=DEPARTURE_STEP_MS){
      const walk=candidateWalk(plan,intent,now,delay);
      if(!walk)return false;
      if(!routeHasClearance(snapshot,s,walk,now))continue;
      // The sleeping pose extends beyond the standing collision cylinder;
      // reserve additional floor room on the far end of a surau nap route.
      if(intent?.action==='sleep'&&snapshot.staff.some(other=>other!==s&&
        Math.hypot(movementAt(other,walk.endAt).x-(walk.seatGoal?.x??walk.route.at(-1).x),
                   movementAt(other,walk.endAt).y-(walk.seatGoal?.y??walk.route.at(-1).y))<3.5))continue;
      s.x=walk.from.x;s.y=walk.from.y;
      s.walk=walk;s.action=delay?'waiting':'walking';s.faceTo=null;
      s.lastWalkAt=now+delay;s.nextAt=walk.endAt+14000;
      return true;
    }
    return false;
  }
  // A friendly conversational distance: 4.2 plan units = 2.1 world units.
  // Two characters share a corridor lane and face one another from a safe gap.
  // Avoid placing two avatars nose-to-nose in the 3D model.
  const SOCIAL_SPACING=3.8;
  const SOCIAL_LOCATIONS=[
    [{x:9.15,y:39.8},{x:9.15,y:44.1}],
    [{x:9.15,y:49.0},{x:9.15,y:53.3}],
  ];
  function socialDestination(plan){
    return plan?.seatGoal||plan?.route?.[plan.route.length-1]||null;
  }
  function pairConversation(snapshot,subject,now){
    if(!living||subject.room==='corridor'||subject.room==='pantry'||subject.room==='prayer'||subject.room==='store'||subject.room==='toilet-a'||subject.room==='toilet-b'||(subject.socialAt&&now-subject.socialAt<120000)||subject.scene?.kind==='job')return false;
    const others=snapshot.staff.filter(s=>s!==subject&&!s.walk&&!['pantry','corridor','prayer','store','toilet-a','toilet-b'].includes(s.room)&&s.nextAt<now+15000&&(!s.socialAt||now-s.socialAt>120000)&&s.scene?.kind!=='job');
    if(!others.length)return false;
    const partner=others[Math.floor(Math.random()*others.length)];
    // Either corridor slot is allowed, but refuse paths that place the characters too close.
    const order=Math.floor(Math.random()*SOCIAL_LOCATIONS.length);
    let pairing=null;
    for(let slot=0;slot<SOCIAL_LOCATIONS.length;slot++){
      const targets=SOCIAL_LOCATIONS[(order+slot)%SOCIAL_LOCATIONS.length];
      const p1=motion.plan(Number(subject.id),'corridor',targets[0]),p2=motion.plan(Number(partner.id),'corridor',targets[1]);
      const at1=socialDestination(p1),at2=socialDestination(p2);
      if(!p1||!p2||!at1||!at2)continue;
      if(Math.hypot(at1.x-at2.x,at1.y-at2.y)<SOCIAL_SPACING)continue;
      // Do not silently use a snapped location far from the chosen safe meeting position.
      if(Math.hypot(at1.x-targets[0].x,at1.y-targets[0].y)>.65||Math.hypot(at2.x-targets[1].x,at2.y-targets[1].y)>.65)continue;
      // The pair must both fit safely, or neither is committed.
      const probe=clone(snapshot),a=probe.staff.find(s=>Number(s.id)===Number(subject.id)),b=probe.staff.find(s=>Number(s.id)===Number(partner.id));
      if(!attachWalk(a,p1,{action:'chat'},now,probe)||!attachWalk(b,p2,{action:'chat'},now,probe))continue;
      pairing=[a.walk,b.walk];break;
    }
    if(!pairing)return false;
    const [w1,w2]=pairing;
    const meetAt=Math.max(w1.endAt,w2.endAt)+900;
    const huddle=Math.random()<.42;
    const dialogueSets=living.dialogues?.[huddle?'huddle':'conversation'];
    const dialogue=Array.isArray(dialogueSets)&&dialogueSets.length?dialogueSets[Math.floor(Math.random()*dialogueSets.length)]:[
      '💬 Quick team check-in?','Sure, what’s up?','Let’s compare our notes.','Sounds good!','Thanks for the chat.','Anytime!'
    ];
    const turns=dialogue.slice(0,8).map(t=>String(t).slice(0,80));
    const turnMs=2800;
    const kind=huddle?'huddle':'conversation';
    for(const [person,reserved]of [[subject,w1],[partner,w2]]){
      person.x=reserved.from.x;person.y=reserved.from.y;
      person.walk={...reserved,action:huddle?'meeting':'chat'};
      person.action=reserved.startedAt>now?'waiting':'walking';
      person.faceTo=person===subject?Number(partner.id):Number(subject.id);
      // A single shared script produces alternating speech bubbles on all PCs.
      person.scene={kind,text:turns[0],dialogue:turns,speakerId:Number(subject.id),partnerId:Number(partner.id),turnMs,from:meetAt,until:meetAt+turns.length*turnMs};
      person.socialAt=now;person.lastWalkAt=now;
      person.nextAt=person.scene.until+3500;
    }
    return true;
  }
  function alternateIntents(employee,s,requested,snapshot,now=Date.now()){
    const home=homeFor(employee);
    if(s.room!==home){
      // Going home is always the first attempt. If a busy doorway makes that
      // route impossible, give the character a limited safe detour instead of
      // waiting indefinitely at the same spot and blocking everyone else.
      // The next scheduling cycle still tries home first, via the same planner.
      const detours=[requested];
      const zones=s.room==='corridor'?['pantry','showroom','store']:
        ['corridor','showroom','pantry','store','prayer'];
      for(const zone of zones){
        if(zone===home||zone===s.room||!zoneHasSpace(snapshot,s,zone))continue;
        if(s.lastTripZone===zone&&Number.isFinite(s.lastTripAt)&&now-s.lastTripAt<30000)continue;
        detours.push({zone,action:zone==='pantry'?'drink':zone==='store'?'stocking':
          zone==='prayer'?'reading':zone==='showroom'?'meeting':'chat',kind:'roam',reason:'🚶 Clearing a busy route'});
        if(detours.length>=4)break;
      }
      return detours;
    }
    const failed=Number(s.failedRoutes)||0;
    // After repeated failed reservations don't insist on exactly the same
    // busy fixture/doorway. Prefer a free corridor before retrying the goal.
    const candidates=failed>=2?[]:[requested];
    if(failed>=2&&zoneHasSpace(snapshot,s,'corridor')&&home!=='corridor')
      candidates.push({zone:'corridor',action:'chat',kind:'roam',reason:'🚶 Finding an alternate clear route'});
    if(smart){
      const preferred=smart.decide(employee,s,snapshot,now,{
        hasWork:!!living?.jobKey(employee),available:zone=>zoneHasSpace(snapshot,s,zone)
      });
      for(const goal of preferred.candidates||[]){
        if(goal.zone!==home&&!candidates.some(c=>c.zone===goal.zone)&&zoneHasSpace(snapshot,s,goal.zone)&&!(failed>=2&&goal.zone===requested.zone))candidates.push(goal);
      }
    }
    const order=home==='showroom'?['corridor','pantry','store','prayer']:
      home==='boss'?['showroom','corridor','pantry','store']:
      ['showroom','corridor','pantry','store','prayer'];
    const rotate=Number(s.id)%order.length;
    for(let i=0;i<order.length;i++){
      const zone=order[(i+rotate)%order.length];
      if(zone===home||candidates.some(c=>c.zone===zone)||!zoneHasSpace(snapshot,s,zone))continue;
      candidates.push({zone,action:zone==='pantry'?'drink':zone==='store'?'stocking':
        zone==='prayer'?'reading':zone==='showroom'?'meeting':'chat',kind:'roam'});
    }
    if(failed>=2&&!candidates.some(c=>c.zone===requested.zone))candidates.push(requested);
    return candidates;
  }
  function evolve(snapshot,now){
    let changed=reconciled(snapshot,now);
    changed=repairStaleTimeline(snapshot,now)||changed;
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
          s.scene?.kind==='meeting'?Math.max(now+3500,s.scene.until+1200):
          s.scene?.kind==='equipment'?Math.max(now+3000,s.scene.until+1500):now+(['pantry','prayer','toilet-a','toilet-b'].includes(s.room)?17000:19000)+Math.random()*15000;
        changed=true;
      }
    }
    let walkers=snapshot.staff.filter(s=>s.walk&&s.walk.endAt>now).length;
    const due=snapshot.staff.filter(s=>!s.walk&&s.nextAt<=now)
      .sort((a,b)=>(Number(a.lastWalkAt)||0)-(Number(b.lastWalkAt)||0)||a.nextAt-b.nextAt);
    for(const s of due){
      // A conversation can reserve a second employee after `due` was built.
      // Never plan another walk over an existing reservation in the same tick.
      if(s.walk||s.nextAt>now||(s.scene&&s.scene.until>now))continue;
      if(walkers>=MAX_ACTIVE_WALKERS)break;
      const employee=people.get(Number(s.id));if(!employee)continue;
      // Reserve two free walking slots before planning a paired conversation.
      if(walkers<=MAX_ACTIVE_WALKERS-2&&Math.random()<.13&&pairConversation(snapshot,s,now)){walkers+=2;changed=true;continue}
      const intent=chooseSmartIntent(employee,s,now,snapshot);
      // One reclined sleeper at a time: a second surau visitor gets a quiet seated break.
      if(intent.zone==='prayer'&&intent.action==='sleep'&&snapshot.staff.some(other=>other!==s&&
        (other.room==='prayer'||other.walk?.targetZone==='prayer')&&
        (other.action==='sleep'||other.walk?.action==='sleep')))intent.action='reading';
      const work=living?.workFor(employee)||'typing';
      if(intent.zone===((['boss','staff','showroom'].includes(employee.homeRoom))?employee.homeRoom:'staff')&&s.room===intent.zone&&!furniture?.forIntent(intent,employee)){
        // Desk / idle animation changes without moving the character through furniture.
        s.failedRoutes=0;s.waitingSince=0;
        s.action=intent.action==='typing'?'pc-work':intent.action||work;
        if(intent.kind==='meeting')s.scene={kind:'meeting',text:'🗓 Planning at the project desk',from:now,until:now+12500};
        if(smart){
          smart.record(s,intent,now);
          if(s.ai.decisions%4===1&&intent.reason&&!s.scene)
            s.scene={kind:'activity',text:String(intent.reason).slice(0,80),from:now,until:now+5200};
        }
        s.nextAt=now+13000+Math.random()*19000;
        changed=true;continue;
      }
      // If a target is crowded or its doorway cannot be reserved, try other
      // *real* destinations, not three near-identical retries to the same spot.
      // Every candidate is checked against all committed shared trajectories.
      motion.render([movementAt(s,now)]);
      let walked=false,selectedIntent=intent;
      for(const option of alternateIntents(employee,s,intent,snapshot,now)){
        if(!zoneHasSpace(snapshot,s,option.zone))continue;
        const fixture=furniture?.forIntent(option,employee)||null;
        if(fixture&&(!furniture.validate(fixture)||furniture.occupied(fixture,snapshot,s.id,now)))continue;
        for(let attempt=0;attempt<2&&!walked;attempt++){
          const plannedIntent=fixture?{...option,action:fixture.action,reason:fixture.label}:option;
          const plan=motion.plan(Number(s.id),option.zone,fixture?.point||null);
          // Refuse an equipment task if the navigation system redirected the
          // arrival somewhere far from the physical workstation.
          const end=plan?.seatGoal||plan?.route?.[plan.route.length-1];
          if(fixture&&(!end||Math.hypot(end.x-fixture.point.x,end.y-fixture.point.y)>.65))continue;
          if(attachWalk(s,plan,plannedIntent,now,snapshot)){
            walked=true;selectedIntent=plannedIntent;
            if(fixture){s.walk.furnitureId=fixture.id;
              s.scene={kind:'equipment',furnitureId:fixture.id,text:fixture.label,
                from:s.walk.endAt+250,until:s.walk.endAt+250+fixture.duration};
              s.nextAt=s.scene.until+1600;
            }
          }
        }
        if(walked)break;
      }
      if(!walked){
        uiWaitUntil=now+2000;furniture?.status?.('waiting');
        s.action='waiting'; // Schema-1 action field doubles as follower-visible retry state.
        s.failedRoutes=Math.min(12,Number(s.failedRoutes||0)+1);
        if(!s.waitingSince)s.waitingSince=now;
        s.nextAt=now+(s.failedRoutes>=3?4500:WALK_RETRY_MS)+Math.random()*1600;
        changed=true;continue;
      }
      s.failedRoutes=0;s.waitingSince=0;
      s.lastTripZone=selectedIntent.zone;s.lastTripAt=now;
      if(smart)smart.record(s,selectedIntent,now);
      if(selectedIntent.kind==='break')s.lastBreakAt=now;
      if(s.scene?.kind==='equipment'){
        // Keep the committed furniture activity visible until release.
        s.nextAt=Math.max(s.nextAt,s.scene.until+1600);
      }else if(selectedIntent.kind==='meeting'){
        s.scene={kind:'meeting',text:'🗓 Reviewing a team project',from:s.walk.endAt,until:s.walk.endAt+13000};
        s.nextAt=s.walk.endAt+15000;
      }else if(selectedIntent.zone==='store'&&selectedIntent.action==='stocking'){
        s.scene={kind:'activity',text:'📦 Checking and arranging stock',from:s.walk.endAt,until:s.walk.endAt+14000};
      }else if(selectedIntent.kind==='break'){
        s.scene={kind:'break',text:living?.breakMessage?.(selectedIntent.zone,Math.random(),selectedIntent.action)||'Taking a short break',from:s.walk.endAt,until:s.walk.endAt+17000};
        s.nextAt=s.walk.endAt+19000;
      }
      if(smart&&selectedIntent.reason&&!s.scene){
        s.scene={kind:'activity',text:String(selectedIntent.reason).slice(0,80),
          from:s.walk.endAt+550,until:s.walk.endAt+6500};
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
  async function resetSmartAI(requestedIds){
    if(!authorized||stopped)return {ok:false,message:'Sign in to reset Smart AI'};
    if(writing||reading)return {ok:false,message:'AI is syncing. Please try again'};
    await refresh();
    if(!state)return {ok:false,message:'Shared AI timeline unavailable. Try again online'};
    const ids=requestedIds==='all'?new Set(livePeople().map(e=>Number(e.id))):priorityStaffIds();
    if(!ids.size)return {ok:false,message:'Afiq/Boss not found in the staff roster'};
    const next=clone(state),now=Date.now();
    if(!rebuildStaff(next,ids,now))return {ok:false,message:'Staff timeline not available'};
    const ok=await save(next,version);
    return {ok,message:ok?'Movement restarted for '+(requestedIds==='all'?'all staff':'Afiq and Boss'):
      'Reset was not saved. Retry after synchronization'};
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
      if(status!==200||!validPayload(data?.payload)){failedReads++;if(failedReads>2)furniture?.status?.('error');return}
      failedReads=0;
      furniture?.status?.('ready');
      accept(data);
      const now=Date.now();
      if(state.leaseUntil<=now&&!document.hidden){
        // Optimistic CAS means only one PC can acquire/renew authority.
        const takeOver=clone(state);
        await save(takeOver,version);
      }
    }catch(error){failedReads++;if(failedReads>2)furniture?.status?.('error')}finally{reading=false}
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
    furniture?.status?.(furniture?.list().length?'loading':'error');
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
  // Explicit reset from the dashboard. The expectedVersion compare-and-swap
  // prevents stale browsers from overwriting another leader's movement plan.
  window.addEventListener('ks:smart-ai-reset-request',async event=>{
    let outcome;
    try{outcome=await resetSmartAI(event.detail?.target==='all'?'all':'priority')}
    catch{outcome={ok:false,message:'Unable to reset Smart AI while offline'}}
    window.dispatchEvent(new CustomEvent('ks:smart-ai-reset-result',{detail:outcome}));
  });
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
  window.OfficeMovementTimeline={movementAt,headingAt,phaseAt,validPayload,chooseSmartIntent,movementOpportunity,routeHasClearance,alternateIntents,evolve,repairStaleTimeline,rebuildStaff,resetSmartAI};
})();
