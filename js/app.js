//! VARIABLES y SELECTORES
const formulario = document.querySelector("#agregar-gasto");
const gastoListado = document.querySelector("#gastos ul");

//! EVENTOS
eventListeners();
function eventListeners() {
  //al cargar todo el proyecto solicita el presupuesto
  document.addEventListener("DOMContentLoaded", preguntarPresupuesto);

  document.addEventListener("submit", agregarGasto);
}
//! CLASSES
class Presupuesto {
  //
  constructor(presupuesto) {
    // Number -> convierste cualquier numero que sea string a number
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
    this.gastos = [];
  }
}

class UI {
  insertarPrespuesto(cantidad) {
    //extrayendo los valores
    const { presupuesto, restante } = cantidad;

    //agregando en el HTML
    document.querySelector("#total").textContent = presupuesto;
    document.querySelector("#restante").textContent = restante;
  }
}

// instaciar
const ui = new UI();
let presupuesto;

//! FUNCIONES
function preguntarPresupuesto() {
  const presupuestoUsuario = prompt("Cual es tu presupuesto?");
  // console.log(presupuestoUsuario);

  //validar prompt
  if (
    presupuestoUsuario === "" ||
    presupuestoUsuario === null ||
    isNaN(presupuestoUsuario) ||
    presupuestoUsuario <= 0
  ) {
    //recarga la pagina actual
    window.location.reload();
  }

  // Instanciamos la clase Presupuesto y una vez tenemos el prespuesto por parte del usuario pasamos al constructor
  presupuesto = new Presupuesto(presupuestoUsuario);
  console.log(presupuesto);

  ui.insertarPrespuesto(presupuesto);
}

//agregar gastos al HTML
function agregarGasto(e) {
  e.preventDafault();

  // leer los datos del formulario y asiganmos el valor a una variable
  const nombre = document.querySelector("#gasto").value;
  const cantidad = document.querySelector("#cantidad").value;
}
