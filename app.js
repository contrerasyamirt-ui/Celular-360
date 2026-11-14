
"use strict";

// CONFIGURACIÓN
const STORAGE_KEY = "celular360_datos";
const CLIENTES_KEY = "celular360_clientes";

let equipos = [];
let clientes = [];

// INICIAR APLICACIÓN
function iniciarAplicacion() {
  try {
    equipos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    clientes = JSON.parse(localStorage.getItem(CLIENTES_KEY)) || [];
  } catch (error) {
    equipos = [];
    clientes = [];
  }

  actualizarContador();
}

// GUARDAR EQUIPOS
function guardarDatos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(equipos));
  actualizarContador();
}

// ACTUALIZAR CONTADOR
function actualizarContador() {
  const contador = document.getElementById("total");

  if (contador) {
    contador.textContent = equipos.length;
  }
}

// MOSTRAR RESULTADOS
function mostrar(titulo, mensaje) {
  const resultado = document.getElementById("resultado");

  if (resultado) {
    resultado.innerHTML = `<h2>${titulo}</h2><p>${mensaje}</p>`;
  }
}

// REGISTRAR EQUIPO
function registrar() {
  if (clientes.length === 0) {
    alert("Primero debes registrar un cliente.");
    return;
  }

  let lista = "Selecciona el cliente:\n";

  clientes.forEach((cliente, i) => {
    lista += `${i + 1}. ${cliente.nombre} - ${cliente.telefono}\n`;
  });

  const seleccion = prompt(lista);
  const indice = Number(seleccion) - 1;

  if (
    seleccion === null ||
    !Number.isInteger(indice) ||
    indice < 0 ||
    indice >= clientes.length
  ) {
    alert("Selecciona un cliente válido.");
    return;
  }

  const cliente = clientes[indice];
  const equipo = prompt("Marca y modelo del celular:");

  if (!equipo || !equipo.trim()) return;

  equipos.push({
    id: Date.now(),
    clienteId: cliente.id,
    cliente: cliente.nombre,
    telefono: cliente.telefono,
    equipo: equipo.trim(),
    fecha: new Date().toLocaleDateString("es-MX")
  });

  guardarDatos();

  mostrar(
    "Equipo registrado correctamente",
    equipo + " — Cliente: " + cliente.nombre
  );
}

// REGISTRAR CLIENTE
function registrarCliente() {
  const nombre = prompt("Nombre completo del cliente:");
  if (!nombre || !nombre.trim()) return;

  const telefono = prompt("Número de teléfono:");
  if (!telefono || !telefono.trim()) return;

  clientes.push({
    id: Date.now(),
    nombre: nombre.trim(),
    telefono: telefono.trim(),
    fecha: new Date().toLocaleDateString("es-MX")
  });

  localStorage.setItem(CLIENTES_KEY, JSON.stringify(clientes));

  mostrar("Cliente registrado correctamente", nombre);
}
// MÓDULO DE DIAGNÓSTICO

function diagnostico() {
  if (equipos.length === 0) {
    alert("Primero debes registrar un equipo.");
    return;
  }

  let lista = "Selecciona el equipo:\n";

  equipos.forEach((equipo, i) => {
    lista += `${i + 1}. ${equipo.equipo} - Cliente: ${equipo.cliente}\n`;
  });

  const seleccion = prompt(lista);

  if (seleccion === null) return;

  const indice = Number(seleccion) - 1;

  if (
    !Number.isInteger(indice) ||
    indice < 0 ||
    indice >= equipos.length
  ) {
    alert("Selecciona un equipo válido.");
    return;
  }

  const equipo = equipos[indice];

  const falla = prompt("¿Qué falla reporta el cliente?");
  if (!falla || !falla.trim()) return;

  const revision = prompt("Escribe el diagnóstico técnico:");
  if (!revision || !revision.trim()) return;

  const observaciones = prompt("Observaciones adicionales:") || "Sin observaciones";

  const diagnosticos = JSON.parse(
    localStorage.getItem("celular360_diagnosticos") || "[]"
  );

  diagnosticos.push({
    id: Date.now(),
    equipoId: equipo.id,
    cliente: equipo.cliente,
    telefono: equipo.telefono,
    equipo: equipo.equipo,
    falla: falla.trim(),
    revision: revision.trim(),
    observaciones: observaciones.trim(),
    fecha: new Date().toLocaleDateString("es-MX")
  });

  localStorage.setItem(
    "celular360_diagnosticos",
    JSON.stringify(diagnosticos)
  );

  mostrar("Diagnóstico registrado correctamente", equipo.equipo);
}
// MÓDULO DE HISTORIAL
function historial() {
  const diagnosticos = JSON.parse(
    localStorage.getItem("celular360_diagnosticos") || "[]"
  );

  if (equipos.length === 0 && diagnosticos.length === 0) {
    mostrar("Historial", "Todavía no hay registros.");
    return;
  }

  let contenido = "";

  contenido += "<h3>Equipos registrados</h3>";

  equipos.forEach((equipo, i) => {
    contenido += `
      <p>
        <strong>${i + 1}. ${equipo.equipo}</strong><br>
        Cliente: ${equipo.cliente}<br>
        Teléfono: ${equipo.telefono}<br>
        Fecha: ${equipo.fecha}
      </p>
      <hr>
    `;
  });

  contenido += "<h3>Diagnósticos registrados</h3>";

  diagnosticos.forEach((d, i) => {
    contenido += `
      <p>
        <strong>${i + 1}. ${d.equipo}</strong><br>
        Cliente: ${d.cliente}<br>
        Falla: ${d.falla}<br>
        Diagnóstico: ${d.revision}<br>
        Observaciones: ${d.observaciones}<br>
        Fecha: ${d.fecha}
      </p>
      <hr>
    `;
  });

  const resultado = document.getElementById("resultado");

  if (resultado) {
    resultado.innerHTML = contenido;
  }
}// INICIAR CUANDO CARGUE LA PÁGINA
document.addEventListener("DOMContentLoaded", iniciarAplicacion);
