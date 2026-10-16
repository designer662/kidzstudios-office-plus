import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
const read=file=>readFileSync(file,'utf8');
const index=read('public/index.html');
const jobs=read('public/job-management.html');
const sheet=read('public/office-index-header-parity.css');
const pages=readdirSync('public').filter(file=>file.endsWith('.html'));
for(const path of ['index.html','job-management.html']){
 const src=path==='index.html'?index:jobs;
 assert.match(src,/href="suite-header-v61\.css\?v=/);
 assert.match(src,/href="suite-header-minimal\.css\?v=/);
 assert.match(src,/src="suite-header\.js(?:\?v=[^"]+)?"/);
}
assert.match(index,/office-index-header-parity\.css\?v=/);
assert.ok(index.indexOf('office-index-header-parity.css')>index.indexOf('office-live-activity.css'),'Index header parity must load after all legacy index-only CSS');
assert.doesNotMatch(index,/class="ks-home-intro"/,'Unrequested overview card must not appear');
assert.doesNotMatch(index,/<div class="stats-strip" aria-label="Staff movement summary"/,'Duplicate static activity metrics must not appear');
assert.doesNotMatch(read('public/office-index-job-style.css'),/\.ks-home-intro/,'Unused overview styling must not linger');
assert.match(sheet,/body\.ks-dashboard \.ks-master-header\{[\s\S]*padding:8px clamp\(10px,1\.4vw,24px\)!important/);
assert.match(sheet,/grid-template-rows:44px!important/);
assert.match(sheet,/@media\(max-width:1280px\)/);
assert.match(sheet,/@media\(max-width:700px\)/);
assert.match(index,/id="livePresenceSlot"/,'Online status should remain in Live Activity');
assert.doesNotMatch(read('public/office-online-users.js'),/querySelector\('\.ks-master-header \.header-tools'\)/,'Presence must not be placed in header');
for(const page of pages.filter(name=>name!=='index.html')){
 assert.ok(!read('public/'+page).includes('office-index-header-parity.css'),`${page} must retain previous styling`);
}
console.log(`PASS: Index/Jobs shared header source, scoped index parity, removed overview, ${pages.length-1} other pages unchanged`);
