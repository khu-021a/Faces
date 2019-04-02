let cacheName = 'coins'

let onInstall = event => {
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => cache.addAll([
            './app.js',
            './2fad952a20fbbcfd1bf2ebb210dccf7a.woff',
            './6f0a76321d30f3c8120915e57f7bd77e.ttf',
            './index.html'
        ]))
    )
}

let onFetch = event => {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true })
        .then(response => {
            if (response) {
                return response
            }

            let requestToCache = event.request.clone()

            return fetch(requestToCache).then(response => {
                if (!response || response.status !== 200) {
                    return response
                }

                let responseToCache = response.clone()
                caches.open(cacheName)
                .then(cache => {
                    cache.put(requestToCache, responseToCache)
                })

                return response
            })
        })
    )
}

self.addEventListener('install', onInstall)

self.addEventListener('fetch', onFetch)
