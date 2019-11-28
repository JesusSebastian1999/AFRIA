import { Dao } from "../lib/Dao.js";
import { info } from "../lib/util.js";
import { catchas, exige, getURLSearchParam } from "../lib/util.js";

/** Clase base para agregar y modificar. */
export class CtrlResultado {
    /** Crea una instancia del controlador..
     * @param {Dao} dao dao para este controlador. */
    constructor(dao) {
        /** objeto de acceso a los datos. */
        this.dao = dao;

        const id = getURLSearchParam("id");

        //const form = document.querySelector("#vista");

        const eliminar = document.getElementById("eliminar");

        /*if (form && document.querySelector("[type=submit]")) {
            form.addEventListener("submit", this.guarda.bind(this));
        }*/
        if (id) {
            catchas(async () => {
                const modelo = info(await dao.collection.doc(id).get());
                exige(modelo, "Registro no encontrado.");
                this.id = id;
                if (eliminar) {
                    eliminar.addEventListener("click", this.elimina.bind(this));
                }
            });
        } 
    }

    /** Elimina el documento de la base de datos. */
    elimina() {
        catchas(async () => {
            if (confirm("Confirma la eliminación.\nPerderás los datos.")) {
                await this.eliminaModelo();
            }
        });
    }

    async eliminaModelo() {
        return this.dao.elimina(this.id);
    }
}