(() => {
  'use strict';
  const header=document.querySelector('.ks-master-header');
  if(!header)return;

  const TEMP_KEY='ksTempUserV1';
  const BROWSER_KEY='ksTempBrowserIdV1';
  const safeGet=(key)=>{try{return localStorage.getItem(key)}catch(_){return null}};
  const safeSet=(key,val)=>{try{localStorage.setItem(key,val);return true}catch(_){return false}};
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const makeId=()=>`PC-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
  let browserId=safeGet(BROWSER_KEY);
  if(!browserId){browserId=makeId();safeSet(BROWSER_KEY,browserId)}

  function readTempUser(){
    try{
      const raw=safeGet(TEMP_KEY),parsed=raw?JSON.parse(raw):null;
      const name=String(parsed?.name||'').trim();
      return {name:name||browserId,browserId,custom:Boolean(name&&name!==browserId),updatedAt:Number(parsed?.updatedAt)||0};
    }catch(_){return{name:browserId,browserId,custom:false,updatedAt:0}}
  }
  function writeTempUser(name){
    const clean=String(name||'').trim().replace(/\s+/g,' ').slice(0,42)||browserId;
    const profile={name:clean,browserId,updatedAt:Date.now()};
    safeSet(TEMP_KEY,JSON.stringify(profile));
    updateTempUserUI();
    window.dispatchEvent(new CustomEvent('ks-temp-user-changed',{detail:{...profile,custom:clean!==browserId}}));
    return {...profile,custom:clean!==browserId};
  }
  function resetTempUser(){return writeTempUser(browserId)}
  window.KSTempUser={get:readTempUser,set:writeTempUser,reset:resetTempUser,browserId};

  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const nav=header.querySelector('.tool-nav');
  const brand=header.querySelector('.brand');
  const homeIcon='<svg aria-hidden="true" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></svg>';
  if(brand){
    // Brand is a real home link rather than a click handler on a non-interactive div.
    brand.textContent='';
    const home=document.createElement('a'); home.href='index.html';home.className='ks-home-pill';
    home.innerHTML=homeIcon+'<span>Kidzstudios Office</span>';
    home.setAttribute('aria-label','Kidzstudios Office — Home');
    if(path==='index.html'){home.classList.add('active');home.setAttribute('aria-current','page')}
    brand.appendChild(home);
  }
  if(nav&&!nav.querySelector('a[href="report.html"]')){
    const report=document.createElement('a');report.href='report.html';report.className='tool-nav-btn';report.dataset.tool='Reports';
    report.innerHTML='<span class="nav-tool-icon" aria-hidden="true">▥</span><span>Reports</span>';
    const job=nav.querySelector('a[href="job-management.html"]');
    if(job)job.after(report);else nav.prepend(report);
  }
  const tools=[...header.querySelectorAll('.tool-nav-btn')];
  tools.forEach(a=>{const href=(a.getAttribute('href')||'').split('#')[0].toLowerCase();const active=path===href;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});

  // Browser-local operator identity. This is deliberately NOT a login/account and is never stored as a shared profile.
  const style=document.createElement('style');style.id='ks-temp-user-style';style.textContent=`
  .temp-user-chip{height:42px;max-width:170px;display:flex;align-items:center;gap:8px;padding:0 10px 0 7px;border:1px solid rgba(29,32,34,.09);border-radius:12px;background:#fff;color:#60656a;cursor:pointer;transition:.18s;white-space:nowrap;overflow:hidden}
  .temp-user-chip:hover{border-color:rgba(239,123,69,.25);background:#fff8f3;color:#c15e30;transform:translateY(-1px)}
  .temp-user-avatar{width:28px;height:28px;border-radius:9px;display:grid;place-items:center;flex:0 0 auto;background:rgba(239,123,69,.12);color:#d46634;font:850 10px/1 Inter,Arial,sans-serif}
  .temp-user-copy{min-width:0;display:grid;text-align:left;line-height:1.05}.temp-user-copy b{font:780 10px/1.1 Inter,Arial,sans-serif;overflow:hidden;text-overflow:ellipsis;max-width:100px}.temp-user-copy small{margin-top:3px;color:#9a9ea2;font:760 10px/1 Inter,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase}
  .temp-user-modal{position:fixed;inset:0;z-index:12050;display:none;align-items:center;justify-content:center;padding:18px;background:rgba(22,24,26,.26);backdrop-filter:blur(8px)}.temp-user-modal.open{display:flex}
  .temp-user-dialog{width:min(430px,100%);background:#fff;border:1px solid rgba(29,32,34,.1);border-radius:22px;box-shadow:0 28px 90px rgba(25,28,30,.2);padding:17px;color:#202326;font-family:Inter,Arial,sans-serif}
  .temp-user-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.temp-user-head span{display:block;color:#92969a;font-size:10px;font-weight:850;letter-spacing:.09em;text-transform:uppercase}.temp-user-head strong{display:block;margin-top:4px;font-size:18px;letter-spacing:-.035em}.temp-user-close{width:34px;height:34px;border:1px solid rgba(29,32,34,.09);border-radius:11px;background:#fff;color:#777c80;font-size:18px;cursor:pointer}
  .temp-user-note{margin:12px 0;padding:10px 11px;border-radius:12px;background:#fafaf8;color:#777c80;font-size:10px;line-height:1.5}.temp-user-note b{color:#34383b}
  .temp-user-field{display:grid;gap:6px}.temp-user-field label{font-size:10px;color:#858a8e;font-weight:850;letter-spacing:.07em;text-transform:uppercase}.temp-user-field input{height:43px;border:1px solid rgba(29,32,34,.11);border-radius:12px;background:#f8f8f6;padding:0 12px;font-size:11px;outline:none}.temp-user-field input:focus{background:#fff;border-color:rgba(239,123,69,.36);box-shadow:0 0 0 3px rgba(239,123,69,.07)}
  .temp-user-suggestions{display:flex;gap:6px;flex-wrap:wrap;margin-top:9px}.temp-user-suggestion{border:1px solid rgba(29,32,34,.08);border-radius:999px;background:#fff;padding:7px 9px;color:#666b6f;font-size:10px;font-weight:760;cursor:pointer}.temp-user-suggestion:hover{background:#fff5ef;color:#c15e30;border-color:rgba(239,123,69,.2)}
  .temp-user-meta{margin-top:10px;color:#a0a4a8;font-size:10px}.temp-user-actions{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:15px;padding-top:13px;border-top:1px solid rgba(29,32,34,.08)}.temp-user-secondary,.temp-user-primary{height:38px;border-radius:11px;padding:0 13px;font-size:10px;font-weight:800;cursor:pointer}.temp-user-secondary{border:1px solid rgba(29,32,34,.09);background:#fff;color:#72777b}.temp-user-primary{border:1px solid #e8743f;background:#ef7b45;color:#fff;box-shadow:0 8px 18px rgba(239,123,69,.16)}
  @media(max-width:920px){.temp-user-chip{max-width:120px}.temp-user-copy b{max-width:60px}}@media(max-width:620px){.temp-user-copy{display:none}.temp-user-chip{width:42px;padding:0;justify-content:center}.temp-user-avatar{width:28px;height:28px}}@media print{.temp-user-chip,.temp-user-modal{display:none!important}}
  `;document.head.appendChild(style);

  const headerTools=header.querySelector('.header-tools');
  let tempBtn=null,tempModal=null,tempInput=null,tempSuggestions=null;
  const initials=name=>String(name||'PC').split(/\s+/).filter(Boolean).map(x=>x[0]).slice(0,2).join('').toUpperCase()||'PC';
  if(headerTools){
    tempBtn=document.createElement('button');tempBtn.type='button';tempBtn.className='temp-user-chip';tempBtn.id='tempUserBtn';tempBtn.title='Temporary user for this browser / PC';tempBtn.setAttribute('aria-label','Set temporary user for this browser');
    const notification=headerTools.querySelector('.notification-wrap');headerTools.insertBefore(tempBtn,notification||headerTools.firstChild);
    tempModal=document.createElement('div');tempModal.className='temp-user-modal';tempModal.id='tempUserModal';tempModal.setAttribute('aria-hidden','true');
    tempModal.innerHTML=`<div class="temp-user-dialog" role="dialog" aria-modal="true" aria-labelledby="tempUserTitle"><div class="temp-user-head"><div><span>Browser-local identity</span><strong id="tempUserTitle">Temporary User</strong></div><button class="temp-user-close" type="button" aria-label="Close">×</button></div><div class="temp-user-note"><b>Saved only on this browser / PC.</b> It is not an account, password or permission system. The name is used as an operator tag in office activity.</div><div class="temp-user-field"><label for="tempUserInput">Name / PC label</label><input id="tempUserInput" maxlength="42" autocomplete="off" placeholder="Afiq, Nisa, Admin PC…" list="tempUserStaffList"><datalist id="tempUserStaffList"></datalist></div><div class="temp-user-suggestions" id="tempUserSuggestions"></div><div class="temp-user-meta" id="tempUserMeta"></div><div class="temp-user-actions"><button class="temp-user-secondary" id="tempUserReset" type="button">Use PC ID</button><button class="temp-user-primary" id="tempUserSave" type="button">Save on this browser</button></div></div>`;
    document.body.appendChild(tempModal);tempInput=tempModal.querySelector('#tempUserInput');tempSuggestions=tempModal.querySelector('#tempUserSuggestions');
    const openTemp=()=>{const p=readTempUser();tempInput.value=p.name===browserId?'':p.name;tempModal.querySelector('#tempUserMeta').textContent=`Browser ID: ${browserId} · this setting stays on this browser only`;tempModal.classList.add('open');tempModal.setAttribute('aria-hidden','false');setTimeout(()=>tempInput.focus(),40);loadStaffSuggestions()};
    const closeTemp=()=>{const wasOpen=tempModal.classList.contains('open');tempModal.classList.remove('open');tempModal.setAttribute('aria-hidden','true');if(wasOpen)tempBtn.focus()};
    tempBtn.addEventListener('click',openTemp);tempModal.querySelector('.temp-user-close').addEventListener('click',closeTemp);tempModal.addEventListener('pointerdown',e=>{if(e.target===tempModal)closeTemp()});
    tempModal.querySelector('#tempUserSave').addEventListener('click',()=>{writeTempUser(tempInput.value);closeTemp()});
    tempModal.querySelector('#tempUserReset').addEventListener('click',()=>{resetTempUser();closeTemp()});
    tempInput.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();writeTempUser(tempInput.value);closeTemp()}if(e.key==='Escape')closeTemp()});
    tempSuggestions.addEventListener('click',e=>{const b=e.target.closest('[data-temp-name]');if(!b)return;tempInput.value=b.dataset.tempName;tempInput.focus()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&tempModal.classList.contains('open'))closeTemp()});
  }
  function updateTempUserUI(){if(!tempBtn)return;const p=readTempUser();tempBtn.innerHTML=`<span class="temp-user-avatar">${esc(initials(p.name))}</span><span class="temp-user-copy"><b>${esc(p.name)}</b><small>${p.custom?'Temp user':'This PC'}</small></span>`;tempBtn.title=`Temporary user: ${p.name} · ${browserId}`}
  async function loadStaffSuggestions(){if(!tempSuggestions)return;try{const r=await fetch('/api/state?scope=office%3Astaff',{cache:'no-store',headers:{accept:'application/json'}});if(!r.ok)return;const row=await r.json(),list=Array.isArray(row?.payload?.staff)?row.payload.staff:Array.isArray(row?.payload?.records)?row.payload.records:[];const names=[...new Set(list.map(x=>String(x?.name||'').trim()).filter(Boolean))].slice(0,10);const dl=tempModal.querySelector('#tempUserStaffList');if(dl)dl.innerHTML=names.map(n=>`<option value="${esc(n)}"></option>`).join('');tempSuggestions.innerHTML=names.slice(0,6).map(n=>`<button type="button" class="temp-user-suggestion" data-temp-name="${esc(n)}">${esc(n)}</button>`).join('')}catch(_){}}
  updateTempUserUI();

  // One notification controller for ALL HTML pages, including the dashboard.
  // Feed: authenticated Supabase events; seen/clear state: browser localStorage.
  // Never mix in browser-only activity or temporary user UI messages.
  const btn=header.querySelector('#notificationBtn');
  const panel=header.querySelector('#notificationPanel');
  const nlist=header.querySelector('#notificationList');
  const badge=header.querySelector('#notificationUnread');
  const clear=header.querySelector('#notificationClearBtn');
  const subheading=panel?.querySelector('.notification-panel-head span');
  if(subheading)subheading.textContent='Shared office updates';
  const KEY_SEEN='ksSharedEventSeenV2',KEY_CLEARED='ksSharedEventClearedV2';
  const readNumber=key=>{try{return Math.max(0,Number(localStorage.getItem(key)||0)||0)}catch(_){return 0}};
  const saveNumber=(key,value)=>{try{localStorage.setItem(key,String(value))}catch(_){}};
  let events=[],seen=readNumber(KEY_SEEN),cleared=readNumber(KEY_CLEARED);
  let baselineId=null,loading=false,needsRefresh=false,lastFetch=0,active=true,open=false;
  const clock=value=>{const d=new Date(value);return Number.isNaN(d.getTime())?'--:--':d.toLocaleTimeString('en-MY',{hour:'2-digit',minute:'2-digit',hour12:false})};
  const timeAgo=value=>{const t=new Date(value).getTime();if(!Number.isFinite(t))return'';const s=Math.max(0,Math.floor((Date.now()-t)/1000));return s<60?'now':s<3600?`${Math.floor(s/60)}m`:s<86400?`${Math.floor(s/3600)}h`:`${Math.floor(s/86400)}d`};
  const validEvent=event=>Number.isSafeInteger(Number(event?.id))&&Number(event.id)>0&&Boolean(event?.eventType||event?.title);
  const latest=()=>events.reduce((max,event)=>Math.max(max,Number(event.id)||0),0);
  function draw(){
    if(!nlist)return;
    const displayed=events.filter(event=>Number(event.id)>cleared);
    nlist.innerHTML=displayed.length?[...displayed].reverse().slice(0,30).map(event=>{
      const actor=String(event?.metadata?.actor?.name||'').trim();
      return `<div class="notification-item"><b>${esc(event.title||'Office update')}</b><span>${esc(event.message||'')}${actor?` · by ${esc(actor)}`:''}</span><time>${esc(clock(event.createdAt))} · ${esc(timeAgo(event.createdAt))}</time></div>`;
    }).join(''):'<div class="notification-empty">No new shared office updates.</div>';
    const unread=displayed.filter(event=>Number(event.id)>seen).length;
    if(badge){badge.textContent=String(Math.min(99,unread));badge.hidden=!unread}
    btn?.classList.toggle('has-unread',unread>0);
  }
  function setOpen(value){
    open=Boolean(value);panel?.classList.toggle('open',open);
    panel?.setAttribute('aria-hidden',String(!open));btn?.setAttribute('aria-expanded',String(open));
    if(open){seen=Math.max(seen,latest());saveNumber(KEY_SEEN,seen);draw();if(Date.now()-lastFetch>2500)pull()}
  }
  async function pull(){
    if(!active)return;
    if(loading){needsRefresh=true;return}
    loading=true;
    try{
      const res=await fetch('/api/events?limit=100',{cache:'no-store',headers:{accept:'application/json'}});
      if(!res.ok)throw new Error(`HTTP ${res.status}`);
      const data=await res.json();
      const next=Array.isArray(data.events)?data.events.filter(validEvent):[];
      const maxId=next.reduce((max,event)=>Math.max(max,Number(event.id)||0),0);
      if(baselineId===null){
        // A newly opened page must not ring for its historical feed.
        baselineId=maxId;
        if(!seen){seen=maxId;saveNumber(KEY_SEEN,seen)}
      }else if(maxId>baselineId){
        const recent=next.filter(event=>Number(event.id)>baselineId&&Number(event.id)>cleared&&Date.now()-new Date(event.createdAt||0).getTime()<120000);
        if(recent.length&&!document.hidden)window.KSNotificationSound?.play(recent.some(event=>event.eventType==='chat_message')?'chat_message':'update');
        baselineId=maxId;
      }
      // Event ids are ascending monotonically; keep the snapshot consistent on every page.
      events=next;lastFetch=Date.now();
      if(open){seen=Math.max(seen,maxId);saveNumber(KEY_SEEN,seen)}
      draw();
    }catch(_){
      if(baselineId===null&&nlist)nlist.innerHTML='<div class="notification-empty">Shared notifications unavailable. Reconnecting…</div>';
    }finally{loading=false;if(needsRefresh){needsRefresh=false;pull()}}
  }
  btn?.addEventListener('click',event=>{event.stopPropagation();setOpen(!open)});
  clear?.addEventListener('click',event=>{
    event.stopPropagation();cleared=Math.max(cleared,latest());seen=Math.max(seen,cleared);
    saveNumber(KEY_CLEARED,cleared);saveNumber(KEY_SEEN,seen);draw();
  });
  document.addEventListener('pointerdown',event=>{if(open&&!header.querySelector('.notification-wrap')?.contains(event.target))setOpen(false)});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&open)setOpen(false)});
  window.addEventListener('storage',event=>{
    if(event.key===KEY_SEEN||event.key===KEY_CLEARED){seen=readNumber(KEY_SEEN);cleared=readNumber(KEY_CLEARED);draw()}
  });
  window.addEventListener('ks:supabase-change',event=>{if(event.detail?.table==='ks_office_events'&&!document.hidden)pull()});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)pull()});
  window.addEventListener('focus',()=>{if(Date.now()-lastFetch>5000)pull()});
  window.addEventListener('pagehide',()=>{active=false},{once:true});
  window.KSSharedNotifications=Object.freeze({setOpen,refresh:pull});
  pull();
  setInterval(()=>{if(!document.hidden)pull()},15000);
  if(location.hash==='#notifications')setTimeout(()=>setOpen(true),150);
  window.addEventListener('hashchange',()=>{if(location.hash==='#notifications')setOpen(true)});
})();
