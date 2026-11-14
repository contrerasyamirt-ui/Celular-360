// CELULAR 360 - Registro de equipos

"use strict";

const STORAGE_KEY = "celular360_datos";

let equipos = [];

function iniciarAplicacion() {
  try {
    equipos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    equipos = [];
  }
function registrarCliente() {
  const nombre = prompt("Nombre completo del cliente:");
  if (!nombre || !nombre.trim()) return;

  const telefono = prompt("Número de teléfono:");
  if (!telefono || !telefono.trim()) return;

  const clientes = JSON.parse(
    localStorage.getItem("celular360_clientes") || "[]"
  );

  clientes.push({
    id: Date.now(),
    nombre: nombre.trim(),
    telefono: telefono.trim(),
    fecha: new Date().toLocaleDateString("es-MX")
  });

  localStorage.setItem("celular360_clientes", JSON.stringify(clientes));

  mostrar("Cliente registrado correctamente", nombre);
}
  actualizarContador();
}

function guardarDatos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(equipos));
  actualizarContador();
}

function actualizarContador() {
  const contador = document.getElementById("total");

  if (contador) {
    contador.textContent = equipos.length;
  }
}

function mostrar(titulo, mensaje) {
  document.getElementById("resultado").innerHTML =
    `<h2>${titulo}</h2><p>${mensaje}</p>`;
}

function registrar() {
  const equipo = prompt("Escribe la marca y modelo del celular:");

  if (!equipo || !equipo.trim()) {
    return;
  }

  equipos.push({
    id: Date.now(),
    equipo: equipo.trim(),
    fecha: new Date().toLocaleDateString("es-MX")
  });

  guardarDatos();

  mostrar("Equipo registrado correctamente", equipo);
}

document.addEventListener("DOMContentLoaded", iniciarAplicacion);
