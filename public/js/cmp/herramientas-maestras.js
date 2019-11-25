customElements.define("herramientas-maestras", class extends HTMLElement {
  connectedCallback() {
    this.innerHTML =  /*html*/
      `
      <button class="btn btn-primary" id="cancelar" title="Cancelar" hidden>
      <i class="fas fa-arrow-left"></i>
    </button>
    <input class="form-control bg-light small" type="search" placeholder="Buscar" hidden>
    <span class="divisor"></span>
    <button class="btn btn-primary" id="buscar" title="Buscar">
      <i class="fas fa-search fa-sm"></i>
    </button>

        <a id="agregar" class="btn btn-success btn-icon-split">
            <span class="icon text-white-50">
                <i class="fas fa-plus"></i>
            </span>
            <span class="text">Agregar</span>
        </a>
        <h1>
        <output id="título"><progress max="100">Cargando…</progress></output>
      </h1>
      `;
    /** @type {HTMLButtonElement} */
    this.cancelar = this.querySelector("#cancelar");
    /** @type {HTMLInputElement} */
    this.filtro = this.querySelector("[type=search]");
    /** @type {HTMLSpanElement} */
    this.divisor = this.querySelector(".divisor");
    /** @type {HTMLButtonElement} */
    this.buscar = this.querySelector("#buscar");
    /** @type {HTMLButtonElement} */
    this.agregar = this.querySelector("#agregar");
    this.buscar.addEventListener("click", this.busca.bind(this));
    this.cancelar.addEventListener("click", this.cancela.bind(this));
  }
  cancela() {
    this.cancelar.hidden = true;
    this.filtro.hidden = true;
    this.filtro.value = "";
    // this.divisor.hidden = false;
    this.buscar.hidden = false;
    this.agregar.hidden = false;
    const event = new Event('input', {
      'bubbles': true,
      'cancelable': true
    });
    this.filtro.dispatchEvent(event);
  }
  busca() {
    this.cancelar.hidden = false;
    this.filtro.hidden = false;
    this.filtro.value = "";
    // this.divisor.hidden = true;
    this.buscar.hidden = true;
    this.agregar.hidden = true;
  }
  
}, { extends: 'header' });