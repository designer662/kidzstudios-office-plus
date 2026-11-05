/* KIDZSTUDIOS Office Plus V80: deterministic viewport-safe 3D label placement.
   The renderer projects characters, this helper reserves name tags before temporary bubbles.
   No state is sent to Supabase: each camera lays out the same events for its own viewport. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.KSLabelLayout=api;
})(typeof window!=='undefined'?window:null,function(){
  'use strict';
  const moodEmoji=Object.freeze({happy:'😊',sad:'😔',angry:'😠',badmood:'😒',busy:'💻'});
  const priority=Object.freeze({chat:120,conversation:110,living:100,job:90,activity:75,workload:55,follow:25});
  function rank(kind){return priority[kind]??45}
  function overlaps(a,b,margin=5){return a.x < b.x+b.w+margin && a.x+a.w+margin > b.x && a.y < b.y+b.h+margin && a.y+a.h+margin > b.y}
  function clamp(n,lo,hi){return Math.max(lo,Math.min(hi,n))}
  function centered(x,y,w,h){return {x:x-w/2,y:y-h/2,w,h}}
  function choose(anchor,dimensions,occupied,viewport,offsets,padding=9){
    const w=Math.min(Math.max(20,dimensions.w),Math.max(20,viewport.width-2*padding));
    const h=Math.min(Math.max(18,dimensions.h),Math.max(18,viewport.height-2*padding));
    for(const [dx,dy] of offsets){
      const x=clamp(anchor.x+dx,w/2+padding,viewport.width-w/2-padding);
      const y=clamp(anchor.y+dy,h/2+padding,viewport.height-h/2-padding);
      const candidate=centered(x,y,w,h);
      if(!occupied.some(other=>overlaps(candidate,other)))return candidate;
    }
    return null;
  }
  function layout({names=[],bubbles=[],rooms=[],viewport,zoom=1}){
    const vp={width:Math.max(1,viewport?.width||1),height:Math.max(1,viewport?.height||1)};
    const occupied=[],result={names:[],bubbles:[],rooms:[],compact:zoom<0.92||vp.width<600};
    const nameOffsets=[[0,0],[0,-25],[0,25],[-65,-10],[65,-10],[0,-50],[-110,0],[110,0],[-65,25],[65,25],[0,50],[-125,-30],[125,-30]];
    const sortedNames=[...names].sort((a,b)=>Number(!!b.focused)-Number(!!a.focused)||a.id-b.id);
    const nameById=new Map();
    for(const tag of sortedNames){
      if(!tag.visible||!Number.isFinite(tag.x)||!Number.isFinite(tag.y)){
        result.names.push({id:tag.id,visible:false});continue;
      }
      const spot=choose(tag,{w:tag.width||78,h:tag.height||27},occupied,vp,nameOffsets);
      if(spot){occupied.push(spot);nameById.set(tag.id,spot);result.names.push({id:tag.id,visible:true,x:spot.x+spot.w/2,y:spot.y+spot.h/2,...spot});}
      else result.names.push({id:tag.id,visible:false});
    }
    // One bubble per character, with messages/conversations above workload and follow text.
    const selected=new Map();
    for(const bubble of bubbles){
      if(!bubble.visible)continue;
      const prior=selected.get(bubble.id);
      if(!prior||rank(bubble.kind)>rank(prior.kind)||rank(bubble.kind)===rank(prior.kind)&&bubble.started>prior.started){selected.set(bubble.id,bubble)}
    }
    const ordered=[...selected.values()].sort((a,b)=>rank(b.kind)-rank(a.kind)||a.id-b.id);
    for(const bubble of ordered){
      const name=nameById.get(bubble.id);
      if(!name||result.compact&&rank(bubble.kind)<100){result.bubbles.push({key:bubble.key,visible:false});continue;}
      const w=bubble.width||180,h=bubble.height||46;
      const initialY=name.y-h/2-12;
      const offsets=[[0,0],[0,-h-12],[-Math.min(100,w*.48),0],[Math.min(100,w*.48),0],[-Math.min(115,w*.55),-h-8],[Math.min(115,w*.55),-h-8],[0,h+name.h+16]];
      const spot=choose({x:name.x+name.w/2,y:initialY},{w,h},occupied,vp,offsets);
      if(spot){occupied.push(spot);result.bubbles.push({key:bubble.key,visible:true,x:spot.x+spot.w/2,y:spot.y+spot.h/2,...spot});}
      else result.bubbles.push({key:bubble.key,visible:false});
    }
    for(const room of rooms){
      const spot=choose(room,{w:room.width||110,h:room.height||24},occupied,vp,[[0,0]],10);
      const canShow=room.visible&&zoom>=1.02&&!!spot&&!occupied.some(x=>overlaps(x,spot,8));
      if(canShow)occupied.push(spot);
      result.rooms.push({id:room.id,visible:!!canShow,x:spot?.x+spot?.w/2,y:spot?.y+spot?.h/2});
    }
    return result;
  }
  return {moodEmoji,priority,rank,overlaps,layout};
});
