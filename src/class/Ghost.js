import { Entity } from "./Entity";

export class Ghost extends Entity {
  constructor(x, y, tileSize, ghostType, ghostImage) {
    super(x, y, tileSize, tileSize, tileSize / 4);
    this.ghostType = ghostType; // "red", "blue", "pink", "orange"
    this.image = ghostImage;
  }
  // Método que elige dirección aleatoria válida
  chooseDirection(walls, options) {
    let newDirection;
    do {
      newDirection = options[Math.floor(Math.random() * options.length)];
    } while (!this.canMove(walls, newDirection));
    this.direction = newDirection;
  }
  // ¿Debería evadir la línea horizontal?
  shouldEvadeHorizontalLine(walls, tileSize) {
    if (this.y === 9 * tileSize) {
      if (this.canMove(walls, "U")) {
        // ✅ walls como parámetro
        return Math.random() < 0.3;
      }
    }
    return false;
  }
}
