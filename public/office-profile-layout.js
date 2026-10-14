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
