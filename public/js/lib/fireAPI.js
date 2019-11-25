/** Interfaces para Firestore
 * @module */
 
/** Representa una consulta
 * @interface */
export class Query {
  /** Recupera el resultado de una consulta.
   * @returns {Promise<QuerySnapshot>} resultado de la consulta. */
  async get() { throw new Error("interface."); }
  /** Consulta sincronizada.
   * @param {(qs: QuerySnapshot)=> void} _fun invocada cuando llegan los
   * datos o se modifican.
   * @param {(e: Error) => void} _error procesa transacciones. */
  onSnapshot(_fun, _error) { throw new Error("interface."); }
  /** limita el número de documentos que puede devolver la consulta.
   * @param {number} _longitud máximo número de documentos que puede recuperar
   * la consulta.
   * @returns {Query} */
  limit(_longitud) { throw new Error("interface."); }
  /** Establece una condición.
   * @param {string} _campo campo a comparar.
   * @param {string} _operador puede ser: "<", "<=", "==", ">=", ">" o
   * "array-contains".
   * @param {*} _valor valor a comparar.
   * @returns {Query} */
  where(_campo, _operador, _valor) { throw new Error("interface."); }
  /** Crea una ruta para un documento.
   * @param {string=} _id id del documento.
   * @returns {DocumentReference} referencia a un documento. Si falta el id,
   * se genera un nueo id. */
  doc(_id) { throw new Error("interface."); }
  /** Ordena una consulta.
   * @param {string} _campo campo para ordenar.
   * @param {string} [_direccion="asc"] "asc" ó "desc".
   * @returns {Query}  */
  orderBy(_campo, _direccion) { throw new Error("interface."); }
}
 
/** Dao para una collection
 * @interface
 * @extends {Query} */
export class CollectionReference extends Query {
  constructor() {
    super();
    /** Un texto que representa la ruta de la collection, relativa a la raíz de
     * la base de datos. */
    this.path = "";
  }
  /** agrega datos y genera automáticamente un id,
   * @param {Object} _data
   * @returns {Promise<DocumentReference>} referencia a los datos registrados.*/
  async add(_data) { throw new Error("interface."); }
}
 
/** Dao para un document
 * @interface */
export class DocumentReference {
  constructor() {
    /** id del documento. */
    this.id = "";
  }
  /** Consulta sincronizada.
   * @param {(ds: DocumentSnapshot) => void} _fun invocada cuando llegan los
   * datos o se modifican.
   * @param {(e: Error) => void} _error procesa transacciones. */
  onSnapshot(_fun, _error) { throw new Error("interface."); }
  /** Modifica un documento.
   * @param {Object} _obj datos para la modificación.
   * @returns {Promise<void>} para indicar la finalización de la operación. */
  set(_obj) { throw new Error("interface."); }
  /** Modifica solo las property que están en el objeto; el resto no se afecta.
   * @param {Object} _obj datos para la modificación.
   * @returns {Promise<void>} para indicar la finalización de la operación. */
  update(_obj) { throw new Error("interface."); }
  /** Recupera un documento.
   * @returns {Promise<DocumentSnapshot>} datos del documento. */
  async get() { throw new Error("interface."); }
  /** Elimina un documento.
   * @returns {Promise<void>} para indicar la finalización de la operación. */
  delete() { throw new Error("interface."); }
}
 
/** Copia descargada de un document en el servidor.
  * @interface */
export class DocumentSnapshot {
  constructor() {
    /** si hay un documento. */
    this.exists = true;
    /** id del documento. */
    this.id = "";
  }
  /** Devuelve los datos del documento.
   * @returns {Object} los datos del documento. */
  data() { throw new Error("interface."); }
}
 
/** Resultado de una consulta.
 * @interface */
export class QuerySnapshot {
  constructor() {
    /** número de elementos. */
    this.size = 0;
  }
  /** Función iteradora.
   * @param {(ds: DocumentSnapshot) => void} _fun función para iterar sobre
   * los elementos. */
  forEach(_fun) { throw new Error("interface."); }
}
 
/**
 * Transacciones.
 */
export class Transaction {
  /** Lee el documento que corresponde a la referencia.
   * @param {DocumentReference} _docRef referencia del documento que se lee.
   * @returns {Promise<DocumentSnapshot>} el resultado. */
  get(_docRef) { throw new Error("interface."); }
  /** Escribe el documento en la referencia. Si no hay documento en la
   * referencia, se crea.
   * @param {*} _docRef referencia del documento
   * @param {*} _datos datos del documento.
   * @returns {Promise<void>} */
  set(_docRef, _datos) { throw new Error("interface."); }
  /** Modifica solo los campos indicados en el documento en la referencia.
   * @param {*} _docRef referencia del documento
   * @param {*} _datos datos del documento.
   * @returns {Promise<void>} */
  update(_docRef, _datos) { throw new Error("interface."); }
}