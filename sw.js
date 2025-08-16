// Service Worker para GitHub Pages (subcarpeta) - Estrategia Cache First
const VERSION = 'v1-' +  (self.registration ? (self.registration.scope || '') : '');
const CACHE_NAME = 'pwa-cache-' + VERSION;
const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './offline.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k.startsWith('pwa-cache-') && k !== CACHE_NAME)
          .map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const req = event.request;
  const url = new URL(req.url);

  // Solo manejar mismo origen (GitHub Pages del proyecto)
  if (url.origin !== self.location.origin) return;

  // Navegaciones: devolver index del caché (SPA) y caer a offline.html si falla
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then(cached => {
        return cached || fetch(req).catch(() => caches.match('./offline.html'));
      })
    );
    return;
  }

  // Assets: Cache First, luego red; si red responde, se actualiza caché en segundo plano
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE_NAME).then(c => c.put(req, copy));
        return resp;
      }).catch(() => {
        // Si es imagen y no hay red ni caché, podrías devolver un placeholder
        if (req.destination === 'image') return new Response('', { status: 404 });
        return caches.match('./offline.html');
      });
    })
  );
});
