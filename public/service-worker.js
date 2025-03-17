self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open("pwa-cache").then((cache) => {
      return cache.addAll(["/", "/offline.html"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(async () => {
      const cache = await caches.open("pwa-cache");

      // Check if the request is for a page (navigate event)
      if (event.request.mode === "navigate") {
        return cache.match("/offline.html"); // Serve offline.html when offline
      }

      // Otherwise, serve cached assets if available
      return cache.match(event.request);
    })
  );
});
