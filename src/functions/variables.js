//================ Varible para sonidos =====================//
export const eatSound = new Audio("../../assets/sounds/eat.mp3");
export const deathSound = new Audio("../../assets/sounds/death.mp3");
export const victorySound = new Audio("../../assets/sounds/victory.mp3");
export const musicPacman = new Audio("../../assets/sounds/pacman-song.mp3");
//Establecer un volúmen de un 30%.
eatSound.volume = 0.1;
deathSound.volume = 0.1;
victorySound.volume = 0.1;
musicPacman.volume = 0.1;

//dirección para los fantamas.
export const options = ["U", "D", "L", "R"];

// ================== Configuración del tablero =================== let board;
//
export const rowCount = 21;
export const colCount = 19;
export const tileSize = 20; //tamaño en pixels de cada cuadrícula.
export const boardWidht = colCount * tileSize;
export const boardHeigth = rowCount * tileSize;

//==============Colección de entidades ======================//
// Set que define las paredes. Evita duplicados.
export const walls = new Set();
// Set que define food. Evita duplicados. Puntos de comida.
export const foods = new Set();
// Set que define todos los fantamas.
export const ghosts = new Set();
