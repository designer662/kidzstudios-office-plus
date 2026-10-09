import {writeFileSync} from 'node:fs';
const url=(process.env.PUBLIC_SUPABASE_URL||'').trim().replace(/\/$/,'');
const key=(process.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY||'').trim();
if(!/^https:\/\/[a-z0-9.-]+\.supabase\.co$/i.test(url)) {
  console.error('Missing or invalid GitHub variable SUPABASE_URL (must be https://<ref>.supabase.co).');
  process.exit(1);
}
if(!key || !(/^(sb_publishable_|eyJ)/.test(key))) {
  console.error('Missing SUPABASE_PUBLISHABLE_KEY (use publishable or legacy anon key; NEVER service_role or sb_secret_).');
  process.exit(1);
}
writeFileSync('public/supabase-config.js',`window.KS_SUPABASE_CONFIG = Object.freeze(${JSON.stringify({url,publishableKey:key},null,2)});\n`);
console.log('Created public Supabase config for GitHub Pages (public keys only).');
