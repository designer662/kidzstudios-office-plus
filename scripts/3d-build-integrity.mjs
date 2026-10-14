// Deterministic evidence that the deployed WebGL bundle matches the authored source.
// Never treat an inherited/precompiled office-3d.js as a successful rebuild.
import {createHash} from 'node:crypto';
import {readFileSync,readdirSync} from 'node:fs';
import path from 'node:path';

function filesUnder(directory){
  return readdirSync(directory,{withFileTypes:true}).flatMap(entry=>{
    const full=path.join(directory,entry.name);
    return entry.isDirectory()?filesUnder(full):entry.isFile()?[full]:[];
  });
}
export function sourceDigest(root){
  const files=[...filesUnder(path.join(root,'source','src')).filter(file=>/\.(?:js|ts|json)$/.test(file)),
    path.join(root,'source','package.json'),path.join(root,'source','package-lock.json'),
    path.join(root,'source','scripts','build-3d.mjs')].sort();
  const hash=createHash('sha256');
  for(const file of files){
    hash.update(path.relative(root,file).split(path.sep).join('/')).update('\0');
    hash.update(readFileSync(file)).update('\0');
  }
  return hash.digest('hex');
}
export function bundleDigest(file){return createHash('sha256').update(readFileSync(file)).digest('hex');}
export function check3dManifest(root,manifest){
  if(!manifest||manifest.schema!==1||!/^\d+(?:\.\d+){1,2}$/.test(manifest.packageVersion||''))throw Error('3D rebuild manifest invalid');
  const version=JSON.parse(readFileSync(path.join(root,'source','package.json'),'utf8')).version;
  if(manifest.packageVersion!==version)throw Error('3D rebuild manifest package version mismatch');
  if(manifest.sourceSha256!==sourceDigest(root))throw Error('3D source changed after bundle was built');
  if(manifest.bundleSha256!==bundleDigest(path.join(root,'public','office-3d.js')))throw Error('3D bundle does not match recorded build');
  return true;
}
