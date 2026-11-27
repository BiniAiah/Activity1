// =====================================================
// JohnMac's Hospital — Service Worker
// Strategy: network-first for navigations, cache-first for static assets,
// strict bypass for /api/* and cross-origin requests.
// Bump CACHE_VERSION whenever cached files change.
// =====================================================

const CACHE_VERSION = "johnmacs-v1";
const STATIC_CACHE = CACHE_VERSION + "-static";

const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/variables.css",
  "./css/reset.css",
  "./css/layout.css",
  "./css/components.css",
  "./css/views.css",
  "./js/app.js",
  "./js/data/doctors.js",
  "./js/data/services.js",
  "./js/patterns/factory.js",
  "./js/patterns/singleton.js",
  "./js/services/api.js",
  "./js/ui/render.js",
  "./js/ui/router.js",
  "./js/ui/modal.js",
  "./js/ui/toast.js",
  "./js/utils/helpers.js",
  "./js/utils/manilaTime.js",
  "./assets/img/favicon.svg",
  "./assets/img/logo.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => !key.startsWith(CACHE_VERSION))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // Strict bypass: never handle API or cross-origin traffic.
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(STATIC_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match("./index.html"))
        )
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        return cached;
      }
      return fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(STATIC_CACHE).then((cache) => cache.put(request, copy));
        return response;
      });
    })
  );
});
