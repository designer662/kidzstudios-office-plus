/** Local-only authorized production restore. NEVER ship this into public/. */
import {readFileSync} from 'node:fs';
const url=(process.env.SUPABASE_URL||'').replace(/\/$/,'');
const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
const file=process.argv[2];
if(!file || !/^https:\/\/[a-z0-9.-]+\.supabase\.co$/.test(url) || !key){
  console.error('Usage: SUPABASE_URL=https://<ref>.supabase.co SUPABASE_SERVICE_ROLE_KEY=... node scripts/import-json.mjs ./backup.json');
  process.exit(1);
}
if(key.startsWith('sb_publishable_')){console.error('Restore requires local privileged key, not a publishable key.');process.exit(1);}
const dump=JSON.parse(readFileSync(file,'utf8'));
const state=(dump.sharedState||[]).map(r=>({scope:r.scope,payload:r.payload||{},version:Number(r.version||1),updated_at:r.updated_at||r.updatedAt||new Date().toISOString(),updated_by:r.updated_by||'restore'}));
const chat=(dump.chat||[]).map(r=>({id:Number(r.id),sender_id:r.sender_id??r.senderId??null,sender_name:r.sender_name||r.senderName||'Office',client_id:r.client_id||r.clientId||'',message:r.message,created_at:r.created_at||r.createdAt}));
const events=(dump.events||[]).map(r=>({id:Number(r.id),event_type:r.event_type||r.eventType,title:r.title,message:r.message||'',employee_id:r.employee_id??r.employeeId??null,metadata:r.metadata||{},dedupe_key:r.dedupe_key||r.dedupeKey||null,source_client:r.source_client||r.sourceClient||'',created_at:r.created_at||r.createdAt}));
async function insert(table,rows){
  for(let i=0;i<rows.length;i+=100){
    const chunk=rows.slice(i,i+100);
    const response=await fetch(`${url}/rest/v1/${table}?on_conflict=${table==='ks_shared_state'?'scope':'id'}`,{
      method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify(chunk)
    });
    if(!response.ok)throw new Error(`Restore ${table} (${response.status}): ${(await response.text()).slice(0,500)}`);
    console.log(`${table}: ${Math.min(i+100,rows.length)}/${rows.length}`);
  }
}
console.log('Restoring from local backup. Use only on an empty/staging Supabase project.');
await insert('ks_shared_state',state);
await insert('ks_office_chat',chat);
await insert('ks_office_events',events);
console.log('Restore requests completed. Verify counts, sequences and RLS in Supabase SQL Editor.');
