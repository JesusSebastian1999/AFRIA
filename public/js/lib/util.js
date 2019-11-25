/** Funciones utilizadas en todo el proyecto.
 *  @module */
 
export const urlSearchParams = new URLSearchParams(location.search);
 
/** devuelve el valor de un parámetro de la página.
 * @param {?string} name nombre del parámetro que se busca.
 * @returns {?string} valor del parámetro, o null si no lo encuentra. */
export function getURLSearchParam(name) {
  return name ? urlSearchParams.get(name) : null;
}
 
/** Muestra una instancia de Error en la consola y muestra un diálogo
 * alert con la propiedad message del objeto.
 * @param {Error} e instancia que contiene el error. */
export function error(e) {
  console.error(e);
  alert(e.message);
}
 
/** Asegura que una condición se cumpla, o en caso contrario lanza un Error. * 
 * @param {*} condición expresión cuyo valor boolean debe ser true.
 * @param {*} mensaje mensaje para el Error que se lanza cuando la condición no
 * @throws {Error} si la condición no se cumple */
export function valida(condición, mensaje) {
  if (!condición) {
    throw new Error(mensaje);
  }
}
 
/** Quita los espacios al inicio y al final. Sustituye cualquier secuencia de
 * espacios y saltos de línea por un solo espacio.
 * @param {string=} texto el texto a procesar.
 * @returns {string} el texto procesado*/
export function colapsaEspacios(texto) {
  return (texto || "").trim().replace(/\s+/g, " ");
}
 
/** Prepara un téxto para los algoritmos de búsqueda: Colapsa espacios,
 * convierte el texto a mayúsculas y finalmente, quita los acentos y tildes.
 * @param {string} texto el texto procesado. */
export function preparaParaBúsqueda(texto) {
  return colapsaEspacios(texto).toUpperCase()
    .replace(/(á|Á|é|É|í|Í|ó|Ó|ú|Ú|ñ|Ñ)/g,
      /** Sustituye un caracter acentuado por su versión no acentuada y
       * mayúscula.
       * @param {string} letra texto a reemplazar.
       * @returns {string} el texto reemplazado. */
      letra => {
        switch (letra) {
          case "á":
          case "Á": return "A";
          case "é":
          case "É": return "E";
          case "í":
          case "Í": return "I";
          case "ó":
          case "Ó": return "O";
          case "ú":
          case "Ú": return "U";
          case "ñ":
          case "Ñ": return "N";
          default: return letra;
        }
      });
}
 
/** Ejecuta una función y atrapa el Error que se llegue a generar, en cuyo caso,
 * ejecuta la función error y cambia a la url, en caso de que se indique.
 * @param {() => void} fun función a ejecutar. */
export function catche(fun) {
  try {
    fun();
  } catch (e) {
    // En caso de error.
    error(e)
  }
}
 
/** Recibe una Promise o una function que devuelve una Promise, las procesa y
 * en caso de error, ejecuta la función error y cambia a la url, en caso de que
 * se indique. Devuelve todo esto en forma de Promise. Como es async, la sección
 * de código que invoque esta función, no se espera a que termine, a menos que
 * use el operador await.
 * @param {(()=>Promise)|Promise} prom función a una Promise o promise a
 * ejecutar. 
 * @returns {Promise<void>} una Promise que refleja el procesamiento de esta
 * función. */
export async function catchas(prom) {
  try {
    // Espera a que termine la Promise resultante.
    await (prom instanceof Function ? prom() : prom);
  } catch (e) {
    // En caso de error.
    error(e)
  }
  // Devuelve una Promise<void>.
}
 
/** Verifica que una referencia apunte a un objeto y que este no sea NaN, Si
 * alguna de las 2 condiciones no se cumple, lanza un TypeError.
 * @param {*} referencia la referrencia que se verifica.
 * @param {string=} mensaje message del TypError si no se aprueba la validación.
 * @returns {!*} la misma referencia, pero con seguridad apunta a un objeto que
 * no es NaN.
 * @throws Type error si la referenca vale null, undefined o apunta a un NaN. */
export function exige(referencia, mensaje) {
  if (referencia === null || referencia === undefined
    || (typeof referencia === "number" && isNaN(referencia))) {
    throw new TypeError(mensaje);
  }
  return referencia;
}

//--------------------------------------------------------------------------------

//HTMLUTIL
/** Funciones para html.
 *  @module */
 
/** Elimina todas las etiquetas que abren o cierran los element script, de un
 * texto HTML.
 * @param {string} html texto HTML.
 * @returns {string} texto HTML sin las etiquetas que abren o cierran los
 * element script */
export function sinScript(html) {
  // Reemplaza todas las ocurrencias de <script> y </script> por texto vacío.
  return (html || "").replace(/(\<script\>)|(\<\/script\>)/g, "");
}
 
