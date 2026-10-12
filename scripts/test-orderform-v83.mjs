import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const tinyPNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/nQAAAABJRU5ErkJggg==';
const clicked=[];const created=[];const revoked=[];
const document={
  body:{appendChild(element){created.push(element)}},
  createElement(tag){assert.equal(tag,'a');return {style:{},click(){clicked.push({href:this.href,filename:this.download})},remove(){}}}
};
const context={window:{},document,console,atob,Blob,Uint8Array,URL:{
  createObjectURL(blob){assert.equal(blob.type,'image/png');return 'blob:https://example.org/preview-test'},
  revokeObjectURL(url){revoked.push(url)}
},setTimeout(fn){ /* don't expire in the test */ return fn}};
vm.runInNewContext(readFileSync('public/orderform-export.js','utf8'),context,{filename:'orderform-export.js'});
const exporter=context.window.KSOrderformExporter;
const canvas={toDataURL(type){assert.equal(type,'image/png');return tinyPNG}};
const ready=exporter.prepareDownload(canvas);
assert.equal(ready.dataURL,tinyPNG);
assert.equal(ready.url,'blob:https://example.org/preview-test');
assert.equal(clicked.length,0,'preparing the preview must not download automatically');
// A normal link in the preview is used on trusted user click. Verify the
// backward-compatible JS path is also synchronous and does not await Blob.
const result=exporter.downloadReady(ready.url,'OF2026-380');
assert.equal(result,undefined);
assert.deepEqual(clicked,[{href:ready.url,filename:'OF2026-380.png'}]);
exporter.download(canvas,'SECOND');
assert.equal(clicked.length,2,'download should be synchronous');
assert.equal(clicked[1].filename,'SECOND.png');
ready.revoke();ready.revoke();
assert.deepEqual(revoked,['blob:https://example.org/preview-test']);
const src=readFileSync('public/orderform-export.js','utf8');
assert.doesNotMatch(src,/async function download\(/);
assert.doesNotMatch(src,/canvas\.toBlob\(/);
for(const id of [1,2]){
  const html=readFileSync(`public/orderform${id}.html`,'utf8');
  assert.match(html,/orderform-export\.js\?v=83\.0/);
  assert.match(html,/<a id="downloadPngLink"[^>]*download="JobSheet\.png"[^>]*onclick="return downloadImage\(event\)"/);
  assert.match(html,/const prepared = window\.KSOrderformExporter\.prepareDownload\(canvas\)/);
  assert.match(html,/downloadPngLink\.href = currentDownloadHref/);
  assert.match(html,/window\.downloadImage = function\(event\)/);
  assert.doesNotMatch(html,/window\.downloadImage = async function/);
  assert.match(html,/currentDownloadRevoke/);
}
console.log('V83: native PNG download links prepared before user click; synchronous save, filename and cleanup verified for both orderforms.');
