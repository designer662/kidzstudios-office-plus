import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {createHijabiCharacter} from './hijabi-character.js';

// Bridges the supplied character model to Office Plus without changing male models or live staff state.
export function createOfficeHijabiRig(person) {
  const model=createHijabiCharacter({...THREE,RoundedBoxGeometry});
  const root=model.root;
  root.name=`character:${person.name}`;
  root.userData.officeHijabi=true;
  root.userData.characterVersion=11;
  root.userData.gender='female';
  root.scale.setScalar(.42);
  const eyes=[];
  model.head.traverse(obj=>{if(obj.name==='Glossy oval eye')eyes.push(obj)});
  const limb=joint=>({joint,lower:new THREE.Group(),end:new THREE.Group()});
  const cup=new THREE.Group();cup.visible=false;
  return {emote:'',emoteStart:-100,root,body:model.body,chest:model.chest,head:model.head,eyes,
    left:limb(model.arms[0]),right:limb(model.arms[1]),leftLeg:limb(model.legs[0]),rightLeg:limb(model.legs[1]),
    cup,phase:person.id*.83,gait:person.id*.81,waveStart:-100,walk:0,sit:person.seated?1:0,
    initialized:false,lastPosition:new THREE.Vector3()};
}

const interp=(a,b,t)=>a+(b-a)*t;
const smoothstep=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u)};
export function animateOfficeHijabi(r,p,time,dt,distance){
  const t=time+r.phase,walkTo=p.status==='walking'?1:0;
  const emoteActive=r.emote!==''&&time-r.emoteStart>=0&&time-r.emoteStart<3.6;
  const sitTo=p.seated&&p.status!=='walking'&&!emoteActive?1:0;
  if(!r.initialized){r.walk=walkTo;r.sit=sitTo;r.initialized=true}
  const k=1-Math.exp(-Math.min(.05,Math.max(0,dt))*9);
  r.walk=interp(r.walk,walkTo,k);r.sit=interp(r.sit,sitTo,k);
  r.gait+=Math.min(Math.max(distance,0),.3)*4.3;
  const stride=Math.sin(r.gait),opposite=Math.sin(r.gait+Math.PI),walk=r.walk,sit=r.sit;
  r.body.position.y=-.90*sit+Math.abs(stride)*.045*walk;
  r.body.rotation.y=0;
  r.body.rotation.z=Math.sin(t*.6)*.008*(1-walk)+stride*.022*walk;
  r.chest.rotation.z=Math.sin(r.gait+Math.PI)*.014*walk;
  r.chest.rotation.y=Math.sin(t*.4)*.006*(1-walk);
  r.head.rotation.x=Math.sin(t*.9)*.018-.02*sit;
  r.head.rotation.y=Math.sin(t*.55)*.10*(1-walk*.65);
  r.head.rotation.z=Math.sin(t*.4)*.018*(1-walk);
  r.eyes.forEach(eye=>{const bl=t%(3.45+(r.phase%2)*.3);eye.scale.y=1-.90*Math.max(0,1-Math.abs(bl-.15)/.10)});
  // The supplied whole-leg meshes now pivot at the hips, allowing chair sitting and walking.
  r.leftLeg.joint.rotation.x=interp(stride*.35*walk,-1.15,sit);
  r.rightLeg.joint.rotation.x=interp(opposite*.35*walk,-1.15,sit);
  const working=['typing','designing','admin','production'].includes(p.action||'');
  const typing=sit*(working?1:.20);
  for(const [arm,sign] of [[r.left,-1],[r.right,1]]){
    arm.joint.rotation.x=interp(-sign*stride*.32*walk, -.73+Math.sin(t*6+sign)*.025, typing);
    arm.joint.rotation.z=sign*.17;
  }
  if(p.action==='meeting'&&!walk){r.right.joint.rotation.x-=.22;r.head.rotation.y+=Math.sin(t*.8)*.065}
  if(p.action==='reading'&&!walk){r.head.rotation.x+=.07;r.left.joint.rotation.x-=.22}
  if(p.action==='production'&&!walk){r.right.joint.rotation.x-=.20}
  if(p.action==='chat'&&!walk){r.right.joint.rotation.x-=.25;r.head.rotation.y+=Math.sin(t*.7)*.07}
  // All workplace breaks remain cup-free; only the old male model has the coffee prop.
  r.cup.visible=false;
  const age=time-r.waveStart;
  const wave=age>=0&&age<1.7?smoothstep(0,.25,age)*(1-smoothstep(1.25,1.7,age))*(1-walk):0;
  if(wave){r.right.joint.rotation.z+=1.52*wave;r.right.joint.rotation.x-=.22*wave}
  const actionAge=time-r.emoteStart;
  const power=actionAge>=0&&actionAge<3.6?smoothstep(0,.35,actionAge)*(1-smoothstep(2.9,3.6,actionAge))*(1-walk):0;
  if(power){
    if(r.emote==='dance'){r.body.position.y+=Math.abs(Math.sin(actionAge*8))*.17*power;r.left.joint.rotation.z-=.9*power;r.right.joint.rotation.z+=.9*power}
    else if(r.emote==='celebrate'||r.emote==='stretch'){r.left.joint.rotation.z-=1.25*power;r.right.joint.rotation.z+=1.25*power}
    else if(r.emote==='wave')r.right.joint.rotation.z+=1.3*power;
  }
}
