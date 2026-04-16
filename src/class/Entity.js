//=================Clase principal que luego servirá para heredar =====================//
export class Entity {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;

    //Guardar la posción inicial.
    this.startX = x;
    this.startY = y;

    //Posición inicial para los objetos.
    this.direction = "R";
    this.velocityX = 0;
    this.velocityY = 0;
  }

  //Método para saber el movimiento.
  canMove(walls, direction) {
    //Definir para moverse.
    let nextX = this.x;
    let nextY = this.y;

    //Verificar la dirección
    // up es -y; down +y; left -x; rigth +x

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

    // Predicción de la colisión con las paredes.
    for (let wall of walls) {
      if (
        nextX < wall.x + wall.width &&
        nextX + this.width > wall.x &&
        nextY < wall.y + wall.height &&
        nextY + this.height > wall.y
      ) {
        return false; //chocaría con la pared
      }
    }
    return true; //camino libre
  }

  //método para actualizar la velocidad.
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

  //Método para resetear el estado de los obejtos.
  reset() {
    this.x = this.startX;
    this.y = this.startY;
    this.velocityX = 0;
    this.velocityY = 0;
  }
}
