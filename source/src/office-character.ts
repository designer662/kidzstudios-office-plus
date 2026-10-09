import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { Person } from './office-data';

// Office Plus V57: V53 head preserved exactly; soft, continuous new body geometry.
// Deliberately stylised, not portraits of employees or third-party assets.
export type CharacterLook={hair:'crop'|'sweep'|'bob'|'tied';outfit:'tee'|'polo'|'blazer'|'cardigan';glasses?:boolean;headphones?:boolean;lanyard?:boolean;watch?:boolean};
type Limb={joint:THREE.Group;lower:THREE.Group;end:THREE.Group};
export type CharacterRig={emote:'wave'|'dance'|'celebrate'|'stretch'|'';emoteStart:number;root:THREE.Group;body:THREE.Group;chest:THREE.Group;head:THREE.Group;eyes:THREE.Group[];left:Limb;right:Limb;leftLeg:Limb;rightLeg:Limb;cup:THREE.Group;phase:number;gait:number;waveStart:number;walk:number;sit:number;initialized:boolean;lastPosition:THREE.Vector3};
const looks:Record<string,CharacterLook>={
 boss:{hair:'sweep',outfit:'blazer',glasses:true,watch:true},
 cikda:{hair:'tied',outfit:'cardigan',lanyard:true,watch:true},
 minn:{hair:'bob',outfit:'tee',headphones:true},
 afiq:{hair:'sweep',outfit:'tee',glasses:true,watch:true},
 nisa:{hair:'tied',outfit:'polo',lanyard:true},
 athira:{hair:'bob',outfit:'cardigan',watch:true},
 mirul:{hair:'crop',outfit:'polo',watch:true},
 amirul:{hair:'crop',outfit:'polo',watch:true},
 lisa:{hair:'bob',outfit:'cardigan',glasses:true,lanyard:true},
};
const shade=(c:string,f:number)=>new THREE.Color(c).multiplyScalar(f).getStyle();
const mix=THREE.MathUtils.lerp;
const smooth=(e0:number,e1:number,t:number)=>THREE.MathUtils.smoothstep(t,e0,e1);

