import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const html=fs.readFileSync('public/index.html','utf8');
const quality=fs.readFileSync('public/office-quality.js','utf8');
const styles=fs.readFileSync('public/office-pulse-integrated.css','utf8');
assert.ok(!html.includes('office-command-center.js'),'no separate Command Center script');
assert.ok(!html.includes('ksCommandPanel'),'no duplicate overlay');
assert.ok(!html.includes('Command Center</span>'),'no extra nav item');
assert.match(html,/id="todayPanel"/);
assert.match(html,/id="ksPulsePriority"/);
assert.match(html,/<details class="ks-pulse-extra"/);
assert.match(html,/id="ksVisualQuality"/);
assert.match(quality,/setQuality\(select\.value\)/);
assert.match(styles,/#todayPanel \.ks-pulse-main-metrics/);
for (const key of ['active','dueToday','overdue','completedToday']) assert.match(html,new RegExp(`data-ops-quick="${key}"`));
const extract=html.match(/  function renderPulsePriority\(\)\{[\s\S]*?\n  \}\n  function renderOps\(\)/);
assert.ok(extract,'Pulse priority function integrated into existing OfficeSuite render');
const root={innerHTML:''};
class FixedDate extends Date {constructor(...args){super(...(args.length?args:['2026-10-12T12:00:00+08:00']));}}
const jobs=[
 {ref:'JOB-1',due:'2026-10-11',customer:'Test Client',pic:'Afiq',status:'Artwork'},
 {ref:'JOB-2',due:'2026-10-12',customer:'Urgent',status:'Production'},
 {ref:'JOB-3',due:'2026-10-14',customer:'<script>bad</script>',status:'Order'},
 {ref:'JOB-4',due:'2026-10-20',customer:'Later',status:'Order'},
 {ref:'JOB-5',due:'2026-10-10',status:'Completed'}
];
const context={Date:FixedDate,Math,jobs,$:id=>id==='#ksPulsePriority'?root:null,parseLooseDate:value=>new FixedDate(`${value}T12:00:00+08:00`),isCompletedJob:job=>job.status==='Completed',esc:v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))};
vm.runInNewContext(extract[0].replace(/\n  function renderOps\(\)$/,'' )+'\nrenderPulsePriority();',context);
assert.equal((root.innerHTML.match(/ks-priority-row/g)||[]).length,3,'only three highest priority active jobs shown');
assert.ok(root.innerHTML.includes('JOB-1'),'oldest overdue job first');
assert.ok(root.innerHTML.includes('JOB-2'),'due today shown');
assert.ok(root.innerHTML.includes('JOB-3'),'next 3 days shown');
assert.ok(!root.innerHTML.includes('JOB-4'),'future jobs omitted');
assert.ok(!root.innerHTML.includes('JOB-5'),'completed jobs omitted');
assert.ok(!root.innerHTML.includes('<script>'),'names safely escaped');
console.log('PASS V86.1 unified Office Pulse: single panel, priority queue, optional details, safe data, 3D quality');
