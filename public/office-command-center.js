/* V86 Command Center: read-only live operations view; edits remain in Job Management. */
(() => {
  'use strict';
  const data=window.KSCommandData;
  if(!data) return;
  const esc=data.escapeHTML;
  let jobs=[],staff=[],version=null,lastLoaded=0,view='overview',selected=null,loading=false,open=false,poll=null,initialized=false,error='';
  const byId=id=>document.getElementById(id);
  const header=document.querySelector('#toolNav');
  if(!header||!byId('office3dHost'))return;
  const button=document.createElement('button');button.type='button';button.className='tool-nav-btn ks-command-nav';button.innerHTML='<span class="nav-tool-icon">◈</span><span>Command Center</span>';button.setAttribute('aria-controls','ksCommandPanel');button.setAttribute('aria-expanded','false');header.prepend(button);
  const backdrop=document.createElement('div');backdrop.id='ksCommandBackdrop';backdrop.hidden=true;
  const panel=document.createElement('aside');panel.id='ksCommandPanel';panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','false');panel.setAttribute('aria-labelledby','ksCommandTitle');panel.hidden=true;
  panel.innerHTML=`<div class="ks-command-head"><div><span class="ks-eyebrow">KIDZSTUDIOS / V86</span><h2 id="ksCommandTitle">Operations Command Center</h2><p id="ksCommandSync" role="status">Waiting for live records…</p></div><button type="button" id="ksCommandClose" class="ks-close" aria-label="Close Command Center">×</button></div>
    <div class="ks-command-tabs" role="tablist" aria-label="Command sections"><button data-view="overview" role="tab" aria-selected="true">Overview</button><button data-view="team" role="tab" aria-selected="false">Team</button><button data-view="insights" role="tab" aria-selected="false">Insights</button></div>
    <div id="ksCommandContent" class="ks-command-content" aria-live="polite"></div>
    <div class="ks-command-bottom"><label for="ksVisualQuality">3D quality <small>Saved on this device</small></label><select id="ksVisualQuality"><option value="eco">Eco · smoother</option><option value="balanced">Balanced</option><option value="high">High detail</option></select><button type="button" id="ksCommandRefresh">↻ Refresh</button><a href="job-management.html">Open Job Management ↗</a></div>`;
  document.body.append(backdrop,panel);
  const content=byId('ksCommandContent'),status=byId('ksCommandSync'),quality=byId('ksVisualQuality');
  const safeQuality=() => { try { const stored=localStorage.getItem('ks-3d-quality-v86');return ['eco','balanced','high'].includes(stored)?stored:'balanced'; }catch{return 'balanced';} };
  quality.value=safeQuality();
  const applyQuality=()=>window.office3d?.setQuality?.(quality.value);
  quality.addEventListener('change',()=>{try{localStorage.setItem('ks-3d-quality-v86',quality.value);}catch{} applyQuality();});
  const fmtDue=j=>{const d=data.dueIn(j);return d===null?'No due date':d<0?`${-d}d overdue`:d===0?'Due today':`Due in ${d}d`;};
  const jobHtml=(j)=>`<div class="ks-job-line"><div><strong>${esc(data.ref(j))}</strong><small>${esc(j.customer||'No customer')} · ${esc(j.item||j.jobType||'Unspecified item')}</small><small>${esc(j.designer||j.sales||j.productionPic||'No assigned staff')}</small></div><div class="ks-job-meta"><span class="ks-pill ks-stage-${esc(data.stage(j))}">${esc(data.stage(j))}</span><small class="${data.dueIn(j)!==null&&data.dueIn(j)<0&&data.stage(j)!=='completed'?'ks-danger':''}">${esc(fmtDue(j))}</small></div></div>`;
  const metric=(label,value,subtitle='')=>`<div class="ks-metric"><small>${esc(label)}</small><strong>${esc(value)}</strong><span>${esc(subtitle)}</span></div>`;
  const empty=message=>`<p class="ks-command-empty">${esc(message)}</p>`;
  const section=(name,body)=>`<section class="ks-command-section"><h3>${esc(name)}</h3>${body}</section>`;
  function renderOverview(){
    const report=data.report(jobs);const due=jobs.filter(j=>data.stage(j)!=='completed'&&data.dueIn(j)!==null&&data.dueIn(j)<=3).sort((a,b)=>data.dueIn(a)-data.dueIn(b)).slice(0,7);
    const team=data.peopleLoad(jobs,staff).slice(0,5);
    content.innerHTML=`<div class="ks-metrics">${metric('Active jobs',report.active,`${report.total} shared records`)}${metric('Overdue',report.overdue,'Needs attention')}${metric('Due today',report.dueToday,'Deadline today')}${metric('Completed',report.stages.completed,'All-time in shared list')}</div>
      ${section('Priority queue',due.length?due.map(jobHtml).join(''):empty('No jobs due in the next three days or overdue.'))}
      ${section('Team workload',team.length?team.map(p=>`<button type="button" class="ks-person-line" data-staff="${Number(p.id)}"><span class="ks-avatar">${esc((p.name||'?').slice(0,2).toUpperCase())}</span><span><b>${esc(p.name||'Staff')}</b><small>${esc(p.position||p.department||'Team member')}</small></span><span class="ks-person-amount">${p.active} active${p.overdue?` · ${p.overdue} late`:''}</span></button>`).join(''):empty('Staff directory not available.'))}`;
  }
  function renderTeam(){
    const people=data.peopleLoad(jobs,staff),p=people.find(p=>Number(p.id)===selected);
    content.innerHTML=`${section('Staff and actual job assignments',people.length?`<div class="ks-team-list">${people.map(p=>`<button type="button" data-staff="${Number(p.id)}" class="ks-person-line ${Number(p.id)===selected?'ks-person-active':''}"><span class="ks-avatar">${esc((p.name||'?').slice(0,2).toUpperCase())}</span><span><b>${esc(p.name||'Staff')}</b><small>${esc(p.department||p.position||'Team')}</small></span><span class="ks-person-amount">${p.active} active</span></button>`).join('')}</div>`:empty('No staff loaded.'))}
    ${p?section(`Assigned to ${p.name}`,`<div class="ks-metrics ks-compact">${metric('Active',p.active)}${metric('Overdue',p.overdue)}${metric('Total linked',p.assigned.length)}</div><div class="ks-command-actions"><button type="button" data-focus="${Number(p.id)}">Focus in 3D ↗</button><a href="job-management.html">Manage jobs ↗</a></div>${p.assigned.length?p.assigned.slice(0,20).map(jobHtml).join(''):empty('No jobs assigned under this staff name. Assign a Sales, Designer or Production PIC in Job Management.')}`):''}`;
  }
  function bars(points,key){const mx=Math.max(1,...points.map(p=>p[key]));return `<div class="ks-chart" role="img" aria-label="Jobs over the previous seven days">${points.map(p=>`<div class="ks-chart-day"><div class="ks-chart-slot"><i style="height:${Math.round(p[key]/mx*100)}%" title="${p[key]} jobs"></i></div><b>${p[key]}</b><span>${esc(p.label)}</span></div>`).join('')}</div>`;}
  function renderInsights(){
    const r=data.report(jobs);const stages=Object.entries(r.stages);const max=Math.max(1,...stages.map(([,n])=>n));
    content.innerHTML=`<div class="ks-metrics">${metric('Invoiced',data.formatMoney(r.invoiceTotal),'Based on Invoice Amount')}${metric('Recorded paid',data.formatMoney(r.paidTotal),'Based on Paid field')}${metric('Unassigned',r.unassigned,'No PIC / designer')}${metric('Urgent active',r.urgent,'Requires prioritization')}</div>
      ${section('Workflow distribution',`<div class="ks-chart-rows">${stages.map(([key,n])=>`<div><span>${esc(key)}</span><div><i style="width:${n/max*100}%"></i></div><b>${n}</b></div>`).join('')}</div>`)}
      ${section('Orders created · last 7 days',bars(r.weekly,'ordered'))}
      ${section('Completed jobs · last 7 days',bars(r.weekly,'completed'))}
      <p class="ks-data-note">Counts and totals come from saved Job Management records. Simulated 3D activities are excluded. These totals are not an accounting ledger or a time-tracking system.</p>`;
  }
  function render(){
    status.textContent=error?`Sync issue: ${error} · showing last successful data`:lastLoaded?`Shared database · ${jobs.length} jobs · updated ${new Date(lastLoaded).toLocaleTimeString('en-MY',{hour:'2-digit',minute:'2-digit'})}`:'Waiting for live records…';
    panel.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.view===view)));
    if(view==='team')renderTeam();else if(view==='insights')renderInsights();else renderOverview();
  }
  async function refresh(){
    if(loading || document.documentElement.dataset.ksAuth!=='ok')return;
    loading=true;status.textContent='Syncing Job Management…';
    try{
      const resp=await fetch('/api/state?scope=dashboard%3Ajobs',{cache:'no-store',headers:{accept:'application/json'}});
      if(resp.status!==404&&!resp.ok)throw new Error(`HTTP ${resp.status}`);
      const row=resp.status===404?null:await resp.json();
      if(row && !Array.isArray(row.payload?.jobs))throw new Error('Invalid shared jobs payload');
      const next=Number(row?.version||0);
      if(!initialized||version!==next){jobs=row?.payload?.jobs||[];version=next;}
      staff=window.OfficeSuite?.getStaff?.()||staff;
      initialized=true;lastLoaded=Date.now();error='';render();
    }catch(e){error=String(e?.message||'Network error');render();}
    finally{loading=false;}
  }
  let previousFocus=null;
  function show(next='overview',person=null){
    if(!open){previousFocus=document.activeElement;open=true;panel.hidden=false;backdrop.hidden=false;button.setAttribute('aria-expanded','true');document.body.classList.add('ks-command-open');}
    view=next;if(person!==null&&Number.isFinite(Number(person)))selected=Number(person);
    staff=window.OfficeSuite?.getStaff?.()||staff;render();
    byId('ksCommandClose').focus();void refresh();
  }
  function hide(){if(!open)return;open=false;panel.hidden=true;backdrop.hidden=true;document.body.classList.remove('ks-command-open');button.setAttribute('aria-expanded','false');previousFocus?.focus?.();}
  button.addEventListener('click',()=>open?hide():show());byId('ksCommandClose').addEventListener('click',hide);backdrop.addEventListener('click',hide);
  byId('ksCommandRefresh').addEventListener('click',refresh);
  panel.querySelector('.ks-command-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-view]');if(b){view=b.dataset.view;render();}});
  content.addEventListener('click',e=>{
    const person=e.target.closest('[data-staff]');if(person){selected=Number(person.dataset.staff);view='team';render();return;}
    const focus=e.target.closest('[data-focus]');if(focus){window.OfficeSuite?.selectPerson?.(Number(focus.dataset.focus));hide();}
  });
  document.addEventListener('keydown',e=>{if(!open)return;if(e.key==='Escape'){e.preventDefault();hide();}});
  // Existing character profiles still work. While Command Center is open, selecting a staff member
  // in the 3D scene switches to their job workload, without overwriting the normal profile UI.
  function hookSelection(){const suite=window.OfficeSuite;if(!suite||suite.__ksCommandHook)return;const select=suite.selectPerson.bind(suite);suite.selectPerson=id=>{select(id);if(open){selected=Number(id);view='team';staff=suite.getStaff();render();}};suite.__ksCommandHook=true;}
  window.addEventListener('ks:suite-ready',hookSelection);hookSelection();
  let previousController=null,previousQuality=null;
  const keepQuality=()=>{if(window.office3d && (window.office3d!==previousController || quality.value!==previousQuality)){applyQuality();previousController=window.office3d;previousQuality=quality.value;}};
  poll=setInterval(()=>{if(!document.hidden){keepQuality();if(open)void refresh();}},20000);
  setTimeout(keepQuality,1800);
  window.addEventListener('pagehide',()=>{clearInterval(poll);},{once:true});
  window.KSCommandCenter=Object.freeze({show,hide,refresh});
})();
