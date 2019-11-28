import { CtrlMaestraResultado } from "../lib/CtrlMaestraResultado.js";
import { Query } from "../lib/fireAPI.js";
import { collection } from "../lib/util.js";
import { renderLista } from "./renderLista.js";
 
class CtrlConsulta extends CtrlMaestraResultado {
  /** Función que devuelve la consulta para obtener los datos del listado.
   * @override
   * @returns {Promise<Query>} */
  async consulta() {
    return collection("RESPUESTAS").orderBy("PROMEDIO");
  }
}
 
new CtrlConsulta(renderLista);