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
  let localRevision = 0;
  let conflicted = false;
  let conflictBanner = null;

  const GLOBAL_CONFIG_SCOPE='config:global';
  const DEFAULT_JOB_MANAGEMENT_URL='https://docs.google.com/spreadsheets/d/1ReoIszVRgyEzbnkq3MKM_Bn79Q1570PLQQvnRNEj3Eo/edit?gid=588550996#gid=588550996';
  const DEFAULT_GOOGLE_DRIVE_URL='https://drive.google.com/drive/u/1/folders/1YRobFB1O2BKBFn9VEOYOwQE2VUlFXR8B';
  let globalConfigVersion=0;
  let configRequest=null;
  let pullRequest=null;
  function applyGlobalConfig(payload={}){
    const jobUrl=String(payload.jobManagementUrl||DEFAULT_JOB_MANAGEMENT_URL).trim();
    const driveUrl=String(payload.googleDriveUrl||DEFAULT_GOOGLE_DRIVE_URL).trim();
    // The dashboard's Job Management links are deliberately local (V86.40).
    // Other tool pages retain their configurable external Sheets shortcut.
    if(page!=='index' && /^https?:\/\//i.test(jobUrl)){
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
  function pullGlobalConfig(){
    if(configRequest)return configRequest;
    configRequest=(async()=>{
      try{
        const res=await fetch(`${API}?scope=${encodeURIComponent(GLOBAL_CONFIG_SCOPE)}`,{cache:'no-store',headers:{accept:'application/json'}});
        if(res.status===404){applyGlobalConfig({});return}
        if(!res.ok)return;
        const row=await res.json(),version=Number(row.version||0);
        if(version>=globalConfigVersion){globalConfigVersion=version;applyGlobalConfig(row.payload||{})}
      }catch(_){}
    })().finally(()=>{configRequest=null});
    return configRequest;
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
    // Persist text, never arbitrary HTML: remote HTML in a shared form is a stored-XSS vector.
    if(el.isContentEditable) return {t:'contenteditable',v:el.innerText ?? el.textContent ?? '',plain:true};
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
  function apply(payload,{force=false}={}){
    if(!payload?.fields) return;
    applying=true;
    try{
      for(const [key,item] of Object.entries(payload.fields)){
        let el=null;
        if(key.startsWith('id:')) el=document.getElementById(key.slice(3));
        else if(key.startsWith('name:')) el=document.querySelector(`[name="${CSS.escape(key.slice(5))}"]`);
        else el=document.querySelector(`[data-sync-key="${CSS.escape(key)}"]`);
        if(!el || !isSyncable(el)) continue;
        if(!force && document.activeElement===el) continue;
        if(el instanceof HTMLInputElement){
          if(item.t==='checkbox') el.checked=Boolean(item.v);
          else if(item.t==='radio') el.checked=el.value===item.v;
          else el.value=item.v ?? '';
        }else if(el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement){
          el.value=item.v ?? '';
        }else if(el.isContentEditable){
          // Older snapshots may contain HTML. Render it literally instead of executing markup.
          el.textContent=String(item.v ?? '');
        }
        el.dispatchEvent(new Event('input',{bubbles:true}));
        el.dispatchEvent(new Event('change',{bubbles:true}));
      }
    }finally{applying=false}
  }
  // A stale shared snapshot must never replace edits from another browser silently.
  // Every save supplies the last observed database version; SQL rejects stale writes.
  function clearConflict(){
    conflicted=false;
    conflictBanner?.remove();
    conflictBanner=null;
  }
  function showConflict(){
    setStatus('conflict','Shared · Save conflict');
    if(conflictBanner)return;
    const panel=document.createElement('div');
    panel.id='ksSharedConflict';
    panel.setAttribute('role','alert');
    panel.style.cssText='position:fixed;z-index:10050;bottom:58px;right:16px;width:min(370px,calc(100vw - 32px));padding:16px;background:#fff7ed;color:#552b12;border:2px solid #dc782f;border-radius:12px;box-shadow:0 12px 36px #0003;font:13px/1.45 system-ui,sans-serif';
    const heading=document.createElement('strong');
    heading.textContent='Shared changes detected';
    const message=document.createElement('p');
    message.textContent='Another browser updated this page. Your unsaved edits are kept on screen. Choose how to resolve the conflict.';
    const actions=document.createElement('div');
    actions.style.cssText='display:flex;gap:8px;flex-wrap:wrap';
    const refresh=document.createElement('button');
    refresh.type='button';refresh.textContent='Load shared version';
    const override=document.createElement('button');
    override.type='button';override.textContent='Save my version';
    for(const button of [refresh,override])button.style.cssText='cursor:pointer;padding:9px 12px;border:1px solid #ac612c;background:white;color:#552b12;border-radius:8px;font:600 12px system-ui';
    refresh.addEventListener('click',async()=>{
      if(!window.confirm('Discard your unsaved changes on this page and load the latest shared version?'))return;
      refresh.disabled=true;
      const ok=await pull({force:true});
      if(ok){clearConflict();setStatus('live','Shared · Latest loaded');}
      refresh.disabled=false;
    });
    override.addEventListener('click',async()=>{
      if(!window.confirm('Replace the other browser’s shared changes with your current page values?'))return;
      override.disabled=true;
      try{
        const res=await fetch(`${API}?scope=${encodeURIComponent(scope)}`,{cache:'no-store'});
        if(!res.ok && res.status!==404)throw new Error(`HTTP ${res.status}`);
        lastVersion=res.status===404?0:Number((await res.json()).version||0);
        clearConflict();
        if(!await save(true))showConflict();
      }catch(_){showConflict();setStatus('offline','Shared · Retry failed');}
      finally{override.disabled=false;}
    });
    actions.append(refresh,override);
    panel.append(heading,message,actions);
    document.body.append(panel);
    conflictBanner=panel;
  }
  async function pull({initial=false,force=false}={}){
    if(conflicted&&!force)return false;
    try{
      const res=await fetch(`${API}?scope=${encodeURIComponent(scope)}`,{cache:'no-store',headers:{'accept':'application/json'}});
      if(res.status===404){
        if(initial)await save(true);
        return false;
      }
      if(!res.ok)throw new Error(`HTTP ${res.status}`);
      const row=await res.json();
      if((force||Number(row.version||0)>lastVersion) && row.payload){
        if(!force && (dirty||saving)){setStatus('saving','Shared · Local changes pending');return false;}
        apply(row.payload,{force});
        lastVersion=Number(row.version||0);
        lastHash=stableHash(row.payload);
        dirty=false;
      }
      setStatus('live','Shared · Live');
      return true;
    }catch(_){
      setStatus('offline',location.protocol==='file:'?'Local mode · deploy to sync':'Shared · Offline');
      return false;
    }
  }
  async function save(force=false){
    if(saving||applying||conflicted)return false;
    const payload=capture(),hash=stableHash(payload);
    if(!force&&hash===lastHash){dirty=false;return true;}
    const saveRevision=localRevision;
    let saved=false;
    saving=true;
    try{
      setStatus('saving','Shared · Saving');
      const res=await fetch(API,{method:'PUT',headers:{'content-type':'application/json','accept':'application/json'},body:JSON.stringify({scope,payload,clientId,expectedVersion:lastVersion||null})});
      if(res.status===409){conflicted=true;showConflict();return false;}
      if(!res.ok)throw new Error(`HTTP ${res.status}`);
      const row=await res.json();
      lastVersion=Number(row.version||lastVersion);
      lastHash=hash;
      // If a user typed while the request was in flight, that newer edit still needs saving.
      dirty=localRevision!==saveRevision;
      saved=true;
      setStatus(dirty?'saving':'live',dirty?'Shared · New edits pending':'Shared · Saved');
      return true;
    }catch(_){
      dirty=true; // Never mark an unsuccessful save as complete.
      setStatus('offline',location.protocol==='file:'?'Local mode · deploy to sync':'Shared · Save failed');
      return false;
    }finally{
      saving=false;
      if(saved&&dirty&&!conflicted){clearTimeout(saveTimer);saveTimer=setTimeout(()=>save(),250);}
    }
  }
  function queueSave(){
    if(applying)return;
    localRevision++;
    dirty=true;
    if(conflicted)return;
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
    window.addEventListener('online',()=>{if(dirty&&!conflicted)save();else pull();});
    // A pending save cannot be guaranteed to complete after a tab closes.
    // Warn before discarding local changes, including a save conflict.
    window.addEventListener('beforeunload',event=>{
      if(!dirty&&!saving&&!conflicted)return;
      event.preventDefault();
      event.returnValue='';
    });
    window.addEventListener('pagehide',()=>{if(dirty){clearTimeout(saveTimer);save(false)}});
    // GitHub Pages has no /api endpoint for sendBeacon. Visibility autosave above handles routine switches; periodic sync provides fallback.
    pullGlobalConfig();
    pull({initial:true});
    // Debounce duplicate realtime change notifications while preserving the existing poll fallback.
    function backgroundPull(){
      if(pullRequest||saving||conflicted||document.hidden)return;
      pullRequest=pull().finally(()=>{pullRequest=null});
    }
    window.addEventListener('ks:supabase-change',event=>{
      if(document.hidden || event.detail?.table!=='ks_shared_state')return;
      const row=event.detail?.payload?.data?.record;
      // Only fetch the relevant scope when Supabase supplies record metadata.
      if(row?.scope===GLOBAL_CONFIG_SCOPE){pullGlobalConfig();return;}
      if(row?.scope && row.scope!==scope)return;
      backgroundPull();
      if(!row?.scope)pullGlobalConfig();
    });
    let lastPoll=Date.now(),lastConfigPoll=Date.now();
    setInterval(()=>{
      if(document.hidden||saving||conflicted)return;
      const now=Date.now();
      const every=window.OfficeSupabase?.realtimeConnected?.()?45000:10000;
      if(now-lastPoll>=every){lastPoll=now;if(dirty)save();else backgroundPull();}
      // Global configuration rarely changes. 60s polling avoids one request
      // every 3.5s per staff device; Realtime still applies edits immediately.
      if(now-lastConfigPoll>=60000){lastConfigPoll=now;pullGlobalConfig();}
    },3500);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(start,450),{once:true});
  else setTimeout(start,450);
})();
