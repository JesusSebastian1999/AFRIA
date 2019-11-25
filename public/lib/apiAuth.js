/** Interfaces para Auth
 * @module */
 
/** Usuario devuelto por el sistema de autenticación.
 * @typedef {Object} UsuarioAuth
 * @property {string} email email del usuario.
 * @property {string} displayName nombre registrado en la cuenta.
 * @property {string} photoURL url del avatar registrado en la cuenta. */
 
/** Servicio de Auth.
 * @interface */
export class Auth {
  /** Autentica un cliente de Firebase usando un popup.
   * @param {any} _provider el objeto que realiza la autenticación.
   * @returns {Promise<UsuarioAuth>} */
  signInWithPopup(_provider) { throw new Error("interface"); }
  /** Termina la sesion del usuario actual.
   * @returns {Promise<void>} */
  signOut(r) { throw new Error("interface"); }
  /** Observa los cambios de usuario.
   * @param {(u:UsuarioAuth) => void} fun se invoca al cambiar la sesión.
   * @param {(e:Error)=> void} funError se invoca cuando hay error. */
  onAuthStateChanged(fun, funError) { throw new Error("interface"); }
}
 
/** Representa una consulta
 * @interface */
export class Reference {
  /** Sube datos a la localidad de la referencia.
   * @param {File} datos datos a subir.
   * @returns {Promise<UploadTaskSnapshot>} estado de la tarea. */
  async put(datos) { throw new Error("interface."); }
  /** Elimina el objeto en la localidad de la referencia.
   * @returns Promise<any> Promesa que resuelve el resultado de la operación. */
  delete() { throw new Error("interface."); }
  /** Devuelve la URL de descarga de este objeto.
   * @returns Promise<any> Promesa que resuelve la URL de descarga de este
   * objeto. */
  getDownloadURL() { throw new Error("interface."); }
}
 
/** Guarda el estado de una tarea para subir datos.
 * @interface */
export class UploadTaskSnapshot { }