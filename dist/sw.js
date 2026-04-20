const checkResponse = (request) =>
	new Promise((fulfill, reject) => {
		fetch(request).then(
			(response) =>
				response.status !== 404 ? fulfill(response) : reject(),
			reject,
		);
	});

const addToCache = (request) =>
	caches
		.open("offline")
		.then((cache) =>
			fetch(request).then((response) => cache.put(request, response)),
		);

const returnFromCache = (request) =>
	caches
		.open("offline")
		.then((cache) =>
			cache
				.match(request)
				.then((matching) =>
					(matching?.status ?? 404) === 404 ?
						cache.match("offline.html")
					:	matching,
				),
		);

self.addEventListener("install", (event) =>
	event.waitUntil(() =>
		caches
			.open("offline")
			.then((cache) =>
				cache.addAll(["/", "/index.html", "/main.js", "/style.css"]),
			),
	),
);

self.addEventListener("fetch", (event) => {
	event.respondWith(
		checkResponse(event.request).catch(() =>
			returnFromCache(event.request),
		),
	);
	event.waitUntil(addToCache(event.request));
});
