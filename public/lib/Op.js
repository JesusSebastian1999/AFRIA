/** Permite ejecutar funciones solo si un conjunto de referencias son válidas.
 * En el caso de que alguna de ellas sea null o undefined, no se ejecuta. El
 * valor devuelto se puede recuperar. Si la función no se ejecutó, se obtiene
 * undefined. La operación se puede encadenar invocando repetidamente al método
 * ej. El resultado se obtiene en la propiedad res. */
export class Op {
  /** Crea una instancia de Op a partir de los parámetros.
   * @param {*[]} args valores que no pueden ser null o undefined.*/
  constructor(args) {
    /** @type {*[]} */
    this.args = args;
  }
  /** Ejecuta una función sobre los parámetros recibidos por el constructor. Si
   * hay al menos un parámetro y todos son válidos, la función se ejecuta y se
   * devuelve un Op con el resultado; en caso contrario la función no se ejecuta
   * y se devuelve un Op sin argumentos. Un parámetro es válido si no vale null,
   * ni undefined, ni NaN. Se puede realzar una ejecución encadenada.
   * @param { (ar1:*) => *} fun function a evaluar sobre las referencias
   * recibidas por el constructor.
   * @returns {Op} */
  map(fun) {
    if (this.args && this.args.length) {
      for (const valor of this.args) {
        if (!this.valorPermitido(valor)) {
          return new Op([]);
        }
      }
      const res = fun.apply(null, this.args);
      return new Op([res]);
    } else {
      return new Op([]);
    }
  }
  /** Ejecuta una función sobre los parámetros recibidos por el constructor. Si
   * hay al menos un parámetro y todos son válidos, la función se ejecuta y se
   * devuelve un Op con el resultado; en caso contrario la función no se ejecuta
   * y se devuelve un Op sin argumentos. Un parámetro es válido si no vale null,
   * ni undefined, ni NaN. Se puede realzar una ejecución encadenada.
   * @param {function(*): Promise<*> } fun function a
   * evaluar sobre las referencias recibidas por el constructor.
   * @returns {Promise<Op>} */
  async asyncMap(fun) {
    if (this.args && this.args.length) {
      for (const valor of this.args) {
        if (!this.valorPermitido(valor)) {
          return new Op([]);
        }
      }
      const res = await fun.apply(null, this.args);
      return new Op([res]);
    } else {
      return new Op([]);
    }
  }
  /** Ejecuta una función sobre los parámetros recibidos por el constructor. Si
   * hay al menos un parámetro y todos son válidos, la función se ejecuta y si
   * el resultado equivale a true, devuelve un Op con los parámetros; en caso
   * contrario la función no se ejecuta y se devuelve un Op sin argumentos. Un
   * parámetro es válido si no vale null, ni undefined, ni NaN. Se puede realzar
   * una ejecución encadenada.
   * @param {(arg:*) => *} fun function a evaluar sobre las referencias
   * recibidas por el constructor.
   * @returns {Op}*/
  filter(fun) {
    if (this.args && this.args.length) {
      for (const valor of this.args) {
        if (!this.valorPermitido(valor)) {
          return new Op([]);
        }
      }
      const res = fun.apply(null, this.args);
      if (this.valorPermitido(res)) {
        return new Op(this.args);
      } else {
        return new Op([]);
      }
    } else {
      return new Op([]);
    }
  }
  /**
   * @param {*} [predefinido = ""]
   * @returns {*} */
  get(predefinido = "") {
    if (this.args.length == 0) {
      return predefinido;
    } else {
      const valor = this.args[0];
      if (this.valorPermitido(valor)) {
        return valor;
      } else {
        return predefinido;
      }
    }
  }
  /**
   * @param {*} valor */
  valorPermitido(valor) {
    return !(valor === null || valor === undefined
      || (typeof valor === "number" && isNaN(valor)));
  }
}
 
/** Función de conveniencia para crear una instancia de la clase Op, que permite
 * evitar la ejecución de una función con sobre referencias null o undefined.
 * @param  {...any} args valores que no deben ser null o undefiined.
 * @returns {Op} una instancia de la clase Op. */
export function op(...args) {
  return new Op(args);
}