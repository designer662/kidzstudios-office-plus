import {build} from 'esbuild';
import {readFileSync,writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {sourceDigest,bundleDigest} from '../../scripts/3d-build-integrity.mjs';

const source=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const root=path.resolve(source,'..');
const output=path.join(root,'public','office-3d.js');
await build({entryPoints:[path.join(source,'src','suite-bridge.ts')],bundle:true,format:'iife',target:'es2020',minify:true,outfile:output,legalComments:'eof'});
const packageVersion=JSON.parse(readFileSync(path.join(source,'package.json'),'utf8')).version;
writeFileSync(path.join(root,'public','office-3d-build.json'),JSON.stringify({
  schema:1,packageVersion,sourceSha256:sourceDigest(root),bundleSha256:bundleDigest(output),
  compiledAt:new Date().toISOString()
},null,2)+'\n');
console.log('Built public/office-3d.js and recorded source/bundle integrity.');
