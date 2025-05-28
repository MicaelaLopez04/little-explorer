class Enemy extends Personaje {
    // Constructor que recibe varios parámetros para configurar al enemigo
    constructor({ imagen, imagenHit, desdeY, velocidad = 5, vuela = false, claseExtra = "" }) {
        super(); // Llama al constructor de la clase base (Personaje)

        this.enemigo = document.createElement("div"); // Crea un div para representar al enemigo
        this.enemigo.classList.add("enemigo"); // Asigna la clase CSS "enemigo"
        if (claseExtra) this.enemigo.classList.add(claseExtra); // Agrega una clase extra si se pasa por parámetro

        this.enemigo.style.backgroundImage = `url("${imagen}")`; // Aplica la imagen como fondo del div

        document.getElementById("contenedor").appendChild(this.enemigo); // Añade el div al contenedor principal

        this.posX = window.innerWidth + 100; // Posición horizontal inicial, fuera de la pantalla
        this.posYBase = desdeY; // Guarda la posición base en Y
        this.posY = desdeY; // Posición vertical inicial

        this.velocidad = velocidad; // Velocidad de movimiento
        this.vuela = vuela; // Indica si el enemigo tiene movimiento ondulatorio
        this.tiempo = 0; // Tiempo para animación ondulatoria
        this.activo = true; // Marca al enemigo como activo
        this.imagenHit = imagenHit; // Imagen que se muestra al "morir"

        this.enemigo.style.position = "absolute"; // Posicionamiento absoluto
        this.enemigo.style.left = this.posX + "px"; // Posición horizontal inicial
        this.enemigo.style.bottom = this.posY + "px"; // Posición vertical inicial
        this.yaSumoPuntaje = false; // Bandera para controlar si ya sumó puntos

        this.mover(); // Inicia el movimiento automático
    }

    mover() {
        // Método que hace que el enemigo se mueva de derecha a izquierda
        this.intervalo = setInterval(() => {
            this.posX -= this.velocidad; // Desplaza el enemigo hacia la izquierda

            if (this.vuela) {
                this.tiempo += 0.1;
                this.posY = this.posYBase + Math.sin(this.tiempo * 2) * 50; // Si vuela, sigue una trayectoria de onda
            }

            this.enemigo.style.left = this.posX + "px"; // Actualiza la posición horizontal
            this.enemigo.style.bottom = this.posY + "px"; // Actualiza la posición vertical

            if (this.posX < -150) { // Si sale completamente de pantalla por la izquierda
                clearInterval(this.intervalo); // Detiene el movimiento
                this.enemigo.remove(); // Elimina el div del DOM
                this.activo = false; // Marca al enemigo como inactivo
            }
        }, 50); // Ejecuta cada 50 milisegundos
    }

    getRect() {
        // Devuelve las coordenadas y dimensiones del enemigo
        return this.enemigo.getBoundingClientRect();
    }

    colisionaCon(obj) {
        // Comprueba si colisiona con otro objeto, considerando un margen
        const a = this.getRect();
        const b = obj.getBoundingClientRect();

        const margen = 20;
        return !(
            a.right - margen < b.left + margen ||
            a.left + margen > b.right - margen ||
            a.bottom - margen < b.top + margen ||
            a.top + margen > b.bottom - margen
        );
    }

    explotar() {
        // Cambia la imagen a la de impacto y elimina al enemigo después de 1 segundo
        this.enemigo.style.backgroundImage = `url("${this.imagenHit}")`;
        this.activo = false;
        clearInterval(this.intervalo);
        setTimeout(() => this.enemigo.remove(), 1000);
    }

    status() {
        // Llama al método status de la clase padre (si está definido)
        super.status();
    }

    pausar() {
        // Detiene el movimiento del enemigo
        clearInterval(this.intervalo);
    }

    reanudar() {
        // Reanuda el movimiento del enemigo
        this.mover();
    }
}
