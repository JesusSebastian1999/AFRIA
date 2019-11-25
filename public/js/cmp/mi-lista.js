/** Lista principal.
 * @module */
//import { sinScript } from "../lib/htmlUtil.js";
import { preparaParaBúsqueda,sinScript } from "../lib/util.js";

 
/** Lista que carga su contenido dinámicamente y realza filtrado. */
export class MiLista extends HTMLTableElement {
  constructor() {
    super();
    /** datos y render de los modelos.
     * @type {import("../lib/LiRender").LiRender[]} */
    this.renders = [];
  }
  /** Se ejecuta cuando el web component se agrega a su padre. */
  connectedCallback() {
    this.innerHTML = /* html */
      `<td class="cargando"><progress max="100">Cargando…</progress></td>`;
  }
  /** Carga un listado de modelos, genera su render y realiza un filtrado
   * inicial.
   * @fires MiLista#seleccion
   * @param {*[]} listado contiene los modelos a mostrar.
   * @param {import("../lib/LiRender").LiRenderer} renderer función que
   * devuelve un LiRender o una Promise<LiRender> para un elemento del listado.
   * @param {string} [filtro=""] filtro proporcionado por el usuario.
   * @returns {Promise<import("../lib/LiRender").LiRender[]>} los render
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
   * @returns {import("../lib/LiRender").LiRender[]} los render filtrados. */
  filtra(filtro) {
    if (this.renders) {
      this.innerHTML = "";
      const filtroPreparado = preparaParaBúsqueda(filtro);
      /** @type {import("../lib/LiRender").LiRender[]} */
      const filtrados = [];
      for (const render of this.renders) {
        if (!filtroPreparado || render.filtro.includes(filtroPreparado)) {
          this.muestra(render);
          filtrados.push(render);
        }
      }
      if (filtrados.length === 0) {
        this.innerHTML = /* html */ `<tbody>No encuentra datos</tbody>`;
      }
      return filtrados;
    } else {
      return [];
    }
  }
  /** Muestra un li.
   * @param {import("../lib/LiRender.js").LiRender} render instrucciones de
   * render para el li. */
  muestra(render) {
    this.appendChild(document.createElement("tbody")).innerHTML = render.innerHTML;
  }
}
 
customElements.define("mi-lista", MiLista, { extends: "table" });