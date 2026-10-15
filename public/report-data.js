/* V86.51 Job Management reporting model — read-only, shared semantics with KSJobs.stage. */
(function(root){
  'use strict';
  const clean=v=>String(v??'').trim();
  const amount=v=>{const n=Number(clean(v).replace(/[^0-9.-]/g,''));return Number.isFinite(n)?n:0};
  const date=v=>{
    if(!v)return null;
    const raw=clean(v),dmy=raw.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2,4})$/);
    let d;if(dmy){let y=Number(dmy[3]);if(y<100)y+=2000;d=new Date(y,Number(dmy[2])-1,Number(dmy[1]));
      if(d.getFullYear()!==y||d.getMonth()!==Number(dmy[2])-1||d.getDate()!==Number(dmy[1]))return null;
    }else if(/^\d{4}-\d\d-\d\d$/.test(raw)){
      const[y,m,day]=raw.split('-').map(Number);d=new Date(y,m-1,day);
      if(d.getFullYear()!==y||d.getMonth()!==m-1||d.getDate()!==day)return null;
    }else{d=new Date(raw)}
    return Number.isFinite(d.getTime())?d:null;
  };
  const stage=j=>{if(!root.KSJobs?.stage)throw Error('Job Management rules not loaded');return root.KSJobs.stage(j)};
  const completed=j=>stage(j)==='completed'||!!date(j.actualComplete2||j.actualComplete1);
  const overdue=(j,now=new Date())=>{
    if(completed(j))return false;
    const due=date(j.deliveryTime||j.due);if(!due)return false;
    return new Date(due.getFullYear(),due.getMonth(),due.getDate()).getTime()<new Date(now.getFullYear(),now.getMonth(),now.getDate()).getTime();
  };
  function filtered(jobs,{year='all',month='all',stageFilter='all',query=''}={}){
    const q=clean(query).toLowerCase();
    return jobs.filter(j=>{
      const d=date(j.orderDate);
      if(year!=='all'&&(!d||d.getFullYear()!==Number(year)))return false;
      if(month!=='all'&&(!d||d.getMonth()!==Number(month)))return false;
      if(stageFilter!=='all'&&stage(j)!==stageFilter&&(stageFilter!=='overdue'||!overdue(j)))return false;
      if(q&&!['jobsheetFiles','invoice','customer','item','sales','designer','supplier','productionPic','currentDepartment'].some(k=>clean(j[k]).toLowerCase().includes(q)))return false;
      return true;
    });
  }
  function summarize(jobs,now=new Date()){
    const stages={orders:0,artwork:0,production:0,completed:0,unmapped:0};
    let urgent=0,late=0,invoice=0,paid=0,outstanding=0,undated=0,dueSoon=0,missingDelivery=0,missingCustomer=0,missingRef=0;
    const customers=new Map();
    const months=Array.from({length:12},()=>0);
    for(const j of jobs){
      stages[stage(j)]++;if(clean(j.priority).toLowerCase()==='urgent')urgent++;
      if(overdue(j,now))late++;
      const due=date(j.deliveryTime||j.due),today=new Date(now.getFullYear(),now.getMonth(),now.getDate()).getTime();
      if(!completed(j)&&due){const delta=Math.floor((new Date(due.getFullYear(),due.getMonth(),due.getDate()).getTime()-today)/86400000);if(delta>=0&&delta<=7)dueSoon++}
      if(!due)missingDelivery++;
      if(!clean(j.customer))missingCustomer++;
      if(!clean(j.jobsheetFiles||j.ref))missingRef++;
      const client=clean(j.customer)||'Unspecified customer';
      const prior=customers.get(client)||{name:client,count:0,billed:0};
      prior.count++;prior.billed+=amount(j.invoiceAmount);customers.set(client,prior);
      invoice+=amount(j.invoiceAmount);paid+=amount(j.paid);
      // Prefer explicitly saved balance, falling back to invoice less paid.
      outstanding+=clean(j.balance)!==''?amount(j.balance):amount(j.invoiceAmount)-amount(j.paid);
      const d=date(j.orderDate);if(!d)undated++;else months[d.getMonth()]++;
    }
    return {total:jobs.length,stages,urgent,overdue:late,invoice,paid,outstanding,undated,months,dueSoon,
      completionRate:jobs.length?Math.round(stages.completed/jobs.length*100):0,
      averageInvoice:jobs.length?invoice/jobs.length:0,
      collectionRate:invoice>0?Math.round(Math.max(0,paid)/invoice*100):0,
      missingDelivery,missingCustomer,missingRef,
      topCustomers:[...customers.values()].sort((a,b)=>b.count-a.count||b.billed-a.billed||a.name.localeCompare(b.name)).slice(0,5)};
  }
  function years(jobs){return [...new Set(jobs.map(j=>date(j.orderDate)?.getFullYear()).filter(Boolean))].sort((a,b)=>b-a)};
  function safeCSV(v){const raw=clean(v),safe=/^[=+@\-\t\r]/.test(raw)?"'"+raw:raw;return '"'+safe.replace(/"/g,'""')+'"'};
  function balanceFor(job){return clean(job.balance)!==''?amount(job.balance):amount(job.invoiceAmount)-amount(job.paid)}
  function pageSlice(records,page=1,pageSize=25){
    const size=[25,50,100].includes(Number(pageSize))?Number(pageSize):25;
    const total=Array.isArray(records)?records.length:0;
    const pages=Math.max(1,Math.ceil(total/size));
    const requested=Number.isFinite(Number(page))?Math.floor(Number(page)):1;
    const current=Math.min(pages,Math.max(1,requested));
    const start=(current-1)*size;
    return {items:records.slice(start,start+size),page:current,pages,pageSize:size,total,from:total?start+1:0,to:Math.min(total,start+size)};
  }
  const exportColumns=[
    ['Reference',j=>j.jobsheetFiles||j.ref||''],['Invoice',j=>j.invoice],['Customer',j=>j.customer],
    ['Priority',j=>j.priority],['Item',j=>j.item||j.jobType||''],['Stage',j=>stage(j)],
    ['Designer',j=>j.designer],['Sales',j=>j.sales],['Order date',j=>j.orderDate],
    ['Delivery date',j=>j.deliveryTime||j.due],['Invoice amount',j=>amount(j.invoiceAmount).toFixed(2)],
    ['Paid',j=>amount(j.paid).toFixed(2)],['Balance',j=>balanceFor(j).toFixed(2)]
  ];
  function exportCSV(records){
    const lines=[exportColumns.map(([label])=>safeCSV(label)).join(',')];
    for(const job of records)lines.push(exportColumns.map(([,get])=>safeCSV(get(job))).join(','));
    return '\ufeff'+lines.join('\r\n');
  }
  root.KSReportModel=Object.freeze({date,amount,stage,completed,overdue,filtered,summarize,years,safeCSV,balanceFor,pageSlice,exportCSV});
})(typeof window!=='undefined'?window:globalThis);
