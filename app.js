
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
  const equipo = prompt("Marca y modelo del celular:");

  if (!equipo || !equipo.trim()) return;

  equipos.push({
    id: Date.now(),
    equipo: equipo.trim(),
    fecha: new Date().toLocaleDateString("es-MX")
  });

  guardarDatos();
  mostrar("Equipo registrado correctamente", equipo);
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

// INICIAR CUANDO CARGUE LA PÁGINA
document.addEventListener("DOMContentLoaded", iniciarAplicacion);
