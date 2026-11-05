/* V86 shared, side-effect-free job calculations for Office Command and Job Management. */
(() => {
  'use strict';
  const text = value => String(value ?? '').trim();
  const normalize = value => text(value).toLocaleLowerCase('en').replace(/[^a-z0-9]+/g, ' ').trim();
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function date(value) {
    if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : new Date(value);
    const s = text(value); if (!s) return null;
    let m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
    if (m) { const d = new Date(+m[1], +m[2]-1, +m[3]); return d.getFullYear()===+m[1] && d.getMonth()===+m[2]-1 && d.getDate()===+m[3] ? d:null; }
    m = /^(\d{1,2})[/.\-](\d{1,2})[/.\-](\d{2,4})$/.exec(s);
    if (m) { const y=+m[3]+(m[3].length===2?2000:0),d=new Date(y,+m[2]-1,+m[1]); return d.getFullYear()===y && d.getMonth()===+m[2]-1 && d.getDate()===+m[1]?d:null; }
    return null;
  }
  const day = d => d ? Math.floor(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/86400000) : null;
  function stage(job) {
    const v=normalize(job.currentDepartment || job.status);
    if (/closed|complete|completed|done/.test(v)) return 'completed';
    if (/design|artwork/.test(v)) return 'artwork';
    if (/production|print|packing|qc/.test(v)) return 'production';
    if (/sales|order|admin/.test(v)||!v) return 'orders';
    return 'unmapped';
  }
  const ref = j => text(j.jobsheetFiles || j.ref || j.invoice) || 'Unreferenced job';
  const assignees = j => [j.sales,j.designer,j.productionPic,j.pic,...(Array.isArray(j.assignees)?j.assignees:[])].map(normalize).filter(Boolean);
  function forStaff(jobs,person) {const name=normalize(typeof person==='string'?person:person?.name);return name?(jobs||[]).filter(j=>assignees(j).includes(name)):[];}
  function dueIn(job,now=new Date()) {const d=date(job.deliveryTime||job.due);return d?day(d)-day(now):null;}
  function money(v) {const n=Number(String(v??'').replace(/[^0-9.\-]/g,''));return Number.isFinite(n)?n:0;}
  function report(jobs=[],now=new Date()) {
    const list=Array.isArray(jobs)?jobs:[];
    const stages={orders:0,artwork:0,production:0,completed:0,unmapped:0};
    const result={total:list.length,active:0,overdue:0,dueToday:0,dueSoon:0,urgent:0,unassigned:0,invoiceTotal:0,paidTotal:0,stages,weekly:[]};
    for (const j of list) {
      const s=stage(j);stages[s]++;
      const remaining=dueIn(j,now);
      if(s!=='completed') {result.active++;if(remaining!==null&&remaining<0) result.overdue++;if(remaining===0)result.dueToday++;if(remaining!==null&&remaining>=0&&remaining<=3)result.dueSoon++;}
      if(normalize(j.priority)==='urgent'&&s!=='completed')result.urgent++;
      if(s!=='completed'&&!assignees(j).length)result.unassigned++;
      result.invoiceTotal+=money(j.invoiceAmount);result.paidTotal+=money(j.paid);
    }
    for(let offset=6;offset>=0;offset--){
      const d=new Date(now.getFullYear(),now.getMonth(),now.getDate()-offset);
      const key=day(d);
      result.weekly.push({label:d.toLocaleDateString('en-MY',{weekday:'short'}),ordered:list.filter(j=>day(date(j.orderDate))===key).length,completed:list.filter(j=>stage(j)==='completed'&&day(date(j.actualComplete2||j.actualComplete1||j.completedDate))===key).length});
    }
    return result;
  }
  function peopleLoad(jobs=[],staff=[]) {
    return staff.map(person=>{const assigned=forStaff(jobs,person);return {...person,assigned,active:assigned.filter(j=>stage(j)!=='completed').length,overdue:assigned.filter(j=>stage(j)!=='completed'&&dueIn(j)!==null&&dueIn(j)<0).length};}).sort((a,b)=>b.active-a.active||String(a.name).localeCompare(String(b.name)));
  }
  const formatMoney = value => 'RM '+Number(value||0).toLocaleString('en-MY',{minimumFractionDigits:2,maximumFractionDigits:2});
  window.KSCommandData=Object.freeze({text,normalize,escapeHTML,date,day,stage,ref,assignees,forStaff,dueIn,money,report,peopleLoad,formatMoney});
})();
