/* Kidz Studios responsive navigation. Shared across all 11 pages. */
(() => {
  'use strict';
  const header = document.querySelector('.ks-master-header');
  const nav = header?.querySelector('.tool-nav');
  const headerTools = header?.querySelector('.header-tools');
  if (!header || !nav || !headerTools || document.getElementById('ksMobileMenu')) return;

  const toggle = document.createElement('button');
  toggle.id = 'ksMobileMenu';
  toggle.className = 'ks-mobile-menu-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Open workspace menu');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'ksMobileDrawer');
  toggle.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg><span>Menu</span>';
  headerTools.insertBefore(toggle, headerTools.firstChild);

  const layer = document.createElement('div');
  layer.className = 'ks-mobile-layer';
  layer.id = 'ksMobileLayer';
  layer.hidden = true;
  layer.innerHTML = `
    <div class="ks-mobile-backdrop" data-ks-menu-close="true"></div>
    <aside class="ks-mobile-drawer" id="ksMobileDrawer" role="dialog" aria-modal="true" aria-labelledby="ksMobileDrawerTitle" tabindex="-1">
      <div class="ks-mobile-drawer-head">
        <div><span class="ks-mobile-drawer-kicker">KIDZ STUDIOS</span><h2 id="ksMobileDrawerTitle">Office Workspace</h2><p>Choose where you want to work</p></div>
        <button type="button" class="ks-mobile-drawer-close" aria-label="Close workspace menu" data-ks-menu-close="true">&times;</button>
      </div>
      <div class="ks-mobile-menu-content"></div>
      <div class="ks-mobile-menu-footer">Kidz Studios · Office Plus</div>
    </aside>`;
  document.body.appendChild(layer);
  const drawer = layer.querySelector('.ks-mobile-drawer');
  const content = layer.querySelector('.ks-mobile-menu-content');
  const labels = [
    ['Workspace', ['index.html', 'job-management.html', 'report.html']],
    ['Sales & Finance', ['pricelist-calculator.html', 'markup-calculator.html', 'calculator.html', 'commission.html']],
    ['Orders & Utilities', ['orderform1.html', 'orderform2.html', 'file-name-generator.html', 'files-compress.html']]
  ];
  const home = document.createElement('a');
  home.href = 'index.html';
  home.className = 'tool-nav-btn';
  home.dataset.tool = 'Office Dashboard';
  home.innerHTML = '<span class="nav-tool-icon" aria-hidden="true">⌂</span><span>Office Dashboard</span>';
  const original = [home, ...nav.querySelectorAll('a.tool-nav-btn')];
  const grouped = new Set();
  for (const [groupName, pages] of labels) {
    const group = document.createElement('section');
    group.className = 'ks-mobile-menu-group';
    const heading = document.createElement('h3');
    heading.textContent = groupName;
    group.appendChild(heading);
    const links = document.createElement('div');
    links.className = 'ks-mobile-menu-links';
    for (const href of pages) {
      const link = original.find(a => (a.getAttribute('href') || '').split('#')[0] === href);
      if (!link) continue;
      grouped.add(href);
      const clone = link.cloneNode(true);
      clone.classList.add('ks-mobile-menu-link');
      const isActive = (location.pathname.split('/').pop() || 'index.html').toLowerCase() === href;
      clone.classList.toggle('active', isActive);
      if (isActive) clone.setAttribute('aria-current', 'page');
      clone.setAttribute('aria-label', clone.dataset.tool || clone.textContent.trim());
      links.appendChild(clone);
    }
    group.appendChild(links);
    content.appendChild(group);
  }
  const other = original.filter(a => !grouped.has(a.getAttribute('href')));
  if (other.length) {
    const group = document.createElement('section');
    group.className = 'ks-mobile-menu-group';
    group.innerHTML = '<h3>More tools</h3>';
    const links = document.createElement('div');
    links.className = 'ks-mobile-menu-links';
    other.forEach(a => { const clone = a.cloneNode(true);clone.classList.add('ks-mobile-menu-link');links.appendChild(clone); });
    group.appendChild(links);
    content.appendChild(group);
  }

  let previouslyFocused = null;
  const isOpen = () => !layer.hidden;
  function setOpen(next) {
    if (Boolean(next) === isOpen()) return;
    layer.hidden = !next;
    document.body.classList.toggle('ks-mobile-menu-open', Boolean(next));
    toggle.setAttribute('aria-expanded', String(Boolean(next)));
    toggle.setAttribute('aria-label', next ? 'Close workspace menu' : 'Open workspace menu');
    if (next) {
      previouslyFocused = document.activeElement;
      drawer.focus({preventScroll: true});
    } else {
      (previouslyFocused?.isConnected ? previouslyFocused : toggle)?.focus({preventScroll: true});
    }
  }
  toggle.addEventListener('click', () => setOpen(!isOpen()));
  layer.addEventListener('click', event => {
    if (event.target.closest('[data-ks-menu-close]') || event.target.closest('.ks-mobile-menu-link')) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (!isOpen()) return;
    if (event.key === 'Escape') { event.preventDefault();setOpen(false);return; }
    if (event.key !== 'Tab') return;
    const focusable = [...drawer.querySelectorAll('a[href],button:not([disabled])')].filter(el => el.getClientRects().length);
    if (!focusable.length) {event.preventDefault(); drawer.focus();return;}
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === drawer)) {event.preventDefault();last.focus();}
    else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
  });
  const media = window.matchMedia('(max-width: 900px)');
  const onChange = () => { if (!media.matches && isOpen()) setOpen(false); };
  if (media.addEventListener) media.addEventListener('change',onChange);
  else media.addListener(onChange);
})();
