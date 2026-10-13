import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {createHijabiCharacter} from './hijabi-character.js';
import {createHijabiCasualCharacter} from './hijabi-character-semi-casual.js';
import {createMaleCharacter} from './male-character.js';
const __KS3D={...THREE,RoundedBoxGeometry};

function attachClassicGlasses(model,enabled){
  const THREE=__KS3D;
  const parent=model.head.children.find(child=>child.name==='Head')||model.head;
  const frames=new THREE.Group();frames.name='Optional classic glasses';frames.visible=Boolean(enabled);parent.add(frames);
  const mat=new THREE.MeshStandardMaterial({color:'#344149',roughness:.5,metalness:0});
  const lens=new THREE.MeshStandardMaterial({color:'#c5e0e4',transparent:true,opacity:.075,depthWrite:false,roughness:.15,side:THREE.DoubleSide});
  for(const side of [-1,1]){
    const points=Array.from({length:33},(_,i)=>{const angle=i*Math.PI*2/32;return new THREE.Vector3(side*.248+Math.cos(angle)*.176,5.38+Math.sin(angle)*.126,.693)});
    const rim=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),48,.015,6,true),mat);frames.add(rim);
    const pane=new THREE.Mesh(new THREE.SphereGeometry(1,24,12),lens);pane.position.set(side*.248,5.38,.690);pane.scale.set(.169,.122,.008);frames.add(pane);
  }
  const bridge=new THREE.Mesh(new THREE.RoundedBoxGeometry(.154,.022,.025,2,.01),mat);bridge.position.set(0,5.394,.698);frames.add(bridge);
  frames.traverse(mesh=>{if(mesh.isMesh){mesh.castShadow=false;mesh.receiveShadow=false}});
  model.glasses=frames;
}


// One-time, lightweight handheld props. Only the appropriate activity is visible.
// Attached to the imported character's real hand joints for both male and female staff.
function attachOfficeActivityProps(T,model){
 const hand=model.arms[1].children.find(child=>child.name==='Hand')||model.arms[1];
 const makeMat=(color)=>new T.MeshStandardMaterial({color,roughness:.82,metalness:0});
 const matCup=makeMat('#e5eee6'),matCoffee=makeMat('#80604a'),matBread=makeMat('#e7bc7c'),matFilling=makeMat('#8caa7c');
 const matStock=makeMat('#c39e6d'),matTape=makeMat('#e8d6a8'),matMat=makeMat('#8baaa2');
 const put=(parent,name,geo,mat,pos,scale)=>{
  const obj=new T.Mesh(geo,mat);obj.name=name;obj.position.set(...pos);obj.scale.set(...scale);
  obj.castShadow=true;obj.receiveShadow=true;parent.add(obj);return obj;
 };
 const cube=new T.RoundedBoxGeometry(1,1,1,2,.12);
 const holder=(name)=>{const group=new T.Group();group.name=name;group.visible=false;hand.add(group);return group;};
 const drink=holder('Activity drinking cup');
 put(drink,'Water cup',cube,matCup,[0,-.04,.22],[.30,.35,.29]);
 put(drink,'Coffee surface',cube,matCoffee,[0,.133,.22],[.255,.022,.24]);
 const eat=holder('Activity snack');
 put(eat,'Sandwich bread',cube,matBread,[0,.02,.23],[.39,.12,.28]);
 put(eat,'Sandwich filling',cube,matFilling,[0,-.045,.23],[.36,.04,.29]);
 const stock=holder('Activity stock box');
 put(stock,'Cardboard parcel',cube,matStock,[0,.09,.30],[.60,.49,.52]);
 put(stock,'Parcel tape',cube,matTape,[0,.34,.30],[.09,.016,.52]);
 const mat=new T.Group();mat.name='Activity resting mat';mat.visible=false;model.root.add(mat);
 put(mat,'Surau rest mat',cube,matMat,[2.0,.035,0],[5.55,.055,2.70]);
 return {drink,eat,stock,mat};
}

// V86.15 — bounded two-bone reach, furniture-only pose offsets and facial/social cues.
// Presentation only: never writes staff records, world coordinates or navigation routes.
const ks15Clamp=(x,lo=0,hi=1)=>Math.max(lo,Math.min(hi,x));
const ks15Mix=(a,b,t)=>a+(b-a)*t;
const ks15Alpha=(dt,rate=9)=>1-Math.exp(-ks15Clamp(Number.isFinite(dt)?dt:0,0,.05)*rate);
const KS15_REACH=new Set(['pc','drink','eat','stock']);

