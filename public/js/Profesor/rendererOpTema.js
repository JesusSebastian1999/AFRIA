/** Render de opciones para pasatiempos.
 * @module */
 
import { collection } from "../lib/util.js";
 
/** Crea un OpRender para un pasatiempo.
 * @param {import("./infoTema").InfoTema} modelo 
 * @returns {import("../lib/OpRender").OpRender}  */
export function rendererOpTema(modelo) {
  return {
    ref: collection("TEMAS").doc(modelo.id),
    texto: modelo.TEMA_NOMBRE
  };
}
