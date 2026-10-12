import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read=p=>readFileSync(p,'utf8');
const bundle=read('public/office-3d.js');
const source=read('source/src/office-character.ts');
const scene=read('source/src/office-scene.ts');
const html=read('public/index.html');
assert.match(source,/if\(p\.gender==='female'\)return createOfficeHijabiRig\(p\)/);
assert.match(source,/animateOfficeHijabi\(r,p,time,dt,distance\)/);
assert.match(bundle,/if\(_\.gender==="female"\)return createOfficeHijabiRig\(_\)/);
assert.match(bundle,/if\(i\.root\.userData\.officeHijabi\)return animateOfficeHijabi/);
assert.match(bundle,/L\.gender==="female"&&\(Z\.scale\.setScalar/);
assert.match(scene,/const selectionFactor=1\.2\/rig\.root\.scale\.x/);
assert.match(html,/office-3d\.js\?v=86\.5/);
for(const part of ['Sculpted hijab shell','Plain long shirt','Lower scarf fold','Sneaker upper'])assert.ok(bundle.includes(part),`Missing uploaded model: ${part}`);
for(const original of ['office-pulse-integrated.css','office-living-office.js','office-movement-sync.js'])assert.ok(html.includes(original),`Lost Office Plus feature: ${original}`);
assert.doesNotMatch(html,/ksRoomJump|office-room-nav\.js/);
assert.doesNotMatch(read('public/office-ambience-audio.js'),/ventLow|ventWhisper|fan\.start\(\)|harmonic\.start\(\)/);

// Simulate the EXACT character-construction code injected into the offline bundle with minimal Three.js doubles.
// This catches construction/animation API errors without requiring an unavailable WebGL context.
class V3 {
 constructor(x=0,y=0,z=0){this.x=x;this.y=y;this.z=z}
 set(x,y,z){this.x=x;this.y=y;this.z=z;return this}
 setScalar(v){this.x=this.y=this.z=v;return this}
}
class Node {
 constructor(){this.position=new V3();this.scale=new V3(1,1,1);this.rotation=new V3();this.children=[];this.name='';this.userData={};this.visible=true}
 add(child){this.children.push(child);child.parent=this;return this}
 traverse(fn){fn(this);for(const ch of this.children)ch.traverse(fn)}
}
class Geometry{constructor(...args){this.args=args;this.attributes={};this.index=null}setAttribute(name,attr){this.attributes[name]=attr}setIndex(v){this.index=v}computeVertexNormals(){return this}}
class Mesh extends Node{constructor(geo,mat){super();this.geometry=geo;this.material=mat}}
class Attr{constructor(data,dim){this.array=data;this.itemSize=dim}}
class Curve{constructor(points){this.points=points}getPoint(v){const p=this.points,at=Math.min(p.length-1-1e-9,Math.max(0,v)*(p.length-1)),i=Math.floor(at),t=at-i,a=p[i],b=p[i+1];return new V3(a.x*(1-t)+b.x*t,a.y*(1-t)+b.y*t,a.z*(1-t)+b.z*t)}}
class Material{constructor(options){this.options=options;this.color={set(){return this},multiplyScalar(){return this}}}}
const ctx={Le:Node,bi:Material,En:Geometry,Li:Geometry,tr:Geometry,yi:Curve,D:V3,be:Mesh,Ee:Geometry,jt:Attr,Math};
const start=bundle.indexOf('/* Office Plus V86.5: user-supplied hijabi geometry');
const end=bundle.indexOf('var y0=',start);
assert.ok(start>=0&&end>start,'Custom model injected before characterFactory');
const injection=bundle.slice(start,end);
const api=vm.runInNewContext(injection+`\n({createOfficeHijabiRig,animateOfficeHijabi})`,ctx,{timeout:10000});
const rig=api.createOfficeHijabiRig({id:7,name:'Minn',gender:'female',role:'Designer',seated:false});
assert.equal(rig.root.userData.officeHijabi,true);
assert.equal(rig.eyes.length,2);
assert.equal(rig.root.scale.x,.42);
let found=0,vertices=0;
rig.root.traverse(obj=>{if(obj.name==='Sculpted hijab shell')found++;if(obj.geometry?.attributes?.position?.array)vertices+=obj.geometry.attributes.position.array.length/3});
assert.equal(found,1,'Uploaded sculpted hijab is present on the live rig');
assert.ok(vertices>1000&&vertices<45000,`Unexpected mesh complexity ${vertices}`);
api.animateOfficeHijabi(rig,{status:'walking',seated:false,action:'typing'},.9,.016,.05);
const gait=rig.leftLeg.joint.rotation.x;
api.animateOfficeHijabi(rig,{status:'desk',seated:true,action:'typing'},2,.2,0);
assert.ok(Number.isFinite(gait)&&Number.isFinite(rig.body.position.y),'Walk/seat animation must be finite');
rig.waveStart=2;api.animateOfficeHijabi(rig,{status:'desk',seated:false,action:'reading'},2.3,.02,0);
assert.ok(!rig.cup.visible,'No coffee in prayer/toilet simulation');
console.log(`PASS V86.5 custom uploaded character, 2 eyes, ${vertices} model vertices, walking/sitting/emotes, cache bust, male/source/office preserved`);
