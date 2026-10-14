// Unit test of the source+bundle fingerprinting without needing npm dependencies.
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {sourceDigest,bundleDigest,check3dManifest} from './3d-build-integrity.mjs';
const root=mkdtempSync(path.join(tmpdir(),'ks-build-integrity-'));
const write=(name,content)=>{const fn=path.join(root,name);mkdirSync(path.dirname(fn),{recursive:true});writeFileSync(fn,content);};
try{
 write('source/src/suite-bridge.ts','export const x=1;');
 write('source/package.json',JSON.stringify({version:'86.41.0'}));
 write('source/package-lock.json','lock');write('source/scripts/build-3d.mjs','builder');
 write('public/office-3d.js','compiled');
 const manifest={schema:1,packageVersion:'86.41.0',sourceSha256:sourceDigest(root),bundleSha256:bundleDigest(path.join(root,'public/office-3d.js'))};
 assert.equal(check3dManifest(root,manifest),true);
 write('source/src/suite-bridge.ts','export const x=2;');
 assert.throws(()=>check3dManifest(root,manifest),/source changed/);
 write('source/src/suite-bridge.ts','export const x=1;');
 write('public/office-3d.js','broken');
 assert.throws(()=>check3dManifest(root,manifest),/bundle does not match/);
 assert.throws(()=>check3dManifest(root,{...manifest,packageVersion:'0.0.0'}),/package version mismatch/);
 console.log('PASS source/bundle 3D integrity: clean build and three negative cases.');
}finally{rmSync(root,{recursive:true,force:true})}
