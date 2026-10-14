import assert from 'node:assert/strict';
import {existsSync,readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {join} from 'node:path';
import vm from 'node:vm';

const read = relative => readFileSync(relative,'utf8');
const index=read('public/index.html'),sync=read('public/shared-sync.js');
assert(!existsSync('public/app.js'),'Unreferenced dashboard copy must not ship');
assert(!existsSync('public/netlify-sync.js'),'Duplicate Netlify sync copy must not ship');
assert.equal((index.match(/<script\s+src="shared-sync\.js\?v=86\.43"\s+defer><\/script>/g)||[]).length,1,'Use one shared synchronizer');
assert(!index.includes("const basename = (location.pathname.split('/').pop()"),'Remove duplicated inline sync closure');
assert(/if\(!force\s*&&\s*\(dirty\|\|saving\)\)/.test(sync),'Do not apply incoming updates over unsaved user edits');
assert(sync.includes('realtimeConnected?.()'),'Use realtime-aware polling cadence');

// Execute the actual link-config function with a stubbed DOM so that syncing cannot
// silently change Office Pulse's local Job Management navigation.
const start=sync.indexOf('  function applyGlobalConfig(');
const end=sync.indexOf('  function pullGlobalConfig(',start);
assert(start>0&&end>start,'Expected one shared global-config handler');
const src=sync.slice(start,end)+'\n globalThis.__apply=applyGlobalConfig;';
function runConfig(page){
  const job={href:'job-management.html',id:'jobManagementResource',hasAttribute:(name)=>name==='data-shared-job-link',classList:{contains:()=>false},getAttribute:()=>job.href};
  const drive={href:'https://drive.google.com/old',id:'gdrive',hasAttribute:()=>false,classList:{contains:()=>false},getAttribute:()=>drive.href};
  const dispatched=[];
  const ctx={page,DEFAULT_JOB_MANAGEMENT_URL:'https://docs.google.com/spreadsheets/d/default',DEFAULT_GOOGLE_DRIVE_URL:'https://drive.google.com/default',
    document:{querySelectorAll(selector){return selector==='a'?[job]:[drive]}},
    window:{dispatchEvent:e=>dispatched.push(e.type)},CustomEvent:class{constructor(type){this.type=type}}};
  vm.createContext(ctx);vm.runInContext(src,ctx);
  ctx.__apply({jobManagementUrl:'https://docs.google.com/spreadsheets/d/remote',googleDriveUrl:'https://drive.google.com/updated'});
  return {job,drive,dispatched};
}
const dashboard=runConfig('index');
assert.equal(dashboard.job.href,'job-management.html','Office Pulse job link must stay local');
assert.equal(dashboard.drive.href,'https://drive.google.com/updated','Drive link remains configurable');
assert(!dashboard.dispatched.includes('ks:job-management-url'),'Dashboard does not broadcast a Sheet override');
const toolPage=runConfig('orderform1');
assert.equal(toolPage.job.href,'https://docs.google.com/spreadsheets/d/remote','Other tools retain existing external job-link behavior');
assert.equal(toolPage.job.target,'_blank');

// Prevent future orphaned copies, duplicate HTML ids or missing local static files.
const hashes=new Map();
for(const name of readdirSync('public').filter(n=>n.endsWith('.js'))){
 const data=read('public/'+name),hash=createHash('sha256').update(data).digest('hex');
 assert(!hashes.has(hash),`Duplicate JS assets: ${name} and ${hashes.get(hash)}`);
 hashes.set(hash,name);
}
let pages=0;
for(const name of readdirSync('public').filter(n=>n.endsWith('.html'))){
 pages++;const html=read('public/'+name);
 const markup=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'');
 const ids=[...markup.matchAll(/\bid=["']([^"']+)["']/g)].map(m=>m[1]);
 const duplicateIds=ids.filter((id,index)=>ids.indexOf(id)!==index);
 assert.equal(duplicateIds.length,0,`${name}: duplicate static element ID ${duplicateIds[0]}`);
 const scriptSources=[...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/gi)].map(m=>m[1]);
 const jsLocal=scriptSources.filter(s=>!s.startsWith('http:')&&!s.startsWith('https:')&&!s.startsWith('//'));
 const normalized=jsLocal.map(s=>s.split(/[?#]/)[0]);
 assert.equal(new Set(normalized).size,normalized.length,`${name}: duplicated JS script load`);
 for(const src of normalized){
  const target=src.startsWith('/')?'public/'+src.slice(1):'public/'+src;
  assert(existsSync(target),`${name}: missing local script ${src}`);
 }
}
const release=JSON.parse(read('office-release.json'));
const build=JSON.parse(read('public/office-build-info.json'));
const pkg=JSON.parse(read('source/package.json'));
const lock=JSON.parse(read('source/package-lock.json'));
assert.equal(build.release,release.release,'Release and office info must agree');
assert.equal(pkg.version,lock.version,'Source package and lock versions must agree');
assert.equal(pkg.version,lock.packages[''].version,'Lockfile root version must agree');
assert.equal(pkg.version,`${release.release}.0`,'Source package version must match release');
console.log(`PASS V86.41 cleanup: shared sync behavior, local Job Management links, unsaved-edit guard, no duplicate assets or element IDs, ${pages} pages with valid scripts, aligned releases`);
