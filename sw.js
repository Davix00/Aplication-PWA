//define el nombre de la cache que vamos a crear
const STATIC_CACHE = "static-v1";

//define los archivos que vamos a guardar en la cache
const APP_SHELL = [
  "/https://davix00.github.io/pwa.github.io",
  "index.html",
  "css/styles.css",
  "js/main.js",
  "images/icon-512x512.png",
];

//evento listener para instalar la aplicacion
self.addEventListener("install", (e) => {
  const cacheStatic = caches
    .open(STATIC_CACHE)
    .then((cache) => cache.addAll(APP_SHELL));

  e.waitUntil(cacheStatic);
});

//evento listener para captuar todas las peticiones fetch y si ya las tenemos
//en cache se la entregamos sino lo redirigimos a la peticion original
self.addEventListener("fetch", (e) => {
  console.log("fetch! ", e.request);
  e.respondWith(
    caches
      .match(e.request)
      .then((res) => {
        return res || fetch(e.request);
      })
      .catch(console.log)
  );
});
