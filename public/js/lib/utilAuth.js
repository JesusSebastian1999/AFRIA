import { DocumentSnapshot } from "./fireAPI";
import {
  catchas, inicio, intersección, preparaParaBúsqueda, error, valida
} from "./util.js";
import { collection, toOp } from "./util.js";
import { Auth } from "./util.js";
 
/** Datos utilizados de un usuario.
 * @typedef {Object} InfoUsuario
 * @property {string[]} ROL_ID referencias a los roles asignados.
 * @property {string} EMAIL_UP email del usuario preparado para búsqueda.
 * (UNQUE) */
 
/** @typedef {Object} UsuarioVerificado
 * @property {string} id id del usuario.
 * @property {string} email email del usuario.
 * @property {string} displayName nombre registrado en la cuenta.
 * @property {string} photoURL url del avatar registrado en la cuenta.
 * @property {Readonly<String[]>} roles referencias a los roles asignados.
*/
/** Constante que permite acceder directamente al objeto firestore.
 * @type {Auth} */
// @ts-ignore
export const auth = firebase.auth();
 
/**
 * @param {import("./util.js").UsuarioAuth} usuarioAuth 
 * @returns {Promise<Readonly<UsuarioVerificado>>} */
export async function verifica(usuarioAuth) {
  const docs = await collection("USUARIO").where("EMAIL_UP", "==",
    preparaParaBúsqueda(usuarioAuth.email)).limit(1).get();
  /** @type {DocumentSnapshot} */
  let doc = toOp(docs);
  if (doc) {
    /** @type {InfoUsuario} */
    const modelo = doc.data();
    return {
      id: doc.id,
      email: usuarioAuth.email,
      displayName: usuarioAuth.displayName,
      photoURL: usuarioAuth.photoURL,
      roles: modelo.ROL_ID || []
    };
  } else {
    return {
      id: null,
      email: usuarioAuth.email,
      displayName: usuarioAuth.displayName,
      photoURL: usuarioAuth.photoURL,
      roles: []
    };
  }
}
 
/** Asegura que cuando se despliegue una página, el usuario tenga los roles
  * indicados; de lo contrario lo redirige a la url para abortar.
  * @param {Readonly<string[]>} roles roles permitidos para la página
  * @param {string} urlParaAbortar url donde se redirige al usuario.
  * @param {(usuario: UsuarioVerificado)=>void} [fun] se invoca cuando el
  * usuario es válido. */
export function protege(roles, urlParaAbortar, fun) {
  valida(roles && roles.length > 0,
    "El número de roles debe ser mayor que 0.");
  auth.onAuthStateChanged(async usuarioAuth => {
    if (usuarioAuth && usuarioAuth.email) {
      // Usuario aceptado.
      const usuario = await verifica(usuarioAuth);
      if (intersección(roles, usuario.roles).length === 0) {
        location.href = urlParaAbortar;
      } else if (fun) {
        fun(usuario);
      }
    } else {
      // Usuario rechazado.
      location.href = urlParaAbortar;
    }
  },
    error);
}
 
/** Inicia sesión con Google y redirige a "index.html". */
export async function iniciaSesión() {
  // @ts-ignore
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  await auth.signInWithPopup(provider);
  location.href = "index.html";
}
 
/** Termina la sesión. */
export function terminaSesion() {
  catchas(async () => {
    await auth.signOut();
    inicio();
  });
}