/* V86.37 Production Action Queue: pure, read-only classification of shared jobs.
   Reuses KSJobs.stage and KSCommandData.date/day; never persists or edits data. */
(function(root){
 'use strict';
 const text=value=>String(value??'').trim();
 const norm=value=>text(value).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
 const categories=Object.freeze(['all','overdue','today','soon','production','assignment','data','status']);
 function evaluate(source=[],now=new Date()){
  const list=Array.isArray(source)?source:[];
  const day=root.KSCommandData?.day;
  const parse=root.KSCommandData?.date;
  const stage=root.KSJobs?.stage;
  if(typeof day!=='function'||typeof parse!=='function'||typeof stage!=='function')throw new Error('Action Queue dependencies are not available');
  const today=day(now instanceof Date?now:new Date(now));
  if(today===null)throw new Error('Invalid evaluation date');
  const result=[];
  list.forEach((job,index)=>{
   if(!job||typeof job!=='object')return;
   const rawStatus=norm(job.currentDepartment||job.status||'');
   if(/\b(cancelled|canceled|cancel)\b/.test(rawStatus))return;
   const currentStage=stage(job);
   if(currentStage==='completed')return;
   const reasons=[];
   const add=(category,rank,code,label,action)=>reasons.push({category,rank,code,label,action});
   // A held record requires a status review; never classify it as overdue or active production.
   const held=/\b(hold|on hold|paused|suspended)\b/.test(rawStatus);
   const dueText=text(job.deliveryTime||job.due);
   const dueDate=dueText?parse(dueText):null;
   const dueDays=dueDate?day(dueDate)-today:null;
   if(held){add('status',7,'held','Job is on hold','Review whether the hold should continue.');}
   else{
    if(dueText&&!dueDate)add('data',6,'invalid-date','Invalid delivery date','Correct the delivery date in the job record.');
    else if(!dueText)add('data',6,'missing-date','Delivery date missing','Set a delivery deadline in the job record.');
    else if(dueDays<0)add('overdue',1,'overdue',`Delivery overdue by ${Math.abs(dueDays)} day${Math.abs(dueDays)===1?'':'s'}`,'Review production progress and delivery arrangements.');
    else if(dueDays===0)add('today',2,'today','Delivery due today','Confirm that the order is ready for delivery.');
    else if(dueDays<=3)add('soon',3,'soon',`Delivery due in ${dueDays} day${dueDays===1?'':'s'}`,'Check production progress against the deadline.');
    if(currentStage==='production'){
     const meta=job.jobMeta&&typeof job.jobMeta==='object'?job.jobMeta:{};
     const qty=text(meta.quantity||job.quantity);
     if(!qty||!Number.isInteger(Number(qty))||Number(qty)<1)add('production',4,'quantity','Production quantity missing or invalid','Check and enter the required quantity.');
     if(!text(meta.sizeBreakdown||job.sizeBreakdown))add('production',4,'sizes','Size breakdown missing','Confirm the required size breakdown.');
     const approval=norm(meta.artworkApproved||job.artworkApproved);
     if(approval!=='yes')add('production',4,'artwork',approval==='no'?'Artwork not approved':'Artwork approval not recorded','Confirm approval before production.');
    }
    const assignedField=currentStage==='artwork'?'designer':currentStage==='production'?'productionPic':currentStage==='orders'?'sales':null;
    if(assignedField&&!text(job[assignedField]))add('assignment',5,'unassigned',`${assignedField==='productionPic'?'Production PIC':assignedField==='designer'?'Designer':'Sales PIC'} not assigned`,'Assign the responsible staff member.');
    if(currentStage==='unmapped')add('status',7,'unmapped','Unrecognized department','Review and correct the job workflow status.');
   }
   if(!reasons.length)return;
   reasons.sort((a,b)=>a.rank-b.rank||a.code.localeCompare(b.code));
   result.push({index,ref:text(job.jobsheetFiles||job.ref),customer:text(job.customer),item:text(job.item),department:text(job.currentDepartment||job.status),stage:currentStage,urgent:norm(job.priority)==='urgent',dueText,dueDays,primary:reasons[0],reasons});
  });
  result.sort((a,b)=>a.primary.rank-b.primary.rank||Number(b.urgent)-Number(a.urgent)||
    (a.dueDays??Infinity)-(b.dueDays??Infinity)||a.ref.localeCompare(b.ref)||a.index-b.index);
  return result;
 }
 function filter(rows,category='all'){
  if(!categories.includes(category))return[];
  return category==='all'?[...rows]:rows.filter(row=>row.reasons.some(reason=>reason.category===category));
 }
 function summary(rows){const counts={all:rows.length};for(const category of categories.slice(1))counts[category]=filter(rows,category).length;return counts;}
 root.KSJobAttention=Object.freeze({evaluate,filter,summary,categories});
})(typeof window!=='undefined'?window:globalThis);
