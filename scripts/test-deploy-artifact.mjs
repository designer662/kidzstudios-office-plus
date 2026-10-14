// Runs after npm build, config generation, version stamping and .nojekyll creation.
// Fail closed: do not publish stale 3D or placeholder/private authentication keys.
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {check3dManifest} from './3d-build-integrity.mjs';
const root=path.resolve(import.meta.dirname,'..');
const load=(p)=>readFileSync(path.join(root,p),'utf8');
const manifestPath=path.join(root,'public','office-3d-build.json');
assert.ok(existsSync(manifestPath),'No rebuild manifest; run npm run build:3d --prefix source');
check3dManifest(root,JSON.parse(load('public/office-3d-build.json')));
assert.ok(existsSync(path.join(root,'public','.nojekyll')),'GitHub Pages must disable Jekyll');
const ctx={window:{}};
vm.runInNewContext(load('public/supabase-config.js'),ctx,{timeout:1000});
const conf=ctx.window.KS_SUPABASE_CONFIG;
assert.match(String(conf?.url||''),/^https:\/\/[a-z0-9.-]+\.supabase\.co$/i,'Missing public Supabase endpoint');
const key=String(conf?.publishableKey||'');
assert.ok(!/REPLACE_|sb_secret_|service_role/i.test(key),'Placeholder or private Supabase key detected');
let publicKey=key.startsWith('sb_publishable_')&&key.length>15;
if(!publicKey){
 const parts=key.split('.');
 if(parts.length===3){try{publicKey=JSON.parse(Buffer.from(parts[1],'base64url').toString('utf8')).role==='anon';}catch{}}
}
assert.ok(publicKey,'Only public publishable or legacy anon key allowed');
const release=String(JSON.parse(load('office-release.json')).release);
const html=load('public/index.html');
const buildTag=html.match(/<script\b[^>]*\bsrc=["']office-3d\.js\?v=([^"']+)["']/i)?.[1];
const expected=release+(process.env.GITHUB_RUN_NUMBER?'.'+process.env.GITHUB_RUN_NUMBER:'');
assert.equal(buildTag,expected,'3D cache version does not match release/run number');
assert.ok(html.includes('supabase-config.js'),'Dashboard must load public Supabase settings');
console.log('PASS deploy artifact: rebuilt 3D/source integrity, safe runtime config, Pages artifact and cache version.');
