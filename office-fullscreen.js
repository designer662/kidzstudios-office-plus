/* V86.53 — optional browser fullscreen, scoped to the simulator only. */
(()=>{
 'use strict';
 const map=document.getElementById('mapShell'),toggle=document.getElementById('ksOfficeFullscreen');
 if(!map||!toggle)return;
 const draw=()=>{
  const active=document.fullscreenElement===map;
  toggle.setAttribute('aria-pressed',String(active));
  toggle.setAttribute('aria-label',active?'Exit fullscreen office simulator':'Enter fullscreen office simulator');
  toggle.title=active?'Exit fullscreen (Esc)':'Fullscreen simulator';
  toggle.querySelector('span').textContent=active?'Exit fullscreen':'Fullscreen';
  // Three.js and the 2D fallback need the new scene dimensions.
  window.dispatchEvent(new Event('resize'));
 };
 toggle.addEventListener('click',async()=>{
  if(!map.requestFullscreen){toggle.title='Fullscreen mode is not supported in this browser';return}
  try{
   if(document.fullscreenElement===map)await document.exitFullscreen();
   else await map.requestFullscreen();
  }catch(_){toggle.title='Fullscreen request was blocked by the browser'}
  draw();
 });
 document.addEventListener('fullscreenchange',draw);
 document.addEventListener('fullscreenerror',()=>{toggle.title='Unable to enter fullscreen'});
})();
