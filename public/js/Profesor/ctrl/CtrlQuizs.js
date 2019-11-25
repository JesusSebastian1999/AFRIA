import { CtrlMaestra } from "../../lib/CtrlMaestra.js";
import { Query } from "../../lib/fireAPI.js";
import { collection } from "../../lib/util.js";
import { rendererQuiz } from "../rendererQuiz.js";
 
class CtrlUsuarios extends CtrlMaestra {
  /** Función que devuelve la consulta para obtener los datos del listado.
   * @override
   * @returns {Promise<Query>} */
  async consulta() {
    return collection("QUIZ").orderBy("PREGUNTA_UP");
  }
}
 
new CtrlUsuarios("Preguntas", rendererQuiz, "Quiz.html");