(() => {
  'use strict';
  const API = '/api/state';
  const basename = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const page = basename.replace(/\.html?$/, '') || 'index';
  const scope = `page:${page}`;
  const clientId = (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const skipIds = new Set(['clientSearch','search','wa_target_number']);
  const skipTypes = new Set(['file','password','button','submit','reset','hidden','image']);
  let applying = false;
  let saving = false;
  let dirty = false;
  let saveTimer = null;
  let lastVersion = 0;
  let lastHash = '';
  let started = false;

  const GLOBAL_CONFIG_SCOPE='config:global';
  const DEFAULT_JOB_MANAGEMENT_URL='https://docs.google.com/spreadsheets/d/1ReoIszVRgyEzbnkq3MKM_Bn79Q1570PLQQvnRNEj3Eo/edit?gid=588550996#gid=588550996';
  const DEFAULT_GOOGLE_DRIVE_URL='https://drive.google.com/drive/u/1/folders/1YRobFB1O2BKBFn9VEOYOwQE2VUlFXR8B';
  let globalConfigVersion=0;
  function applyGlobalConfig(payload={}){
    const jobUrl=String(payload.jobManagementUrl||DEFAULT_JOB_MANAGEMENT_URL).trim();
    const driveUrl=String(payload.googleDriveUrl||DEFAULT_GOOGLE_DRIVE_URL).trim();
    if(/^https?:\/\//i.test(jobUrl)){
      document.querySelectorAll('a').forEach(a=>{
        const looksDefault=(a.getAttribute('href')||'').includes('docs.google.com/spreadsheets/d/1ReoIszVRgyEzbnkq3MKM_Bn79Q1570PLQQvnRNEj3Eo');
        const sharedJobLink=a.hasAttribute('data-shared-job-link')||a.id==='jobManagementResource'||a.classList.contains('ops-open-sheet');
        if(sharedJobLink||looksDefault){a.href=jobUrl;a.target='_blank';a.rel='noopener noreferrer'}
      });
      window.dispatchEvent(new CustomEvent('ks:job-management-url',{detail:{url:jobUrl}}));
    }
    if(/^https?:\/\//i.test(driveUrl)){
      document.querySelectorAll('a[data-shared-drive],a[data-tool="Google Drive"]').forEach(a=>{a.href=driveUrl;a.target='_blank';a.rel='noopener noreferrer'});
      window.dispatchEvent(new CustomEvent('ks:google-drive-url',{detail:{url:driveUrl}}));
    }
  }
  async function pullGlobalConfig(){
    try{
      const res=await fetch(`${API}?scope=${encodeURIComponent(GLOBAL_CONFIG_SCOPE)}`,{cache:'no-store',headers:{accept:'application/json'}});
      if(res.status===404){applyGlobalConfig({});return}
      if(!res.ok)return;
      const row=await res.json(),version=Number(row.version||0);
      if(version>=globalConfigVersion){globalConfigVersion=version;applyGlobalConfig(row.payload||{})}
    }catch(_){}
  }

  function statusNode(){
    let el=document.getElementById('ksSharedStatus');
    if(el) return el;
    el=document.createElement('div');
    el.id='ksSharedStatus';
    el.className='ks-shared-status';
    el.innerHTML='<i></i><span>Shared · Connecting</span>';
    document.body.appendChild(el);
    return el;
  }
  function setStatus(mode,text){
    const el=statusNode();
    el.dataset.mode=mode;
    el.querySelector('span').textContent=text;
  }
  function keyFor(el){
    if(el.dataset.syncKey) return el.dataset.syncKey;
    if(el.id) return `id:${el.id}`;
    if(el.name) return `name:${el.name}`;
    return null;
  }
  function isSyncable(el){
    if(!(el instanceof HTMLElement)) return false;
    if(el.closest('[data-sync-ignore],.no-sync,.modal-overlay')) return false;
    if(skipIds.has(el.id)) return false;
    if(el.matches('input') && skipTypes.has((el.type||'text').toLowerCase())) return false;
    if(el.matches('input,select,textarea,[contenteditable="true"]')) return Boolean(keyFor(el));
    return false;
  }
  function readValue(el){
    if(el instanceof HTMLInputElement){
      const type=(el.type||'text').toLowerCase();
      if(type==='checkbox') return {t:'checkbox',v:el.checked};
      if(type==='radio') return {t:'radio',v:el.checked?el.value:null};
      return {t:type,v:el.value};
    }
    if(el instanceof HTMLSelectElement) return {t:'select',v:el.value};
    if(el instanceof HTMLTextAreaElement) return {t:'textarea',v:el.value};
    if(el.isContentEditable) return {t:'contenteditable',v:el.innerHTML};
    return null;
  }
  function capture(){
    const fields={};
    document.querySelectorAll('input,select,textarea,[contenteditable="true"]').forEach(el=>{
      if(!isSyncable(el)) return;
      const k=keyFor(el), val=readValue(el);
      if(k&&val) fields[k]=val;
    });
    return {fields};
  }
  function stableHash(payload){
    try{return JSON.stringify(payload)}catch(_){return ''}
  }
  function apply(payload){
    if(!payload?.fields) return;
    applying=true;
    try{
      for(const [key,item] of Object.entries(payload.fields)){
        let el=null;
        if(key.startsWith('id:')) el=document.getElementById(key.slice(3));
        else if(key.startsWith('name:')) el=document.querySelector(`[name="${CSS.escape(key.slice(5))}"]`);
        else el=document.querySelector(`[data-sync-key="${CSS.escape(key)}"]`);
        if(!el || !isSyncable(el)) continue;
        if(document.activeElement===el) continue;
        if(el instanceof HTMLInputElement){
          if(item.t==='checkbox') el.checked=Boolean(item.v);
          else if(item.t==='radio') el.checked=el.value===item.v;
          else el.value=item.v ?? '';
        }else if(el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement){
          el.value=item.v ?? '';
        }else if(el.isContentEditable){
          el.innerHTML=item.v ?? '';
        }
        el.dispatchEvent(new Event('input',{bubbles:true}));
        el.dispatchEvent(new Event('change',{bubbles:true}));
      }
    }finally{applying=false}
  }
  async function pull({initial=false}={}){
    try{
      const res=await fetch(`${API}?scope=${encodeURIComponent(scope)}`,{cache:'no-store',headers:{'accept':'application/json'}});
      if(res.status===404){
        if(initial) await save(true);
        return;
      }
      if(!res.ok) throw new Error(`HTTP ${res.status}`);
      const row=await res.json();
      if(Number(row.version||0)>lastVersion && row.payload){
        apply(row.payload);
        lastVersion=Number(row.version||0);
        lastHash=stableHash(row.payload);
        dirty=false;
      }
      setStatus('live','Shared · Live');
    }catch(err){
      setStatus('offline',location.protocol==='file:'?'Local mode · deploy to sync':'Shared · Offline');
    }
  }
  async function save(force=false){
    if(saving || applying) return;
    const payload=capture(), hash=stableHash(payload);
    if(!force && hash===lastHash){dirty=false;return}
    saving=true;
    try{
      setStatus('saving','Shared · Saving');
      const res=await fetch(API,{method:'PUT',headers:{'content-type':'application/json','accept':'application/json'},body:JSON.stringify({scope,payload,clientId})});
      if(!res.ok) throw new Error(`HTTP ${res.status}`);
      const row=await res.json();
      lastVersion=Number(row.version||lastVersion);
      lastHash=hash;
      dirty=false;
      setStatus('live','Shared · Saved');
    }catch(err){
      setStatus('offline',location.protocol==='file:'?'Local mode · deploy to sync':'Shared · Save failed');
    }finally{saving=false}
  }
  function queueSave(){
    if(applying) return;
    dirty=true;
    clearTimeout(saveTimer);
    saveTimer=setTimeout(()=>save(false),650);
  }
  function start(){
    if(started) return; started=true;
    statusNode();
    document.addEventListener('input',e=>{if(isSyncable(e.target)) queueSave()},{passive:true});
    document.addEventListener('change',e=>{if(isSyncable(e.target)) queueSave()},{passive:true});
    document.addEventListener('focusout',e=>{if(isSyncable(e.target) && dirty) queueSave()});
    document.addEventListener('visibilitychange',()=>{if(document.hidden){if(dirty) save(false)}else pull()});
    window.addEventListener('online',()=>pull());
    // GitHub Pages has no /api endpoint for sendBeacon. Visibility autosave above handles routine switches; periodic sync provides fallback.
    pullGlobalConfig();
    pull({initial:true});
    window.addEventListener('ks:supabase-change',event=>{
      if(document.hidden || saving || event.detail?.table!=='ks_shared_state')return;
      pull();pullGlobalConfig();
    });
    setInterval(()=>{if(!document.hidden&&!saving){pull();pullGlobalConfig()}},3500);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(start,450),{once:true});
  else setTimeout(start,450);
})();
