// service-worker.js
var CACHE_NAME = 'my-pwa-cache-v1';
var urlsToCache = [
    './index.html',
    './css/style.min.css',
    './js/script.min.js',
    './js/code.jquery-3.7.1.min.js',
    './../src/img/loop.png'
];



self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});



self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});