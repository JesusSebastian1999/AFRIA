import { Dao } from "../lib/Dao.js";
 
export function creaDaoGrupo() {
  return new Dao("GRUPOS",
    [{ campos: ["GRUPO_UP"], mensaje: "El grupo ya está registrado." }], []);
}