// Adds a real elbow pivot to the semi-casual rig's segmented mesh parts.
// Original shoulder sleeves stay in place. Existing forearms, hands and handheld
// props are reparented with their world-space rest pose preserved.
function attachOfficePrecisionV8615(T,model){
 const limbs=[];
 for(const arm of model.arms||[]){
  if(!arm?.children||typeof arm.add!=='function'||typeof arm.remove!=='function')continue;
  const hand=arm.children.find(c=>c.name==='Hand');
  if(!hand)continue;
  const elbow=new T.Group();
  elbow.name='IK elbow';
  elbow.position.set(0,-1.04,0);
  // Reparent only the segmented lower arm and hand, never the sleeve or cuff.
  const parts=arm.children.filter(c=>c===hand||c.name==='Forearm'||c.name==='Wrist');
  for(const part of parts){
   arm.remove(part);
   elbow.add(part);
   part.position.y+=1.04;
  }
  arm.add(elbow);
  limbs.push({joint:arm,elbow,hand,handRestY:hand.position.y,upper:1.04,lower:.75});
 }
 const eyes=[],glints=[],brows=[],smiles=[];
 model.head.traverse(part=>{
  if(part.name==='Glossy oval eye')eyes.push({part,x:part.position.x,y:part.position.y});
  else if(part.name==='Eye catchlight'||part.name==='Small eye reflection')glints.push({part,x:part.position.x});
  else if(part.name==='Arched eyebrow')brows.push({part,y:part.position.y});
  else if(part.name==='Smile')smiles.push({part,y:part.position.y});
 });
 return {limbs,eyes,glints,brows,smiles,weight:0,seatOffsetX:0,seatOffsetZ:0};
}

// Analytic planar two-bone IK. The shoulder's z rotation provides limited
// lateral reach. Targets are clamped inside the limb workspace: no hyperextension.
function solveOfficeTwoBoneV8615(targetX,targetY,targetZ,shoulderX,shoulderY,upper=1.04,lower=.75){
 const dx=targetX-shoulderX,dy=targetY-shoulderY,dz=targetZ;
 const reach=Math.hypot(dy,dz);
 const distance=ks15Clamp(reach,Math.abs(upper-lower)+.06,upper+lower-.04);
 const aim=Math.atan2(dz,-dy);
 const bend=Math.acos(ks15Clamp((distance*distance-upper*upper-lower*lower)/(2*upper*lower),-1,1));
 const open=Math.acos(ks15Clamp((distance*distance+upper*upper-lower*lower)/(2*distance*upper),-1,1));
 return {shoulderX:ks15Clamp(-aim+open,-2.7,1.05),elbowX:-bend,shoulderZ:ks15Clamp(dx/(upper+lower)*.78,-.48,.48)};
}

