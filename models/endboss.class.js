class Endboss extends MoveableObject {
  height = 500;
  width = 300;
  y = -40;
  energy = 10;
  endbossMusic = new Audio("audio/bossfight.mp3");

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 5000;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }

  endbossAppears() {
    this.endbossMusic.volume = 0.4;
    this.endbossMusic.loop = true;
    this.endbossMusic.play();
  }
}
