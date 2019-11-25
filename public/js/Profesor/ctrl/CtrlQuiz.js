import { MiSelect } from "../../cmp/mi-select.js";
import { CtrlEdicion } from "../../lib/CtrlEdicion.js";
import {preparaParaBúsqueda,collection, infos,getURLSearchParam,
fileSeleccionado,subeFile} from "../../lib/util.js";
import { creaDaoQuiz } from "../DaoQuiz.js";
import { rendererOpTema } from "../rendererOpTema.js";
import { DocumentReference } from "../../lib/fireAPI.js";
 
const id = getURLSearchParam("id");
/** @type {HTMLOutputElement} */
const título = document.querySelector("#título");
const figure = document.querySelector("figure");
const imagen_m = document.querySelector("#img");
/** @type {HTMLInputElement} */
const pregunta = document.querySelector("#pregunta");
/** @type {HTMLInputElement} */
const respuesta_correcta = document.querySelector("#respuesta_correcta");
/** @type {HTMLInputElement} */
const respuesta_a = document.querySelector("#respuesta_a");
/** @type {HTMLInputElement} */
const respuesta_b = document.querySelector("#respuesta_b");
/** @type {HTMLInputElement} */
const respuesta_c = document.querySelector("#respuesta_c");
/** @type {MiSelect} */
const tema = document.querySelector("#tema");
/** @type {HTMLInputElement} */
const img = document.querySelector("#imagen");
 
if (id) {
    img.required = false;
  } else {
    figure.hidden = true;
    img.required = true;
  }
 
const dao = creaDaoQuiz();
class CtrlQuiz extends CtrlEdicion {
  /** Muestra el título del modelo.
   * @override
   * @param {import("../infoQuiz").InfoQuiz} modelo  */
  muestraTítulo(modelo) {
    document.title = modelo.PREGUNTA;
    título.value = modelo.PREGUNTA;
  }
  /** Muestra los datos del modelo.
   * @override
   * @param {import("../infoQuiz").InfoQuiz} modelo  */
  async muestraModelo(modelo) {
      await tema.carga(
        infos(await collection("TEMAS").orderBy("TEMA_UP").get()),
        rendererOpTema);
    pregunta.value = modelo.PREGUNTA || "";
    respuesta_correcta.value = modelo.RESPUESTA_CORRECTA || "";
    respuesta_a.value = modelo.RESPUESTA_A || "";
    respuesta_b.value = modelo.RESPUESTA_B || "";
    respuesta_c.value = modelo.RESPUESTA_C || "";
    tema.valor = modelo.TEMA_ID;
    imagen_m.src = modelo.IMAGEN_P || "";
  }       
  /** Recupera la información capturada.
   * @override
 * @returns {Promise<import("../infoQuiz").InfoQuiz>}  */
  async leeModelo() {
    const PREGUNTA = pregunta.value.trim();
    const RESPUESTA_CORRECTA = respuesta_correcta.value.trim();
    const RESPUESTA_A = respuesta_a.value.trim();
    const RESPUESTA_B = respuesta_b.value.trim();
    const RESPUESTA_C = respuesta_c.value.trim();
    return {
      PREGUNTA,
      RESPUESTA_CORRECTA,
      RESPUESTA_A,
      RESPUESTA_B,
      RESPUESTA_C,
      TEMA_ID: tema.valor,
      PREGUNTA_UP: preparaParaBúsqueda(PREGUNTA)
    };
  }
 
  /** Agrega el modelo a la base de datos y devuelve el nuevo id. Normalmente no
   * se sobreescribe este método, pero en este caso es necesario para subir
   * archivos.
   * @override
   * @param {Object} modelo
   * @returns {Promise<DocumentReference>} referencia a los datos registrados.*/
  async agregaModelo(modelo) {

    const doc = await super.agregaModelo(modelo);

    await this.dao.collection.doc(doc.id).update({
      IMAGEN_P: await subeFile(img, doc.id)
    });

    return doc;
  }
 
  /** Actualiza el modelo en la base de datos. Normalmente no se sobreescribe
   * este método, pero en este caso es necesario para subir
   * archivos.
   * @override
   * @param {Object} modelo
   * @returns {Promise<void>} */
  async actualizaModelo(modelo) {

    await super.actualizaModelo(modelo);

    if (fileSeleccionado(img)) {
      await this.dao.collection.doc(id).update({
        IMAGEN_P: await subeFile(img, id)
      });
    }
  }
 
  /** Normalmente no se sobreescribe este método, pero en este caso es necesario
   * para eliminar archivos.
   *  @override */
  async eliminaModelo() {
    await super.eliminaModelo();
    // @ts-ignore
    await firebase.storage().ref(this.id).delete();
  }
}
 
new CtrlQuiz("Quiz Nuevo", dao, "listaQuiz.html");