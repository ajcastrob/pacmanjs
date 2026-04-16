import { Entity } from "./Entity";
import {
  pacmanUpImage,
  pacmanDownImage,
  pacmanLeftImage,
  pacmanRightImage,
} from "../functions/load-images";

export class Pacman extends Entity {
  constructor(x, y, tileSize) {
    super(x, y, tileSize, tileSize, tileSize / 4);

    // NUEVO: Imágenes para cada dirección
    this.imageUp = pacmanUpImage;
    this.imageDown = pacmanDownImage;
    this.imageLeft = pacmanLeftImage;
    this.imageRight = pacmanRightImage;
    this.image = this.imageRight; // Imagen actual

    // NUEVO: Buffer de dirección (para giros fluidos)
    this.requestedDirection = "R";
  }

  updateImage(direction) {
    // Cambia la imagen según la dirección
    if (direction === "U") this.image = this.imageUp;
    if (direction === "D") this.image = this.imageDown;
    if (direction === "L") this.image = this.imageLeft;
    if (direction === "R") this.image = this.imageRight;
  }
}
