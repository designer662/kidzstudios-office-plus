/* V86 Job Management Board and Insights. Uses existing CAS saveAll; no parallel writer. */
(() => {
 'use strict';
 const d=window.KSCommandData;if(!d)return;
 const esc=d.escapeHTML,labels={orders:'Orders',artwork:'Design / Artwork',production:'Production',completed:'Completed',unmapped:'Other'};
 const defaults={orders:'SALES',artwork:'DESIGN',production:'PRODUCTION',completed:'CLOSED'};
 let adapter=null,view='table',busy=false,root=null;
 const amount=job=>[job.sales,job.designer,job.productionPic].filter(Boolean).join(' · ')||'Unassigned';
 function init(){
   const workspace=document.querySelector('.workspace'),table=workspace?.querySelector('.table-wrap');
   if(!workspace||!table)return;
   root=document.createElement('section');root.id='ksJobUpgrade';root.innerHTML=`<div class="ks-board-toolbar"><div><span class="ks-eyebrow">V86 · LIVE JOB WORKFLOW</span><strong>Project workspace</strong></div><div class="ks-board-tabs" role="tablist" aria-label="Job views"><button type="button" data-mode="table" role="tab" aria-selected="true">Table</button><button type="button" data-mode="board" role="tab" aria-selected="false">Kanban board</button><button type="button" data-mode="insights" role="tab" aria-selected="false">Insights</button></div></div><div id="ksBoardContent" aria-live="polite" hidden></div><p class="ks-board-status" id="ksBoardStatus" role="status"></p>`;
   table.before(root);
   root.addEventListener('click',e=>{
     const tab=e.target.closest('[data-mode]');if(tab){view=tab.dataset.mode;render();return;}
     const edit=e.target.closest('[data-ks-edit]');if(edit&&adapter){adapter.openEditor(Number(edit.dataset.ksEdit));return;}
     const move=e.target.closest('[data-ks-move]');if(move&&adapter){void moveTo(Number(move.dataset.ksMove),move.dataset.stage);}
   });
   root.addEventListener('dragstart',e=>{const card=e.target.closest('[data-ks-card]');if(card&&e.dataTransfer){e.dataTransfer.setData('text/plain',card.dataset.ksCard);e.dataTransfer.effectAllowed='move';}});
   root.addEventListener('dragover',e=>{const zone=e.target.closest('[data-ks-zone]');if(zone){e.preventDefault();e.dataTransfer.dropEffect='move';}});
   root.addEventListener('drop',e=>{const zone=e.target.closest('[data-ks-zone]');if(!zone||!e.dataTransfer)return;e.preventDefault();const index=Number(e.dataTransfer.getData('text/plain'));void moveTo(index,zone.dataset.ksZone);});
   render();
 }
 function setMessage(message){const el=document.getElementById('ksBoardStatus');if(el)el.textContent=message;}
 async function moveTo(index,stage){
   if(busy||!adapter?.isLoaded()||!Number.isSafeInteger(index)||!defaults[stage])return;
   const job=adapter.getAll()[index];if(!job)return;
   if(d.stage(job)===stage)return;
   if(!window.confirm(`Move ${d.ref(job)} to ${labels[stage]}? This changes the shared CURRENT DEPARTMENT field.`))return;
   busy=true;setMessage(`Saving ${d.ref(job)} to ${labels[stage]}…`);
   try{
     const success=await adapter.move(index,defaults[stage]);
     setMessage(success?`${d.ref(job)} moved to ${labels[stage]} and synced.`:'Move not saved. Refresh jobs and retry.');
     render();
   }catch(e){setMessage(`Move failed: ${String(e?.message||e)}`);}finally{busy=false;}
 }
 function jobCard(row){
   const j=row.j,stage=d.stage(j),days=d.dueIn(j),late=stage!=='completed'&&days!==null&&days<0;
   const stageChoices=Object.keys(defaults).filter(k=>k!==stage).map(k=>`<option value="${k}">${esc(labels[k])}</option>`).join('');
   return `<article class="ks-kanban-card" data-ks-card="${row.i}" draggable="true" tabindex="0" aria-label="${esc(d.ref(j))}">
     <div class="ks-kanban-top"><b>${esc(d.ref(j))}</b><span class="${late?'ks-danger':''}">${days===null?'—':days===0?'Today':days<0?`${-days}d late`:`${days}d`}</span></div>
     <strong>${esc(j.customer||'No customer')}</strong><small>${esc(j.item||j.jobType||'Item not specified')}</small>
     <div class="ks-kanban-tags"><span>${esc(j.priority||'NORMAL')}</span><span>${esc(amount(j))}</span></div>
     <div class="ks-kanban-actions"><button type="button" data-ks-edit="${row.i}">Edit job ↗</button><label>Move to <select data-ks-move="${row.i}" aria-label="Move ${esc(d.ref(j))} to stage" ${busy?'disabled':''}><option value="">Choose stage</option>${stageChoices}</select></label></div>
   </article>`;
 }
 function renderBoard(rows){
   const groups={orders:[],artwork:[],production:[],completed:[],unmapped:[]};
   rows.forEach(row=>groups[d.stage(row.j)].push(row));
   return `<p class="ks-board-hint">Filtered jobs · Drag a card onto a stage or use Move to. Changes save to the shared database. Other is read-only.</p><div class="ks-kanban" role="group" aria-label="Kanban job stages">${Object.keys(groups).map(stage=>`<div class="ks-kanban-col" data-ks-zone="${stage}"><header><b>${labels[stage]}</b><span>${groups[stage].length}</span></header><div class="ks-kanban-stack">${groups[stage].length?groups[stage].map(jobCard).join(''):'<p class="ks-kanban-empty">No jobs in this stage</p>'}</div></div>`).join('')}</div>`;
 }
 function chart(items){const max=Math.max(1,...items.map(v=>v.value));return `<div class="ks-insight-bars">${items.map(v=>`<div><span>${esc(v.name)}</span><div><i style="width:${v.value/max*100}%"></i></div><b>${v.value}</b></div>`).join('')}</div>`;}
 function renderInsights(rows){
   const jobs=rows.map(r=>r.j),r=d.report(jobs),late=jobs.filter(j=>d.stage(j)!=='completed'&&d.dueIn(j)!==null&&d.dueIn(j)<0).sort((a,b)=>d.dueIn(a)-d.dueIn(b)).slice(0,6);
   const sales=new Map();for(const j of jobs.filter(j=>d.stage(j)!=='completed')){for(const name of [j.sales,j.designer,j.productionPic].filter(Boolean)){const k=name.trim();sales.set(k,(sales.get(k)||0)+1);}}
   const load=[...sales].sort((a,b)=>b[1]-a[1]).slice(0,10).map(([name,value])=>({name,value}));
   const daily=r.weekly.map(p=>({name:p.label,value:p.ordered}));
   return `<div class="ks-insight-metrics"><div><small>Total jobs</small><b>${r.total}</b></div><div><small>Active</small><b>${r.active}</b></div><div><small>Overdue</small><b>${r.overdue}</b></div><div><small>Due today</small><b>${r.dueToday}</b></div><div><small>Invoiced</small><b>${d.formatMoney(r.invoiceTotal)}</b></div><div><small>Recorded paid</small><b>${d.formatMoney(r.paidTotal)}</b></div></div>
     <div class="ks-insight-grid"><section><h3>Stage distribution</h3>${chart(Object.entries(r.stages).map(([name,value])=>({name,value})))}</section><section><h3>Assigned workload (all roles)</h3>${load.length?chart(load):'<p>No assigned staff in this view.</p>'}</section><section><h3>New orders · last 7 days</h3>${chart(daily)}</section><section><h3>Overdue queue</h3>${late.length?late.map(j=>`<div class="ks-insight-alert"><b>${esc(d.ref(j))}</b><span>${esc(j.customer||'Customer')} · ${-d.dueIn(j)}d late</span></div>`).join(''):'<p>No overdue jobs in this view.</p>'}</section></div>
     <p class="ks-insight-note">Figures use the current Job Management filters and saved job data. Staff counts may overlap when multiple people share a job. Amounts are recorded values, not verified receipts.</p>`;
 }
 function render(){
   if(!root||!adapter)return;
   const table=document.querySelector('.workspace .table-wrap'),content=document.getElementById('ksBoardContent');
   root.querySelectorAll('[data-mode]').forEach(button=>button.setAttribute('aria-selected',String(button.dataset.mode===view)));
   if(table)table.hidden=view!=='table';
   content.hidden=view==='table';if(view==='table')return;
   if(!adapter.isLoaded()){content.innerHTML='<p class="ks-board-hint">Loading shared job records…</p>';return;}
   const rows=adapter.getRows();content.innerHTML=view==='board'?renderBoard(rows):renderInsights(rows);
 }
 document.addEventListener('change',e=>{if(e.target.matches('#ksBoardContent select[data-ks-move]')&&e.target.value){void moveTo(Number(e.target.dataset.ksMove),e.target.value);}});
 window.KSJobEnhanced=Object.freeze({connect(source){adapter=source;if(!root)init();render();},refresh(){if(root&&view!=='table')render();}});
})();
