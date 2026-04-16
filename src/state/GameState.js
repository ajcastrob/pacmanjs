export class GameState {
  constructor() {
    this.score = 0;
    this.lives = 3;
    this.gameOver = false;
    this.walls = new Set();
    this.foods = new Set();
    this.ghosts = [];
    this.pacman = null;
  }
  incrementScore(points) {
    this.score += points;
  }
  decrementLives() {
    this.lives -= 1;
  }
  isVictory() {
    return this.foods.size === 0;
  }
  clearEntities() {
    this.walls.clear();
    this.foods.clear();
    this.ghosts = []; // Si es array, reasignar. Si es Set, .clear()
  }
  updateUI() {
    const spanLives = document.getElementById("lives-value");
    const spanScore = document.getElementById("score-value");
    if (spanLives) spanLives.textContent = " " + this.lives;
    if (spanScore) spanScore.textContent = this.score;
  }
  reset() {
    this.score = 0;
    this.lives = 3;
    this.gameOver = false;
    this.pacman.reset();
    this.ghosts.forEach((ghost) => ghost.reset());
  }
}
