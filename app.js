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