/** Codifica un texto para que escape los caracteres especiales para que no se
 * pueda interpretar como HTML.
 * @param {*} texto
 * @returns {string} un texto que no puede interpretarse como HTML. */
export function cod(texto) {
  let div = document.createElement('div');
  div.innerText = (texto || "").toString();
  return div.innerHTML;
}
 
/** codifica una url para que se interprede correctamente en un element a.
 * @param {string} url url que se codifica.
 * @returns {string} la url codificada. */
export function url(url) {
  return cod(encodeURIComponent(url));
}
/** Indica si un input type="file" tiene un archivo seleccionado.
 * @param {HTMLInputElement} file input que se analiza.
 * @returns {File} devuelve el archivo seleccionado; en otro caso, false. */
export function fileSeleccionado(file) {
  return file.files && file.files[0];
}

//----------------------------------------------------------------------------------

//FIREUTIL
/** Funciones para firebase.
 * @module */
import {
  CollectionReference, DocumentReference, DocumentSnapshot, QuerySnapshot
} from "./fireAPI.js";
 
/** Constante que permite acceder directamente al objeto firestore. */
// @ts-ignore
export const firestore = firebase.firestore();
 
/** Crea una referencia a la collection de firestore indicada.
 * @param {string} nombre nombre de la collection.
 * @returns {CollectionReference} dao para la collecction. */
export function collection(nombre) {
  return firestore.collection(nombre);
}
 
/** Obtiene una entity a partir de un DocumentSnapshot.
* @param {DocumentSnapshot} doc
* @return {*} doc */
export function info(doc) {
  if (doc.exists) {
    const modelo = doc.data();
    modelo.id = doc.id;
    return modelo;
  } else {
    return null;
  }
}
 
/** Obtiene una entity a partir de un DocumentReference.
* @param {DocumentReference} doc
* @return {Promise<Object|null>} */
export async function getRef(doc) {
  return doc ? info(await doc.get()) : null;
}
export function arr(a) {
  return a ? a : [];
 }
 
/** Obtiene las entity a partir de un DocumentReference[].
* @param {DocumentReference[]} docs
* @return {Promise<*[]>} doc */
export async function getArr(docs) {
  return (await Promise.all((docs || []).map(ref => ref.get())))
    .filter(ds => ds.exists)
    .map(info);
}
 
/**
 * @param {QuerySnapshot} querySnapshot resultado de una consulta.
 * @returns {*[]} querySnapshot array con las info convertidas.  */
export function infos(querySnapshot) {
  /** arr apunta a un nuevo array vacío.
   * @type {{id:string}[]} */
  const arr = [];
  /* Procesa todos los elementos de querySnapshot aplicando la función que
   * se pasa a forEach sobre cada uno de los elementos de querySnapshot. */
  querySnapshot.forEach(
    /** Convierte un DocumentSnapshot en info y lo agrega al arreglo.
     *@param {DocumentSnapshot} doc elemento de querySnapshot que se procesa. */
    doc => {
      const modelo = info(doc);
      if (modelo) {
        arr.push(modelo);
      }
    });
  return arr;
}
 
/** Permite subir un archivo. 
 * @param {HTMLInputElement} file element que permite seleccionar el archivo.
 * @param {string=} nombre nombre del archivo. Si falta, se toma del archivo. */
export async function subeFile(file, nombre) {
  if (fileSeleccionado(file)) {
    if (!nombre) {
      nombre = file.files[0].toString();
    }
    // @ts-ignore
    const snapshot = await firebase.storage().ref(nombre).put(file.files[0]);
    return await snapshot.ref.getDownloadURL();
  } else {
    return null;
  }
}
export function copiaAttr(element, atributo, atributoNuevo, predeterminado) {
  const attr = eh(texto(atributoNuevo, atributo));
  return element.hasAttribute(atributo)
    ? `${attr}="${eh(element.getAttribute(atributo))}"`
    : (predeterminado ? `${attr}="${eh(texto(predeterminado))}"` : "");
 }
 /** Muestra la página inicial del sitio. */
export function inicio() {
  location.href = "index.html";
}

 



/** Obtiene un array con los elementos que pertenecen simultáneamente a otros 2
 * array.
 * @param {Array} a primer operando.
 * @param {Array} b segundo operando. */
export function intersección(a, b) {
  /* Aplica la función que recibe filter a todos los elementos de a y solo se
  * queda con los que devuelven true. */
  return a.filter(
  /** @param{*} elemA un elemento del array a */
  elemA =>
  /* busca elemA. si lo encuentra, se obtiene un índice >= 0 y por lo tanto
  * devuelve true. Si no lo encuentra, se obtiene un valor negativo y
  * por lo mismo devuelve false. */
  b.indexOf(elemA) >= 0
  );
 }