function applyOfficePrecisionV8615(r,p,time,dt,context={}){
 const precision=r.precisionV8615;
 if(!precision)return;
 const alpha=ks15Alpha(dt,10);
 const stationary=p.status!=='walking'&&(r.walk||0)<.3;
 const action=p.action||'';
 const mode=stationary&&p.seated&&['pc-work','typing','designing','admin','production','reviewing'].includes(action)?'pc'
  :stationary&&(action==='drink'||action==='coffee')?'drink'
  :stationary&&action==='eat'?'eat'
  :stationary&&action==='stocking'?'stock':'idle';
 precision.weight=ks15Mix(precision.weight,KS15_REACH.has(mode)?1:0,alpha);
 const weight=precision.weight;
 const hands=precision.limbs;
 for(let i=0;i<hands.length;i++){
  const limb=hands[i],side=i===0?-1:1;
  // V86.14 animated a hand under the old parent. Reparenting requires a fixed
  // lower-arm local hand coordinate every frame, including when not reaching.
  limb.hand.position.z=.022;limb.elbow.rotation.y=0;limb.elbow.rotation.z=0;
  limb.hand.position.y=limb.handRestY+(mode==='pc'?Math.sin(time*13.2+side)*.019*weight:0);
  if(weight<.001){limb.elbow.rotation.x=ks15Mix(limb.elbow.rotation.x,0,alpha);continue;}
  const tap=mode==='pc'?Math.sin(time*13.2+side*2)*.035:0;
  const lift=(mode==='drink'||mode==='eat')?(.08+.17*(.5+.5*Math.sin(time*2.6+r.phase))):0;
  // Character-local anatomical targets, in the same coordinate system as the
  // imported shirt and furniture-facing rig. Both arms hold stock boxes.
  const target=mode==='pc'?[side*.37,3.02+tap,.84]
   :mode==='stock'?[side*.31,3.23+.12*Math.sin(time*1.5+r.phase),.80]
   :[side*.18,4.58+lift,.83];
  if((mode==='drink'||mode==='eat')&&i===0){limb.elbow.rotation.x=ks15Mix(limb.elbow.rotation.x,0,alpha);continue;}
  const shoulder=limb.joint.position;
  const solved=solveOfficeTwoBoneV8615(target[0],target[1],target[2],shoulder.x,shoulder.y,limb.upper,limb.lower);
  const blend=alpha*weight;
  limb.joint.rotation.x=ks15Mix(limb.joint.rotation.x,solved.shoulderX,blend);
  limb.joint.rotation.z=ks15Mix(limb.joint.rotation.z,solved.shoulderZ,blend);
  limb.elbow.rotation.x=ks15Mix(limb.elbow.rotation.x,solved.elbowX,blend);
 }
 // Smooth chair/body seating offsets only; NEVER move root or path destination.
 // Chair anchors are stored in the render scene's existing coordinates.
 // Emotion/eye tracking: preserve eye Y-size and the V86.9 blink correction.
 const partner=context.partner;
 const social=stationary&&['chat','meeting'].includes(action)&&partner;
 const focused=mode==='pc',tired=action==='sleep',friendly=Boolean(social)||action==='chat';
 const gaze=ks15Clamp(social?.lookX??(focused?Math.sin(time*.35+r.phase)*.25:Math.sin(time*.18+r.phase)*.5),-1,1)*.013;
 for(const e of precision.eyes)e.part.position.x=ks15Mix(e.part.position.x,e.x+gaze,ks15Alpha(dt,4));
 for(const g of precision.glints)g.part.position.x=ks15Mix(g.part.position.x,g.x+gaze*.85,ks15Alpha(dt,4));
 for(const b of precision.brows)b.part.position.y=ks15Mix(b.part.position.y,b.y+(friendly?.008:focused?-.012:tired?-.009:0),ks15Alpha(dt,3));
 for(const s of precision.smiles)s.part.position.y=ks15Mix(s.part.position.y,s.y+(friendly?.012:tired?-.006:0),ks15Alpha(dt,3));
 if(social){
  // Head attends to their actual partner; roots remain under the collision planner.
  r.head.rotation.y=ks15Mix(r.head.rotation.y,ks15Clamp(partner.headTurn,-.3,.3),ks15Alpha(dt,4));
  r.right.joint.rotation.x+=Math.sin(time*2.2+r.phase)*.065;
  r.right.joint.rotation.z+=Math.sin(time*1.65+r.phase)*.08;
 }
}

function pairOfficeSocialV8615(humans){
 const eligible=humans.filter(h=>h.person.status!=='walking'&&['chat','meeting'].includes(h.person.action||'')).slice(0,32);
 const pairs=new Map(),used=new Set();
 for(let i=0;i<eligible.length;i++){
  const a=eligible[i];if(used.has(a.person.id))continue;
  let best=null,dist=4.08;
  for(let j=i+1;j<eligible.length;j++){
   const b=eligible[j];if(used.has(b.person.id))continue;
   const d=Math.hypot(a.root.position.x-b.root.position.x,a.root.position.z-b.root.position.z);
   if(d>=.65&&d<dist){best=b;dist=d;}
  }
  if(!best)continue;
  used.add(a.person.id);used.add(best.person.id);
  const ax=best.root.position.x-a.root.position.x,az=best.root.position.z-a.root.position.z;
  const toB=Math.atan2(ax,az),toA=Math.atan2(-ax,-az);
  pairs.set(a.person.id,{personId:best.person.id,face:toB,headTurn:ks15Clamp(toB-a.root.rotation.y,-.25,.25),lookX:Math.sign(ax)});
  pairs.set(best.person.id,{personId:a.person.id,face:toA,headTurn:ks15Clamp(toA-best.root.rotation.y,-.25,.25),lookX:-Math.sign(ax)});
 }
 return pairs;
}

