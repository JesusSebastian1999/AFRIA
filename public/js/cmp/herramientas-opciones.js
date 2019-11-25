customElements.define( "herramientas-opciones", class extends HTMLElement{
  connectedCallback ()
  {
    this.innerHTML =  /*html*/
      `
    <div>
    <a id="cancelar" class="btn btn-info btn-icon-split">
      <span class="icon text-white-50">
        <i class="fas fa-arrow-left"></i>
      </span>
      <span class="text">Cancelar</span>
    </a>
  <button id="guardar" type="submit" class="btn btn-success btn-icon-split">
    <span class="icon text-white-50">
      <i class="fas fa-save"></i>
    </span>
    <span class="text">Guardar</span>
  </button>
  <button id="eliminar" type="button" class="btn btn-danger btn-icon-split">
      <span class="icon text-white-50">
        <i class="fas fa-trash-alt"></i>
      </span>
      <span  class="text">Eliminar</span>
  </button>
  </div>
      `;
  }
}, { extends: 'header' });