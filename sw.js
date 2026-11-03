const CACHE_NAME = 'muzik-pwa-v13';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/apple-touch-icon.png',
  './icons/cover1.jpg',
  './icons/cover2.jpg',
  './icons/cover3.jpg',
  './icons/cover4.jpg',
  './icons/cover5.jpg',
  './icons/cover1.png',
  './icons/cover2.png',
  './icons/cover3.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Bypass service worker cache for external audio streams, APIs or range requests
  if (url.origin !== self.location.origin || event.request.headers.get('range')) {
    return;
  }

  // Cache-first for local static assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
