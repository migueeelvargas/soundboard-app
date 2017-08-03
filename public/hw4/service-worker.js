var cacheName = 'v1';
var cacheFiles = [
	'./',
	'./index.html',
	'./css/main.css',
	'./css/darkTheme.css',
	'./css/lightTheme.css',
	'./css/hpTheme.css',
	'https://fonts.googleapis.com/css?family=Open+Sans:300,700',
	'./fonts/',
	'../sounds/',
	'../img/',
	'../css/',
	'./data.txt'
]

self.addEventListener('install', function(e) {
	console.log("[ServiceWorker] Installed")

	e.waitUntil (
		caches.open(cacheName).then(function(cache) {

			console.log("[ServiceWorker] Caching cacheFiles")
			return cache.addAll(cacheFiles)
		})
	)
})

self.addEventListener('activate', function(e) {
	console.log("[ServiceWorker] Activated")

	e.waitUntil (

		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function (thisCacheName) {

				if (thisCacheName !== cacheName) {
					console.log("[ServiceWorker] Removing cached from ", thisCacheName)

					return caches.delete(thisCacheName);
				}

			}))
		})
	)
})

self.addEventListener('fetch', function(e) {
	console.log("[ServiceWorker] Fetching", e.request.url)
})