// Automatically trims rendering resolution only on sustained slow frames while
// the user selected Balanced. Never overwrites their saved quality preference.
function adaptiveOfficeQualityV8615(state,dt,mode,deviceDpr){
 if(!state)state={frames:0,total:0,ratio:Math.min(deviceDpr||1,1.35)};
 const max=Math.min(deviceDpr||1,1.35);
 if(mode!=='balanced')return {frames:0,total:0,ratio:null,change:false};
 if(!Number.isFinite(dt)||dt<=0||dt>.25)return {...state,change:false};
 state.frames++;state.total+=dt;
 if(state.frames<100)return {...state,change:false};
 const fps=state.frames/state.total;
 const next=fps<27?Math.max(.9,state.ratio-.12):fps>49?Math.min(max,state.ratio+.08):state.ratio;
 const change=Math.abs(next-state.ratio)>.025;
 return {frames:0,total:0,ratio:next,change};
}

function createOfficeHijabiRig(person) {
  const appearance=person.appearance||{};
  const model=appearance.model==='semi-casual'
    ?createHijabiCasualCharacter(__KS3D)
    :createHijabiCharacter(__KS3D);
  // Apply only allow-listed colours; never use style data as code or resource URLs.
  const safeHex=value=>typeof value==='string'&&/^#[0-9a-fA-F]{6}$/.test(value)?value:null;
  const scarf=safeHex(appearance.scarfColor),shirt=safeHex(appearance.shirtColor),pants=safeHex(appearance.pantsColor);
  if(scarf)model.setScarfColor?.(scarf);
  if(shirt){
    if(model.setShirtColor)model.setShirtColor(shirt);
    else model.materials['Plain ivory long shirt']?.color.set(shirt);
  }
  if(pants){
    if(model.setPantsColor)model.setPantsColor(pants);
    else {model.materials['Charcoal twill']?.color.set(pants);model.materials['Knees']?.color.set(pants).multiplyScalar(1.08)}
  }
  if(model.setGlasses)model.setGlasses(appearance.glasses===true);
  else attachClassicGlasses(model,appearance.glasses===true);
  const root=model.root;
  root.name=`character:${person.name}`;
  root.userData.officeHijabi=true;
  root.userData.characterVersion=12;
  root.userData.characterModel=appearance.model==='semi-casual'?'semi-casual':'classic';
  root.userData.glasses=appearance.glasses===true;
  root.userData.gender='female';
  root.scale.setScalar(.42);
  const eyes=[];
  model.head.traverse(obj=>{if(obj.name==='Glossy oval eye'){obj.userData.baseScaleY=obj.scale.y;eyes.push(obj)}});
  const limb=joint=>({joint,lower:new __KS3D.Group(),end:joint.children.find(child=>child.name==='Hand')||joint.children.find(child=>child.name==='IK elbow')?.children.find(child=>child.name==='Hand')||new __KS3D.Group()});
  const cup=new __KS3D.Group();cup.visible=false;
  const activityProps=attachOfficeActivityProps(__KS3D,model);
  const precisionV8615=attachOfficePrecisionV8615(__KS3D,model);
  return {emote:'',emoteStart:-100,root,body:model.body,chest:model.chest,head:model.head,eyes,activityProps,precisionV8615,
    left:limb(model.arms[0]),right:limb(model.arms[1]),leftLeg:limb(model.legs[0]),rightLeg:limb(model.legs[1]),
    cup,phase:person.id*.83,gait:person.id*.81,waveStart:-100,walk:0,sit:person.seated?1:0,
    initialized:false,lastPosition:new __KS3D.Vector3()};
}

