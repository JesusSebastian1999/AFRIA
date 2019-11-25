/** Render de usuarios.
 * @module */
 
//import { getArr, getRef } from "../lib/fireUtil.js";
import { cod, url} from "../lib/util.js";
 
/** Crea un LiRender para un usuario.
 * @implements {LiRenderer}
 * @param {import("./infoGrupo").InfoGrupo} modelo 
 * @returns {Promise<import("../lib/LiRender").LiRender>}  */
export async function rendererGrupo(modelo) {
  
  return {
    filtro:
      `grupo_nombre: ${modelo.GRUPO_NOMBRE || ""}
       grupo_up: ${modelo.GRUPO_UP || ""}
       `,
    innerHTML: /* html */
      `
      <tr>
          <td>
          <a>${"Grupo: "+cod(modelo.GRUPO_NOMBRE)}</a>
          </td>
          <td>
            <a href="grupo.html?id=${url(modelo.id)}" class="btn btn-warning btn-circle">
            <i class="fas fa-pen"></i>
            </a>
          </td>
      </tr>
      `
  };
}