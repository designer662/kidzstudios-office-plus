import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(p,'utf8');
const home=read('public/index.html');
const living=read('public/office-living-office.js');
const styles=read('public/office-index-controls-v86-53.css');
const full=read('public/office-fullscreen.js');
assert.match(home,/office-index-controls-v86-53\.css\?v=86\.53\.ui1/,'New controls CSS is loaded last');
assert.match(home,/office-living-office\.js\?v=86\.53\.ui1/,'Relocation code cache must refresh');
assert.equal((home.match(/id="ksOfficeFullscreen"/g)||[]).length,1,'One fullscreen control');
for(const id of ['zoomOut','zoomIn','rotateView','chatLauncher','followChip']){
 assert.equal((home.match(new RegExp(`id="${id}"`,'g'))||[]).length,1,`${id} appears exactly once`);
}
assert.ok(!home.includes('id="fullscreenBtn"'),'Remove duplicate fullscreen button');
assert.ok(!home.includes('id="resetView"'),'Old camera home button must be replaced by Rotate');
assert.match(home,/\$\('#rotateView'\)\.onclick=\(\)=>rotateModel\(15\)/,'Rotate button should rotate existing model');
assert.match(living,/controls\.append\(badge,btn,resetAI\)/,'Retain Reset AI and sound controls');
assert.match(living,/document\.getElementById\('ksOfficeFullscreen'\)/,'Relocate original fullscreen DOM node');
assert.match(living,/document\.querySelector\('#mapShell \.map-tools \.tool-group'\)/,'Relocate the original camera control buttons');
assert.match(living,/controls\.appendChild\(viewTools\)/,'Place controls alongside Reset AI');
assert.match(full,/document\.getElementById\('ksOfficeFullscreen'\)/,'Keep existing real fullscreen binding');
assert.match(styles,/\#chatLauncher\{[\s\S]*?left:50%!important/,'Center Chat launcher on desktop');
assert.match(styles,/\#followChip\{[\s\S]*?top:58px!important/,'Following chip centered near top');
assert.match(styles,/\.ks-living-camera-tools/,'Retain camera pill styling');
assert.match(styles,/\.ks-living-fullscreen/,'Match fullscreen to Reset AI pill');
assert.match(styles,/\.map-tools \.rotation-control\{display:none!important/,'Hide duplicate rotate controls');
console.log('PASS V86.53 UI: Chat centered, Fullscreen/Zoom/Rotate grouped with Reset AI, Following top-centered and handlers preserved');
