import { Pacman } from "../class/Pacman";
import { Ghost } from "../class/Ghost";
import { GameState } from "../state/GameState";
import { Renderer } from "../Render/Render";
import { InputHandler } from "../input/InputHandler";
import { tileMap } from "../functions/mapa";
import { tileSize, boardWidht, boardHeigth, options } from "./variables";
import {
  wallImage,
  redGhostImage,
  blueGhostImage,
  orangeGhostImage,
  pinkGhostImage,
} from "./load-images";
import { loadImages } from "./load-images";
import { eatSound, deathSound, victorySound, musicPacman } from "./variables";

//Variables globales reducidas
// ANTES: ~10 variables sueltas
// DESPUÉS: solo 3 objetos
let gameState;
let renderer;
let inputHandler;

//Función inicio() - Inicialización
export let inicio = () => {
  const board = document.getElementById("board");
  board.height = boardHeigth;
  board.width = boardWidht;
  const context = board.getContext("2d");
  // Inicializar módulos
  gameState = new GameState();
  renderer = new Renderer(context, boardWidht, boardHeigth);
  inputHandler = new InputHandler();
  loadImages();
  loadMap();
  gameState.updateUI();
  // Botón start
  document.getElementById("btn-start").addEventListener("click", () => {
    document.getElementById("overlap").style.display = "none";
    document.getElementById("btn-start").style.display = "none";
    musicPacman.play();
    gameLoop();
  });
};

//Función loadMap() - Carga del mapa
function loadMap() {
  gameState.clearEntities();

  for (let r = 0; r < tileMap.length; r++) {
    for (let c = 0; c < tileMap[r].length; c++) {
      const tile = tileMap[r][c];
      const x = c * tileSize;
      const y = r * tileSize;
      if (tile === "X") {
        gameState.walls.add({
          x,
          y,
          width: tileSize,
          height: tileSize,
          image: wallImage,
        });
      } else if (tile === "P") {
        gameState.pacman = new Pacman(x, y, tileSize);
      } else if (tile === " ") {
        gameState.foods.add({ x: x + 9, y: y + 9, width: 2, height: 2 });
      } else if (tile === "b") {
        gameState.ghosts.push(
          new Ghost(x, y, tileSize, "blue", blueGhostImage),
        );
      } else if (tile === "p") {
        gameState.ghosts.push(
          new Ghost(x, y, tileSize, "pink", pinkGhostImage),
        );
      } else if (tile === "o") {
        gameState.ghosts.push(
          new Ghost(x, y, tileSize, "orange", orangeGhostImage),
        );
      } else if (tile === "r") {
        gameState.ghosts.push(new Ghost(x, y, tileSize, "red", redGhostImage));
      }
    }
  }
}

//handleInput() - Procesar input
function handleInput() {
  const dir = inputHandler.getRequestedDirection();
  if (dir) {
    gameState.pacman.requestedDirection = dir;
  }
}

//move() - Mover Pacman
function move() {
  const pacman = gameState.pacman;

  // 1. Intentar girar con buffer
  if (pacman.canMove(gameState.walls, pacman.requestedDirection)) {
    pacman.direction = pacman.requestedDirection;
    pacman.updateImage(pacman.direction);

    // Snapping
    if (pacman.direction === "U" || pacman.direction === "D") {
      pacman.x = Math.round(pacman.x / tileSize) * tileSize;
    } else {
      pacman.y = Math.round(pacman.y / tileSize) * tileSize;
    }
  }
  // 2. Mover si puede
  if (pacman.canMove(gameState.walls, pacman.direction)) {
    pacman.updateVelocity();
    pacman.x += pacman.velocityX;
    pacman.y += pacman.velocityY;
  } else {
    pacman.velocityX = 0;
    pacman.velocityY = 0;
  }
  // 3. Teleport
  checkTeleport(pacman);
  // 4. Victoria
  if (gameState.isVictory()) {
    victorySound.play();
    loadMap();
  }
}

//moveGhosts() - Mover fantasmas
function moveGhosts() {
  for (let ghost of gameState.ghosts) {
    if (!ghost.canMove(gameState.walls, ghost.direction)) {
      ghost.chooseDirection(gameState.walls, options);
    }
    if (collision(ghost, gameState.pacman)) {
      gameState.decrementLives();
      deathSound.play();
      gameState.updateUI();
      if (gameState.lives === 0) {
        gameState.gameOver = true;
        return;
      }
      gameState.pacman.reset();
      ghost.reset();
      ghost.chooseDirection(gameState.walls, options);
    }
    if (ghost.shouldEvadeHorizontalLine(gameState.walls, tileSize)) {
      ghost.chooseDirection(gameState.walls, options);
    }
    ghost.updateVelocity();
    ghost.x += ghost.velocityX;
    ghost.y += ghost.velocityY;
    checkTeleport(ghost);
  }
}

//foodCheck() - Comida
function foodCheck() {
  for (let food of gameState.foods) {
    if (collision(gameState.pacman, food)) {
      eatSound.play();
      gameState.incrementScore(10);
      gameState.updateUI();
      gameState.foods.delete(food);
      break;
    }
  }
}

//Funciones auxiliares
function collision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
function checkTeleport(entity) {
  if (entity.x < 0) {
    entity.x = boardWidht - entity.width;
  } else if (entity.x + entity.width > boardWidht) {
    entity.x = 0;
  }
}

//Game Loop
function gameLoop() {
  if (gameState.gameOver) {
    loadMap();
    gameState.reset();
    gameState.updateUI();
  }
  handleInput();
  move();
  moveGhosts();
  foodCheck();
  renderer.drawAll(gameState);
  setTimeout(gameLoop, 50);
}
