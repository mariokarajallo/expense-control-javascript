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

  //metodo para crear un nuevo gasto y luego anadir ese gasto al HTML
  nuevoGasto(gasto) {
    //agregamos a la propiedad gasto(array) el gasto que recibimos del formulario
    this.gastos = [...this.gastos, gasto];
    //mandamos llamar a calcularRestante cada vez que se gener un nuevo gasto
    this.calcularRestante();
    // console.log("objeto gasto", this.gastos);
  }

  //calcularRestante
  calcularRestante() {
    //obtener cuanto dinero tenemos gastado
    // iteramos sobre el objeto de gasto, y utilizamos array metod ->reduce() para calcular cuando dinero hemos gastado
    // reduce: 1er parametro(total, acumulado), 2do(objeto actual que se sumara) -> valor inicial 0
    const gastado = this.gastos.reduce(
      (total, gasto) => total + gasto.cantidad,
      0
    );

    this.restante = this.presupuesto - gastado;
    console.log("llevamos gastado", gastado, "restante", this.restante);
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

  imprimirAlerta(mensaje, tipo) {
    //crear el elemento DIV para insertar en el HTML
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert");

    // valida el TIPO de error para mostrar un estilo de mensaje
    if (tipo === "error") {
      divMensaje.classList.add("alert-danger"); //agregamos el estilo alert-danger
    } else {
      divMensaje.classList.add("alert-success");
    }

    // asignamos el mensaje  a nuestro elemento DIV
    divMensaje.textContent = mensaje;

    //insertamos el DIV en el HTML
    document.querySelector(".primario").insertBefore(divMensaje, formulario);

    //quitar la alerta del HTML luego de 3seg
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }

  agregarGastoListado(gasto) {
    // elimina el HTML previo
    this.limpiarHTMl();
    // iterar sobre los gastos
    gasto.forEach((gasto) => {
      const { cantidad, nombre, id } = gasto;

      // crear un elemento LI
      const nuevoGasto = document.createElement("li");
      nuevoGasto.className =
        "list-group-item d-flex justify-content-between align-items-center";
      nuevoGasto.dataset.id = id;

      // agregar el HTML del gasto
      nuevoGasto.innerHTML = `${nombre} <span class='badge badge-primary' badge-pill> $ ${cantidad} </span>`;

      // Boton para borrar el gasto
      const btnBorrar = document.createElement("button");
      btnBorrar.classList.add("btn", "btn-danger", "borrar-gasto");
      btnBorrar.innerHTML = "borra &times";
      btnBorrar.onclick = () => {
        eliminarGasto();
      };
      nuevoGasto.appendChild(btnBorrar);

      // Agregar al HTML
      gastoListado.appendChild(nuevoGasto);
    });
  }

  limpiarHTMl() {
    //seleccionamos el primer nodo de nuestro listado de gasto definido en la cabecera
    while (gastoListado.firstChild) {
      gastoListado.removeChild(gastoListado.firstChild);
    }
  }

  actualizarRestante(restante) {
    //asiganamos al HTML el valor que recibimos de restante
    document.querySelector("#restante").textContent = restante;
  }

  comprobarPresupuesto(presupuestoObj) {
    //destructuramos nuestro objeto
    const { presupuesto, restante } = presupuestoObj;

    //seleccionamos el div, que va a cambiar de color segun porcentaje de restante
    const restanteDiv = document.querySelector(".restante");

    //comprobamos si gasto mas del 75% le damos estilo 'alert-danger'
    if (presupuesto / 4 > restante) {
      restanteDiv.classList.remove("alert-success", "alert-warning");
      restanteDiv.classList.add("alert-danger");
    } else if (presupuesto / 2 > restante) {
      //comprobamos si gasto mas del 50%, le damos estilo 'alert-warning'
      restanteDiv.classList.remove("alert-success");
      restanteDiv.classList.add("alert-warning");
    }

    // si el total es 0 o menor
    if (restante <= 0) {
      ui.imprimirAlerta("el presupuesto se ha agotado", "error");

      // desactivamos el boton de agregar para evitar seguir agregando
      formulario.querySelector("button[type='submit']").disabled = true;
    }
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
  e.preventDefault();

  // leer los datos del formulario y asiganmos el valor a una variable
  const nombre = document.querySelector("#gasto").value;
  const cantidad = Number(document.querySelector("#cantidad").value);

  // validar formulario
  if (nombre === "" || cantidad === "") {
    //pasamos un mensaje y el tipo de mensaje al metodo de UI
    ui.imprimirAlerta("Ambos campos son obligatorios", "error");
    return; // para que no se ejecute las siguientes lineas de codigo
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    ui.imprimirAlerta("cantidad no valida", "error");
    return; // para que no se ejecute las siguientes lineas de codigo
  }

  // generar un objeto con el gasto
  const gasto = { nombre, cantidad, id: Date.now() };

  //anade un nuevo gasto
  presupuesto.nuevoGasto(gasto);

  // mensaje de todo bien en el formulario
  ui.imprimirAlerta("gasto agregado correctamente");

  // imprimir/listar los gastos en el HTML
  const { gastos, restante } = presupuesto;
  ui.agregarGastoListado(gastos);

  // enviamos la propiedad restante del objeto prespuesto para calcular y mostrar en el HTML
  ui.actualizarRestante(restante);

  //comprobar presupuesto, como no podemos pasar solo el valor del presupuesto, debemos pasar el objeto entero
  ui.comprobarPresupuesto(presupuesto);

  //reinicia el formulario
  formulario.reset();
}
