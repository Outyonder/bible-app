// Service Worker
const CACHE = 'bible-app-v2';
const ASSETS = [
  '/bible-app/',
  '/bible-app/index.html',
  '/bible-app/manifest.webmanifest',
  '/bible-app/data/kjv-sample.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
