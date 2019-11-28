import { error, catchas } from "../js/lib/util.js";
import { iniciaSesión, verifica, terminaSesion, auth } from "./utilAuth.js";

customElements.define("mi-navegacion", class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */ `<progress max="100">Cargando…</progress>`;
    auth.onAuthStateChanged(usuarioAuth =>
      catchas(async () => {
        this.innerHTML = /* html */ `<li class="nav-item">
        <a class="nav-link" href="../../index.html"><i class="fas fa-home"></i>Inicio</a>
       </li>`;
        if (usuarioAuth && usuarioAuth.email) {
          // Usuario aceptado.
          const roles =
            Object.freeze(new Set((await verifica(usuarioAuth)).roles));
          if (roles.has("A")) {
            this.innerHTML += /* html */
              `<li class="nav-item">
              <a class="nav-link" href="../html/administrador/index.html"><i class="fas fa-user"></i>Adminstrador</a>
             </li>`;
          }
          if (roles.has("P")) {
            this.innerHTML += /* html */
              `<li class="nav-item">
              <a class="nav-link" href="../html/profesor/index.html"><i class="fas fa-user"></i>Profesores</a>
             </li>`;
          }
          if (roles.has("U")) {
            this.innerHTML += /* html */
              `<li class="nav-item">
              <a class="nav-link" href="../html/alumno/index.html"><i class="fas fa-user"></i>Alumno</a>
             </li>`;
          }
          this.innerHTML += /*html*/
            `<button class="btn btn-google btn-block" id="terminarSesión" type="button">
            <i class="fab fa-google fa-fw"></i>
              Terminar Sesión
            </button>`;
          const terminarSesión = document.getElementById("terminarSesión")
          terminarSesión.addEventListener("click", terminaSesion);
        } else {
          // Usuario rechazado.
          this.innerHTML += /* html */
            `<button class="btn btn-google btn-block" id="iniciarSesión" type="button"><i class="fab fa-google fa-fw"></i>Iniciar Sesión</button>`;
          const iniciarSesión = document.getElementById("iniciarSesión")
          iniciarSesión.addEventListener("click", iniciaSesión);
        }
      }),
      error);
  }
}, { extends: "nav" });