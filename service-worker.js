const CACHE_NAME = "shop-cache-v1";

const urlsToCache = [
  "/",
  "index.html",
  "style.css",
  "app.js",
  "images/headphone.jpg"
];

// INSTALL
self.addEventListener("install", event => {
  console.log("Service Worker Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// ACTIVATE
self.addEventListener("activate", event => {
  console.log("Service Worker Activated");
});

// FETCH (Offline support)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(res => res || fetch(event.request))
  );
});

// BACKGROUND SYNC
self.addEventListener("sync", event => {
  if (event.tag === "sync-order") {
    event.waitUntil(
      new Promise(resolve => {
        console.log("🔄 Syncing Order...");
        setTimeout(() => {
          console.log("✅ Order Synced!");
          resolve();
        }, 2000);
      })
    );
  }
});

// PUSH NOTIFICATION
self.addEventListener("push", event => {
  self.registration.showNotification("🛍️ Sale!", {
    body: "Big Discount Available!",
    icon: "icons/icon-192.png"
  });
});