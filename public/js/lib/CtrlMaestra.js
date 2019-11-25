import { MiLista } from "../cmp/mi-lista.js";
import { Query } from "./fireAPI.js";
//import { infos } from "./fireUtil.js";
import { catchas, error,infos } from "./util.js";
 
/** Controlador base para las vistas maestras. */
export class CtrlMaestra {
  /** Crea una instancia del controlador.
   * @param {string} título título de la página.
   * @param {import("./LiRender.js").LiRenderer} renderer función que devuelve
   * un LiRender o una Promise<LiRender> para un elemento del listado.
   * @param {string=} urlAgregar url para agregar un elemento. */
  constructor(título, renderer, urlAgregar) {
    /** función que devuelve un LiRender o una Promise<LiRender> para un
     * elemento del listado. */
    this.renderer = renderer;
    /** Muestra el contenido de la collection.
     *  @type {MiLista}  */
    this.lista = document.querySelector("#lista");
    /** Campo de texto para introducir el filtro.
     * @type {HTMLInputElement} */
    this.filtro = document.querySelector("[type=search]");
    if (this.filtro) {
      this.filtro.addEventListener("input", this.filtra.bind(this));
    }
    if (urlAgregar) {
      /** @type {HTMLAnchorElement} */
      const agregar = document.querySelector("#agregar");
      agregar.href = urlAgregar;
    }
    document.title = título;
    /** @type {HTMLOutputElement} */
    const outputTítulo = document.querySelector("#título");
    outputTítulo.value = título;
    this.muestraConsulta();
  }
  /** Función que devuelve la consulta para obtener los datos del listado.
   * @abstract
   * @returns {Promise<Query>} */
  async consulta() {
    throw new Error("abstarct");
  }
  filtra() {
    const filtro = this.calculaFiltro();
    this.lista.filtra(filtro);
  }
  /** Recupera el filtro capturado por el usuario.
   * @returns {string} el fitro capturado por el usuario o un texto vacío. */
  calculaFiltro() {
    return this.filtro ? this.filtro.value.trim() : "";
  }
  /** Muestra los resultados de una consulta. */
  async muestraConsulta() {
    catchas(async () => {
      const consulta = await this.consulta()
      consulta.onSnapshot(
        listadoSnap =>
          catchas(async () => {
            const filtro = this.calculaFiltro();
            await this.lista.carga(infos(listadoSnap), this.renderer, filtro);
          }),
        e => {
          error(e);
          this.muestraConsulta();
        });
    });
  }
}
