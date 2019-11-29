import { CtrlMaestra } from "./CtrlMaestra.js";
import { Query } from "../lib/fireAPI.js";
import { collection } from "../lib/util.js";
import { rendererPreguntas } from "./rendererPreguntas.js";
 
class CtrlConsulta extends CtrlMaestra {
  /** Función que devuelve la consulta para obtener los datos del listado.
   * @override
   * @returns {Promise<Query>} */
  async consulta() {
    return collection("QUIZ").orderBy("TEMA_ID");
  }
}
 
new CtrlConsulta(rendererPreguntas);