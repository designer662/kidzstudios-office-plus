import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync('public/job-management.html','utf8');
assert.match(html,/selectedYear=initialJobPeriod.getFullYear\(\),selectedMonth=String\(initialJobPeriod.getMonth\(\)\)/,'Initial period is the current local month');
assert.match(html,/id="currentMonthBtn"/);
for(const id of ['exportQuick','exportModal','dataHubExportTab','dataHubImportTab','dataHubExportPanel','dataHubImportPanel','downloadExcelQuick','importUnifiedFile','excelImportMode','exportBackup','exportExcelAll','exportCsvAll']) {
  assert.ok(html.includes(`id="${id}"`),`Missing shared data hub element ${id}`);
}
assert.match(html,/function mergeImportedJobs\(existing,incoming\)/);
assert.match(html,/const target=mode==='merge'\?mergeImportedJobs\(jobs,preview.list\)/);
assert.match(html,/if\(!exportBackup\(\)\)throw Error/,'Backup must block save on failure');
assert.match(html,/const ok=await saveAll\(/);
assert.match(html,/function showDataHubTab\(tab\)/);
assert.match(html,/function runExportAction\(action,\{template=false\}=\{\}\)/);
assert.match(html,/if\(!template&&!jobsEverLoaded\)throw Error/);
assert.match(html,/status.textContent='File prepared/,'Leave export status visible');
const initial=[...html.matchAll(/id="exportQuick"/g)];assert.equal(initial.length,1,'One Data Hub trigger');
console.log('PASS V86.53 Job Data Hub: current-month load, unified exports/imports, guarded backup, safe merge and restore');
