import {checkTypescriptScene} from './check-typescript-scene.mjs';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=readFileSync('source/src/office-scene.ts','utf8');
assert.match(source,/const humansById=new Map\(humans\.map\(/,'Staff index must be precomputed');
assert.match(source,/const nameLabelsById=new Map\(nameLabels\.map\(/,'Label index must be precomputed');
for(const token of [
 'humansById.get(l.id)', 'humansById.get(b.id)', 'humansById.get(update.id)',
 'nameLabelsById.get(tag.id)', 'nameLabelsById.get(update.id)', 'nameLabelsById.get(id)'
]) assert(source.includes(token),`Render/mood hot path should use direct lookup: ${token}`);
assert(!/nameLabels\.find\(|humans\.find\(/.test(source),'Hot path must avoid linear id scans');
// Check syntax with project-local compiler; no hardcoded global Node path.
const compiler=checkTypescriptScene(source);
console.log('PASS V86.43 3D optimization: O(1) staff/label indices, no repeated ID scans; syntax checked with '+compiler);
