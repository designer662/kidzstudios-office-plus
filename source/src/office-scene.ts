import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { departments, people, rooms, walkingPath, type Person } from './office-data';
import {followSceneTarget} from './office-navigation.js';
import {pairOfficeSocialV8615,adaptiveOfficeQualityV8615} from './office-character-runtime.js';
import {characterFactory,animateCharacter,type CharacterRig} from './office-character';

export type OfficeQuality='eco'|'balanced'|'high';
export type OfficeController={getDiagnostics:()=>any;setQuality:(quality:OfficeQuality)=>void;playEmote:(kind:'wave'|'dance'|'celebrate'|'stretch',id?:number)=>number|null;setPaused:(v:boolean)=>void;setRotating:(v:boolean)=>void;zoomBy:(v:number)=>void;reset:()=>void;selectDepartment:(id:string)=>void;focusPerson:(id:number)=>void;focusRoom:(id:string)=>void;setView:(view:'isometric'|'plan')=>void;rotateBy:(angle:number)=>void;stopFollowing:()=>void;updatePeople:(updates:PersonUpdate[])=>void;showBubble:(id:number,text:string,duration?:number,kind?:string)=>void;clearBubble:(id:number,kind?:string)=>void;dispose:()=>void};
type Callbacks={onPerson:(id:number)=>void;onDepartment:(id:string)=>void;onZoom:(zoom:number)=>void;onRoom?:(id:string)=>void;onExplore?:()=>void};
export type PersonUpdate={action?:string;furnitureId?:string|null;id:number;position:[number,number];status:Person['status'];seated:boolean;rotation?:number;note?:string;alert?:boolean;mood?:string};
type Human=CharacterRig&{ring:THREE.Mesh;person:Person;targetRotation:number;targetPosition:THREE.Vector3};

