//! VARIABLES y SELECTORES
const formulario = document.querySelector("#agregar-gasto");
const gastoListado = document.querySelector("#gastos ul");

//! EVENTOS
eventListeners();
function eventListeners() {
  //al cargar todo el proyecto solicita el presupuesto
  document.addEventListener("DOMContentLoaded", preguntarPresupuesto);
}
//! CLASSES

//! FUNCIONES
function preguntarPresupuesto() {
  const presupuestoUsuario = prompt("Cual es tu presupuesto?");
  console.log(presupuestoUsuario);

  //validar prompt
  if (
    presupuestoUsuario === "" ||
    presupuestoUsuario === null ||
    isNaN(presupuestoUsuario) ||
    presupuestoUsuario <= 0
  ) {
    window.location.reload();
  }

  // convierte cualquier numero que sea string a number

  //recarga la pagina actual
}
