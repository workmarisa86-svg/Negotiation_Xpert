/* Negotiation Xpert — service worker (offline support and update flow).
   VERSION must change whenever any file in ASSETS changes. Run:  node tools/stamp-sw.js
   It recomputes BUILD from the files' contents and bumps VERSION; the tests fail if you forget.

   Isolation: several apps share the workmarisa86-svg.github.io origin. This worker only ever
   controls, caches and answers requests under APP_PATH, uses cache names starting with
   CACHE_PREFIX, and removes itself if it finds it was registered with any other scope. */
const VERSION = '1.2.0';
const BUILD = '425bcc13';
const APP_PATH = '/Negotiation_Xpert/';
const CACHE_PREFIX = 'negotiation-';
const CACHE = CACHE_PREFIX + VERSION + '-' + BUILD;
const LEGACY_CACHE = /^nx-\d+\.\d+\.\d+-[0-9a-f]{8}$/; // cache names used by versions up to 1.1.0
const SCOPE_OK = new URL(self.registration.scope).pathname === APP_PATH;
const inScope = url => url.origin === self.location.origin && url.pathname.startsWith(APP_PATH);

// ASSETS:START
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/styles.css',
  './js/icons.js',
  './js/i18n.js',
  './js/glossary.js',
  './js/detector.js',
  './js/lines.js',
  './js/engine.js',
  './js/scenarios/1-beginner.js',
  './js/scenarios/2-easy.js',
  './js/scenarios/3-medium.js',
  './js/scenarios/4-hard.js',
  './js/scenarios/5-impossible.js',
  './js/store.js',
  './js/speech.js',
  './js/pwa.js',
  './js/app.js',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];
// ASSETS:END

self.addEventListener('install', event => {
  if (!SCOPE_OK) { self.skipWaiting(); return; } // wrong scope: activate at once so it can remove itself
  // Do not skipWaiting here: the page shows "New version available" and the user chooses when to reload.
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))));
});

self.addEventListener('activate', event => {
  if (!SCOPE_OK) {
    // Registered somewhere other than /Negotiation_Xpert/: delete our caches, unregister, and
    // reload any page this worker took over, so that page loads normally from the network.
    event.waitUntil(
      caches.keys()
        .then(keys => Promise.all(keys.filter(k => k.startsWith(CACHE_PREFIX) || LEGACY_CACHE.test(k)).map(k => caches.delete(k))))
        .then(() => self.registration.unregister())
        .then(() => self.clients.matchAll({ type: 'window' }))
        .then(list => list.forEach(c => { if (!inScope(new URL(c.url)) && 'navigate' in c) c.navigate(c.url); }))
    );
    return;
  }
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => (k.startsWith(CACHE_PREFIX) && k !== CACHE) || LEGACY_CACHE.test(k)).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
  else if (event.data === 'GET_VERSION' && event.ports[0]) event.ports[0].postMessage({ version: VERSION, build: BUILD });
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (!SCOPE_OK || req.method !== 'GET') return;
  const url = new URL(req.url);
  if (!inScope(url)) return; // never cache or answer anything outside /Negotiation_Xpert/

  // App shell: navigations inside the app open the cached index.html, so the app starts offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.open(CACHE)
        .then(cache => cache.match(APP_PATH + 'index.html').then(hit => hit || fetch(req)))
        .catch(() => fetch(req))
    );
    return;
  }

  // Static files: cache first (they only change with a new VERSION), then network, caching what we fetch.
  event.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
        if (res && res.ok && res.type === 'basic') cache.put(req, res.clone());
        return res;
      }))
    )
  );
});
