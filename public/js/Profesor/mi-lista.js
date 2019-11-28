/** Lista principal.
 * @module */
import { sinScript } from "../lib/util.js";
import { preparaParaBúsqueda } from "../lib/util.js";
 
/** Lista que carga su contenido dinámicamente y realza filtrado. */
export class MiUl extends HTMLUListElement  {
  constructor() {
    super();
    /** datos y render de los modelos.
     * @type {import("../lib/LiRender.js").LiRender[]} */
    this.renders = [];
  }

  /** Se ejecuta cuando el web component se agrega a su padre. */
  connectedCallback() {
    this.innerHTML = /* html */
      `<ul class="cargando"><progress max="100">Cargando…</progress></ul>`;
  }
  /** Carga un listado de modelos, genera su render y realiza un filtrado
   * inicial.
   * @fires MiLista#seleccion
   * @param {*[]} Tabla contiene los modelos a mostrar.
   * @param {import("../lib/LiRender.js").LiRenderer} renderer función que
   * devuelve un LiRender o una Promise<LiRender> para un elemento del listado.
   * @param {string} [filtro=""] filtro proporcionado por el usuario.
   * @returns {Promise<import("../lib/LiRender.js").LiRender[]>} los render
   * filtrados. */
  async carga(listado, renderer, filtro = "") {

    this.renders = await Promise.all(listado.map(renderer));

    for (const render of this.renders) {
      render.filtro = preparaParaBúsqueda(render.filtro);
      render.innerHTML = sinScript(render.innerHTML);
    }

    return this.filtra(filtro);
  }
  /** Filtra el contenido de la lista. 
   * @param {string} filtro texto proporcionado por el usuario.
   * @returns {import("../lib/LiRender.js").LiRender[]} los render filtrados. */
  filtra(filtro) {

    if (this.renders) {
      this.innerHTML = "";

      const filtroPreparado = preparaParaBúsqueda(filtro);

      /** @type {import("../lib/LiRender.js").LiRender[]} */
      const filtrados = [];

      for (const render of this.renders) {
        if (!filtroPreparado || render.filtro.includes(filtroPreparado)) {
          this.muestra(render);
          filtrados.push(render);
        }
      }
      if (filtrados.length === 0) {
        this.innerHTML = /* html */ `<ul class="vacia">No encuentra datos</ul>`;
      }
      return filtrados;
    } else {
      return [];
    }
  }
  /** Muestra un li.
   * @param {import("../lib/LiRender.js").LiRender} render instrucciones de
   * render para el li.*/
  muestra(render) {
    this.appendChild(document.createElement("ul")).innerHTML = render.innerHTML;
  }

}
 
customElements.define("mi-lista", MiUl, { extends: "ul" });

