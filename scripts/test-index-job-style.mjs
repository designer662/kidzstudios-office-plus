import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
const rd=file=>readFileSync(file,'utf8');
const html=rd('public/index.html');
const css=rd('public/office-index-job-style.css');
const pages=readdirSync('public').filter(x=>x.endsWith('.html'));
assert.equal((html.match(/office-index-job-style\.css/g)||[]).length,1,'Dashboard visual CSS linked exactly once');
assert.ok(html.indexOf('office-index-job-style.css')>html.indexOf('office-fullscreen.css'),'Dashboard style must load after fullscreen style');
assert.doesNotMatch(html,/<section class="ks-home-intro"/,'Unrequested overlay card must stay removed');
for(const id of ['mapShell','livePanel','todayPanel','ksOfficeFullscreen','opsRefresh','activityList']){
 assert.equal((html.match(new RegExp(`id="${id}"`,'g'))||[]).length,1,`Existing #${id} element must be preserved`);
}
for(const other of pages.filter(p=>p!=='index.html')){
 assert.ok(!rd('public/'+other).includes('office-index-job-style.css'),`${other} must retain its original layout`);
}
for(const hook of ['body.ks-dashboard #todayPanel','body.ks-dashboard #livePanel','body.ks-dashboard #todayPanel .ks-pulse-main-metrics']){
 assert.ok(css.includes(hook),`Missing scoped visual style ${hook}`);
}
assert.match(rd('public/office-fullscreen.css'),/body\.ks-dashboard #mapShell/,'Fullscreen simulator remains unchanged');
console.log(`PASS: dashboard-only Job Management visual design, existing AI/Pulse hooks preserved, ${pages.length-1} other pages untouched`);
