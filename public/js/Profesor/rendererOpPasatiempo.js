/** Render de opciones para pasatiempos.
 * @module */
 
import { collection } from "../lib/util.js";
 
/** Crea un OpRender para un pasatiempo.
 * @param {import("./infoGrupo").InfoGrupo} modelo 
 * @returns {import("../lib/OpRender").OpRender}  */
export function rendererOpPasatiempo(modelo) {
  return {
    ref: collection("GRUPOS").doc(modelo.id),
    texto: modelo.GRUPO_NOMBRE
  };
}