const interp=(a,b,t)=>a+(b-a)*t;
const smoothstep=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u)};
// V86.14 — shared, frame-rate-independent choreography for both character models.
// All poses are local to the imported skeletal pivots; no teleporting or extra colliders.
const KS_ACTIONS_V8614=['pc','drink','eat','stock','sleep','quiet'];
const ksClamp=(value,min=0,max=1)=>Math.max(min,Math.min(max,value));
const ksEase=t=>{const x=ksClamp(t);return x*x*(3-2*x)};
const ksBlend=(current,target,alpha)=>current+(target-current)*alpha;
function officeInteractionMode(p){
 if(p.status==='walking')return 'walk';
 if(p.action==='sleep')return 'sleep';
 if(p.action==='reading'&&p.status==='break')return 'quiet';
 if((p.action==='drink'||p.action==='coffee'))return 'drink';
 if(p.action==='eat')return 'eat';
 if(p.action==='stocking')return 'stock';
 if(p.seated&&['pc-work','typing','designing','admin','production','reviewing'].includes(p.action))return 'pc';
 return 'idle';
}
function applyOfficeInteractionV8614(r,p,time,dt){
 const mode=officeInteractionMode(p),safeDt=ksClamp(Number.isFinite(dt)?dt:0,0,.05);
 // The outgoing pose fades while the next one fades in. The timeline remains the
 // only authority over worker activity; these weights are local presentation state.
 if(!r.interactionV8614){
  r.interactionV8614={mode,age:0,weights:Object.fromEntries(KS_ACTIONS_V8614.map(key=>[key,0])),lastTime:time};
 }
 const state=r.interactionV8614;
 if(mode!==state.mode){state.mode=mode;state.age=0}
 else state.age+=safeDt;
 const alpha=1-Math.exp(-safeDt*7.5);
 for(const key of KS_ACTIONS_V8614)state.weights[key]=ksBlend(state.weights[key],key===mode?1:0,alpha);
 const mix=state.weights;
 const wave=(speed,phase=0)=>.5+.5*Math.sin(time*speed+r.phase+phase);
 const pc=mix.pc,drink=mix.drink,eat=mix.eat,stock=mix.stock,sleep=mix.sleep,quiet=mix.quiet;
 const strength=1-ksClamp(r.walk||0);
 const rest=ksClamp(sleep+quiet);
 // PC: tilt forearms onto the keyboard; wrists alternate quick, subtle taps.
 if(pc>.0001){
  const cadence=13.5;
  for(const [arm,sign] of [[r.left,-1],[r.right,1]]){
   const w=pc*strength,offset=Math.sin(time*cadence+r.phase+sign*1.7);
   arm.joint.rotation.x=ksBlend(arm.joint.rotation.x,-1.23+.045*offset,w);
   arm.joint.rotation.z=ksBlend(arm.joint.rotation.z,-sign*.27,w);
   if(arm.end){
    arm.end.position.y=ksBlend(arm.end.position.y,-1.79+.022*offset,w);
    arm.end.rotation.x=ksBlend(arm.end.rotation.x,.025*offset,w);
   }
  }
  r.head.rotation.x=ksBlend(r.head.rotation.x,.055+Math.sin(time*.66+r.phase)*.012,pc*strength);
  r.head.rotation.y+=Math.sin(time*.54+r.phase)*.012*pc*strength;
 }
 // Pantry: lift the real right hand near the face, tip cup/snack only near the mouth.
 if(drink>.0001||eat>.0001){
  const sipping=ksEase(ksClamp((wave(2.1)-.24)/.58)),biting=ksEase(ksClamp((wave(2.7,.45)-.3)/.55));
  const lift=(drink*sipping+eat*biting)*strength;
  r.right.joint.rotation.x=ksBlend(r.right.joint.rotation.x,-1.38-.22*lift,ksClamp(drink+eat)*strength);
  r.right.joint.rotation.z=ksBlend(r.right.joint.rotation.z,-.16,ksClamp(drink+eat)*strength);
  if(r.right.end)r.right.end.position.y=ksBlend(r.right.end.position.y,-1.79+.48*lift,ksClamp(drink+eat)*strength);
  r.head.rotation.x-=.055*lift;
  if(r.activityProps){
   r.activityProps.drink.rotation.x=-.28*sipping;
   r.activityProps.eat.rotation.x=-.08*biting;
  }
 }
 // Store: approach shelf, lift stock with both hands, inspect, then place it.
 // Sequence is visual only and never modifies inventory or the database.
 if(stock>.0001){
  const cycle=(time*.29+r.phase*.11)%1;
  const picking=ksEase(cycle/.22)*(1-ksEase((cycle-.66)/.25));
  const lift=.5+.5*Math.sin(time*1.8+r.phase);
  const w=stock*strength;
  r.chest.rotation.x=ksBlend(r.chest.rotation.x,-.12+.08*picking,w);
  for(const [arm,sign] of [[r.left,-1],[r.right,1]]){
   arm.joint.rotation.x=ksBlend(arm.joint.rotation.x,-.85-.28*picking+.08*lift,w);
   arm.joint.rotation.z=ksBlend(arm.joint.rotation.z,-sign*.27,w);
  }
  if(r.activityProps){
   r.activityProps.stock.position.y=-.14+.29*picking;
   r.activityProps.stock.rotation.z=.06*Math.sin(time*2.5+r.phase);
   r.activityProps.stock.visible=mode==='stock';
  }
 }
 // Surau: ease into a quiet kneel when reading, or a low side-rest on the mat.
 // The prior V86.11 reclining translation remains compatible with the existing floor.
 if(quiet>.0001){
  const w=quiet*strength;
  r.body.position.y=ksBlend(r.body.position.y,-.54,w);
  r.body.rotation.x=ksBlend(r.body.rotation.x,.12,w);
  r.leftLeg.joint.rotation.x=ksBlend(r.leftLeg.joint.rotation.x,-1.45,w);
  r.rightLeg.joint.rotation.x=ksBlend(r.rightLeg.joint.rotation.x,-1.45,w);
  r.left.joint.rotation.x=ksBlend(r.left.joint.rotation.x,-.49,w);
  r.right.joint.rotation.x=ksBlend(r.right.joint.rotation.x,-.49,w);
  r.head.rotation.x=ksBlend(r.head.rotation.x,.14,w);
 }
 if(sleep>.0001){
  const w=sleep*strength;
  r.body.rotation.z=ksBlend(r.body.rotation.z,-1.37,w);
  r.body.position.y+=.011*Math.sin(time*1.3+r.phase)*w;
  r.body.position.x=ksBlend(r.body.position.x,-.52,w);
  r.head.rotation.x=ksBlend(r.head.rotation.x,.08,w);
  r.left.joint.rotation.x=ksBlend(r.left.joint.rotation.x,-.20,w);
  r.right.joint.rotation.x=ksBlend(r.right.joint.rotation.x,-.20,w);
 }
 if(r.activityProps){
  // Visibility belongs to the authoritative activity, not the outgoing blend.
  const a=r.activityProps;
  a.drink.visible=mode==='drink'&&strength>.15;
  a.eat.visible=mode==='eat'&&strength>.15;
  a.stock.visible=mode==='stock'&&strength>.15;
  a.mat.visible=(mode==='sleep'&&sleep>.2||mode==='quiet'&&quiet>.15)&&strength>.15;
 }
 // Fade inherited sleeping geometry when leaving the surau; do not suppress walking.
 if(mode==='walk'&&r.activityProps){
  const a=r.activityProps;a.drink.visible=false;a.eat.visible=false;a.stock.visible=false;a.mat.visible=false;
 }
 return state;
}

