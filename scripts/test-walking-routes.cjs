'use strict';
// V86.32 regression: use the production navigation guard instead of retired
// V66 helpers that no longer exist in index.html.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const guard = require('../public/office-geometry-guard.js');
const html = fs.readFileSync(path.join(__dirname, '../public/index.html'), 'utf8');
for (const name of ['navBlocked', 'navClearLine', 'findWorldPath', 'worldToPlan', 'planToWorld']) {
  assert.equal(typeof guard[name], 'function', `Production navigation missing ${name}`);
}
assert.match(html, /function pathBetweenZones\(/, 'Office zone-route planner missing');
assert.equal(guard.navBlocked(-1, -1), true, 'Outside floor should be blocked');
assert.equal(guard.navClearLine({x:-1,y:-1}, {x:2,y:2}), false, 'Route across blocked space allowed');
let checked = 0;
const walkable = [];
for(let y=3; y<=66; y+=2) for(let x=2; x<=21; x+=2) {
  if(!guard.navBlocked(x,y)) walkable.push({x,y});
}
assert(walkable.length>=20, 'Too few accessible walkable checkpoints');
// Each local step must either be proven clear or be rejected by the guard.
for (const a of walkable) {
  for (const b of walkable) {
    if(Math.hypot(a.x-b.x,a.y-b.y)>3) continue;
    const clear=guard.navClearLine(a,b);
    assert.equal(typeof clear, 'boolean');
    if(clear) {
      const scale=1.5;
      const worldA=guard.planToWorld(a,scale), worldB=guard.planToWorld(b,scale);
      const mapped=guard.worldToPlan(worldA,scale);
      assert(Math.hypot(mapped.x-a.x,mapped.y-a.y)<1e-8, 'World/plan coordinate conversion drift');
      const route=guard.findWorldPath(worldA,worldB,scale);
      assert(route && route.length>=1, `Planner rejected clear segment ${JSON.stringify(a)} to ${JSON.stringify(b)}`);
      assert(Math.hypot(route.at(-1).x-worldB.x,route.at(-1).z-worldB.z)<1e-6, 'Route endpoint drift');
      checked++;
    }
  }
}
assert(checked>=100, 'Too few validated navigable segments');
console.log(`PASS: V86 shared geometry and ${checked} reachable walking segments`);
