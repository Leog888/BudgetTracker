const DATA_CACHE = 'data-cache-1';

const FILES_TO_CACHE = [
    './',
    './index.html',
    './index.js',
    './indexedDB.js',
    './style.css',
]
// Install
self.addEventListener('install',  (event) => {
    event.waitUntil(
        caches.open(DATA_CACHE).then(cache => {
            console.log("Files were pre-cached successfully!");
            return cache.addAll(FILES_TO_CAHE);
        })
    );
        self.skipWaiting();
    })

// Clean Up / Activate 
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map( key => {
                    if (key !== DATA_CACHE) {
                        console.log("remove old cache data", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});