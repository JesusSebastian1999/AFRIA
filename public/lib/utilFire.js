/** Funciones para firebase.
 * @module */
import {
    CollectionReference, DocumentSnapshot, Firestore, QuerySnapshot
  } from "./apiFire.js";
   
  /** Constante que permite acceder directamente al objeto firestore.
   * @type {Firestore} */
  // @ts-ignore
  export const firestore = firebase.firestore();
   
  /** Crea una referencia a la collection de firestore indicada.
   * @param {string} nombre nombre de la collection.
   * @returns {CollectionReference} dao para la collecction. */
  export function collection(nombre) {
    return firestore.collection(nombre);
  }
  /** Obtiene una entity a partir de un id.
  * @param {string} col
  * @param {string} id
  * @return {Promise<DocumentSnapshot|null>} */
  export async function getData(col, id) {
    if (id) {
      const doc = await collection(col).doc(id).get();
      return doc.exists ? doc : null;
    } else {
      return null;
    }
  }
  /** Obtiene las entity a partir de un array de ids.
  * @param {string} col
  * @param {string[]} ids
  * @return {Promise<DocumentSnapshot[]>} doc */
  export async function getDatas(col, ids) {
    return (await Promise.all(
      (ids || []).map(id => collection(col).doc(id).get())))
      .filter(doc => doc.exists);
  }
  /**
   * @param {QuerySnapshot} docs
   * @returns {DocumentSnapshot[]} */
  export function toArr(docs) {
    /** @type {DocumentSnapshot[]} */
    const arr = [];
    docs.forEach(doc => arr.push(doc));
    return arr;
  }
  /**
   * @param {QuerySnapshot} docs}
   * @returns {DocumentSnapshot} */
  export function toOp(docs) {
    /** @type {DocumentSnapshot} */
    let op = null;
    docs.forEach(doc => op = doc);
    return op;
  }
  