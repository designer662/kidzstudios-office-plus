import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtempSync,mkdirSync,readFileSync,rmSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const script=fileURLToPath(new URL('./generate-config.mjs',import.meta.url));
const dir=mkdtempSync(path.join(tmpdir(),'ks-public-config-'));
const sentinel='window.KS_SUPABASE_CONFIG = "untouched";\n';
const filename=path.join(dir,'public','supabase-config.js');
const jwt=role=>[
  Buffer.from(JSON.stringify({alg:'HS256',typ:'JWT'})).toString('base64url'),
  Buffer.from(JSON.stringify({role,iss:'supabase'})).toString('base64url'),
  'signature'
].join('.');
function check(key,shouldPass){
  writeFileSync(filename,sentinel);
  const response=spawnSync(process.execPath,[script],{cwd:dir,encoding:'utf8',env:{
    ...process.env,PUBLIC_SUPABASE_URL:'https://example.supabase.co',PUBLIC_SUPABASE_PUBLISHABLE_KEY:key
  }});
  assert.equal(response.status,shouldPass?0:1,`Unexpected config result: ${response.stderr}`);
  const output=readFileSync(filename,'utf8');
  if(shouldPass){
    assert(output.includes('window.KS_SUPABASE_CONFIG'));
    assert(output.includes(JSON.stringify(key)));
  }else{
    assert.equal(output,sentinel,'Failure must not overwrite a valid existing config');
    if(key)assert(!(`${response.stdout}${response.stderr}`).includes(key),'Never print credential values');
  }
}
try{
  mkdirSync(path.dirname(filename));
  check('sb_publishable_test_public_only',true);
  check(jwt('anon'),true);
  check(jwt('service_role'),false);
  check(jwt('authenticated'),false);
  check(jwt(''),false);
  check('eyJ',false);
  check('sb_secret_PRIVATE',false);
  check('',false);
  console.log('PASS config security: publishable + anon allowed; privileged/malformed keys rejected without exposure or overwrite.');
}finally{rmSync(dir,{recursive:true,force:true})}
