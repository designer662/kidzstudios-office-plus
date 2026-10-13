/* Office Plus V86.22. Desk bindings use the live roster; pose offsets are local. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.KSOfficeSeating=api;
})(typeof window!=='undefined'?window:globalThis,function(){
  'use strict';
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
  const smooth=v=>{v=clamp(v,0,1);return v*v*(3-2*v)};
  const angleDiff=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
  const chairs=[],assignments=new Map();
  function resetFurniture(){chairs.length=0;assignments.clear();}
  function registerChair(spec){
    if(!spec||![spec.x,spec.z,spec.yaw,spec.seatHeight].every(Number.isFinite)||spec.seatHeight<=0)return null;
    const key=spec.key||'visitor-'+chairs.length;
    if(chairs.some(c=>c.key===key))throw new Error('Duplicate chair: '+key);
    const chair=Object.freeze({key,index:chairs.length,x:spec.x,z:spec.z,yaw:spec.yaw,
      height:spec.seatHeight,source:'scene',floorY:spec.floorY??.035,workPoint:spec.workPoint||null});
    chairs.push(chair);return chair;
  }
  function bindStaff(staff){
    assignments.clear();const occupied=new Set();
    for(const person of staff||[]){
      if(!Number.isInteger(person.id)||!person.seatId||occupied.has(person.seatId))continue;
      const chair=chairs.find(c=>c.key===person.seatId);
      if(chair){assignments.set(person.id,chair);occupied.add(chair.key);}
    }
  }
  function selectChair(x,z,id,limit=1.65){
    if(![x,z].every(Number.isFinite)||!Number.isInteger(id))return null;
    const chair=assignments.get(id);
    return chair&&Math.hypot(chair.x-x,chair.z-z)<=limit?chair:null;
  }
  function createState(){return {phase:'standing',chair:null,seatMix:0,dockMix:0,ready:false};}
  function holdMovement(state,input){return Boolean(state?.seatMix>0&&(!input.seated||input.status==='walking'||input.emote));}
  function step(state,input={},dt=0){
    const st=state||createState();
    if(!Number.isFinite(dt)||dt<=0||input.paused)return st;
    dt=Math.min(dt,.05);
    const walking=input.status==='walking'||input.walking===true;
    const wants=Boolean(input.seated)&&!walking&&!input.emote;
    let chair=wants?selectChair(input.x,input.z,Number(input.id)):null;
    if(chair&&input.canDock&&!input.canDock(chair))chair=null;
    if(st.seatMix>0&&chair!==st.chair)chair=null;
    const facing=chair&&Number.isFinite(input.yaw)&&Math.abs(angleDiff(input.yaw,chair.yaw))<.16;
    const stopped=Number.isFinite(input.speed)&&input.speed<.08;
    const ready=Boolean(chair&&facing&&stopped);
    if(ready)st.chair=chair;
    st.seatMix=clamp(st.seatMix+(ready?dt/.9:-dt/.75),0,1);
    st.dockMix=smooth(st.seatMix);st.ready=ready;st.action=input.action||'pc-work';
    st.phase=!ready&&st.seatMix>0?'rising':walking?'walking':!chair?'standing':
      !stopped?'approaching':!facing?'turning':st.seatMix>=1?'seated':'sitting';
    if(st.seatMix===0)st.chair=null;
    return st;
  }
  const shinNames=new Set(['Soft articulated knee','Lower trouser leg','Outer trouser seam',
    'Rubber outsole','Sole welt','Sneaker upper','Rounded toe cap','Padded shoe tongue',
    'Cotton shoelace','Toe cap stitching']);
  function installKnees(rig,T){
    if(rig?.officeAnatomy)return rig.officeAnatomy.legs.map(l=>l.knee);
    if(!rig||!T?.Group)return [];
    const legs=[];
    for(const limb of [rig.leftLeg,rig.rightLeg]){
      const hip=limb?.joint,leg=hip?.children?.find(c=>c.name==='Left leg'||c.name==='Right leg');
      if(!leg)continue;
      // Bake depth into meshes before inserting a rotating knee to avoid shear.
      const depth=leg.scale.z;
      for(const child of leg.children){child.position.z*=depth;child.scale.z*=depth;}
      leg.scale.z=1;
      const kneeY=1.315,knee=new T.Group();knee.name='Furniture knee pivot';knee.position.y=kneeY;
      leg.add(knee);let footBottom=.015;
      for(const child of [...leg.children]){
        if(child===knee||!shinNames.has(child.name))continue;
        if(child.name==='Rubber outsole'){
          child.geometry.computeBoundingBox();
          footBottom=child.position.y+child.geometry.boundingBox.min.y*child.scale.y;
        }
        leg.remove(child);knee.add(child);child.position.y-=kneeY;
      }
      legs.push({hip,knee,hipY:hip.position.y,upper:hip.position.y-kneeY,
        lower:kneeY-footBottom,footBottom});limb.lower=knee;
    }
    rig.officeAnatomy={math:T,legs,hipY:legs[0]?.hipY??.854,footBottom:legs[0]?.footBottom??0};
    return legs.map(l=>l.knee);
  }
  function pose(rig,state){
    if(!rig?.body||!rig.root||!state)return;
    const anatomy=rig.officeAnatomy;if(!anatomy)return;
    const mix=smooth(state.seatMix),chair=state.chair;
    const root=rig.root,scale=root.scale.x||1,body=rig.body;
    // Base animation is absolute. Preserve sleep, dance and idle when standing.
    body.position.y+=(.035-root.position.y)/scale-anatomy.footBottom;
    for(const leg of anatomy.legs){
      const swing=Math.max(0,-Math.sin((rig.gait||0)+(leg===anatomy.legs[0]?0:Math.PI)))*.42*(rig.walk||0);
      leg.knee.rotation.x=swing;
    }
    if(!chair||mix===0)return;
    const a=root.rotation.y,c=Math.cos(a),s=Math.sin(a),dx=chair.x-root.position.x,dz=chair.z-root.position.z;
    const localX=(dx*c-dz*s)/scale,localZ=(dx*s+dz*c)/scale;
    const hipHeight=chair.height+.13;
    body.position.x=body.position.x*(1-mix)+localX*mix;
    body.position.z=body.position.z*(1-mix)+localZ*mix;
    body.position.y=body.position.y*(1-mix)+((hipHeight-root.position.y)/scale-anatomy.hipY)*mix;
    body.rotation.x*=1-mix;body.rotation.y*=1-mix;body.rotation.z*=1-mix;
    for(const leg of anatomy.legs){
      const drop=(hipHeight-chair.floorY)/scale-leg.lower;
      const thigh=-Math.acos(clamp(drop/leg.upper,-.1,.98));
      leg.hip.rotation.x=leg.hip.rotation.x*(1-mix)+thigh*mix;
      leg.knee.rotation.x=leg.knee.rotation.x*(1-mix)-thigh*mix;
    }
    if(rig.chest)rig.chest.rotation.x*=1-.8*mix;
    if(chair.workPoint&&['pc-work','typing','designing','admin','reviewing','production'].includes(state.action)){
      const T=anatomy.math,down=new T.Vector3(0,-1,0);
      rig.chest.updateWorldMatrix(true,false);
      for(const [i,limb] of (rig.precisionV8615?.limbs||[]).entries()){
        const side=i===0?-1:1,w=chair.workPoint;
        const target=new T.Vector3(w.x+Math.cos(chair.yaw)*side*.19,w.y+.085,w.z-Math.sin(chair.yaw)*side*.19);
        rig.chest.worldToLocal(target);
        const origin=limb.joint.position,delta=target.clone().sub(origin),distance=clamp(delta.length(),.31,limb.upper+limb.lower-.005),direction=delta.normalize();
        const bend=down.clone().addScaledVector(direction,-down.dot(direction));
        if(bend.lengthSq()<1e-8)bend.set(0,0,-1);bend.normalize();
        const cosine=clamp((distance*distance+limb.upper*limb.upper-limb.lower*limb.lower)/(2*distance*limb.upper),-1,1);
        const upper=direction.clone().multiplyScalar(cosine).addScaledVector(bend,Math.sqrt(1-cosine*cosine));
        const elbow=origin.clone().addScaledVector(upper,limb.upper),lower=target.clone().sub(elbow).normalize();
        const shoulderQ=new T.Quaternion().setFromUnitVectors(down,upper);
        const elbowQ=shoulderQ.clone().invert().multiply(new T.Quaternion().setFromUnitVectors(down,lower));
        limb.joint.quaternion.slerp(shoulderQ,mix);limb.elbow.quaternion.slerp(elbowQ,mix);
        limb.hand.position.y=limb.handRestY;limb.hand.position.z=.022*(1-mix);
      }
    }
  }
  return {chairs,registerChair,resetFurniture,bindStaff,selectChair,findChair:selectChair,
    createState,step,holdMovement,installKnees,pose,angleDiff};
});

