/* V86.1: Office Plus inline 3D quality; no duplicate dashboard or network polling. */
(() => {
  'use strict';
  const select = document.getElementById('ksVisualQuality');
  if (!select) return;
  const KEY = 'ks-3d-quality-v86';
  try { const stored = localStorage.getItem(KEY); if (['eco','balanced','high'].includes(stored)) select.value=stored; else if (matchMedia('(max-width: 650px), (prefers-reduced-motion: reduce)').matches) select.value='eco'; } catch (_) { if (matchMedia('(max-width: 650px)').matches) select.value='eco'; }
  let controller = null;
  function apply(){
    if (window.office3d?.setQuality) { window.office3d.setQuality(select.value); controller=window.office3d; return true; }
    return false;
  }
  select.addEventListener('change', () => { try { localStorage.setItem(KEY, select.value); } catch (_) {} apply(); });
  if (!apply()) {
    // The 3D renderer loads asynchronously; retry only until ready, not forever.
    let attempts=0;
    const timer=setInterval(()=>{ attempts++; if(apply()||attempts>=60)clearInterval(timer); },500);
    window.addEventListener('pagehide',()=>clearInterval(timer),{once:true});
  }
  window.addEventListener('ks:3d-ready',()=>{ if(window.office3d&&window.office3d!==controller)apply(); });
})();
