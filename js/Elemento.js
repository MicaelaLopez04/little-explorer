class Elemento {
    // Constructor de la clase que recibe imagen, posición Y inicial y velocidad opcional
    constructor({ imagen, desdeY, velocidad = 5 }) {

        this.imagen = imagen; // Guarda la ruta de la imagen
        this.elemento = document.createElement("div"); // Crea un div para representar el elemento
        this.elemento.classList.add("elemento"); // Le asigna la clase CSS "elemento"

        this.elemento.style.backgroundImage = `url("${imagen}")`; // Establece la imagen como fondo del div
        document.getElementById("contenedorElemento").appendChild(this.elemento); // Agrega el div al contenedor en el DOM

        this.posX = window.innerWidth + 10; // Coloca el elemento justo fuera del borde derecho de la pantalla
        this.posY = desdeY; // Establece la posición vertical recibida
        this.velocidad = velocidad; // Guarda la velocidad
        this.activo = true; // Marca el elemento como activo

        this.elemento.style.position = "absolute"; // Posicionamiento absoluto en la pantalla
        this.elemento.style.left = this.posX + "px"; // Posición horizontal inicial
        this.elemento.style.bottom = this.posY + "px"; // Posición vertical desde abajo

        this.mover(); // Inicia el movimiento automático del elemento
    }

    mover() {
        // Método que mueve el elemento de derecha a izquierda a intervalos regulares
        this.intervalo = setInterval(() => {
            this.posX -= this.velocidad; // Mueve el elemento hacia la izquierda
            this.elemento.style.left = this.posX + "px"; // Actualiza la posición en pantalla

            if (this.posX < -100) { // Si el elemento sale de la pantalla por la izquierda
                clearInterval(this.intervalo); // Detiene el movimiento
                this.elemento.remove(); // Elimina el div del DOM
                this.activo = false; // Marca el elemento como inactivo
            }
        }, 50); // Intervalo de movimiento cada 50 ms
    }

    getRect() {
        // Devuelve las coordenadas y dimensiones del elemento (para detectar colisiones)
        return this.elemento.getBoundingClientRect();
    }

    colisionaCon(obj) {
        // Comprueba si hay colisión con otro objeto
        const a = this.getRect();
        const b = obj.getBoundingClientRect();

        // Devuelve true si los rectángulos se superponen
        return !(
            a.right < b.left ||
            a.left > b.right ||
            a.bottom < b.top ||
            a.top > b.bottom
        );
    }

    recolectar() {
        // Método para "recolectar" el elemento: lo elimina y detiene su movimiento
        this.activo = false;
        clearInterval(this.intervalo);
        this.elemento.remove();
    }

    pausar() {
        // Pausa el movimiento del elemento
        clearInterval(this.intervalo);
    }

    reanudar() {
        // Reanuda el movimiento del elemento
        this.mover();
    }
}
