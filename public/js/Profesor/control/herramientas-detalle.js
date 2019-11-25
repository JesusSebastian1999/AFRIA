customElements.define( "herramientas-opciones", class extends HTMLElement{
  connectedCallback ()
  {
    this.innerHTML =  /*html*/
      `
    <a href="listaGrupo.html" class="btn btn-info btn-icon-split">
      <span class="icon text-white-50">
        <i class="fas fa-arrow-left"></i>
      </span>
      <span class="text">Cancelar</span>
    </a>
  <button id="guardar" type="submit" class="btn btn-warning btn-icon-split">
      <span class="icon text-white-50">
        <i class="fas fa-pen"></i>
      </span>
      <span  class="text">Modificar</span>
  </button>
  <button id="eliminar" type="button" id="eliminar" class="btn btn-danger btn-icon-split">
      <span class="icon text-white-50">
        <i class="fas fa-trash-alt"></i>
      </span>
      <span  class="text">Eliminar</span>
  </button>
  
      `;
  }
});