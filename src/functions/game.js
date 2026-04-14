import { Block } from "../class/Block";
import { tileMap } from "./mapa";
import { eatSound, deathSound, victorySound, musicPacman } from "./variables";
import {
  options,
  rowCount,
  colCount,
  tileSize,
  boardWidht,
  boardHeigth,
} from "./variables";
import { walls, foods, ghosts } from "./variables";
import {
  loadImages,
  wallImage,
  redGhostImage,
  blueGhostImage,
  orangeGhostImage,
  pinkGhostImage,
  pacmanUpImage,
  pacmanDownImage,
  pacmanLeftImage,
  pacmanRightImage,
} from "./load-images";

let context; //princel que se usa para dibujar el canvas.

// Definir a pacman.
let pacman;
//Definir la variable de food y score.
let score = 0;
let lives = 3;
let gameOver = false;

//Variable de la etiqueta de vidas.
let spanLives = document.getElementById("lives-value");

// ============================= Al cargar la página =========================
export let inicio = () => {
  let board = document.getElementById("board");
  board.height = boardHeigth;
  board.width = boardWidht;
  context = board.getContext("2d");

  loadImages();
  loadMap();
  //Span lives.
  spanLives.textContent = " " + lives;

  // console.log(walls.size);
  // console.log(foods.size);
  // console.log(ghosts.size);

  document.addEventListener("keypress", movePacman);
  document.querySelectorAll("#controls button").forEach((btn) => {
    btn.addEventListener("click", () => {
      //Creamos un objeto 'falso' que tenga la propiedad .code.
      const fakeEvent = { code: btn.dataset.code };
      //llamamos a la función del teclado.
      movePacman(fakeEvent);
    });
  });

  //Iniciar el juego al presionar el botón
  document.getElementById("btn-start").addEventListener("click", () => {
    let buttonStart = document.getElementById("btn-start");
    let imageOverlap = document.getElementById("overlap");
    imageOverlap.style.display = "none";
    buttonStart.style.display = "none";
    update();
    musicPacman.play();
  });
};

function loadMap() {
  // Limpiar los sets al reiniciar cualquier juego.
  walls.clear();
  foods.clear();
  ghosts.clear();

  // Recorrer cada fila y columna del mapa.
  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < colCount; c++) {
      //Escoger la primera fila y luego el caracter de la columna.
      const row = tileMap[r];
      const tileMapChar = row[c];

      // calcular la posición de x e y
      const x = c * tileSize;
      const y = r * tileSize;

      if (tileMapChar === "X") {
        //Comprobar el caracter y contruir un bloque
        const wall = new Block(wallImage, x, y, tileSize, tileSize);
        // Agregar la pared al Set
        walls.add(wall);
      } else if (tileMapChar === "b") {
        const ghost = new Block(blueGhostImage, x, y, tileSize, tileSize);
        ghosts.add(ghost);
      } else if (tileMapChar === "p") {
        const ghost = new Block(pinkGhostImage, x, y, tileSize, tileSize);
        ghosts.add(ghost);
      } else if (tileMapChar === "o") {
        const ghost = new Block(orangeGhostImage, x, y, tileSize, tileSize);
        ghosts.add(ghost);
      } else if (tileMapChar === "r") {
        const ghost = new Block(redGhostImage, x, y, tileSize, tileSize);
        ghosts.add(ghost);
      } else if (tileMapChar === "P") {
        pacman = new Block(pacmanRightImage, x, y, tileSize, tileSize);
      } else if (tileMapChar === " ") {
        // Para calcular el espacio vacío que sera la comida.
        // La comida se calcula de acuerdo a cada cuadrícula 32x32
        // sumar 14, x e y para cada espacio.
        // El restante (4) será el tamaño de la comida.
        const food = new Block(null, x + 9, y + 9, 2, 2);
        foods.add(food);
      }
    }
  }
}

//==================== Game loop ======================//
function update() {
  //Si gameOver es true retornar.
  if (gameOver) return;
  // LLamar a move y draw para acutalizar el estado del juego.
  //move, se encarga de pacaman / draw, del dashboard
  move();
  moveGhosts(); //mueve a los fontamas;
  foodCheck(); //comprobar la comida.
  draw();

  //Llamado a setTimeout para actualizar el juego.
  //El juego será manejado a 20 fps.
  //20fps -> 1000ms / 20 = 50
  //Recursividad. La función update se llama a sí misma cada 50 milisegundos.
  setTimeout(update, 50);
}

function draw() {
  //Limpiar el cavas para que no se interponga un frame sobre otro.
  context.clearRect(0, 0, board.width, board.height);
  //LLamar a context, cuya función es ser el pincel para dibujar los elementos.
  context.drawImage(
    pacman.image,
    pacman.x,
    pacman.y,
    pacman.width,
    pacman.height,
  );

  //Para dibujar a los fontasmas se itera sobre el set.
  for (let ghost of ghosts.values()) {
    context.drawImage(ghost.image, ghost.x, ghost.y, ghost.width, ghost.height);
  }

  // dibujar las paredes
  for (let wall of walls.values()) {
    context.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height);
  }

  // dibujar la comida.
  context.fillStyle = "white";
  for (let food of foods.values()) {
    context.fillRect(food.x, food.y, food.width, food.height);
  }
}

