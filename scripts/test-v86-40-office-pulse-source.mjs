import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';

const root = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(path.join(root,'public/index.html'),'utf8');
const closeHelper = readFileSync(path.join(root,'public/office-outside-close.js'),'utf8');
const release = JSON.parse(readFileSync(path.join(root,'office-release.json'),'utf8'));

assert(!html.includes('id="jobLinkSettingsBtn"'), 'Office Pulse must not show the editable link pencil');
assert(!html.includes('id="jobLinkModal"'), 'Remove the obsolete Job Management link editor');
assert(!closeHelper.includes("['jobLinkModal'"), 'Remove references to removed link editor');
assert.match(html, /id="opsExpandBtn"[^>]+>/, 'Keep expand control');
assert.match(html, /id="opsRefresh"[^>]+>/, 'Keep manual sync control');
assert.match(html, /id="jobManagementResource"[^>]*href="job-management\.html"/, 'Resource must open the local Job Management page');
assert.match(html, /class="ops-open-sheet" href="job-management\.html"/, 'Jobs tab must open local Job Management');
assert(!html.includes('docs.google.com/spreadsheets/d'), 'Dashboard must not contain a Google Sheets source link');
assert(!html.includes('/gviz/tq'), 'Dashboard must not load a Google Sheet visualization feed');
assert(!html.includes('jobDataSource'), 'Remove configurable alternate job data source');
assert(!html.includes('saveJobManagementUrl('), 'Dashboard must not save configurable job links');
assert(!html.includes("window.addEventListener('ks:job-management-url'"), 'Global URL changes must not redirect Pulse');
assert.match(html, /fetch\('\/api\/state\?scope=dashboard%3Ajobs'/, 'Pulse must read authoritative shared jobs');
assert(!/const jobUrl=.*?payload\.jobManagementUrl/.test(html), 'Generic shared settings must not rewrite job links');
assert.match(html, /KSPulseInsights\.jobHref\(entry\.ref\)/, 'Direct job navigation remains enabled');

// Exercise the actual active dashboard loader in isolation, rather than only matching text.
const start = html.indexOf('  async function loadJobsFromManagement(');
const end = html.indexOf('  function startJobAutoSync(',start);
assert(start>=0 && end>start, 'The active dashboard needs one HTML-only job loader');
const source = html.slice(start,end);
assert(!source.includes('document.createElement(\'script\')'), 'No dynamic Sheet scripts may be injected');
assert(!source.includes('fetch('), 'Loader uses the established readJobCache API');
let next, runs=0;
const statuses = [], renders=[];
const btn = {state:new Set(),classList:{add(value){btn.state.add(value)},remove(value){btn.state.delete(value)}}};
const context = vm.createContext({
  jobs:[], jobSyncInFlight:false, opsRefreshBtn:btn,opsHasSnapshot:false,opsDataMode:'loading', jobSharedVersion:0,opsLastSyncAt:null,
  async readJobCache(options){assert.equal(options.strict,true);runs++;return await next()},
  setOpsSource(mode,label,note){context.opsDataMode=mode; statuses.push({mode,label,note});},
  renderOps(){renders.push(JSON.stringify(context.jobs))},
  renderOpsSyncMeta(){}
});
vm.runInContext(source+'\nglobalThis.__loadJobs=loadJobsFromManagement;',context);
next=async()=>({version:4,savedAt:1700000000000,jobs:[{ref:'JOB-100'}]});
await context.__loadJobs();
assert.equal(context.jobs.length,1);
assert.equal(context.jobs[0].ref,'JOB-100');
assert.equal(context.jobSharedVersion,4);
assert.equal(statuses.at(-1).mode,'live');
assert(!btn.state.has('loading'),'Manual refresh clears loading indicator');
next=async()=>({version:3,savedAt:1700000000000,jobs:[{ref:'OLD'}]});
await context.__loadJobs();
assert.equal(context.jobs[0].ref,'JOB-100','Older version must not replace current snapshot');
next=async()=>{throw new Error('Temporary network failure')};
await context.__loadJobs();
assert.equal(context.jobs[0].ref,'JOB-100','Network failure must preserve prior jobs');
assert.equal(statuses.at(-1).mode,'offline');
next=async()=>({version:5,savedAt:1700000100000,jobs:[{ref:'JOB-101'}]});
await context.__loadJobs();
assert.equal(context.jobs[0].ref,'JOB-101');
assert.equal(statuses.at(-1).mode,'live');
assert.equal(runs,4);
assert(renders.length>=3);
if(release.release==='86.40') assert.equal(release.version,'86.40');
console.log('PASS: Office Pulse has no editable Sheet source, synchronizes only Job Management jobs, preserves stale data and current version, and restores after network failure');
