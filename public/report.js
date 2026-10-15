/* Job Management Reports V86.51: read-only shared Supabase snapshot. */
(()=>{
  'use strict';
  const $=id=>document.getElementById(id),M=window.KSReportModel;
  if(!M)return;
  const escape=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const stageLabels={orders:'Orders',artwork:'Artwork',production:'Production',completed:'Completed',unmapped:'Unmapped'};
  const fmtRM=v=>'RM '+v.toLocaleString('en-MY',{minimumFractionDigits:2,maximumFractionDigits:2});
  let jobs=[],version=-1,savedAt=0,loading=false,pending=false,lastPoll=0,hasSnapshot=false,alive=true;
  let current=[],page=1;
  const state=(kind,message)=>{$('reportState').dataset.state=kind;$('reportStatusText').textContent=message};
  function selectors(){return{year:$('reportYear').value,month:$('reportMonth').value,stageFilter:$('reportStage').value,query:$('reportSearch').value}};
  function render(){
    current=M.filtered(jobs,selectors());const stats=M.summarize(current);
    const put=(id,value)=>{$(id).textContent=value};
    put('kpiTotal',stats.total);put('kpiActive',stats.stages.orders+stats.stages.artwork+stats.stages.production);
    put('kpiCompleted',stats.stages.completed);put('kpiOverdue',stats.overdue);put('kpiUrgent',stats.urgent);
    put('kpiInvoice',fmtRM(stats.invoice));put('kpiPaid',fmtRM(stats.paid));put('kpiBalance',fmtRM(stats.outstanding));
    put('kpiCompletionRate',stats.completionRate+'%');put('kpiDueSoon',stats.dueSoon);
    put('kpiAverageInvoice',fmtRM(stats.averageInvoice));put('kpiCollectionRate',stats.collectionRate+'%');
    const topMax=Math.max(1,...stats.topCustomers.map(c=>c.count));
    $('reportCustomers').innerHTML=stats.topCustomers.length?stats.topCustomers.map((c,i)=>`<div class="insight-customer"><div class="insight-customer-top"><b>${i+1}. ${escape(c.name)}</b><span>${c.count} job${c.count===1?'':'s'} · ${escape(fmtRM(c.billed))}</span></div><div class="insight-track"><i style="width:${Math.round(c.count/topMax*100)}%"></i></div></div>`).join(''):'<div class="report-empty-insight">No customers in this selection.</div>';
    const health=[['Upcoming delivery',stats.dueSoon,'Due in next 7 days'],['Already overdue',stats.overdue,'Open jobs past delivery'],['Missing delivery date',stats.missingDelivery,'Records needing a date'],['Missing reference / customer',stats.missingRef+stats.missingCustomer,'Incomplete identifying fields']];
    $('reportHealth').innerHTML=health.map(([label,count,detail],i)=>`<div class="health-cell${i===1&&count?' at-risk':''}"><small>${label}</small><strong>${count}</strong><span>${detail}</span></div>`).join('');
    const max=Math.max(1,...stats.months);
    $('reportMonthly').innerHTML=stats.months.map((count,m)=>`<div class="month-col" title="${months[m]}: ${count} jobs"><b>${count}</b><div class="month-bar" style="--bar:${Math.round(112*count/max)}px"></div><span>${months[m]}</span></div>`).join('');
    const colors={orders:'#b2afbd',artwork:'#d19b65',production:'#eb935a',completed:'#6eab8b',unmapped:'#c1c8ca'};
    $('reportStages').innerHTML=Object.entries(stats.stages).map(([key,count])=>`<div><div class="stage-head"><span>${stageLabels[key]}</span><b>${count} / ${stats.total}</b></div><div class="track"><div class="fill" style="--fill:${stats.total?Math.round(count/stats.total*100):0}%;--fill-color:${colors[key]}"></div></div></div>`).join('');
    const subset=M.pageSlice(current,page,$('reportPageSize').value);page=subset.page;
    $('reportPageInfo').textContent=`Page ${page} of ${subset.pages}`;
    $('reportPrevPage').disabled=page<=1;
    $('reportNextPage').disabled=page>=subset.pages;
    const rows=subset.items;
    $('reportRows').innerHTML=rows.length?rows.map(j=>{
      const st=M.stage(j),bal=M.balanceFor(j),ref=String(j.jobsheetFiles||j.ref||'').trim();
      const reference=ref?`<a class="report-job-link" href="job-management.html?job=${encodeURIComponent(ref)}" title="Open job ${escape(ref)} in Job Management">${escape(ref)}</a>`:'—';
      return `<tr><td>${reference}</td><td>${escape(j.customer||'—')}</td><td>${escape(j.item||j.jobType||'—')}</td><td><span class="status-pill${M.overdue(j)?' overdue':''}">${escape(M.overdue(j)?'Overdue':stageLabels[st])}</span></td><td>${escape(j.designer||'—')}</td><td>${escape(j.orderDate||'—')}</td><td>${escape(j.deliveryTime||'—')}</td><td>${escape(fmtRM(bal))}</td></tr>`;
    }).join(''):'<tr><td colspan="8" class="empty-message">No matching jobs for these filters.</td></tr>';
    $('reportCount').textContent=`Showing ${subset.from}–${subset.to} of ${current.length} filtered jobs · ${jobs.length} shared jobs total${stats.undated?' · '+stats.undated+' undated in current view':''}`;
    $('reportSyncTime').textContent=savedAt?'Last saved '+new Date(savedAt).toLocaleString('en-MY'):'';
  }
  function fillYears(){const chosen=$('reportYear').value,years=M.years(jobs);$('reportYear').innerHTML='<option value="all">All years</option>'+years.map(y=>`<option value="${y}">${y}</option>`).join('');$('reportYear').value=years.map(String).includes(chosen)?chosen:'all'}
  function fillMonths(){const selected=$('reportMonth').value;$('reportMonth').innerHTML='<option value="all">All months</option>'+months.map((m,i)=>`<option value="${i}">${m}</option>`).join('');$('reportMonth').value=selected}
  async function pull({quiet=false}={}){
    if(loading){pending=true;return}
    loading=true;
    $('refreshReport').disabled=true;
    state(quiet&&hasSnapshot?'syncing':'loading',hasSnapshot?'Refreshing Job Management report…':'Loading Job Management report…');
    try{
      const res=await fetch('/api/state?scope=dashboard%3Ajobs',{cache:'no-store',headers:{accept:'application/json'}});
      if(!res.ok&&res.status!==404)throw Error(`Server returned HTTP ${res.status}`);
      // A 404 on a previously loaded report is an unexpected disappearance, not an empty report.
      if(res.status===404&&hasSnapshot)throw Error('Shared job record unavailable. Retaining the previous report');
      const row=res.status===404?null:await res.json();
      if(row&&(!row.payload||!Array.isArray(row.payload.jobs)))throw Error('Invalid Job Management payload');
      const incoming=row?Number(row.version):0;
      if(!Number.isSafeInteger(incoming)||incoming<0)throw Error('Invalid Job Management version');
      if(hasSnapshot&&incoming<version){
        state('stale',`Received older database version ${incoming}. Showing newer version ${version}; retry refresh.`);
        return;
      }
      if(!hasSnapshot||incoming>version){
        jobs=row?.payload.jobs||[];version=incoming;
        savedAt=Number(row?.payload?.savedAt)||new Date(row?.updatedAt||Date.now()).getTime();
        hasSnapshot=true;fillYears();render();
      }
      hasSnapshot=true;lastPoll=Date.now();
      state(jobs.length?'live':'empty',jobs.length?`Synchronized · ${jobs.length} Job Management records · version ${version}`:'No jobs found in shared Job Management data.');
    }catch(err){state('error',hasSnapshot?`Unable to refresh · showing previously loaded report (${err.message})`:`Unable to load reports (${err.message}). Select Refresh to retry.`)}
    finally{loading=false;$('refreshReport').disabled=false;if(pending){pending=false;pull({quiet:true})}}
  }
  ['reportYear','reportMonth','reportStage','reportSearch'].forEach(id=>$(id).addEventListener(id==='reportSearch'?'input':'change',()=>{page=1;render()}));
  $('reportPageSize').addEventListener('change',()=>{page=1;render()});
  $('reportPrevPage').addEventListener('click',()=>{if(page>1){page--;render()}});
  $('reportNextPage').addEventListener('click',()=>{page++;render()});
  $('refreshReport').addEventListener('click',()=>pull());
  $('printReport').addEventListener('click',()=>window.print());
  $('exportReport').addEventListener('click',()=>{
    // Export every filtered record, not merely the visible page.
    const contents=M.exportCSV(current);
    const url=URL.createObjectURL(new Blob([contents],{type:'text/csv;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download='kidzstudios-job-report-'+new Date().toISOString().slice(0,10)+'.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);
  });
  window.addEventListener('ks:supabase-change',event=>{
    if(event.detail?.table!=='ks_shared_state')return;
    const scope=event.detail?.payload?.data?.record?.scope;
    if((!scope||scope==='dashboard:jobs')&&!document.hidden)pull({quiet:true});
  });
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)pull({quiet:true})});
  window.addEventListener('ks:auth-ready',()=>pull({quiet:true}));
  window.addEventListener('pagehide',()=>{alive=false},{once:true});
  fillMonths();pull();
  setInterval(()=>{if(alive&&!document.hidden&&Date.now()-lastPoll>15000)pull({quiet:true})},15000);
})();
