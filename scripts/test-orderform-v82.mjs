import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const helper=readFileSync('public/orderform-export.js','utf8');
const globals={window:{}};
vm.runInNewContext(helper,globals,{filename:'orderform-export.js'});
assert.equal(typeof globals.window.KSOrderformExporter.capture,'function');
assert.equal(typeof globals.window.KSOrderformExporter.nativeCapture,'function');
assert.equal(typeof globals.window.KSOrderformExporter.download,'function');
assert.match(helper,/prepareDownload\(/);
assert.match(helper,/URL\.createObjectURL\(/);
assert.match(helper,/html2canvas/);
assert.doesNotMatch(helper,/<foreignObject\b/); // No SVG document export.
for(const n of [1,2]){
  const html=readFileSync(`public/orderform${n}.html`,'utf8');
  assert.match(html,/orderform-export\.js\?v=83\.0/);
  assert.match(html,/KSOrderformExporter\.capture\(sheet/);
  assert.match(html,/KSOrderformExporter\.prepareDownload\(canvas/);
  assert.match(html,/currentPreviewCanvas\s*=\s*canvas/);
  assert.match(html,/currentPreviewCanvas\s*=\s*null/);
  assert.match(html,/onclick="return downloadImage\(event\)"/);
}
const header=readFileSync('public/suite-header.js','utf8');
assert.match(header,/ks:supabase-change/);
assert.match(header,/ks_office_events/);
assert.match(header,/Shared live/);
assert.match(header,/ksHeaderClearedThrough/);
assert.match(header,/if\(!document\.getElementById\('officeSvg'\)\)/);
assert.match(header,/lastSoundEventId===null/);
console.log('V82: Orderform PNG export + shared-live notifications wired on both pages and tool headers.');
