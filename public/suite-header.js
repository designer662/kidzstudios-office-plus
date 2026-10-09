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

  const tools=[...header.querySelectorAll('.tool-nav-btn')];
  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const activeMap={
    'job-management.html':'job-management.html','pricelist-calculator.html':'pricelist-calculator.html','markup-calculator.html':'markup-calculator.html',
    'orderform1.html':'orderform1.html','orderform2.html':'orderform2.html','commission.html':'commission.html',
    'file-name-generator.html':'file-name-generator.html','files-compress.html':'files-compress.html'
  };
  tools.forEach(a=>{const href=(a.getAttribute('href')||'').split('#')[0].toLowerCase();const active=activeMap[path]===href;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  const brand=header.querySelector('.brand');
  if(brand){brand.setAttribute('role','link');brand.setAttribute('tabindex','0');brand.setAttribute('title','Open Office Dashboard');const go=()=>{if(path!=='index.html'&&path!=='')location.href='index.html'};brand.addEventListener('click',go);brand.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}})}

  // Browser-local operator identity. This is deliberately NOT a login/account and is never stored as a shared profile.
  const style=document.createElement('style');style.id='ks-temp-user-style';style.textContent=`
  .temp-user-chip{height:42px;max-width:170px;display:flex;align-items:center;gap:8px;padding:0 10px 0 7px;border:1px solid rgba(29,32,34,.09);border-radius:12px;background:#fff;color:#60656a;cursor:pointer;transition:.18s;white-space:nowrap;overflow:hidden}
  .temp-user-chip:hover{border-color:rgba(239,123,69,.25);background:#fff8f3;color:#c15e30;transform:translateY(-1px)}
  .temp-user-avatar{width:28px;height:28px;border-radius:9px;display:grid;place-items:center;flex:0 0 auto;background:rgba(239,123,69,.12);color:#d46634;font:850 9px/1 Inter,Arial,sans-serif}
  .temp-user-copy{min-width:0;display:grid;text-align:left;line-height:1.05}.temp-user-copy b{font:780 9.4px/1.1 Inter,Arial,sans-serif;overflow:hidden;text-overflow:ellipsis;max-width:100px}.temp-user-copy small{margin-top:3px;color:#9a9ea2;font:760 6.5px/1 Inter,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase}
  .temp-user-modal{position:fixed;inset:0;z-index:12050;display:none;align-items:center;justify-content:center;padding:18px;background:rgba(22,24,26,.26);backdrop-filter:blur(8px)}.temp-user-modal.open{display:flex}
  .temp-user-dialog{width:min(430px,100%);background:#fff;border:1px solid rgba(29,32,34,.1);border-radius:22px;box-shadow:0 28px 90px rgba(25,28,30,.2);padding:17px;color:#202326;font-family:Inter,Arial,sans-serif}
  .temp-user-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.temp-user-head span{display:block;color:#92969a;font-size:7px;font-weight:850;letter-spacing:.09em;text-transform:uppercase}.temp-user-head strong{display:block;margin-top:4px;font-size:18px;letter-spacing:-.035em}.temp-user-close{width:34px;height:34px;border:1px solid rgba(29,32,34,.09);border-radius:11px;background:#fff;color:#777c80;font-size:18px;cursor:pointer}
  .temp-user-note{margin:12px 0;padding:10px 11px;border-radius:12px;background:#fafaf8;color:#777c80;font-size:9px;line-height:1.5}.temp-user-note b{color:#34383b}
  .temp-user-field{display:grid;gap:6px}.temp-user-field label{font-size:7.5px;color:#858a8e;font-weight:850;letter-spacing:.07em;text-transform:uppercase}.temp-user-field input{height:43px;border:1px solid rgba(29,32,34,.11);border-radius:12px;background:#f8f8f6;padding:0 12px;font-size:11px;outline:none}.temp-user-field input:focus{background:#fff;border-color:rgba(239,123,69,.36);box-shadow:0 0 0 3px rgba(239,123,69,.07)}
  .temp-user-suggestions{display:flex;gap:6px;flex-wrap:wrap;margin-top:9px}.temp-user-suggestion{border:1px solid rgba(29,32,34,.08);border-radius:999px;background:#fff;padding:7px 9px;color:#666b6f;font-size:8px;font-weight:760;cursor:pointer}.temp-user-suggestion:hover{background:#fff5ef;color:#c15e30;border-color:rgba(239,123,69,.2)}
  .temp-user-meta{margin-top:10px;color:#a0a4a8;font-size:8px}.temp-user-actions{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:15px;padding-top:13px;border-top:1px solid rgba(29,32,34,.08)}.temp-user-secondary,.temp-user-primary{height:38px;border-radius:11px;padding:0 13px;font-size:9px;font-weight:800;cursor:pointer}.temp-user-secondary{border:1px solid rgba(29,32,34,.09);background:#fff;color:#72777b}.temp-user-primary{border:1px solid #e8743f;background:#ef7b45;color:#fff;box-shadow:0 8px 18px rgba(239,123,69,.16)}
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
    const closeTemp=()=>{tempModal.classList.remove('open');tempModal.setAttribute('aria-hidden','true')};
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

  // Tool pages get a lightweight view of the shared event feed. The dashboard keeps its richer native notification controller.
  if(!document.getElementById('officeSvg')){
    const btn=header.querySelector('#notificationBtn'),panel=header.querySelector('#notificationPanel'),nlist=header.querySelector('#notificationList'),badge=header.querySelector('#notificationUnread'),clear=header.querySelector('#notificationClearBtn');
    let events=[];let seen=0;try{seen=Number(localStorage.getItem('ksHeaderSeenEvent')||0)||0}catch(_){}
    const timeAgo=value=>{const t=new Date(value).getTime();if(!Number.isFinite(t))return'';const s=Math.max(0,Math.floor((Date.now()-t)/1000));if(s<60)return'now';if(s<3600)return`${Math.floor(s/60)}m`;if(s<86400)return`${Math.floor(s/3600)}h`;return`${Math.floor(s/86400)}d`};const clock=value=>{const d=new Date(value);return Number.isNaN(d.getTime())?'--:--':d.toLocaleTimeString('en-MY',{hour:'2-digit',minute:'2-digit',hour12:false})};
    const actorFor=e=>String(e?.metadata?.actor?.name||'').trim();
    const draw=()=>{if(!nlist)return;nlist.innerHTML=events.length?[...events].reverse().slice(0,10).map(e=>{const actor=actorFor(e);return `<div class="notification-item"><b>${esc(e.title||'Office update')}</b><span>${esc(e.message||'')}${actor?` · by ${esc(actor)}`:''}</span><time>${esc(clock(e.createdAt))} · ${esc(timeAgo(e.createdAt))}</time></div>`}).join(''):'<div class="notification-empty">No new updates yet.</div>';const unread=events.filter(e=>Number(e.id)>seen).length;if(badge){badge.textContent=String(Math.min(99,unread));badge.hidden=!unread}btn?.classList.toggle('has-unread',unread>0)};
    async function pull(){try{const res=await fetch('/api/events?limit=20',{cache:'no-store',headers:{accept:'application/json'}});if(!res.ok)return;const data=await res.json();events=Array.isArray(data.events)?data.events:[];draw()}catch(_){}}
    btn?.addEventListener('click',e=>{e.stopPropagation();const open=!panel.classList.contains('open');panel.classList.toggle('open',open);panel.setAttribute('aria-hidden',String(!open));btn.setAttribute('aria-expanded',String(open));if(open&&events.length){seen=Math.max(seen,...events.map(e=>Number(e.id)||0));try{localStorage.setItem('ksHeaderSeenEvent',String(seen))}catch(_){}draw()}});
    clear?.addEventListener('click',()=>{events=[];draw()});document.addEventListener('pointerdown',e=>{if(panel?.classList.contains('open')&&!header.querySelector('.notification-wrap')?.contains(e.target)){panel.classList.remove('open');panel.setAttribute('aria-hidden','true');btn?.setAttribute('aria-expanded','false')}});pull();setInterval(pull,15000);
  }
})();
