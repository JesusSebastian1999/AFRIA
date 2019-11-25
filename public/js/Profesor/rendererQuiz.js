/** Render de usuarios.
 * @module */
 
//import { getArr, getRef } from "../lib/fireUtil.js";
import { cod, url,getRef } from "../lib/util.js";
 
/** Crea un LiRender para un usuario.
 * @implements {LiRenderer}
 * @param {import("./infoQuiz").InfoQuiz} modelo 
 * @returns {Promise<import("../lib/LiRender").LiRender>}  */
export async function rendererQuiz(modelo) {
  /** @type {import("./infoTema").InfoTema} */
  const tema = (await getRef(modelo.TEMA_ID)) || {};
  return {
    filtro:
      `pregunta: ${modelo.PREGUNTA || ""}
       tema: ${tema.TEMA_NOMBRE || ""}
       `,
    innerHTML: /* html */
      `
      <tr>
          <td>
          <figure><img style="height: 50px; width: 50px;" src="${cod(modelo.IMAGEN_P)}" alt="${cod(modelo.PREGUNTA)}"></figure>
          <a>${"Pregunta: "+cod(modelo.PREGUNTA)}</a>
          <br>
          <a>${"Tema: "+cod(tema.TEMA_NOMBRE)}</a>
          </td>
          <td>
            <a href="Quiz.html?id=${url(modelo.id)}" class="btn btn-warning btn-circle">
            <i class="fas fa-pen"></i>
            </a>
          </td>
      </tr>
      `
  };
}