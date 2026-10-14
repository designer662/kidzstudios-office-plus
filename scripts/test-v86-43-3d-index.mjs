import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=readFileSync('source/src/office-scene.ts','utf8');
assert.match(source,/const humansById=new Map\(humans\.map\(/,'Staff index must be precomputed');
assert.match(source,/const nameLabelsById=new Map\(nameLabels\.map\(/,'Label index must be precomputed');
for(const token of [
 'humansById.get(l.id)', 'humansById.get(b.id)', 'humansById.get(update.id)',
 'nameLabelsById.get(tag.id)', 'nameLabelsById.get(update.id)', 'nameLabelsById.get(id)'
]) assert(source.includes(token),`Render/mood hot path should use direct lookup: ${token}`);
assert(!/nameLabels\.find\(|humans\.find\(/.test(source),'Hot path must avoid linear id scans');
// Compile-only syntax test; the full 3D build remains mandatory in CI with pinned Three.js.
const {createRequire}=await import('node:module');
const require=createRequire(import.meta.url);
let ts;
try {ts=require('typescript')} catch {
 try{ts=require('/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript')}catch{}
}
if(ts){
 const result=ts.transpileModule(source,{fileName:'office-scene.ts',reportDiagnostics:true,compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}});
 assert.equal((result.diagnostics||[]).length,0,'TypeScript scene must parse cleanly');
}
console.log('PASS V86.43 3D optimization: O(1) staff/label indices, no repeated ID scans; syntax '+(ts?'checked':'awaiting CI build'));
