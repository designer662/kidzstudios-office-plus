/* Office Plus V58.1 – dashboard behaviour (index.html only).
   Works on top of the existing page scripts by clicking their own buttons; it never replaces their logic. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = matchMedia('(max-width: 920px)');
  const html = document.documentElement;

  /* ───── 1. Bottom dock (desktop): sync chip + note in one slim bar, no overlaps ───── */
  function buildDock() {
    if ($('#ksDock')) return $('#ksDock');
    const dock = document.createElement('div');
    dock.id = 'ksDock';
    document.body.append(dock);
    const adopt = el => { if (el && el.parentNode !== dock) dock.append(el); };
    adopt($('.ks-shared-status'));
    adopt($('.ks-version-footer'));
    adopt($('.studio-note'));
    // The sync chip is created a moment after load by shared-sync.js
    const mo = new MutationObserver(() => { adopt($('.ks-shared-status')); });
    mo.observe(document.body, { childList: true });
    setTimeout(() => mo.disconnect(), 8000);
    return dock;
  }

  /* ───── 2. Mobile app shell: bottom nav driving the existing panels as sheets ───── */
  const ICONS = {
    office: '<svg viewBox="0 0 24 24"><path d="M3 21V9l9-6 9 6v12"/><path d="M9 21v-6h6v6"/></svg>',
    ops: '<svg viewBox="0 0 24 24"><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/></svg>',
    live: '<svg viewBox="0 0 24 24"><path d="M3 12h4l3-8 4 16 3-8h4"/></svg>',
    chat: '<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>'
  };
  function buildNav() {
    if ($('#ksNav')) return;
    const nav = document.createElement('nav');
    nav.id = 'ksNav';
    nav.setAttribute('aria-label', 'Office sections');
    nav.innerHTML = [
      ['office', 'Office'], ['ops', 'Pulse'], ['live', 'Activity'], ['chat', 'Chat']
    ].map(([k, label]) => `<button type="button" data-sheet="${k}" aria-pressed="false">${ICONS[k]}<span>${label}</span>${k === 'chat' ? '<i class="ks-badge" hidden></i>' : ''}</button>`).join('');
    const scrim = document.createElement('div');
    scrim.id = 'ksScrim';
    ($('#mapShell') || document.body).append(scrim);
    document.body.append(nav);

    const panel = $('#todayPanel'), chat = $('#officeChat');
    const isOpen = {
      ops: () => panel?.classList.contains('mobile-open'),
      live: () => document.body.classList.contains('ks-sheet-live'),
      chat: () => chat?.classList.contains('open')
    };
    const close = {
      ops: () => { if (isOpen.ops()) $('#opsMobileToggle')?.click(); },
      live: () => document.body.classList.remove('ks-sheet-live'),
      chat: () => { if (isOpen.chat()) $('#chatLauncher')?.click(); }
    };
    const open = {
      ops: () => { if (!isOpen.ops()) $('#opsMobileToggle')?.click(); },
      live: () => document.body.classList.add('ks-sheet-live'),
      chat: () => { if (!isOpen.chat()) $('#chatLauncher')?.click(); }
    };
    function closeAll(except) { for (const k of Object.keys(close)) if (k !== except) close[k](); }
    function sync() {
      const any = isOpen.ops() || isOpen.live() || isOpen.chat();
      nav.querySelectorAll('button').forEach(b => {
        const k = b.dataset.sheet;
        const on = k === 'office' ? !any : !!isOpen[k]?.();
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      scrim.classList.toggle('show', any);
      const unread = $('#chatUnread');
      const badge = nav.querySelector('.ks-badge');
      if (badge) { const n = unread && !unread.hidden ? unread.textContent.trim() : ''; badge.hidden = !n || n === '0'; badge.textContent = n; }
    }
    nav.addEventListener('click', e => {
      const b = e.target.closest('button[data-sheet]');
      if (!b) return;
      const k = b.dataset.sheet;
      if (k === 'office') { closeAll(); }
      else if (isOpen[k]()) { close[k](); }
      else { closeAll(k); open[k](); }
      setTimeout(sync, 30);
    });
    scrim.addEventListener('click', () => { closeAll(); setTimeout(sync, 30); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && mobile.matches) { closeAll(); setTimeout(sync, 30); } });
    const mo = new MutationObserver(sync);
    [panel, chat, $('#chatUnread'), document.body].forEach(el => el && mo.observe(el, { attributes: true, childList: el.id === 'chatUnread', characterData: true, subtree: el.id === 'chatUnread' }));
    mobile.addEventListener?.('change', () => { if (!mobile.matches) { closeAll(); document.body.classList.remove('ks-sheet-live'); } sync(); });
    sync();
  }

  /* Status text is hidden on the desktop panel to keep the header clean; keep it available as a tooltip */
  function mirrorSourceTitle() {
    const dot = $('#opsSourceDot'), txt = $('#opsSource');
    if (!dot || !txt) return;
    const set = () => { dot.title = txt.textContent.trim(); dot.setAttribute('role', 'img'); dot.setAttribute('aria-label', 'Data status: ' + dot.title); };
    set();
    new MutationObserver(set).observe(txt, { childList: true, characterData: true, subtree: true });
  }

  /* ───── 3. Count-up for KPI numbers ───── */
  let countUpOn = false;
  function setupCountUp() {
    if (reduceMotion || countUpOn) return;
    countUpOn = true;
    const shown = new WeakMap();
    const tween = (el, from, to) => {
      const node = el.firstChild;
      if (!node || node.nodeType !== 3) return;
      const t0 = performance.now(), dur = 650;
      const step = now => {
        const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        node.nodeValue = String(Math.round(from + (to - from) * e));
        if (k < 1) requestAnimationFrame(step); else node.nodeValue = String(to);
      };
      requestAnimationFrame(step);
    };
    const handle = el => {
      const raw = el.textContent.trim();
      if (!/^\d+$/.test(raw)) return;
      const to = parseInt(raw, 10), from = shown.has(el) ? shown.get(el) : 0;
      shown.set(el, to);
      if (from !== to) tween(el, from, to);
    };
    const mo = new MutationObserver(list => {
      for (const m of list) {
        const el = m.target.nodeType === 1 ? m.target : m.target.parentElement;
        if (el && el.matches?.('.today-number, .stat-num')) handle(el);
      }
    });
    ['#todayPanel', '#livePanel'].forEach(s => { const r = $(s); if (r) mo.observe(r, { childList: true, subtree: true }); });
  }

  /* ───── 4. Non-blocking, one-time entry animation. 3D waits must not hide controls. ───── */
  let introDone=false;
  function runIntro(){
    if(introDone)return;
    introDone=true;
    const key='ksIntroShownV8651';
    try{if(sessionStorage.getItem(key)==='1')return;sessionStorage.setItem(key,'1')}catch(_){}
    if(reduceMotion)return;
    // Do not start a camera animation until the scene is ready; never block the dashboard.
    const overlay=document.createElement('div');overlay.id='ksIntro';overlay.setAttribute('aria-hidden','true');
    overlay.innerHTML='<div class="vig"></div><div class="bar t"></div><div class="bar b"></div><div class="title"><b>Kidz</b>studios<small>Office Plus</small></div>';
    document.body.append(overlay);
    let closed=false,raf=0;
    const done=()=>{
      if(closed)return;closed=true;cancelAnimationFrame(raf);
      overlay.classList.add('go');
      setTimeout(()=>overlay.remove(),360);
      removeEventListener('pointerdown',done,true);
      removeEventListener('keydown',done,true);
      removeEventListener('wheel',done,true);
      document.documentElement.classList.remove('ks-intro','ks-intro-go');
    };
    // Dismiss quickly and safely, even if 3D fails or the user interacts.
    addEventListener('pointerdown',done,true);addEventListener('keydown',done,true);
    addEventListener('wheel',done,{capture:true,passive:true});
    setTimeout(done,1700);
    const start=performance.now();
    function move(now){
      if(closed)return;
      const scene=window.office3d;
      if(scene&&typeof scene.zoomBy==='function'&&typeof scene.rotateBy==='function'){
        // A tiny overview movement only; avoid modifying staff or AI navigation state.
        const ease=Math.max(0,Math.min(1,(now-start)/1500));
        const wave=(1-Math.cos(ease*Math.PI))/2;
        if(!move.last)move.last=0;
        const diff=wave-move.last;move.last=wave;
        if(diff>0){scene.zoomBy(1+diff*0.055);scene.rotateBy(diff*0.11)}
      }
      raf=requestAnimationFrame(move);
    }
    raf=requestAnimationFrame(move);
  }

  /* ───── boot ───── */
  function boot() {
    buildDock();
    buildNav();
    setupCountUp();
    mirrorSourceTitle();
    try { runIntro(); } catch (err) { html.classList.remove('ks-intro', 'ks-intro-go'); $('#ksIntro')?.remove(); console.warn('Intro skipped', err); }
  }
  const ready = () => html.dataset.ksAuth === 'ok';
  if (ready()) boot();
  else {
    addEventListener('ks:auth-ready', boot, { once: true });
    // safety net if the event was missed
    const iv = setInterval(() => { if (ready()) { clearInterval(iv); boot(); } }, 400);
    setTimeout(() => clearInterval(iv), 60000);
  }
})();
