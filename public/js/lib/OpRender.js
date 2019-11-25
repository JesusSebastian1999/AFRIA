import { DocumentReference } from "./fireAPI.js";
 
/** Render para manejo de llaves foráneas.
 * @module */
 
/** Crea el despliegue y procesamiento de las opciones de llaves foráneas.
 * @typedef {Object} OpRender
 * @property {DocumentReference} ref referencia en la bades de datos.
 * @property {string} texto texto que se muestra. */
 
/** Genera un OpRender para un objeto.
 * @typedef {(modelo: Object) => OpRender|Promise<OpRender>} OpRenderer */
 
/** Para que archivo se considere un módulo, debe tener al menos un export. */
export const __OpRender = "";