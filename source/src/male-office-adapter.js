import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {createMaleCharacter} from './male-character.js';
import {animateOfficeHijabi} from './hijabi-office-adapter.js';

const HAIR_STYLES=new Set(['fade','quiff','sidepart','korean','messy']);
const hex=v=>typeof v==='string'&&/^#[0-9a-fA-F]{6}$/.test(v)?v:null;
export function createOfficeMaleRig(person){
  const appearance=person.appearance||{};
  const model=createMaleCharacter({...THREE,RoundedBoxGeometry});
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
  model.head.traverse(obj=>{if(obj.name==='Glossy oval eye')eyes.push(obj)});
  const limb=joint=>({joint,lower:new THREE.Group(),end:new THREE.Group()});
  const cup=new THREE.Group();cup.visible=false;
  return {emote:'',emoteStart:-100,root,body:model.body,chest:model.chest,head:model.head,eyes,
    left:limb(model.arms[0]),right:limb(model.arms[1]),leftLeg:limb(model.legs[0]),rightLeg:limb(model.legs[1]),
    cup,phase:person.id*.83,gait:person.id*.81,waveStart:-100,walk:0,sit:person.seated?1:0,
    initialized:false,lastPosition:new THREE.Vector3()};
}
export function animateOfficeMale(r,p,time,dt,distance){animateOfficeHijabi(r,p,time,dt,distance)}
