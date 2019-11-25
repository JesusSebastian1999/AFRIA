import { CtrlMaestra } from "../../lib/CtrlMaestra.js";
import { Query } from "../../lib/fireAPI.js";
import { collection } from "../../lib/util.js";
import { rendererTema } from "../rendererTema.js";
 
class CtrlTemas extends CtrlMaestra {
  /** Función que devuelve la consulta para obtener los datos del listado.
   * @override
   * @returns {Promise<Query>} */
  async consulta() {
    return collection("TEMAS").orderBy("TEMA_UP");
  }
}
 
new CtrlTemas("Temas", rendererTema, "tema.html");