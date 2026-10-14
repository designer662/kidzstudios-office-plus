/* V86.25: Online browser sessions via Supabase Realtime Presence, not virtual staff attendance. */
(()=>{'use strict';
 const mount=()=>{
  if(document.getElementById('ksOnlineUsers'))return;
  const host=document.getElementById('livePresenceSlot');if(!host)return;
  const view=document.createElement('div');view.id='ksOnlineUsers';view.className='ks-online-users';
  view.setAttribute('role','status');view.setAttribute('aria-live','polite');view.title='Connected Office Plus browser sessions, not staff attendance';
  view.innerHTML='<span class="ks-online-dot" aria-hidden="true"></span><span class="ks-online-label">Online</span><strong id="ksOnlineCount">—</strong>';
  host.append(view);
  let lastLabel='';
  const paint=detail=>{
   const count=Number.isInteger(detail?.count)?detail.count:null;
   const label=detail?.connected&&count!==null?String(count):'—';
   view.classList.toggle('connected',detail?.connected&&count!==null);
   document.getElementById('ksOnlineCount').textContent=label;
   if(lastLabel!==label){lastLabel=label;view.setAttribute('aria-label',label==='—'?'Online user count unavailable':`${label} connected browser session${count===1?'':'s'}`)}
  };
  window.addEventListener('ks:office-online',e=>paint(e.detail));
  paint({connected:window.OfficeSupabase?.realtimeConnected?.(),count:window.OfficeSupabase?.onlineCount?.()});
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
