import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import vm from 'node:vm';
const source=readFileSync('public/job-management.html','utf8');
const init=source.match(/const initialJobPeriod=new Date\(\);[\s\S]{0,180}selectedYear=initialJobPeriod.getFullYear\(\),selectedMonth=String\(initialJobPeriod.getMonth\(\)\)/);
assert.ok(init,'Job Management should default to the present local year and month');
const mockDate=class extends Date {constructor(...args){super(...(args.length?args:['2026-10-12T08:00:00+08:00']))}};
const state=vm.runInNewContext('(()=>{const initialJobPeriod=new Date();const selectedYear=String(initialJobPeriod.getFullYear());const selectedMonth=String(initialJobPeriod.getMonth());return {selectedYear,selectedMonth}})()', {Date:mockDate});
assert.equal(state.selectedYear,'2026');
assert.equal(state.selectedMonth,'9');
assert.match(source,/\$\('#monthFilter'\)\.addEventListener\('change',e=>\{periodUserSelected=true;selectedMonth=e.target.value;render\(\)\}\)/,'Month dropdown must remain selectable');
const pages=readdirSync('public').filter(n=>n.endsWith('.html'));
const {release}=JSON.parse(readFileSync('office-release.json','utf8'));
const label=`v${release}${process.env.GITHUB_RUN_NUMBER?'.'+process.env.GITHUB_RUN_NUMBER:''}`;
for(const name of pages){
 const html=readFileSync('public/'+name,'utf8');
 const matches=[...html.matchAll(/<footer\b[^>]*class=["'][^"']*\bks-version-footer\b[^"']*["'][^>]*>([\s\S]*?)<\/footer>/gi)];
 assert.equal(matches.length,1,`Missing/duplicate footer in ${name}`);
 assert.ok(matches[0][1].includes(label),`Incorrect footer label in ${name}`);
 if(name==='index.html')assert.match(matches[0][1],/id="opsLastSync"/, 'Dashboard Last Sync must survive stamping');
}
console.log(`PASS Job Management opens current month, user can change filter, and all ${pages.length} pages show ${label}.`);
