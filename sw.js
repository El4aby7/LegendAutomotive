const CACHE_NAME = 'legend-auto-cache-v1';

// We explicitly want to cache Supabase storage images.
// Storing them in a generous cache drastically reduces bandwidth.
self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    // Clear out old caches if cache name changes
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // Only intercept requests for supabase storage images
    if (url.hostname.includes('supabase.co') && url.pathname.includes('/storage/v1/object/public/')) {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                // If it's in the cache, serve it directly without hitting the network
                if (cachedResponse) {
                    return cachedResponse;
                }

                // If not, fetch it from the network, cache it, and return
                return fetch(event.request).then(response => {
                    // Only cache successful HTTP responses
                    if (!response || response.status !== 200 || response.type !== 'basic' && response.type !== 'cors') {
                        return response;
                    }

                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });

                    return response;
                }).catch(() => {
                    // Fallback block if network totally fails
                    // e.g. return a placeholder if we had one
                });
            })
        );
    }
});
