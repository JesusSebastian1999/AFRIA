import { MiUl } from "../Profesor/mi-lista.js";
import { Query } from "./fireAPI.js";
import { infos } from "./util.js";
import { catchas, error } from "./util.js";

/** Controlador base para las vistas maestras. */
export class CtrlMaestraResultado {
    /** Crea una instancia del controlador.
     * @param {import("./LiRender.js").LiRenderer} renderer función que devuelve
     * un LiRender o una Promise<LiRender> para un elemento del listado. */

    constructor(renderer) {
        /** función que devuelve un LiRender o una Promise<LiRender> para un
         * elemento del listado. */
        this.renderer = renderer;
        /** Muestra el contenido de la collection.
         *  @type {MiUl}  */
        this.ul = document.querySelector("#ul");
        
        if (this.filtro) {
            this.filtro.addEventListener("input", this.filtra.bind(this));
        }

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
        this.ul.filtra(filtro);
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
                    await this.ul.carga(infos(listadoSnap), this.renderer, filtro);
                }),
                e => {
                    error(e);
                    this.muestraConsulta();
                });
        });
    }
}