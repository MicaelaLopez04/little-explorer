# 🧭 Little Explorer

**Little Explorer** es un videojuego de plataformas 2D desarrollado con HTML, CSS y JavaScript.

El jugador controla a un niño explorador que debe atravesar un bosque, esquivar enemigos y recolectar diferentes objetos mientras intenta conseguir la mayor cantidad de puntos antes de que se termine el tiempo.

## 🎮 Características

- 🏃 Personaje principal con animaciones de movimiento.
- ⬆️ Salto para esquivar obstáculos y enemigos.
- ⬇️ Agacharse para evitar enemigos voladores.
- ❤️ Sistema de vidas.
- ⭐ Sistema de puntuación.
- ⏱️ Temporizador de 120 segundos.
- ⏸️ Pausar y reanudar la partida.
- 🔄 Reiniciar el juego.
- 💀 Pantalla de Game Over.
- 🏆 Pantalla final con el puntaje obtenido.
- 🌲 Fondo animado con efecto **parallax**.
- 👾 Enemigos terrestres y voladores.
- 🎒 Objetos recolectables.
- ✨ Animaciones para los objetos.
- 💥 Detección de colisiones entre el personaje, enemigos y objetos.
- 🎲 Generación aleatoria de enemigos y objetos.

## 🕹️ Controles

| Tecla / Acción | Función |
|---|---|
| ⬆️ Flecha arriba | Saltar |
| ⬇️ Flecha abajo | Agacharse |
| ⏸️ Botón Pausar | Pausar / reanudar |
| 🔄 Botón Reiniciar | Reiniciar la partida |
| 🎮 Jugar de nuevo | Comenzar una nueva partida después de perder |

## 🎒 Objetos recolectables

Durante la partida aparecen diferentes objetos que el jugador puede recolectar:

- 🔭 **Binoculares**
- 🗺️ **Mapa**
- 🔥 **Antorcha**
- 💧 **Cantimplora**
- ❤️ **Corazón**

Los objetos recolectables permiten obtener puntos y, en el caso del corazón, recuperar una vida.

## 👾 Enemigos

El juego cuenta con diferentes tipos de enemigos:

### 🦊 Zorro

Enemigo terrestre que se desplaza hacia el jugador y debe ser esquivado mediante un salto.

### 🦉 Búho

Enemigo volador que se desplaza por diferentes alturas. El jugador puede evitarlo agachándose.

## ⭐ Sistema de puntuación

El jugador obtiene puntos durante la partida:

- Recolectar un objeto: **+10 puntos**
- Esquivar un enemigo: **+20 puntos**
- Recolectar un corazón: recupera una vida

La partida finaliza cuando el jugador pierde todas sus vidas o cuando el temporizador llega a cero.

## 🧩 Tecnologías utilizadas

- **HTML5** — estructura de la interfaz y elementos del juego.
- **CSS3** — diseño, animaciones, sprites y efecto parallax.
- **JavaScript** — lógica del juego, eventos, movimiento, colisiones, puntuación y gestión de estados.

## 🏗️ Conceptos implementados

Durante el desarrollo se trabajaron diferentes conceptos de programación:

- Programación orientada a objetos.
- Clases y herencia.
- Manipulación del DOM.
- Manejo de eventos.
- Temporizadores mediante `setInterval` y `setTimeout`.
- Detección de colisiones.
- Generación aleatoria de elementos.
- Gestión de estados del juego.
- Animaciones mediante CSS.
- Uso de sprites.
- Efecto parallax.
- Manejo dinámico de elementos HTML.

## 📁 Estructura del proyecto

```text
little-explorer/
│
├── index.html
├── Style.css
│
├── js/
│   ├── Js.js
│   ├── Personaje.js
│   ├── Runner.js
│   ├── Enemy.js
│   └── Elemento.js
│
└── imagenes/
    ├── portadaJuego.png
    ├── finDeJuego.png
    ├── terminoLaPartida.png
    ├── niñocaminando.png
    ├── niñosaltando.png
    ├── niñoagachado.png
    ├── zorro.png
    ├── buho.png
    ├── antorcha.png
    ├── mapa.png
    ├── binoculares.png
    ├── cantimplora.png
    ├── corazon.png
    └── nature_1/
