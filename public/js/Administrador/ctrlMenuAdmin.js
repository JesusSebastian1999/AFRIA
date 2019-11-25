//
//  Autor: Building Code
//
//  Fecha: 29/10/2019
//
//Creamos un web component para crear el menu del administrador 
customElements.define("herramientas-detalle", class extends HTMLElement {
 connectedCallback() {
   this.innerHTML = /*html*/
     ` 
     <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div class="sidebar-brand-icon">
                    <img class="img-fluid" src="../../img/afriaV2.png" alt="Afria"></img>
                </div>
                <div class="sidebar-brand-text mx-3">ÁFRIA <sup>Quiz Geografía </sup></div>
            </a>

            <hr>
            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <!-- Apartado para los Alumnos-->
            <div class="sidebar-heading">
                Gestión
            </div>

            <!-- Agregar alumnos -->
            <li class="nav-item">
                <a class="nav-link" href="listaProfesores.html">
                    <i class="fas fa-users"></i>
                    <span>Agrega Profesores</span></a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider d-none d-md-block">


        </ul>
     `;
 }
});