import { DocumentReference } from "../lib/fireAPI.js";
//import { cod } from "../lib/htmlUtil.js";
import { colapsaEspacios,cod } from "../lib/util.js";
 
/** Select que carga su contenido dinámicamente. */
export class MiSelect extends HTMLSelectElement {
  /** Se ejecuta cuando el web component se agrega a su padre. */
  connectedCallback() {
    this.innerHTML = /* html */ `<option value="">Cargando…</option>`;
    /** @type {Map<string, DocumentReference>} */
    this.refs = new Map();
  }
  /** Carga un listado de modelos y genera su render. Debe completarse antes de
   * asignar valor.
   * @param {*[]} listado contiene los modelos a mostrar.
   * @param {import("../lib/OpRender").OpRenderer} renderer función que
   * devuelve un OpRender o una Promise<OpRender> para un elemento del listado.
   * @returns {Promise<void>} */
  async carga(listado, renderer) {
    /** @type {import("../lib/OpRender").OpRender[]} */
    const renders = await Promise.all(listado.map(renderer));
    this.innerHTML = "";
    const textoDeNull = this.dataset.textodenull;
    if (textoDeNull) {
      this.innerHTML += /* html */
        `<option value="">${cod(textoDeNull)}</option>`;
    }
    for (const render of renders) {
      const id = render.ref.id;
      const texto = colapsaEspacios(render.texto);
      this.refs.set(id, render.ref);
      this.innerHTML += /* html */
        `<option value="${cod(id)}">${cod(texto)}</option>`;
    }
  }
  /** Devuelve el valor seleccionado para selección simple. Calcula el
   * valor a partir de sus opciones.
   * @returns DocumentReference el valor del web component. */
  get valor() {
    return this.value ? this.refs.get(this.value) : null;
  }
  /** Asigna el valor para selección simple. Configura las opciones para que
   * muestren el valor.
   * @param {DocumentReference} valor valor asignado. */
  set valor(valor) {
    this.value = valor ? valor.id : "";
  }
  /** Devuelve el valor seleccionado para selección simple. Calcula el valor a
   * partir de sus opciones.
   * @returns {DocumentReference[]} el valor del web component. */
  get valores() {
    return Array.from(this.selectedOptions)
      .map(op => this.refs.get(op.value))
      .filter(Boolean);
  }
  /** Asigna el valor para selección simple. Configura las opciones para que
   * muestren el valor.
   * @param {DocumentReference[]} valor valor asignado. */
  set valores(valor) {
    const arr = Array.isArray(valor) ? valor.map(ref => ref.id) : [];
    const set = new Set(arr);
    for (const option of this.options) {
      option.selected = set.has(option.value);
    }
  }
}
 
customElements.define("mi-select", MiSelect, { extends: "select" });