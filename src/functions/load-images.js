// ========================= Variables de imágenes ===================
export let blueGhostImage;
export let orangeGhostImage;
export let pinkGhostImage;
export let redGhostImage;
export let pacmanUpImage;
export let pacmanDownImage;
export let pacmanLeftImage;
export let pacmanRightImage;
export let wallImage;

// ===================== Cargas imágenes ============================
export function loadImages() {
  wallImage = new Image();
  wallImage.src = "/pacmanjs/assets/wall.svg";

  blueGhostImage = new Image();
  blueGhostImage.src = "/pacmanjs/assets/blueGhost.svg";
  orangeGhostImage = new Image();
  orangeGhostImage.src = "/pacmanjs/assets/orangeGhost.svg";
  pinkGhostImage = new Image();
  pinkGhostImage.src = "/pacmanjs/assets/pinkGhost.svg";
  redGhostImage = new Image();
  redGhostImage.src = "/pacmanjs/assets/redGhost.svg";

  pacmanUpImage = new Image();
  pacmanUpImage.src = "/pacmanjs/assets/pacmanUp.svg";
  pacmanDownImage = new Image();
  pacmanDownImage.src = "/pacmanjs/assets/pacmanDown.svg";
  pacmanLeftImage = new Image();
  pacmanLeftImage.src = "/pacmanjs/assets/pacmanLeft.svg";
  pacmanRightImage = new Image();
  pacmanRightImage.src = "/pacmanjs/assets/pacmanRight.svg";
}
