/** Render de usuarios.
 * @module */
 
//import { getArr, getRef } from "../lib/fireUtil.js";
import { cod, url,getRef } from "../lib/util.js";
 
/** Crea un LiRender para un usuario.
 * @implements {LiRenderer}
 * @param {import("../../js/Profesor/infoUsuario").InfoUsuario} modelo 
 * @returns {Promise<import("../lib/LiRender").LiRender>}  */
export async function rendererProfesor(modelo){
  /** @type {import("../../js/Profesor/infoRol").InfoRol} */
  return {
    filtro:
      `email: ${modelo.EMAIL || ""}
       nombres: ${modelo.NOMBRES || ""}
       apellido_paterno: ${modelo.APELLIDO_PATERNO || ""}
       apellido_materno: ${modelo.APELLIDO_MATERNO || ""}
       `,
    innerHTML: /* html */
      `
      <tr>
          <td>
          <a>${"Nombre: "+cod(modelo.NOMBRES)+" "+
          cod(modelo.APELLIDO_PATERNO)+" "+
          cod(modelo.APELLIDO_MATERNO)}</a>
          <br>
          <a>${"Email: "+cod(modelo.EMAIL)}</a>
          <br>
          </td>
          <td>
            <a href="profesor.html?id=${url(modelo.id)}" class="btn btn-warning btn-circle">
            <i class="fas fa-pen"></i>
            </a>
          </td>
      </tr>
      `
  };
}