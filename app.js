// CELULAR 360
// Sistema de gestión para taller de reparación de celulares

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

document.addEventListener("DOMContentLoaded", iniciarAplicacion);
