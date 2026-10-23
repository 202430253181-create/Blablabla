/* BlablablaAbel — Service Worker (app shell + funcionamento offline). */
const CACHE_VERSION = 'blablablaabel-v1.1.0';
const CORE_CACHE = `${CACHE_VERSION}-core`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const CORE_ASSETS = [
  './',
  './index.html',
  './estudar.html',
  './aula.html',
  './praticar.html',
  './desempenho.html',
  './entrar.html',
  './offline.html',
  './css/styles.css',
  './js/config.js',
  './js/data.js',
  './js/core.js',
  './js/pwa.js',
  './js/home.js',
  './js/study.js',
  './js/lesson.js',
  './js/quiz.js',
  './js/dashboard.js',
  './js/auth.js',
  './js/vendor/supabase.js',
  './manifest.webmanifest',
  './assets/icons/favicon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CORE_CACHE)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
      .catch((error) => {
        console.warn('Cache inicial incompleto.', error);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CORE_CACHE && key !== RUNTIME_CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  /* Navegação: rede primeiro; se falhar, usa a versão em cache e, por fim, offline.html. */
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CORE_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request, { ignoreSearch: true });
          if (cached) return cached;
          const index = await caches.match('./index.html');
          if (index) return index;
          return caches.match('./offline.html');
        })
    );
    return;
  }

  /* Fontes externas: stale-while-revalidate. */
  if (url.origin !== self.location.origin) {
    if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
      event.respondWith(
        caches.open(RUNTIME_CACHE).then(async (cache) => {
          const cached = await cache.match(request);
          const network = fetch(request)
            .then((response) => {
              if (response && response.ok) cache.put(request, response.clone());
              return response;
            })
            .catch(() => null);
          return cached || network || Response.error();
        })
      );
    }
    return;
  }

  /* Arquivos estáticos: cache primeiro, atualizando em segundo plano. */
  event.respondWith(
    caches.open(CORE_CACHE).then(async (cache) => {
      const cached = await cache.match(request);
      const network = fetch(request)
        .then((response) => {
          if (response && response.ok) cache.put(request, response.clone());
          return response;
        })
        .catch(() => null);

      if (cached) {
        network.catch(() => null);
        return cached;
      }
      const response = await network;
      return response || caches.match('./offline.html');
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
