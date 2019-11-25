import { CtrlMaestra } from "../../lib/CtrlMaestra.js";
import { Query } from "../../lib/fireAPI.js";
import { collection } from "../../lib/util.js";
import { rendererGrupo } from "../rendererGrupo.js";
 
class CtrlGrupos extends CtrlMaestra {
  /** Función que devuelve la consulta para obtener los datos del listado.
   * @override
   * @returns {Promise<Query>} */
  async consulta() {
    return collection("GRUPOS").orderBy("GRUPO_UP");
  }
}
 
new CtrlGrupos("Grupos", rendererGrupo, "grupo.html");