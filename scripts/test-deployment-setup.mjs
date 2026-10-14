import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const relative = file => path.join(root, file);
const workflowFile = relative('.github/workflows/deploy-pages.yml');
assert.ok(existsSync(workflowFile), 'Missing .github/workflows/deploy-pages.yml');

const workflow = readFileSync(workflowFile, 'utf8');
assert.match(workflow, /- name: Verify project layout\n\s+shell: bash\n\s+run: \|/, 'GitHub checkout preflight must run');
assert.match(workflow, /- name: Set up Node\n\s+uses: actions\/setup-node@v4/, 'Must use setup-node@v4');
assert.doesNotMatch(workflow, /^\s+cache:\s*npm\s*$/m, 'Avoid setup-node dependency cache path resolution failures');
assert.doesNotMatch(workflow, /^\s+cache-dependency-path:/m, 'Avoid missing lockfile cache-dependency-path failures');
assert.match(workflow, /npm ci --prefix source/, 'Keep deterministic dependency installation');
assert.match(workflow, /node scripts\/test-deployment-setup\.mjs/, 'Run regression test in CI');
assert.match(workflow, /path: public/, 'Keep the GitHub Pages deployment artifact path');

const p = 'source/package.json';
const l = 'source/package-lock.json';
assert.ok(existsSync(relative(p)), `Missing ${p}: copy extracted ZIP contents directly to repository root`);
assert.ok(existsSync(relative(l)), `Missing ${l}: copy extracted ZIP contents directly to repository root`);
const pkg = JSON.parse(readFileSync(relative(p), 'utf8'));
const lock = JSON.parse(readFileSync(relative(l), 'utf8'));
assert.ok(lock.packages?.[''], 'Lockfile missing root package entry');
for (const group of ['dependencies','devDependencies']) {
  assert.deepEqual(lock.packages[''][group] || {}, pkg[group] || {}, `source/package.json ${group} differs from lockfile`);
}
console.log('PASS deployment setup: root files, package lock alignment, cache-independent setup-node and Pages artifact path.');