export function characterFactory(){
 const geo=new Map<string,THREE.BufferGeometry>();const mats=new Map<string,THREE.MeshStandardMaterial>();
 const geometry=(key:string,fn:()=>THREE.BufferGeometry)=>{if(!geo.has(key))geo.set(key,fn());return geo.get(key)!};
 const material=(color:string,roughness=.72,metalness=0)=>{const key=`${color}/${roughness}/${metalness}`;if(!mats.has(key))mats.set(key,new THREE.MeshStandardMaterial({color,roughness,metalness}));return mats.get(key)!};
 const sphere=geometry('uvball',()=>new THREE.SphereGeometry(1,18,14));
 const smoothSphere=geometry('v57-body-ball',()=>new THREE.SphereGeometry(1,28,20));
 const softCube=geometry('softcube',()=>new RoundedBoxGeometry(1,1,1,3,.22));
 const slab=geometry('slab',()=>new RoundedBoxGeometry(1,1,1,3,.12));
 const capsule=geometry('capsule',()=>new THREE.CapsuleGeometry(1,1,5,12));
 function put(p:THREE.Object3D,g:THREE.BufferGeometry,col:string,x:number,y:number,z:number,sx=1,sy=1,sz=1,roughness=.72,metalness=0){const m=new THREE.Mesh(g,material(col,roughness,metalness));m.position.set(x,y,z);m.scale.set(sx,sy,sz);m.castShadow=true;m.receiveShadow=true;p.add(m);return m}
 const orb=(p:THREE.Object3D,c:string,x:number,y:number,z:number,w:number,h:number,d:number)=>put(p,sphere,c,x,y,z,w,h,d);
 const softOrb=(p:THREE.Object3D,c:string,x:number,y:number,z:number,w:number,h:number,d:number)=>put(p,smoothSphere,c,x,y,z,w,h,d);
 const box=(p:THREE.Object3D,c:string,x:number,y:number,z:number,w:number,h:number,d:number)=>put(p,softCube,c,x,y,z,w,h,d);
 const flat=(p:THREE.Object3D,c:string,x:number,y:number,z:number,w:number,h:number,d:number)=>put(p,slab,c,x,y,z,w,h,d);
 const pill=(p:THREE.Object3D,c:string,x:number,y:number,z:number,r:number,length:number,depth=r)=>put(p,capsule,c,x,y,z,r,length/3,depth);
 function group(p:THREE.Object3D,name:string,x=0,y=0,z=0){const g=new THREE.Group();g.name=name;g.position.set(x,y,z);p.add(g);return g}
 function ring(p:THREE.Object3D,c:string,x:number,y:number,z:number,r:number,t:number,arc=Math.PI*2){return put(p,geometry(`ring:${r}:${t}:${arc}`,()=>new THREE.TorusGeometry(r,t,7,24,arc)),c,x,y,z)}
 function line(p:THREE.Object3D,c:string,points:[number,number,number][],thickness=.008){const path=new THREE.CatmullRomCurve3(points.map(v=>new THREE.Vector3(...v)));return put(p,new THREE.TubeGeometry(path,12,thickness,5,false),c,0,0,0)}
 // Reduce static facial and costume submeshes without merging across animated joints.
 function compact(p:THREE.Object3D){for(const ch of [...p.children])if(ch instanceof THREE.Group)compact(ch);
  const buckets=new Map<THREE.Material,THREE.Mesh[]>();for(const ch of p.children)if(ch instanceof THREE.Mesh){const m=ch.material as THREE.Material;if(!buckets.has(m))buckets.set(m,[]);buckets.get(m)!.push(ch)}
  for(const [m,meshes] of buckets){if(meshes.length<2)continue;const gs=meshes.map(mesh=>{mesh.updateMatrix();let a=mesh.geometry.clone();if(a.index){const b=a.toNonIndexed();a.dispose();a=b}return a.applyMatrix4(mesh.matrix)});const merged=mergeGeometries(gs);gs.forEach(g=>g.dispose());if(!merged)continue;meshes.forEach(v=>p.remove(v));const part=new THREE.Mesh(merged,m);part.castShadow=true;part.receiveShadow=true;p.add(part)}
 }
 return(p:Person):CharacterRig=>{
  const isFemale=p.gender==='female';
  const look=looks[p.name.trim().toLowerCase()]??{hair:isFemale?'bob':'crop',outfit:/boss|manager/i.test(p.role)?'blazer':/designer/i.test(p.role)?'tee':'polo',watch:true};
  const shirt=p.color,skin=p.skin,hair=p.hair,light='#faf6eb',dark='#374448';
  const pant=look.outfit==='tee'?'#56666e':'#515a60';
  const root=new THREE.Group();root.name=`character:${p.name}`; // outer root remains independent of body animation
  root.userData.characterVersion=8;root.userData.gender=isFemale?'female':'male';root.scale.setScalar(1.2);
  const body=group(root,'body');const chest=group(body,'chest',0,1.12,0);
  // Smooth miniature anatomy: retain V53's overall height and head/body ratio.
  // A densely interpolated closed lathe gives a soft silhouette, not a faceted tube.
  const torso=geometry('v57-soft-torso',()=>{
   const shape:[[number,number],...Array<[number,number]>]=[
    [0,-.280],[.13,-.280],[.193,-.264],[.235,-.213],[.261,-.090],
    [.265,.063],[.249,.200],[.218,.290],[.157,.347],[.095,.362],[0,.362]
   ];
   const curve=new THREE.CatmullRomCurve3(shape.map(([x,y])=>new THREE.Vector3(x,y,0)));
   const profile=curve.getPoints(52).map(v=>new THREE.Vector2(Math.max(0,v.x),v.y));
   return new THREE.LatheGeometry(profile,36);
  });
  put(chest,torso,shirt,0,0,0,1,1,.76);
  // Waist and hips are rounded surfaces, avoiding the previous square pelvic block.
  softOrb(body,pant,0,.854,0,.217,.132,.164);
  flat(body,shade(pant,.80),0,.932,.018,.337,.023,.284);
  flat(body,'#c6ac85',0,.941,.167,.046,.029,.014);
  // Neck rises into the restored V53 head; keep the original head pivot height.
  pill(chest,skin,0,.410,0,.071,.181,.071);
  // Two-layer styling helps clothing read from the top-down isometric angle.
  if(look.outfit==='blazer'||look.outfit==='cardigan'){
   flat(chest,light,0,.045,.186,.193,.43,.045);
   for(const s of [-1,1]){const lapel=flat(chest,shade(shirt,.87),s*.115,.185,.205,.11,.264,.035);lapel.rotation.z=-s*.21}
   flat(chest,light,-.07,.10,.217,.046,.02,.01);
   orb(chest,'#e9cfad',.103,-.052,.224,.013,.013,.008);
  }else if(look.outfit==='polo'){
   for(const s of [-1,1]){const fold=flat(chest,shade(shirt,1.18),s*.066,.296,.105,.106,.115,.075);fold.rotation.z=s*.29}
   flat(chest,shade(shirt,.68),0,.23,.19,.026,.14,.012);
   orb(chest,light,0,.231,.204,.013,.014,.011);
  }else{
   const neck=ring(chest,shade(shirt,.75),0,.325,.015,.104,.017);neck.rotation.x=Math.PI/2;
   // Minimal stitched chest badge, not a fake company logo.
   flat(chest,light,-.113,.122,.204,.075,.048,.014);
   flat(chest,'#e8b984',-.118,.123,.214,.027,.026,.004);
  }
  if(look.outfit==='polo'||look.outfit==='cardigan')flat(chest,shade(shirt,1.22),.145,-.177,.192,.046,.025,.018);
  if(look.lanyard){for(const s of [-1,1]){const strap=flat(chest,'#d7baa1',s*.053,.127,.207,.015,.37,.012);strap.rotation.z=-s*.18}
   flat(chest,light,0,-.115,.228,.12,.155,.017);flat(chest,'#afc2bc',0,-.068,.241,.084,.027,.008);flat(chest,'#d5d8ce',0,-.148,.241,.072,.015,.005)}

  // V53 head rebuild: continuous face silhouette and a scalp-following hair shell.
  // Local +Z is forward, and everything stays attached to the existing animated head joint.
  const head=group(chest,'head',0,.688,0);
  const faceShape=geometry('v53-soft-oval',()=>{
   const g=new THREE.SphereGeometry(1,32,24),a=g.attributes.position;
   for(let i=0;i<a.count;i++){
    const x=a.getX(i),y=a.getY(i),z=a.getZ(i),chin=Math.max(0,-y);
    // Slightly fuller temples and a gently tapered jaw: no cube corners or separate chin blob.
    a.setXYZ(i,x*(1-.105*chin*chin),y-.009*chin,z*(1-.017*Math.max(0,y)));
   }
   g.computeVertexNormals();return g;
  });
  put(head,faceShape,skin,0,-.024,0,.291,.319,.257);
  // The ears overlap the head, so they remain connected-looking from side and 3/4 views.
  for(const s of [-1,1]){
   orb(head,skin,s*.276,-.056,-.011,.061,.076,.051);
   orb(head,shade(skin,.96),s*.324,-.057,.023,.013,.031,.021);
  }
  const eyes:THREE.Group[]=[];
  for(const s of [-1,1]){
   const eye=group(head,s<0?'eye-left':'eye-right',s*.094,.007,.244);
   eyes.push(eye);
   orb(eye,'#283338',0,0,.011,.020,.026,.013);
   orb(eye,'#fff9ef',-.005,.009,.023,.006,.007,.004);
   const brow=orb(head,shade(hair,.98),s*.094,.097,.242,.053,.010,.010);
   brow.rotation.z=-s*.07;
   // Barely-there cheek warmth, placed flush with the curved skin surface.
   orb(head,shade(skin,1.045),s*.174,-.081,.202,.043,.018,.009);
  }
  orb(head,shade(skin,1.052),0,-.057,.252,.022,.026,.016);
  line(head,'#94665c',[[-.038,-.153,.243],[0,-.160,.248],[.038,-.153,.243]],.0052);
  // V53 scalp shell: one curved mesh with a shaped hairline, instead of a blocky helmet.
  const hairShell=geometry(`v53-hair-shell-${look.hair}`,()=>{
   const g=new THREE.SphereGeometry(1,40,18,0,Math.PI*2,0,Math.PI/2),a=g.attributes.position;
   for(let i=0;i<a.count;i++){
    const px=a.getX(i),py=a.getY(i),pz=a.getZ(i);
    const angle=Math.atan2(pz,px),front=Math.max(0,Math.sin(angle));
    const stylePart=look.hair==='sweep'?-.075*Math.max(0,px)*front:look.hair==='bob'?-.045*front:0;
    const last=1.79-.70*Math.pow(front,1.7)+stylePart;
    const theta=Math.acos(THREE.MathUtils.clamp(py,0,1))*last/(Math.PI/2);
    a.setXYZ(i,.300*Math.sin(theta)*Math.cos(angle),-.022+.333*Math.cos(theta),.267*Math.sin(theta)*Math.sin(angle));
   }
   g.computeVertexNormals();return g;
  });
  put(head,hairShell,hair,0,0,0);
  if(look.hair==='crop'){
   // Clean short haircut with a lightly rounded fringe.
   orb(head,hair,-.133,.177,.164,.119,.065,.100);
   orb(head,hair,.067,.186,.178,.137,.064,.095);
   orb(head,shade(hair,1.035),-.022,.214,.172,.093,.042,.069);
  }else if(look.hair==='sweep'){
   const swept=orb(head,hair,-.09,.205,.153,.189,.086,.127);swept.rotation.z=-.19;
   const fringe=orb(head,hair,.104,.168,.184,.142,.064,.082);fringe.rotation.z=.25;
   orb(head,shade(hair,1.055),-.15,.231,.125,.083,.039,.084);
  }else if(look.hair==='bob'){
   // The back hair sits behind the face; curved sides frame the cheeks without covering eyes.
   orb(head,hair,0,-.096,-.185,.273,.226,.117);
   for(const s of [-1,1]){
    const side=orb(head,hair,s*.254,-.099,-.014,.074,.182,.168);side.rotation.z=-s*.07;
   }
   orb(head,hair,-.11,.174,.161,.132,.061,.090);
   orb(head,hair,.075,.178,.166,.131,.055,.083);
  }else{ // tied back
   for(const s of [-1,1])orb(head,hair,s*.246,-.059,-.051,.064,.146,.116);
   orb(head,hair,.044,-.048,-.303,.134,.143,.105);
   orb(head,shade(hair,1.05),.042,-.113,-.340,.077,.100,.066);
   orb(head,hair,-.107,.177,.158,.118,.056,.084);
   orb(head,hair,.074,.171,.172,.113,.053,.081);
   flat(head,'#c8a981',.043,-.080,-.402,.106,.022,.015);
  }
  if(look.glasses){
   for(const s of [-1,1]){
    const rim=ring(head,'#46535a',s*.095,.011,.265,.064,.008);
    rim.scale.y=.84;
    line(head,'#46535a',[[s*.156,.018,.260],[s*.241,.015,.164],[s*.289,-.022,.023]],.0065);
   }
   flat(head,'#46535a',0,.013,.270,.042,.010,.010);
  }
  if(look.headphones){
   // Arch follows the head, rather than floating above it.
   ring(head,'#4b5d64',0,-.027,-.019,.350,.018,Math.PI);
   for(const s of [-1,1]){
    orb(head,'#53666e',s*.303,-.030,-.013,.053,.105,.087);
    orb(head,'#d7c4a9',s*.344,-.031,.008,.012,.065,.052);
   }
  }
  function arm(s:number):Limb{
   // Offset matches the V53 shoulder/torso proportions, and all moving parts overlap at the joints.
   const joint=group(chest,s<0?'shoulder-left':'shoulder-right',s*.266,.218,0);
   const long=look.outfit==='blazer'||look.outfit==='cardigan';
   softOrb(joint,shirt,0,-.024,0,.112,.113,.108);
   pill(joint,shirt,0,-.140,0,.088,.282,.083);
   softOrb(joint,shirt,0,-.257,0,.079,.075,.079);
   const lower=group(joint,'elbow',0,-.263,0);
   const sleeve=long?shirt:skin;
   pill(lower,sleeve,0,-.120,0,.073,.270,.067);
   softOrb(lower,sleeve,0,-.215,0,.067,.065,.062);
   if(long)softOrb(lower,shade(shirt,.89),0,-.241,0,.073,.038,.070);
   const end=group(lower,'wrist',0,-.252,.006);
   // A single smooth mitten/palm with a small integrated thumb, not protruding round beads.
   softOrb(end,skin,0,-.050,.012,.069,.082,.057);
   softOrb(end,skin,-s*.048,-.026,.029,.029,.043,.034);
   if(s===-1&&look.watch){
    softOrb(lower,'#394c4c',0,-.220,.002,.076,.026,.072);
    flat(lower,'#e7d6b7',0,-.216,.076,.050,.035,.012);
   }
   return{joint,lower,end};
  }
  const left=arm(-1),right=arm(1);
  function leg(s:number):Limb{
   // Keep V53 hip / knee / ankle pivots, so desk sitting and walking do not snap.
   const joint=group(body,s<0?'hip-left':'hip-right',s*.115,.814,0);
   softOrb(joint,pant,0,-.045,0,.113,.111,.105);
   pill(joint,pant,0,-.175,0,.107,.368,.100);
   const lower=group(joint,'knee',0,-.362,0);
   softOrb(lower,pant,0,-.026,0,.099,.074,.093);
   pill(lower,pant,0,-.170,0,.092,.358,.087);
   const end=group(lower,'ankle',0,-.378,.019);
   const sneaker=look.outfit==='blazer'?'#465157':'#e9e9e0';
   box(end,sneaker,0,-.019,.083,.195,.128,.324);
   softOrb(end,sneaker,0,-.024,.204,.097,.062,.091);
   flat(end,look.outfit==='blazer'?'#d4cbb9':'#b7c1bc',0,-.086,.087,.204,.025,.338);
   if(look.outfit!=='blazer'){
    for(let i=0;i<2;i++)flat(end,'#bec8c6',0,.035,.092+i*.040,.088,.010,.014);
   }
   return{joint,lower,end};
  }
  const leftLeg=leg(-1),rightLeg=leg(1);
  const cup=group(right.end,'coffee-cup',0,-.082,.072);
  put(cup,geometry('mini-mug',()=>new THREE.CylinderGeometry(.074,.061,.142,16)),light,0,0,0);
  put(cup,geometry('mini-coffee',()=>new THREE.CircleGeometry(.061,16)),'#795944',0,.073,0).rotation.x=-Math.PI/2;
  ring(cup,light,.074,.01,0,.038,.014);cup.visible=false;
  compact(root);
  return{emote:'',emoteStart:-100,root,body,chest,head,eyes,left,right,leftLeg,rightLeg,cup,phase:p.id*.83,gait:p.id*.81,waveStart:-100,walk:0,sit:p.seated?1:0,initialized:false,lastPosition:new THREE.Vector3()};
 };
}

