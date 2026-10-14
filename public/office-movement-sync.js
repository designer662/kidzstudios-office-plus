/* Office Plus V86.29: Shared collision-safe movement + autonomous Smart AI activities.
 * Uses existing authenticated /api/state endpoint + ks_shared_state realtime signals.
 * No per-frame network writes and no changes to local camera controls.
 */
(()=>{
  'use strict';
  const SCOPE='office:movement:v1';
  const LEASE_MS=18000,HEARTBEAT_MS=5500,POLL_MS=2900,TICK_MS=850;
  // Office floor-plan units: roughly two units per world-space metre.
  const MIN_STAFF_GAP=1.85, CHECK_MS=140, DEPARTURE_STEP_MS=1500, MAX_DEPARTURE_WAIT_MS=30000;
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
  const WALK_OPPORTUNITY_MS=115000; // At least attempt a walk periodically, including after business hours.
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
      if(decision?.intent?.zone===home)return decision.intent;
    }
    // Desk tasks remain varied, but no avatar should be desk-bound indefinitely.
    // Force a visit to a usable shared area if their last successful walk was too long ago.
    if(now-(Number(s.lastWalkAt)||now)>WALK_OPPORTUNITY_MS){
      const destinations=home==='showroom'?['corridor','pantry','staff']:['corridor','showroom','pantry'];
      const offset=(Number(s.id)+Math.floor(now/90000))%destinations.length;
      for(let i=0;i<destinations.length;i++){
        const zone=destinations[(offset+i)%destinations.length];
        if(zone!==home&&zoneHasSpace(snapshot,s,zone))return {zone,action:zone==='pantry'?'drink':'chat',kind:'roam'};
      }
    }
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
  function staffBase(e,now){
    const x=Number(e.visualX??e.x),y=Number(e.visualY??e.y);
    const work=living?.workFor(e)||'typing';
    return {id:Number(e.id),x:clamp(x,0,23),y:clamp(y,0,70),room:e.visualRoomId||e.roomId||'staff',action:work,jobKey:living?.jobKey(e)||'',socialAt:0,nextAt:now+8000+Number(e.id)*1200+Math.random()*11000,lastWalkAt:now-(Number(e.id)%4)*16000,walk:null,lastTripZone:null,lastTripAt:0,lastBreakAt:0,ai:smart?.memory(null,now)};
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
      (!s.scene.dialogue||(Array.isArray(s.scene.dialogue)&&s.scene.dialogue.length>=2&&s.scene.dialogue.length<=8&&s.scene.dialogue.every(line=>typeof line==='string'&&line.length<=80)&&
        Number.isInteger(Number(s.scene.speakerId))&&Number.isInteger(Number(s.scene.partnerId))&&s.scene.speakerId!==s.scene.partnerId&&Number(s.scene.turnMs)>=1800&&Number(s.scene.turnMs)<=6000))
    ))&&(!s.walk||(
      Number.isFinite(Number(s.walk.startedAt))&&Number.isFinite(Number(s.walk.endAt))&&
      point(s.walk.from)&&Array.isArray(s.walk.route)&&s.walk.route.length<=250&&s.walk.route.every(point)&&
      Array.isArray(s.walk.segmentMs)&&s.walk.segmentMs.length===s.walk.route.length&&
      s.walk.segmentMs.every(n=>Number.isFinite(+n)&&+n>=100&&+n<120000)&&
      (!s.walk.furnitureId||(typeof s.walk.furnitureId==='string'&&s.walk.furnitureId.length<=64&&Boolean(furniture?.get(s.walk.furnitureId))))&&
      (!s.walk.seatStart||point(s.walk.seatStart))&&(!s.walk.seatGoal||point(s.walk.seatGoal))&&
      ['departMs','dockMs'].every(k=>s.walk[k]===undefined||(Number.isFinite(s.walk[k])&&s.walk[k]>=0&&s.walk[k]<=5000))&&
      Number(s.walk.endAt)>=Number(s.walk.startedAt)
    )));
  }
  function validPayload(p){return p&&p.schema===1&&typeof p.owner==='string'&&Number.isFinite(Number(p.leaseUntil))&&validStaff(p.staff)}
  function seed(now){return {schema:1,owner:id,leaseUntil:now+LEASE_MS,updatedAt:now,staff:livePeople().map(e=>staffBase(e,now))}}
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
      const now=Date.now(),positions=state.staff.map(s=>{const p=movementAt(s,now);if(p.walking)p.heading=headingAt(s,now);return p});
      motion.render(positions);
      living?.update?.(state,positions);
      if(furniture){
        const doing=positions.find(p=>p.scene?.kind==='equipment');
        if(failedReads>2)furniture.status('error');
        else if(!state.staff.length)furniture.status('empty');
        else if(now<uiWaitUntil)furniture.status('waiting');
        else furniture.status(doing?'using':'ready',doing?`🧠 ${doing.scene.text}`:undefined);
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
    const baselines=others.map(other=>{
      const beside=movementAt(other,walk.startedAt);
      const distance=Math.hypot(launch.x-beside.x,launch.y-beside.y);
      return {other,distance,canEscape:distance<MIN_STAFF_GAP&&(!other.walk||other.walk.endAt<=now)};
    });
    const isSafe=(time)=>{
      const here=movementAt(candidate,time);
      for(const {other,distance,canEscape} of baselines){
        const there=movementAt(other,time);
        const gap=Math.hypot(here.x-there.x,here.y-there.y);
        if(gap>=MIN_STAFF_GAP)continue;
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
  function alternateIntents(employee,s,requested,snapshot){
    const home=homeFor(employee);
    if(s.room!==home)return [requested]; // Always bring staff back to their own desk.
    const candidates=[requested];
    if(smart){
      const preferred=smart.decide(employee,s,snapshot,Date.now(),{
        hasWork:!!living?.jobKey(employee),available:zone=>zoneHasSpace(snapshot,s,zone)
      });
      for(const goal of preferred.candidates||[]){
        if(goal.zone!==home&&!candidates.some(c=>c.zone===goal.zone)&&zoneHasSpace(snapshot,s,goal.zone))candidates.push(goal);
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
    return candidates;
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
      if(s.walk||s.nextAt>now)continue;
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
      for(const option of alternateIntents(employee,s,intent,snapshot)){
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
        s.nextAt=now+WALK_RETRY_MS+Math.random()*3000;changed=true;continue;
      }
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
  window.OfficeMovementTimeline={movementAt,headingAt,validPayload,chooseSmartIntent,routeHasClearance,alternateIntents,evolve};
})();
