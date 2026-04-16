export class InputHandler {
  constructor() {
    this.keyMap = {
      ArrowUp: "U",
      ArrowDown: "D",
      ArrowLeft: "L",
      ArrowRight: "R",
      KeyW: "U",
      KeyS: "D",
      KeyA: "L",
      KeyD: "R",
    };
    this.requestedDirection = null;

    this.setupKeyboard();
    this.setupButtons();
  }
  setupKeyboard() {
    document.addEventListener("keydown", (e) => {
      const direction = this.keyMap[e.code];
      if (direction) {
        e.preventDefault(); // Evitar scroll
        this.requestedDirection = direction;
      }
    });
  }
  setupButtons() {
    document.querySelectorAll("#controls button").forEach((btn) => {
      btn.addEventListener("click", () => {
        // Convertir el código del botón a dirección
        const direction = this.keyMap[btn.dataset.code];
        if (direction) {
          this.requestedDirection = direction;
        }
      });
    });
  }
  getRequestedDirection() {
    const dir = this.requestedDirection;
    this.requestedDirection = null; // Consumir input
    return dir;
  }
}
