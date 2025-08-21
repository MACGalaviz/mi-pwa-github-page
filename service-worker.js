const CACHE_NAME = 'lottery-cache-v9'; // Cambia el número de versión para forzar la actualización
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    'https://cdn.tailwindcss.com',
    'https://unpkg.com/react@18/umd/react.development.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.development.js',
    'https://unpkg.com/@babel/standalone/babel.min.js',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap',
    'https://placehold.co/200x200/99f6e4/1d4ed8?text=Placeholder',

    // Íconos en la raíz para iOS
    '/apple-touch-icon.png',
    '/apple-touch-icon-precomposed.png',
    '/favicon.ico',
    
    // Íconos de la carpeta 'icons'
    'icons/maskable_icon.png',
    'icons/maskable_icon_x48.png',
    'icons/maskable_icon_x72.png',
    'icons/maskable_icon_x96.png',
    'icons/maskable_icon_x128.png',
    'icons/maskable_icon_x192.png',
    'icons/maskable_icon_x384.png',
    'icons/maskable_icon_x512.png',
    'icons/favicon.ico',

    // Rutas de las imágenes de las cartas
    'images/aguila.jpg',
    'images/alacran.jpg',
    'images/apache.jpg',
    'images/arana.jpg',
    'images/arbol.jpg',
    'images/aretes.jpg',
    'images/arpa.jpg',
    'images/auto.jpg',
    'images/avion.jpg',
    'images/bailarinas.jpg',
    'images/bandera.jpg',
    'images/bandolon.jpg',
    'images/barril.jpg',
    'images/borracho.jpg',
    'images/bota.jpg',
    'images/botella.jpg',
    'images/boxeadores.jpg',
    'images/bruja.jpg',
    'images/cacahuates.jpg',
    'images/cafetera.jpg',
    'images/calavera.jpg',
    'images/camaron.jpg',
    'images/camion.jpg',
    'images/campana.jpg',
    'images/cantarito.jpg',
    'images/carretilla.jpg',
    'images/catrin.jpg',
    'images/cazo.jpg',
    'images/cebolla.jpg',
    'images/cerezas.jpg',
    'images/chalupa.jpg',
    'images/cisnes.jpg',
    'images/clavel.jpg',
    'images/cocinero.jpg',
    'images/corazon.jpg',
    'images/corona.jpg',
    'images/cotorro.jpg',
    'images/dama.jpg',
    'images/diablito.jpg',
    'images/domino.jpg',
    'images/elefante.jpg',
    'images/elote.jpg',
    'images/escalera.jpg',
    'images/escoba.jpg',
    'images/escopeta.jpg',
    'images/escuela.jpg',
    'images/estrella.jpg',
    'images/ferrocarril.jpg',
    'images/fonografo.jpg',
    'images/futbolistas.jpg',
    'images/gallo.jpg',
    'images/garza.jpg',
    'images/golondrina.jpg',
    'images/gorrito.jpg',
    'images/guajolote.jpg',
    'images/herradura.jpg',
    'images/jarabe.jpg',
    'images/jaras.jpg',
    'images/jicara.jpg',
    'images/jorobado.jpg',
    'images/lagarto.jpg',
    'images/llanta.jpg',
    'images/luna.jpg',
    'images/maceta.jpg',
    'images/mandarin.jpg',
    'images/mano.jpg',
    'images/marimba.jpg',
    'images/martillo.jpg',
    'images/melon.jpg',
    'images/motocicleta.jpg',
    'images/muerte.jpg',
    'images/mundo.jpg',
    'images/muneca.jpg',
    'images/musico.jpg',
    'images/negrito.jpg',
    'images/nopal.jpg',
    'images/organo.jpg',
    'images/oso.jpg',
    'images/pajarito.jpg',
    'images/palma.jpg',
    'images/paloma.jpg',
    'images/paracaidas.jpg',
    'images/paraguas.jpg',
    'images/payaso.jpg',
    'images/pera.jpg',
    'images/pescado.jpg',
    'images/pinata.jpg',
    'images/pino.jpg',
    'images/pintor.jpg',
    'images/plancha.jpg',
    'images/platanos.jpg',
    'images/puro.jpg',
    'images/radio.jpg',
    'images/rana.jpg',
    'images/regadera.jpg',
    'images/rosa.jpg',
    'images/sandia.jpg',
    'images/sarape.jpg',
    'images/sirena.jpg',
    'images/sol.jpg',
    'images/soldado.jpg',
    'images/tambor.jpg',
    'images/telefono.jpg',
    'images/tigre.jpg',
    'images/tlachiquero.jpg',
    'images/valiente.jpg',
    'images/venado.jpg',
    'images/violoncello.jpg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Service Worker: Archivos en caché para la Lotería');
            return Promise.all(
                urlsToCache.map(url => {
                    return cache.add(url).catch(err => {
                        console.error(`Fallo al precachear el archivo: ${url}`, err);
                    });
                })
            );
        })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            if (event.request.mode === 'navigate') {
                return caches.match('/index.html');
            }
            return fetch(event.request).catch(() => {
                return caches.match('/index.html');
            });
        })
    );
});