/** Render de usuarios.
 * @module */
 
import { cod, url} from "../lib/util.js";
 
/** Crea un LiRender para un usuario.
 * @implements {LiRenderer}
 * @param {import("./infoTema").InfoTema} modelo 
 * @returns {Promise<import("../lib/LiRender").LiRender>}  */
export async function rendererTema(modelo) {
  
  return {
    filtro:
      `tema_nombre: ${modelo.TEMA_NOMBRE || ""}
       tema_up: ${modelo.TEMA_UP || ""}
       `,
    innerHTML: /* html */
      `
      <tr>
          <td>
          <a>${"Tema: "+cod(modelo.TEMA_NOMBRE)}</a>
          </td>
          <td>
            <a href="tema.html?id=${url(modelo.id)}" class="btn btn-warning btn-circle">
            <i class="fas fa-pen"></i>
            </a>
          </td>
      </tr>
      `
  };
}