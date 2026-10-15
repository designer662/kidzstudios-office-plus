// Job Management export regression using mocked read-only shared-state data.
// No private Job Management variables are accessed or modified by test helpers.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { chromium } from '../source/node_modules/playwright/index.mjs';

const publicRoot = 'public/';
const read = name => readFileSync(publicRoot + name, 'utf8');
const excluded = new Set(['supabase-bridge.js', 'suite-header.js', 'office-outside-close.js']);
const sourceHtml = read('job-management.html');

// Regression guard: test setup must not depend on a lexical variable inside
// the page's private IIFE. This was the source of CI's "jobs is not defined".
assert.doesNotMatch(sourceHtml, /__fixtureJobs/, 'Never put a test fixture into production HTML');
assert.match(sourceHtml, /async function pull\(/, 'Use the real shared-data loader');
const records = Array.from({length: 260}, (_, i) => ({
  jobsheetFiles: `TEST-${String(i + 1).padStart(3, '0')}`,
  customer: `Customer ${i + 1}`,
  orderDate: '2026-10-15',
  currentDepartment: 'PRODUCTION',
}));
const sharedSnapshot = {
  version: 7,
  updatedAt: '2026-10-15T08:00:00Z',
  payload: { savedAt: 1760515200000, jobs: records },
};

// Stub only /api/state. Every production script uses the usual fetch path.
// A browser fixture cannot reach customer data and refuses database writes.
const mockApi = `<script>
(() => {
  const jobsSnapshot = ${JSON.stringify(sharedSnapshot).replace(/</g, '\\u003c')};
  window.fetch = async (input, options = {}) => {
    const method = String(options?.method || 'GET').toUpperCase();
    const url = new URL(String(input), 'https://office.test');
    if (method !== 'GET') return new Response('Test fixture is read-only', {status: 405});
    if (url.pathname !== '/api/state') return new Response('', {status: 404});
    const scope = url.searchParams.get('scope');
    const body = scope === 'dashboard:jobs'
      ? jobsSnapshot
      : {version: 1, payload: {}};
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: {'content-type': 'application/json'},
    });
  };
})();
</script>`;
let html = sourceHtml.replace('</head>', `${mockApi}</head>`);
html = html.replace(/<script\s+src="([^"]+)"[^>]*>\s*<\/script>/gi, (tag, source) => {
  const name = source.split('?')[0];
  if (excluded.has(name)) return '';
  // Do not silently skip a missing application dependency.
  return `<script>${read(name).replaceAll('</script', '<\\/script')}</script>`;
}).replace(/<link\s+rel="stylesheet"[^>]*>/gi, '');

console.log('V86.53 export fixture v3: mocked shared-state load active');
let browser;
try {
  browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROMIUM_EXECUTABLE || undefined,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage({
    viewport: {width: 1200, height: 820},
    acceptDownloads: true,
  });
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.setContent(html, {waitUntil: 'domcontentloaded'});
  await page.waitForFunction(() =>
    document.getElementById('syncLabel')?.textContent === 'Shared · Live',
    null, {timeout: 15000},
  );

  await page.locator('#exportQuick').click();
  assert.match(await page.locator('#exportFoot').innerText(), /Shared total: 260/);

  const csvEvent = page.waitForEvent('download');
  await page.locator('#exportCsvAll').click();
  const csv = await csvEvent;
  const csvText = readFileSync(await csv.path(), 'utf8');
  assert.match(csv.suggestedFilename(), /\.csv$/i);
  assert.match(csvText, /TEST-260/, 'Last job must be in CSV');
  assert.equal(csvText.trim().split(/\r?\n/).length, 261, 'CSV must contain a header and 260 rows');

  const backupEvent = page.waitForEvent('download');
  await page.locator('#exportBackup').click();
  const backup = JSON.parse(readFileSync(await (await backupEvent).path(), 'utf8'));
  assert.equal(backup.jobs.length, 260, 'JSON backup must contain all shared jobs');
  assert.equal(backup.jobs.at(-1).jobsheetFiles, 'TEST-260');

  const xlsxEvent = page.waitForEvent('download');
  await page.locator('#exportExcelAll').click();
  const workbook = await xlsxEvent;
  const xlsxBytes = readFileSync(await workbook.path());
  assert.match(workbook.suggestedFilename(), /\.xlsx$/i);
  assert.equal(xlsxBytes.subarray(0, 4).toString('hex'), '504b0304', 'XLSX should contain a ZIP workbook');
  assert.ok(xlsxBytes.byteLength > 1000, 'XLSX should not be empty');

  await page.evaluate(() => {
    window.KSOfficeWorkbook = {makeXlsx() {throw new Error('TEST-XLSX-FAILURE')}};
  });
  await page.locator('#exportExcelAll').click();
  assert.equal(await page.locator('#exportModal.open').count(), 1, 'Dialog stays open after XLSX failure');
  assert.match(await page.locator('#exportStatus').innerText(), /failed/i);
  assert.deepEqual(pageErrors, [], 'There must be no browser JavaScript errors');
  console.log('PASS V86.53 export browser v3: 260 CSV rows, 260 JSON jobs, valid XLSX, visible failure state');
} finally {
  await browser?.close();
}
