self.addEventListener('push', async function(e) {
    try {
        const data = await e.data.json();
        console.log("Push received...", data);
        self.registration.showNotification(
            data.title,
            {
                body: data.body,
            }
        );
    } catch (error) {
        console.error("Error parsing JSON:", error);
        // alert("Error parsing JSON:", error);
    }
});


// const CACHE_NAME = 'pwa-cache-v1';
// const urlsToCache = [
//     '/',
//     '/index.html',
//     '/css/style.css',
//     '/js/app.js',
//     '/js/bundle.js',
//     '/js/script.js',
//     '/images/AnaxeeLogo.ico',
//     '/images/icons/favicon.png',
// ]

// self.addEventListener('install', function(e) {
//     e.waitUntil(
//         caches.open(CACHE_NAME)
//         .then(function(cache) {
//             console.log("Opened cache");
//             return cache.addAll(urlsToCache);
//         })
//     ); 
// });

// self.addEventListener('fetch', function(e) {
//     e.respondWith(
//         caches.match(e.request)
//         .then(function(response) {
//             if(response) {
//                 return response;
//             }
//         })
//     );
// });

self.addEventListener('notificationclick', function(e) {
    const notification = e.notification;
    const action = e.action;
    if(action === 'close') {
        notification.close();
    }
    else {
        clients.openWindow('https://partner.anaxee.com/ticket');
        notification.close();
    }
})