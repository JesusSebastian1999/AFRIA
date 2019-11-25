import { CtrlMaestra } from "../../lib/CtrlMaestra.js";
import { Query } from "../../lib/fireAPI.js";
import { collection } from "../../lib/util.js";
import { rendererProfesor } from "../rendererProfesor.js";
 
class CtrlUsuarios extends CtrlMaestra {
  /** Función que devuelve la consulta para obtener los datos del listado.
   * @override
   * @returns {Promise<Query>} */
  async consulta() {
    return collection("USUARIO").orderBy("EMAIL_UP");
  }
}
 
new CtrlUsuarios("Usuarios", rendererProfesor, "profesor.html");