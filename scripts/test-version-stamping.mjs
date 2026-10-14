import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const script=fileURLToPath(new URL('./stamp-version.mjs',import.meta.url));
const cwd=mkdtempSync(path.join(tmpdir(),'ks-release-stamp-'));
try{
 mkdirSync(path.join(cwd,'public'));
 writeFileSync(path.join(cwd,'office-release.json'),JSON.stringify({release:'86.41'}));
 const page=`<!doctype html><html><head><link rel="stylesheet" href="office-3d.css?v=old&mode=light"><link rel="stylesheet" href="https://cdn.example.org/a.css?v=old"></head><body><script src="office-3d.js?v=86.39" defer></script><script src="shared-sync.js"></script><footer class="ks-version-footer"><span class="ks-build-label">old</span></footer></body></html>`;
 writeFileSync(path.join(cwd,'public','index.html'),page);
 for(let i=0;i<2;i++){
  const run=spawnSync(process.execPath,[script],{cwd,env:{...process.env,GITHUB_RUN_NUMBER:'777'},encoding:'utf8'});
  assert.equal(run.status,0,run.stderr);
 }
 const result=readFileSync(path.join(cwd,'public','index.html'),'utf8');
 assert.match(result,/office-3d\.js\?v=86\.41\.777/);
 assert.match(result,/shared-sync\.js\?v=86\.41\.777/);
 assert.match(result,/office-3d\.css\?v=86\.41\.777&amp;mode=light/);
 assert.ok(result.includes('https://cdn.example.org/a.css?v=old'),'External assets unchanged');
 assert.ok(result.includes('v86.41.777 · 3D'));
 assert.equal((result.match(/office-3d\.js\?/g)||[]).length,1);
 console.log('PASS release stamping: all local CSS/JS cache busting, footer version, external URLs preserved, idempotent.');
}finally{rmSync(cwd,{recursive:true,force:true})}
