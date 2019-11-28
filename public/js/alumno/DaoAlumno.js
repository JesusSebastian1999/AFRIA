import { Dao } from "../lib/Dao.js";
 
export function creaDaoRespuesta() {
  return new Dao("RESPUESTAS",
    [{ campos: ["RESPUESTA"], mensaje: "La respuesta ya se ha enviado." }], []);
}
