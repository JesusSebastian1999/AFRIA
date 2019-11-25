//
//  Autor: Building Code
//
//  Fecha: 29/10/2019
//
//Se crea un web component para el menu de profesores
customElements.define("herramientas-detalle", class extends HTMLElement {
 connectedCallback() {
   this.innerHTML = /*html*/
     ` <!-- Sidebar -->
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
         Alumnos
     </div>

     <!-- Agregar alumnos -->
     <li class="nav-item">
         <a class="nav-link" href="listaAlumno.html">
             <i class="fas fa-user"></i>
             <span>Lista de alumnos</span></a>
     </li>
     <li class="nav-item">
         <a class="nav-link" href="listaGrupo.html">
             <i class="fas fa-users"></i>
             <span>Lista de Grupos</span></a>
     </li>

     <!-- Nav Item - Pages Collapse Menu -->

     <!-- Separacion -->
     <hr class="sidebar-divider">

     <!-- Heading -->
     <div class="sidebar-heading">
         Examenes
     </div>

     <!-- Examen -->
     <li class="nav-item">
         <a class="nav-link" href="listaQuiz.html">
             <i class="fas fa-book-open"></i>
             <span>Crear Quiz</span></a>
     </li>
     <li class="nav-item">
     <a class="nav-link" href="listaTemas.html">
         <i class="fas fa-book-open"></i>
         <span>Lista de Temas</span></a>
     </li>
     <!-- Divider -->
     <hr class="sidebar-divider d-none d-md-block">

     <li class="nav-item ">
         <a class="nav-link" href="index.html">
             <i class="fas fa-arrow-left"></i>
             <span>Regresar Al Inicio</span></a>
     </li>
     <p>
     <input class="nav-item nav-link" type="button" name="terminaSesion" accesskey="T"
       value="Terminar Sesión">
    </p>
     <!-- Sidebar Toggler (Sidebar) -->
     <div class="text-center d-none d-md-inline">
         <button class="rounded-circle border-0" id="sidebarToggle"></button>
     </div>
     

 </ul>
 
 
     `;
 }
});