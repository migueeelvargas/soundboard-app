var cacheName = 'v3'
var cacheFiles = [
	'./',
	'./hw4/index.html',
	'./hw4/css/main.css',
	'./hw4/css/darkTheme.css',
	'./hw4/css/lightTheme.css',
	'./hw4/css/hpTheme.css',
	'./hw4/fonts/glyphicons-halflings-regular.eot',
	'./hw4/fonts/glyphicons-halflings-regular.svg',
	'./hw4/fonts/glyphicons-halflings-regular.ttf',
	'./hw4/fonts/glyphicons-halflings-regular.woff',
	'./hw4/fonts/glyphicons-halflings-regular.woff2',
	'./hw4/js/app.js',
	'./hw4/js/bootstrap.min.js',
	'./hw4/js/main.js',
	'https://fonts.googleapis.com/css?family=Open+Sans:300,700',
	'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js',
	'./hw4/data.txt',
	'./img/bb8.png',
	'./img/bg.png',
	'./img/c3po.png',
	'./img/chewbacca.png',
	'./img/dobby.png',
	'./img/draco.png',
	'./img/dumbledore.png',
	'./img/falcon-yellow.png',
	'./img/finn.png',
	'./img/fredgeorge.png',
	'./img/hagrid.png',
	'./img/hansolo.png',
	'./img/harry.png',
	'./img/hermione.png',
	'./img/hogwarts.png',
	'./img/kyloren.png',
	'./img/lukeskywalker.png',
	'./img/luna.png',
	'./img/poedameron.png',
	'./img/princessleia.png',
	'./img/r2d2.png',
	'./img/rey.png',
	'./img/ron.png',
	'./img/slughorn.png',
	'./img/snape.png',
	'./img/stormtrooper.png',
	'./img/voldemort.png',
	'./sounds/avadakedavra.mp3',
	'./sounds/bb8.wav',
	'./sounds/brilliant.wav',
	'./sounds/c3po.wav',
	'./sounds/chewy.wav',
	'./sounds/crap.wav',
	'./sounds/dobby.mp3',
	'./sounds/episkey.mp3',
	'./sounds/finite-incantatem.mp3',
	'./sounds/finn.wav',
	'./sounds/fun.mp3',
	'./sounds/hansolo.wav',
	'./sounds/incendio.mp3',
	'./sounds/insult.wav',
	'./sounds/kylo.wav',
	'./sounds/ladies.mp3',
	'./sounds/leia.wav',
	'./sounds/merlinsbeard2.mp3',
	'./sounds/mischief.mp3',
	'./sounds/pathetic.mp3',
	'./sounds/poe.mp3',
	'./sounds/r2d2.wav',
	'./sounds/require.mp3',
	'./sounds/require.wav',
	'./sounds/rey.mp3',
	'./sounds/stormtrooper.wav',
	'./service-worker.js'
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

	e.respondWith(

		caches.match(e.request).then(function(response) {

			if (response) {
				console.log("[ServiceWorker] Found in cache", e.request.url)
				return response;
			}

			var requestClone = e.request.clone();

			fetch(requestClone)
				.then(function(response) {

					if(!response) {
						console.log("[ServiceWorker] No response from fetch")
						return response
					}

					var responseClone = response.clone()

					caches.open(cacheName).then(function(cache) {

						cache.put(e.request, responseClone)
						return response
					})
				})
				.catch(function(err) {
					console.log("[ServiceWorker] Error fetching & caching")
				})
		})
	)
})