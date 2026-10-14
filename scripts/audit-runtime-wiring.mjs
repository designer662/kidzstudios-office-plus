// Pre-merge diagnostic. This is deliberately read-only; it does not claim
// that the presence of a JS file means the feature is running in the browser.
import {readFileSync,existsSync} from 'node:fs';
import path from 'node:path';
const html=readFileSync('public/index.html','utf8');
const sources=[...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/gi)]
  .map(m=>m[1].split('?')[0]);
const required=[
  'office-geometry-guard.js','office-seating-controller.js',
  'office-living-office.js','office-ai-routine.js','office-smart-ai.js',
  'office-furniture-interactions.js','office-movement-sync.js',
  'office-3d.js'
];
let blocking=0;
for(const file of required){
  const exists=existsSync(path.join('public',file));
  const loaded=sources.includes(file);
  console.log(`${exists&&loaded?'PASS':'BLOCK'} ${file}: ${!exists?'file absent':!loaded?'present but not loaded from dashboard':'referenced by dashboard'}`);
  if(!exists||!loaded)blocking++;
}
const order=['office-geometry-guard.js','office-furniture-interactions.js','office-ai-routine.js','office-smart-ai.js','office-movement-sync.js'];
const sorted=order.map(f=>sources.indexOf(f));
if(sorted.some(n=>n<0)||sorted.some((n,i)=>i>0&&n<sorted[i-1])){
  console.error('BLOCK: Current geometry, furniture, AI, and shared movement loader order is not established.');blocking++;
}
if(!/sharedMovement\s*:/.test(html)){
  console.error('BLOCK: OfficeSuite does not expose a sharedMovement adapter in dashboard source.');blocking++;
}
if(/startRandomRoam\(\);/.test(html)&&!/sharedMovement\s*:/.test(html)){
  console.error('BLOCK: Legacy local roaming is active while the shared movement adapter is absent.');blocking++;
}
console.log(`Runtime wiring audit: ${blocking} blocker(s). ${blocking?'NOT READY for feature-complete deployment.':'Static links pass; browser validation remains required.'}`);
if(blocking)process.exitCode=1;
