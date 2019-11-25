import { Dao } from "../lib/Dao.js";
 
export function creaDaoTema() {
  return new Dao("TEMAS",
    [{ campos: ["TEMA_UP"], mensaje: "El tema ya está registrado." }], []);
}