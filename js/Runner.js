// La clase Runner extiende de Personaje, heredando sus propiedades y métodos
class Runner extends Personaje {
  
  constructor() {
    super(); // Llama al constructor de la clase Personaje
    this.personaje = document.querySelector("#personaje"); // Referencia al elemento HTML del personaje
    this.saltando = false; // Estado: si está saltando
    this.estaAgachado = false; // Estado: si está agachado
    this.timeoutAgachado = null; // Timer para volver a levantarse automáticamente
  }

  // Inicia la animación de correr
  correr() {
    this.clean(); // Limpia cualquier clase de animación previa
    this.personaje.classList.add("correr"); // Agrega la clase CSS de correr
    this.saltando = false;
    this.estaAgachado = false;
  }

  // Inicia la animación de salto si no está agachado
  saltar() {
    if (this.personaje.classList.contains("correr") && !this.estaAgachado) {
      this.clean(); // Limpia clases anteriores
      this.personaje.classList.add("saltar"); // Agrega la clase de salto
      this.saltando = true;

      // Al terminar la animación de salto, llama a caer()
      this.personaje.addEventListener("animationend", () => {
        this.caer();
      }, { once: true }); // El listener se ejecuta una sola vez
    }
  }

  // Inicia la animación de caída y luego vuelve a correr
  caer() {
    this.clean();
    this.personaje.classList.add("caer");

    // Al terminar la animación de caída, vuelve a correr
    this.personaje.addEventListener("animationend", () => {
      this.correr();
    }, { once: true });
  }

  // Hace que el personaje se agache, y se levanta automáticamente luego de 3 segundos
  agacharse() {
    if (this.estaAgachado || this.saltando) return; // Evita agacharse si ya está agachado o saltando

    this.clean();
    this.personaje.classList.add("agacharse");
    this.estaAgachado = true;

    // Programar levantarse después de 3 segundos
    this.timeoutAgachado = setTimeout(() => {
      this.levantarse();
    }, 3000);
  }

  // Levanta al personaje si estaba agachado
  levantarse() {
    if (!this.estaAgachado) return;

    clearTimeout(this.timeoutAgachado); // Limpia el timeout si lo hay
    this.timeoutAgachado = null;

    this.clean();
    this.correr(); // Vuelve a la animación de correr
  }

  // Elimina todas las clases de animación del personaje
  clean() {
    this.personaje.classList.remove("correr", "saltar", "caer", "agacharse");
  }
}