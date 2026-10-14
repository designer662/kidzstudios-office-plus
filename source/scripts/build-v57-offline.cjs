/**
 * Offline-safe V57 rebuild: starts from the original known-good V51 self-contained Three.js bundle.
 * Updates the character rig and updates the roster bridge to forward gender choice.
 * Run: node scripts/build-v57-offline.cjs /absolute/path/to/V51/office-3d.js
 */
const fs=require('fs');const path=require('path');const ts=require('/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript');
const root=path.resolve(__dirname,'..');
const base=process.argv[2];
if(!base)throw Error('Pass path to original V51 bundled office-3d.js');
let s=fs.readFileSync(base,'utf8');
if(!s.startsWith('"use strict";(()=>{'))throw Error('Unexpected source format: expected original V51 standalone bundle');
const source=fs.readFileSync(path.join(root,'src','office-character.ts'),'utf8');
const result=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020},fileName:'office-character.ts',reportDiagnostics:true});
if(result.diagnostics?.length)throw Error(ts.formatDiagnosticsWithColorAndContext(result.diagnostics,{getCurrentDirectory:()=>root,getCanonicalFileName:f=>f,getNewLine:()=>"\n"}));
const js=result.outputText.replace(/^import .*?;\s*$/gm,'').replace(/^export /gm,'');
const shim=`const THREE={Color:jt,Group:De,Mesh:Me,MeshStandardMaterial:Mi,SphereGeometry:ei,CapsuleGeometry:ks,TorusGeometry:bn,CatmullRomCurve3:ns,TubeGeometry:Qs,Vector3:P,Vector2:at,LatheGeometry:Js,CylinderGeometry:Qn,CircleGeometry:jn,MathUtils:li};\nconst RoundedBoxGeometry=ms;const mergeGeometries=ua;`;
const anchor='}function Yh(i,t,e={})';
if(s.split(anchor).length!==2)throw Error('Missing character factory insertion anchor');
s=s.replace(anchor,`};(()=>{${shim}\n${js}\nXh=characterFactory;qh=animateCharacter;})();function Yh(i,t,e={})`);
const roster='department:t.department,status:Hl(t),position:Qh(t)';
if(s.split(roster).length!==2)throw Error('Missing roster gender insertion anchor');
s=s.replace(roster,'department:t.department,gender:t.gender??n.gender??"male",status:Hl(t),position:Qh(t)');
const signature='[e.id,e.name,e.position,e.department]';
if(s.split(signature).length!==2)throw Error('Missing roster signature anchor');
s=s.replace(signature,'[e.id,e.name,e.position,e.department,e.gender]');
// Supply sensible initial gender for default staff if live data has not loaded yet.
const defaults=[['Boss','male'],['Cikda','female'],['Minn','female'],['Afiq','male'],['Nisa','female'],['Athira','female'],['Mirul','male'],['Lisa','female']];
for(const [name,gender] of defaults){const a=`name:"${name}",department:`;if(s.split(a).length!==2)throw Error(`Missing default gender anchor for ${name}`);s=s.replace(a,`name:"${name}",gender:"${gender}",department:`);}
fs.writeFileSync(path.join(root,'office-3d.js'),s);
console.log(`PASS v57 bundled engine ${s.length} bytes (offline); staff gender bridge patched`);
