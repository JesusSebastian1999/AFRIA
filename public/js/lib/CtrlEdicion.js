import { Dao } from "./Dao.js";
import { DocumentReference } from "./fireAPI.js";
//import { info } from "./fireUtil.js";
import { catchas, exige, getURLSearchParam,info } from "./util.js";
 
/** Clase base para agregar y modificar. */
export class CtrlEdicion {
  /** Crea una instancia del controlador.
   * @param {string} títuloDeNuevo título al dar de alta.
   * @param {Dao} dao dao para este controlador.
   * @param {string=} urlMaestra url de la vista maestra. */
  constructor(títuloDeNuevo, dao, urlMaestra) {
    /** objeto de acceso a los datos. */
    this.dao = dao;
    /** url de la vista maestra. */
    this.urlMaestra = urlMaestra;
    if (urlMaestra) {
      /** @type {HTMLAnchorElement} */
      const cancelar = document.querySelector("#cancelar");
      cancelar.href = urlMaestra;
    }
    const id = getURLSearchParam("id");
    const form = document.querySelector("#forma");
    const eliminar = document.getElementById("eliminar");
    if (form && document.querySelector("[type=submit]")) {
      form.addEventListener("submit", this.guarda.bind(this));
    }
    if (id) {
      catchas(async () => {
        const modelo = info(await dao.collection.doc(id).get());
        exige(modelo, "Registro no encontrado.");
        this.id = id;
        this.muestraModelo(modelo);
        this.muestraTítulo(modelo);
        if (eliminar) {
          eliminar.addEventListener("click", this.elimina.bind(this));
        }
      });
    } else {
      if (eliminar) {
        eliminar.hidden = true;
      }
      document.title = títuloDeNuevo;
      /** @type {HTMLOutputElement} */
      const outputTítulo = document.querySelector("#título");
      outputTítulo.value = títuloDeNuevo;
      this.muestraModelo({});
    }
  }
  /** Muestra el título del modelo.
   * @abstract
   * @param {Object} _modelo  */
  muestraTítulo(_modelo) {
    throw new Error("abstract");
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
      if (this.id) {
        await this.actualizaModelo(modelo);
      } else {
        await this.agregaModelo(modelo);
      }
      this.regresa();
    });
  }
 
  /** Agrega el modelo a la base de datos y devuelve el nuevo id.
   * @param {Object} modelo
   * @returns {Promise<DocumentReference>} referencia a los datos registrados.*/
  async agregaModelo(modelo) {
    return this.dao.agrega(modelo);
  }
 
  /** Actualiza el modelo en la base de datos.
   * @param {Object} modelo
   * @returns {Promise<void>} */
  async actualizaModelo(modelo) {
    return this.dao.actualiza(this.id, modelo);
  }
 
  /** Elimina el documento de la base de datos. */
  elimina() {
    catchas(async () => {
      if (confirm("Confirma la eliminación.\nPerderás los datos.")) {
        await this.eliminaModelo();
        location.href = this.urlMaestra;
      }
    });
  }
 
  async eliminaModelo() {
    return this.dao.elimina(this.id);
  }
}