/* V86.47: Scenario-only office routine. Never records attendance or staff productivity.
 * Timezone is explicit so different viewers use the same workday simulation.
 * The elected movement leader is solely responsible for applying these biases.
 */
(()=>{
 'use strict';
 const tz='Asia/Kuala_Lumpur';
 const windowAt=(when=Date.now())=>{
  const parts=new Intl.DateTimeFormat('en-GB',{timeZone:tz,weekday:'short',hour:'2-digit',hourCycle:'h23'}).formatToParts(new Date(when));
  const pick=type=>parts.find(part=>part.type===type)?.value||'';
  const hour=Number(pick('hour')),weekend=['Sat','Sun'].includes(pick('weekday'));
  const phase=weekend?'weekend':hour<9?'offhours':hour<11?'focus':hour<14?'lunch':hour<17?'collaboration':hour<19?'wrapup':'offhours';
  return {phase,hour,weekend,timezone:tz};
 };
 function bias(intent,person,now=Date.now()){
  const {phase}=windowAt(now),zone=intent?.zone,kind=intent?.kind;
  // Soft preferences only. Collision, capacity, job priority and the mobility
  // watchdog remain authoritative and can override the routine entirely.
  if(phase==='focus')return kind==='work'?18:zone==='corridor'?-8:0;
  if(phase==='lunch')return zone==='pantry'?35:kind==='work'?-5:0;
  if(phase==='collaboration')return zone==='showroom'?22:zone==='corridor'?14:0;
  if(phase==='wrapup')return kind==='work'?12:zone==='store'?8:0;
  return zone==='pantry'?8:kind==='work'?3:0;
 }
 window.OfficeAIRoutine=Object.freeze({version:'86.47',windowAt,bias});
})();
