/* Office Plus V75: dock the open profile outside the Operations sidebar.
 * On narrow screens, give the selected profile exclusive space and restore
 * Operations immediately after the profile is closed. Does not move DOM nodes.
 */
(() => {
  'use strict';
  const shell=document.getElementById('mapShell');
  const operations=document.getElementById('todayPanel');
  const cards=['profileCard','contextCard'].map(id=>document.getElementById(id)).filter(Boolean);
  if (!shell || !operations || !cards.length) return;
  let scheduled=false;
  const set=(node,name,value)=>node.style.setProperty(name,value,'important');
  function layout(){
    scheduled=false;
    const card=cards.find(node=>node.classList.contains('open'));
    if (!card){
      shell.classList.remove('ks-profile-docked','ks-profile-exclusive');
      cards.forEach(node=>['left','right','top','bottom','width','max-height','position'].forEach(name=>node.style.removeProperty(name)));
      return;
    }
    const bounds=shell.getBoundingClientRect();
    if(bounds.width<10 || bounds.height<10)return;
    // Mobile cards share the same sheet area as Pulse/Chat. Inline desktop
    // coordinates used to override the mobile CSS and cover the bottom tabs.
    if(matchMedia('(max-width:920px)').matches){
      shell.classList.remove('ks-profile-docked','ks-profile-exclusive');
      const fullscreen=document.fullscreenElement===shell;
      const nav=fullscreen?0:(document.getElementById('ksNav')?.getBoundingClientRect().height||64);
      const header=fullscreen?0:(document.querySelector('.ks-master-header')?.getBoundingClientRect().bottom||76);
      const height=Math.max(96,Math.min(innerHeight*.66,innerHeight-nav-header-24));
      set(card,'position','fixed');set(card,'left','8px');set(card,'right','8px');
      set(card,'top','auto');set(card,'bottom',Math.ceil(nav+8)+'px');
      set(card,'width','auto');set(card,'max-height',Math.floor(height)+'px');
      return;
    }
    const opsBounds=operations.getBoundingClientRect();
    const visible=getComputedStyle(operations).display!=='none' && opsBounds.width>1 && opsBounds.height>1;
    const available=visible ? opsBounds.left-bounds.left-26 : bounds.width-24;
    const exclusive=visible && available<268;
    shell.classList.toggle('ks-profile-exclusive',exclusive);
    shell.classList.toggle('ks-profile-docked',!exclusive);
    const width=Math.min(320,Math.max(120,exclusive?bounds.width-24:available));
    const x=exclusive?Math.max(12,(bounds.width-width)/2):visible?Math.max(12,opsBounds.left-bounds.left-width-14):Math.max(12,bounds.width-width-18);
    const top=Math.max(14,Math.min(104,bounds.height-220));
    const height=Math.max(130,bounds.height-top-24);
    set(card,'position','absolute');
    set(card,'left',Math.round(x)+'px');
    set(card,'right','auto');
    set(card,'top',Math.round(top)+'px');
    set(card,'bottom','auto');
    set(card,'width',Math.round(width)+'px');
    set(card,'max-height',Math.round(height)+'px');
    document.dispatchEvent?.(new CustomEvent('ks:office-profile-layout',{detail:{exclusive}}));
  }
  function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(layout)}
  if(typeof MutationObserver==='function'){
    const observer=new MutationObserver(schedule);
    cards.forEach(node=>observer.observe(node,{attributes:true,attributeFilter:['class']}));
    observer.observe(operations,{attributes:true,attributeFilter:['class']});
    observer.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
  }
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('orientationchange',schedule,{passive:true});
  // A worker may be opened directly from 3D after the initial page load.
  schedule();
  window.KSOfficeProfileLayout={layout,schedule};
})();
