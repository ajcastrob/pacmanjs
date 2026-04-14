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
  wallImage.src = "../../assets/wall.svg";

  blueGhostImage = new Image();
  blueGhostImage.src = "../../assets/blueGhost.svg";
  orangeGhostImage = new Image();
  orangeGhostImage.src = "../../assets/orangeGhost.svg";
  pinkGhostImage = new Image();
  pinkGhostImage.src = "../../assets/pinkGhost.svg";
  redGhostImage = new Image();
  redGhostImage.src = "../../assets/redGhost.svg";

  pacmanUpImage = new Image();
  pacmanUpImage.src = "../../assets/pacmanUp.svg";
  pacmanDownImage = new Image();
  pacmanDownImage.src = "../../assets/pacmanDown.svg";
  pacmanLeftImage = new Image();
  pacmanLeftImage.src = "../../assets/pacmanLeft.svg";
  pacmanRightImage = new Image();
  pacmanRightImage.src = "../../assets/pacmanRight.svg";
}
