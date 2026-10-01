/* Negotiation Xpert — installable app support: service worker registration,
   the install prompt, and the "new version available" update flow. */
(function (root) {
  'use strict';
  const NX = root.NX = root.NX || {};
  const nav = root.navigator;
  const listeners = [];
  const state = { reg: null, deferred: null, updateReady: false, version: null, installed: false };

  const emit = (type, detail) => listeners.forEach(fn => { try { fn(type, detail); } catch (e) { /* listener errors stay local */ } });
  const mm = q => !!(root.matchMedia && root.matchMedia(q).matches);
  const isStandalone = () => mm('(display-mode: standalone)') || mm('(display-mode: window-controls-overlay)') || nav.standalone === true;
  const isIOS = () => /iphone|ipad|ipod/i.test(nav.userAgent) || (nav.platform === 'MacIntel' && nav.maxTouchPoints > 1);
  const isMacSafari = () => /Macintosh/.test(nav.userAgent) && /Safari/.test(nav.userAgent) && !/Chrome|Chromium|Edg|Firefox/.test(nav.userAgent) && !isIOS();

  // Install: Chromium browsers fire beforeinstallprompt; Safari needs manual steps.
  root.addEventListener('beforeinstallprompt', e => { e.preventDefault(); state.deferred = e; emit('install'); });
  root.addEventListener('appinstalled', () => { state.deferred = null; state.installed = true; emit('install'); });

  function canInstall() {
    if (isStandalone() || state.installed) return false;
    return !!state.deferred || isIOS() || isMacSafari();
  }
  async function promptInstall() {
    if (state.deferred) {
      const d = state.deferred;
      state.deferred = null;
      d.prompt();
      try { await d.userChoice; } catch (e) { /* dismissed */ }
      emit('install');
      return 'prompted';
    }
    return isIOS() ? 'ios' : (isMacSafari() ? 'mac' : 'unsupported');
  }

  // Updates: a new service worker installs in the background and waits; the page offers "Reload".
  function markUpdate() { if (!state.updateReady) { state.updateReady = true; emit('update'); } }
  function track(worker) {
    if (!worker) return;
    worker.addEventListener('statechange', () => {
      if (worker.state === 'installed' && nav.serviceWorker.controller) markUpdate();
    });
  }
  let reloading = false;
  function applyUpdate() {
    const w = state.reg && state.reg.waiting;
    if (!w) { root.location.reload(); return; }
    reloading = true;
    w.postMessage('SKIP_WAITING');
  }
  function askVersion(worker) {
    if (!worker || !root.MessageChannel) return;
    const ch = new MessageChannel();
    ch.port1.onmessage = e => { state.version = e.data && e.data.version; emit('version', state.version); };
    worker.postMessage('GET_VERSION', [ch.port2]);
  }

  // This app lives at /Negotiation_Xpert/ on a github.io origin shared with other apps.
  const APP_PATH = '/Negotiation_Xpert/';
  const SW_MARKER = 'Negotiation Xpert — service worker';
  const LEGACY_CACHE = /^nx-\d+\.\d+\.\d+-[0-9a-f]{8}$/;

  // Removes Negotiation Xpert service workers registered with any scope other than APP_PATH
  // (e.g. from an older deployment at the site root) and caches from versions up to 1.1.0.
  // Other apps' service workers are identified by their script contents and left untouched.
  async function cleanupLegacy() {
    try {
      const regs = await nav.serviceWorker.getRegistrations();
      await Promise.all(regs.map(async reg => {
        if (new URL(reg.scope).pathname === APP_PATH) return;
        const w = reg.active || reg.waiting || reg.installing;
        if (!w) return;
        try {
          const res = await fetch(w.scriptURL, { cache: 'no-store' });
          if (res.ok && (await res.text()).includes(SW_MARKER)) await reg.unregister();
        } catch (e) { /* cannot read the script: leave it alone */ }
      }));
    } catch (e) { /* registrations unavailable */ }
    try {
      if (root.caches) {
        const keys = await root.caches.keys();
        await Promise.all(keys.filter(k => LEGACY_CACHE.test(k)).map(k => root.caches.delete(k)));
      }
    } catch (e) { /* cache storage unavailable */ }
  }

  function register() {
    if (!('serviceWorker' in nav) || root.location.protocol === 'file:') return;
    cleanupLegacy();
    // Only register when served from /Negotiation_Xpert/, so the worker can never claim a wider scope.
    if (!root.location.pathname.startsWith(APP_PATH)) return;
    const firstInstall = !nav.serviceWorker.controller;
    nav.serviceWorker.addEventListener('controllerchange', () => {
      if (reloading) { root.location.reload(); return; }
      if (firstInstall) emit('offline-ready');
      askVersion(nav.serviceWorker.controller);
    });
    nav.serviceWorker.register(APP_PATH + 'sw.js', { scope: APP_PATH }).then(reg => {
      state.reg = reg;
      if (reg.waiting && nav.serviceWorker.controller) markUpdate();
      track(reg.installing);
      reg.addEventListener('updatefound', () => track(reg.installing));
      askVersion(nav.serviceWorker.controller || reg.active);
      // look for new versions when the app regains focus, and every 30 minutes
      const check = () => { reg.update().catch(() => { /* offline */ }); };
      root.document.addEventListener('visibilitychange', () => { if (root.document.visibilityState === 'visible') check(); });
      setInterval(check, 30 * 60 * 1000);
    }).catch(() => { /* service workers unavailable (private mode, old browser) */ });
  }
  if (root.document.readyState === 'complete') register(); else root.addEventListener('load', register);

  NX.pwa = {
    on: fn => listeners.push(fn),
    canInstall, promptInstall, applyUpdate, isStandalone,
    get updateReady() { return state.updateReady; },
    get version() { return state.version; }
  };
})(window);
