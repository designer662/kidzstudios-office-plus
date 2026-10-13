/* Office Plus V69: gentle, opt-out notification chime shared across dashboard and tools. */
(() => {
  'use strict';
  const KEY = 'ksOfficeNotificationSoundV1';
  const safeLoad = () => { try { return localStorage.getItem(KEY) !== 'off'; } catch (_) { return true; } };
  let enabled = safeLoad();
  let context = null;
  let lastPlayed = 0;
  let unlocked = false;
  const buttons = new Set();
  function updateButtons() {
    for (const btn of buttons) {
      if (!btn.isConnected) { buttons.delete(btn); continue; }
      btn.textContent = enabled ? '🔊 Sound on' : '🔇 Muted';
      btn.setAttribute('aria-pressed', String(enabled));
      btn.setAttribute('title', enabled ? 'Mute new office updates' : 'Enable notification sound');
    }
  }
  function arm() {
    if (!enabled) return false;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return false;
      if (!context || context.state === 'closed') context = new Ctx();
      if (context.state === 'suspended') context.resume().catch(() => {});
      unlocked = context.state === 'running';
      return unlocked;
    } catch (_) { return false; }
  }
  function setEnabled(on) {
    enabled = !!on;
    try { localStorage.setItem(KEY, enabled ? 'on' : 'off'); } catch (_) {}
    if (enabled) arm();
    updateButtons();
    // Turning audio on previews a single quiet chime after a click (where allowed).
    if (enabled && context?.state === 'running') play('test', true);
  }
  function tone(time, frequency, duration, volume) {
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, time);
    gain.gain.setValueAtTime(.0001, time);
    gain.gain.exponentialRampToValueAtTime(volume, time + .025);
    gain.gain.exponentialRampToValueAtTime(.0001, time + duration);
    osc.connect(gain);
    gain.connect(context.destination);
    osc.start(time);
    osc.stop(time + duration + .015);
    osc.onended = () => { try { osc.disconnect(); gain.disconnect(); } catch (_) {} };
  }
  function play(kind = 'update', force = false) {
    if (!enabled || (!force && document.hidden)) return false;
    if (!context || context.state !== 'running') return false; // Browsers require a user gesture.
    const now = Date.now();
    if (!force && now - lastPlayed < 1100) return false; // Batch burst updates into one chime.
    lastPlayed = now;
    try {
      const t = context.currentTime + .012;
      if (kind === 'chat_message' || kind === 'chat') {
        tone(t, 740, .15, .038); tone(t + .12, 990, .23, .032);
      } else {
        tone(t, 660, .20, .034); tone(t + .13, 880, .26, .029);
      }
      return true;
    } catch (_) { return false; }
  }
  function attachControls() {
    const panel = document.getElementById('notificationPanel');
    const head = panel?.querySelector('.notification-panel-head');
    if (!head || head.querySelector('.ks-sound-toggle')) return;
    const btn = document.createElement('button');
    btn.className = 'ks-sound-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle office notification sound');
    btn.addEventListener('click', e => { e.stopPropagation(); setEnabled(!enabled); });
    const clearBtn = head.querySelector('#notificationClearBtn');
    if (clearBtn) head.insertBefore(btn, clearBtn);
    else head.appendChild(btn);
    buttons.add(btn);
    updateButtons();
    if (!document.getElementById('ks-notification-sound-style')) {
      const style = document.createElement('style');
      style.id = 'ks-notification-sound-style';
      style.textContent = '.ks-sound-toggle{flex:0 0 auto;margin-left:auto;margin-right:8px;white-space:nowrap;border:1px solid rgba(239,123,69,.18)!important;border-radius:10px!important;padding:7px 9px!important;background:#fff9f4!important;color:#ae5a34!important;font:800 10px/1.1 Inter,Arial,sans-serif!important;cursor:pointer!important}.ks-sound-toggle[aria-pressed="false"]{background:#f7f7f7!important;border-color:#e4e4e4!important;color:#7c8185!important}.ks-sound-toggle:hover{filter:brightness(.98)}';
      document.head.appendChild(style);
    }
  }
  document.addEventListener('pointerdown', arm, {capture:true});
  document.addEventListener('keydown', arm, {capture:true});
  window.addEventListener('storage', e => { if (e.key !== KEY) return; enabled = safeLoad(); updateButtons(); });
  window.KSNotificationSound = { play, arm, isEnabled: () => enabled, setEnabled, attachControls };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', attachControls, {once:true});
  else attachControls();
})();
