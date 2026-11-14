
const STORAGE_KEY = "celular360_equipos";

let equipos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

function guardarDatos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(equipos));
    actualizarContador();
    }

    function actualizarContador() {
      const total = document.getElementById("total");
        if (total) total.textContent = equipos.length;
        }

        function mostrar(titulo, mensaje) {
          const resultado = document.getElementById("resultado");
            if (!resultado) return;

              resultado.innerHTML = `
                  <h3>${titulo}</h3>
                      <p>${mensaje}</p>
                        `;
                        }

                        function registrar() {
                          const equipo = prompt("Escribe la marca y modelo del celular:");

                            if (!equipo || !equipo.trim()) return;

                              equipos.push({
                                  id: Date.now(),
                                      equipo: equipo.trim(),
                                          fecha: new Date().toLocaleDateString("es-MX")
                                            });

                                              guardarDatos();
                                                mostrar("Equipo registrado", equipo);
                                                }

                                                function diagnostico() {
                                                  mostrar(
                                                      "Diagnóstico",
                                                          "Selecciona una prueba para comenzar. Los resultados deben verificarse físicamente."
                                                            );
                                                            }

                                                            function pruebaPantalla() {
                                                              const resultado = document.getElementById("resultado");

                                                                resultado.innerHTML = `
                                                                    <h3>Prueba de pantalla</h3>
                                                                        <p>Comprueba los colores y la respuesta táctil.</p>
                                                                            <button onclick="colorPrueba('#ff0000')">Rojo</button>
                                                                                <button onclick="colorPrueba('#00ff00')">Verde</button>
                                                                                    <button onclick="colorPrueba('#0000ff')">Azul</button>
                                                                                        <button onclick="colorPrueba('#ffffff')">Blanco</button>
                                                                                            <button onclick="colorPrueba('#000000')">Negro</button>
                                                                                                <button onclick="colorPrueba('#1B2D48')">Finalizar prueba</button>
                                                                                                  `;
                                                                                                  }

                                                                                                  function colorPrueba(color) {
                                                                                                    document.getElementById("resultado").style.background = color;
                                                                                                    }

                                                                                                    function pruebaSonido() {
                                                                                                      const Audio = window.AudioContext || window.webkitAudioContext;

                                                                                                        if (!Audio) {
                                                                                                            mostrar("Sonido", "Tu navegador no admite esta prueba.");
                                                                                                                return;
                                                                                                                  }

                                                                                                                    const audio = new Audio();
                                                                                                                      const tono = audio.createOscillator();
                                                                                                                        const volumen = audio.createGain();

                                                                                                                          tono.connect(volumen);
                                                                                                                            volumen.connect(audio.destination);
                                                                                                                              tono.frequency.value = 440;
                                                                                                                                volumen.gain.value = 0.08;

                                                                                                                                  tono.start();
                                                                                                                                    tono.stop(audio.currentTime + 1);

                                                                                                                                      mostrar("Prueba de sonido", "¿Escuchaste el tono de prueba?");
                                                                                                                                      }

                                                                                                                                      function inventario() {
                                                                                                                                        mostrar("Inventario", "El módulo de inventario se desarrollará en una siguiente etapa.");
                                                                                                                                        }

                                                                                                                                        function historial() {
                                                                                                                                          if (equipos.length === 0) {
                                                                                                                                              mostrar("Historial", "Todavía no hay equipos registrados.");
                                                                                                                                                  return;
                                                                                                                                                    }

                                                                                                                                                      const lista = equipos.map(e =>
                                                                                                                                                          `<p>${e.equipo} · ${e.fecha}</p>`
                                                                                                                                                            ).join("");

                                                                                                                                                              mostrar("Historial", lista);
                                                                                                                                                              }

                                                                                                                                                              actualizarContador();
                                                                                                                                                              