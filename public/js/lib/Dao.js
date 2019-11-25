import { Transaction, Query, DocumentReference } from "./fireAPI.js";
//import { collection, firestore } from "./fireUtil.js";
import { valida,collection, firestore } from "./util.js";
 
/** Constraint unique.
 * @typedef {{campos:string[], mensaje:string}} Unique */
 
/** Constraint foreign key, pero al revés.
* @typedef {{collection:string, foránea:string, mensaje: string}} Foreign */
 
/** Objeto de acceso a datos para una collection.
 * @property {CollectionReference} collection */
export class Dao {
  /** Inicializa una instancia.
   * @param {string} nombre nombre de la collection.
   * @param {Unique[]} uniques conjunto de reglas
   * unique, cada una de las cuales es un conjunto de campos. 
   * @param {Foreign[]} requeridoPor conjunto de collection que hacen referencia
   * a esta collection y los nombres de sus llaves foráneas. */
  constructor(nombre, uniques, requeridoPor) {
    this.collection = collection(nombre);
    /** conjunto de reglas unique, cada una de las cuales es un conjunto de
     * campos. */
    this.uniques = uniques;
    /** conjunto de collection que hacen referencia a esta collection y los
     * nombres de sus llaves foráneas. */
    this.requeridoPor = requeridoPor;
  }
 
  /** agrega el modelo a la base de datos y devuelve el nuevo id.
   * @param {Object} modelo
   * @returns {Promise<DocumentReference>} referencia a los datos registrados.*/
  async agrega(modelo) {
    await this.revisaUniquesAlAgregar(modelo);
    return this.collection.add(modelo);
  }
 
  /** actualiza el modelo en la base de datos.
   * @param {string} id id del modelo
   * @param {{id:string}} modelo datos a modificar.
   * @returns {Promise<void>} */
  async actualiza(id, modelo) {
    await this.revisaUniquesAlActualizar(id, modelo);
    if (modelo.id) {
      delete modelo.id;
    }
    const ref = this.collection.doc(id);
    await firestore.runTransaction(
      /** @param {Transaction} tx */
      async tx => {
        const doc = await tx.get(ref);
        valida(doc.exists, "Registro no encontrado.");
        await tx.update(ref, modelo);
      });
  }
 
  /** Elimina un documento en la base de datos.
   * @param {string} id id que se busca.
   * @returns {Promise<void>} */
  async elimina(id) {
    await this.revisaRequeridoPorAlEliminar(id);
    return this.collection.doc(id).delete();
  }
 
  /** Revisa que las constraint unique se cumplan al momento de agregar.
   * @param {Object} modelo modelo que se agrega.
   * @returns {Promise<void>} Para indicar cuando termina y si hay error.
   * @throws Error cuando alguna constraint unique no se cumple. */
  async revisaUniquesAlAgregar(modelo) {
    uniq: for (const unique of this.uniques) {
      /** @type {Query} */
      let query = this.collection;
      for (const campo of unique.campos) {
        const valor = modelo[campo];
        if (valor === null || valor === undefined
          || (typeof valor === "number" && isNaN(valor))) {
          continue uniq;
        }
        query = query.where(campo, "==", valor);
      }
      const resultado = await query.get();
      valida(resultado.size === 0, unique.mensaje);
    }
  }
 
  /** Revisa que las constraint unique se cumplan al momento de actualizar.
   * @param {string} id id del modelo.
   * @param {Object} modelo datos que se actualizan.
   * @returns {Promise<void>} Para indicar cuando termina y si hay error.
   * @throws Error cuando alguna constraint unique no se cumple. */
  async revisaUniquesAlActualizar(id, modelo) {
    uniq: for (const unique of this.uniques) {
      /** @type {Query} */
      let query = this.collection;
      for (const campo of unique.campos) {
        const valor = modelo[campo];
        if (valor === null || valor === undefined
          || (typeof valor === "number" && isNaN(valor))) {
          continue uniq;
        }
        query = query.where(campo, "==", valor);
      }
      const resultado = await query.get();
      resultado.forEach(doc => valida(id == doc.id, unique.mensaje));
    }
  }
  
  /** Revisa que ninguna de las foreign keys indicada apunte a este documento.
   * @param {string} id id del documento que se revisa.
   * @returns {Promise<void>} Para indicar cuando termina y si hay error.
   * @throws Error cuando alguna foreign key se cumple. */
  async revisaRequeridoPorAlEliminar(id) {
    for (const foránea of this.requeridoPor) {
      const resultado = await firestore.collection(foránea.collection)
        .where(foránea.foránea, "==", id).get();
      valida(resultado.size === 0, foránea.mensaje);
    }
  }
}