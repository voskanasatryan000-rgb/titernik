// ========== TITERNIK SERVICE WORKER (ամբողջը) ==========

// Install & Activate
self.addEventListener('install', event => {
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  self.clients.claim();
});
// Push Notification
self.addEventListener('push', event => {
  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    data = {};
  }
  const options = {
    body: data.body || 'Նոր ապրանք ավելացվել է! 🦋',
    icon: 'android-chrome-192x192.png',
    badge: 'favicon-32x32.png',
    tag: data.tag || 'new-product',
    requireInteraction: true,
    actions: [
      { action: 'open', title: '🔍 Դիտել' },
      { action: 'close', title: '✕ Փակել' }
    ],
    data: {
      url: data.url || 'https://voskanasatryan000-rgb.github.io/titernik/'
    }
  };

  event.waitUntil(
    self.registration.showNotification('🦋 Titernik', options)
  );
});

// Notification Click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});

// Cache (optional)
const CACHE_NAME = 'titernik-v1';
const urlsToCache = [
  '/titernik/',
  '/titernik/index.html',
  '/titernik/favicon.ico',
  '/titernik/android-chrome-192x192.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(() => {})
  );
});
