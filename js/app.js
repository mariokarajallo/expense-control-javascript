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
class Presupuesto {}

class UI {}

//! FUNCIONES
function preguntarPresupuesto() {
  const presupuestoUsuario = prompt("Cual es tu presupuesto?");
  console.log(presupuestoUsuario);

  //validar prompt
  // Number -> convierte cualquier numero que sea string a number
  if (
    presupuestoUsuario === "" ||
    presupuestoUsuario === null ||
    isNaN(presupuestoUsuario) ||
    presupuestoUsuario <= 0
  ) {
    //recarga la pagina actual
    window.location.reload();
  }
}
