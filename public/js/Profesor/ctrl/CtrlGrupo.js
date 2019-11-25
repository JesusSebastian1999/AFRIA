import { MiSelect } from "../../cmp/mi-select.js";
import { CtrlEdicion } from "../../lib/CtrlEdicion.js";
import { DocumentReference } from "../../lib/fireAPI.js";
import { getURLSearchParam, preparaParaBúsqueda,
  fileSeleccionado,collection, infos, subeFile } from "../../lib/util.js";
import { creaDaoGrupo } from "../DaoGrupo.js";
 

/** @type {HTMLOutputElement} */
const título = document.querySelector("#título");
/** @type {HTMLInputElement} */
const grupo = document.querySelector("#grupo");
 

 
const dao = creaDaoGrupo();
class CtrlGrupo extends CtrlEdicion {
  /** Muestra el título del modelo.
   * @override
   * @param {import("../infoGrupo").InfoGrupo} modelo  */
  muestraTítulo(modelo) {
    document.title = modelo.GRUPO_NOMBRE;
    título.value = modelo.GRUPO_NOMBRE;
  }
  /** Muestra los datos del modelo.
   * @override
   * @param {import("../infoGrupo").InfoGrupo} modelo  */
  async muestraModelo(modelo) {
    grupo.value = modelo.GRUPO_NOMBRE || "";
  }       
  /** Recupera la información capturada.
   * @override
 * @returns {Promise<import("../infoGrupo").InfoGrupo>}  */
  async leeModelo() {
    const GRUPO_NOMBRE = grupo.value.trim();
    return {
      GRUPO_NOMBRE,
      GRUPO_UP: preparaParaBúsqueda(GRUPO_NOMBRE)
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
 
new CtrlGrupo("Gupo Nuevo", dao, "listaGrupo.html");