const CACHE = "afriafb";
// Archivos requeridos para que la aplicación funcione fuera de línea.
const ARCHIVOS = [
  "lib/document-register-element.js",
  "lib/min.js",
  "lib/polycustom.js",
  "lib/registraServiceWorker.js",
  "js/Profesor/lib/util.js",
  "lib/Op.js",
  "css/sb-admin-2.css",
  "icono.png",
  "favicon.ico",
  "index.html",
  "manifest.json",
  "instrucciones.html",
  "img/afriaV2.png",
  "img/codes.png",
  "img/logov1.png",
  "img/multiplesG.jpg",
  "img/utonio.jpg",
  "img/undraw_posting_photo.svg",
  "html/login.html",
  "html/registro.html",
  "html/profesor/alumno.html",
  "html/profesor/grupo.html",
  "html/profesor/index.html",
  "html/profesor/listaAlumno.html",
  "html/profesor/listaGrupo.html",
  "html/administrador/index.html",
  "html/administrador/listaProfesores.html",
  "html/administrador/profesor.html",
  "js/Profesor/control/ctrlAlumno.js",
  "js/Profesor/control/ctrlAlumnoNuevo.js",
  "js/Profesor/control/ctrlcampos-alumnos.js",
  "js/Profesor/control/ctrlforanea-basica.js",
  "js/Profesor/control/ctrlforaneas.js",
  "js/Profesor/control/ctrlGrupo.js",
  "js/Profesor/control/ctrlgrupoNuevo.js",
  "js/Profesor/control/ctrlMenuProfe.js",
  "js/Administrador/ctrlMenuAdmin.js",
  "js/Administrador/ctrlProfesor.js",
  "js/Administrador/ctrlProfesorNuevo.js",
  "js/form-navegacion.js",
  "js/ctrlSesion.js",
  "__/firebase/7.2.0/firebase-app.js",
  "__/firebase/7.2.0/firebase-firestore.js",
  "__/firebase/init.js",
  '/'
];
 
self.addEventListener("install",
  /** @param {InstallEvent} evt */
  evt => {
    console.log("Service Worker instalado.");
    // Realiza la instalación: carga los archivos requeridos en la caché.
    evt.waitUntil(cargaCache());
  });
// Toma de la caché archivos solicitados. Los otros son descargados.
self.addEventListener("fetch",
  /** @param {FetchEvent} evt */
  evt => {
    if (evt.request.method === "GET") {
      evt.respondWith(usaCache(evt));
    }
  });
self.addEventListener("activate", () => console.log("Service Worker activo."));
 
async function cargaCache() {
  console.log("Intentando cargar cache: " + CACHE);
  const cache = await caches.open(CACHE);
  await cache.addAll(ARCHIVOS);
  console.log("Cache cargado: " + CACHE);
}
async function usaCache(evt) {
  const cache = await caches.open(CACHE);
  const response = await cache.match(evt.request, { ignoreSearch: true });
  if (response) {
    actualizaResponse(cache, evt.request);
    return response;
  } else {
    return fetch(evt.request);
  }
}
async function actualizaResponse(cache, request) {
  const response = await fetch(request);
  cache.put(request, response.clone());
}
