import {build} from 'esbuild';
await build({entryPoints:['src/suite-bridge.ts'],bundle:true,format:'iife',target:'es2020',minify:true,outfile:'office-3d.js',legalComments:'eof'});
