class Endboss extends MoveableObject {
  height = 500;
  width = 300;
  y = -40;
  energy = 10;
  endbossMusic = new Audio("audio/bossfight.mp3");
  isActive = false;
  currentStatus;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 9500;
    this.speed = 0.2;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.isActive && (this.currentStatus === "walking" || this.currentStatus === "attack")) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      switch (this.currentStatus) {
        case "alert":
          this.playAnimation(this.IMAGES_ALERT);
          break;
        case "attack":
          this.playAnimation(this.IMAGES_ATTACK);
          break;
        case "hurt":
          this.playAnimation(this.IMAGES_HURT);
          break;
        case "dead":
          this.playAnimation(this.IMAGES_DEAD);
          break;
        default:
          this.playAnimation(this.IMAGES_WALKING);
          break;
      }
    }, 200);
  }

  endbossAppears() {
    this.currentStatus = "walking";
    this.isActive = true;
    this.endbossMusic.volume = 0.4;
    this.endbossMusic.loop = true;
    this.endbossMusic.play();
  }

  spottedCharacter() {
    this.currentStatus = "alert";
    this.isActive = true;
  }

  startRunning() {
    this.currentStatus = "attack";
    this.speed = 0.4;
  }

  takesDamage() {
    this.currentStatus = "hurt";
    this.speed += 0.05;
  }

  endbossIsDead() {
    this.currentStatus = "dead";
    this.isActive = false;
    this.endbossMusic.pause();
  }
}
