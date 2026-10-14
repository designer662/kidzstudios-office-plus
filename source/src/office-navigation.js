// V86.28: lag-adaptive pursuit of the authoritative shared walking timeline.
// Both viewing and planning PCs use the same timestamped route; this layer only
// catches the avatar up visually while sweeping every step against walls.
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
  // A fixed 2.4 world-unit/s cap used to leave late-connected viewers multiple
  // seconds behind the timeline, dragging feet as the network target moved.
  // Use a stronger response and only accelerate when there is meaningful lag.
  // Near the target the body tracks a normal walking pace; after a stale sync
  // it catches up quickly, with the actual travelled distance driving the gait.
  const step=Math.min(dt,.05);
  const maxSpeed=Math.min(7.2,2.4+Math.max(0,distance-.20)*2.8);
  const travel=Math.min(gap*(1-Math.exp(-30*step)),maxSpeed*step);
  if(gap===0)return;
  const next={x:position.x+dx/gap*travel,z:position.z+dz/gap*travel};
  if(!geometry.worldClear(position,next,scale))return;
  position.x=next.x;position.z=next.z;
  if(rig.person.status==='walking')rig.targetRotation=Math.atan2(dx,dz);
}

