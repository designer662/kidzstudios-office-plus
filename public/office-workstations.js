/* KidzStudios V86.50 — seat ownership comes from PHYSICAL 3D furniture.
 * Pure deterministic allocation; it never writes staff-directory records.
 * Seats are exclusive and everyone beyond physical capacity stands in showroom.
 */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.KSOfficeWorkstations=api;
})(typeof window!=='undefined'?window:globalThis,function(){
  'use strict';
  // Logical plan coordinates: (worldX + 5.75)*2, (worldZ + 17.5)*2.
  // Update these only with the 3D chair positions in source/src/office-scene.ts.
  const seats=Object.freeze([
    {id:'B01',label:'Boss Desk',room:'boss',x:17.90,y:42.52,owner:1},
    {id:'B02',label:'Assistant Desk',room:'staff',x:11.20,y:4.34,owner:2},
    {id:'D01',label:'Designer Desk 01',room:'staff',x:16.62,y:10.10,owner:3},
    {id:'S01',label:'Sales Desk 01',room:'staff',x:9.80,y:14.60,owner:4},
    {id:'S02',label:'Sales Desk 02',room:'staff',x:16.62,y:14.60,owner:5},
    {id:'A01',label:'Admin Desk',room:'staff',x:17.70,y:4.34,owner:6},
    {id:'D02',label:'Designer Desk 02',room:'staff',x:9.80,y:10.10,owner:7},
    {id:'S03',label:'Sales Desk 03',room:'staff',x:9.80,y:19.10,owner:8},
    {id:'S04',label:'Shared Workstation 04',room:'staff',x:16.62,y:19.10,owner:null}
  ].map(s=>Object.freeze(s)));
  const byId=new Map(seats.map(s=>[s.id,s]));
  // Collision/wall-free showroom locations. Only spaces that pass the
  // actual navigation geometry are eligible; standees are never seated.
  function standingPoints(geometry){
    const points=[];
    for(const [gap,steps] of [[1.1,[1.8,1.2,1.0,.85,.72]],[.75,[.9,.72,.64]]]){
      for(const step of steps){
        for(let y=25.8;y<35.0;y+=step)for(let x=7.2;x<21.9;x+=step){
          const a={x:Number(x.toFixed(2)),y:Number(y.toFixed(2))};
          if(geometry?.navBlocked?.(a.x,a.y)||geometry?.blocked?.(a.x,a.y,.7))continue;
          // Only ultra-high occupancy uses denser standing positions.
          if(points.some(p=>Math.hypot(p.x-a.x,p.y-a.y)<gap))continue;
          points.push(a);
        }
        if(points.length>=100)break;
      }
      if(points.length>=100)break;
    }
    return points;
  }
  function allocate(staff,geometry){
    if(!Array.isArray(staff))return [];
    const roster=staff.map(e=>({...e}));
    const occupied=new Set(),assignments=new Map();
    // Priority seats are stable even if the shared staff list changes order.
    for(const seat of seats){
      const employee=roster.find(e=>Number(e.id)===seat.owner);
      if(employee){assignments.set(Number(employee.id),seat);occupied.add(seat.id)}
    }
    // Additional staff get one of the actual empty chairs in stable ID order.
    for(const employee of [...roster].sort((a,b)=>Number(a.id)-Number(b.id))){
      const id=Number(employee.id);
      if(assignments.has(id))continue;
      const preferred=byId.get(String(employee.deskId||''));
      const seat=preferred&&!occupied.has(preferred.id)?preferred:seats.find(s=>!occupied.has(s.id));
      if(seat){assignments.set(id,seat);occupied.add(seat.id)}
    }
    const standees=[...roster].filter(e=>!assignments.has(Number(e.id))).sort((a,b)=>Number(a.id)-Number(b.id));
    const spots=standingPoints(geometry);const standing=new Map();
    for(let i=0;i<standees.length;i++){
      const spot=spots[i];
      // More employees than the available walking-safe showroom positions is
      // a floor-plan capacity issue; do not stack avatars at the same point.
      if(!spot)throw new Error('Showroom standing capacity exceeded. Expand the floor plan before adding more staff.');
      standing.set(Number(standees[i].id),spot);
    }
    return roster.map(employee=>{
      const seat=assignments.get(Number(employee.id));
      const point=seat||standing.get(Number(employee.id));
      const originalHome=employee.homeRoom||employee.roomId||'staff';
      const previousX=Number(employee.deskX),previousY=Number(employee.deskY);
      const moving=!!employee.motionWalking||employee.roam?.phase==='walk';
      const remainsHome=Number.isFinite(previousX)&&Number.isFinite(previousY)&&
        Math.hypot(Number(employee.visualX??previousX)-previousX,Number(employee.visualY??previousY)-previousY)<.8 &&
        !moving;
      const homeRoom=seat?seat.room:'showroom';
      const newEmployee={...employee,deskId:seat?.id||'',deskLabel:seat?.label||'No desk · Standing in showroom',
        deskX:point.x,deskY:point.y,homeRoom,
        // Only move an idle employee when their assignment actually changes.
        // The shared movement leader independently relocates active timelines.
        roomId:employee.roomId===originalHome?homeRoom:employee.roomId,
        x:point.x,y:point.y,
        ...(!seat?{status:'Standing in showroom'}:{status:(employee.status==='Standing in showroom'||(originalHome==='showroom'&&employee.status==='In a meeting'))?'At desk':employee.status})};
      if(remainsHome){newEmployee.visualX=point.x;newEmployee.visualY=point.y;newEmployee.visualRoomId=homeRoom}
      return newEmployee;
    });
  }
  return Object.freeze({seats,standingPoints,allocate});
});
