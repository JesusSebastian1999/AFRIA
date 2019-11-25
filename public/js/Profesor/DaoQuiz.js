import { Dao } from "../lib/Dao.js";
 
export function creaDaoQuiz() {
  return new Dao("QUIZ",
    [{ campos: ["PREGUNTA_UP"], mensaje: "L pregunta ya está registrado." }], []);
}