import { error, catchas } from "./lib/util.js";
import { iniciaSesión, verifica, terminaSesion, auth } from "./lib/utilAuth.js";
 

customElements.define("mi-navegacion", class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */ `<progress max="100">Cargando…</progress>`;
    auth.onAuthStateChanged(usuarioAuth =>
      catchas(async () => {
        this.innerHTML = /* html */ `<li class="nav-item">
        <a class="nav-link" href="index.html"><i class="fas fa-user"></i>Inicio</a>
       </li>`;
        if (usuarioAuth && usuarioAuth.email) {
          // Usuario aceptado.
          const roles =
            Object.freeze(new Set((await verifica(usuarioAuth)).roles));
          if (roles.has("Admin")) {
            this.innerHTML += /* html */
              `<li class="nav-item">
              <a class="nav-link" href="html/administrador/index.html"><i class="fas fa-user"></i>Administrador</a>
             </li>`;
          }
          if (roles.has("Profes")) {
            this.innerHTML += /* html */
              `<li class="nav-item">
              <a class="nav-link" href="html/profesor/index.html"><i class="fas fa-user"></i>Profesor</a>
             </li>`;
          }
          this.innerHTML += /*html*/ `<a href="FormSesion.html">Sesión</a>`;
          this.innerHTML += /*html*/
            `<button id="terminarSesión" type="button">
              Terminar Sesión
            </button>`;
          const terminarSesión = document.getElementById("terminarSesión")
          terminarSesión.addEventListener("click", terminaSesion);
        } else {
          // Usuario rechazado.
          this.innerHTML += /* html */
            `<button id="iniciarSesión" type="button">Iniciar Sesión</button>`;
          const iniciarSesión = document.getElementById("iniciarSesión")
          iniciarSesión.addEventListener("click", iniciaSesión);
        }
      }),
      error);
  }
}, { extends: "nav" });