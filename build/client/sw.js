const CACHE = 'dashboard-v1';

// On install: cache the app shell
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      c.addAll(['/', '/manifest.json', '/icon-192.png', '/icon-512.png'])
    )
  );
  self.skipWaiting();
});

// On activate: delete old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network-first for API routes, cache-first for assets
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Always go to network for API, SSE, and non-GET
  if (e.request.method !== 'GET' || url.pathname.startsWith('/api/')) {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // Cache successful navigation responses
        if (res.ok && (url.pathname === '/' || url.pathname.startsWith('/_app/'))) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
