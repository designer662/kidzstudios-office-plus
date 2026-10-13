/* Office Plus V86.21: furniture-aware pose engine.
   Reads actual 3D chair positions. Never edits shared navigation coordinates. */
(function(root,factory){
 const api=factory();
 if(typeof module==='object'&&module.exports)module.exports=api;
 if(root)root.KSOfficeSeating=api;
})(typeof window!=='undefined'?window:(typeof globalThis!=='undefined'?globalThis:null),function(){
 'use strict';
 const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
 const smooth=t=>{const v=clamp(t,0,1);return v*v*(3-2*v)};
 const alpha=(dt,rate)=>1-Math.exp(-clamp(Number(dt)||0,0,.05)*rate);
 const angleDiff=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
 const ownership=Object.freeze([2,3,null,null,null,null,1,7,0,null,null]);
 const defaults=[[-1.5,-12.45,Math.PI/2],[3.2,-12.45,-Math.PI/2],
   [-1.5,-10.2,Math.PI/2],[3.2,-10.2,-Math.PI/2],
   [-1.5,-7.95,Math.PI/2],[3.2,-7.95,-Math.PI/2],
   [-.15,-14.85,Math.PI],[3.1,-14.85,Math.PI],
   [3.2,4.05,Math.PI],[-3.45,2.45,0],[-3.45,4.85,Math.PI]];
 const chairs=[];
 const seat=(x,z,yaw,index,height=.726,source='fallback')=>Object.freeze({index,x,z,yaw,staffId:ownership[index]??null,height,source});
 function fillDefaults(){chairs.splice(0,chairs.length,...defaults.map(([x,z,yaw],i)=>seat(x*1.5,z*1.5,yaw,i)));}
 fillDefaults();
 let useSceneFurniture=false;
 function registerChair(spec){
  if(!spec||![spec.x,spec.z,spec.yaw,spec.seatHeight].every(Number.isFinite))return null;
  if(!useSceneFurniture){chairs.length=0;useSceneFurniture=true;}
  const index=chairs.length,item=seat(spec.x,spec.z,spec.yaw,index,spec.seatHeight,'scene');
  chairs.push(item);return item;
 }
 function resetFurniture(){useSceneFurniture=false;fillDefaults();}
 function selectChair(x,z,id,limit=1.28){
  if(!Number.isFinite(x)||!Number.isFinite(z)||!Number.isInteger(id))return null;
  const assigned=chairs.find(c=>c.staffId===id);
  return assigned&&Math.hypot(assigned.x-x,assigned.z-z)<=limit?assigned:null;
 }
 const findChair=selectChair;
 function createState(){return {phase:'standing',chair:null,seatMix:0,dockMix:0,ready:false,initialized:false};}
 function step(state,input={},dt=0){
  const st=state||createState(),walking=input.status==='walking'||input.walking===true;
  const wants=Boolean(input.seated)&&!walking;
  const chair=wants?selectChair(input.x,input.z,Number(input.id)):null;
  const distance=chair?Math.hypot(chair.x-input.x,chair.z-input.z):Infinity;
  const facing=chair?Math.abs(angleDiff(input.yaw||0,chair.yaw))<=.38:false;
  const stopped=Number(input.speed||0)<.19;
  const ready=Boolean(chair&&distance<=1.20&&facing&&stopped);
  const target=ready?1:0;
  st.seatMix=clamp(st.seatMix+(target-st.seatMix)*alpha(dt,target?3.6:6.8),0,1);
  if(st.seatMix<.00015)st.seatMix=0;
  if(st.seatMix>.9995)st.seatMix=1;
  st.dockMix=smooth((st.seatMix-.08)/.8);
  st.chair=chair||(st.seatMix>.015?st.chair:null);
  st.ready=ready;st.initialized=true;
  st.phase=walking?(st.seatMix>.015?'rising':'walking'):
   !chair?(st.seatMix>.015?'rising':'standing'):
   !stopped?'approaching':!facing?'turning':st.seatMix>.985?'seated':'sitting';
  return st;
 }
 // These actual avatar assets nest named lower-leg parts inside each "Left/Right leg" Group.
 const shinNames=new Set(['Soft articulated knee','Lower trouser leg','Outer trouser seam',
  'Rubber outsole','Sole welt','Sneaker upper','Rounded toe cap',
  'Padded shoe tongue','Cotton shoelace','Toe cap stitching']);
 function installKnees(rig,T){
  if(!rig||!T?.Group)return [];
  if(rig.officeKneesV8621)return rig.officeKneesV8621;
  const result=[];
  for(const limb of [rig.leftLeg,rig.rightLeg]){
   const hip=limb?.joint;
   const leg=hip?.children?.find(c=>c.name==='Left leg'||c.name==='Right leg');
   if(!leg)continue;
   const knee=new T.Group();knee.name='Furniture knee pivot';knee.position.y=1.315;leg.add(knee);
   for(const child of [...leg.children]){
    if(child===knee||!shinNames.has(child.name))continue;
    leg.remove(child);knee.add(child);child.position.y-=1.315;
   }
   result.push(knee);
  }
  rig.officeKneesV8621=result;
  return result;
 }
 function pose(rig,state,dt){
  if(!rig?.body||!rig.root||!state)return;
  const mix=clamp(state.seatMix,0,1),dock=clamp(state.dockMix,0,1),chair=state.chair;
  const root=rig.root,scale=root.scale?.x||1;
  const a=root.rotation?.y||0,c=Math.cos(a),s=Math.sin(a);
  const dx=chair?chair.x-root.position.x:0,dz=chair?chair.z-root.position.z:0;
  const localX=chair?clamp((dx*c-dz*s)/scale,-3.1,3.1):0;
  const localZ=chair?clamp((dx*s+dz*c)/scale,-3.1,3.1):0;
  // Absolute transforms ensure no cumulative flying/drifting with long sessions.
  rig.body.position.x=localX*dock;rig.body.position.z=localZ*dock;
  const seatHeight=chair?.height??.726,rootY=Number(root.position?.y)||0;
  const vertical=(seatHeight-rootY)/scale-2.48;
  const walking=rig.walk||0,nap=rig.sleep||0;
  rig.body.position.y=vertical*mix+Math.abs(Math.sin(rig.gait||0))*.045*walking*(1-mix)-.12*nap*(1-mix);
  for(const limb of [rig.leftLeg,rig.rightLeg]){
   if(!limb?.joint)continue;
   const walkingAngle=limb.joint.rotation?.x||0;
   limb.joint.rotation.x=walkingAngle*(1-mix)-1.18*mix;
  }
  for(const knee of rig.officeKneesV8621||[])knee.rotation.x=1.2*mix;
  if(rig.chest)rig.chest.rotation.x=(rig.chest.rotation.x||0)*(1-.72*mix);
 }
 return {chairs,registerChair,resetFurniture,selectChair,findChair,createState,step,installKnees,pose,angleDiff};
});
