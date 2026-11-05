import {build} from 'esbuild';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const result=await build({stdin:{contents:'export {characterFactory,animateCharacter} from "./src/office-character"; export {people} from "./src/office-data";',resolveDir:fileURLToPath(new URL('../',import.meta.url))},bundle:true,write:false,platform:'node',format:'esm',target:'es2020'});
const {characterFactory,animateCharacter,people}=await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
const factory=characterFactory();let meshes=0;
for(const person of people){
 const rig=factory(person);assert.equal(rig.eyes.length,2);assert.equal(rig.root.userData.characterVersion,9);
 for(const [status,seated] of [['desk',true],['walking',false],['break',false],['showroom',false]]){
  for(let frame=0;frame<120;frame++)animateCharacter(rig,{...person,status,seated},frame/60,1/60,status==='walking'?0.012:0);
  rig.root.updateMatrixWorld(true);rig.root.traverse(node=>{assert(node.matrixWorld.elements.every(Number.isFinite));});
 }
 rig.root.traverse(node=>{if(node.isMesh){meshes++;const a=node.geometry.attributes.position;for(let i=0;i<a.array.length;i++)assert(Number.isFinite(a.array[i]));}});
}
const byFps=fps=>{const p=people[0],r=factory(p);animateCharacter(r,{...p,status:'desk',seated:true},0,0,0);for(let i=0;i<fps;i++)animateCharacter(r,{...p,status:'walking',seated:false},i/fps,1/fps,0.72/fps);return r;};
const a=byFps(30),b=byFps(120);assert(Math.abs(a.walk-b.walk)<1e-10);assert(Math.abs(a.sit-b.sit)<1e-10);assert(Math.abs(a.gait-b.gait)<1e-10);
console.log(`PASS all ${people.length} character rigs (${meshes} meshes): finite geometry and poses; 30/120 fps walk/sit transitions match`);
