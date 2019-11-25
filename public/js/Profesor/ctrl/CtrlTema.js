import { CtrlEdicion } from "../../lib/CtrlEdicion.js";
import {preparaParaBúsqueda} from "../../lib/util.js";
import { creaDaoTema } from "../DaoTema.js";
 

/** @type {HTMLOutputElement} */
const título = document.querySelector("#título");
/** @type {HTMLInputElement} */
const tema = document.querySelector("#tema");
 

 
const dao = creaDaoTema();
class CtrlTema extends CtrlEdicion {
  /** Muestra el título del modelo.
   * @override
   * @param {import("../infoTema").InfoTema} modelo  */
  muestraTítulo(modelo) {
    document.title = modelo.TEMA_NOMBRE;
    título.value = modelo.TEMA_NOMBRE;
  }
  /** Muestra los datos del modelo.
   * @override
   * @param {import("../infoTema").InfoTema} modelo  */
  async muestraModelo(modelo) {
    tema.value = modelo.TEMA_NOMBRE || "";
  }       
  /** Recupera la información capturada.
   * @override
 * @returns {Promise<import("../infoTema").InfoTema>}  */
  async leeModelo() {
    const TEMA_NOMBRE = tema.value.trim();
    return {
      TEMA_NOMBRE,
      TEMA_UP: preparaParaBúsqueda(TEMA_NOMBRE)
    };
  }
 
 
  /** Normalmente no se sobreescribe este método, pero en este caso es necesario
   * para eliminar archivos.
   *  @override */
  async eliminaModelo() {
    await super.eliminaModelo();
    // @ts-ignore
    // funcion que elimina imagenes await firebase.storage().ref(this.id).delete();
  }
}
 
new CtrlTema("Tema Nuevo", dao, "listaTemas.html");