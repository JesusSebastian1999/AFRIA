/** Render para manejo de listas y filtrado.
 * @module */
 
/** Crea el despliegue y procesamiento de los li de una lista.
  * @typedef {Object} LiRender
  * @property {string} filtro texto para filtrar el modelo.
  * @property {string} innerHTML html en el interior de la fila. */
 
/** LiRender o Promise<LiRender>.
 * @typedef {LiRender|Promise<LiRender>} LiRenderOPromise */
 
/** Genera un LiRender para un objeto.
 * @typedef {(modelo:Object)=>LiRenderOPromise} LiRenderer */
 
/** Para que archivo se considere un módulo, debe tener al menos un export. */
export const __LiRender = "";