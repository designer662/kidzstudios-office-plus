/* Office Plus V58.1 – page transitions for every page.
   Leaving: content fades/slides out and a progress line runs. Entering: content glides in once the user is authenticated.
   The dashboard has its own cinematic intro, so it skips the generic enter animation. */
(() => {
  'use strict';
  const html = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDashboard = () => !!document.getElementById('office3dHost');

  function enter() {
    if (reduce || isDashboard()) return;
    html.classList.add('ks-enter');
    setTimeout(() => html.classList.remove('ks-enter'), 1100);
  }
  if (html.dataset.ksAuth === 'ok' || !window.OfficeSupabase) enter();
  else addEventListener('ks:auth-ready', enter, { once: true });

  let leaving = false;
  function bar() {
    let el = document.getElementById('ksProgress');
    if (!el) { el = document.createElement('div'); el.id = 'ksProgress'; document.body.append(el); }
    return el;
  }
  document.addEventListener('click', e => {
    if (reduce || leaving || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download') || a.getAttribute('rel')?.includes('external')) return;
    let url;
    try { url = new URL(a.href, location.href); } catch { return; }
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search) return; // hash / same page
    if (!/\.html$|\/$/.test(url.pathname)) return;
    e.preventDefault();
    leaving = true;
    html.classList.add('ks-leave');
    html.dataset.ksDir = isDashboard() ? 'deeper' : (/index\.html$|\/$/.test(url.pathname) ? 'back' : 'across');
    requestAnimationFrame(() => bar().classList.add('run'));
    setTimeout(() => { location.href = url.href; }, 340);
  });
  addEventListener('pageshow', e => {
    if (e.persisted) { leaving = false; html.classList.remove('ks-leave'); document.getElementById('ksProgress')?.classList.remove('run'); enter(); }
  });
})();
