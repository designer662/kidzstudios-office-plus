/* Office Plus V86.22: wall collision map, shared by live navigation and 3D rendering.
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
 function segmentDistance2(a,b,c,d){
  const cross=(u,v,w)=>(v.x-u.x)*(w.y-u.y)-(v.y-u.y)*(w.x-u.x);
  const ab1=cross(a,b,c),ab2=cross(a,b,d),cd1=cross(c,d,a),cd2=cross(c,d,b);
  if(ab1*ab2<=0&&cd1*cd2<=0&&Math.max(Math.min(a.x,b.x),Math.min(c.x,d.x))<=Math.min(Math.max(a.x,b.x),Math.max(c.x,d.x))&&Math.max(Math.min(a.y,b.y),Math.min(c.y,d.y))<=Math.min(Math.max(a.y,b.y),Math.max(c.y,d.y)))return 0;
  return Math.min(distance2(a.x,a.y,c.x,c.y,d.x,d.y),distance2(b.x,b.y,c.x,c.y,d.x,d.y),distance2(c.x,c.y,a.x,a.y,b.x,b.y),distance2(d.x,d.y,a.x,a.y,b.x,b.y));
 }
 function clearLine(a,b,padding=.65){
  if(!a||!b||blocked(a.x,a.y,padding)||blocked(b.x,b.y,padding))return false;
  for(const [x1,y1,x2,y2] of walls)if(segmentDistance2(a,b,{x:x1,y:y1},{x:x2,y:y2})<padding*padding)return false;
  for(let i=0;i<footprint.length;i++)if(segmentDistance2(a,b,footprint[i],footprint[(i+1)%footprint.length])<1e-14)return false;
  return true;
 }
 // Renderer guard: when a stale timeline would interpolate across a partition,
 // stay on the walkable side instead. Navigation planner remains authoritative.
 function constrainWorldSegment(from,to,scale=1.5){
  const a=toPlan(from.x/scale,from.z/scale),b=toPlan(to.x/scale,to.z/scale);
  if(!Number.isFinite(a.x)||!Number.isFinite(a.y)||!Number.isFinite(b.x)||!Number.isFinite(b.y))return from;
  if(blocked(a.x,a.y))return {x:from.x,z:from.z}; // Never teleport out through a partition.
  if(clearLine(a,b))return to;
  let lo=0,hi=1;
  for(let i=0;i<18;i++){const t=(lo+hi)/2;
   if(clearLine(a,{x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t}))lo=t;else hi=t;
  }
  return {x:from.x+(to.x-from.x)*Math.max(0,lo-1e-4),z:from.z+(to.z-from.z)*Math.max(0,lo-1e-4)};
 }
 const obstacles=[
  {x:10.35,y:6.35,w:5.7,h:14.5},{x:5.7,y:1.25,w:16,h:2.5},
  {x:11.5,y:26.4,w:5.3,h:3.4},{x:14.31,y:34.2,w:7.46,h:2},
  {x:19.9,y:31.8,w:2.4,h:8.9},{x:13.55,y:39.45,w:6.3,h:2.5},
  {x:3.4,y:40.15,w:2.4,h:3.3},{x:.16,y:34.5,w:2.08,h:16.6},
  {x:5.7,y:51,w:2.4,h:3.2}
 ];
 function navBlocked(x,y){return blocked(x,y)||obstacles.some(b=>x>=b.x-.3&&x<=b.x+b.w+.3&&y>=b.y-.3&&y<=b.y+b.h+.3);}
 function navClearLine(a,b){
  if(!a||!b||navBlocked(a.x,a.y)||navBlocked(b.x,b.y)||!clearLine(a,b))return false;
  // Intersect the entire swept segment with expanded worktop rectangles.
  for(const o of obstacles){
   const minX=o.x-.3,maxX=o.x+o.w+.3,minY=o.y-.3,maxY=o.y+o.h+.3;
   let lo=0,hi=1,hit=true;
   for(const [start,delta,min,max] of [[a.x,b.x-a.x,minX,maxX],[a.y,b.y-a.y,minY,maxY]]){
    if(Math.abs(delta)<1e-12){if(start<min||start>max){hit=false;break;}}
    else {const u=(min-start)/delta,v=(max-start)/delta;lo=Math.max(lo,Math.min(u,v));hi=Math.min(hi,Math.max(u,v));if(lo>hi){hit=false;break;}}
   }
   if(hit)return false;
  }
  return true;
 }
 function worldToPlan(p,scale=1.5){return toPlan(p.x/scale,p.z/scale);}
 function planToWorld(p,scale=1.5){return {x:(p.x/2-SX)*scale,z:(p.y/2-SZ)*scale};}
 function worldClear(a,b,scale=1.5){return navClearLine(worldToPlan(a,scale),worldToPlan(b,scale));}
 // A cached renderer route handles stale network targets without corner cutting.
 // The elected shared planner remains the only writer of timeline positions.
 function findWorldPath(from,to,scale=1.5){
  const a=worldToPlan(from,scale),b=worldToPlan(to,scale);
  if(navClearLine(a,b))return [{x:to.x,z:to.z}];
  if(navBlocked(a.x,a.y)||navBlocked(b.x,b.y))return null;
  function snap(p){
   let best=null,dist=Infinity;
   const gx=Math.round(p.x*2),gy=Math.round(p.y*2);
   for(let dx=-3;dx<=3;dx++)for(let dy=-3;dy<=3;dy++){
    const x=gx+dx,y=gy+dy,q={x:x/2,y:y/2};
    if(x<1||x>45||y<1||y>139||!navClearLine(p,q))continue;
    const d=Math.hypot(q.x-p.x,q.y-p.y);if(d<dist){dist=d;best={x,y};}
   }
   return best;
  }
  const start=snap(a),end=snap(b);if(!start||!end)return null;
  const key=(x,y)=>y*47+x,goal=key(end.x,end.y),nodes=new Map(),closed=new Set();
  const first={...start,g:0,f:Math.hypot(start.x-end.x,start.y-end.y),parent:null};
  nodes.set(key(start.x,start.y),first);const open=[first];let found=null;
  while(open.length){
   open.sort((x,y)=>y.f-x.f);const n=open.pop(),nk=key(n.x,n.y);
   if(closed.has(nk))continue;if(nk===goal){found=n;break;}closed.add(nk);
   for(let dx=-1;dx<=1;dx++)for(let dy=-1;dy<=1;dy++){
    if(!dx&&!dy)continue;const x=n.x+dx,y=n.y+dy,k=key(x,y);
    if(x<1||x>45||y<1||y>139||closed.has(k)||!navClearLine({x:n.x/2,y:n.y/2},{x:x/2,y:y/2}))continue;
    const g=n.g+Math.hypot(dx,dy);if(nodes.has(k)&&nodes.get(k).g<=g)continue;
    const next={x,y,g,f:g+Math.hypot(x-end.x,y-end.y),parent:n};nodes.set(k,next);open.push(next);
   }
  }
  if(!found)return null;
  const points=[b];for(let n=found;n;n=n.parent)points.unshift({x:n.x/2,y:n.y/2});
  const result=[];let previous=a,index=0;
  while(index<points.length){let last=index;for(let j=index+1;j<points.length;j++)if(navClearLine(previous,points[j]))last=j;
   result.push(planToWorld(points[last],scale));previous=points[last];index=last+1;
  }
  return result;
 }
 const API=Object.freeze({walls,footprint,obstacles,blocked,clearLine,pointInFloor,constrainWorldSegment,toPlan,
  navBlocked,navClearLine,worldToPlan,planToWorld,worldClear,findWorldPath});
 root.KSOfficeGeometry=API;
 if(typeof module==='object'&&module.exports)module.exports=API;
})(typeof window!=='undefined'?window:globalThis);
