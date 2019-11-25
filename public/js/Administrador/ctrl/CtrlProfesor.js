import { MiSelect } from "../../cmp/mi-select.js";
import { CtrlEdicion } from "../../lib/CtrlEdicion.js";
import {preparaParaBúsqueda,collection, infos} from "../../lib/util.js";
import { creaDaoUsuario } from "../../../js/Profesor/DaoUsuario.js";
import { rendererOpRol } from "../../../js/Profesor/rendererOpRol.js";
 
//const id = getURLSearchParam("id");
/** @type {HTMLOutputElement} */
const título = document.querySelector("#título");
/** @type {HTMLInputElement} */
const nombres = document.querySelector("#nombres");
/** @type {HTMLInputElement} */
const apellido_paterno = document.querySelector("#apellido_paterno");
/** @type {HTMLInputElement} */
const apellido_materno = document.querySelector("#apellido_materno");
/** @type {HTMLInputElement} */
const email = document.querySelector("#email");
/** @type {MiSelect} */
const rol = document.querySelector("#rol");
 

 
const dao = creaDaoUsuario();
class CtrlUsuario extends CtrlEdicion {
  /** Muestra el título del modelo.
   * @override
   * @param {import("../../Profesor/infoUsuario").InfoUsuario} modelo  */
  muestraTítulo(modelo) {
    document.title = modelo.EMAIL;
    título.value = modelo.EMAIL;
  }
  /** Muestra los datos del modelo.
   * @override
   * @param {import("../../Profesor/infoUsuario").InfoUsuario} modelo  */
  async muestraModelo(modelo) {
      await rol.carga(
        infos(await collection("ROL").orderBy("ROL_UP").get()),
        rendererOpRol);
    nombres.value = modelo.NOMBRES || "";
    apellido_paterno.value = modelo.APELLIDO_PATERNO || "";
    apellido_materno.value = modelo.APELLIDO_MATERNO || "";
    email.value = modelo.EMAIL || "";
    rol.valor = modelo.ROL_ID;
  }       
  /** Recupera la información capturada.
   * @override
 * @returns {Promise<import("../../Profesor/infoUsuario").InfoUsuario>}  */
  async leeModelo() {
    const NOMBRES = nombres.value.trim();
    const APELLIDO_PATERNO = apellido_paterno.value.trim();
    const APELLIDO_MATERNO = apellido_materno.value.trim();
    const EMAIL = email.value.trim();
    return {
      NOMBRES,
      APELLIDO_PATERNO,
      APELLIDO_MATERNO,
      EMAIL,
      ROL_ID: rol.valor,
      EMAIL_UP: preparaParaBúsqueda(EMAIL)
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
 
new CtrlUsuario("Usuario Nuevo", dao, "listaProfesores.html");