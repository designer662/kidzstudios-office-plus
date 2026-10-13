/* Office Plus V86.20: deterministic local-only chair docking and articulated sitting.
 * No shared-plan coordinates are changed. Depends only on the browser's animation clock.
 */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.KSOfficeSeating=api;
})(typeof window!=='undefined'?window:(typeof globalThis!=='undefined'?globalThis:null),function(){
 'use strict';
 const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
 const exp=(dt,rate)=>1-Math.exp(-clamp(Number(dt)||0,0,.05)*rate);
 const angleDiff=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
 const chairs=[
  [-1.5,-12.45,Math.PI/2,2],[3.2,-12.45,-Math.PI/2,3],
  [-1.5,-10.2,Math.PI/2,null],[3.2,-10.2,-Math.PI/2,null],
  [-1.5,-7.95,Math.PI/2,null],[3.2,-7.95,-Math.PI/2,null],
  [-.15,-14.85,Math.PI,1],[3.1,-14.85,Math.PI,7],
  [3.2,4.05,Math.PI,0],[-3.45,2.45,0,null],[-3.45,4.85,Math.PI,null]
 ].map(([x,z,yaw,staffId],index)=>Object.freeze({index,x:x*1.5,z:z*1.5,yaw,staffId}));
 // Exact, staff-owned seats. Showroom staff aren't entitled to an arbitrary
 // workstation just because they stop close to it.
 function findChair(x,z,id,limit=1.18){
  if(!Number.isFinite(x)||!Number.isFinite(z))return null;
  const assigned=chairs.find(c=>c.staffId===id);
  let result=null,best=limit;
  for(const chair of chairs){
   if(assigned?chair!==assigned:chair.staffId!==null)continue;
   const d=Math.hypot(chair.x-x,chair.z-z);
   if(d<best){result=chair;best=d}
  }
  return result;
 }
 function createState(){return {phase:'standing',seatMix:0,chair:null,ready:false,initialized:false};}
 /**
  * Step the purely visual sitting state. "seated" is desired intent from the
  * synchronized timeline, not an instruction to teleport the navigation root.
  */
 function step(state,input,dt){
  const st=state||createState();
  const walking=input.status==='walking'||input.walking===true;
  const requested=Boolean(input.seated)&&!walking;
  const chair=requested?findChair(input.x,input.z,input.id):null;
  const distance=chair?Math.hypot(chair.x-input.x,chair.z-input.z):Infinity;
  const facing=chair?Math.abs(angleDiff(input.yaw||0,chair.yaw)):Infinity;
  // If the shared position has not reached the chair, do NOT bend the knees.
  const ready=Boolean(chair&&distance<=1.05&&facing<=.42&&Number(input.speed||0)<.16);
  const target=ready?1:0;
  if(!st.initialized){st.initialized=true;st.seatMix=ready?1:0;}
  // Separate lower/faster exit from calm sit-down. Deterministic for identical
  // frames on every device, without ever publishing local pose offsets.
  st.seatMix+= (target-st.seatMix)*exp(dt,target?4.1:7.5);
  st.seatMix=clamp(st.seatMix,0,1);
  if(st.seatMix>.9995)st.seatMix=1;
  if(st.seatMix<.0001)st.seatMix=0;
  // Keep the previous seat visual until the rise animation has fully faded.
  // Otherwise the avatar would snap sideways the instant its walk flag changes.
  st.chair=chair||(st.seatMix>.02?st.chair:null);st.ready=ready;
  st.phase=walking?(st.seatMix>.02?'rising':'walking'):
   !chair?(st.seatMix>.02?'rising':'standing'):
   !ready?(st.seatMix>.02?'rising':distance>1.05?'approaching':'turning'):
   st.seatMix>.985?'seated':'sitting';
  return st;
 }
 // Legs in the supplied male and hijabi rigs are single-piece meshes. Introduce
 // a knee pivot and reparent ONLY lower-leg geometry, retaining the original mesh
 // shapes/materials, without re-importing or rebuilding the characters.
 const shinNames=new Set([
  'Lower trouser leg','Outer trouser seam','Rubber outsole','Sole welt',
  'Sneaker upper','Rounded toe cap','Padded shoe tongue','Cotton shoelace',
  'Toe cap stitching'
 ]);
 function installKnees(rig,T){
  if(!rig||!T?.Group||rig.officeKneesV8620)return rig?.officeKneesV8620||[];
  const result=[];
  for(const limb of [rig.leftLeg,rig.rightLeg]){
   const hip=limb?.joint;
   const leg=hip?.children?.find(c=>c.name==='Left leg'||c.name==='Right leg');
   if(!leg)continue;
   const knee=new T.Group();knee.name='Office sitting knee';
   knee.position.y=1.315;leg.add(knee);
   // Geometry coordinates are in the leg's local space. Translate the reparented
   // mesh's position by the knee pivot height so the resting model stays identical.
   for(const child of [...leg.children]){
    if(child===knee||!shinNames.has(child.name))continue;
    leg.remove(child);knee.add(child);child.position.y-=1.315;
   }
   result.push(knee);
  }
  rig.officeKneesV8620=result;
  return result;
 }
 /**
  * Run AFTER legacy animation: final calibrated pose is absolute each frame,
  * not a cumulative += offset. Kept inside the model's local body group.
  */
 function pose(rig,state,dt){
  if(!rig?.body||!rig.root||!state)return;
  const mix=clamp(state.seatMix,0,1),chair=state.chair;
  const root=rig.root,scale=root.scale?.x||1;
  const angle=root.rotation?.y||0,c=Math.cos(angle),s=Math.sin(angle);
  const dx=chair?chair.x-root.position.x:0,dz=chair?chair.z-root.position.z:0;
  // The body pivot is also the pelvis parent. The same inverse rotation is used
  // for both axes; this places the hips over the actual chair cushion.
  const localX=chair?clamp((dx*c-dz*s)/scale,-2.85,2.85):0;
  const localZ=chair?clamp((dx*s+dz*c)/scale,-2.85,2.85):0;
  rig.body.position.x=localX*mix;
  rig.body.position.z=localZ*mix;
  // The model pelvis is y=2.48. Chair top is y=.726, root floor y=.08,
  // model scale .42: desired local y offset is (.726-.08)/.42-2.48=-.9419.
  // Keep non-seating animation contributions for falling-asleep/walking actions.
  const walking=rig.walk||0,nap=rig.sleep||0;
  rig.body.position.y=-.9419*mix+Math.abs(Math.sin(rig.gait||0))*.045*walking*(1-mix)-.12*nap*(1-mix);
  // Genuine articulated sitting: rotate the upper leg about the hip and the
  // lower leg in the opposite direction about the knee. Feet point at the floor.
  for(const limb of [rig.leftLeg,rig.rightLeg]){
   if(!limb?.joint)continue;
   const walkAngle=limb.joint.rotation?.x||0;
   limb.joint.rotation.x=walkAngle*(1-mix)-1.15*mix;
  }
  for(const knee of rig.officeKneesV8620||[])knee.rotation.x=1.13*mix;
  // Sitting is not sleeping; keep chest upright, including during docking.
  if(rig.chest)rig.chest.rotation.x=(rig.chest.rotation.x||0)*(1-.7*mix);
 }
 return {chairs,findChair,createState,step,installKnees,pose,angleDiff};
});
