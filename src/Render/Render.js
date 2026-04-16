export class Renderer {
  constructor(context, boardWidth, boardHeight) {
    this.context = context;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.pulsePhase = 0;
  }
  clear() {
    this.context.clearRect(0, 0, this.boardWidth, this.boardHeight);
  }
  drawPacman(pacman) {
    this.context.save();
    this.context.shadowColor = "#ffcc00";
    this.context.shadowBlur = 12;
    this.context.drawImage(
      pacman.image,
      pacman.x,
      pacman.y,
      pacman.width,
      pacman.height,
    );
    this.context.restore();
  }
  drawGhosts(ghosts) {
    for (let ghost of ghosts) {
      this.context.save();
      this.context.shadowColor = "#ff00ff";
      this.context.shadowBlur = 8;
      this.context.drawImage(
        ghost.image,
        ghost.x,
        ghost.y,
        ghost.width,
        ghost.height,
      );
      this.context.restore();
    }
  }
  drawWalls(walls) {
    this.context.save();
    this.context.shadowColor = "#00ffff";
    this.context.shadowBlur = 4;
    for (let wall of walls) {
      this.context.drawImage(
        wall.image,
        wall.x,
        wall.y,
        wall.width,
        wall.height,
      );
    }
    this.context.restore();
  }
  drawFood(foods) {
    this.pulsePhase += 0.05;
    const pulse = 0.7 + 0.3 * Math.sin(this.pulsePhase);
    this.context.save();
    this.context.shadowColor = "#ffcc00";
    this.context.shadowBlur = 6 * pulse;
    this.context.fillStyle = `rgba(255, 204, 0, ${pulse})`;
    for (let food of foods) {
      this.context.beginPath();
      this.context.arc(
        food.x + food.width / 2,
        food.y + food.height / 2,
        food.width * 1.5,
        0,
        Math.PI * 2
      );
      this.context.fill();
    }
    this.context.restore();
  }
  drawAll(gameState) {
    this.clear();
    this.drawPacman(gameState.pacman);
    this.drawGhosts(gameState.ghosts);
    this.drawWalls(gameState.walls);
    this.drawFood(gameState.foods);
  }
}
