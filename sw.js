/* Negotiation Xpert — service worker (offline support and update flow).
   VERSION must change whenever any file in ASSETS changes. Run:  node tools/stamp-sw.js
   It recomputes BUILD from the files' contents and bumps VERSION; the tests fail if you forget. */
const VERSION = '1.1.0';
const BUILD = '6f62b5e0';
const CACHE = 'nx-' + VERSION + '-' + BUILD;

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
  // Do not skipWaiting here: the page shows "New version available" and the user chooses when to reload.
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('nx-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
  else if (event.data === 'GET_VERSION' && event.ports[0]) event.ports[0].postMessage({ version: VERSION, build: BUILD });
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // App shell: any navigation opens the cached index.html, so the app starts offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.open(CACHE).then(cache => cache.match('./index.html').then(hit => hit || fetch(req)))
        .catch(() => caches.match('./index.html'))
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