export function createOffice(host:HTMLDivElement,callbacks:Callbacks,options:{roster?:Person[];externalMotion?:boolean}={}):OfficeController{
 const staff=options.roster??people;
 const scene=new THREE.Scene();scene.background=new THREE.Color('#fafaf9');
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.75));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;renderer.outputColorSpace=THREE.SRGBColorSpace;
 host.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
 const camera=new THREE.OrthographicCamera(-25,25,14,-14,.1,200);camera.position.set(38,34,25);camera.lookAt(0,0,0);camera.zoom=1.14;camera.updateProjectionMatrix();
 const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,0,0);controls.enableDamping=true;controls.dampingFactor=.065;controls.minPolarAngle=.008;controls.maxPolarAngle=Math.PI*.45;controls.minZoom=.65;controls.maxZoom=5;controls.enablePan=true;controls.screenSpacePanning=true;controls.rotateSpeed=.5;controls.zoomSpeed=.7;controls.autoRotateSpeed=.24;
 const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
 const hemi=new THREE.HemisphereLight('#fffef8','#dedbd3',2.4);scene.add(hemi);
 const sun=new THREE.DirectionalLight('#fff7e9',3.1);sun.position.set(-12,26,13);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-28;sun.shadow.camera.right=28;sun.shadow.camera.top=28;sun.shadow.camera.bottom=-28;sun.shadow.camera.near=.1;sun.shadow.camera.far=70;sun.shadow.normalBias=.045;sun.shadow.bias=-.00025;sun.shadow.radius=4;scene.add(sun);
 const fill=new THREE.DirectionalLight('#edf3ff',1.3);fill.position.set(15,12,-12);scene.add(fill);
 // V86.18: the physical office is 50% wider/longer than base; character models retain size.
 const FLOOR_SPACE_SCALE=1.5;
 const accent=new THREE.DirectionalLight('#ffd9c2',.38);accent.position.set(-8,11,17);scene.add(accent);
 const world=new THREE.Group();scene.add(world);
 const mats=new Map<string,THREE.MeshStandardMaterial>();const geometries=new Set<THREE.BufferGeometry>();
 const material=(color:string)=>{if(!mats.has(color))mats.set(color,new THREE.MeshStandardMaterial({color,roughness:.78,metalness:0}));return mats.get(color)!};
 const geo=<T extends THREE.BufferGeometry>(g:T)=>{geometries.add(g);return g};
 const unitBox=geo(new THREE.BoxGeometry(1,1,1));
 const mesh=(g:THREE.BufferGeometry,m:THREE.Material,parent:THREE.Object3D,x:number,y:number,z:number)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o};
 const box=(p:THREE.Object3D,x:number,y:number,z:number,w:number,h:number,d:number,c:string,rounded=false)=>{const g=rounded?geo(new RoundedBoxGeometry(w,h,d,2,Math.min(.065,w/4,h/4,d/4))):unitBox;const o=mesh(g,material(c),p,x,y,z);if(!rounded)o.scale.set(w,h,d);return o};
 const cyl=(p:THREE.Object3D,x:number,y:number,z:number,r:number,h:number,c:string,rt?:number)=>mesh(geo(new THREE.CylinderGeometry(rt??r,r,h,20)),material(c),p,x,y,z);
 const sphereGeo=geo(new THREE.SphereGeometry(1,20,14));
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
 const workTargets=new Map<string,{x:number;y:number;z:number}>();
 const equipment=(window as any).OfficeFurnitureInteractions;
 equipment?.reset?.();
 (window as any).KSOfficeSeating?.resetFurniture();
 function chair(x:number,z:number,rotation=Math.PI,color=dark,key?:string){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=rotation;g.scale.setScalar(1.2);world.add(g);cyl(g,0,.28,0,.045,.5,'#8c948e');box(g,0,.54,0,.6,.13,.56,color,true);box(g,0,.91,-.25,.58,.62,.1,color,true);for(const a of [0,Math.PI/2]){const b=box(g,0,.09,0,.72,.045,.06,'#727b76');b.rotation.y=a}for(const [xx,zz]of [[.3,0],[-.3,0],[0,.3],[0,-.3]])ball(g,xx,.07,zz,.055,.06,.055,'#5b625e');for(const xx of [-.32,.32]){box(g,xx,.66,0,.035,.27,.03,'#89918a');box(g,xx,.8,.02,.075,.04,.32,color)}(window as any).KSOfficeSeating?.registerChair({key,workPoint:key?workTargets.get(key):null,x:x*FLOOR_SPACE_SCALE,z:z*FLOOR_SPACE_SCALE,yaw:rotation,seatHeight:(.54+.13/2)*g.scale.y})}
 function mug(x:number,y:number,z:number,c='#bf9364'){cyl(world,x,y,z,.09,.19,c);cyl(world,x,y+.1,z,.071,.008,'#625740');const handle=mesh(geo(new THREE.TorusGeometry(.064,.018,6,10)),material(c),world,x+.095,y,z);handle.rotation.x=Math.PI/2}
 function monitor(x:number,z:number,rotation:number,tone='#b7cfca',key?:string,keyboardForward=.53){const g=new THREE.Group();g.position.set(x,1.2,z);g.rotation.y=rotation;world.add(g);box(g,0,.03,0,.4,.035,.29,'#697370');box(g,0,.25,-.03,.065,.43,.055,'#8c9790');box(g,0,.57,-.04,.85,.56,.085,'#465451',true);box(g,0,.57,.007,.77,.47,.012,'#e3ede7');box(g,-.16,.59,.017,.34,.28,.01,tone);for(let i=0;i<3;i++)box(g,.21,.7-i*.12,.017,.24,.025,.01,'#aec2b1');box(g,0,.022,keyboardForward,.57,.035,.23,'#c9d1c5',true);box(g,.48,.04,keyboardForward,.11,.055,.17,'#b7c2b0',true);if(key)workTargets.set(key,{x:(x+Math.sin(rotation)*keyboardForward)*FLOOR_SPACE_SCALE,y:1.2+.022+.035/2,z:(z+Math.cos(rotation)*keyboardForward)*FLOOR_SPACE_SCALE})}
 // Classic V86.49 worktable: one continuous six-seat island with center divider.
 // V86.50 seat ownership remains exclusive: each chair/monitor retains a unique ID.
 // Preserve furniture geometry and navigation anchors; only the tabletop styling reverts.
 box(world,.85,1.12,-10.7,2.85,.14,7.25,wood,true);
 for(const z of [-13.65,-10.7,-7.75])box(world,.85,.55,z,2.5,1.06,.12,'#e6e8dd');
 box(world,.85,1.35,-10.7,.06,.36,7,'#8c968e');
 for(const z of [-12.45,-10.2,-7.95]){const left=z===-12.45?'D02':z===-10.2?'S01':'S03',right=z===-12.45?'D01':z===-10.2?'S02':'S04';monitor(.52,z,-Math.PI/2,'#b5c6d0',left,.94);monitor(1.18,z,Math.PI/2,'#d9c8a4',right,.94);chair(-.85,z,Math.PI/2,dark,left);chair(2.56,z,-Math.PI/2,dark,right)}
 mug(-.15,1.31,-11.1);mug(1.92,1.31,-8.65,'#9dab80');box(world,1.88,1.215,-10.8,.38,.04,.57,'#ede8d8');
 box(world,1.1,1.12,-16.25,8,.14,1.25,wood,true);for(const x of [-2.35,4.55])box(world,x,.55,-16.25,.12,1.1,1.04,'#ddd7c7');monitor(-.15,-16.3,0,'#b7cfca','B02');monitor(3.1,-16.3,0,'#dbccaa','A01');chair(-.15,-15.33,Math.PI,dark,'B02');chair(3.1,-15.33,Math.PI,dark,'A01');mug(.85,1.31,-16.15);
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
 equipment?.registerScene?.({id:'heat-press',zone:'showroom',type:'press',action:'production',label:'🖨 Checking the heat press',fixture:{x:3.67,z:.10},approach:{x:3.67,z:-1.15},duration:13500});
 equipment?.registerScene?.({id:'showroom-samples',zone:'showroom',type:'display',action:'meeting',label:'👕 Reviewing samples',fixture:{x:1.2,z:-3.45},approach:{x:1.2,z:-1.75},duration:13500});
 box(world,2.05,1.19,.1,.42,.15,.31,'#5b6963',true);for(let i=0;i<6;i++)box(world,4.57+(i%3)*.13,1.14,-.06+Math.floor(i/3)*.16,.105,.012,.13,['#d69c73','#719889','#6c8197','#eee5d6','#6d5b52','#c1bd79'][i]);
 // Boss office: L-shaped desk and storage.
 box(world,2.95,1.12,2.85,3.15,.15,1.25,wood,true);box(world,4.15,1.12,3.55,.75,.15,1.7,wood,true);for(const x of [1.6,4.3])box(world,x,.53,2.85,.11,1.05,1.05,'#d5c6ac');box(world,4.18,.53,4.2,.6,1.05,.12,'#d5c6ac');monitor(3.2,2.82,0,'#b7cfca','B01',.5);chair(3.2,3.76,Math.PI,dark,'B01');mug(1.92,1.31,2.94);box(world,5.24,.6,3.2,.63,1.2,3.95,'#dfcbaa',true);for(let i=0;i<5;i++)box(world,5.23,1.23,2.1+i*.37,.39,.08,.28,['#8f9d7f','#ded8c9','#d4b284'][i%3]);
 // Pantry counter, sink, coffee station, fridge and two-seat table. Right side is entirely open.
 box(world,-5.15,.56,4.65,1.04,1.12,8.3,'#e2dfd1',true);box(world,-5.15,1.15,4.65,1.15,.1,8.38,wood);for(const z of [2.35,3.08]){const bowl=ball(world,-5.15,1.2,z,.36,.075,.27,'#a2aaa2');cyl(world,-5.35,1.4,z+.15,.022,.44,'#919e95')}
 box(world,-5.14,1.35,6.9,1.1,2.7,1.25,'#c6ceca',true);box(world,-4.565,1.49,6.9,.02,2.37,1.08,'#dde2dc');box(world,-4.54,1.49,6.57,.04,.47,.035,'#9ba99e');box(world,-4.54,1.91,6.9,.02,.022,1.1,'#adb8ad');
 box(world,-5.08,1.5,5.25,.62,.62,.68,'#4c5b50',true);box(world,-4.74,1.49,5.25,.035,.25,.39,'#adb4a1');mug(-4.7,1.27,5.26,'#eeeadd');mug(-5.05,1.3,4.2);
 equipment?.registerScene?.({id:'coffee-station',zone:'pantry',type:'coffee',action:'drink',label:'☕ Making coffee',fixture:{x:-5.08,z:5.25},approach:{x:-3.95,z:5.25},duration:12500});
 box(world,-3.45,1.0,3.65,1.2,.11,1.65,wood,true);for(const z of [3.02,4.28])box(world,-3.45,.49,z,.85,.94,.06,'#b9bba6');chair(-3.45,2.45,0,'#88967c');chair(-3.45,4.85,Math.PI,'#88967c');
 // Store shelves with print supplies and packed garments.
 for(const z of [6.8,8.65,10.1]){for(const x of [4.65,5.42])box(world,x,1.05,z,.045,2.1,.06,'#839086');for(const y of [.2,.85,1.5,2.1])box(world,5.03,y,z,.95,.065,1.32,'#bdc6b6');for(let i=0;i<3;i++)box(world,5.0,.42+i*.65,z,.73,.36,1.04,['#d2b88e','#e7e2d4','#b7c2b0'][i],true)}
 equipment?.registerScene?.({id:'stock-shelf',zone:'store',type:'shelf',action:'stocking',label:'📦 Checking supplies',fixture:{x:5.03,z:8.65},approach:{x:3.65,z:8.65},duration:14000});
 // Two toilets and the rear prayer room.
 for(const x of [-4.86,-2.9]){box(world,x,.64,13.66,.64,1.25,.31,'#f8f7ee',true);ball(world,x,.48,13.1,.39,.4,.55,'#faf9f1');const seat=mesh(geo(new THREE.TorusGeometry(.29,.055,8,24)),material('#e3e8df'),world,x,.75,13.1);seat.rotation.x=-Math.PI/2;seat.scale.y=1.3;box(world,x+.58,.81,13.71,.43,.16,.41,'#eef0e6',true);cyl(world,x+.58,.94,13.83,.018,.2,'#9caa9f')}
 box(world,1.9,.045,14.9,6.9,.028,4.2,'#cfd4bc');
 for(const x of [-.45,1.8,4.05]){box(world,x,.075,14.9,1.67,.02,3.45,'#748368');box(world,x,.09,14.9,1.52,.015,3.28,'#cfbc89');box(world,x,.103,14.9,1.4,.012,3.16,'#879172');for(const dx of [-.59,.59])box(world,x+dx,.118,14.95,.032,.008,2.85,'#d4c69c');box(world,x,.118,16.36,1.2,.008,.034,'#d4c69c');const arch=mesh(geo(new THREE.TorusGeometry(.58,.018,4,28,Math.PI)),material('#d5c7a1'),world,x,.12,13.66);arch.rotation.x=-Math.PI/2}
 // Batch static geometry by material for efficient rendering.
 world.updateMatrixWorld(true);const buckets=new Map<THREE.Material,THREE.BufferGeometry[]>();world.traverse(o=>{if(o instanceof THREE.Mesh){const m=o.material as THREE.Material;let g=o.geometry.clone();if(g.index)g=g.toNonIndexed();g.applyMatrix4(o.matrixWorld);if(!buckets.has(m))buckets.set(m,[]);buckets.get(m)!.push(g)}});world.clear();for(const [m,gs]of buckets){const combined=mergeGeometries(gs);if(combined){geo(combined);const o=new THREE.Mesh(combined,m);o.castShadow=!m.transparent;o.receiveShadow=true;world.add(o)}gs.forEach(g=>g.dispose())}
 // Scale the fully merged office ONCE, after geometry batching. Scaling before batching
 // would bake the transform and accidentally apply it twice.
 world.scale.set(FLOOR_SPACE_SCALE,1,FLOOR_SPACE_SCALE);
 world.updateMatrixWorld(true);
 (window as any).KSOfficeSeating?.bindStaff(staff);
 // Jointed, rounded character models with individual clothing and facial details.
 const humans:Human[]=[];const pickables:THREE.Object3D[]=[];const makeCharacter=characterFactory();
 for(const p of staff){
  const rig=makeCharacter(p);(window as any).KSOfficeSeating?.installKnees(rig,THREE);(rig as any).seatStateV8620=(window as any).KSOfficeSeating?.createState();rig.root.position.set(p.position[0]*FLOOR_SPACE_SCALE,.08,p.position[1]*FLOOR_SPACE_SCALE);rig.root.rotation.y=p.rotation;rig.lastPosition.copy(rig.root.position);scene.add(rig.root);
  const ring=mesh(geo(new THREE.RingGeometry(.42,.49,32)),new THREE.MeshBasicMaterial({color:'#d89551',side:THREE.DoubleSide,transparent:true,opacity:.85}),rig.root,0,-.01,0);ring.rotation.x=-Math.PI/2;ring.visible=false;ring.castShadow=false;
  const hit=mesh(geo(new THREE.CylinderGeometry(.66,.76,3.04,12)),new THREE.MeshBasicMaterial({visible:false}),rig.root,0,1.33,0);
  // Custom male and female models use a smaller root scale; keep selection accessible.
  if(p.gender==='female'||rig.root.userData.officeMale){const selectionFactor=1.2/rig.root.scale.x;hit.scale.setScalar(selectionFactor);ring.scale.setScalar(selectionFactor)}
  hit.userData.personId=p.id;pickables.push(hit);
  humans.push({...rig,ring,person:p,targetRotation:p.rotation,targetPosition:rig.root.position.clone()});
 }
 const humansById=new Map(humans.map(h=>[h.person.id,h] as const));
 const labelLayer=document.createElement('div');labelLayer.className='scene-label-layer';host.appendChild(labelLayer);
 const labels=rooms.map(room=>{const element=document.createElement('button');element.type='button';element.className='room-label';element.textContent=room.name;element.setAttribute('aria-label',`Focus ${room.name}`);element.onclick=()=>{callbacks.onRoom?.(room.id);flyTarget=new THREE.Vector3(room.focus[0]*FLOOR_SPACE_SCALE,0,room.focus[1]*FLOOR_SPACE_SCALE);flyZoom=1.8;focusId=null;rotating=false};labelLayer.appendChild(element);return {element,position:new THREE.Vector3(room.x*FLOOR_SPACE_SCALE,room.y,room.z*FLOOR_SPACE_SCALE)}});
 const nameLabels=staff.map(p=>{const element=document.createElement('button'),moodElement=document.createElement('span'),nameElement=document.createElement('span');element.type='button';element.className='person-label';moodElement.className='ks-mood-mark';moodElement.setAttribute('aria-hidden','true');nameElement.className='ks-name-copy';nameElement.textContent=p.name;element.append(moodElement,nameElement);element.style.setProperty('--person-color',p.color);element.title=`${p.name} · ${p.role}`;element.setAttribute('aria-label',`${p.name}, ${p.role}`);element.onclick=()=>callbacks.onPerson(p.id);labelLayer.appendChild(element);return {element,id:p.id,nameElement,moodElement,mood:''}});
 const nameLabelsById=new Map(nameLabels.map(label=>[label.id,label] as const));
 let qualityMode:OfficeQuality='balanced';let adaptiveState:any=null;
 let paused=false,rotating=false,following=false,simTime=0,frame=0,disposed=false,selectedDept='all',focusId:number|null=null;let width=host.clientWidth,height=host.clientHeight,lastZoom=1;let view:'isometric'|'plan'='isometric';
 let flyTarget:THREE.Vector3|null=null,flyZoom=1,zoomTarget=1.14;const targetCamera=new THREE.Vector3();const defaultTarget=new THREE.Vector3(0,.15,0);
 function initialPosition(){return host.clientWidth<760?new THREE.Vector3(7,52,59):new THREE.Vector3(38,34,25)}
 camera.position.copy(initialPosition());controls.target.copy(defaultTarget);camera.lookAt(controls.target);
 function fit(){camera.updateMatrixWorld();let mx=0,my=0;for(const x of [-6*FLOOR_SPACE_SCALE,6*FLOOR_SPACE_SCALE])for(const y of [0,2.9])for(const z of [-18*FLOOR_SPACE_SCALE,18*FLOOR_SPACE_SCALE]){const v=new THREE.Vector3(x,y,z).applyMatrix4(camera.matrixWorldInverse);mx=Math.max(mx,Math.abs(v.x));my=Math.max(my,Math.abs(v.y))}const aspect=width/height;const vh=Math.max(my*2*1.15,mx*2/aspect*1.15);camera.left=-vh*aspect/2;camera.right=vh*aspect/2;camera.top=vh/2;camera.bottom=-vh/2;camera.updateProjectionMatrix()}
 function resize(){width=host.clientWidth;height=host.clientHeight;if(!width||!height)return;renderer.setSize(width,height);fit()}
 const observer=new ResizeObserver(resize);observer.observe(host);resize();
 // Quality presets lower GPU load without changing camera, staff positions, or the shared timeline.
 function setQuality(mode:OfficeQuality) {
  qualityMode=mode;adaptiveState=null;
  const presets={eco:{pixel:1,shadow:0},balanced:{pixel:1.35,shadow:1024},high:{pixel:1.75,shadow:2048}};
  const preset=presets[mode]||presets.balanced;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,preset.pixel));
  renderer.shadowMap.enabled=preset.shadow>0;
  if(preset.shadow && sun.shadow.mapSize.x!==preset.shadow){sun.shadow.mapSize.set(preset.shadow,preset.shadow);sun.shadow.map?.dispose();sun.shadow.map=null;}
  accent.intensity=mode==='eco'?0:mode==='high'?.55:.38;
  renderer.shadowMap.needsUpdate=true;
  resize();
 }
 let startupQuality:OfficeQuality='balanced';
 try {const saved=localStorage.getItem('ks-3d-quality-v86');if(saved==='eco'||saved==='balanced'||saved==='high') startupQuality=saved;}catch(_){/* private mode */}
 setQuality(startupQuality);

 const pointer=new THREE.Vector2(),raycaster=new THREE.Raycaster();let pointerStart={x:0,y:0};
 const down=(e:PointerEvent)=>{pointerStart={x:e.clientX,y:e.clientY};};
 const move=(e:PointerEvent)=>{if(e.buttons&&Math.hypot(e.clientX-pointerStart.x,e.clientY-pointerStart.y)>7&&following){following=false;focusId=null;flyTarget=null;callbacks.onExplore?.()}};
 const up=(e:PointerEvent)=>{
  if(Math.hypot(e.clientX-pointerStart.x,e.clientY-pointerStart.y)>6)return;
  const rect=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);
  raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(pickables,false)[0];let id=hit?.object.userData.personId;
  if(id===undefined){let best=38;for(const h of humans){const point=h.body.getWorldPosition(new THREE.Vector3());point.y=h.root.position.y+1.3;point.project(camera);const distance=Math.hypot((point.x*.5+.5)*rect.width-(e.clientX-rect.left),(-point.y*.5+.5)*rect.height-(e.clientY-rect.top));if(point.z<1&&point.z>-1&&distance<best){best=distance;id=h.person.id;}}}
  if(id!==undefined){(window as any).KSOutsideClose?.markCharacterSelection?.();(window as any).OfficeSuite?.markCharacterSelection?.();callbacks.onPerson(id);}
 };
 const sceneWheel=(e:WheelEvent)=>{if(e.cancelable)e.preventDefault();e.stopImmediatePropagation();if(!following)flyTarget=null;const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?height:1);zoomTarget=THREE.MathUtils.clamp(zoomTarget*Math.exp(-delta*.0015),.65,5);if(following)flyZoom=zoomTarget;};
 renderer.domElement.addEventListener('wheel',sceneWheel,{capture:true,passive:false});
 renderer.domElement.addEventListener('pointerdown',down);renderer.domElement.addEventListener('pointermove',move);renderer.domElement.addEventListener('pointerup',up);const onControlStart=()=>{if(!following)flyTarget=null};controls.addEventListener('start',onControlStart);
 const bubbles=new Map<string,{id:number;kind:string;element:HTMLDivElement;until:number}>();
 function setMood(id:number,value:string){const label=nameLabelsById.get(id);if(!label)return;const entries=Object.entries(((window as any).KSLabelLayout?.moodEmoji??{happy:'😊',sad:'😔',angry:'😠',badmood:'😒',busy:'💻'}) as Record<string,string>),pair=entries.find(([name,icon])=>name===value||icon===value),mood=pair?.[1]??'';if(label.mood===mood)return;label.mood=mood;label.moodElement.textContent=mood;label.moodElement.hidden=!mood;label.element.setAttribute('aria-label',`${label.nameElement.textContent}${mood?', mood '+pair?.[0]:''}`)}
 function clearBubble(id:number,kind='emoji'){if(kind==='emoji'){setMood(id,'');return}const key=`${id}:${kind}`;bubbles.get(key)?.element.remove();bubbles.delete(key)}
 function showBubble(id:number,text:string,duration=6800,kind='activity'){
  if(kind==='emoji'){setMood(id,text);return}
  if(kind==='follow'&&!duration)duration=4800;
  if(kind==='workload')duration=Math.min(duration||6500,6500);
  const key=`${id}:${kind}`,current=bubbles.get(key);
  if(current?.element.textContent===text&&duration===0)return;
  clearBubble(id,kind);
  const element=document.createElement('div');element.className=`scene-bubble${kind==='emoji'?' scene-mood-bubble':''}`;
  element.dataset.employeeId=String(id);element.dataset.bubbleKind=kind;
  if(kind==='emoji'){
   const mood:Record<string,string>={'😊':'happy','😔':'sad','😠':'angry','😒':'badmood','💻':'busy'};
   element.dataset.mood=mood[text]||'happy';element.setAttribute('aria-label',`${staff.find(p=>p.id===id)?.name||'Staff'}: ${element.dataset.mood}`);
   const icon=document.createElement('span');icon.className='animated-mood-icon';icon.textContent=text;icon.setAttribute('aria-hidden','true');element.appendChild(icon);
   if(text==='💻'){const dots=document.createElement('span');dots.className='busy-dots';dots.setAttribute('aria-hidden','true');dots.innerHTML='<i></i><i></i><i></i>';element.appendChild(dots)}
  }else element.textContent=text.slice(0,220);
  labelLayer.appendChild(element);bubbles.set(key,{id,kind,element,until:duration?performance.now()+duration:Infinity});
 }
 const clock=new THREE.Clock(),proj=new THREE.Vector3(),worldPos=new THREE.Vector3();
 let lastLabelAt=0,lastCanvasAt=0,lastGlowAt=0;
 const route=walkingPath.map(([x,z])=>new THREE.Vector3(x*FLOOR_SPACE_SCALE,.08,z*FLOOR_SPACE_SCALE));const segmentLengths=route.map((p,i)=>p.distanceTo(route[(i+1)%route.length]));const routeLength=segmentLengths.reduce((a,b)=>a+b,0);
 const setView=(v:'isometric'|'plan')=>{view=v;following=false;flyTarget=null;rotating=false;controls.autoRotate=false;controls.enableRotate=v==='isometric';controls.target.copy(defaultTarget);camera.position.copy(v==='plan'?new THREE.Vector3(0,65,.01):initialPosition());camera.zoom=1.14;zoomTarget=1.14;camera.lookAt(controls.target);controls.update();fit();callbacks.onZoom(1.14)};
 function animate(){if(disposed)return;frame=requestAnimationFrame(animate);
 const nowFrame=performance.now();
 // Eco mode caps animation at ~30fps; the existing adaptive pixel-ratio
 // controller handles transient GPU pressure in Balanced/High.
 if(qualityMode==='eco'&&nowFrame-lastCanvasAt<32)return;
 lastCanvasAt=nowFrame;
 const dt=Math.min(clock.getDelta(),.05);if(document.hidden||!width||!height)return;if(!paused)simTime+=dt;controls.dampingFactor=1-Math.exp(-4*dt);controls.autoRotate=rotating&&!paused&&!reducedMotion.matches&&view==='isometric';
 if(following&&focusId!==null){const h=humansById.get(focusId);if(h){flyTarget=h.root.position.clone();flyTarget.y=1.1}}
 if(flyTarget){const delta=targetCamera.copy(flyTarget).sub(controls.target).multiplyScalar(1-Math.exp(-5*dt));controls.target.add(delta);camera.position.add(delta);zoomTarget=flyZoom;camera.zoom+=(zoomTarget-camera.zoom)*(1-Math.exp(-6*dt));camera.updateProjectionMatrix();if(delta.length()<.002&&Math.abs(camera.zoom-flyZoom)<.002)flyTarget=null}else if(Math.abs(camera.zoom-zoomTarget)>.0001){camera.zoom+=(zoomTarget-camera.zoom)*(1-Math.exp(-10*dt));camera.updateProjectionMatrix()}controls.update(dt);
 const geometry=(window as any).KSOfficeGeometry,seating=(window as any).KSOfficeSeating;
 adaptiveState=adaptiveOfficeQualityV8615(adaptiveState,dt,qualityMode,window.devicePixelRatio);
 if(!paused&&adaptiveState.change&&adaptiveState.ratio!==null)renderer.setPixelRatio(adaptiveState.ratio);
 const socialPairs=pairOfficeSocialV8615(humans);
 for(const h of humans){const t=simTime+h.phase,p=h.person,rig=h as any;
  const emote=!!h.emote&&h.emote!=='wave'&&simTime-h.emoteStart<3.6;
  const hold=seating?.holdMovement(rig.seatStateV8620,{...p,emote});
  if(!paused&&!hold){
   if(!options.externalMotion&&p.status==='walking'){
    let distance=(simTime*.72)%routeLength,segment=0;
    while(distance>segmentLengths[segment]&&segment<route.length-1){distance-=segmentLengths[segment];segment++;}
    h.targetPosition.lerpVectors(route[segment],route[(segment+1)%route.length],distance/segmentLengths[segment]);
   }
   if(options.externalMotion||p.status==='walking')followSceneTarget(h,dt,geometry,FLOOR_SPACE_SCALE);
  }
  const deltaX=h.root.position.x-h.lastPosition.x,deltaZ=h.root.position.z-h.lastPosition.z;
  const travelled=Math.hypot(deltaX,deltaZ);
  // A follower that received the shared route late may still be catching up
  // even after the timeline says the walk is finished. Keep the feet moving
  // and facing actual travel until the rendered body reaches its destination.
  const syncLag=Math.hypot(h.targetPosition.x-h.root.position.x,h.targetPosition.z-h.root.position.z);
  const catchingUp=Boolean(options.externalMotion&&!hold&&travelled>.00007&&syncLag>.10);
  if((p.status==='walking'||catchingUp)&&travelled>.00007)h.targetRotation=Math.atan2(deltaX,deltaZ);
  h.lastPosition.copy(h.root.position);
  const fixture=(window as any).OfficeFurnitureInteractions?.get((h as any).furnitureId);
  const useFixture=fixture&&p.status!=='walking'&&!catchingUp&&
    Math.hypot(h.root.position.x-(fixture.point.x/2-5.75)*FLOOR_SPACE_SCALE,
               h.root.position.z-(fixture.point.y/2-17.5)*FLOOR_SPACE_SCALE)<.95;
  const chair=p.seated&&p.status!=='walking'?seating?.selectChair(h.root.position.x,h.root.position.z,p.id):null;
  if(!paused){
   if(useFixture)h.targetRotation=fixture.yaw;
   else if(hold&&rig.seatStateV8620.chair)h.targetRotation=rig.seatStateV8620.chair.yaw;
   else if(chair&&!catchingUp)h.targetRotation=chair.yaw;
   else if(socialPairs.has(p.id)&&p.status!=='walking')h.targetRotation=socialPairs.get(p.id).face;
   const diff=h.targetRotation-h.root.rotation.y;
   h.root.rotation.y+=Math.atan2(Math.sin(diff),Math.cos(diff))*(1-Math.exp(-dt*9));
   rig.precisionSceneV8615={chair:null,partner:socialPairs.get(p.id)};
   const seatState=seating?.step(rig.seatStateV8620||seating.createState(),{
    id:p.id,x:h.root.position.x,z:h.root.position.z,yaw:h.root.rotation.y,
    seated:p.seated,status:p.status,action:p.action,speed:travelled/dt,emote,
    canDock:(target:any)=>geometry?.clearLine(geometry.worldToPlan(h.root.position,FLOOR_SPACE_SCALE),geometry.worldToPlan(target,FLOOR_SPACE_SCALE))===true
   },dt);
   if(seatState)rig.seatStateV8620=seatState;
   const animationPerson={...p,status:hold?'desk' as const:catchingUp?'walking' as const:p.status,
    seated:seatState?seatState.ready:p.seated};
   animateCharacter(h,animationPerson,simTime,dt,hold?0:travelled);
   if(seatState)seating.pose(h,seatState);
  }
  h.ring.position.x=h.body.position.x;h.ring.position.z=h.body.position.z;
  h.ring.visible=focusId===p.id||(selectedDept!=='all'&&selectedDept===p.department);if(h.ring.visible)(h.ring.material as THREE.MeshBasicMaterial).opacity=.65+Math.sin(t*2)*.15;
 }
 // Layout measurement is relatively expensive (offsetWidth forces style
 // calculation); update names at a bounded rate independent of GPU frames.
 const labelInterval=qualityMode==='eco'?90:qualityMode==='balanced'?58:38;
 if(nowFrame-lastLabelAt>=labelInterval){lastLabelAt=nowFrame;
 // V80: labels share one collision-aware placement pass after projection.
 const names:any[]=[],roomTags:any[]=[],temporary:any[]=[];
 for(const l of nameLabels){const h=humansById.get(l.id);if(!h)continue;h.body.getWorldPosition(worldPos);worldPos.y=h.root.position.y;worldPos.y+=3.08-.38*h.sit;proj.copy(worldPos).project(camera);const x=(proj.x*.5+.5)*width,y=(-proj.y*.5+.5)*height;
  names.push({id:l.id,x,y,width:l.element.offsetWidth||Math.min(160,30+l.nameElement.textContent!.length*8+(l.mood?22:0)),height:l.element.offsetHeight||27,focused:focusId===l.id,visible:proj.z>=-1&&proj.z<1&&x>-12&&x<width+12&&y>-12&&y<height+12});
  l.element.classList.toggle('dimmed',selectedDept!=='all'&&h.person.department!==selectedDept);l.element.classList.toggle('focused',focusId===h.person.id);
 }
 for(let i=0;i<labels.length;i++){const l=labels[i];proj.copy(l.position).project(camera);const x=(proj.x*.5+.5)*width,y=(-proj.y*.5+.5)*height;roomTags.push({id:i,x,y,width:l.element.offsetWidth||112,height:l.element.offsetHeight||24,visible:proj.z>=-1&&proj.z<1&&x>10&&x<width-10&&y>38&&y<height-25})}
 for(const [key,b]of bubbles){const h=humansById.get(b.id);if(!h||performance.now()>b.until){b.element.remove();bubbles.delete(key);continue}temporary.push({key,id:b.id,kind:b.kind,width:b.element.offsetWidth||Math.min(200,Math.max(125,36+b.element.textContent!.length*5)),height:b.element.offsetHeight||46,started:b.until,visible:true})}
 const layout=(window as any).KSLabelLayout?.layout({names,rooms:roomTags,bubbles:temporary,viewport:{width,height},zoom:camera.zoom});
 if(layout){for(const tag of layout.names){const l=nameLabelsById.get(tag.id);if(!l)continue;l.element.style.visibility=tag.visible?'visible':'hidden';if(tag.visible){l.element.style.left=`${tag.x}px`;l.element.style.top=`${tag.y}px`}}
  for(const tag of layout.rooms){const l=labels[tag.id];if(!l)continue;l.element.style.visibility=tag.visible?'visible':'hidden';if(tag.visible){l.element.style.left=`${tag.x}px`;l.element.style.top=`${tag.y}px`}}
  for(const b of bubbles.values())b.element.style.visibility='hidden';for(const tag of layout.bubbles){const b=bubbles.get(tag.key);if(!b||!tag.visible)continue;b.element.style.left=`${tag.x}px`;b.element.style.top=`${tag.y}px`;b.element.style.visibility='visible'}
 }else{for(const l of nameLabels)l.element.style.visibility='hidden';for(const l of labels)l.element.style.visibility='hidden';for(const b of bubbles.values())b.element.style.visibility='hidden'}
 }
 if(Math.abs(camera.zoom-lastZoom)>.006){lastZoom=camera.zoom;callbacks.onZoom(camera.zoom)}
 (window as any).OfficeLiving?.applyLighting?.(hemi,sun,fill,renderer,scene);
 if(nowFrame-lastGlowAt>=800){lastGlowAt=nowFrame;(window as any).OfficeLiving?.screenGlow?.(mats,Date.now())}
 renderer.render(scene,camera);
 }
 animate();
 return {getDiagnostics(){return {release:'86.23',selectedId:focusId,following,paused,zoom:camera.zoom,floorScale:FLOOR_SPACE_SCALE,geometryReady:Boolean((window as any).KSOfficeGeometry),
  staff:humans.map((h:any)=>({id:h.person.id,name:h.person.name,desk:h.person.seatId||null,furnitureId:h.furnitureId||null,phase:h.seatStateV8620?.phase,
   chair:h.seatStateV8620?.chair?.key||null,seatMix:h.seatStateV8620?.seatMix||0,
   root:{x:h.root.position.x,z:h.root.position.z},target:{x:h.targetPosition.x,z:h.targetPosition.z},
   body:{x:h.body.position.x,y:h.body.position.y,z:h.body.position.z},yaw:h.root.rotation.y,
   blocked:(window as any).KSOfficeGeometry?.navBlocked(...(()=>{const p=(window as any).KSOfficeGeometry.worldToPlan(h.root.position,FLOOR_SPACE_SCALE);return [p.x,p.y]})())}))};},setQuality,playEmote(kind,id){const h=humansById.get(id??focusId??-1)||humans[0];if(!h||paused)return null;h.emote=kind;h.emoteStart=simTime;if(kind==='wave')h.waveStart=simTime;return h.person.id},setPaused(v){paused=v;host.classList.toggle('scene-paused',v);clock.getDelta()},setRotating(v){rotating=v},setView,zoomBy(v){if(!following)flyTarget=null;zoomTarget=THREE.MathUtils.clamp(zoomTarget*v,.65,5);if(following)flyZoom=zoomTarget},reset(){focusId=null;following=false;setView('isometric')},selectDepartment(id){selectedDept=id;focusId=null},focusPerson(id){const h=humansById.get(id);if(!h)return;focusId=id;h.waveStart=simTime;following=true;rotating=false;flyTarget=h.root.position.clone();flyTarget.y=1.1;flyZoom=2.35;zoomTarget=flyZoom},focusRoom(id){const room=rooms.find(r=>r.id===id);if(!room)return;focusId=null;following=false;rotating=false;flyTarget=new THREE.Vector3(room.focus[0]*FLOOR_SPACE_SCALE,0,room.focus[1]*FLOOR_SPACE_SCALE);flyZoom=1.8},rotateBy(angle){following=false;rotating=false;const offset=camera.position.clone().sub(controls.target);offset.applyAxisAngle(new THREE.Vector3(0,1,0),angle);camera.position.copy(controls.target).add(offset);controls.update()},stopFollowing(){following=false;focusId=null;flyTarget=null;for(const [key,b]of bubbles)if(b.kind==='follow'){b.element.remove();bubbles.delete(key)}},updatePeople(updates){for(const update of updates){if(!update.position?.every(Number.isFinite))continue;const h=humansById.get(update.id);if(!h)continue;const dx=update.position[0]*FLOOR_SPACE_SCALE-h.targetPosition.x,dz=update.position[1]*FLOOR_SPACE_SCALE-h.targetPosition.z;if(update.status==='walking'){
   // Frame-level movement computes facing from actual travel, not a noisy target.
   if(!Number.isFinite(h.targetRotation)&&Number.isFinite(update.rotation))h.targetRotation=update.rotation;
  }else if(update.rotation!==undefined&&(update.seated||update.action==='chat'||update.action==='meeting'))h.targetRotation=update.rotation;(h as any).furnitureId=update.furnitureId||null;h.targetPosition.set(update.position[0]*FLOOR_SPACE_SCALE,.08,update.position[1]*FLOOR_SPACE_SCALE);h.person.status=update.status;h.person.seated=update.seated;h.person.action=update.action;const label=nameLabelsById.get(update.id);if(label){setMood(update.id,update.mood||'');label.element.classList.toggle('has-alert',Boolean(update.alert));label.element.title=`${h.person.name} · ${h.person.role}${update.action?' · Simulated '+update.action:''}${update.note?' · '+update.note:''}`}}},showBubble,clearBubble,dispose(){disposed=true;cancelAnimationFrame(frame);observer.disconnect();controls.removeEventListener('start',onControlStart);controls.dispose();renderer.domElement.removeEventListener('wheel',sceneWheel,true);renderer.domElement.removeEventListener('pointerdown',down);renderer.domElement.removeEventListener('pointermove',move);renderer.domElement.removeEventListener('pointerup',up);const materials=new Set<THREE.Material>();scene.traverse(o=>{if(o instanceof THREE.Mesh){geometries.add(o.geometry);if(Array.isArray(o.material))o.material.forEach(m=>materials.add(m));else materials.add(o.material)}});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());mats.forEach(m=>m.dispose());renderer.dispose();renderer.domElement.remove();labelLayer.remove()}};
}
