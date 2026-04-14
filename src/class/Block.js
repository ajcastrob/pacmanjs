import { tileSize, walls } from "../functions/variables";
// ============ Class para manejar los bloques o tiles  ================== //
export class Block {
  constructor(image, x, y, width, height) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    //Agregar dos variables para conocer la posición inicial del bloque.
    //Guardar la posición inicial de pacman y los fantasmas.
    this.startX = x;
    this.startY = y;

    this.direction = "R";
    //Buffer: guardar la intención de giro.
    this.requestedDirection = "R";
    //Ajustar velocidad para mayor fluidez.
    this.speed = tileSize / 4;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  // Comprueba si en una dirección específica habría colisión.
  canMove(direction) {
    let nextX = this.x;
    let nextY = this.y;

    if (direction === "U") {
      nextY -= this.speed;
    }

    if (direction === "D") {
      nextY += this.speed;
    }

    if (direction === "L") {
      nextX -= this.speed;
    }

    if (direction === "R") {
      nextX += this.speed;
    }

    // Predicción de la colisión con las paredes existentes.
    for (let wall of walls) {
      if (
        nextX < wall.x + wall.width &&
        nextX + this.width > wall.x &&
        nextY < wall.y + wall.height &&
        nextY + this.height > wall.y
      ) {
        return false; //chocaría con la pared.
      }
    }
    return true; //camino libre
  }

  updateVelocity() {
    if (this.direction === "U") {
      this.velocityX = 0;
      this.velocityY = -this.speed;
    } else if (this.direction === "D") {
      this.velocityX = 0;
      this.velocityY = this.speed;
    } else if (this.direction === "L") {
      this.velocityX = -this.speed;
      this.velocityY = 0;
    } else if (this.direction === "R") {
      this.velocityX = this.speed;
      this.velocityY = 0;
    }
  }

  reset() {
    this.x = this.startX;
    this.y = this.startY;
  }
}