// Esta función se encarga de actualizar el movimiento de Pacman. Es llamda en Update.
function move() {
  //1. Intentar aplicar el giro guardado en el buffer.
  if (pacman.canMove(pacman.requestedDirection)) {
    pacman.direction = pacman.requestedDirection;

    //Alineación automática (Snapping) para no quedarse trabado por un píxel.
    if (pacman.direction === "U" || pacman.direction === "D") {
      pacman.x = Math.round(pacman.x / tileSize) * tileSize;
    } else {
      pacman.y = Math.round(pacman.y / tileSize) * tileSize;
    }

    updateImage();
  }

  //2. Si puede seguir en su dirección actual, acualizar posición.
  if (pacman.canMove(pacman.direction)) {
    pacman.updateVelocity();
    pacman.x += pacman.velocityX;
    pacman.y += pacman.velocityY;
  } else {
    // Si choca frontalmente, se detiene.
    pacman.velocityX = 0;
    pacman.velocityY = 0;
  }

  //Pasar al siguiente nivel si la comida llega a cero.
  if (foods.size == 0) {
    victorySound.play();
    loadMap();
    resetPositions();
    return;
  }
}

// Esta fucnión escucha las teclas para mover a Pacman. Pero no lo mueve, ya que de eso se encarga move.
function movePacman(e) {
  //Resetear el juego si se pierde al presionar cualquier tecla.
  if (gameOver) {
    loadMap();
    resetPositions();
    lives = 3;
    score = 0;
    gameOver = false;
    spanLives.textContent = " " + lives;
    update();
    return;
  }

  if (e.code == "ArrowUp" || e.code == "KeyW") {
    //Aplicarle el me´todo de Block asociado a pacman.
    pacman.requestedDirection = "U";
  } else if (e.code == "ArrowDown" || e.code == "KeyS") {
    //Aplicarle el me´todo de Block asociado a pacman.
    pacman.requestedDirection = "D";
  } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
    //Aplicarle el me´todo de Block asociado a pacman.
    pacman.requestedDirection = "L";
  } else if (e.code == "ArrowRight" || e.code == "KeyD") {
    //Aplicarle el me´todo de Block asociado a pacman.
    pacman.requestedDirection = "R";
  }

  //Si pacman salió por un lateral
  checkTeleport(pacman);
}

function moveGhosts() {
  for (let ghost of ghosts) {
    //1. Si el fantasma no puede seguir en su dirección actual...
    if (!ghost.canMove(ghost.direction)) {
      //2. creamos una dirección aleatoria que sea válida.

      //3. Buscamos una dirección aleatoria que sea válida.
      //Intentamos que canMove sea true.
      let newDirection;
      do {
        newDirection = options[Math.floor(Math.random() * options.length)];
      } while (!ghost.canMove(newDirection));

      ghost.direction = newDirection;
    }

    //Verificar si existe una colición con pacman.
    if (collision(ghost, pacman)) {
      lives -= 1;
      deathSound.play();
      spanLives.textContent = " " + lives;

      if (lives == 0) {
        gameOver = true;
        return;
      }
      resetPositions();
    }

    //Evitar que el fantasma se quede atascado en la línea nueve(espacio en blanco)
    if (ghost.y === 9 * tileSize) {
      if (ghost.canMove("U")) {
        if (Math.random() < 0.3) {
          //30% de probabilidad de evitar los huecos en el tablero.

          let newDirection =
            options[Math.floor(Math.random() * options.length)];
          ghost.direction = newDirection;
        }
      }
    }

    //4. Aplicar el movimeinto.
    ghost.updateVelocity();
    ghost.x += ghost.velocityX;
    ghost.y += ghost.velocityY;

    //Llamar a la función para la aparición de los fantasmas por los lados.
    checkTeleport(ghost);
  }
}

function updateImage() {
  //Actualizar las imágenes de pacman que coincida con el movimiento.
  if (pacman.direction === "U") {
    pacman.image = pacmanUpImage;
  } else if (pacman.direction === "D") {
    pacman.image = pacmanDownImage;
  } else if (pacman.direction === "L") {
    pacman.image = pacmanLeftImage;
  } else if (pacman.direction === "R") {
    pacman.image = pacmanRightImage;
  }
}

//Función de colisión. Verifica si dos cuerpos chocaron.
function collision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function checkTeleport(entity) {
  //Si sale por la izquierda, aparece por la derecha.
  if (entity.x < 0) {
    entity.x = boardWidht - entity.width;
  } else if (entity.x + entity.width > boardWidht) {
    //si sale por la derecha, aparece por la izquierda.
    entity.x = 0;
  }
}

function foodCheck() {
  let foodEated = null;
  for (let food of foods.values()) {
    if (collision(pacman, food)) {
      foodEated = food;
      eatSound.play();
      score += 10;
      break;
    }
  }
  //Actualizar el score tras la comida.
  let spanScore = document.getElementById("score-value");
  spanScore.textContent = score;
  foods.delete(foodEated);
}

//Función para resetear el juego.
function resetPositions() {
  pacman.reset();
  pacman.velocityX = 0;
  pacman.velocityY = 0;
  for (let ghost of ghosts.values()) {
    ghost.reset();
    const newDirection = options[Math.floor(Math.random() * options.length)];
    ghost.direction = newDirection;
  }
}
