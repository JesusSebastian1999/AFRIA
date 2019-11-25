/** Render de opciones para roles.0
 * @module */
 
import { collection } from "../lib/util.js";
 
/** Crea un OpRender para un rol.
 * @param {import("./infoRol").InfoRol} modelo 
 * @returns {import("../lib/OpRender").OpRender}  */
export function rendererOpRol(modelo) {
  return {
    ref: collection("ROL").doc(modelo.id),
    texto: modelo.ROL_NOMBRE
  };
}