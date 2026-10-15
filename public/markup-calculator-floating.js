/* KIDZSTUDIOS Markup & Margin floating tools. No pricing business logic changes. */
(()=>{
  'use strict';
  const quote=document.getElementById('pricingResults');
  const basic=document.getElementById('basicCalculatorPanel');
  const dock=document.getElementById('pricingFloatDock');
  if(!quote||!basic||!dock)return;
  const panels={quote,basic};
  const toggles={quote:document.getElementById('toggleQuotationFloat'),basic:document.getElementById('toggleBasicFloat')};
  const large=()=>window.innerWidth>=1200;
  const apply=(key,open,{focus=false}={})=>{
    const panel=panels[key],button=toggles[key];
    if(!panel||!button)return;
    panel.hidden=!open;
    button.setAttribute('aria-expanded',String(open));
    button.setAttribute('aria-pressed',String(open));
    if(open&&focus)panel.querySelector('[data-close-float]')?.focus({preventScroll:true});
  };
  let mostRecent='quote';
  const toggle=(key,force)=>{
    const open=typeof force==='boolean'?force:panels[key].hidden;
    if(open&&!large())for(const other of Object.keys(panels))if(other!==key)apply(other,false);
    apply(key,open,{focus:open});
    if(!open){toggles[key]?.focus({preventScroll:true})}
    else mostRecent=key;
  };
  for(const key of Object.keys(panels)){
    const panel=panels[key];
    panel.classList.add('ks-float-window');
    panel.setAttribute('role','region');
    panel.setAttribute('tabindex','-1');
    document.body.appendChild(panel);
    toggles[key]?.addEventListener('click',()=>toggle(key));
    panel.querySelector('[data-close-float]')?.addEventListener('click',()=>toggle(key,false));
  }
  document.body.classList.add('ks-floating-ready');
  // Keep a quotation preview visible on desktop, with neither panel covering the form on mobile.
  apply('quote',large());
  apply('basic',false);
  document.addEventListener('keydown',event=>{
    if(event.key!=='Escape')return;
    const openKeys=Object.keys(panels).filter(key=>!panels[key].hidden);
    if(!openKeys.length)return;
    const active=panels[mostRecent]&&!panels[mostRecent].hidden?mostRecent:openKeys.at(-1);
    toggle(active,false);
    event.stopPropagation();
  });
  // Desktop only: drag from the panel title, not from form or calculator controls.
  for(const [key,panel] of Object.entries(panels)){
    const handle=panel.querySelector('[data-float-handle]');
    if(!handle)continue;
    let pointer=null;
    handle.addEventListener('pointerdown',event=>{
      if(!large()||event.button!==0||event.target.closest('button,input,select,a'))return;
      const rect=panel.getBoundingClientRect();
      pointer={id:event.pointerId,mouseX:event.clientX,mouseY:event.clientY,x:rect.left,y:rect.top};
      panel.style.left=rect.left+'px';panel.style.top=rect.top+'px';
      panel.style.right='auto';panel.style.bottom='auto';
      handle.setPointerCapture(event.pointerId);
      mostRecent=key;
      event.preventDefault();
    });
    handle.addEventListener('pointermove',event=>{
      if(!pointer||pointer.id!==event.pointerId)return;
      const x=Math.min(Math.max(8,pointer.x+event.clientX-pointer.mouseX),Math.max(8,innerWidth-panel.offsetWidth-8));
      const y=Math.min(Math.max(8,pointer.y+event.clientY-pointer.mouseY),Math.max(8,innerHeight-96));
      panel.style.left=x+'px';panel.style.top=y+'px';
    });
    const stop=event=>{if(pointer&&event.pointerId===pointer.id)pointer=null};
    handle.addEventListener('pointerup',stop);
    handle.addEventListener('pointercancel',stop);
    handle.addEventListener('lostpointercapture',()=>{pointer=null});
  }
  window.addEventListener('resize',()=>{
    if(!large()&&!quote.hidden&&!basic.hidden)apply(mostRecent==='basic'?'quote':'basic',false);
    if(!large())for(const panel of Object.values(panels)){
      panel.style.left='';panel.style.right='';panel.style.top='';panel.style.bottom='';
    }
  },{passive:true});
})();
