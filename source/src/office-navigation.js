// Presentation-only pursuit of a shared timeline target, with swept clearance.
export function followSceneTarget(rig,dt,geometry,scale=1.5){
  if(!geometry||!Number.isFinite(dt)||dt<=0)return;
  const position=rig.root.position,target=rig.targetPosition;
  if(![position.x,position.z,target.x,target.z].every(Number.isFinite))return;
  const distance=Math.hypot(target.x-position.x,target.z-position.z);
  if(distance<1e-6)return;
  let waypoint=target;
  if(!geometry.worldClear(position,target,scale)){
    let recovery=rig.routeRecovery;
    if(!recovery||Math.hypot(recovery.x-target.x,recovery.z-target.z)>.65){
      const points=geometry.findWorldPath(position,target,scale);
      recovery=rig.routeRecovery={x:target.x,z:target.z,points:points||[]};
    }
    while(recovery.points.length&&Math.hypot(recovery.points[0].x-position.x,recovery.points[0].z-position.z)<.035)recovery.points.shift();
    waypoint=recovery.points[0];
    if(!waypoint||!geometry.worldClear(position,waypoint,scale)){rig.routeRecovery=null;return;}
  }else rig.routeRecovery=null;
  const dx=waypoint.x-position.x,dz=waypoint.z-position.z,gap=Math.hypot(dx,dz);
  const travel=Math.min(gap*(1-Math.exp(-18*Math.min(dt,.05))),2.4*Math.min(dt,.05));
  if(gap===0)return;
  const next={x:position.x+dx/gap*travel,z:position.z+dz/gap*travel};
  if(!geometry.worldClear(position,next,scale))return;
  position.x=next.x;position.z=next.z;
  if(rig.person.status==='walking')rig.targetRotation=Math.atan2(dx,dz);
}

