import assert from 'node:assert/strict';
import {runStabilitySuite,stabilityTests} from './stability-suite.mjs';
const seen=[],messages=[];
const report={log:s=>messages.push(String(s)),error:s=>messages.push(String(s))};
const before=runStabilitySuite(['first','fails','after'],file=>{
  seen.push(file);return {status:file==='fails'?1:0};
},report);
assert.deepEqual(seen,['first','fails','after'],'Continue checking after a failure');
assert.deepEqual(before.failed,['fails']);
assert.equal(before.exitCode,1,'A failed test must fail CI');
assert(messages.join('\n').includes('fails'));
const all=runStabilitySuite(['first','after'],()=>({status:0}),report);
assert.equal(all.exitCode,0);
assert.equal(all.passed,2);
assert.equal(stabilityTests.length,8,'CI must retain the existing five and all V86.28–V86.30 AI checks');
for(const file of ['test-v86-28-synchronized-walking.mjs','test-v86-29-smart-ai.mjs','test-v86-30-furniture-ai.mjs']){
 assert(stabilityTests.some(entry=>entry.endsWith('/'+file)),`CI must execute ${file}`);
}
console.log('PASS simulator runner: failures aggregated, subsequent tests executed, CI exit remains strict.');
