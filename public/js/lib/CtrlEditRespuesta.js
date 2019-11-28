import { Dao } from "./Dao.js";
import { DocumentReference } from "./fireAPI.js";
import { info } from "./util.js";
import { catchas, exige, getURLSearchParam } from "./util.js";

/** Clase base para agregar y modificar. */
export class CtrlEditRespuesta {
    /** Crea una instancia del controlador.
     * @param {string} títuloDeNuevo título al dar de alta.
     * @param {Dao} dao dao para este controlador.
     * @param {string=} urlMaestra url de la vista maestra. */
    constructor(dao) {
        /** objeto de acceso a los datos. */
        this.dao = dao;

        const form = document.querySelector("#vista");

        if (form && document.querySelector("[type=submit]")) {
            form.addEventListener("submit", this.guarda.bind(this));
        }

    }
    
    /** Muestra los datos del modelo.
     * @abstract
     * @param {Object} _modelo  */
    async muestraModelo(_modelo) {
        throw new Error("abstract");
    }
    /** Recupera la información capturada.
     * @abstract
     * @returns {Promise<Object>}  */
    async leeModelo() {
        throw new Error("abstract");
    }


    regresa() {
        if (this.urlMaestra) {
            location.href = this.urlMaestra;
        }
    }

    /** Recupera los datos capturados por el usuario y los guaarda en la base de
     * datos.
     * @param {Event} evt */
    guarda(evt) {
        evt.preventDefault();

        catchas(async () => {
            const modelo = await this.leeModelo();
            
            await this.agregaModelo(modelo);

            this.regresa();
        });
    }

    /** Agrega el modelo a la base de datos y devuelve el nuevo id.
     * @param {Object} modelo
     * @returns {Promise<DocumentReference>} referencia a los datos registrados.*/
    async agregaModelo(modelo) {

        Swal.fire({
            type: 'success',
            title: 'Quiz Enviado',
            text: 'Se Han Enviado Tus Respuestas'
        })
 
            return this.dao.agrega(modelo)

    }

}