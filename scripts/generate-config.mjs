import {writeFileSync} from 'node:fs';
const url=(process.env.PUBLIC_SUPABASE_URL||'').trim().replace(/\/$/,'');
const key=(process.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY||'').trim();
if(!/^https:\/\/[a-z0-9.-]+\.supabase\.co$/i.test(url)) {
  console.error('Missing or invalid GitHub variable SUPABASE_URL (must be https://<ref>.supabase.co).');
  process.exit(1);
}
// This file is published to every visitor by GitHub Pages. Legacy JWTs must
// be explicitly anonymous: a service_role JWT also starts with `eyJ`.
function isPublicKey(value){
  if(value.startsWith('sb_publishable_'))return value.length>'sb_publishable_'.length;
  const parts=value.split('.');
  if(parts.length!==3||!parts.every(p=>/^[A-Za-z0-9_-]+$/.test(p)))return false;
  try{
    const claims=JSON.parse(Buffer.from(parts[1],'base64url').toString('utf8'));
    return claims?.role==='anon';
  }catch{return false}
}
if(!isPublicKey(key)){
  console.error('Missing or invalid SUPABASE_PUBLISHABLE_KEY (only sb_publishable_ or legacy anon-role JWT allowed; NEVER service_role or sb_secret_).');
  process.exit(1);
}
writeFileSync('public/supabase-config.js',`window.KS_SUPABASE_CONFIG = Object.freeze(${JSON.stringify({url,publishableKey:key},null,2)});\n`);
console.log('Created public Supabase config for GitHub Pages (public keys only).');