// Aiming uses real furniture stations in the existing V86.12 scene; it never
// changes a character's navigation coordinates or creates new collision bodies.
function officeInteractionFacingV8614(action,x,z){
 if(!Number.isFinite(x)||!Number.isFinite(z))return null;
 let target=null;
 if((action==='drink'||action==='coffee')&&x>=-5.9&&x<=-2.15&&z>=1.5&&z<=8.4)target=[-5.08,5.25];
 else if(action==='eat'&&x>=-5.7&&x<=-2.1&&z>=1.5&&z<=6.9)target=[-3.45,3.65];
 else if(action==='stocking'&&x>=.7&&x<=5.6&&z>=5.6&&z<=11.1)target=[5.03,z<7.75?6.8:z<9.35?8.65:10.1];
 if(!target||Math.hypot(target[0]-x,target[1]-z)<.13)return null;
 return Math.atan2(target[0]-x,target[1]-z);
}

function animateOfficeHijabi(r,p,time,dt,distance){
 const t=time+r.phase,walkTo=p.status==='walking'?1:0;
 const active=r.emote!==''&&time-r.emoteStart>=0&&time-r.emoteStart<3.6;
 const sitTo=p.seated&&!walkTo&&!active?1:0;
 if(!r.initialized){r.walk=walkTo;r.sit=sitTo;r.initialized=true;r.sleep=0}
 const k=1-Math.exp(-Math.min(.05,Math.max(0,dt))*9);
 r.walk=interp(r.walk,walkTo,k);r.sit=r.seatStateV8620?r.seatStateV8620.dockMix:interp(r.sit,sitTo,k);
 r.sleep=interp(r.sleep||0,p.action==='sleep'&&!walkTo?1:0,Math.min(.15,k));
 r.gait+=Math.min(Math.max(distance,0),.3)*4.3;
 const stride=Math.sin(r.gait),opposite=Math.sin(r.gait+Math.PI),walk=r.walk,sit=r.sit,nap=r.sleep;
 const pc=sit*(1-walk)*(1-nap)*(['pc-work','typing','designing','admin','reviewing'].includes(p.action||'' )?1:0);
 const drink=(p.action==='drink'||p.action==='coffee')&&!walk&&!nap;
 const eat=p.action==='eat'&&!walk&&!nap;
 const stock=p.action==='stocking'&&!walk&&!nap;
 r.body.position.y=-.90*sit+Math.abs(stride)*.045*walk-.12*nap+Math.sin(t*1.3)*.012*nap;
 r.body.position.x=-.55*nap;
 // Always reset the visual body's depth before each pose calculation.
 r.body.position.z=0;
 r.body.rotation.x=0;
 r.body.rotation.y=0;
 r.body.rotation.z=(Math.sin(t*.6)*.008*(1-walk)+stride*.022*walk)*(1-nap)-1.33*nap;
 r.chest.rotation.z=Math.sin(r.gait+Math.PI)*.014*walk;
 r.chest.rotation.y=Math.sin(t*.4)*.006*(1-walk);
 // Visual micro-motion: subtle breathing, focus while typing and stock-handling lean.
 r.chest.rotation.x=.015*Math.sin(t*1.7)*(1-walk)*(1-nap)+.023*pc-.026*stock;
 r.chest.scale.y=1+.0045*Math.sin(t*1.6)*(1-walk);
 r.head.rotation.x=Math.sin(t*.9)*.018-.02*sit+.10*nap+.035*pc;
 r.head.rotation.y=Math.sin(t*.55)*.10*(1-walk*.65)*(1-nap);
 r.head.rotation.z=Math.sin(t*.4)*.018*(1-walk)+.20*nap;
 r.eyes.forEach(eye=>{const bl=t%(3.45+(r.phase%2)*.3);
  const blinking=1-.90*Math.max(0,1-Math.abs(bl-.15)/.10);
  const base=typeof eye.userData?.baseScaleY==='number'?eye.userData.baseScaleY:(eye.scale.y||1);
  eye.scale.y=base*interp(blinking,.09,nap);
 });
 r.leftLeg.joint.rotation.x=interp(interp(stride*.35*walk,-1.15,sit),-.34,nap);
 r.rightLeg.joint.rotation.x=interp(interp(opposite*.35*walk,-1.15,sit),.25,nap);
 const typing=sit*(1-walk)*(1-nap)*(['typing','pc-work','designing','admin','production','reviewing'].includes(p.action||'')?1:.20);
 for(const [arm,sign] of [[r.left,-1],[r.right,1]]){
  arm.joint.rotation.y=0;
  arm.joint.rotation.x=interp(-sign*stride*.32*walk,-.79+Math.sin(t*(pc?13:6)+sign)*.07,typing);
  arm.joint.rotation.z=sign*.17;
  if(arm.end){
    arm.end.rotation.x=pc?Math.sin(t*14+sign)*.075*pc:0;
    // Tiny per-hand key taps use the model's original wrist offset.
    arm.end.position.y=-1.79+(pc?Math.sin(t*13.5+sign*1.4)*.016:0);
  }
  arm.joint.rotation.y=0;
  arm.joint.rotation.x=interp(arm.joint.rotation.x,-.11,nap);
 }
 // Occupancy-based activities are exclusive: props never appear in the wrong room.
 const props=r.activityProps;
 if(props){props.drink.visible=!!drink;props.eat.visible=!!eat;props.stock.visible=!!stock;props.mat.visible=p.action==='sleep'&&!walk&&nap>.2}
 if(drink){const sip=.5+.5*Math.sin(t*2.35);r.right.joint.rotation.x=-.40-.45*sip;r.right.joint.rotation.z=-.38;r.head.rotation.x-=.05*sip}
 if(eat){const bite=.5+.5*Math.sin(t*2.8);r.right.joint.rotation.x=-.42-.55*bite;r.right.joint.rotation.z=-.30;r.head.rotation.x+=.035*bite}
 if(stock){const handling=.5+.5*Math.sin(t*1.65);r.right.joint.rotation.x=-.24-.32*handling;r.right.joint.rotation.z=-.30;r.left.joint.rotation.x=-.32-.18*handling;r.left.joint.rotation.z=.26;r.head.rotation.x+=.06}
 if(p.action==='meeting'&&!walk){r.right.joint.rotation.x-=.22;r.head.rotation.y+=Math.sin(t*.8)*.065}
 if(p.action==='reading'&&!walk){r.head.rotation.x+=.07;r.left.joint.rotation.x-=.22}
 if(p.action==='production'&&!walk){r.right.joint.rotation.x-=.20}
 if(p.action==='chat'&&!walk){r.right.joint.rotation.x-=.25;r.head.rotation.y+=Math.sin(t*.7)*.07}
 // Uploaded character props are managed above, so the legacy coffee prop remains hidden.
 r.cup.visible=false;
 const age=time-r.waveStart;
 const wave=age>=0&&age<1.7?smoothstep(0,.25,age)*(1-smoothstep(1.25,1.7,age))*(1-walk)*(1-nap):0;
 if(wave){r.right.joint.rotation.z+=1.52*wave;r.right.joint.rotation.x-=.22*wave}
 const actionAge=time-r.emoteStart;
 const power=actionAge>=0&&actionAge<3.6?smoothstep(0,.35,actionAge)*(1-smoothstep(2.9,3.6,actionAge))*(1-walk)*(1-nap):0;
 if(power){
  if(r.emote==='dance'){r.body.position.y+=Math.abs(Math.sin(actionAge*8))*.17*power;r.left.joint.rotation.z-=.9*power;r.right.joint.rotation.z+=.9*power}
  else if(r.emote==='celebrate'||r.emote==='stretch'){r.left.joint.rotation.z-=1.25*power;r.right.joint.rotation.z+=1.25*power}
  else if(r.emote==='wave')r.right.joint.rotation.z+=1.3*power;
 }
 applyOfficeInteractionV8614(r,p,time,dt);
 applyOfficePrecisionV8615(r,p,time,dt,r.precisionSceneV8615||{});
}

