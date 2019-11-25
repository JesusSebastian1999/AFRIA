import { Dao } from "../lib/Dao.js";
 
export function creaDaoUsuario() {
  return new Dao("USUARIO",
    [{ campos: ["EMAIL_UP"], mensaje: "El ALUMNO ya está registrado." }], []);
}