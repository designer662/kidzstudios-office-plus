import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
let failures=0;
const required=['index.html','office-3d.js','supabase-config.js','supabase-bridge.js','job-management.html','shared-sync.js'];
for(const name of required){if(!existsSync(`public/${name}`)){console.error(`Missing public/${name}`);failures++;}}
const html=readdirSync('public').filter(n=>n.endsWith('.html'));
for(const name of html){const s=readFileSync(`public/${name}`,'utf8');
  if(!s.includes('supabase-bridge.js') || !s.includes('supabase-config.js')){console.error(`Missing Supabase adapter in ${name}`);failures++;}
}
for(const name of ['supabase-bridge.js','supabase-config.js','office-3d.js']){
  try{execFileSync(process.execPath,['--check',`public/${name}`],{stdio:'pipe'});}catch{console.error(`Invalid JS syntax: ${name}`);failures++;}
}
const sql=readFileSync('supabase/migrations/20261009000100_office_plus.sql','utf8');
for(const token of ['ks_save_shared_state','ks_post_chat','ENABLE ROW LEVEL SECURITY','ks_is_office_member']){
  if(!sql.includes(token)){console.error(`Missing SQL section ${token}`);failures++;}
}
console.log(`Checked ${html.length} HTML pages, 3 JS files, SQL schema; ${failures} error(s).`);
if(failures)process.exit(1);
