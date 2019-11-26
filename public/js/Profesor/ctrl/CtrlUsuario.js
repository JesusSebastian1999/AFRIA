import { MiSelect } from "../../cmp/mi-select.js";
import { CtrlEdicion } from "../../lib/CtrlEdicion.js";
import {preparaParaBúsqueda,collection, infos} from "../../lib/util.js";
import { creaDaoUsuario } from "../DaoUsuario.js";
import { rendererOpPasatiempo } from "../rendererOpPasatiempo.js";
import { rendererOpRol } from "../rendererOpRol.js";
 
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
const pasatiempo = document.querySelector("#pasatiempo");
/** @type {MiSelect} */
const rol = document.querySelector("#rol");
 

 
const dao = creaDaoUsuario();
class CtrlUsuario extends CtrlEdicion {
  /** Muestra el título del modelo.
   * @override
   * @param {import("../infoUsuario").InfoUsuario} modelo  */
  muestraTítulo(modelo) {
    document.title = modelo.EMAIL;
    título.value = modelo.EMAIL;
  }
  /** Muestra los datos del modelo.
   * @override
   * @param {import("../infoUsuario").InfoUsuario} modelo  */
  async muestraModelo(modelo) {
    await pasatiempo.carga(
      infos(await collection("GRUPOS").orderBy("GRUPO_UP").get()),
      rendererOpPasatiempo);
      await rol.carga(
        infos(await collection("ROL").orderBy("ROL_UP").get()),
        rendererOpRol);
    nombres.value = modelo.NOMBRES || "";
    apellido_paterno.value = modelo.APELLIDO_PATERNO || "";
    apellido_materno.value = modelo.APELLIDO_MATERNO || "";
    email.value = modelo.EMAIL || "";
    pasatiempo.valor = modelo.GRUPO_ID;
    rol.value = modelo.ROL_ID;
  }       
  /** Recupera la información capturada.
   * @override
 * @returns {Promise<import("../infoUsuario").InfoUsuario>}  */
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
      GRUPO_ID: pasatiempo.valor,
      ROL_ID: rol.value,
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
 
new CtrlUsuario("Alumno Nuevo", dao, "listaAlumno.html");