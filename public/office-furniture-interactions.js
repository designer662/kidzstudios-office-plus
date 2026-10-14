/* Office Plus V86.30: shared, scene-grounded interaction points.
 * Coordinates are taken from real fixtures in office-scene.ts, then transformed
 * into existing plan units. No extra Supabase table, timer, or movement writer.
 */
(function(root){
 'use strict';
 const defs=[
  {id:'coffee-station',zone:'pantry',type:'coffee',action:'drink',label:'☕ Making coffee',fixture:{x:-5.08,z:5.25},approach:{x:-3.95,z:5.25},duration:12500},
  {id:'stock-shelf',zone:'store',type:'shelf',action:'stocking',label:'📦 Checking supplies',fixture:{x:5.03,z:8.65},approach:{x:3.65,z:8.65},duration:14000},
  {id:'showroom-samples',zone:'showroom',type:'display',action:'meeting',label:'👕 Reviewing samples',fixture:{x:1.2,z:-3.45},approach:{x:1.2,z:-1.75},duration:13500},
  {id:'heat-press',zone:'showroom',type:'press',action:'production',label:'🖨 Checking the heat press',fixture:{x:3.67,z:.10},approach:{x:3.67,z:-1.15},duration:13500}
 ];
 const plan=({x,z})=>({x:(x+5.75)*2,y:(z+17.5)*2});
 const copy=p=>({x:p.x,y:p.y});
 const catalogue=new Map();
 function make(spec){
  if(!spec||!spec.id||!spec.fixture||!spec.approach)return null;
  const a=plan(spec.approach),fixture=plan(spec.fixture);
  if(![a.x,a.y,fixture.x,fixture.y].every(Number.isFinite))return null;
  const guard=root.KSOfficeGeometry;
  if(guard?.navBlocked?.(a.x,a.y))return null;
  const dx=spec.fixture.x-spec.approach.x,dz=spec.fixture.z-spec.approach.z;
  return Object.freeze({id:spec.id,zone:spec.zone,type:spec.type,action:spec.action,label:spec.label,
   point:copy(a),fixture:copy(fixture),yaw:Math.atan2(dx,dz),duration:spec.duration});
 }
 function registerScene(spec){
  const item=make(spec);
  if(item)catalogue.set(item.id,item);
  return item;
 }
 function reset(){catalogue.clear();for(const spec of defs)registerScene(spec)}
 reset();
 function get(id){return catalogue.get(id)||null}
 function forIntent(intent,person){
  if(!intent)return null;
  if(intent.zone==='pantry'&&['drink','coffee','eat'].includes(intent.action))return get('coffee-station');
  if(intent.zone==='store'&&intent.action==='stocking')return get('stock-shelf');
  if(intent.zone==='showroom'){
   const role=String([person?.department,person?.position].join(' ')).toLowerCase();
   if(intent.action==='production'||(/production|print/.test(role)&&intent.action==='meeting'))return get('heat-press');
   if(['meeting','reviewing','planning'].includes(intent.action))return get('showroom-samples');
  }
  return null;
 }
 function occupied(item,snapshot,subjectId,now=Date.now()){
  if(!item)return false;
  return (snapshot?.staff||[]).some(s=>Number(s.id)!==Number(subjectId)&&(
   s.walk?.furnitureId===item.id&&Number(s.walk.endAt)>now-1000 ||
   s.scene?.furnitureId===item.id&&Number(s.scene.until)>now));
 }
 function validate(item){
  if(!item)return false;
  const guard=root.KSOfficeGeometry;
  return !guard?.navBlocked?.(item.point.x,item.point.y);
 }
 // Keeps the same small status widget from V86.29; no new full-screen UI.
 function status(mode,message){
  const el=root.document?.getElementById?.('ksSmartAIStatus');if(!el)return;
  el.dataset.state=mode;
  const text=message||({loading:'🧠 Mapping office furniture…',ready:'🧠 Smart AI · furniture ready',using:'🧠 Interacting with furniture',empty:'🧠 No staff to simulate',waiting:'🧠 Waiting for clear route',error:'🧠 Smart AI paused · retrying sync'}[mode]||'🧠 Smart AI');
  if(el.textContent!==text)el.textContent=text;
  el.title=mode==='error'?'Shared simulation or furniture is temporarily unavailable. The last valid positions remain displayed.':'Shared Smart AI simulation; furniture use respects occupied interaction points.';
 }
 root.OfficeFurnitureInteractions={version:'86.30',list:()=>[...catalogue.values()],get,forIntent,occupied,validate,registerScene,reset,status};
})(window);
