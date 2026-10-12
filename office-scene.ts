import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { departments, people, rooms, walkingPath, type Person } from './office-data';
import {characterFactory,animateCharacter,type CharacterRig} from './office-character';

export type OfficeController={playEmote:(kind:'wave'|'dance'|'celebrate'|'stretch',id?:number)=>number|null;setPaused:(v:boolean)=>void;setRotating:(v:boolean)=>void;zoomBy:(v:number)=>void;reset:()=>void;selectDepartment:(id:string)=>void;focusPerson:(id:number)=>void;setView:(view:'isometric'|'plan')=>void;rotateBy:(angle:number)=>void;stopFollowing:()=>void;updatePeople:(updates:PersonUpdate[])=>void;showBubble:(id:number,text:string,duration?:number)=>void;dispose:()=>void};
type Callbacks={onPerson:(id:number)=>void;onDepartment:(id:string)=>void;onZoom:(zoom:number)=>void;onRoom?:(id:string)=>void;onExplore?:()=>void};
export type PersonUpdate={action?:string;id:number;position:[number,number];status:Person['status'];seated:boolean;rotation?:number;note?:string;alert?:boolean};
type Human=CharacterRig&{ring:THREE.Mesh;person:Person;targetRotation:number};

export function createOffice(host:HTMLDivElement,callbacks:Callbacks,options:{roster?:Person[];externalMotion?:boolean}={}):OfficeController{
 const staff=options.roster??people;
 const scene=new THREE.Scene();scene.background=new THREE.Color('#fafaf9');
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.75));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;renderer.outputColorSpace=THREE.SRGBColorSpace;
 host.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
 const camera=new THREE.OrthographicCamera(-25,25,14,-14,.1,200);camera.position.set(38,34,25);camera.lookAt(0,0,0);
 const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,0,0);controls.enableDamping=true;controls.dampingFactor=.065;controls.minPolarAngle=.008;controls.maxPolarAngle=Math.PI*.45;controls.minZoom=.65;controls.maxZoom=5;controls.enablePan=true;controls.screenSpacePanning=true;controls.rotateSpeed=.5;controls.zoomSpeed=.7;controls.autoRotateSpeed=.3;
 const hemi=new THREE.HemisphereLight('#fffef8','#dedbd3',2.4);scene.add(hemi);
 const sun=new THREE.DirectionalLight('#fff7e9',3.1);sun.position.set(-12,26,13);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-28;sun.shadow.camera.right=28;sun.shadow.camera.top=28;sun.shadow.camera.bottom=-28;sun.shadow.camera.near=.1;sun.shadow.camera.far=70;sun.shadow.normalBias=.045;sun.shadow.bias=-.00025;sun.shadow.radius=4;scene.add(sun);
 const fill=new THREE.DirectionalLight('#edf3ff',1.3);fill.position.set(15,12,-12);scene.add(fill);
 const world=new THREE.Group();scene.add(world);
 const mats=new Map<string,THREE.MeshStandardMaterial>();const geometries=new Set<THREE.BufferGeometry>();
 const material=(color:string)=>{if(!mats.has(color))mats.set(color,new THREE.MeshStandardMaterial({color,roughness:.78,metalness:0}));return mats.get(color)!};
 const geo=<T extends THREE.BufferGeometry>(g:T)=>{geometries.add(g);return g};
 const unitBox=geo(new THREE.BoxGeometry(1,1,1));
 const mesh=(g:THREE.BufferGeometry,m:THREE.Material,parent:THREE.Object3D,x:number,y:number,z:number)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o};
 const box=(p:THREE.Object3D,x:number,y:number,z:number,w:number,h:number,d:number,c:string,rounded=false)=>{const g=rounded?geo(new RoundedBoxGeometry(w,h,d,2,Math.min(.065,w/4,h/4,d/4))):unitBox;const o=mesh(g,material(c),p,x,y,z);if(!rounded)o.scale.set(w,h,d);return o};
 const cyl=(p:THREE.Object3D,x:number,y:number,z:number,r:number,h:number,c:string,rt?:number)=>mesh(geo(new THREE.CylinderGeometry(rt??r,r,h,12)),material(c),p,x,y,z);
 const sphereGeo=geo(new THREE.SphereGeometry(1,12,9));
 const ball=(p:THREE.Object3D,x:number,y:number,z:number,sx:number,sy:number,sz:number,c:string)=>{const o=mesh(sphereGeo,material(c),p,x,y,z);o.scale.set(sx,sy,sz);return o};
 const white='#f6f5f1',wood='#dec5a0',dark='#4b5050',metal='#afb3ad';
 // Floor footprint: 1 scene unit = 2 feet. The inset side entry and open pantry match the latest approved plan.
 const footprint:[number,number][]=[[-4,-17.5],[5.75,-17.5],[5.75,17.5],[-5.75,17.5],[-5.75,.3],[-4,.3],[-4,-2.25],[-2.5,-2.25],[-2.5,-4.65],[-4,-4.65]];
 const outline=new THREE.Shape();footprint.forEach(([x,z],i)=>i?outline.lineTo(x,-z):outline.moveTo(x,-z));outline.closePath();
 const slab=mesh(geo(new THREE.ExtrudeGeometry(outline,{depth:.34,bevelEnabled:true,bevelSize:.035,bevelThickness:.025,bevelSegments:2,steps:1})),material('#d7d7ce'),world,0,-.36,0);slab.rotation.x=-Math.PI/2;
 const floor=mesh(geo(new THREE.ShapeGeometry(outline)),material('#f2f1eb'),world,0,.005,0);floor.rotation.x=-Math.PI/2;
 const shadowGround=mesh(geo(new THREE.PlaneGeometry(180,180)),new THREE.ShadowMaterial({color:'#697363',opacity:.13}),scene,0,-.4,0);shadowGround.rotation.x=-Math.PI/2;shadowGround.castShadow=false;
 function wall(x1:number,z1:number,x2:number,z2:number,h=1.25){const len=Math.hypot(x2-x1,z2-z1),angle=-Math.atan2(z2-z1,x2-x1);const o=box(world,(x1+x2)/2,h/2,(z1+z2)/2,len,h,.15,'#e2e3db');o.rotation.y=angle;const cap=box(world,(x1+x2)/2,h+.025,(z1+z2)/2,len+.015,.05,.17,'#858b80');cap.rotation.y=angle;const trim=box(world,(x1+x2)/2,.065,(z1+z2)/2,len,.13,.18,'#c9cec0');trim.rotation.y=angle}
 wall(-4,-17.5,5.75,-17.5,2.65);wall(-4,-17.5,-4,-4.65,1.4);wall(-4,-4.65,-2.5,-4.65,.75);wall(-2.5,-2.25,-4,-2.25,.75);wall(-4,-2.25,-4,.3,1.1);wall(-4,.3,-5.75,.3,1.1);wall(-5.75,.3,-5.75,17.5,1.25);wall(-5.75,17.5,5.75,17.5,.4);wall(5.75,17.5,5.75,-17.5,.5);
 // Rear windows, with no staircase extension.
 for(const x of [-2.55,.65,3.85]){box(world,x,1.87,-17.39,2.9,1.23,.035,'#d4e1de');box(world,x,1.24,-17.29,3,.065,.17,'#f7f7ed');box(world,x,1.87,-17.34,.045,1.24,.06,'#f8f8f1')}
 // Private office, store and open pantry. Deliberately no pantry-to-corridor partition.
 box(world,2.92,.023,3.2,5.5,.025,4.82,'#f5f0e4');box(world,2.92,.023,8.3,5.5,.025,5.1,'#e9ece5');box(world,-3.82,.023,4.65,3.7,.025,8.55,'#eee9df');box(world,1.95,.023,14.3,7.4,.025,6.32,'#e6e9dc');
 wall(.1,.7,5.75,.7,1.1);wall(.1,.7,.1,3.85,1.35);wall(.1,5.25,.1,5.65,.9);wall(.1,5.65,5.75,5.65,1.05);wall(.1,5.65,.1,9.45,1.25);wall(.1,10.75,.1,10.95,.65);wall(-5.75,9,-1.9,9,.75);wall(-5.75,.3,-1.9,.3,.9);
 wall(-5.75,10.95,-5.45,10.95,.8);wall(-4.2,10.95,-3.6,10.95,.8);wall(-2.4,10.95,-1.65,10.95,.8);wall(-.35,10.95,5.75,10.95,.6);wall(-3.82,10.95,-3.82,14.25,1.3);wall(-1.9,10.95,-1.9,14.7,.9);wall(-1.9,16,-1.9,17.5,.7);wall(-5.75,14.25,-1.9,14.25,1.05);
 // Door leaves, frames and swing arcs removed; wall openings remain.

 function plant(x:number,z:number,scale=1){const p=new THREE.Group();p.position.set(x,0,z);p.scale.setScalar(scale);world.add(p);cyl(p,0,.27,0,.26,.5,'#e5e4d9',.32);cyl(p,0,.52,0,.26,.022,'#776c52');cyl(p,0,.82,0,.023,.62,'#839371');for(let i=0;i<9;i++){const a=i*2.4;const leaf=ball(p,Math.sin(a)*.24,.88+(i%3)*.12,Math.cos(a)*.21,.13,.38,.09,['#718f5e','#8da674','#607e52'][i%3]);leaf.rotation.z=Math.cos(a)*.7;leaf.rotation.x=Math.sin(a)*.6}}
 [[-3.15,-16.4,1.2],[4.9,-6.6,1.05],[4.85,-.95,.8],[-2.5,1.15,.8],[4.95,11.8,.95]].forEach(([x,z,s])=>plant(x,z,s));
 function chair(x:number,z:number,rotation=Math.PI,color=dark){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=rotation;g.scale.setScalar(1.2);world.add(g);cyl(g,0,.28,0,.045,.5,'#8c948e');box(g,0,.54,0,.6,.13,.56,color,true);box(g,0,.91,-.25,.58,.62,.1,color,true);for(const a of [0,Math.PI/2]){const b=box(g,0,.09,0,.72,.045,.06,'#727b76');b.rotation.y=a}for(const [xx,zz]of [[.3,0],[-.3,0],[0,.3],[0,-.3]])ball(g,xx,.07,zz,.055,.06,.055,'#5b625e');for(const xx of [-.32,.32]){box(g,xx,.66,0,.035,.27,.03,'#89918a');box(g,xx,.8,.02,.075,.04,.32,color)}}
 function mug(x:number,y:number,z:number,c='#bf9364'){cyl(world,x,y,z,.09,.19,c);cyl(world,x,y+.1,z,.071,.008,'#625740');const handle=mesh(geo(new THREE.TorusGeometry(.064,.018,6,10)),material(c),world,x+.095,y,z);handle.rotation.x=Math.PI/2}
 function monitor(x:number,z:number,rotation:number,tone='#b7cfca'){const g=new THREE.Group();g.position.set(x,1.2,z);g.rotation.y=rotation;world.add(g);box(g,0,.03,0,.4,.035,.29,'#697370');box(g,0,.25,-.03,.065,.43,.055,'#8c9790');box(g,0,.57,-.04,.85,.56,.085,'#465451',true);box(g,0,.57,.007,.77,.47,.012,'#e3ede7');box(g,-.16,.59,.017,.34,.28,.01,tone);for(let i=0;i<3;i++)box(g,.21,.7-i*.12,.017,.24,.025,.01,'#aec2b1');box(g,0,.022,.46,.57,.035,.23,'#c9d1c5',true);box(g,.48,.04,.45,.11,.055,.17,'#b7c2b0',true)}
 // Six desks in one shared island, plus the two-person rear counter.
 box(world,.85,1.12,-10.7,2.85,.14,7.25,wood,true);for(const z of [-13.65,-10.7,-7.75]){box(world,.85,.55,z,2.5,1.06,.12,'#e6e8dd')}
 box(world,.85,1.35,-10.7,.06,.36,7,'#8c968e');
 for(const z of [-12.45,-10.2,-7.95]){monitor(.52,z,-Math.PI/2,'#b5c6d0');monitor(1.18,z,Math.PI/2,'#d9c8a4');chair(-1.5,z,Math.PI/2);chair(3.2,z,-Math.PI/2)}
 mug(-.15,1.31,-11.1);mug(1.92,1.31,-8.65,'#9dab80');box(world,1.88,1.215,-10.8,.38,.04,.57,'#ede8d8');
 box(world,1.1,1.12,-16.25,8,.14,1.25,wood,true);for(const x of [-2.35,4.55])box(world,x,.55,-16.25,.12,1.1,1.04,'#ddd7c7');monitor(-.15,-16.3,0);monitor(3.1,-16.3,0,'#dbccaa');chair(-.15,-14.85);chair(3.1,-14.85);mug(.85,1.31,-16.15);
 // T-shirt showroom. Actual 3D garments on a rail and flat sample shirts on the island.
 const shirtShape=new THREE.Shape();[[-.12,.36],[-.27,.31],[-.49,.12],[-.35,-.035],[-.235,.05],[-.235,-.42],[.235,-.42],[.235,.05],[.35,-.035],[.49,.12],[.27,.31],[.12,.36],[.07,.27],[-.07,.27]].forEach(([x,y],i)=>i?shirtShape.lineTo(x,y):shirtShape.moveTo(x,y));shirtShape.closePath();const shirtGeo=geo(new THREE.ExtrudeGeometry(shirtShape,{depth:.025,bevelEnabled:false}));
 function shirt(x:number,y:number,z:number,color:string,flat=false){const m=mesh(shirtGeo,material(color),world,x,y,z);if(flat)m.rotation.x=-Math.PI/2;return m}
 for(const z of [-5.8,-1.85]){cyl(world,5.02,1.02,z,.028,2.04,'#626e65');box(world,5.02,.065,z,1.1,.08,.15,'#687468')}
 const rail=cyl(world,5.02,2.04,-3.825,.032,3.95,'#7e8a80');rail.rotation.x=Math.PI/2;
 for(let i=0;i<17;i++){const z=-5.65+i*.222;shirt(5.01,1.46,z,['#f5f2e8','#3d4544','#a2b2a3','#b98065','#697c88'][Math.floor(i/4)%5]);const hanger=mesh(geo(new THREE.TorusGeometry(.045,.01,4,12,Math.PI*1.5)),material('#b5b6a8'),world,5.01,2.02,z);box(world,5.01,1.87,z,.62,.024,.035,'#bdbaa9')}
 box(world,1.2,.92,-3.45,2.65,.16,1.7,wood,true);for(const x of [.08,2.32])for(const z of [-4.08,-2.82])box(world,x,.46,z,.065,.87,.065,'#bbbba9');shirt(.58,1.015,-3.53,'#fbf7ec',true);shirt(1.75,1.015,-3.53,'#343c3f',true);
 for(const x of [.49,1.68]){const disc=mesh(geo(new THREE.CircleGeometry(.105,20)),material('#d39470'),world,x,1.048,-3.54);disc.rotation.x=-Math.PI/2;const disc2=mesh(geo(new THREE.CircleGeometry(.105,20)),material('#9bb0ad'),world,x+.1,1.049,-3.64);disc2.rotation.x=-Math.PI/2}
 for(let i=0;i<4;i++)for(let j=0;j<3;j++)box(world,.35+i*.55,1.035+j*.032,-2.96,.43,.03,.28,['#f5eee0','#76889a','#b4826d','#758b70'][i],true);
 box(world,3.27,1.03,.1,3.73,.15,1.0,wood,true);box(world,3.27,.51,.15,3.53,1.01,.77,'#dfd6bf');
 box(world,3.67,1.18,.06,.95,.15,.8,'#4f5b5a',true);box(world,3.67,1.275,.08,.78,.045,.69,'#f8f2e6');const pressLid=box(world,3.67,1.67,-.06,.94,.12,.77,'#687779',true);pressLid.rotation.x=-.35;box(world,3.67,1.46,-.4,.11,.56,.1,'#485753');box(world,3.67,1.87,.04,.65,.04,.045,'#374742');box(world,3.67,1.75,.04,.045,.24,.045,'#374742');
 box(world,2.05,1.19,.1,.42,.15,.31,'#5b6963',true);for(let i=0;i<6;i++)box(world,4.57+(i%3)*.13,1.14,-.06+Math.floor(i/3)*.16,.105,.012,.13,['#d69c73','#719889','#6c8197','#eee5d6','#6d5b52','#c1bd79'][i]);
 // Boss office: L-shaped desk and storage.
 box(world,2.95,1.12,2.85,3.15,.15,1.25,wood,true);box(world,4.15,1.12,3.55,.75,.15,1.7,wood,true);for(const x of [1.6,4.3])box(world,x,.53,2.85,.11,1.05,1.05,'#d5c6ac');box(world,4.18,.53,4.2,.6,1.05,.12,'#d5c6ac');monitor(3.2,2.82,0);chair(3.2,4.05);mug(1.92,1.31,2.94);box(world,5.24,.6,3.2,.63,1.2,3.95,'#dfcbaa',true);for(let i=0;i<5;i++)box(world,5.23,1.23,2.1+i*.37,.39,.08,.28,['#8f9d7f','#ded8c9','#d4b284'][i%3]);
 // Pantry counter, sink, coffee station, fridge and two-seat table. Right side is entirely open.
 box(world,-5.15,.56,4.65,1.04,1.12,8.3,'#e2dfd1',true);box(world,-5.15,1.15,4.65,1.15,.1,8.38,wood);for(const z of [2.35,3.08]){const bowl=ball(world,-5.15,1.2,z,.36,.075,.27,'#a2aaa2');cyl(world,-5.35,1.4,z+.15,.022,.44,'#919e95')}
 box(world,-5.14,1.35,6.9,1.1,2.7,1.25,'#c6ceca',true);box(world,-4.565,1.49,6.9,.02,2.37,1.08,'#dde2dc');box(world,-4.54,1.49,6.57,.04,.47,.035,'#9ba99e');box(world,-4.54,1.91,6.9,.02,.022,1.1,'#adb8ad');
 box(world,-5.08,1.5,5.25,.62,.62,.68,'#4c5b50',true);box(world,-4.74,1.49,5.25,.035,.25,.39,'#adb4a1');mug(-4.7,1.27,5.26,'#eeeadd');mug(-5.05,1.3,4.2);
 box(world,-3.45,1.0,3.65,1.2,.11,1.65,wood,true);for(const z of [3.02,4.28])box(world,-3.45,.49,z,.85,.94,.06,'#b9bba6');chair(-3.45,2.45,0,'#88967c');chair(-3.45,4.85,Math.PI,'#88967c');
 // Store shelves with print supplies and packed garments.
 for(const z of [6.8,8.65,10.1]){for(const x of [4.65,5.42])box(world,x,1.05,z,.045,2.1,.06,'#839086');for(const y of [.2,.85,1.5,2.1])box(world,5.03,y,z,.95,.065,1.32,'#bdc6b6');for(let i=0;i<3;i++)box(world,5.0,.42+i*.65,z,.73,.36,1.04,['#d2b88e','#e7e2d4','#b7c2b0'][i],true)}
 // Two toilets and the rear prayer room.
 for(const x of [-4.86,-2.9]){box(world,x,.64,13.66,.64,1.25,.31,'#f8f7ee',true);ball(world,x,.48,13.1,.39,.4,.55,'#faf9f1');const seat=mesh(geo(new THREE.TorusGeometry(.29,.055,8,24)),material('#e3e8df'),world,x,.75,13.1);seat.rotation.x=-Math.PI/2;seat.scale.y=1.3;box(world,x+.58,.81,13.71,.43,.16,.41,'#eef0e6',true);cyl(world,x+.58,.94,13.83,.018,.2,'#9caa9f')}
 box(world,1.9,.045,14.9,6.9,.028,4.2,'#cfd4bc');
 for(const x of [-.45,1.8,4.05]){box(world,x,.075,14.9,1.67,.02,3.45,'#748368');box(world,x,.09,14.9,1.52,.015,3.28,'#cfbc89');box(world,x,.103,14.9,1.4,.012,3.16,'#879172');for(const dx of [-.59,.59])box(world,x+dx,.118,14.95,.032,.008,2.85,'#d4c69c');box(world,x,.118,16.36,1.2,.008,.034,'#d4c69c');const arch=mesh(geo(new THREE.TorusGeometry(.58,.018,4,28,Math.PI)),material('#d5c7a1'),world,x,.12,13.66);arch.rotation.x=-Math.PI/2}
 // Batch static geometry by material for efficient rendering.
 world.updateMatrixWorld(true);const buckets=new Map<THREE.Material,THREE.BufferGeometry[]>();world.traverse(o=>{if(o instanceof THREE.Mesh){const m=o.material as THREE.Material;let g=o.geometry.clone();if(g.index)g=g.toNonIndexed();g.applyMatrix4(o.matrixWorld);if(!buckets.has(m))buckets.set(m,[]);buckets.get(m)!.push(g)}});world.clear();for(const [m,gs]of buckets){const combined=mergeGeometries(gs);if(combined){geo(combined);const o=new THREE.Mesh(combined,m);o.castShadow=!m.transparent;o.receiveShadow=true;world.add(o)}gs.forEach(g=>g.dispose())}
 // Jointed, rounded character models with individual clothing and facial details.
 const humans:Human[]=[];const pickables:THREE.Object3D[]=[];const makeCharacter=characterFactory();
 for(const p of staff){
  const rig=makeCharacter(p);rig.root.position.set(p.position[0],.08,p.position[1]);rig.root.rotation.y=p.rotation;rig.lastPosition.copy(rig.root.position);scene.add(rig.root);
  const ring=mesh(geo(new THREE.RingGeometry(.42,.49,32)),new THREE.MeshBasicMaterial({color:'#d89551',side:THREE.DoubleSide,transparent:true,opacity:.85}),rig.root,0,-.01,0);ring.rotation.x=-Math.PI/2;ring.visible=false;ring.castShadow=false;
  const hit=mesh(geo(new THREE.CylinderGeometry(.39,.42,2.25,10)),new THREE.MeshBasicMaterial({visible:false}),rig.root,0,1.02,0);hit.userData.personId=p.id;pickables.push(hit);
  humans.push({...rig,ring,person:p,targetRotation:p.rotation});
 }
 const labelLayer=document.createElement('div');labelLayer.className='scene-label-layer';host.appendChild(labelLayer);
 const labels=rooms.map(room=>{const element=document.createElement('button');element.type='button';element.className='room-label';element.textContent=room.name;element.setAttribute('aria-label',`Focus ${room.name}`);element.onclick=()=>{callbacks.onRoom?.(room.id);flyTarget=new THREE.Vector3(room.focus[0],0,room.focus[1]);flyZoom=1.8;focusId=null;rotating=false};labelLayer.appendChild(element);return {element,position:new THREE.Vector3(room.x,room.y,room.z)}});
 const nameLabels=staff.map(p=>{const element=document.createElement('button');element.type='button';element.className='person-label';element.textContent=p.name;element.style.setProperty('--person-color',p.color);element.title=`${p.name} · ${p.role}`;element.setAttribute('aria-label',`${p.name}, ${p.role}`);element.onclick=()=>callbacks.onPerson(p.id);labelLayer.appendChild(element);return {element,id:p.id}});
 let paused=false,rotating=false,following=false,simTime=0,frame=0,disposed=false,selectedDept='all',focusId:number|null=null;let width=host.clientWidth,height=host.clientHeight,lastZoom=1;let view:'isometric'|'plan'='isometric';
 let flyTarget:THREE.Vector3|null=null,flyZoom=1;const targetCamera=new THREE.Vector3();const defaultTarget=new THREE.Vector3(0,.15,0);
 function initialPosition(){return host.clientWidth<760?new THREE.Vector3(7,52,59):new THREE.Vector3(38,34,25)}
 camera.position.copy(initialPosition());controls.target.copy(defaultTarget);camera.lookAt(controls.target);
 function fit(){camera.updateMatrixWorld();let mx=0,my=0;for(const x of [-6,6])for(const y of [0,2.9])for(const z of [-18,18]){const v=new THREE.Vector3(x,y,z).applyMatrix4(camera.matrixWorldInverse);mx=Math.max(mx,Math.abs(v.x));my=Math.max(my,Math.abs(v.y))}const aspect=width/height;const vh=Math.max(my*2*1.15,mx*2/aspect*1.15);camera.left=-vh*aspect/2;camera.right=vh*aspect/2;camera.top=vh/2;camera.bottom=-vh/2;camera.updateProjectionMatrix()}
 function resize(){width=host.clientWidth;height=host.clientHeight;if(!width||!height)return;renderer.setSize(width,height);fit()}
 const observer=new ResizeObserver(resize);observer.observe(host);resize();
 const pointer=new THREE.Vector2(),raycaster=new THREE.Raycaster();let pointerStart={x:0,y:0};
 const down=(e:PointerEvent)=>{pointerStart={x:e.clientX,y:e.clientY};flyTarget=null};
 const up=(e:PointerEvent)=>{if(Math.hypot(e.clientX-pointerStart.x,e.clientY-pointerStart.y)>6)return;const rect=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(pickables,false)[0];if(hit)callbacks.onPerson(hit.object.userData.personId)};
 renderer.domElement.addEventListener('pointerdown',down);renderer.domElement.addEventListener('pointerup',up);const onControlStart=()=>{flyTarget=null;following=false;callbacks.onExplore?.()};controls.addEventListener('start',onControlStart);
 const bubbles=new Map<number,{element:HTMLDivElement;until:number}>();
 function showBubble(id:number,text:string,duration=6800){bubbles.get(id)?.element.remove();const element=document.createElement('div');element.className='scene-bubble';element.textContent=text.slice(0,220);labelLayer.appendChild(element);bubbles.set(id,{element,until:duration?performance.now()+duration:Infinity})}
 const clock=new THREE.Clock(),proj=new THREE.Vector3(),worldPos=new THREE.Vector3();
 const route=walkingPath.map(([x,z])=>new THREE.Vector3(x,.08,z));const segmentLengths=route.map((p,i)=>p.distanceTo(route[(i+1)%route.length]));const routeLength=segmentLengths.reduce((a,b)=>a+b,0);
 const setView=(v:'isometric'|'plan')=>{view=v;following=false;flyTarget=null;rotating=false;controls.autoRotate=false;controls.enableRotate=v==='isometric';controls.target.copy(defaultTarget);camera.position.copy(v==='plan'?new THREE.Vector3(0,65,.01):initialPosition());camera.zoom=1;camera.lookAt(controls.target);controls.update();fit();callbacks.onZoom(1)};
 function animate(){if(disposed)return;frame=requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.05);if(!paused)simTime+=dt;controls.autoRotate=rotating&&!paused&&view==='isometric';
 if(following&&focusId!==null){const h=humans.find(h=>h.person.id===focusId);if(h){flyTarget=h.root.position.clone();flyTarget.y=.6}}
 if(flyTarget){const delta=targetCamera.copy(flyTarget).sub(controls.target).multiplyScalar(.07);controls.target.add(delta);camera.position.add(delta);camera.zoom+=(flyZoom-camera.zoom)*.07;camera.updateProjectionMatrix();if(delta.length()<.002&&Math.abs(camera.zoom-flyZoom)<.002)flyTarget=null}controls.update();
 for(const h of humans){const t=simTime+h.phase,p=h.person;
  if(p.status==='walking'&&!options.externalMotion){
   let distance=(simTime*.72)%routeLength,segment=0;
   while(distance>segmentLengths[segment]&&segment<route.length-1){distance-=segmentLengths[segment];segment++}
   const a=route[segment],b=route[(segment+1)%route.length],f=distance/segmentLengths[segment];h.root.position.lerpVectors(a,b,f);h.targetRotation=Math.atan2(b.x-a.x,b.z-a.z);
  }
  const travelled=h.root.position.distanceTo(h.lastPosition);h.lastPosition.copy(h.root.position);
  if(!paused){const diff=h.targetRotation-h.root.rotation.y;h.root.rotation.y+=Math.atan2(Math.sin(diff),Math.cos(diff))*(1-Math.exp(-dt*9))}
  animateCharacter(h,p,simTime,paused?0:dt,paused?0:travelled);
  h.ring.visible=focusId===p.id||(selectedDept!=='all'&&selectedDept===p.department);if(h.ring.visible)(h.ring.material as THREE.MeshBasicMaterial).opacity=.65+Math.sin(t*2)*.15;
 }
 const occupied:{x:number;y:number;w:number}[]=[];
 for(const l of nameLabels){const h=humans.find(h=>h.person.id===l.id)!;worldPos.copy(h.root.position);worldPos.y+=h.person.seated?2.70:3.08;proj.copy(worldPos).project(camera);const x=(proj.x*.5+.5)*width;let y=(-proj.y*.5+.5)*height;const w=h.person.name.length*7+30;for(let attempt=0;attempt<3;attempt++){if(occupied.some(r=>Math.abs(r.x-x)<(r.w+w)/2&&Math.abs(r.y-y)<27))y-=27;else break}occupied.push({x,y,w});l.element.style.left=`${x}px`;l.element.style.top=`${y}px`;l.element.style.display=proj.z<1&&x>10&&x<width-10&&y>35&&y<height-22?'':'none';l.element.classList.toggle('dimmed',selectedDept!=='all'&&h.person.department!==selectedDept);l.element.classList.toggle('focused',focusId===h.person.id);}
 for(const l of labels){proj.copy(l.position).project(camera);const x=(proj.x*.5+.5)*width,y=(-proj.y*.5+.5)*height;const collision=occupied.some(r=>Math.abs(r.x-x)<(r.w+115)/2&&Math.abs(r.y-y)<26);l.element.style.display=proj.z<1&&x>10&&x<width-10&&y>45&&y<height-25&&!collision?'':'none';l.element.style.left=`${x}px`;l.element.style.top=`${y}px`;}
 for(const [id,b]of bubbles){const h=humans.find(h=>h.person.id===id);if(!h||performance.now()>b.until){b.element.remove();bubbles.delete(id);continue}proj.copy(h.root.position);proj.y+=3.4;proj.project(camera);b.element.style.left=`${(proj.x*.5+.5)*width}px`;b.element.style.top=`${(-proj.y*.5+.5)*height}px`;b.element.style.display=proj.z<1?'':'none'}
 if(Math.abs(camera.zoom-lastZoom)>.006){lastZoom=camera.zoom;callbacks.onZoom(camera.zoom)}renderer.render(scene,camera);
 }
 animate();
 return {playEmote(kind,id){const h=humans.find(h=>h.person.id===(id??focusId))||humans[0];if(!h||paused)return null;h.emote=kind;h.emoteStart=simTime;return h.person.id},setPaused(v){paused=v},setRotating(v){rotating=v},setView,zoomBy(v){flyTarget=null;camera.zoom=THREE.MathUtils.clamp(camera.zoom*v,.65,5);camera.updateProjectionMatrix();callbacks.onZoom(camera.zoom)},reset(){focusId=null;following=false;setView('isometric')},selectDepartment(id){selectedDept=id;focusId=null},focusPerson(id){const h=humans.find(h=>h.person.id===id);if(!h)return;focusId=id;h.waveStart=simTime;following=Boolean(options.externalMotion);rotating=false;flyTarget=h.root.position.clone();flyTarget.y=.6;flyZoom=3.2},rotateBy(angle){following=false;rotating=false;const offset=camera.position.clone().sub(controls.target);offset.applyAxisAngle(new THREE.Vector3(0,1,0),angle);camera.position.copy(controls.target).add(offset);controls.update()},stopFollowing(){following=false;focusId=null;flyTarget=null;for(const b of bubbles.values())b.element.remove();bubbles.clear()},updatePeople(updates){for(const update of updates){const h=humans.find(h=>h.person.id===update.id);if(!h)continue;const dx=update.position[0]-h.root.position.x,dz=update.position[1]-h.root.position.z;if(Math.hypot(dx,dz)>.002&&update.status==='walking')h.targetRotation=Math.atan2(dx,dz);else if(update.rotation!==undefined&&update.seated)h.targetRotation=update.rotation;h.root.position.set(update.position[0],.08,update.position[1]);h.person.status=update.status;h.person.seated=update.seated;h.person.action=update.action;const label=nameLabels.find(l=>l.id===update.id);if(label){label.element.classList.toggle('has-alert',Boolean(update.alert));label.element.title=`${h.person.name} · ${h.person.role}${update.action?' · Simulated '+update.action:''}${update.note?' · '+update.note:''}`}}},showBubble,dispose(){disposed=true;cancelAnimationFrame(frame);observer.disconnect();controls.removeEventListener('start',onControlStart);controls.dispose();renderer.domElement.removeEventListener('pointerdown',down);renderer.domElement.removeEventListener('pointerup',up);const materials=new Set<THREE.Material>();scene.traverse(o=>{if(o instanceof THREE.Mesh){geometries.add(o.geometry);if(Array.isArray(o.material))o.material.forEach(m=>materials.add(m));else materials.add(o.material)}});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());mats.forEach(m=>m.dispose());renderer.dispose();renderer.domElement.remove();labelLayer.remove()}};
}
