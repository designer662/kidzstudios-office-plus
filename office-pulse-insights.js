/* V86.38 Office Pulse: deterministic, read-only snapshot and navigation helpers. */
(function(root){
 'use strict';
 const text=v=>String(v??'').trim();
 const normalizeRef=v=>text(v).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
 function malaysiaToday(now=new Date()){
  if(!(now instanceof Date)||!Number.isFinite(now.getTime()))throw Error('Invalid dashboard date');
  const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kuala_Lumpur',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
  const part=t=>Number(parts.find(p=>p.type===t)?.value);
  return new Date(part('year'),part('month')-1,part('day'));
 }
 function summarize(records=[],now=new Date(),stageFor){
  const data=root.KSCommandData,queue=root.KSJobAttention,stageRule=root.KSJobs?.stage;
  if(!data||!queue||typeof stageRule!=='function')throw Error('Office Pulse data dependencies unavailable');
  const list=Array.isArray(records)?records:[];
  const today=malaysiaToday(now),todayIndex=data.day(today);
  const stages={orders:0,artwork:0,production:0,completed:0,unmapped:0};
  let active=0,dueToday=0,overdue=0,completedToday=0,held=0,cancelled=0;
  for(const job of list){
   if(!job||typeof job!=='object'){stages.unmapped++;continue;}
   const raw=text(job.currentDepartment||job.status).toLowerCase();
   const isCancelled=/\b(cancelled|canceled|cancel)\b/.test(raw),isHeld=/\b(hold|paused|suspended)\b/.test(raw);
   const recognized=typeof stageFor==='function'?stageFor(job):stageRule(job);
   const stage=Object.hasOwn(stages,recognized)?recognized:'unmapped';stages[stage]++;
   if(isCancelled){cancelled++;continue}
   if(isHeld){held++;continue}
   if(stage==='completed'){
    const completedDate=data.date(job.actualComplete2||job.actualComplete1||job.completedDate);
    if(completedDate&&data.day(completedDate)===todayIndex)completedToday++;
    continue;
   }
   if(stage==='unmapped')continue;
   active++;
   const due=data.date(job.deliveryTime||job.due);
   if(due){const difference=data.day(due)-todayIndex;if(difference<0)overdue++;else if(difference===0)dueToday++;}
  }
  const attention=queue.evaluate(list,today);
  return{total:list.length,stages,active,dueToday,overdue,completedToday,held,cancelled,attention,attentionCount:attention.length};
 }
 function validRef(value){const v=text(value);return v.length>0&&v.length<=160&&!/[\u0000-\u001f\u007f]/.test(v)&&normalizeRef(v).length>0}
 function jobHref(ref){return validRef(ref)?`job-management.html?view=queue&job=${encodeURIComponent(text(ref))}`:''}
 function resolveReference(records,ref){
  if(!validRef(ref))return{status:'invalid',index:-1};
  const sought=normalizeRef(ref),matches=[];
  (Array.isArray(records)?records:[]).forEach((job,index)=>{if(normalizeRef(job?.jobsheetFiles||job?.ref)===sought)matches.push(index)});
  return matches.length===1?{status:'found',index:matches[0]}:{status:matches.length?'duplicate':'missing',index:-1};
 }
 root.KSPulseInsights=Object.freeze({malaysiaToday,summarize,validRef,jobHref,resolveReference});
})(typeof window!=='undefined'?window:globalThis);