export function animateCharacter(r:CharacterRig,p:Person,time:number,dt:number,distance:number){
 const t=time+r.phase;
 const desiredWalk=p.status==='walking'?1:0;
 const emoteIsActive=r.emote!==''&&r.emote!=='wave'&&time-r.emoteStart>=0&&time-r.emoteStart<3.6;
 const desiredSit=p.seated&&p.status!=='walking'&&!emoteIsActive?1:0;
 if(!r.initialized){r.walk=desiredWalk;r.sit=desiredSit;r.initialized=true}
 const blend=1-Math.exp(-dt*9);r.walk=mix(r.walk,desiredWalk,blend);r.sit=mix(r.sit,desiredSit,blend);
 r.gait+=Math.min(distance,.3)*4.3;
 const stride=Math.sin(r.gait),other=Math.sin(r.gait+Math.PI),walk=r.walk,sit=r.sit;
 r.body.position.y=-.28*sit+Math.abs(stride)*.026*walk;
 r.body.rotation.y=0;
 r.body.rotation.z=stride*.019*walk+Math.sin(t*.66)*.008*(1-walk)*(1-sit);
 r.chest.scale.y=1+Math.sin(t*1.9)*.009*(1-walk);
 r.chest.rotation.x=.042*sit+.03*walk;
 r.chest.rotation.y=stride*.028*walk;
 const blinkCycle=(t%(3.45+(r.phase%2)*.3));
 const blink=1-.94*Math.max(0,1-Math.abs(blinkCycle-.15)/.11);
 r.eyes.forEach(eye=>eye.scale.y=blink);
 r.head.rotation.y=Math.sin(t*.59)*.11*(1-walk*.7)+(p.action==='meeting'?Math.sin(t*.7)*.075:0);
 r.head.rotation.x=-.04*sit+Math.sin(t*.93)*.019;
 r.head.rotation.z=Math.sin(t*.4)*.02*(1-walk);
 for(const [leg,phase]of [[r.leftLeg,stride],[r.rightLeg,other]] as const){
  leg.joint.rotation.x=mix(phase*.47*walk,-Math.PI/2,sit);
  leg.lower.rotation.x=mix(Math.max(0,-phase)*.74*walk,Math.PI/2,sit);
  leg.end.rotation.x=mix(-phase*.10*walk,0,sit);
  leg.lower.scale.y=1+.2*sit;leg.end.scale.y=1/(1+.2*sit);
 }
 const pause=.8+.2*Math.sin(t*.43+Math.sin(t*.16))**2;
 const typing=sit*(1-walk)*pause;
 for(const [arm,sign]of [[r.left,-1],[r.right,1]] as const){
  arm.joint.rotation.x=mix(-.08+sign*stride*.35*walk,-.91+Math.sin(t*7.3+sign)*.032,typing);
  arm.joint.rotation.z=sign*.064;
  arm.lower.rotation.x=mix(-.16-Math.max(0,sign*stride)*.14*walk,-.72+Math.sin(t*8.8+sign*2)*.05,typing);
  arm.end.rotation.x=Math.sin(t*11+sign)*.095*typing;
  arm.end.rotation.z=0;
 }
 if(p.status==='showroom'&&!walk&&!sit){const g=.5+.5*Math.sin(t*.82);r.right.joint.rotation.x=mix(r.right.joint.rotation.x,-.6,g);r.right.joint.rotation.z=mix(r.right.joint.rotation.z,-.43,g);r.right.lower.rotation.x=mix(r.right.lower.rotation.x,-.76,g)}
 const rest=p.status==='break'?(1-walk):0;
 const sip=rest*smooth(2.8,3.5,t%12)*(1-smooth(5.2,6,t%12));
 r.cup.visible=rest>.2;
 if(rest){r.right.joint.rotation.x=mix(r.right.joint.rotation.x,-.43-.4*sip,rest);r.right.lower.rotation.x=mix(r.right.lower.rotation.x,-1.08-.83*sip,rest);r.head.rotation.x-=.065*sip}
 const waveAge=time-r.waveStart;
 const wave=waveAge>=0&&waveAge<1.7?smooth(0,.25,waveAge)*(1-smooth(1.25,1.7,waveAge))*(1-walk)*(1-rest):0;
 if(wave){r.right.joint.rotation.x=mix(r.right.joint.rotation.x,-.1,wave);r.right.joint.rotation.z=mix(r.right.joint.rotation.z,2.05,wave);r.right.lower.rotation.x=mix(r.right.lower.rotation.x,-.8,wave);r.right.end.rotation.z=Math.sin(waveAge*15)*.27*wave;r.head.rotation.z-=.05*wave}
 const age=time-r.emoteStart;
 const power=age>=0&&age<3.6?smooth(0,.35,age)*(1-smooth(2.9,3.6,age))*(1-walk):0;
 if(power){
  if(r.emote==='dance'){
   const beat=age*8.4;r.body.position.y+=Math.abs(Math.sin(beat))*.105*power;
   r.body.rotation.y=Math.sin(beat*.52)*.23*power;r.body.rotation.z+=Math.sin(beat)*.12*power;
   r.left.joint.rotation.z-=1.3*power;r.right.joint.rotation.z+=1.3*power;
   r.left.joint.rotation.x+=Math.sin(beat)*.65*power;r.right.joint.rotation.x-=Math.sin(beat)*.65*power;
   r.head.rotation.z+=Math.sin(beat*.5)*.09*power;
  }else if(r.emote==='celebrate'){
   r.left.joint.rotation.z-=2.18*power;r.right.joint.rotation.z+=2.18*power;
   r.left.lower.rotation.x-=.45*power;r.right.lower.rotation.x-=.45*power;
   r.body.position.y+=Math.abs(Math.sin(age*8))*.07*power;
  }else if(r.emote==='stretch'){
   r.left.joint.rotation.z-=2.21*power;r.right.joint.rotation.z+=2.21*power;
   r.head.rotation.x-=.08*power;
  }else if(r.emote==='wave'){
   r.right.joint.rotation.z+=1.95*power;r.right.end.rotation.z+=Math.sin(age*15)*.3*power;
  }
 }
 r.cup.rotation.x=-r.right.joint.rotation.x-r.right.lower.rotation.x-r.right.end.rotation.x-r.chest.rotation.x+.15*sip;
 r.cup.rotation.z=-r.right.joint.rotation.z-r.right.end.rotation.z;
}
