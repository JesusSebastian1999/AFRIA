/** Render de usuarios.
 * @module */
 
import { cod, url,getRef } from "../lib/util.js";
 
/** Crea un LiRender para un usuario.
 * @implements {LiRenderer}
 * @param {import("./InfoUsuario.js").InfoUsuario} modelo 
 * @returns {Promise<import("../lib/LiRender.js").LiRender>}  */
export async function renderLista(modelo) {
    const alumno = (await getRef(modelo.ID_USU)) || {};
    return {
        filtro:
        `respuestas: ${modelo.PROMEDIO || ""}`,
        innerHTML: /* html */
        `<li class="list-group-item list-group-item-success">
            Alumno: ${cod(alumno.NOMBRES)}<br>      
            Promedio: ${cod(modelo.PROMEDIO)} <br>
            Resultado: ${cod(modelo.RESULTADO)}
            <a href="listaResultado.html?id=${url(modelo.id)}">
            <button type="button" id="eliminar" class="btn btn-danger btn-icon-split">
                <span class="icon text-white-50">
                    <i class="fas fa-trash-alt"></i>
                </span>
                <span  class="text">Eliminar</span>
            </button>
            </a>
         </li>`
        
    };
}