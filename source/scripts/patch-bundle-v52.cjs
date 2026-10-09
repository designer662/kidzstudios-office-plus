/**
 * Offline-safe rebuild of the bundled character factory. The dependency bundle
 * is v51 and contains Three.js 0.180; this patch inserts the new TS rig and
 * animation inside the existing IIFE, reusing the library's original symbols.
 * Use `npm run build:3d` for a clean build once dependencies are available.
 */
const fs=require('fs');
const ts=require('/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript');
const root=require('path').resolve(__dirname,'..');
const p=require('path');
const code=fs.readFileSync(p.join(root,'src/office-character.ts'),'utf8');
let js=ts.transpileModule(code,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020},fileName:'office-character.ts',reportDiagnostics:true});
if(js.diagnostics.length)throw new Error(ts.formatDiagnosticsWithColorAndContext(js.diagnostics,{getCurrentDirectory:()=>root,getCanonicalFileName:f=>f,getNewLine:()=>"\n"}));
js=js.outputText.replace(/^import .*?;\s*$/gm,'').replace(/^export /gm,'');
const shim=`const THREE={Color:jt,Group:De,Mesh:Me,MeshStandardMaterial:Mi,SphereGeometry:ei,CapsuleGeometry:ks,TorusGeometry:bn,CatmullRomCurve3:ns,TubeGeometry:Qs,Vector3:P,Vector2:at,LatheGeometry:Js,CylinderGeometry:Qn,CircleGeometry:jn,MathUtils:li};\nconst RoundedBoxGeometry=ms;const mergeGeometries=ua;`;
const injection=`;(()=>{${shim}\n${js}\nXh=characterFactory;qh=animateCharacter;})();`;
const bundle=p.join(root,'office-3d.js');
let s=fs.readFileSync(bundle,'utf8');
const start='}function Yh(i,t,e={})';
if(s.indexOf(start)<0 || s.indexOf(start)!==s.lastIndexOf(start))throw new Error('Missing or duplicate insertion anchor; bundle must be the original V51 prebuilt file.');
s=s.replace(start,`}${injection}function Yh(i,t,e={})`);
fs.writeFileSync(bundle,s);
console.log(`Patched V52 character rig: ${js.length} bytes of transpiled code, bundle ${s.length} chars.`);
