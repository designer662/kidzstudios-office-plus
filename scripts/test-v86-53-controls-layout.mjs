import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(p,'utf8');
const home=read('public/index.html');
const living=read('public/office-living-office.js');
const styles=read('public/office-index-controls-v86-53.css');
const full=read('public/office-fullscreen.js');
const bridge=read('source/src/suite-bridge.ts');
const scene=read('source/src/office-scene.ts');

assert.match(home,/office-index-controls-v86-53\.css\?v=86\.53\.ui3/,'Updated control layout must refresh the stylesheet cache');
assert.match(home,/office-living-office\.js\?v=86\.53\.ui3/,'Updated top controls must bypass the previous JS cache');
for(const id of ['ksOfficeFullscreen','chatLauncher','followChip']){
 assert.equal((home.match(new RegExp(`id="${id}"`,'g'))||[]).length,1,`${id} appears exactly once`);
}
for(const id of ['zoomOut','zoomIn','rotateView']){
 assert.doesNotMatch(home,new RegExp(`id="${id}"`),`Remove ${id} from the page`);
 assert.doesNotMatch(home,new RegExp(`\\$\\('#${id}'\\)\\.onclick`),`Remove stale ${id} handler`);
}
assert.doesNotMatch(home,/<div class="tool-group" aria-label="Zoom and view controls">/,'No camera control pill in markup');
assert.doesNotMatch(living,/viewTools|ks-living-camera-tools/,'Do not recreate the camera pill by moving its DOM nodes');
assert.doesNotMatch(styles,/ks-living-camera-tools/,'Do not retain camera pill styling');
assert.match(living,/controls\.append\(badge,btn,resetAI\)/,'Keep original Reset AI and sound controls');
assert.match(living,/document\.getElementById\('ksOfficeFullscreen'\)/,'Keep fullscreen beside Reset AI');
assert.match(living,/document\.getElementById\('ksVisualQuality'\)\?\.closest\('\.ks-quality-mini'\)/,'Move the 3D quality control beside Fullscreen');
assert.match(full,/document\.getElementById\('ksOfficeFullscreen'\)/,'Fullscreen remains connected to the existing handler');
assert.match(styles,/#chatLauncher\{[\s\S]*?position:fixed!important[\s\S]*?left:50vw!important/,'Keep Chat centered to the viewport on desktop');
assert.match(styles,/\.ks-living-controls \.ks-quality-mini\{[\s\S]*?display:inline-flex!important/,'Style the 3D quality control like the other top pills');
assert.match(styles,/#followChip\{[\s\S]*?position:fixed!important[\s\S]*?left:50vw!important/,'Keep Following chip top centered in the viewport');
// Test the 3D engine's existing cinematic behavior, which is independent of
// the UI controls. Respect the operating system's reduced-motion preference.
assert.match(bridge,/controller\.setRotating\(!paused\)/,'Cinematic auto rotation defaults to on when motion is allowed');
assert.match(bridge,/controller\?\.setRotating\(!paused\)/,'Reset restores the default cinematic rotation');
assert.match(scene,/controls\.autoRotateSpeed=\.24/,'Preserve the slow cinematic orbit rate');
assert.match(scene,/controls\.autoRotate=rotating&&!paused&&!reducedMotion\.matches&&view==='isometric'/,'Animation loop keeps automatic orbit independent of deleted controls');
assert.match(scene,/setRotating\(v\)\{rotating=v\}/,'Retain the 3D rotation API');
console.log('PASS V86.53 cinematic UI: camera control pill removed; fullscreen, Chat, Following and default auto-rotation retained');