/* Office Plus V86.8: supplied customizable male model and compatible animation rig. */
const HAIR_STYLES=new Set(['fade','quiff','sidepart','korean','messy']);
const hex=v=>typeof v==='string'&&/^#[0-9a-fA-F]{6}$/.test(v)?v:null;
function createOfficeMaleRig(person){
  const appearance=person.appearance||{};
  const model=createMaleCharacter(__KS3D);
  model.setHairStyle(HAIR_STYLES.has(appearance.hairStyle)?appearance.hairStyle:'fade');
  const hair=hex(appearance.hairColor);
  const shirt=hex(appearance.shirtColor),pants=hex(appearance.pantsColor);
  if(hair)model.setHairColor(hair);
  if(shirt)model.setShirtColor(shirt);
  if(pants)model.setPantsColor(pants);
  model.setGlasses(appearance.glasses===true);
  const root=model.root;
  root.name=`character:${person.name}`;
  root.userData.officeMale=true;
  root.userData.characterVersion=13;
  root.userData.characterModel='semi-casual';
  root.userData.hairStyle=HAIR_STYLES.has(appearance.hairStyle)?appearance.hairStyle:'fade';
  root.userData.glasses=appearance.glasses===true;
  root.userData.gender='male';
  root.scale.setScalar(.42);
  const eyes=[];
  model.head.traverse(obj=>{if(obj.name==='Glossy oval eye'){obj.userData.baseScaleY=obj.scale.y;eyes.push(obj)}});
  const limb=joint=>({joint,lower:new __KS3D.Group(),end:joint.children.find(child=>child.name==='Hand')||joint.children.find(child=>child.name==='IK elbow')?.children.find(child=>child.name==='Hand')||new __KS3D.Group()});
  const cup=new __KS3D.Group();cup.visible=false;
  const activityProps=attachOfficeActivityProps(__KS3D,model);
  const precisionV8615=attachOfficePrecisionV8615(__KS3D,model);
  return {emote:'',emoteStart:-100,root,body:model.body,chest:model.chest,head:model.head,eyes,activityProps,precisionV8615,
    left:limb(model.arms[0]),right:limb(model.arms[1]),leftLeg:limb(model.legs[0]),rightLeg:limb(model.legs[1]),
    cup,phase:person.id*.83,gait:person.id*.81,waveStart:-100,walk:0,sit:person.seated?1:0,
    initialized:false,lastPosition:new __KS3D.Vector3()};
}
function animateOfficeMale(r,p,time,dt,distance){animateOfficeHijabi(r,p,time,dt,distance)}

export {createOfficeHijabiRig,animateOfficeHijabi,createOfficeMaleRig,animateOfficeMale,pairOfficeSocialV8615,adaptiveOfficeQualityV8615};
