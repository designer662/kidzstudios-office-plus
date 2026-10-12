/* Office Plus V75: pointer-safe click-away / back behavior on every page.
 * Uses existing UI close actions to keep app state coherent. No page navigation.
 */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const active = element => Boolean(element && element.classList.contains('open'));
  const hit = (target, element) => Boolean(element && element.contains(target));
  const clickClose = id => {
    const button = $(id);
    if (!button || button.disabled) return false;
    button.click();
    return true;
  };
  const blockUnderlay = event => {
    event.preventDefault();
    event.stopImmediatePropagation();
  };

  // Frontmost first. Do not close an editor behind a confirmation dialog.
  const modalList = [
    ['confirmModal', 'confirmClose', '.dialog', 'open'],
    ['optionsModal', 'optionsClose', '.dialog', 'open'],
    ['excelImportModal', 'excelImportClose', '.dialog', 'open'],
    ['sheetImportModal', 'sheetImportClose', '.dialog', 'open'],
    ['exportModal', 'exportClose', '.dialog', 'open'],
    ['editor', 'editorClose', '.dialog', 'open'],
    ['tempUserModal', null, '.temp-user-dialog', 'open'],
    ['staffEditorModal', 'staffEditorClose', '.job-link-dialog', 'open'],
    ['workloadEditorModal', 'workloadEditorClose', '.job-link-dialog', 'open'],
    ['driveLinkModal', 'driveLinkClose', '.job-link-dialog', 'open'],
    ['jobLinkModal', 'jobLinkClose', '.job-link-dialog', 'open'],
    ['saveProfileModal', null, '.modal-content', 'block'],
    ['previewModal', null, '.modal-content', 'block']
  ];

  function frontModal() {
    for (const [id, closeId, contentSelector, mode] of modalList) {
      const element = $(id);
      if (!element) continue;
      const shown = mode === 'block'
        ? element.style.display === 'block'
        : active(element);
      if (shown) return {element, closeId, contentSelector, id};
    }
    return null;
  }

  function dismissModal(modal) {
    if (modal.closeId) return clickClose(modal.closeId);
    if (modal.id === 'tempUserModal') {
      const close = modal.element.querySelector('.temp-user-close');
      if (!close) return false;
      close.click(); return true;
    }
    if (modal.id === 'previewModal' || modal.id === 'saveProfileModal') {
      // Order forms expose close functions through inline buttons. Always use those
      // functions to clean up the PDF / preview state rather than hiding the overlay.
      const close = modal.element.querySelector('.close-btn');
      if (!close) return false;
      close.click(); return true;
    }
    return false;
  }

  function closeInlinePanel(target) {
    // Closing a selected staff profile also closes its attached emoji picker
    // and follow state. Test the profile before emoji so one blank-space click
    // never leaves a second floating panel behind.
    const profile = $('profileCard');
    if (active(profile) && !hit(target,profile) && !hit(target,$('characterEmojiPicker'))) {
      const close = profile.querySelector('.close-mini');
      if (close) {close.click();return true;}
    }
    const context = $('contextCard');
    if (active(context) && !hit(target,context)) {
      const close = context.querySelector('.close-mini');
      if (close) {close.click();return true;}
    }
    const emoji = $('characterEmojiPicker');
    if (emoji && !emoji.hidden && !hit(target,emoji)) {
      if (clickClose('characterEmojiClose')) return true;
    }
    const notification = $('notificationPanel');
    if (active(notification) && !hit(target,notification) && !hit(target,document.querySelector('.notification-wrap'))) {
      const btn = $('notificationBtn');
      if (btn) {btn.click();return true;}
    }
    const chat = $('officeChat');
    if (active(chat) && !hit(target,chat) && !hit(target,$('chatLauncher'))) {
      if (clickClose('chatCloseBtn')) return true;
    }
    const live = $('livePanel');
    if (live && !hit(target,live)) {
      if (live.classList.contains('maximized')) {
        if (clickClose('maximizeLiveBtn')) return true;
      } else if (live.classList.contains('expanded')) {
        if (clickClose('expandLiveBtn')) return true;
      }
    }
    const today = $('todayPanel');
    if (today && !hit(target,today)) {
      if (today.classList.contains('expanded') && clickClose('opsExpandBtn')) return true;
      if (today.classList.contains('mobile-open') && clickClose('opsMobileToggle')) return true;
    }
    return false;
  }

  function closeDropdowns(target) {
    let closed = false;
    // <details> menus (Tools, More Filters, native disclosure popovers).
    for (const details of document.querySelectorAll('details[open]')) {
      if (!details.contains(target)) { details.open = false; closed = true; }
    }
    // Editable Job Management combo menus.
    for (const combo of document.querySelectorAll('.combo-shell.open')) {
      if (!combo.contains(target)) { combo.classList.remove('open'); closed = true; }
    }
    return closed;
  }

  let lastPointerDown = 0;
  let pointerDismissed = false;
  // Three.js selects a character on pointerup, BEFORE the browser sends click.
  // Dismiss on pointerdown instead, then ignore that same pointer's subsequent
  // click so a freshly opened character profile remains open.
  function pointerDownAway(event) {
    if (event.button !== 0 || !event.target || !event.target.closest) return;
    lastPointerDown = Date.now();
    pointerDismissed = false;
    if (frontModal()) return; // Modal backdrops use the existing click handler.
    closeDropdowns(event.target);
    pointerDismissed = closeInlinePanel(event.target);
  }

  function clickAway(event) {
    if (event.button !== 0 || !event.target || !event.target.closest) return;
    const target = event.target;
    const modal = frontModal();
    if (modal) {
      const content = modal.element.querySelector(modal.contentSelector);
      if (!hit(target,content) && dismissModal(modal)) blockUnderlay(event);
      return;
    }
    // A pointer's click fires after pointerup and must not close a new profile
    // opened by a 3D raycast. Keyboard/synthetic clicks still dismiss normally.
    const samePointerClick = event.detail > 0 && Date.now() - lastPointerDown < 1600;
    if (samePointerClick) return;
    closeDropdowns(target);
    const didClose = closeInlinePanel(target);

    // Office Pulse's internal tabs return to Pulse when users click empty canvas.
    // Clicking a real navigation link or interactive control never resets the tab.
    const officeSurface = $('mapShell');
    const isBlank = officeSurface && hit(target,officeSurface) &&
      !target.closest('button,a,input,select,textarea,label,[role="button"],.employee,.person-label,.room-label,.desk-hit,[contenteditable="true"]');
    if (!didClose && isBlank && !hit(target,$('todayPanel'))) {
      const pulse = document.querySelector('[data-ops-tab="pulse"]');
      if (pulse && !pulse.classList.contains('active')) pulse.click();
    }
  }

  document.addEventListener('pointerdown',pointerDownAway,true);
  document.addEventListener('click',clickAway,true);
  // Exported only for DOM-level regression tests and diagnosing integrations.
  window.KSOutsideClose = {frontModal,closeDropdowns,closeInlinePanel,clickAway,pointerDownAway};
})();
