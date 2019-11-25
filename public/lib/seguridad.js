import { collection, getArr, infos } from "./utilFire.js/index.js";
import { DocumentReference } from "./apiFire.js/index.js";
import { catchas, error, intersección, valida } from "../js/lib/util.js";
/** @typedef {Object} UsuarioVerificado
 * @property {"ausente"|"rechazado"| "aceptado"} estado estado.
 * @property {string} id id del usuario.
 * @property {string} USU_CUE email del usuario.
 * @property {string} displayName nombre registrado en la cuenta.
 * @property {string} photoURL url del avatar registrado en la cuenta.
 * @property {DocumentReference[]} ROL_ID referencias a los roles asignados.
*/
/** @typedef {Object} UsuarioAuth
* @property {string} email email del usuario.
* @property {string} displayName nombre registrado en la cuenta.
* @property {string} photoURL url del avatar registrado en la cuenta. */
/** Información de usuario registrada en el sistema para la sesión actual.
 * @type {UsuarioVerificado} */
const USUARIO_RECHAZADO = Object.freeze({
 estado: "rechazado",
 id: "",
 USU_CUE: "",
 displayName: "",
 photoURL: "",
 ROL_ID: []
});
/** Información de usuario registrada en el sistema para la sesión actual.
 * @type {UsuarioVerificado} */
let usuarioVerificado = Object.freeze({
 estado: "ausente",
 id: "",
 USU_CUE: "",
 displayName: "",
 photoURL: "",
 ROL_ID: []
});
/** @type {Set<(usuario: UsuarioVerificado) => void>} */
const observadores = new Set();
/** Observa el valor inicial y los cambios de este objeto.
 * @param {(usuario: UsuarioVerificado) => void} fun se invoca con el valor
 * inicial y los cambios de este objeto. */
export function observaUsuario(fun) {
 observadores.add(fun);
 fun(usuarioVerificado);
}
/**
 * @param {UsuarioVerificado} usuario */
function notifica(usuario) {
 if (usuarioVerificado !== usuario) {
 usuarioVerificado = usuario;
 observadores.forEach(fun => fun(usuarioVerificado));
 }
}
// @ts-ignore
firebase.auth().onAuthStateChanged(
 /** @param {UsuarioAuth} usuarioAuth */
 async usuarioAuth => {
 /** @type {UsuarioVerificado} */
 let nuevoUsuario = USUARIO_RECHAZADO;
 if (usuarioAuth && usuarioAuth.email) {
 nuevoUsuario = Object.freeze({
 estado: "aceptado",
 id: "",
 USU_CUE: usuarioAuth.email,
 displayName: usuarioAuth.displayName,
 photoURL: usuarioAuth.photoURL,
 ROL_ID: []
 });
 await catchas(async () => {
 /** @type {UsuarioVerificado[]} */
 const usuarios = infos(await collection("USUARIO")
 .where("EMAIL_UP", "==", usuarioAuth.email.toUpperCase())
 .limit(1)
 .get());
 if (usuarios.length > 0) {
 for (const usuario of usuarios) {
 nuevoUsuario = usuario;
 nuevoUsuario.estado = "aceptado";
 nuevoUsuario.displayName = usuarioAuth.displayName;
 nuevoUsuario.photoURL = usuarioAuth.photoURL;
 Object.freeze(nuevoUsuario);
 }
 }
 });
 }
 notifica(nuevoUsuario);
 },
 error);
/** Asegura que cuando se despliegue una página, el usuario tenga los roles
 * indicados; de lo contrario lo redirige a la url para abortar.
 * @param {string[]} roles roles permitidos para la página
 * @param {string} urlParaAbortar url donde se redirige al usuario.
 * @param {(usuario: UsuarioVerificado)=>void} [fun] se invoca cuando el
 * usuario es válido. */
export function protege(roles, urlParaAbortar, fun) {
 valida(roles && roles.length > 0,
 "El número de roles debe ser mayor que 0.");
 observaUsuario(async usuario => {
 try {
 const rolArr = (await getArr(usuario.ROL_ID)).map(rol => rol.id);
 if (usuario.estado !== "ausente") {
 if (usuario.estado === "rechazado"
 || intersección(roles, rolArr).length === 0) {
 location.href = urlParaAbortar;
 } else if (fun) {
 fun(usuario);
 }
 }
 }
 catch (e) {
 error(e);
 location.href = urlParaAbortar;
 }
 });
}
/** Inicia sesión con Google y redirige a "index.html". */
export async function iniciaSesión() {
 // @ts-ignore
 const provider = new firebase.auth.GoogleAuthProvider();
 provider.setCustomParameters({ prompt: "select_account" });
 // @ts-ignore
 await firebase.auth().signInWithPopup(provider);
 location.href = "index.html";
}