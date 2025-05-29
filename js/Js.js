"use strict"
document.addEventListener('DOMContentLoaded', () => {
  // Instancia al personaje principal y lo pone a correr
  let runner = new Runner();
  runner.correr();

  // Variables del juego
  let enemigos = [];
  let vidas = 3;
  let puntaje = 0;
  let recolectable = [];
  let tiempo = 120;

  // Intervalos para el bucle principal y generación de enemigos y recolectables
  let intervaloJuego = setInterval(gameLoop, 50);
  let intervaloEnemigos = setInterval(generarEnemigo, 6000);
  let intervaloRecolectables = setInterval(generarElemento, 7000);

  // Estados del juego
  let juegoPausado = false;
  let btnPausar = document.querySelector("#pausar");
  let tiempoElemento = document.querySelector("#tiempoRestante");
  let cartel = document.querySelector('#cartel');
  let teclaAbajoPresionada = false;

  // Referencias a elementos del DOM
  const personaje = document.querySelector("#personaje");
  const panel = document.querySelector("#panelJugador");

  // Eventos para los botones del juego
  document.querySelector("#reiniciar").addEventListener("click", reiniciar);

  document.querySelector('#botonCerrar').addEventListener('click', function() {
    cerrarCartel();
    pausar();
  });

document.querySelector("#reiniciarJuego").addEventListener("click", reiniciarJuego);
  // Abrir cartel de información si se hace clic en un botón con clase .botonInfo
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('botonInfo')) {
      abrirCartel();
      pausar();
    }
  });

  // Botón para reiniciar tras el Game Over
  document.querySelector("#jugarNuevamente").addEventListener('click', function() {
    reiniciar();
    document.querySelector("#pantallaGameOver").style.display = "none";
    document.querySelector("#juego").style.display = "block";
    iniciarJuego();
  });

  // Botón para pausar/reanudar
  document.querySelector("#pausar").addEventListener("click", function() {
    pausar();
    btnPausar.textContent = juegoPausado ? "▶️ Reanudar" : "⏸ Pausar";
  });

  // Botón para comenzar el juego desde la pantalla inicial
  document.querySelector("#btnIniciar").addEventListener('click', function() {
    document.querySelector("#iniciarJuego").style.display = "none";
    document.querySelector("#juego").style.display = "block";
    cerrarCartel();
    reiniciar();
  });

  // Temporizador del juego (1 segundo por tick)
  let intervaloTiempo = setInterval(() => {
    tiempo--;
    tiempoElemento.textContent = tiempo;

    if (tiempo <= 0) {
     
      terminarJuego();
    }
  }, 1000);

  // Controles del jugador
  document.addEventListener('keydown', function(event) {
    if (juegoPausado) return;

    if (event.key === "ArrowDown") {
      runner.agacharse();
      event.preventDefault();
    } else if (event.key === "ArrowUp") {
      runner.levantarse();
      runner.saltar();
      event.preventDefault();
    }
  });

  function reiniciarJuego() {
  document.getElementById("pantallaFin").style.display = "none";
  reiniciar();
  juegoPausado=true;
  pausar();
  // Mostrar pantalla de juego si está oculta
  document.getElementById("juego").style.display = "block";
}


  function mostrarPantallaFin(puntaje) {
   document.getElementById("pantallaFin").style.display = "flex";
   document.getElementById("puntajeFinal").textContent = "Puntos obtenidos: " + puntaje;
  }

  // Reinicia todos los intervalos y valores
  function iniciarJuego() {
    intervaloJuego = setInterval(gameLoop, 50);
    intervaloEnemigos = setInterval(generarEnemigo, 6000);
    intervaloRecolectables = setInterval(generarElemento, 7000);
  }

  // Termina el juego
  function terminarJuego() {
    pausar(); // solo pausa, se muestra pantalla de Game Over desde gameLoop
   /*NUEVO */ mostrarPantallaFin(puntaje);
   /*NUEVO */ clearInterval(intervaloTiempo);
  }

  // Reinicia variables y elementos del juego
  function reiniciar() {
    vidas = 3;
    puntaje = 0;
    tiempo = 120;

    // Limpia enemigos de pantalla
    enemigos.forEach(enemigo => {
      enemigo.activo = false;
      if (enemigo.enemigo) enemigo.enemigo.remove();
    });
    enemigos = [];

    // Limpia elementos recolectables
    recolectable.forEach(elemento => {
      elemento.activo = false;
      if (elemento.elemento) elemento.elemento.remove();
    });
    recolectable = [];

    actualizarPanel();
    tiempoElemento.textContent = tiempo;

    if (runner.reset) runner.reset(); // reposiciona el personaje

    clearInterval(intervaloTiempo);
    intervaloTiempo = setInterval(() => {
      tiempo--;
      tiempoElemento.textContent = tiempo;

      if (tiempo <= 0) {
        clearInterval(intervaloTiempo);
        terminarJuego();
      }
    }, 1000);
  }

  // Pausa o reanuda el juego
  function pausar() {
    if (!juegoPausado) {
      juegoPausado = true;

      clearInterval(intervaloJuego);
      clearInterval(intervaloEnemigos);
      clearInterval(intervaloRecolectables);
      clearInterval(intervaloTiempo);

      enemigos.forEach(e => e.pausar());
      recolectable.forEach(e => e.pausar());

      document.querySelectorAll('.layer, .elemento, #personaje').forEach(el => {
        el.classList.add('paused');
      });

      console.log("Juego pausado");
    } else {
      juegoPausado = false;

      intervaloJuego = setInterval(gameLoop, 50);
      intervaloEnemigos = setInterval(generarEnemigo, 6000);
      intervaloRecolectables = setInterval(generarElemento, 7000);

      enemigos.forEach(e => e.reanudar());
      recolectable.forEach(e => e.reanudar());

      intervaloTiempo = setInterval(() => {
        tiempo--;
        tiempoElemento.textContent = tiempo;

        if (tiempo <= 0) {
          clearInterval(intervaloTiempo);
          terminarJuego();
        }
      }, 1000);

      document.querySelectorAll('.layer, .elemento, #personaje').forEach(el => {
        el.classList.remove('paused');
      });

      console.log("Juego reanudado");
    }
  }

  // Crea un nuevo elemento recolectable aleatorio
  function generarElemento() {
    const imagenes = [
      "imagenes/antorcha.png",
      "imagenes/mapa.png",
      "imagenes/binoculares.png",
      "imagenes/cantimplora.png",
      "imagenes/corazon.png"
    ];

    const imagenAleatoria = imagenes[Math.floor(Math.random() * imagenes.length)];

    const elemento = new Elemento({
      imagen: imagenAleatoria,
      desdeY: 100 + Math.random() * 150,
      velocidad: 5
    });

    recolectable.push(elemento);
    console.log("Elemento creado y agregado", elemento);
  }

  // Bucle principal del juego, verifica colisiones y puntajes
  function gameLoop() {
    enemigos.forEach((enemigo, i) => {
      if (enemigo.activo && !runner.saltando) {
        if (enemigo.vuela && runner.estaAgachado) return;

        if (enemigo.colisionaCon(personaje)) {
          enemigo.explotar();
          if (vidas > 0) {
            vidas--;
            actualizarPanel();
          }
          enemigos.splice(i, 1);

          if (vidas <= 0) {
            document.querySelector("#pantallaGameOver").style.display = "flex";
          }

          return;
        }
      }

      // Si el enemigo fue esquivado, sumar puntaje
      if (enemigo.activo &&
          !enemigo.colisionaCon(personaje) &&
          enemigo.posX + 50 < personaje.getBoundingClientRect().left &&
          !enemigo.yaSumoPuntaje) {
        puntaje += 20;
        enemigo.yaSumoPuntaje = true;
        actualizarPanel();
      }
    });

    // Verificar si se recolectan elementos
    recolectable.forEach((elemento, i) => {
      if (elemento.activo && elemento.colisionaCon(personaje)) {
        if (elemento.imagen.includes("corazon")) {
          vidas++;
        } else {
          puntaje += 10;
        }
        elemento.recolectar();
        recolectable.splice(i, 1);
        actualizarPanel();
      }
    });
  }

  // Genera un nuevo enemigo (terrestre o volador)
  function generarEnemigo() {
    const tipo = Math.random() < 0.5 ? "terrestre" : "buho";

    let enemigo;
    if (tipo === "terrestre") {
      enemigo = new Enemy({
        imagen: "imagenes/zorro.png",
        imagenHit: "imagenes/zorroGolpeado.png",
        desdeY: 100,
        velocidad: 10
      });
    } else {
      enemigo = new Enemy({
        imagen: "imagenes/buho.png",
        imagenHit: "imagenes/buhoGolpeado.png",
        desdeY: 300,
        velocidad: 4,
        vuela: true,
        claseExtra: "buho"
      });
    }

    enemigos.push(enemigo);
  }

  // Actualiza la interfaz (vidas y puntaje)
  function actualizarPanel() {
    document.getElementById("vidas").textContent = `Vidas: ${"❤️ ".repeat(vidas)}`;
    document.getElementById("puntaje").textContent = `Puntaje: ${puntaje}`;
  }

  // Muestra el cartel de información
  function abrirCartel() {
    cartel.classList.remove('oculto');
  }

  // Oculta el cartel de información
  function cerrarCartel() {
    cartel.classList.add('oculto');
  }
});