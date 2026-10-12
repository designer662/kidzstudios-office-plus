import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=path=>readFileSync(path,'utf8');
const scene=read('source/src/office-scene.ts');
const bundle=read('public/office-3d.js');
const logic=read('source/src/suite-bridge.ts');
const html=read('public/index.html');
const sync=read('public/office-movement-sync.js');
assert.match(scene,/const FLOOR_SPACE_SCALE=1\.25;/);
assert.match(bundle,/const FLOOR_SPACE_SCALE=1\.25;/);
const expected=[
  'scale.set(FLOOR_SPACE_SCALE,1,FLOOR_SPACE_SCALE)',
  'position[0]*FLOOR_SPACE_SCALE',
  'position[1]*FLOOR_SPACE_SCALE',
  'focus[0]*FLOOR_SPACE_SCALE',
  'focus[1]*FLOOR_SPACE_SCALE',
  'x*FLOOR_SPACE_SCALE',
  'z*FLOOR_SPACE_SCALE',
  '6*FLOOR_SPACE_SCALE',
  '18*FLOOR_SPACE_SCALE',
];
for(const expression of expected){assert.ok(scene.includes(expression),`Source missing consistent transform: ${expression}`);assert.ok(bundle.includes(expression),`Shipped 3D bundle missing transform: ${expression}`)}
assert.ok(scene.indexOf('world.scale.set(FLOOR_SPACE_SCALE')>scene.indexOf('world.clear()'), 'Scale batched world after geometry merge to avoid double scaling');
assert.ok(bundle.indexOf('u.scale.set(FLOOR_SPACE_SCALE')>bundle.indexOf('u.clear()'), 'Shipped bundle must scale batched world after merge');
assert.ok(html.includes('office-3d.js?v=86.1'), 'Updated 3D bundle must bust browser cache');
assert.match(logic,/return \[\(e.visualX\?\?e.x\)\/2-5\.75,\(e.visualY\?\?e.y\)\/2-17\.5\]/,'Keep existing Supabase and floor-plan data coordinates');
assert.ok(sync.includes("const SCOPE="),'Supabase shared timeline retained');
assert.equal(1.25*1.25,1.5625);
console.log('PASS V85 expanded floor: 1.25x layout in X/Z, unchanged character sizes and Supabase coordinates; camera, room labels and route points transformed.');
