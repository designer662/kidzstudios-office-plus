/* Office Plus V86.19: wall collision map, shared by live navigation and 3D rendering.
 * All coordinates are logical 0..23 x 0..70, unaffected by office-scale changes.
 * Generated from physical wall() segments in the unchanged 3D floor model.
 */
(function(root){
 'use strict';
 const SCALE_X=2, SX=5.75, SZ=17.5;
 const worldWalls=[[-4,-17.5,5.75,-17.5],[-4,-17.5,-4,-4.65],[-4,-4.65,-2.5,-4.65],[-2.5,-2.25,-4,-2.25],[-4,-2.25,-4,0.3],[-4,0.3,-5.75,0.3],[-5.75,0.3,-5.75,17.5],[-5.75,17.5,5.75,17.5],[5.75,17.5,5.75,-17.5],[0.1,0.7,5.75,0.7],[0.1,0.7,0.1,3.85],[0.1,5.25,0.1,5.65],[0.1,5.65,5.75,5.65],[0.1,5.65,0.1,9.45],[0.1,10.75,0.1,10.95],[-5.75,9,-1.9,9],[-5.75,0.3,-1.9,0.3],[-5.75,10.95,-5.45,10.95],[-4.2,10.95,-3.6,10.95],[-2.4,10.95,-1.65,10.95],[-0.35,10.95,5.75,10.95],[-3.82,10.95,-3.82,14.25],[-1.9,10.95,-1.9,14.7],[-1.9,16,-1.9,17.5],[-5.75,14.25,-1.9,14.25]];
 const footprintWorld=[[-4,-17.5],[5.75,-17.5],[5.75,17.5],[-5.75,17.5],[-5.75,0.3],[-4,0.3],[-4,-2.25],[-2.5,-2.25],[-2.5,-4.65],[-4,-4.65]];
 const toPlan=(x,z)=>({x:(x+SX)*SCALE_X,y:(z+SZ)*SCALE_X});
 const walls=worldWalls.map(([x1,z1,x2,z2])=>{const a=toPlan(x1,z1),b=toPlan(x2,z2);return [a.x,a.y,b.x,b.y]});
 const footprint=footprintWorld.map(([x,z])=>toPlan(x,z));
 function pointInFloor(x,y){
  if(!Number.isFinite(x)||!Number.isFinite(y))return false;
  // Boundaries are treated as solid. The outer wall is handled separately.
  let inside=false;
  for(let i=0,j=footprint.length-1;i<footprint.length;j=i++) {
   const a=footprint[i],b=footprint[j];
   if((a.y>y)!==(b.y>y)&&x<(b.x-a.x)*(y-a.y)/(b.y-a.y)+a.x)inside=!inside;
  }
  return inside;
 }
 function distance2(px,py,x1,y1,x2,y2){
  const dx=x2-x1,dy=y2-y1,denom=dx*dx+dy*dy;
  const t=denom?Math.max(0,Math.min(1,((px-x1)*dx+(py-y1)*dy)/denom)):0;
  const x=px-x1-t*dx,y=py-y1-t*dy;return x*x+y*y;
 }
 // Physical wall thickness .15 world => .15 plan half-width. Remaining .50
 // gives avatars 0.5 plan-unit safety radius on top of the wall surface.
 function blocked(x,y,padding=.65){
  if(!pointInFloor(x,y))return true;
  for(const [x1,y1,x2,y2] of walls)if(distance2(x,y,x1,y1,x2,y2)<padding*padding)return true;
  return false;
 }
 function clearLine(a,b,padding=.65){
  if(blocked(a.x,a.y,padding)||blocked(b.x,b.y,padding))return false;
  const length=Math.hypot(b.x-a.x,b.y-a.y);
  for(let t=.12;t<length;t+=.12){const f=t/length;if(blocked(a.x+(b.x-a.x)*f,a.y+(b.y-a.y)*f,padding))return false;}
  return true;
 }
 // Renderer guard: when a stale timeline would interpolate across a partition,
 // stay on the walkable side instead. Navigation planner remains authoritative.
 function constrainWorldSegment(from,to,scale=1.5){
  const a=toPlan(from.x/scale,from.z/scale),b=toPlan(to.x/scale,to.z/scale);
  if(!Number.isFinite(a.x)||!Number.isFinite(a.y)||!Number.isFinite(b.x)||!Number.isFinite(b.y))return from;
  if(blocked(a.x,a.y))return to; // allow recovery from an already invalid old state
  if(clearLine(a,b))return to;
  let lo=0,hi=1;
  for(let i=0;i<18;i++){const t=(lo+hi)/2;
   if(clearLine(a,{x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t}))lo=t;else hi=t;
  }
  return {x:from.x+(to.x-from.x)*Math.max(0,lo-1e-4),z:from.z+(to.z-from.z)*Math.max(0,lo-1e-4)};
 }
 const API=Object.freeze({walls,footprint,blocked,clearLine,pointInFloor,constrainWorldSegment,toPlan});
 root.KSOfficeGeometry=API;
 if(typeof module==='object'&&module.exports)module.exports=API;
})(typeof window!=='undefined'?window:globalThis);
