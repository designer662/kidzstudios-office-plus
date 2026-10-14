import assert from 'node:assert/strict';
import {readFileSync,existsSync,mkdirSync} from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {chromium} from '../source/node_modules/playwright/index.mjs';

const root=path.resolve('public'),html=readFileSync(path.join(root,'index.html'),'utf8');
const roster=new Function('return '+html.match(/const DEFAULT_EMPLOYEES = (\[[\s\S]*?\n  \]);/)[1])();
// Isolated local fixture: production 3D bundle + actual roster and furniture.
// This never authenticates, writes shared data, or modifies the production gate.
const fixture=`<!doctype html><html><head><link rel="stylesheet" href="office-3d.css"><style>body{margin:0}#office3dHost{width:100vw;height:100vh;position:relative}#officeSvg{display:none}</style></head><body><div id="office3dHost"></div><div id="office3dLoading"></div><div id="rotationReadout"></div><button id="opsMobileToggle"></button><div id="todayPanel"></div><svg id="officeSvg"></svg><script>window.testStaff=${JSON.stringify(roster)};testStaff.forEach(p=>{p.visualX=p.x;p.visualY=p.y;p.motionAction='pc-work'});window.OfficeSuite={getStaff:()=>testStaff,selectPerson(){},selectDepartment(){},selectRoom(){},stopFollow(){},reset(){},pause(){}}</script><script src="office-geometry-guard.js"></script><script src="office-seating-controller.js"></script><script src="office-3d.js"></script></body></html>`;
const server=http.createServer((req,res)=>{
  if(req.url==='/fixture'){res.setHeader('content-type','text/html');res.end(fixture);return;}
  const file=path.join(root,decodeURIComponent(req.url.split('?')[0]));
  if(!file.startsWith(root+path.sep)||!existsSync(file)){res.statusCode=404;res.end();return;}
  res.setHeader('content-type',file.endsWith('.css')?'text/css':file.endsWith('.js')?'text/javascript':'text/plain');res.end(readFileSync(file));
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
let browser;
try{
  browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE||undefined,
    args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  const page=await browser.newPage({viewport:{width:900,height:680}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.goto('http://127.0.0.1:'+server.address().port+'/fixture');
  await page.waitForFunction(()=>window.office3d);
  await page.evaluate(()=>{office3d.setQuality('eco');office3d.setRotating(false);});
  await page.waitForFunction(()=>office3d.getDiagnostics().staff.filter(p=>p.phase==='seated').length===6,null,{timeout:45000});
  const initial=await page.evaluate(()=>office3d.getDiagnostics());
  assert.equal(initial.floorScale,1.5);assert(initial.geometryReady);
  for(const person of initial.staff){assert(!person.blocked);assert.equal(person.chair,[5,8].includes(person.id)?null:person.desk);}
  // Pause is a strict freeze even as external timeline targets keep arriving.
  const before=await page.evaluate(()=>{office3d.setPaused(true);return office3d.getDiagnostics().staff;});
  await page.evaluate(()=>{const p=testStaff.find(p=>p.id===3);p.motionWalking=true;p.visualX=20;});
  await page.waitForTimeout(350);
  const after=await page.evaluate(()=>office3d.getDiagnostics().staff);
  for(let i=0;i<before.length;i++)for(const key of ['root','body','yaw','phase','seatMix'])assert.deepEqual(after[i][key],before[i][key],`Pause changed ${key}`);
  await page.evaluate(()=>office3d.setPaused(false));
  const frames=await page.evaluate(()=>new Promise(resolve=>{
    const samples=[];function next(){const staff=office3d.getDiagnostics().staff.find(p=>p.id===3);samples.push({...staff,frameTime:performance.now()});if(samples.length===100)resolve(samples);else requestAnimationFrame(next);}requestAnimationFrame(next);
  }));
  const rising=frames.filter(p=>p.phase==='rising');assert(rising.length>0);
  assert(rising.every(p=>Math.hypot(p.root.x-before[2].root.x,p.root.z-before[2].root.z)<1e-8),'Stand up before moving');
  assert(frames.some(p=>p.phase==='walking'&&Math.hypot(p.root.x-before[2].root.x,p.root.z-before[2].root.z)>.2));
  // V86.28 uses up to 7.2 world-units/second for lag recovery. A fixed
  // .121 units/frame threshold assumed exactly 60fps and fails under CI's
  // software WebGL renderer, where a frame may take 20-50ms. The renderer
  // clamps delta time to 50ms, so even a slow frame cannot teleport >.36u.
  // Keep both an elapsed-time speed limit and an absolute per-frame ceiling.
  for(let i=1;i<frames.length;i++){
    const travelled=Math.hypot(frames[i].root.x-frames[i-1].root.x,frames[i].root.z-frames[i-1].root.z);
    const elapsed=Math.max(0,(frames[i].frameTime-frames[i-1].frameTime)/1000);
    const maxByFrameTime=7.2*Math.min(elapsed,.05)+.06; // allow render/sampling jitter
    const maxAbsolute=7.2*.05+.006;
    assert(travelled<=Math.min(maxByFrameTime,maxAbsolute),`No departure snap: ${travelled.toFixed(4)} units in ${(elapsed*1000).toFixed(1)}ms`);
  }
  await page.evaluate(()=>{const p=testStaff.find(p=>p.id===3);p.motionWalking=false;p.visualX=p.deskX;p.visualY=p.deskY;});
  await page.waitForFunction(()=>office3d.getDiagnostics().staff.find(p=>p.id===3).phase==='seated',null,{timeout:45000});
  const zoom=await page.evaluate(()=>office3d.getDiagnostics().zoom);
  await page.mouse.move(450,330);await page.mouse.wheel(0,-250);
  await page.waitForFunction(z=>office3d.getDiagnostics().zoom>z+.03,zoom);
  // Rebuild on an appearance edit must rebind furniture and reinstall joints once.
  await page.evaluate(()=>{testStaff.find(p=>p.id===2).appearance={model:'semi-casual',glasses:true};});
  await page.waitForFunction(()=>office3d.getDiagnostics().staff.filter(p=>p.phase==='seated').length===6,null,{timeout:45000});
  assert.equal(await page.evaluate(()=>KSOfficeSeating.chairs.length),11);
  assert.deepEqual(errors,[],'No initialization or animation errors');
  if(process.env.SIM_SCREENSHOT_DIR){mkdirSync(process.env.SIM_SCREENSHOT_DIR,{recursive:true});await page.evaluate(()=>{office3d.setRotating(false);office3d.focusPerson(3);});await page.waitForTimeout(2000);await page.screenshot({path:path.join(process.env.SIM_SCREENSHOT_DIR,'office-v86-22.png')});}
  console.log('PASS V86.22 WebGL: actual live roster, six correct seats, two standing staff, strict pause, rise-before-walk, no departure snap, return-to-seat, wheel zoom, appearance rebuild, zero runtime errors.');
}finally{await browser?.close();await new Promise(r=>server.close(r));}
