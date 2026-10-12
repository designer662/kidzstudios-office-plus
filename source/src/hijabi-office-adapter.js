import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {createHijabiCharacter} from './hijabi-character.js';
import {createHijabiCasualCharacter} from './hijabi-character-semi-casual.js';

// Lightweight glasses for the classic outfit: the uploaded casual outfit retains its own geometry.
function attachClassicGlasses(model,enabled){
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

// Bridges the supplied character model to Office Plus without changing male models or live staff state.
export function createOfficeHijabiRig(person) {
  const appearance=person.appearance||{};
  const model=appearance.model==='semi-casual'
    ?createHijabiCasualCharacter({...THREE,RoundedBoxGeometry})
    :createHijabiCharacter({...THREE,RoundedBoxGeometry});
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
