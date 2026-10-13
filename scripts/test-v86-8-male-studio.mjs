import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read=p=>readFileSync(p,'utf8');
const html=read('public/index.html'), bundle=read('public/office-3d.js'), src=read('source/src/male-character.js');
const adapter=read('source/src/male-office-adapter.js'),original=read('source/reference-models/male-character-original.js');
const editor=read('public/office-character-studio.js'),type=read('source/src/office-data.ts');
const officeCharacter=read('source/src/office-character.ts'),scene=read('source/src/office-scene.ts');
assert.equal(JSON.parse(read('public/office-build-info.json')).release,'86.8');
assert.match(html,/office-3d\.js\?v=86\.8/);
assert.match(html,/office-character-studio\.js\?v=86\.8/);
assert.match(html,/office-character-studio\.css\?v=86\.8/);
for(const id of ['ksCharHairStyle','ksCharHairColor','ksCharHairRow','ksCharHairStyleRow','ksCharHairSwatches']) assert.ok(html.includes(`id="${id}"`),id);
for(const id of ['fade','quiff','sidepart','korean','messy'])assert.ok(html.includes(`<option value="${id}">`),id);
assert.match(editor,/hairColor:isHex\(a\.hairColor\)/);
assert.match(editor,/hairStyle:HAIR_STYLES\.has\(a\.hairStyle\)/);
assert.match(type,/hairColor\?:string/);
assert.match(adapter,/createMaleCharacter/);assert.match(adapter,/setHairStyle/);
assert.match(officeCharacter,/if\(p\.gender==='male'\)return createOfficeMaleRig\(p\)/);
assert.match(officeCharacter,/if\(r\.root\.userData\.officeMale\)/);
assert.match(scene,/rig\.root\.userData\.officeMale/);
assert.match(bundle,/if\(_\.gender==="male"\)return createOfficeMaleRig\(_\)/);
assert.match(bundle,/if\(i\.root\.userData\.officeMale\)return animateOfficeMale/);
for (const keyword of ['Modern hairstyle —','Full Korean hair and parted fringe','Tousled crown and irregular fringe','Rounded glasses frame','Rolled sleeve cuff']) assert.ok(bundle.includes(keyword),keyword);
assert.match(original,/export function createMaleCharacter/);
assert.doesNotMatch(original,/Left hip joint/);
assert.match(src,/Left hip joint/);
assert.doesNotMatch(html,/ksRoomJump|office-room-nav\.js/);
for(const keyword of ['Sculpted hijab shell','function createHijabiCasualCharacter']) assert.ok(bundle.includes(keyword),'female preserved: '+keyword);
const win={}; vm.runInNewContext(editor,{window:win,document:{readyState:'loading',addEventListener(){}},Math,String},{timeout:5000});
const normalize=win.KSCharacterStudio.normalize;
const v=normalize({model:'classic',hairStyle:'korean',hairColor:'#AABBCC',glasses:false,shirtColor:'#123456'},'male','Afiq');
assert.equal(v.model,'semi-casual');assert.equal(v.hairStyle,'korean');assert.equal(v.hairColor,'#aabbcc');assert.equal(v.glasses,false);assert.equal(v.shirtColor,'#123456');
assert.equal(normalize({hairStyle:'script',hairColor:'red'},'male','Boss').hairStyle,'fade');
assert.equal(normalize({},'male','Afiq').glasses,true);
assert.equal(normalize({model:'semi-casual'},'female','Nisa').model,'semi-casual');
assert.equal(normalize({},'female','Nisa').model,'classic');
class V3{constructor(x=0,y=0,z=0){this.x=x;this.y=y;this.z=z}set(x,y,z){this.x=x;this.y=y;this.z=z;return this}setScalar(v){this.x=this.y=this.z=v;return this}}
class Node{constructor(){this.position=new V3();this.rotation=new V3();this.scale=new V3(1,1,1);this.children=[];this.name='';this.visible=true;this.userData={}}add(x){this.children.push(x);x.parent=this;return this}traverse(fn){fn(this);for(const child of this.children)child.traverse(fn)}}
class Attr{constructor(data,items){this.array=data;this.itemSize=items;this.count=data.length/items}getX(i){return this.array[i*this.itemSize]}getY(i){return this.array[i*this.itemSize+1]}getZ(i){return this.array[i*this.itemSize+2]}setXYZ(i,x,y,z){this.array[i*this.itemSize]=x;this.array[i*this.itemSize+1]=y;this.array[i*this.itemSize+2]=z}}
class Geometry{constructor(){this.attributes={};this.index=null}setAttribute(name,a){this.attributes[name]=a;return this}setIndex(v){this.index=v;return this}computeVertexNormals(){if(!this.attributes.position)return;const data=this.attributes.position.array;const n=new Float32Array(data.length);for(let i=0;i<data.length;i+=3)n[i+2]=1;this.attributes.normal=new Attr(n,3)}clone(){const n=new Geometry();for(const [key,a] of Object.entries(this.attributes)) n.setAttribute(key,new Attr(new a.array.constructor(a.array),a.itemSize));n.index=this.index;return n}}
class Mesh extends Node{constructor(geo,mat){super();this.geometry=geo;this.material=mat;this.isMesh=true}}
class Color{constructor(hex){this.hex=hex;this.r=.5;this.g=.5;this.b=.5}set(hex){this.hex=hex;return this}clone(){const x=new Color(this.hex);x.r=this.r;x.g=this.g;x.b=this.b;return x}lerp(c,t){this.r=this.r+(c.r-this.r)*t;this.g=this.g+(c.g-this.g)*t;this.b=this.b+(c.b-this.b)*t;return this}multiplyScalar(x){this.r*=x;this.g*=x;this.b*=x;return this}}
class Material{constructor(args){this.color=new Color(args.color);this.vertexColors=false}}
class Curve{constructor(points){this.points=points}getPoint(v){const p=this.points,i=Math.min(p.length-2,Math.max(0,Math.floor(v*(p.length-1)))),a=p[i],b=p[i+1],t=Math.min(1,v*(p.length-1)-i);return new V3(a.x*(1-t)+b.x*t,a.y*(1-t)+b.y*t,a.z*(1-t)+b.z*t)}}
const ctx={__KS3D:{Group:Node,Mesh:Mesh,Vector3:V3,MeshStandardMaterial:Material,Color:Color,Float32BufferAttribute:Attr,BufferGeometry:Geometry,DoubleSide:2,RoundedBoxGeometry:Geometry,SphereGeometry:Geometry,TubeGeometry:Geometry,CatmullRomCurve3:Curve},Math,animateOfficeHijabi:(r,p,t,dt,d)=>{r.body.position.y=p.seated?-1:0}};
const start=bundle.indexOf('/* Office Plus V86.8: supplied customizable male model');
const end=bundle.indexOf('var y0=',start);
assert.ok(start>=0&&end>start,'male model is injected into shipped bundle');
const api=vm.runInNewContext(bundle.slice(start,end)+'\n({createOfficeMaleRig,animateOfficeMale})',ctx,{timeout:30000});
for(const style of ['fade','quiff','sidepart','korean','messy']){
 const rig=api.createOfficeMaleRig({id:3,name:'Afiq',gender:'male',seated:false,appearance:{hairStyle:style,hairColor:'#123456',shirtColor:'#456789',pantsColor:'#575757',glasses:style==='quiff'}});
 assert.equal(rig.root.userData.officeMale,true);assert.equal(rig.root.userData.hairStyle,style);assert.equal(rig.root.scale.x,.42);assert.equal(rig.eyes.length,2);
 const nodes=[];rig.root.traverse(x=>nodes.push(x));
 assert.ok(nodes.some(x=>x.name==='Relaxed button-up shirt'));
 const selected=nodes.filter(x=>x.name==='Modern hairstyle — '+style||(style==='korean'&&x.name==='Thick Korean curtain hairstyle')||(style==='messy'&&x.name==='Tousled messy hairstyle'));
 assert.equal(selected.length,1,style+' hairstyle');assert.equal(selected[0].visible,true);
 assert.equal(nodes.find(x=>x.name==='Optional glasses')?.visible,style==='quiff');
 api.animateOfficeMale(rig,{seated:true},2,.016,0);
 assert.ok(Number.isFinite(rig.body.position.y));
}
console.log('PASS V86.8: 5 uploaded male hairstyles, glasses, male/female appearance persistence, offline bundle, male rig, animations and version');
