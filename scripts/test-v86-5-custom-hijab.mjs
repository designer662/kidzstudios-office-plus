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
assert.ok(bundle.includes('(L.gender==="female"||B.root.userData.officeMale)&&(Z.scale.setScalar'),'Male and female selection collider fits custom models');
assert.match(scene,/const selectionFactor=1\.2\/rig\.root\.scale\.x/);
assert.match(html,/office-3d\.js\?v=86\.8/);
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
class Geometry{constructor(...args){this.args=args;this.attributes={};this.index=null}setAttribute(name,attr){this.attributes[name]=attr;return this}setIndex(v){this.index=v;return this}computeVertexNormals(){const position=this.attributes.position;if(position){const values=position.array,normals=new Float32Array(values.length);for(let i=0;i<values.length;i+=3)normals[i+2]=1;this.attributes.normal=new Attr(normals,3)}return this}}
class Mesh extends Node{constructor(geo,mat){super();this.geometry=geo;this.material=mat}}
class Attr{constructor(data,dim){this.array=data;this.itemSize=dim}getX(i){return this.array[i*this.itemSize]}getY(i){return this.array[i*this.itemSize+1]}getZ(i){return this.array[i*this.itemSize+2]}setXYZ(i,x,y,z){this.array[i*this.itemSize]=x;this.array[i*this.itemSize+1]=y;this.array[i*this.itemSize+2]=z;return this}}
class Curve{constructor(points){this.points=points}getPoint(v){const p=this.points,at=Math.min(p.length-1-1e-9,Math.max(0,v)*(p.length-1)),i=Math.floor(at),t=at-i,a=p[i],b=p[i+1];return new V3(a.x*(1-t)+b.x*t,a.y*(1-t)+b.y*t,a.z*(1-t)+b.z*t)}}
class Color{constructor(hex){this.hex=hex}set(hex){this.hex=hex;return this}multiplyScalar(){return this}lerp(){return this}}
class Material{constructor(options){this.options=options;this.color=new Color(options.color)}}
const ctx={Le:Node,bi:Material,En:Geometry,Li:Geometry,tr:Geometry,yi:Curve,D:V3,be:Mesh,Ee:Geometry,jt:Attr,Math};
const start=bundle.indexOf('/* Office Plus V86.6: revised user-supplied hijabi geometry');
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
// V86.8 baseline: New uploaded semi-casual model must instantiate with chosen colours and optional glasses.
const casual=api.createOfficeHijabiRig({id:5,name:'Nisa',gender:'female',role:'Sales',seated:false,appearance:{model:'semi-casual',scarfColor:'#627f92',shirtColor:'#d5a78c',pantsColor:'#30343a',glasses:true}});
assert.equal(casual.root.userData.characterModel,'semi-casual');
assert.equal(casual.root.userData.glasses,true);
const nodes=[];casual.root.traverse(node=>nodes.push(node));
assert.ok(nodes.some(node=>node.name==='Relaxed button-up shirt'));
assert.ok(nodes.some(node=>node.name==='Rounded glasses frame'));
assert.ok(nodes.some(node=>node.name==='Optional glasses'&&node.visible===true));
assert.equal(casual.eyes.length,2);
const casualBody=casual.body.position.y;
api.animateOfficeHijabi(casual,{status:'walking',seated:false,action:'typing'},.9,.016,.05);
api.animateOfficeHijabi(casual,{status:'desk',seated:true,action:'typing'},2,.2,0);
assert.ok(Number.isFinite(casual.body.position.y)&&casual.body.position.y!==casualBody);
const noGlasses=api.createOfficeHijabiRig({id:2,name:'Cikda',gender:'female',role:'Assistant',seated:true,appearance:{model:'semi-casual',glasses:false}});
assert.equal(noGlasses.root.userData.glasses,false);
const noGlassesGroup=[];noGlasses.root.traverse(o=>{if(o.name==='Optional glasses')noGlassesGroup.push(o)});
assert.equal(noGlassesGroup.length,1);assert.equal(noGlassesGroup[0].visible,false);
const classicGlasses=api.createOfficeHijabiRig({id:8,name:'Lisa',gender:'female',role:'Admin',seated:false,appearance:{model:'classic',glasses:true}});
assert.equal(classicGlasses.root.userData.characterModel,'classic');
const classicGroups=[];classicGlasses.root.traverse(o=>{if(o.name==='Optional classic glasses')classicGroups.push(o)});
assert.equal(classicGroups.length,1);assert.equal(classicGroups[0].visible,true);

console.log(`PASS V86.6 baseline custom uploaded character, 2 eyes, ${vertices} model vertices, walking/sitting/emotes, cache bust, male/source/office preserved`);
