/** Render de usuarios.
 * @module */
 
import { getRef } from "../lib/util.js";
import { cod, url } from "../lib/util.js";
 
/** Crea un LiRender para un usuario.
 * @implements {LiRenderer}
 * @param {import("../Profesor/infoQuiz").InfoQuiz} modelo 
 * @returns {Promise<import("../lib/LiRender.js").LiRender>}  */
export async function rendererPreguntas(modelo) {


  /** @type {import("./InfoPasatiempo.js").InfoPasatiempo} */
  const tema = (await getRef(modelo.TEMA_ID)) || {};

  return {
    filtro:
      `tema: ${tema.TEMA_ID || ""}`,
    innerHTML: /* html */
      `<li class="list-group-item">
        <div class="col-sm-12 mb-2">
          <h3><strong> ${cod(modelo.PREGUNTA)} </strong></h3>
        </div> 
        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" name="${cod(modelo.NAME)}" id="respco${cod(modelo.id)}" value="${cod(modelo.RESPUESTA_CORRECTA)}" class="custom-control-input">
          <label class="custom-control-label" for="respco${cod(modelo.id)}">${cod(modelo.RESPUESTA_CORRECTA)}</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" name="${cod(modelo.NAME)}" id="respb${cod(modelo.id)}" value="${cod(modelo.RESPUESTA_A)}" class="custom-control-input">
          <label class="custom-control-label" for="respb${cod(modelo.id)}">${cod(modelo.RESPUESTA_A)}</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" name="${cod(modelo.NAME)}" id="respc${cod(modelo.id)}" value="${cod(modelo.RESPUESTA_B)}" class="custom-control-input">
          <label class="custom-control-label" for="respc${cod(modelo.id)}">${cod(modelo.RESPUESTA_B)}</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" name="${cod(modelo.NAME)}" id="respd${cod(modelo.id)}" value="${cod(modelo.RESPUESTA_C)}" class="custom-control-input">
          <label class="custom-control-label" for="respd${cod(modelo.id)}">${cod(modelo.RESPUESTA_C)}</label>
        </div>
        </li>
        <li class="list-group-item">
        <div class="custom-control custom-radio custom-control-inline">
        <figure class="figure" id="figure">
          <img title="ÁFRIA" src="${cod(modelo.IMAGEN_P)}" class="figure-img img-fluid rounded" width="200px" alt="${cod(tema.TEMA_ID)}">
          <figcaption class="figure-caption">${cod(tema.TEMA_ID)}.</figcaption>
        </figure>
        </div>
        </li>`
      
  };
}